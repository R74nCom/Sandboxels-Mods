elements.atomizing_nozzle = {
    color: "#a1a1a1",
    behavior: behaviors.WALL,
    category: "machines",
    desc: "Sprays liquids entering from above out of the bottom as a fine, pressurized mist.",
    tick: function(pixel) {
        // 1. Detect if there is a liquid directly above the nozzle
        if (!isEmpty(pixel.x, pixel.y - 1, true)) {
            let topPixel = pixelMap[pixel.x][pixel.y - 1];
            let topElement = elements[topPixel.element];

            // 2. Process only if the top element is a liquid
            if (topElement && topElement.state === "liquid") {
                // Determine what gas/mist it turns into (fallback to steam)
                let mistElement = topElement.stateHigh || "steam"; 
                
                // 3. Look for empty space below the nozzle to spray into
                // Checks three spaces underneath (bottom-left, bottom, bottom-right)
                let sprayTargets = [
                    {x: pixel.x - 1, y: pixel.y + 1},
                    {x: pixel.x,     y: pixel.y + 1},
                    {x: pixel.x + 1, y: pixel.y + 1}
                ];

                // Shuffle targets to randomize the spray direction
                sprayTargets.sort(() => Math.random() - 0.5);

                for (let target of sprayTargets) {
                    if (isEmpty(target.x, target.y)) {
                        // Delete the liquid pixel from the top
                        deletePixel(topPixel.x, topPixel.y);
                        
                        // Spawn the mist pixel below with high scattered velocity
                        createPixel(mistElement, target.x, target.y);
                        let newPixel = pixelMap[target.x][target.y];
                        
                        // Apply velocity so it sprays outward like an aerosol
                        newPixel.vx = (target.x - pixel.x) * 3 + (Math.random() * 2 - 1);
                        newPixel.vy = 4 + (Math.random() * 2); 
                        break; // Process one pixel per tick to keep it flowing smoothly
                    }
                }
            }
        }
    }
};
