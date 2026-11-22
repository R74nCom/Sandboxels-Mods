if (!elements) { elements = {}; }

elements.custom_uranium = {
    color: ["#2d5a27", "#4cd137", "#1b4d3e"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",             // ERGÄNZT: Teilt dem Spiel explizit mit, dass es ein Feststoff ist
    density: 19100,
    temp: 200,
    conduct: 0.8,
    tick: function(pixel) {
        if (Math.random() < 0.05) {
            var neighbors = [[pixel.x+1, pixel.y], [pixel.x-1, pixel.y], [pixel.x, pixel.y+1], [pixel.x, pixel.y-1]];
            var target = neighbors[Math.floor(Math.random() * neighbors.length)];
            if (isEmpty(target, target)) { createPixel("radiation", target, target); }
        }
        pixel.temp = Math.max(pixel.temp, 200);
    },
    reactions: {
        "water": { elem1: null, elem2: "dirty_water", temp1: 100 },
        "acid": { elem1: "explosion", elem2: null },
        "neutron": { 
            elem1: "explosion", 
            elem2: "neutron", 
            temp1: 5000, 
            chance: 0.8,
            customReaction: function(pixel1, pixel2) {
                for (var i = 0; i < 3; i++) {
                    var rx = pixel1.x + Math.floor(Math.random() * 3) - 1;
                    var ry = pixel1.y + Math.floor(Math.random() * 3) - 1;
                    if (isEmpty(rx, ry)) { createPixel("neutron", rx, ry); }
                }
            }
        }
    }
};
