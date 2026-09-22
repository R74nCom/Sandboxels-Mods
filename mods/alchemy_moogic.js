// Sandboxels Custom Mod: Magic & Explosions
// Elements: Aether, Philosopher's Stone, and Mana Crystal

// 1. Define Aether (Glows and has multiple color variants)
elements.aether = {
    color: ["#8a2be2", "#da70d6", "#ba55d3"], // Color array creates natural pixel variation
    behavior: behaviors.GAS,
    category: "energy",
    state: "gas",
    density: 0.5,
    glow: true,
    reactions: {
        "water": { elem1: null, elem2: "potion" },
        "fire": { elem1: "plasma", elem2: "plasma" }
    }
};

// 2. Define Philosopher's Stone
elements.philosophers_stone = {
    color: "#e60000",
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 5000,
    conduct: 1,
    reactions: {
        "iron": { elem1: "philosophers_stone", elem2: "gold" },
        "copper": { elem1: "philosophers_stone", elem2: "gold" },
        "lead": { elem1: "philosophers_stone", elem2: "gold" }
    }
};

// 3. Define Potion
elements.potion = {
    color: "#00ffcc",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1000,
    viscosity: 10
};

// 4. NEW: Mana Crystal (Animated Texture + Explosion Reaction)
elements.mana_crystal = {
    // Array with percentage (%) signs forces the engine to shift colors like a glittering gemstone
    color: ["#0000ff", "#1e90ff%", "#00ffff%", "#4169e1"], 
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 3000,
    tempHigh: 500,
    stateHigh: "magma", // Melts to magma if overheated
    reactions: {
        // When touched by Fire or Plasma, it vanishes and triggers a heavy physical explosion
        "fire": { elem1: "explosion", elem2: "explosion" },
        "plasma": { elem1: "explosion", elem2: "explosion" },
        "aether": { elem1: "mana_crystal", elem2: "mana_crystal", chance: 0.1 } // Growing crystal effect
    }
};

// 5. Force UI to refresh if injected over console
if (typeof initUI === "function") {
    initUI();
}
