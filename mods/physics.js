airResistance = 0.1;
terminalVelocity = 5;
gravityPull = 0.2;
elements.head.noGravity = true;
elements.body.noGravity = true;

validateMoves((pixel,nx,ny) => {
    if (elements[pixel.element].isGas || elements[pixel.element].noGravity) return true;
    if (isEmpty(pixel.x,pixel.y+1) && pixel.y-ny < 0) { //goes down usually
        pixel.vy = (pixel.vy||0) + gravityPull;
    }
    return true;
})

runPerPixel((pixel) => {

    let vx = pixel.vx;
    let vy = pixel.vy;
    if (vx === undefined ) vx = 0;
    if (vy === undefined ) vy = 0;

    if (Math.sqrt(vx * vx + vy * vy) > terminalVelocity) {
        vx = vx / Math.sqrt(vx * vx + vy * vy) * (Math.sqrt(vx * vx + vy * vy) + terminalVelocity) / 2;
        vy = vy / Math.sqrt(vx * vx + vy * vy) * (Math.sqrt(vx * vx + vy * vy) + terminalVelocity) / 2;
    }

    let airLoss = typeof pixel.airLoss != 'undefined' ? pixel.airLoss : 0.9;
    pressureMap[pixel.x][pixel.y].vx = pressureMap[pixel.x][pixel.y].vx * airLoss;
    pressureMap[pixel.x][pixel.y].vy = pressureMap[pixel.x][pixel.y].vy * airLoss;
    
    if (!elements[pixel.element].movable) {
        pixel.vx = 0;
        pixel.vy = 0;
        return;
    };

    if (vx !== 0 || vy !== 0) {

        // Calculate change in position; Random chance for in-between decimal values
        const changeX = Math.trunc(vx) +
                      (Math.random() < (Math.abs(vx) % 1) ? Math.sign(vx) : 0);
        const changeY = Math.trunc(vy) +
                      (Math.random() < (Math.abs(vy) % 1) ? Math.sign(vy) : 0);

        const loopFor = Math.max(Math.abs(changeX),Math.abs(changeY));
        // console.log(Math.trunc(vy));

        // let hit = false;
        let prevX = pixel.x;
        let prevY = pixel.y;
        for (let i = 0; i < loopFor; i++) {
            const newX = pixel.x + (changeX && Math.abs(changeX) > i ? Math.sign(changeX) : 0);
            const newY = pixel.y + (changeY && Math.abs(changeY) > i ? Math.sign(changeY) : 0);

            if (!tryMove(pixel,newX,newY)) {
                if (!isEmpty(newX,newY,true)) {
                    const newPixel = pixelMap[newX][newY];
                    newPixel.vx = (newPixel.vx||0) + vx*0.6;
                    newPixel.vy = (newPixel.vy||0) + vy*0.6;
                }
                vx = vx*0.4;
                vy = vy*0.4;
            };
        }
        
        if (prevX !== pixel.x || prevY !== pixel.y) {
            let drag = typeof pixel.drag != 'undefined' ? pixel.drag : 0.01;
            pressureMap[pixel.x][pixel.y].vx += drag * vx;
            pressureMap[pixel.x][pixel.y].vy += drag * vy;
        }


        // const newX = pixel.x + changeX;
        // const newY = pixel.y + changeY;

        const multiplier = (1-airResistance);
        vx = vx * multiplier;
        vy = vy * multiplier;

    }
    

    let density = typeof pixel.density != 'undefined' ? pixel.density : 1000;
    let advection = typeof pixel.advection != 'undefined' ? pixel.advection : 1;
    
    let x = pixel.x;
    let y = pixel.y;
    
    let accelx = advection*pressureMap[x][y].vx/density*1000;
    let accely = advection*pressureMap[x][y].vy/density*1000;
    
    pixel.vx = vx + accelx;
    pixel.vy = vy + accely;

    // Cut off very low decimal values
    if (Math.abs(pixel.vx) < 0.01) pixel.vx = 0;
    if (Math.abs(pixel.vy) < 0.01) pixel.vy = 0;

})

elements.push_up = {
    color: "#ffffff",
    tool: function(pixel) {
        pixel.vx = (Math.random() * 2) * (Math.random() < 0.5 ? 1 : -1);
        pixel.vy = (Math.random() * 2) * -1;
    },
    category: "special"
}

elements.repeller = {
    color: "#ffffff",
    tick: function(pixel) {
        var coords = circleCoords(pixel.x,pixel.y,5);
        for (var i = 0; i < coords.length; i++) {
            var coord = coords[i];
            if (!isEmpty(coord.x,coord.y,true)) {
                if (!elements[pixelMap[coord.x][coord.y].element].movable) continue;
                pixelMap[coord.x][coord.y].vx = (pixelMap[coord.x][coord.y].vx||0) + (Math.random() < 0.5 ? 1 : -1);
                pixelMap[coord.x][coord.y].vy = (pixelMap[coord.x][coord.y].vy||0) -1;
            }
        }
    },
    movable: false,
    category: "machines",
    emit: true
}

viewInfo["4"] = { // Velocity View
    name: "velocity",
    pixel: function(pixel,ctx) {
        const thermalMin = -5;
        const thermalMax = 5;

        var temp = pixel.vx || 0;
        var hue = Math.round((temp - thermalMin) / (thermalMax - thermalMin) * 255);
        if (hue < 0) {hue = 0}
        if (hue > 225) {hue = 225}
        drawSquare(ctx,"hsl("+hue+",100%,50%)",pixel.x,pixel.y)
    }
}

renderPostPixel(function (ctx) {
    if (currentElement === "vacuum" || currentElement === "pressure") {
        for (let x = 0; x < pressureMap.length; x++) {
            for (let y = 0; y < pressureMap[x].length; y++) {
                if (pressureMap[x][y]) {
                    var alpha = pressureMap[x][y].pressure/5;
                    if (alpha <= -1) {
                        alpha = -1;
                    }
                    if (alpha >= 1) {
                        alpha = 1;
                    }
                    if (alpha <= 0) {
                        drawSquare(ctx, "rgb(100%,0%,0%)", x, y, 1, -alpha);
                    } else {
                        drawSquare(ctx, "rgb(0%,0%,100%)", x, y, 1, alpha);
                    }
                    // ctx.strokeStyle = "white";
                    // ctx.lineWidth = 5;
                    // ctx.globalAlpha = 1;
                    // ctx.beginPath(); // Start a new path
                    // ctx.moveTo(canvasCoord(x), canvasCoord(y));
                    // ctx.lineTo(canvasCoord(x)+pressureMap[x][y].vx*100, canvasCoord(y)+pressureMap[x][y].vy*100);
                    // ctx.stroke();
                }
            
            }
        }
    }
});


explodeAt = function (x, y, radius, fire = "fire") {
    // if fire contains , split it into an array
    if (fire.indexOf(",") !== -1) {
        fire = fire.split(",");
    }
    var coords = circleCoords(x, y, radius);
    var power = radius / 10;
    //for (var p = 0; p < Math.round(radius/10+1); p++) {
    for (var i = 0; i < coords.length; i++) {
        // damage value is based on distance from x and y
        var distance = (Math.floor(Math.sqrt(Math.pow(coords[i].x - x, 2) + Math.pow(coords[i].y - y, 2)))) / radius;
        var distance2 = (Math.sqrt(Math.pow(coords[i].x - x, 2) + Math.pow(coords[i].y - y, 2))) / radius;
        var angle = Math.atan2(coords[i].y - y, coords[i].x - x);
        var damage = Math.random() + distance;
        // invert
        damage = 1 - damage;
        if (damage < 0) { damage = 0; }
        damage *= power;
        pressureMap[coords[i].x][coords[i].y].vx += power * (1 - distance2) * Math.cos(angle);
        pressureMap[coords[i].x][coords[i].y].vy += power * (1 - distance2) * Math.sin(angle);
        pressureMap[coords[i].x][coords[i].y].pressure += power * (1 - distance2);
        if (isEmpty(coords[i].x, coords[i].y)) {
            // create smoke or fire depending on the damage if empty
            if (damage < 0.02) { } // do nothing
            else if (damage < 0.2) {
                createPixel("smoke", coords[i].x, coords[i].y);
                pixelMap[coords[i].x][coords[i].y].vx = power * (1 - distance2) * Math.cos(angle);
                pixelMap[coords[i].x][coords[i].y].vy = power * (1 - distance2) * Math.sin(angle);
            }
            else {
                // if fire is an array, choose a random item
                if (Array.isArray(fire)) {
                    createPixel(fire[Math.floor(Math.random() * fire.length)], coords[i].x, coords[i].y);
                }
                else {
                    createPixel(fire, coords[i].x, coords[i].y);
                }
                pixelMap[coords[i].x][coords[i].y].vx = power * (1 - distance2) * Math.cos(angle);
                pixelMap[coords[i].x][coords[i].y].vy = power * (1 - distance2) * Math.sin(angle);
            }
        }
        else if (!outOfBounds(coords[i].x, coords[i].y)) {
            // damage the pixel
            var pixel = pixelMap[coords[i].x][coords[i].y];
            var info = elements[pixel.element];
            if (info.hardness) { // lower damage depending on hardness(0-1)
                if (info.hardness < 1) {
                    // more hardness = less damage, logarithmic
                    damage *= Math.pow((1 - info.hardness), info.hardness);
                }
                else { damage = 0; }
            }
            pixel.vx = (pixel.vx || 0) + power * (1 - distance2) * Math.cos(angle);
            pixel.vy = (pixel.vy || 0) + power * (1 - distance2) * Math.sin(angle);
            if (damage > 0.9) {
                if (Array.isArray(fire)) {
                    var newfire = fire[Math.floor(Math.random() * fire.length)];
                }
                else {
                    var newfire = fire;
                }
                changePixel(pixel, newfire);
                // pixel.vy = 10 * damage * (Math.random() < 0.5 ? 1 : -1);
                // pixel.vx = 10 * damage * (Math.random() < 0.5 ? 1 : -1);
                continue;
            }
            else if (damage > 0.25) {
                if (isBreakable(pixel)) {
                    breakPixel(pixel);
                    continue;
                }
                else {
                    if (Array.isArray(fire)) {
                        var newfire = fire[Math.floor(Math.random() * fire.length)];
                    }
                    else {
                        var newfire = fire;
                    }
                    if (elements[pixel.element].onBreak !== undefined) {
                        elements[pixel.element].onBreak(pixel);
                    }
                    changePixel(pixel, newfire);
                    // pixel.vy = 10 * damage * (Math.random() < 0.5 ? 1 : -1);
                    // pixel.vx = 10 * damage * (Math.random() < 0.5 ? 1 : -1);
                    continue;
                }
            }
            if (damage > 0.75 && info.burn) {
                pixel.burning = true;
                pixel.burnStart = pixelTicks;
            }
            pixel.temp += damage * radius * power;
            // console.log(pixel.vy);
            pixelTempCheck(pixel);
        }
    }
};



let pressureMap = [];
let nextPressureMap = [];
{
    const advDistanceMult = 1.5;
    const tStepP = 0.3;
    const tStepV = 0.4;
    const vAdv = 0.3;
    const vLoss = 0.999;
    const pLoss = 0.9999;

    const kernel = Array(9);
    let s = 0;
    for (let j = -1; j < 2; j++) {
        for (let i = -1; i < 2; i++) {
            kernel[(i + 1) + 3 * (j + 1)] = Math.exp(-2 * (i * i + j * j));
            s += kernel[(i + 1) + 3 * (j + 1)];
        }
    }
    s = 1. / s;
    for (let j = -1; j < 2; j++) {
        for (let i = -1; i < 2; i++) {
            kernel[(i + 1) + 3 * (j + 1)] *= s;
        }
    }

    function initializePressuremap(width, height) {
        pressureWidth = Math.ceil(width);
        pressureHeight = Math.ceil(height);
    
        for (let x = 0; x <= pressureWidth; x++) {
            pressureMap[x] = [];
            nextPressureMap[x] = [];
            for (let y = 0; y <= pressureHeight; y++) {
                pressureMap[x][y] = { pressure: 0, vx: 0, vy: 0 };
                nextPressureMap[x][y] = { pressure: 0, vx: 0, vy: 0 };
            }
        }
    }


    function updatePressure() {
        if (!pressureMap || !pressureMap[0]) { return; }
    
    
        //ported from powder toy
        for (let i = 0; i < pressureMap.length; i++) //reduces pressure/velocity on the edges every frame
        {
            pressureMap[i][0].pressure = pressureMap[i][0].pressure * 0.8;
            pressureMap[i][pressureMap[0].length - 1].pressure = pressureMap[i][pressureMap[0].length - 1].pressure * 0.8;
            pressureMap[i][0].vx = pressureMap[i][0].vx * 0.8;
            pressureMap[i][pressureMap[0].length - 1].vx = pressureMap[i][pressureMap[0].length - 1].vx * 0.8;
            pressureMap[i][0].vy = pressureMap[i][0].vy * 0.8;
            pressureMap[i][pressureMap[0].length - 1].vy = pressureMap[i][pressureMap[0].length - 1].vy * 0.8;
        }
        //ported from powder toy
        for (let i = 0; i < pressureMap[0].length; i++) //reduces pressure/velocity on the edges every frame
        {
            pressureMap[0][i].pressure = pressureMap[0][i].pressure * 0.8;
            pressureMap[pressureMap.length - 1][i].pressure = pressureMap[pressureMap.length - 1][i].pressure * 0.8;
            pressureMap[0][i].vx = pressureMap[0][i].vx * 0.8;
            pressureMap[pressureMap.length - 1][i].vx = pressureMap[pressureMap.length - 1][i].vx * 0.8;
            pressureMap[0][i].vy = pressureMap[0][i].vy * 0.8;
            pressureMap[pressureMap.length - 1][i].vy = pressureMap[pressureMap.length - 1][i].vy * 0.8;
        }
    
        for (let x = 0; x < pressureMap.length; x++) {
            for (let y = 0; y < pressureMap[x].length; y++) {
                Object.assign(nextPressureMap[x][y], pressureMap[x][y]);
            
                let dp = 0;
                dp += (x > 0 && x < pressureMap.length - 1) ? pressureMap[x - 1][y].vx - pressureMap[x + 1][y].vx : 0;
                dp += (y > 0 && y < pressureMap[x].length - 1) ? pressureMap[x][y - 1].vy - pressureMap[x][y + 1].vy : 0;
                nextPressureMap[x][y].pressure *= pLoss;
                nextPressureMap[x][y].pressure += dp * tStepP * 0.5;
            
                let dx = 0;
                let dy = 0;
                dx += (x > 0 && x < pressureMap.length - 1) ? pressureMap[x - 1][y].pressure - pressureMap[x + 1][y].pressure : 0;
                dy += (y > 0 && y < pressureMap[x].length - 1) ? pressureMap[x][y - 1].pressure - pressureMap[x][y + 1].pressure : 0;
                nextPressureMap[x][y].vx *= vLoss;
                nextPressureMap[x][y].vy *= vLoss;
                nextPressureMap[x][y].vx += dx * tStepV * 0.5;
                nextPressureMap[x][y].vy += dy * tStepV * 0.5;
            }
        }
    
        for (let x = 0; x < pressureMap.length; x++) {
            for (let y = 0; y < pressureMap[x].length; y++) {
                Object.assign(pressureMap[x][y], nextPressureMap[x][y]);
            }
        }
    
        for (let x = 0; x < pressureMap.length; x++) {
            for (let y = 0; y < pressureMap[x].length; y++) {
                let dx = 0;
                let dy = 0;
                let dp = 0;
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (y + j >= 0 && y + j < pressureMap[x].length &&
                            x + i >= 0 && x + i < pressureMap.length) {
                            let f = kernel[(i + 1) + 3 * (j + 1)];
                            dx += f * pressureMap[x + i][y + j].vx;
                            dy += f * pressureMap[x + i][y + j].vy;
                            dp += f * pressureMap[x + i][y + j].pressure;
                        }
                    }
                }

                let tx = x - dx * advDistanceMult;
                let ty = y - dy * advDistanceMult;
                let i = Math.round(tx);
                let j = Math.round(ty);
                tx -= i;
                ty -= j;
                if (i >= 2 && i <= pressureMap.length - 3 && j >= 2 && j <= pressureMap[x].length - 3) {
                    dx *= 1.0 - vAdv;
                    dy *= 1.0 - vAdv;

                    dx += vAdv * (1.0 - tx) * (1.0 - ty) * pressureMap[i][j].vx;
                    dy += vAdv * (1.0 - tx) * (1.0 - ty) * pressureMap[i][j].vy;

                    dx += vAdv * tx * (1.0 - ty) * pressureMap[i + 1][j].vx;
                    dy += vAdv * tx * (1.0 - ty) * pressureMap[i + 1][j].vy;

                    dx += vAdv * (1.0 - tx) * ty * pressureMap[i][j + 1].vx;
                    dy += vAdv * (1.0 - tx) * ty * pressureMap[i][j + 1].vy;

                    dx += vAdv * tx * ty * pressureMap[i + 1][j + 1].vx;
                    dy += vAdv * tx * ty * pressureMap[i + 1][j + 1].vy;
                }
                if (dp > 10) { dp = 10; }
                if (dp < -10) { dp = -10; }
                if (dx > 10) { dx = 10; }
                if (dx < -10) { dx = -10; }
                if (dy > 10) { dy = 10; }
                if (dy < -10) { dy = -10; }
            
                nextPressureMap[x][y] = { pressure: dp, vx: dx, vy: dy };
            }
        }
    
        for (let x = 0; x < pressureMap.length; x++) {
            for (let y = 0; y < pressureMap[x].length; y++) {
                Object.assign(pressureMap[x][y], nextPressureMap[x][y]);
            }
        }
    }

    runAfterReset(function () {
        pressureMap = [];
        nextPressureMap = [];
        initializePressuremap(width, height);
    });

    runEveryTick(function () {
        updatePressure();
        updatePressure();
        updatePressure();
    });
}


elements.pressure = {
    color: "#efefef",
    tool: function (pixel) {
        pressureMap[pixel.x][pixel.y].pressure += 1;
    },
    onPlace: function (pixel) {
        pressureMap[pixel.x][pixel.y].pressure += 1;
        deletePixel(pixel.x, pixel.y);
    },
    tick: function (pixel) {
        pressureMap[pixel.x][pixel.y].pressure += 1;
        deletePixel(pixel.x, pixel.y);
    },
    category: "tools",
    insulate: true,
	canPlace: true,
    desc: "Use on pixels to increase pressure."
};

elements.vacuum = {
    color: "#0f0f0f",
    tool: function (pixel) {
        pressureMap[pixel.x][pixel.y].pressure -= 1;
    },
    onPlace: function (pixel) {
        pressureMap[pixel.x][pixel.y].pressure -= 1;
        deletePixel(pixel.x, pixel.y);
    },
    tick: function (pixel) {
        pressureMap[pixel.x][pixel.y].pressure -= 1;
        deletePixel(pixel.x, pixel.y);
    },
    category: "tools",
    insulate: true,
	canPlace: true,
    desc: "Use on pixels to decrease pressure."
};