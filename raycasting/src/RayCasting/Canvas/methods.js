/*
This File handles the Drawing on the Canvases "2d-plane, 3d-plane"
*/
import {reDraw3DScene, resetCanvas_3d} from "./3d-plane/methods";
import {reDraw2D, resetCanvas_2d} from "./2d-plane/methods";

//Redraws both Canvases "2d-plane" and "3d-plane"
export function reDraw(e, particle, boundary, render3D=false){
    reDraw2D(e, particle, boundary);
    let scene=particle.look(boundary);
    if(render3D){
        reDraw3DScene(scene);
    } else {
        resetCanvas_3d();
    }       
}

//resets the Canvas "2d-plane"
export function resetCanvas2d(){
    resetCanvas_2d();
}

//resets the canvas "3d-plane"
export function resetCanvas3d(){
    resetCanvas_3d();
}