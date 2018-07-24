import { Sprite } from 'pixi.js';
import ContextAction from './contextAction';

export default class PlanetContext {
    constructor(container, planet){
        this.container = container;
        this.context = new PIXI.Container();
        this.planet = planet;
        this.shown = false;
        this.context.visible = false;
        this.actions = [];

        this.distanceFromPlanet = 50;
        this.distanceBetweenActions = (Math.PI/6);

        this.container.addChild(this.context);
        this.update();
    }
    show(){
        this.shown = true;
        this.context.visible = true;
        this.autoClear = setTimeout(()=>{
            if(this.visible) this.hide()
        },5000);
    }
    hide(){
        clearTimeout(this.autoClear);
        this.shown = false;
        this.context.visible = false;
    }
    get visible(){
        return this.shown;
    }
    get status(){
        return this.actions.map(x => x.name).filter(x => x!=='close');
    }
    update(actions){
        this.context.children = [];
        this.actions = [];
        let arc = -(Math.PI/2);
        for(let i in actions){
            this.actions.push(new ContextAction(
                this.context,
                actions[i].name,
                { x: this.planet.x + this.distanceFromPlanet*Math.cos(arc), y: this.planet.y + this.distanceFromPlanet*Math.sin(arc) },
                { width: 20, height: 20 },
                actions[i].tint,
                actions[i].action
            ).init());
            arc+=this.distanceBetweenActions;
        }
        this.actions.push(new ContextAction(
            this.context,
            'close',
            { x: this.planet.x + this.distanceFromPlanet*Math.cos(arc), y: this.planet.y + this.distanceFromPlanet*Math.sin(arc) },
            { width: 20, height: 20 },
            this.planet.originalTint,
            this.hide.bind(this)
        ).init());
    }
}