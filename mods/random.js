// Define a list of target base metals
const baseMetals = ["iron", "copper", "gold", "silver", "tin", "aluminum", "lead", "mercury", "nickel", "zinc"];

elements.transmuter = {
    color: "#ffd700", // Gold color as placeholder
    behavior: behaviors.POWDER,
    category: "land",
    state: "solid",
    tick: function(pixel) {
        // Randomly select a metal
        const target = baseMetals[Math.floor(Math.random() * baseMetals.length)];
        
        // Replace the current pixel with the target element
        // changePixel(pixel, target) is a common built-in function used to transform pixels
        changePixel(pixel, target);
    }
};