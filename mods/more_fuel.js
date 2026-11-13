// Sandboxels Mod: Das ultimative Petroleum-, Raffinerie- & Blei-System
// Folgt der offiziellen Sandboxels API

// ==========================================
// 1. ALLE ELEMENTE DEFINIEREN
// ==========================================

elements.gasoline = {
    color: "#e5c158",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 1,
    state: "liquid",
    density: 740,
    burn: 85,
    burnTime: 120,
    fireColor: ["#ff6a00", "#ffb300"],
    flammability: 95,
    conduct: 0,
};

elements.diesel = {
    color: "#bc9c4c",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 3,
    state: "liquid",
    density: 830,
    burn: 75,
    burnTime: 200,
    fireColor: ["#ff4500", "#ffaa00"],
    flammability: 60,
    conduct: 0,
};

elements.ethanol = {
    color: "#d6f5ff",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 1.2,
    state: "liquid",
    density: 789,
    burn: 80,
    burnTime: 100,
    fireColor: ["#3366ff", "#00aeff"],
    flammability: 80,
    conduct: 0,
};

elements.heavy_oil = {
    color: "#1a1613",
    behavior: behaviors.POWDER, // Feststoff / Pulverform
    category: "solids",
    state: "solid",
    density: 980,
    burn: 60,
    burnTime: 400,
    fireColor: ["#ff3300", "#333333"],
    flammability: 30,
    conduct: 0,
};

elements.lead_powder = {
    color: "#4a4e51",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    density: 11340,
    conduct: 0.1,
};

elements.sodium_lead_alloy = {
    color: "#707880",
    behavior: behaviors.POWDER,
    category: "solids",
    state: "solid",
    density: 6000,
    conduct: 0.4,
    tempHigh: 370,
    meltInto: "molten_sodium_lead_alloy",
};

elements.molten_sodium_lead_alloy = {
    color: "#b0b8c0",
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    density: 5500,
    conduct: 0.4,
    tempLow: 369,
    freezeInto: "sodium_lead_alloy",
};

elements.ethyl_chloride = {
    color: "#c2e1f5",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 890,
    burn: 50,
    burnTime: 80,
    flammability: 70,
};

elements.tetraethyl_lead = {
    color: "#8a968d",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1650,
    burn: 40,
    burnTime: 150,
    flammability: 40,
};

elements.crude_diesel = {
    color: "#6e5d34",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 850,
    burn: 90,
    burnTime: 80, // Brennt schneller aus
    flammability: 75,
};

elements.refinered_diesel = {
    color: "#d1b87d",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 820,
    burn: 70,
    burnTime: 300, // Brennt sehr lange
    flammability: 55,
};

elements.leaded_gasoline = {
    color: "#c74626",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 760,
    burn: 88,
    burnTime: 130,
    flammability: 95,
    fireColor: ["#ff4500", "#e6c300"],
    burnInto: ["fire", "fire", "lead_gas"], // 1/3 Chance für Bleigas beim Verbrennen
};

elements.gasoline_e10 = {
    color: "#b5cc74",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 745,
    burn: 82,
    burnTime: 180, // Brennt länger als Benzin
    flammability: 90,
};

elements.lead_gas = {
    color: "#545956",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 5,
    time: 400,
    burn: false,
};

// ==========================================
// 2. DIE DISEL-RAFFINERIE MASCHINE
// ==========================================
elements.diesel_refinery = {
    color: "#47525e",
    behavior: [
        ["XX", "XX", "XX"],
        ["XX", "CH", "XX"],
        ["XX", "XX", "XX"]
    ],
    category: "machines",
    state: "solid",
    density: 10000,
    conduct: 0,
    tick: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;

        // Oben einsaugen
        if (!isEmpty(x, y - 1, true)) {
            var topPixel = pixelMap[x][y - 1];
            if (topPixel.element === "crude_diesel") {
                pixel.storedElement = "diesel";
                deletePixel(x, y - 1);
            } 
            else if (topPixel.element === "diesel") {
                pixel.storedElement = "refinered_diesel";
                deletePixel(x, y - 1);
            }
        }

        // Unten ausgeben
        if (pixel.storedElement) {
            if (isEmpty(x, y + 1)) {
                createPixel(pixel.storedElement, x, y + 1);
                pixel.storedElement = null;
            }
        }
    }
};

// ==========================================
// 3. ALLE INTERAKTIONEN & REAKTIONEN
// ==========================================
runAfterLoad(function() {
    
    // --- DESTILLATIONS-LOGIK (Öl erhitzen) ---
    if (elements.oil) {
        // Öl wird bei 120°C (393 K) zu Benzin
        elements.oil.tempHigh = 393;
        elements.oil.burnInto = "gasoline";
        
        // ÖL REAKTIONEN (Sicherstellen, dass Reaktionen existieren)
        if (!elements.oil.reactions) elements.oil.reactions = {};
        
        // Öl + Kohle = Schweröl (Heavy Oil)
        if (elements.coal) {
            elements.oil.reactions.coal = { elem1: "heavy_oil", elem2: "heavy_oil", chance: 0.2 };
        }
        if (elements.charcoal) {
            elements.oil.reactions.charcoal = { elem1: "heavy_oil", elem2: "heavy_oil", chance: 0.2 };
        }
    }

    // Benzin spaltet sich bei 130°C (403 K) auf in Diesel und Schwefel
    if (!elements.gasoline.reactions) elements.gasoline.reactions = {};
    elements.gasoline.reactions.steam = { 
        tempMin: 403, 
        elem1: "diesel", 
        elem2: "sulfur", 
        chance: 0.5 
    };

    // --- BENZIN MISCHUNGEN ---
    // Benzin + Ethanol = E10
    elements.gasoline.reactions.ethanol = {
        elem1: "gasoline_e10",
        elem2: "gasoline_e10"
    };

    // Benzin + Tetraethyl-Blei = Verbleites Benzin
    elements.gasoline.reactions.tetraethyl_lead = {
        elem1: "leaded_gasoline",
        elem2: "leaded_gasoline"
    };

    // --- SCHWERÖL ---
    if (!elements.heavy_oil.reactions) elements.heavy_oil.reactions = {};
    elements.heavy_oil.reactions.fire = { elem1: "fire", elem2: "fire", chance: 0.3 };

    // --- BLEI ZERSTAMPFEN ---
    if (elements.lead) {
        if (!elements.lead.reactions) elements.lead.reactions = {};
        elements.lead.reactions.smash = { elem1: "lead_powder", elem2: null };
        elements.lead.reactions.anvil = { elem1: "lead_powder", elem2: "anvil" };
    }

    // --- NATRIUM-BLEI-LEGIERUNG ---
    if (elements.molten_sodium && elements.molten_lead) {
        if (!elements.molten_sodium.reactions) elements.molten_sodium.reactions = {};
        elements.molten_sodium.reactions.molten_lead = { 
            elem1: "molten_sodium_lead_alloy", 
            elem2: "molten_sodium_lead_alloy" 
        };
    }

    // --- TETRAETHYL-BLEI REAKTION ---
    if (!elements.sodium_lead_alloy.reactions) elements.sodium_lead_alloy.reactions = {};
    elements.sodium_lead_alloy.reactions.ethyl_chloride = {
        elem1: "tetraethyl_lead",
        elem2: "salt",
        chance: 0.3
    };

    // --- BIOLOGISCHE GÄRUNG (Ethanol) ---
    if (elements.yeast && elements.sugar) {
        if (!elements.yeast.reactions) elements.yeast.reactions = {};
        elements.yeast.reactions.sugar = { elem1: "ethanol", elem2: "ethanol", chance: 0.05 };
    }

    // --- BLEIGAS VERGIFTUNG (10% Chance Menschen zu töten) ---
    if (elements.human) {
        if (!elements.lead_gas.reactions) elements.lead_gas.reactions = {};
        elements.lead_gas.reactions.human = {
            elem1: "lead_gas",
            elem2: "meat",
            chance: 0.10
        };
        elements.lead_gas.reactions.head = {
            elem1: "lead_gas",
            elem2: "blood",
            chance: 0.10
        };
    }
});
