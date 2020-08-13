import State from './state'
import Button from '../ui/button'
import 'pixi-sound';

export default class GameState extends State {
    constructor(app){
        super(app);
        this.hud = new PIXI.Container()
        this.fpsText = new PIXI.Text(Math.round(app.ticker.FPS));
        this.fpsText.x = 100;
        this.fpsText.y = 10;

        this.loop = PIXI.sound.Sound.from(PIXI.loader.resources['loop']);
        this.loop.loop = true;
        

        this.backButton = new Button({
            text:'Back',
            x:45,
            y: 30,
            width:70,
            height:40
        },()=>{
            window.game.setState('menu')
        });

        this.musicButton = new Button({
            text:'Music',
            x:45,
            y: 80,
            width:70,
            height:40
        },()=>{
            this.loop.isPlaying ? this.loop.stop() : this.loop.play();
        });

        this.hud.addChild(this.backButton.init, this.musicButton.init, this.fpsText);
        this.hud.visible = false;
        app.stage.addChild(this.hud);
    }
    run(delta){
        super.run(delta);
        this.fpsText.text = Math.round(this.app.ticker.FPS);
    }
    activate(){
        super.activate();
        this.hud.visible = true;
        this.loop.play();
        this.backButton.reset();
    }
    deactivate(){
        super.deactivate();
        this.hud.visible = false;
        this.loop.stop();
    }
}