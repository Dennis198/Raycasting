/*
This File handles the Drawing on the Canvas "2d-plane"
*/
const CANVAS_WIDTH=400;
const CANVAS_HEIGHT=400;

//Resets the Canvas to the initial state
export function resetCanvas_2d(){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    context.stroke(); 
}

//redaws the Canvas "2d-plane" (Particle, boundarys, rays)
export function reDraw2D(e, particle, boundary){
    var canvas = document.getElementById("2d-plane");
    var context = canvas.getContext("2d");
    var pos = e ?  getMousePos(canvas,e): null;
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    context.stroke(); 
    for(let i=0;i<boundary.length;i++){
        boundary[i].show();
    }
    if(pos && pos.x){        
        particle.update(pos.x,pos.y);
    } 
    
    particle.show();     
}

//Gets the Mouse position on the Canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}