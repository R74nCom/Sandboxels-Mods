behaviors.GEL = function(pixel) {
    doDefaults(pixel)
    pixel.sticky = true
    let sticking = false

    // -y
    if ( !isEmpty(pixel.x, pixel.y-1) & getPixel(pixel.x, pixel.y-1) != null ) {
        let stickPixel = getPixel(pixel.x, pixel.y-1)

        if ( !stickPixel.sticky & elements[stickPixel.element].state != "gas" ) {
            sticking = true
            return
        }
    }

    // -x
    if ( !isEmpty(pixel.x-1, pixel.y) & getPixel(pixel.x-1, pixel.y) != null ) {
        let stickPixel = getPixel(pixel.x-1, pixel.y)
        let behindPixel = getPixel(pixel.x-2, pixel.y)

        if ( !stickPixel.sticky & elements[stickPixel.element].state != "gas" ) {
            sticking = true
            tryMove(pixel, pixel.x-1, pixel.y+1)
            return
        } else if (behindPixel != null & stickPixel.sticky) {
            if (!behindPixel.sticky & elements[behindPixel.element].state != "gas") {
                //sticking = true
                tryMove(pixel, pixel.x-1, pixel.y+1)
            }
        }
    }
    // +x
    if ( !isEmpty(pixel.x+1, pixel.y) & getPixel(pixel.x+1, pixel.y) != null ) {
        let stickPixel = getPixel(pixel.x+1, pixel.y)
        let behindPixel = getPixel(pixel.x+2, pixel.y)

        if ( !stickPixel.sticky & elements[stickPixel.element].state != "gas" ) {
            sticking = true
            tryMove(pixel, pixel.x+1, pixel.y+1)
            return
        } else if ( behindPixel != null & stickPixel.sticky ) {
            if (!behindPixel.sticky & elements[behindPixel.element].state != "gas" ) {
                //sticking = true
                tryMove(pixel, pixel.x+1, pixel.y+1)
            }
        }
    }




    if ( !isEmpty(pixel.x, pixel.y+1) ) {
        let stickPixel = getPixel(pixel.x, pixel.y+1)
        if (stickPixel != null) {
            if ( !stickPixel.sticky & elements[stickPixel.element].state != "gas" ) {
                sticking = true
            }
        } else {
            sticking = true
        }
    }

    // normal fall
    if (!tryMove(pixel, pixel.x, pixel.y+1) & Math.random() > 0.2 ) {
        if (!tryMove(pixel, pixel.x+1, pixel.y+1)) {
            tryMove(pixel, pixel.x-1, pixel.y+1)
        }
    } else {
        return
    }

    // the umm wandering thing
    if (Math.random() < 0.2) {
        if (sticking) {return}

        if (Math.random() > 0.5) {
            tryMove(pixel, pixel.x+1, pixel.y)
        } else {
            tryMove(pixel, pixel.x-1, pixel.y)
        }
    }
}

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
    category: "solids",
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
