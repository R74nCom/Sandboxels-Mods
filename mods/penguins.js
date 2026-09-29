//created by 𝔜𝔒𝔖𝔈𝔉
//penguins.js v2.0 fixed various bugs and added walrus, artic wolf and clam (:
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

elements.killer_whale = {
    color: ["#0a0a0f", "#030305", "#ffffff", "#d6d6d6"],
    state: "solid",
    behavior: [
        "XX|M2%5 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%14|XX",
        "AT:penguin,little_penguin,seal,polar_bear,polar_bear_cub,rat,herring%40 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%30|FX%0.5|AT:penguin,little_penguin,seal,polar_bear,polar_bear_cub,rat%30 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%30",
        "M2|XX|M2 AND SW:water,salt_water,sugar_water,seltzer,pool_water,primordial_soup%5"
    ],
    ignore: ["killer_whale"],
    reactions: {
        "fish": { elem2: null, chance: 0.3 },
        "herring": { elem2: null, chance: 0.3 },
        "penguin": { elem2: null, chance: 0.3 },
        "seal": { elem2: null, chance: 0.3 },
        "little_penguin": { elem2: null, chance: 0.3 },
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
    category: "solids",
    hidden: true,
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
    category: "solids",
    hidden: true,
    density: 917,
    temp: 105,                
    tempLow: 0,
    stateLow: "little_penguin", 
    conduct: 0.1
};


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
