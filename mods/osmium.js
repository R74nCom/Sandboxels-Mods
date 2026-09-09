elements.osmium = {
    color: ["#9ea7ad", "#7f8c94", "#b3bcc2"], // bluish-white metallic tones
    behavior: behaviors.WALL, // solid, does not fall
    category: "solids",
    state: "solid",

    density: 22590, // very dense (scaled up for Sandboxels physics)

    tempHigh: 3033,
    stateHigh: "molten_osmium",

    hardness: 0.9, // high hardness (resists breaking in-game)

    conduct: 1, // highly conductive

    breakInto: "osmium_powder", // brittle behavior

    desc: "Extremely dense, hard, brittle transition metal."
};

elements.osmium_powder = {
    color: ["#d6d1a8", "#c9c48f"], // pale yellow powder
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",

    density: 12000, // still dense but less compact than solid

    tempHigh: 3033,
    stateHigh: "molten_osmium",

    conduct: 0.3,

    desc: "Powdered osmium; brittle form of the metal."
};

elements.molten_osmium = {
    color: ["#ffd9a3", "#ffb347", "#ff8c42"], // hot glowing metal
    behavior: behaviors.MOLTEN,
    category: "liquids",
    state: "liquid",

    density: 20000,

    temp: 3100,

    tempLow: 3033,
    stateLow: "osmium",

    tempHigh: 5012,
    stateHigh: "osmium_gas",

    conduct: 1,

    viscosity: 10000, // thick liquid metal

    desc: "Molten osmium; extremely hot and dense."
};

elements.osmium_gas = {
    color: ["#f5e6c8", "#e8d8b0"],
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",

    density: 5,

    tempLow: 5012,
    stateLow: "molten_osmium",

    conduct: 0.1,

    desc: "Vaporized osmium at extreme temperatures."
};
