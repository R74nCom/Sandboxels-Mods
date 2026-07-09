// Sandboxels Mod: Temperature Controller
let customSetTemperature = 20; // Standardwert in Celsius

elements.temperature_controller = {
    color: "#ff4500",
    tool: function(pixel) {
        // Umrechnung von Celsius in die interne Sandboxels-Temperatur (Kelvin-basiert)
        pixel.temp = customSetTemperature;
    },
    category: "tools",
    desc: "Klicke auf Pixel, um ihre Temperatur exakt einzustellen.",
    
    // Wird aufgerufen, sobald das Tool im Menü ausgewählt wird
    onSelected: function() {
        let input = prompt("what is the set temperature you want? (Celcius)", customSetTemperature);
        
        if (input !== null) {
            let parsedTemp = parseFloat(input.replace(',', '.'));
            
            // Validierung: Zwischen dem absoluten Nullpunkt (-273.15) und unendlich
            if (!isNaN(parsedTemp) && parsedTemp >= -273.15) {
                customSetTemperature = parsedTemp;
                // Feedback in der Beschreibung anzeigen
                elements.temperature_controller.desc = `Setzt die Temperatur auf ${customSetTemperature}°C.`;
            } else {
                alert("Bitte gib eine gültige Zahl ab -273,15 ein!");
            }
        }
    }
};
