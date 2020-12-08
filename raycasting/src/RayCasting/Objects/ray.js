/*
This file handles the calculation for the Rays
*/

export default class Ray {
    constructor(pos, angle){
        this.pos=pos;
        this.direction=angle;
    }

    //Sets the angle of a Ray ()
    setAngel(a){
        this.direction.x = a.x;
        this.direction.y = a.y;
    }
    //Calculates the Vector to a given Angle
    getAngle(i){
        var rad = i * Math.PI/180;
        return {x: 0*Math.cos(rad)-1*Math.sin(rad),y: 1*Math.cos(rad)+0*Math.sin(rad)}
    }

    //Displays the Ray
    show(){
        var canvas = document.getElementById("2d-plane");
        var context = canvas.getContext("2d");
        context.beginPath();
        context.moveTo(this.pos.x,this.pos.y);
        context.lineTo(this.pos.x+this.direction.x, this.pos.y+this.direction.y);
        context.lineWidth=1;
        //context.strokeStyle = "black";
        context.stroke();
    }

    //Calculates the intersection Point of the Ray and a wall
    cast(wall){
        const x1 = wall.startPoint.x;
        const y1 = wall.startPoint.y;
        const x2 = wall.endPoint.x;
        const y2 = wall.endPoint.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x+this.direction.x;
        const y4 = this.pos.y+this.direction.y;

        const den = (x1-x2) * (y3-y4) - (y1-y2) * (x3- x4);

        if(den === 0) return;

        const t = ((x1-x3) * (y3-y4) - (y1-y3) * (x3-x4))/den;
        const u = -((x1-x2) * (y1-y3) - (y1-y2) * (x1-x3))/den;

        if(t>0 && t<1 && u>0){
            const pt = {x: x1 + t*(x2-x1), y: y1 + t*(y2-y1)};
            return pt;
        } else {
            return;
        }
        

        
    }
}