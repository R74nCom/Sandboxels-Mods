// ==========================================
// PRESSURIZED BOILING & CONDENSATION MOD
// ==========================================

// 1. Remove default state changes so they don't override our custom logic
delete elements.water.stateHigh;
delete elements.steam.stateLow;

// 2. Preserve original physics/movement ticks for both elements
var oldWaterTick = elements.water.tick;
var oldSteamTick = elements.steam.tick;

// ==========================================
// WATER BEHAVIOR: Pressure & 2x Expansion
// ==========================================
elements.water.tick = function(pixel) {
    // Run normal water movement first
    if (oldWaterTick) oldWaterTick(pixel);

    // Sandboxels default water boiling temp is 100
    var boilingTemp = elements.water.tempHigh || 100;

    if (pixel.temp >= boilingTemp) {
        var emptySpots = [];
        var directions = [
            [0, -1], [0, 1], [-1, 0], [1, 0],
            [-1, -1], [1, -1], [-1, 1], [1, 1]
        ];

        // Look for empty space around the water
        for (var i = 0; i < directions.length; i++) {
            var nx = pixel.x + directions[i][0];
            var ny = pixel.y + directions[i][1];
            if (isEmpty(nx, ny)) {
                emptySpots.push({ x: nx, y: ny });
            }
        }

        // NO EMPTY SPACE = NO BOILING (Pressure Lock)
        if (emptySpots.length === 0) return;

        var currentTemp = pixel.temp;

        // Convert the current water pixel to steam
        changePixel(pixel, "steam");

        // Expand! Create a 2nd steam pixel in an adjacent empty spot
        var spot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
        createPixel("steam", spot.x, spot.y);
        
        // Make sure the new steam pixel matches the boiling temperature
        if (pixelMap[spot.x] && pixelMap[spot.x][spot.y]) {
            pixelMap[spot.x][spot.y].temp = currentTemp;
        }
    }
};

// ==========================================
// STEAM BEHAVIOR: 2-to-1 Volume Contraction
// ==========================================
elements.steam.tick = function(pixel) {
    // Run normal steam movement first
    if (oldSteamTick) oldSteamTick(pixel);

    // Sandboxels default steam condensing temp is 95
    var condenseTemp = elements.steam.tempLow || 95;

    if (pixel.temp < condenseTemp) {
        var steamNeighbors = [];
        var directions = [
            [0, -1], [0, 1], [-1, 0], [1, 0],
            [-1, -1], [1, -1], [-1, 1], [1, 1]
        ];

        // Look for other steam pixels to merge with
        for (var i = 0; i < directions.length; i++) {
            var nx = pixel.x + directions[i][0];
            var ny = pixel.y + directions[i][1];
            if (!isEmpty(nx, ny) && pixelMap[nx] && pixelMap[nx][ny] && pixelMap[nx][ny].element === "steam") {
                steamNeighbors.push(pixelMap[nx][ny]);
            }
        }

        if (steamNeighbors.length > 0) {
            // MERGE: Delete a neighboring steam pixel, turn current one to water
            var partner = steamNeighbors[0];
            deletePixel(partner.x, partner.y);
            changePixel(pixel, "water");
        } else {
            // ISOLATED: If no other steam is around, randomly condense or vanish 
            // (prevents 1 steam from infinitely turning back into 1 water)
            if (Math.random() < 0.5) {
                changePixel(pixel, "water");
            } else {
                deletePixel(pixel.x, pixel.y);
            }
        }
    }
};

