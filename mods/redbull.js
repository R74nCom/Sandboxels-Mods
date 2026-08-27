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
    color: "#f8e28d",
    behavior: behaviors.WALL,
    category: "solids",
    tempHigh: 0,
    stateHigh: "redbull"
};
if (!elements.redbull_ice.onCrush) {
    elements.redbull_ice.onCrush = function(pixel) {
        changePixel(pixel, "redbull_slush");
    }
}

elements.redbull_can = {
    color: "#3671C6",
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
elements.redbull_slush = {
    color: "#f8e28d",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 15,
    tempHigh: 5,
    stateHigh: "redbull",
    tempLow: -5,
    stateLow: "redbull_ice"
elements.redbull_ice.tempHigh = -4;
elements.redbull_ice.stateHigh = "redbull_slush";
};
elements.redbull_sugarfree = {
    color: "#f5d35c",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 2,
    reactions: {
        "fire": { elem1: "steam", elem2: "carbon_dioxide", force: true },
        "human": { elem1: null, elem2: "energy" },
        "rat": { elem1: null, elem2: "energy" },
        "acid": { elem1: "gas", elem2: null }
    }
};

if (!elements.redbull_sugarfree.onBurn) {
    elements.redbull_sugarfree.onBurn = function(pixel) {
        createPixel("carbon_dioxide", pixel.x, pixel.y - 1);
        createPixel("steam", pixel.x + 1, pixel.y);
    }
}
if (!elements.redbull_sugarfree.tick) {
    elements.redbull_sugarfree.tick = function(pixel) {
        if (Math.random() < 0.02) {
            if (isEmpty(pixel.x, pixel.y - 1)) {
                createPixel("foam", pixel.x, pixel.y - 1);
            }
        }
    }
}

elements.redbull_sugarfree_ice = {
    color: "#f8e28d",
    behavior: behaviors.WALL,
    category: "solids",
    tempHigh: 0,
    stateHigh: "redbull_sugarfree"
};
if (!elements.redbull_sugarfree_ice.onCrush) {
    elements.redbull_sugarfree_ice.onCrush = function(pixel) {
        changePixel(pixel, "redbull_sugarfree_slush");
    }
}

elements.redbull_sugarfree_can = {
    color: "#3671c6",
    behavior: behaviors.WALL,
    category: "solids",
    density: 2700,
    tempHigh: 660,
    stateHigh: "molten_aluminum",
    burn: 100,
    burnTime: 2,
    burnInto: "molten_aluminum"
};

if (!elements.redbull_sugarfree_can.onBurn) {
    elements.redbull_sugarfree_can.onBurn = function(pixel) {
        changePixel(pixel, "molten_aluminum");
        createPixel("carbon_dioxide", pixel.x, pixel.y - 2);
        createPixel("water", pixel.x - 1, pixel.y + 1);
    }
}

if (!elements.redbull_sugarfree_can.onCrush) {
    elements.redbull_sugarfree_can.onCrush = function(pixel) {
        changePixel(pixel, "metal_scrap");
        createPixel("redbull_sugarfree", pixel.x, pixel.y - 1);
        createPixel("redbull_sugarfree", pixel.x + 1, pixel.y);
    }
}
elements.redbull_sugarfree_slush = {
    color: "#f8e28d",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 15,
    tempHigh: 5,
    stateHigh: "redbull_sugarfree",
    tempLow: -5,
    stateLow: "redbull_sugarfree_ice"
};

elements.redbull_sugarice.tempHigh = -4;
elements.redbull_ice.stateHigh = "redbull_sugarfree_slush";
elements.redbull = {
    
    elements.redbull_zero = {
    color: "#f5d35c",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 2,
    reactions: {
        "fire": { elem1: "steam", elem2: "null", force: true },
        "human": { elem1: null, elem2: "energy" },
        "rat": { elem1: null, elem2: "energy" },
        "acid": { elem1: "gas", elem2: null }
    }
};

if (!elements.redbull_zero.onBurn) {
    elements.redbull_zero.onBurn = function(pixel) {
        createPixel("carbon_dioxide", pixel.x, pixel.y - 1);
        createPixel("steam", pixel.x + 1, pixel.y);
    }
}
if (!elements.redbull_zero.tick) {
    elements.redbull_zero.tick = function(pixel) {
        if (Math.random() < 0.02) {
            if (isEmpty(pixel.x, pixel.y - 1)) {
                createPixel("foam", pixel.x, pixel.y - 1);
            }
        }
    }
}

elements.redbull_zero_ice = {
    color: "#f8e28d",
    behavior: behaviors.WALL,
    category: "solids",
    tempHigh: 0,
    stateHigh: "redbull_zero"
};
if (!elements.redbull_zero_ice.onCrush) {
    elements.redbull_zero_ice.onCrush = function(pixel) {
        changePixel(pixel, "redbull_zero_slush");
    }
}

elements.redbull_zero_can = {
    color: "#3671C6",
    behavior: behaviors.WALL,
    category: "solids",
    density: 2700,
    tempHigh: 660,
    stateHigh: "molten_aluminum",
    burn: 100,
    burnTime: 2,
    burnInto: "molten_aluminum"
};

if (!elements.redbull_zero_can.onBurn) {
    elements.redbull_zero_can.onBurn = function(pixel) {
        changePixel(pixel, "molten_aluminum");
        createPixel("carbon_dioxide", pixel.x, pixel.y - 2);
        createPixel("water", pixel.x - 1, pixel.y + 1);
    }
}

if (!elements.redbull_zero_can.onCrush) {
    elements.redbull_can.onCrush = function(pixel) {
        changePixel(pixel, "metal_scrap");
        createPixel("redbull_zero", pixel.x, pixel.y - 1);
        createPixel("redbull_zero", pixel.x + 1, pixel.y);
    }
}
elements.redbull_zero_slush = {
    color: "#f8e28d",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 15,
    tempHigh: 5,
    stateHigh: "redbull_zero",
    tempLow: -5,
    stateLow: "redbull_zero_ice"
elements.redbull_ice.tempHigh = -4;
elements.redbull_ice.stateHigh = "redbull_zero_slush";
}



