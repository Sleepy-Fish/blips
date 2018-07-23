import * as PIXI from 'pixi.js';

export default (cb, handleProgress)=>{
    let loader = PIXI.loader;
    loader
        .add('circle','assets/circle.png')
        .on("progress", handleProgress)
        .load(cb);
}