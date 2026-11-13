// Sandboxels Mod: Temperature Controller Machine

elements.temperature_controller = {
    color: "#ff4500",
    behavior: behaviors.WALL, // Bleibt fest an Ort und Stelle wie eine Maschine
    category: "machines",
    density: 1000,
    desc: "Ein Steuergerät, das seine eigene Temperatur hält. Klicke es an oder platziere es, um die Temperatur einzustellen.",

    // Wird aufgerufen, wenn das Element in der Welt platziert wird
    onPlace: function(pixel) {
        // Nutzt das native Sandboxels-Popup-System aus deinem Screenshot
        promptUser("TEMPERATURE", "what is the set temperature you want? (Celcius)", function(input) {
            if (input !== null && input !== "") {
                let parsedTemp = parseFloat(input.replace(',', '.'));
                
                // Validierung: Ab dem absoluten Nullpunkt (-273.15)
                if (!isNaN(parsedTemp) && parsedTemp >= -273.15) {
                    pixel.temp = parsedTemp;
                    // Wir speichern die Zieltemperatur im Pixel, damit er sie halten kann
                    pixel.targetTemp = parsedTemp; 
                } else {
                    alert("Bitte gib eine gültige Zahl ab -273,15 ein!");
                }
            }
        });
    },

    // Das Verhalten in jedem Frame (Tick)
    tick: function(pixel) {
        // Wenn eine Zieltemperatur gesetzt wurde, zwinge das Pixel auf diesen Wert
        if (pixel.targetTemp !== undefined) {
            pixel.temp = pixel.targetTemp;
        }
    }
};
