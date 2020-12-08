
export default class Boundary{
    constructor(x1,y1,x2,y2){
        this.startPoint={x:x1, y:y1}
        this.endPoint={x:x2, y:y2}
    }

    //Displays the Wall
    show(){
        var canvas = document.getElementById("2d-plane");
        var context = canvas.getContext("2d");
        context.beginPath();
        context.moveTo(this.startPoint.x,this.startPoint.y);
        context.lineTo(this.endPoint.x, this.endPoint.y);
        context.lineWidth=1;
        context.strokeStyle = "white";
        context.stroke();
    }
}