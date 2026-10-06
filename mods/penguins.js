/created by 𝔜𝔒𝔖𝔈𝔉
//penguins.js v 3.0 add various human species, more artic animals, new blocks, structures and the cryo nuke (:
//v 1.0 some ice animals
elements.penguin = {
    color: ["#0c0c12","#babae3","#02022e","#d2d2fc","#000000","#5946f0","#5b5b5c","#95a7c4","#f5f17f"],
    state: "solid",
    behavior: [
        "XX|SW:water,salt_water,sugar_water,dirty_water%10|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%50|FX%1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15 AND BO:polar_bear,polar_bear_cub,killer_whale%40",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15"
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2 },
        "cooked_meat": { elem2:null, chance:0.2 },
        "fish": { elem2:null, chance:0.2 },
        "plant": { elem2:null, chance:0.2 },
        "frozen_fish": { elem2:null, chance:0.3 },
        "herring": { elem2:null, chance:0.3 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "poison": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "alcohol": { elem1:"meat", chance:0.025 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
        "pool_water": { elem1:"rotten_meat", chance:0.005 },
        "vinegar": { elem1:"rotten_meat", chance:0.001 }
    },
    egg: "little_penguin",                        
    foodNeed: 10,
    temp: 30,
    tempHigh: 1000,
    stateHigh: "frozen_penguin",
    tempLow: -210,
    stateLow: "frozen_penguin",
    category:"life",
    breakInto: "rotten_meat",
    burn:15,
    burnTime:300,
    density: 1450,
    conduct: 0.2
};

elements.little_penguin = {
    color: ["#e0e0e0","#cad7ed","#4e6282","#373f4a","#fff6a8"],
    state: "solid",
    behavior: [
        "XX|SW:water,salt_water,sugar_water,dirty_water%10|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%60|FX%1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15 AND BO:polar_bear,polar_bear_cub,killer_whale%50",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water,dirty_water%15"
    ],
    reactions: {
        "meat": { elem2:null, chance:0.2 },
        "cooked_meat": { elem2:null, chance:0.2 },
        "fish": { elem2:null, chance:0.2 },
        "frozen_fish": { elem2:null, chance:0.3 },
        "herring": { elem2:null, chance:0.3 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.3 },
        "poison": { elem1:"rotten_meat", chance:0.1 },
        "bleach": { elem1:"rotten_meat", chance:0.1 },
        "infection": { elem1:"rotten_meat", chance:0.025 },
        "uranium": { elem1:"rotten_meat", chance:0.1 },
        "cyanide": { elem1:"rotten_meat", chance:0.1 },
        "chlorine": { elem1:"meat", chance:0.1 },
        "alcohol": { elem1:"meat", chance:0.025 },
        "dirty_water": { elem1:"rotten_meat", chance:0.0001 },
        "pool_water": { elem1:"rotten_meat", chance:0.005 },
        "vinegar": { elem1:"rotten_meat", chance:0.001 }
    },
    egg: "little_penguin",
    foodNeed: 10,
    temp: 30,
    tempHigh: 100,
    stateHigh: "frozen_little_penguin",
    tempLow: -100,
    stateLow: "frozen_little_penguin",
    category:"life",
    breakInto: "rotten_meat",
    burn:15,
    burnTime:300,
    density: 1450,
    conduct: 0.2
};

elements.polar_bear = {
    color: ["#ffffff", "#f0f0f0", "#e3e3e3", "#111111"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:penguin,little_penguin,seal,rat%35|FX%1|M1 AND AT:penguin,little_penguin,seal,rat%25",
        "M2|M1|M1"
    ],
    ignore: ["polar_bear", "polar_bear_cub"],
    reactions: {
        "fish": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 },
        "bleach": { elem1: "rotten_meat", chance: 0.1 },
        "infection": { elem1: "rotten_meat", chance: 0.025 },
        "herring": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "seal": { elem2: null, chance: 0.3 },
        "little_penguin": { elem2: null, chance: 0.3 }
    },
    foodNeed: 15,
    temp: 31,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 250,
    density: 1500,
    conduct: 0.2
};

elements.polar_bear_cub = {
    color: ["#ffffff", "#f5f5f5"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:penguin,little_penguin,rat%20|FX%1|M1 AND AT:penguin,little_penguin,rat%15",
        "M2|M1|M1"
    ],
    ignore: ["polar_bear", "polar_bear_cub"],
    reactions: {
        "fish": { elem2: null, chance: 0.2 },
        "herring": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    baby: "polar_bear",
    foodNeed: 8,
    temp: 31,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 250,
    density: 1480,
    conduct: 0.2
};

elements.seal = {
    color: ["#7a7a7a", "#5c5c5c", "#a1a1a1", "#0f0f0f", "#dbd5d5", "#7d5a40"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale%60|FX%1|M1 AND BO:polar_bear,polar_bear_cub,killer_whale%40",
        "M2|M1|M1"
    ],
    reactions: {
        "fish": { elem2: null, chance: 0.25 },
        "frozen_fish": { elem2: null, chance: 0.3 },
        "herring": { elem2: null, chance: 0.3 },
        "algae": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "seal",
    foodNeed: 12,
    temp: 35,
    tempHigh: 90,
    stateHigh: "cooked_meat",
    tempLow: -120,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 280,
    density: 1350,
    conduct: 0.2
};

elements.seal_pup = {
    name: "seal pup",
    color: [
        "#ffffff", "#fbfbfb", "#f7f7f7", "#f4f4f6", "#f0f0f2", 
        "#edf0f2", "#e5e9ec", "#e1e5e8", "#dcdfe3", "#edeae6", 
        "#f5f2eb", "#eae6df", "#e3ded7", "#ded9d0", "#d4cec4",
        "#ccc6be", "#c4bcb5"
    ],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,polar_bear_cub,killer_whale,arctic_wolf,inuit_body%80|FX%1|M1%35 AND BO:polar_bear,polar_bear_cub,killer_whale,arctic_wolf,inuit_body%60",
        "M2%30|M1%35|M1%35"
    ],
    ignore: ["seal", "seal_pup"],
    reactions: {
        "algae": { elem2: null, chance: 0.15 },
        "herring": { elem2: null, chance: 0.15 },
        "frozen_fish": { elem2: null, chance: 0.15 },
        "fish": { elem2: null, chance: 0.1 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    baby: "seal",
    foodNeed: 6,
    temp: 35,
    tempHigh: 85,
    stateHigh: "cooked_meat",
    tempLow: -130,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 12,
    burnTime: 240,
    density: 1250,
    conduct: 0.22
};

elements.killer_whale = {
    color: ["#0a0a0f", "#030305", "#ffffff", "#d6d6d6"],
    state: "solid",
    behavior: [
        "XX|M2%5 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%14|XX",
        "AT:penguin,little_penguin,seal,polar_bear,polar_bear_cub,rat,herring,narwhal,clam%40 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%30|FX%0.5|AT:penguin,little_penguin,seal,polar_bear,polar_bear_cub,rat,seal_pup%30 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%30",
        "M2|XX|M2 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%5"
    ],
    ignore: ["killer_whale"],
    reactions: {
        "fish": { elem2: null, chance: 0.3 },
        "herring": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "seal": { elem2: null, chance: 0.3 },
        "seal_pup": { elem2: null, chance: 0.3 },
        "little_penguin": { elem2: null, chance: 0.3 },
        "clam": { elem2: null, chance: 0.3 },
        "narwhal": { elem2: null, chance: 0.3 },
        "walrus": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 }
    },
    category: "life",
    foodNeed: 20,
    temp: 36,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -80,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1026,
    conduct: 0.1
};

elements.frozen_penguin = {
    color: ["#a1c1e0", "#0c0c12", "#84a9cc"], 
    state: "solid",
    behavior: behaviors.WALL, 
    category: "ice solids",
    density: 917,
    temp: 1005,               
    tempLow: 0,
    stateLow: "penguin",      
    conduct: 0.1
};

elements.frozen_little_penguin = {
    color: ["#cad7ed", "#e0e0e0", "#4e6282"], 
    state: "solid",
    behavior: behaviors.WALL, 
    category: "ice solids",
    density: 917,
    temp: 105,                
    tempLow: 0,
    stateLow: "little_penguin", 
    conduct: 0.1
};

//v 2.0 fixed bugs and another some animals
elements.clam = {
    color: ["#d1c7bd", "#a89b8d", "#ede6de"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "XX|FX%0.1 AND M1 AND SW:water,salt_water,sugar_water%100|XX",
        "M2|XX|M2"
    ],
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.1 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    category: "life",
    foodNeed: 2,
    temp: 8,
    tempHigh: 50,
    stateHigh: "cooked_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat"
};

elements.walrus = {
    color: ["#634a3b", "#7c604f", "#4f3729", "#bda698"],
    state: "solid",
    behavior: [
        "XX|SW:water,salt_water,sugar_water%5|XX",
        "BO:polar_bear,killer_whale%40|FX%1|M1 AND SW:water,salt_water,sugar_water%10 AND BO:polar_bear,killer_whale%20",
        "M2|M1|M1 AND SW:water,salt_water,sugar_water%10"
    ],
    reactions: {
        "algae": { elem2: null, chance: 0.25 },
        "herring": { elem2: null, chance: 0.25 },
        "clam": { elem2: null, chance: 0.35 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 },
        "fish": { elem2: null, chance: 0.3 },
        "plant": { elem2: null, chance: 0.3 }
    },
    egg: "walrus",
    foodNeed: 14,
    temp: 36,
    tempHigh: 85,
    stateHigh: "cooked_meat",
    tempLow: -130,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 260,
    density: 1200,
    conduct: 0.18
};

elements.arctic_wolf = {
    color: ["#fcfcfc", "#eaeaea", "#d3d3d3", "#b5b5b5"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:penguin,little_penguin,rat,rabbit,seal%40 AND BO:polar_bear%40|FX%1|M1%80 AND AT:penguin,little_penguin,rat,rabbit,seal%30 AND BO:polar_bear%30",
        "M2%50|M1%80|M1%80"
    ],
    ignore: ["arctic_wolf"],
    reactions: {
        "meat": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.25 },                                                                                 
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 },
        "bleach": { elem1: "rotten_meat", chance: 0.1 },
        "infection": { elem1: "rotten_meat", chance: 0.025 },
        "herring": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "artic_hare": { elem2: null, chance: 0.3 },
        "seal": { elem2: null, chance: 0.3 },
        "little_penguin": { elem2: null, chance: 0.3 },
        "fish": { elem2: null, chance: 0.3 }
    },
    egg: "arctic_wolf",
    foodNeed: 12,
    temp: 32,
    tempHigh: 78,
    stateHigh: "cooked_meat",
    tempLow: -140,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1400,
    conduct: 0.22
};

//v 3.0 another artic animals and stuff...
elements.arctic_hare = {
    color: ["#ffffff", "#f7f7f7", "#eeeeee", "#111111", "#662c0e"],
    state: "solid",
    behavior: [
        "XX|M1%30 AND SW:water,salt_water%5|XX",
        "BO:polar_bear,arctic_wolf%70|FX%1|M1%95 AND BO:polar_bear,arctic_wolf%50",
        "M2%70|M1%95|M1%95"
    ],
    ignore: ["arctic_hare"],
    reactions: {
        "plant": { elem2: null, chance: 0.25 },
        "grass": { elem2: null, chance: 0.25 },
        "algae": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "arctic_hare",
    foodNeed: 6,
    temp: 33,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -145,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 10,
    burnTime: 180,
    density: 1100,
    conduct: 0.25
};
 elements.arctic_owl = {
    color: ["#ffffff", "#fbfbfb", "#f7f7f7", "#fad61d"],
    state: "solid",
    behavior: [
        "M2|M1 AND AT:arctic_hare,rat%50|M2",
        "M1|FLY AND AT:arctic_hare,rat%30|M1",
        "M2|M1|M2"
    ],
    ignore: ["arctic_owl"],
    reactions: {
        "meat": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.25 },
        "artic_hare": { elem2: null, chance: 0.38 },
        "herring": { elem2: null, chance: 0.25 },
        "fish": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.2 },
        "walrus": { elem2: null, chance: 0.2 },
        "rat": { elem2: null, chance: 0.25 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "arctic_owl",
    foodNeed: 10,
    temp: 34,
    tempHigh: 76,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1000,
    conduct: 0.2
};
elements.inuit_head = {
    color: ["#d9c3b0", "#e0dacb"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,killer_whale,arctic_wolf%40|FX%1|M1 AND BO:polar_bear,killer_whale,arctic_wolf%30",
        "XX|CR:inuit_body|XX"
    ],
    ignore: ["inuit_head", "inuit_body"],
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    foodNeed: 12,
    temp: 36,
    tempHigh: 45,
    stateHigh: "meat",
    tempLow: -60,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "meat",
    density: 1030,
    conduct: 0.1
};

elements.arctic_fox = {
    color: ["#ffffff", "#f2f2f2", "#e6e6e6", "#222222", "#d7beab", "#e5c2a3", "#c4a482"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:arctic_hare,rat,penguin,little_penguin%40 AND BO:polar_bear,arctic_wolf%50|FX%1|M1%85 AND AT:arctic_hare,rat,penguin,little_penguin%30 AND BO:polar_bear,arctic_wolf%30",
        "M2%60|M1%85|M1%85"
    ],
    ignore: ["arctic_fox"],
    reactions: {
        "meat": { elem2: null, chance: 0.25 },
        "cooked_meat": { elem2: null, chance: 0.25 },
       "artic_hare": { elem2: null, chance: 0.25 },
        "artic_owl": { elem2: null, chance: 0.25 },
        "herring": { elem2: null, chance: 0.25 },
        "plant": { elem2: null, chance: 0.25 },
        "fish": { elem2: null, chance: 0.25 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "arctic_fox",
    foodNeed: 8,
    temp: 32,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 12,
    burnTime: 200,
    density: 1200,
    conduct: 0.22
};

elements.inuit = {
    color: ["#543d2b", "#3a4f66"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("inuit_body", pixel.x, pixel.y+1);
            if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "inuit_body") {
                pixelMap[pixel.x][pixel.y+1].color = pixelColorPick(pixelMap[pixel.x][pixel.y+1]);
            }
            pixel.element = "inuit_head";
            pixel.color = pixelColorPick(pixel);
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("inuit_head", pixel.x, pixel.y-1);
            pixel.element = "inuit_body";
        }
        else {
            deletePixel(pixel.x, pixel.y);
        }
    }
};

elements.inuit_body = {
    color: ["#543d2b", "#3a4f66"],
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: 25,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 },
        "penguin": { "elem2": null, "chance": 0.2 },
        "little_penguin": { "elem2": null, "chance": 0.2 },
        "seal": { "elem2": null, "chance": 0.2 },
        "walrus": { "elem2": null, "chance": 0.2 },
        "arctic_hare": { "elem2": null, "chance": 0.2 },
        "fish": { "elem2": null, "chance": 0.3 },
        "herring": { "elem2": null, "chance": 0.3 },
        "clam": { "elem2": null, "chance": 0.3 }
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true)) {
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element == "inuit_head") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }

        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "inuit_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) {
                pixel.dead = head.dead;
            }
        }
        else { var head = null; }

        if (isEmpty(pixel.x, pixel.y-1)) {
            if (Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y-1);
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head == null) { return; }
        else if (Math.random() < 0.1) {
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) {
                pixel.dir *= -1;
            }
        }
    }
};

elements.inuit_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: 25,
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    reactions: {
        "cancer": { "elem1":"cancer", "chance":0.005 },
        "radiation": { "elem1":["ash","meat","rotten_meat","cooked_meat"], "chance":0.4 }
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }

        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "inuit_body") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) {
                pixel.dead = body.dead;
            }
        }
        else { var body = null; }

        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1) {
                createPixel("blood", pixel.x, pixel.y+1);
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
    }
};

elements.narwhal = {
    color: ["#2a3b4c", "#3a4f66", "#5c7385", "#7a8f9f", "#ffffff", "#111111"],
    state: "solid",
    behavior: [
        "XX|M2%5 AND SW:water,salt_water,sugar_water,dirty_water%14|XX",
        "AT:fish,herring,clam%35 AND BO:killer_whale%40|FX%0.5|AT:fish,herring,clam%25 AND BO:killer_whale%30",
        "M2|XX|M2 AND SW:water,salt_water,sugar_water,dirty_water%5"
    ],
    ignore: ["narwhal"],
    reactions: {
        "fish": { elem2: null, chance: 0.35 },
        "herring": { elem2: null, chance: 0.35 },
        "clam": { elem2: null, chance: 0.35 },
        "cooked_meat": {elem2:null,chance:0.35 },
        "algae": { elem2: null, chance: 0.35 },
        "plant": { elem2: null, chance: 0.35 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    category: "life",
    foodNeed: 15,
    temp: 35,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -80,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1026,
    conduct: 0.12
};

elements.reindeer = {
    color: ["#8b5a2b", "#a07855", "#bc987e", "#d2b48c", "#eeeeee"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:polar_bear,arctic_wolf,inuit_body%30|FX%1|M1%75 AND BO:polar_bear,arctic_wolf,inuit_body%20",
        "M2%50|M1%75|M1%75"
    ],
    ignore: ["reindeer", "flying_reindeer"],
    reactions: {
        "plant": { elem2: null, chance: 0.25 },
        "grass": { elem2: null, chance: 0.25 },
        "algae": { elem2: null, chance: 0.2 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "reindeer",
    foodNeed: 8,
    temp: 34,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1300,
    conduct: 0.22
};

elements.flying_reindeer = {
    color: ["#a0522d", "#cd853f", "#deb887", "#782e00", "#c27342"],
    state: "solid",
    behavior: [
        "M2|M1 AND BO:polar_bear,arctic_wolf,inuit_body%30|M2",
        "M1|FLY|M1",
        "M2|M1|M2"
    ],
    ignore: ["reindeer", "flying_reindeer"],
    reactions: {
        "sugar": { elem2: null, chance: 0.25 },
        "caramel": { elem2: null, chance: 0.25 },
        "dirt": { elem2: "rainbow", chance: 0.25 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "flying_reindeer",
    foodNeed: 8,
    temp: 34,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -150,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 220,
    density: 1000,
    conduct: 0.22
};

elements.santa_hat = {
    color: ["#ff0000", "#d60000"],
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "santa") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        }
    }
};

elements.santa_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1040,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "santa") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.santa = {
    name: "santa",
    color: ["#ff0000", "#d60000"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    onPlace: function(pixel) {
        logMessage("merry christmas");
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-2)) {
            createPixel("santa_head", pixel.x, pixel.y-1);
            createPixel("santa_hat", pixel.x, pixel.y-2);
            if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "santa_head") {
                pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1]);
            }
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "santa_hat") {
                pixelMap[pixel.x][pixel.y-2].color = pixelColorPick(pixelMap[pixel.x][pixel.y-2]);
            }
            pixel.color = pixelColorPick(pixel);
        }
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "santa_head") {
                if (isEmpty(pixel.x, pixel.y-1)) movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
            }
            if (!isEmpty(pixel.x, pixel.y-3, true) && pixelMap[pixel.x][pixel.y-3].element == "santa_hat") {
                if (isEmpty(pixel.x, pixel.y-2)) movePixel(pixelMap[pixel.x][pixel.y-3], pixel.x, pixel.y-2);
            }
        }
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "santa_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { pixel.dead = head.dead; }
        } else { var head = null; }
        if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "santa_hat") {
            var hat = pixelMap[pixel.x][pixel.y-2];
        } else { var hat = null; }
        if (head == null || hat == null) { return; }
        if (Math.random() < 0.12) {
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1) && isEmpty(pixel.x+move[0], pixel.y+move[1]-2)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        movePixel(hat, hat.x+move[0], hat.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) { pixel.dir *= -1; }
        }
    }
};

elements.gingerbread_man = {
    name: "gingerbread man ",
    color: ["#c48b53", "#b3773e", "#a1642a", "#ffffff", "#5bc0be"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "BO:santa,lemming,arctic_fox,polar_bear%50|FX%1|M1%70 AND BO:santa,lemming,arctic_fox,polar_bear%40",
        "M2%30|M1%70|M1%70"
    ],
    ignore: ["gingerbread_man"],
    reactions: {
        "water": { elem1: "sugar_water", chance: 0.15 },
        "salt_water": { elem1: "sugar_water", chance: 0.15 },
        "dirty_water": { elem1: "sugar_water", chance: 0.15 },
        "milk": { elem1: "sugar_water", chance: 0.2 },
        "fire": { elem1: "ash", chance: 0.1 },
        "magma": { elem1: "smoke", chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.2 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "gingerbread_man",
    foodNeed: 4,
    temp: 20,
    tempHigh: 180,
    stateHigh: "ash",
    tempLow: -100,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "sugar",
    burn: 15,
    burnTime: 120,
    density: 1100,
    conduct: 0.15
};

elements.marlon_hat = {
    color: ["#ff6600", "#cc5200"],
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "marlon") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        }
    }
};


elements.marlon_hat = {
    color: ["#ff6600", "#cc5200"],
    category: "life",
    hidden: true,
    density: 1010,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+2, true) && pixelMap[pixel.x][pixel.y+2].element == "marlon") {
            var body = pixelMap[pixel.x][pixel.y+2];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        }
    }
};

elements.marlon_head = {
    color: ["#d9c3b0", "#e0dacb"],
    category: "life",
    hidden: true,
    density: 1040,
    state: "solid",
    tempHigh: 250,
    stateHigh: "cooked_meat",
    tempLow: -273,
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.2 }
    },
    properties: { dead: false },
    tick: function(pixel) {
        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
                return;
            }
        }
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "marlon") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { pixel.dead = body.dead; }
        } else { var body = null; }
    }
};

elements.marlon = {
    name: "marlon",
    color: ["#1a52c5", "#143fa3"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    onPlace: function(pixel) {
        logMessage("it's me, marlon");
    },
    reactions: {
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y-1) && isEmpty(pixel.x, pixel.y-2)) {
            createPixel("marlon_head", pixel.x, pixel.y-1);
            createPixel("marlon_hat", pixel.x, pixel.y-2);
            if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "marlon_head") {
                pixelMap[pixel.x][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x][pixel.y-1]);
            }
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "marlon_hat") {
                pixelMap[pixel.x][pixel.y-2].color = pixelColorPick(pixelMap[pixel.x][pixel.y-2]);
            }
            pixel.color = pixelColorPick(pixel);
        }
        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "marlon_head") {
                if (isEmpty(pixel.x, pixel.y-1)) movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
            }
            if (!isEmpty(pixel.x, pixel.y-3, true) && pixelMap[pixel.x][pixel.y-3].element == "marlon_hat") {
                if (isEmpty(pixel.x, pixel.y-2)) movePixel(pixelMap[pixel.x][pixel.y-3], pixel.x, pixel.y-2);
            }
        }
        
        var frontX = pixel.x + pixel.dir;
        if (frontX >= 0 && frontX < width) {
            if (!isEmpty(frontX, pixel.y, true) && pixelMap[frontX][pixel.y].element === "little_penguin") {
                var target = pixelMap[frontX][pixel.y];
                var targetX = target.x + (pixel.dir * 6);
                var targetY = target.y - 8;
                if (targetX >= 0 && targetX < width && targetY >= 0 && targetY < height) {
                    if (isEmpty(targetX, targetY)) {
                        movePixel(target, targetX, targetY);
                        logMessage("¡Al precipicio!");
                    }
                }
            }
         frontX = pixel.x - pixel.dir;
        }

        doHeat(pixel);
        if (pixel.dead) {
            if (pixelTicks-pixel.dead > 200) {
                pixel.element = "rotten_meat";
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "marlon_head") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { pixel.dead = head.dead; }
        } else { var head = null; }
        if (!isEmpty(pixel.x, pixel.y-2, true) && pixelMap[pixel.x][pixel.y-2].element == "marlon_hat") {
            var hat = pixelMap[pixel.x][pixel.y-2];
        } else { var hat = null; }
        if (head == null || hat == null) { return; }
        if (Math.random() < 0.12) {
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1]
            ];
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1) && isEmpty(pixel.x+move[0], pixel.y+move[1]-2)) {
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1])) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        movePixel(hat, hat.x+move[0], hat.y+move[1]);
                        break;
                    }
                }
            }
            if (Math.random() < 0.15) { pixel.dir *= -1; }
        }
    }
};


elements.beluga_whale = {
    name: "beluga",
    color: ["#ffffff", "#f9fbfb", "#f0f4f4", "#e1e8e8", "#c8d6e5", "#d1d8e0", "#f1f2f6", "#edf2f4"],
    state: "solid",
    behavior: [
        "XX|M2%5 AND SW:water,salt_water,sugar_water,dirty_water%14|XX",
        "AT:fish,herring,clam%30 AND BO:killer_whale%50|FX%0.5|AT:fish,herring,clam%20 AND BO:killer_whale%40",
        "M2|XX|M2 AND SW:water,salt_water,sugar_water,dirty_water%5"
    ],
    ignore: ["beluga_whale"],
    reactions: {
        "fish": { elem2: null, chance: 0.3 },
       "frozen_fish": { elem2: null, chance: 0.3 },
        "herring": { elem2: null, chance: 0.3 },
        "clam": { elem2: null, chance: 0.3 },
        "algae": { elem2: null, chance: 0.25 },
        "plant": { elem2: null, chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },

    category: "life",
    foodNeed: 14,
    temp: 35,
    tempHigh: 75,
    stateHigh: "cooked_meat",
    tempLow: -85,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 200,
    density: 1025,
    conduct: 0.11
};
elements.lemming = {
    color: ["#5b92e5", "#7ba7ed", "#ffffff", "#3b6cc4"],
    state: "solid",
    behavior: [
        "XX|XX|XX",
        "AT:fish,herring,cooked_meat,chocolate,caramel%60 AND BO:polar_bear%15|FX%1|M1%95 AND AT:fish,herring,cooked_meat,chocolate,caramel%50",
        "M2%40|M1%95|M1%95"
    ],
    ignore: ["lemming"],
    reactions: {
        "fish": { elem2: "lemming", chance: 0.15 },
        "herring": { elem2: "lemming", chance: 0.15 },
        "chocolate": { elem2: "lemming", chance: 0.3 },
        "sugar": { elem2: "lemming", chance: 0.25 },
        "caramel": { elem2: "lemming", chance: 0.3 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "poison": { elem1: "rotten_meat", chance: 0.1 }
    },
    egg: "lemming",
    foodNeed: 5,
    temp: 36,
    tempHigh: 80,
    stateHigh: "cooked_meat",
    tempLow: -120,
    stateLow: "frozen_meat",
    category: "life",
    breakInto: "rotten_meat",
    burn: 10,
    burnTime: 150,
    density: 1100,
    conduct: 0.2
};

elements.igloo_ice = {
    color: ["#e6f2f2", "#d1e0e0", "#bfe6e6"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    temp: -40,
    tempHigh: 120,
    stateHigh: "water",
    density: 920,
    conduct: 0.01,
    hardness: 0.5
};

elements.greenland_shark = {
    name: "greenland shark",
    color: ["#3d4246", "#2f3235", "#212325", "#4a4641", "#1a1c1e"],
    state: "solid",
    category: "life",
    behavior: [
        "XX|M2%1 AND SW:water,salt_water,dirty_water%5|XX",
        "AT:fish,herring,clam,meat,rotten_meat,cooked_meat%40|FX%0.2|AT:fish,herring,clam,meat,rotten_meat,cooked_meat%30",
        "M2%5|XX|M2%1 AND SW:water,salt_water,dirty_water%5"
    ],
    ignore: ["greenland_shark"],
    reactions: {
        "fish": { elem2: null, chance: 0.35 },
        "herring": { elem2: null, chance: 0.35 },
        "clam": { elem2: null, chance: 0.35 },
        "meat": { elem2: null, chance: 0.5 },
        "rotten_meat": { elem2: null, chance: 0.6 },
        "cooked_meat": { elem2: null, chance: 0.5 },
        "frozen_meat": { elem2: null, chance: 0.5 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.2 },
        "poison": { elem1: "rotten_meat", chance: 0.05 }
    },
    foodNeed: 12,
    temp: 2,
    tempHigh: 55,
    stateHigh: "cooked_meat",
    tempLow: -100,
    stateLow: "frozen_meat",
    breakInto: "rotten_meat",
    burn: 15,
    burnTime: 250,
    density: 1032,
    conduct: 0.1
};

elements.igloo = {
    color: ["#e6f2f2", "#ffffff", "#d1e0e0"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        if (isEmpty(x, y-5)) createPixel("igloo_ice", x, y-5);
        if (isEmpty(x-1, y-5)) createPixel("igloo_ice", x-1, y-5);
        if (isEmpty(x+1, y-5)) createPixel("igloo_ice", x+1, y-5);
        if (isEmpty(x-2, y-4)) createPixel("igloo_ice", x-2, y-4);
        if (isEmpty(x+2, y-4)) createPixel("igloo_ice", x+2, y-4);
        if (isEmpty(x-3, y-3)) createPixel("igloo_ice", x-3, y-3);
        if (isEmpty(x+3, y-3)) createPixel("igloo_ice", x+3, y-3);
        if (isEmpty(x-4, y-2)) createPixel("igloo_ice", x-4, y-2);
        if (isEmpty(x+4, y-2)) createPixel("igloo_ice", x+4, y-2);
        if (Math.random() < 0.20) {
            if (isEmpty(x, y-2)) createPixel("inuit", x, y-2);
        }
        if (isEmpty(x-4, y-1)) createPixel("igloo_ice", x-4, y-1);
        if (isEmpty(x+4, y-1)) createPixel("igloo_ice", x+4, y-1);
        for (var i = -4; i <= 4; i++) {
            if (isEmpty(x+i, y)) createPixel("igloo_ice", x+i, y);
        }
        deletePixel(pixel.x, pixel.y);
    }
};

elements.igloo_large = {
    color: ["#cce6e6", "#b3da00", "#99cdcd"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        if (isEmpty(x, y-7)) createPixel("igloo_ice", x, y-7);
        if (isEmpty(x-1, y-7)) createPixel("igloo_ice", x-1, y-7);
        if (isEmpty(x+1, y-7)) createPixel("igloo_ice", x+1, y-7);
        if (isEmpty(x-2, y-6)) createPixel("igloo_ice", x-2, y-6);
        if (isEmpty(x+2, y-6)) createPixel("igloo_ice", x+2, y-6);
        if (isEmpty(x-3, y-5)) createPixel("igloo_ice", x-3, y-5);
        if (isEmpty(x+3, y-5)) createPixel("igloo_ice", x+3, y-5);
        if (isEmpty(x-4, y-4)) createPixel("igloo_ice", x-4, y-4);
        if (isEmpty(x+4, y-4)) createPixel("igloo_ice", x+4, y-4);
        if (isEmpty(x-5, y-3)) createPixel("igloo_ice", x-5, y-3);
        if (isEmpty(x+5, y-3)) createPixel("igloo_ice", x+5, y-3);
        if (isEmpty(x-5, y-2)) createPixel("igloo_ice", x-5, y-2);
        if (isEmpty(x+5, y-2)) createPixel("igloo_ice", x+5, y-2);
        if (isEmpty(x-5, y-1)) createPixel("igloo_ice", x-5, y-1);
        if (isEmpty(x+5, y-1)) createPixel("igloo_ice", x+5, y-1);
        
        if (isEmpty(x-2, y-2)) createPixel("inuit", x-2, y-2);
        if (isEmpty(x, y-2)) createPixel("inuit", x, y-2);
        if (isEmpty(x+2, y-2)) createPixel("inuit", x+2, y-2);

        for (var i = -5; i <= 5; i++) {
            if (isEmpty(x+i, y)) createPixel("igloo_ice", x+i, y);
        }
        deletePixel(pixel.x, pixel.y);
    }
};

elements.igloo_huge = {
    color: ["#99cdcd", "#80c0c0", "#66b2b2"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        if (isEmpty(x, y-9)) createPixel("igloo_ice", x, y-9);
        if (isEmpty(x-1, y-9)) createPixel("igloo_ice", x-1, y-9);
        if (isEmpty(x+1, y-9)) createPixel("igloo_ice", x+1, y-9);
        if (isEmpty(x-2, y-8)) createPixel("igloo_ice", x-2, y-8);
        if (isEmpty(x+2, y-8)) createPixel("igloo_ice", x+2, y-8);
        if (isEmpty(x-3, y-7)) createPixel("igloo_ice", x-3, y-7);
        if (isEmpty(x+3, y-7)) createPixel("igloo_ice", x+3, y-7);
        if (isEmpty(x-4, y-6)) createPixel("igloo_ice", x-4, y-6);
        if (isEmpty(x+4, y-6)) createPixel("igloo_ice", x+4, y-6);
        if (isEmpty(x-5, y-5)) createPixel("igloo_ice", x-5, y-5);
        if (isEmpty(x+5, y-5)) createPixel("igloo_ice", x+5, y-5);
        if (isEmpty(x-6, y-4)) createPixel("igloo_ice", x-6, y-4);
        if (isEmpty(x+6, y-4)) createPixel("igloo_ice", x+6, y-4);
        if (isEmpty(x-6, y-3)) createPixel("igloo_ice", x-6, y-3);
        if (isEmpty(x+6, y-3)) createPixel("igloo_ice", x+6, y-3);
        if (isEmpty(x-6, y-2)) createPixel("igloo_ice", x-6, y-2);
        if (isEmpty(x+6, y-2)) createPixel("igloo_ice", x+6, y-2);
        if (isEmpty(x-6, y-1)) createPixel("igloo_ice", x-6, y-1);
        if (isEmpty(x+6, y-1)) createPixel("igloo_ice", x+6, y-1);
        
        if (isEmpty(x-3, y-2)) createPixel("inuit", x-3, y-2);
        if (isEmpty(x-1, y-2)) createPixel("inuit", x-1, y-2);
        if (isEmpty(x, y-4)) createPixel("inuit", x, y-4);
        if (isEmpty(x+1, y-2)) createPixel("inuit", x+1, y-2);
        if (isEmpty(x+3, y-2)) createPixel("inuit", x+3, y-2);
        if (isEmpty(x, y-2)) createPixel("seal", x, y-2);

        for (var i = -6; i <= 6; i++) {
            if (isEmpty(x+i, y)) createPixel("igloo_ice", x+i, y);
        }
        deletePixel(pixel.x, pixel.y);
    }
};
elements.packed_ice_wall = {
    color: ["#a1c1e0", "#b3d1ff", "#8cbfff"],
    state: "solid",
    behavior: behaviors.WALL,
    category: "ice solids",
    temp: -50,
    tempHigh: 300,
    stateHigh: "water",
    density: 950,
    conduct: 0,
    hardness: 0.8
};

elements.ice_spike = {
    color: ["#e6f2f2", "#bfe6e6", "#d1e0e0"],
    category: "ice solids",
    state: "solid",
    temp: -40,
    tempHigh: 150,
    stateHigh: "water",
    density: 920,
    conduct: 0.01,
    renderer: function(pixel, ctx) {
        var size = pixelSize;
        var cx = canvasCoord(pixel.x);
        var cy = canvasCoord(pixel.y);
        ctx.fillStyle = pixel.color;
        if (pixel.spikeType === 1) {
            ctx.fillRect(cx + size/3, cy, size/3, size/3);
            ctx.fillRect(cx + size/6, cy + size/3, size*2/3, size*2/3);
        } else if (pixel.spikeType === 2) {
            ctx.fillRect(cx + size/6, cy, size*2/3, size);
        } else if (pixel.spikeType === 3) {
            ctx.fillRect(cx + size/6, cy, size*2/3, size*5/6);
            ctx.fillRect(cx + size/3, cy + size*2/3, size/2, size/3);
        } else if (pixel.spikeType === 4) {
            ctx.fillRect(cx + size/3, cy, size/2, size/3);
            ctx.fillRect(cx + size/3, cy + size/6, size/3, size/3);
            ctx.fillRect(cx + size/3, cy + size/3, size/6, size/2);
        } else {
            ctx.fillRect(cx, cy, size, size);
        }
    },
    tick: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        var head = y;
        while (head > 0 && !isEmpty(x, head-1, true) && pixelMap[x][head-1].element === "ice_spike") {
            head--;
        }
        var base = y;
        while (head < height && !isEmpty(x, base+1, true) && pixelMap[x][base+1].element === "ice_spike") {
            base++;
        }
        var totalLength = base - head + 1;
        var localIndex = y - head + 1;
        if (totalLength === 1) {
            pixel.spikeType = 4;
        } else if (localIndex === 1) {
            pixel.spikeType = 4;
        } else if (localIndex === 2) {
            pixel.spikeType = 3;
        } else if (localIndex === totalLength) {
            pixel.spikeType = 1;
        } else {
            pixel.spikeType = 2;
        }
        if (isEmpty(x, head-1)) {
            for (var i = base; i >= y; i--) {
                if (!isEmpty(x, i, true) && pixelMap[x][i].element === "ice_spike") {
                    var currentPixel = pixelMap[x][i];
                    if (isEmpty(x, i+1)) {
                        tryMove(currentPixel, x, i+1);
                    } else if (!isEmpty(x, i+1, true)) {
                        var target = pixelMap[x][i+1];
                        if (target.element !== "ice_spike" && target.element !== "packed_ice_wall") {
                            if (elements[target.element].category === "life") {
                                target.element = "frozen_meat";
                                target.color = pixelColorPick(target);
                            } else {
                                deletePixel(x, i+1);
                            }
                        }
                    }
                }
            }
        }
    }
};

elements.cryo_nuke = {
    color: ["#00ffff", "#33ffff", "#00cccc", "#111111"],
    state: "solid",
    category: "weapons",
    density: 3000,
    maxSize: 1,
    cooldown: 50,
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            tryMove(pixel, pixel.x, pixel.y+1);
        } 
        else {
            var downPixel = pixelMap[pixel.x][pixel.y+1];
            if (downPixel && downPixel.element !== "cryo_nuke") {
                var radius = 30;
                var startX = Math.max(0, pixel.x - radius);
                var endX = Math.min(width - 1, pixel.x + radius);
                var startY = Math.max(0, pixel.y - radius);
                var endY = Math.min(height - 1, pixel.y + radius);

                for (var x = startX; x <= endX; x++) {
                    for (var y = startY; y <= endY; y++) {
                        var dist = Math.sqrt(Math.pow(x - pixel.x, 2) + Math.pow(y - pixel.y, 2));
                        if (dist <= radius) {
                            if (!isEmpty(x, y, true)) {
                                var target = pixelMap[x][y];
                                if (target.element !== "cryo_nuke") {
                                    target.temp = -273;
                                    if (target.element === "water" || target.element === "salt_water" || target.element === "dirty_water") {
                                        changePixel(target, "ice");
                                    } else if (target.element === "meat" || elements[target.element].category === "life") {
                                        if (target.element !== "inuit" && target.element !== "inuit_body" && target.element !== "inuit_head") {
                                            target.element = "packed_ice_wall";
                                            target.color = pixelColorPick(target);
                                        }
                                    } else if (target.element === "fire" || target.element === "smoke") {
                                        deletePixel(x, y);
                                    }
                                }
                            }
                        }
                    }
                }
                deletePixel(pixel.x, pixel.y);
            }
        }
    }
};

elements.iceberg = {
    color: ["#a1c1e0", "#b3d1ff", "#ffffff", "#8cbfff"],
    category: "ice solids",
    state: "solid",
    density: 2000,
    maxSize: 1,
    cooldown: 20,
    onPlace: function(pixel) {
        var x = pixel.x;
        var y = pixel.y;
        while (y < 1000 && isEmpty(x, y+1)) {
            y++;
        }
        for (var h = 0; h < 20; h++) {
            var widthOffset = 22 - h;
            for (var i = -widthOffset; i <= widthOffset; i++) {
                if (isEmpty(x+i, y-h)) createPixel("packed_ice_wall", x+i, y-h);
            }
        }
        for (var h = 1; h <= 15; h++) {
            var widthOffset = 22 - h;
            for (var i = -widthOffset; i <= widthOffset; i++) {
                if (isEmpty(x+i, y+h)) createPixel("packed_ice_wall", x+i, y+h);
            }
        }
        if (Math.random() < 0.30) {
            var surfaceY = y - 20;
            if (isEmpty(x-12, surfaceY)) createPixel("penguin", x-12, surfaceY);
            if (isEmpty(x-4, surfaceY)) createPixel("penguin", x-4, surfaceY);
            if (isEmpty(x+4, surfaceY)) createPixel("penguin", x+4, surfaceY);
            if (isEmpty(x+12, surfaceY)) createPixel("penguin", x+12, surfaceY);
        }
        deletePixel(pixel.x, pixel.y);
    }
};
