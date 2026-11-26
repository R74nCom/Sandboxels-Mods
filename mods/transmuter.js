// Define a list of confirmed base metal element IDs
const baseMetals = ["iron", "copper", "gold", "silver", "tin", "lead", "mercury"];

elements.transmuter = {
    color: "#ffd700",
    behavior: behaviors.POWDER,
    category: "land", // Must have a category to appear in the element bar
    state: "solid",
    tick: function(pixel) {
        // Randomly select a metal
        const target = baseMetals[Math.floor(Math.random() * baseMetals.length)];
        // Transform the current pixel
        changePixel(pixel, target);
    }
};
