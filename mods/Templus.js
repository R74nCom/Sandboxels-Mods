// Registriere das Element in der Kategorie "Machines"
elementGrid.temperature_controller = {
    color: "#ff4500", // Eine auffällige rötlich-orange Farbe
    behavior: behaviors.WALL, // Es bewegt sich standardmäßig nicht von alleine
    category: "machines",
    density: 1000,
    hardiness: 1,
    conduct: 0,
    
    // Standard-Eigenschaft für die Zieltemperatur
    targetTemp: 20, 

    // Wird aufgerufen, wenn das Element platziert oder ausgewählt/geklickt wird
    onload: function(pixel) {
        // Falls das Pixel noch keine zugewiesene Temperatur hat, öffne die Abfrage
        let input = prompt("Gib die gewünschte Temperatur in Celsius ein:", pixel.targetTemp || "20");
        if (input !== null && !isNaN(input)) {
            pixel.targetTemp = parseFloat(input);
        } else {
            pixel.targetTemp = 20; // Standardfall, falls die Eingabe ungültig ist
        }
    },

    // Die Logik, die jeden Frame (Tick) ausgeführt wird
    tick: function(pixel) {
        // Überprüfe alle direkten Nachbar-Pixel (oben, unten, links, rechts)
        let neighbors = [
            [pixel.x + 1, pixel.y],
            [pixel.x - 1, pixel.y],
            [pixel.x, pixel.y + 1],
            [pixel.x, pixel.y - 1]
        ];

        for (let i = 0; i < neighbors.length; i++) {
            let nx = neighbors[i][0];
            let ny = neighbors[i][1];

            // Prüfen, ob das Nachbarfeld im Raster liegt und nicht leer ist
            if (isEmpty(nx, ny, true) === false) {
                let neighborPixel = pixelMap[nx][ny];
                
                // Setze die Temperatur des getroffenen Pixels direkt auf den Zielwert
                if (neighborPixel) {
                    neighborPixel.temp = pixel.targetTemp;
                }
            }
        }
    }
};

// Falls Sandboxels die Kategorie beim Laden überschreibt, stellen wir sicher, dass es in "machines" landet
if (elements.temperature_controller) {
    elements.temperature_controller.category = "machines";
}
