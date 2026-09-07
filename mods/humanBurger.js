// humanBurger.js

runAfterLoad(function () {

    const allowed = [
        "bread",
        "human",
        "heat"
    ];

    // placement

    const oldMouse1Action = mouse1Action;

    mouse1Action = function (e, x, y, startPos) {

        if (!allowed.includes(currentElement)) {
            return;
        }

        oldMouse1Action(e, x, y, startPos);
    };

    // hide other

    for (const element in elements) {

        if (!allowed.includes(element)) {

            // hide from GUI only
            elements[element].hidden = true;
        }
    }

    // allowed are vis
    for (const element of allowed) {

        if (elements[element]) {
            elements[element].hidden = false;
        }
    }

    // refresh menu
    if (typeof createButtons === "function") {
        createButtons();
    }

});