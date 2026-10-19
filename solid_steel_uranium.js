// ============================================================
//  Sandboxels Mod: Solid Uranium + Molten Solid Uranium
//  Elemente: solid_uranium, molten_solid_uranium
// ============================================================

elements.solid_uranium = {
    color: "#8a8a8a",
    colorRange: 10,
    category: "solids",
    state: "solid",
    density: 19100,
    hardness: 6,
    tempHigh: 1405,    // Schmelzpunkt in °C (echter Uranschmelzpunkt ~1132°C, hier etwas angepasst)
    stateHigh: "molten_solid_uranium",
    tempLow: null,

    // Strahlung / Radioaktivität
    radioactive: true,
    tick: function(pixel) {
        // Atomspaltung: seltene Chance spontaner Spaltung
        if (Math.random() < 0.0003) {
            // Erzeugt neutron als Spaltprodukt (falls vorhanden), sonst radiation
            let spawnElement = elements["neutron"] ? "neutron" : "radiation";

            // Spaltprodukte in zufällige Richtungen aussenden
            let angle1 = Math.random() * Math.PI * 2;
            let angle2 = angle1 + Math.PI + (Math.random() - 0.5) * 0.8;

            for (let angle of [angle1, angle2]) {
                let dx = Math.round(Math.cos(angle) * (Math.floor(Math.random() * 3) + 1));
                let dy = Math.round(Math.sin(angle) * (Math.floor(Math.random() * 3) + 1));
                let nx = pixel.x + dx;
                let ny = pixel.y + dy;
                if (inBounds(nx, ny)) {
                    let target = pixelMap[nx][ny];
                    if (!target || target.element === "air") {
                        createPixel(spawnElement, nx, ny);
                    }
                }
            }

            // Wärme durch Kernspaltung freisetzen
            pixel.temp += 80 + Math.random() * 120;
        }

        // Kettenreaktion: wenn ein Neutron trifft → sofortige Spaltung
        let neighbors = getNeighbors(pixel.x, pixel.y);
        for (let n of neighbors) {
            if (n && n.element === "neutron") {
                // Neutron absorbieren → Kettenreaktion auslösen
                deletePixel(n.x, n.y);

                // Viel Energie freisetzen
                pixel.temp += 400 + Math.random() * 300;

                // Mehrere Neutronen + Strahlung aussenden
                let spawnCount = 2 + Math.floor(Math.random() * 3);
                for (let i = 0; i < spawnCount; i++) {
                    let angle = Math.random() * Math.PI * 2;
                    let dx = Math.round(Math.cos(angle) * (Math.floor(Math.random() * 4) + 1));
                    let dy = Math.round(Math.sin(angle) * (Math.floor(Math.random() * 4) + 1));
                    let nx = pixel.x + dx;
                    let ny = pixel.y + dy;
                    if (inBounds(nx, ny)) {
                        let target = pixelMap[nx][ny];
                        if (!target || target.element === "air") {
                            createPixel("neutron", nx, ny);
                        }
                    }
                }

                // Strahlung rundum
                for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                    let dx = Math.round(Math.cos(angle) * (2 + Math.floor(Math.random() * 3)));
                    let dy = Math.round(Math.sin(angle) * (2 + Math.floor(Math.random() * 3)));
                    let nx = pixel.x + dx;
                    let ny = pixel.y + dy;
                    if (inBounds(nx, ny)) {
                        let target = pixelMap[nx][ny];
                        if (!target || target.element === "air") {
                            createPixel("radiation", nx, ny);
                        }
                    }
                }

                break;
            }
        }

        // Strahlung auf Umgebung übertragen (schwache Hintergrundstrahlung)
        if (Math.random() < 0.001) {
            let angle = Math.random() * Math.PI * 2;
            let dx = Math.round(Math.cos(angle));
            let dy = Math.round(Math.sin(angle));
            let nx = pixel.x + dx;
            let ny = pixel.y + dy;
            if (inBounds(nx, ny) && pixelMap[nx][ny]) {
                pixelMap[nx][ny].temp += 0.5;
            }
        }
    },

    // Farbe leicht variieren für metallischen Look
    colorFunction: function(pixel) {
        let base = 138; // ~#8a
        let v = base + Math.floor(Math.sin(pixel.x * 0.7 + pixel.y * 0.4) * 8);
        let hex = v.toString(16).padStart(2, "0");
        return `#${hex}${hex}${hex}`;
    },

    desc: "Festes Uran. Radioaktiv – spaltet sich spontan und reagiert auf Neutronen mit einer Kettenreaktion. Entsteht durch Mischung von geschmolzenem Uran und geschmolzenem Stahl.",
};

// ============================================================
//  Molten Solid Uranium – die geschmolzene Form
// ============================================================

elements.molten_solid_uranium = {
    color: "#c47a00",
    colorRange: 20,
    category: "solids",   // bleibt in der Solids-Kategorie (als Schmelze)
    state: "liquid",
    density: 17500,
    viscosity: 18,
    tempLow: 1405,
    stateLow: "solid_uranium",
    tempHigh: 3818,       // Siedepunkt Uran
    stateHigh: "radiation", // verdampft zu Strahlung

    // Radioaktiv auch in flüssiger Form
    radioactive: true,
    tick: function(pixel) {
        // Schwächere Spontanspaltung in flüssiger Form
        if (Math.random() < 0.0001) {
            pixel.temp += 50 + Math.random() * 80;

            let angle = Math.random() * Math.PI * 2;
            let dx = Math.round(Math.cos(angle));
            let dy = Math.round(Math.sin(angle));
            let nx = pixel.x + dx;
            let ny = pixel.y + dy;
            if (inBounds(nx, ny)) {
                let target = pixelMap[nx][ny];
                if (!target || target.element === "air") {
                    let spawnElement = elements["neutron"] ? "neutron" : "radiation";
                    createPixel(spawnElement, nx, ny);
                }
            }
        }

        // Reagiert auf Neutronen auch in flüssiger Form
        let neighbors = getNeighbors(pixel.x, pixel.y);
        for (let n of neighbors) {
            if (n && n.element === "neutron") {
                deletePixel(n.x, n.y);
                pixel.temp += 200 + Math.random() * 200;

                for (let i = 0; i < 2; i++) {
                    let angle = Math.random() * Math.PI * 2;
                    let dx = Math.round(Math.cos(angle) * (1 + Math.floor(Math.random() * 3)));
                    let dy = Math.round(Math.sin(angle) * (1 + Math.floor(Math.random() * 3)));
                    let nx = pixel.x + dx;
                    let ny = pixel.y + dy;
                    if (inBounds(nx, ny)) {
                        let target = pixelMap[nx][ny];
                        if (!target || target.element === "air") {
                            createPixel("neutron", nx, ny);
                        }
                    }
                }
                break;
            }
        }
    },

    // Orangegelb-glühende Farbe mit Variation
    colorFunction: function(pixel) {
        let t = (Date.now() / 200 + pixel.x * 0.3 + pixel.y * 0.5);
        let flicker = Math.floor(Math.sin(t) * 15);
        let r = Math.min(255, 196 + flicker);
        let g = Math.min(255, Math.max(0, 100 + flicker));
        let toHex = v => v.toString(16).padStart(2, "0");
        return `#${toHex(r)}${toHex(g)}00`;
    },

    desc: "Geschmolzenes Solid-Uran. Entsteht, wenn molten_uranium und molten_steel gemischt werden. Erstarrt zu Solid Uranium.",
};

// ============================================================
//  Mischungsreaktion: molten_uranium + molten_steel
//  → molten_solid_uranium
// ============================================================

// Reaktion registrieren (Sandboxels-Standard: reactions-Objekt)
if (!reactions) {
    console.warn("[SolidUraniumMod] reactions-Objekt nicht gefunden – Mod evtl. falsch geladen.");
} else {
    // molten_uranium + molten_steel → molten_solid_uranium
    reactions["molten_uranium"]["molten_steel"] = {
        elem1: "molten_solid_uranium",
        elem2: "molten_solid_uranium",
    };

    // Auch in umgekehrter Reihenfolge
    reactions["molten_steel"]["molten_uranium"] = {
        elem1: "molten_solid_uranium",
        elem2: "molten_solid_uranium",
    };
}
