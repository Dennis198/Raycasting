import React from 'react';
import "./Raycasting.css";
import Boundary from "./Objects/boundary";
import Particle from "./Objects/particle";
import {reDraw,resetCanvas2d,resetCanvas3d} from "./Canvas/methods";
import {Button, Slider} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

/**
  Code for the custom slider look
  * */ 
 function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };

  const PrettoSlider = withStyles({
    root: {
      color: 'gray',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
      top: 4,
      '& *': {
        background: 'transparent',
        color: 'red',
      },
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);
/**End Slide Code */

const CANVAS_WIDTH=400;
const CANVAS_HEIGHT=400;
const NUMBER_RANDOM_WALLS=5;
const DEFAULT_RANGE_VIEW=30;
const MOVE_SPEED=5;
const ROTATE_SPEED=5;

export default class RayCasting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            boundary: [],
            particle: new Particle(),
            render3d: false, //Canvas "3d-plane" is On
            moveMode: true, // true=Mouse, false=Keyboard
        }
    }

    //Creates Ranom Walls and Draws the Canvas
    componentDidMount(){ 
        let boundary = this.state.boundary;
        for(let i=0;i<NUMBER_RANDOM_WALLS;i++){
            var x1=Math.floor(Math.random()*CANVAS_WIDTH);
            var y1=Math.floor(Math.random()*CANVAS_HEIGHT);
            var x2=Math.floor(Math.random()*CANVAS_WIDTH);
            var y2=Math.floor(Math.random()*CANVAS_HEIGHT);
            boundary.push( new Boundary(x1,y1,x2,y2));
        }
        //Walls on the boarder of the canvas
        boundary.push(new Boundary(0,0,CANVAS_WIDTH,0));
        boundary.push(new Boundary(CANVAS_WIDTH,0,CANVAS_WIDTH,CANVAS_HEIGHT));
        boundary.push(new Boundary(CANVAS_WIDTH,CANVAS_HEIGHT,0,CANVAS_HEIGHT));
        boundary.push(new Boundary(0,CANVAS_HEIGHT,0,0));

        this.setState({boundary:boundary});
        for(let i=0;i<NUMBER_RANDOM_WALLS+4;i++){
            boundary[i].show();
        }
        reDraw(null,this.state.particle, this.state.boundary, this.state.render3d);
    }

    //Move Particle with Mouse
    moveRay(e){
        if(!this.state.moveMode) return;//Exit if Movement is with Keypresses
        reDraw(e, this.state.particle, this.state.boundary, this.state.render3d);
    }

    //Move Particle with Keyboard
    rotateView(e){
        if(this.state.moveMode) return;//Exit if Movment is with Mouse
        if(e.key==="a"){
            this.state.particle.rotate(ROTATE_SPEED);
            reDraw(e, this.state.particle, this.state.boundary, this.state.render3d);
        }
        if(e.key==="d"){
            this.state.particle.rotate(-ROTATE_SPEED);
            reDraw(e, this.state.particle, this.state.boundary, this.state.render3d);
        }

        if(e.key==="w"){
            this.state.particle.move(MOVE_SPEED);
            reDraw(e, this.state.particle, this.state.boundary, this.state.render3d);
        }
        
        if(e.key==="s"){
            this.state.particle.move(-MOVE_SPEED);
            reDraw(e, this.state.particle, this.state.boundary, this.state.render3d);
        }
    }

    //handles the View Range Change of the Particle and redraw the canvas
    handleViewRangeChange(e, val){
        resetCanvas2d();
        let particle = new Particle(this.state.particle.pos.x,this.state.particle.pos.y,val);
        this.setState({particle: particle});
        reDraw(null,this.state.particle, this.state.boundary);
    }

    switch3DView(){
        this.setState({render3d: !this.state.render3d});
        setTimeout(() =>{
            if(!this.state.render3d){
                resetCanvas3d();
            } else{
                reDraw(null, this.state.particle, this.state.boundary, this.state.render3d);
            }
        },20)     
    }

    //handles the movemode switch and resets the particle position to the center of the canvas
    switchMoveMode(){
        let particle = this.state.particle;
        particle.pos.x = CANVAS_WIDTH/2;
        particle.pos.y = CANVAS_HEIGHT/2;
        this.setState({moveMode: !this.state.moveMode, particle: particle});
        reDraw(null, this.state.particle, this.state.boundary, this.state.render3d);
    }


    render(){
      const {render3d, moveMode} = this.state;
        return(
            <div className="raycasting" onKeyDown={(e) => this.rotateView(e)}>
                <h1>Raycasting</h1>
                <Button variant="outlined" onClick={() => this.switch3DView()}>{render3d ? "3D Render On":"3D Render Off"}</Button>
                <Button variant="outlined" onClick={() => this.switchMoveMode()}>{moveMode ? "Move Mouse":"Move Keyboard"}</Button>
                <h4>W: Forward, S:Backward</h4>
                <h4>A:Rotate(left), D:Rotate(right)</h4>
                <div className="raycasting__labels__slider">
                    <h4>View Range:</h4>
                        <PrettoSlider className="slider" valueLabelDisplay="on" aria-label="pretto slider" defaultValue={DEFAULT_RANGE_VIEW} min={1} max={180} step={1}
                        onChange={(e, val) => this.handleViewRangeChange(e, val)} 
                        scale={(x) => x *2} 
                        />
                </div>
                <canvas className="raycasting__canvas__2dplane" id="2d-plane" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                        onMouseMoveCapture={ (e) => this.moveRay(e)}
                        onClick={ (e) => this.rotateView(e)}
                        onKeyDown={(e) => this.rotateView(e)}
                        tabIndex="0"
                ></canvas>
                <canvas className="raycasting__canvas__3dplane" id="3d-plane" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                    
                ></canvas>
            </div>
        );
    }

}