/*
    Conway's Game of Life for Sandboxels

    Features:
    - True Conway B3/S23 rules
    - Synchronous generations
    - Life element
    - RLE pattern importer
    - Proper toolbar button
*/


// =====================
// LIFE ELEMENT
// =====================

elements.life = {
    color: "#00ff66",
    behavior: behaviors.WALL,
    category: "special",
    state: "solid",
    density: 1000,
    excludeRandom: true
};


// =====================
// LIFE ENGINE
// =====================

let lifeDelay = 3;
let lifeTimer = 0;


function lifeKey(x, y) {
    return x + "," + y;
}


function lifeAlive(x, y) {
    let p = getPixel(x, y);
    return p && p.element === "life";
}


function lifeNeighbors(x, y) {

    let amount = 0;

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {

            if (dx === 0 && dy === 0)
                continue;

            if (lifeAlive(x + dx, y + dy))
                amount++;

        }
    }

    return amount;
}



runEveryTick(() => {

    lifeTimer++;

    if (lifeTimer < lifeDelay)
        return;

    lifeTimer = 0;


    let checked = {};
    let next = {};


    // Collect cells that can change
    for (let x = 0; x < width; x++) {

        for (let y = 0; y < height; y++) {

            if (!lifeAlive(x, y))
                continue;


            for (let dx = -1; dx <= 1; dx++) {

                for (let dy = -1; dy <= 1; dy++) {

                    checked[
                        lifeKey(x + dx, y + dy)
                    ] = true;

                }
            }
        }
    }



    // Calculate next generation
    for (let pos in checked) {

        let parts = pos.split(",");

        let x = Number(parts[0]);
        let y = Number(parts[1]);


        let alive = lifeAlive(x, y);
        let neighbors = lifeNeighbors(x, y);


        if (alive && (neighbors === 2 || neighbors === 3))
            next[pos] = true;


        if (!alive && neighbors === 3)
            next[pos] = true;

    }



    // Kill cells
    for (let x = 0; x < width; x++) {

        for (let y = 0; y < height; y++) {

            let p = getPixel(x, y);

            if (p && p.element === "life") {

                if (!next[lifeKey(x, y)])
                    tryDelete(x, y);

            }
        }
    }



    // Create cells
    for (let pos in next) {

        let parts = pos.split(",");

        let x = Number(parts[0]);
        let y = Number(parts[1]);


        if (!getPixel(x, y))
            tryCreate("life", x, y);

    }

});




// =====================
// RLE IMPORTER
// =====================

function importLifeRLE() {

    let input = prompt(
        "Paste Conway Life RLE:"
    );


    if (!input)
        return;


    let lines = input.split("\n");


    lines = lines.filter(
        line => !line.startsWith("#")
    );


    let data = lines.join("");


    let header = data.match(
        /x\s*=\s*\d+,\s*y\s*=\s*\d+/
    );


    if (header) {

        data = data.substring(
            data.indexOf(header[0]) + header[0].length
        );

    }



    let cells = [];

    let x = 0;
    let y = 0;
    let number = "";



    for (let i = 0; i < data.length; i++) {

        let c = data[i];


        if (c >= "0" && c <= "9") {

            number += c;
            continue;

        }


        let amount =
            number === ""
            ? 1
            : Number(number);


        number = "";



        if (c === "b") {

            x += amount;

        }


        else if (c === "o") {

            for (let j = 0; j < amount; j++) {

                cells.push([x, y]);
                x++;

            }

        }


        else if (c === "$") {

            y += amount;
            x = 0;

        }


        else if (c === "!") {

            break;

        }

    }



    if (cells.length === 0)
        return;



    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;


    for (let c of cells) {

        minX = Math.min(minX, c[0]);
        maxX = Math.max(maxX, c[0]);

        minY = Math.min(minY, c[1]);
        maxY = Math.max(maxY, c[1]);

    }



    let offsetX =
        Math.floor(
            width / 2 -
            (maxX - minX) / 2
        );


    let offsetY =
        Math.floor(
            height / 2 -
            (maxY - minY) / 2
        );



    for (let c of cells) {

        let px = c[0] + offsetX;
        let py = c[1] + offsetY;


        if (!getPixel(px, py))
            tryCreate(
                "life",
                px,
                py
            );

    }

}




// =====================
// IMPORT BUTTON
// =====================

let lifeButton = document.createElement("button");

lifeButton.innerHTML = "Import Life Pattern";
lifeButton.title = "Import Conway Life RLE";
lifeButton.onclick = importLifeRLE;


// Try common Sandboxels UI containers

let containers = [
    document.getElementById("buttons"),
    document.getElementById("controlPanel"),
    document.getElementById("controlBar"),
    document.querySelector(".buttons")
];


let placed = false;


for (let container of containers) {

    if (container) {

        container.appendChild(lifeButton);
        placed = true;
        break;

    }

}


// Last resort: put it above the canvas, NOT fixed

if (!placed) {

    let canvas = document.querySelector("canvas");


    if (canvas && canvas.parentElement) {

        canvas.parentElement.insertBefore(
            lifeButton,
            canvas
        );

    }

    else {

        document.body.appendChild(lifeButton);

    }

}