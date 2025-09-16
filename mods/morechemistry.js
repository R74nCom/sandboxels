/*
*Version 2.2.0
*/

dependOn("orchidslibrary.js", ()=>{
    elements.cloner.keyInput = "str:clone", elements.ecloner.keyInput = "str:clone", elements.slow_cloner.keyInput = "str:clone", elements.floating_cloner.keyInput = "str:clone";
    let xDown = false;
    elements.copper_sulfate = {
        behavior: behaviors.POWDER,
        color: ["#4391fd","#004cfe"],
        reactions: {
            ant: {"elem2": "dead_bug"},
            fly: {"elem2": "dead_bug"},
            firefly: {"elem2": "dead_bug"},
            stink_bug: {"elem2": "dead_bug"},
            bee: {"elem2": "dead_bug"},
            termite: {"elem2": "dead_bug"},
            spider: {"elem2": "dead_bug"},
            plant: {"elem2": "dead_plant"},
            grass: {"elem2": "dead_plant"},
            algae: {"elem2": null},
            kelp: {"elem2": "water"},
            coral: {"elem2": "water"},
            mushroom_cap: {"elem2": null},
            mushroom_stalk: {"elem2": null},
            mushroom_gill: {"elem2": null},
            mushroom_spore: {"elem2": null},
            zinc: {"stain2": "#2A1210"},
            fire: {"elem1": null,"elem2": "poison_gas","chance": 0.1},
            sugar: {"elem1": "oxidized_copper","elem2": null,"color1": ["#CB3D3D","#A6292B","#6E1B1B"]},
            magnesium: {elem1: "copper", elem2: "epsom_salt"},
            wood: {stain2: "#043023"},
        },
        tempHigh: 110,
        fireColor: [
            "#91d106",
            "#feff97",
            "#248e01"
        ],
        state: "solid",
        density: 3600,
        hidden: true,
        category: "powders",
        id: 509,
        movable: true,
        properties: {
            anhydrous: false
        },
        tick: function(pixel){
            if(pixelTicks-pixel.start == 2 && xDown){
                pixel.anhydrous = true;
                let rgb = {r: 235, g: 247, b: 250};
                let num = 6 - (Math.round(Math.random()*12));
                for(let key in rgb){
                    rgb[key] += num;
                }
                pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
            }
            let multi = (pixel.temp-70)/100;
            multi = (multi < 0) ? 0 : ((multi > 1) ? 1 : multi);
            if(Math.random() < 0.05*multi){
                pixel.anhydrous = true;
                let rgb = {r: 235, g: 247, b: 250};
                let num = 6 - (Math.round(Math.random()*12));
                for(let key in rgb){
                    rgb[key] += num;
                }
                pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
            }
            if(pixel.anhydrous){
                let neighbors = [];
                for(let coords of squareCoords){
                    let x = pixel.x+coords[0], y = pixel.y+coords[1];
                    neighbors[neighbors.length] = (isEmpty(x,y) && !outOfBounds(x,y)) ? "air" : (!outOfBounds(x,y)) ? pixelMap[x][y].element : undefined;
                }
                if(neighbors.includes("air") && pixel.temp < 50 && Math.random() < 0.00035){
                    pixel.anhydrous = false;
                    let rgb = (Math.random() > 0.5) ? {r: 67, g: 145, b: 253} :  {r: 0, g: 76, b: 254};
                    let num = 6 - (Math.round(Math.random()*12));
                    for(let key in rgb){
                        rgb[key] += num;
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                    
                } else if (neighbors.includes("steam") || neighbors.includes("water") || neighbors.includes("salt_water") || neighbors.includes("sugar_water") || neighbors.includes("dirty_water") || neighbors.includes("seltzer") || neighbors.includes("pool_water") || neighbors.includes("slush")){
                    pixel.anhydrous = false;
                    let rgb = (Math.random() > 0.5) ? {r: 67, g: 145, b: 253} :  {r: 0, g: 76, b: 254};
                    let num = 6 - (Math.round(Math.random()*12));
                    for(let key in rgb){
                        rgb[key] += num;
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                }
            }
        }
    }
    elements.water.ignore = ["copper_sulphate"], elements.steam.ignore = ["copper_sulphate"], elements.pool_water.ignore = ["copper_sulphate", 'pool_ice'], elements.salt_water.ignore = ["copper_sulphate", 'salt_ice'], elements.sugar_water.ignore = ["copper_sulphate", 'sugar_ice'], elements.seltzer.ignore = ["copper_sulphate", 'seltzer_ice'],
    document.addEventListener("keydown", (e)=>{xDown = (e.key.toLowerCase() == "x") ? true : xDown;});
    document.addEventListener("keyup", (e)=>{xDown = (e.key.toLowerCase() == "x") ? false : xDown;});
    
    elements.toggle_cloner = {
        category: "machines",
        active: "#fbff03",
        inactive: "#333300",
        color: "#333300",
        name: "ToggleableCloner",
        keyInput: "chance",
        insulate: 1,
        properties: {
            clone: null,
            toggle: false,
            chance: 0.0166666667,
            clickCd: 0,
        },
        hardness: 1,
        ignore: ["drag","unknown", "cloner", "toggle_cloner", "floating_cloner", "clone_powder", "slow_cloner", "ecloner", "destroyable_cloner", "destroyable_clone_powder", "ewall", "wall"],
        onClicked: function(pixel,element){
            
            if(pixel.clone == null && pixel.clickCd == 0 && dragStart == null){
                pixel.clone = (elements.toggle_cloner.ignore.includes(element)) ? pixel.clone : element;
            } else if (pixel.clickCd == 0 && !shiftDown) {
                pixel.toggle = !pixel.toggle;
                if(pixel.toggle){
                    let rgb = hexToRGB(elements.toggle_cloner.active);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                } else {
                    let rgb = hexToRGB(elements.toggle_cloner.inactive);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                }
            }
            if(shiftDown && !elements.toggle_cloner.ignore.includes(element)){
                pixel.clone = element;
            }
            
            if(pixel.clickCd == 0 && dragStart == null){
                pixel.clickCd =  20;
            };
        },
        onSelect: function(){
            logMessage("Place cloner, select element to clone, click on the pixel to set the clone element, then click on it to toggle on or off. Hold shift when clicking to change the element to the selected element.");
        },
        tick: function(pixel){
            if(pixel.clickCd > 0){pixel.clickCd--;}
            if(![null, undefined].includes(pixel.clone) && pixel.toggle == true && Math.random() < pixel.chance){
                for(let coords of adjacentCoords){
                    let x = pixel.x+coords[0], y = pixel.y+coords[1];
                    if(isEmpty(x,y) && !outOfBounds(x,y)){
                        createPixel(pixel.clone, x, y);
                        pixelMap[x][y].temp = pixel.temp;
                    }
                }
            }
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null && p2.element == pixel.element && (p2.clone == null && pixel.clone != null)){
                    p2.clone = pixel.clone;
                }
            }
        },
        dataInFunc: function(pixel, value){
            if(value.includes(":")){
                let valueArr = value.split(":");
                if(Array.isArray(pixel[valueArr[0]]) && !pixel[valueArr[0]].includes(valueArr[1])){
                    pixel[valueArr[0]].push(valueArr[1]);
                } else {
                    pixel[valueArr[0]] = (Number.isInteger(pixel[valueArr[0]])) ? parseInt(valueArr[1]) : valueArr[1];
                }
            }
        }
    };
    
    elements.multi_toggle_cloner = {
        category: "machines",
        color: "#283300",
        keyInput: "chance",
        ignore: ["unknown", "cloner", "toggle_cloner", "floating_cloner", "clone_powder", "slow_cloner", "ecloner", "destroyable_cloner", "destroyable_clone_powder", "ewall", "wall"],
        properties: {
            cloneElems: [],
            toggle: false,
            clickCd: 0,
            chance: 0.45,
        },
        hardness: 1,
        insulate: 1,
        onClicked: function(pixel, element){
            if(pixel.clickCd == 0 && !shiftDown && dragStart == null){
                pixelToggle(pixel, {r:1.5,g:1.5,b:0});
                pixel.clickCd = 20;
            }
            if(shiftDown && !elements.multi_toggle_cloner.ignore.includes(element)){
                if(pixel.cloneElems.includes(element)){
                    pixel.cloneElems.splice(pixel.cloneElems.indexOf(element), 1);
                } else {
                    pixel.cloneElems.push(element);
                }
            }
        },
        tick: function(pixel){
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random() < pixel.chance && pixel.toggle && JSON.stringify(pixel.cloneElems) != "[]"){
                    elem = pixel.cloneElems[Math.round(Math.random()*pixel.cloneElems.length)];
                    createPixel(elem, x, y);
                    pixelMap[x][y].temp = pixel.temp;
                }
            }
            pixel.clickCd -= (pixel.clickCd == 0) ? 0 : 1;
        },
        onSelect: function(){
            logMessage("Place cloner, then add elements to the clone list by selecting the element and hold down shift while clicking in it, then click on it to toggle on or off. Shift clicking with an element already found in the list will remove it.");
        },
        dataInFunc: function(pixel, value){
            if(value.includes(":")){
                let valueArr = value.split(":");
                if(Array.isArray(pixel[valueArr[0]]) && !pixel[valueArr[0]].includes(valueArr[1])){
                    pixel[valueArr[0]].push(valueArr[1]);
                } else {
                    pixel[valueArr[0]] = (Number.isInteger(pixel[valueArr[0]])) ? parseInt(valueArr[1]) : valueArr[1];
                }
            }
        }
    }
    
    elements.toggle = {
        category: "machines",
        active: "#b8b8b8",
        inactive: "#2b2b2b",
        color: "#2b2b2b",
        properties: {
            toggle: false,
            clickCd: 0,
        },
        hardness: 1,
        onClicked: function(pixel){
            if(pixel.clickCd == 0 && dragStart == null){
                pixel.toggle = !pixel.toggle;
                pixel.clickCd = 20;
                if(pixel.toggle){
                    let rgb = hexToRGB(elements.toggle.active);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                } else {
                    let rgb = hexToRGB(elements.toggle.inactive);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                }
            };
        },
        tick: function(pixel){
            if(pixel.clickCd != 0){pixel.clickCd--;}
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null && elements[p2.element].conduct == 1 && pixel.toggle){
                    p2.charge = 1;
                }
            }
        }
    }
    
    elements.e_temper = {
        category: "machines",
        color: "#ffb300",
        conduct: 1,
        targetTemp: 25,
        hardness: 1,
        onSelect: function(){
            promptInput("Enter the target temperature:", (In)=>{
                this.targetTemp = parseInt(In) || this.targetTemp;
            }, "Temperature Selector", this.targetTemp);
        },
        properties: {
            targetTemp: null
        },
        keyInput: "targetTemp",
        tick: function(pixel){
            if(pixel.targetTemp == null){
                pixel.targetTemp = elements.e_temper.targetTemp;
            }
            
            doElectricity(pixel, 1);
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null && pixel.charge > 0){
                    let difference = pixel.targetTemp-p2.temp;
                    p2.temp += difference/4;
                }
            }
        },
        dataInFunc: function(pixel, value){
            if(value.includes(":")){
                let valueArr = value.split(":");
                if(Array.isArray(pixel[valueArr[0]]) && !pixel[valueArr[0]].includes(valueArr[1])){
                    pixel[valueArr[0]].push(valueArr[1]);
                } else {
                    pixel[valueArr[0]] = (Number.isInteger(pixel[valueArr[0]])) ? parseInt(valueArr[1]) : valueArr[1];
                }
            }
        }
    }
    
    elements.toggle_temper = {
        active: "#ff7b00",
        inactive: "#261200",
        color: "#261200",
        category: "machines",
        targetTemp: 25,
        keyInput: "targetTemp",
        hardness: 1,
        properties: {
            toggle: false,
            clickCd: 0,
            targetTemp: null,
        },
        onClicked: function(pixel){
            if(pixel.clickCd == 0 && dragStart == null){
                pixel.toggle = !pixel.toggle;
                pixel.clickCd = 20;
                if(pixel.toggle){
                    let rgb = hexToRGB(elements.toggle_temper.active);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                } else {
                    let rgb = hexToRGB(elements.toggle_temper.inactive);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                }
            };
        },
        onSelect: function(){
            promptInput("Enter the target temperature:", (In)=>{
                this.targetTemp = parseInt(In) || this.targetTemp;
            }, "Temperature Selector", this.targetTemp);
        },
        tick: function(pixel){
            if(pixel.targetTemp == null){
                pixel.targetTemp = this.targetTemp;
            }
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null && pixel.toggle){
                    let difference = pixel.targetTemp-p2.temp;
                    p2.temp += difference/4;
                }
            }
            if(pixel.clickCd > 0){pixel.clickCd--;};
        },
        dataInFunc: function(pixel, value){
            if(value.includes(":")){
                let valueArr = value.split(":");
                if(Array.isArray(pixel[valueArr[0]]) && !pixel[valueArr[0]].includes(valueArr[1])){
                    pixel[valueArr[0]].push(valueArr[1]);
                } else {
                    pixel[valueArr[0]] = (Number.isInteger(pixel[valueArr[0]])) ? parseInt(valueArr[1]) : valueArr[1];
                }
            }
        }
    }
    
    elements.multitool = {
        category: "tools",
        input: 0,
        onSelect: function(){
            promptInput("Multitool for morechemistry.js, changes key values for different elements added in morechemistry.js, chance for toggleable cloner, targetTemp for toggleable temper, clone for other cloners, and channel for portals.", (In)=>{
                this.input = In;
            }, "Multitool Input", this.input);
        },
        tool: function(pixel){
             if(elements[pixel.element].keyInput != undefined){
                let type = (elements[pixel.element].keyInput.startsWith("int:")) ? "int" : (elements[pixel.element].keyInput.startsWith("str:")) ? "string" : "int"; 
                let In = elements[pixel.element].keyInput.slice(elements[pixel.element].keyInput.indexOf(":")+1, elements[pixel.element].keyInput.length);
                pixel[In] = (type == "int") ? parseFloat(this.input) : this.input;
            }
        },
        canPlace: false,
    }
    
    class rangeTool {
        constructor(color, func, properties = false, onSelect = false, onClicked = false){
            this.category = "machines";
            this.properties = (properties == false) ? { range: null } : properties;
            this.color = color;
            this.range = 0;
            this.onSelect = (onSelect == false) ? ()=>{promptInput("Enter the range for this tool: ", (range)=>{this.range = parseInt(range);}, "Tool Range", this.range)} : onSelect;
            this.onClicked = (onClicked == false) ? undefined : onClicked;
            this.func = func;
        }
        tick = function(pixel){
            if(pixel.range == null){
                pixel.range = elements[pixel.element].range;
            } else {
                let pixelRange = mouseRange(pixel.x, pixel.y, pixel.range);
                for(let coords of pixelRange){
                    let p2 = getPixel(coords[0], coords[1]);
                    if(p2 != null){
                        elements[pixel.element].func(p2);
                    }
                }
            }
        }
    }
    
    elements.button = {
        category: "machines",
        color: "#c7c7c7",
        hardness: 1,
        onClicked: function(pixel){
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p = getPixel(x,y);
                if(p != null && elements[p.element].conduct){
                    p.charge = 1;
                }
            }
        }
    }
    
    elements.toggle_mixer = new rangeTool("#212420", (pixel)=>{
        let range = mouseRange(pixel.x, pixel.y, pixel.range);
        let pixels = [];
        for(let coords of range){
            let p2 = getPixel(coords[0], coords[1]);
            if(p2 != null && pixel.toggle){
                pixels.push(p2);
            }
        }
        for(let p of pixels){
            if(Math.random() < pixel.chance){
                let p2 = pixels[Math.round(Math.random()*pixels.length)];
                if(p != undefined && p2 != undefined && elements[p.element].movable && elements[p2.element].movable){
                    swapPixels(p, p2);
                    if(elements[p.element].onMix != undefined){
                        elements[p.element].onMix(p);
                    }
                    if(elements[p2.element].onMix != undefined){
                        elements[p2.element].onMix(p2);
                    }
                }
            }
        }
        if(pixel.clickCd > 0){pixel.clickCd--;}
    }, {range: null, toggle: false, clickCd: 0, chance: 0.35}, false, (pixel)=>{
        if(pixel.clickCd == 0 && dragStart == null){
                pixel.toggle = !pixel.toggle;
                pixel.clickCd = 20;
                if(pixel.toggle){
                    let rgb = hexToRGB(elements.toggle_mixer.active);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                } else {
                    let rgb = hexToRGB(elements.toggle_mixer.inactive);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                }
            };
    });
    elements.toggle_mixer.inactive = "#212420", elements.toggle_mixer.active = "#93a390", elements.toggle_mixer.movable = false, elements.toggle_mixer.keyInput = "chance";
    elements.toggle_mixer.hardness = 1;
    
    elements.toggle_smasher = new rangeTool("#2e2726", (pixel)=>{
        let range = mouseRange(pixel.x, pixel.y, pixel.range);
        for(let coords of range){
            let p2 = getPixel(coords[0], coords[1]);
            if(p2 != null && pixel.toggle && Math.random() < pixel.chance && elements[p2.element].breakInto != undefined){
                let elem = (Array.isArray(elements[p2.element].breakInto)) ? elements[p2.element].breakInto[Math.round(Math.random()*elements[p2.element].breakInto.length)] : elements[p2.element].breakInto;
                if(elem != undefined){
                    changePixel(p2, elem);
                }
            }
        }
        if(pixel.clickCd > 0){pixel.clickCd--;}
    }, {range: null, toggle: false, clickCd: 0, chance: 0.35}, false, (pixel)=>{
        if(pixel.clickCd == 0 && dragStart == null){
                pixel.toggle = !pixel.toggle;
                pixel.clickCd = 20;
                if(pixel.toggle){
                    let rgb = hexToRGB(elements.toggle_smasher.active);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                } else {
                    let rgb = hexToRGB(elements.toggle_smasher.inactive);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                }
            };
    });
    elements.toggle_smasher.inactive = "#2e2726", elements.toggle_smasher.active = "#bf9e9b", elements.toggle_smasher.movable = false, elements.toggle_smasher.keyInput = "chance";
    elements.toggle_smasher.hardness = 1;
    
    elements.target_toggle_smasher = new rangeTool("#332422", (pixel)=>{
        let range = mouseRange(pixel.x, pixel.y, pixel.range);
        for(let coords of range){
            let p2 = getPixel(coords[0], coords[1]);
            if(p2 != null && pixel.toggle && Math.random() < pixel.chance && elements[p2.element].breakInto != undefined && pixel.targetElems.includes(p2.element)){
                let elem = (Array.isArray(elements[p2.element].breakInto)) ? elements[p2.element].breakInto[Math.round(Math.random()*elements[p2.element].breakInto.length)] : elements[p2.element].breakInto;
                if(elem != undefined){
                    changePixel(p2, elem);
                }
            }
        }
        if(pixel.clickCd > 0){pixel.clickCd--;}
    }, {range: null, toggle: false, clickCd: 0, chance: 0.35, targetElems: []}, ()=>{
        promptInput("Enter the range for this tool: ", (range)=>{
            console.log(range);
            elements.target_toggle_smasher.range = parseInt(range);
            logMessage("Place smasher, then add elements to the target list by selecting the element and hold down shift while clicking on the pixel, then click on it to toggle on or off. Shift clicking with an element already found in the list will remove it.");
        }, "Enter range", elements.target_toggle_smasher.range);
    }, (pixel, elem)=>{
        if(pixel.clickCd == 0 && dragStart == null && !shiftDown){
                pixel.toggle = !pixel.toggle;
                pixel.clickCd = 20;
                if(pixel.toggle){
                    let rgb = hexToRGB(elements.target_toggle_smasher.active);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                } else {
                    let rgb = hexToRGB(elements.target_toggle_smasher.inactive);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                }
            };
        if(shiftDown && elements[elem].breakInto != undefined){
            if(pixel.targetElems.includes(elem)){
                pixel.targetElems.splice(pixel.targetElems.indexOf(elem), 1);
            } else {
                pixel.targetElems.push(elem);
            }
        }
    });
    elements.target_toggle_smasher.inactive = "#332422", elements.target_toggle_smasher.active = "#b57a72", elements.target_toggle_smasher.movable = false, elements.target_toggle_smasher.keyInput = "chance";
    elements.target_toggle_smasher.hardness = 1;
    
    elements.target_toggle_mixer = new rangeTool("#1f291b", (pixel)=>{
        
        let range = mouseRange(pixel.x, pixel.y, pixel.range);
        let pixels = [];
        for(let coords of range){
            let p2 = getPixel(coords[0], coords[1]);
            if(p2 != null && pixel.toggle){
                pixels.push(p2);
            }
        }
        for(let p of pixels){
            if(Math.random() < pixel.chance){
                let p2 = pixels[Math.round(Math.random()*pixels.length)];
                if(p != undefined && p2 != undefined && elements[p.element].movable && elements[p2.element].movable && pixel.targetElems.includes(p.element) && pixel.targetElems.includes(p2.element)){
                    swapPixels(p, p2);
                    if(elements[p.element].onMix != undefined){
                        elements[p.element].onMix(p);
                    }
                    if(elements[p2.element].onMix != undefined){
                        elements[p2.element].onMix(p2);
                    }
                }
            }
        }
        if(pixel.clickCd > 0){pixel.clickCd--;}
    }, {range: null, toggle: false, clickCd: 0, chance: 0.35, targetElems: []}, ()=>{
        promptInput("Enter the range for this tool: ", (range)=>{
            console.log(range);
            elements.target_toggle_mixer.range = parseInt(range);
            logMessage("Place mixer, then add elements to the target list by selecting the element and hold down shift while clicking on the pixel, then click on it to toggle on or off. Shift clicking with an element already found in the list will remove it.");
        }, "Enter range", elements.target_toggle_mixer.range);
    }, (pixel, elem)=>{
        if(pixel.clickCd == 0 && dragStart == null && !shiftDown){
                pixel.toggle = !pixel.toggle;
                pixel.clickCd = 20;
                if(pixel.toggle){
                    let rgb = hexToRGB(elements.target_toggle_mixer.active);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                } else {
                    let rgb = hexToRGB(elements.target_toggle_mixer.inactive);
                    let num = 5 - (Math.random()*10);
                    for(let key in rgb){
                        rgb[key] += num;
                        rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                }
            };
        if(shiftDown && elements[elem].movable){
            if(pixel.targetElems.includes(elem)){
                pixel.targetElems.splice(pixel.targetElems.indexOf(elem), 1);
            } else {
                pixel.targetElems.push(elem);
            }
        }
    });
    elements.target_toggle_mixer.inactive = "#1f291b", elements.target_toggle_mixer.active = "#8cbf7a", elements.target_toggle_mixer.movable = false, elements.target_toggle_mixer.keyInput = "chance";
    elements.target_toggle_mixer.hardness = 1;
    elements.target_sensor = {
        color: "#afb08b",
        conduct: 1,
        category: "machines",
        properties: {
            targetElems: [],
            clickCd: 0,
        },
        hardness: 1,
        onClicked: function(pixel, element){
            if(shiftDown && element != "unknown" && pixel.clickCd == 0){
                if(pixel.targetElems.includes(element)){
                    pixel.targetElems.splice(pixel.targetElems.indexOf(element), 1);
                    pixel.clickCd = 20;
                } else {
                    pixel.targetElems.push(element);
                    pixel.clickCd = 20;
                }
            }
        },
        tick: function(pixel){
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p = getPixel(x,y);
                if(p != null && pixel.targetElems.includes(p.element)){
                    pixel.charge = 1;
                    doElectricity(pixel,1);
                }
            }
            pixel.clickCd -= (pixel.clickCd > 0) ? 1 : 0;
        },
        dataInFunc: function(pixel, value){
            if(value.includes(":")){
                let valueArr = value.split(":");
                if(Array.isArray(pixel[valueArr[0]]) && !pixel[valueArr[0]].includes(valueArr[1])){
                    pixel[valueArr[0]].push(valueArr[1]);
                } else {
                    pixel[valueArr[0]] = (Number.isInteger(pixel[valueArr[0]])) ? parseInt(valueArr[1]) : valueArr[1];
                }
            }
        }
    }
    
    Pixel.prototype.inRange = function(range){
        res = false;
        for(let coords of range){
            if(this.x == coords[0] && this.y == coords[1]){
                res = true;
            }
        }
        return res;
    }
    function acidTick(pixel){
        for(let coords of adjacentCoords){
            let x = pixel.x+coords[0], y = pixel.y+coords[1];
            let p2 = getPixel(x,y);
            let ignore = false;
            for(let item of elements[pixel.element].ignore){
                    if(p2 != null && item.startsWith("*")&&p2.element.endsWith(item.split("*")[1])){
                        ignore = true;
                    } else if (p2 != null && item.endsWith("*")&&p2.element.startsWith(item.split("*")[0])){
                        ignore = true;
                    }
                }
            if(p2 != null && !(elements[pixel.element].ignore.includes(p2.element) || ignore || p2.element == pixel.element)){
                deletePixel(x,y);
                deletePixel(pixel.x, pixel.y);
            }
        }
    }
    elements.acid.behavior = behaviors.LIQUID;
    elements.acid.tick = acidTick;
    elements.acid.ignore = elements.acid.ignore.concat(["nitric_acid", "aqua_regia", "nitrogen_dioxide", "nitric_acid_ice", "nitrogen_dioxide_ice", "acid", "chloroauric_acid", "*chloride", "*carbonate", "*acetate", "*sulfate", "*gallium", "*hydroxide", "salt", "*aluminum", "target_portal_in", "*magnesium", "*copper", "*iron", "*calcium", "sulfuric_acid", "*vinegar", "*gypsum", "*wall", "epsom_salt", "*platinum", "chloroplatinic_acid", "*sulfur*"]);
    elements.nitric_acid = {
        alias: "HNO₃",
        behavior: behaviors.LIQUID,
        ignore: elements.acid.ignore,
        state: "liquid",
        color: ["#f5e7e1", "#f7e8e1", "#f7ebe6"],
        tempLow: -42,
        stateLow: "nitric_acid_ice",
        reactions: {
            acid: {elem1: null, elem2: "aqua_regia"},
        },
        density: 1510,
        category: "liquids",
        tick: function(pixel){
            acidTick(pixel);
            for(let coords of squareCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null && ["light", "liquid_light", "laser"].includes(p2.element) || Math.random()<(pixel.temp-68)/53){
                    let elems = ["nitrogen_dioxide","water", "oxygen"];
                    let elem = elems[Math.round(Math.random()*elems.length)];
                    while (elem == undefined){
                        elem = elems[Math.round(Math.random()*elems.length)];
                    }
                    changePixel(pixel, elem);
                }
            }
        }
    }
    elements.nitrogen_dioxide = {
        alias: "NO₂",
        color: ["#6e361f", "#7d3d22", "#873f20", "#9c4935"],
        behavior: behaviors.GAS,
        state: "gas",
        reactions: {
            water: {elem1: null, elem2: "nitric_acid"},
        },
        category: "gases",
        stateHigh: ["nitrogen", "oxygen"],
        tempHigh: 150,
        stateLow: "nitrogen_dioxide_ice",
        tempLow: -11,
    };
    
    elements.nitrogen_dioxide_ice = {
        temp: -20,
        color: ["#4f1607", "#4d1709", "#541606", "#471407"],
        behavior: behaviors.WALL,
        state: "solid",
        category: "states",
        stateHigh: "nitrogen_dioxide",
        tempHigh: -10,
    };
    
    elements.nitric_acid_ice = {
        temp: -45,
        behavior: behaviors.WALL,
        color: ["#f5e7e4", "#f5efed", "#fcfafa"],
        state: "solid",
        category: "states",
        stateHigh: "nitric_acid",
        tempHigh: -41
    };
    
    elements.aqua_regia = {
        alias: "3HCl•HNO₃",
        color:["#ffc766", "#f5c36e", "#f7c163", "#ffcd75"],
        behavior: behaviors.LIQUID,
        ignore: elements.acid.ignore,
        category: "liquids",
        state: "liquid",
        density: 1210,
        reactions: {
            gold: {elem1: "chloroauric_acid", elem2: null, chance: 0.15},
            gold_coin: {elem1: "chloroauric_acid", elem2: null, chance: 0.15},
            blue_gold: {elem1: ["chloroauric_acid", "gallium_chloride"], elem2: null, chance: 0.15},
            purple_gold: {elem1: ["chloroauric_acid", "chloroauric_acid", "chloroauric_acid", "aluminum_chloride"], elem2: null, chance: 0.15},
        },
        tick: acidTick,
    };
    elements.chloroauric_acid = {
        color: ["#f7bb2f", "#f5bb33", "#f5b727", "#e8ae25"],
        alias: "H(AuCl₄)",
        behavior: behaviors.POWDER,
        category: "salts",
        state: "solid", 
        density: 3900,
        reactions: {
            potassium: {elem1: "gold_coin", elem2: "potassium_salt", func: function(pixel){for(let coords of squareCoords){let x=pixel.x+coords[0],y=pixel.y+coords[1]; if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random()<0.25){createPixel("hydrogen", x, y);}}}, color1: ["#574000", "#705200", "#634900", "#755600"]},
            sodium: {elem1: "gold_coin", elem2: "salt", func: function(pixel){for(let coords of squareCoords){let x=pixel.x+coords[0],y=pixel.y+coords[1]; if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random()<0.25){createPixel("hydrogen", x, y);}}}, color1: ["#574000", "#705200", "#634900", "#755600"]},
            caustic_potash: {elem1: "gold_coin", elem2: "potassium_salt", func: function(pixel){for(let coords of squareCoords){let x=pixel.x+coords[0],y=pixel.y+coords[1]; if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random()<0.25){createPixel("water", x, y);}}}},
            lye: {elem1: "gold_coin", elem2: "salt", func: function(pixel){for(let coords of squareCoords){let x=pixel.x+coords[0],y=pixel.y+coords[1]; if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random()<0.25){createPixel("water", x, y);}}}, color1: ["#574000", "#705200", "#634900", "#755600"]},
            magnesium: {elem1: "gold_coin", elem2: "magnesium_chloride", func: function(pixel){for(let coords of squareCoords){let x=pixel.x+coords[0],y=pixel.y+coords[1]; if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random()<0.25){createPixel("hydrogen", x, y);}}}, color1: ["#574000", "#705200", "#634900", "#755600"]},
            metal_scrap: {elem1: "gold_coin", elem2: "slag", func: function(pixel){for(let coords of squareCoords){let x=pixel.x+coords[0],y=pixel.y+coords[1]; if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random()<0.25){createPixel("hydrogen", x, y);}}}, color1: ["#574000", "#705200", "#634900", "#755600"]},
            copper: {elem1: "copper_chloride", elem2: "gold", color2: ["#574000", "#705200", "#634900", "#755600"]}
        }
    };
    elements.magnesium_chloride = {
        alias: "MgCl₂",
        category: "salts",
        behavior: behaviors.POWDER,
        state: "solid",
        color: ["#f2f2f2", "#f5f5f5", "#ebebeb", "#e6e6e6"],
        density: 2320,
        reactions: {
            baking_soda: {elem1: "magnesium_carbonate", elem2: "salt"},
            lye: {elem1: "magnesium_hydroxide", elem2: "salt"},
            caustic_potash: {elem1: "magnesium_hydroxide", elem2: "potassium_salt"},
            ash: {elem1: "magnesium_carbonate", elem2: ["dust","dust",null,"potassium_salt", "charcoal"]}
        },
        tempHigh: 714,
    }
    elements.molten_magnesium_chloride = {
        alias: "MgCl₂",
        density: 2150,
        behavior: behaviors.MOLTEN,
        state: "liquid",
        color: ["#ffeb91", "#ffea8c", "#ffd480", "#ffd685", "#ffc37a"],
        category: "states",
        tempLow: 713,
        stateLow: "magnesium_chloride",
        stateHigh: ["acid_gas", "magnesium"],
        tempHigh: 800,
        temp: 720,
    }
    elements.calcium_chloride = {
        flameColor: ["#fc8721", "#f58625", "#fa8d2d"],
        alias: "CaCl₂",
        category: "salts",
        density: 2150,
        behavior: behaviors.POWDER,
        state: "solid",
        color: ["#f2f2f2", "#f5f5f5", "#ebebeb", "#e6e6e6"],
        reactions: {
            baking_soda: {elem1: "limestone", elem2: "salt"},
            lye: {elem1: "slaked_lime", elem2: "salt"},
            caustic_potash: {elem1: "slaked_lime", elem2: "potassium_salt"},
            ash: {elem1: "limestone", elem2: ["dust","dust",null,"potassium_salt", "charcoal"]},
            epsom_salt: {elem1: "hardened_gypsum", elem2: "magnesium_chloride"},
            carbon_dioxide: {elem1: "limestone", elem2: "chlorine", chance: 0.001, tempMin: 60}
        }, 
        tempHigh: 772,
        stateHigh: "molten_calcium_chloride",
    }
    elements.molten_calcium_chloride = {
        flameColor: ["#fc8721", "#f58625", "#fa8d2d"],
        alias: "CaCl₂",
        density: 2150,
        behavior: behaviors.MOLTEN,
        state: "liquid",
        color: ["#ffeb91", "#ffea8c", "#ffd480", "#ffd685", "#ffc37a"],
        category: "states",
        tempLow: 771,
        stateLow: "calcium_chloride",
        reactions: {
            oxygen: {elem1: "quicklime", elem2: "chlorine", chance: 0.005, tempMin: 800}
        },
        temp: 780,
    }
    elements.sodium.reactions.carbon_dioxide = {elem1: "baking_soda", elem2: null}, elements.magnesium.reactions.carbon_dioxide = {elem1: "magnesium_carbonate", elem2:null};
    elements.acid.reactions.magnesium = {elem1: "hydrogen", elem2: "magnesium_chloride"};
    elements.magnesium_carbonate = {
        alias: "MgCO₃",
        category: "salts",
        behavior: behaviors.POWDER,
        state: "solid",
        color: ["#f2f2f2", "#f5f5f5", "#ebebeb", "#e6e6e6"],
        density: 2960,
        reactions: {
            acid: {elem1: "magnesium_chloride", elem2: ["carbon_dioxide", "foam", "seltzer", "seltzer"]},
            vinegar: {elem1: "magnesium_acetate", elem2: ["carbon_dioxide", "foam", "seltzer", "seltzer"]}
        }
    }
    elements.magnesium_hydroxide = {
        alias: "Mg(OH)₂",
        category: "salts",
        behavior: behaviors.POWDER,
        state: "solid",
        color: ["#f2f2f2", "#f5f5f5", "#ebebeb", "#e6e6e6"],
        density: 2340,
        reactions: {
            acid: {elem1: "magnesium_chloride", elem2: "water"},
            vinegar: {elem1: "magnesium_acetate", elem2: "water"},
        },
        tempHigh: 350,
        stateHigh: ["steam", "magnesium"],
    }
    elements.vinegar.reactions.limestone = undefined;
    elements.limestone.reactions = {vinegar: {elem1: "calcium_acetate", elem2: ["carbon_dioxide", "foam", "seltzer", "seltzer"]}};
    elements.quicklime.reactions.vinegar = {elem1: "calcium_acetate", elem2: "oxygen"};
    elements.oxidized_copper.reactions.vinegar = {elem1: "copper_acetate", elem2: "water"};
    elements.slaked_lime.reactions.vinegar = {elem1: "calcium_acetate", elem2: "water"};
    elements.hardened_gypsum = {
        alias: "CaSO₄•2H₂O",
        color: ["#f2f2f2", "#f5f5f5", "#ebebeb", "#e6e6e6"],
        category: "solids",
        state: "solid",
        behavior: behaviors.WALL,
        density: 2320,
        breakInto: "gypsum",
    }
    elements.gypsum = {
        alias: "CaSO₄•2H₂O",
        color: ["#d1d1d1", "#d6d6d6", "#cccbca", "#cfcdca", "#bfbebb"],
        category: "powders",
        state: "solid",
        behavior: behaviors.STURDYPOWDER,
        density: 2420,
        tick: function(pixel){
            let chance = ((pixel.temp-18)/100*(Math.abs(pixel.temp)/40)*((pixelTicks-pixel.start)/250))*0.1;
            if(Math.random()<chance){
                changePixel(pixel, "hardened_gypsum");
            }
        }
    }
    elements.gallium_chloride = {
        category: "salts",
        alas: "GaCl₃",
        behavior: behaviors.POWDER,
        state: "solid",
        color: ["#ffffff", "#fcfcfc", "#ffffff", "#ededed"],
        density: 2470,
        reactions: {
            water: {elem1: "gallium", elem2: "acid"},
            steam: {elem1: "gallium", elem2: "acid_gas"},
            salt_water: {elem1: "gallium", elem2: ["acid", "salt"]},
            seltzer: {elem1: "gallium", elem2: ["acid", "acid", "acid", "carbon_dioxide"]},
            dirty_water: {elem1: "gallium", elem2: ["acid", "acid", "dirt"]},
            sugar_water: {elem1: "gallium", elem2: ["acid", "sugar"]},
            aluminum: {elem1: "gallium", elem2: "aluminum_chloride"},
            sodium: {elem1: "gallium", elem2: "salt"},
            potassium: {elem1: "gallium", elem2: "potassium_salt"},
            magnesium: {elem1: "gallium", elem2: "magnesium_chloride"},
        },
        tick: function(pixel){
            for(let coords of squareCoords){
                let x = pixel.x+coords[0],y=pixel.y+coords[1];
                if(isEmpty(x,y) && !outOfBounds(x,y) && Math.random()<0.0015){
                    createPixel("acid",x,y);
                    changePixel(pixel, "gallium");
                }
            }
        }
    };
    elements.aluminum_chloride = {
        category: "salts",
        color: ["#fcd732", "#fad42d", "#f5d133", "#fad83e"],
        alias: "AlCl₃",
        behavior: behaviors.POWDER,
        state: "solid",
        density: 2480,
        tempHigh: 630,
        stateHigh: ["chlorine", "aluminum"],
    }
    elements.acid.reactions.aluminum = {elem1: "hydrogen", elem2: "aluminum_chloride"};
    elements.acid.reactions.purple_gold = {elem1: ["aluminum_chloride", "aluminum_chloride", "hydrogen"], elem2: "gold"};
    elements.acid.reactions.blue_gold = {elem1: ["gallium_chloride", "gallium_chloride", "hydrogen"], elem2: "gold"};
    elements.portal_in.keyInput = "channel", elements.portal_out.keyInput = "channel";
    elements.target_portal_in = {
        keyInput: "channel",
        category: "machines",
        state: "solid",
        behavior: behaviors.WALL,
        channel: 0,
        movable: false,
        hardness: 1,
        checkAdjacent: function(pixel){
            let adjacent = [];
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                if(isEmpty(x,y) && !outOfBounds(x,y)){
                    adjacent.push([x,y]);
                }
            }
            return (adjacent.length == 0) ? false : adjacent;
        },
        color: ["#f7ab05", "#fab011", "#faaf0c", "#f5aa0a", "#ffaf03"],
        properties: {clickCd: 0, targetElems: [], channel: null, out: null},
        onClicked: function(pixel, elem){
            if(pixel.clickCd == 0){
                if(elem != null){
                    if(pixel.targetElems.includes(elem)){
                        pixel.targetElems.splice(pixel.targetElems.indexOf(elem), 1);
                    } else {
                        pixel.targetElems.push(elem);
                    }
                }
                pixel.clickCd = 20;
            }
        },
        onSelect: function(){
            promptInput("Enter channel for the portal: ", (input)=>{
                elements.target_portal_in.channel = parseInt(input);
            }, "Portal Channel", elements.target_portal_in.channel)
        },
        tick: function(pixel){
            pixel.clickCd -= (pixel.clickCd == 0) ? 0 : 1;
            if(pixel.channel == null){
                pixel.channel = elements.target_portal_in.channel;
            }
            if(pixel.out == null){
                for(p2 of currentPixels){
                    if(p2.element == "portal_out" && p2.channel == pixel.channel){
                        let adjacent = this.checkAdjacent(p2);
                        if(adjacent != false){
                            pixel.out = p2;
                            break;
                        }
                    }
                }
            }
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                if(!isEmpty(x,y) && !outOfBounds(x,y) && elements[pixelMap[x][y].element].movable && pixel.out != undefined){
                    let pixel2 = getPixel(x,y);
                    let spots = this.checkAdjacent(pixel.out);
                    if(spots != false && Array.isArray(spots)){
                        let num = Math.round(Math.random()*spots.length);
                        while(spots[num] == undefined){
                            num = Math.round(Math.random()*spots.length);
                        }
                        if(pixel.targetElems.includes(pixel2.element)){
                            movePixel(pixel2, spots[num][0], spots[num][1]);
                        }
                    }
                }
            }
        },
        dataInFunc: function(pixel, value){
            if(value.includes(":")){
                let valueArr = value.split(":");
                if(Array.isArray(pixel[valueArr[0]]) && !pixel[valueArr[0]].includes(valueArr[1])){
                    pixel[valueArr[0]].push(valueArr[1]);
                } else {
                    pixel[valueArr[0]] = (Number.isInteger(pixel[valueArr[0]])) ? parseInt(valueArr[1]) : valueArr[1];
                }
            }
        }
    }
    
    elements.aluminum_acetate = {
        density: 1002,
        color: ["#e8e8e8", "#ededed", "#e8e8e8", "#dedede"],
        behavior: behaviors.POWDER,
        state: "solid",
        category: "salts",
        alias: "Al(CH₃COO)₃",
        reactions: {
            acid: {elem1: "aluminum_chloride", elem2: "vinegar"},
        },
        tempHigh: 120,
        stateHigh: ["vinegar", "aluminum"],
    }
    elements.magnesium_acetate = {
        density: 1450,
        color: ["#e8e8e8", "#ededed", "#e8e8e8", "#dedede"],
        behavior: behaviors.POWDER,
        state: "solid",
        category: "salts",
        alias: "Mg(CH₃COO)₂",
        reactions: {
            acid: {elem1: "magnesium_chloride", elem2: "vinegar"},
            baking_soda: {elem1: "magnesium_carbonate", elem2: "sodium_acetate"},
            ash: {elem1: "magnesium_carbonate", elem2: ["dust", "dust", null, "potassium_acetate"]},
        },
        tempHigh: 300,
        stateHigh: ["vinegar", "magnesium_carbonate"],
    }
    elements.calcium_acetate = {
        flameColor: ["#fc8721", "#f58625", "#fa8d2d"],
        density: 1509,
        color: ["#e8e8e8", "#ededed", "#e8e8e8", "#dedede"],
        behavior: behaviors.POWDER,
        state: "solid",
        category: "salts",
        alias: "Ca(CH₃COO)₂",
        reactions: {
            acid: {elem1: "calcium_chloride", elem2: "vinegar"},
            baking_soda: {elem1: "limestone", elem2: "sodium_acetate"},
            ash: {elem1: "limestone", elem2: ["dust", "dust", null, "potassium_acetate"]},
            epsom_salt: {elem1: "hardened_gypsum", elem2: "magnesium_acetate"},
            copper_sulfate: {elem1: "hardened_gypsum", elem2: "copper_acetate"},
        },
        tempHigh: 650,
        stateHigh: ["vinegar", "limestone"]
    }
    elements.potassium_acetate = {
        density: 1570,
        fireColor: ["#e3a6ff", "#d798f5", "#d88efa"],
        color: ["#e8e8e8", "#ededed", "#e8e8e8", "#dedede"],
        behavior: behaviors.POWDER,
        state: "solid",
        category: "salts",
        alias: "CH₃COOK",
        reactions: {
            acid: {elem1: "potassium_salt", elem2: "vinegar"},
            baking_soda: {elem1: "caustic_potash", elem2: "sodium_acetate"},
            
        },
        tempHigh: 292,
    }
    elements.copper_acetate = {
        density: 1880,
        fireColor:["#4dff58", "#4ee658", "#59f054", "#54f05c"],
        color: ["#00594d", "#036357", "#045661", "#044052"],
        behavior: behaviors.POWDER,
        state: "solid",
        category: "salts",
        alias: "Cu(CH₃COO)₂",
        reactions: {
            sodium: {elem1: "copper", elem2: "sodium_acetate"},
            potassium: {elem1: "copper", elem2: "potassium_acetate"},
            magnesium: {elem1: "copper", elem2: "magnesium_acetate"},
            calcium: {elem1: "copper", elem2: "calcium_acetate"},
            aluminum: {elem1: "copper", elem2: "aluminum_acetate"},
            wood: {stain2: "#043023"},
        },
        tempHigh: 240,
        stateHigh: ["vinegar", "oxidized_copper"],
    }
    elements.copper_chloride = {
        density: 3390,
        tempHigh: 620,
        stateHigh: ["copper", "chlorine"],
        color: ["#59f0c2", "#57f2b2", "#53edce", "#61eddf"],
        behavior: behaviors.POWDER,
        state: "solid",
        category: "salts",
        alias: "CuCl₂",
        reactions: {
            sodium: {elem1: "copper", elem2: "sodium_acetate"},
            potassium: {elem1: "copper", elem2: "potassium_acetate"},
            magnesium: {elem1: "copper", elem2: "magnesium_acetate"},
            calcium: {elem1: "copper", elem2: "calcium_acetate"},
            aluminum: {elem1: "copper", elem2: "aluminum_acetate"},
            wood: {stain2: "#043023"},
        },
        properties: {
            anhydrous: false
        },
        fireColor: "#19abff",
        tick: function(pixel){
            if(pixelTicks-pixel.start == 2 && xDown){
                pixel.anhydrous = true;
                let rgb = {r: 74, g: 42, b: 10};
                let num = 6 - (Math.round(Math.random()*12));
                for(let key in rgb){
                    rgb[key] += num;
                }
                pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
            }
            let multi = (pixel.temp-70)/100;
            multi = (multi < 0) ? 0 : ((multi > 1) ? 1 : multi);
            if(Math.random() < 0.05*multi){
                pixel.anhydrous = true;
                let rgb = {r: 74, g: 42, b: 10};
                let num = 6 - (Math.round(Math.random()*12));
                for(let key in rgb){
                    rgb[key] += num;
                }
                pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
            }
            if(pixel.anhydrous){
                let neighbors = [];
                for(let coords of squareCoords){
                    let x = pixel.x+coords[0], y = pixel.y+coords[1];
                    neighbors[neighbors.length] = (isEmpty(x,y) && !outOfBounds(x,y)) ? "air" : (!outOfBounds(x,y)) ? pixelMap[x][y].element : undefined;
                }
                if(neighbors.includes("air") && pixel.temp < 50 && Math.random() < 0.00035){
                    pixel.anhydrous = false;
                    let rgb = (Math.random() > 0.5) ? {r: 116, g: 237, b: 203} :  {r: 116, g: 237, b: 231};
                    let num = 6 - (Math.round(Math.random()*12));
                    for(let key in rgb){
                        rgb[key] += num;
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                    
                } else if (neighbors.includes("steam") || neighbors.includes("water") || neighbors.includes("salt_water") || neighbors.includes("sugar_water") || neighbors.includes("dirty_water") || neighbors.includes("seltzer") || neighbors.includes("pool_water") || neighbors.includes("slush")){
                    pixel.anhydrous = false;
                    let rgb = (Math.random() > 0.5) ? {r: 116, g: 237, b: 203} :  {r: 116, g: 237, b: 231};
                    let num = 6 - (Math.round(Math.random()*12));
                    for(let key in rgb){
                        rgb[key] += num;
                    }
                    pixel.color = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
                }
            }
        }
    }
    elements.magnesium.reactions.water = {elem1: "magnesium_hydroxide", elem2: "hydrogen"};
    elements.sulfuric_acid = {
        alias: "H₂SO₄",
        category: "liquids",
        ignore: elements.acid.ignore,
        tick: acidTick,
        color: ["#f5f5f5", "#fcfcfc", "#fffce8", "#fffce6"],
        behavior: behaviors.LIQUID,
        state: "liquid",
        density: 1830,
        reactions: {
            magnesium_carbonate: {elem1: ["carbon_dioxide", "foam","foam"], elem2: "epsom_salt"},
            limestone: {elem1: ["carbon_dioxide", "foam","foam"], elem2: "hardened_gypsum"},
            quicklime: {elem1: "water", elem2: "hardened_gypsum"},
            slaked_lime: {elem1: "water", elem2: "hardened_gypsum"},
            copper_acetate: {elem1: "vinegar", elem2: "copper_sulfate"},
            copper_oxide: {elem1: "water", elem2: "copper_sulfate"},
            copper_chloride: {elem1: "acid_gas", elem2: "copper_sulfate"},
            magnesium: {elem1: "hydrogen", elem2: "epsom_salt"},
            calcium: {elem1: "hydrogen", elem2: "hardened_gypsum"},
            magnesium_chloride: {elem1: "acid_gas", elem2: "epsom_salt"},
            calcium_chloride: {elem1: "acid_gas", elem2: "hardened_gypsum"},
            calcium_acetate: {elem1: "vinegar", elem2: "hardened_gypsum"},
        },
    }
    elements.platinum = {
        alias: "Pt",
        color: ["#cccccc", "#cfcfcf", "#d9d9d9", "#dedede"],
        category: "solids",
        state: "solid",
        density: 21450,
        behavior: behaviors.WALL,
        reactions: {
            aqua_regia: {elem1: "chloroplatinic_acid",  elem2: "hydrogen"},
        },
        tempHigh: 1768,
        stateHigh: "molten_platinum",
    }
    elements.molten_platinum = {
        color: ["#ffd429", "#f7b228", "#ffb13d", "#ffd83d"],
        behavior: behaviors.MOLTEN,
        category: "states",
        state: "liquid",
        density: 21450,
        tempLow: 1767,
        stateLow: "platinum",
        temp: 1770
    }
    elements.chloroplatinic_acid = {
        color: ["#e6842e", "#f5923b", "#f5853b", "#f57a33"],
        behavior: behaviors.POWDER,
        category: "salts",
        state: "solid",
        density: 2431,
        alias: "H₂PtCl₆",
        tempHigh: 500,
        stateHigh: ["acid_gas", "chlorine", "platinum", "platinum"],
        reactions: {
            sodium: {elem1: "salt", elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]},
            potassium: {elem1: "potassium_salt", elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]},
            magnesium: {elem1: "magnesium_chloride", elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]},
            calcium: {elem1: "calcium_chloride", elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]},
            aluminum: {elem1: "aluminum_chloride", elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]},
            baking_soda: {elem1: ["salt", "foam"], elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]},
            limestone: {elem1: ["calcium_chloride", "foam"], elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]},
            caustic_potash: {elem1: "potassium_salt", elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]},
            lye: {elem1: "salt", elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]},
            ash: {elem1: ["potassium_salt", "foam", "charcoal", null, null], elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]},
            copper: {elem1: "copper_chloride", elem2: "platinum", color2: ["#404040", "#525252", "#454545", "#2e2e2e", "#262626"]}
            
        }
    }
    elements.magnet = {
        keyInput: "range",
        category: "machines",
        range: 0,
        attract: ["#1e43fc", "#1137f2", "#1c42ff", "#143bff"],
        repel: ["#ff1814", "#ff1612", "#ff201c", "#ff0e0a"],
        off: ["#303030", "#454545", "#3b3b3b", "#3d3d3d"],
        color: ["#303030", "#454545", "#3b3b3b", "#3d3d3d"],
        properties: {
            range: null,
            dragPixels: [],
            clickCd: 0,
            targetElems: [],
            mode: 0,
        },
        onSelect: function(){
          promptInput("Enter the range of this machine:", (input)=>{elements.magnet.range = parseInt(input);}, "Magnet Range", elements.magnet.range);
        },
        onClicked: function(pixel, elem){
            if(pixel.targetElems.includes(elem) && elem != "unknown" && pixel.clickCd <= 0){
                pixel.targetElems.splice(pixel.targetElems.indexOf(elem), 1);
                pixel.clickCd = 20;
            } else if (elem != "unknown" && pixel.clickCd <= 0) {
                pixel.targetElems.push(elem);
                pixel.clickCd = 20;
            }
            if(elem == "unknown" && pixel.clickCd <= 0){
                switch(pixel.mode){
                    case 0:
                        pixel.mode = 1; //attract
                        pixel.color = elements.magnet.attract[Math.round(Math.random()*elements.magnet.attract.length)];
                        while(pixel.color == undefined){
                            pixel.color = elements.magnet.attract[Math.round(Math.random()*elements.magnet.attract.length)];
                        }
                        break;
                    case 1:
                        pixel.mode = 2; //repel
                        pixel.color = elements.magnet.repel[Math.round(Math.random()*elements.magnet.repel.length)];
                        while(pixel.color == undefined){
                            pixel.color = elements.magnet.repel[Math.round(Math.random()*elements.magnet.repel.length)];
                        }
                        break;
                    case 2:
                        pixel.mode = 0; //off
                        pixel.color = elements.magnet.off[Math.round(Math.random()*elements.magnet.off.length)];
                        while(pixel.color == undefined){
                            pixel.color = elements.magnet.off[Math.round(Math.random()*elements.magnet.off.length)];
                        }
                        break;
                    default: 
                        pixel.mode = 0;
                        pixel.color = elements.magnet.off[Math.round(Math.random()*elements.magnet.off.length)];
                        while(pixel.color == undefined){
                            pixel.color = elements.magnet.off[Math.round(Math.random()*elements.magnet.off.length)];
                        }
                        break;
                };
                pixel.clickCd = 20;
            }
        },
        tick: function(pixel){
            pixel.clickCd -= (pixel.clickCd == 0) ? 0 : 1;
            if(pixel.range == null){
                pixel.range = elements.magnet.range;
            };
            let range = mouseRange(pixel.x, pixel.y, pixel.range);
            for(let p of pixel.dragPixels){
                if(!p.inRange(range) || pixel.mode == 0 || !currentPixels.includes(p) || !pixel.targetElems.includes(p.element)){
                    p.drag = false;
                    pixel.dragPixels.splice(pixel.dragPixels.indexOf(p), 1);
                } else {
                    switch(pixel.mode){
                        case 1: 
                            let dX = pixel.x-p.x, dY = pixel.y-p.y;
                            tryMove(p, p.x+Math.sign(dX), p.y+Math.sign(dY), null, true);
                            break;
                        case 2: 
                            let dx = p.x-pixel.x, dy = p.y-pixel.y;
                            tryMove(p, p.x+Math.sign(dx), p.y+Math.sign(dy), null, true);
                            break;
                    }
                }
            };
            for(let coords of range){
                let p2 = getPixel(coords[0], coords[1]);
                if(p2 != null && pixel.targetElems.includes(p2.element) && pixel.mode != 0 && !pixel.dragPixels.includes(p2)){
                    p2.drag = true;
                    pixel.dragPixels.push(p2);
                }
            }
        },
        dataInFunc: function(pixel, value){
            if(value.includes(":")){
                let valueArr = value.split(":");
                if(Array.isArray(elements[pixel.element].properties[valueArr[0]]) && !pixel[valueArr[0]].includes(valueArr[1])){
                    pixel[valueArr[0]].push(valueArr[1]);
                } else if(!Array.isArray(elements[pixel.element].properties[valueArr[0]])){
                    pixel[valueArr[0]] = (Number.isInteger(pixel[valueArr[0]])) ? parseInt(valueArr[1]) : valueArr[1];
                }
            }
        }
    }
    elements.liquid_sulfur_trioxide = {
        density: 1920,
        color: ["#fffdc7", "#fffdcc", "#f7f6da", "#f5f3bc"],
        behavior: behaviors.LIQUID,
        state: "liquid",
        category: "states",
        reactions: {
            plant: {elem1: null, elem2: "dead_plant"},
            fruit_leaves: {elem1: null, elem2: "dead_plant"},
            fruit_branch: {elem1: null, elem2: "wood"},
            tree_branch: {elem1: null, elem2: "wood"},
            fruit_vine: {elem1: null, elem2: "dead_plant"},
            low_fruit_vine: {elem1: null, elem2: "dead_plant"},
            water: {elem1: null, elem2:"sulfuric_acid"},
            quicklime: {elem1: null, elem2: "hardened_gypsum"},
        },
        tick: function(pixel){
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null && eLists.ANIMAL.includes(p2.element)){
                    if(p2.element == "rat"){
                        deletePixel(pixel.x,pixel.y);
                        changePixel(p2, "rotten_meat");
                    } else {
                        deletePixel(pixel.x,pixel.y);
                        changePixel(p2, "dead_bug");
                    }
                } else if (p2 != null && eLists.CLEANANIMAL.includes(p2.element)){
                    if(["frog", "tadpole"].includes(p2.element)){
                        deletePixel(pixel.x,pixel.y);
                        changePixel(p2, "rotten_meat");
                    } else {
                        deletePixel(pixel.x,pixel.y);
                        changePixel(p2, "dead_bug");
                    }
                } else if (p2 != null && eLists.SEEDS.includes(p2.element)){
                    deletePixel(pixel.x,pixel.y);
                    changePixel(p2, "dead_plant");
                }
            }
        },
        tempLow: 16,
        stateLow: "sulfur_trioxide",
    }
    elements.sulfur_trioxide = {
        temp: 16,
        density: 1920,
        color: ["#fffdc7", "#fffdcc", "#f7f6da", "#f5f3bc"],
        behavior: behaviors.POWDER,
        state: "solid",
        category: "salts",
        reactions: {
            plant: {elem1: null, elem2: "dead_plant"},
            fruit_leaves: {elem1: null, elem2: "dead_plant"},
            fruit_branch: {elem1: null, elem2: "wood"},
            tree_branch: {elem1: null, elem2: "wood"},
            fruit_vine: {elem1: null, elem2: "dead_plant"},
            low_fruit_vine: {elem1: null, elem2: "dead_plant"},
            water: {elem1: null, elem2:"sulfuric_acid"},
            quicklime: {elem1: null, elem2: "hardened_gypsum"},
            grass: {elem1: null, elem2: "dead_plant"},
            vine: {elem1: null, elem2: "dead_plant"},
            evergreen: {elem1: null, elem2: "dead_plant"},
        },
        tick: function(pixel){
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null && eLists.ANIMAL.includes(p2.element)){
                    if(p2.element == "rat"){
                        deletePixel(pixel.x,pixel.y);
                        changePixel(p2, "rotten_meat");
                    } else {
                        deletePixel(pixel.x,pixel.y);
                        changePixel(p2, "dead_bug");
                    }
                } else if (p2 != null && eLists.CLEANANIMAL.includes(p2.element)){
                    if(["frog", "tadpole"].includes(p2.element)){
                        deletePixel(pixel.x,pixel.y);
                        changePixel(p2, "rotten_meat");
                    } else {
                        deletePixel(pixel.x,pixel.y);
                        changePixel(p2, "dead_bug");
                    }
                } else if (p2 != null && eLists.SEEDS.includes(p2.element)){
                    deletePixel(pixel.x,pixel.y);
                    changePixel(p2, "dead_plant");
                }
            }
        },
        tempHigh: 17,
        stateHigh: "liquid_sulfur_trioxide",
    }
    elements.sulfur.burnInto = "liquid_sulfur_trioxide", elements.molten_sulfur.burnInto = "liquid_sulfur_trioxide", elements.sulfur_gas.burnInto = "liquid_sulfur_trioxide";
    
    /*Inspired by the bismuth element from nousersthings.js*/
    elements.bismuth = {
        color: ["#d4d4d4", "#d6d6d6", "#dedede", "#d9d9d9", "#dbdbd5"],
        tempHigh: 271,
        stateHigh: "molten_bismuth",
        category: "solids",
        state: "solid",
        density: 9807,
    }
        
    elements.molten_bismuth = {
        color: ["#d4d4d4", "#d6d6d6", "#dedede", "#d9d9d9", "#dbdbd5"],
        category: "states",
        state: "liquid",
        behavior: behaviors.MOLTEN,
        tick: function(pixel){
            if(pixel.temp > 250 && pixel.temp < 270){
                chance = 0.000075-(Math.min((pixel.temp-250)/20, 0)*0.00005);
                if(Math.random()<chance){
                    let colors = [
                        {r:255, g:127, b:0},
                        {r: 255, g:200, b:0},
                        {r: 255, g:255, b:0},
                        {r:0, g:255, b:0},
                        {r:0, g:255, b:255},
                        {r:0, g:0, b:255},
                        {r:255, g:0, b:255},
                        {r:255, g:0, b:70},
                        {r:255, g:105, b:0},
                    ];
                    let num = Math.round(Math.random()*7);
                    let newColorArr = [];
                    for(let i = 0; i < colors.length; i++){
                        newColorArr[i] = colors[(i+num)%colors.length];
                    }
                    changePixel(pixel, "bismuth");
                    pixel.colorArr = newColorArr;
                    pixel.crystallized = true;
                    pixel.color = normalize(newColorArr[0]);
                    pixel.position = 1;
                } else {
                    let positions = [], coordsArr = [];
                    for(let coords of squareCoords){
                        let x = pixel.x+coords[0], y = pixel.y+coords[1];
                        let p2 = getPixel(x,y);
                        if(p2 != null && p2.element == "bismuth" && p2.crystallized){
                            positions.push(p2.position);
                            coordsArr.push([x,y]);
                        }
                    }
                    if(Math.random()<0.005 && positions.length > 0){
                        let lowestIndex = positions.indexOf(Math.min(...positions));
                        let newPos = positions[lowestIndex]+1;
                        let coords = coordsArr[lowestIndex], colors = pixelMap[coords[0]][coords[1]].colorArr || [
                        {r:255, g:127, b:0},
                        {r: 255, g:200, b:0},
                        {r: 255, g:255, b:0},
                        {r:0, g:255, b:0},
                        {r:0, g:255, b:255},
                        {r:0, g:0, b:255},
                        {r:255, g:0, b:255},
                        {r:255, g:0, b:70},
                        {r:255, g:105, b:0},
                    ];
                        let current = ((newPos%11)/10)*colors.length;
                        let currentIndex = Math.floor(current);
                        let d = current-currentIndex;
                        let c1 = colors[currentIndex%colors.length], c2 = colors[(currentIndex+1)%colors.length];
                        changePixel(pixel, "bismuth");
                        pixel.crystallized = true;
                        pixel.position = newPos;
                        let num = 207 + (Math.round(Math.random()*12)-6);
                        let rgb = getRGB(interpolateRgb(c1, c2, d));
                        rgb.r = Math.round(rgb.r*(num/255)), rgb.g = Math.round(rgb.g*(num/255)), rgb.b = Math.round(rgb.b*(num/255));
                        pixel.color = normalize(rgb);
                    }
                }
                
            }
        },
        tempLow: 250,
        stateLow: "bismuth",
        temp: 270,
    };
}, true);
