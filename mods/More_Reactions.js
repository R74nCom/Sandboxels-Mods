// ===== FUN SOLID =====
elements.fun_solid = {
    color: "#e1ff00",
    behavior: behaviors.WALL,
    reactions: {
        "fun_gas": { elem1:null, elem2:"element_for_mixing", chance:0.2 },
    },
    category: "fun_elements",
    state: "solid",
    tempHigh: 250,
    stateHigh: "fun_powder",
    tempLow: -150,
    stateLow: "ice",
    density: 1800
};

elements.element_for_mixing = {
    color: "#e1ff00",
    behavior: behaviors.WALL,
    reactions: {
        "fire": { elem1:null, elem2:"fun_powder", chance:0.1 },     
        "water": { elem1:null, elem2:"fun_gas", chance:0.1 },
        "color_smoke": { elem1:null, elem2:"fun_solid", chance:0.1 },
        "gunpowder": { elem1:null, elem2:"base_of_throw_grenade", chance:0.1 },
        "fun_powder": { elem1:null, elem2:"charge", chance:0.1 },
    },
    category: "fun_elements",
    state: "solid",
    tempHigh: 250,
    stateHigh: "fun_gas",
    tempLow: -150,
    stateLow: "fun_solid",
    density: 1800
};

// ===== FUN POWDER =====
elements.fun_powder = {
    color: "#e1ff00",
    behavior: behaviors.POWDER,
    category: "fun_elements",
    state: "solid",
    tempHigh: 250,
    stateHigh: "fun_liquid",
    tempLow: -150,
    stateLow: "fun_solid",
    density: 1200
};

// ===== FUN LIQUID =====
elements.fun_liquid = {
    color: "#ff00d4",
    behavior: behaviors.LIQUID,
    category: "fun_elements",
    state: "liquid",
    viscosity: 50,
    reactions: {
        "fire": { elem1:"fun_gas", chance:0.2 }
    },
    tempHigh: 250,
    stateHigh: "fun_gas",
    tempLow: -150,
    stateLow: "fun_powder"
};

// ===== FUN GAS (nový dodatek) =====
elements.fun_gas = {
    color: "#057b8e",
    behavior: behaviors.GAS,
    category: "fun_elements",
    state: "gas",
    tempLow: 80,
    stateLow: "fun_elements"
};

// ===== GRENADE =====
elements.charged_grenade = {
    color: ["#036828","#00361b","#036828"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>explosion|M2",
    ],
    category: "better_grenades",
    state: "powder",
    tempHigh: 250,
    stateHigh: "explosion",
    tempLow: -185,
    stateLow: "iced_throw_grenade",
    density: 2000
};

elements.throw_grenade = {
    color: "#00361b",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    category: "better_grenades",
    state: "solid",
    tempHigh: 250,
    stateHigh: "gunpowder",
    tempLow: -185,
    stateLow: "iced_throw_grenade",
    density: 2000
};

// ===== ICED GRENADE =====
elements.iced_throw_grenade = {
    color: "#003637",
    behavior: behaviors.WALL,
    category: "better_grenades",
    state: "solid",
    tempHigh: 185,
    stateHigh: "throw_grenade",
    tempLow: -200,
    stateLow: "ice"
};

elements.base_of_throw_grenade = {
    color: "#11ff00",
    behavior: behaviors.WALL,
            reactions: {
        "charge_of_grenade": { elem1:null, elem2:"throw_grenade", chance:0.1 },     
    },
    category: "better_grenades",
    state: "solid",
    tempHigh: 185,
    stateHigh: "gunpowder",
    tempLow: -200,
    stateLow: "iced_base_of_throw_grenade"
};

elements.iced_base_of_throw_grenade = {
    color: "#003637",
    behavior: behaviors.WALL,
    category: "better_grenades",
    state: "solid",
    tempHigh: 185,
    stateHigh: "base_of_throw_grenade",
    tempLow: -200,
    stateLow: "ice"
};

elements.charge_of_grenade = {
    color: ["#585858","#ffffff","#000000"],
    behavior: behaviors.POWDER,
    category: "better_grenades",
    state: "solid",
    tempHigh: 185,
    stateHigh: "explosion",
    tempLow: -200,
    stateLow: "ice"
};

elements.charge = {
    color: ["#006aff","#00b7ff","#00e1ff"],
    behavior: behaviors.POWDER,
                reactions: {
        "slime": { elem1:null, elem2:"charge_of_grenade", chance:0.1 },     
    },
    category: "better_grenades",
    state: "solid",
    tempHigh: 185,
    stateHigh: "explosion",
    tempLow: -200,
    stateLow: "ice"
};
