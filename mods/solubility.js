/*
* Version 1.1.0
*/

dependOn("orchidslibrary.js", ()=>{
    elements.water.reactions.salt = undefined;
    elements.water.reactions.sugar = undefined;
    elements.water.properties = {capacity: 100, elemsDissolved: {}};
    elements.salt.solubility = {water: 0.36, color: ["#7ca3f7", "#7798e0", "#89abf5", "#96b8ff"]};
    elements.sugar.solubility = {water: 2, visc: 850, color: ["#9bb0de", "#a8bbe3", "#a2b8e8", "#a7b7d9"]};
    elements.lye.solubility = {water: 1.09, color: ["#7ca3f7", "#7798e0", "#89abf5", "#96b8ff"]};
    elements.caustic_potash.solubility = {water: 1.1, color: ["#7ca3f7", "#7798e0", "#89abf5", "#96b8ff"]};
    elements.potassium_salt.solubility = {water: 0.3397, color: ["#7ca3f7", "#7798e0", "#89abf5", "#96b8ff"]};
    elements.borax.solubility = {water: 0.041, color: ["#658ce0", "#7299ed", "#7597e0", "#78a1fa"]};
    elements.epsom_salt.solubility = {water: 0.351, color: ["#658ce0", "#7299ed", "#7597e0", "#78a1fa"]};
    elements.sodium_acetate.solubility = {water: 1.233, color: ["#7ca3f7", "#7798e0", "#89abf5", "#96b8ff"]};
    elements.baking_soda.solubility = {water: 0.097, color: ["#7ca3f7", "#7798e0", "#89abf5", "#96b8ff"]};
    elements.copper_sulfate.solubility = {water: 0.32, color: ["#4a68f0", "#3358ff", "#2948d6", "#2146ed"]};
    elements.lye.reactions.water = undefined;
    elements.soap.reactions.water = undefined;
    elements.ash.solubility = {water: 1.1, func: function(p1, p2){
        if(p1.elemsDissolved.caustic_potash != undefined){
            p1.elemsDissolved.caustic_potash += p1.elemsDissolved.ash;
            p1.elemsDissolved.ash = 0;
        } else {
            p1.elemsDissolved.caustic_potash = p1.elemsDissolved.ash;
            p1.elemsDissolved.ash = 0;
        }
        if(p2.dissolved >= 100){
            changePixel(p2, getItem(["limestone", "quicklime", "charcoal", "dust", "dust"]));
            p2.dissolved = undefined;
        }
    }};
    elements.water.reactions.ash = undefined;
    function getItem(obj){
        let res;
        if(Array.isArray(obj)){
            res = obj[Math.round(Math.random()*obj.length)];
            while(res == null){
                res = obj[Math.round(Math.random()*obj.length)];
            }
        } else {
            res = obj;
        }
        return res;
    }
    function aqueousReaction(p1, p2){
        for(let elem in p1.elemsDissolved){
            if(elements[elem].reactions != null && p2.element != "water" && (elements[elem].reactions[p2.element] != undefined || (elements[p2.element].reactions != null && elements[p2.element].reactions[elem] != undefined))){
                
                let r = elements[elem].reactions[p2.element] || elements[p2.element].reactions[elem];
                if(r.tempMin && !((p1.temp >= r.tempMin) && (p2.temp >= r.tempMin))){
                    return false;
                }
                if(r.tempMax && !((p1.temp <= r.tempMax) && (p2.temp <= r.tempMax))){
                    return false;
			    }
                if(r.charged && !(p1.charge || p2.charge)){
                    return false;
                }
                let c = (r.chance != undefined) ? r.chance : 1;
                c = c*((p1.elemsDissolved[elem]/100)/elements[elem].solubility.water);
                if(Math.random() > c){
                    return false;
                }
                if(r.aqFunc){
                    r.aqFunc(p1, p2);
                }
                if(r.elem1 != undefined){
                    let e = getItem(r.elem1);
                    if(elements[e].solubility != undefined && elements[e].solubility.water != undefined){
                        p1.elemsDissolved[e] = p1.elemsDissolved[elem];
                        p1.elemsDissolved[elem] = undefined;                      
                    } else {
                        if(e === null){
                            deletePixel(p1.x, p1.y);
                        } else {
                            changePixel(p1, e);
                        }
                    }
                }
                if(r.elem2 != undefined){
                    changePixel(p2, getItem(r.elem2));
                }
                if(r.charge1){
                    p1.charge = r.charge1;
                }
                if(r.charge2){
                    p2.charge = r.charge2;
                }
                if(r.stain1){
                    stainPixel(p1,r.stain1,0.05);
                }
                if(r.stain2){
                    stainPixel(p2,r.stain2,0.05);
                }
            } else if (p2.element == "water"){
                for(let e2 in p2.elemsDissolved){
                    if(elements[elem].reactions != undefined && elements[elem].reactions[e2] != undefined){
                        let r = elements[elem].reactions[e2];
                        if(r.tempMin && !((p1.temp >= r.tempMin) && (p2.temp >= r.tempMin))){
                            return false;
                        }
                        if(r.tempMax && !((p1.temp <= r.tempMax) && (p2.temp <= r.tempMax))){
                            return false;
                        }
                        if(r.charged && !(p1.charge || p2.charge)){
                            return false;
                        }
                        let c = (r.chance != undefined) ? r.chance : 1;
                        c = c*((p1.elemsDissolved[elem]/100)/elements[elem].solubility.water);
                        if(Math.random() > c){
                            return false;
                        }
                        if(r.aqFunc){
                            r.aqFunc(p1, p2);
                        }
                        if(r.elem1 != undefined){
                            let e = getItem(r.elem1);
                            if(elements[e].solubility != undefined && elements[e].solubility.water != undefined){
                                p1.elemsDissolved[e] = p1.elemsDissolved[elem];
                                p1.elemsDissolved[elem] = undefined;                      
                            } else {
                                if(e === null){
                                    deletePixel(p1.x, p1.y);
                                } else {
                                    changePixel(p1, e);
                                }
                            }
                        }
                        if(r.elem2 != undefined){
                            let e = getItem(r.elem2);
                            if(elements[e].solubility != undefined && elements[e].solubility.water != undefined){
                                p2.elemsDissolved[e] = p1.elemsDissolved[elem];
                                p2.elemsDissolved[elem] = undefined;                      
                            } else {
                                if(e === null){
                                    deletePixel(p2.x, p2.y);
                                } else {
                                    changePixel(p2, e);
                                }
                            }
                        }
                        if(r.charge1){
                            p1.charge = r.charge1;
                        }
                        if(r.charge2){
                            p2.charge = r.charge2;
                        }
                        if(r.stain1){
                            stainPixel(p1,r.stain1,0.05);
                        }
                        if(r.stain2){
                            stainPixel(p2,r.stain2,0.05);
                        }
                    }
                }
            }
        }
    }
    function updateColor(pixel){
        let c = pixel.oColor;
        for(let element in pixel.elemsDissolved){
            //if(elements[element].solubility.color != undefined){
                let color = (elements[element].solubility.color != undefined) ? getItem(elements[element].solubility.color) : getItem(elements[element].color);
                /*if(Array.isArray(elements[element].solubility.color)){
                    color = elements[element].solubility.color[Math.round(Math.random()*elements[element].solubility.color.length)];
                    while(color == undefined){
                        color = elements[element].solubility.color[Math.round(Math.random()*elements[element].solubility.color.length)];
                    }
                } else {
                    color = elements[element].solubility.color;
                }*/
                if(color.startsWith("#")){
                    color = hexToRGB(color);
                } else if(color.startsWith("rgb(")){
                    color = getRGB(color);
                }
                c = interpolateRgb(getRGB(c), color, ((pixel.elemsDissolved[element]/100)/elements[element].solubility.water) || 0.01);
                //console.log(rgb, color, getRGB(pixel.oColor), ((pixel.elemsDissolved[elem]/100)/elements[elem].solubility.water));

            }
            pixel.color = c;
            //}
    }
    function solventTick(pixel) {
        if(pixel.start = pixelTicks+5){
            pixel.oColor = pixel.color;
        }
        pixel.capacity = (1+((pixel.temp-20)/80))*100;
        for(let coords of adjacentCoords){
            let x = pixel.x+coords[0], y = pixel.y+coords[1];
            let p2 = getPixel(x,y);
            let total = 0;
            for(let elem in pixel.elemsDissolved){
                total += pixel.capacity*((pixel.elemsDissolved[elem]/100)/elements[elem].solubility.water);
            }
            if(p2 != null){
                aqueousReaction(pixel, p2);
            }
            if(p2 != null && total < pixel.capacity){
                if(elements[p2.element].solubility != null && elements[p2.element].solubility[pixel.element] != null){
                    let solubilityObj = elements[p2.element].solubility;
                    p2.dissolved = (p2.dissolved == undefined) ? elements[p2.element].solubility[pixel.element] : p2.dissolved+elements[p2.element].solubility[pixel.element];
                    
                    if(pixel.elemsDissolved[p2.element] == undefined){
                        pixel.elemsDissolved[p2.element] = elements[p2.element].solubility[pixel.element];
                    } else {
                        pixel.elemsDissolved[p2.element] += elements[p2.element].solubility[pixel.element];
                    }
                    updateColor(pixel, p2.element);
                    if(solubilityObj.func != undefined){
                        solubilityObj.func(pixel, p2);
                    }
                    if(p2.dissolved >= 100){
                        deletePixel(p2.x, p2.y);
                    }
                }
            } else if(total > (pixel.capacity+20) && p2 == null) {
                let solArr = [], elemArr = [];
                for(let elem in pixel.elemsDissolved){
                    elemArr.push(elem);
                    solArr.push(elements[elem].solubility[pixel.element]);
                }
                let index = solArr.indexOf(Math.min(...solArr));
                if(isEmpty(x,y) && !outOfBounds(x,y)){
                    createPixel(elemArr[index], x, y);
                    let max = (pixel.elemsDissolved[elemArr[index]] > (total-pixel.capacity)) ? total-pixel.capacity : pixel.elemsDissolved[elemArr[index]];
                    pixelMap[x][y].dissolved = 100-max;
                    updateColor(pixel);
                    pixel.elemsDissolved[elemArr[index]] -= max;
                }
            }
            else if (p2 != null && p2.element == "water"){
                for(let elem in pixel.elemsDissolved){
                    if(p2.elemsDissolved[elem] == undefined) {p2.elemsDissolved[elem] = 0;};
                    if(p2.elemsDissolved[elem] > pixel.elemsDissolved[elem] && pixel.elemsDissolved[elem]/100 < elements[elem].solubility[pixel.element]){
                        p2.elemsDissolved[elem]--;
                        pixel.elemsDissolved[elem]++;
                        updateColor(pixel);
                        updateColor(p2);
                    } else if (p2.elemsDissolved[elem] < pixel.elemsDissolved[elem] && p2.elemsDissolved[elem]/100 < elements[elem].solubility[pixel.element]) {
                        p2.elemsDissolved[elem]++;
                        pixel.elemsDissolved[elem]--;
                        updateColor(pixel);
                        updateColor(p2);
                    }
                }
            }
        }
        if(pixel.temp >= elements[pixel.element].solventTempHigh){
            let elem = null;
            let num = Math.random();
            if(elem === null){
                for(let e in pixel.elemsDissolved){
                    if(num <= ((pixel.elemsDissolved[e]/100)/elements[e].solubility.water)/4){
                        elem = e;
                    }
                }
            }
            elem = (elem == null) ? "steam" : elem;
            changePixel(pixel, elem, 110);
            pixel.dissolvedElems = {};
        }
    }
    behaviors.SOLVENT = function(pixel){
        let visc = 0;
        for(let elem in pixel.elemsDissolved){
            if(elements[elem].solubility.visc != undefined){
                visc += ((pixel.elemsDissolved[elem]/100)/elements[elem].solubility[pixel.element])*elements[elem].solubility.visc;
            }
        }
        if(elements[pixel.element].viscosity != undefined){
            visc = visc*(elements[pixel.element].viscosity/1000);
        }
        let chance = 1-(visc/1000);
        let dir = (Math.random()<chance) ? (Math.random() < 0.5) ? 1 : -1 : 0;
        if(!tryMove(pixel, pixel.x+dir, pixel.y+1) && !tryMove(pixel, pixel.x, pixel.y+1)){
            tryMove(pixel, pixel.x+dir, pixel.y);
        }
    }
    elements.water.tick = solventTick;
    elements.water.behavior = behaviors.SOLVENT;
    elements.water.tempHigh = undefined;
    elements.water.solventTempHigh = 101;
	elements.steam.tempLow = 99
}, true);
