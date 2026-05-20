// Highly Reactive Cyan Plutonium Fuel for Sandboxels
elements.plutonium_fuel = {
    color: ["#00FFFF", "#00E5E5", "#00CCCC"], // Bright cyan
    behavior: behaviors.WALL, 
    category: "energy",
    state: "solid",
    density: 19816,
    
    // Temperature mechanics
    tempHigh: 400, // Raised threshold to 400 degrees
    stateHigh: "nuke", // Explodes into a nuke
    
    // Heating reaction
    reactions: {
        "neutron": {
            func: function(pixel1, pixel2) {
                // Increased by 3x: now heats up 30 degrees per contact tick
                pixel1.temp += 280; 
            }
        }
    },
    
    // Constant behavior that runs every frame
    tick: function(pixel) {
        // Pick a random adjacent spot
        let offsetX = Math.floor(Math.random() * 3) - 1;
        let offsetY = Math.floor(Math.random() * 3) - 1;
        let targetX = pixel.x + offsetX;
        let targetY = pixel.y + offsetY;
        
        // Ensure the spot is empty before spawning anything
        if (isEmpty(targetX, targetY)) {
            let rand = Math.random();
            
            // Greatly increased neutron emission (15% chance per tick)
            if (rand < 0.15) { 
                createPixel("neutron", targetX, targetY);
            } 
            // Constantly generate radiation (10% chance per tick)
            else if (rand < 0.25) { 
                createPixel("radiation", targetX, targetY);
            }
        }
    }
};