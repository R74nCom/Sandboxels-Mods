elements.replaceelem = {
    color: ["#ff007a", "#4625e3"], //colors
    name: "Replace", //wanted to just call it "replace" but i think other mods use that name too and i wanna keep it compatible with as manh as possible
    onSelect: function() {
        promptInput("Enter an element to replace clicked elements with.", function(swapelem) { //i finally fixed the prompt
            swapelem2 = validateElementList(swapelem);
            if (!swapelem2) return;
            else replacingelement = swapelem2;
        });
    },
    tool: function(pixel) {
    if (typeof replacingelement !== "string") { //if theres no input, set to unknown
        pixel.element = "unknown";
        return;
    }
        if (pixel.element === replacingelement) return;
        pixel.element = replacingelement;
    },
    category: "edit", //movin to edit tab cuz that's here now
};
