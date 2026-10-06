// To create a mod:
// Create a new Javascript file like this one.
// Add the file to the mods folder on GitHub, or host it somewhere else.
// https://github.com/R74nCom/sandboxels/tree/main/mods

// To learn about modding, check the wiki: https://sandboxels.wiki.gg/wiki/Modding
// Or join our Discord: https://r74n.com/discord/

// To add it in the Mod Manager:
// If it is in the mods folder, you can just use the name of the file. (example_mod.js)
// If it is hosted somewhere else, you can use the full URL, including the HTTPS://.

// Adding elements:
elements.brimstone = {
    color: "#ff0000",
    behavior: [
        "DB|DB|DB",
        "DB|DB|DB",
        "DB|M1|DB"
    ],
    category: "Isaac",
    state: "solid",
    density: 1100,
    viscosity: 100000000,
    temp: 10000000000000,
        tick: function(pixel) {
        // 1% chance every frame to decay into "ash"
        if (Math.random() < 0.03) { 
            // Use "deletePixel(pixel.x, pixel.y)" if you want it to disappear completely
            changePixel(pixel, "blood"); 
        }
            // Tries to move down 3 pixels per tick instead of 1
        tryMove(pixel, pixel.x, pixel.y + 1);
        tryMove(pixel, pixel.x, pixel.y + 1);
        tryMove(pixel, pixel.x, pixel.y + 1);
    }
    
}

elements.Soymilk = {
    color: "#ffe7c8",
    behavior: behaviors.LIQUID,
    category: "Isaac",
    state: "liquid",
    density: 1100,
    viscosity: 1000,

        tick: function(pixel) {
        // 1% chance every frame to decay into "ash"
            // Tries to move down 3 pixels per tick instead of 1
        tryMove(pixel, pixel.x, pixel.y + 1);
        tryMove(pixel, pixel.x, pixel.y + 1);
        tryMove(pixel, pixel.x, pixel.y + 1);
    },
        reactions:  {  "salt_water": { elem1: null, elem2: "tears", chance: 0.1 }},  "blood": { elem1: null, elem2: "soybrim", chance: 0.1 }
    
}

elements.tears = {
    color: "#a1fcff",
    behavior: behaviors.LIQUID,
    category: "Isaac",
    state: "liquid",
    density: 1100,
    viscosity: 1000,
}

elements.soybrim = {
    color: "#ffcec8",
    behavior: behaviors.LIQUID,
        category: "hidden",
        hidden: true,
    state: "liquid",
    density: 1100,
    viscosity: 1000,
    temp: 1000,
        tick: function(pixel) {
        // 1% chance every frame to decay into "ash"
            // Tries to move down 3 pixels per tick instead of 1
        tryMove(pixel, pixel.x, pixel.y + 1);
        tryMove(pixel, pixel.x, pixel.y + 1);
        tryMove(pixel, pixel.x, pixel.y + 1);
    },
      reactions:  {  "cold_fire": { elem1: null, elem2: "icebrim", chance: 0.1 },   "icebrim": { elem1: null, elem2: "icebrim", chance: 0.5 }}
}

elements.icebrim = {
    color: "#76cdff",
    behavior: behaviors.LIQUID,
    category: "Isaac",
    hidden: true,
    state: "solid",
    density: 1100,
    viscosity: 100000000,
    temp: -10000000000000,
        tick: function(pixel) {
        // 1% chance every frame to decay into "ash"

            // Tries to move down 3 pixels per tick instead of 1
        tryMove(pixel, pixel.x, pixel.y + 1);
        tryMove(pixel, pixel.x, pixel.y + 1);
        tryMove(pixel, pixel.x, pixel.y + 1);
    }
    
}


// Add reactions to existing elements:
// Include this block once to ensure the property exists
elements.wall.reactions.tears  = { "elem1":null, "elem2":"icebrim" };


// Custom element renderers:
elements.brimstone.renderer = function(pixel,ctx) {
    // Draw three horizontal squares
    drawSquare(ctx,"#ff0000",pixel.x-1,pixel.y);
    drawSquare(ctx,"#c50000",pixel.x,pixel.y);
    drawSquare(ctx,"#ff2323",pixel.x+1,pixel.y);
};
// See 1.10example.js for more rendering examples.