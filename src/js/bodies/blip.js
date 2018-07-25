import Body from './body'
import { Sprite } from 'pixi.js';

export default class Blip extends Body {
    constructor(container, planet, dim, tint){
        super(container, dim);

        this.planet = planet;
        this.transfering = false;
        this.desroying = false;
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
        this.sprite.width = dim.width;
        this.sprite.height = dim.height;

        this.container.addChild(this.sprite);
    }
    init(){
        this.conversionInterval = setInterval(this.convertPlanet.bind(this),1000);
        this.updateOrbitalRangeInterval = setInterval(this.updateOrbitalRange.bind(this),10000);
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
            this.planet.addContext('transfer');
        }
        
        let arc = (h > this.orbitalRange) ? Math.atan2(dx,dy)+(Math.PI/2)-((Math.PI/32)*(h/this.orbitalRange)) : Math.atan2(dx,dy)+(Math.PI/2)+((Math.PI/32)*(h/this.orbitalRange));
        if(this.desroying){
            this.velocity.x = -Math.sin(arc-Math.PI/2)*0.5;
            this.velocity.y = -Math.cos(arc-Math.PI/2)*0.5;
            if(this.x <= this.planet.x + 2 && this.x >= this.planet.x - 2 && this.y <= this.planet.y + 2 && this.y >= this.planet.y - 2){
                this.desroying = false;
            }
            return;
        }
        let speed = (this.planet.orbitalRange/h).clamp(1,7);
        this.velocity.x = -Math.sin(arc)*speed;
        this.velocity.y = -Math.cos(arc)*speed;
    }
    updateOrbitalRange(){
        if(this.active && !this.transfering){
            this.orbitalRange = Math.floor(Math.random()*((this.planet.orbitalRange+this.orbitalRangeVariance)-(this.planet.orbitalRange-this.orbitalRangeVariance)+1)+(this.planet.orbitalRange-this.orbitalRangeVariance));
        }
    }
    destroy(){
        this.desroying = true;
        return new Promise((_resolve, _reject)=>{
            let destroyInterval = setInterval(()=>{
                if(!this.desroying){
                    this.container.removeChild(this.sprite);
                    clearInterval(destroyInterval);
                    clearInterval(this.conversionInterval);
                    clearInterval(this.updateOrbitalRangeInterval);
                    this.deactivate();
                    _resolve(this);
                }
            }, 100);
        })
        
    }
    convertPlanet(){
        if(this.active && !this.transfering && !this.desroying){
            this.planet.convert(1);
        }
    }
}