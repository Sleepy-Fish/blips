import Body from './body'
import { Sprite } from 'pixi.js';
import Blip from './blip';

export default class Planet extends Body {
    constructor(container, pos, dim, mainPlanet){
        super(container, dim);

        this.sprite = new Sprite(PIXI.loader.resources['circle'].texture);
        this.sprite.tint = 0xe5e5e5;
        this.sprite.anchor.set(0.5,0.5);
        this.sprite.x = pos.x;
        this.sprite.y = pos.y;
        this.sprite.width = dim.width;
        this.sprite.height = dim.height;

        this.ready = false;
        this.mainPlanet = mainPlanet;

        this.container.addChild(this.sprite);

        this.orbitalRange = 80;
        this.maxBlips = 10;
        this.blips = []
        this.blipTint = 0xf4adc7;

        this.conversion = 0;
        this.maxConversion = 100;

    }
    init(){
        if(this.mainPlanet) this.addBlip();
        return super.init();
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
        if(this.ready){
            this.addBlip();
        }
    }
    update(){
        for(const blip of this.blips){
            blip.update();
        }
    }
    convert(amt){
        if(this.conversion < this.maxConversion){
            this.conversion += amt;
            this.sprite.tint = this.findGradient(0xe5e5e5, this.blipTint, this.conversion/this.maxConversion);
        } else if(!this.ready && this.conversion >= this.maxConversion){
            this.sprite.tint = this.blipTint;
            this.ready = true;
            console.log('READY');
        }
    }
    addBlip(){
        if(this.blips.length < this.maxBlips){
            this.conversion = 0;
            this.ready = false;
            this.sprite.tint = 0xe5e5e5;
            this.blips.push(new Blip(this.container, this, { height: 8, width: 8 }, this.blipTint).init());
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