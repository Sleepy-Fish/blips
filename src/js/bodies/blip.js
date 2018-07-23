import Body from './body'
import { Sprite } from 'pixi.js';

export default class Planet extends Body {
    constructor(container, planet, dim, tint){
        super(container, dim);

        this.planet = planet;
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
    update(){
        this.sprite.x+=this.velocity.x;
        this.sprite.y+=this.velocity.y;
        let dx = this.x - this.planet.x;
        let dy = this.y - this.planet.y;
        let h = Math.sqrt((dx*dx)+(dy*dy));
        this.speed = (this.planet.orbitalRange/h).clamp(1,7);
        
        let arc = Math.atan2(dx,dy)
        if(h > this.orbitalRange) arc-=(h/this.orbitalRange).clamp(0,Math.PI/32);
        if(h < this.orbitalRange) arc+=(h/this.orbitalRange).clamp(0,Math.PI/32);

        this.velocity.x = -Math.sin(arc+(Math.PI/2))*this.speed;
        this.velocity.y = -Math.cos(arc+(Math.PI/2))*this.speed;
        
    }
    updateOrbitalRange(){
        if(this.active){
            this.orbitalRange = Math.floor(Math.random()*((this.planet.orbitalRange+this.orbitalRangeVariance)-(this.planet.orbitalRange-this.orbitalRangeVariance)+1)+(this.planet.orbitalRange-this.orbitalRangeVariance));
        }
    }
    convertPlanet(){
        let dx = this.x - this.planet.x;
        let dy = this.y - this.planet.y;
        let h = Math.sqrt((dx*dx)+(dy*dy));

        if(this.active && h < this.planet.orbitalRange+this.orbitalRangeVariance){
            this.planet.convert(1);
        }
    }
}