elements.explosiver_lighter_fluid = {
    color: "#ff3300",
    behavior: behaviors.LIQUID,
    state: "liquid",
    density: 800,
    category: "liquids",
    tick: function(pixel) {
        // Trigger condition: touches fire OR heats up over 250°C
        if (pixel.temp > 250) {
            pixel.element = "explosion";
        }
    },
    reactions: {
        "fire": { elem1: "explosion", elem2: "explosion" }
    }
};