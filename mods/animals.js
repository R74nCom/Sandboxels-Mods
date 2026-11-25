elements.snake = {
    color: "#1ca906",
    behavior: [
        "SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,mulch,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand%3|XX|SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,mulch,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand%3",
        "M2%10|XX|M2%10",
        "SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,mulch,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand%3|M1|SW:dirt,sand,gravel,ash,mycelium,mud,wet_sand,clay_soil,mulch,water,salt_water,dirty_water,primordial_soup,blood,infection,color_sand%3"
    ],
    reactions: {
        "rat": { elem2: "mud", chance: 0.001 }
    },
    category: "life",
    state: "solid",
    onPlace: function(pixel) {
        // 1. Clean up existing segments to prevent overlap
        if (!isEmpty(pixel.x - 1, pixel.y, true) && pixelMap[pixel.x - 1][pixel.y].element === "head") {
            deletePixel(pixel.x - 1, pixel.y);
        }
        else if (!isEmpty(pixel.x + 1, pixel.y, true) && pixelMap[pixel.x + 1][pixel.y].element === "body") {
            deletePixel(pixel.x + 1, pixel.y);
        }

        // 2. Horizontal Movement Logic
        if (isEmpty(pixel.x + 1, pixel.y)) {
            var color = pixel.color;
            changePixel(pixel, "body"); // Change current to body
            createPixel("head", pixel.x + 1, pixel.y); // Create new head to the right
            pixelMap[pixel.x + 1][pixel.y].color = color;
        } 
        else if (isEmpty(pixel.x - 1, pixel.y)) {
            var color = pixel.color;
            changePixel(pixel, "body"); // Change current to body
            createPixel("head", pixel.x - 1, pixel.y); // Create new head to the left
            pixelMap[pixel.x - 1][pixel.y].color = color;
        } 
        else {
            deletePixel(pixel.x, pixel.y);
        }
    }
};
