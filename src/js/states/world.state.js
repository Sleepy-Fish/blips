import GameState from './game.state';
import Planet from '../bodies/planet';
import 'pixi-layers';

export default class WorldState extends GameState{
    constructor(app){
        super(app);
        this.planet = new Planet(this.scene, { x: 300, y: 400 }, { width: 50, height: 50 }, true).init();
        this.otherPlanet = new Planet(this.scene, { x: 700, y: 200 }, { width: 50, height: 50 }, false).init();

        this.planet.setTranferDestination(this.otherPlanet);
        this.otherPlanet.setTranferDestination(this.planet);

        let fog = new PIXI.display.Layer();
        fog.useRenderTexture = true;
        fog.clearColor = [0.1, 0.1, 0.1, 1];
        let fogsprite = new PIXI.Sprite(fog.getRenderTexture());

        var lightbulb = new PIXI.Sprite(PIXI.loader.resources['light'].texture);
        lightbulb.anchor.set(0.5,0.5)
        lightbulb.alpha = 0.1;
        lightbulb.x = 300;
        lightbulb.y = 400;
        lightbulb.width = 300;
        lightbulb.height = 300;
        lightbulb.parentLayer = fog;
        fogsprite.mask = lightbulb;

        

        this.scene.addChild(fog, fogsprite, lightbulb);


    }
    run(delta){
        super.run(delta);
        this.planet.update();
        this.otherPlanet.update();
    }
    activate(){
        super.activate();
        this.planet.activate();
        this.otherPlanet.activate();
    }
    deactivate(){
        super.deactivate();
        this.planet.deactivate();
        this.otherPlanet.activate();
    }
}