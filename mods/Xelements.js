/* =========================
   HALF-ELEMENTS MOD
   Auriel-style elements pack
   ========================= */

// Pneumyx (0.5)
elements.Px = {
    name: "Pneumyx",
    color: "#ff4fd8",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 0.02,
    conduct: 0,
    reactions: {}
};

// Dutryx (1.5)
elements.Dh = {
    name: "Dutryx",
    color: "#d9d9d9",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 0.08,
    reactions: {
        "oxygen": { elem1: "fire", elem2: null, chance: 0.3 }
    }
};

// Lexin (2.5 supercritical fluid)
elements.Lx = {
    name: "Lexin",
    color: "#6b6b6b",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 900,
    viscosity: 100,
    reactions: {}
};

// Cyxeni (5.5 crystal)
elements.Ci = {
    name: "Cyxeni",
    color: "#0a0a0a",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    hardness: 999,
    reactions: {}
};

// Nitrexon (6.5 gas)
elements.Nx = {
    name: "Nitrexon",
    color: "#cfcfcf",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 0.03,
    reactions: {
        "Px": { elem1: null, elem2: "acid_gas", chance: 0.2 }
    }
};

// Ozynyx (7.5 liquid)
elements.Oz = {
    name: "Ozynyx",
    color: "#e0ffff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1200,
    reactions: {}
};

// Sedex (explosive splitter)
elements.Sx = {
    name: "Sedex",
    color: "#ffcc00",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    reactions: {
        "water": { elem1: "hydrogen", elem2: "oxygen", chance: 0.5 },
        "oxygen": { elem1: "fire", elem2: null, chance: 0.4 },
        "nitrogen": { elem1: "plasma", elem2: null, chance: 0.2 }
    }
};

// Luminexium (insulator metal)
elements.Lu = {
    name: "Luminexium",
    color: "#fff2a8",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    conduct: 0.01,
    reactions: {}
};

// Zexen (ion fuel liquid)
elements.Zx = {
    name: "Zexen",
    color: "#b388ff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1500,
    reactions: {}
};

// Glandex (super conductor metal)
elements.Gx = {
    name: "Glandex",
    color: "#2b2bff",
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    conduct: 1,
    reactions: {}
};