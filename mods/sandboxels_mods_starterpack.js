var mods_to_include = ["mods/sbstuff.js","mods/ketchup_mod.js","mods/morefoodsmod.js","mods/weAllScreamFor.js","mods/soups.js","mods/community_desserts.js","mods/plants.js","mods/aChefsDream.js","editTools.js","texture_pack_by_jayd.js","elementsManager.js","ticking_temp_stuff.js","betterModManager.js","elementsManager.js","mods/aChefsDream2.js"]

var mods_included = mods_to_include.map(mod => enabledMods.includes(mod));
var all_mods_included = mods_included.reduce(function(a,b) { return a && b });

if(!all_mods_included) {
    var mods_needed = mods_to_include.filter(function(modPath) { return !(enabledMods.includes(modPath)) });

    mods_needed.forEach(function(modPath) {
		enabledMods.splice(enabledMods.indexOf("mods/food_mods"),0,modPath);
	});
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The following mods have been inserted: ${mods_needed.join(", ")}
Reload the page for the mods to take effect :)`)
}

   var topBar = document.querySelector("#header") || document.querySelector(".top-bar") || document.body;
    
    if (topBar) {
        var customLogo = document.createElement("img");
        
        customLogo.src = "https://r74n.com/icons/avatar-sandboxels-style.png"; 
        
        customLogo.style.display = "block";
        customLogo.style.margin = "5px auto";
        customLogo.style.width = "64px";
        customLogo.style.height = "64px";
        customLogo.style.borderRadius = "8px";
        customLogo.id = "sandboxels-starterpack-logo";

        topBar.appendChild(customLogo);
    }
});
