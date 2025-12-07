/*Version 1.1.0 Pseudorandom world generator*/
function pseudorandom(key, num, max = 1){
    return (Math.log(key)*(num*Math.log(1625.4986772154357))) % max;
};
eLists.STONEELEMS = ["rock", "gravel", "tuff", "basalt", "rock_wall"];
let oreChances = {
    diamond: 0.045,
    gold: 0.1,
    silver: 0.2,
    tungsten: 0.3,
    iron: 0.4,
    copper: 0.6,
    charcoal: 0.8,
    uranium: 0.805,
    aluminum: 1
}
class biome {
    constructor(layersArr, yLevels, properties, afterFunc = false){
        this.layers = layersArr;
        this.yLevels = yLevels;
        this.vMulti = 1;
        for(let item in properties){
            this[item] = properties[item];
        }
        this.generate = function(seed){
            autoResizeCanvas();
            if(!paused){togglePause();}
            let fraction = seed/(2**32);
            for(let level of this.yLevels){
                for(let x = 0; x <= width+2; x++){
                    //console.log(x);
                    let heightIncrease = (fraction < 0.5) ? -3*pseudorandom(((1-fraction)*(x+1))*(100*pseudorandom(x, 1241, 500)), 1) : 3*pseudorandom(((fraction)*(x+1))*(100*pseudorandom(x, 1241, 500)), 1);
                    let h = level + heightIncrease;
                    for(let y = 0; y <= h; y++){
                        //console.log(x,y);
                        let elementsArr = this.layers[this.yLevels.indexOf(level)];
                        let elem = elementsArr[Math.floor(elementsArr.length*pseudorandom((1-fraction)*pseudorandom((x+15)*(y+5), 65343, 500), 2) % elementsArr.length)] || elementsArr[0];
                        //if(x == 0 || x == 1){console.log(elem);};
                        let placed = tryCreate(elem, x-2, height-y);
                        
                        if(placed != null && this.temp != null){
                            placed.temp = this.temp;
                        }
                        if(elem == "sapling" && placed){
                            if(this.wc != null){
                                if(Array.isArray(this.wc)){
                                    let c = this.wc[Math.round(Math.random()*this.wc.length)];
                                    while(c == undefined){
                                        c = this.wc[Math.round(Math.random()*this.wc.length)];
                                    }
                                    placed.wc = c;
                                } else {
                                    placed.wc = this.wc;
                                }
                            }
                            if(this.lc != null){
                                if(Array.isArray(this.lc)){
                                    let c = this.lc[Math.round(Math.random()*this.lc.length)];
                                    while(c == undefined){
                                        c = this.lc[Math.round(Math.random()*this.lc.length)];
                                    }
                                    placed.lc = c;
                                } else {
                                    placed.lc = this.lc;
                                }
                            }
                        }
                    }
                }
            }
            this.generateOreVeins(seed, this.vMulti);
        };
    }

    generateOreVeins(seed, multi = 1){
        for(let x = 0; x <= width; x++){
            for(let y = 0; y <= height; y++){
                let c = pseudorandom((seed/2**32)*pseudorandom(x*y, 657345, 600), 3);
                if(c <= 0.3){
                    let c2 = pseudorandom((seed/2**32)*pseudorandom(x*y, 98755, 750), 4);
                    let ore;
                    for(let e in oreChances){
                        if(c2 <= oreChances[e]){
                            ore = e;
                            break;
                        }
                    }
                    let p = getPixel(x,y);
                    if(p != null && eLists.STONEELEMS.includes(p.element)){
                        tryCreate(ore, x, y, true);
                        let a = true;
                        let x2 = x, y2 = y;
                        while(a){
                            let hasStone = false;
                            for(let coords of squareCoords){
                                x2 += coords[0];
                                y2 += coords[1];
                                let p2 = getPixel(x2,y2);
                                if(p2 != null && eLists.STONEELEMS.includes(p2.element) && (pseudorandom((seed/2**32)*pseudorandom(x2,y2, 350), x2*y2) < (0.35*multi))){
                                    hasStone = true;
                                    tryCreate(ore, x2, y2, true);
                                }
                                if(pseudorandom((seed/2**32)*x2*y2, 6) < 0.15){
                                    a = false;
                                    break;
                                }
                            }
                            a = (hasStone) ? a : false;
                        }
                    }
                }
            }
        }
        if(this.afterFunc != null){
            this.afterFunc(seed);
        }
    }
}
let biomes = {
    plains: new biome([["rock", "rock", "rock", "gravel"], ["dirt", "dirt", "dirt", "dirt", "mud", "gravel"], ["grass","flower_seed","grass","grass","grass","grass","sapling","grass","grass","grass","grass","grass","grass","grass","grass"]], [25, 38, 40]),
    desert: new biome([["rock", "rock", "rock", "gravel"], ["rock", "packed_sand","rock", "packed_sand", "sand"], ["sand"], [null, null, null, null, null, null, null, null, null, "cactus"]], [17, 26, 40, 42], {vMulti: 1.2}),
    savanna: new biome([["rock", "rock", "rock", "gravel"], ["dirt", "dirt", "clay_soil", "dirt", "dirt"], ["grass",null,null, null, null, null, "sapling",null,null,null,null]], [25, 38, 40], {lc: ["#6fde26", "#8eed34", "#8cdb42", "#7bd12a", "#96e81c", "#a9e64e", "#a0d94c", "#a9d63e"], wc: ["#bdab7e", "#b09c6a", "#ab996d", "#998a63", "#917959", "#877051"], vMulti: 1.5}),
    tundra: new biome([["rock", "rock", "rock", "gravel"], ["dirt", "dirt", "rock", "permafrost"], ["permafrost", "permafrost", "permafrost", "permafrost", "permafrost", "permafrost", "ice", "snow"], [null,null,null,null,null,"pinecone",null,null,null,null,null,null]], [25, 30, 38, 40], {temp: -15, vMulti: 2}),
}
let seed = Math.random()*(2**32);
enabledMods.forEach((item)=>{
    if(item.includes("plants.js")){
        biomes.orchard = new biome([["rock","rock","rock","gravel"], ["dirt", "dirt", "dirt", "rock", "gravel"], ["dirt", "dirt", "dirt", "dirt", "mud", "clay_soil", "gravel"]], [25, 30, 38], {afterFunc: (seed)=>{
            for(let i = 0; i < width; i++){
                console.log(i, width);
                let elem = (pseudorandom((seed/2**32)*pseudorandom(i, 6544, 500), 7) < 0.15) ? plants.tree[(Math.round(Math.random()*plants.tree.length)) % plants.tree.length] : "grass";
                if(elem != undefined && elem != "grass"){elem += "_seed"};
                elem = (elem == undefined) ? "apple_seed" : elem;
                tryCreate(elem, i, 42);
            }
        }});
    }
});
elements.PRNGgenerate = {
    category: "tools", 
    onSelect: function(){
        let arr = [];
        let txt = shiftDown;
        Object.keys(biomes).forEach(function(b){arr.push(b);});
		txt = (arr.length >= 7) ? true : txt;
        promptInput("Leave blank to generate new seed. Your current seed is: " + seed, function(i){
            seed = (i != null && i.toLowerCase() == "c") ? seed : parseFloat(i) || Math.random()*(2**32);
            seed = seed % (2**32);
            if(!txt){
                promptChoose("", arr, (choice)=>{
                    biomes[choice].generate(seed);
                    promptText("World generation complete.");
                    selectElement('dirt');
                }, "Select a biome to generate: ");
            } else {
                let str = "";
                for(let key in biomes){
                    str += `${key},`;
                }
                str = str.replace(/^,|,$/g, '');
                promptInput("Enter the name of a biome (caps-insensetive) \nBiomes Available: " + str, function(inp){
                    if(!arr.includes(inp.toLowerCase())){
                        promptText("Invalid selection.");
                    }else {
                        biomes[inp.toLowerCase()].generate(seed);
                        promptText("World generation complete.");
                        selectElement('dirt');
                    }
                }, "Enter Biome")
            }
        }, "Enter seed:");
    }
}
elements.view_seed = {
    category: "tools",
    onSelect: function(){
        alert(seed);
        selectElement("dirt");
    }
}
