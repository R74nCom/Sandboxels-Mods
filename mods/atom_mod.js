//! @name     atom_mod.js
//! @author   ACrazyPencil
//! @category tools
//! @desc
//!  Adds Nucleus which you can add neutrons, protons and electrons.
//!  And adds merge tool to merge neutrons, protons and electrons in a Nucleus,
//!  Which will turn into an element if the numbers neutrons, protons and electrons are correct for the element.
//!  (c) 2026 ACrazyPencil
//! @createdElements electron; frozen_proton; frozen_neutron; nucleus

// Changelog 1.0.0
// Added Electron, Frozen Proton, Frozen Neutron and Nucleus
// If Nucleus is touching a Neutron, Proton or a Electron it adds itself to the Nucleus.
// Merge tool merges all the neutrons, protons and electrons in a Nucleus and makes the element.

// Changelog 1.0.1
// fix: fixed bug if there was no electrons in a nucleus when it got merged it did not explode.
// chore: some code formatting
// feat: made the merge tool look cool.

// formula {"name": [neutrons, protons, electrons]} // isotope
var listofelements = {
  Hydrogen: [0, 1, 1], // 1,
  Helium: [2, 2, 2], // 4
  Lithium: [4, 3, 3], // 7
  Beryllium: [5, 4, 4], // 9
  Boron: [6, 5, 5], // 11
  Carbon: [6, 6, 6], // 12
  Nitrogen: [7, 7, 7], // 14
  Oxigen: [8, 8, 8], // 16
  Fluorine: [10, 9, 9], // 19
  Neon: [10, 10, 10], // 20
  Sodium: [12, 11, 11], // 23
  Magnesium: [12, 12, 12], // 24
  Aluminium: [14, 13, 13], // 27
  Silicon: [14, 14, 14], // 28
  Phosphorus: [16, 15, 15], // 31
  Sulfur: [16, 16, 16], // 32
  Chlorine: [18, 17, 17], // 35
  Argon: [22, 18, 18], // 40
  Potassium: [20, 19, 19], // 39
  Calcium: [20, 20, 20], // 40
  Scandium: [24, 21, 21], // 45
  Titanium: [26, 22, 22], // 48
  Vanadium: [28, 23, 23], // 51
  Chromium: [28, 24, 24], // 52
  Manganese: [30, 25, 25], // 55
  Iron: [30, 26, 26], // 56
  Cobalt: [32, 27, 27], // 59
  Nickel: [30, 28, 28], // 58
  Copper: [34, 29, 29], // 63
  Zinc: [34, 30, 30], // 64
  Gallium: [38, 31, 31], // 69
  Germanium: [42, 32, 32], // 74
  Arsenic: [42, 33, 33], // 75
  Selenium: [46, 34, 34], // 80
  Bromine: [44, 35, 35], // 79
  Krypton: [48, 36, 36], // 84
  Rubidium: [48, 37, 37], // 85
  Strontium: [50, 38, 38], // 88
  Yttrium: [50, 39, 39], // 89
  Zirconium: [50, 40, 40], // 90
  Niobium: [52, 41, 41], // 93
  Molybdenum: [56, 42, 42], // 98
  Technetium: [56, 43, 43], // 99
  Ruthenium: [58, 44, 44], // 102
  Rhodium: [58, 45, 45], // 103
  Palladium: [60, 46, 46], // 106
  Silver: [60, 47, 47], // 107
  Cadmium: [66, 48, 48], // 114
  Indium: [66, 49, 49], // 115
  Tin: [70, 50, 50], // 120
  Antimony: [70, 51, 51], // 121
  Tellurium: [78, 52, 52], // 130
  Iodine: [74, 53, 53], // 127
  Xenon: [78, 54, 54], // 132
  Caesium: [78, 55, 55], // 133
  Barium: [82, 56, 56], // 138
  Lanthanum: [82, 57, 57], // 139
  Cerium: [82, 58, 58], // 140
  Praseodymium: [82, 59, 59], // 141
  Neodymium: [82, 60, 60], // 142
  Promethium: [84, 61, 61], // 145
  Samarium: [90, 62, 62], // 152
  Europium: [90, 63, 63], // 153
  Gadolinium: [94, 64, 64], // 158
  Terbium: [94, 65, 65], // 159
  Dysprosium: [98, 66, 66], // 164
  Holmium: [98, 67, 67], // 165
  Erbium: [98, 68, 68], // 166
  Thulium: [100, 69, 69], // 169
  Ytterbium: [104, 70, 70], // 174
  Lutetium: [104, 71, 71], // 175
  Hafnium: [108, 72, 72], // 180
  Tantalum: [108, 73, 73], // 181
  Tungsten: [110, 74, 74], // 184
  Rhenium: [112, 75, 75], // 187
  Osmium: [116, 76, 76], // 192
  Iridium: [116, 77, 77], // 193
  Platinum: [117, 78, 78], // 195
  Gold: [118, 79, 79], // 197
  Mercury: [122, 80, 80], // 202
  Thallium: [124, 81, 81], // 205
  Lead: [126, 82, 82], // 208
  Bismuth: [126, 83, 83], // 209
  Polonium: [126, 84, 84], // 210
  Astatine: [125, 85, 85], // 210
  Radon: [136, 86, 86], // 222
  Francium: [136, 87, 87], // 223
  Radium: [138, 88, 88], // 226
  Actinium: [138, 89, 89], // 227
  Thorium: [142, 90, 90], // 232
  Protactinium: [140, 91, 91], // 231
  Uranium: [146, 92, 92], // 238
  Neptunium: [144, 93, 93], // 237
  Plutonium: [145, 94, 94], // 239
  Americium: [146, 95, 95], // 241
  Curium: [148, 96, 96], // 244
  Berkelium: [152, 97, 97], // 249
  Californium: [154, 98, 98], // 252
  Einstenium: [154, 99, 99], // 253
  Fermium: [157, 100, 100], // 257
  Mendelevium: [155, 101, 101], // 256
  Nobelium: [157, 102, 102], // 259
  Lawrencium: [163, 103, 103], // 266
  Rutherfordium: [163, 104, 104], // 267
  Dubnium: [163, 105, 105], // 268
  Seaborgium: [165, 106, 106], // 271
  Bohrium: [163, 107, 107], // 270
  Hassium: [161, 108, 108], // 269
  Meitnerium: [169, 109, 109], // 278
  Darmstadtium: [171, 110, 110], // 281
  Roentgenium: [171, 111, 111], // 282
  Copernicium: [173, 112, 112], // 285
  Nihonium: [173, 113, 113], // 286
  Flerovium: [176, 114, 114], // 290
  Moscovium: [175, 115, 115], // 290
  Livermorium: [177, 116, 116], // 293
  Tennessine: [177, 117, 117], // 294
  Oganesson: [176, 118, 118], // 294
};

let enable_electron_shells;
dependOn(
  "betterSettings.js",
  function () {
    let atomjs_SettingsTab = new SettingsTab("Atom Mod");
    enable_electron_shells = new Setting(
      "Electron Shells",
      "enableelectronshells",
      settingType.BOOLEAN,
      false,
      true,
    );
    atomjs_SettingsTab.registerSettings("Options\n", enable_electron_shells);
    settingsManager.registerTab(atomjs_SettingsTab);
  },
  true,
);

// Thanks to ggod for this function
function compareArray(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((a, i) => arr2[i] === a);
}

function getExploisionSize(neutrons, protons, electrons) {
  let electrons2 = electrons / 2;
  if (electrons2 <= 0 || electrons2 == 0) electrons2 = 1;
  result = (neutrons - protons) * electrons2;
  if (result <= 0 || result == 0) return Math.round(6 * electrons2);
  return Math.round(result);
}

// Source - https://stackoverflow.com/a/28191966
// Posted by UncleLaz
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => compareArray(object[key], value));
}

// HUGE THANKS to nouser for the electron rings
const electronShells = {
  // amount of electrons in ring followed by distance
  2: 4,
  8: 6,
  18: 10,
  32: 16,
  64: 32,
  128: 64,
  256: 128,
};

function findElectronValue(index, list, mode) {
  let valueSum = 0;
  for (let value in list) {
    if (index <= valueSum + parseInt(list[value])) {
      if (mode == 1) {
        // find fraction
        return (index - valueSum) / parseInt(list[value]);
      } else {
        // find distance
        return list[value];
      }
    }
    valueSum += parseInt(list[value]);
  }
}

function getIsotope(neutrons, protons) {
  return neutrons + protons;
}

elements.electron = {
  color: "#146c09",
  tick: behaviors.BOUNCY,
  temp: 40,
  category: "energy",
  state: "gas",
  conduct: 1,
  density: 0.00002,
  ignoreAir: true,
};

elements.frozen_proton = {
  color: "#ffa6a6",
  behavior: behaviors.WALL,
  behaviorOn: ["XX|XX|XX", "XX|CH:hydrogen|XX", "XX|XX|XX"],
  reactions: {
    electric: { elem1: null, elem2: "hydrogen", temp2: 200 },
    nitrogen: {
      elem1: "flash",
      color1: "#5a9fdb",
      attr1: { delay: 500 },
      elem2: "flash",
      color2: "#5a9fdb",
      attr2: { delay: 500 },
      chance: 0.05,
      y: [10, 20],
    },
    oxygen: {
      elem1: "flash",
      color1: "#5adb63",
      attr1: { delay: 500 },
      elem2: "flash",
      color2: "#5adb63",
      attr2: { delay: 500 },
      chance: 0.05,
      y: [10, 20],
    },
    ozone: {
      elem1: "flash",
      color1: "#5adb63",
      attr1: { delay: 500 },
      elem2: "flash",
      color2: "#5adb63",
      attr2: { delay: 500 },
      chance: 0.05,
      y: [10, 20],
    },
  },
  temp: 40,
  category: "energy",
  state: "gas",
  conduct: 1,
  density: 0.00002,
  ignoreAir: true,
};
elements.frozen_neutron = {
  color: "#a6ffff",
  behavior: behaviors.WALL,
  reactions: {
    uranium: { temp2: 100 },
    plant: { elem2: "wood", chance: 0.05 },
    gunpowder: { elem2: "dust", chance: 0.05 },
    yeast: { elem2: "bread", chance: 0.05 },
    silver: { elem1: ["radiation", null, null], chance: 0.25 },
    firework: {
      func(pixel1, pixel2) {
        pixel2.burning = true;
        pixel2.burnStart = pixelTicks;
      },
      chance: 0.01,
    },
    glass: { elem1: null, elem2: "rad_glass" },
    glass_shard: { elem1: null, elem2: "rad_shard" },
    cloud: { elem1: null, elem2: "rad_cloud" },
    rain_cloud: { elem1: null, elem2: "rad_cloud" },
  },
  temp: 35,
  category: "energy",
  state: "gas",
  density: 0.00003,
  ignoreAir: true,
};
elements.nucleus = {
  color: ["#ffa6a6", "#a6ffff", "#146c09"],
  behavior: behaviors.WALL,
  category: "energy",
  properties: {
    neutrons: 0,
    protons: 0,
    electrons: 0,
  },
  hoverStat: function (pixel) {
    return (
      "Neutrons:" +
      pixel.neutrons +
      " Protons:" +
      pixel.protons +
      " Electrons:" +
      pixel.electrons
    );
  },
  tick: function (pixel) {
    for (coords of adjacentCoords) {
      let x = pixel.x + coords[0],
        y = pixel.y + coords[1];
      let newPx = getPixel(x, y);
      if (
        newPx != null &&
        (newPx.element == "frozen_neutron" || newPx.element == "neutron")
      ) {
        pixel.neutrons += 1;
        deletePixel(newPx.x, newPx.y);
      } else if (
        newPx != null &&
        (newPx.element == "frozen_proton" || newPx.element == "proton")
      ) {
        pixel.protons += 1;
        deletePixel(newPx.x, newPx.y);
      } else if (
        newPx != null &&
        (newPx.element == "frozen_electron" || newPx.element == "electron")
      ) {
        pixel.electrons += 1;
        deletePixel(newPx.x, newPx.y);
      }
    }
  },
  renderer: function (pixel, ctx) {
    drawDefault(ctx, pixel);
    let speed = 7;
    if (enable_electron_shells.value) {
      if (pixel.electrons > 0) {
        for (let i = 0; i < pixel.electrons; i++) {
          let distance =
            electronShells[
              findElectronValue(i - 1, Object.keys(electronShells), 2)
            ];
          let x =
            Math.cos(
              (pixelTicks / speed) * 0.2 +
                2 *
                  Math.PI *
                  findElectronValue(i - 1, Object.keys(electronShells), 1),
            ) *
              distance +
            pixel.x;
          let y =
            Math.sin(
              (pixelTicks / speed) * 0.2 +
                2 *
                  Math.PI *
                  findElectronValue(i - 1, Object.keys(electronShells), 1),
            ) *
              distance +
            pixel.y;
          drawPlus(ctx, "#146c09", x, y);
        }
      }
    }
  },
  maxSize: 1,
};

elements.frozen_electron = {
  color: "#146c09",
  behavior: behaviors.WALL,
  temp: 40,
  category: "energy",
  state: "gas",
  conduct: 1,
  density: 0.00002,
  ignoreAir: true,
};

elements.release_electron = {
  color: "#146c09",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      if (pixel.electrons >= 1) {
        pixel.electron -= 1;
        createPixel("electron", pixel.x + 1, pixel.y + 1);
      }
    }
  },
};

elements.release_electron = {
  color: "#146c09",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      if (pixel.electrons >= 1) {
        pixel.electrons -= 1;
        createPixel("electron", pixel.x + 1, pixel.y + 1);
      }
    }
  },
};

elements.release_neutron = {
  color: "#a6ffff",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      if (pixel.neutrons >= 1) {
        pixel.neutrons -= 1;
        createPixel("neutron", pixel.x + 1, pixel.y + 1);
      }
    }
  },
};

elements.release_proton = {
  color: "#ffa6a6",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      if (pixel.protons >= 1) {
        pixel.protons -= 1;
        createPixel("proton", pixel.x + 1, pixel.y + 1);
      }
    }
  },
};

elements.add_proton = {
  color: "#ffa6a6",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      pixel.protons += 1;
    }
  },
};
elements.add_neutron = {
  color: "#a6ffff",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      pixel.neutrons += 1;
    }
  },
};
elements.add_electron = {
  color: "#146c09",
  category: "tools",
  maxSize: 1,
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      pixel.electrons += 1;
    }
  },
};
elements.merge = {
  color: ["#ffa6a6", "#000000", "#a6ffff", "#000000", "#146c09"],
  category: "tools",
  tool: function (pixel) {
    if (pixel != null && pixel.element == "nucleus") {
      const result = getKeyByValue(listofelements, [
        pixel.neutrons,
        pixel.protons,
        pixel.electrons,
      ]);
      if (result != null && result != undefined) {
        resultlower = result.toLowerCase();
        if (elements[resultlower]) {
          createPixel(resultlower, pixel.x, pixel.y);
        } else {
          pixelx = pixel.x;
          pixely = pixel.y;
          explodeAt(
            pixel.x,
            pixel.y,
            getExploisionSize(pixel.neutrons, pixel.protons, pixel.electrons),
            (fire = "fire"),
          );
          deletePixel(x, y);
          promptText(
            "Cannot find element: " +
              resultlower +
              ", You might need to install a mod",
          );
        }
      } else {
        if (pixel != null && result == undefined) {
          pixelx = pixel.x;
          pixely = pixel.y;
          explodeAt(
            pixel.x,
            pixel.y,
            getExploisionSize(pixel.neutrons, pixel.protons, pixel.electrons),
            (fire = "fire"),
          );
          deletePixel(pixelx, pixely);
        }
      }
    }
  },
  maxSize: 1,
};
