// ======================================================
// SURVIVAL LIFE EXPANSION MOD
// biome animals + evolution + chemistry system
// ======================================================

runAfterLoad(function() {

    // ======================================================
    // SAFE NEIGHBOR HELPER
    // ======================================================

    function forEachNeighbor(pixel, callback) {

        const dirs = [
            [1,0],[-1,0],[0,1],[0,-1],
            [1,1],[-1,-1],[1,-1],[-1,1]
        ];

        for (let i = 0; i < dirs.length; i++) {

            let x = pixel.x + dirs[i][0];
            let y = pixel.y + dirs[i][1];

            if (!outOfBounds(x, y) && pixelMap[x][y]) {
                callback(pixelMap[x][y]);
            }
        }
    }

    // ======================================================
    // CUSTOM BIOME MOVEMENT
    // ======================================================

    behaviors.biomeBehavior = [
        "M2%3|XX|M2%3",
        "M2%3|XX|M2%3",
        "XX|M1|XX",
    ];

    // ======================================================
    // FOREST ANIMALS
    // ======================================================

    elements.deer = {
        color: "#8c6b3f",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1100,
        tempHigh: 120,
        stateHigh: "meat"
    };

    elements.wolf = {
        color: "#666666",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1200,
        tempHigh: 120,
        stateHigh: "meat"
    };

    elements.rabbit = {
        color: "#dddddd",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 900,
        tempHigh: 100,
        stateHigh: "meat"
    };

    // ======================================================
    // DESERT ANIMALS
    // ======================================================

    elements.camel = {
        color: "#c9a066",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1300,
        tempHigh: 160,
        stateHigh: "meat"
    };

    elements.scorpion = {
        color: "#7a5c2e",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1000,
        tempHigh: 180,
        stateHigh: "ash"
    };

    elements.lizard = {
        color: "#4f8c45",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 950,
        tempHigh: 140,
        stateHigh: "meat"
    };

    // ======================================================
    // OCEAN ANIMALS
    // ======================================================

    elements.shark = {
        color: "#5f7c8a",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1500,
        tempHigh: 120,
        stateHigh: "meat"
    };

    elements.crab = {
        color: "#d94f30",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1300,
        tempHigh: 130,
        stateHigh: "meat"
    };

    elements.jellyfish = {
        color: "#ff99ff",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 800,
        tempHigh: 90,
        stateHigh: "steam"
    };

    // ======================================================
    // ARCTIC ANIMALS
    // ======================================================

    elements.penguin = {
        color: "#222222",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1200,
        tempHigh: 80,
        stateHigh: "meat"
    };

    elements.seal = {
        color: "#777777",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1300,
        tempHigh: 100,
        stateHigh: "meat"
    };

    elements.polar_bear = {
        color: "#f2f2f2",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1600,
        tempHigh: 90,
        stateHigh: "meat"
    };

    // ======================================================
    // JUNGLE ANIMALS
    // ======================================================

    elements.monkey = {
        color: "#6b4423",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1100,
        tempHigh: 130,
        stateHigh: "meat"
    };

    elements.frog = {
        color: "#3ea34a",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 900,
        tempHigh: 80,
        stateHigh: "steam"
    };

    elements.parrot = {
        color: "#22cc44",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 850,
        tempHigh: 100,
        stateHigh: "meat"
    };

    // ======================================================
    // SAVANNA ANIMALS
    // ======================================================

    elements.lion = {
        color: "#c9973e",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1400,
        tempHigh: 140,
        stateHigh: "meat"
    };

    elements.elephant = {
        color: "#888888",
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 2500,
        tempHigh: 150,
        stateHigh: "meat"
    };

    elements.zebra = {
        color: ["#ffffff","#222222"],
        behavior: behaviors.biomeBehavior,
        category: "life",
        state: "solid",
        density: 1300,
        tempHigh: 130,
        stateHigh: "meat"
    };

    // ======================================================
    // CELL EVOLUTION SYSTEM
    // ======================================================

    if (elements.cell && !elements.cell._lifeExpansionPatched) {

        elements.cell._lifeExpansionPatched = true;

        const oldCellTick = elements.cell.tick;

        elements.cell.tick = function(pixel) {

            if (oldCellTick) oldCellTick(pixel);

            if (Math.random() < 0.5) return;

            forEachNeighbor(pixel, function(nPixel) {

                if (!nPixel) return;

                // ==========================================
                // CELL + WATER -> FISH / FROG
                // ==========================================

                if (nPixel.element === "water") {

    if (Math.random() < 0.001) {

        const oceanAnimals = [

            // vanilla
            "fish",

            // biome ocean animals
            "shark",
            "crab",
            "jellyfish",

            // amphibian
            "frog"
        ];

        let pick = oceanAnimals[
            Math.floor(Math.random() * oceanAnimals.length)
        ];

        if (elements[pick]) {
            changePixel(pixel, pick);
        }
    }
}

                // ==========================================
                // CELL + DIRT -> ANT
                // ==========================================

                if (nPixel.element === "dirt") {

                    if (Math.random() < 0.0007 && elements.ant) {
                        changePixel(pixel, "ant");
                    }
                }

                // ==========================================
                // CELL + SLIME -> SLUG
                // ==========================================

                if (nPixel.element === "slime") {

                    if (Math.random() < 0.001 && elements.slug) {
                        changePixel(pixel, "slug");
                    }
                }

                // ==========================================
                // CELL + SMOKE -> FLY
                // ==========================================

                if (nPixel.element === "smoke") {

                    if (Math.random() < 0.001 && elements.fly) {
                        changePixel(pixel, "fly");
                    }
                }

                // ==========================================
                // CELL + MUD -> RANDOM BIOME ANIMAL
                // ==========================================

                if (nPixel.element === "mud") {

                    if (Math.random() < 0.002) {

                        const biomeAnimals = [

                            // forest
                            "deer",
                            "wolf",
                            "rabbit",

                            // desert
                            "camel",
                            "scorpion",
                            "lizard",

                            // ocean
                            "shark",
                            "crab",
                            "jellyfish",

                            // arctic
                            "penguin",
                            "seal",
                            "polar_bear",

                            // jungle
                            "monkey",
                            "frog",
                            "parrot",

                            // savanna
                            "lion",
                            "elephant",
                            "zebra"
                        ];

                        let pick = biomeAnimals[
                            Math.floor(Math.random() * biomeAnimals.length)
                        ];

                        if (elements[pick]) {
                            changePixel(pixel, pick);
                        }
                    }
                }
            });
        };
    }

    // ======================================================
    // IRON CHEMISTRY SYSTEM
    // ======================================================

    if (elements.iron && !elements.iron._chemPatched) {

        elements.iron._chemPatched = true;

        const oldIronTick = elements.iron.tick;

        elements.iron.tick = function(pixel) {

            if (oldIronTick) oldIronTick(pixel);

            forEachNeighbor(pixel, function(nPixel) {

                if (!nPixel) return;

                // IRON + ZINC -> PIPE

                if (nPixel.element === "zinc") {

                    if (elements.pipe) {
                        changePixel(pixel, "pipe");
                    }
                }

                // IRON + GUNPOWDER -> RANDOM EXPLOSIVE

                if (nPixel.element === "gunpowder") {

                    if (Math.random() < 0.002) {

                        const explosives = [
                            "tnt",
                            "bomb",
                            "dynamite",
                            "grenade"
                        ];

                        let pick = explosives[
                            Math.floor(Math.random() * explosives.length)
                        ];

                        if (elements[pick]) {
                            changePixel(pixel, pick);
                        }
                    }
                }
            });
        };
    }

    // ======================================================
    // SAND + ROCK -> GUNPOWDER
    // ======================================================

    if (elements.sand && !elements.sand._chemPatched) {

        elements.sand._chemPatched = true;

        const oldSandTick = elements.sand.tick;

        elements.sand.tick = function(pixel) {

            if (oldSandTick) oldSandTick(pixel);

            forEachNeighbor(pixel, function(nPixel) {

                if (!nPixel) return;

                if (nPixel.element === "rock") {

                    if (Math.random() < 0.007 && elements.gunpowder) {

                        changePixel(pixel, "gunpowder");
                    }
                }
            });
        };
    }

    // ======================================================
    // LIGHT + RADIATION -> NEON
    // ======================================================

    if (elements.light && !elements.light._chemPatched) {

        elements.light._chemPatched = true;

        const oldLightTick = elements.light.tick;

        elements.light.tick = function(pixel) {

            if (oldLightTick) oldLightTick(pixel);

            forEachNeighbor(pixel, function(nPixel) {

                if (!nPixel) return;

                if (nPixel.element === "radiation") {

                    if (Math.random() < 0.008 && elements.neon) {

                        changePixel(pixel, "neon");
                    }
                }
            });
        };
    }

    // ======================================================
    // BASALT HEATING -> RANDOM METAL
    // ======================================================

    if (elements.basalt && !elements.basalt._chemPatched) {

        elements.basalt._chemPatched = true;

        const oldBasaltTick = elements.basalt.tick;

        elements.basalt.tick = function(pixel) {

            if (oldBasaltTick) oldBasaltTick(pixel);

            if (pixel.temp > 600) {

                if (Math.random() < 0.003) {

                    const metals = [
                        "iron",
                        "copper",
                        "gold",
                        "silver",
                        "zinc",
                        "tin",
                        "nickel"
                    ];

                    let pick = metals[
                        Math.floor(Math.random() * metals.length)
                    ];

                    if (elements[pick]) {
                        changePixel(pixel, pick);
                    }
                }
            }
        };
    }

    // ======================================================
    // SUGAR WATER + ALGAE/KELP -> SLIME
    // ======================================================

    if (elements.sugar_water && !elements.sugar_water._chemPatched) {

        elements.sugar_water._chemPatched = true;

        const oldSugarTick = elements.sugar_water.tick;

        elements.sugar_water.tick = function(pixel) {

            if (oldSugarTick) oldSugarTick(pixel);

            forEachNeighbor(pixel, function(nPixel) {

                if (!nPixel) return;

                if (
                    nPixel.element === "algae" ||
                    nPixel.element === "kelp"
                ) {

                    if (Math.random() < 0.004 && elements.slime) {

                        changePixel(pixel, "slime");
                    }
                }
            });
        };
    }

    // ======================================================
    // SLIME + WATER -> ACID
    // ======================================================

    if (elements.slime && !elements.slime._chemPatched) {

        elements.slime._chemPatched = true;

        const oldSlimeTick = elements.slime.tick;

        elements.slime.tick = function(pixel) {

            if (oldSlimeTick) oldSlimeTick(pixel);

            forEachNeighbor(pixel, function(nPixel) {

                if (!nPixel) return;

                if (nPixel.element === "water") {

                    if (Math.random() < 0.003 && elements.acid) {

                        changePixel(pixel, "acid");
                    }
                }
            });
        };
    }

    // ======================================================
    // WATER + ZINC -> SPOUT
    // ======================================================

    if (elements.water && !elements.water._chemPatched) {

        elements.water._chemPatched = true;

        const oldWaterTick = elements.water.tick;

        elements.water.tick = function(pixel) {

            if (oldWaterTick) oldWaterTick(pixel);

            forEachNeighbor(pixel, function(nPixel) {

                if (!nPixel) return;

                if (nPixel.element === "zinc") {

                    if (Math.random() < 0.003 && elements.spout) {

                        changePixel(pixel, "spout");
                    }
                }
            });
        };
    }

});
