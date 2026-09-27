// Sandboxels mod: Rad Bomb
// Uses Sandboxels' standard 3x3 behavior and EX radius syntax.
// Load this file as a mod or place it in the game's mods directory.

elements.rad_bomb = {
    name: "Rad Bomb",
    color: ["#596b3a", "#74864b", "#38452b"],
    behavior: [
        "XX|EX:30>fire,fire,plasma,radiation,radiation,fallout|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:30>fire,fire,plasma,radiation,radiation,fallout|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown,
    desc: "A fictional game bomb that creates a blast with radiation and fallout.",
};
