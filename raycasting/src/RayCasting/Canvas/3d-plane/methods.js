/*
This File handles the Drawing on the Canvas "3d-plane"
*/
const CANVAS_WIDTH=400;
const CANVAS_HEIGHT=400;
const scneceW = 400;
const scenceH=400;

export function reDraw3DScene(scene){
    const w = scneceW/scene.length;
    var canvas = document.getElementById("3d-plane");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    context.stroke(); 
    for(let i=0;i<scene.length;i++){
        const sq = scene[i]*scene[i];
        const wSq = scneceW*scneceW;
        const b = map_range(sq,0,wSq,255,0);
        const h = map_range(scene[i],0,scneceW,scenceH,0);
        context.fillStyle = `rgb(${b},${b},${b})`;
        context.beginPath();  
        let test=CANVAS_HEIGHT-h;  
        context.fillRect(i*w,test/2,w+2,h);
        context.stroke();
    }
}

//Resets the Canvas to the initial state
export function resetCanvas_3d(){
    var canvas = document.getElementById("3d-plane");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    context.stroke(); 
}

//Maps the range of an array (Value) to another Range
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}