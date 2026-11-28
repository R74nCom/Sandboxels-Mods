// ==========================================
// TANK MOD FOR SANDBOXELS (tankmod.js)
// ==========================================

// 1. Tank Armor (Lava-proof, blast-resistant composite armor)
elements.tank_armor = {
    name: "Tank Armor",
    color: ["#4b5320", "#556b2f", "#3b4218"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 7800,
    hardness: 0.96,
    insulate: true,
    tempHigh: 3600,
    stateHigh: "molten_steel",
    conduct: 0.05
};

// 2. Tank Barrel (Fires Tank Shells to the right when shocked or heated)
elements.tank_barrel = {
    name: "Tank Barrel",
    color: ["#2f332c", "#3a3f36", "#232621"],
    behavior: behaviors.WALL,
    category: "weapons",
    state: "solid",
    density: 8000,
    hardness: 0.95,
    insulate: true,
    tempHigh: 3600,
    stateHigh: "molten_steel",
    conduct: 1,
    tick: function(pixel) {
        if (!pixel.cooldown) pixel.cooldown = 0;
        if (pixel.cooldown > 0) {
            pixel.cooldown--;
            return;
        }
        // Fires when powered by electricity (Shock/Battery/Wire) OR heated above 100°C
        if (pixel.charge || pixel.temp >= 100) {
            if (isEmpty(pixel.x + 1, pixel.y)) {
                createPixel("tank_shell", pixel.x + 1, pixel.y);
                pixelMap[pixel.x + 1][pixel.y].vx = 4; // Launches shell to the right
                pixel.cooldown = 25; // Reload delay
            }
        }
    }
};

// 3. Custom Tank Ammunition (Flies sideways if launched, explodes on impact)
elements.tank_shell = {
    name: "Tank Shell",
    color: ["#d4af37", "#b8860b"],
    category: "weapons",
    state: "solid",
    density: 9000,
    tempHigh: 350,
    stateHigh: "explosion",
    tick: function(pixel) {
        // If fired from a Tank Barrel, fly horizontally
        if (pixel.vx && pixel.vx > 0) {
            if (isEmpty(pixel.x + 1, pixel.y)) {
                movePixel(pixel, pixel.x + 1, pixel.y);
                // Slight gravity drop
                if (Math.random() < 0.15 && isEmpty(pixel.x, pixel.y + 1)) {
                    movePixel(pixel, pixel.x, pixel.y + 1);
                }
            } else {
                // Explode when hitting any obstacle
                explodeAt(pixel.x, pixel.y, 14, "fire,smoke,shrapnel");
                deletePixel(pixel.x, pixel.y);
            }
        } else {
            // If dropped manually from the toolbar, fall down and explode
            if (isEmpty(pixel.x, pixel.y + 1)) {
                movePixel(pixel, pixel.x, pixel.y + 1);
            } else {
                explodeAt(pixel.x, pixel.y, 14, "fire,smoke,shrapnel");
                deletePixel(pixel.x, pixel.y);
            }
        }
    }
};

// 4. Tank Napalm (Sticky, long-burning fuel)
elements.tank_napalm = {
    name: "Tank Napalm",
    color: "#cc3300",
    behavior: behaviors.LIQUID,
    category: "weapons",
    state: "liquid",
    density: 850,
    viscosity: 5000,
    burn: 90,
    burnTime: 400,
    burnInto: "fire",
    fireColor: "#ff6600"
};

// 5. Spawnable Mini-Tank Structure (Uses Tank Armor + working Tank Barrel)
elements.tank_structure = {
    name: "Tank",
    color: "#4b5320",
    cooldown: 6,
    tick: function(pixel) {
        pixel.arr = [
            ["air",        "air",        "tank_armor", "tank_armor", "tank_barrel", "tank_barrel", "tank_barrel"],
            ["tank_armor", "tank_armor", "tank_armor", "rad_glass",  "tank_armor",  "air",         "air"],
            ["tank_armor", "tank_armor", "tank_armor", "tank_armor", "tank_armor",  "tank_armor",  "air"],
            ["wheel",      "tank_armor", "wheel",      "tank_armor", "wheel",       "tank_armor",  "air"]
        ];
        pixel.carr = [
            ["null",    "null",    "#3b4218", "#3b4218", "#232621", "#232621", "#1a1c18"],
            ["#4b5320", "#556b2f", "#4b5320", "#00ffff", "#4b5320", "null",    "null"],
            ["#556b2f", "#4b5320", "#556b2f", "#4b5320", "#556b2f", "#4b5320", "null"],
            ["#1f1f1f", "#3b4218", "#1f1f1f", "#3b4218", "#1f1f1f", "#3b4218", "null"]
        ];

        let aa = 0 - Math.floor(pixel.arr[0].length / 2);
        let na = Math.abs(aa);
        let bb = pixel.arr[0].length % 2 === 1 ? Math.floor(pixel.arr[0].length / 2) + 1 : Math.floor(pixel.arr[0].length / 2);

        let cc = 0 - Math.floor(pixel.arr.length / 2);
        let nc = Math.abs(cc);
        let dd = pixel.arr.length % 2 === 1 ? Math.floor(pixel.arr.length / 2) + 1 : Math.floor(pixel.arr.length / 2);

        for (let j = cc; j < dd; j++) {
            for (let i = aa; i < bb; i++) {
                if (!isEmpty(pixel.x + i, pixel.y + j, true)) {
                    if (pixel.arr[j + nc][i + na] !== "null") {
                        deletePixel(pixel.x + i, pixel.y + j);
                    }
                }
                if (pixel.arr[j + nc][i + na]) {
                    if (isEmpty(pixel.x + i, pixel.y + j, false) && pixel.arr[j + nc][i + na] !== "null" && pixel.arr[j + nc][i + na] !== "air") {
                        createPixel(pixel.arr[j + nc][i + na], pixel.x + i, pixel.y + j);
                        if (pixel.carr[j + nc][i + na] && !isEmpty(pixel.x + i, pixel.y + j, true) && pixel.carr[j + nc][i + na] !== "null") {
                            pixelMap[pixel.x + i][pixel.y + j].color = pixel.carr[j + nc][i + na];
                        }
                    }
                }
            }
        }
    },
    category: "structures",
    state: "solid",
    excludeRandom: true
};

// 6. Tank Seed (Drop 1 pixel to spawn the whole Tank!)
elements.tank_seed = {
    name: "Tank Seed",
    color: "#556b2f",
    cooldown: 6,
    behavior: [
        "DL:tank_seed|DL:tank_seed AND M2|DL:tank_seed",
        "DL:tank_seed|C2:tank_structure|DL:tank_seed",
        "DL:tank_seed|SW:tank_seed AND DL:tank_seed AND M1|DL:tank_seed"
    ],
    category: "structures",
    state: "solid",
    density: 2018
};
