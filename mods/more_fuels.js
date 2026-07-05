// Sandboxels Mod: Petroleum-Destillation & Ethanol
// Folgt der offiziellen Sandboxels API

// 1. Elemente definieren
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
    behavior: behaviors.POWDER, // Feststoff/Pulver wie gewünscht
    category: "solids",
    state: "solid",
    density: 980,
    burn: 60,
    burnTime: 400,
    fireColor: ["#ff3300", "#333333"],
    flammability: 30,
    conduct: 0,
};

// 2. Destillations- und Mischlogik nach dem Laden der Elemente ausführen
// (Das stellt sicher, dass das Standard-Öl, Kohle und Schwefel bereits existieren)
runAfterLoad(function() {
    
    // --- DESTILLATION (Temperatur-Reaktionen für Öl) ---
    if (elements.oil) {
        // Bei ca. 120°C (393 Kelvin) wird Öl zu Benzin (Gasoline)
        elements.oil.tempHigh = 393;
        elements.oil.burnInto = "gasoline";
        
        // Bei ca. 130°C (403 Kelvin) spaltet sich das Benzin/Öl weiter auf.
        // Um die Gleichzeitigkeit von Diesel und Schwefel (Sulfur) darzustellen,
        // nutzen wir eine Reaktion, wenn Benzin noch heißer wird oder Öl direkt auf 130°C springt.
        if (!elements.gasoline.reactions) elements.gasoline.reactions = {};
        elements.gasoline.reactions.steam = { 
            tempMin: 403, 
            elem1: "diesel", 
            elem2: "sulfur", 
            chance: 0.5 
        };
        
        // --- MISCHUNG (Öl + Kohle = Heavy Oil) ---
        if (!elements.oil.reactions) elements.oil.reactions = {};
        
        // Wenn Öl auf Kohle (coal) trifft, entsteht Schweröl (heavy_oil)
        if (elements.coal) {
            elements.oil.reactions.coal = { elem1: "heavy_oil", elem2: "heavy_oil", chance: 0.2 };
        }
        // Falls der Spieler "charcoal" (Holzkohle) benutzt, soll es auch klappen
        if (elements.charcoal) {
            elements.oil.reactions.charcoal = { elem1: "heavy_oil", elem2: "heavy_oil", chance: 0.2 };
        }
    }

    // --- ZUSATZ-REAKTIONEN ---
    // Heavy Oil brennt träge
    if (!elements.heavy_oil.reactions) elements.heavy_oil.reactions = {};
    elements.heavy_oil.reactions.fire = { elem1: "fire", elem2: "fire", chance: 0.3 };

    // Ethanol-Herstellung über Hefe (Yeast) + Zucker (Sugar)
    if (elements.yeast && elements.sugar) {
        if (!elements.yeast.reactions) elements.yeast.reactions = {};
        elements.yeast.reactions.sugar = { elem1: "ethanol", elem2: "ethanol", chance: 0.05 };
    }
});
