(() => {
    // not brought to you by hyper co.

    // using a Symbol to make it impossible to accidentally overwrite something
    // another mod uses
    const tag_sym = Symbol("Unregistered HyperTag 2");

    function patch() {
        document
            .getElementById("settingLabel-limitless")
            .parentNode
            .insertAdjacentHTML(
                "afterend",
                `<span
                setting="save_hyper"
                class="setting-span multisetting"
                title="Default: OFF"
            >
                <button
                    id="settingLabel-save_hyper"
                    class="toggleInput"
                    onclick="toggleInput(this, 'save_hyper', false)"
                    state="0"
                >
                    Save hyper
                </button>
            </span>
            <span
                setting="load_hyper"
                class="setting-span multisetting"
                title="Default: OFF"
            >
                <button
                    id="settingLabel-load_hyper"
                    class="toggleInput"
                    onclick = "toggleInput(this, 'load_hyper', false)"
                    state="0"
                >
                    Load hyper
                </button>
            </span>`,
            );

        document
            .querySelector("#savePromptParent .toggles-row")
            .insertAdjacentHTML(
                "beforeend",
                `<span>
                <input
                    type="button"
                    value="Save hyper"
                    class="toggleInput"
                    onclick="toggleInput(this,undefined,false)"
                    state="0"
                    id="saveHyper"
                    style="display: inline-block;"
                />
            </span>`,
            );
    }

    function isolate_hyper(pixmap) {
        // nouser thought of this algorithm
        for (const row of pixmap) {
            for (const x of row) {
                if (x) x[tag_sym] = true;
            }
        }

        const hyper = currentPixels.filter((x) => !Object.hasOwn(x, tag_sym));

        // to be a bit more hygenic, even if it *could* just make a new symbol
        // each time and leave them there
        for (const row of pixmap) {
            for (const x of row) {
                if (x) delete x[tag_sym];
            }
        }

        return hyper;
    }

    const gsave_old = generateSave;
    window.generateSave = (pixmap, opts) => {
        const generated = gsave_old(pixmap, opts);

        if (settings.hyperpreserve || opts.save_hyper) {
            generated.hyper = isolate_hyper(pixmap ?? pixelMap);
        }

        return generated;
    };

    const lsave_old = loadSave;
    window.loadSave = (data, confirmed, skip, softLoad) => {
        lsave_old(data, confirmed, skip, softLoad);

        if (data.hyper && settings.load_hyper) {
            currentPixels.push(...data.hyper);
        }
    };

    runAfterLoad(patch);

    // patches for the saves prompt

    const ssp_old = showSavePrompt;
    window.showSavePrompt = () => {
        document
            .getElementById("saveHyper")
            .setAttribute("state", settings.save_hyper);

        ssp_old();
    };

    window.confirmSave = (confirmed = 0) => {
        if (!savingState) return;
        if (
            confirmed < 1 && savingState.slot && settings.resetwarning !== 0 &&
            localStorage["SandboxelsSaves/" + savingState.slot]
        ) {
            let tempState = savingState;
            promptConfirm(
                "Are you sure you want to overwrite the current save in slot " +
                    savingState.slot + "? This cannot be undone.",
                (r) => {
                    savingState = tempState;
                    if (r) confirmSave(1);
                },
                "Overwrite Slot",
            );
            return;
        }

        // might as well change this stuff a bit, seeing as it'll break anyway if there's an update

        const get_en = (id) =>
            document.getElementById(id).getAttribute("state") === "1";

        const config = {
            name: document.getElementById("saveName").value || "Unnamed",
            author: document.getElementById("saveAuthor").value || "",

            temp: get_en("saveTemp"),
            colors: get_en("saveColors"),
            mods: get_en("saveMods"),
            raw: get_en("saveRaw"),
            save_hyper: get_en("saveHyper"),

            keep: [],
            tags: [],
        };

        if (config.author && !currentSaveData.loaded) {
            setSetting("authorName", config.author);
        }

        if (config.temp) config.keep.push("temp");
        if (config.colors) config.keep.push("color");

        var saveDesc = document.getElementById("saveDesc").value ?? "";
        var saveTagsList = document.getElementById("saveTags");
        var enabledTags = saveTagsList.querySelectorAll('input[state="1"]');
        enabledTags.forEach((tagElem) => {
            config.tags.push(parseInt(tagElem.getAttribute("data-tag")));
        });

        if (standaloneType === "steam") {
            if (savingState.overwrite) {
                overwriteSaveFileConfirm(
                    savingState.overwrite,
                    generateSave(undefined, config),
                );
            } else {
                writeSaveFile(generateSave(undefined, config));
            }
            closeMenu();
        } else if (savingState.slot) {
            // save stringified generateSave() to localStorage SandboxelsSaves/i
            localStorage.setItem(
                "SandboxelsSaves/" + savingState.slot,
                JSON.stringify(generateSave(undefined, config)),
            );
            closeMenu();
            showSaves();
        } else {
            // save to <name>.sbxls
            var save = generateSave(undefined, config);
            var blob = new Blob([JSON.stringify(save)], {
                type: "application/json",
            });
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = config.name + ".sbxls";
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
            closeMenu();
        }

        if (currentSaveData) {
            if (savingState && !isNaN(savingState.slot)) {
                currentSaveData.slot = savingState.slot;
            }

            currentSaveData.name = config.name;
            currentSaveData.author = save.author;
            currentSaveData.desc = saveDesc;
        }
    };
})();
