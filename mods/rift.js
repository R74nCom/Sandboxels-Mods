elements.sphagnum_moss= {
    color: "#034308",
    behavior: behaviors.STURDYPOWDER,
    category: "life",
    state: "solid"
}
elements.weird_stuff= {
    color: "#200343",
    behavior: behaviors.UNC,
    category: "special",
    state: "solid"
}
behaviors.UNC = [
    "XX|M1|XX",
    "XX|XX|XX",
    "XX|M2|XX",
];
elements.THE_SPREAD= {
    color: "#000000",
    behavior: behaviors.spread,
    category: "special",
    state: "solid"
}
//i know the spread or weird stuff dosent work and i wont fix it.
behaviors.spread = [
    "CR:THE_SPREAD|CR:THE_SPREAD|CR:THE_SPREAD",
    "CR:THE_SPREAD|CR:THE_SPREAD|CR:THE_SPREAD",
    "CR:THE_SPREAD|CR:THE_SPREAD|CR:THE_SPREAD",
];
elements.rift= {
    color: "#180051",
    tick: function(pixel) {releaseElement(pixel, "strange_goo")
    },
    behavior: behaviors.SOLID,
    category: "special",
    state: "solid"
}
elements.strange_goo= {
    color: "#000049",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "electric": { elem1: "null", elem2: "explosion" }
    },
    category: "liquids",
    state: "liquid"
}
elements.deadly_rift= {
    color: "#51002e",
    tick: function(pixel) {releaseElement(pixel, "deadly_goo")
    },
    behavior: behaviors.SOLID,
    reactions: {
        electric: { elem1: "null", elem2: "supernova"}
    },
    category: "special",
    state: "solid"
}
elements.deadly_goo= {
    color: "#3f0049",
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "electric": { elem1: "null", elem2: "n_explosion" }
    },
    category: "liquids",
    state: "liquid"
}
elements.funny_rock= {
    color: "#3e2643",
    behavior: behaviors.STURDYPOWDER,
    reactions: { "fire": { elem1: "null", elem2: "n_explosion" }},
    category: "land",
    state: "solid"
}
