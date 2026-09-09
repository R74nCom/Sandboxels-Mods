(() => {
// not brought to you by hyper co.

// using a Symbol to make it impossible to accidentally overwrite something
// another mod uses
const tag_sym = Symbol("Unregistered HyperTag 2");

let hyper = localStorage.hyperpreserve_en == "true";

function patch() {
    const parent = document
        .getElementById("settingLabel-limitless")
        .parentNode
        .insertAdjacentHTML(
            "afterend",
            `<span
                setting="limitless"
                class="setting-span multisetting"
                title="Default: OFF"
            >
                <button
                    id="settingLabel-hyperpreserve"
                    class="toggleInput"
                    state="0"
                >
                    Keep hyper
                </button>
            </span>`,
        );

    // function() is needed to bind `this`
    document.getElementById("settingLabel-hyperpreserve").onclick =
        function () {
            hyper = !hyper;

            // ternary to be a bit more explicit
            localStorage.hyperpreserve_en = hyper ? "true" : "false";

            toggleInput(this, "limitless", false);
        };
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
            if (x) delete x[tag_sym]
        }
    }

    return hyper;
}

const gsave_old = generateSave;
window.generateSave = (pixmap, opts) => {
    const generated = gsave_old(pixmap, opts);

    if (hyper) {
        generated.hyper = isolate_hyper(pixmap ?? pixelMap);
    }

    return generated;
};

const lsave_old = loadSave;
window.loadSave = (data, confirmed, skip, softLoad) => {
    lsave_old(data, confirmed, skip, softLoad)

    console.log(data.hyper)
    if (data.hyper) {
        currentPixels.push(...data.hyper)
    }
}

runAfterLoad(patch);

})();
