/*
====================================================
 CIVILIZATIONS.JS
 PART 1 - CORE FRAMEWORK
====================================================
*/

if (!window.civilizationsData) {

    window.civilizationsData = {

        kingdoms: {

            Red: {
                color: "#ff4444",
                food: 100,
                wood: 100,
                stone: 100,
                population: 0
            },

            Blue: {
                color: "#4488ff",
                food: 100,
                wood: 100,
                stone: 100,
                population: 0
            }

        }

    };

}

/*
====================================================
 RED CITIZEN
====================================================
*/

elements.red_citizen = {

    color: "#ff6666",

    category: "life",

    state: "solid",

    density: 1200,

    properties: {

        kingdom: "Red",

        health: 100,

        hunger: 100,

        age: 0,

        job: "idle",

        animationFrame: 0

    },

    tick: function (pixel) {

        pixel.age++;

        pixel.animationFrame++;

        if (pixel.age % 25 === 0) {

            pixel.hunger--;

        }

        if (pixel.hunger <= 0) {

            pixel.health--;

        }

        if (pixel.health <= 0) {

            changePixel(pixel, "bone");
            return;

        }

        if (Math.random() < 0.15) {

            let dir = Math.random() < 0.5 ? -1 : 1;

            tryMove(
                pixel,
                pixel.x + dir,
                pixel.y
            );

        }

        if (Math.random() < 0.005) {

            createPixel(
                "red_builder",
                pixel.x,
                pixel.y - 1
            );

        }

    }

};

/*
====================================================
 BLUE CITIZEN
====================================================
*/

elements.blue_citizen = {

    color: "#6699ff",

    category: "life",

    state: "solid",

    density: 1200,

    properties: {

        kingdom: "Blue",

        health: 100,

        hunger: 100,

        age: 0,

        job: "idle",

        animationFrame: 0

    },

    tick: function (pixel) {

        pixel.age++;

        pixel.animationFrame++;

        if (pixel.age % 25 === 0) {

            pixel.hunger--;

        }

        if (pixel.hunger <= 0) {

            pixel.health--;

        }

        if (pixel.health <= 0) {

            changePixel(pixel, "bone");
            return;

        }

        if (Math.random() < 0.15) {

            let dir = Math.random() < 0.5 ? -1 : 1;

            tryMove(
                pixel,
                pixel.x + dir,
                pixel.y
            );

        }

        if (Math.random() < 0.005) {

            createPixel(
                "blue_builder",
                pixel.x,
                pixel.y - 1
            );

        }

    }

};

/*
====================================================
 RED CASTLE
====================================================
*/

elements.red_castle = {

    color: "#aa0000",

    category: "civilization",

    behavior: behaviors.WALL,

    density: 5000,

    properties: {

        kingdom: "Red"

    }

};

/*
====================================================
 BLUE CASTLE
====================================================
*/

elements.blue_castle = {

    color: "#0033aa",

    category: "civilization",

    behavior: behaviors.WALL,

    density: 5000,

    properties: {

        kingdom: "Blue"

    }

};

/*
====================================================
 SPAWNERS
====================================================
*/

elements.red_settlement = {

    color: "#ff0000",

    category: "civilization",

    behavior: behaviors.WALL,

    tick: function (pixel) {

        if (Math.random() < 0.003) {

            let x = pixel.x + Math.floor(Math.random() * 5) - 2;
            let y = pixel.y - 1;

            if (isEmpty(x, y)) {

                createPixel(
                    "red_citizen",
                    x,
                    y
                );

            }

        }

    }

};

elements.blue_settlement = {

    color: "#0000ff",

    category: "civilization",

    behavior: behaviors.WALL,

    tick: function (pixel) {

        if (Math.random() < 0.003) {

            let x = pixel.x + Math.floor(Math.random() * 5) - 2;
            let y = pixel.y - 1;

            if (isEmpty(x, y)) {

                createPixel(
                    "blue_citizen",
                    x,
                    y
                );

            }

        }

    }

};

console.log("Civilizations Part 1 Loaded");
/*
====================================================
 CIVILIZATIONS.JS
 PART 2 - BUILDERS & HOUSES
====================================================
*/

/*
====================================================
 HOUSE
====================================================
*/

elements.house = {

    color: [
        "#8b5a2b",
        "#a66b33",
        "#704214"
    ],

    category: "civilization",

    behavior: behaviors.WALL,

    density: 3000,

    properties: {
        occupants: 0
    }

};

/*
====================================================
 RED BUILDER
====================================================
*/

elements.red_builder = {

    color: "#ffaaaa",

    category: "life",

    density: 1200,

    properties: {

        kingdom: "Red",

        health: 100,

        buildCooldown: 0

    },

    tick: function (pixel) {

        if (pixel.buildCooldown > 0) {
            pixel.buildCooldown--;
        }

        // wander
        if (Math.random() < 0.25) {

            let dir = Math.random() < 0.5 ? -1 : 1;

            tryMove(
                pixel,
                pixel.x + dir,
                pixel.y
            );

        }

        // build house
        if (pixel.buildCooldown <= 0 &&
            Math.random() < 0.01) {

            let tx = pixel.x + (Math.random() < 0.5 ? -2 : 2);

            let ty = pixel.y;

            if (isEmpty(tx, ty)) {

                createPixel(
                    "house",
                    tx,
                    ty
                );

                pixel.buildCooldown = 500;

            }

        }

        // occasionally return to citizen
        if (Math.random() < 0.0005) {

            changePixel(
                pixel,
                "red_citizen"
            );

        }

    }

};

/*
====================================================
 BLUE BUILDER
====================================================
*/

elements.blue_builder = {

    color: "#aaaaff",

    category: "life",

    density: 1200,

    properties: {

        kingdom: "Blue",

        health: 100,

        buildCooldown: 0

    },

    tick: function (pixel) {

        if (pixel.buildCooldown > 0) {
            pixel.buildCooldown--;
        }

        if (Math.random() < 0.25) {

            let dir = Math.random() < 0.5 ? -1 : 1;

            tryMove(
                pixel,
                pixel.x + dir,
                pixel.y
            );

        }

        if (pixel.buildCooldown <= 0 &&
            Math.random() < 0.01) {

            let tx = pixel.x + (Math.random() < 0.5 ? -2 : 2);

            let ty = pixel.y;

            if (isEmpty(tx, ty)) {

                createPixel(
                    "house",
                    tx,
                    ty
                );

                pixel.buildCooldown = 500;

            }

        }

        if (Math.random() < 0.0005) {

            changePixel(
                pixel,
                "blue_citizen"
            );

        }

    }

};

/*
====================================================
 HOUSE POPULATION GROWTH
====================================================
*/

elements.house.tick = function (pixel) {

    // chance to create new citizen nearby

    if (Math.random() < 0.0008) {

        let spawnX = pixel.x;
        let spawnY = pixel.y - 1;

        if (isEmpty(spawnX, spawnY)) {

            let redNearby = false;
            let blueNearby = false;

            for (let dx = -5; dx <= 5; dx++) {

                for (let dy = -5; dy <= 5; dy++) {

                    let x = pixel.x + dx;
                    let y = pixel.y + dy;

                    if (
                        outOfBounds(x, y) ||
                        isEmpty(x, y, true)
                    ) {
                        continue;
                    }

                    let other = pixelMap[x][y];

                    if (other.element === "red_citizen" ||
                        other.element === "red_builder") {

                        redNearby = true;

                    }

                    if (other.element === "blue_citizen" ||
                        other.element === "blue_builder") {

                        blueNearby = true;

                    }

                }

            }

            if (redNearby && !blueNearby) {

                createPixel(
                    "red_citizen",
                    spawnX,
                    spawnY
                );

            }

            else if (blueNearby && !redNearby) {

                createPixel(
                    "blue_citizen",
                    spawnX,
                    spawnY
                );

            }

        }

    }

};

console.log("Civilizations Part 2 Loaded");
/*
====================================================
 CIVILIZATIONS.JS
 PART 3 - RESOURCES & ECONOMY
====================================================
*/

/*
====================================================
 RESOURCE ELEMENTS
====================================================
*/

elements.wood_resource = {
    color: "#8b5a2b",
    category: "civilization",
    behavior: behaviors.WALL,
    density: 2000
};

elements.food_resource = {
    color: "#55cc55",
    category: "civilization",
    behavior: behaviors.WALL,
    density: 1000
};

elements.stone_resource = {
    color: "#888888",
    category: "civilization",
    behavior: behaviors.WALL,
    density: 3500
};

/*
====================================================
 TREE
====================================================
*/

elements.civ_tree = {

    color: [
        "#228822",
        "#339933",
        "#116611"
    ],

    category: "civilization",

    behavior: behaviors.WALL,

    density: 1500

};

/*
====================================================
 FARM
====================================================
*/

elements.farm = {

    color: [
        "#d6c060",
        "#c8aa44"
    ],

    category: "civilization",

    behavior: behaviors.WALL,

    density: 1800,

    tick: function (pixel) {

        if (Math.random() < 0.002) {

            let sx = pixel.x;
            let sy = pixel.y - 1;

            if (isEmpty(sx, sy)) {

                createPixel(
                    "food_resource",
                    sx,
                    sy
                );

            }

        }

    }

};

/*
====================================================
 RED FARMER
====================================================
*/

elements.red_farmer = {

    color: "#ffcc88",

    category: "life",

    density: 1200,

    properties: {
        kingdom: "Red",
        gatherCooldown: 0
    },

    tick: function (pixel) {

        if (pixel.gatherCooldown > 0) {
            pixel.gatherCooldown--;
        }

        if (Math.random() < 0.25) {

            tryMove(
                pixel,
                pixel.x + (Math.random() < 0.5 ? -1 : 1),
                pixel.y
            );

        }

        // gather food
        for (let dx = -1; dx <= 1; dx++) {

            for (let dy = -1; dy <= 1; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (
                    !outOfBounds(x, y) &&
                    !isEmpty(x, y, true)
                ) {

                    let other = pixelMap[x][y];

                    if (
                        other.element ===
                        "food_resource"
                    ) {

                        deletePixel(x, y);

                        civilizationsData
                            .kingdoms.Red.food++;

                    }

                }

            }

        }

    }

};

/*
====================================================
 BLUE FARMER
====================================================
*/

elements.blue_farmer = {

    color: "#88ccff",

    category: "life",

    density: 1200,

    properties: {
        kingdom: "Blue",
        gatherCooldown: 0
    },

    tick: function (pixel) {

        if (pixel.gatherCooldown > 0) {
            pixel.gatherCooldown--;
        }

        if (Math.random() < 0.25) {

            tryMove(
                pixel,
                pixel.x + (Math.random() < 0.5 ? -1 : 1),
                pixel.y
            );

        }

        for (let dx = -1; dx <= 1; dx++) {

            for (let dy = -1; dy <= 1; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (
                    !outOfBounds(x, y) &&
                    !isEmpty(x, y, true)
                ) {

                    let other = pixelMap[x][y];

                    if (
                        other.element ===
                        "food_resource"
                    ) {

                        deletePixel(x, y);

                        civilizationsData
                            .kingdoms.Blue.food++;

                    }

                }

            }

        }

    }

};

/*
====================================================
 RED MINER
====================================================
*/

elements.red_miner = {

    color: "#cc6666",

    category: "life",

    density: 1200,

    properties: {
        kingdom: "Red"
    },

    tick: function (pixel) {

        if (Math.random() < 0.2) {

            tryMove(
                pixel,
                pixel.x + (Math.random() < 0.5 ? -1 : 1),
                pixel.y
            );

        }

        for (let dx = -1; dx <= 1; dx++) {

            for (let dy = -1; dy <= 1; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (
                    !outOfBounds(x, y) &&
                    !isEmpty(x, y, true)
                ) {

                    let other = pixelMap[x][y];

                    if (
                        other.element ===
                        "stone_resource"
                    ) {

                        deletePixel(x, y);

                        civilizationsData
                            .kingdoms.Red.stone++;

                    }

                }

            }

        }

    }

};

/*
====================================================
 BLUE MINER
====================================================
*/

elements.blue_miner = {

    color: "#6666cc",

    category: "life",

    density: 1200,

    properties: {
        kingdom: "Blue"
    },

    tick: function (pixel) {

        if (Math.random() < 0.2) {

            tryMove(
                pixel,
                pixel.x + (Math.random() < 0.5 ? -1 : 1),
                pixel.y
            );

        }

        for (let dx = -1; dx <= 1; dx++) {

            for (let dy = -1; dy <= 1; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (
                    !outOfBounds(x, y) &&
                    !isEmpty(x, y, true)
                ) {

                    let other = pixelMap[x][y];

                    if (
                        other.element ===
                        "stone_resource"
                    ) {

                        deletePixel(x, y);

                        civilizationsData
                            .kingdoms.Blue.stone++;

                    }

                }

            }

        }

    }

};

/*
====================================================
 JOB CONVERSION
====================================================
*/

runAfterLoad(function () {

    const oldRedTick =
        elements.red_citizen.tick;

    elements.red_citizen.tick =
        function (pixel) {

            oldRedTick(pixel);

            if (Math.random() < 0.0008) {

                changePixel(
                    pixel,
                    "red_farmer"
                );

            }

            if (Math.random() < 0.0005) {

                changePixel(
                    pixel,
                    "red_miner"
                );

            }

        };

    const oldBlueTick =
        elements.blue_citizen.tick;

    elements.blue_citizen.tick =
        function (pixel) {

            oldBlueTick(pixel);

            if (Math.random() < 0.0008) {

                changePixel(
                    pixel,
                    "blue_farmer"
                );

            }

            if (Math.random() < 0.0005) {

                changePixel(
                    pixel,
                    "blue_miner"
                );

            }

        };

});

console.log("Civilizations Part 3 Loaded");
/*
====================================================
 CIVILIZATIONS.JS
 PART 4 - WARFARE
====================================================
*/

/*
====================================================
 RED SOLDIER
====================================================
*/

elements.red_soldier = {

    color: "#cc0000",

    category: "life",

    density: 1300,

    properties: {
        kingdom: "Red",
        health: 150,
        attack: 15,
        attackCooldown: 0
    },

    tick: function (pixel) {

        if (pixel.attackCooldown > 0) {
            pixel.attackCooldown--;
        }

        // movement
        if (Math.random() < 0.35) {

            tryMove(
                pixel,
                pixel.x + (Math.random() < 0.5 ? -1 : 1),
                pixel.y
            );

        }

        // search for enemies
        for (let dx = -2; dx <= 2; dx++) {

            for (let dy = -2; dy <= 2; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (
                    outOfBounds(x, y) ||
                    isEmpty(x, y, true)
                ) {
                    continue;
                }

                let other = pixelMap[x][y];

                if (
                    other.kingdom === "Blue"
                ) {

                    if (pixel.attackCooldown <= 0) {

                        if (other.health !== undefined) {

                            other.health -=
                                pixel.attack;

                        }

                        pixel.attackCooldown =
                            15;

                        // kill enemy
                        if (
                            other.health !==
                            undefined &&
                            other.health <= 0
                        ) {

                            changePixel(
                                other,
                                "bone"
                            );

                        }

                    }

                }

            }

        }

    }

};

/*
====================================================
 BLUE SOLDIER
====================================================
*/

elements.blue_soldier = {

    color: "#0033cc",

    category: "life",

    density: 1300,

    properties: {
        kingdom: "Blue",
        health: 150,
        attack: 15,
        attackCooldown: 0
    },

    tick: function (pixel) {

        if (pixel.attackCooldown > 0) {
            pixel.attackCooldown--;
        }

        if (Math.random() < 0.35) {

            tryMove(
                pixel,
                pixel.x + (Math.random() < 0.5 ? -1 : 1),
                pixel.y
            );

        }

        for (let dx = -2; dx <= 2; dx++) {

            for (let dy = -2; dy <= 2; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (
                    outOfBounds(x, y) ||
                    isEmpty(x, y, true)
                ) {
                    continue;
                }

                let other = pixelMap[x][y];

                if (
                    other.kingdom === "Red"
                ) {

                    if (pixel.attackCooldown <= 0) {

                        if (other.health !== undefined) {

                            other.health -=
                                pixel.attack;

                        }

                        pixel.attackCooldown =
                            15;

                        if (
                            other.health !==
                            undefined &&
                            other.health <= 0
                        ) {

                            changePixel(
                                other,
                                "bone"
                            );

                        }

                    }

                }

            }

        }

    }

};

/*
====================================================
 SOLDIER RECRUITMENT
====================================================
*/

runAfterLoad(function () {

    const oldRedCitizenTick =
        elements.red_citizen.tick;

    elements.red_citizen.tick =
        function (pixel) {

            oldRedCitizenTick(pixel);

            if (
                civilizationsData
                    .kingdoms.Red.food > 200 &&
                Math.random() < 0.0005
            ) {

                civilizationsData
                    .kingdoms.Red.food -= 10;

                changePixel(
                    pixel,
                    "red_soldier"
                );

            }

        };

    const oldBlueCitizenTick =
        elements.blue_citizen.tick;

    elements.blue_citizen.tick =
        function (pixel) {

            oldBlueCitizenTick(pixel);

            if (
                civilizationsData
                    .kingdoms.Blue.food > 200 &&
                Math.random() < 0.0005
            ) {

                civilizationsData
                    .kingdoms.Blue.food -= 10;

                changePixel(
                    pixel,
                    "blue_soldier"
                );

            }

        };

});

/*
====================================================
 CASTLE HEALTH
====================================================
*/

elements.red_castle.properties = {

    kingdom: "Red",

    health: 1000

};

elements.blue_castle.properties = {

    kingdom: "Blue",

    health: 1000

};

/*
====================================================
 CASTLE DAMAGE SYSTEM
====================================================
*/

runAfterLoad(function () {

    const oldRedSoldierTick =
        elements.red_soldier.tick;

    elements.red_soldier.tick =
        function (pixel) {

            oldRedSoldierTick(pixel);

            for (let dx = -1; dx <= 1; dx++) {

                for (let dy = -1; dy <= 1; dy++) {

                    let x = pixel.x + dx;
                    let y = pixel.y + dy;

                    if (
                        outOfBounds(x, y) ||
                        isEmpty(x, y, true)
                    ) {
                        continue;
                    }

                    let other = pixelMap[x][y];

                    if (
                        other.element ===
                        "blue_castle"
                    ) {

                        if (
                            other.health !==
                            undefined
                        ) {

                            other.health--;

                            if (
                                other.health <= 0
                            ) {

                                changePixel(
                                    other,
                                    "ruins"
                                );

                            }

                        }

                    }

                }

            }

        };

    const oldBlueSoldierTick =
        elements.blue_soldier.tick;

    elements.blue_soldier.tick =
        function (pixel) {

            oldBlueSoldierTick(pixel);

            for (let dx = -1; dx <= 1; dx++) {

                for (let dy = -1; dy <= 1; dy++) {

                    let x = pixel.x + dx;
                    let y = pixel.y + dy;

                    if (
                        outOfBounds(x, y) ||
                        isEmpty(x, y, true)
                    ) {
                        continue;
                    }

                    let other = pixelMap[x][y];

                    if (
                        other.element ===
                        "red_castle"
                    ) {

                        if (
                            other.health !==
                            undefined
                        ) {

                            other.health--;

                            if (
                                other.health <= 0
                            ) {

                                changePixel(
                                    other,
                                    "ruins"
                                );

                            }

                        }

                    }

                }

            }

        };

});

/*
====================================================
 RUINS
====================================================
*/

elements.ruins = {

    color: [
        "#666666",
        "#555555",
        "#777777"
    ],

    category: "civilization",

    behavior: behaviors.WALL,

    density: 4000

};

console.log("Civilizations Part 4 Loaded");
/*
====================================================
 CIVILIZATIONS.JS
 PART 5 - TECHNOLOGY & SPACE AGE
====================================================
*/

if (!civilizationsData.tech) {

    civilizationsData.tech = {

        Red: {
            age: "Stone",
            research: 0,
            gold: 100
        },

        Blue: {
            age: "Stone",
            research: 0,
            gold: 100
        }

    };

}

/*
====================================================
 KINGS
====================================================
*/

elements.red_king = {

    color: "#ffdd00",

    category: "life",

    density: 1300,

    properties: {
        kingdom: "Red",
        health: 300
    },

    tick: function (pixel) {

        if (Math.random() < 0.2) {

            tryMove(
                pixel,
                pixel.x +
                (Math.random() < 0.5 ? -1 : 1),
                pixel.y
            );

        }

    }

};

elements.blue_king = {

    color: "#88ffff",

    category: "life",

    density: 1300,

    properties: {
        kingdom: "Blue",
        health: 300
    },

    tick: function (pixel) {

        if (Math.random() < 0.2) {

            tryMove(
                pixel,
                pixel.x +
                (Math.random() < 0.5 ? -1 : 1),
                pixel.y
            );

        }

    }

};

/*
====================================================
 MARKET
====================================================
*/

elements.market = {

    color: "#ffaa00",

    category: "civilization",

    behavior: behaviors.WALL,

    density: 3000,

    tick: function (pixel) {

        if (Math.random() < 0.005) {

            civilizationsData
                .tech
                .Red
                .gold++;

            civilizationsData
                .tech
                .Blue
                .gold++;

        }

    }

};

/*
====================================================
 RESEARCH LAB
====================================================
*/

elements.research_lab = {

    color: "#00ffaa",

    category: "civilization",

    behavior: behaviors.WALL,

    density: 3000,

    tick: function (pixel) {

        if (Math.random() < 0.01) {

            civilizationsData
                .tech
                .Red
                .research++;

            civilizationsData
                .tech
                .Blue
                .research++;

        }

    }

};

/*
====================================================
 AGE PROGRESSION
====================================================
*/

runAfterLoad(function () {

    setInterval(function () {

        let red =
            civilizationsData.tech.Red;

        let blue =
            civilizationsData.tech.Blue;

        if (red.research > 100) {
            red.age = "Bronze";
        }

        if (red.research > 300) {
            red.age = "Iron";
        }

        if (red.research > 700) {
            red.age = "Industrial";
        }

        if (red.research > 1500) {
            red.age = "Modern";
        }

        if (red.research > 3000) {
            red.age = "Space";
        }

        if (blue.research > 100) {
            blue.age = "Bronze";
        }

        if (blue.research > 300) {
            blue.age = "Iron";
        }

        if (blue.research > 700) {
            blue.age = "Industrial";
        }

        if (blue.research > 1500) {
            blue.age = "Modern";
        }

        if (blue.research > 3000) {
            blue.age = "Space";
        }

    }, 5000);

});

/*
====================================================
 ROCKET
====================================================
*/

elements.rocket = {

    color: [
        "#dddddd",
        "#bbbbbb",
        "#ffffff"
    ],

    category: "space",

    density: 500,

    tick: function (pixel) {

        tryMove(
            pixel,
            pixel.x,
            pixel.y - 1
        );

        if (pixel.y < 20) {

            changePixel(
                pixel,
                "moon_colony"
            );

        }

    }

};

/*
====================================================
 MOON COLONY
====================================================
*/

elements.moon_colony = {

    color: "#ccccff",

    category: "space",

    behavior: behaviors.WALL,

    density: 3000

};

/*
====================================================
 SPACE PROGRAM
====================================================
*/

runAfterLoad(function () {

    setInterval(function () {

        if (
            civilizationsData
                .tech
                .Red
                .age === "Space"
        ) {

            let x =
                Math.floor(
                    Math.random() *
                    width
                );

            createPixel(
                "rocket",
                x,
                height - 10
            );

        }

        if (
            civilizationsData
                .tech
                .Blue
                .age === "Space"
        ) {

            let x =
                Math.floor(
                    Math.random() *
                    width
                );

            createPixel(
                "rocket",
                x,
                height - 10
            );

        }

    }, 20000);

});

/*
====================================================
 DYSON NODE
====================================================
*/

elements.dyson_node = {

    color: "#ffff00",

    category: "space",

    behavior: behaviors.WALL,

    density: 5000

};

/*
====================================================
 MEGASTRUCTURE PROGRAM
====================================================
*/

runAfterLoad(function () {

    setInterval(function () {

        if (
            civilizationsData
                .tech
                .Red
                .research > 10000
        ) {

            let x =
                Math.floor(
                    Math.random() *
                    width
                );

            let y =
                Math.floor(
                    Math.random() *
                    height
                );

            if (isEmpty(x, y)) {

                createPixel(
                    "dyson_node",
                    x,
                    y
                );

            }

        }

        if (
            civilizationsData
                .tech
                .Blue
                .research > 10000
        ) {

            let x =
                Math.floor(
                    Math.random() *
                    width
                );

            let y =
                Math.floor(
                    Math.random() *
                    height
                );

            if (isEmpty(x, y)) {

                createPixel(
                    "dyson_node",
                    x,
                    y
                );

            }

        }

    }, 15000);

});

console.log(
    "Civilizations Part 5 Loaded"
);
/*
====================================================
 CIVILIZATIONS.JS
 PART 6 - FAMILIES & DIPLOMACY
====================================================
*/

if (!civilizationsData.families) {

    civilizationsData.families = {
        nextId: 1
    };

}

if (!civilizationsData.diplomacy) {

    civilizationsData.diplomacy = {

        Red: {
            Blue: "war"
        },

        Blue: {
            Red: "war"
        }

    };

}

/*
====================================================
 FAMILY NAMES
====================================================
*/

const civSurnames = [
    "Ironwood",
    "Stonehill",
    "Brightstar",
    "Ashfall",
    "Blackwell",
    "Oakheart",
    "Silverlake",
    "Stormborn"
];

/*
====================================================
 FAMILY CREATION
====================================================
*/

function createFamily(pixel) {

    if (pixel.familyId) return;

    pixel.familyId =
        civilizationsData.families.nextId++;

    pixel.surname =
        civSurnames[
        Math.floor(
            Math.random() *
            civSurnames.length
        )
        ];

}

/*
====================================================
 CITIZEN FAMILY SUPPORT
====================================================
*/

runAfterLoad(function () {

    const originalRed =
        elements.red_citizen.tick;

    elements.red_citizen.tick =
        function (pixel) {

            createFamily(pixel);

            originalRed(pixel);

        };

    const originalBlue =
        elements.blue_citizen.tick;

    elements.blue_citizen.tick =
        function (pixel) {

            createFamily(pixel);

            originalBlue(pixel);

        };

});

/*
====================================================
 DIPLOMACY CENTER
====================================================
*/

elements.diplomacy_center = {

    color: "#cc88ff",

    category: "civilization",

    behavior: behaviors.WALL,

    density: 3000

};

/*
====================================================
 RANDOM DIPLOMACY EVENTS
====================================================
*/

runAfterLoad(function () {

    setInterval(function () {

        let roll = Math.random();

        if (roll < 0.25) {

            civilizationsData
                .diplomacy
                .Red
                .Blue = "peace";

            civilizationsData
                .diplomacy
                .Blue
                .Red = "peace";

            console.log(
                "Peace Treaty Signed"
            );

        }

        else if (roll < 0.50) {

            civilizationsData
                .diplomacy
                .Red
                .Blue = "alliance";

            civilizationsData
                .diplomacy
                .Blue
                .Red = "alliance";

            console.log(
                "Alliance Formed"
            );

        }

        else {

            civilizationsData
                .diplomacy
                .Red
                .Blue = "war";

            civilizationsData
                .diplomacy
                .Blue
                .Red = "war";

            console.log(
                "War Declared"
            );

        }

    }, 60000);

});

/*
====================================================
 KINGDOM STATISTICS
====================================================
*/

civilizationsData.stats = {

    Red: {
        births: 0,
        deaths: 0,
        battlesWon: 0
    },

    Blue: {
        births: 0,
        deaths: 0,
        battlesWon: 0
    }

};

/*
====================================================
 TOWN HALL
====================================================
*/

elements.town_hall = {

    color: "#ffaa44",

    category: "civilization",

    behavior: behaviors.WALL,

    density: 4000

};

/*
====================================================
 ADVANCED RESEARCH
====================================================
*/

elements.university = {

    color: "#66ffcc",

    category: "civilization",

    behavior: behaviors.WALL,

    density: 3000,

    tick: function (pixel) {

        civilizationsData
            .tech
            .Red
            .research += 0.05;

        civilizationsData
            .tech
            .Blue
            .research += 0.05;

    }

};

/*
====================================================
 SPACEPORT
====================================================
*/

elements.spaceport = {

    color: "#ddddff",

    category: "space",

    behavior: behaviors.WALL,

    density: 5000

};

/*
====================================================
 MARS COLONY
====================================================
*/

elements.mars_colony = {

    color: "#cc7755",

    category: "space",

    behavior: behaviors.WALL,

    density: 3500

};

/*
====================================================
 INTERPLANETARY EXPANSION
====================================================
*/

runAfterLoad(function () {

    setInterval(function () {

        if (
            civilizationsData.tech.Red.research
            > 25000
        ) {

            let x =
                Math.floor(
                    Math.random() * width
                );

            let y =
                Math.floor(
                    Math.random() * height
                );

            if (isEmpty(x, y)) {

                createPixel(
                    "mars_colony",
                    x,
                    y
                );

            }

        }

        if (
            civilizationsData.tech.Blue.research
            > 25000
        ) {

            let x =
                Math.floor(
                    Math.random() * width
                );

            let y =
                Math.floor(
                    Math.random() * height
                );

            if (isEmpty(x, y)) {

                createPixel(
                    "mars_colony",
                    x,
                    y
                );

            }

        }

    }, 30000);

});

console.log(
    "Civilizations Part 6 Loaded"
);
/*
====================================================
 CIVILIZATIONS.JS
 PART 7A - WORLD GENERATION
====================================================
*/

elements.grassland = {
    color: "#66cc55",
    category: "world",
    behavior: behaviors.WALL,
    density: 2500
};

elements.forest_ground = {
    color: "#448844",
    category: "world",
    behavior: behaviors.WALL,
    density: 2500
};

elements.mountain = {
    color: "#888888",
    category: "world",
    behavior: behaviors.WALL,
    density: 5000
};

elements.water_tile = {
    color: "#4488ff",
    category: "world",
    behavior: behaviors.LIQUID,
    density: 1000
};

elements.world_seed = {

    color: "#ffff00",

    category: "world",

    behavior: behaviors.WALL,

    tick: function (pixel) {

        for (let dx = -30; dx <= 30; dx++) {

            for (let dy = -15; dy <= 15; dy++) {

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (
                    outOfBounds(x, y) ||
                    !isEmpty(x, y)
                ) {
                    continue;
                }

                let roll = Math.random();

                if (roll < 0.55) {

                    createPixel(
                        "grassland",
                        x,
                        y
                    );

                }

                else if (roll < 0.75) {

                    createPixel(
                        "forest_ground",
                        x,
                        y
                    );

                    if (
                        isEmpty(x, y - 1)
                    ) {

                        createPixel(
                            "civ_tree",
                            x,
                            y - 1
                        );

                    }

                }

                else if (roll < 0.92) {

                    createPixel(
                        "mountain",
                        x,
                        y
                    );

                }

                else {

                    createPixel(
                        "water_tile",
                        x,
                        y
                    );

                }

            }

        }

        deletePixel(
            pixel.x,
            pixel.y
        );

    }

};

console.log(
    "World Generation Loaded"
);
