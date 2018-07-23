export default class Body {
    constructor(container, dim){
        this.container = container;
        this.dimensions = dim;
        this.sprite = new PIXI.Sprite();
        this.active = false;
    }
    get x(){
        return this.sprite.x;
    }
    get y(){
        return this.sprite.y;
    }
    init(){
        this.sprite.interactive = true;
        this.sprite.mouseover = this.onMouseover.bind(this);
        this.sprite.mouseout = this.onMouseout.bind(this);
        this.sprite.mousedown = this.onMousedown.bind(this);
        this.sprite.mouseup = this.onMouseup.bind(this);
        return this;
    }
    onMouseover(){
        this.sprite.height *= 1.2;
        this.sprite.width *= 1.2;
    }
    onMouseout(){
        this.sprite.height = this.dimensions.height;
        this.sprite.width = this.dimensions.width;
    }
    onMousedown(){
        
    }
    onMouseup(){
        
    }
    update(){

    }
}