// Made by MLG Dev
// 1.2.0

elements.void.color = "#ff0000";
//Tools
elements.gloopfier = {
    color: "#E81D71",
    tool: function(pixel) {
        if (pixel.element == "strange_matter" || pixel.element == "midas_touch" || pixel.element == "gray_goo" || pixel.element == "consuming_gloop" || pixel.element == "virus") {
            changePixel(pixel, "consuming_gloop");
        } else {
            changePixel(pixel, "gloop");
        }
    },
    category: "tools",
    desc: "Turn elements into Gloop, also turns consuming elements into Consuming Gloop.",
}
//Gloops
elements.gloop = {
    color: "#E81D71",
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if(isEmpty(pixel.x, pixel.y+1) == false){
            if(isEmpty(pixel.x+1, pixel.y) || isEmpty(pixel.x-1, pixel.y)){
                if(pixel.x > 83){
                    tryMove(pixel, pixel.x+1, pixel.y);
                } else {
                    tryMove(pixel, pixel.x-1, pixel.y);
                }
            }
        }  
    },
    category: "gloops",
    reactions: {
        "molten_gloop": { elem1:"molten_gloop", elem2:"molten_gloop"},
        "water": { elem1:"gloopy_water", elem2:"gloopy_water"}
    },
    related: ["colorful_gloop","molten_gloop"],
    tempHigh: 900,
    stateHigh: "molten_gloop",
    density: 1100,
    desc: "A mysterious pink substance."
};

elements.molten_gloop = {
    color: "#770A55",
    singleColor: true,
    behavior: [
        "XX|CR:fire%25|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    tick: function(pixel) {
        if(isEmpty(pixel.x, pixel.y+1) == false){
            if(isEmpty(pixel.x+1, pixel.y) || isEmpty(pixel.x-1, pixel.y)){
                if(pixel.x > 83){
                    tryMove(pixel, pixel.x+1, pixel.y);
                } else {
                    tryMove(pixel, pixel.x-1, pixel.y);
                }
            }
        }  
    },
    category: "gloops",
    state:  "liquid",
    tempHigh: 1200,
    stateHigh: "gloop_gas",
    tempLow: 20,
    stateLow: "hard_gloop",
    temp: 900,
    density: 1100,
    viscosity: 60000,
    related: ["gloop","gloop_gas","hard_gloop"],
    desc: "A molten version of Gloop."
};

elements.hard_gloop = {
    color: "#AD0A28",
    singleColor: true,
    behavior: behaviors.SOLID,
    reactions: {
        "molten_gloop": { elem1:"molten_gloop", chance:0.5, elem2:"molten_gloop"}
    },
    category: "gloops",
    state:  "solid",
    tempHigh: 900,
    stateHigh: "molten_gloop",
    density: 1100,
    related: ["gloop","molten_gloop"],
    desc: "A hardened version of Molten Gloop.",
    noMix: true,
};

elements.gloop_gas = {
    color: ["#E3659A", "#CF5D8C", "#EB699F"],
    hidden : true,
    behavior: behaviors.GAS,
    category: "gloops",
    state:  "gas",
    tempLow: 900,
    stateLow: "gloop",
    temp: 1200,
    density: 1000,
};

elements.consuming_gloop = {
    color: "#A53A6E",
    hidden: true,
    behavior: [
        "CH:consuming_gloop|CH:consuming_gloop|CH:consuming_gloop",
        "CH:consuming_gloop|XX|CH:consuming_gloop",
        "M2 AND CH:consuming_gloop|M1 AND CH:consuming_gloop|M2 AND CH:consuming_gloop",
    ],
    tick: function(pixel) {
        if(isEmpty(pixel.x, pixel.y+1) == false){
            if(isEmpty(pixel.x+1, pixel.y) || isEmpty(pixel.x-1, pixel.y)){
                if(pixel.x > 83){
                    tryMove(pixel, pixel.x+1, pixel.y);
                    changePixel(pixel, "consuming_gloop");
                } else {
                    tryMove(pixel, pixel.x-1, pixel.y);
                    
                }
            }
        }  
    },
    category: "gloops",
    reactions: {
        "wall": { elem1:"consuming_gloop", elem2:"consuming_gloop"},
        "void": { elem1:"consuming_gloop", elem2:"consuming_gloop"},
        "border": { elem1:"consuming_gloop", elem2:"consuming_gloop"},
    },
    density: 1100,
    temp: 400,
    tempLow: 20,
    stateLow: "gloop",
};

elements.colorful_gloop = {
    customColor: true,
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if(isEmpty(pixel.x, pixel.y+1) == false){
            if(isEmpty(pixel.x+1, pixel.y) || isEmpty(pixel.x-1, pixel.y)){
                if(pixel.x > 83){
                    tryMove(pixel, pixel.x+1, pixel.y);
                } else {
                    tryMove(pixel, pixel.x-1, pixel.y);
                }
            }
        }  
    },
    category: "gloops",
    reactions: {
        "molten_gloop": { elem1:"colorful_molten_gloop", elem2:"molten_gloop"},
        "colorful_molten_gloop": { elem1:"colorful_molten_gloop", elem2:"colorful_molten_gloop"},
    },
    related: ["gloop"],
    tempHigh: 900,
    stateHigh: "molten_gloop",
    density: 1100,
};
elements.colorful_molten_gloop = {
    customColor: true,
    behavior: [
        "XX|CR:fire%25|XX",
        "XX|XX|XX",
        "M2|M1|M2",
    ],
    tick: function(pixel) {
        if(isEmpty(pixel.x, pixel.y+1) == false){
            if(isEmpty(pixel.x+1, pixel.y) || isEmpty(pixel.x-1, pixel.y)){
                if(pixel.x > 83){
                    tryMove(pixel, pixel.x+1, pixel.y);
                } else {
                    tryMove(pixel, pixel.x-1, pixel.y);
                }
            }
        }  
    },
    hidden: true,
    category: "gloops",
    state:  "liquid",
    tempHigh: 1200,
    stateHigh: "gloop_gas",
    tempLow: 20,
    stateLow: "colorful_hard_gloop",
    temp: 900,
    density: 1100,
    related: ["colorful_gloop","gloop_gas","hard_gloop","molten_gloop"],
    desc: "A molten version of Colorful Gloop."
};

elements.colorful_hard_gloop = {
    customColor: true,
    behavior: behaviors.SOLID,
    hidden: true,
    reactions: {
        "molten_gloop": { elem1:"colorful_molten_gloop", chance:0.5, elem2:"molten_gloop"},
        "colorful_molten_gloop": { elem1:"colorful_molten_gloop", chance:0.5, elem2:"colorful_molten_gloop"}
    },
    category: "gloops",
    state:  "solid",
    tempHigh: 900,
    stateHigh: "molten_gloop",
    density: 1100,
    related: ["gloop","molten_gloop"],
    desc: "A hardened version of Molten Gloop."
};

elements.rainbow_gloop = {
    color: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#9400D3"],
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if(isEmpty(pixel.x, pixel.y+1) == false){
            if(isEmpty(pixel.x+1, pixel.y) || isEmpty(pixel.x-1, pixel.y)){
                if(pixel.x > 83){
                    tryMove(pixel, pixel.x+1, pixel.y);
                } else {
                    tryMove(pixel, pixel.x-1, pixel.y);
                }
            }
        }  
    },
    stateHigh: "molten_gloop",
    tempHigh: 900,
    category: "gloops",
    related: ["gloop","colorful_gloop"],
    density: 1100,
};

elements.liquid_gloop = {
    color: "#E697A0",
    behavior: behaviors.LIQUID,
    reactions: {
        "acid": { elem1:"liquid_gloop", elem2:null},
    },
    state: "liquid",
    density: 1100,
    tempHigh: 1200,
    stateHigh: "gloop_gas",
    category: "gloops",
    hidden: true,
    tempLow: -10,
    stateLowName: "gloop_ice",
    related: ["gloop","gloopy_water"],
    desc: "A liquid version of Gloop."
}
//Other Elements
elements.gloop_bomb = {
    color: ["#981049", "#99295F", "#D71E6B"],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2%25 AND EX:8>gloop|M1 AND EX:8>gloop|M2%25 AND EX:8>gloop",
    ],
    category: "weapons",
    density: 1100,
};

elements.gloop_spout = {
    color: "#5a0629",
    behavior: [
        "XX|CR:gloop|XX",
        "CR:gloop|XX|CR:gloop",
        "XX|CR:gloop|XX",
    ],
    category: "machines",
    density: 1100,
};

elements.gloopy_water = {
    color: "#903DB4",
    behavior: behaviors.LIQUID,
    reactions: {
        "acid": { elem1:"liquid_gloop", elem2:"liquid_gloop"},
    },
    category: "liquids",
    hidden: true,
    tempHigh: 1000,
    stateHigh: ["steam","gloop_gas"],
    tempLow: -100,
    stateLowName: "gloopy_ice",
    density: 1100,
    viscosity: 6500,
    related: ["water","gloop"],
    desc: "Very gloopy water."
};