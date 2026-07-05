// Sandboxels Mod: Petroleum & Ethanol
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
    flammability: 60, // Diesel entflammt schwerer als Benzin
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
    fireColor: ["#3366ff", "#00aeff"], // Brennt mit bläulicher Flamme
    flammability: 80,
    conduct: 0,
};

elements.heavy_oil = {
    color: "#1a1613",
    behavior: behaviors.POWDER, // Feststoff / Pulverform wie gewünscht
    category: "solids",
    state: "solid",
    density: 980,
    burn: 60,
    burnTime: 400, // Brennt sehr lange
    fireColor: ["#ff3300", "#333333"], // Rußige Flamme
    flammability: 30,
    conduct: 0,
};

// 2. Reaktionen hinzufügen (Optional, aber realistisch)
// Wenn Heavy Oil sehr heiß wird (>300°C), schmilzt es oder brennt
if (!elements.heavy_oil.reactions) elements.heavy_oil.reactions = {};
elements.heavy_oil.reactions.fire = { elem1: "fire", elem2: "fire", chance: 0.3 };

// Ethanol kann aus Zucker/Pflanzen entstehen (Beispiel-Interaktion mit Hefe/Yeast falls vorhanden)
if (elements.yeast) {
    if (!elements.yeast.reactions) elements.yeast.reactions = {};
    elements.yeast.reactions.sugar = { elem1: "ethanol", elem2: "ethanol", chance: 0.05 };
}
