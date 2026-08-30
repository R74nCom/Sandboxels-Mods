elements.moo = {
    color: ["#000000", "#FFFFFF"],
    behavior: behaviors.LIQUID,
	category: "c",
    state: "gas",
	density: 1000,
	temp: 20,
	tempHigh: 100,
	stateHigh: "moosteam",
	tempLow: 0,
	stateLow: "mooice",
	desc: "moo.",
};
elements.moosteam = {
    color: ["#000000", "#FFFFFF"],
    behavior: behaviors.GAS,
	category: "c",
    state: "gas",
	density: 0.1,
	temp: 150,
	tempLow: 100,
	stateLow: "moo",
	desc: "moo.",
};
elements.mooice = {
    color: ["#000000", "#FFFFFF"],
    behavior: behaviors.WALL,
	category: "c",
    state: "gas",
	density: 1000,
	temp: -20,
	tempHigh: 0,
	stateHigh: "moo",
    breakInto: "moosnow",
	desc: "moo.",
};
elements.moosnow = {
    color: ["#000000", "#FFFFFF"],
    behavior: behaviors.POWDER,
	category: "c",
    state: "gas",
	density: 1000,
	temp: -20,
	tempHigh: 0,
	stateHigh: "moo",
    tempLow: -100,
	stateLow: "moo",
	desc: "moo.",
};
elements.mooheavysnow = {
    color: ["#000000", "#FFFFFF"],
    behavior: behaviors.POWDER,
	category: "c",
    state: "gas",
	density: 1000,
	temp: -100,
	tempHigh: 0,
	stateHigh: "moo",
    breakInto: "moosnow",
	desc: "moo.",
};
elements.moolten = {
    color: ["#000000", "#FFFFFF"],
    behavior: behaviors.MOLTEN,
    fireColor: "#FFFFFF",
	category: "c",
    state: "gas",
	density: 1000,
    viscosity: 1000,
	temp: 1200,
	tempLow: 1000,
	stateLow: "moowall",
	desc: "moo.",
};
elements.moowall = {
    color: ["#000000", "#FFFFFF"],
    behavior: behaviors.WALL,
	category: "c",
    state: "gas",
	density: 1000,
	temp: 20,
	tempHigh: 1000,
	stateHigh: "moolten",
	desc: "moo.",
};
elements.contagiousmoo = {
    color: ["#000000", "#FFFFFF"],
    behavior: [
    "XX|CH:contagiousmoo|XX",
    "CH:contagiousmoo|CH:moo%0.1|CH:contagiousmoo",
    "M2|M1 AND CH:contagiousmoo|M2", 
    ],
	category: "c",
    state: "gas",
	density: 1000,
    tempHigh: 1000,
	stateHigh: "moolten",
    desc: "MAKE EVERYTHING MOO.",
}
elements.fillmoo = {
    color: ["#000000", "#FFFFFF"],
    behavior: [
    "XX|CR:fillmoo AND CH:fillmoo|XX",
    "CR:fillmoo AND CH:fillmoo|XX|CR:fillmoo AND CH:fillmoo",
    "XX|CR:fillmoo AND CH:fillmoo|XX", 
    ],
	category: "c",
    state: "gas",
	density: 1000,
    tempHigh: 1000,
	stateHigh: "moolten",
    desc: "MAKE EVERYTHING MOO.",
}
elements.antimoo = {
    color: ["#ff0000", "#000000"],
    behavior: [
    "XX|CH:antimoo|XX",
    "CH:antimoo|XX|CH:antimoo",
    "M2|M1 AND CH:antimoo|M2", 
    ],
	category: "c",
    state: "gas",
	density: 1000,
    tempHigh: 1000,
	stateHigh: "antimoolten",
    desc: "what a hater smh my head.......",
}
elements.antimoolten = {
    color: ["#ff0000", "#000000"],
    behavior: behaviors.MOLTEN,
    fireColor: "#ff0000",
	category: "c",
    state: "gas",
	density: 1000,
    viscosity: 1000,
	temp: 1200,
	tempLow: 1000,
	stateLow: "antimoowall",
	desc: "moo.",
};
elements.antimoowall = {
    color: ["#ff0000", "#000000"],
    behavior: behaviors.WALL,
	category: "c",
    state: "gas",
	density: 1000,
	temp: 20,
	tempHigh: 1000,
	stateHigh: "antimoolten",
	desc: "moo.",
};
elements.fillantimoo = {
    color: ["#ff0000", "#000000"],
    behavior: [
    "XX|CR:fillantimoo AND CH:fillantimoo|XX",
    "CR:fillantimoo AND CH:fillantimoo|XX|CR:fillantimoo AND CH:fillantimoo",
    "XX|CR:fillantimoo AND CH:fillantimoo|XX", 
    ],
	category: "c",
    state: "gas",
	density: 1000,
    tempHigh: 1000,
	stateHigh: "moolten",
    desc: "what a hater smh my head.......",
}
elements.goldenmoo = {
    color: ["#000000", "#fff000"],
    behavior: behaviors.WALL,
	category: "c",
    state: "gas",
	density: 1000,
	temp: 20,
	desc: "golden moo.",
};
elements.mooification = {
    color: ["#000000", "#FFFFFF"],
    tool: function(pixel) {
       changePixel(pixel, "moo");
    },
    category: "c",
    desc: "MAKE EVERYTHING MOO.",
}
elements.contagiousmooification = {
    color: ["#000000", "#FFFFFF"],
    tool: function(pixel) {
       changePixel(pixel, "contagiousmoo");
    },
    category: "c",
    desc: "MAKE EVERYTHING MOO.",
}
elements.antimooification = {
    color: ["#ff0000", "#000000"],
    tool: function(pixel) {
       changePixel(pixel, "antimoo");
    },
    category: "c",
    desc: "MAKE EVERYTHING antimoo.",
}