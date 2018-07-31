export default instance => {
    return {
        'spawn':{
            name: 'spawn',
            action: ()=>{
                if(instance.ready) instance.addBlip();
                instance.context.hide();
            },
            tint: instance.blipTint
        },
        'transfer':{
            name: 'transfer',
            action: ()=>{
                if(instance.blips.length>0) instance.transferBlip(instance.transferDestination);
                instance.context.hide();
            },
            tint: 0xaef9be
        },
        'upgrade':{
            name: 'upgrade',
            action: ()=>{
                if(instance.level < instance.maxLevel) instance.upgrade();
                instance.context.hide();
            },
            tint: 0x93bcff
        },
    }
};