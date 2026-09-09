
// ==========================================
// MOD NAME: Three Cool Elements
// AUTHOR: RATIOKW1890
// DESCRIPTION: Adds the high-speed lattice cloner, corner-seeking red thingy, and vertical rocket.
// ==========================================

elements.lattice_cloner = {
    color: "#CCF527",
    behavior: [
        ["CF", "XX", "CF"],
        ["XX", "XX", "XX"],
        ["CF", "XX", "CF"],
    ],
    category: "special",
    state: "solid",
    desc: "Slightly faster cloner!",
}
elements.red_thingy = {
    color: "#ff0000",
    behavior: [
        ["XX", "M2", "XX"],
        ["XX", "XX", "M1"],
        ["XX", "XX", "XX"],
    ],
    category: "special",
    state: "solid",
    desc: "Wherever you put it it will always find a way to get to the top right corner."
}
elements.rocket = {
    color: "#fa6677",
    behavior: [
        ["XX", "M1", "XX"],
        ["SP", "XX", "SP"],
        ["XX", "CR:fire", "XX"],
    ],
    category: "machines",
    state: "solid",
    desc: "It's a rocket. But the engine is broken so it's contantly smoking."
}