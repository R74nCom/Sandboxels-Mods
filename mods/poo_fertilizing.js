elements.liquid_poop = {
    color: "#422510",
    behavior: behaviors.LIQUID,
    behavior: [
    "CR:fly%0.025|CR:stench%0.15|CR:fly%0.025",
    "M2|XX|M2",
    "M2|M1|M2",
],
reactions: {
    "water":{ elem1:"dirty_water"},
    "dirt" :{elem1:null, elem2:"fertilized_soil"},
    "mud" :{elem1:null, elem2:"super_fertilized_soil"},
},
tick: function(pixel) {
		if (Math.random() < 0.00006) { changePixel(pixel,"old_poop") }
     },
    category: "life",
    state: "liquid",
    stain: 0.3,
    temp: 30,
    tempLow: -10,
    stateLow: "frozen_poop"
};

elements.poop = {
    color: "#422510",
    behavior: [
        "CR:fly%0.025|CR:stench%0.15|CR:fly%0.025",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    reactions: {
    "water":{ elem1:"dirty_water"},
    "dirt" :{elem1:null, elem2:"fertilized_soil"},
    "mud" :{elem1:null, elem2:"super_fertilized_soil"},
    },
    tick: function(pixel) {
		if (Math.random() < 0.00006) { changePixel(pixel,"old_poop") }
     },
    category: "life",
    state: "solid",
    stain: 0.07,
    temp: 30,
    tempLow: -10,
    stateLow: "frozen_poop"
};

elements.frozen_poop = {
    color: "#403228",
    behavior: [
        "XX|CR:stench%0.15|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    category: "states",
    state: "solid",
    temp: -15,
    tempHigh: -5,
    stateHigh: "poop"
};

elements.old_poop = {
    color: ["#c8b09f","#b3a59b","#947c6b"],
    behavior: [
        "CR:plague%0.015|CR:plague%0.0025|CR:plague%0.015",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    reactions: {
    "water":{ elem1:"dirty_water"}
    },
    category:"life",
    state: "solid"
};

elements.fertilized_soil = {
    color:"#52341f",
    tick: function(pixel) {
		behaviors.POWDER(pixel);
		for (var i = 0; i < adjacentCoords.length; i++) {
			var x = pixel.x+adjacentCoords[i][0];
			var y = pixel.y+adjacentCoords[i][1];
			if (isEmpty(x,y)) {
				if (Math.random() < 0.0009) { changePixel(pixel,"seeds") }
				break
			} } },

            reactions: {
                "water":{elem1:null, elem2:"super_fertilized_soil"}
            },
    category:"land",
    state:"solid"
};

elements.super_fertilized_soil = {
    color:"#452c1a",
    tick: function(pixel) {
		behaviors.POWDER(pixel);
		for (var i = 0; i < adjacentCoords.length; i++) {
			var x = pixel.x+adjacentCoords[i][0];
			var y = pixel.y+adjacentCoords[i][1];
			if (isEmpty(x,y)) {
				if (Math.random() < 0.005) { changePixel(pixel,"seeds") }
				break
			} } },
    category:"land",
    state:"solid"
};

elements.dead_plant.reactions = {
        "dirt":{elem1:null, elem2:"fertilized_soil"},
        "mud":{elem1:null, elem2:"super_fertilized_soil"}
    }

elements.dead_bug.reactions = {
        "dirt":{elem1:null, elem2:"fertilized_soil"},
        "mud":{elem1:null, elem2:"super_fertilized_soil"}
    }

elements.rotten_meat.reactions = {
        "dirt":{elem1:null, elem2:"fertilized_soil"},
        "mud":{elem1:null, elem2:"super_fertilized_soil"}
    }

elements.rotten_cheese.reactions = {
        "dirt":{elem1:null, elem2:"fertilized_soil"},
        "mud":{elem1:null, elem2:"super_fertilized_soil"}
    }

//elements.body.behavior = [
      //  "XX|XX|XX",
    //    "CR:liquid_poop%0.01|XX|CR:poop%0.01",
  //      "XX|XX|XX"
//]

elements.head.tick = function(pixel) {
		doHeat(pixel);
		doBurning(pixel);
		doElectricity(pixel);
		if (pixel.dead) {
			// Turn into rotten_meat if pixelTicks-dead > 500
			if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
				changePixel(pixel,"rotten_meat");
				return
			}
		}

		// Find the body
		if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "body") {
			var body = pixelMap[pixel.x][pixel.y+1];
			if (body.dead) { // If body is dead, kill head
				pixel.dead = body.dead;
			}
		}
		else { var body = null }

		// check for eating food
		if (body && !pixel.dead && Math.random() < 0.1) {
			shuffleArray(interactCoordsShuffle);
			for (var i = 0; i < interactCoordsShuffle.length; i++) {
				var x = pixel.x+interactCoordsShuffle[i][0];
				var y = pixel.y+interactCoordsShuffle[i][1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].isFood && pixelMap[x][y].panic === undefined) {
					deletePixel(x,y);
					if (Math.random() < 0.09){
                        var randomValue = Math.random() < 0.5 ? 1 : -1;
                        tryCreate("poop", pixel.x+randomValue, pixel.y)
					}
					break;
				}
			}
		}

		if (tryMove(pixel, pixel.x, pixel.y+1)) {
			// create blood if severed 10% chance
			if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
				createPixel("blood", pixel.x, pixel.y+1);
				// set dead to true 15% chance
				if (Math.random() < 0.15) {
					pixel.dead = pixelTicks;
				}
			}
		}
		// homeostasis
		if (pixel.temp > 37) { pixel.temp -= 1; }
		else if (pixel.temp < 37) { pixel.temp += 1; }
	};

elements.poop_exploder = {
    color: "#ff0000",
    tool: function(pixel) {
        if (pixel.element == "poop") {
            changePixel(pixel, "stench_explosion");
        }
        if (pixel.element == "liquid_poop") {
            changePixel(pixel, "stench_explosion");
        }
        if (pixel.element == "frozen_poop") {
            changePixel(pixel, "stench_explosion");
        }
        if (pixel.element == "old_poop") {
            changePixel(pixel, "stench_explosion");
        }
    },
    category: "tools",
};  

elements.stench_explosion = {
    color: ["#ffb48f","#ffd991","#ffad91"],
    behavior: [
		"XX|CR:stench|XX",
		"XX|EX:10>stench_fire,stench_fire,stench_fire|XX",
		"XX|XX|XX",
	],
    temp: 300,
	category: "energy",
	state: "gas",
	density: 1000,
	excludeRandom: true,
	noMix: true
};

elements.stench_fire = {
	color: ["#ff6b21","#ffa600","#ff4000"],
	tick: function(pixel){
		behaviors.GAS(pixel);
		if (!pixel.del && Math.random() < 0.08 ) {changePixel(pixel,"stench")}
	},
    
	tool: function(pixel) {
		if (pixel.temp >= elements.stench_fire.temp || elements[pixel.element].insulate) {return;}
		pixel.temp += elements.stench_fire.temp/(elements[pixel.element].extinguish ? 240 : 60);
		pixelTempCheck(pixel);
	},
	canPlace: true,
	reactions: {
		"fire": { elem1: "stench", elem2: "stench" },
		"plasma": { elem1: "light", elem2: "light" },
		"smoke": { elem2: null, chance:0.1 }
	},
	renderer: renderPresets.HUESHIFT,
	temp:600,
	tempLow:100,
	stateLow: "stench",
	category: "energy",
	state: "gas",
	density: 0.1
};


