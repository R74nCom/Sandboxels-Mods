elements.hyper = {
    color: ["#000000", "#0000ff", "#000000", "#0000ff", "#000000", "#0000ff", "#000000", "#0000ff", "#000000", "#0000ff", "#000000", "#0000ff", "#000000", "#0000ff", "#000000", "#0000ff", "#000000", "#0000ff", "#000000", "#0000ff", "#000000", "#0000ff", "#000000", "#0000ff"],
    tick: function (pixel) {
        pixelMap[pixel.x][pixel.y] = undefined;
    },
    tool: function (pixel) {
        pixelMap[pixel.x][pixel.y] = undefined;
    },
    category: "edit",
    desc: "Use to lift pixels into hyperspace.",
    insulate: true,
    canPlace: false,
};

elements.dehyper = {
    color: ["#000000", "#ff0000", "#000000", "#ff0000", "#000000", "#ff0000", "#000000", "#ff0000", "#000000", "#ff0000", "#000000", "#ff0000", "#000000", "#ff0000", "#000000", "#ff0000", "#000000", "#ff0000", "#000000", "#ff0000", "#000000", "#ff0000", "#000000", "#ff0000"],
    onPlace: function (pixel) {
        for (let i = 0; i < currentPixels.length; i++) {
            if (currentPixels[i].x === pixel.x && currentPixels[i].y === pixel.y && currentPixels[i] !== pixel) {
                deletePixel(pixel.x, pixel.y);
                pixelMap[pixel.x][pixel.y] = currentPixels[i];
                return;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    tick: function (pixel) {
        for (let i = 0; i < currentPixels.length; i++) {
            if (currentPixels[i].x === pixel.x && currentPixels[i].y === pixel.y && currentPixels[i] !== pixel) {
                deletePixel(pixel.x, pixel.y);
                pixelMap[pixel.x][pixel.y] = currentPixels[i];
                return;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    category: "edit",
    desc: "Bring back pixels from hyperspace.",
	insulate: true,
    canPlace: false,
};