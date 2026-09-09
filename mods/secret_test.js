// window.historyTimeline = {min: 0, max: 0};

// function historyLog() {
//     historyTimeline[historyTimeline.max] = generateSave(undefined, {keep:["temp","color"], strip:true});
//     historyTimeline.max ++;
//     // if (historyTimeline.length > 10) historyTimeline.shift();
//     if (historyTimeline.max - historyTimeline.min >= 11) {
//         delete historyTimeline[historyTimeline.min];
//         historyTimeline.min ++;
//     };
//     // console.log(historyTimeline)
// }

// window.addEventListener("load", () => {
//     gameCanvas.addEventListener("mousedown", () => {
//         historyLog();
//         // console.log(".");
//     })
//     gameCanvas.addEventListener("touchstart", () => {
//         historyLog();
//         // console.log(".");
//     })
// })