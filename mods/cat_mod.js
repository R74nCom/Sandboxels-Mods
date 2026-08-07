// Register the Cat element
elements.cat = {
    color: "#d4a373", // Orange tabby cat colour
    category: "animals",
    behavior: behaviors.POWDER, // Falls due to gravity like sand
    tick: function(pixel) {
        // Randomly walk left or right
        let moveX = Math.random() < 0.5 ? -1 : 1;
        if (isEmpty(pixel.x + moveX, pixel.y)) {
            movePixel(pixel.x, pixel.y, pixel.x + moveX, pixel.y);
        }

        // Knock over nearby vases
        let neighbors = [
            {x: pixel.x + 1, y: pixel.y},
            {x: pixel.x - 1, y: pixel.y}
        ];
        for (let n of neighbors) {
            if (getPixel(n.x, n.y)?.element === "vase") {
                deletePixel(n.x, n.y); // Break the vase
                explode(n.x, n.y, 3);   // Create a small explosion effect
            }
        }
    },
    desc: "A furry friend that wanders around and knocks over vases.",
};

// Register a Vase element to test the cat's behaviour
elements.vase = {
    color: "#8ecae6",
    category: "solids",
    behavior: behaviors.WALL, // Stays put until broken
    desc: "A fragile ceramic vase. Keep away from cats.",
};
