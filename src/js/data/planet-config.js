export default (()=>{
    return {
        baseTint: 0xe5e5e5,
        levels:[
            {
                diameter:50,
                maxBlips:10,
                levelCost:10,
                orbitalRange:70,
                maxConversion:10
            },
            {
                diameter:60,
                maxBlips:20,
                levelCost:18,
                orbitalRange:80,
                maxConversion:200
            },
            {
                diameter:70,
                maxBlips:50,
                levelCost:40,
                orbitalRange:100,
                maxConversion:300
            }
        ]
    }
})();