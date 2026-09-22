elements.shocker = {
    color: "#464827",
	behavior: behaviors.WALL,
    breakInto: "metal_scrap",
    temp: 20,
    behaviorOn: [
        "XX|CR:electric|XX",
        "CR:electric|XX|CR:electric",
        "XX|CR:electric|XX",
    ],
    category: "machines",
    insulate: elements.wire.insulate,
    conduct: elements.wire.conduct,
    noMix: elements.wire.noMix
};

elements.tesla_coil = {
    color: "#273a48",
	behavior: behaviors.WALL,
    breakInto: "molten_metal_scrap",
    temp: 7025,
    behaviorOn: [
        "XX|CR:plasma|XX",
        "CR:plasma|XX|CR:plasma",
        "XX|CR:plasma|XX",
    ],
    category: "machines",
    insulate: elements.wire.insulate,
    conduct: elements.wire.conduct,
    noMix: elements.wire.noMix
};

elements.legacy_led_r = {
    behavior: behaviors.WALL,
    reactions: {
        "light": { "charge1": 1 }
    },
    breakInto: "metal_scrap",
    color: "#630000",
    colorOn: "#ff0000",
    category: "machines",
    tempHigh: 1500,
    stateHigh: "molten_glass",
    conduct: 1
};
elements.legacy_led_g = {
    behavior: behaviors.WALL,
    reactions: {
        "light": { "charge1": 1 }
    },
    breakInto: "metal_scrap",
    color: "#0d6300",
    colorOn: "#00ff00",
    category: "machines",
    tempHigh: 1500,
    stateHigh: "molten_glass",
    conduct: 1
};
elements.legacy_led_b = {
    behavior: behaviors.WALL,
    reactions: {
        "light": { "charge1": 1 }
    },
    breakInto: "metal_scrap",
    color: "#070063",
    colorOn: "#2200ff",
    category: "machines",
    tempHigh: 1500,
    stateHigh: "molten_glass",
    conduct: 1
};
