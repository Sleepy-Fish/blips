import { Sprite } from 'pixi.js';

export default class Body {
    constructor(container, options){
        this.container = container;
        //Sprite initialization
        this.sprite = new Sprite(PIXI.loader.resources['circle'].texture);
        this.sprite.anchor.set(0.5,0.5);
        this.sprite.x = options.position.x;
        this.sprite.y = options.position.y;
        this.diameter = options.diameter;
        this.sprite.width = this.diameter;
        this.sprite.height = this.diameter;
        this.sprite.tint = options.tint;
        this.sprite.interactive = true;
        this.sprite.mouseover = this.onMouseover.bind(this);
        this.sprite.mouseout = this.onMouseout.bind(this);
        this.sprite.mousedown = this.onMousedown.bind(this);
        this.sprite.mouseup = this.onMouseup.bind(this);
        this.container.addChild(this.sprite);
        this.active = false;
    }
    get x(){
        return this.sprite.x;
    }
    get y(){
        return this.sprite.y;
    }
    activate(){
        this.active = true;
    }
    deactivate(){
        this.active = false;
    }
    onMouseover(){
        this.sprite.height *= 1.2;
        this.sprite.width *= 1.2;
    }
    onMouseout(){
        this.sprite.height = this.diameter;
        this.sprite.width = this.diameter;
    }
    onMousedown(){
        
    }
    onMouseup(){
        
    }
    update(){

    }
}