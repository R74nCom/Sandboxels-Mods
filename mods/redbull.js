elements.redbull = {
    color: "#f5d35c",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 2,
    reactions: {
        "fire": { elem1: "water", elem2: "sugar", force: true },
        "human": { elem1: null, elem2: "energy" },
        "rat": { elem1: null, elem2: "energy" },
        "acid": { elem1: "gas", elem2: null }
    }
};

if (!elements.redbull.onBurn) {
    elements.redbull.onBurn = function(pixel) {
        changePixel(pixel, "sugar");
        createPixel("carbon_dioxide", pixel.x, pixel.y - 1);
        createPixel("water", pixel.x + 1, pixel.y);
    }
}
