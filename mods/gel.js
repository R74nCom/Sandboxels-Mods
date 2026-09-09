let maxSticky = 5

let tryStick = function(pixel) {
    if (pixel === null) {return false}

    let element = pixel.element
    let x = pixel.x
    let y = pixel.y

    let offsets = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ]

    let sticky = 0
    for (const offset of offsets) {
        x2 = x + offset[0]
        y2 = y + offset[1]

        if (getPixel(x2, y2) && !canMove(pixel, x2, y2)) {
            if (elements[getPixel(x2, y2).element].behavior !== elements[element].behavior) {
                let state = elements[getPixel(x2, y2).element].state
                if (state === "liquid" || state === "gas") {
                    continue
                } else {
                    sticky = maxSticky
                }
            } else if (getPixel(x2, y2).sticky && getPixel(x2, y2).sticky - 1 > sticky) {
                sticky = getPixel(x2, y2).sticky - 1
            }
        }
    }
    pixel.sticky = sticky
    return sticky > 0
}

behaviors.GEL = function(pixel) {
    if (pixel.start === pixelTicks) {return}
	if (pixel.charge !== undefined && elements[pixel.element].behaviorOn !== undefined) {
		pixelTick(pixel);
		return;
	}

    let x = pixel.x
    let y = pixel.y

    if (!tryStick(pixel)) {
        if (!tryMove(pixel, x, y+1) && Math.random() > 0.5) {
            if (Math.random() > 0.5) {
                tryMove(pixel, x-1, y+1)
            } else {
                tryMove(pixel, x+1, y+1)
            }
            
        }
    }

    doDefaults(pixel)
}

// normal gel

elements.gel = {
    color: "#f7c472",
    behavior: behaviors.GEL,
    category: "liquids",
    state: "liquid",
    tempHigh: 600,
    stateHigh: "gel_gas",
    tempLow: -100,
    stateLow: "gel_ice",
    density: 1450,
    stain: 0.05,
    viscosity: 5000,
}

elements.gel_ice = {
    color: "#fad38c",
    behavior: behaviors.WALL,
    category: "states",
    state: "solid",
    tempHigh: -95,
    stateHigh: "gel",
    density: 917,
}

elements.gel_gas = {
    color: "#f0a418",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    tempLow: 595,
    stateLow: "gel",
    density: 0.6,
}

// explosive gel

elements.explosive_gel = {
    color: "#fc0c30",
    behavior: behaviors.GEL,
    behaviorOn: [
		"XX|XX|XX",
		"XX|EX:10|XX",
		"XX|XX|XX"
	],
    conduct: 1,
	burn: 100,
	burnTime: 1,
	burnInto: "explosion",
    category: "weapons",
    state: "liquid",
    tempHigh: 600,
    stateHigh: "explosion",
    tempLow: -100,
    stateLow: "explosive_gel_ice",
    density: 1450,
    stain: 0.05,
    viscosity: 5000,
}

elements.explosive_gel_ice = {
    color: "#f94560",
    behavior: behaviors.WALL,
    category: "states",
    state: "solid",
    tempHigh: -95,
    stateHigh: "explosive_gel",
    density: 917,
}