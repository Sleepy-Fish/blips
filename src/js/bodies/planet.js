import Body from './body'
import { Sprite } from 'pixi.js';
import PlanetContext from './planetContext';
import Blip from './blip';

export default class Planet extends Body {
    constructor(container, pos, dim, mainPlanet){
        super(container, dim);

        this.sprite = new Sprite(PIXI.loader.resources['circle'].texture);
        this.originalTint = 0xe5e5e5;
        this.sprite.tint = this.originalTint;
        this.sprite.anchor.set(0.5,0.5);
        this.sprite.x = pos.x;
        this.sprite.y = pos.y;
        this.sprite.width = dim.width;
        this.sprite.height = dim.height;

        this.ready = false;
        this.mainPlanet = mainPlanet;
        this.transferDestination = null;

        this.container.addChild(this.sprite);

        this.orbitalRange = 70;
        this.maxBlips = 10;
        this.blips = []
        this.blipTint = 0xf4adc7;

        this.conversion = 0;
        this.maxConversion = 100;

        this.context = new PlanetContext(this.container, this)
        this.contextOptions = {
            'spawn':{
                name: 'spawn',
                action: ()=>{
                    if(this.ready) this.addBlip();
                    this.context.hide();
                },
                tint: this.blipTint
            },
            'transfer':{
                name: 'transfer',
                action: ()=>{
                    if(this.blips.length>0) this.transferBlip(this.transferDestination);
                    this.context.hide();
                },
                tint: 0xaef9be
            },
        };
    }
    init(){
        setInterval(()=>{
            if(this.blips.length <= 0){
                this.convert(-1);
            }
        },1000);
        if(this.mainPlanet){
            this.addBlip();
            this.addContext('transfer');
        }
        return super.init();
    }
    addContext(...args){
        let currentContext = this.context.status;
        let updated = false;
        for(let arg of args){
            if(!currentContext.includes(arg)) {
                currentContext.unshift(arg)
                updated = true;
            }
        }
        if(updated){
            let newContext = [];
            for(let item of currentContext){
                newContext.push(this.contextOptions[item]);
            }
            this.context.update(newContext);
        }
    }
    removeContext(...args){
        let currentContext = this.context.status;
        let updated = false;
        let doomed = [];
        for(let i in args){
            if(currentContext.includes(args[i])) {
                doomed.push(i)
                updated = true;
            }
        }
        if(updated){
            for(let i in doomed){
                delete currentContext[i];
            }
            let newContext = [];
            for(let item of currentContext.filter(x => !!x)){
                newContext.push(this.contextOptions[item]);
            }
            this.context.update(newContext);
        }
    }
    activate(){
        this.active = true;
        for(const blip of this.blips){
            blip.activate();
        }
    }
    deactivate(){
        this.active = false;
        for(const blip of this.blips){
            blip.deactivate();
        }
    }
    onMousedown(){
        super.onMousedown();
        this.context.show();
    }
    update(){
        for(const blip of this.blips){
            blip.update();
        }
    }
    setTranferDestination(destination){
        this.transferDestination = destination;
    }
    convert(amt){
        if(this.conversion < this.maxConversion && this.conversion+amt >= 0 ){
            this.conversion += amt;
            this.sprite.tint = this.findGradient(this.originalTint, this.blipTint, this.conversion/this.maxConversion);
        } else if(!this.ready && this.conversion >= this.maxConversion){
            this.sprite.tint = this.blipTint;
            this.ready = true;
            if(this.blips.length < this.maxBlips){
                this.addContext('spawn');
            }
        }
    }
    transferBlip(destination){
        if(destination && this.blips.length > 0){
            let blipToGo = this.blips.shift();
            blipToGo.transfer(destination);
            destination.blips.push(blipToGo);
        }
        if(this.blips.length <= 0){
            this.removeContext('transfer');
        }
    }
    addBlip(){
        if(this.blips.length < this.maxBlips){
            this.conversion = 0;
            this.ready = false;
            this.sprite.tint = this.originalTint;
            this.blips.push(new Blip(this.container, this, { height: 8, width: 8 }, this.blipTint).init());
            this.removeContext('spawn');
        }
    }

    findGradient(startTint, endTint, ratio){
        let startHex = startTint.toString(16);
        let startRGB = {
            'R': parseInt(startHex.slice(0,2), 16),
            'G': parseInt(startHex.slice(2,4), 16),
            'B': parseInt(startHex.slice(4,6), 16)
        }
        let endHex = endTint.toString(16);
        let endRGB = {
            'R': parseInt(endHex.slice(0,2), 16),
            'G': parseInt(endHex.slice(2,4), 16),
            'B': parseInt(endHex.slice(4,6), 16)
        }
        let diffRGB = {
            'R': (endRGB['R'] - startRGB['R']),
            'G': (endRGB['G'] - startRGB['G']),
            'B': (endRGB['B'] - startRGB['B']),
        }
        let newRGB = {
            'R': Math.round(startRGB['R'] + (diffRGB['R']*ratio)),
            'G': Math.round(startRGB['G'] + (diffRGB['G']*ratio)),
            'B': Math.round(startRGB['B'] + (diffRGB['B']*ratio)),
        }
        let newHex = newRGB['R'].toString(16)+newRGB['G'].toString(16)+newRGB['B'].toString(16);
        let newTint = parseInt(newHex, 16);

        return newTint;
    }
}