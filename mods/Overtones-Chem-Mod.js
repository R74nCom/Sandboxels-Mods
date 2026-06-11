// ============================================================================
// Overtones-Chem-Mod — real chemistry for Sandboxels
// Version 1.0 (2026-06-11)
// Design & testing: Overtones | Code: Claude (Anthropic)
//
// Part 1 — Iodine: iodine, iodine_gas, molten_iodine, touch_powder (nitrogen
//   triiodide — stable while wet, hair-trigger once dry), tincture,
//   silver_iodide (cloud seeding), potassium_iodide (halogen displacement),
//   ammonia_solution (household ammonia).
// Part 2 — Acid overhaul: HCl now forms compounds instead of deleting pixels.
//   Seven metal chloride salt+solution pairs with a reversible loop
//   (dissolve -> boil -> crystallize -> re-dissolve), metal displacement
//   series, electrolysis, lead passivation, alloy leaching, road salt,
//   acid+bleach -> chlorine, neutralization with lye and ammonia.
// ============================================================================

(function() {

// ============================== PART 1: IODINE ==============================

// Nitrogen triiodide is stable while wet — contact with these never sets it off.
var ni3Stabilizers = ["touch_powder","ammonia","liquid_ammonia","ammonia_solution","water","iodine"];
var ni3Wetters = ["ammonia","liquid_ammonia","ammonia_solution","water"];

// Fresh touch powder is born soaked and has to dry for this many ticks
// (~10 seconds) before it arms. Liquid contact re-soaks it fully, and
// dampness spreads through a pile so submerged piles stay safe all the
// way down.
var NI3_DRY_TICKS = 300;

// How wet this pixel should be this tick. Direct contact with a wetter soaks it
// fully; otherwise dampness seeps in from neighboring touch powder, fading one
// step per layer, and the pixel's own moisture evaporates one step per tick.
function ni3Moisture(pixel) {
    var wet = (pixel.wet || 0) - 1;
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            var x = pixel.x + dx, y = pixel.y + dy;
            if (outOfBounds(x,y)) continue;
            var p = pixelMap[x][y];
            if (!p) continue;
            if (ni3Wetters.indexOf(p.element) !== -1) return NI3_DRY_TICKS;
            if (p.element === "touch_powder" && (p.wet || 0) - 1 > wet) {
                wet = (p.wet || 0) - 1;
            }
        }
    }
    return wet > 0 ? wet : 0;
}

function ni3Detonate(pixel) {
    var x = pixel.x, y = pixel.y;
    deletePixel(x,y);
    explodeAt(x,y,7,["fire","iodine_gas","iodine_gas","smoke"]);
}

elements.iodine = {
    color: ["#494152","#3d3547","#57455e"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 4933,
    // Heating mostly sublimes it straight to violet vapor, occasionally melting instead
    tempHigh: 113.7,
    stateHigh: ["iodine_gas","iodine_gas","iodine_gas","molten_iodine"],
    reactions: {
        "ammonia": { elem1:"touch_powder", elem2:null },
        "liquid_ammonia": { elem1:"touch_powder", elem2:null },
        // the classic prep: iodine crystals soaked in ammonia water
        "ammonia_solution": { elem1:"touch_powder", elem2:null },
        "alcohol": { elem1:"tincture", elem2:"tincture", chance:0.1 },
        // starch test — stains starchy foods blue-black
        "flour": { color2:["#26203f","#1c1833","#312a4d"], chance:0.2, oneway:true },
        "potato": { color2:["#26203f","#1c1833","#312a4d"], chance:0.2, oneway:true },
        "bread": { color2:["#26203f","#1c1833","#312a4d"], chance:0.2, oneway:true },
        "dough": { color2:["#26203f","#1c1833","#312a4d"], chance:0.2, oneway:true },
        "aluminum": { elem1:"iodine_gas", elem2:"fire", chance:0.02 },
        "potassium": { elem1:"potassium_iodide", elem2:"fire", chance:0.05 },
        "molten_potassium": { elem1:"potassium_iodide", elem2:"fire", chance:0.05 },
        "silver": { elem1:"silver_iodide", elem2:null, chance:0.05 },
        "water": { color2:"#9c6b3d", chance:0.002, oneway:true }
    },
    desc: "Elemental iodine. Sublimes into violet vapor when heated, stains starches blue-black, and forms touch powder with ammonia."
};

elements.iodine_gas = {
    color: ["#9b30c4","#7d2a9e","#b14fd6"],
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 11.27,
    temp: 200,
    // deposits straight back to solid crystals
    tempLow: 113.7,
    stateLow: "iodine",
    emit: 2,
    emitColor: "#bb44ee",
    desc: "Violet iodine vapor. Cools back into solid iodine crystals."
};

elements.molten_iodine = {
    color: ["#4a1f3d","#3d1a33"],
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    density: 3960,
    viscosity: 3,
    temp: 150,
    tempHigh: 184.3,
    stateHigh: "iodine_gas",
    tempLow: 113.7,
    stateLow: "iodine",
    hidden: true
};

elements.touch_powder = {
    color: ["#2b1b1e","#3d2326","#241317"],
    behavior: behaviors.POWDER,
    category: "weapons",
    state: "solid",
    density: 3580,
    alias: "nitrogen triiodide",
    // once armed: it lands on something, or something pokes it -> boom
    onCollide: function(pixel1,pixel2) {
        if (!pixel1.armed) return;
        if (ni3Stabilizers.indexOf(pixel2.element) !== -1) return;
        ni3Detonate(pixel1);
    },
    onMoveInto: function(pixel1,pixel2) {
        if (!pixel1.armed) return;
        if (ni3Stabilizers.indexOf(pixel2.element) !== -1) return;
        ni3Detonate(pixel1);
    },
    tick: function(pixel) {
        // it forms from wet ingredients, so it starts life fully soaked
        if (pixel.wet === undefined) pixel.wet = NI3_DRY_TICKS;
        pixel.wet = ni3Moisture(pixel);
        if (pixel.wet > 0) {
            if (pixel.armed) {
                pixel.armed = false;
                pixel.color = pixelColorPick(pixel);
            }
            return;
        }
        if (!pixel.armed) {
            pixel.armed = true;
            // dried-out crystals take on a faint rust tint — your only warning
            pixel.color = pixelColorPick(pixel, ["#5a3138","#6b3a42","#4f2b32"]);
        }
        if (pixel.temp > 95) ni3Detonate(pixel);
    },
    desc: "Nitrogen triiodide. Harmless while wet — but leave it to dry for a few seconds and the slightest touch detonates it in a puff of violet vapor."
};

elements.silver_iodide = {
    color: ["#e8e09a","#ddd28a"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5675,
    tempHigh: 558,
    darkText: true,
    reactions: {
        // AgI's crystal structure mimics ice, nucleating precipitation
        "cloud": { elem1:null, elem2:"rain_cloud", chance:0.1 }
    },
    desc: "Silver iodide — the real cloud-seeding compound. Dust it into clouds to make rain."
};

elements.potassium_iodide = {
    color: ["#f4f4ef","#e9e9e1"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3123,
    tempHigh: 681,
    darkText: true,
    reactions: {
        // chlorine outranks iodine in the halogen activity series,
        // displacing it back out of the salt
        "chlorine": { elem1:"potassium_salt", elem2:"iodine", chance:0.1 },
        "liquid_chlorine": { elem1:"potassium_salt", elem2:"iodine", chance:0.1 },
        "bleach": { elem1:"potassium_salt", elem2:"iodine", chance:0.05 }
    },
    desc: "Potassium iodide. Chlorine displaces the iodine right back out of it."
};

elements.tincture = {
    color: ["#5e3414","#6b3e1a"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 870,
    viscosity: 5,
    stain: 0.15,
    burn: 15,
    burnTime: 50,
    burnInto: "iodine_gas",
    tempHigh: 78,
    stateHigh: ["smoke","iodine_gas"],
    reactions: {
        "infection": { elem2:null, chance:0.3 }
    },
    desc: "Tincture of iodine — an antiseptic. Kills infection and stains whatever it touches."
};

// --- Ammonia solution (household ammonia / ammonium hydroxide) ---

elements.ammonia_solution = {
    color: ["#d3ded6","#c7d4cc"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 900,
    conduct: 0.05,
    darkText: true,
    // warming drives the dissolved gas back out, then the water boils
    tempHigh: 38,
    stateHigh: ["ammonia","steam"],
    // strong solutions freeze well below water; the ammonia separates back out
    tempLow: -58,
    stateLow: ["ice","ice","liquid_ammonia"],
    reactions: {
        // liquid fertilizer — same conventions and odds as vanilla ammonia gas
        "plant": { elem1:"plant", chance:0.05 },
        "grass": { elem1:"grass", chance:0.05 },
        "grass_seed": { elem1:"grass", chance:0.05 },
        "dirt": { elem1:"grass", chance:0.05 },
        "mud": { elem1:"grass", chance:0.05 },
        "sapling": { elem1:"tree_branch", chance:0.05 },
        "wheat": { elem1:"wheat", chance:0.05 },
        "vine": { elem1:"vine", chance:0.05 },
        "root": { elem1:"root", chance:0.05 },
        "kelp": { elem1:"kelp", chance:0.005 },
        // never mix ammonia and bleach — chloramine gas (vanilla covers the gas form)
        "bleach": { elem1:"poison_gas", elem2:null, chance:0.2 }
    },
    desc: "Ammonia dissolved in water — household ammonia. Liquid fertilizer; warms back into ammonia gas. Soak iodine in it to make touch powder."
};

// Ammonia gas now dissolves into water instead of vanilla's gas-becomes-algae.
elements.ammonia.reactions["water"] = { elem1:null, elem2:"ammonia_solution", chance:0.05 };

// Acid neutralizes it (exothermic, leaves ammonium-chloride brine — salt water
// is close enough), and must not generically delete it.
elements.acid.ignore.push("ammonia_solution");
elements.acid.reactions["ammonia_solution"] = { elem1:"salt_water", elem2:"salt_water", temp1:40, chance:0.2 };

// =========================== PART 2: ACID CHEMISTRY =========================
// Instead of generically deleting metals, acid now forms metal chloride
// solutions (releasing hydrogen gas); boiling a solution leaves the
// crystallized salt behind, and the salt re-dissolves in water. Includes metal
// displacement chemistry (e.g. zinc dropped in copper chloride solution plates
// out solid copper).

function chlorideTitle(metal) {
    return metal.charAt(0).toUpperCase() + metal.slice(1);
}

var chlorideCompounds = {
    "iron_chloride": {
        saltColor: ["#c2a33c","#a88a2e","#937a37"],
        solutionColor: ["#c7a93e","#b08d2f"],
        saltDensity: 2900, solutionDensity: 1290,
        melt: 306,
        solutionExtras: {
            stain: 0.05,
            reactions: {
                // ferric chloride etches copper (classic PCB etchant)
                "copper": { elem2:"copper_chloride_solution", chance:0.005 },
                "zinc": { elem1:"zinc_chloride_solution", elem2:"iron", chance:0.04 },
                "magnesium": { elem1:"magnesium_chloride_solution", elem2:"iron", chance:0.05 }
            }
        }
    },
    "copper_chloride": {
        saltColor: ["#3aa9a2","#2f8f89","#6fd0c4"],
        solutionColor: ["#2fa3b5","#3db8a8"],
        saltDensity: 3390, solutionDensity: 1200,
        melt: 498,
        saltExtras: {
            fireColor: "#36d98c" // copper salts burn blue-green
        },
        solutionExtras: {
            stain: 0.03,
            reactions: {
                // activity series: more reactive metals displace the copper
                "magnesium": { elem1:"magnesium_chloride_solution", elem2:"copper", chance:0.05 },
                "aluminum": { elem1:"aluminum_chloride_solution", elem2:"copper", chance:0.02 },
                "zinc": { elem1:"zinc_chloride_solution", elem2:"copper", chance:0.04 },
                "iron": { elem1:"iron_chloride_solution", elem2:"copper", chance:0.03 }
            }
        }
    },
    "zinc_chloride": {
        saltColor: ["#f4f4f0","#e8e8e2"],
        solutionColor: ["#dfe8e4"],
        saltDensity: 2910, solutionDensity: 1300,
        melt: 290,
        darkText: true,
        solutionExtras: {
            reactions: {
                "magnesium": { elem1:"magnesium_chloride_solution", elem2:"zinc", chance:0.05 }
            }
        }
    },
    "aluminum_chloride": {
        saltColor: ["#f2efdd","#e8e4cc"],
        solutionColor: ["#e3e8d8"],
        saltDensity: 2480, solutionDensity: 1150,
        melt: 192,
        darkText: true
    },
    "magnesium_chloride": {
        saltColor: ["#f5f3f0","#eae7e2"],
        solutionColor: ["#e0e6e6"],
        saltDensity: 2320, solutionDensity: 1250,
        melt: 714,
        darkText: true
    },
    "calcium_chloride": {
        saltColor: ["#f7f7f2","#ebebe4"],
        solutionColor: ["#dde8e8"],
        saltDensity: 2150, solutionDensity: 1350,
        melt: 772,
        darkText: true,
        solutionFreeze: -45, // CaCl2 brine stays liquid far below zero
        saltExtras: {
            reactions: {
                // road salt: melts ice and snow, dissolving in the process
                "ice": { elem1:"calcium_chloride_solution", elem2:"water", chance:0.02 },
                "snow": { elem1:"calcium_chloride_solution", elem2:"water", chance:0.05 },
                // hygroscopic — pulls moisture out of the air
                "steam": { elem1:"calcium_chloride_solution", elem2:null, chance:0.01 }
            }
        }
    },
    "tin_chloride": {
        saltColor: ["#f1f1ec","#e4e4dc"],
        solutionColor: ["#e2e6e0"],
        saltDensity: 3950, solutionDensity: 1300,
        melt: 247,
        darkText: true,
        solutionExtras: {
            reactions: {
                "zinc": { elem1:"zinc_chloride_solution", elem2:"tin", chance:0.04 },
                "iron": { elem1:"iron_chloride_solution", elem2:"tin", chance:0.03 }
            }
        }
    }
};

var chlorideIgnore = [];   // everything acid must not delete
var chlorideAbsorb = {};   // acid touching a solution merges into it

// Conductive metals that act as electrodes for electrolysis
var electrodeMetals = ["iron","steel","copper","zinc","tin","silver","gold","aluminum","brass","bronze"];

for (var saltName in chlorideCompounds) {
    var def = chlorideCompounds[saltName];
    var solutionName = saltName + "_solution";
    var metal = saltName.replace("_chloride","");

    chlorideIgnore.push(saltName, solutionName);
    chlorideAbsorb[solutionName] = { elem1: solutionName, chance:0.005 };

    elements[saltName] = {
        color: def.saltColor,
        behavior: behaviors.POWDER,
        category: "powders",
        state: "solid",
        density: def.saltDensity,
        tempHigh: def.melt, // no stateHigh — the game auto-generates the molten form
        darkText: def.darkText,
        reactions: {
            "water": { elem1: solutionName, elem2:null, chance:0.15 }
        },
        desc: chlorideTitle(metal) + " chloride salt. Dissolves in water; melts at " + def.melt + "°C."
    };

    elements[solutionName] = {
        color: def.solutionColor,
        behavior: behaviors.LIQUID,
        category: "liquids",
        state: "liquid",
        density: def.solutionDensity,
        conduct: 0.05,
        tempHigh: 106,
        stateHigh: ["steam", saltName],
        tempLow: def.solutionFreeze || -12,
        stateLow: ["ice", saltName],
        darkText: def.darkText,
        desc: chlorideTitle(metal) + " chloride dissolved in water. Boil it off to crystallize the salt."
    };

    if (def.saltExtras) {
        for (var prop in def.saltExtras) {
            if (prop === "reactions") Object.assign(elements[saltName].reactions, def.saltExtras.reactions);
            else elements[saltName][prop] = def.saltExtras[prop];
        }
    }
    if (def.solutionExtras) {
        for (var prop in def.solutionExtras) {
            if (prop === "reactions") elements[solutionName].reactions = Object.assign(elements[solutionName].reactions || {}, def.solutionExtras.reactions);
            else elements[solutionName][prop] = def.solutionExtras[prop];
        }
    }

    // Electrolysis: a charged electrode splits the solution back into solid
    // metal and chlorine gas. Displacement reactions keep priority where defined.
    if (!elements[solutionName].reactions) elements[solutionName].reactions = {};
    for (var e = 0; e < electrodeMetals.length; e++) {
        if (!elements[solutionName].reactions[electrodeMetals[e]]) {
            elements[solutionName].reactions[electrodeMetals[e]] = { elem1:[metal, metal, "chlorine"], charged:true, chance:0.01 };
        }
    }
}

// Lead chloride is insoluble — it forms a white passivating crust instead of a
// solution, which is why lead containers resist hydrochloric acid.
elements.lead_chloride = {
    color: ["#f3f3ee","#e6e6df"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 5850,
    tempHigh: 501,
    darkText: true,
    desc: "Lead chloride. Insoluble in water — forms a protective crust on lead exposed to acid."
};

// --- Rewire acid itself ---

// Shield these from acid's generic DB (delete) behavior so the reactions below
// handle them instead. (Copper, gold, silver, nickel, calcium are already immune.)
elements.acid.ignore.push(
    "iron","steel","rust","oxidized_copper","zinc","aluminum",
    "magnesium","tin","sodium","limestone",
    "lead","tungsten","brass","bronze","solder","metal_scrap",
    "lead_chloride","bleach"
);
// ...and never delete the reaction products either
elements.acid.ignore.push.apply(elements.acid.ignore, chlorideIgnore);

// Excess acid slowly merges into solutions it touches instead of pooling on top
Object.assign(elements.acid.reactions, chlorideAbsorb);

// Pattern: the METAL pixel visibly converts to the chloride solution in place,
// while the acid pixel becomes hydrogen bubbles or more solution.
Object.assign(elements.acid.reactions, {
    "iron": { elem1:["hydrogen","iron_chloride_solution"], elem2:"iron_chloride_solution", chance:0.03 },
    "steel": { elem1:["hydrogen","iron_chloride_solution"], elem2:"iron_chloride_solution", chance:0.015 },
    "metal_scrap": { elem1:["hydrogen","iron_chloride_solution"], elem2:"iron_chloride_solution", chance:0.02 },
    "zinc": { elem1:["hydrogen","zinc_chloride_solution"], elem2:"zinc_chloride_solution", chance:0.06 },
    "aluminum": { elem1:["hydrogen","aluminum_chloride_solution"], elem2:"aluminum_chloride_solution", chance:0.02 },
    "magnesium": { elem1:["hydrogen","magnesium_chloride_solution"], elem2:"magnesium_chloride_solution", chance:0.1 },
    "tin": { elem1:["hydrogen","tin_chloride_solution"], elem2:"tin_chloride_solution", chance:0.008 },
    "calcium": { elem1:["hydrogen","calcium_chloride_solution"], elem2:"calcium_chloride_solution", chance:0.08 },
    // sodium reacts violently, yielding table salt
    "sodium": { elem1:["fire","hydrogen"], elem2:"salt" },
    // oxides dissolve without releasing hydrogen
    "rust": { elem1:null, elem2:"iron_chloride_solution", chance:0.05 },
    "oxidized_copper": { elem1:null, elem2:"copper_chloride_solution", chance:0.04 },
    // carbonate + acid -> fizzing CO2 (replaces vanilla's calcium+CO2)
    "limestone": { elem1:"calcium_chloride_solution", elem2:"carbon_dioxide" },
    // alloys: acid leaches the reactive metal out, leaving porous copper
    "brass": { elem1:"zinc_chloride_solution", elem2:"copper", chance:0.01 },
    "bronze": { elem1:"tin_chloride_solution", elem2:"copper", chance:0.004 },
    "solder": { elem1:"tin_chloride_solution", elem2:"lead_chloride", chance:0.005 },
    // lead passivates: an insoluble chloride crust stops further attack
    "lead": { elem1:null, elem2:"lead_chloride", chance:0.003 },
    // tungsten is in the ignore list with no reaction — genuinely acid-proof

    // mixing bleach with acid releases toxic chlorine gas — the classic
    // "never mix cleaning products" accident
    "bleach": { elem1:"chlorine", elem2:"salt_water", chance:0.1 },
    // neutralization: strong acid + strong base -> salt water, exothermic
    "lye": { elem1:"salt_water", elem2:null, temp1:40, chance:0.2 }
});

})();
