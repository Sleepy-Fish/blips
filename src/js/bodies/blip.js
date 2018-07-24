import Body from './body'
import { Sprite } from 'pixi.js';

export default class Planet extends Body {
    constructor(container, planet, dim, tint){
        super(container, dim);

        this.planet = planet;
        this.transfering = false;
        this.orbitalRange = this.planet.orbitalRange;
        this.orbitalRangeVariance = 20;
        this.sprite = new Sprite(PIXI.loader.resources['circle'].texture);
        this.sprite.tint = tint;
        this.sprite.anchor.set(0.5,0.5);
        
        let arc = Math.random()*2*Math.PI;
        let initPos = {
            x: this.planet.x+Math.cos(arc),
            y: this.planet.y+Math.sin(arc),

        }
        this.sprite.x = initPos.x;
        this.sprite.y = initPos.y;
        this.velocity = { x: 0, y: 0 };
        this.speed = 10
        this.sprite.width = dim.width;
        this.sprite.height = dim.height;

        this.container.addChild(this.sprite);
    }
    init(){
        setInterval(this.convertPlanet.bind(this),1000);
        setInterval(this.updateOrbitalRange.bind(this),10000);
        this.activate();
        return super.init();
    }
    activate(){
        this.active = true;
    }
    deactivate(){
        this.active = false;
    }
    transfer(destination){
        this.transfering = true;
        this.planet = destination;
    }
    update(){
        this.sprite.x+=this.velocity.x;
        this.sprite.y+=this.velocity.y;
        let dx = this.x - this.planet.x;
        let dy = this.y - this.planet.y;
        let h = Math.sqrt((dx*dx)+(dy*dy));
        this.inOrbitalRange = h < this.planet.orbitalRange+this.orbitalRangeVariance;
        if(this.inOrbitalRange && this.transfering){
            this.transfering = false;
        }
        this.speed = (this.planet.orbitalRange/h).clamp(1,7);
        
        let arc = (h > this.orbitalRange) ? Math.atan2(dx,dy)+(Math.PI/2)-((Math.PI/32)*(h/this.orbitalRange)) : Math.atan2(dx,dy)+(Math.PI/2)+((Math.PI/32)*(h/this.orbitalRange))
        this.velocity.x = -Math.sin(arc)*this.speed;
        this.velocity.y = -Math.cos(arc)*this.speed;
    }
    updateOrbitalRange(){
        if(this.active && !this.transfering){
            this.orbitalRange = Math.floor(Math.random()*((this.planet.orbitalRange+this.orbitalRangeVariance)-(this.planet.orbitalRange-this.orbitalRangeVariance)+1)+(this.planet.orbitalRange-this.orbitalRangeVariance));
        }
    }
    convertPlanet(){
        if(this.active && !this.transfering){
            this.planet.convert(1);
        }
    }
}