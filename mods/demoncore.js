elements.dctop = {
    color: "#202020",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    category: "demoncore",
    state: "solid",
    density: 100,
};

elements.dcbottom = {
    color: "#202020",
    behavior: [
        "XX|CH:dctop>explo|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    category: "demoncore",
    state: "solid",
    density: 100,
};

elements.dcspoon = {
    color: "#ffffff",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    category: "demoncore",
    state: "solid",
    density: 100,
    burn:100,
    burnTime:10,
    desc: "use it to seperate the top from bottom. HIGHLY flammible."
};

elements.explo = {
    color: "#ffffff",
    behavior: [
        "XX|XX|XX",
        "XX|EX:100>demoncorelight|XX",
        "XX|XX|XX",
    ],
    category: "demoncoreXTRA",
    state: "solid",
    density: 100,
    burn:100,
    burnTime:10,
    desc: "used to make the demon core explode dont place it down its just and explosion."
};

elements.demoncorelight = {
    color: "#75ffe8",
    behavior: [
        "XX|XX|XX",
        "XX|EX:10>radiation|XX",
        "XX|XX|XX",
    ],
    category: "demoncoreXTRA",
    state: "solid",
    density: 100,
    burn:100,
    burnTime:10,
    desc: "used to make the demon core more realistic. it will explode into radiation if you place it down."
};

