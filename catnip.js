// ============================================================================
// 🌿 CATNIP.JS MASTER MOD (With Automatic Water Mixing)
// Includes: catnip, frozen_catnip (hidden), catnip_water, and catnip_gas (hidden)
// ============================================================================

// Helper function to check if a pixel is a Cat or a Kitten
function isFeline(pixel) {
    return pixel && (pixel.element === "cat" || pixel.element === "kitten");
}

// 1. REGULAR CATNIP (POWDER FOOD - VISIBLE)
elements.catnip = {
    color: "#5cd65c", 
    category: "food", 
    behavior: behaviors.POWDER,
    state: "solid",
    density: 300,
    burn: 80,
    burnTime: 30,
    burnInto: "ash",
    tempLow: -10,             
    tempLowInto: "frozen_catnip",
    // 🧪 AUTOMATIC RECIPE: Dissolves into normal water to create Catnip Water!
    reactions: {
        "water": { elem1: null, elem2: "catnip_water" }
    },
    tick: function(pixel) {
        let checkOffsets = [{x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}];
        for (let offset of checkOffsets) {
            let neighbor = getPixel(pixel.x + offset.x, pixel.y + offset.y);
            if (isFeline(neighbor)) {
                deletePixel(pixel.x, pixel.y); 
                if (neighbor.vx !== undefined) neighbor.vx *= 3; 
                if (neighbor.vy !== undefined) neighbor.vy *= 3;
                break;
            }
        }
    }
};

// 2. FROZEN CATNIP (SOLID ICE - HIDDEN FROM MENU)
elements.frozen_catnip = {
    color: "#a3e5ff", 
    category: "food",
    behavior: behaviors.SOLID, 
    state: "solid",
    hidden: true,             
    tempHigh: 0,              
    tempHighInto: "catnip"
};

// 3. CATNIP WATER (LIQUID DRINK - VISIBLE)
elements.catnip_water = {
    color: "#4da6ff",         
    category: "food",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 1000,
    tempHigh: 100,            
    tempHighInto: "catnip_gas",
    tick: function(pixel) {
        let checkOffsets = [{x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}];
        for (let offset of checkOffsets) {
            let neighbor = getPixel(pixel.x + offset.x, pixel.y + offset.y);
            if (isFeline(neighbor)) {
                deletePixel(pixel.x, pixel.y); 
                if (neighbor.vx !== undefined) neighbor.vx *= 3; 
                if (neighbor.vy !== undefined) neighbor.vy *= 3;
                break;
            }
        }
    }
};

// 4. CATNIP GAS (SMELL COATING - HIDDEN FROM MENU)
elements.catnip_gas = {
    color: "#b3ffb3",         
    category: "food",
    behavior: behaviors.GAS,
    state: "gas",
    density: 1,
    hidden: true,             
    tick: function(pixel) {
        let checkOffsets = [{x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}];
        for (let offset of checkOffsets) {
            let neighbor = getPixel(pixel.x + offset.x, pixel.y + offset.y);
            if (isFeline(neighbor)) {
                deletePixel(pixel.x, pixel.y); 
                if (neighbor.vx !== undefined) neighbor.vx *= 3; 
                if (neighbor.vy !== undefined) neighbor.vy *= 3;
                break;
            }
        }
    }
};
