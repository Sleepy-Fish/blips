import GameState from './game.state';
import Planet from '../bodies/planet';

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

        this.planet.setTranferDestination(this.otherPlanet);
        this.otherPlanet.setTranferDestination(this.planet);

        this.planet.addBlip();
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