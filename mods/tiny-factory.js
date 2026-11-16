/*
 * Tiny Factory for Sandboxels
 * Machines handle the pixel directly above them and usually send it right.
 * Pick a demo stamp in the Factory tab to build a complete production line.
 */
(function () {
    "use strict";

    const id = name => "tiny_factory_" + name;
    if (elements[id("belt_right")]) return;

    const movedAt = new WeakMap();
    const ore = id("iron_ore");
    const copper = id("copper_ore");
    const quartz = id("quartz");
    const grit = id("iron_grit");
    const copperGrit = id("copper_grit");
    const gravel = id("gravel");
    const ironBlank = id("iron_blank");
    const copperBlank = id("copper_blank");
    const glassBlank = id("glass_blank");
    const wafer = id("wafer");
    const plate = id("steel_plate");
    const wire = id("copper_wire");
    const gear = id("gear");
    const brick = id("brick");
    const pane = id("glass_pane");
    const resin = id("resin");
    const casing = id("casing");
    const circuit = id("circuit");
    const motor = id("motor");
    const core = id("control_unit");
    const crate = id("crate");

    const metalCargo = new Set([
        ore, copper, grit, copperGrit, ironBlank, copperBlank, plate, wire, gear,
        "metal_scrap"
    ]);
    const finishedCargo = new Set([plate, wire, gear, brick, pane, casing, circuit, motor, core]);
    const materials = new Set([ore, copper, quartz, grit, copperGrit, gravel, ironBlank, copperBlank,
        glassBlank, wafer, resin, crate, ...finishedCargo]);

    function register(key, name, color, desc, properties) {
        elements[id(key)] = { name, color, desc, category: "factory", state: "solid", ...properties };
    }

    function machine(key, name, color, desc, tick, extra = {}) {
        register(key, name, color, desc, {
            tick,
            density: 4200,
            hardness: 0.85,
            insulate: true,
            movable: false,
            excludeRandom: true,
            ...extra
        });
    }

    function material(key, name, color, density, desc) {
        register(key, name, color, desc, {
            behavior: behaviors.STURDYPOWDER || ["XX|XX|XX", "XX|XX|XX", "XX|M1|XX"],
            density,
            movable: true
        });
    }

    function cell(x, y) {
        if (!isEmpty(x, y, true)) {
            const pixel = pixelMap[x][y];
            if (!pixel.del) return pixel;
        }
    }

    function intake(machinePixel, dx = 0, dy = -1) {
        const cargo = cell(machinePixel.x + dx, machinePixel.y + dy);
        if (!cargo || cargo._r !== undefined || movedAt.get(cargo) === pixelTicks) return;
        if (cargo.element.startsWith(id(""))) {
            return materials.has(cargo.element) ? cargo : undefined;
        }
        const definition = elements[cargo.element];
        if (definition && definition.movable && definition.state !== "gas") return cargo;
    }

    function send(machinePixel, cargo, dx = 1, dy = -1) {
        if (!cargo) return false;
        const x = machinePixel.x + dx;
        const y = machinePixel.y + dy;
        if (!isEmpty(x, y)) return false;

        movePixel(cargo, x, y);
        movedAt.set(cargo, pixelTicks);
        return true;
    }

    function spawn(name, x, y) {
        if (!isEmpty(x, y)) return false;
        createPixel(name, x, y);
        const cargo = cell(x, y);
        if (!cargo || cargo.element !== name) return false;

        movedAt.set(cargo, pixelTicks);
        return true;
    }

    function processor(recipes) {
        return pixel => {
            const cargo = intake(pixel);
            if (!cargo) return;
            const result = recipes.get(cargo.element);
            if (send(pixel, cargo) && result) changePixel(cargo, result);
        };
    }

    function assembler(first, second, product) {
        return pixel => {
            const cargo = intake(pixel);
            const outputX = pixel.x + 1;
            const outputY = pixel.y - 1;

            if (pixel.factoryFirst && pixel.factorySecond && spawn(product, outputX, outputY)) {
                pixel.factoryFirst--;
                pixel.factorySecond--;
            }
            if (!cargo) return;

            const bin = cargo.element === first ? "factoryFirst" :
                cargo.element === second ? "factorySecond" : undefined;
            if (bin && (pixel[bin] || 0) < 4) {
                pixel[bin] = (pixel[bin] || 0) + 1;
                deletePixel(cargo.x, cargo.y);
            } else {
                send(pixel, cargo);
            }
        };
    }

    function hopper(key, name, color, feed, desc, interval = 12) {
        machine(key, name, color, desc + " Emits one pixel directly below.", pixel => {
            if (pixel.factoryFeedDelay > 0) {
                pixel.factoryFeedDelay--;
                return;
            }
            const index = pixel.factoryFeedIndex || 0;
            if (spawn(feed[index], pixel.x, pixel.y + 1)) {
                pixel.factoryFeedIndex = (index + 1) % feed.length;
                pixel.factoryFeedDelay = interval - 1;
            }
        });
    }

    function lift(pixel, cargo) {
        if (!cargo || !isEmpty(pixel.x, pixel.y - 2)) return false;
        return send(pixel, cargo, 1, -2);
    }

    function upperFork(pixel, cargo) {
        if (!cargo || !isEmpty(pixel.x, pixel.y - 2) || !isEmpty(pixel.x, pixel.y - 3)) {
            return false;
        }
        return send(pixel, cargo, 1, -3);
    }

    function setStatus(pixel, color, active) {
        if (pixel.factoryLit === active) return;
        pixel.factoryLit = active;
        pixel.color = active ? color : pixelColorPick(pixel);
    }

    // Blue logistics, colored processing blocks, and labeled samples share the Factory tab.
    register("frame", "Factory Frame", "#525c67",
        "Fixed support for machines and the edge of a conveyor line. A frame beside the first belt catches loose sand.",
        { behavior: behaviors.WALL, density: 4200, hardness: 0.9, insulate: true,
            movable: false, excludeRandom: true });
    machine("belt_right", "Conveyor →", "#397d9c", "Moves cargo above it one cell to the right.",
        pixel => send(pixel, intake(pixel)));
    machine("belt_left", "Conveyor ←", "#536fb4", "Moves cargo above it one cell to the left.",
        pixel => send(pixel, intake(pixel), -1));
    machine("express_belt", "Express Belt →", "#279db1",
        "Moves cargo two cells right when both cells are clear. Use a continuous row of Express Belts and end the row before a processor.",
        pixel => {
            const cargo = intake(pixel);
            if (!cargo) return;
            const next = cell(pixel.x + 1, pixel.y);
            if (next && next.element === id("express_belt") && isEmpty(pixel.x + 1, pixel.y - 1) &&
                send(pixel, cargo, 2)) return;
            send(pixel, cargo);
        });
    machine("lift", "Lift ↗", "#328b82",
        "Raises cargo one cell and sends it right. Put the next conveyor one cell right and one cell higher.",
        pixel => lift(pixel, intake(pixel)));
    machine("chute", "Chute ↘", "#426c82",
        "Drops cargo one cell and sends it right. Put the next conveyor one cell right and one cell lower.",
        pixel => {
            if (isEmpty(pixel.x + 1, pixel.y - 1)) send(pixel, intake(pixel), 1, 0);
        });
    machine("arm", "Grabber Arm", "#68a0b0",
        "Grabs cargo immediately left of its intake and places it directly above itself. On the next tick it sends the cargo right.",
        pixel => {
            if (cell(pixel.x, pixel.y - 1)) {
                send(pixel, intake(pixel));
            } else {
                send(pixel, intake(pixel, -1, -1), 0);
            }
        });
    machine("splitter", "Belt Splitter", "#9373bd",
        "Alternates between a straight exit and a raised exit. The first belt of the raised lane goes one right and two up. Keeps its turn when that exit is full.",
        pixel => {
            const cargo = intake(pixel);
            const routed = pixel.factoryUpper ? upperFork(pixel, cargo) : send(pixel, cargo);
            if (routed) pixel.factoryUpper = !pixel.factoryUpper;
        });
    machine("sorter", "Magnetic Sorter", "#b45b83",
        "Routes metal ores, grits, blanks, sheet, wire, and gears to the raised lane. Other cargo goes straight. Put the first raised belt one right and two up.",
        pixel => {
            const cargo = intake(pixel);
            if (!cargo) return;
            if (metalCargo.has(cargo.element)) upperFork(pixel, cargo);
            else send(pixel, cargo);
        });
    machine("gate", "Powered Gate", "#405e69",
        "Holds cargo until it receives electricity. Put a Battery or a powered wire directly underneath.",
        pixel => {
            doElectricity(pixel);
            if (pixel.charge > 0) send(pixel, intake(pixel));
        }, { conduct: 1, colorOn: "#79db86" });
    machine("sensor", "Cargo Sensor", "#396c56",
        "Sends an electric pulse to neighboring conductors when it sees movable cargo above, then sends the cargo right.",
        pixel => {
            const cargo = intake(pixel);
            if (cargo && !pixel.charge && !pixel.chargeCD) pixel.charge = 1;
            doElectricity(pixel);
            setStatus(pixel, "rgb(128,223,143)", Boolean(pixel.charge));
            send(pixel, cargo);
        }, { conduct: 1 });
    machine("dock", "Shipping Dock", "#35594b",
        "Accepts crates and finished parts from above, flashing green for each shipment. Hover to see your shipment count. Other materials pass right.",
        pixel => {
            const cargo = intake(pixel);
            if (cargo && (cargo.element === crate || finishedCargo.has(cargo.element))) {
                deletePixel(cargo.x, cargo.y);
                pixel.factoryShipments = (pixel.factoryShipments || 0) + 1;
                pixel.factoryFlash = 4;
            } else {
                send(pixel, cargo);
            }
            setStatus(pixel, "rgb(102,233,153)", pixel.factoryFlash > 0);
            if (pixel.factoryFlash > 0) pixel.factoryFlash--;
        }, { hoverStat: pixel => "Shipped " + (pixel.factoryShipments || 0) });

    hopper("ore_hopper", "Ore Hopper", "#876d51", [ore, copper],
        "Alternates iron ore and copper ore.");
    hopper("scrap_hopper", "Scrap Hopper", "#7c6360", [ore, "sand", copper, gravel, resin, quartz],
        "Cycles iron ore, sand, copper ore, gravel, resin pellets and quartz.");
    hopper("circuit_hopper", "Circuit Hopper", "#87668f", [copper, quartz],
        "Alternates copper ore and quartz for the circuit line.");
    hopper("resin_hopper", "Resin Hopper", "#497f8a", [resin],
        "Feeds resin pellets to a Plastic Extruder.");
    hopper("sand_hopper", "Sand Hopper", "#937c42", ["sand"],
        "Feeds ordinary Sand for the glass line.");

    machine("crusher", "Rock Crusher", "#a74e3e",
        "Crushes iron ore or metal scrap into iron grit, copper ore into copper grit, and rock, basalt or concrete into gravel. Other cargo passes through.",
        processor(new Map([[ore, grit], [copper, copperGrit], ["metal_scrap", grit],
            ["rock", gravel], ["basalt", gravel], ["concrete", gravel]])));
    machine("smelter", "Smelter", "#c56b3a",
        "Iron grit makes iron blanks, copper grit makes copper blanks, quartz makes silicon wafers, and sand makes glass blanks.",
        processor(new Map([[grit, ironBlank], [copperGrit, copperBlank], [quartz, wafer],
            ["sand", glassBlank]])));
    machine("roller", "Rolling Mill", "#88758e",
        "Rolls iron blanks into steel plates and draws copper blanks into copper wire.",
        processor(new Map([[ironBlank, plate], [copperBlank, wire]])));
    machine("press", "Gear Press", "#b27f3d",
        "Stamps iron blanks into gears. Other cargo passes through.",
        processor(new Map([[ironBlank, gear]])));
    machine("kiln", "Brick Kiln", "#aa533d",
        "Turns gravel or clay into bricks.",
        processor(new Map([[gravel, brick], ["clay", brick]])));
    machine("cutter", "Glass Cutter", "#537f9d",
        "Cuts glass blanks into panes.",
        processor(new Map([[glassBlank, pane]])));
    machine("extruder", "Plastic Extruder", "#3f8890",
        "Turns resin pellets into plastic casings.",
        processor(new Map([[resin, casing]])));
    machine("circuit_bench", "Circuit Bench", "#467b57",
        "Combines a silicon wafer and copper wire into a circuit board. Accepts both from the same belt in either order, storing up to four of each.",
        assembler(wafer, wire, circuit));
    machine("motor_assembler", "Motor Assembler", "#7773a8",
        "Combines a gear and copper wire into an electric motor. Accepts both from the same belt in either order, storing up to four of each.",
        assembler(gear, wire, motor));
    machine("control_assembler", "Control Assembler", "#8d5a9b",
        "Combines a circuit board and a plastic casing into a control unit. Accepts both from the same belt in either order, storing up to four of each.",
        assembler(circuit, casing, core));
    machine("packer", "Crate Packer", "#a87c55",
        "Packs each finished part into a freight crate. Crates can be sent to a Shipping Dock.",
        processor(new Map([...finishedCargo].map(name => [name, crate]))));
    machine("recycler", "Recycler", "#4c8b64",
        "Salvages gears, plates and iron blanks as iron grit. Copper wire and copper blanks return to copper grit, and casings return to resin.",
        processor(new Map([[gear, grit], [plate, grit], [ironBlank, grit],
            [wire, copperGrit], [copperBlank, copperGrit], [casing, resin]])));

    material("iron_ore", "Iron Ore", ["#7a6259", "#9a6654", "#a07760"], 3900, "Crush it into iron grit.");
    material("copper_ore", "Copper Ore", ["#566c60", "#387c66", "#698d70"], 3500, "Crush it into copper grit.");
    material("quartz", "Factory Quartz", ["#b78bd3", "#e9c6f2", "#ceaddf"], 2650, "Smelt it into a silicon wafer.");
    material("iron_grit", "Iron Grit", ["#75685e", "#b58b74"], 4400, "Smelt it into an iron blank.");
    material("copper_grit", "Copper Grit", ["#cf8a57", "#a76446"], 4300, "Smelt it into a copper blank.");
    material("gravel", "Factory Gravel", ["#8f8e83", "#a7a698"], 1700, "Fire it in a Brick Kiln.");
    material("iron_blank", "Iron Blank", ["#a0a9b2", "#c9ccd0"], 7400, "Feed it to a Gear Press or Rolling Mill.");
    material("copper_blank", "Copper Blank", ["#d38752", "#e4a673"], 8450, "Draw it into wire in a Rolling Mill.");
    material("glass_blank", "Glass Blank", ["#73a6b2", "#a0c8cc"], 2350, "Cut it into a glass pane.");
    material("wafer", "Silicon Wafer", ["#627094", "#8f9abe"], 2350, "Combine it with copper wire in a Circuit Bench.");
    material("steel_plate", "Steel Plate", ["#93a9ba", "#bdc8cd"], 7700, "Rolled iron. Ready to ship or recycle.");
    material("copper_wire", "Copper Wire", ["#f3a658", "#b86f3f"], 4950, "Used in circuits and motors.");
    material("gear", "Gear", ["#b9a084", "#dfc99d"], 6000, "Combine with copper wire in a Motor Assembler.");
    material("brick", "Factory Brick", ["#a24e42", "#c57158"], 1980, "Ready to ship.");
    material("glass_pane", "Glass Pane", ["#9bd1d7", "#c0e5e9"], 2200, "Ready to ship.");
    material("resin", "Resin Pellets", ["#608d9e", "#7bb3bf"], 930, "Use a Plastic Extruder to make a casing.");
    material("casing", "Plastic Casing", ["#4a97a1", "#76bdc4"], 1120, "Combine with a circuit board in a Control Assembler.");
    material("circuit", "Circuit Board", ["#55954b", "#80ba60"], 1800, "Ready to ship or assemble into a control unit.");
    material("motor", "Electric Motor", ["#8381ad", "#b0a8d2"], 5200, "Ready to pack or ship.");
    material("control_unit", "Control Unit", ["#a47bbb", "#d0adde"], 2200, "Ready to pack or ship.");
    material("crate", "Freight Crate", ["#c7904f", "#dea863"], 850, "Deliver it to the Shipping Dock.");

    function demo(key, name, color, feed, line) {
        register(key, name, color,
            "Click an empty spot to stamp a running factory. Allow " + line.length +
            " cells to the right and two above the click. A blocked stamp disappears without building.",
            {
                behavior: behaviors.WALL,
                excludeRandom: true,
                maxSize: 1,
                onPlace(marker) {
                    const x = marker.x;
                    const y = marker.y;
                    deletePixel(x, y);
                    for (let dx = 0; dx < line.length; dx++) {
                        for (let dy = -2; dy <= 0; dy++) {
                            if (!isEmpty(x + dx, y + dy)) return;
                        }
                    }
                    if (typeof maxPixelCount === "number" &&
                        currentPixels.length + line.length + 1 > maxPixelCount) return;
                    line.forEach((machineName, dx) => spawn(id(machineName), x + dx, y));
                    spawn(id(feed), x + 1, y - 2);
                }
            });
    }

    demo("demo_motors", "Stamp Motor Factory", "#dcad62", "ore_hopper",
        ["frame", "belt_right", "crusher", "smelter", "press", "roller", "motor_assembler", "packer", "dock"]);
    demo("demo_circuits", "Stamp Circuit Factory", "#a98ad2", "circuit_hopper",
        ["frame", "belt_right", "crusher", "smelter", "roller", "circuit_bench", "packer", "dock"]);
    demo("demo_glass", "Stamp Glass Factory", "#83bfd1", "sand_hopper",
        ["frame", "belt_right", "smelter", "cutter", "packer", "dock"]);
})();
