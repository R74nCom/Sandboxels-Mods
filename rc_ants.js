// Advanced Ant Colony & Ant Attacks Mod for Sandboxels
// Made by Raiden Corporation

runAfterLoad(function() {
    // 1. Worker Ants Reactions
    if (elements.ant) {
        elements.ant.reactions = elements.ant.reactions || {};
        
        // Ants eat normal food, sugar, and drink liquids
        elements.ant.reactions["food"] = { "elem1": "ant", "elem2": null };
        elements.ant.reactions["sugar"] = { "elem1": "ant", "elem2": null };
        elements.ant.reactions["juice"] = { "elem1": "carrying_ant", "elem2": null };
        elements.ant.reactions["water"] = { "elem1": "carrying_ant", "elem2": null };
        elements.ant.reactions["sugar_water"] = { "elem1": "carrying_ant", "elem2": null };

        // Ants hunt termites
        elements.ant.reactions["termite"] = { "elem1": "ant", "elem2": "dead_bug" };
    }

    // 2. Food Bite Element
    elements.food_bite = {
        name: "Food Bite",
        color: "#a0e060",
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "M2|M1|M2"
        ],
        category: "life",
        hidden: true,
        state: "solid",
        density: 1200,
        reactions: {
            "ant": { "elem1": null, "elem2": "ant" }
        }
    };

    // 3. Carrying Ant Element
    elements.carrying_ant = {
        name: "Carrying Ant",
        color: "#804000",
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "M1|M1|M1"
        ],
        category: "life",
        hidden: true,
        state: "solid",
        density: 1500,
        reactions: {
            "dirt": { "elem1": "ant", "elem2": "food_bite" }
        }
    };

    // 4. Queen Ant Element 👑
    elements.queen_ant = {
        name: "Queen Ant",
        alias: ["queen", "queen ant", "queen_ant"],
        color: ["#4a1f00", "#301400"],
        behavior: [
            "XX|CR:egg%1|XX",
            "M2|XX|M2",
            "M1|M1|M1"
        ],
        category: "life",
        state: "solid",
        density: 1800,
        reactions: {
            "food": { "elem1": "queen_ant", "elem2": null },
            "food_bite": { "elem1": "queen_ant", "elem2": null },
            "juice": { "elem1": "queen_ant", "elem2": null },
            "sugar": { "elem1": "queen_ant", "elem2": null }
        }
    };
});
