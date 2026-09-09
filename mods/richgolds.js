runAfterLoad(function () {

    function createRichGold(id, name, colors) {
        elements[id] = structuredClone(elements.tungsten);

        elements[id].name = name;
        elements[id].category = "solids";
        elements[id].color = colors;
    }

    createRichGold(
        "rich_rose_gold",
        "Rich Rose Gold",
        [
            "#ffd7d0",
            "#f8bbb3",
            "#e89991",
            "#cf7771",
            "#9f5852"
        ]
    );

    createRichGold(
        "rich_purple_gold",
        "Rich Purple Gold",
        [
            "#e5c5ff",
            "#ca9cff",
            "#ad74e6",
            "#8950c2",
            "#5d2f8c"
        ]
    );

    createRichGold(
        "rich_blue_gold",
        "Rich Blue Gold",
        [
            "#cdeef2",
            "#b8e2e7",
            "#a3d4da",
            "#91c4cb",
            "#7db0b8"
        ]
    );

  createRichGold(
        "rich_black_gold",
        "Rich Black Gold",
        [
            "#5b564e",
            "#47433d",
            "#38352f",
            "#2a2723",
            "#181613"
        ]
    );

});