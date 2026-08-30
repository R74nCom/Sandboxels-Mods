// Ensure elements object exists safely
if (typeof elements === 'undefined') { elements = {}; }

// 1. All 118 Elements Array
const periodicElements = [
    { name: "hydrogen", phase: "gas" }, { name: "helium", phase: "gas" }, 
    { name: "lithium", phase: "solid" }, { name: "beryllium", phase: "solid" },
    { name: "boron", phase: "solid" }, { name: "carbon", phase: "solid" }, 
    { name: "nitrogen", phase: "gas" }, { name: "oxygen", phase: "gas" }, 
    { name: "fluorine", phase: "gas" }, { name: "neon", phase: "gas" },
    { name: "sodium", phase: "solid" }, { name: "magnesium", phase: "solid" }, 
    { name: "aluminum", phase: "solid" }, { name: "silicon", phase: "solid" },
    { name: "phosphorus", phase: "solid" }, { name: "sulfur", phase: "solid" }, 
    { name: "chlorine", phase: "gas" }, { name: "argon", phase: "gas" },
    { name: "potassium", phase: "solid" }, { name: "calcium", phase: "solid" }, 
    { name: "scandium", phase: "solid" }, { name: "titanium", phase: "solid" },
    { name: "vanadium", phase: "solid" }, { name: "chromium", phase: "solid" }, 
    { name: "manganese", phase: "solid" }, { name: "iron", phase: "solid" },
    { name: "cobalt", phase: "solid" }, { name: "nickel", phase: "solid" }, 
    { name: "copper", phase: "solid" }, { name: "zinc", phase: "solid" },
    { name: "gallium", phase: "solid" }, { name: "germanium", phase: "solid" }, 
    { name: "arsenic", phase: "solid" }, { name: "selenium", phase: "solid" },
    { name: "bromine", phase: "liquid" }, { name: "krypton", phase: "gas" }, 
    { name: "rubidium", phase: "solid" }, { name: "strontium", phase: "solid" },
    { name: "yttrium", phase: "solid" }, { name: "zirconium", phase: "solid" }, 
    { name: "niobium", phase: "solid" }, { name: "molybdenum", phase: "solid" },
    { name: "technetium", phase: "solid" }, { name: "ruthenium", phase: "solid" }, 
    { name: "rhodium", phase: "solid" }, { name: "palladium", phase: "solid" },
    { name: "silver", phase: "solid" }, { name: "cadmium", phase: "solid" }, 
    { name: "indium", phase: "solid" }, { name: "tin", phase: "solid" },
    { name: "antimony", phase: "solid" }, { name: "tellurium", phase: "solid" }, 
    { name: "iodine", phase: "solid" }, { name: "xenon", phase: "gas" },
    { name: "cesium", phase: "solid" }, { name: "barium", phase: "solid" }, 
    { name: "lanthanum", phase: "solid" }, { name: "cerium", phase: "solid" },
    { name: "praseodymium", phase: "solid" }, { name: "neodymium", phase: "solid" }, 
    { name: "promethium", phase: "solid" }, { name: "samarium", phase: "solid" },
    { name: "europium", phase: "solid" }, { name: "gadolinium", phase: "solid" }, 
    { name: "terbium", phase: "solid" }, { name: "dysprosium", phase: "solid" },
    { name: "holmium", phase: "solid" }, { name: "erbium", phase: "solid" }, 
    { name: "thulium", phase: "solid" }, { name: "ytterbium", phase: "solid" },
    { name: "lutetium", phase: "solid" }, { name: "hafnium", phase: "solid" }, 
    { name: "tantalum", phase: "solid" }, { name: "tungsten", phase: "solid" },
    { name: "rhenium", phase: "solid" }, { name: "osmium", phase: "solid" }, 
    { name: "iridium", phase: "solid" }, { name: "platinum", phase: "solid" },
    { name: "gold", phase: "solid" }, { name: "mercury", phase: "liquid" }, 
    { name: "thallium", phase: "solid" }, { name: "lead", phase: "solid" },
    { name: "bismuth", phase: "solid" }, { name: "polonium", phase: "solid" }, 
    { name: "astatine", phase: "solid" }, { name: "radon", phase: "gas" },
    { name: "francium", phase: "solid" }, { name: "radium", phase: "solid" }, 
    { name: "actinium", phase: "solid" }, { name: "thorium", phase: "solid" },
    { name: "protactinium", phase: "solid" }, { name: "uranium", phase: "solid" }, 
    { name: "neptunium", phase: "solid" }, { name: "plutonium", phase: "solid" },
    { name: "americium", phase: "solid" }, { name: "curium", phase: "solid" }, 
    { name: "berkelium", phase: "solid" }, { name: "californium", phase: "solid" },
    { name: "einsteinium", phase: "solid" }, { name: "fermium", phase: "solid" }, 
    { name: "mendelevium", phase: "solid" }, { name: "nobelium", phase: "solid" },
    { name: "lawrencium", phase: "solid" }, { name: "rutherfordium", phase: "solid" }, 
    { name: "dubnium", phase: "solid" }, { name: "seaborgium", phase: "solid" },
    { name: "bohrium", phase: "solid" }, { name: "hassium", phase: "solid" }, 
    { name: "meitnerium", phase: "solid" }, { name: "darmstadtium", phase: "solid" },
    { name: "roentgenium", phase: "solid" }, { name: "copernicium", phase: "solid" }, 
    { name: "nihonium", phase: "solid" }, { name: "flerovium", phase: "solid" },
    { name: "moscovium", phase: "solid" }, { name: "livermorium", phase: "solid" }, 
    { name: "tennessine", phase: "solid" }, { name: "oganesson", phase: "gas" }
];

// Helper to generate procedural hex color strings securely
function getElementColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) { hash = str.charCodeAt(i) + ((hash << 5) - hash); }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

// 2. Loop to register the elements safely into Sandboxels engine context
periodicElements.forEach(item => {
    let typeBehavior = behaviors.POWDER; // Default solid behavior
    if (item.phase === "gas") { typeBehavior = behaviors.GAS; }
    if (item.phase === "liquid") { typeBehavior = behaviors.LIQUID; }

    elements[item.name] = {
        color: item.name === "mercury" ? "#8a9597" : getElementColor(item.name),
        behavior: typeBehavior,
        category: "Periodic Table",
        state: item.phase,
        density: item.phase === "gas" ? 1 : (item.phase === "liquid" ? 13000 : 5000)
    };
    elementsList.push(item.name);
});

// 3. Inject the 20 distinct chemical reactions
if (!elements.hydrogen.reactions) { elements.hydrogen.reactions = {}; }
elements.hydrogen.reactions.oxygen = { elem1: "water", elem2: null };

if (!elements.sodium.reactions) { elements.sodium.reactions = {}; }
elements.sodium.reactions.chlorine = { elem1: "salt", elem2: null };
elements.sodium.reactions.water = { elem1: "explosion", elem2: "hydrogen" };

if (!elements.iron.reactions) { elements.iron.reactions = {}; }
elements.iron.reactions.oxygen = { elem1: "rust", elem2: null };

if (!elements.carbon.reactions) { elements.carbon.reactions = {}; }
elements.carbon.reactions.oxygen = { elem1: "carbon_dioxide", elem2: null };

if (!elements.hydrogen.reactions) { elements.hydrogen.reactions = {}; }
elements.hydrogen.reactions.chlorine = { elem1: "acid", elem2: null };

if (!elements.sulfur.reactions) { elements.sulfur.reactions = {}; }
elements.sulfur.reactions.oxygen = { elem1: "sulfur_dioxide", elem2: null };

if (!elements.nitrogen.reactions) { elements.nitrogen.reactions = {}; }
elements.nitrogen.reactions.hydrogen = { elem1: "ammonia", elem2: null };

if (!elements.lithium.reactions) { elements.lithium.reactions = {}; }
elements.lithium.reactions.water = { elem1: "explosion", elem2: "hydrogen" };

if (!elements.potassium.reactions) { elements.potassium.reactions = {}; }
elements.potassium.reactions.water = { elem1: "explosion", elem2: "hydrogen" };

if (!elements.calcium.reactions) { elements.calcium.reactions = {}; }
elements.calcium.reactions.water = { elem1: "slaked_lime", elem2: "hydrogen" };

if (!elements.copper.reactions) { elements.copper.reactions = {}; }
elements.copper.reactions.oxygen = { elem1: "verdigris", elem2: null };

if (!elements.mercury.reactions) { elements.mercury.reactions = {}; }
elements.mercury.reactions.gold = { elem1: "amalgam", elem2: "amalgam" };

if (!elements.uranium.reactions) { elements.uranium.reactions = {}; }
elements.uranium.reactions.neutron = { elem1: "explosion", elem2: "radiation" };

if (!elements.plutonium.reactions) { elements.plutonium.reactions = {}; }
elements.plutonium.reactions.fire = { elem1: "explosion", elem2: "fallout" };

if (!elements.helium.reactions) { elements.helium.reactions = {}; }
elements.helium.reactions.fire = { elem1: "helium", elem2: null };

if (!elements.silver.reactions) { elements.silver.reactions = {}; }
elements.silver.reactions.sulfur = { elem1: "tarnish", elem2: null };

if (!elements.magnesium.reactions) { elements.magnesium.reactions = {}; }
elements.magnesium.reactions.fire = { elem1: "flashbang", elem2: "ash" };

if (!elements.aluminum.reactions) { elements.aluminum.reactions = {}; }
elements.aluminum.reactions.bromine = { elem1: "fire", elem2: "smoke" };

if (!elements.phosphorus.reactions) { elements.phosphorus.reactions = {}; }
elements.phosphorus.reactions.oxygen = { elem1: "fire", elem2: "smoke" };

console.log("Periodic table elements successfully compiled.");
