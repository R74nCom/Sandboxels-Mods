(() => {
const STYLE = `
#ejs_mheader,#ejs_nheader {
    margin-left: 0.6em
}

#ejs_nheader {
    margin-top: 0.8em;
}

#ejs_mheader:has(+ #ejs_list:empty) {
    display: none;
}

#ejs_list,#modManagerList {
    padding-left: 2em;
    margin-top: 0.5em;

    li {
        padding-left: 0.5em;

        &::before { display: none }
        &::marker {
            content: "•";
            font-size: 1em;
            font-family: "Press Start 2P";
        }
    }
}
`;

// Guess this also doing some UI isn't *really* fully OOP-ic, but the mod isn't
// big enough to justify the extra plumbing that needs
class StorageManager {
    #loaded_esms = new Set()
    #list

    static #create_li(url) {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">${url.split("/").pop()}</a> `;

        const remove_btn = document.createElement("span");
        remove_btn.innerText = "X";
        remove_btn.classList.add("removeModX");
        remove_btn.onclick = () => removeMod(url);
        li.append(remove_btn);

        return li;
    }

    constructor() {
        if (!localStorage.ejs_loaded_esms) {
            localStorage.ejs_loaded_esms = "[]";
        }
        
        try {
            this.#loaded_esms = new Set(JSON.parse(localStorage.ejs_loaded_esms));
        }
        catch (e) {
            if (e instanceof SyntaxError) {
                console.error("localstorage entry contains invalid JSON, clearing")
                localStorage.ejs_loaded_esms = "[]"
            }
            else {
                throw e
            }
        }

        this.#list = document.createElement("ul");
        this.#list.id = "ejs_list";
        
        for (const url of this.#loaded_esms) {
            this.#list.append(StorageManager.#create_li(url)) 
        }
    
        const mm_list = document.getElementById("modManagerList")

        mm_list.insertAdjacentHTML("beforebegin", "<div id='ejs_nheader'>Normal</div>")
        mm_list
            .insertAdjacentElement("afterend", this.#list)
            .insertAdjacentHTML("beforebegin", "<div id='ejs_mheader'>Modules</div>")
    }

    load()  { return this.#loaded_esms }
    count() { return this.#loaded_esms.length }

    add(...urls) {
        for (const url of urls) {
            if (!this.#loaded_esms.has(url)) {
                this.#loaded_esms.add(url)
                this.#list.append(StorageManager.#create_li(url))
            }
        }

        localStorage.ejs_loaded_esms = JSON.stringify(Array.from(this.#loaded_esms))
    }

    remove(url) {
        this.#list.querySelector(`li:has(a[href="${url}"])`)?.remove()

        if (this.#loaded_esms.delete(url)) {
            localStorage.ejs_loaded_esms = JSON.stringify(Array.from(this.#loaded_esms))
            return true
        }
        else { 
            return false
        }
    }
}

function patch() {
    const style_div = document.createElement("style");
    style_div.innerHTML = STYLE;
    document.head.appendChild(style_div);

    // clear out any stale entries
    for (const item of document.getElementById("modManagerList").children) {
        if (item.querySelector("a").href.endsWith(".mjs")) item.remove() 
    }
}

function rip_esms(ls_manager) {
    const old_len = enabledMods.length;
    ls_manager.add(...enabledMods.filter((x) => x.endsWith(".mjs")));

    enabledMods = enabledMods.filter((x) => !x.endsWith(".mjs"));
    localStorage.enabledMods = JSON.stringify(enabledMods);

    if (ls_manager.count() > old_len) {
        modManagerList = document.getElementById("modManagerList");
        modManagerList.innerHTML = "";

        for (var i = 0; i < enabledMods.length; i++) {
            var mod = enabledMods[i];
            var modName = mod.split("/").pop();
            let url = mod;
            if (url.startsWith("mods/") && !isLocalFile) {
                url = "https://mods.r74n.com/" + url;
            }
            modManagerList.innerHTML += `<li>
                <a href="${url.replaceAll('"', "")}" target="_blank">${modName}</a>
                <span
                    class="removeModX"
                    onclick='removeMod("${mod.replaceAll('"', '\\"')}")'
                >X</span>
            </li>`;
        }
    }
}

function load(ls_manager) {
    for (const mod of ls_manager.load()){
        const elem = document.createElement("script");
        elem.src = mod;
        elem.setAttribute("type", "module");
        document.head.appendChild(elem);

        console.log(elem);
    }
}


const ls_manager = new StorageManager()

patch();
rip_esms(ls_manager);
load(ls_manager);

// ---- PUBLIC API ----
window.ejs = {
    get_esms: () => ls_manager.load(),
}

// ---- PATCHED VERSIONS OF BUILTIN FUNCTIONS ----

window.addMod = (url, noMessage) => {
    let split = url.split(/ ?; ?/g);

    if (split.length > 1) {
        split.forEach(addMod);
        return;
    }

    while (url.charAt(url.length - 1) == "/") {
        url = url.substring(0, url.length - 1);
    }
    url = url.replaceAll(/['‘’“”"\$\{\}\\]/g, "");

    if (url.indexOf("/") == -1 && url.indexOf(".") == -1 && !noMessage) {
        promptText(
            "Invalid mod URL.\n\nYou usually want something like 'survival.js' (without the quotes)",
            showModManager,
            "Error",
        );
        return;
    }
    // if the url doesn't start with http, add "mods/" to the beginning
    if (url.indexOf("http") == -1 && url.indexOf("mods/") == -1) {
        url = "mods/" + url;
        if (standalone) url = "https://mods.r74n.com/" + url;
    }

    if (url.startsWith("mods/") && !isLocalFile) {
        url = "https://mods.r74n.com/" + url;
    }
    // if the mod is in enabledMods, return
    for (var i = 0; i < enabledMods.length; i++) {
        if (enabledMods[i] == url) return;
    }

    if (url.endsWith(".mjs")) {
        ls_manager.add(url)
    } else {
        // add it to enabledMods and set the localStorage
        enabledMods.push(url);
        localStorage.setItem("enabledMods", JSON.stringify(enabledMods));

        // add to modManagerList
        var modManagerList = document.getElementById("modManagerList");
        var modName = url.split("/").pop();
        modManagerList.innerHTML += `<li>
            <a href="${url.replaceAll('"', "")}" target="_blank">${modName}</a>
            <span class="removeModX" onclick='removeMod("${
            url.replaceAll('"', '\\"')
        }")'>X</span>
        </li>`;
    }

    document.getElementById("noMods").style.display = "none";
    document.getElementById("modManagerRefresh").style.display = "block";

    if (!noMessage) {
        changedMods = true;
        promptText(
            (standalone ? "Reset the canvas" : "Refresh the page") +
                " to apply changes.",
            showModManager,
            "Added Mod",
        );
    }

    return url;
}

window.removeMod = (url, noMessage) => {
    if (ls_manager.remove(url)) {
        if (!noMessage) {
            changedMods = true;
            promptText((standalone ? "Reset the canvas" : "Refresh the page")+" to apply changes.", showModManager, "Removed Mod");
        }
    }
    else {
        // remove url from enabledMods and set the localStorage
        for (var i = 0; i < enabledMods.length; i++) {
            if (enabledMods[i] == url) {
                enabledMods.splice(i, 1);
                break;
            }
        }

        if (enabledMods.length === 0) {
            document.getElementById("noMods").style.display = "block";
        }
        document.getElementById("modManagerRefresh").style.display = "block";
        localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
        // remove from modManagerList by href
        var modManagerList = document.getElementById("modManagerList");
        var modManagerListLinks = modManagerList.getElementsByTagName("a");
        url = url.replaceAll('"','');
        for (var i = 0; i < modManagerListLinks.length; i++) {
            if (modManagerListLinks[i].href.endsWith(url)) {
                modManagerListLinks[i].parentNode.remove();
                break;
            }
        }

        if (!noMessage) {
            changedMods = true;
            promptText((standalone ? "Reset the canvas" : "Refresh the page")+" to apply changes.", showModManager, "Removed Mod");
        }
    }
}

const gsave_old = window.generateSave
window.generateSave = (pixmap, opts) => {
    const generated = gsave_old(pixmap, opts);

    if (opts.mods) {
        generated.saveConfig.mods.push(...ls_manager.load())
    }

    return generated;
}

})()
