import GameState from './game.state';
import Planet from '../bodies/planet';
import 'pixi-layers';

export default class WorldState extends GameState{
    constructor(app){
        super(app);
        this.planet = new Planet(this.scene, {
            position:{x:200, y: 300},
            diameter: 50,
            tint: 0xe5e5e5
        });
        this.otherPlanet = new Planet(this.scene, {
            position:{x:400, y: 100},
            diameter: 50,
            tint: 0xe5e5e5
        });
        this.notherPlanet = new Planet(this.scene, {
            position:{x:550, y: 350},
            diameter: 50,
            tint: 0xe5e5e5
        });

        this.planet.setTranferDestination(this.otherPlanet);
        this.otherPlanet.setTranferDestination(this.notherPlanet);
        this.notherPlanet.setTranferDestination(this.planet);

        let fog = new PIXI.display.Layer();
        fog.useRenderTexture = true;
        fog.clearColor = [0.1, 0.1, 0.1, 1];
        let fogsprite = new PIXI.Sprite(fog.getRenderTexture());

        var lightbulb = new PIXI.Sprite(PIXI.loader.resources['light'].texture);
        lightbulb.anchor.set(0.5,0.5)
        lightbulb.alpha = 0.1;
        lightbulb.x = 200;
        lightbulb.y = 300;
        lightbulb.width = 300;
        lightbulb.height = 300;
        lightbulb.parentLayer = fog;
        fogsprite.mask = lightbulb;

        this.scene.addChild(fog, fogsprite, lightbulb);

        this.planet.addBlip();
    }
    run(delta){
        super.run(delta);
        this.planet.update();
        this.otherPlanet.update();
        this.notherPlanet.update();
    }
    activate(){
        super.activate();
        this.planet.activate();
        this.otherPlanet.activate();
        this.notherPlanet.activate();
    }
    deactivate(){
        super.deactivate();
        this.planet.deactivate();
        this.otherPlanet.activate();
        this.notherPlanet.activate();
    }
}