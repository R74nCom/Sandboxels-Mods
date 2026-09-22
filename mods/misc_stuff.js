//alert("This is a developer alert. This is not an error message. If you see this, everything is running just fine! Hope you enjoy this mod!");

elements.stopper_fluid = {
    color: "#ffbb00",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1000,
    viscosity: 10000,

    tick: function(pixel) {
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;

                var neighbor = pixelMap[pixel.x + dx]?.[pixel.y + dy];

                if (neighbor && elements[neighbor.element].state === "liquid") {
                    neighbor.vx = 0;
                    neighbor.vy = 0;
                }
            }
        }
    }
};

elements.graham_cracker = {
    color: "#ffc37b",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 500,
    breakInto: "crumb"
};

elements.vomit = {
    color: "#ABC123",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1050,
    viscosity: 3000
};

elements.egg.tempHigh = 120;
elements.egg.stateHigh = "exploding_egg";

var explodingEggRadius = 3;
var explodingEggExplosion = ["steam", "steam", "fire", "plasma", "yolk"];

elements.exploding_egg = {
    color: "#fff9e2",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 800,

    tempHigh: 150,
    stateHigh: "explosion",

    breakInto: "explosion",

    tick: function(pixel) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (!outOfBounds(x, y) && !isEmpty(x, y, true)) {
                    explodeAt(
                        pixel.x,
                        pixel.y,
                        explodingEggRadius,
                        explodingEggExplosion
                    );
                    return;
                }
            }
        }
    },

    onMix: function(pixel) {
        explodeAt(
            pixel.x,
            pixel.y,
            explodingEggRadius,
            explodingEggExplosion
        );
    },

    onBreak: function(pixel) {
        explodeAt(
            pixel.x,
            pixel.y,
            explodingEggRadius,
            explodingEggExplosion
        );
    }
};

var explodingGrapeRadius = 1;
var explodingGrapeExplosion = ["steam", "steam", "fire", "plasma", "juice"];

elements.exploding_grape = {
    color: "#743563",
    behavior: behaviors.POWDER,
    category: "food",
    state: "solid",
    density: 300,

    tempHigh: 120,
    stateHigh: "explosion",

    breakInto: "explosion",

    tick: function(pixel) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (!outOfBounds(x, y) && !isEmpty(x, y, true)) {
                    explodeAt(
                        pixel.x,
                        pixel.y,
                        explodingGrapeRadius,
                        explodingGrapeExplosion
                    );
                    return;
                }
            }
        }
    },

    onMix: function(pixel) {
        explodeAt(
            pixel.x,
            pixel.y,
            explodingGrapeRadius,
            explodingGrapeExplosion
        );
    },

    onBreak: function(pixel) {
        explodeAt(
            pixel.x,
            pixel.y,
            explodingGrapeRadius,
            explodingGrapeExplosion
        );
    }
};

elements.pine_soda = {
    color: "#416f3f",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1005,
    viscosity: 10,

    tick: function(pixel) {
        if (Math.random() < 0.01 && isEmpty(pixel.x, pixel.y - 1)) {
            createPixel("foam", pixel.x, pixel.y - 1);
        }
    },

    onMix: function(pixel) {
        if (Math.random() < 0.25 && isEmpty(pixel.x, pixel.y - 1)) {
            createPixel("foam", pixel.x, pixel.y - 1);
        }
    }
};

elements.jelly_powder = {
    color: "#7b3fC6",
    behavior: behaviors.POWDER,
    category: "food",
    state: "powder",
    density: 1000,

    reactions: {
        "water": {
            elem1: "jelly_solution",
            elem2: null
        }
    }
};

elements.jelly_solution = {
    color: "#a93c8f",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    density: 1050,
    viscosity: 20,

    tempLow: 0,
    stateLow: "jelly"
};

elements.sourdough_starter = {
    color: "#C89F6A",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    density: 1100,
    viscosity: 8000,

    tempHigh: 94,
    stateHigh: "sourdough",

    tick: function(pixel) {
        if (Math.random() < 0.005 && isEmpty(pixel.x, pixel.y - 1)) {
            createPixel("foam", pixel.x, pixel.y - 1);
        }
    }
};

elements.sourdough = {
    color: "#D69B5B",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    density: 230,

    tempHigh: 176,
    stateHigh: "toast",

    burn: 5,
    burnTime: 200,
    burnInto: "ash"
};

if (!elements.batter.reactions) {
    elements.batter.reactions = {};
}

elements.batter.reactions["yeast"] = {
    elem1: "sourdough_starter",
    elem2: null
};

elements.cinnamon_milk = {
    color: "#c1a089",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    density: 1050,
    viscosity: 10
};

elements.cinnamon = {
    color: "#82431f",
    behavior: behaviors.POWDER,
    category: "food",
    state: "powder",
    density: 550
};

elements.cinnamon_stick = {
    color: "#733818",
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "powder",
    density: 550

    breakInto: "cinnamon"
};
