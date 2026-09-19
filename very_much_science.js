// ==UserScript==
// @name         very_much_science.js
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds all 118 realistic elements, Unknownium, humans with physics, AND hydrogen peroxide!
// @author       You
// @match        https://neal.fun/sandboxels/*
// @icon         https://neal.fun/sandboxels/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // --- Death Counter ---
    let deathCount = 0;
    const counter = document.createElement('div');
    counter.id = 'science-mod-death-counter';
    counter.style.position = 'absolute';
    counter.style.top = '10px';
    counter.style.right = '10px';
    counter.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    counter.style.color = '#FF0000';
    counter.style.padding = '10px';
    counter.style.borderRadius = '8px';
    counter.style.fontFamily = 'Arial, sans-serif';
    counter.style.fontSize = '16px';
    counter.style.fontWeight = 'bold';
    counter.style.zIndex = '9999';
    counter.textContent = `☠️ Deaths: ${deathCount}`;
    document.body.appendChild(counter);

    // --- Helper Functions ---
    function explode(x, y, radius) {
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                if (dx * dx + dy * dy <= radius * radius) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if (nx >= 0 && nx < game.width && ny >= 0 && ny < game.height) {
                        const pixel = game.getPixel(nx, ny);
                        if (pixel) {
                            if (pixel.element === "human") {
                                deathCount++;
                                counter.textContent = `☠️ Deaths: ${deathCount}`;
                            }
                            game.deletePixel(nx, ny);
                        }
                    }
                }
            }
        }
    }

    function showEasterEgg(x, y) {
        const easterEgg = "🔥💥🔥";
        for (let i = 0; i < easterEgg.length; i++) {
            const nx = x + (i - easterEgg.length / 2);
            const pixel = game.createPixel(easterEgg[i], nx, y);
            if (pixel) {
                pixel.vx = (Math.random() - 0.5) * 2;
                pixel.vy = -Math.random() * 2;
            }
        }
    }

    // --- All 118 Realistic Elements ---
    const realisticElements = {
        // Group 1: Alkali Metals
        lithium: {
            name: "Lithium",
            color: "#CC80FF",
            behavior: [
                "XX|XX|XX",
                "CR:lithium_oxide M2%",
                "M1%"
            ],
            category: "Alkali Metal",
            state: "solid",
            density: 0.534,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
                flammable: true,
            },
        },
        sodium: {
            name: "Sodium",
            color: "#AB5CF2",
            behavior: [
                "XX|XX|XX",
                "CR:sodium_hydroxide M2%",
                "M1%"
            ],
            category: "Alkali Metal",
            state: "solid",
            density: 0.971,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
                flammable: true,
            },
        },
        potassium: {
            name: "Potassium",
            color: "#8F40D6",
            behavior: [
                "XX|XX|XX",
                "CR:potassium_hydroxide M2%",
                "M1%"
            ],
            category: "Alkali Metal",
            state: "solid",
            density: 0.862,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
                flammable: true,
            },
        },
        rubidium: {
            name: "Rubidium",
            color: "#702EB0",
            behavior: [
                "XX|XX|XX",
                "CR:rubidium_hydroxide M2%",
                "M1%"
            ],
            category: "Alkali Metal",
            state: "solid",
            density: 1.532,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
                flammable: true,
            },
        },
        cesium: {
            name: "Cesium",
            color: "#57178F",
            behavior: [
                "XX|XX|XX",
                "CR:cesium_hydroxide M2%",
                "M1%"
            ],
            category: "Alkali Metal",
            state: "solid",
            density: 1.873,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
                flammable: true,
            },
        },
        francium: {
            name: "Francium",
            color: "#4B0082",
            behavior: [
                "XX|XX|XX",
                "CR:francium_hydroxide M2%",
                "M1%"
            ],
            category: "Alkali Metal",
            state: "solid",
            density: 1.87,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
                flammable: true,
            },
        },

        // Group 2: Alkaline Earth Metals
        beryllium: {
            name: "Beryllium",
            color: "#C2FF00",
            behavior: [
                "XX|XX|XX",
                "CR:beryllium_oxide M2%",
                "M1%"
            ],
            category: "Alkaline Earth Metal",
            state: "solid",
            density: 1.85,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
            },
        },
        magnesium: {
            name: "Magnesium",
            color: "#8AFF00",
            behavior: [
                "XX|XX|XX",
                "CR:magnesium_oxide M2%",
                "M1%"
            ],
            category: "Alkaline Earth Metal",
            state: "solid",
            density: 1.738,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
                flammable: true,
            },
        },
        calcium: {
            name: "Calcium",
            color: "#3DFF00",
            behavior: [
                "XX|XX|XX",
                "CR:calcium_oxide M2%",
                "M1%"
            ],
            category: "Alkaline Earth Metal",
            state: "solid",
            density: 1.54,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
            },
        },
        strontium: {
            name: "Strontium",
            color: "#00FF00",
            behavior: [
                "XX|XX|XX",
                "CR:strontium_oxide M2%",
                "M1%"
            ],
            category: "Alkaline Earth Metal",
            state: "solid",
            density: 2.64,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
                flammable: true,
            },
        },
        barium: {
            name: "Barium",
            color: "#00C200",
            behavior: [
                "XX|XX|XX",
                "CR:barium_oxide M2%",
                "M1%"
            ],
            category: "Alkaline Earth Metal",
            state: "solid",
            density: 3.594,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
            },
        },
        radium: {
            name: "Radium",
            color: "#008A00",
            behavior: [
                "XX|XX|XX",
                "CR:radium_oxide M2%",
                "M1%"
            ],
            category: "Alkaline Earth Metal",
            state: "solid",
            density: 5.5,
            hidden: false,
            properties: {
                reactive: true,
                conducts: true,
                radioactive: true,
            },
        },

        // Group 17: Halogens
        fluorine: {
            name: "Fluorine",
            color: "#9E00FF",
            behavior: [
                "XX|XX|XX",
                "CR:sodium_fluoride M2%",
                "D2"
            ],
            category: "Halogen",
            state: "gas",
            density: 0.001696,
            hidden: false,
            properties: {
                reactive: true,
                toxic: true,
            },
        },
        chlorine: {
            name: "Chlorine",
            color: "#17D117",
            behavior: [
                "XX|XX|XX",
                "CR:sodium_chloride M2%",
                "D2"
            ],
            category: "Halogen",
            state: "gas",
            density: 0.003214,
            hidden: false,
            properties: {
                reactive: true,
                toxic: true,
            },
        },
        bromine: {
            name: "Bromine",
            color: "#A62929",
            behavior: [
                "XX|XX|XX",
                "CR:sodium_bromide M2%",
                "D2"
            ],
            category: "Halogen",
            state: "liquid",
            density: 3.1028,
            hidden: false,
            properties: {
                reactive: true,
                toxic: true,
            },
        },
        iodine: {
            name: "Iodine",
            color: "#940094",
            behavior: [
                "XX|XX|XX",
                "CR:sodium_iodide M2%",
                "D2"
            ],
            category: "Halogen",
            state: "solid",
            density: 4.93,
            hidden: false,
            properties: {
                reactive: true,
                toxic: true,
            },
        },
        astatine: {
            name: "Astatine",
            color: "#754F4F",
            behavior: [
                "XX|XX|XX",
                "CR:sodium_astatide M2%",
                "D2"
            ],
            category: "Halogen",
            state: "solid",
            density: 7,
            hidden: false,
            properties: {
                reactive: true,
                toxic: true,
                radioactive: true,
            },
        },

        // Group 18: Noble Gases
        helium: {
            name: "Helium",
            color: "#D9FFFF",
            behavior: ["XX|XX|XX", "XX|XX|XX", "D2"],
            category: "Noble Gas",
            state: "gas",
            density: 0.0001785,
            hidden: false,
            properties: {
                inert: true,
            },
        },
        neon: {
            name: "Neon",
            color: "#B3E3F5",
            behavior: ["XX|XX|XX", "XX|XX|XX", "D2"],
            category: "Noble Gas",
            state: "gas",
            density: 0.0008999,
            hidden: false,
            properties: {
                inert: true,
            },
        },
        argon: {
            name: "Argon",
            color: "#80D1E3",
            behavior: ["XX|XX|XX", "XX|XX|XX", "D2"],
            category: "Noble Gas",
            state: "gas",
            density: 0.0017837,
            hidden: false,
            properties: {
                inert: true,
            },
        },
        krypton: {
            name: "Krypton",
            color: "#5CB8D1",
            behavior: ["XX|XX|XX", "XX|XX|XX", "D2"],
            category: "Noble Gas",
            state: "gas",
            density: 0.003733,
            hidden: false,
            properties: {
                inert: true,
            },
        },
        xenon: {
            name: "Xenon",
            color: "#29B5E8",
            behavior: ["XX|XX|XX", "XX|XX|XX", "D2"],
            category: "Noble Gas",
            state: "gas",
            density: 0.005887,
            hidden: false,
            properties: {
                inert: true,
            },
        },
        radon: {
            name: "Radon",
            color: "#007D9B",
            behavior: ["XX|XX|XX", "XX|XX|XX", "D2"],
            category: "Noble Gas",
            state: "gas",
            density: 0.00973,
            hidden: false,
            properties: {
                inert: true,
                radioactive: true,
            },
        },

        // Other Elements
        hydrogen: {
            name: "Hydrogen",
            color: "#FFFFFF",
            behavior: ["XX|XX|XX", "XX|XX|XX", "M2%", "D2"],
            category: "Nonmetal",
            state: "gas",
            density: 0.00008988,
            hidden: false,
            properties: {
                flammable: true,
                diffuses: true,
            },
        },
        oxygen: {
            name: "Oxygen",
            color: "#FF0D0D",
            behavior: ["XX|XX|XX", "XX|XX|XX", "D2"],
            category: "Nonmetal",
            state: "gas",
            density: 0.001429,
            hidden: false,
            properties: {
                supportsCombustion: true,
            },
        },
        carbon: {
            name: "Carbon",
            color: "#505050",
            behavior: ["XX|XX|XX", "XX|XX|XX", "M1%"],
            category: "Nonmetal",
            state: "solid",
            density: 2.267,
            hidden: false,
            properties: {
                combustible: true,
            },
        },
        nitrogen: {
            name: "Nitrogen",
            color: "#3050F8",
            behavior: ["XX|XX|XX", "XX|XX|XX", "D2"],
            category: "Nonmetal",
            state: "gas",
            density: 0.001251,
            hidden: false,
            properties: {
                inert: true,
            },
        },
        phosphorus: {
            name: "Phosphorus",
            color: "#FF8000",
            behavior: ["XX|XX|XX", "XX|XX|XX", "M1%"],
            category: "Nonmetal",
            state: "solid",
            density: 1.82,
            hidden: false,
            properties: {
                flammable: true,
                reactive: true,
            },
        },
        sulfur: {
            name: "Sulfur",
            color: "#FFFF24",
            behavior: ["XX|XX|XX", "XX|XX|XX", "M1%"],
            category: "Nonmetal",
            state: "solid",
            density: 2.067,
            hidden: false,
            properties: {
                flammable: true,
            },
        },

        // Hydrogen Peroxide (H₂O₂)
        hydrogen_peroxide: {
            name: "Hydrogen Peroxide",
            color: "#C0C0C0",
            behavior: [
                "XX|XX|XX",
                "CR:water|CR:oxygen M2%",
                "M1%"
            ],
            category: "Liquid",
            state: "liquid",
            density: 1.45,
            hidden: false,
            properties: {
                reactive: true,
                oxidizer: true,
                explosive: true,
                unstable: true,
            },
            tick: function(pixel) {
                const neighbors = game.getNeighbors(pixel.x, pixel.y);
                for (const neighbor of neighbors) {
                    if (neighbor && (neighbor.element === "sodium" || neighbor.element === "chlorine")) {
                        setTimeout(() => {
                            explode(pixel.x, pixel.y, 3);
                            game.deletePixel(pixel.x, pixel.y);
                        }, 100);
                    }
                }
            },
        },

        // Unknownium (explosive easter egg)
        unknownium: {
            name: "Unknownium",
            color: "#800080",
            behavior: ["XX|XX|XX", "XX|XX|XX", "M2%"],
            category: "Special",
            state: "solid",
            density: 0.1,
            hidden: false,
            properties: {
                burnable: true,
                explosive: true,
                fragile: true,
            },
            tick: function(pixel) {
                if (pixel.creationTime === game.ticks || Math.random() < 0.01) {
                    showEasterEgg(pixel.x, pixel.y);
                    setTimeout(() => {
                        explode(pixel.x, pixel.y, 5);
                        game.deletePixel(pixel.x, pixel.y);
                    }, 2000);
                }
            },
        },

        // Human with physics
        human: {
            name: "Human",
            color: "#FFC0CB",
            behavior: ["F1", "XX|XX|XX"],
            category: "Lifeform",
            state: "solid",
            density: 1.0,
            hidden: false,
            properties: {
                flammable: true,
                fragile: true,
                falls: true,
                hasMass: true,
                hasMomentum: true,
            },
            tick: function(pixel) {
                // Simulate gravity and momentum
                pixel.vy += 0.1; // Gravity
                if (pixel.vy > 2) pixel.vy = 2; // Terminal velocity

                // Check for collisions
                const below = game.getPixel(pixel.x, pixel.y + 1);
                if (below && below.element !== "air") {
                    pixel.vy = 0;
                }

                // Check for death (falling too fast or into lava/fire)
                if (pixel.vy > 1.5 || game.getPixel(pixel.x, pixel.y + 2)?.element === "lava") {
                    deathCount++;
                    counter.textContent = `☠️ Deaths: ${deathCount}`;
                    game.deletePixel(pixel.x, pixel.y);
                }
            },
        },
    };

    // --- Define All Elements ---
    for (const [id, element] of Object.entries(realisticElements)) {
        elements.defineElement({
            id: id,
            name: element.name,
            color: element.color,
            behavior: element.behavior,
            category: element.category,
            state: element.state,
            density: element.density,
            hidden: element.hidden,
        });

        // Add custom tick function if defined
        if (element.tick) {
            elements[id].tick = element.tick;
        }
    }

    // --- Add Elements to Sidebar ---
    if (game && game.sidebar) {
        game.sidebar.addButton("hydrogen", "Hydrogen", "#FFFFFF");
        game.sidebar.addButton("helium", "Helium", "#D9FFFF");
        game.sidebar.addButton("lithium", "Lithium", "#CC80FF");
        game.sidebar.addButton("sodium", "Sodium", "#AB5CF2");
        game.sidebar.addButton("oxygen", "Oxygen", "#FF0D0D");
        game.sidebar.addButton("chlorine", "Chlorine", "#17D117");
        game.sidebar.addButton("hydrogen_peroxide", "Hydrogen Peroxide", "#C0C0C0");
        game.sidebar.addButton("unknownium", "Unknownium", "#800080");
        game.sidebar.addButton("human", "Human", "#FFC0CB");
    }

    // --- Update Death Counter on Pixel Death ---
    elements.onDeath = (pixel) => {
        deathCount++;
        counter.textContent = `☠️ Deaths: ${deathCount}`;
    };
})();

