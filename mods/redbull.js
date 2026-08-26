elements.redbull = {
    color: "#f5d35c",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 2,
    reactions: {
        "fire": { elem1: "steam", elem2: "sugar", force: true },
        "human": { elem1: null, elem2: "energy" },
        "rat": { elem1: null, elem2: "energy" },
        "acid": { elem1: "gas", elem2: null }
    }
};

if (!elements.redbull.onBurn) {
    elements.redbull.onBurn = function(pixel) {
        changePixel(pixel, "sugar");
        createPixel("carbon_dioxide", pixel.x, pixel.y - 1);
        createPixel("steam", pixel.x + 1, pixel.y);
    }
}
if (!elements.redbull.tick) {
    elements.redbull.tick = function(pixel) {
        if (Math.random() < 0.02) {
            if (isEmpty(pixel.x, pixel.y - 1)) {
                createPixel("foam", pixel.x, pixel.y - 1);
            }
        }
    }
}

elements.redbull_ice = {
    color: "#bce6f2",
    behavior: behaviors.WALL,
    category: "solids",
    tempHigh: 0,
    stateHigh: "redbull"
};
elements.redbull_can = {
    color: "#cbd5e1",
    behavior: behaviors.WALL,
    category: "solids",
    density: 2700,
    tempHigh: 660,
    stateHigh: "molten_aluminum",
    burn: 100,
    burnTime: 2,
    burnInto: "molten_aluminum"
};

if (!elements.redbull_can.onBurn) {
    elements.redbull_can.onBurn = function(pixel) {
        changePixel(pixel, "molten_aluminum");
        createPixel("carbon_dioxide", pixel.x, pixel.y - 2);
        createPixel("water", pixel.x - 1, pixel.y + 1);
        createPixel("sugar", pixel.x + 1, pixel.y + 1);
    }
}

if (!elements.redbull_can.onCrush) {
    elements.redbull_can.onCrush = function(pixel) {
        changePixel(pixel, "metal_scrap");
        createPixel("redbull", pixel.x, pixel.y - 1);
        createPixel("redbull", pixel.x + 1, pixel.y);
    }
}


