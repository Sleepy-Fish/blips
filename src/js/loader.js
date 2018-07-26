import * as PIXI from 'pixi.js';

export default (cb, handleProgress)=>{
    let loader = PIXI.loader;
    loader
        .add('circle','public/assets/circle.png')
        .add('loop', 'public/assets/audio/moonandshit.m4a')
        .on("progress", handleProgress)
        .load(cb);
}