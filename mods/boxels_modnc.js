var sellMoney = 0;
var sellCooldown = 0;
var sellUsing = false;
var sellSoldGold = 0;

var sellBrushSize = 15;
var sellPreviousBrushSize = 5;
var sellEquipped = false;

var sellDisplay = document.createElement("div");

sellDisplay.id = "sell-display";

sellDisplay.style.position = "fixed";
sellDisplay.style.top = "10px";
sellDisplay.style.right = "15px";
sellDisplay.style.zIndex = "999999";
sellDisplay.style.color = "#FFD700";
sellDisplay.style.fontFamily = "Arial, sans-serif";
sellDisplay.style.fontSize = "22px";
sellDisplay.style.fontWeight = "bold";
sellDisplay.style.textShadow = "2px 2px 3px black";
sellDisplay.style.pointerEvents = "none";
sellDisplay.style.textAlign = "right";

sellDisplay.innerHTML =
    "Money: 0<br>" +
    "Sell tool Cooldown: Ready";

document.body.appendChild(sellDisplay);

function updateSellDisplay() {

    if (sellCooldown > 0) {

        sellDisplay.innerHTML =
            "Money: " + sellMoney +
            "<br>" +
            "Sell tool Cooldown: " +
            sellCooldown.toFixed(1) + "s";

    } else {

        sellDisplay.innerHTML =
            "Money: " + sellMoney +
            "<br>" +
            "Sell tool Cooldown: Ready";
    }
}

elements.sell = {

    color: "#FFD700",

    category: "tools",

    excludeRandom: true,

    maxSize: 15,

    desc: "Deletes everything inside the brush and pays 1 Money for every gold pixel.",

    onSelect: function() {

        sellEquipped = true;

        sellPreviousBrushSize = mouseSize;

        mouseSize = sellBrushSize;

        checkMouseSize(true);

        updateSellDisplay();
    },

    onMouseDown: function() {

        mouseSize = sellBrushSize;
        checkMouseSize(true);

        if (sellCooldown > 0) {
            sellUsing = false;
            return;
        }

        sellUsing = true;

        sellSoldGold = 0;
    },

    tool: function(pixel) {

        if (!sellUsing) {
            return;
        }

        if (pixel.element === "cut_gold") {
            sellSoldGold++;
        }

        deletePixel(pixel.x, pixel.y);
    },

    onMouseUp: function() {

        if (!sellUsing) {
            return;
        }

        sellUsing = false;

        sellMoney += sellSoldGold;

        updateSellDisplay();

        sellCooldown = 10;
    }
};

setInterval(function() {

    if (sellCooldown > 0) {

        sellCooldown -= 0.1;

        if (sellCooldown < 0) {
            sellCooldown = 0;
        }

        updateSellDisplay();
    }

}, 100);

setInterval(function() {

    if (currentElement === "sell") {

        if (!sellEquipped) {

            sellEquipped = true;

            sellPreviousBrushSize = mouseSize;
        }

        if (mouseSize !== sellBrushSize) {
            mouseSize = sellBrushSize;
            checkMouseSize(true);
        }

    } else {

        if (sellEquipped) {

            sellEquipped = false;

            mouseSize = sellPreviousBrushSize;
            checkMouseSize(true);
        }
    }

}, 10);

elements.cut_gold = {
    color: ["#f5ff65", "#e7f600"],
    behavior: behaviors.SOLID,
    category: "solids",
    state: "solid",
    density: 19300,
    desc: "Gold that has been cut with a jeweler's saw."
};

var jewelersSawBrushSize = 3;
var jewelersSawPreviousBrushSize = 5;
var jewelersSawEquipped = false;

elements.jewelers_saw = {

    color: "#BFC5CC",

    category: "tools",

    excludeRandom: true,

    desc: "Cuts gold into cut gold.",

    onSelect: function() {

        jewelersSawEquipped = true;

        jewelersSawPreviousBrushSize = mouseSize;

        mouseSize = jewelersSawBrushSize;

        checkMouseSize(true);
    },

    tool: function(pixel) {

        if (!pixel || pixel.element !== "gold") {
            return;
        }

        changePixel(pixel, "cut_gold");
    }
};

setInterval(function() {

    if (currentElement === "jewelers_saw") {

        if (!jewelersSawEquipped) {
            jewelersSawEquipped = true;
            jewelersSawPreviousBrushSize = mouseSize;
        }

        if (mouseSize !== jewelersSawBrushSize) {
            mouseSize = jewelersSawBrushSize;
            checkMouseSize(true);
        }

    } else {

        if (jewelersSawEquipped) {

            jewelersSawEquipped = false;

            mouseSize = jewelersSawPreviousBrushSize;
            checkMouseSize(true);
        }
    }

}, 10);