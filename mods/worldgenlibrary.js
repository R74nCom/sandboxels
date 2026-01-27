/*
Version 1.1.0
*/
Array.prototype.getClosest = function(num){
    let arr = [];
    for(value of this){
        arr[arr.length] = Math.abs(num-value);
    };
    return this[arr.indexOf(Math.min(...arr))];
}
function biasedNum(min, max, bias, strength = 0.75){
    let num = (Math.random()*(max-min))+min;
    num += Math.random()*1*Math.round((bias-num));
    return num;
}
function generateSeed(min, max, base, bias){
    let arr = [];
    for(let i = 0; i <= width; i++){
        arr[i] = Math.round(biasedNum(min, max, base, bias));
        base = arr[i];
    }
    return arr;
}
let vChance = {
    coal: 0.25,
    copper: 0.25,
    tin: 0.25,
    aluminum: 0.2,
    iron: 0.175,
    zinc: 0.17,
    lead: 0.14,
    nickel: 0.13,
    uranium: 0.12,
    diamond: 0.06,
    gold: 0.2,
};
let vMultipliers = {
    dirt: 1,
    sand: 0.25,
}
class biome {
    constructor(layersArr, yLevels, vMulti = 1, afterFunc = false){
        this.layers = layersArr;
        this.yLevels = yLevels;
        this.vMulti = vMulti;
        this.generate = function(seed){
            autoResizeCanvas();
            if(!paused){togglePause();}
            for(let x = 0; x <= width; x++){
                for(let y = 0; y <= seed[width]; y++){
                    let layerHeight = this.yLevels.getClosest(y), layerNum = this.yLevels.indexOf(layerHeight);
                    let layer = this.layers[layerNum];
                    let chance = (y-layerHeight)/11;
                    let elem = layer[Math.round(Math.random()*layer.length)];
                    if(chance < 0 && (this.layers[layerNum-1] != undefined) && Math.random() <= chance){
                        layer = this.layers[layerNum-1];
                        elem = layer[Math.round(Math.random()*layer.length)];
                    } else if(chance > 0 && (this.layers[layerNum+1] != undefined) && Math.random() <= chance){
                        layer = this.layers[layerNum+1];
                        elem = layer[Math.round(Math.random()*layer.length)];
                    }
                    if(isEmpty(x,y) && !outOfBounds(x,y)){
                        createPixel(elem, x, height-y);
                        if(elem == "sapling"){
                            if(this.wc){
                                pixelMap[x][height-y].wc = this.wc;
                            }
                            if(this.lc){
                                pixelMap[x][height-y].lc = this.lc;
                            }
                        }
                    }
                }
            }
            setTimeout(function(){
                for(let i = 30; i > 0; i--){
                    doFrame();
                    focusGame();
                }
                for(let x = 0; x <= width; x++){
                    for(let y = 0; y <= height; y++){
                        if(!isEmpty(x,y) && !outOfBounds(x,y) && ["rock","sand"].includes(pixelMap[x][y].element)){
                            for(let coords of squareCoords){
                                let x2 = x + coords[0], y2 = y + coords[1];
                                if(!isEmpty(x2,y2) && !outOfBounds(x2,y2) && vChance[pixelMap[x2][y2].element] != undefined){
                                    let chance = (vChance[pixelMap[x2][y2].element]*vMultipliers[pixelMap[x][y].element])*(this.vMulti || 1);
                                    if(Math.random() < chance){
                                        changePixel(pixelMap[x][y], pixelMap[x2][y2].element);
                                    }
                                }
                            }
                        }
                    }
                }
                if(afterFunc != false){
                    afterFunc();
                }
            togglePause();
            }, 50);
        };
    }
}
let biomes = {
    plains: new biome([["rock","dirt","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","diamond","charcoal", "gold", "charcoal", "copper", "copper", "tin", "tin", "aluminum", "iron", "zinc", "lead", "nickel", "uranium"],["dirt","gravel","clay","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","mud"], ["dirt","dirt","dirt","grass","grass","dirt","dirt","grass","dirt","sapling","pinecone","seeds"]], [13, 32, 35], 1, ()=>{for(i = 0; i < width; i++){if(isEmpty(i, 40) && !outOfBounds(i, 40) && Math.random() < 0.25){createPixel("grass",i,40);}}}),
    desert: new biome([["rock","dirt","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","diamond","charcoal", "charcoal", "copper", "copper", "tin", "tin", "aluminum", "iron", "zinc", "lead", "nickel", "uranium", "gold"], ["sand","sand","sand","sand","sand","sand","sand","sand","sand","sand","sand","sand","sand","gold","iron","copper","tin","aluminum","zinc","charcoal"], ["sand"], ["sand","sand","sand","sand","sand","sand","sand","sand","sand","sand","sand","cactus"]], [4, 14, 27, 37], 1, ()=>{for(i = 0; i < width; i++){if(isEmpty(i, 40) && !outOfBounds(i, 40) && Math.random() < 0.0125){createPixel("cactus",i,40);}}}),
    savanna: new biome([["rock","clay","clay","clay","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","diamond", "diamond", "charcoal", "charcoal", "gold", "charcoal", "copper", "copper", "copper", "tin", "tin", "aluminum", "iron", "zinc", "lead", "nickel", "uranium"],["dirt","clay","clay","clay","dirt","dirt","dirt","dirt","dirt","dirt","mud"], ["grass","dirt","dirt","sand","sand","sand","dirt","dirt","dirt","sapling","dirt"]], [13, 27, 35], 1.6, ()=>{
        for(let i = 0; i <= width; i++){
            let elemArr = ["grass","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","sapling","dirt"], elem = elemArr[Math.round(Math.random()*elemArr.length)];
            createPixel(elem, i, 40);
            if(elem == "sapling"){
                pixelMap[i][40].wc = ["#bdab7e", "#b09c6a", "#ab996d", "#998a63", "#917959", "#877051"];
                pixelMap[i][40].lc = ["#6fde26", "#8eed34", "#8cdb42", "#7bd12a", "#96e81c", "#a9e64e", "#a0d94c", "#a9d63e"];
            }
        }
    }),
    tundra: new biome([["rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","iron","tin","gold","diamond", "diamond", "charcoal", "charcoal", "gold", "charcoal", "copper", "copper", "copper", "tin", "tin", "aluminum", "iron", "zinc", "lead", "nickel", "uranium"],["permafrost","permafrost","permafrost","snow","ice","permafrost","permafrost","permafrost","permafrost","permafrost","permafrost"], ["dirt","dirt","mud","dirt","dirt","snow","dirt","mud","mud","dirt","dirt"]], [7, 16, 27], 1.65, ()=>{
        for(let i = 0; i <= width; i++){
            let elemArr = ["grass","dirt","dirt","dirt"], elem = elemArr[Math.round(Math.random()*elemArr.length)];
            createPixel(elem, i, 40);
        };
    }),
};
biomes.savanna.wc = ["#bdab7e", "#b09c6a", "#ab996d", "#998a63", "#917959", "#877051"];
biomes.savanna.lc = ["#6fde26", "#8eed34", "#8cdb42", "#7bd12a", "#96e81c", "#a9e64e", "#a0d94c", "#a9d63e"];
elements.generate = {
    category: "tools",
    default: "plains",
    onSelect: function(){
        let b = [];
        for(key in biomes){
            if(!biomes[key].hide){
                b[b.length] = key;
            }
        }
        promptChoose("", b, (out)=>{
            if(biomes[out] == undefined){
                alert("Invalid Selection.");
            } else {
                let seed = generateSeed(27, Math.max(...biomes[out].yLevels)+4, Math.max(...biomes[out].yLevels)+1);
                biomes[out].generate(seed);
                elements.generate.default = out;
                selectElement("dirt");
            }
        }, "Select a biome to generate: ");
    }
}
for(item of enabledMods){
    if(item.includes("plants.js")){
        biomes.orchard = new biome([["rock","dirt","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","rock","diamond","charcoal", "gold", "charcoal", "copper", "copper", "tin", "tin", "aluminum", "iron", "zinc", "lead", "nickel", "uranium"],["dirt","gravel","clay","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","mud"], ["dirt","dirt","dirt","gravel","dirt","dirt","dirt","dirt","dirt"]], [13, 32, 33], 1, ()=>{
            for(i = 0; i < width; i++){
                if(isEmpty(i, 40) && !outOfBounds(i, 40)){
                    let elemsArr = ["tree", "grass", "dirt", "dirt", "dirt", "dirt", "dirt"], elem = elemsArr[Math.round(Math.random()*elemsArr.length)];
                    if(elem == "tree"){
                        let type = plants.tree[Math.round(Math.random()*plants.tree.length)];
                        let elem = (elements[`${type}_seed`] == undefined) ? "apple_seed" : `${type}_seed`;
                        createPixel(elem, i, 40);
                    } else {
                        createPixel(elem, i, 40);
                    }
                }
            }
        });
    }
}
