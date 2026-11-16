"use strict";
// Made in typescript
let symmetryPoint;
function makeSymmetryType(pixel, extra) {
    return {
        ...pixel,
        ...extra
    };
}
function compareCoords(coord1, coord2) {
    return coord1.every((value, i) => value === coord2[i]);
}
function pointOnLine(origin, angle, distance, extraOffset = 0.5) {
    return [
        canvasCoord(origin[0] + Math.cos(angle) * distance) + canvasCoord(extraOffset),
        canvasCoord(origin[1] + Math.sin(angle) * distance) + canvasCoord(extraOffset)
    ];
}
function rad(deg) {
    return deg * (Math.PI / 180);
}
function drawSymmetryLine(origin, rotation, ctx) {
    const offscreen = 999;
    const offscreenPositive = pointOnLine(origin, rad(rotation), offscreen);
    const offscreenNegative = pointOnLine(origin, rad(rotation), -offscreen);
    ctx.strokeStyle = "rgb(200,200,200)";
    ctx.beginPath();
    ctx.moveTo(...offscreenPositive);
    ctx.lineTo(...offscreenNegative);
    ctx.stroke();
}
// For these elements pixel must be the same as symmetryPoint except in onPlace and onDelete
elements.reflect = {
    color: "#ffffff",
    behavior: behaviors.WALL,
    category: "symmetry",
    hardness: 1,
    onPlace(pixel) {
        if (symmetryPoint) {
            deletePixel(pixel.x, pixel.y);
        }
        else {
            symmetryPoint = makeSymmetryType(pixel, {
                symname: "reflect",
                rotation: 90
            });
        }
    },
    maxSize: 1,
    onDelete(pixel) {
        if (!symmetryPoint) {
            return;
        }
        if (pixel.x === symmetryPoint.x && pixel.y === symmetryPoint.y) {
            symmetryPoint = undefined;
        }
    },
    renderer(_, ctx) {
        if (!symmetryPoint || symmetryPoint.symname !== "reflect")
            return;
        drawDefault(ctx, symmetryPoint);
        drawSymmetryLine([symmetryPoint.x, symmetryPoint.y], symmetryPoint.rotation, ctx);
    },
    properties: {
        symmetry: true
    }
};
elements.rotate = {
    color: "#ffffff",
    behavior: behaviors.WALL,
    category: "symmetry",
    hardness: 1,
    onPlace(pixel) {
        if (symmetryPoint) {
            deletePixel(pixel.x, pixel.y);
        }
        else {
            symmetryPoint = makeSymmetryType(pixel, {
                symname: "rotate",
                copies: 4,
                rotation: 0
            });
        }
    },
    maxSize: 1,
    onDelete(pixel) {
        if (!symmetryPoint) {
            return;
        }
        if (pixel.x === symmetryPoint.x && pixel.y === symmetryPoint.y) {
            symmetryPoint = undefined;
        }
    },
    renderer(_, ctx) {
        if (!symmetryPoint || symmetryPoint.symname !== "rotate")
            return;
        drawDefault(ctx, symmetryPoint);
        const rotInterval = 360 / symmetryPoint.copies;
        // i mean it works
        for (let i = 0, rot = symmetryPoint.rotation; i < symmetryPoint.copies / 2; i++, rot += rotInterval) {
            drawSymmetryLine([symmetryPoint.x, symmetryPoint.y], rot, ctx);
        }
    },
    properties: {
        symmetry: true
    }
};
elements.kaleidoscope = {
    color: "#ffffff",
    behavior: behaviors.WALL,
    category: "symmetry",
    hardness: 1,
    onPlace(pixel) {
        if (symmetryPoint) {
            deletePixel(pixel.x, pixel.y);
        }
        else {
            symmetryPoint = makeSymmetryType(pixel, {
                symname: "kaleidoscope",
                copies: 2,
                rotation: 0
            });
        }
    },
    maxSize: 1,
    onDelete(pixel) {
        if (!symmetryPoint) {
            return;
        }
        if (pixel.x === symmetryPoint.x && pixel.y === symmetryPoint.y) {
            symmetryPoint = undefined;
        }
    },
    renderer(_, ctx) {
        if (!symmetryPoint || symmetryPoint.symname !== "kaleidoscope")
            return;
        drawDefault(ctx, symmetryPoint);
        // had to change it here because i could not for the life of me make it work for the original code
        const rotInterval = 180 / symmetryPoint.copies;
        for (let i = 0, rot = symmetryPoint.rotation; i < symmetryPoint.copies; i++, rot += rotInterval) {
            drawSymmetryLine([symmetryPoint.x, symmetryPoint.y], rot, ctx);
        }
    },
    properties: {
        symmetry: true
    }
};
elements.change_rotation = {
    category: "tools",
    maxSize: 1,
    onMouseDown() {
        if (!symmetryPoint) {
            logMessage("No symmetry tool found");
            return;
        }
        if ("rotation" in symmetryPoint) {
            symmetryPoint.rotation = (symmetryPoint.rotation + 45) % 180;
        }
    },
    onPlace(pixel) { deletePixel(pixel.x, pixel.y); }
};
elements.change_axes = {
    category: "tools",
    maxSize: 1,
    onMouseDown() {
        if (!symmetryPoint) {
            logMessage("No symmetry tool found");
            return;
        }
        if ("copies" in symmetryPoint) {
            const maxAxes = 16;
            symmetryPoint.copies = symmetryPoint.copies + 2 > maxAxes ? 2 : symmetryPoint.copies + 2;
        }
    },
    onPlace(pixel) { deletePixel(pixel.x, pixel.y); }
};
function rotatePoint(origin, point, angle, round = true) {
    const radian = rad(angle);
    const xprime = (point[0] - origin[0]) * Math.cos(radian) - (point[1] - origin[1]) * Math.sin(radian) + origin[0];
    const yprime = (point[0] - origin[0]) * Math.sin(radian) + (point[1] - origin[1]) * Math.cos(radian) + origin[1];
    const adjusted = round ? [Math.round(xprime), Math.round(yprime)] : [xprime, yprime];
    return adjusted;
}
function reflectPoint(origin, point, angle) {
    const rotated = rotatePoint(origin, point, -angle, false);
    const reflected = [
        rotated[0],
        2 * origin[1] - rotated[1]
    ];
    return rotatePoint(origin, reflected, angle);
}
const symmCallbacks = {
    reflect: (origin, point) => {
        return [reflectPoint([origin.x, origin.y], point, origin.rotation)];
    },
    rotate: (origin, point) => {
        const points = [];
        const rotInterval = 360 / origin.copies;
        for (let i = 0, rot = rotInterval + origin.rotation; i < origin.copies - 1; i++, rot += rotInterval) {
            points.push(rotatePoint([origin.x, origin.y], point, rot));
        }
        return points;
    },
    kaleidoscope: (origin, point) => {
        const rotatedPoints = [];
        const reflectedPoints = [];
        const center = [origin.x, origin.y];
        const rotationInterval = 360 / origin.copies;
        const reflectionInterval = 180 / origin.copies;
        for (let i = 1; i < origin.copies; i++) {
            rotatedPoints.push(rotatePoint(center, point, i * rotationInterval));
        }
        for (let i = 0; i < origin.copies; i++) {
            reflectedPoints.push(reflectPoint(center, point, origin.rotation + i * reflectionInterval));
        }
        return [...rotatedPoints, ...reflectedPoints];
    }
};
function normalize(value) {
    return Array.isArray(value) ? value : [value];
}
const oldCreatePixel = createPixel;
window.createPixel = function (element, x, y) {
    oldCreatePixel(element, x, y);
    if (!symmetryPoint)
        return;
    const normalized = normalize(element);
    for (const elem of normalized) {
        if (elements[elem].properties?.symmetry) {
            return;
        }
    }
    const transformedCoords = symmCallbacks[symmetryPoint.symname](symmetryPoint, [x, y]);
    for (const coord of transformedCoords) {
        const [x, y] = coord;
        if (!isEmpty(x, y))
            continue;
        oldCreatePixel(element, x, y);
    }
};
const oldDeletePixel = deletePixel;
window.deletePixel = function (x, y) {
    oldDeletePixel(x, y);
    if (!symmetryPoint)
        return;
    const transformedCoords = symmCallbacks[symmetryPoint.symname](symmetryPoint, [x, y]);
    for (const coord of transformedCoords) {
        const [x, y] = coord;
        if (isEmpty(x, y) || outOfBounds(x, y))
            continue;
        oldDeletePixel(x, y);
    }
};
runAfterReset(() => {
    symmetryPoint = undefined;
});
