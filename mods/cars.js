var carModActiveCar = null;
var carModDriveKeys = { left: false, right: false };

function carModPixelAt(x, y) {
	if (outOfBounds(x, y) || isEmpty(x, y, true)) {
		return null;
	}
	return pixelMap[x][y];
}

function carModFindHuman(car) {
	for (var dx = -5; dx <= 5; dx++) {
		for (var dy = -3; dy <= 2; dy++) {
			var x = car.x + dx;
			var y = car.y + dy;
			var pixel = carModPixelAt(x, y);
			if (!pixel || pixel.dead) {
				continue;
			}
			if (pixel.element === "head") {
				var body = carModPixelAt(x, y + 1);
				if (body && body.element === "body" && !body.dead) {
					return { head: pixel, body: body };
				}
			}
			else if (pixel.element === "body") {
				var head = carModPixelAt(x, y - 1);
				if (head && head.element === "head" && !head.dead) {
					return { head: head, body: pixel };
				}
			}
		}
	}
	return null;
}

function carModIsActive(pixel) {
	return pixel && pixel.driver && !outOfBounds(pixel.x, pixel.y) && pixelMap[pixel.x][pixel.y] === pixel;
}

function carModExit(car) {
	var sides = [car.dir || 1, -(car.dir || 1)];
	for (var i = 0; i < sides.length; i++) {
		var bodyX = car.x + sides[i] * 3;
		var bodyY = car.y;
		var headY = bodyY - 1;
		if (outOfBounds(bodyX, bodyY) || outOfBounds(bodyX, headY)) {
			continue;
		}
		if (!isEmpty(bodyX, bodyY) || !isEmpty(bodyX, headY)) {
			continue;
		}

		createPixel("body", bodyX, bodyY);
		createPixel("head", bodyX, headY);
		var body = pixelMap[bodyX][bodyY];
		var head = pixelMap[bodyX][headY];
		body.color = car.driverBodyColor;
		body.dir = car.dir;
		body.panic = 0;
		head.color = car.driverHeadColor;
		car.driver = false;
		delete car.driverBodyColor;
		delete car.driverHeadColor;
		carModActiveCar = null;
		logMessage("You got out of the car.");
		return true;
	}

	logMessage("There is no room beside the car to get out.");
	return false;
}

function carModToggleDriver() {
	if (carModIsActive(carModActiveCar)) {
		carModExit(carModActiveCar);
		return;
	}
	carModActiveCar = null;

	if (typeof mousePos === "undefined" || !mousePos) {
		logMessage("Move the cursor near a car to get in.");
		return;
	}
	var nearestCar = null;
	var nearestDistance = Infinity;
	for (var i = 0; i < currentPixels.length; i++) {
		var pixel = currentPixels[i];
		if (!pixel || pixel.del || pixel.element !== "car" || outOfBounds(pixel.x, pixel.y) || pixelMap[pixel.x][pixel.y] !== pixel) {
			continue;
		}
		var distance = Math.abs(pixel.x - mousePos.x) + Math.abs(pixel.y - mousePos.y);
		if (distance < nearestDistance) {
			nearestCar = pixel;
			nearestDistance = distance;
		}
	}
	if (!nearestCar || nearestDistance > 6) {
		logMessage("Move the cursor near a car to get in.");
		return;
	}
	if (nearestCar.driver) {
		carModActiveCar = nearestCar;
		carModExit(nearestCar);
		return;
	}

	var human = carModFindHuman(nearestCar);
	if (!human) {
		logMessage("Put a living human beside the car first.");
		return;
	}

	nearestCar.driverHeadColor = human.head.color;
	nearestCar.driverBodyColor = human.body.color;
	nearestCar.driver = true;
	deletePixel(human.head.x, human.head.y);
	deletePixel(human.body.x, human.body.y);
	carModActiveCar = nearestCar;
	logMessage("You got in. Use A and D to drive; press V to get out.");
}

document.addEventListener("keydown", function(event) {
	if (event.code === "KeyA") {
		carModDriveKeys.left = true;
	}
	else if (event.code === "KeyD") {
		carModDriveKeys.right = true;
	}
});

document.addEventListener("keyup", function(event) {
	if (event.code === "KeyA") {
		carModDriveKeys.left = false;
	}
	else if (event.code === "KeyD") {
		carModDriveKeys.right = false;
	}
});

window.addEventListener("blur", function() {
	carModDriveKeys.left = false;
	carModDriveKeys.right = false;
});

keybinds["KeyV"] = carModToggleDriver;

elements.car = {
	name: "Car",
	color: "#d83b32",
	behavior: behaviors.WALL,
	state: "solid",
	density: 3000,
	hardness: 0.4,
	burn: 10,
	burnTime: 500,
	burnInto: ["fire", "smoke", "metal_scrap"],
	breakInto: "metal_scrap",
	category: "machines",
	properties: {
		driver: false,
		driverHeadColor: null,
		driverBodyColor: null,
		dir: 1,
		driveCooldown: 0
	},
	desc: "A drivable car. Move the cursor near a car with a living human beside it and press V to get in. Use A and D to drive; press V again to get out.",
	tick: function(pixel) {
		if (carModActiveCar && !carModIsActive(carModActiveCar)) {
			carModActiveCar = null;
		}

		if (pixel === carModActiveCar && pixel.driver) {
			if (pixel.driveCooldown > 0) {
				pixel.driveCooldown--;
			}
			if (pixel.driveCooldown === 0 && carModDriveKeys.left !== carModDriveKeys.right) {
				pixel.dir = carModDriveKeys.left ? -1 : 1;
				var targetX = pixel.x + pixel.dir;
				if (!outOfBounds(targetX, pixel.y) && isEmpty(targetX, pixel.y)) {
					tryMove(pixel, targetX, pixel.y);
				}
				pixel.driveCooldown = 3;
			}
		}

		if (!outOfBounds(pixel.x, pixel.y + 1) && isEmpty(pixel.x, pixel.y + 1)) {
			tryMove(pixel, pixel.x, pixel.y + 1);
		}
		doDefaults(pixel);
	},
	onDelete: function(pixel) {
		if (pixel === carModActiveCar) {
			carModActiveCar = null;
		}
	},
	renderer: function(pixel, ctx) {
		var x = pixel.x;
		var y = pixel.y;
		var bodyColor = pixel.color || "#d83b32";
		drawSquare(ctx, "#20252b", x - 1, y - 1);
		drawSquare(ctx, bodyColor, x, y - 1);
		drawSquare(ctx, bodyColor, x + 1, y - 1);
		drawSquare(ctx, bodyColor, x - 2, y);
		drawSquare(ctx, bodyColor, x - 1, y);
		drawSquare(ctx, bodyColor, x, y);
		drawSquare(ctx, bodyColor, x + 1, y);
		drawSquare(ctx, bodyColor, x + 2, y);
		drawSquare(ctx, "#262b31", x - 1, y + 1);
		drawSquare(ctx, "#262b31", x + 1, y + 1);
		drawSquare(ctx, "#111418", x - 1, y + 1, 0.55);
		drawSquare(ctx, "#111418", x + 1, y + 1, 0.55);
		if (pixel.driver) {
			drawSquare(ctx, pixel.driverHeadColor || "#f3e7db", x, y - 1, 0.7);
		}
	}
};
