(function() {
    // 1. Block the birth of smoke pixels
    const oldCreatePixel = window.createPixel;
    window.createPixel = function(el, x, y, ...args) {
        if (el === "smoke" || el === "steam" || el === "ash") { return false; }
        return oldCreatePixel(el, x, y, ...args);
    };

    // 2. Continuous cleanup loop
    setInterval(() => {
        // Wipe element definitions
        if (elements.smoke) {
            elements.smoke.color = "#00000000";
            elements.smoke.onStep = function(pixel) { deletePixel(pixel.x, pixel.y); };
        }

        // Scan the active grid for any "illegal" smoke
        for (let i = 0; i < pixelTicks.length; i++) {
            let p = pixelTicks[i];
            if (p && (p.element === "smoke" || p.element === "steam")) {
                deletePixel(p.x, p.y);
            }
        }

        // Clean up reactions in other elements
        Object.keys(elements).forEach(key => {
            let el = elements[key];
            if (el.reactions) {
                for (let r in el.reactions) {
                    if (el.reactions[r].elem1 === "smoke" || el.reactions[r].elem2 === "smoke") {
                        delete el.reactions[r];
                    }
                }
            }
            if (el.burnInto === "smoke") { el.burnInto = null; }
        });
    }, 50);

    console.log("SMOKE ERASED: The sky is clear.");
})();
