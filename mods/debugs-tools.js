// Sandboxels Debug & God Mode Tools Mod

runAfterLoad(function() {
    // Add custom category for debug tools
    if (!elements.debug_inspector) {
        
        // 1. INSPECTOR TOOL: Logs deep internal data of a pixel to the console & alerts/logs
        elements.debug_inspector = {
            color: "#00ffcc",
            tool: function(pixel) {
                const info = [
                    `Element: ${pixel.element}`,
                    `Pos: (${pixel.x}, ${pixel.y})`,
                    `Temp: ${pixel.temp}°C`,
                    `Color: ${pixel.color}`,
                    `Charge: ${pixel.charge || 0}`,
                    `Start Tick: ${pixel.start}`,
                    `Clone Source: ${pixel.clone || "None"}`,
                    `Burn: ${pixel.burn || 0}`
                ].join(" | ");
                
                console.log("[DEBUG INSPECTOR]", pixel);
                logMessage(info); // Displays in the bottom Sandboxels info bar
            },
            category: "debug",
            desc: "Inspects pixel coordinates, temperature, charge, and internal properties."
        };

        // 2. SUPER HEATER (+500°C per tick)
        elements.super_heat = {
            color: "#ff2a00",
            tool: function(pixel) {
                pixel.temp += 500;
                pixelTempCheck(pixel);
            },
            category: "debug",
            desc: "Rapidly heats pixels by +500°C per tick."
        };

        // 3. ABSOLUTE ZERO (-273.15°C instant freeze)
        elements.abs_zero = {
            color: "#00aaff",
            tool: function(pixel) {
                pixel.temp = -273.15;
                pixelTempCheck(pixel);
            },
            category: "debug",
            desc: "Instantly drops pixel temperature to Absolute Zero (-273.15°C)."
        };

        // 4. ROOM TEMP RESET (20°C)
        elements.reset_temp = {
            color: "#88ff88",
            tool: function(pixel) {
                pixel.temp = 20;
                pixelTempCheck(pixel);
            },
            category: "debug",
            desc: "Resets pixel temperature to 20°C."
        };

        // 5. FORCE CHARGE (Electrifies anything, even insulators)
        elements.force_charge = {
            color: "#ffff00",
            tool: function(pixel) {
                pixel.charge = 1;
                pixel.chargeCD = 5;
            },
            category: "debug",
            desc: "Forces an electrical charge onto any pixel, bypassing conductivity."
        };

        // 6. TRANSMUTE (Turns hovered pixels into your currently selected element)
        // Hold Shift while dragging to copy the element under your cursor instead!
        let transmuteTarget = "gold";
        elements.transmute = {
            color: ["#ff00ff", "#aa00ff"],
            tool: function(pixel) {
                if (shiftDown) {
                    transmuteTarget = pixel.element;
                    logMessage(`Transmute target copied: ${transmuteTarget}`);
                } else if (pixel.element !== transmuteTarget && elements[transmuteTarget]) {
                    changePixel(pixel, transmuteTarget);
                }
            },
            category: "debug",
            desc: "Converts pixels into a target element. Shift-click a pixel to copy its element type."
        };

        // 7. VOID DELETE (Silently erases pixels without triggering reactions/explosions)
        elements.silent_delete = {
            color: "#222222",
            tool: function(pixel) {
                deletePixel(pixel.x, pixel.y);
            },
            category: "debug",
            desc: "Silently deletes pixels from the grid without triggering break/death reactions."
        };

        // 8. FORCE TICK (Forces a pixel to run its tick function immediately)
        elements.force_tick = {
            color: "#ffaa00",
            tool: function(pixel) {
                const info = elements[pixel.element];
                if (info && info.tick) {
                    info.tick(pixel);
                }
            },
            category: "debug",
            desc: "Forces the target pixel to execute its behavior tick rapidly."
        };
    }

    // --- CONSOLE & KEYBOARD SHORTCUTS ---
    // Press 'G' to toggle an FPS & Pixel Count HUD in the top-left corner
    let hudEnabled = false;
    let hudDiv = document.createElement("div");
    hudDiv.style.cssText = `
        position: fixed; top: 10px; left: 10px; z-index: 9999;
        background: rgba(0, 0, 0, 0.75); color: #00ffcc;
        font-family: monospace; font-size: 12px; padding: 8px 12px;
        border: 1px solid #00ffcc; border-radius: 4px; pointer-events: none;
        display: none;
    `;
    document.body.appendChild(hudDiv);

    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    function updateHUD() {
        frames++;
        const now = performance.now();
        if (now - lastTime >= 500) {
            fps = Math.round((frames * 1000) / (now - lastTime));
            frames = 0;
            lastTime = now;
        }
        if (hudEnabled) {
            const pCount = typeof currentPixels !== "undefined" ? currentPixels.length : 0;
            hudDiv.innerHTML = `
                <b>[SANDBOXELS DEBUG HUD]</b><br>
                FPS: ${fps} | TPS: ${tps}<br>
                Active Pixels: ${pCount}<br>
                Grid: ${width}x${height} | Ticks: ${pixelTicks}
            `;
        }
        requestAnimationFrame(updateHUD);
    }
    requestAnimationFrame(updateHUD);

    document.addEventListener("keydown", function(e) {
        // Ignore shortcuts if typing in an input box
        if (document.activeElement.tagName === "INPUT") return;

        if (e.key.toLowerCase() === "g") {
            hudEnabled = !hudEnabled;
            hudDiv.style.display = hudEnabled ? "block" : "none";
            logMessage(`Debug HUD: ${hudEnabled ? "ON" : "OFF"}`);
        }
    });

    // Global helper functions you can run in the F12 Console
    window.sbDebug = {
        fillAll: (el) => {
            if (!elements[el]) return console.error("Invalid element:", el);
            for (let x = 1; x < width - 1; x++) {
                for (let y = 1; y < height - 1; y++) {
                    if (!isEmpty(x, y)) deletePixel(x, y);
                    createPixel(el, x, y);
                }
            }
        },
        replaceAll: (oldEl, newEl) => {
            if (!elements[newEl]) return console.error("Invalid element:", newEl);
            currentPixels.slice().forEach(p => {
                if (p.element === oldEl) changePixel(p, newEl);
            });
        },
        setGlobalTemp: (temp) => {
            currentPixels.forEach(p => {
                p.temp = temp;
                pixelTempCheck(p);
            });
        }
    };

    console.log("%c[Debug Tools Mod Loaded] Press 'G' for HUD, or use window.sbDebug in console.", "color: #00ffcc; font-weight: bold;");
});
