// Sandboxels Mod: Petroleum Raffinerie & Verbleites Benzin
// Folgt der offiziellen Sandboxels API

// 1. NEUE ELEMENTE DEFINIEREN
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
    tempHigh: 370, // Schmilzt relativ leicht
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
    burnTime: 80, // Brennt SCHNELLER aus (niedrige burnTime)
    flammability: 75,
};

elements.refinered_diesel = {
    color: "#d1b87d",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 820,
    burn: 70,
    burnTime: 300, // Brennt extrem lange und sauber
    flammability: 55,
};

elements.leaded_gasoline = {
    color: "#c74626", // Rötlich gefärbt wie historisches verbleites Benzin
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 760,
    burn: 88,
    burnTime: 130,
    flammability: 95,
    fireColor: ["#ff4500", "#e6c300"],
    // Wird es verbrannt, brennt es zu "lead_gas" ab (1/3 Chance)
    burnInto: ["fire", "fire", "lead_gas"], 
};

elements.gasoline_e10 = {
    color: "#b5cc74",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 745,
    burn: 82,
    burnTime: 180, // Brennt LÄNGER als normales Gasoline (120)
    flammability: 90,
};

elements.lead_gas = {
    color: "#545956",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 5,
    time: 400, // Verzieht sich nach einer Weile
    burn: false,
};

// 2. DIE RAFFINERIE-MASCHINE (Logik per Custom Behavior)
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
    // Eigene Tick-Funktion für das Einsaugen von Oben und Ausgeben nach Unten
    tick: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;

        // 1. Element von OBEN einsaugen (y - 1)
        if (!isEmpty(x, y - 1, true)) {
            var topPixel = pixelMap[x][y - 1];
            
            // Wenn oben Rohdiesel ist -> wird im Filter zu normalem Diesel
            if (topPixel.element === "crude_diesel") {
                pixel.storedElement = "diesel";
                deletePixel(x, y - 1);
            } 
            // Wenn oben normaler Diesel ist -> wird zu raffiniertem Diesel
            else if (topPixel.element === "diesel") {
                pixel.storedElement = "refinered_diesel";
                deletePixel(x, y - 1);
            }
        }

        // 2. Gespeichertes Element nach UNTEN ausgeben (y + 1)
        if (pixel.storedElement) {
            if (isEmpty(x, y + 1)) {
                createPixel(pixel.storedElement, x, y + 1);
                pixel.storedElement = null; // Speicher leeren
            }
        }
    }
};

// 3. REAKTIONEN & INTERAKTIONEN NACH DEM LADEN
runAfterLoad(function() {
    
    // Blei zerstampfen (Lead + Smash tool/Logik -> Lead Powder)
    if (elements.lead) {
        if (!elements.lead.reactions) elements.lead.reactions = {};
        // Sandboxels nutzt "smash" oder "rock"/"stone" oft als Trigger für Physisches Zerstören
        elements.lead.reactions.smash = { elem1: "lead_powder", elem2: null };
        elements.lead.reactions.anvil = { elem1: "lead_powder", elem2: "anvil" };
    }

    // Legierung herstellen (Molten Sodium + Molten Lead = Molten Sodium Lead Alloy)
    if (elements.molten_sodium && elements.molten_lead) {
        if (!elements.molten_sodium.reactions) elements.molten_sodium.reactions = {};
        elements.molten_sodium.reactions.molten_lead = { 
            elem1: "molten_sodium_lead_alloy", 
            elem2: "molten_sodium_lead_alloy" 
        };
    }

    // Tetraethyl-Blei Herstellung (Sodium Lead Alloy + Ethyl Chloride = Tetraethyl Lead)
    if (!elements.sodium_lead_alloy.reactions) elements.sodium_lead_alloy.reactions = {};
    elements.sodium_lead_alloy.reactions.ethyl_chloride = {
        elem1: "tetraethyl_lead",
        elem2: "salt", // Chemisches Nebenprodukt (Natriumchlorid)
        chance: 0.3
    };

    // Verbleites Benzin (Gasoline + Tetraethyl Lead = Leaded Gasoline)
    if (elements.gasoline) {
        if (!elements.gasoline.reactions) elements.gasoline.reactions = {};
        elements.gasoline.reactions.tetraethyl_lead = {
            elem1: "leaded_gasoline",
            elem2: "leaded_gasoline"
        };
        
        // E10 Benzin (Gasoline + Ethanol = Gasoline E10)
        elements.gasoline.reactions.ethanol = {
            elem1: "gasoline_e10",
            elem2: "gasoline_e10"
        };
    }

    // Bleigas vergiftet Menschen (Lead Gas + Human = 10% Chance zu töten / Fleisch zu zerstören)
    if (elements.human) {
        if (!elements.lead_gas.reactions) elements.lead_gas.reactions = {};
        elements.lead_gas.reactions.human = {
            elem1: "lead_gas",
            elem2: "meat", // Verwandelt den Menschen in totes Fleisch
            chance: 0.10
        };
        // Falls der Kopf getroffen wird
        elements.lead_gas.reactions.head = {
            elem1: "lead_gas",
            elem2: "blood",
            chance: 0.10
        };
    }
});
