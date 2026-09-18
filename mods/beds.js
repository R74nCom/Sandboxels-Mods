elements.bed= {
    color: "#9c6c25",
    behavior: [
        "XX|SH%50|XX", // shocks (adds charge)
        "SH%50|CH:bed%0.05|SH%50",
        "XX|SH%50|XX",
    ],
    colorOn: "#00ff00",
    category: "machines",
    tempHigh: 70,
    stateHigh: ["molten_steel","explosion","acid_gas"],
    charge: 0,
    conduct: 0,
};
