runAfterLoad(function () {

    const yeastBlocked = [
        "corn",
        "rice",
        "wheat",
        "potato",
        "mashed_potato"
    ];

    yeastBlocked.forEach(item => {

        if (elements.yeast?.reactions?.[item]) {
            delete elements.yeast.reactions[item];
        }

        if (elements[item]?.reactions?.yeast) {
            delete elements[item].reactions.yeast;
        }
    });

    elements.foam = {
        color: "#e6f7ff",
        behavior: behaviors.LIQUID,
        category: "food",
        state: "liquid",
        density: 50,
        hidden: true
    };

    elements.barley = {
        color: "#a67c52",
        behavior: behaviors.POWDER,
        category: "food",
        state: "solid",
        density: 750,
        reactions: {
            water: {
                elem1: "green_barley",
                elem2: null
            }
        }
    };

    elements.green_barley = {
        color: "#6fa84a",
        behavior: behaviors.POWDER,
        category: "food",
        state: "solid",
        density: 800,
        hidden: true,

        tick: function (pixel) {

            if (pixel.temp >= 100) {
                changePixel(pixel, "dead_plant");
                return;
            }

            if (pixel.temp >= 85) {
                changePixel(pixel, "malted_barley");
                return;
            }
        }
    };

    elements.malted_barley = {
        color: "#c2a66b",
        behavior: behaviors.POWDER,
        category: "food",
        state: "solid",
        density: 780,
        hidden: true
    };

    elements.rye = {
        color: "#8b3a3a",
        behavior: behaviors.POWDER,
        category: "food",
        state: "solid",
        density: 720
    };

    const grains = [
        "corn",
        "rice",
        "wheat",
        "potato",
        "mashed_potato",
        "rye"
    ];

    grains.forEach(food => {

        const sName = "S_" + food;

        elements[sName] = {
            color: "#d8c27a",
            behavior: behaviors.POWDER,
            category: "food",
            state: "solid",
            density: elements[food]?.density || 700,
            hidden: true
        };

        if (!elements.malted_barley.reactions) {
            elements.malted_barley.reactions = {};
        }

        elements.malted_barley.reactions[food] = {
            elem1: sName,
            elem2: null
        };
    });

    const sGrains = [
        "S_corn",
        "S_rice",
        "S_wheat",
        "S_potato",
        "S_mashed_potato",
        "S_rye"
    ];

    sGrains.forEach(s => {

        if (!elements.yeast.reactions) {
            elements.yeast.reactions = {};
        }

        elements.yeast.reactions[s] = {
            elem1: "alcohol",
            elem2: null
        };
    });

    if (elements.alcohol) {

        const oldTick = elements.alcohol.tick;

        elements.alcohol.tick = function (pixel) {

            if (oldTick) oldTick(pixel);

            if (Math.random() < 0.03) {
                const dir = Math.floor(Math.random() * 4);
                const x = pixel.x + (dir === 0 ? 1 : dir === 1 ? -1 : 0);
                const y = pixel.y + (dir === 2 ? 1 : dir === 3 ? -1 : 0);

                if (isEmpty(x, y)) {
                    createPixel("foam", x, y);
                }
            }
        };
    }

});