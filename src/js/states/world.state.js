import GameState from './game.state';
import Planet from '../bodies/planet';

export default class WorldState extends GameState{
    constructor(app){
        super(app);
        this.planet = new Planet(this.scene, { x: 300, y: 400 }, { width: 50, height: 50 }, true).init();
        this.otherPlanet = new Planet(this.scene, { x: 700, y: 400 }, { width: 50, height: 50 }, false).init();

        this.planet.setTranferDestination(this.otherPlanet);
        this.otherPlanet.setTranferDestination(this.planet);
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