// Tank Mod for Sandboxels (tankmod.js)

// 1. Heavy Tank Armor (Heat-proof, blast-resistant, insulated)
elements.tank_armor = {
    color: ["#4b5320", "#556b2f", "#3b4218"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 7800,
    hardness: 0.95,
    insulate: true,
    tempHigh: 3500,
    stateHigh: "molten_steel",
    conduct: 0.1
};

// 2. Tank Shell (Falls fast and explodes on impact)
elements.tank_shell = {
    color: "#b8860b",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1 AND EX:15>fire,smoke,shrapnel|XX"
    ],
    category: "weapons",
    state: "solid",
    density: 9000,
    tempHigh: 400,
    stateHigh: "explosion"
};

// 3. Sticky Tank Fuel / Napalm (Burns hot and sticks to surfaces)
elements.tank_napalm = {
    color: "#cc3300",
    behavior: behaviors.LIQUID,
    category: "weapons",
    state: "liquid",
    density: 850,
    viscosity: 5000,
    burn: 90,
    burnTime: 400,
    burnInto: "fire",
    fireColor: "#ff6600"
};
