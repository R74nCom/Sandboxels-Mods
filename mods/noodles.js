// Noodles Mod — all elements in Food category

// Raw Noodles (solid)
elements.raw_noodles = {
    color: "#f5d77a",
    behavior: behaviors.SOLID,
    category: "food",
    state: "solid",
    reactions: {
        water: { "cooked_noodles": 1 },
        fire: { "burnt_noodles": 1 }
    }
};

// Cooked Noodles (powder)
elements.cooked_noodles = {
    color: "#f8e39f",
    behavior: behaviors.POWDER,
    category: "food",
    state: "powder",
    reactions: {
        water: { "noodle_soup": 1 },
        fire: { "burnt_noodles": 1 }
    }
};

// Noodle Soup (liquid)
elements.noodle_soup = {
    color: "#f5d1a0",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid",
    reactions: {
        fire: { "burnt_soup": 1 }
    }
};

// Burnt Noodles (solid)
elements.burnt_noodles = {
    color: "#7a5a3c",
    behavior: behaviors.SOLID,
    category: "food",
    state: "solid"
};

// Burnt Soup (liquid)
elements.burnt_soup = {
    color: "#5c3a1e",
    behavior: behaviors.LIQUID,
    category: "food",
    state: "liquid"
};
