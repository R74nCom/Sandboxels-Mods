async function _kBBprompt(message, defaultValue = "") {
    return new Promise(resolve => {
        promptInput(message, (result) => {
            resolve(result);
        }, "keyBindButton.js is asking you...", defaultValue);
        
    })
}
var keysPressed = [null];
document.addEventListener("keydown", keyIsDown);
function keyIsDown(e){
    keysPressed.push(e.key)
}
document.addEventListener("keyup", keyIsUp);
function keyIsUp(e){
    keysPressed.splice(e.key)
}
elements.keyBindButton = {
	color: "#bebfa3",
    key1: null,
	onPlace: async (pixel) => {
        var answer1 = await _kBBprompt("Select a key to bind.",(pixel.key1||undefined))
        if (!answer1) {return}
        pixel.key1 = answer1.toLowerCase()
    },
    tick: (pixel) => {
        if (keysPressed.includes(pixel.key1)){
            pixel.charge = 1
        }
        doDefaults(pixel);
    },
	ignore: ["flash"],
	conduct: 1,
	movable: false,
	category:"machines",
	darkText: true,
}
