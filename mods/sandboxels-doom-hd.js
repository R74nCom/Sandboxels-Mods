// sandboxels-doom-hd.js
// A lightweight "HD Doom" style mod for Sandboxels.
// Drop this file into your Sandboxels mods folder and enable it.
//
// Features:
// - Higher resolution wall texture behavior
// - Structured level generation
// - Clear player spawn
// - Start with a pistol
// - Better enemy behavior
// - Ammo pickups
// - Cleaner map layout
//
// Requires Sandboxels + original Doom-style gameplay support.
// This mod does NOT replace the original Doom mod;
// it enhances gameplay around it.

(() => {

    // -----------------------------
    // SETTINGS
    // -----------------------------

    const HD_WALL_COLOR_1 = "#4b4b4b";
    const HD_WALL_COLOR_2 = "#5c5c5c";
    const FLOOR_COLOR = "#232323";
    const START_COLOR = "#4caf50";

    const MAP_W = 80;
    const MAP_H = 50;

    // -----------------------------
    // SAFE HELPERS
    // -----------------------------

    function setPixelSafe(x, y, element) {
        if (outOfBounds(x, y)) return;
        if (pixelMap[x][y]) deletePixel(x, y);
        createPixel(element, x, y);
    }

    function box(x1, y1, x2, y2, element) {
        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                setPixelSafe(x, y, element);
            }
        }
    }

    // -----------------------------
    // HD WALL
    // -----------------------------

    elements.hd_wall = {
        color: [HD_WALL_COLOR_1, HD_WALL_COLOR_2],
        behavior: behaviors.WALL,
        category: "doom_hd",
        state: "solid",
        hardness: 1,
        density: 9999,
        insulate: true,

        tick(pixel) {
            // subtle texture shimmer
            if (Math.random() < 0.01) {
                pixel.color = pixelColorPick(pixel,
                    Math.random() < 0.5
                        ? HD_WALL_COLOR_1
                        : HD_WALL_COLOR_2
                );
            }
        }
    };

    // -----------------------------
    // FLOOR
    // -----------------------------

    elements.hd_floor = {
        color: FLOOR_COLOR,
        behavior: behaviors.WALL,
        category: "doom_hd",
        state: "solid",
        hardness: 1,
        density: 9999
    };

    // -----------------------------
    // START TILE
    // -----------------------------

    elements.player_start = {
        color: START_COLOR,
        behavior: behaviors.WALL,
        category: "doom_hd",
        state: "solid",
        density: 9999
    };

    // -----------------------------
    // AMMO PICKUP
    // -----------------------------

    elements.ammo_box = {
        color: ["#d4b04f", "#f2d16b"],
        behavior: behaviors.POWDER,
        category: "doom_hd",
        state: "solid",

        tick(pixel) {

            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {

                    let nx = pixel.x + dx;
                    let ny = pixel.y + dy;

                    if (outOfBounds(nx, ny)) continue;

                    let other = pixelMap[nx][ny];

                    if (!other) continue;

                    if (other.element === "player") {

                        if (!other.ammo) other.ammo = 0;

                        other.ammo += 20;

                        deletePixel(pixel.x, pixel.y);

                        return;
                    }
                }
            }
        }
    };

    // -----------------------------
    // ENHANCED DEMON
    // -----------------------------

    elements.hd_demon = {
        color: ["#992222", "#bb3333"],
        category: "doom_hd",
        state: "solid",
        density: 2000,

        tick(pixel) {

            let dirs = [
                [1,0],[-1,0],[0,1],[0,-1]
            ];

            // seek player
            let nearest = null;
            let bestDist = Infinity;

            for (let dx = -10; dx <= 10; dx++) {
                for (let dy = -10; dy <= 10; dy++) {

                    let nx = pixel.x + dx;
                    let ny = pixel.y + dy;

                    if (outOfBounds(nx, ny)) continue;

                    let p = pixelMap[nx][ny];

                    if (p && p.element === "player") {

                        let d = Math.abs(dx) + Math.abs(dy);

                        if (d < bestDist) {
                            bestDist = d;
                            nearest = p;
                        }
                    }
                }
            }

            if (nearest) {

                let mx = Math.sign(nearest.x - pixel.x);
                let my = Math.sign(nearest.y - pixel.y);

                tryMove(pixel, pixel.x + mx, pixel.y + my);

                // attack
                if (bestDist <= 1) {

                    if (!nearest.health) nearest.health = 100;

                    nearest.health -= 5;

                    if (nearest.health <= 0) {
                        deletePixel(nearest.x, nearest.y);
                    }
                }

            } else {

                let dir = dirs[Math.floor(Math.random() * dirs.length)];

                tryMove(pixel, pixel.x + dir[0], pixel.y + dir[1]);
            }
        }
    };

    // -----------------------------
    // PLAYER OVERRIDE
    // -----------------------------

    if (elements.player) {

        let oldTick = elements.player.tick;

        elements.player.tick = function(pixel) {

            if (!pixel.health) pixel.health = 100;

            // Start armed
            if (!pixel.weapon) {
                pixel.weapon = "pistol";
            }

            if (!pixel.ammo) {
                pixel.ammo = 50;
            }

            // Shooting
            if (pixel.charge && pixel.ammo > 0) {

                let dirs = [
                    [1,0],[-1,0],[0,1],[0,-1]
                ];

                for (let i = 0; i < dirs.length; i++) {

                    let dx = dirs[i][0];
                    let dy = dirs[i][1];

                    for (let s = 1; s < 8; s++) {

                        let nx = pixel.x + dx * s;
                        let ny = pixel.y + dy * s;

                        if (outOfBounds(nx, ny)) break;

                        let target = pixelMap[nx][ny];

                        if (!target) continue;

                        if (target.element === "hd_demon") {

                            deletePixel(nx, ny);

                            pixel.ammo--;

                            break;
                        }

                        if (
                            target.element === "hd_wall" ||
                            target.element === "wall"
                        ) {
                            break;
                        }
                    }
                }
            }

            if (oldTick) oldTick(pixel);
        };
    }

    // -----------------------------
    // MAP GENERATION
    // -----------------------------

    function buildHDMap() {

        // outer walls
        box(5, 5, MAP_W, 6, "hd_wall");
        box(5, MAP_H, MAP_W, MAP_H + 1, "hd_wall");

        box(5, 5, 6, MAP_H, "hd_wall");
        box(MAP_W, 5, MAP_W + 1, MAP_H, "hd_wall");

        // floors
        box(7, 7, MAP_W - 2, MAP_H - 2, "hd_floor");

        // corridors
        box(20, 7, 22, 40, "hd_wall");
        box(40, 15, 42, MAP_H - 5, "hd_wall");
        box(55, 7, 57, 35, "hd_wall");

        // rooms
        box(10, 10, 18, 18, "hd_wall");
        box(25, 25, 35, 35, "hd_wall");
        box(60, 10, 72, 20, "hd_wall");

        // clear interiors
        box(11, 11, 17, 17, "hd_floor");
        box(26, 26, 34, 34, "hd_floor");
        box(61, 11, 71, 19, "hd_floor");

        // player spawn
        setPixelSafe(10, 40, "player");
        setPixelSafe(11, 40, "player_start");

        // ammo
        setPixelSafe(15, 15, "ammo_box");
        setPixelSafe(31, 31, "ammo_box");
        setPixelSafe(65, 15, "ammo_box");

        // enemies
        setPixelSafe(70, 40, "hd_demon");
        setPixelSafe(50, 20, "hd_demon");
        setPixelSafe(30, 12, "hd_demon");
    }

    // -----------------------------
    // AUTO BUILD
    // -----------------------------

    runAfterLoad(() => {

        setTimeout(() => {

            buildHDMap();

            logMessage("HD Doom map loaded.");
            logMessage("Spawned with pistol + ammo.");

        }, 500);
    });

})();