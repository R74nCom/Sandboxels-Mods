
/*
 * VZC Zombie Life 1.0
 * Sandboxels Mod
 * Author: VZC
 *
 * Elements:
 * - Zombie
 * - Zombie Virus
 * - Antivirus
 * - Rotten Flesh
 */

(function () {
    "use strict";

    if (typeof elements === "undefined" ||
        typeof behaviors === "undefined") {
        console.error("[VZC Zombie Life] Sandboxels API not found!");
        return;
    }

    function getPixelAt(x, y) {
        if (!pixelMap[x]) return null;
        return pixelMap[x][y] || null;
    }

    // ZOMBIE AI
    function zombieTick(pixel) {
        if (!pixel || pixel.del) return;
        if (pixelTicks % 5 !== 0) return;

        var directions = [
            [-1,-1], [0,-1], [1,-1],
            [-1,0],           [1,0],
            [-1,1],  [0,1],  [1,1]
        ];

        // Infect nearby humans
        for (var i = 0; i < directions.length; i++) {
            var nx = pixel.x + directions[i][0];
            var ny = pixel.y + directions[i][1];

            var neighbor = getPixelAt(nx, ny);

            if (neighbor &&
                neighbor.element === "human" &&
                Math.random() < 0.22) {

                changePixel(neighbor, "vzc_zombie");
                break;
            }
        }

        // Random movement
        if (Math.random() < 0.35) {
            var steps = [
                [-1,0], [1,0],
                [0,-1], [0,1],
                [-1,1], [1,1]
            ];

            var step = steps[
                Math.floor(Math.random() * steps.length)
            ];

            var tx = pixel.x + step[0];
            var ty = pixel.y + step[1];

            if (isEmpty(tx, ty)) {
                tryMove(pixel, tx, ty);
            }
        }

        // Heat damage
        if (pixel.temp > 120) {
            changePixel(pixel, "vzc_rotten_flesh");
        }
    }

    // ZOMBIE VIRUS
    function virusTick(pixel) {
        if (!pixel || pixel.del) return;
        if (pixelTicks % 4 !== 0) return;

        var directions = [
            [-1,0], [1,0],
            [0,-1], [0,1],
            [-1,-1], [1,-1],
            [-1,1], [1,1]
        ];

        for (var i = 0; i < directions.length; i++) {
            var nx = pixel.x + directions[i][0];
            var ny = pixel.y + directions[i][1];

            var neighbor = getPixelAt(nx, ny);

            if (neighbor &&
                neighbor.element === "human" &&
                Math.random() < 0.12) {

                changePixel(neighbor, "vzc_zombie");
                break;
            }
        }
    }

    // ANTIVIRUS
    function cureTick(pixel) {
        if (!pixel || pixel.del) return;
        if (pixelTicks % 4 !== 0) return;

        var directions = [
            [-1,0], [1,0],
            [0,-1], [0,1],
            [-1,-1], [1,-1],
            [-1,1], [1,1]
        ];

        for (var i = 0; i < directions.length; i++) {
            var nx = pixel.x + directions[i][0];
            var ny = pixel.y + directions[i][1];

            var neighbor = getPixelAt(nx, ny);

            if (neighbor &&
                neighbor.element === "vzc_zombie" &&
                Math.random() < 0.30) {

                changePixel(neighbor, "human");
                deletePixel(pixel.x, pixel.y);
                return;
            }
        }
    }

    // ZOMBIE
    elements.vzc_zombie = {
        color: [
            "#526b35",
            "#647d3e",
            "#3e542b"
        ],
        behavior: behaviors.WALL,
        category: "life",
        state: "solid",
        density: 1080,
        hardness: 0.15,
        temp: 25,
        tick: zombieTick,
        desc: "A slow infected creature that infects humans."
    };

    // VIRUS
    elements.vzc_zombie_virus = {
        color: [
            "#78b83e",
            "#9bd64c",
            "#527f2b"
        ],
        behavior: behaviors.LIQUID,
        category: "liquids",
        state: "liquid",
        density: 1030,
        viscosity: 650,
        temp: 25,
        tick: virusTick,
        desc: "An infectious liquid that can infect humans."
    };

    // ANTIVIRUS
    elements.vzc_antivirus = {
        color: [
            "#4bd7e8",
            "#8cf0f4",
            "#27a9c5"
        ],
        behavior: behaviors.LIQUID,
        category: "liquids",
        state: "liquid",
        density: 1000,
        viscosity: 500,
        temp: 20,
        tick: cureTick,
        desc: "A cure that can restore zombies into humans."
    };

    // ROTTEN FLESH
    elements.vzc_rotten_flesh = {
        color: [
            "#66513c",
            "#806347",
            "#4d4031"
        ],
        behavior: behaviors.POWDER,
        category: "powders",
        state: "solid",
        density: 920,
        temp: 20,
        desc: "Rotten remains of an overheated zombie."
    };

    console.log(
        "[VZC Zombie Life] Loaded successfully!"
    );

})();
