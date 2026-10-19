elements.condenser = {
    color: "#4a75a0",
    behavior: behaviors.WALL,
    category: "machines",
    onTick: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var neighbor = pget(pixel.x + adjacentCoords[i].x, pixel.y + adjacentCoords[i].y);
            // If the neighbor is steam, snap its temp to 25C room temperature
            if (neighbor && neighbor.element === "steam") {
                neighbor.temperature = 25; 
            }
        }
    }
};
