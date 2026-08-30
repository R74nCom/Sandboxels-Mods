elements.golden_virus = {
    color: "#ffcc00",
    behavior: behaviors.WALL, // It stays in place like a virus growth
    category: "special",
    state: "solid",
    density: 1000,
    insulator: true,
    tick: function(pixel) {
        // Define the neighbors to check (Up, Down, Left, Right)
        var neighbors = [
            [pixel.x + 1, pixel.y],
            [pixel.x - 1, pixel.y],
            [pixel.x, pixel.y + 1],
            [pixel.x, pixel.y - 1]
        ];

        for (var i = 0; i < neighbors.length; i++) {
            var nx = neighbors[i][0];
            var ny = neighbors[i][1];

            // Check if the neighbor is within bounds
            if (isEmpty(nx, ny, true)) {
                continue; // Skip if it's air or out of bounds
            }

            // Get the pixel at the neighbor's position
            var targetPixel = pixelMap[nx][ny];

            // If it's not air and not already the Golden Virus, convert it!
            if (targetPixel && targetPixel.element !== "golden_virus") {
                changePixel(targetPixel, "golden_virus");
            }
        }
    }
};