// 1. Get an array of every valid element in the game database
let elementList = Object.keys(elements).filter(e => elements[e] && !elements[e].hidden);

elements.virajs_potion = {
    color: "#15a47e",
    behavior: [
        "XX|XX|XX",
        "M2%5|XX|M2%5",
        "M2|M1|M2"
    ],
    category: "Viraj's Mod",
    state: "liquid",
    density: 90000,
    viscosity: 90,
    tick: function (pixel) {
        // --- Temperature Logic ---
        let myTemp = pixel.temp;
        if (myTemp > 300) {
            changePixel(pixel, "steam");
            return; // Stop running code if evaporated
        } else if (myTemp < 0) {
            pixel.color = "#326c91";
        }

        // --- Chaos Reaction Logic (Anything else) ---
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Skip checking itself

                let targetX = pixel.x + i;
                let targetY = pixel.y + j;

                // Ensure coordinates are inside the map grid boundaries
                if (targetX >= 0 && targetX < width && targetY >= 0 && targetY < height) {
                    // Check if the neighbor spot is NOT empty
                    if (!isEmpty(targetX, targetY)) {
                        let neighbor = pixelMap[targetX][targetY];

                        // Ignore water, salt water, and other copies of this potion
                        if (neighbor &&
                            neighbor.element !== "water" &&
                            neighbor.element !== "salt_water" &&
                            neighbor.element !== "virajs_potion") {

                            // Pick a random element from the entire game
                            let randomElement = elementList[Math.floor(Math.random() * elementList.length)];

                            // Mutate into that random element!
                            changePixel(pixel, randomElement);
                            return;
                        }
                    }
                }
            }
        }
    },
    // Standard reactions still handle water and salt water perfectly
    reactions: {
        "water": { elem1: null, elem2: "diluted_potion" },
        "salt_water": { elem1: null, elem2: "diluted_potion" }
    }
};
elements.diluted_potion = {
    color: "#7cffdccd",
    behavior: [
        "XX|XX|XX",
        "M2%5|XX|M2%5",
        "M2|M1|M2"
    ],
    category: "Viraj's Mod",
    state: "liquid",
    density: 90000,
    viscosity: 90,
    tick: function (pixel) {
        // --- Temperature Logic ---
        let myTemp = pixel.temp;
        if (myTemp > 300) {
            changePixel(pixel, "steam");
            return; // Stop running code if evaporated
        } else if (myTemp < 0) {
            pixel.color = "#326c91";
        }

        // --- Chaos Reaction Logic (Anything else) ---
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Skip checking itself

                let targetX = pixel.x + i;
                let targetY = pixel.y + j;

                // Ensure coordinates are inside the map grid boundaries
                if (targetX >= 0 && targetX < width && targetY >= 0 && targetY < height) {
                    // Check if the neighbor spot is NOT empty
                    if (!isEmpty(targetX, targetY)) {
                        let neighbor = pixelMap[targetX][targetY];

                        // Ignore water, salt water, and other copies of this potion
                        if (neighbor &&
                            neighbor.element !== "water" &&
                            neighbor.element !== "salt_water" &&
                            neighbor.element !== "virajs_potion") {

                            // Pick a random element from the entire game
                            let randomElement = elementList[Math.floor(Math.random() * elementList.length)];

                            // Mutate into that random element!
                            changePixel(pixel, randomElement);
                            return;
                        }
                    }
                }
            }
        }
    },
    // Standard reactions still handle water and salt water perfectly
    reactions: {
        "water": { elem1: null, elem2: "diluted_potion" },
        "salt_water": { elem1: null, elem2: "diluted_potion" }
    }
};
