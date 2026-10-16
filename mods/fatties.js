// Initialize the custom "Fatties" category if it doesn't exist
if (!window.categoryMoveRow) { window.categoryMoveRow = []; }
if (!window.elements) { window.elements = {}; }

// Custom "Fatties" Category Setup
elements.fatty_egg = {
    color: "#f3e5ab",
    behavior: behaviors.POWDER,
    category: "Fatties",
    state: "solid",
    desc: "A small egg laid by Peson Bald Chickens. Hatches into a Fatty.",
    tempHigh: 38,
    chH: "fatty",
};

// 1. FATTIES (Light Yellow, Fast, Eat Foods, Run from Peacocks)
elements.fatty = {
    color: "#fff9ae", // Light Yellow
    behavior: [
        "XX|M2|XX",
        "M2|WORM|M2", // WORM behavior blended with fast M2 movement
        "XX|M2|XX"
    ],
    category: "Fatties",
    state: "solid",
    desc: "A fast, light yellow Fatty. Runs from Peacocks.",
    tempHigh: 100,
    chH: "cooked_meat",
    tick: function(pixel) {
        // Fast eating behavior for Foods category elements
        let neighbors = [
            {x: pixel.x+1, y: pixel.y}, {x: pixel.x-1, y: pixel.y},
            {x: pixel.x, y: pixel.y+1}, {x: pixel.x, y: pixel.y-1}
        ];
        for (let n of neighbors) {
            let target = pixelMap[n.x]?.[n.y];
            if (target && elements[target.element]?.category === "foods") {
                deletePixel(target.x, target.y);
            }
        }
        // Run away from Peacock
        for (let x = -4; x <= 4; x++) {
            for (let y = -4; y <= 4; y++) {
                let target = pixelMap[pixel.x + x]?.[pixel.y + y];
                if (target && target.element === "peacock") {
                    let moveX = x > 0 ? -1 : 1;
                    if (isEmpty(pixel.x + moveX, pixel.y)) {
                        movePixel(pixel, pixel.x + moveX, pixel.y);
                    }
                    return;
                }
            }
        }
    }
};

// 2. FATTOS (Slightly Darker Yellow, Normal Speed Worm, Smart, Run from Weapons)
elements.fatto = {
    color: "#ffec7a", // Darker Yellow
    behavior: behaviors.WORM, // Regular worm speed
    category: "Fatties",
    state: "solid",
    desc: "A round Fatto. Smart enough to run away from weapons.",
    tempHigh: 100,
    chH: "cooked_meat",
    tick: function(pixel) {
        // Eats elements in the foods category
        let neighbors = [
            {x: pixel.x+1, y: pixel.y}, {x: pixel.x-1, y: pixel.y},
            {x: pixel.x, y: pixel.y+1}, {x: pixel.x, y: pixel.y-1}
        ];
        for (let n of neighbors) {
            let target = pixelMap[n.x]?.[n.y];
            if (target && elements[target.element]?.category === "foods") {
                deletePixel(target.x, target.y);
            }
        }
        // Run away from Weapons category elements
        for (let x = -5; x <= 5; x++) {
            for (let y = -5; y <= 5; y++) {
                let target = pixelMap[pixel.x + x]?.[pixel.y + y];
                if (target && elements[target.element]?.category === "weapons") {
                    let moveX = x > 0 ? -1 : 1;
                    if (isEmpty(pixel.x + moveX, pixel.y)) {
                        movePixel(pixel, pixel.x + moveX, pixel.y);
                    }
                    return;
                }
            }
        }
    }
};

// 3. PESON BALD CHICKEN - MALE (Green Top, Brown Bottom, 2 Pixels Tall, Human Behavior, Avoids Weapons)
elements.peson_bald_chicken_male = {
    color: "#2e7d32", // Green Top
    behavior: behaviors.HUMAN,
    category: "Fatties",
    state: "solid",
    desc: "A male Peson Bald Chicken. Multi-pixel structure.",
    tick: function(pixel) {
        // Maintain 2-pixel tall structure with a brown bottom segment
        let bottomX = pixel.x;
        let bottomY = pixel.y + 1;
        if (isEmpty(bottomX, bottomY)) {
            createPixel("peson_chicken_bottom_male", bottomX, bottomY);
        } else {
            let bottomPixel = pixelMap[bottomX]?.[bottomY];
            if (bottomPixel && bottomPixel.element !== "peson_chicken_bottom_male") {
                createPixel("peson_chicken_bottom_male", bottomX, bottomY);
            }
        }
        // Walk away from weapons
        for (let x = -5; x <= 5; x++) {
            let target = pixelMap[pixel.x + x]?.[pixel.y];
            if (target && elements[target.element]?.category === "weapons") {
                let moveX = x > 0 ? -1 : 1;
                if (isEmpty(pixel.x + moveX, pixel.y)) {
                    movePixel(pixel, pixel.x + moveX, pixel.y);
                }
                return;
            }
        }
    }
};

elements.peson_chicken_bottom_male = {
    color: "#5d4037", // Brown Bottom
    behavior: behaviors.WALL,
    category: "Fatties",
    hidden: true,
    tick: function(pixel) {
        let topX = pixel.x;
        let topY = pixel.y - 1;
        let topPixel = pixelMap[topX]?.[topY];
        if (!topPixel || topPixel.element !== "peson_bald_chicken_male") {
            deletePixel(pixel.x, pixel.y);
        }
    }
};

// 4. PESON BALD CHICKEN - FEMALE (White Top, Pinkish-White Bottom, Lays Eggs, Avoids Weapons)
elements.peson_bald_chicken_female = {
    color: "#ffffff", // White Top
    behavior: behaviors.HUMAN,
    category: "Fatties",
    state: "solid",
    desc: "A female Peson Bald Chicken. Lays fatty eggs.",
    tick: function(pixel) {
        // Maintain 2-pixel tall structure with pinkish-white bottom
        let bottomX = pixel.x;
        let bottomY = pixel.y + 1;
        if (isEmpty(bottomX, bottomY)) {
            createPixel("peson_chicken_bottom_female", bottomX, bottomY);
        } else {
            let bottomPixel = pixelMap[bottomX]?.[bottomY];
            if (bottomPixel && bottomPixel.element !== "peson_chicken_bottom_female") {
                createPixel("peson_chicken_bottom_female", bottomX, bottomY);
            }
        }
        // Randomly lay fatty eggs onto empty spaces beneath it
        if (Math.random() < 0.01) {
            let eggX = pixel.x;
            let eggY = pixel.y + 2;
            if (isEmpty(eggX, eggY)) {
                createPixel("fatty_egg", eggX, eggY);
            }
        }
        // Walk away from weapons
        for (let x = -5; x <= 5; x++) {
            let target = pixelMap[pixel.x + x]?.[pixel.y];
            if (target && elements[target.element]?.category === "weapons") {
                let moveX = x > 0 ? -1 : 1;
                if (isEmpty(pixel.x + moveX, pixel.y)) {
                    movePixel(pixel, pixel.x + moveX, pixel.y);
                }
                return;
            }
        }
    }
};

elements.peson_chicken_bottom_female = {
    color: "#fce4ec", // Pinkish-White Bottom
    behavior: behaviors.WALL,
    category: "Fatties",
    hidden: true,
    tick: function(pixel) {
        let topX = pixel.x;
        let topY = pixel.y - 1;
        let topPixel = pixelMap[topX]?.[topY];
        if (!topPixel || topPixel.element !== "peson_bald_chicken_female") {
            deletePixel(pixel.x, pixel.y);
        }
    }
};

// 5. PEACOCK (Green Top, Blue Bottom, 2 Pixels Tall, Human Behavior)
elements.peacock = {
    color: "#2e7d32", // Green Top
    behavior: behaviors.HUMAN,
    category: "Fatties",
    state: "solid",
    desc: "A majestic peacock. 2 pixels tall.",
    tick: function(pixel) {
        // Maintain 2-pixel tall structure with blue bottom segment
        let bottomX = pixel.x;
        let bottomY = pixel.y + 1;
        if (isEmpty(bottomX, bottomY)) {
            createPixel("peacock_bottom", bottomX, bottomY);
        } else {
            let bottomPixel = pixelMap[bottomX]?.[bottomY];
            if (bottomPixel && bottomPixel.element !== "peacock_bottom") {
                createPixel("peacock_bottom", bottomX, bottomY);
            }
        }
    }
};

elements.peacock_bottom = {
    color: "#1565c0", // Blue Bottom
    behavior: behaviors.WALL,
    category: "Fatties",
    hidden: true,
    tick: function(pixel) {
        let topX = pixel.x;
        let topY = pixel.y - 1;
        let topPixel = pixelMap[topX]?.[topY];
        if (!topPixel || topPixel.element !== "peacock") {
            deletePixel(pixel.x, pixel.y);
        }
    }
};
