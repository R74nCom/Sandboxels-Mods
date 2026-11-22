// obtaining molten_solid_uranium (makes solid_uranium)
runAfterLoad(function() {
    elements.molten_uranium.reactions["molten_steel"] = { elem1: "molten_solid_uranium", elem2: "molten_solid_uranium" };
    elements.molten_steel.reactions["molten_uranium"] = { elem1: "molten_solid_uranium", elem2: "molten_solid_uranium" };
});

// molten solid uranium
elements.molten_solid_uranium = {
    color: ["#b06000", "#d48000", "#c47000"],
    behavior: behaviors.LIQUID,
    category: "solids",
    state: "liquid",
    density: 17500,
    viscosity: 60000,
    tempLow: 1135,
    stateLow: "solid_uranium",
    tempHigh: 3818,
    stateHigh: "steam",
};

// solid uranium
elements.solid_uranium = {
    color: ["#7a7a7a", "#8e8e8e", "#969696"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 19100,
    tempHigh: 1135,
    stateHigh: "molten_solid_uranium",
    reactions: {
        "neutron": { elem1: "solid_uranium", elem2: "explosion", chance: 0.5 },
    },
};
