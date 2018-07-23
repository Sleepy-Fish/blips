import Body from './body'
import { Sprite } from 'pixi.js';

export default class ContextAction extends Body {
    constructor(container, pos, dim, tint, action){
        super(container, dim);

        this.sprite = new Sprite(PIXI.loader.resources['circle'].texture);
        this.sprite.tint = tint;
        this.sprite.anchor.set(0.5,0.5);
        this.sprite.x = pos.x;
        this.sprite.y = pos.y;
        this.sprite.width = dim.width;
        this.sprite.height = dim.height;

        this.action = action;

        this.container.addChild(this.sprite);
    }
    init(){
        return super.init();
    }
    activate(){
        this.active = true;
    }
    deactivate(){
        this.active = false;
    }
    onMousedown(){
        super.onMousedown();
        this.action();
    }
}