initialElements = [];
function findReachable(elems) {
    let redo = true;
    for(let i = 0; i < elems.length; i++)
    {
        if(redo)
        {
            i = 0;
        }
        redo = false;
        let e1 = elems[i];
        if(e1 === "mushroom_gill") {
            redo = redo || addElement(elems, "mushroom_cap");
        }

        
        if(e1 === "sapling") {
            redo = redo || addElement(elems, "plant");
        }
        
        
        if(e1 === "thorium" && elems.includes("neutron")) {
            redo = redo || addElement(elems, "radium");
        }
        
        if(elements[e1].burnInto) {
            redo = redo || addElement(elems, elements[e1].burnInto);
        }
        if(elements[e1].stateHigh) {
            redo = redo || addElement(elems, elements[e1].stateHigh);
        }
        
        if(elements[e1].stateLow) {
            redo = redo || addElement(elems, elements[e1].stateLow);
        }
        if(elements[e1].breakInto) {
            redo = redo || addElement(elems, elements[e1].breakInto);
        }
        
        if(elements[e1].extraTempLow) {
            for(let i in elements[e1].extraTempLow) {
                redo = redo || addElement(elems, elements[e1].extraTempLow[i]);
            }
        }
        
        
        if(elements[e1].behavior && elements[e1].behavior instanceof Array) {
            let behavior = elements[e1].behavior;
            for(let i = 0; i < behavior.length; i++)
            {
                for(let j = 0; j < behavior[i].length; j++)
                {
                    let b0 = behavior[i][j].split(" AND ");
                    for (var k = 0; k < b0.length; k++) {
                        var b = b0[k];
                        // remove everything after %
                        b = b.split("%")[0];
                        if (b.indexOf(":") != -1) {
                            var arg = b.split(":")[1];
                        }
                        else { var arg = undefined }
                        var b = b.split(":")[0];
                        if (b == "CR" || b == "CH" || b == "LB" || b == "L1" || b == "L2" || b == "C2") {
                            if (!arg) { arg = "[???]" }
                            else if (arg.indexOf(">") != -1) { arg = arg.split(">")[1]; }
                            redo = redo || addElement(elems, arg.split(","));
                        }
                    }
                }
            }
        }
        
        for(let j in elements[e1].reactions)
        {
            if (elems.includes(j)) {
                if(elements[e1].reactions[j].elem1) {
                    redo = redo || addElement(elems, elements[e1].reactions[j].elem1);
                }
                if(elements[e1].reactions[j].elem2) {
                    redo = redo || addElement(elems, elements[e1].reactions[j].elem2);
                }
            }
        }
    }
    return elems;
}


function addElement(list, elem) {
    if(elem instanceof Array)
    {
        let result = false;
        for(let i = 0; i < elem.length; i++)
        {
            result = result || addElement(list,elem[i]);
        }
        return result;
    }
    if (elem && !list.includes(elem)) {
        list.push(elem);
        return true;
    }
}


if (!settings.survivalchem) {
    settings.survivalchem = {
        "wall": 999,
        "dirt": 999,
        "sapling": 1,
        "seeds": 5,
        "ice": 25,
        "cloner": 1,
    }
}
settings.survivalchem.cloner = 1;
settings.unhide = 0;
// settings.survivalClone=null; settings.survival = null; saveSettings();

survivalTimeout = null;
function survivalSave() {
    if (survivalTimeout) { clearTimeout(survivalTimeout); }
    survivalTimeout = setTimeout(function(){
        saveSettings();
    },1000);
}


survivalAdd = function (element, amount, skipSave) {
    if (elements[element].category === "tools") { return; }
    if (settings.survivalchem[element]) {
        settings.survivalchem[element] += amount;
    }
    else {
        settings.survivalchem[element] = amount;
    }
    survivalUpdate(element);
    if (!skipSave) { survivalSave(); }
};
survivalRemove = function (element, amount, skipSave) {
    if (elements[element].category === "tools") { return; }
    if (settings.survivalchem[element]) {
        settings.survivalchem[element] -= amount;
        survivalUpdate(element);
    }
    if (settings.survivalchem[element] <= 0) {
        delete settings.survivalchem[element];
        var btn = document.getElementById("elementButton-" + element);
        if (btn) { btn.remove(); }
        selectElement("unknown");
    }
    if (!skipSave) { survivalSave(); }
};
survivalCount = function (element) {
    return settings.survivalchem[element] || 0;
};
survivalUpdate = function (element) {
    if (element === "gold_coin") {
        // if it is not an integer, round it to 0.001
        if (settings.survivalchem.gold_coin % 1 !== 0) {
            settings.survivalchem.gold_coin = Math.round(settings.survivalchem.gold_coin * 1000) / 1000;
        }
        document.getElementById("coinCount").innerHTML = settings.survivalchem.gold_coin || 0;
    }
    var btn = document.getElementById("elementButton-" + element);
    if (elements[element] && elements[element].category === "tools") { return; }
    if (btn) {
        btn.innerHTML = btn.innerHTML.split("(")[0] + "(" + settings.survivalchem[element] + ")";
    }
    else if (elements[element]) {
        createElementButton(element);
        document.getElementById("elementButton-" + element).innerHTML += "(" + settings.survivalchem[element] + ")";
    }
};


runAfterAutogen(()=>runAfterAutogen(function(){
    elements.erase.name = "pick_up";
    delete elements.paint.category;
    delete elements.lookup.category;
    delete elements.pick;
    delete elements.prop;
    elements.radiation.category = "tools";
    for (var element in elements) {
        if (elements[element].category !== "tools") {
            elements[element].hidden = true;
            if (!settings.survivalchem || Object.keys(settings.survivalchem).length < 25) {
                elements[element].category = "inventory";
            }
        }
        if (elements[element].onShiftSelect) delete elements[element].onShiftSelect;
    }
    for (var element in elements) {
        if (!settings.survivalchem[element]) {
            if (document.getElementById("elementButton-" + element)) {
                document.getElementById("elementButton-" + element).remove();
            }
            continue;
        }
        if (!elements[element]) { continue; }
        if (elements[element].category === "tools") { continue; }
        if (!elements[element].colorObject) {
            elements[element].color = "#ffffff";
            elements[element].colorObject = {"r": 255,"g": 255,"b": 255};
        }
        if (document.getElementById("elementButton-" + element)) {
            document.getElementById("elementButton-" + element).remove();
        }
        createElementButton(element);
        document.getElementById("elementButton-"+element).innerHTML += "("+settings.survivalchem[element]+")";
    }
}));

delete elements.cloner.behavior;
elements.cloner.tick = function(pixel) {
    if (settings.survivalchemClone) {
        if (Math.random() < 0.025) {
            // 1 or -1
            var x = pixel.x + (Math.random() < 0.5 ? 1 : -1);
            var y = pixel.y + (Math.random() < 0.5 ? 1 : -1);
            if (isEmpty(x,y)) {
                createPixel(settings.survivalchemClone,x,y);
            }
        }
    }
    else {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (!isEmpty(x,y,true)) {
                if (pixelMap[x][y].clone) { pixel.clone = pixelMap[x][y].clone; break }
                var element = pixelMap[x][y].element;
                if (element === pixel.element || elements[pixel.element].ignore.indexOf(element) !== -1) { continue }
                settings.survivalchemClone = element;
                survivalSave();
                break;
            }
        }
    }
};
elements.cloner.ignore = elements.cloner.ignore.concat(["gold", "gold_coin", "molten_gold", "rose_gold", "molten_rose_gold", "purple_gold", "molten_purple_gold", "blue_gold", "molten_blue_gold", "electrum", "molten_electrum", "sun", "supernova", "diamond"]);

elements.cloner.desc = "You can only clone one element at a time!"

elements.smash.tool = function(pixel) {
    if (elements[pixel.element].seed === true) { return }
    if (elements[pixel.element].breakInto !== undefined || (elements[pixel.element].seed !== undefined && elements[pixel.element].seed !== true)) {
        // times 0.25 if not shiftDown else 1
        if (Math.random() < (elements[pixel.element].hardness || 1) * (shiftDown ? 1 : 0.25)) {
            var breakInto = elements[pixel.element].breakInto;
            if (elements[pixel.element].seed && (!breakInto || Math.random() < 0.5)) {
                if (Math.random() < 0.2) {
                    breakInto = elements[pixel.element].seed;
                }
                else {
                    breakInto = null;
                }
            }
            // if breakInto is an array, pick one
            if (Array.isArray(breakInto)) {
                breakInto = breakInto[Math.floor(Math.random() * breakInto.length)];
            }
            if (breakInto === null) {
                deletePixel(pixel.x,pixel.y);
                return;
            }
            var oldelement = pixel.element;
            changePixel(pixel,breakInto);
            pixelTempCheck(pixel);
            if (elements[oldelement].breakIntoColor) {
                pixel.color = pixelColorPick(pixel, elements[oldelement].breakIntoColor);
            }
        }
    }
};



elementWorth = {
    "gold_coin": 1,
    "gold": 1,
    "molten_gold": 1,
    "rose_gold": 1,
    "molten_rose_gold": 1,
    "purple_gold": 1,
    "molten_purple_gold": 1,
    "blue_gold": 1,
    "molten_blue_gold": 1,
    "electrum": 1,
    "molten_electrum": 1,
    "diamond": 1,
    "ketchup": 0.15,
    "jelly": 0.1,
    "soda": 0.1,
    "toast": 0.1,
    "oil": 0.1,
    "bread": 0.03,
    "glass": 0.05,
    "rad_glass": 0.05,
    "glass_shard": 0.02,
    "rad_shard": 0.02,
    "paper": 0.05,
    "broth": 0.05,
    "honey": 0.05,
    "caramel": 0.05,
    "sap": 0.04,
    "candy": 0.05,
    "popcorn": 0.02,
    "flour": 0.02,
    "lettuce": 0.02,
    "sauce": 0.02,
    "wood": 0.002,
    "tree_branch": 0.001,
    "plant": 0.001,
    "dead_plant": 0.001,
    "frozen_plant": 0.001,
    "mushroom_cap": 0.001,
    "mushroom_gill": 0.003,
    "vine": 0.001,
    "cactus": 0.001,
    "copper": 0.075,
    "molten_copper": 0.05,
    "tin": 0.075,
    "molten_tin": 0.05,
    "bronze": 0.35,
    "molten_bronze": 0.3,
    "slag": 0.001,
    "molten_slag": 0.001,
    "sulfuric_acid": 1,
    "sulfuric_acid_gas": 1,
    "sulfuric_acid_ice": 1,
    "nitric_acid": 0.25,
    "nitric_acid_gas": 0.25,
    "nitric_acid_ice": 0.25,
    "ammonium_nitrate": 0.5,
    "ammonium_nitrate_solution": 0.1,
    "ammonium_nitrate_solution_ice": 0.1,
    "cloner": 0,
    "wall": 0,
    "fire": 0,
    "smoke": 0,
    "plasma": 0,
    "light": 0,
    "laser": 0,
    "liquid_light": 0.001,
    "flash": 0,
    "radiation": 0,
    "petal": -1,
    "cell": -1,
    "cancer": -1,
    "foam": -1,
};


elements.sell = {
    color: ["#fff0b5", "#ffe680", "#c48821", "#986a1a", "#eca832", "#f0bb62"],
    tool: function (pixel) {
        if (elementWorth[pixel.element] === 0) { return; }
        deletePixel(pixel.x, pixel.y);
        if (elementWorth[pixel.element] === -1) { return; }
        survivalAdd("gold_coin", elementWorth[pixel.element] || 0.01);
    },
    toolHoverStat: function (pixel) {
        return (elementWorth[pixel.element] || 0.01) + "G";
    },
    category: "tools",
    desc: "Exchanges pixels for their market value in Gold Coins"
};
elements.seeds.name = "seed";


survivalShop = {
    "dirt*25": {
        "gold_coin": 0.025
    },
    "water*25": {
        "gold_coin": 0.25
    },
    "sapling*1": {
        "gold_coin": 0.5
    },
    "pinecone*1": {
        "gold_coin": 0.5
    },
    "seeds*1": {
        "gold_coin": 0.5
    },
    "chalcopyrite*250": {
        "gold_coin": 1
    },
    "cassiterite*250": {
        "gold_coin": 2,
        "copper": 10
    },
    "ammonia*250": {
        "gold_coin": 0.5,
    }
};
function survivalBuy(element) {
    var price = survivalShop[element];
    if (!price) { alert("The shop isn't selling " + element + "!"); return; }
    for (let i in price) {
        if (!settings.survivalchem[i] || settings.survivalchem[i] < price[i]) { alert("You can't afford that!"); return; }
    }
    for (let i in price) {
        survivalRemove(i, price[i]);
    }
    var amount = 1;
    if (element.indexOf("*") !== -1) { amount = parseInt(element.split("*")[1]); element = element.split("*")[0]; }
    survivalAdd(element, amount);
    selectElement(element);
}

function survivalResetCloner() {
    if (!settings.survivalchem.gold_coin || settings.survivalchem.gold_coin < 1000) { alert("You can't afford that!"); return }
    survivalRemove("gold_coin",10);
    settings.survivalchemClone = null;
    survivalSave();
}

let chemMod = document.querySelector("[src=\"mods/chem.js\"]");

worldgentypes = {}
window.addEventListener("load", function () {
    // move to start of tools
    var erase = document.getElementById("elementButton-erase");
    var sell = document.getElementById("elementButton-sell");
    var parent = erase.parentElement;
    parent.removeChild(sell);
    parent.insertBefore(sell, parent.firstChild);
    parent.removeChild(erase);
    parent.insertBefore(erase, parent.firstChild);
    document.getElementById("replaceButton").remove();
    document.getElementById("savesButton").remove();
    document.getElementById("elemSelectButton").remove();
    doRandomEvents = function () { };
    worldGen = function () { };
    worldgentypes = {};
    loadSave = function () { };
    showSaves = function () { };
    placeImage = function () { };
    chooseElementPrompt = function () { };
    document.getElementById("toolControls").insertAdjacentHTML("beforeend", `<button class="controlButton" title="Erases all survivalchem.js data" onclick="if (confirm('THIS WILL ERASE ALL survival.js DATA!!! ARE YOU SURE?')) {settings.survivalchemClone=null; settings.survivalchem = null; saveSettings(); location.reload()}">StartOver</button>`);
    createCategoryDiv("shop");
    var shopDiv = document.getElementById("category-shop");
    shopDiv.innerHTML = "";
    shopDiv.style.display = "none";
    shopDiv.insertAdjacentHTML("beforeend", `<p>You have <span id="coinCount">${settings.survivalchem.gold_coin || 0}</span>G</p>`);
    for (var element in survivalShop) {
        var price = survivalShop[element];
        var button = document.createElement("button");
        var name = element;
        var amount = 1;
        if (element.indexOf("*") !== -1) { amount = parseInt(element.split("*")[1]); name = element.split("*")[0]; }
        var elemname = name;
        name = (elements[elemname].name || name).replace(/_/g, " ").replace(".", "   ").replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace("   ", ".").replace(/ /g, "");
        button.classList.add("elementButton");
        button.setAttribute("element", element);
        button.setAttribute("category", "shop");
        button.setAttribute("title", amount + " " + name + " for $" + formatPrice(price));
        button.innerHTML = name + "<span style='font-family:Arial;font-size:1.15em'> (" + amount + " for " + formatPrice(price) + ")</span>";
        if (elements[elemname]) {
            if (elements[elemname].color instanceof Array) {
                button.style.backgroundImage = "linear-gradient(to bottom right, " + elements[elemname].color.join(", ") + ")";
                // choose the middlemost item in array
                var colorObject = elements[elemname].colorObject[Math.floor(elements[elemname].colorObject.length / 2)];
                if (elements[elemname].darkText !== false && (elements[elemname].darkText || (colorObject.r + colorObject.g + colorObject.b) / 3 > 200)) {
                    button.className += " bright";
                }
            }
            else {
                button.style.background = elements[elemname].color;
                var colorObject = elements[elemname].colorObject;
                if (elements[elemname].darkText !== false && (elements[elemname].darkText || (colorObject.r + colorObject.g + colorObject.b) / 3 > 200)) {
                    button.className += " bright";
                }
            }
        }
        button.addEventListener("click", function () {
            survivalBuy(this.getAttribute("element"));
        });
        shopDiv.appendChild(button);
    }
    shopDiv.insertAdjacentHTML("beforeend", `<p><button style="background-color:#dddd00" class="elementButton bright" title="Resets the cloner" onclick="survivalResetCloner()">ResetCloner<span style='font-family:Arial;font-size:1.15em'> (10G)</span></button></p>`);
    createCategoryDiv("prices");
    var pricesDiv = document.getElementById("category-prices");
    pricesDiv.style.display = "none";
    for (var element in elementWorth) {
        if (elementWorth[element] <= 0) { continue; }
        var name = (elements[element].name || element).replace(/_/g, " ").replace(".", "   ").replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace("   ", ".");
        // create text with the name of the element and its worth, separated by •
        var text = name + "=" + elementWorth[element] + " • ";
        pricesDiv.insertAdjacentHTML("beforeend", `${text}`);
    }
    pricesDiv.innerHTML = pricesDiv.innerHTML.slice(0, -2);
    pricesDiv.innerHTML = "<p style='font-family:Arial'>" + pricesDiv.innerHTML + "</p>";
});
runAfterLoad(function () {
    checkUnlock = function (element) {
        return;
    };
    oldClearAll = clearAll;
    clearAll = function () {
        if (currentPixels && currentPixels.length > 0) {
            for (var i = 0; i < currentPixels.length; i++) {
                var pixel = currentPixels[i];
                if (pixel && pixel.element) {
                    survivalAdd(pixel.element, 1);
                }
            }
        }
        oldClearAll();
    };
    mouseAction = function (e, mouseX, mouseY, startPos) {
        if (mouseType == "left") {
            mouse1Action(e, mouseX, mouseY, startPos);
        }
        else if (mouseType == "right") { mouse2Action(e, mouseX, mouseY, startPos); }
        else if (mouseType == "middle") { mouseMiddleAction(e, mouseX, mouseY); }
    };
    mouse1Action = function (e, mouseX = undefined, mouseY = undefined, startPos) {
        if (currentElement === "erase") { mouse2Action(e, mouseX, mouseY); return; }
        else if (currentElement === "pick") { mouseMiddleAction(e, mouseX, mouseY); return; }
        // If x and y are undefined, get the mouse position
        if (mouseX == undefined && mouseY == undefined) {
            // var canvas = document.getElementById("game");
            // var ctx = canvas.getContext("2d");
            lastPos = mousePos;
            mousePos = getMousePos(canvas, e);
            var mouseX = mousePos.x;
            var mouseY = mousePos.y;
        }
        var cooldowned = false;
        if ((mouseSize === 1 || elements[currentElement].maxSize === 1) && elements[currentElement].cooldown) {
            if (pixelTicks - lastPlace < elements[currentElement].cooldown) {
                return;
            }
            cooldowned = true;
        }
        lastPlace = pixelTicks;
        startPos = startPos || lastPos;
        if (!(isMobile || (cooldowned && startPos.x === lastPos.x && startPos.y === lastPos.y) || elements[currentElement].tool || elements[currentElement].category === "tools")) {
            var coords = lineCoords(startPos.x, startPos.y, mouseX, mouseY);
        }
        else { var coords = mouseRange(mouseX, mouseY); }
        var element = elements[currentElement];
        var mixList = [];
        // For each x,y in coords
        for (var i = 0; i < coords.length; i++) {
            var x = coords[i][0];
            var y = coords[i][1];

            if (currentElement === "mix") {
                if (!isEmpty(x, y, true)) {
                    var pixel = pixelMap[x][y];
                    if (!(elements[pixel.element].movable !== true || elements[pixel.element].noMix === true) || shiftDown) {
                        mixList.push(pixel);
                    }
                }
            }
            else if (elements[currentElement].tool && !(elements[currentElement].canPlace && isEmpty(x, y))) {
                // run the tool function on the pixel
                if (!isEmpty(x, y, true)) {
                    var pixel = pixelMap[x][y];
                    // if the current element has an ignore property and the pixel's element is in the ignore property, don't do anything
                    if (elements[currentElement].ignore && elements[currentElement].ignore.indexOf(pixel.element) != -1) {
                        continue;
                    }
                    elements[currentElement].tool(pixel);
                }
            }
            else if (isEmpty(x, y)) {
                if (survivalCount(currentElement) < 1 && elements[currentElement].category !== "tools") {
                    return;
                }
                createPixel(currentElement, x, y);
                if (pixelMap[x][y] && currentElement === pixelMap[x][y].element && (elements[currentElement].customColor || elements[currentElement].singleColor)) {
                    pixelMap[x][y].color = pixelColorPick(pixelMap[x][y], currentColorMap[currentElement]);
                }
                if (elements[currentElement].category !== "tools") { survivalRemove(currentElement, 1); }
            }
        }
        if (currentElement == "mix") {
            for (var i = 0; i < mixList.length; i++) {
                var pixel1 = mixList[Math.floor(Math.random() * mixList.length)];
                var pixel2 = mixList[Math.floor(Math.random() * mixList.length)];
                swapPixels(pixel1, pixel2);
                mixList.splice(mixList.indexOf(pixel1), 1);
                mixList.splice(mixList.indexOf(pixel2), 1);
                if (elements[pixel1.element].onMix) {
                    elements[pixel1.element].onMix(pixel1, pixel2);
                }
                if (elements[pixel2.element].onMix) {
                    elements[pixel2.element].onMix(pixel2, pixel1);
                }
            }

        }
    };
    mouse2Action = function (e, mouseX = undefined, mouseY = undefined, startPos) {
        // Erase pixel at mouse position
        if (mouseX == undefined && mouseY == undefined) {
            // var canvas = document.getElementById("game");
            // var ctx = canvas.getContext("2d");
            lastPos = mousePos;
            mousePos = getMousePos(canvas, e);
            var mouseX = mousePos.x;
            var mouseY = mousePos.y;
        }
        if (dragStart) {
            dragStart = 0;
            for (var i = 0; i < draggingPixels.length; i++) {
                var pixel = draggingPixels[i];
                delete pixel.drag;
            }
            draggingPixels = null;
        }
        // If the current element is "pick" or "lookup", coords = [mouseX,mouseY]
        if (currentElement == "pick" || currentElement == "lookup") {
            var coords = [[mouseX, mouseY]];
        }
        else if (!isMobile) {
            startPos = startPos || lastPos;
            var coords = lineCoords(startPos.x, startPos.y, mouseX, mouseY);
        }
        else {
            var coords = mouseRange(mouseX, mouseY);
        }
        // For each x,y in coords
        for (var i = 0; i < coords.length; i++) {
            var x = coords[i][0];
            var y = coords[i][1];

            if (!isEmpty(x, y)) {
                if (outOfBounds(x, y)) {
                    continue;
                }
                var pixel = pixelMap[x][y];
                survivalAdd(pixel.element, 1);
                delete pixelMap[x][y];
                // Remove pixel from currentPixels
                for (var j = 0; j < currentPixels.length; j++) {
                    if (currentPixels[j].x == x && currentPixels[j].y == y) {
                        currentPixels.splice(j, 1);
                        break;
                    }
                }
            }
        }
    };
});

window.addEventListener("beforeunload",function(){
    clearAll();
    saveSettings();
});

function formatPrice(price) {
    result = [];
    if (price.gold_coin && price.gold_coin > 0) {
        result.push(price.gold_coin + "G");
    }

    for (let i in price) {
        if (i === "gold_coin") {
            continue;
        }
        if (price[i] > 0)
            result.push(price[i] + " " + i.replaceAll("_", " "));
    }
    return toSentence(result);
}
function toSentence(arr) {
    return arr.slice(0, -2).join(', ') +
        (arr.slice(0, -2).length ? ', ' : '') +
        arr.slice(-2).join(' and ');
}
function loadSurvival() {  
    
    initialElements = Object.keys(settings.survivalchem).concat(Object.keys(survivalShop).map(a => a.split("*")[0]));
    // runAfterAutogen(() => (runAfterAutogen(printReachable)));
}

function printReachable() {
    let reachable = findReachable(initialElements);
    console.log("reachable");
    console.log(reachable.join(","));
    let string = "";
    for (let i in elements) {
        if (!reachable.includes(i)) {
            if (string === "") {
                string = i;
            }
            else {
                string += "," + i;
            }
        }
    }
    console.log("unreachable");
    console.log(string);
    string = "";
    for (let i = 0; i < reachable.length; i++) {
        console.log(reachable[i]);
        console.log(settings.survivalchem[reachable[i]]);
        if (!settings.survivalchem[reachable[i]]) {
            if (string === "") {
                string = reachable[i];
            }
            else {
                string += "," + reachable[i];
            }
        }
    }
    console.log("to obtain");
    console.log(string);
    string = "";
    for (let i in Object.keys(settings.survivalchem)) {
        if (!reachable.includes(Object.keys(settings.survivalchem)[i]) && Object.keys(settings.survivalchem)[i] && elements[Object.keys(settings.survivalchem)[i]].category !== "tools") {
            if (string === "") {
                string = Object.keys(settings.survivalchem)[i];
            }
            else {
                string += "," + Object.keys(settings.survivalchem)[i];
            }
        }
    }
    console.log("illegal");
    console.log(string);
}
//change back
dependOn("chem.js", () => { return; }, true);