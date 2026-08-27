// Sandboxels Mod: Radio Waves, Antennas and Receivers

// 1. Definition der Elemente
elements.radio_antenna = {
    color: "#a9a9a9",
    behavior: behaviors.SOLID,
    category: "machines",
    state: "solid",
    density: 7000,
    conduct: 1, // Leitet Elektrizität
    // Wenn das Element Elektrizität (charge) hat, löst es das Verhalten aus
    behaviorOnCharge: function(pixel) {
        // Erzeugt Radiowellen in alle Richtungen, außer nach unten
        var directions = [
            [-1, -1], [0, -1], [1, -1], // Oben links, Oben, Oben rechts
            [-1, 0],           [1, 0]   // Links, Rechts
        ];
        
        for (var i = 0; i < directions.length; i++) {
            var targetX = pixel.x + directions[i][0];
            var targetY = pixel.y + directions[i][1];
            
            // Wenn der Zielplatz frei ist, setze eine Radiowelle dorthin
            if (isEmpty(targetX, targetY)) {
                createPixel("radio_wave", targetX, targetY);
            }
        }
    }
};

elements.molten_radio_antenna = {
    color: "#dca36c",
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    density: 6500,
    temp: 1000,
    // Kühlt ab und wird wieder zur Radio-Antenne
    tempHigh: 1500,
    stateHigh: "gas",
    tempLow: 600,
    stateLow: "radio_antenna"
};

elements.radio_wave = {
    color: "#00ffff",
    // Nutzt das GAS-Verhalten, damit es sich frei ausbreitet und flüchtig wirkt
    behavior: behaviors.GAS,
    category: "energy",
    state: "gas",
    density: 1,
    timeToLive: 20, // Verschwindet nach kurzer Zeit von alleine (Dämpfung)
    tick: function(pixel) {
        // Optionale Zusatzlogik für den Zerfall, falls timeToLive abläuft
        pixel.timeToLive--;
        if (pixel.timeToLive <= 0) {
            deletePixel(pixel.x, pixel.y);
        }
    }
};

elements.radio_receiver = {
    color: "#cd7f32",
    behavior: behaviors.SOLID,
    category: "machines",
    state: "solid",
    density: 7500,
    conduct: 1,
    tick: function(pixel) {
        // Prüft die umliegenden Pixel nach Radiowellen
        var neighbors = [
            [-1, -1], [0, -1], [1, -1],
            [-1, 0],           [1, 0],
            [-1, 1],  [0, 1],  [1, 1]
        ];
        
        for (var i = 0; i < neighbors.length; i++) {
            var targetX = pixel.x + neighbors[i][0];
            var targetY = pixel.y + neighbors[i][1];
            
            if (!isEmpty(targetX, targetY, true)) {
                var neighborPixel = pixelMap[targetX][targetY];
                if (neighborPixel.element === "radio_wave") {
                    // Wenn eine Radiowelle berührt wird, setze das Element unter Strom
                    pixel.charge = 4; 
                    // Löscht die Radiowelle, da sie "empfangen" bzw. absorbiert wurde
                    deletePixel(targetX, targetY);
                    break;
                }
            }
        }
    }
};

elements.molten_receiver = {
    color: "#b07050",
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    density: 7000,
    temp: 1200,
    tempLow: 800,
    stateLow: "radio_receiver"
};

// 2. Chemische Reaktionen für die Herstellung
// Mischung aus geschmolzenem Aluminium und geschmolzenem Kupfer ergibt geschmolzene Antenne
reactions.molten_aluminum = {
    "molten_copper": { elem1: "molten_radio_antenna", elem2: "molten_radio_antenna" }
};

// Mischung aus geschmolzenem Kupfer und geschmolzenem Stahl ergibt geschmolzenen Empfänger
reactions.molten_copper = {
    "molten_steel": { elem1: "molten_receiver", elem2: "molten_receiver" },
    // Bestehende Reaktionen beibehalten (wichtig, falls molten_copper bereits Reaktionen im Core-Spiel hat)
    ...reactions.molten_copper 
};
