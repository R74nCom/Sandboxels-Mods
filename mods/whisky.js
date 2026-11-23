elements.oak = {
    color: "#8b5a2b",
    behavior: behaviors.WALL,
    category: "finlays_extras",
    state: "solid",
    density: 700,
    burn: 20,
    burnTime: 400,
    burnInto: "charred_oak",
    fireColor: "#b87333",
    reactions: {
        "juice": { elem1: "sherry_stained_oak", elem2: "juice" },
    },
};

elements.charred_oak = {
    color: "#382820",
    behavior: behaviors.WALL,
    category: "finlays_extras",
    state: "solid",
    density: 700,
    burn: 20,
    burnTime: 400,
    burnInto: "ash",
    fireColor: "#b87333"
}

elements.sherry_stained_oak = {
    color: "#923e49",
    behavior: behaviors.WALL,
    category: "finlays_extras",
    state: "solid",
    density: 700,
    burn: 20,
    burnTime: 400,
    burnInto: "charcoal",
    fireColor: "#b87333",
    hidden: true,
};

elements.pumpkin_purée = {
    color: "#fca311",
    behavior: behaviors.LIQUID,
    category: "finlays_extras",
    state: "liquid",
    density: 600,
    temp: 20,
    tempLow: -1,
    stateLow: "pumpkin_purée_ice",
    hidden: true,
};

elements.grape_purée = {
    color: "#8050A0",
    behavior: behaviors.LIQUID,
    category: "finlays_extras",
    state: "liquid",
    density: 600,
    temp: 20,
    tempLow: -1,
    stateLow: "grape_purée_ice",
    hidden: true,
};

elements.corn_mash = {
    color: "#ddbb72",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    reactions: {
        "sugar": { elem1: "corn_wort", elem2: null }
    },
    temp: 20,
    tempLow: -1,
    stateLow: "corn_mash_ice",
    hidden: true 
}

elements.corn_wort = {
    color: "#E8C56A",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    reactions: {
        "yeast": { elem1: "corn_wash", elem2: null}
    },
    temp: 20,
    tempLow: -1,
    stateLow: "corn_wort_ice",
    hidden: true
};

elements.corn_wash = {
    color: "#d4b375",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -4,
    stateLow: "corn_wash_ice",
    hidden: true,
    tick: function(pixel) {
        if (pixel.temp >= 78) {
            let rand = Math.random();
            if (rand < 0.80) {
                // 80% chance to turn into Heart
                changePixel(pixel, "middle_cut");
            } else if (rand < 0.90) {
                // 10% chance to turn into Heads (0.80 to 0.90)
                changePixel(pixel, "foreshots");
            } else {
                // 10% chance to turn into Feints (0.90 to 1.0)
                changePixel(pixel, "tails");
            }
        }
    }
};

elements.foreshots = {
    color: "#e0c69a",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -4,
    burn: 10,
    burnTime: 200,
    stateLow: "foreshots_ice",
    hidden: true,
}

elements.middle_cuts = {
    color: "#b98243",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.2,
    burn: 25,
    burnTime: 300,
    reactions: {
        "charred_oak": { elem1: "bourbon", elem2: "charred_oak" },
    },
    temp: 20,
    tempLow: -24,
    stateLow: "middle_cuts_ice",
    hidden: true,
};

elements.tails = {
    color: "#78534a",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -24,
    burn: 25,
    burnTime: 400,
    stateLow: "tails_ice",
    reactions: {
        "foreshots": { elem1: "corn_wash", elem2: null }
    },
    hidden: true,
};

elements.bourbon = {
    color: "#BA6F1E", 
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.5,
    burn: 40,
    burnTime: 300,
    temp: 10,
    tempLow: -29,
    stateLow: "bourbon_ice",
    reactions: {
        "sugar": { elem1: "sweetened_bourbon", elem2: null },
        "pumpkin_purée": { elem1: "pumpkin_spice_bourbon", elem2: null },
    },
    hidden: true,
};

elements.sweetened_bourbon = {
    color: "#E5BD89",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.5,
    burn: 40,
    burnTime: 300,
    temp: 10,
    tempLow: -29,
    stateLow: "sweetened_bourbon_ice",
    hidden: true,
};

elements.pumpkin_spice_bourbon = {
    color: "#D98C3A",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.5,
    burn: 40,
    burnTime: 300,
    temp: 10,
    tempLow: -29,
    stateLow: "pumpkin_spice_bourbon_ice",
    hidden: true,
};

elements.barley = {
    color: "#e2c287",
    behavior: behaviors.POWDER,
    category: "finlays_extras",
    state: "solid",
    density: 600,
    reactions: {
        "water": { elem1: "wet_barley", elem2: null }
    }
};

elements.wet_barley = {
    color: "#b09563",
    behavior: behaviors.POWDER,
    category: "finlays_extras",
    state: "solid",
    density: 800,
    tempHigh: 50,          
    stateHigh: "malted_barley",
    hidden: true,
};

elements.malted_barley = {
    color: "#c2a670",
    behavior: behaviors.POWDER,
    category: "finlays_whisky",
    state: "solid",
    density: 550,
    breakInto: "grist",
    reactions: {
        "peat_smoke": { elem1: "peaty_malted_barley", elem2: null },
        "barley": { elem1: "malt_mix", elem2: null }
    },
    hidden: true,
};

elements.malt_mix = {
    color: "#D8C18A",
    behavior: behaviors.POWDER,
    category: "finlays_whisky",
    state: "solid",
    density: 550,
    reactions: {
        "corn": { elem1: "grain_mix", elem2: null },
    },
    hidden: true,
};

elements.grain_mix = {
    color: "#C6A96B",
    behavior: behaviors.POWDER,
    category: "finlays_whisky",
    state: "solid",
    density: 550,
    reactions: {
        "flour": { elem1: "meal", elem2: null },
    },
    hidden: true,
};

elements.meal = {
    color: "#d6c5a0",
    behavior: behaviors.POWDER,
    category: "finlays_whisky",
    state: "solid",
    density: 550,
    reactions: {
        "water": { elem1: "grain_wort", elem2: null },
    },
    hidden: true,
};

elements.grain_wort = {
    color: "#e3c56b",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    reactions: {
        "yeast": { elem1: "grain_wash", elem2: null }
    },
    temp: 20,
    tempLow: -1,
    stateLow: "grain_wort_ice",
    hidden: true
};

elements.grain_wash = {
    color: "#b98b48",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -4,
    stateLow: "grain_wash_ice",
    hidden: true,
    tick: function(pixel) {
        if (pixel.temp >= 78) {
            let rand = Math.random();
            if (rand < 0.80) {
                changePixel(pixel, "grain_heart");
            } else if (rand < 0.90) {
                changePixel(pixel, "grain_foreshots");
            } else {
                changePixel(pixel, "grain_feints");
            }
        }
    }
};

elements.grain_foreshots = {
    color: "#E4D0AA",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -9,
    burn: 10,
    burnTime: 200,
    stateLow: "grain_foreshots_ice",
    hidden: true,
};

elements.grain_heart = {
    color: "#9f6e40",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.2,
    burn: 25,
    burnTime: 300,
    reactions: {
        "oak": { elem1: "irish_grain_whiskey", elem2: "oak" },
        "grape_purée": { elem1: "fruity_grain_heart", elem2: null },
    },
    temp: 20,
    tempLow: -24,
    stateLow: "grain_heart_ice",
    hidden: true,
};

elements.grain_feints = {
    color: "#70503a",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -24,
    burn: 25,
    burnTime: 400,
    stateLow: "grain_feints_ice",
    reactions: {
        "grain_foreshots": { elem1: "grain_wash", elem2: null }
    },
    hidden: true,
};

elements.irish_grain_whiskey = {
    color: "#A66A2C", 
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.5,
    burn: 40,
    burnTime: 300,
    temp: 10,
    tempLow: -29,
    stateLow: "irish_grain_whiskey_ice",
    hidden: true,
};

elements.fruity_grain_heart = {
    color: "#a66b72", 
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -24,
    burn: 25,
    burnTime: 400,
    stateLow: "grain_feints_ice",
    reactions: {
        "oak": { elem1: "irish_fruit_whiskey", elem2: "oak" }
    },
    hidden: true,
};

elements.irish_fruit_whiskey = {
    color: "#A66A2C",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.5,
    burn: 40,
    burnTime: 300,
    temp: 10,
    tempLow: -29,
    stateLow: "irish_fruit_whiskey_ice",
    hidden: true,
};

elements.peat = {
    color: "#7d756d",
    behavior: behaviors.POWDER,
    category: "finlays_extras",
    state: "solid",
    density: 550,
    burn: 10,
    burnTime: 300,
    burnInto: "peat_smoke",
};

elements.peat_smoke = {
    color: "#7d756d",
    behavior: behaviors.GAS,
    category: "finlays_extras",
    state: "gas",
    density: 0.5,
    temp: 30,
    hidden: true,
};

elements.grist = {
    color: "#9c814d",
    behavior: behaviors.POWDER,
    category: "finlays_whisky",
    state: "solid",
    density: 500,
    reactions: {
        "water": { elem1: "wort", elem2: null }
    },
    hidden: true,
};

elements.wort = {
    color: "#CB6F26",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    reactions: {
        "yeast": { elem1: "wash", elem2: null }
    },
    temp: 20,
    tempLow: -1,
    stateLow: "wort_ice",
    hidden: true
};

elements.wash = {
    color: "#d4b375",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -4,
    stateLow: "wash_ice",
    hidden: true,
    tick: function(pixel) {
        if (pixel.temp >= 78) {
            let rand = Math.random();
            if (rand < 0.80) {
                // 80% chance to turn into Heart
                changePixel(pixel, "heart");
            } else if (rand < 0.90) {
                // 10% chance to turn into Heads (0.80 to 0.90)
                changePixel(pixel, "heads");
            } else {
                // 10% chance to turn into Feints (0.90 to 1.0)
                changePixel(pixel, "feints");
            }
        }
    }
};

elements.heads = {
    color: "#9f8f80",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -9,
    burn: 10,
    burnTime: 200,
    stateLow: "heads_ice",
    hidden: true,
}

elements.heart = {
    color: "#9f6e40",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.2,
    burn: 25,
    burnTime: 300,
    reactions: {
        "oak": { elem1: "scotch_whisky", elem2: "oak" },
        "sherry_stained_oak": { elem1: "sherry_scotch_whisky", elem2: "sherry_stained_oak" },
    },
    temp: 20,
    tempLow: -24,
    stateLow: "heart_ice",
    hidden: true,
};

elements.feints = {
    color: "#6c5540",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -24,
    burn: 25,
    burnTime: 400,
    stateLow: "feints_ice",
    reactions: {
        "heads": { elem1: "wash", elem2: null }
    },
    hidden: true,
};

elements.scotch_whisky = {
    color: "#CF7F1D", 
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.5,
    burn: 40,
    burnTime: 300,
    temp: 10,
    tempLow: -29,
    stateLow: "scotch_whisky_ice",
    hidden: true,
};

elements.sherry_scotch_whisky = {
    color: "#8c4a18",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.6,
    burn: 45,
    burnTime: 320,
    temp: 10,
    tempLow: -29,
    stateLow: "sherry_scotch_whisky_ice",
    hidden: true,
}; 

elements.peaty_malted_barley = {
    color: "#96784b",
    behavior: behaviors.POWDER,
    category: "finlays_whisky",
    state: "solid",
    density: 550,
    breakInto: "peaty_grist",
    hidden: true,
};

elements.peaty_grist = {
    color: "#7d653a",
    behavior: behaviors.POWDER,
    category: "finlays_whisky",
    state: "solid",
    density: 500,
    reactions: {
        "water": { elem1: "peaty_wort", elem2: null },
    },
    hidden: true,
};

elements.peaty_wort = {
    color: "#602803",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    reactions: {
        "yeast": { elem1: "peaty_wash", elem2: null },
        "sugar_water": { elem1: "wort", elem2: null }
    },
    temp: 20,
    tempLow: -1,
    stateLow: "peaty_wort_ice",
    hidden: true
};

elements.peaty_wash = {
    color: "#b59052",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -4,
    stateLow: "peaty_wash_ice",
    reactions: {
        "sugar_water": { elem1: "wash", elem2: null }
    },
    hidden: true,
    tick: function(pixel) {
        if (pixel.temp >= 78) {
            let rand = Math.random();
            if (rand < 0.80) {
                // 80% chance to turn into Peaty Heart
                changePixel(pixel, "peaty_heart");
            } else if (rand < 0.90) {
                // 10% chance to turn into Peaty Heads
                changePixel(pixel, "peaty_heads");
            } else {
                // 10% chance to turn into Peaty Feints
                changePixel(pixel, "peaty_feints");
            }
        }
    }
};

elements.peaty_heads = {
    color: "#B39A83",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -9,
    burn: 10,
    burnTime: 200,
    stateLow: "peaty_heads_ice",
    reactions: {
        "sugar_water": { elem1: "heads", elem2: null }
    },
    hidden: true,
};

elements.peaty_heart = {
    color: "#92765F",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.2,
    burn: 50,
    burnTime: 250,
    temp: 20,
    tempLow: -24,
    stateLow: "peaty_heart_ice",
    reactions: {
        "oak": { elem1: "peaty_scotch_whisky", elem2: "oak" },
        "sugar_water": { elem1: "heart", elem2: null },
        "sherry_stained_oak": { elem1: "peaty_sherry_scotch_whisky", elem2: "sherry_stained_oak" },
    },
    hidden: true,
};

elements.peaty_feints = {
    color: "#655449",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    density: 1010,
    temp: 20,
    tempLow: -24,
    burn: 25,
    burnTime: 400,
    stateLow: "peaty_feints_ice",
    reactions: {
        "sugar_water": { elem1: "feints", elem2: null },
        "peaty_heads": { elem1: "peaty_wash", elem2: null }
    },
    hidden: true,
};

elements.peaty_scotch_whisky = {
    color: "#8c4a18", 
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.6,
    burn: 45,
    burnTime: 320,
    temp: 10,
    tempLow: -29,
    stateLow: "peaty_scotch_whisky_ice",
    reactions: {
        "sugar_water": { elem1: "scotch_whisky", elem2: null }
    },
    hidden: true,
};

elements.peaty_sherry_scotch_whisky = {
    color: "#7a3b0f",
    behavior: behaviors.LIQUID,
    category: "finlays_whisky",
    state: "liquid",
    viscosity: 1.7,
    burn: 50,
    burnTime: 250,
    temp: 10,
    tempLow: -29,
    stateLow: "peaty_sherry_scotch_whisky_ice",
    reactions: {
        "sugar_water": { elem1: "sherry_scotch_whisky", elem2: null }
    },
    hidden: true,
};

if (!elements.water.reactions) elements.water.reactions = {};
elements.water.reactions["corn"] = { elem1:"corn_mash", elem2:null };
elements.water.reactions["pumpkin"] = { elem1:"pumpkin_purée", elem2:null };
if (!elements.grape.reactions) elements.grape.reactions = {};
elements.grape.reactions["jelly"] = { elem1:"grape_purée", elem2:null };

elements.pumpkin_purée_ice = {
    color: "#fca311",
    behavior: behaviors.WALL,
    category: "finlays_extras",
    state: "solid",
    density: 917,
    temp: -5,
    tempHigh: 0,
    stateHigh: "pumpkin_purée",
    hidden: true
}

elements.grape_purée_ice = {
    color: "#8050A0",
    behavior: behaviors.WALL,
    category: "finlays_extras",
    state: "solid",
    density: 917,
    temp: -5,
    tempHigh: 0,
    stateHigh: "grape_purée",
    hidden: true
}

elements.corn_mash_ice = {
    color: "#DDBB72",
    behavior: behaviors.WALL,
    category: "finlays_extras",
    state: "solid",
    density: 917,
    temp: -5,
    tempHigh: 0,
    stateHigh: "corn_mash",
    hidden: true
}

elements.corn_wort_ice = {
    color: "#e8c56a",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 917,
    temp: -5,
    tempHigh: 0,
    stateHigh: "corn_wort",
    hidden: true,
};

elements.corn_wash_ice = {
    color: "#c99c45",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 920,
    temp: -10,
    tempHigh: -5,
    stateHigh: "corn_wash",
    hidden: true,
};

elements.foreshots_ice = {
    color: "#e0c69a",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 930,
    temp: -20,
    tempHigh: -10,
    stateHigh: "foreshots",
    hidden: true,
};

elements.middle_cuts_ice = {
    color: "#b98243",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 850,
    temp: -40,
    tempHigh: -24,
    stateHigh: "middle_cuts",
    hidden: true,
};

elements.tails_ice = {
    color: "#78534a",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 850,
    temp: -40,
    tempHigh: -24,
    stateHigh: "tails",
    hidden: true,
};

elements.bourbon_ice = {
    color: "#BA6F1E",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 860,
    temp: -40,
    tempHigh: -30,
    stateHigh: "bourbon",
    hidden: true,
};

elements.sweetened_bourbon_ice = {
    color: "#E5BD89",
    behavior: behaviors.WALL,  
    category: "finlays_whisky",
    state: "solid",
    density: 860,
    temp: -40,
    tempHigh: -30,
    stateHigh: "sweetened_bourbon",
    hidden: true,
};

elements.pumpkin_spice_bourbon_ice = {
    color: "#D98C3A",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 860,
    temp: -40,
    tempHigh: -30,
    stateHigh: "pumpkin_spice_bourbon",
    hidden: true,
};

elements.wort_ice = {
    color: "#e39f66",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 917,
    temp: -5,
    tempHigh: 0,
    stateHigh: "wort",
    hidden: true,
};

elements.peaty_wort_ice = {
    color: "#7a431e",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 917,
    temp: -5,
    tempHigh: 0,
    stateHigh: "peaty_wort",
    hidden: true,
};

elements.wash_ice = {
    color: "#ebd9b5",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 920,
    temp: -10,
    tempHigh: -5,
    stateHigh: "wash",
    hidden: true,
};

elements.peaty_wash_ice = {
    color: "#cfb284",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 920,
    temp: -10,
    tempHigh: -5,
    stateHigh: "peaty_wash",
    hidden: true,
};

elements.heads_ice = {
    color: "#f2e6d9",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 930,
    temp: -20,
    tempHigh: -10,
    stateHigh: "heads",
    hidden: true,
};

elements.peaty_heads_ice = {
    color: "#e6d9c6",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 930,
    temp: -20,
    tempHigh: -10,
    stateHigh: "peaty_heads",
    hidden: true,
};

elements.heart_ice = {
    color: "#f2ede2",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 850,
    temp: -40,
    tempHigh: -24,
    stateHigh: "heart",
    hidden: true,
};

elements.peaty_heart_ice = {
    color: "#ebdcb8",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 850,
    temp: -40,
    tempHigh: -24,
    stateHigh: "peaty_heart",
    hidden: true,
};

elements.feints_ice = {
    color: "#e6d9c6",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 940,
    temp: -20,
    tempHigh: -10,
    stateHigh: "feints",
    hidden: true,
};

elements.peaty_feints_ice = {
    color: "#d9cbb8",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 940,
    temp: -20,
    tempHigh: -10,
    stateHigh: "peaty_feints",
    hidden: true,
};

elements.scotch_whisky_ice = {
    color: "#cf9153",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 860,
    temp: -40,
    tempHigh: -30,
    stateHigh: "scotch_whisky",
    hidden: true,
};

elements.peaty_scotch_whisky_ice = {
    color: "#b07041",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 860,
    temp: -40,
    tempHigh: -30,
    stateHigh: "peaty_scotch_whisky",
    hidden: true,
};

elements.sherry_scotch_whisky_ice = {
    color: "#a05c2e",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 860,
    temp: -40,
    tempHigh: -30,
    stateHigh: "sherry_scotch_whisky",
    hidden: true,
};

elements.peaty_sherry_scotch_whisky_ice = {
    color: "#8c4a18",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 860,
    temp: -40,
    tempHigh: -30,
    stateHigh: "peaty_sherry_scotch_whisky",
    hidden: true,
};

elements.grain_wort_ice = {
    color: "#e3c56b",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 917,
    temp: -5,
    tempHigh: 0,
    stateHigh: "grain_wort",
    hidden: true,
};

elements.grain_wash_ice = {
    color: "#b98b48",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 920,
    temp: -10,
    tempHigh: -5,
    stateHigh: "grain_wash",
    hidden: true,
};

elements.grain_foreshots_ice = {
    color: "#e4d0aa",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 930,
    temp: -20,
    tempHigh: -10,
    stateHigh: "grain_foreshots",
    hidden: true,
};

elements.grain_heart_ice = {
    color: "#9f6e40",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 850,
    temp: -40,
    tempHigh: -24,
    stateHigh: "grain_heart",
    hidden: true,
};

elements.grain_feints_ice = {
    color: "#70503a",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 940,
    temp: -20,
    tempHigh: -10,
    stateHigh: "grain_feints",
    hidden: true,
};

elements.irish_grain_whiskey_ice = {
    color: "#a66b2c",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 860,
    temp: -40,
    tempHigh: -30,
    stateHigh: "irish_grain_whiskey",
    hidden: true,
};

elements.fruity_grain_heart_ice = {
    color: "#a66b72",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 850,
    temp: -40,
    tempHigh: -24,
    stateHigh: "fruity_grain_heart",
    hidden: true,
};

elements.irish_fruit_whiskey_ice = {
    color: "#a66b2c",
    behavior: behaviors.WALL,
    category: "finlays_whisky",
    state: "solid",
    density: 860,
    temp: -40,
    tempHigh: -30,
    stateHigh: "irish_fruit_whiskey",
    hidden: true,
};
