import Body from './body'

export default class ContextAction extends Body {
    constructor(container, name, action, options){
        super(container, options);
        this._name = name;
        this.action = action;
    }
    get name(){
        return this._name;
    }
    onMousedown(){
        super.onMousedown();
        this.action();
    }
}