// Bismuth is the best element
async function _nousersthingsprompt(message, defaultValue = "") { // thanks to ggod for updated prompt function
    return new Promise(resolve => {
        promptInput(message, (result) => {
            resolve(result);
        }, "nousersthings.js is asking you...", defaultValue);
    })
}
async function _nousersthingslistprompt(message, choices) {
    return new Promise(resolve => {
        promptChoose(message, choices, (result) => {
            resolve(result);
        }, "nousersthings.js is asking you...");
    })
}
behaviors.RADSOLID = [
    "XX|CR:radiation%1|XX",
    "CR:radiation%1|XX|CR:radiation%1",
    "XX|CR:radiation%1|XX"
]
elements.caesium = {
	color: ["#917921", "#ebcb59", "#a48b2d", "#d6b84c"],
	behavior: behaviors.WALL,
	category: "solids",
	state: "solid",
	tempHigh: 28.44,
	stateHigh: "molten_caesium",
	density: 1873,
	conduct: 0.90,
	reactions: {
			"water": { "elem1":"pop", "elem2":"hydrogen" },
			"sugar_water": { "elem1":"pop", "elem2":"hydrogen" },
			"dirty_water": { "elem1":"pop", "elem2":"hydrogen" },
			"pool_water": { "elem1":"pop", "elem2":"hydrogen" },
			"salt_water": { "elem1":"pop", "elem2":"hydrogen" },
			"seltzer":  { "elem1":"pop", "elem2":"hydrogen" },
		}
},
elements.molten_caesium = {
	color: ["#735c0a", "#a68e37", "#7e6715", "#9b832e"],
	behavior: behaviors.LIQUID,
	category: "states",
	state: "liquid",
	tempLow: 27.44,
	stateLow: "caesium",
    hidden: true,
	tempHigh: 671,
	stateHigh: "caesium_vapor",
	density: 1842,
	temp: 29,
	conduct: 0.90,
	reactions: {
		"water": { "elem1":"pop", "elem2":"hydrogen" },
		"sugar_water": { "elem1":"pop", "elem2":"hydrogen" },
		"dirty_water": { "elem1":"pop", "elem2":"hydrogen" },
		"pool_water": { "elem1":"pop", "elem2":"hydrogen" },
		"salt_water": { "elem1":"pop", "elem2":"hydrogen" },
		"seltzer":  { "elem1":"pop", "elem2":"hydrogen" },
	}
},
elements.caesium_vapor = {
	color: ["#d89e77", "#cd9064", "#af6f34", "#a26320"],
	behavior: behaviors.GAS,
	category: "states",
	state: "gas",
	tempLow: 660,
    hidden: true,
	stateLow: "molten_caesium",
	density: 1.7,
	temp: 700
}
elements.caesium_137 = {
	color: ["#917921", "#ebcb59", "#a48b2d", "#d6b84c"],
	behavior: behaviors.RADSOLID,
	category: "solids",
	state: "solid",
	tempHigh: 28.44,
	stateHigh: "molten_caesium_137",
	density: 1873,
	conduct: 0.90,
	reactions: {
			"water": { "elem1":"pop", "elem2":"hydrogen" },
			"sugar_water": { "elem1":"pop", "elem2":"hydrogen" },
			"dirty_water": { "elem1":"pop", "elem2":"hydrogen" },
			"pool_water": { "elem1":"pop", "elem2":"hydrogen" },
			"salt_water": { "elem1":"pop", "elem2":"hydrogen" },
			"seltzer":  { "elem1":"pop", "elem2":"hydrogen" },
		},
    tick: function(pixel){
        if (Math.random()<0.0002){
            changePixel(pixel, "barium", false)
            if (Math.random() >= 0.946){
                pixelMap[pixel.x][pixel.y].excited = true
            }
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x, y)){
                    createPixel("electric", x, y)
                    break;
                }
            }
        }
    }
},
elements.molten_caesium_137 = {
	color: ["#735c0a", "#a68e37", "#7e6715", "#9b832e"],
	behavior: behaviors.RADLIQUID,
	category: "states",
	state: "liquid",
	tempLow: 27.44,
	stateLow: "caesium_137",
	tempHigh: 671,
    hidden: true,
	stateHigh: "caesium_137_vapor",
	density: 1842,
	temp: 29,
	conduct: 0.90,
	reactions: {
		"water": { "elem1":"pop", "elem2":"hydrogen" },
		"sugar_water": { "elem1":"pop", "elem2":"hydrogen" },
		"dirty_water": { "elem1":"pop", "elem2":"hydrogen" },
		"pool_water": { "elem1":"pop", "elem2":"hydrogen" },
		"salt_water": { "elem1":"pop", "elem2":"hydrogen" },
		"seltzer":  { "elem1":"pop", "elem2":"hydrogen" },
	},
    tick: function(pixel){
        if (Math.random()<0.0002){
            changePixel(pixel, "barium", false)
            if (Math.random() >= 0.946){
                pixelMap[pixel.x][pixel.y].excited = true
            }
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x, y)){
                    createPixel("electric", x, y)
                    break;
                }
            }
        }
    }
},
elements.caesium_137_vapor = {
	color: ["#d89e77", "#cd9064", "#af6f34", "#a26320"],
	behavior: behaviors.RADSOLID,
	category: "states",
	state: "gas",
	tempLow: 660,
	stateLow: "molten_caesium_137",
	density: 1.7,
	temp: 700,
    hidden: true,
    tick: function(pixel){
        behaviors.GAS(pixel)
        if (Math.random()<0.0002){
            changePixel(pixel, "barium", false)
            if (Math.random() >= 0.946){
                pixelMap[pixel.x][pixel.y].excited = true
            }
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x, y)){
                    createPixel("electric", x, y)
                    break;
                }
            }
        }
    }
}
elements.barium = {
    color: ["#191f19", "#2c332c", "#3f483f", "#545e54", "#6a756a"],
    behavior: behaviors.STURDYPOWDER,
    reactions: elements.caesium.reactions,
    category: "powders",
    state: "solid",
    tempHigh: 730,
    stateHigh: "molten_barium",
    density: 3594,
    tick: function(pixel){
        if(pixel.excited && Math.random() < 0.005){
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x, y)){
                    createPixel("laser", x, y)
                    pixelMap[x][y].temp = pixel.temp + 120
                    delete pixel.excited
                    break;
                }
            }
        }
    }
}
elements.molten_barium = {
    color: ["#c26d24", "#cf8225", "#da9727", "#e4ad2b", "#ecc432"],
    behavior: behaviors.MOLTEN,
    reactions: elements.caesium.reactions,
    category: "states",
    state: "liquid",
    tempLow: 728,
    hidden: true,
    stateLow: "barium",
    density: 3338,
    tick: function(pixel){
        if(pixel.excited && Math.random() < 0.005){
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x, y)){
                    createPixel("laser", x, y)
                    pixelMap[x][y].temp = pixel.temp + 120
                    delete pixel.excited
                    break;
                }
            }
        }
    }
}
elements.subzero_grass_seed = {
	color: ["#022c14", "#032911", "#032205", "#021f00"],
	behavior: [
	"XX|M2%0.1|XX",
	"XX|L2:subzero_grass AND C2:subzero_grass%15|XX",
	"XX|M1|XX",
	],
	category: "life",
	state: "solid",
	tempHigh: 10,
	temp: 0,
	stateHigh: "dead_plant",
	density: 1400
},
elements.subzero_grass = {
	color: ["#003220", "#022a1a", "#032314", "#001c0d"],
	behavior: behaviors.STURDYPOWDER,
	category: "life",
	state: "solid",
	tempHigh: 13,
	temp: 0,
	stateHigh: "dead_plant",
	density:1400
},
elements.ruthenium = {
    color: ["#ffffff","#c9c9c9","#b1b1b1","#9e9e9e","#888888"],
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    state: "liquid",
    tempHigh: 2334,
    stateHigh: "molten_ruthenium",
    density: 12370,
}
elements.molten_ruthenium = {
    color: ["#ffc251", "#dd562c", "#e9a423", "#d8722e"],
    behavior: behaviors.MOLTEN,
    category: "states",
    state: "liquid",
    hidden: true,
    density: 10650,
    tempLow: 2330,
    stateLow: "ruthenium"
}
elements.acid.ignore.push("ruthenium"),
elements.acid.ignore.push("molten_ruthenium"),
elements.acid_gas.ignore.push("ruthenium"),
elements.acid_gas.ignore.push("molten_ruthenium")
elements.technetium = {
	color: ["#e7d9bb", "#bab195", "#8f8a70", "#66654e"],
	behavior: behaviors.RADSOLID,
    tick: function(pixel){
        if(Math.random() < 0.0007){
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y)){
                createPixel("electric", x, y)
                break;
            }
        }
        changePixel(pixel, "ruthenium", false);
    }
    },
	category: "solids",
	state: "solid",
	tempHigh: 2157,
	stateHigh: "molten_technetium",
    movable: false,
	density: 11500,
	conduct: 0.9
},
 elements.molten_technetium = {
	color: ["#d16b42", "#da904c", "#dfb360", "#e2d57f"],
	behavior: behaviors.RADMOLTEN,
	tick: function(pixel){
        if(Math.random() < 0.0007){
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y)){
                createPixel("electric", x, y)
                break;
            }
        }
        changePixel(pixel, "ruthenium", false);
    }
    },
	category: "states",
	state: "liquid",
    hidden: true,
	tempLow: 2140,
	temp: 2200,
	stateLow: "technetium",
	density: 11400
},
elements.destroyable_pipe = {
    color: "#414c4f",
    tick: function(pixel) {
		if (!pixel.stage && pixelTicks-pixel.start > 60) {
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
					deletePixel(x,y)
				}
				if (isEmpty(x,y)) {
					createPixel("brick",x,y);
                    pixelMap[x][y].color = pixelColorPick({element:"pipe_wall"})
				}
			}
			pixel.color = pixelColorPick(pixel,"#293132");
			pixel.stage = 1;
		}
		else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
			for (var i = 0; i < adjacentCoords.length; i++) {
				var coord = adjacentCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (isEmpty(x,y)) {
					pixel.stage = 2; //blue
					pixel.color = pixelColorPick(pixel,"#000056");
					break;
				}
			}
		}
		else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && pixelMap[x][y].element === "destroyable_pipe") {
					var newPixel = pixelMap[x][y];
					if (newPixel.stage === 1) {
						var newColor;
						switch (pixel.stage) {
							case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
							case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
							case 4: newPixel.stage = 2; newColor = "#000056"; break; //blue
						}
						newPixel.color = pixelColorPick(newPixel,newColor);
					}
				}
			}
			var moved = false;
			shuffleArray(squareCoordsShuffle);
			for (var i = 0; i < squareCoordsShuffle.length; i++) {
				var coord = squareCoordsShuffle[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true)) {
					var newPixel = pixelMap[x][y];
					if (newPixel.element === "destroyable_pipe") {
						var nextStage;
						switch (pixel.stage) {
							case 2: nextStage = 4; break; //green
							case 3: nextStage = 2; break; //red
							case 4: nextStage = 3; break; //blue
						}
						if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
							newPixel.con = pixel.con;
							newPixel.con.x = newPixel.x;
							newPixel.con.y = newPixel.y;
							pixel.con = null;
							moved = true;
							break;
						}
					}
					else if (!pixel.con && elements[newPixel.element].movable) { //suck up pixel
						pixel.con = newPixel;
						deletePixel(newPixel.x,newPixel.y);
						pixel.con.x = pixel.x;
						pixel.con.y = pixel.y;
						pixel.con.del;
						moved = true;
						break;
					}
				}
			}
			if (pixel.con && !moved) { // move to same stage if none other
				for (var i = 0; i < squareCoordsShuffle.length; i++) {
					var coord = squareCoordsShuffle[i];
					var x = pixel.x+coord[0];
					var y = pixel.y+coord[1];
					if (isEmpty(x,y)) {
						delete pixel.con.del;
						pixel.con.x = x;
						pixel.con.y = y;
						pixelMap[x][y] = pixel.con;
						currentPixels.push(pixel.con);
						pixel.con = null;
						break;
					}
					if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].canContain) {
						var newPixel = pixelMap[x][y];
						if (newPixel.filter) {
							if (newPixel.filter !== pixel.con.element && !newPixel.filter.split(",").includes(pixel.con.element)) continue
						}
						if (pixel.con && !newPixel.con && (pixelMap[x][y].element !== "destroyable_pipe" || newPixel.stage === pixel.stage)) {
							newPixel.con = pixel.con;
							newPixel.con.x = newPixel.x;
							newPixel.con.y = newPixel.y;
							pixel.con = null;
							break;
						}
					}
				}
			}
		}
		doDefaults(pixel);
	},
    category: "machines",
    movable: false,
    canContain: true,
    forceSaveColor: true,
	tempHigh: 1538,
	stateHigh: "molten_iron",
	breakInto: "metal_scrap", 
}
saveElementMigrations.bridge_pipe = function(pixel){
    pixel.element = "pipe"
}
elements.e_pipe = {
    color: "#414c4f",
    onSelect: function() {
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole.");
    },
    tick: function(pixel) {
        const charged = pixel.charge || pixel.chargeCD
		if (!pixel.stage && pixelTicks-pixel.start > 60) {
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
					deletePixel(x,y)
				}
				if (isEmpty(x,y)) {
					createPixel("pipe_wall",x,y);
				}
			}
			pixel.color = pixelColorPick(pixel,"#293132");
			pixel.stage = 1;
		}
		else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
			for (var i = 0; i < adjacentCoords.length; i++) {
				var coord = adjacentCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (isEmpty(x,y)) {
					pixel.stage = 2; //blue
					pixel.color = pixelColorPick(pixel,"#000056");
					break;
				}
			}
		}
		else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && pixelMap[x][y].element === "e_pipe") {
					var newPixel = pixelMap[x][y];
					if (newPixel.stage === 1) {
						var newColor;
						switch (pixel.stage) {
							case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
							case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
							case 4: newPixel.stage = 2; newColor = "#000056"; break; //blue
						}
						newPixel.color = pixelColorPick(newPixel,newColor);
					}
				}
			}
            if (charged){
            var moved = false;
            shuffleArray(squareCoordsShuffle);
            for (var i = 0; i < squareCoordsShuffle.length; i++) {
                var coord = squareCoordsShuffle[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.element === "e_pipe") {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && elements[newPixel.element].movable) { //suck up pixel
                        pixel.con = newPixel;
                        deletePixel(newPixel.x,newPixel.y);
                        pixel.con.x = pixel.x;
                        pixel.con.y = pixel.y;
                        pixel.con.del;
                        moved = true;
                        break;
                    }
                }
            }
                if (pixel.con && !moved) { // move to same stage if none other
                    for (var i = 0; i < squareCoordsShuffle.length; i++) {
                        var coord = squareCoordsShuffle[i];
                        var x = pixel.x+coord[0];
                        var y = pixel.y+coord[1];
                        if (isEmpty(x,y)) {
                            delete pixel.con.del;
                            pixel.con.x = x;
                            pixel.con.y = y;
                            pixelMap[x][y] = pixel.con;
                            currentPixels.push(pixel.con);
                            pixel.con = null;
                            break;
                        }
                        if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].canContain) {
                            var newPixel = pixelMap[x][y];
                            if (newPixel.filter) {
                                if (newPixel.filter !== pixel.con.element && !newPixel.filter.split(",").includes(pixel.con.element)) continue
                            }
                            if (pixel.con && !newPixel.con && (pixelMap[x][y].element !== "e_pipe" || newPixel.stage === pixel.stage)) {
                                newPixel.con = pixel.con;
                                newPixel.con.x = newPixel.x;
                                newPixel.con.y = newPixel.y;
                                pixel.con = null;
                                break;
                            }
                        }
                    }
                }
            }
		}
		doDefaults(pixel);
	},
    category: "machines",
    movable: false,
    canContain: true,
	conduct: 1,
    insulate: true,
},
elements.destroyable_e_pipe = {
    color: "#414c4f",
    onSelect: function() {
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole.");
    },
    tick: function(pixel) {
        const charged = pixel.charge || pixel.chargeCD
		if (!pixel.stage && pixelTicks-pixel.start > 60) {
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
					deletePixel(x,y)
				}
				if (isEmpty(x,y)) {
					createPixel("brick",x,y);
                    pixelMap[x][y].color = pixelColorPick({element:"pipe_wall"})
				}
			}
			pixel.color = pixelColorPick(pixel,"#293132");
			pixel.stage = 1;
		}
		else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
			for (var i = 0; i < adjacentCoords.length; i++) {
				var coord = adjacentCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (isEmpty(x,y)) {
					pixel.stage = 2; //blue
					pixel.color = pixelColorPick(pixel,"#000056");
					break;
				}
			}
		}
		else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && pixelMap[x][y].element === "destroyable_e_pipe") {
					var newPixel = pixelMap[x][y];
					if (newPixel.stage === 1) {
						var newColor;
						switch (pixel.stage) {
							case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
							case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
							case 4: newPixel.stage = 2; newColor = "#000056"; break; //blue
						}
						newPixel.color = pixelColorPick(newPixel,newColor);
					}
				}
			}
            if (charged){
            var moved = false;
            shuffleArray(squareCoordsShuffle);
            for (var i = 0; i < squareCoordsShuffle.length; i++) {
                var coord = squareCoordsShuffle[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.element === "destroyable_e_pipe") {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && elements[newPixel.element].movable) { //suck up pixel
                        pixel.con = newPixel;
                        deletePixel(newPixel.x,newPixel.y);
                        pixel.con.x = pixel.x;
                        pixel.con.y = pixel.y;
                        pixel.con.del;
                        moved = true;
                        break;
                    }
                }
            }
                if (pixel.con && !moved) { // move to same stage if none other
                    for (var i = 0; i < squareCoordsShuffle.length; i++) {
                        var coord = squareCoordsShuffle[i];
                        var x = pixel.x+coord[0];
                        var y = pixel.y+coord[1];
                        if (isEmpty(x,y)) {
                            delete pixel.con.del;
                            pixel.con.x = x;
                            pixel.con.y = y;
                            pixelMap[x][y] = pixel.con;
                            currentPixels.push(pixel.con);
                            pixel.con = null;
                            break;
                        }
                        if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].canContain) {
                            var newPixel = pixelMap[x][y];
                            if (newPixel.filter) {
                                if (newPixel.filter !== pixel.con.element && !newPixel.filter.split(",").includes(pixel.con.element)) continue
                            }
                            if (pixel.con && !newPixel.con && (pixelMap[x][y].element !== "destroyable_e_pipe" || newPixel.stage === pixel.stage)) {
                                newPixel.con = pixel.con;
                                newPixel.con.x = newPixel.x;
                                newPixel.con.y = newPixel.y;
                                pixel.con = null;
                                break;
                            }
                        }
                    }
                }
            }
		}
		doDefaults(pixel);
	},
    category: "machines",
    movable: false,
    canContain: true,
	conduct: 1,
	tempHigh: 1538,
	stateHigh: "molten_iron",
	breakInto: ["metal_scrap", "wire"]
},
elements.channel_pipe = {
    color: "#414c4f",
    onSelect: async function() {
        let currentChannel = await _nousersthingsprompt("Please input the desired channel of this pipe strand.", undefined)
		logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole. Channel pipes only give pixels to channel pipes with the same channel.");
        currentElementProp = {channel: currentChannel}
    },
    tick: function(pixel) {
        if (typeof pixel.channel == "undefined"){changePixel(pixel,"flash"); logMessage("A channel pipe without a valid channel was attempted to be placed."); return;}
		if (!pixel.stage && pixelTicks-pixel.start > 60) {
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
					deletePixel(x,y)
				}
				if (isEmpty(x,y)) {
					createPixel("pipe_wall",x,y);
				}
			}
			pixel.color = pixelColorPick(pixel,"#293132");
			pixel.stage = 1;
		}
		else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
			for (var i = 0; i < adjacentCoords.length; i++) {
				var coord = adjacentCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (isEmpty(x,y)) {
					pixel.stage = 2; //blue
					pixel.color = pixelColorPick(pixel,"#000056");
					break;
				}
			}
		}
		else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && pixelMap[x][y].element === "channel_pipe" && pixelMap[x][y].channel === pixel.channel) {
					var newPixel = pixelMap[x][y];
					if (newPixel.stage === 1) {
						var newColor;
						switch (pixel.stage) {
							case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
							case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
							case 4: newPixel.stage = 2; newColor = "#000056"; break; //blue
						}
						newPixel.color = pixelColorPick(newPixel,newColor);
					}
				}
			}
			var moved = false;
			shuffleArray(squareCoordsShuffle);
			for (var i = 0; i < squareCoordsShuffle.length; i++) {
				var coord = squareCoordsShuffle[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true)) {
					var newPixel = pixelMap[x][y];
					if (newPixel.element === "channel_pipe" && newPixel.channel === pixel.channel) {
						var nextStage;
						switch (pixel.stage) {
							case 2: nextStage = 4; break; //green
							case 3: nextStage = 2; break; //red
							case 4: nextStage = 3; break; //blue
						}
						if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
							newPixel.con = pixel.con;
							newPixel.con.x = newPixel.x;
							newPixel.con.y = newPixel.y;
							pixel.con = null;
							moved = true;
							break;
						}
					}
					else if (!pixel.con && elements[newPixel.element].movable) { //suck up pixel
						pixel.con = newPixel;
						deletePixel(newPixel.x,newPixel.y);
						pixel.con.x = pixel.x;
						pixel.con.y = pixel.y;
						pixel.con.del;
						moved = true;
						break;
					}
				}
			}
			if (pixel.con && !moved) { // move to same stage if none other
				for (var i = 0; i < squareCoordsShuffle.length; i++) {
					var coord = squareCoordsShuffle[i];
					var x = pixel.x+coord[0];
					var y = pixel.y+coord[1];
					if (isEmpty(x,y)) {
						delete pixel.con.del;
						pixel.con.x = x;
						pixel.con.y = y;
						pixelMap[x][y] = pixel.con;
						currentPixels.push(pixel.con);
						pixel.con = null;
						break;
					}
					if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].canContain) {
						var newPixel = pixelMap[x][y];
						if (newPixel.filter) {
							if (newPixel.filter !== pixel.con.element && !newPixel.filter.split(",").includes(pixel.con.element)) continue
						}
                        if (newPixel.element == "channel_pipe" && newPixel.channel !== pixel.channel){continue;} 
						if (pixel.con && !newPixel.con && (pixelMap[x][y].element !== "channel_pipe" || newPixel.stage === pixel.stage)) {
							newPixel.con = pixel.con;
							newPixel.con.x = newPixel.x;
							newPixel.con.y = newPixel.y;
							pixel.con = null;
							break;
						}
					}
				}
			}
		}
		doDefaults(pixel);
	},
    category: "machines",
    movable: false,
    canContain: true,
    insulate: true,
},
elements.destroyable_channel_pipe = {
    color: "#414c4f",
    onSelect: async function() {
        let currentChannel = await _nousersthingsprompt("Please input the desired channel of this pipe strand.", undefined)
		logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole. Channel pipes only give pixels to channel pipes with the same channel.");
        currentElementProp = {channel: currentChannel}
    },
    tick: function(pixel) {
        if (typeof pixel.channel == "undefined"){changePixel(pixel,"flash"); logMessage("A channel pipe without a valid channel was attempted to be placed."); return;}
		if (!pixel.stage && pixelTicks-pixel.start > 60) {
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
					deletePixel(x,y)
				}
				if (isEmpty(x,y)) {
					createPixel("brick",x,y);
                    pixelMap[x][y].color = pixelColorPick({element: "pipe_wall"})
				}
			}
			pixel.color = pixelColorPick(pixel,"#293132");
			pixel.stage = 1;
		}
		else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
			for (var i = 0; i < adjacentCoords.length; i++) {
				var coord = adjacentCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (isEmpty(x,y)) {
					pixel.stage = 2; //blue
					pixel.color = pixelColorPick(pixel,"#000056");
					break;
				}
			}
		}
		else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && pixelMap[x][y].element === "destroyable_channel_pipe" && pixelMap[x][y].channel === pixel.channel) {
					var newPixel = pixelMap[x][y];
					if (newPixel.stage === 1) {
						var newColor;
						switch (pixel.stage) {
							case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
							case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
							case 4: newPixel.stage = 2; newColor = "#000056"; break; //blue
						}
						newPixel.color = pixelColorPick(newPixel,newColor);
					}
				}
			}
			var moved = false;
			shuffleArray(squareCoordsShuffle);
			for (var i = 0; i < squareCoordsShuffle.length; i++) {
				var coord = squareCoordsShuffle[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true)) {
					var newPixel = pixelMap[x][y];
					if (newPixel.element === "destroyable_channel_pipe" && newPixel.channel === pixel.channel) {
						var nextStage;
						switch (pixel.stage) {
							case 2: nextStage = 4; break; //green
							case 3: nextStage = 2; break; //red
							case 4: nextStage = 3; break; //blue
						}
						if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
							newPixel.con = pixel.con;
							newPixel.con.x = newPixel.x;
							newPixel.con.y = newPixel.y;
							pixel.con = null;
							moved = true;
							break;
						}
					}
					else if (!pixel.con && elements[newPixel.element].movable) { //suck up pixel
						pixel.con = newPixel;
						deletePixel(newPixel.x,newPixel.y);
						pixel.con.x = pixel.x;
						pixel.con.y = pixel.y;
						pixel.con.del;
						moved = true;
						break;
					}
				}
			}
			if (pixel.con && !moved) { // move to same stage if none other
				for (var i = 0; i < squareCoordsShuffle.length; i++) {
					var coord = squareCoordsShuffle[i];
					var x = pixel.x+coord[0];
					var y = pixel.y+coord[1];
					if (isEmpty(x,y)) {
						delete pixel.con.del;
						pixel.con.x = x;
						pixel.con.y = y;
						pixelMap[x][y] = pixel.con;
						currentPixels.push(pixel.con);
						pixel.con = null;
						break;
					}
					if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].canContain) {
						var newPixel = pixelMap[x][y];
						if (newPixel.filter) {
							if (newPixel.filter !== pixel.con.element && !newPixel.filter.split(",").includes(pixel.con.element)) continue
						}
                        if (newPixel.element == "destroyable_channel_pipe" && newPixel.channel !== pixel.channel){continue;} 
						if (pixel.con && !newPixel.con && (pixelMap[x][y].element !== "destroyable_channel_pipe" || newPixel.stage === pixel.stage)) {
							newPixel.con = pixel.con;
							newPixel.con.x = newPixel.x;
							newPixel.con.y = newPixel.y;
							pixel.con = null;
							break;
						}
					}
				}
			}
		}
		doDefaults(pixel);
	},
    category: "machines",
    breakInto: "metal_scrap",
    movable: false,
    canContain: true,
},
elements.destroyable_superheater = {
    color: "#dd1111",
    behavior: [
        "XX|HT:10|XX",
        "HT:10|XX|HT:10",
        "XX|HT:10|XX",
    ],
    category:"machines",
	stateLow:["iron","copper"],
	tempLow: -7,
	breakInto:["metal_scrap","oxidized_copper"],
},
elements.destroyable_heater = {
    color: "#881111",
    behavior: [
        "XX|HT:2|XX",
        "HT:2|XX|HT:2",
        "XX|HT:2|XX",
    ],
    category:"machines",
	stateLow:["iron","copper"],
	tempLow: -7,
	breakInto:["metal_scrap","oxidized_copper"],
},
elements.destroyable_cooler = {
    color: "#111188",
    behavior: [
        "XX|CO:2|XX",
        "CO:2|XX|CO:2",
        "XX|CO:2|XX",
    ],
    category:"machines",
	stateHigh:["iron","copper"],
	tempHigh: 49,
	breakInto:["metal_scrap","oxidized_copper"],
},
elements.destroyable_freezer = {
    color: "#1111dd",
    behavior: [
        "XX|CO:10|XX",
        "CO:10|XX|CO:10",
        "XX|CO:10|XX",
    ],
    category:"machines",
	stateHigh:["iron","copper"],
	tempHigh: 49,
	breakInto:["metal_scrap","oxidized_copper"],
},
elements.destroyable_cloner = {
    color: "#dddd00",
    behavior: behaviors.CLONER,
    ignore: ["ecloner","slow_cloner","clone_powder","floating_cloner","wall","ewall","destroyable_cloner","destroyable_clone_powder","cloner"],
    category:"machines",
    darkText: true,
	breakInto: "destroyable_clone_powder",
	tempHigh: 1538,
	stateHigh: "molten_iron",
},
elements.destroyable_clone_powder = {
    color: "#f0f000",
    behavior: [
        "XX|CF|XX",
        "CF|XX|CF",
        "M2|CF AND M1|M2",
    ],
    ignore: ["ecloner","slow_cloner","clone_powder","floating_cloner","wall","ewall","destroyable_cloner","destroyable_clone_powder","cloner"],
    category:"machines",
    state:"solid",
    density:2710,
    darkText: true,
	breakInto: "destroyable_clone_powder",
	tempHigh: 1538,
	stateHigh: "molten_iron",
},
eLists.CLONERS = ["ecloner","slow_cloner","clone_powder","floating_cloner","wall","ewall","destroyable_cloner","destroyable_clone_powder","cloner"];
elements.cloner.ignore = eLists.CLONERS;
elements.slow_cloner.ignore = eLists.CLONERS;
elements.clone_powder.ignore = eLists.CLONERS;
elements.floating_cloner.ignore = eLists.CLONERS;
elements.roomtemper = {
	color: "#29632f",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < -230) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > 270) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
},
elements.destroyable_roomtemper = {
	color: "#18401a",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < -230) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > 270) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > 20) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	tempHigh: 1538,
	stateHigh: ["steam","molten_iron"],
	tempLow: -200,
	stateLow: ["ice", "iron"],
	breakInto: ["snow","metal_scrap"],
	noMix: true,
	movable: false,
},
elements.customtemper = {
	color: "#421b6b",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < (pixel.temp - 250)) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > (pixel.temp + 250)) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < pixel.temp) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > pixel.temp) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	insulate: true,
	noMix: true,
	movable: false,
},
elements.destroyable_customtemper = {
	color: "#261047",
	behavior: behaviors.WALL,
	tick: function(pixel) {
		for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					if(pixelMap[x][y].temp < (pixel.temp - 250)) {
                    pixelMap[x][y].temp = (pixelMap[x][y].temp + 7)
					} else if(pixelMap[x][y].temp > (pixel.temp + 250)) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 7)
					} else if (pixelMap[x][y].temp < pixel.temp) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp + 2)
					} else if (pixelMap[x][y].temp > pixel.temp) {
						pixelMap[x][y].temp = (pixelMap[x][y].temp - 2)
					}
                }
            }
	},
	category:"machines",
	state:"solid",
	insulate: true,
	breakInto: ["snow","metal_scrap","oxidized_copper","wire"],
	noMix: true,
	movable: false,
},
elements.filter.tick = function(pixel) {
		doDefaults(pixel);
		if (!pixel.con) { //collect pixel
			if (Math.random() > 0.2) return;
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				let newPixel = getPixel(x, y);
				if (!newPixel) continue;
				if (newPixel.element === "filter") {
					if (!newPixel.filter && pixel.filter) newPixel.filter = pixel.filter;
					if (!pixel.filter && newPixel.filter) pixel.filter = newPixel.filter;
				}
				//if (!elements[newPixel.element].movable) continue;
				if (!pixel.filter && elements[newPixel.element].movable) {
					pixel.filter = newPixel.element;
				} else if(!pixel.filter){continue;}
				if ((
					pixel.filter === newPixel.element ||
					(pixel.filter === elements[newPixel.element].state && elements[newPixel.element].movable)||
					(pixel.filter.match(/,/) && pixel.filter.split(",").includes(newPixel.element))
				)) {
					pixel.con = newPixel;
					deletePixel(newPixel.x,newPixel.y);
					pixel.con.x = pixel.x;
					pixel.con.y = pixel.y;
					pixel.con.del;
					pixel.filterTick = pixelTicks;
					break;
				}
			}
			return;
		}

		pixel.con.x = pixel.x;
		pixel.con.y = pixel.y;

		//move pixel
		let targets;
		let element = pixel.con.element;
		//if (elements[element].isGas) { //random direction
			shuffleArray(squareCoordsShuffle);
			targets = squareCoordsShuffle;
		//}
		//else { //downward, and then randomly diagonally
		//	if (Math.random() < 0.5) return;
		//	targets = [[0,1], ...(Math.random() < 0.5 ? [[1,1],[-1,1]] : [[-1,1],[1,1]])];
		//}

		for (var i = 0; i < targets.length; i++) {
			var coord = targets[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (isEmpty(x,y)) { //release pixel
				delete pixel.con.del;
				pixel.con.x = x;
				pixel.con.y = y;
				pixelMap[x][y] = pixel.con;
				currentPixels.push(pixel.con);
				pixel.con = null;
				break;
			}
			let newPixel = getPixel(x, y);
			if (!newPixel) continue;
			if (elements[newPixel.element].canContain && !newPixel.con && newPixel.filterTick !== pixelTicks) {
				if (newPixel.filter && newPixel.filter !== pixel.filter) {
					if (newPixel.filter !== pixel.con.element && !newPixel.filter.split(",").includes(pixel.con.element)) continue
				}
				newPixel.con = pixel.con;
				newPixel.con.x = newPixel.x;
				newPixel.con.y = newPixel.y;
				// newPixel.con.del = true; //???
				newPixel.filterTick = pixelTicks;
				// delete newPixel.con.del;
				pixel.con = null;
				break;
			}
		}

	}
saveElementMigrations.filter = function(pixel) {
    if (pixel.filterType){pixel.filter = pixel.filterType; delete pixel.filterType}
}
saveElementMigrations.powder_filter = function(pixel) {
    pixel.element = "filter";
    pixel.filter = "solid";
}
saveElementMigrations.liquid_filter = function(pixel) {
    pixel.element = "filter";
    pixel.filter = "liquid";
}
saveElementMigrations.gas_filter = function(pixel) {
    pixel.element = "filter";
    pixel.filter = "gas";
}
elements.heat_test = {
	onSelect: function() {
        logMessage("Use heatglow.js for more elements to glow when they are hot.");
    },
	color: "#787878",
	behavior: behaviors.WALL,
	category: "solids",
	state: "solid",
	tempHigh: 1538,
	stateHigh: "molten_iron",
	movable: false,
	tick: function(pixel){
		if (pixel.start == pixelTicks){
			pixel.ogR = parseInt(pixel.color.slice(4, pixel.color.indexOf(',')), 10)
			pixel.ogG = parseInt(pixel.color.slice(pixel.color.indexOf(',') + 1, pixel.color.lastIndexOf(',')), 10)
			pixel.ogB = parseInt(pixel.color.slice(pixel.color.lastIndexOf(',') + 1, -1), 10)
		}else if (pixelTicks > pixel.start){
			if (pixel.temp <= (elements.heat_test.tempHigh) - 700){ // replace 700 with lower limit of range
				pixel.ctemp = 0;
			} else if (pixel.temp > (elements.heat_test.tempHigh)-700 && pixel.temp <= elements.heat_test.tempHigh){ // replace 700 with lower limit of range
				pixel.ctemp = ((1/700)*pixel.temp)-(((elements.heat_test.tempHigh)-700)/700) // replace 700 with lower limit of range
			}
			if (pixel.ctemp <= 0.5){
				pixel.newR = (((510-(2*pixel.ogR))*pixel.ctemp)+pixel.ogR);
				pixel.newG = ((0-((2*pixel.ogG)*pixel.ctemp))+pixel.ogG);
				pixel.newB = ((0-((2*pixel.ogB)*pixel.ctemp))+pixel.ogB);
			}else if (pixel.ctemp > 0.5){
				pixel.newR = 255;
				pixel.newG = ((510*pixel.ctemp)-256);
				pixel.newB= ((280*pixel.ctemp)-140);
			}
			pixel.color = "rgb(" + pixel.newR + "," + pixel.newG + "," + pixel.newB + ")";
		}
	},
},
converter1Var = 0;
converter2Var = 0;
elements.converter = {
	color: "#296127",
	behavior: behaviors.WALL,
	category: "machines",
	tick: function(pixel) {
		if (typeof pixel.contype == "undefined" || typeof pixel.specialturn == "undefined"){changePixel(pixel, "flash"); logMessage("A converter without valid properties was attempted to be placed."); return;}
		 for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true)) {
					var otherPixel = pixelMap[x][y];
					if ((otherPixel.element == pixel.specialturn || pixel.specialturn == "all") && !elements.converter.ignore.includes(otherPixel.element) && otherPixel.element != pixel.contype){
						changePixel(otherPixel, pixel.contype)
					}
                }
            }
	},
	onSelect: async function() {
        var answer5 = await _nousersthingsprompt("Please input what type of element should be converted. Write \"all\" to include everything.",(converter1Var||undefined));
        if (!answer5) { return }
		converter1Var = answer5;
		var answer6 = await _nousersthingsprompt("Please input what it should turn into.",(converter2Var||undefined));
        if (!answer6) { return }
		converter2Var = answer6;
        currentElementProp = {contype: converter2Var, specialturn: converter1Var}
    },
	ignore: ["converter", "wall", "ewall", "border"],
	movable: false,
},
elements.blackhole_storage = {
	color: "#171717",
	behavior: behaviors.WALL,
	category: "machines",
	tick: function(pixel) {
		if (!pixel.bhcontents){
			pixel.bhcontents = [];
		}
		 for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y, true) && (!pixel.charge && !pixel.chargeCD)) {
					var otherPixel = pixelMap[x][y];
					if (elements[otherPixel.element].movable == true){
						pixel.bhcontents.push(otherPixel);
						deletePixel(otherPixel.x, otherPixel.y);
					}
                } else if (pixel.charge && isEmpty(x,y) && pixel.bhcontents.length){
					let randomindex = Math.floor(Math.random()*pixel.bhcontents.length);
                    let releasedPixel = pixel.bhcontents[randomindex]
                    pixel.bhcontents.splice(randomindex, 1)
                    delete releasedPixel.del
                    releasedPixel.x = x
                    releasedPixel.y = y
                    pixelMap[x][y] = releasedPixel
                    currentPixels.push(releasedPixel)
				}
            }
	},
	movable: false,
	conduct: 1,
},
elements.plutonium = {
	color: ["#212121", "#2b1c1c", "#371616", "#430e0e", "#510606", "#212121", "#1e1e1e", "#1b1b1b", "#171717", "#141414", "#212121", "#1e1e1e", "#1b1b1b", "#171717", "#141414"],
	behavior: behaviors.STURDYPOWDER,
	category: "powders",
	tempHigh: 640,
	stateHigh: "molten_plutonium",
	state: "solid",
	tick: function(pixel){
        if(Math.random() < 0.0007){
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y)){
                createPixel("helium", x, y)
                pixelMap[x][y].temp = pixel.temp + 200
                break;
            }
        }
        if(Math.random() < 0.5){
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (isEmpty(x, y)){
                createPixel("neutron", x, y)
                pixelMap[x][y].temp = pixel.temp + 200
                break;
            }
        }
    }
        changePixel(pixel, "uranium", false);
        pixelMap[x][y].temp += 200
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x, y, true)){
                    pixelMap[x][y].temp += 175
                }
            }
       }
       behaviors.RADSOLID
    },
	reactions: {
        "neutron": { elem1:"pn_explosion", tempMin:400, chance:0.1 },
    },
	density: 19186,
}
elements.molten_plutonium = {
	color: ["#6b5133", "#743f26", "#7c2727"],
	behavior: behaviors.RADMOLTEN,
	category: "states",
	state: "liquid",
	tempLow: 620,
    hidden: true,
	stateLow: "plutonium",
	tick: function(pixel){
        if(Math.random() < 0.0007){
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x, y)){
                    createPixel("helium", x, y)
                    pixelMap[x][y].temp = pixel.temp + 200
                    break;
                }
            }
        if(Math.random() < 0.5){
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x, y)){
                    createPixel("neutron", x, y)
                    pixelMap[x][y].temp = pixel.temp + 200
                    break;
                }
            }
        }
            changePixel(pixel, "uranium", false);
            pixelMap[x][y].temp += 200
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x, y, true)){
                    pixelMap[x][y].temp += 175
                }
            }
        }
    },
	reactions: {
        "neutron": { elem1:"pn_explosion", tempMin:400, chance:0.1 },
    },
	density: 16629,
},
elements.neutron.reactions.plutonium = { temp2:200 };
elements.neutron.reactions.molten_plutonium = { temp2:200 }
elements.pn_explosion = {
    color: ["#ffb48f","#ffd991","#ffad91"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:80>plasma,plasma,plasma,plasma,radiation,rad_steam,neutron|XX",
        "XX|XX|XX",
    ],
    temp: 100000000,
    category: "energy",
    state: "gas",
    density: 1000,
    excludeRandom: true,
    hidden: true,
    alias: "plutonium nuclear explosion",
    noMix: true
},
saveElementMigrations.smasher = function(pixel) {
    pixel.element = "grinder";
}
elements.invisiblesupport = {
	color: "#000000",
	behavior: behaviors.WALL,
	tick: function(pixel){
		var x = pixel.x
		var y = pixel.y
		if (currentElement == "invisiblesupport"){
			pixel.color = "rgb(15, 15, 15)";
            pixel.alpha = 1;
		} else {
			pixel.color = "rgba(0, 0, 0)";
            pixel.alpha = 0;
		}
		if ((isEmpty(x-1, y) || isEmpty(x+1,y)) && isEmpty(x,y+1)){
			deletePixel(pixel.x, pixel.y);
		}
	},
	category: "powders",
},
elements.invisiblewall = {
	color: "#000000",
	behavior: behaviors.WALL,
	tick: function(pixel){
		if (currentElement == "invisiblewall"){
			pixel.color = "rgb(15, 15, 15)";
            pixel.alpha = 1;
		} else {
			pixel.color = "rgba(0, 0, 0)";
            pixel.alpha = 0;
		}
	},
	category: "solids",
    movable: false,
    noMix: true,
    hardness: 1,
},
elements.bismuth = {
    color: ["#818181","#989898","#b0b0b0","#c9c9c9"],
    behavior: behaviors.WALL,
    category: "solids",
    tempHigh: 271.4,
    stateHigh: "molten_bismuth",
    density: 9780,
    state: "solid"
}
function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
elements.molten_bismuth = {
    color: ["#ee8d63", "#ef7e5e", "#f06e5c", "#f05c5c"],
    behavior: behaviors.MOLTEN,
    hidden: true,
    category: "states",
    state: "liquid",
    temp: 280,
    tick: function(pixel){
        if (pixel.temp <= 261.4){
            pixel.tHue = ((pixelTicks*1.5)%360)/360;
            let bismuthsum = 0;
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x, y, true)){
                  if (pixelMap[x][y].element == "bismuth"){
                    bismuthsum += 1;
                    }
                }
            }
            if (pixel.temp <= 210){
                changePixel(pixel, "bismuth");
                return;
            }
            if (Math.random() < [0.003, 0.8,0.3,0.2,0.003,0.002,0.002,0.4,0.4][bismuthsum]){
                changePixel(pixel, "bismuth")
                var rgbResult = HSVtoRGB(pixel.tHue, 0.5-(Math.random()/3), 0.9-((8-bismuthsum)/20));
                const hexR = rgbResult.r.toString(16).padStart(2, '0');
                const hexG = rgbResult.g.toString(16).padStart(2, '0');
                const hexB = rgbResult.b.toString(16).padStart(2, '0');
                const hexCode = `#${hexR}${hexG}${hexB}`;
                pixel.color = pixelColorPick(pixel, hexCode)
            }
        }
    },
    density: 10049,
}
function weightedAverage(num1, num2, weight){
    return ((weight * num1)+((1-weight)*num2))
}
function getPixelColor(color){
    let rgb2;
    if(color.startsWith("#")) {
        rgb2 = color.match(/[0-9A-F]{2}/ig).map(x => parseInt(x,16));
    } else if(color.startsWith("hsl")) {
        var hsl = color.match(/[\d.]+/g);
        hsl[0] = (hsl[0] % 360) / 360; if(hsl[0] < 0) { hsl[0]++ };
        hsl[1] = Math.max(Math.min(hsl[1] / 100,1),0);
        hsl[2] = Math.max(Math.min(hsl[2] / 100,1),0);
        rgb2 = HSLtoRGB(hsl)
    } else {
        rgb2 = color.match(/[\d.]+/g);
    }
    return rgb2
}
elements.dyer = {
    customColor: true,
    color: ["#ff0000","#ff8800","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"],
    behavior: behaviors.wall,
    movable: false,
    state: "solid",
    category: "machines",
    tick: function(pixel){
        for (var i = 0; i < squareCoordsShuffle.length; i++) {
            var coord = squareCoordsShuffle[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true)) {
                if (!(pixelMap[x][y].element == "dyer")){
                    var newPixel = pixelMap[x][y];
                    var rgb1 = pixel.color.match(/\d+/g);
                    var rgb2 = getPixelColor(newPixel.color)
                    // average the colors
                    var rgb = [
                        weightedAverage(parseInt(rgb1[0]), parseInt(rgb2[0]), 0.2),
                        weightedAverage(parseInt(rgb1[1]), parseInt(rgb2[1]), 0.2),
                        weightedAverage(parseInt(rgb1[2]), parseInt(rgb2[2]), 0.2),
                    ];
                    // convert rgb to hex
                    var hex = RGBToHex(rgb);
                    newPixel.color = pixelColorPick(newPixel, hex);
                }
            }
        }
    }
}
var outlinerVar = 0
elements.inner_outliner = {
    color: elements.filler.color,
    category: elements.filler.category,
    excludeRandom: true,
    onSelect: async function() {
        var answerot = await _nousersthingsprompt("Please input the desired element of this outliner. It will not work if you do multiple outliner types while paused.",(outlinerVar||undefined));
        if (!answerot) { return }
		outlinerVar = mostSimilarElement(answerot);
    },
    tick: function(pixel){
        var neighbors = 0;
        if(!pixel.changeElem){
            pixel.changeElem = outlinerVar;
            if (pixel.nDelete == undefined){
                pixel.nDelete = false
            }
        }
        if (pixel.nDelete){
            deletePixel(pixel.x, pixel.y)
        }
		for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y, true)) {
				neighbors = neighbors + 1;
			}
        }
        if (neighbors >= 8){
            pixel.nDelete = true
        } else {
            changePixel(pixel, pixel.changeElem)
        }
    }
}
textures.transparency = [
    "wwwggg",
    "wwwggg",
    "wwwggg",
    "gggwww",
    "gggwww",
    "gggwww"
]
textures.steel = [
    "hHhhd",
    "Hnnnd",
    "hnnnd",
    "hnnnD",
    "dddDD"
]
textures.sponge = [
    "hddddnnddd",
    "Ddhddhnhdd",
    "ddDdnNnNdd",
    "dddhnnnnnh",
    "dhdNnhnnnN",
    "nNnhnNnddd",
    "dhnNnnddhd",
    "dDnnnhddDd",
    "dhnnnNdhdd",
    "ddddnddDdd"
]
textures.copper = [
    "uuuuum",
    "unhhnd",
    "uhhnnD",
    "uhnnHd",
    "unnHnD",
    "mdDdDD"
]
textures.gold = [
    "hnnndbHHHhhnbHHHh",
    "nnndbhnnnnndDbnnn",
    "nnddbnnnnnddDbnnn",
    "dddbnnnddddDDDbnd",
    "DDDbDDDDDDDDDDbDD",
    "BBBBBBBBBBBBBBBBB"
]
textures.diamond = [
    "llcccLbLl",
    "lcccccbbC",
    "CScccBbCC",
    "SSScBBBLC",
    "SSSSLBbLS",
    "SSSCLbbbL",
    "BSCCCnbBL",
    "BBBCnnBBB",
    "lBBcLnLbL"
]
elements.transparency = {
    color: ["#d4d4d4", "#ffffff"],
    colorPattern: textures.transparency,
    colorKey: {
        "g": "#D4D4D4",
        "w": "#ffffff"
    },
    behavior: behaviors.WALL,
    category: "special",
    state: "solid",
    grain: 0
}
elements.textured_steel = {
    color: ["#708196", "#8895ad", "#596B77", "#525D6B", "#404954"],
    colorPattern: textures.steel,
    colorKey: {
        "h": "#708196",
        "H": "#8895ad",
        "n": "#596B77",
        "d": "#525D6B",
        "D": "#404954"
    },
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tick: function(pixel){
        if (pixelTicks - pixel.start == 1){
        pixel.element = "steel"
        }
    }
}
elements.textured_sponge = {
    color: ["#ccaa00", "#c1a100", "#967d00", "#b89a00", "#ae9100"],
    colorPattern: textures.sponge,
    colorKey: {
        "n": "#ccaa00",
        "N": "#c1a100",
        "h": "#967d00",
        "d": "#b89a00",
        "D": "#ae9100"
    },
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tick: function(pixel){
        if (pixelTicks - pixel.start == 1){
        pixel.element = "sponge"
        }
    }
}
elements.textured_copper = {
    color: ["#772F22", "#AB533F", "#9E3F2D", "#9E3F2D", "#4C1C11"],
    colorPattern: textures.copper,
    colorKey: {
        "u": "#772F22",
        "H": "#AB533F",
        "h": "#C0725A",
        "n": "#9E3F2D",
        "D": "#4C1C11",
        "d": "#622516",
        "m": "#712C1E"
    },
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tick: function(pixel){
        if (pixelTicks - pixel.start == 1){
        pixel.element = "copper"
        }
    }
}
elements.textured_gold = {
    color: ["#E4B038", "#FFCA59", "#BF8A18", "#7F5A10", "#674611"],
    colorPattern: textures.gold,
    colorKey: {
        "h": "#FFCA59",
        "H": "#FFFFCC",
        "n": "#E4B038",
        "B": "#513412",
        "b": "#674611",
        "d": "#BF8A18",
        "D": "#7F5A10"
    },
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tick: function(pixel){
        if (pixelTicks - pixel.start == 1){
        pixel.element = "gold"
        }
    }
}
elements.solid_diamond = {
    color: elements.diamond.color,
    category: "solids",
    colorPattern: textures.diamond,
    colorKey: {
        "c":"#36BDF3",
        "C": "#7DD1F2",
        "B": "#4B94ED",
        "b": "#97BEED",
        "L":"#C2D5ED",
        "n": "#7BAEED",
        "l": "#A2DBF2",
        "S": "#BDF8FF"
    },
    reactions: elements.diamond.reactions,
    state: "solid",
    density: elements.diamond.density,
    hardness: elements.diamond.hardness,
    behavior: behaviors.WALL,
}
elements.textured_rose_gold = {
    color: ["#FF5991", "#E4386F", "#7F1037", "#FFCCCD", "#671133"],
    colorPattern: textures.gold,
    colorKey: {
        "h": "#FF5991",
        "H": "#FFCCCD",
        "n": "#E4386F",
        "B": "#511230",
        "b": "#671133",
        "d": "#BF1850",
        "D": "#7F1037"
    },
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    tick: function(pixel){
        if (pixelTicks - pixel.start == 1){
        pixel.element = "rose_gold"
        }
    }
}
selvoid = 0;
/*
elements.selective_void = {
    category: "special",
    color: elements.void.color,
    excludeRandom: true,
    state: "solid",
    movable: "false",
    onSelect: async function() {
        var selvoidans = await _nousersthingsprompt("Please input the desired element of this void.",(selvoid||undefined));
        if (!selvoidans) { return }
		selvoid = mostSimilarElement(selvoidans);
        currentElementProp = {changeElem:selvoid}
    },
    tick: function(pixel){
        if(typeof pixel.changeElem == "undefined"){{changePixel(pixel, "flash"); logMessage("A void without valid properties was attempted to be placed."); return;}}
		for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y, true)) {
				var otherPixel = pixelMap[x][y]
                if (otherPixel.element == pixel.changeElem)
                deletePixel(x, y)
			}
        }
    }
}*/
saveElementMigrations.selective_void = function(pixel){
    pixel.element = "void";
    pixel.filter = pixel.changeElem;
    delete pixel.changeElem;
}
let circleElem = "wood"
elements.scuffed_circle_brush = {
    category: "special",
    color: elements.drag.color,
    excludeRandom: true,
    state: "solid",
    movable: false,
    onSelect: async function(){
		var answerE = await _nousersthingsprompt("Element of the brush.",(circleElem||undefined));
        if (!answerE) { return }
		circleElem = mostSimilarElement(answerE);
    },
    tick: function(pixel){
        let radius = mouseSize/2
        //pyhtagoreas time
        if (Math.sqrt(Math.pow(pixel.x-mousePos.x,2)+Math.pow(pixel.y-mousePos.y,2)) < radius) {
            deletePixel(pixel.x, pixel.y)
            createPixel(circleElem, pixel.x, pixel.y)
        } else {
            deletePixel(pixel.x, pixel.y)
        } 
    }
}
elements.scuffed_triangle_brush = {
    category: "special",
    color: elements.drag.color,
    excludeRandom: true,
    state: "solid",
    movable: false,
    onSelect: async function(){
		var answerE = await _nousersthingsprompt("Element of the brush.",(circleElem||undefined));
        if (!answerE) { return }
		circleElem = mostSimilarElement(answerE);
    },
    tick: function(pixel){
        let radius = mouseSize/2
        if ((pixel.y - mousePos.y + mouseSize > 2 * (pixel.x - mousePos.x) + 0.5 * mouseSize) && (pixel.y - mousePos.y + mouseSize > -2 * (pixel.x - mousePos.x) + 0.5 * mouseSize)) {
            deletePixel(pixel.x, pixel.y)
            createPixel(circleElem, pixel.x, pixel.y)
        } else {
            deletePixel(pixel.x, pixel.y)
        }
    }
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
elements.spacedust_cola = {
    color: ["#090033", "#0a0027", "#0a001b", "#0b000f"],
    behavior: elements.soda.behavior,
    tempHigh: 104,
    stateHigh: ["steam", "carbon_dioxide", "spacedust", "spacedust"],
    category: "liquids",
    state: "liquid",
    reactions: {head: {elem1: null, chance: 0.02}},
    density: elements.tungsten.density,
    isFood: true,
}
elements.spacedust = {
    color: ["#090033", "#0a0027", "#0a001b", "#0b000f", "#090033", "#0a0027", "#0a001b", "#0b000f", "#090033", "#0a0027", "#0a001b", "#0b000f", "#090033", "#0a0027", "#0a001b", "#0b000f", "#090033", "#0a0027", "#0a001b", "#0b000f", "#090033", "#0a0027", "#0a001b", "#0b000f", "#ffffff"],
    behavior: behaviors.POWDER,
    category: "special",
    state: "solid",
    reactions: {
        "acid": {elem1: null, elem2: ["hydrogen", "helium", "hydrogen", "helium", "hydrogen", "helium", "hydrogen", "hydrogen", "hydrogen", "hydrogen", "metal_scrap"], chance: 0.02},
        "seltzer": {elem1: null, elem2: "spacedust_cola"},
        "soda": {elem1: null, elem2: "spacedust_cola"},
    },
    density: elements.tungsten.density,
}
elements.acid.ignore.push("spacedust")
elements.acid.ignore.push("spacedust_cola")
elements.sun.breakInto = "spacedust"
var gridElem = 0
elements.grid_brush = {
    color: elements.lattice.color,
    behavior: behaviors.WALL,
    category: "special",
    movable: false,
    onSelect: async function() {
        var gridans = await _nousersthingsprompt("Please input the desired element of this grid brush",(gridElem||undefined));
        if (!gridans) { return }
		gridElem = mostSimilarElement(gridans);
    },
    tick: function(pixel){
        if (pixel.x%2 || pixel.y%2){
            deletePixel(pixel.x, pixel.y)
            createPixel(gridElem, pixel.x, pixel.y)
        } else {
            deletePixel(pixel.x, pixel.y)
        }
    }
}
elements.healing_serum = {
    color: ["#79d2c5", "#77d8c0", "#78ddb9", "#7de1b0", "#85e6a6", "#91e99a", "#9fec8e"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    properties: {
        wait: 15,
        waitReduce: false,
    },
    tick: function(pixel){
        if (pixel.waitReduce){pixel.wait -= 1}
        if (!pixel.decidedPixel){
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x, y, true)){
                    let otherPixel = pixelMap[x][y]
                    if (otherPixel.element != "healing_serum" && !(elements.healing_serum.ignore.includes(otherPixel.element))){
                        pixel.decidedPixel = otherPixel
                        pixel.waitReduce = true
                        break;
                    }
                }
            }
        }
        if (pixel.wait <= 0){
            const { x, y, ...remainingProperties } = pixel.decidedPixel;
            Object.assign(pixel, remainingProperties);
            delete pixel.decidedPixel
            return;
        }
    },
    renderer: function(pixel, ctx){
        // interpolate pixel color and decidedpixel's color (if it has one!)
        if (pixel.decidedPixel){
            var color1 = pixel.color.match(/\d+/g);
            var color2 = getPixelColor(pixel.decidedPixel.color)
            var ratio = pixel.wait/15
            drawSquare(ctx, `rgb(${color1[0]*ratio+color2[0]*(1-ratio)},${color1[1]*ratio+color2[1]*(1-ratio)},${color1[2]*ratio+color2[2]*(1-ratio)})`, pixel.x, pixel.y)
        }
        else{
            drawSquare(ctx, pixel.color, pixel.x, pixel.y)
        }
    },
    ignore: ["wall", "cloner", "e_cloner", "border"]
}
let raySpecialFunctions = {
    "shock": (pixel, emitter) => {
        if (pixel.element == "ray_emitter" || pixel.element == "specific_ray_emitter"){return;}
        chargePixel(pixel);
        if (elements[pixel.element].iConduct){
            iUpdateAll(pixel)
        }
    },
    "heat": (pixel, emitter) => {pixel.temp += 10; pixelTempCheck(pixel)},
    "cool": (pixel, emitter) => {pixel.temp -= 10; pixelTempCheck(pixel)},
    "smash": (pixel, emitter) => {if (isBreakable(pixel)){breakPixel(pixel)}},
    "paint": (pixel, emitter) => {pixel.color = emitter.color},
    "incinerate": (pixel, emitter) => {pixel.temp += 100000; pixelTempCheck(pixel)},
    "room_temp": (pixel, emitter) => {pixel.temp = currentSaveData.airtemp; pixelTempCheck(pixel)},
    "erase": (pixel, emitter) => (deletePixel(pixel.x, pixel.y))
}
elements.ray_emitter = {
    color: "#ff9c07",
    behavior: behaviors.WALL,
    category: "machines",
    movable: false,
    /*
    onSelect: async function(pixel){
        var rayans = await _nousersthingsprompt("Please input the desired element of this ray emitter",(rayElement||undefined));
        if (!rayans) { return }
		rayElement = mostSimilarElement(rayans);
        var rayans2 = await _nousersthingsprompt("Should the ray be stopped by walls? Write true or false.",(rayStoppedByWalls||false));
        if (rayans2 == "false"){rayStoppedByWalls = false} else {rayStoppedByWalls = true}
        currentElementProp = {rayElement:rayElement,rayStoppedByWalls:rayStoppedByWalls}
    },
    tick: function(pixel){
        if (typeof pixel.rayElement == "undefined" || typeof pixel.rayStoppedByWalls == "undefined"){{changePixel(pixel, "flash"); logMessage("An emitter without valid properties was attempted to be placed."); return;}}
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y, true)){
                if (pixelMap[x][y].charge && (pixelMap[x][y].element == "wire" || pixelMap[x][y].element == "insulated_wire")){
                    if ((Math.abs(coord[0]) + Math.abs(coord[1]) == 2) && pixelMap[x][y].element == "insulated_wire"){return}
                    var dir = [0-squareCoords[i][0], 0-squareCoords[i][1]]
                    var startx = pixel.x+dir[0]
                    var starty = pixel.y+dir[1]
                    var magnitude = 0
                    if (width > height){magnitude = width} else {magnitude = height}
                    var endx = startx+(magnitude*dir[0])
                    var endy = starty+(magnitude*dir[1])
                 //   console.log("Direction seems to be " + dir)
                    var jcoords = lineCoords(startx, starty, endx, endy, 1)
                 //   console.log(startx + " is the starting x, " + starty + " is the starting y, " + endx + " is the ending x, " + endy + " is the ending y. Result is " + jcoords)
                    for (var j = 0; j < jcoords.length; j++) {
                        var lcoord = jcoords[j];
                        var lx = lcoord[0];
                        var ly = lcoord[1];
                      //  console.log(lcoord)
                        if (isEmpty(lx,ly)){
                            createPixel(pixel.rayElement, lx, ly)
                            pixelMap[lx][ly].temp = pixel.temp
                            if (pixel.rayElement == "ray"){
                                pixelMap[lx][ly].rColor = pixel.color
                                pixelMap[lx][ly].color = pixel.color
                            }
                            if (["pointer", "flash", "explosion", "fire", "laser"].includes(pixel.rayElement)){
                                pixelMap[lx][ly].color = pixel.color
                            }
                        } else if (!isEmpty(lx, ly, true)){
                            if (pixelMap[lx][ly].element != pixel.rayElement && pixel.rayStoppedByWalls){
                                break;
                            } else if (pixelMap[lx][ly].element == "ray" && pixel.rayElement == "ray"){
                                pixelMap[lx][ly].rColor = pixel.color
                                pixelMap[lx][ly].life = 10
                                pixelMap[lx][ly].color = pixel.color
                            }
                        }
                    }
                }
            }
        }
    },
    */
    onSelect: async function(){
        let ans1 = await _nousersthingsprompt("What should this ray emitter emit?", "ray")
        ans1 = mostSimilarElement(ans1)
        let ans2 = await _nousersthingslistprompt("What type of wall behavior should it have?", ["Stop at walls", "Overwrite walls", "Continue past walls"])
        const translateans = {
            "Stop at walls": 1,
            "Overwrite walls": 2,
            "Continue past walls": 3
        }
        ans2 = translateans[ans2]
        currentElementProp = {emit:ans1,mode:ans2}
    },
    properties: {
        lastUpdate: 0
    },
    tick: function(pixel){
        if (typeof pixel.rayElement != "undefined"){pixel.emit = pixel.rayElement; delete pixel.rayElement;}
        if (typeof pixel.rayStoppedByWalls != "undefined"){pixel.mode = pixel.rayStoppedByWalls ? 1 : 3; delete pixel.rayStoppedByWalls}
        if (typeof pixel.emit == "undefined" || typeof pixel.mode == "undefined"){{changePixel(pixel, "flash"); logMessage("An emitter without valid properties was attempted to be placed."); return;}}
        let special = Object.keys(raySpecialFunctions).includes(pixel.emit)
        for (let i of squareCoords){
            let x = pixel.x + i[0]
            let y = pixel.y + i[1]
            if (!isEmpty(x, y, true)){
                let otherPixel = pixelMap[x][y]
                if (otherPixel.charge){
                    if (otherPixel.element == "insulated_wire"){
                        if (Math.abs(i[0]+i[1]) != 1){continue;} // funny way to check for direct adjacency
                    }
                    let jcoords = lineCoords(pixel.x-i[0],pixel.y-i[1],pixel.x-(Math.max(width, height)*i[0]),pixel.y-(Math.max(width, height)*i[1]),1)
                    for (let j of jcoords){
                        if (!isEmpty(j[0], j[1], true)){
                            let hitPixel = pixelMap[j[0]][j[1]]
                            //console.log(hitPixel)
                            if (special){
                                raySpecialFunctions[pixel.emit](hitPixel,pixel)
                            }
                            if (pixel.mode == 1){
                                if (pixel.emit == "ray"){
                                    if (hitPixel.element == "ray"){
                                        hitPixel.rColor = pixel.color
                                        hitPixel.life = 10
                                        hitPixel.color = pixel.color
                                    }
                                    else {break;}
                                } else {break;}
                            }
                            if (pixel.mode == 2 && !special){
                                deletePixel(hitPixel.x, hitPixel.y)
                                createPixel(pixel.emit, j[0], j[1])
                                pixelMap[j[0]][[j[1]]].temp = pixel.temp
                                if (["pointer", "flash", "explosion", "fire", "laser"].includes(pixel.emit)){pixelMap[j[0]][[j[1]]].color = pixel.color}
                                if (pixel.emit == "ray"){pixelMap[j[0]][[j[1]]].color = pixel.color;pixelMap[j[0]][[j[1]]].rColor = pixel.color}
                            }
                        } else {
                            if (special){continue}
                            if (isEmpty(j[0], j[1])){
                                createPixel(pixel.emit, j[0], j[1])
                                pixelMap[j[0]][[j[1]]].temp = pixel.temp
                                if (["pointer", "flash", "explosion", "fire", "laser"].includes(pixel.emit)){pixelMap[j[0]][[j[1]]].color = pixel.color}
                                if (pixel.emit == "ray"){pixelMap[j[0]][[j[1]]].color = pixel.color;pixelMap[j[0]][[j[1]]].rColor = pixel.color}
                            } else {break;}
                        }
                    }
                }
            }
        }
    },
    insulate: true,
    updateOrder: 681392,
    iConduct: true,
    iUpdate: function(pixel, spreader){
        let special = Object.keys(raySpecialFunctions).includes(pixel.emit)
        let i = [spreader.x-pixel.x, spreader.y-pixel.y]
        let jcoords = lineCoords(pixel.x-i[0],pixel.y-i[1],pixel.x-(Math.max(width, height)*i[0]),pixel.y-(Math.max(width, height)*i[1]),1)
        for (let j of jcoords){
            if (!isEmpty(j[0], j[1], true)){
                let hitPixel = pixelMap[j[0]][j[1]]
                if (special){
                    raySpecialFunctions[pixel.emit](hitPixel,pixel)
                }
                if (pixel.mode ==  1){
                    if (pixel.emit == "ray"){
                        if (hitPixel.element == "ray"){
                            hitPixel.rColor = pixel.color
                            hitPixel.life = 10
                            hitPixel.color = pixel.color
                        }
                    } else {return []}
                }
                if (pixel.mode == 2 && !special){
                    deletePixel(hitPixel.x, hitPixel.y)
                    createPixel(pixel.emit, j[0], j[1])
                    pixelMap[j[0]][[j[1]]].temp = pixel.temp
                    if (["pointer", "flash", "explosion", "fire", "laser"].includes(pixel.emit)){pixelMap[j[0]][[j[1]]].color = pixel.color}
                    if (pixel.emit == "ray"){pixelMap[j[0]][[j[1]]].color = pixel.color;pixelMap[j[0]][[j[1]]].rColor = pixel.color}
                }
            } else {
                if (special){continue}
                if (isEmpty(j[0], j[1])){
                    createPixel(pixel.emit, j[0], j[1])
                    pixelMap[j[0]][[j[1]]].temp = pixel.temp
                    if (["pointer", "flash", "explosion", "fire", "laser"].includes(pixel.emit)){pixelMap[j[0]][[j[1]]].color = pixel.color}
                    if (pixel.emit == "ray"){pixelMap[j[0]][[j[1]]].color = pixel.color;pixelMap[j[0]][[j[1]]].rColor = pixel.color}
                } else {return [];}
            }
        }
        return []
    }
}
elements.indestructible_battery = {
    color: elements.battery.color,
    behavior: elements.battery.behavior,
    category: elements.battery.category,
    hardness: 1,
    movable: false,
    updateOrder: -975791
}
elements.ray = {
    color: "#ffffff",
    behavior: behaviors.WALL,
    movable: true,
    category: "special",
    updateOrder: elements.ray_emitter.updateOrder + 1,
    hoverStat: function(pixel){
        return (pixel.life || "unset").toString()
    },
    properties: {
        life: 10,
        maxLife: 10,
    },
    tick: function(pixel){
        if (pixel.rColor){
            pixel.rgb = pixel.rColor.match(/\d+/g);
        } else {
            pixel.rgb = [255,255,255]
        }
        pixel.life -= 1
        if (pixel.life < pixel.maxLife){
            pixel.color = "rgb("+pixel.rgb[0]+","+pixel.rgb[1]+","+pixel.rgb[2]+")"
            pixel.alpha = (pixel.life/pixel.maxLife)
        } else {pixel.color = "rgb("+pixel.rgb[0]+","+pixel.rgb[1]+","+pixel.rgb[2]+")"}
        // lightmap.js integration
        if (enabledMods.includes("mods/lightmap.js")){
            let x = Math.floor(pixel.x / lightmapScale);
            let y = Math.floor(pixel.y / lightmapScale);
            lightmap[y][x] = { color: [parseInt(pixel.rgb[0])*((pixel.life/pixel.maxLife)), parseInt(pixel.rgb[1])*((pixel.life/pixel.maxLife)), parseInt(pixel.rgb[2])*((pixel.life/pixel.maxLife))]};
        }
        if (pixel.life <= 0){
            deletePixel(pixel.x, pixel.y)
        }
    },
    canPlace: true,
    tool: function(pixel){
        if (pixel.element == "ray"){
            pixel.life = 10
            pixel.color = pixel.rColor
        }
    }
}
elements.specific_ray_emitter = {
    color: "#e73e63",
    behavior: behaviors.WALL,
    category: "machines",
    movable: false,
    onSelect: async function(){
        let ans1 = await _nousersthingsprompt("What should this ray emitter emit?", "ray")
        ans1 = mostSimilarElement(ans1)
        let ans2 = await _nousersthingslistprompt("What type of wall behavior should it have?", ["Stop at walls", "Overwrite walls", "Count walls", "Skip over walls"])
        const translateans = {
            "Stop at walls": 1,
            "Overwrite walls": 2,
            "Count walls": 3,
            "Skip over walls": 4
        }
        ans2 = translateans[ans2]
        let ans3 = await _nousersthingsprompt("How far should the start of the beam be from the emitter?", 1)
        ans3 = parseFloat(ans3)
        let ans4 = await _nousersthingsprompt("What should the length of the beam be, in pixels?")
        currentElementProp = {emit:ans1,mode:ans2}
        ans4 = parseInt(ans4)
        let ans5 = await _nousersthingslistprompt("Angle?", ["Default behavior", "Custom number"])
        if (ans5 == "Custom number"){
            ans5 = parseFloat(await _nousersthingsprompt("What should the angle be?", 0))*(Math.PI/180)
        } else ans5 = null
        let ans6 = await _nousersthingslistprompt("Would you like the beam to terminate upon hitting a specific element?", ["Yes", "No"])
        if (ans6 == "Yes"){
            ans6 = mostSimilarElement(await _nousersthingsprompt("What element should it stop at?", "wall"))
        } else {ans6 = null}
        let ans7
        if (ans1 == "ray"){
            ans7 = parseInt(await _nousersthingsprompt("How long should the ray stay on screen, in ticks?", 10))
        }
        currentElementProp = {
            emit: ans1,
            mode: ans2,
            rayStart: ans3,
            length: ans4,
            angle: ans5,
            terminate: ans6,
            rayLife: ans7
        }
    },
    properties: {
        lastUpdate: 0
    },
    iConduct: 1,
    tick: function(pixel){
        if (typeof pixel.rayElement != "undefined"){pixel.emit = pixel.rayElement; delete pixel.rayElement;}
        if (typeof pixel.rayStoppedByWalls != "undefined"){pixel.mode = pixel.rayStoppedByWalls ? 1 : 3; delete pixel.rayStoppedByWalls}
        if (typeof pixel.specificRayStart != "undefined"){pixel.rayStart = pixel.specificRayStart; delete pixel.specificRayStart}
        if (typeof pixel.specificRayEnd != "undefined"){pixel.length = pixel.specificRayEnd; delete pixel.specificRayEnd}
        if (typeof pixel.specificRayAngle != "undefined"){
            if (pixel.specificRayAngle == "nah"){pixel.angle = null; delete pixel.specificRayAngle}
            else {pixel.angle = pixel.specificRayAngle*(Math.PI/180); delete pixel.specificRayAngle}
        }
        if (typeof pixel.stopAtElement != "undefined"){pixel.terminate = pixel.stopAtElement; delete pixel.stopAtElement}
        if (typeof pixel.rainbowMode != "undefined"){delete pixel.rainbowMode}
        if (typeof pixel.emit == "undefined" || typeof pixel.mode == "undefined"){{changePixel(pixel, "flash"); logMessage("An emitter without valid properties was attempted to be placed."); return;}}
        let special = Object.keys(raySpecialFunctions).includes(pixel.emit)
        for (let i of squareCoords){
            let x = pixel.x + i[0]
            let y = pixel.y + i[1]
            if (!isEmpty(x, y, true)){
                let otherPixel = pixelMap[x][y]
                if (otherPixel.charge){
                    if (otherPixel.element == "insulated_wire"){
                        if (Math.abs(i[0]+i[1]) != 1){continue;} // funny way to check for direct adjacency
                    }
                    if (pixel.angle !== null){i = [Math.cos(pixel.angle+Math.PI), -Math.sin(pixel.angle+Math.PI)]}
                    let jcoords = lineCoords(
                        Math.round(pixel.x-i[0]*pixel.rayStart),
                        Math.round(pixel.y-i[1]*pixel.rayStart),
                        Math.round((pixel.x-i[0]*pixel.rayStart)-(Math.max(width, height)*i[0])),
                        Math.round((pixel.y-i[1]*pixel.rayStart)-(Math.max(width, height)*i[1])),
                    1)
                    console.log(jcoords.length)
                    let quota = 0
                    for (let j of jcoords){
                        if (quota >= pixel.length){break}
                        if (!isEmpty(j[0], j[1], true)){
                            let hitPixel = pixelMap[j[0]][j[1]]
                            if (pixel.terminate !== null){if (elements[hitPixel.element].id == elements[pixel.terminate].id){break;}}
                            //console.log(hitPixel)
                            if (special){
                                raySpecialFunctions[pixel.emit](hitPixel,pixel)
                            }
                            if (pixel.mode == 1){
                                if (pixel.emit == "ray"){
                                    if (hitPixel.element == "ray"){
                                        hitPixel.rColor = pixel.color
                                        hitPixel.life = 10
                                        hitPixel.color = pixel.color
                                        quota++
                                    }
                                    else {break;}
                                } else {break;}
                            }
                            if (pixel.mode == 2 && !special){
                                deletePixel(hitPixel.x, hitPixel.y)
                                createPixel(pixel.emit, j[0], j[1])
                                pixelMap[j[0]][[j[1]]].temp = pixel.temp
                                if (["pointer", "flash", "explosion", "fire", "laser"].includes(pixel.emit)){pixelMap[j[0]][[j[1]]].color = pixel.color}
                                if (pixel.emit == "ray"){pixelMap[j[0]][[j[1]]].color = pixel.color;pixelMap[j[0]][[j[1]]].rColor = pixel.color}
                                quota++
                            }
                            if (pixel.mode == 3){quota++}
                        } else {
                            if (special){continue}
                            if (isEmpty(j[0], j[1])){
                                createPixel(pixel.emit, j[0], j[1])
                                pixelMap[j[0]][[j[1]]].temp = pixel.temp
                                if (["pointer", "flash", "explosion", "fire", "laser"].includes(pixel.emit)){pixelMap[j[0]][[j[1]]].color = pixel.color}
                                if (pixel.emit == "ray"){pixelMap[j[0]][[j[1]]].color = pixel.color;pixelMap[j[0]][[j[1]]].rColor = pixel.color}
                                quota++
                            } else {break;}
                        }
                    }
                }
            }
        }
    },
    iUpdate: function(pixel, spreader){
        let special = Object.keys(raySpecialFunctions).includes(pixel.emit)
        let i = [spreader.x-pixel.x, spreader.y-pixel.y]
        if (pixel.angle !== null){i = [Math.cos(pixel.angle+Math.PI), -Math.sin(pixel.angle+Math.PI)]}
        let quota = 0
        let jcoords = lineCoords(
            Math.round(pixel.x-i[0]*pixel.rayStart),
            Math.round(pixel.y-i[1]*pixel.rayStart),
            Math.round((pixel.x-i[0]*pixel.rayStart)-(Math.max(width, height)*i[0])),
            Math.round((pixel.y-i[1]*pixel.rayStart)-(Math.max(width, height)*i[1])),
        1)
        for (let j of jcoords){
            if (quota >= pixel.length){break}
            if (!isEmpty(j[0], j[1], true)){
                let hitPixel = pixelMap[j[0]][j[1]]
                if (pixel.terminate !== null){if (elements[hitPixel.element].id == elements[pixel.terminate].id){break;}}
                //console.log(hitPixel)
                if (special){
                    raySpecialFunctions[pixel.emit](hitPixel,pixel)
                }
                if (pixel.mode == 1){
                    if (pixel.emit == "ray"){
                        if (hitPixel.element == "ray"){
                            hitPixel.rColor = pixel.color
                            hitPixel.life = 10
                            hitPixel.color = pixel.color
                            quota++
                        }
                        else {break;}
                    } else {break;}
                }
                if (pixel.mode == 2 && !special){
                    deletePixel(hitPixel.x, hitPixel.y)
                    createPixel(pixel.emit, j[0], j[1])
                    if (["pointer", "flash", "explosion", "fire", "laser"].includes(pixel.emit)){pixelMap[j[0]][[j[1]]].color = pixel.color}
                    if (pixel.emit == "ray"){pixelMap[j[0]][[j[1]]].color = pixel.color;pixelMap[j[0]][[j[1]]].rColor = pixel.color}
                    quota++
                }
                if (pixel.mode == 3){quota++}
            } else {
                if (special){continue}
                if (isEmpty(j[0], j[1])){
                    createPixel(pixel.emit, j[0], j[1])
                    if (["pointer", "flash", "explosion", "fire", "laser"].includes(pixel.emit)){pixelMap[j[0]][[j[1]]].color = pixel.color}
                    if (pixel.emit == "ray"){pixelMap[j[0]][[j[1]]].color = pixel.color;pixelMap[j[0]][[j[1]]].rColor = pixel.color}
                    quota++
                } else {break;}
            }
        }
        return []
    },
    /*
    onSelect: async function(pixel){
        var rayans = await _nousersthingsprompt("Please input the desired element of this ray emitter",(rayElement||undefined));
        if (!rayans) { return }
		rayElement = mostSimilarElement(rayans);
        if (rayElement != "ray"){rainbowMode = false}
        var rayans2 = await _nousersthingsprompt("Should the ray be stopped by walls? Write true or false.",(rayStoppedByWalls||false));
        if (rayans2 == "false"){rayStoppedByWalls = false} else {rayStoppedByWalls = true}
        var rayans3 = await _nousersthingsprompt("How much should the beginning of the ray be offset from the emitter?", (specificRayStart||0));
        if (!rayans3) { return }
        specificRayStart = rayans3
        var rayans4 = await _nousersthingsprompt("How much should the end of the ray be offset from the emitter?", (specificRayEnd||0));
        if (!rayans4) { return }
        specificRayEnd = rayans4
        var rayans5 = await _nousersthingsprompt("What angle should the ray be emitted at? Type anything that isnt a number to use default angle logic.", (specificRayAngle||0));
        if (!rayans5) { return }
        specificRayAngle = rayans5
        if (isNaN(parseFloat(specificRayAngle))){
            specificRayAngle = "nah"
        }
        var rayans6 = await _nousersthingsprompt("What element should the ray stop at?", (stopAtElement||"wall"));
        if (!rayans6) { return }
        stopAtElement = mostSimilarElement(rayans6)
        let rayans7
        if (rayans == "ray"){ rayans7 = await _nousersthingsprompt("How long should the ray stay on screen in ticks?", (rayLife||10));
        if (!rayans7) { return }
        if (isNaN(parseFloat(rayans7))){
            rayLife = 10
        } else {
            rayLife = rayans7
        }
        var rayans8 = await _nousersthingsprompt("Would you like rainbow mode to be enabled? Type yes or no.", (rainbowMode||"no"));
        if (rayans8 == "yes"){rainbowMode = true} else {rainbowMode = false}
        }
        currentElementProp = {
            rayElement : rayElement,
            rayStoppedByWalls : rayStoppedByWalls,
            specificRayStart : specificRayStart,
            specificRayEnd : specificRayEnd,
            specificRayAngle : specificRayAngle,
            stopAtElement : stopAtElement,
            life : rayLife,
            rainbowMode : rainbowMode
        }
    },
    hoverStat: function(pixel){
        return (pixel.rayElement || "unset").toUpperCase() + ", " + (pixel.rayStoppedByWalls || "unset").toString().toUpperCase() + ", " + (pixel.specificRayStart || "unset") + ", " + (pixel.specificRayEnd || "unset") + ", " + (pixel.specificRayAngle || "unset")
    },
    tick: function(pixel){
        if (typeof pixel.rayElement == "undefined"){{changePixel(pixel, "flash"); logMessage("An emitter without valid properties was attempted to be placed."); return;}}
        if (pixel.rainbowMode){
        pixel.specificRayAngle ++
        pixel.rgb = pixel.color.match(/\d+/g);
        pixel.rgb[0] = parseInt(pixel.rgb[0])
        pixel.rgb[1] = parseInt(pixel.rgb[1])
        pixel.rgb[2] = parseInt(pixel.rgb[2])
        //console.log(pixel.rgb)
        var hsvResult = RGBtoHSV(pixel.rgb[0], pixel.rgb[1], pixel.rgb[2]);
            pixel.tHue = hsvResult.h;
            var rgbResult = HSVtoRGB(pixel.tHue + (1/360), 1, 1);
            //console.log(rgbResult)
            const hexR = rgbResult.r.toString(16).padStart(2, '0');
            const hexG = rgbResult.g.toString(16).padStart(2, '0');
            const hexB = rgbResult.b.toString(16).padStart(2, '0');
            const hexCode = `#${hexR}${hexG}${hexB}`;
            //console.log(hexCode)
            pixel.color = pixelColorPick(pixel, hexCode)}
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y, true)){
                if (pixelMap[x][y].charge && (pixelMap[x][y].element == "wire" || pixelMap[x][y].element == "insulated_wire")){
                    if ((Math.abs(coord[0]) + Math.abs(coord[1]) == 2) && pixelMap[x][y].element == "insulated_wire"){return}
                    var dir = [0-squareCoords[i][0], 0-squareCoords[i][1]]
                    let startx, starty, endx, endy, magnitude
                    if (pixel.specificRayAngle == "nah"){
                        startx = pixel.x+(dir[0]*pixel.specificRayStart)
                        starty = pixel.y+(dir[1]*pixel.specificRayStart)
                        magnitude = pixel.specificRayEnd
                        endx = startx+(magnitude*dir[0])
                        endy = starty+(magnitude*dir[1])
                    } else {
                        let angleInRadians = pixel.specificRayAngle * Math.PI / 180;
                        //console.log("Angle in radians is " + angleInRadians)
                        dir = [(Math.cos(angleInRadians)), (Math.sin(angleInRadians))]
                        startx = pixel.x+Math.round((dir[0]*pixel.specificRayStart))
                        starty = pixel.y+Math.round((dir[1]*pixel.specificRayStart))
                        magnitude = pixel.specificRayEnd
                        endx = startx+Math.round((magnitude*dir[0]))
                        endy = starty+Math.round((magnitude*dir[1]))
                    }
                 //console.log("Direction seems to be " + dir)
                    var jcoords = lineCoords(startx, starty, endx, endy, 1)
                 //console.log(startx + " is the starting x, " + starty + " is the starting y, " + endx + " is the ending x, " + endy + " is the ending y. Result is " + jcoords)
                    for (var j = 0; j < jcoords.length; j++) {
                        var lcoord = jcoords[j];
                        var lx = lcoord[0];
                        var ly = lcoord[1];
                      //  console.log(lcoord)
                        if (isEmpty(lx,ly)){
                            createPixel(pixel.rayElement, lx, ly)
                            pixelMap[lx][ly].temp = pixel.temp
                            if (pixel.rayElement == "ray"){
                                pixelMap[lx][ly].rColor = pixel.color
                                pixelMap[lx][ly].color = pixel.color
                                pixelMap[lx][ly].life = pixel.life
                                pixelMap[lx][ly].maxLife = pixel.life
                            }
                            if (["pointer", "flash", "explosion", "fire", "laser"].includes(pixel.rayElement)){
                                pixelMap[lx][ly].color = pixel.color
                            }
                        } else if (!isEmpty(lx, ly, true)){
                            if ((pixelMap[lx][ly].element != pixel.rayElement && pixel.rayStoppedByWalls) || pixelMap[lx][ly].element == pixel.stopAtElement){
                                break;
                            } else if (pixelMap[lx][ly].element == "ray" && pixel.rayElement == "ray"){
                                pixelMap[lx][ly].rColor = pixel.color
                                pixelMap[lx][ly].life = pixel.life
                                pixelMap[lx][ly].maxLife = pixel.life
                                pixelMap[lx][ly].color = pixel.color
                            }
                        }
                    }
                }
            }
        }
    },
    */
    insulate: true,
    updateOrder: -314
}
elements.run_some_code = {
    color: "#68b2cf",
    category: "tools",
    canPlace: false,
    tool: function(){},
    onSelect: async function(){
        let code = await _nousersthingsprompt("Enter code to run")
        if (code){
            eval(code)
        }
    }
}
elements.insulated_wire = {
    color: "#5e2d2c",
    category: "machines",
    conduct: 1,
    tick: function(pixel){
        {
            if (pixel.charge) {
                // Check each adjacent pixel, if that pixel's charge is false, set it to the same charge
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var x = pixel.x+adjacentCoords[i][0];
                    var y = pixel.y+adjacentCoords[i][1];
                    if (!isEmpty(x,y,true)) {
                        var newPixel = pixelMap[x][y];
                        var con = newPixel.element;
                        if (con == "insulated_wire" || con == "wire_bridge") {
                        if (1 == 1) { // If random number is less than conductivity
                            if (!newPixel.charge && !newPixel.chargeCD) {
                                newPixel.charge = 1;
                            }
                        }
                    }
                }
                }
                pixel.charge -= 0.25;
                if (pixel.charge <= 0) {
                    delete pixel.charge;
                    // pixel.chargeCD = 4;
                    pixel.chargeCD = Math.round(4 + (4*(1-elements[pixel.element].conduct))) || 4;
                }
            }
            // Lower charge cooldown
            else if (pixel.chargeCD) {
                pixel.chargeCD -= 1;
                if (pixel.chargeCD <= 0) {
                    delete pixel.chargeCD;
                    if (elements[pixel.element].colorOn) {
                        pixel.color = pixelColorPick(pixel);
                    }
                }
            }
        }
        doHeat(pixel)
    },
    updateOrder:-975790,
}
elements.wire_bridge = {
    color: "#461716",
    category: "machines",
    conduct: 1,
    tick: function(pixel){
        {
            if (pixel.charge) {
                // Check each adjacent pixel, if that pixel's charge is false, set it to the same charge
                for (var i = 0; i < adjacentCoords.length; i++) {
                    var x = pixel.x+adjacentCoords[i][0];
                    var y = pixel.y+adjacentCoords[i][1];
                    if (!isEmpty(x,y,true)) {
                        var newPixel = pixelMap[x][y];
                        var con = newPixel.element;
                        if (con == "insulated_wire" || con == "wire" || con == "wire_bridge") {
                        if (1 == 1) { // If random number is less than conductivity
                            if (!newPixel.charge && !newPixel.chargeCD) {
                                newPixel.charge = 1;
                            }
                        }
                    }
                }
                }
                pixel.charge -= 0.25;
                if (pixel.charge <= 0) {
                    delete pixel.charge;
                    // pixel.chargeCD = 4;
                    pixel.chargeCD = Math.round(4 + (4*(1-elements[pixel.element].conduct))) || 4;
                }
            }
            // Lower charge cooldown
            else if (pixel.chargeCD) {
                pixel.chargeCD -= 1;
                if (pixel.chargeCD <= 0) {
                    delete pixel.chargeCD;
                    if (elements[pixel.element].colorOn) {
                        pixel.color = pixelColorPick(pixel);
                    }
                }
            }
        }
        doHeat(pixel)
    }
}
elements.insulated_wire.desc = "Insulated wire. Only conducts to other insulated wires. Pairs with ray emitters to not make diagonal rays."
elements.e_pipe.desc = "Electric pipe. Only passes elements while charged."
elements.destroyable_e_pipe.desc = elements.e_pipe.desc
elements.channel_pipe.desc = "Channel pipe. Only passes elements to pipes of the same channel."
elements.ray_emitter.desc = "Emits a ray of the specified element in the opposite direction it was shocked from."
elements.specific_ray_emitter.desc = "Emits a ray of the specified element in a specific direction and a specific length."
elements.blackhole_storage.desc = "Stores elements inside of itself. Can be released by shocking it."
let pullOrPush = 1
elements.anchor = {
    color: "#020c20",
    category: "machines",
    behavior: behaviors.WALL,
    desc: "Anchor; can not be moved by anything.",
    onSelect: function(){
        logMessage("Can not be moved by anything.")
    }
}
elements.piston_ray_emitter = {
    color: "#143b5f",
    behavior: behaviors.WALL,
    category: "machines",
    movable: false,
    onSelect: async function(){
        var ans1 = await _nousersthingsprompt("Would you like this piston to pull or push?", "pull")
        ans1 = ans1.toLowerCase()
        if (ans1 == "pull"){pullOrPush = 1}
        else if (ans1 == "push"){pullOrPush = 2}
        currentElementProp = {pullOrPush: pullOrPush}
    },
    tick: function(pixel){
        if (typeof pixel.pullOrPush == "undefined"){{changePixel(pixel, "flash"); logMessage("A piston without valid properties was attempted to be placed."); return;}}
        if (!pixel.cooldown){pixel.cooldown = 0}
        if (pixel.cooldown < 1){
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y, true)){
                if (pixelMap[x][y].charge && (pixelMap[x][y].element == "wire" || pixelMap[x][y].element == "insulated_wire")){
                    pixel.cooldown = 6
                    var dir = [0-squareCoords[i][0], 0-squareCoords[i][1]]
                    var startx = pixel.x+dir[0]
                    var starty = pixel.y+dir[1]
                    var magnitude = 0
                    if (width > height){magnitude = width} else {magnitude = height}
                    var endx = startx+(magnitude*dir[0])
                    var endy = starty+(magnitude*dir[1])
                 //   console.log("Direction seems to be " + dir)
                 var jcoords
                 if (pixel.pullOrPush == 1){jcoords = lineCoords(startx, starty, endx, endy, 1)}
                 else {jcoords = lineCoords(endx, endy, startx, starty, 1)}
                 
                 //   console.log(startx + " is the starting x, " + starty + " is the starting y, " + endx + " is the ending x, " + endy + " is the ending y. Result is " + jcoords)
                    let pCoord = jcoords[0]
                    for (var j = 0; j < jcoords.length; j++) {
                        var lcoord = jcoords[j];
                        var lx = lcoord[0];
                        var ly = lcoord[1];
                        if (!isEmpty(lx, ly, true)){
                            if (!(pixelMap[lx][ly].element == "anchor")){
                                tryMove(pixelMap[lx][ly], pCoord[0], pCoord[1], null, true)
                            }
                        }
                        pCoord[0] = lx;
                        pCoord[1] = ly;
                    }
                }
            }
        }} else {pixel.cooldown -= 1}
    },
    insulate: true,
    updateOrder: -628
}
let pistonStart = 0
let pistonEnd = 0
let pistonDistance = 1
let pistonCooldown = 10
let pistonRepeat = 1
let pistonRepeatCooldown = 1
function pistonEmit(pixel, i){
    pixel.cooldown = pixel.pistonCooldown
    pixel.rcooldown = pixel.pistonRepeatCooldown
                    var dir = [0-squareCoords[i][0], 0-squareCoords[i][1]]
                    var startx = pixel.x+(dir[0]*(pixel.pistonStart+1))
                    var starty = pixel.y+(dir[1]*(pixel.pistonStart+1))
                    var magnitude = pixel.pistonEnd
                    var endx = startx+(magnitude*dir[0])
                    var endy = starty+(magnitude*dir[1])
                 //   console.log("Direction seems to be " + dir)
                 var jcoords
                 if (pixel.pullOrPush == 1){jcoords = lineCoords(startx, starty, endx, endy, 1)}
                 else {jcoords = lineCoords(endx, endy, startx, starty, 1)}
                 
                 
                 //   console.log(startx + " is the starting x, " + starty + " is the starting y, " + endx + " is the ending x, " + endy + " is the ending y. Result is " + jcoords)
                    let pCoord = jcoords[0]
                    for (var j = 0; j < jcoords.length; j++) {
                        var lcoord = jcoords[j];
                        var lx = lcoord[0];
                        var ly = lcoord[1];
                        if (!isEmpty(lx, ly, true)){
                            if (!(pixelMap[lx][ly].element == "anchor")){
                                tryMove(pixelMap[lx][ly], pCoord[0], pCoord[1], null, true)
                            }
                        }
                        pCoord[0] = lx;
                        pCoord[1] = ly;
                    }
}
elements.specific_piston_ray_emitter = {
    color: "#517597",
    behavior: behaviors.WALL,
    category: "machines",
    movable: false,
    onSelect: async function(){
        var ans1 = await _nousersthingsprompt("Would you like this piston to pull or push?", "pull")
        ans1 = ans1.toLowerCase();
        if (ans1 == "pull"){pullOrPush = 1}
        else if (ans1 == "push"){pullOrPush = 2}
        var ans2 = parseInt(await _nousersthingsprompt("How offset should the start of the push/pulling be?", "0"))
        pistonStart = ans2
        var ans3 = parseInt(await _nousersthingsprompt("How offset should the end of the push/pulling be?", "20"))
        pistonEnd = ans3
        var ans4 = parseInt(await _nousersthingsprompt("How far should it push the pixels each charge?", "1"))
        pistonDistance = ans4
        var ans5 = parseInt(await _nousersthingsprompt("How many ticks should it wait to be charged again?", "6"))
        pistonCooldown = ans5
        var ans6 = parseInt(await _nousersthingsprompt("How many times should it repeat the push/pulling?", "1"))
        pistonRepeat = ans6
        if (pistonRepeat != 1){
            var ans7 = parseInt(await _nousersthingsprompt("How many ticks should it wait between repeats?", "1"))
            pistonRepeatCooldown = ans7
        }
        currentElementProp = {
            pullOrPush : pullOrPush,
            pistonStart : pistonStart,
            pistonEnd : pistonEnd,
            pistonDistance : pistonDistance,
            pistonCooldown : pistonCooldown,
            pistonRepeat : pistonRepeat,
            pistonRepeatCooldown : pistonRepeatCooldown
        }
    },
    tick: function(pixel){
        if (typeof pistonStart == "undefined"){{changePixel(pixel, "flash"); logMessage("A piston without valid properties was attempted to be placed."); return;}}
        if (!pixel.pistonRepeat){
            pixel.pistonRepeat = pistonRepeat
            pixel.pistonRepeatCooldown = pistonRepeatCooldown
        }
        if (!pixel.cooldown){pixel.cooldown = 0}
        if (!pixel.rcooldown){pixel.rcooldown = 0}
        if (!pixel.repeatAmounts){pixel.repeatAmounts = 0}
        if (!pixel.fakei){pixel.fakei = 0}
        if (pixel.cooldown < 1){
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = squareCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y, true)){
                if (pixelMap[x][y].charge && (pixelMap[x][y].element == "wire" || pixelMap[x][y].element == "insulated_wire")){
                    pixel.repeatAmounts = pixel.pistonRepeat
                    pixel.fakei = i
                    for (let r = 0; r < pixel.pistonDistance; r++){
                        pistonEmit(pixel, i);
                    }
                    pixel.repeatAmounts--
                }
            }
        }} else {pixel.cooldown --}
        if (pixel.rcooldown < 1 && pixel.repeatAmounts > 0){
            for (let r = 0; r < pixel.pistonDistance; r++){
                pistonEmit(pixel, pixel.fakei);
            }
            pixel.repeatAmounts--
        } else {pixel.rcooldown --}
    },
    insulate: true,
    updateOrder: -629
}
if (!elements.molten_gallium.reactions){elements.gallium.reactions = {}}
elements.molten_gallium.reactions.nitrogen = {elem1: "gallium_nitride", elem2: null, chance: 0.02, tempMin: 1200}
elements.gallium_nitride = {
    color: "#dedf9d",
    behavior: behaviors.WALL,
    colorOn: "#493ee9",
    category: "solids",
    tempHigh: 1650,
    density: 6100,
    stateHigh: "molten_gallium_nitride",
    state: "solid",
    conduct: 0.84,
    tick: function(pixel){
        if (pixel.charge){
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)){
                    if (Math.random() < 0.3){
                        createPixel("light", x, y)
                        pixelMap[x][y].color = pixelColorPick(pixelMap[x][y], "#493ee9")
                    }
                }
            }
        }
    },
    movable: false,
}
elements.molten_gallium_nitride = {
    color: ["#d29d70", "#cf8e5e", "#cd7e4e", "#ca6d40", "#c75b33"],
    behavior: behaviors.MOLTEN,
    category: "states",
    hidden: true,
    state: "liquid",
    tempLow: 1640,
    stateLow: "gallium_nitride",
    density: 6050,
}
elements.gallium_phosphide = {
    color: "#be6008",
    behavior: behaviors.WALL,
    colorOn: "#00ff15",
    category: "solids",
    tempHigh: 1457,
    density: 4138,
    stateHigh: "molten_gallium_phosphide",
    state: "solid",
    conduct: 0.84,
    tick: function(pixel){
        if (pixel.charge){
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)){
                    if (Math.random() < 0.3){
                        createPixel("light", x, y)
                        pixelMap[x][y].color = pixelColorPick(pixelMap[x][y], "#00ff15")
                    }
                }
            }
        }
    },
    movable: false,
}
elements.molten_gallium_phosphide = {
    color: ["#a36936", "#cf8e5e", "#9b4c1c", "#ca6d40", "#a13d19"],
    behavior: behaviors.MOLTEN,
    category: "states",
    hidden: true,
    state: "liquid",
    tempLow: 1447,
    stateLow: "gallium_phosphide",
    density: 4100,
}
elements.super_heat_conductor = {
    color: "#b66b61",
    behavior: behaviors.WALL,
    category: "solids",
    density: 10000,
    tick: function(pixel){
        for (let j = 0; j <= 10; j++){
            for (var i = 0; i < adjacentCoords.length; i++) {
                var x = pixel.x+adjacentCoords[i][0];
                var y = pixel.y+adjacentCoords[i][1];
                if (!isEmpty(x,y,true)) {
                    var newPixel = pixelMap[x][y];
                    if (elements[newPixel.element].insulate == true) {
                        continue;
                    }
                    var avg = (pixel.temp + newPixel.temp)/2;
                    pixel.temp = avg;
                    newPixel.temp = avg;
                    pixelTempCheck(pixel);
                    pixelTempCheck(newPixel);
                }
            }
        }
    }
}
runEveryTick(function() { // global heat conductor
    // run any code after pixels are simulated per tick
    let heatpixels = currentPixels.filter(function(pixelToCheck) {
        if (pixelToCheck.element == "global_heat_conductor"){
            return true;
        }
    })
    let totals = {}
    for (let i = 0; i < heatpixels.length; i++) {
        let newPixel = heatpixels[i];
        if (typeof totals[newPixel.channel] == "undefined"){totals[newPixel.channel] = [0,0]}
        totals[newPixel.channel][0] += 1
        totals[newPixel.channel][1] += newPixel.temp
    }
    for (let i = 0; i < heatpixels.length; i++) {
        let newPixel = heatpixels[i];
        newPixel.temp = totals[newPixel.channel][1]/totals[newPixel.channel][0]
    }
})
elements.global_heat_conductor = {
    color: "#55251e",
    name: "Heat Portal",
    onSelect: async function(){
        let ans = await _nousersthingsprompt("What will the channel of this heat portal be?", 0)
        currentElementProp = {channel: ans}
    },
    behavior: behaviors.WALL,
    category: "solids",
    density: 10000,
}
let latticeElem = "wood"
elements.lattice_brush = {
    color: elements.grid_brush.color,
    behavior: behaviors.WALL,
    category: "special",
    onSelect: async function(){
        let ans1 = await _nousersthingsprompt("Enter the element you want to use for the lattice", latticeElem||"wood")
        latticeElem = mostSimilarElement(ans1)
    },
    tick: function(pixel){
        let modx = pixel.x%2
        let mody = pixel.y%2
        let valid = {
            1: 0,
            0: 1
        }
        if (valid[modx] == mody){
            changePixel(pixel, latticeElem)
        }else {
            deletePixel(pixel.x, pixel.y)
        }
    }
}
elements.spaced_lattice_brush = {
    color: elements.grid_brush.color,
    behavior: behaviors.WALL,
    category: "special",
    onSelect: async function(){
        let ans1 = await _nousersthingsprompt("Enter the element you want to use for the lattice", latticeElem||"wood")
        latticeElem = mostSimilarElement(ans1)
    },
    tick: function(pixel){
        let modx = pixel.x%5
        let mody = pixel.y%5
        let valid = {
            1: 3,
            2: 0,
            3: 2,
            4: 4,
            0: 1
        }
        if (valid[modx] == mody){
            changePixel(pixel, latticeElem)
        }else {
            deletePixel(pixel.x, pixel.y)
        }
    }
}
let outlinerElem = "wood"
elements.outer_outliner = {
    color: elements.inner_outliner.color,
    behavior: behaviors.WALL,
    category: "special",
    onSelect: async function(){
        let ans1 = await _nousersthingsprompt("Enter the element you want to use for the outliner. The outliner will ignore pixels of this type.", outlinerElem||"wood")
        outlinerElem = mostSimilarElement(ans1)
    },
    tick: function(pixel){
        // this just checks if theres any neighboring coord non-outliner elem pixels. yuh that simple
        for (var i = 0; i < squareCoords.length; i++) {
            var x = pixel.x+squareCoords[i][0];
            var y = pixel.y+squareCoords[i][1];
            if (!isEmpty(x,y,true)) {
                var newPixel = pixelMap[x][y];
                if (newPixel.element != outlinerElem && newPixel.element!= "outer_outliner") {
                    deletePixel(pixel.x, pixel.y)
                    createPixel(outlinerElem, pixel.x, pixel.y)
                    return;
                }
            }
        }
        deletePixel(pixel.x, pixel.y)
    }
}
function highestValueObjectKey(object){
    let max = -Infinity
    for (var key in object){
        if (object[key] > (object[max]||-Infinity)){
            max = key
        }
    }
    return max
}
function sumOfObjectValues(object){
    let sum = 0
    for (var key in object){
        sum += object[key]
    }
    return sum
}
neighborRandomChance = {
    1: 0.015,
    2: 0.03,
    3: 0.06,
    4: 0.12,
    5: 0.2,
    6: 0.5,
    7: 0.8,
    8: 1
}
elements.colored_filler = {
    color: elements.rainbow.color,
    behavior: behaviors.WALL,
    category: "special",
    customColor: true,
    properties: {
        "initalized": false,
    },
    tick: function(pixel){
        let fillerNeighbors = {}
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x+adjacentCoords[i][0];
            var y = pixel.y+adjacentCoords[i][1];
            if (isEmpty(x,y) && pixel.initalized) {
                createPixel("colored_filler", x, y)
                pixelMap[x][y].color = pixel.color;
                pixelMap[x][y].initalized = true
            }
        }
        for (var i = 0; i < squareCoords.length; i++) {
            var x = pixel.x+squareCoords[i][0];
            var y = pixel.y+squareCoords[i][1];
            if (!isEmpty(x, y, true)){
                var otherPixel = pixelMap[x][y];
                if (otherPixel.element == "colored_filler" && otherPixel.color != pixel.color){
                    fillerNeighbors[otherPixel.color] = (fillerNeighbors[otherPixel.color]||0)+1;
                }
            }
        }
        if(Object.keys(fillerNeighbors).length > 0){
            let mostSeenColor = highestValueObjectKey(fillerNeighbors)
            let opposingCount = sumOfObjectValues(fillerNeighbors)
            if (Math.random() < neighborRandomChance[opposingCount]){
                pixel.color = mostSeenColor;
            }
        }
    },
    renderer: function(pixel, ctx){
        if (!pixel.initalized){
            var rgb = hexToRGB(currentColor);
            pixel.color = "rgb("+rgb.r+","+rgb.g+","+rgb.b+")";
            pixel.initalized = true;
        }
        if (pixel.color != "monochrome" && pixel.color != "rainbow"){
            drawSquare(ctx, pixel.color, pixel.x, pixel.y);
        } else {
            if (pixel.color == "monochrome"){
                drawSquare(ctx, "hsl(0, 0%, " + 100*Math.abs(Math.asin(Math.sin(pixelTicks/30)))/(0.5*Math.PI) + "%)", pixel.x, pixel.y);
            } else if (pixel.color == "rainbow"){
                drawSquare(ctx, "hsl(" + ((pixelTicks%60)/60)*360 + ", 100%, 50%)", pixel.x, pixel.y);
            }
        }
    }
}
let copycatfillerElem = "sand"
elements.copycat_filler = {
    color: elements.random.color,
    behavior:behaviors.WALL,
    category: "special",
    onSelect: async function(){
        let ans1 = await _nousersthingsprompt("Enter the element you want to use for the copycat filler", copycatfillerElem||"sand")
        copycatfillerElem = mostSimilarElement(ans1)
        currentElementProp = {copycatElement:copycatfillerElem}
    },
    tick: function(pixel){
        let fillerNeighbors = {}
        if (typeof pixel.copycatElement == "undefined"){{changePixel(pixel, "flash"); logMessage("A filler without valid properties was attempted to be placed."); return;}}
        if (!pixel.rSeed){
            pixel.rSeed = [Math.random(), Math.random(), Math.random(), Math.random()]
        }
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x+adjacentCoords[i][0];
            var y = pixel.y+adjacentCoords[i][1];
            if (isEmpty(x,y)) {
                createPixel("copycat_filler", x, y)
                pixelMap[x][y].copycatElement = pixel.copycatElement
            }
        }
        for (var i = 0; i < squareCoords.length; i++) {
            var x = pixel.x+squareCoords[i][0];
            var y = pixel.y+squareCoords[i][1];
            if (!isEmpty(x, y, true)){
                var otherPixel = pixelMap[x][y];
                if (otherPixel.element == "copycat_filler" && otherPixel.copycatElement != pixel.copycatElement){
                    fillerNeighbors[otherPixel.copycatElement] = (fillerNeighbors[otherPixel.copycatElement]||0)+1;
                }
            }
        }
        if(Object.keys(fillerNeighbors).length > 0){
            let mostSeenColor = highestValueObjectKey(fillerNeighbors)
            let opposingCount = sumOfObjectValues(fillerNeighbors)
            if (Math.random() < neighborRandomChance[opposingCount]){
                pixel.copycatElement = mostSeenColor;
            }
        }
    },
    renderer: function(pixel, ctx){
        if (!pixel.copycatElement){pixel.copycatElement = copycatfillerElem}
        if (!pixel.rSeed){pixel.rSeed = [Math.random(), Math.random(), Math.random(), Math.random()]}
        if (typeof elements[pixel.copycatElement].color == "object"){
            let selectedColor = elements[pixel.copycatElement].color[Math.floor(pixel.rSeed[1]*elements[pixel.copycatElement].color.length)]
            let rgb = {
                r: parseInt(selectedColor.match(/\d+/g)[0]),
                g: parseInt(selectedColor.match(/\d+/g)[1]),
                b: parseInt(selectedColor.match(/\d+/g)[2])
            }
            for (let c in rgb){
                rgb[c] += Math.floor(pixel.rSeed[0] * (pixel.rSeed[2] > 0.5 ? -1 : 1) * pixel.rSeed[3] * 15);
                rgb[c] = Math.max(0, Math.min(255, rgb[c]));
            }
            if (elements[pixel.copycatElement].glow || elements[pixel.copycatElement].isGas){
                drawPlus(ctx, "rgb("+rgb.r+","+rgb.g+","+rgb.b+")", pixel.x, pixel.y, 1);
            } else {
                drawSquare(ctx, "rgb("+rgb.r+","+rgb.g+","+rgb.b+")", pixel.x, pixel.y);
            }
        } else {
            let rgb = {
                r: parseInt(elements[pixel.copycatElement].color.match(/\d+/g)[0]),
                g: parseInt(elements[pixel.copycatElement].color.match(/\d+/g)[1]),
                b: parseInt(elements[pixel.copycatElement].color.match(/\d+/g)[2])
            }
            for (let c in rgb){
                rgb[c] += Math.floor(pixel.rSeed[0] * (pixel.rSeed[2] > 0.5 ? -1 : 1) * pixel.rSeed[3] * 15);
                rgb[c] = Math.max(0, Math.min(255, rgb[c]));
            }
            if (elements[pixel.copycatElement].glow || elements[pixel.copycatElement].isGas){
                drawPlus(ctx, "rgb("+rgb.r+","+rgb.g+","+rgb.b+")", pixel.x, pixel.y, 1);
            } else {
                drawSquare(ctx, "rgb("+rgb.r+","+rgb.g+","+rgb.b+")", pixel.x, pixel.y);
            }
        }
    }
}
/*
top left: canvasCoord(x), canvasCoord(y)
top right: canvasCoord(x)+pixelSize, canvasCoord(y)
bottom left: canvasCoord(x), canvasCoord(y)+pixelSize
bottom right: canvasCoord(x)+pixelSize, canvasCoord(y)+pixelSize
*/
adjacentSidesToCanvas = function(x, y, px, py){
    if (x == 0 && y == -1){
        return [canvasCoord(px)+(0.5*pixelSize), canvasCoord(py)]
    }
    else if (x == 0 && y == 1){
        return [canvasCoord(px)+(0.5*pixelSize), canvasCoord(py)+pixelSize]
    }
    else if  (x == -1 && y == 0){
        return [canvasCoord(px), canvasCoord(py)+(0.5*pixelSize)]
    }
    else if  (x == 1 && y == 0){
        return [canvasCoord(px)+pixelSize, canvasCoord(py)+(0.5*pixelSize)]
    }
}
drawRectangle = function(ctx, color, x, y, width, height, xoffset, yoffset){
    ctx.fillStyle = color;
    ctx.fillRect(canvasCoord(x+xoffset), canvasCoord(y+yoffset), pixelSize*width, pixelSize*height)
}
elements.thin_pixel = {
    color: "#747474",
    behavior: behaviors.WALL,
    category: "special",
    renderer: function(pixel, ctx){
        let differentAdjacent = [];
                for (let i = 0; i < adjacentCoords.length; i++) {
                    let x = adjacentCoords[i][0] + pixel.x;
                    let y = adjacentCoords[i][1] + pixel.y;
                    if (!isEmpty(x, y, true) && pixelMap[x][y].element == "thin_pixel") {
                        differentAdjacent.push(adjacentCoords[i]);
                    }
                }
                ctx.globalAlpha = 1
                differentAdjacent.forEach(adj => {
                    let canvasadjacentCoords = adjacentSidesToCanvas(adj[0], adj[1], pixel.x, pixel.y);
                   // if (!canvasadjacentCoords){
                  //      console.log(adj)
                  //      return;
                  //  }
                    //console.log(canvasadjacentCoords);
                    ctx.beginPath();
                    ctx.moveTo(canvasCoord(pixel.x)+(0.5*pixelSize), canvasCoord(pixel.y)+(0.5*pixelSize));
                    ctx.lineTo(canvasadjacentCoords[0], canvasadjacentCoords[1]);
                    ctx.strokeStyle = pixel.color;
                    if (pixelSize*0.24>=2){ctx.lineWidth = pixelSize*0.24}else{ctx.lineWidth = 2}
                    ctx.stroke();
                    //console.log("line")
                });
                ctx.fillStyle = pixel.color;
                ctx.fillRect(canvasCoord(pixel.x+0.38), canvasCoord(pixel.y+0.38), pixelSize*0.24, pixelSize*0.24);
    }
}
elements.cooler_sensor = {
    color: "#5499e7",
    behavior: behaviors.WALL,
    category: "machines",
    insulate: true,
    conduct: 1,
    tick: function(pixel){
        let temp = pixel.temp
        for (i = 0; i < adjacentCoords.length; i++){
            let x = adjacentCoords[i][0] + pixel.x;
            let y = adjacentCoords[i][1] + pixel.y;
            if (!isEmpty(x, y, true)){
                if (pixelMap[x][y].temp < temp){
                    pixel.charge = 1
                }
            }
        }
    }
}
elements.hotter_sensor = {
    color: "#e75454",
    behavior: behaviors.WALL,
    category: "machines",
    insulate: true,
    conduct: 1,
    tick: function(pixel){
        let temp = pixel.temp
        for (i = 0; i < adjacentCoords.length; i++){
            let x = adjacentCoords[i][0] + pixel.x;
            let y = adjacentCoords[i][1] + pixel.y;
            if (!isEmpty(x, y, true)){
                if (pixelMap[x][y].temp > temp){
                    pixel.charge = 1
                }
            }
        }
    }
}
let pipe_transmitter_channelVar = 0;
elements.pipe_transmitter = {
    color: "#6e6250",
    category: "deprecated",
    updateOrder: -351083,
    movable: false,
    canContain: true,
    insulate: true,
    onSelect: async () => {
        let newChannel = await _nousersthingsprompt("Enter the channel of this pipe transmitter. It will not work if you do multiple while paused.", pipe_transmitter_channelVar);
        pipe_transmitter_channelVar = newChannel;
        currentElementProp = {channel:pipe_transmitter_channelVar}
    },
    tick: (pixel) => {
        if (typeof pixel.channel == "undefined"){{changePixel(pixel, "flash"); logMessage("A transmitter without valid properties was attempted to be placed."); return;}}
        if (pixel.channel && pixel.con){
            let valid = currentPixels.filter(pixel2 => 
                pixel2.element == "pipe_receiver" && pixel2.channel === pixel.channel && !(pixel2.con)
            )
            if (valid.length){
                //console.log(valid)
                shuffleArray(valid);
                //console.log(valid)
                pixel.con.x = valid[0].x
                pixel.con.y = valid[0].y
                pixelMap[valid[0].x][valid[0].y].con = pixel.con
                delete pixel.con
            }
        }
    }
}
let pipe_receiver_channelVar = 0;
elements.pipe_receiver = {
    color: "#4d4b63",
    category: "deprecated",
    updateOrder: 9007273,
    movable: false,
    canContain: true,
    insulate: true,
    onSelect: async () => {
        let newChannel = await _nousersthingsprompt("Enter the channel of this pipe receiver. It will not work if you do multiple while paused.", pipe_receiver_channelVar);
        pipe_receiver_channelVar = newChannel;
        currentElementProp = {channel:pipe_receiver_channelVar}
    },
    tick: (pixel) => {
        if (typeof pixel.channel == "undefined"){{changePixel(pixel, "flash"); logMessage("A receiver without valid properties was attempted to be placed."); return;}}
        if (pixel.channel && pixel.con){
            // just scan neighbors for elements on the pipe list; transfer con to them. if its a type of channel pipe, also check if channel matches
            for (i = 0; i < squareCoords.length; i++){
                let x = squareCoords[i][0] + pixel.x;
                let y = squareCoords[i][1] + pixel.y;
                if (!isEmpty(x, y, true)){
                    if (elements[pixelMap[x][y].element].canContain){
                        if (["channel_pipe", "destroyable_channel_pipe"].includes(pixelMap[x][y].element)){
                            if (pixelMap[x][y].channel == pixel.channel && !pixelMap[x][y].con){
                                pixelMap[x][y].con = pixel.con;
                                delete pixel.con;
                                break;
                            }
                        } else {
                            pixel.con.x = x;
                            pixel.con.y = y;
                            pixelMap[x][y].con = pixel.con;
                            delete pixel.con;
                            break;
                        }
                    }
                }
            }
        }
    }
}
elements.false_vacuum_decay_bomb = {
    color: "#3f0b0b",
    category: "weapons",
    behavior: behaviors.STURDYPOWDER,
    tick: function(pixel){
        if (!isEmpty(pixel.x, pixel.y+1, true)){
            changePixel(pixel, "false_vacuum")
        }
    },
    excludeRandom: true
}
elements.false_vacuum = {
    color: "#b41b1b",
    category: "special",
    hidden: true,
    tick: function(pixel){
        if (!pixel.timeAlive){
            pixel.timeAlive = 0
        }
        if (!pixel.generations){
            pixel.generations = 0
        }
        if (pixel.generations > Math.max(width, height)){
            deletePixel(pixel.x, pixel.y)
            return
        }
        pixel.color = `rgb(${180/(pixel.timeAlive+2)}, ${27/(pixel.timeAlive+2)}, ${27/(pixel.timeAlive+2)})`
        if (pixel.timeAlive === 0){
            for (i = 0; i < squareCoords.length; i++){
                let x = squareCoords[i][0] + pixel.x;
                let y = squareCoords[i][1] + pixel.y;
                if (!isEmpty(x, y, true)){
                    if (pixelMap[x][y].element !== "false_vacuum"){
                        deletePixel(x, y)
                        createPixel("false_vacuum", x, y)
                        pixelMap[x][y].generations = pixel.generations + 1
                    }
                } else if (isEmpty(x, y)){
                    createPixel("false_vacuum", x, y)
                    pixelMap[x][y].generations = pixel.generations + 1
                }
            }
            let coords = rectCoords(pixel.x-2, pixel.y-2, pixel.x+2, pixel.y+2)
            for (let coord of coords){
                let x = coord.x
                let y = coord.y
                if (!isEmpty(x, y, true) && pixelMap[x][y].element != "false_vacuum"){
                    deletePixel(x, y)
                }
            }
        }
        pixel.timeAlive ++;
        if (pixel.timeAlive > 20){
            deletePixel(pixel.x, pixel.y)
            return
        }
    },
    movable: false,
    hardness: 1,
    updateOrder: -Infinity,
    excludeRandom: true
}
let signInput = "Hello World!";
saveElementMigrations.sign = function(pixel){
    pixel.element = "text";
    pixel.text = pixel.sign;
    delete pixel.sign;
}
saveElementMigrations.e_sign = function(pixel){
    pixel.element = "text";
    pixel.text = `[${pixel.sign}| ]`;
    delete pixel.sign;
}
/*
elements.sign = {
    color: "#FFFFFF",
    darkText: true,
    category: "special",
    onSelect: async function(){
        let signi = await _nousersthingsprompt("What text should the sign display?", signInput||"Hello World!")
        signInput = signi;
        currentElementProp = {sign:signInput}
    },
    renderer: function(pixel, ctx){
        if (!pixel.sign){pixel.sign = signInput}
    },
    movable: false
}
elements.e_sign = {
    color: "#f3ff88",
    darkText: true,
    category: "special",
    movable: false,
    onSelect: async () => {
        let signi = await _nousersthingsprompt("What text should the sign display?", signInput||"Hello World!")
        signInput = signi;
    },
    renderer: function(pixel, ctx){
        if (!pixel.sign){pixel.sign=signInput}
    },
    conduct: 1
}
renderPostPixel(function(ctx){ // sign stuff
    for (pixel of currentPixels){
        if ((pixel.element == "sign") && pixel.sign){
            ctx.font = `12pt Arial`
            ctx.globalAlpha = 1
            ctx.fillStyle = pixel.color;
            ctx.fillText(pixel.sign.replace(/\$\{([\w.\[\]]+)\}/g, (_, path) => {
                try {
                    const value = new Function('return globalThis.' + path)();
                    return typeof value === 'object' ? JSON.stringify(value) : value ?? '';
                } catch {
                    return '';
                }
            }), canvasCoord(pixel.x), canvasCoord(pixel.y))
        } else if (pixel.element == "e_sign" && pixel.sign){
            if (pixel.charge || pixel.chargeCD){
                ctx.font = `12pt Arial`
                ctx.globalAlpha = 1
                ctx.fillStyle = pixel.color;
                ctx.fillText(pixel.sign.replace(/\$\{([\w.\[\]]+)\}/g, (_, path) => {
                    try {
                        const value = new Function('return globalThis.' + path)();
                        return typeof value === 'object' ? JSON.stringify(value) : value ?? '';
                    } catch {
                        return '';
                    }
                }), canvasCoord(pixel.x), canvasCoord(pixel.y))
            } else {
                drawSquare(ctx, pixel.color, pixel.x, pixel.y)
            }
        }
    }
})
    */
let machinemodName = "nousersthings.js"
elements.mod_dectector = {
    color: "#54681d",
    behavior: behaviors.WALL,
    category: "machines",
    movable: false,
    excludeRandom: true,
    onSelect: async () => {
        let newMod = await _nousersthingsprompt("What mod should this machine detect?", "nousersthings.js"||modName)
        machinemodName = newMod
        currentElementProp = {mod:machinemodName}
    },
    tick: (pixel) => {
        if (typeof pixel.mod == "undefined"){changePixel(pixel, "flash"); logMessage("A detector without valid properties was attempted to be placed."); return;}
        if (loadedMods.includes(pixel.mod)){
            for (let i = 0; i < adjacentCoords.length; i++){
                let x = adjacentCoords[i][0] + pixel.x;
                let y = adjacentCoords[i][1] + pixel.y;
                if (!isEmpty(x, y, true) && elements[pixelMap[x][y].element].conduct){
                    pixelMap[x][y].charge = 1
                }
            }
        }
    }
}
smoothColor = function(color1, color2, amount){
    let rgb1 = getPixelColor(color1)
    let rgb2 = getPixelColor(color2)
    return {r:((1-amount)*rgb1[0])+(amount*rgb2[0]),g:((1-amount)*rgb1[1])+(amount*rgb2[1]),b:((1-amount)*rgb1[2])+(amount*rgb2[2])}
}
objectColorToString = function(object){
    if (typeof object == "object"){return `rgb(${Math.round(object.r)}, ${Math.round(object.g)}, ${Math.round(object.b)})`}
    else {return `rgb(${Math.round(object[0])}, ${Math.round(object[1])}, ${Math.round(object[2])})`}
}
let delayVariable = 0
elements.delay = {
    color: "#df3b3b",
    updateOrder: -5335888,
    behavior: behaviors.WALL,
    category: "machines",
    movable: false,
    insulate: true,
    onSelect: async () => {
        let ansdelay = await _nousersthingsprompt("How long should the delay be in ticks?", 30)
        delayVariable = parseInt(ansdelay);
        logMessage("Will delay incoming signals. This element also acts as a one-way wire and will configure its direction when first shocked.")
        currentElementProp = {delay:delayVariable}
    },
    tick: function(pixel){
        if (typeof pixel.delay == "undefined"){changePixel(pixel, "flash"); logMessage("A delay without valid properties was attempted to be placed."); return;}
        if (typeof pixel.wait == "undefined"){pixel.wait = 0}
        if (!pixel.coord){pixel.coord = [0, 0]}
        if (typeof pixel.cMode == "undefined"){pixel.cMode = true}
        if (pixel.cMode == true){
            if (pixel.coord[0] == 0 && pixel.coord[1] == 0){
                for (i = 0; i < squareCoords.length; i++){
                    let coord = squareCoords[i]
                    let x = pixel.x+coord[0]
                    let y = pixel.y+coord[1]
                    if (!isEmpty(x, y, true) && pixelMap[x][y].charge){
                        pixel.coord = coord
                        pixel.cMode = false
                        pixel.wait = pixel.delay
                    }
                }
            }
            else {
                if (!isEmpty(pixel.x+pixel.coord[0],pixel.y+pixel.coord[1], true) && pixelMap[pixel.x+pixel.coord[0]][pixel.y+pixel.coord[1]].charge){
                    pixel.cMode = false
                    pixel.wait = pixel.delay
                }
            }
        } else {
            if (pixel.wait == 0){
                if (!isEmpty(pixel.x-pixel.coord[0],pixel.y-pixel.coord[1]) && elements[pixelMap[pixel.x-pixel.coord[0]][pixel.y-pixel.coord[1]].element].conduct){
                    pixelMap[pixel.x-pixel.coord[0]][pixel.y-pixel.coord[1]].charge = 1
                }
                pixel.cMode = true
            }
        }
        if (pixel.wait > 0){pixel.wait --}
    },
    renderer: function(pixel, ctx){
        if (typeof pixel.wait != "undefined"){
            let color = smoothColor(pixel.color, objectColorToString(smoothColor(pixel.color, "#000000", 0.85)), 1-(pixel.wait/pixel.delay))
            drawSquare(ctx, objectColorToString(color), pixel.x, pixel.y)
        } else {drawSquare(ctx, pixel.color, pixel.x, pixel.y)}
    }
}
function isElementInProperty(element, property){return (property === element || property.split(",").includes(element))}
elements.wire.updateOrder = -681392
elements.battery.updateOrder = 8199598
elements.e_void = {
    color: "#2a2715",
    category: "machines",
    movable: false,
    behavior: behaviors.WALL,
    ignore: ["wall", "wire", "e_wall"],
    conduct: 1,
    onShiftSelect: async () => {
        let ans = await _nousersthingsprompt("What elements should this e-void delete?", "")
        currentElementProp = {filter:ans}
    },
    tick: function(pixel){
        if (pixel.charge){
            for (let i = 0; i<adjacentCoords.length;i++){
                let x = pixel.x+adjacentCoords[i][0]
                let y = pixel.y+adjacentCoords[i][1]
                if (!isEmpty(x, y, true)){
                    let otherPixel = pixelMap[x][y]
                    if (typeof pixel.filter != "undefined"){
                        if(isElementInProperty(otherPixel.element, pixel.filter)){deletePixel(otherPixel.x, otherPixel.y)}
                    } else if (!elements.e_void.ignore.includes(otherPixel.element) && otherPixel.element != pixel.element){deletePixel(otherPixel.x, otherPixel.y)}
                }
            }
        }
    },
    name: "e-void"
}
elements.smart_anti_void = {
    color: "#92c6b8",
    category: "special",
    movable: false,
    behavior: behaviors.WALL,
    onSelect: async()=>{
        let ans = await _nousersthingsprompt("What element should NOT be deleted by this anti void?", "")
        currentElementProp = {filter:ans}
    },
    tick: function(pixel){
        if (typeof pixel.filter == "undefined"){changePixel(pixel, "flash"); logMessage("A void without valid properties was attempted to be placed."); return;}
        for (let i = 0; i<adjacentCoords.length;i++){
            let x = pixel.x+adjacentCoords[i][0]
            let y = pixel.y+adjacentCoords[i][0]
            if (!isEmpty(x, y, true)){
                let otherPixel = pixelMap[x][y]
                if (!isElementInProperty(otherPixel.element, pixel.filter) && otherPixel.element != pixel.element){deletePixel(otherPixel.x, otherPixel.y)}
            }
        }
    },
    name: "smart anti-void",
    grain: 0
}
elements.smart_anti_e_void = {
    color: "#bfbe7c",
    category: "machines",
    movable: false,
    behavior: behaviors.WALL,
    conduct: 1,
    onSelect: async()=>{
        let ans = await _nousersthingsprompt("What element should NOT be deleted by this anti void?", "")
        currentElementProp = {filter:ans}
    },
    tick: function(pixel){
        if (typeof pixel.filter == "undefined"){changePixel(pixel, "flash"); logMessage("An anti-e-void without valid properties was attempted to be placed."); return;}
        if (pixel.charge){
            for (let i = 0; i<adjacentCoords.length;i++){
                let x = pixel.x+adjacentCoords[i][0]
                let y = pixel.y+adjacentCoords[i][0]
                if (!isEmpty(x, y, true)){
                    let otherPixel = pixelMap[x][y]
                    if (!isElementInProperty(otherPixel.element, pixel.filter) && otherPixel.element != pixel.element){deletePixel(otherPixel.x, otherPixel.y)}
                }
            }
        }
    },
    name: "smart anti-e-void",
    grain: 0
}
elements.anti_filter = {
    color: ["#77a5c5","#9bbcd4"],
	colorKey: {
		"L":"#77a5c5",
		"D":"#9bbcd4"
	},
	colorPattern: [
		"DL",
		"LD"
	],
	onShiftSelect: function(element) {
		promptInput("Enter an element to disallow. Be careful, it will absorb solids you don't exclude. Enter multiple separated by commas.", function(r) {
			r = validateElementList(r);
			if (!r) return;
			currentElementProp = { filter:r }
		}, elemTitleCase(elements[element].name || element));
	},
	onClicked: function(pixel,element) {
		if (pixel.filter) return;
		if (elements[element].tool && elements[element].canPlace !== true) return;
		if (elements[element].canPlace === false) return;
		if (elements[element].movable) pixel.filter = element;
	},
	onMix: function(pixel) {
		if (!pixel.con) return;
		pixel.con.x = pixel.x;
		pixel.con.y = pixel.y;
	},
	tick: function(pixel) {
		doDefaults(pixel);
		if (!pixel.con) { //collect pixel
			if (Math.random() > 0.2) return;
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				let newPixel = getPixel(x, y);
				if (!newPixel) continue;
				if (newPixel.element === "filter") {
					if (!newPixel.filter && pixel.filter) newPixel.filter = pixel.filter;
					if (!pixel.filter && newPixel.filter) pixel.filter = newPixel.filter;
				}
				//if (!elements[newPixel.element].movable) continue;
				if (!pixel.filter && elements[newPixel.element].movable) {
					pixel.filter = newPixel.element;
				} else if(!pixel.filter){continue;}
				if ((
					pixel.filter !== newPixel.element ||
					(pixel.filter !== elements[newPixel.element].state && elements[newPixel.element].movable)||
					(pixel.filter.match(/,/) && !pixel.filter.split(",").includes(newPixel.element))
				) && newPixel.element != "anti_filter") {
					pixel.con = newPixel;
					deletePixel(newPixel.x,newPixel.y);
					pixel.con.x = pixel.x;
					pixel.con.y = pixel.y;
					pixel.con.del;
					pixel.filterTick = pixelTicks;
					break;
				}
			}
			return;
		}

		pixel.con.x = pixel.x;
		pixel.con.y = pixel.y;

		//move pixel
		let targets;
		let element = pixel.con.element;
		//if (elements[element].isGas) { //random direction
			shuffleArray(squareCoordsShuffle);
			targets = squareCoordsShuffle;
		//}
		//else { //downward, and then randomly diagonally
		//	if (Math.random() < 0.5) return;
		//	targets = [[0,1], ...(Math.random() < 0.5 ? [[1,1],[-1,1]] : [[-1,1],[1,1]])];
		//}

		for (var i = 0; i < targets.length; i++) {
			var coord = targets[i];
			var x = pixel.x+coord[0];
			var y = pixel.y+coord[1];
			if (isEmpty(x,y)) { //release pixel
				delete pixel.con.del;
				pixel.con.x = x;
				pixel.con.y = y;
				pixelMap[x][y] = pixel.con;
				currentPixels.push(pixel.con);
				pixel.con = null;
				break;
			}
			let newPixel = getPixel(x, y);
			if (!newPixel) continue;
			if (elements[newPixel.element].canContain && !newPixel.con && newPixel.filterTick !== pixelTicks) {
				if (newPixel.filter && newPixel.filter !== pixel.filter) {
					if (newPixel.filter !== pixel.con.element && !newPixel.filter.split(",").includes(pixel.con.element)) continue
				}
				newPixel.con = pixel.con;
				newPixel.con.x = newPixel.x;
				newPixel.con.y = newPixel.y;
				// newPixel.con.del = true; //???
				newPixel.filterTick = pixelTicks;
				// delete newPixel.con.del;
				pixel.con = null;
				break;
			}
		}
	},
	hoverStat: function(pixel) { return pixel.filter ? pixel.filter.toUpperCase() : "NONE" },
	category: "machines",
	movable: false,
	canContain: true,
	forceSaveColor: true,
	hardness: 0.75
}
elements.heat_conducting_wall = {
    category: "special",
    color: "#8c6262",
    behavior: behaviors.WALL,
    hardness: 1
}
elements.acid.ignore.push("heat_conducting_wall");
elements.acid_gas.ignore.push("heat_conducting_wall");
elements.aerogel = {
    color: "#84cbe5",
    alpha: 0.7,
    hardness: 0.04,
    behavior: behaviors.WALL,
    category: "solids",
    density: 20,
    tempHigh: 1710,
    stateHigh: ["molten_glass", "carbon_dioxide", "carbon_dioxide", "carbon_dioxide"],
    insulate: true,
    tick: function(pixel){
        for (let i=0;i<adjacentCoords.length;i++){
            let coord = adjacentCoords[i];
			let x = pixel.x+coord[0];
			let y = pixel.y+coord[1];
            if (!isEmpty(x, y, true)){
                let otherPixel = pixelMap[x][y]
                if ((otherPixel.element == "aerogel" || !elements[otherPixel.element].insulate) && Math.random() < 0.01){
                    let thisTemp = weightedAverage(pixel.temp, otherPixel.temp, 0.99)
                    let otherTemp = weightedAverage(otherPixel.temp, pixel.temp, 0.99)
                    pixel.temp = thisTemp;
                    otherPixel.temp = otherTemp;
                    pixelTempCheck(pixel);
                    pixelTempCheck(otherPixel);
                }
            }
        }
    },
    movable: false
}
if (!elements.sand.reactions){element.sand.reactions = {}};
elements.sand.reactions.acid = {elem1: "silica_gel", elem2: null}
elements.silica_gel = {
    color: "#FFFFFF",
    alpha: 0.7,
    category: "powders",
    behavior: behaviors.POWDER,
    tempHigh: elements.glass.tempHigh,
    stateHigh: [null, null, null, "molten_glass"],
    reactions:{
        carbon_dioxide: {elem1: "aerogel", elem2: "aerogel", tempMax: -60},
        water: {elem2: null},
        salt_water: {elem2: [null, "salt"]},
        sugar_water: {elem2: [null, "sugar"]},
        pool_water: {elem2: [null, "chlorine"]},
        mud: {elem2: "dirt"},
        wet_sand: {elem2: "sand"},
        soda: {elem2: [null, "sugar", "carbon_dioxide"]},
        seltzer: {elem2: [null, "carbon_dioxide"]},
        clay: {elem2: "clay_soil"}
    }
}
if (!eLists.UNMOVABLE){eLists.UNMOVABLE = [];}
eLists.UNMOVABLE.push("false_vacuum", "anchor")
let numerizedUnmovable = false
runAfterReset(() => {
    if (!numerizedUnmovable){
        const newList = []
        for (let _element in eLists.UNMOVABLE){
            newList[elements[eLists.UNMOVABLE[_element]].id] = true
        }
        eLists.UNMOVABLE = newList
        numerizedUnmovable = true
    }
})
const oldTryMove = tryMove
tryMove = function(...args){
    let pixel = args[0]
    if (eLists.UNMOVABLE[elements[pixel.element].id]){return false} else{
        return oldTryMove.apply(undefined, args)
    }
}
const iUpdateAll = function(pixel){
    let updateList = [[pixel.x, pixel.y, pixel]];
    while (updateList.length > 0 && updateList.length < 100000) { // arbitrary safeguard
        //console.log(updateList)
        const [x, y, spreaderPixel] = updateList.pop();
        let otherPixel = pixelMap[x][y];
        if (elements[otherPixel.element].conduct){
            chargePixel(otherPixel)
        }
        if (elements[otherPixel.element].iConduct) {
            updateList = updateList.concat(elements[otherPixel.element].iUpdate(otherPixel, spreaderPixel) || []);
        }
    }
}
const iCooldownTick = function(pixel, offTime){
    if (pixel.cooldown > -30 && pixel.lastUpdate != pixelTicks){pixel.cooldown -= 1}
    if (pixel.cooldown < offTime){pixel.iCharge = 0} else {pixel.iCharge = 1}
    if (pixel.cooldown <= 0){
        for (let i in adjacentCoords){
            let x = pixel.x + adjacentCoords[i][0]
            let y = pixel.y + adjacentCoords[i][1]
            if (!isEmpty(x, y, true)){
                let otherPixel = pixelMap[x][y]
                if (otherPixel.charge){
                    iUpdateAll(pixel)
                    break;
                }
            }
        }
    }
}
const iUpdateCooldown = function(pixel, cooldown){
    let returnCoords = []
    pixel.iCharge = 1
    pixel.cooldown = cooldown
    pixel.lastUpdate = pixelTicks
    for (let i of adjacentCoords){
        let x = pixel.x + i[0]
        let y = pixel.y + i[1]
        if (!isEmpty(x, y, true)){
            let spreadPixel = pixelMap[x][y]
            if (elements[spreadPixel.element].iConduct && pixel.lastUpdate > spreadPixel.lastUpdate){
                returnCoords.push([spreadPixel.x, spreadPixel.y, pixel])
            }
            if (elements[spreadPixel.element].conduct && !spreadPixel.chargeCD && !spreadPixel.charge){
                chargePixel(spreadPixel)
            }
        }
    }
    return returnCoords
}
elements.instant_wire = {
    color: "#8ec7a2",
    behavior: behaviors.WALL,
    category: "instant machines",
    properties: {
        iCharge: 0,
        lastUpdate: 0,
        cooldown: 0
    },
    iConduct: 1,
    tick: function(pixel){
        iCooldownTick(pixel, 4)
    },
    iUpdate: function(pixel, otherPixel){
        return iUpdateCooldown(pixel, 9)
    },
    renderer: function(pixel, ctx){
        let _rgb = getPixelColor(pixel.color);
        let _hsv = RGBtoHSV(parseInt(_rgb[0]), parseInt(_rgb[1]), parseInt(_rgb[2]))
        _hsv.v = _hsv.v*((Math.max(pixel.cooldown, 0)/9)*0.6+0.4)
        let _rgb2 = HSVtoRGB(_hsv.h, _hsv.s, _hsv.v)
        let _hex = RGBToHex([Math.floor(_rgb2.r), Math.floor(_rgb2.g), Math.floor(_rgb2.b)])
        drawSquare(ctx, _hex, pixel.x, pixel.y)
    },
    updateOrder: 203847,
    movable: false
}
elements.instant_wire_junction = {
    color: "#00685a",
    iConduct: 1,
    behavior: behaviors.WALL,
    category: "instant machines",
    properties: {
        lastUpdate: 0,
        cooldown: 1,
        dirUpdate: 0,
        visitedDirs: [],
        iCharge: 0
    },
    tick: (pixel) => {pixel.iCharge--},
    iUpdate: function(pixel, otherPixel){
        let returnCoords = []
        if (pixel.dirUpdate !== pixelTicks){
            pixel.visitedDirs = [];
            pixel.dirUpdate = pixelTicks;
        }
        let dir = [otherPixel.x-pixel.x, otherPixel.y-pixel.y]
        if (pixel.visitedDirs.includes(dir.join(","))){
            return []
        } else {pixel.visitedDirs.push(dir.join(","))}
        pixel.iCharge = 10
        if (!isEmpty(pixel.x-dir[0], pixel.y-dir[1], true)){
            let spreadPixel = pixelMap[pixel.x-dir[0]][pixel.y-dir[1]]
            if (elements[spreadPixel.element].iConduct && spreadPixel.lastUpdate < pixelTicks){
                returnCoords.push([spreadPixel.x, spreadPixel.y, pixel])
            }
            if (elements[spreadPixel.element].conduct && !spreadPixel.chargeCD && !spreadPixel.charge){
                chargePixel(spreadPixel)
            }
        }
        return returnCoords
    },
    renderer: function(pixel, ctx){
        let _rgb = getPixelColor(pixel.color);
        let _hsv = RGBtoHSV(parseInt(_rgb[0]), parseInt(_rgb[1]), parseInt(_rgb[2]))
        _hsv.v = _hsv.v*((Math.max(pixel.iCharge, 0)/10)*0.6+0.4)
        let _rgb2 = HSVtoRGB(_hsv.h, _hsv.s, _hsv.v)
        let _hex = RGBToHex([Math.floor(_rgb2.r), Math.floor(_rgb2.g), Math.floor(_rgb2.b)])
        drawSquare(ctx, _hex, pixel.x, pixel.y)
    },
    movable: false
}
elements.iwifi_transmitter = {
    color: "#85ec8e",
    iConduct: 1,
    name: "i-WiFi Transmitter",
    behavior: behaviors.WALL,
    category: "instant machines",
    properties: {lastUpdate:0, cooldown: 0},
    onSelect: async function(){
        let ans = await _nousersthingsprompt("What should the channel of this transmitter be?", 0)
        if (typeof ans != "undefined"){
            currentElementProp = {channel:ans}
        }
    },
    tick: function(pixel){
        iCooldownTick(pixel, 0)
    },
    iUpdate: function(pixel, otherPixel){
        let returnCoords = [].concat(iUpdateCooldown(pixel, 4)||[])
        let wifipixels = currentPixels.filter(function(pixelToCheck) {
            if (pixelToCheck.element == "iwifi_receiver" && pixelToCheck.channel === pixel.channel && pixelToCheck.lastUpdate < pixelTicks){
                return true;
            }
        })
        for (let i = 0; i < wifipixels.length; i++) {
            let newPixel = wifipixels[i];
            returnCoords.push([newPixel.x, newPixel.y, pixel])
        }
        return returnCoords
    },
    movable: false
}
elements.iwifi_receiver = {
    color: "#b4db6a",
    iConduct: 1,
    name: "i-WiFi Receiver",
    category: "instant machines",
    behavior: behaviors.WALL,
    properties: {lastUpdate:0, cooldown:0},
    onSelect: async function(){
        let ans = await _nousersthingsprompt("What should the channel of this transmitter be?", 0)
        if (typeof ans != "undefined"){
            currentElementProp = {channel:ans}
        }
    },
    iUpdate: function(pixel, otherPixel){
        let returnCoords = []
        console.log("attempt")
        if (!(otherPixel.element == "iwifi_transmitter" || (otherPixel.x == pixel.x && otherPixel.y == pixel.y))){console.log("fail");return []}
        console.log("success")
        pixel.iCharge = 1
        pixel.lastUpdate = pixelTicks
        for (let i of adjacentCoords){
            let x = pixel.x + i[0]
            let y = pixel.y + i[1]
            if (!isEmpty(x, y, true)){
                let spreadPixel = pixelMap[x][y]
                if (elements[spreadPixel.element].iConduct && pixel.lastUpdate > spreadPixel.lastUpdate){
                    returnCoords.push([spreadPixel.x, spreadPixel.y, pixel])
                }
                if (elements[spreadPixel.element].conduct && !spreadPixel.chargeCD && !spreadPixel.charge){
                    chargePixel(spreadPixel)
                }
            }
        }
        return returnCoords
    },
    movable: false
}
elements.ilamp = {
    color: "#ff0000",
    iConduct: 1,
    customColor: true,
    name: "i-Lamp",
    category: "instant machines",
    behavior: behaviors.WALL,
    properties: {lastUpdate: 0, cooldown: 0},
    grain: 0,
    tick: function(pixel){
        iCooldownTick(pixel, -2)
    },
    iUpdate: function(pixel, otherPixel){
        return iUpdateCooldown(pixel, 12)
    },
    renderer: function(pixel, ctx){
        let _rgb = getPixelColor(pixel.color);
        let _hsv = RGBtoHSV(parseInt(_rgb[0]), parseInt(_rgb[1]), parseInt(_rgb[2]))
        _hsv.v *= (Math.min((((Math.max(pixel.cooldown+4, 0)))/12),1)*0.8+0.2)
        let _rgb2 = HSVtoRGB(_hsv.h, _hsv.s, _hsv.v)
        let _hex = RGBToHex([Math.floor(_rgb2.r), Math.floor(_rgb2.g), Math.floor(_rgb2.b)])
        drawSquare(ctx, _hex, pixel.x, pixel.y)
    },
    movable: false
}
elements.iswitch = {
    color: "#cd70e4",
    iConduct: 1,
    name: "i-Switch",
    category: "instant machines",
    onSelect: () => {logMessage("Only works for conducting straight across.")},
    behavior: behaviors.WALL,
    properties: {lastUpdate: 0, cooldown: 1, dir: [0, 0], iCharge:0},
    tick: function(pixel){
        if (pixel.iCharge === 1){
            let x = pixel.x - pixel.dir[0]
            let y = pixel.y - pixel.dir[1]
            if (!isEmpty(x, y, true)){
                let spreadPixel = pixelMap[x][y]
                if (elements[spreadPixel.element].iConduct && spreadPixel.cooldown <= 0){
                    iUpdateAll(spreadPixel)
                }
                if (elements[spreadPixel.element].conduct && !spreadPixel.chargeCD && !spreadPixel.charge){
                    chargePixel(spreadPixel)
                }
            }
        }
    },
    iUpdate: function(pixel, otherPixel){
        if (pixel.dir[0] == 0 && pixel.dir[1] == 0){
            pixel.dir = [otherPixel.x-pixel.x, otherPixel.y-pixel.y]
        }
        if (otherPixel.x-pixel.x == pixel.dir[0] && otherPixel.y-pixel.y == pixel.dir[1]){pixel.iCharge = pixel.iCharge == 1 ? 0 : 1} 
        return []
    },
    movable: false
}
const oldShockTool = elements.shock.tool;
elements.shock.tool = function(pixel){
    oldShockTool(pixel);
    if (elements[pixel.element].iConduct && pixel.cooldown <= 0){
        iUpdateAll(pixel)
    }
}
elements.heat_pipe = {
    color: "#25117a",
    behavior: behaviors.WALL,
    category: "machines",
    movable: false,
    onSelect: () => {logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole.");},
    onShiftSelect: async () => {
        let ans1 = await _nousersthingsprompt("How much heat should be absorbed at once?", 5)
        ans1 = isNaN(parseFloat(ans1)) ? 5 : parseFloat(ans1)
        let ans2 = await _nousersthingsprompt("At what temperature should it stop trying to absorb heat from the input?", -273.15)
        ans2 = isNaN(parseFloat(ans2)) ? 5 : parseFloat(ans2)
        let ans3 = await _nousersthingsprompt("Please type true or false for yes or no. Should equalizing mode be on?")
        ans3 = (ans3=="true") ? true : false
        currentElementProp = {packetSize: ans1, cutoff: ans2, mode: ans3}
    },
    insulate: true,
    tick: function(pixel){if (!pixel.stage && pixelTicks-pixel.start > 60) {
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
					deletePixel(x,y)
				}
				if (isEmpty(x,y)) {
					createPixel("pipe_wall",x,y);
                    pixelMap[x][y].color = pixelColorPick(pixelMap[x][y],"#270f47");
				}
			}
			pixel.color = pixelColorPick(pixel,"#140725");
			pixel.stage = 1;
		}
		else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
			for (var i = 0; i < adjacentCoords.length; i++) {
				var coord = adjacentCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (isEmpty(x,y)) {
					pixel.stage = 2; //blue
                    pixel.mode = -1;
					pixel.color = pixelColorPick(pixel,"#2b0ba0");
					break;
				}
			}
		}
		else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
			for (var i = 0; i < squareCoords.length; i++) {
				var coord = squareCoords[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true) && pixelMap[x][y].element === "heat_pipe") {
					var newPixel = pixelMap[x][y];
					if (newPixel.stage === 1) {
						var newColor;
						switch (pixel.stage) {
							case 2: newPixel.stage = 3; newColor = "#760ba0"; break; //green
							case 3: newPixel.stage = 4; newColor = "#4c0ba0"; break; //red
							case 4: newPixel.stage = 2; newColor = "#2b0ba0"; break; //blue
						}
						newPixel.color = pixelColorPick(newPixel,newColor);
					}
				}
			}
			var moved = false;
			shuffleArray(squareCoordsShuffle);
			for (var i = 0; i < squareCoordsShuffle.length; i++) {
				var coord = squareCoordsShuffle[i];
				var x = pixel.x+coord[0];
				var y = pixel.y+coord[1];
				if (!isEmpty(x,y,true)) {
					var newPixel = pixelMap[x][y];
					if (newPixel.element === "heat_pipe") {
						var nextStage;
						switch (pixel.stage) {
							case 2: nextStage = 4; break; //green
							case 3: nextStage = 2; break; //red
							case 4: nextStage = 3; break; //blue
						}
						if (pixel.cont && !newPixel.cont && newPixel.stage === nextStage) { //transfer to adjacent pipe
							newPixel.cont = pixel.cont;
							pixel.cont = null;
							moved = true;
							break;
						}
					}
					else if (!pixel.cont && !elements[newPixel.element].insulate) { //suck up pixel
						pixel.cont = (newPixel.temp - Math.max(newPixel.temp-(typeof pixel.packetSize != "undefined" ? pixel.packetSize : 5), (typeof pixel.cutoff != "undefined" ? pixel.cutoff : currentSaveData.abszero)));
                        if (!pixel.mode && pixel.cont < 0){pixel.cont = null; break;}
                        if (pixel.mode < 0){pixel.cont = null; break;}
                        if (Math.round(3*Math.abs(pixel.cont)) < 1){pixel.cont = null; break;}
                        pixel.cont = Math.round(4*pixel.cont)/4
						newPixel.temp -= pixel.cont
						moved = true;
						break;
					}
				}
			}
			if (pixel.cont && !moved) { // move to same stage if none other
				for (var i = 0; i < squareCoordsShuffle.length; i++) {
					var coord = squareCoordsShuffle[i];
					var x = pixel.x+coord[0];
					var y = pixel.y+coord[1];
                    if (!isEmpty(x, y, true) && pixelMap[x][y].element == "heat_pipe" && !pixelMap[x][y].cont){
                        pixelMap[x][y].cont = pixel.cont
                        pixel.cont = null
                        break;
                    }
					if (!isEmpty(x,y,true) && !elements[pixelMap[x][y].element].insulate) {
						pixelMap[x][y].temp += pixel.cont
						pixel.cont = null;
						break;
					}
				}
			}
		}
	},
    renderer: function(pixel, ctx){
        drawDefault(ctx,pixel);
		if (viewInfo[view].colorEffects !== true) return;
        if (!pixel.cont) return;
        const d = new Date()
        drawSquare(ctx, "#FF0000", pixel.x, pixel.y, undefined, 0.3 + 0.7*((Math.sin(d.getTime()*0.002)+1)/2))
    }
}
elements.i_clockwise = {
    color: "#ffd23d",
    name: "i-Clockwise Rotator",
    category: "instant machines",
    behavior: behaviors.WALL,
    properties: {
        lastUpdate: 0,
        dirUpdate: 0,
        visitedDirs: []
    },
    iConduct: 1,
    iUpdate: function(pixel, otherPixel){
        let returnCoords = []
        if (pixel.dirUpdate !== pixelTicks){
            visitedDirs = [];
            pixel.dirUpdate = pixelTicks;
        }
        let dir = [otherPixel.x-pixel.x, otherPixel.y-pixel.y]
        if (visitedDirs.includes(dir.join(","))){
            return []
        } else {visitedDirs.push(dir.join(","))}
        dir = [-(otherPixel.y-pixel.y), otherPixel.x-pixel.x]
        visitedDirs.push(dir.join(","))
        if (!isEmpty(pixel.x+dir[0], pixel.y+dir[1], true)){
            let spreadPixel = pixelMap[pixel.x+dir[0]][pixel.y+dir[1]]
            if (elements[spreadPixel.element].iConduct && spreadPixel.lastUpdate < pixelTicks){
                returnCoords.push([spreadPixel.x, spreadPixel.y, pixel])
            }
            if (elements[spreadPixel.element].conduct && !spreadPixel.chargeCD && !spreadPixel.charge){
                chargePixel(spreadPixel)
            }
        }
        return returnCoords
    },
    movable: false
}
elements.i_counterclockwise = {
    color: "#855be9",
    name: "i-CounterClockwise Rotator",
    category: "instant machines",
    behavior: behaviors.WALL,
    properties: {
        lastUpdate: 0,
        dirUpdate: 0,
        visitedDirs: []
    },
    iConduct: 1,
    iUpdate: function(pixel, otherPixel){
        let returnCoords = []
        if (pixel.dirUpdate !== pixelTicks){
            visitedDirs = [];
            pixel.dirUpdate = pixelTicks;
        }
        let dir = [otherPixel.x-pixel.x, otherPixel.y-pixel.y]
        if (visitedDirs.includes(dir.join(","))){
            return []
        } else {visitedDirs.push(dir.join(","))}
        dir = [otherPixel.y-pixel.y, -(otherPixel.x-pixel.x)]
        visitedDirs.push(dir.join(","))
        if (!isEmpty(pixel.x+dir[0], pixel.y+dir[1], true)){
            let spreadPixel = pixelMap[pixel.x+dir[0]][pixel.y+dir[1]]
            if (elements[spreadPixel.element].iConduct && spreadPixel.lastUpdate < pixelTicks){
                returnCoords.push([spreadPixel.x, spreadPixel.y, pixel])
            }
            if (elements[spreadPixel.element].conduct && !spreadPixel.chargeCD && !spreadPixel.charge){
                chargePixel(spreadPixel)
            }
        }
        return returnCoords
    },
    movable: false
}