import * as PIXI from 'pixi.js';

export default (cb, handleProgress)=>{
    let loader = PIXI.loader;
    loader
        .on("progress", handleProgress)
        .load(cb);
}