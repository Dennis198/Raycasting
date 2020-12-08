
/*
This File handles the Methods of the Moving Particle
*/
import Ray from "./ray";

const PARTICLE_MP_SIZE=3;
const DEFAULT_RANGE_VIEW=30;
const DEFAULT_X_POS=200;
const DEFAULT_Y_POS=200;

export default class Particle{
    constructor(x=DEFAULT_X_POS,y=DEFAULT_Y_POS,view_Range=DEFAULT_RANGE_VIEW){
        this.pos = {x:x, y:y};
        this.rays =[]
        this.heading=0;
        this.view_Range=view_Range
        for(let i=-view_Range;i<view_Range;i+=1){
            var angle = this.getAngle(i)
            this.rays.push(new Ray(this.pos, angle));
        }
    }

    //Methods for the Movement with the Key Press (w,s)
    move(amt){
        const vel = this.getAngle(this.heading);
        this.pos.x += amt*vel.x;
        this.pos.y += amt*vel.y;
    }

    //Methods for the Rotation with the Key Press (a,d)
    rotate(angle){
        this.heading += angle;
        let index=0;
        for(let i=-this.view_Range;i<this.view_Range;i++){
            var angle_i = this.getAngle(i+this.heading);
            this.rays[index].setAngel(angle_i);
            index++;
        }
    }

    //Calculates the Vector to a given Angle
    getAngle(i){
        var rad = i * Math.PI/180;
        return {x: 0*Math.cos(rad)-1*Math.sin(rad),y: 1*Math.cos(rad)+0*Math.sin(rad)}
    }
    //Calculates the distance between two points
    getDistance(start, end){
        return Math.sqrt(Math.pow(start.x-end.x,2)+Math.pow(start.y-end.y,2))
    }

    //update for the pos of the particle
    update(x,y){
        this.pos.x = x;
        this.pos.y = y;
    }

    //Method to calculate the collsion between the particle rays and the walls
    look(walls){
        const scence=[];
        var canvas = document.getElementById("2d-plane");
        var context = canvas.getContext("2d");
        for(let i=0;i< this.rays.length;i++){
            let closest = null;
            let record = Infinity;
            for(let j=0;j< walls.length;j++){
                const pt = this.rays[i].cast(walls[j]);
                if(pt){
                    const distance =  this.getDistance(this.pos, pt);
                    if(distance<record){
                        record=distance;
                        closest=pt;
                    }
                    
                }
            }
            if(closest){
                //Draws the line to the closest intersection point 
                context.beginPath();
                context.moveTo(this.rays[i].pos.x,this.rays[i].pos.y);
                context.lineTo(closest.x, closest.y);
                context.strokeStyle = "rgba(255,255,255,2)";
                context.stroke();
                context.strokeStyle = "black";
            } 
            scence[i] = record; // Get the Distance for every Ray for the 3d Rendering
        }
        return scence;
    }

    // displays the rays of the particle
    show(){
        var canvas = document.getElementById("2d-plane");
        var context = canvas.getContext("2d");
        context.fillStyle ="red";
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, PARTICLE_MP_SIZE, 0, 2*Math.PI);
        context.fill();
        for(let i=0; i< this.rays.length;i++){
            this.rays[i].show();
        }
    }
}