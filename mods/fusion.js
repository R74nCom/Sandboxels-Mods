delete elements.molten_magnesium;
delete elements.molten_calcium;
delete elements.sulfur_gas;
elements.deuterium = {
    color: "#197ce6",
    behavior: [
        "M1|SW:tritium AND M1|M1",
        "SW:tritium AND M2|XX|SW:tritium AND M2",
        "XX|SW:tritium|XX",
    ],
    category: "fusionstuff",
    state: "gas",
    density: 0.1
}

elements.tritium = {
    color: "#2a4bf5",
    behavior: [
        "M1|SW:deuterium AND M1|M1",
        "SW:deuterium AND M2|XX|SW:deuterium AND M2",
        "XX|SW:deuterium|XX",
    ],
    reactions: {
        "deuterium": { elem1:"plasma", elem2: "helium", tempMin: 10000, temp1:50000, temp2:50000 }
    },
    category: "fusionstuff",
    state: "gas",
    density: 0.15
}
elements.carbon = {
    color: "#2e2e2e",
    behavior: [
        "XX|XX|XX",
        "SP|XX|SP",
        "XX|M1|XX",
    ],
    category: "fusionstuff",
    state: "solid",
    stateHigh: "carbon_vapor",
    tempHigh: 3700
}

elements.carbon_vapor = {
    color: "#2e2e2e",
    behavior: [
        "XX|M1|XX",
        "M1|XX|M1",
        "XX|M1|XX",
    ],
    category: "fusionstuff",
    State: "solid",
    temp: 3700

}  

elements.helium = {
color: "#a69494",
behavior: behaviors.GAS,
reactions: {
   "helium": { elem1:"plasma", elem2:"carbon", tempMin: 20000, temp1:80000, temp2:80000, chance:0.01},
   "carbon_vapor": { elem1:"plasma", elem2:"oxygen", tempMin: 45000, temp1:120000, temp2: 120000},
   "oxygen": {elem1: "plasma", elem2:"neon", tempMin: 85000, temp1:350000, temp2: 350000},
   "neon": {elem1: "plasma", elem2:"magnesium", tempMin:150000, temp1:600000, temp2:600000},
   "magnesium_vapour": {elem1:"plasma", elem2:"silicon", tempMin:500000, temp1:1000000, temp2:1000000},
   "silicon_vapour": {elem1:"plasma", elem2:"sulfur", tempMin:850000, temp1:1500000, temp2:1500000},
   "sulfur_gas": {elem1:"plasma", elem2:"argon", tempMin: 1000000, temp1:2000000, temp2: 2000000},
   "argon": {elem1:"plasma", elem2:"calcium", tempMin:1500000, temp1:3000000, temp2:3000000},
   "calcium_gas": {elem1:"plasma", elem2:"titanium", tempMin: 2500000, temp1:5000000, temp2:5000000},
   "titanium_vapour": {elem1:"plasma", elem2:"chromium", tempMin: 4500000, temp1:10000000, temp2:10000000},
   "chromium_vapour": {elem1:"plasma", elem2:"iron", tempMin:9000000, temp1:20000000, temp2:20000000}


},

category: "gases",
tempLow: -272.20,
stateLow: "liquid_helium",
state: "gas",
density: 0.15,
conduct: 0.02,
colorOn: "#f1a1ff"
}
elements.neon = {
    color: "#FF5F1F",
    behavior: [
        "XX|M1|XX",
        "M1|XX|M1",
        "XX|M1|XX",
    ],
    category: "fusionstuff",
    state: "gas",
    density: 1.4
}

elements.molten_magnesium = {
    color: "#768487",
    behavior: behaviors.LIQUID,
    fireElement: "flash",
    burnInto: "flash",
    reactions: {
        "water": { elem1:null, elem2:"hydrogen", chance:0.03 },
        "steam": { elem1:null, elem2:"hydrogen", chance:0.05 },
        "salt_water": { elem1:null, elem2:"hydrogen", chance:0.03 },
        "sugar_water": { elem1:null, elem2:"hydrogen", chance:0.03 },
        "dirty_water": { elem1:null, elem2:"hydrogen", chance:0.03 },
        "seltzer": { elem1:null, elem2:"hydrogen", chance:0.03 },
        "pool_water": { elem1:null, elem2:"hydrogen", chance:0.03 },
        "nut_milk": { elem1:null, elem2:"hydrogen", chance:0.03 },
        "calcium_gas": {elem1:"plasma", elem2:"titanium", tempMin:2500000, temp1: 5000000, temp2:5000000},
        "titanium": {elem1:"plasma", elem2:"chromium", tempMin:4000000, temp1:10000000, temp2:10000000}

    },
    stateHigh: "magnesium_vapour",
    tempHigh: 1103,
    category: "states"
}


elements.sulfur_gas = {
    reactions: {
        "silver": { stain2:"#251d0e", chance:0.0075 }
    },
    color: "#b0a65d",
    burnTime: 10,
    density: 2.16,
    burnInto: ["smoke","smoke","smoke","smoke","stench"]
}


elements.magnesium_vapour = {
    color: "#a1a1a1",
    behavior: behaviors.GAS,
    category: "fusionstuff",
    state: "gas",
    stateLow: "molten_magnesium",
    tempLow: 1102,
    temp:1103
}

elements.silicon = {
    color: "#505060",
    behavior: behaviors.POWDER,
    density: 2.33,
    category: "fusionstuff",
    stateHigh: "molten_silicon",
    tempHigh: 1414,
    state: "solid"
}
elements.molten_silicon = {
    color: "#FF7A2F",
    behavior: behaviors.LIQUID,
    density: 2.33,
    category: "fusionstuff",
    stateHigh: "silicon_vapour",
    tempHigh: 3265,
    temp: 1414,
    state: "liquid"
}
elements.silicon_vapour = {
    color: "#8FA3B8",
    behavior: behaviors.GAS,
    density: 2.33,
    category: "fusionstuff",
    temp:3265,
    state: "gas"
}
elements.argon = {
    color: "#4800bb",
    behavior: behaviors.GAS,
    category: "fusionstuff",
    state: "gas"
}
elements.molten_calcium = {
    behavior: behaviors.LIQUID,
    viscosity: 8.5,
    state: "liquid",
    category: "states",
    stateHigh: "calcium_gas",
    tempHigh: 1484
}
elements.calcium_gas = {
    color: "#ffffff",
    behavior: behaviors.GAS,
    category:"fusionstuff",
    state: "gas"
}
elements.titanium = {
    color: "#dbdbdb",
    behavior: behaviors.WALL,
    category:"fusionstuff",
    state:"solid",
    stateHigh: "molten_titanium",
    tempHigh: 1669
}

elements.molten_titanium = {
    color: "#d88d37",
    behavior: behaviors.LIQUID,
    viscosity: 8.5,
    category: "fusionstuff",
    state: "liquid",
    stateLow: "titanium",
    tempLow: 1668,
    stateHigh: "titanium_vapour",
    tempHigh: 3287
}
elements.titanium_vapour = {
    color: "#9c9c9c",
    behavior: behaviors.GAS,
    category: "fusionstuff",
    state: "gas",
    stateLow: "molten_titanium",
    tempLow: 3286

}
elements.chromium = {
    color: "#ebb400",
    behavior: behaviors.WALL,
    state: "solid",
    stateHigh:"molten_chromium",
    tempHigh: 1907,
    category: "fusionstuff"
}
elements.molten_chromium = {
    color: "#b45516",
    behavior: behaviors.LIQUID,
    viscosity: 8.5,
    category: "fusionstuff",
    state:"liquid",
    stateHigh: "chromium_vapour",
    tempHigh: 2755,
    stateLow: "chromium",
    tempLow: 1906
}
elements.chromium_vapour = {
    color: "#acacac",
    behavior: behaviors.GAS,
    category: "fusionstuff",
    state:"gas",
    stateLow: "molten_chromium",
    tempLow: 2754
}
