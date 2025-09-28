/*
*Version 1.0.0
*/
dependOn("orchidslibrary.js", ()=>{
    elements.data_wire = {
        desc: "Transfers data.",
        color: ["#6b1502", "#631402", "#6e1400", "#631200"],
        properties: {cd: 0, value: null},
        tick: function(pixel){
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null){
                    if(p2.value != null && pixel.cd == 0){
                        pixel.value = p2.value;
                        pixel.cd = 15;
                    };
                    pixel.value = (pixel.cd == 3) ? null : pixel.value;
                    if(elements[p2.element].dataInFunc != undefined && pixel.value != null){
                        elements[p2.element].dataInFunc(p2, pixel.value);
                    }
                }
            }
            pixel.cd -= (pixel.cd == 0) ? 0 : 1;
        },
        category: "data",
        behavior: behaviors.WALL,
        state: "solid",
    };
    elements.data_input = {
        desc: "Holds a data value that can be outputted to any nearby data wire.",
        color: ["#e06500", "#f57105", "#f06f05", "#e66c09"],
        value: null,
        onSelect: function(){
            promptInput("Enter data info", (input)=>{elements.data_input.value = input;}, "Data Input", elements.data_input.value);
        },
        category: "data",
        behavior: behaviors.WALL,
        state: "solid",
        properties: {
            value:null,
        },
        tick: function(pixel){
            if(pixel.value == null){
                pixel.value = elements.data_input.value;
            }
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null && elements[p2.element].dataInFunc != undefined && pixel.value != null){
                        elements[p2.element].dataInFunc(p2, pixel.value);
                }
            }
        }
    }
    elements.toggle_data_input = {
        desc: "Holds a data value that can be outputted to any nearby data wire when toggled on.",
        color: ["#6e3302", "#783905", "#823c03", "#7d3a02"],
        value: null,
        onSelect: function(){
            promptInput("Enter data info", (input)=>{elements.data_input.value = input;}, "Data Input", elements.data_input.value);
        },
        category: "data",
        behavior: behaviors.WALL,
        state: "solid",
        properties: {
            value:null,
            val: null,
            toggle: false,
            clickCd: 0,
        },
        tick: function(pixel){
            if(pixel.val == null){
                pixel.val = elements.data_input.value;
            }
            pixel.value = (pixel.toggle) ? pixel.val : null;
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null && elements[p2.element].dataInFunc != undefined && pixel.value != null){
                        elements[p2.element].dataInFunc(p2, pixel.value);
                }
            }
            pixel.clickCd -= (pixel.clickCd == 0) ? 0 : 1;
        },
        onClicked: function(pixel){
            if(pixel.clickCd == 0){
                pixel.clickCd = 20;
                pixel.toggle = !pixel.toggle;
                if(pixel.toggle){
                    pixel.color = noiseify("#edba00", 8);
                } else {
                    pixel.color = noiseify("#6e3302", 8);
                }
            }
        }
    }
    elements.join = {
        desc: "Combines multiple data inputs. Click to reset value.",
        color: ["#046e00", "#067a02", "#097006", "#065904", "#056602"],
        properties: {val: null, clickCd: 0},
        dataInFunc: function(pixel, value){
            if(pixel.val != null && !pixel.val.includes(value)){
                pixel.val += value;
            } 
            if(pixel.val == null){
                pixel.val = value;
            }
        },
        category: "data",
        behavior: behaviors.WALL,
        state: "solid",
        tick: function(pixel){
            let p2 = getPixel(pixel.x+1, pixel.y);
            if(p2 != null && p2.element == "data_wire"){
                p2.value = pixel.val;
            }
            pixel.clickCd -= (pixel.clickCd == 0) ? 0 : 1;
        },
        onClicked: function(pixel){
            if(pixel.clickCd == 0){
                pixel.clickCd = 20;
                pixel.val = null;
            }
        }
    }
    elements.data_sensor = {
        desc: "Scans adjacent pixels for a target property and outputs them, uses \"element\" by default. Click on pixel to change properties.",
        color: ["#3d3c28", "#4d4b32", "#4a482f", "#403e28"],
        properties: {
            value: null,
            property: "element",
            clickCd: 0,
        },
        tick: function(pixel){
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null && !["data_wire"].includes(p2.element)){
                    pixel.value = p2[pixel.property];
                }
            };
            pixel.clickCd -= (pixel.clickCd == 0) ? 0 : 1;
        },
        onClicked: function(pixel){
            let propertyArr = [];
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                let p2 = getPixel(x,y);
                if(p2 != null){
                    for(let property in p2){
                        if(typeof p2[property] != "function" && !propertyArr.includes(property)){
                            propertyArr.push(property);
                        }
                    }
                }
            };
            promptChoose("Choose property this data sensor detects:", propertyArr, (input)=>{pixel.property = input || pixel.property;}, "Property to Detect");
        },
        category: "data",
        behavior: behaviors.WALL,
        state: "solid",
    }
    elements.if = {
        desc: "Takes 3 inputs, conditon (1 (true) or 0 (false), x-1), ifTrue (output if true, y-1 (pixel above)), and ifFalse (output if false, y+1 (pixel below)).",
        color: ["#00574b", "#005247", "#02594e", "#025c50"],
        category: "data",
        behavior: behaviors.WALL,
        state: "solid",
        tick: function(pixel){
            let conditionPixel = getPixel(pixel.x-1, pixel.y), truePixel = getPixel(pixel.x, pixel.y-1), falsePixel = getPixel(pixel.x, pixel.y+1);
            let condition = (conditionPixel != null &&conditionPixel.value != undefined) ? parseInt(conditionPixel.value) : false;
            let trueOut = (truePixel != null && truePixel.value != undefined) ? truePixel.value : 1;
            let falseOut = (falsePixel != null && falsePixel.value != undefined) ? falsePixel.value : 0;
            let outPixel = getPixel(pixel.x+1, pixel.y);
            if(outPixel != null && outPixel.value !== undefined){
                outPixel.value = (condition) ? trueOut : falseOut;
            }
        }
    }
    elements.equals = {
        desc: "Takes 2 inputs, A (y-1 (pixel above)) and B (y+1 (pixel below), returns 1 if they are equal and 0 if they are not.",
        color: ["#12ccb3", "#15ebce", "#0bd6bb", "#14dec3"],
        category: "data",
        behavior: behaviors.WALL,
        state: "solid",
        tick: function(pixel){
            let a = getPixel(pixel.x, pixel.y-1), b = getPixel(pixel.x, pixel.y+1);
            if(a != null && b != null){
                let aVal = (a.value != undefined) ? a.value : 1;
                let bVal = (b.value != undefined) ? b.value : 0;
                let outPixel = getPixel(pixel.x+1, pixel.y);
                if(outPixel != null && outPixel.value !== undefined){
                    outPixel.value = (aVal == bVal) ? 1 : 0;
                }
            }
        }
    }
    elements.prop_setter = {
        category: "data",
        properties: {
            val: null,
        },
        dataInFunc: function(pixel, value){
            pixel.val = value;
        },
        color: ["#deb150", "#ebba52", "#ebba52", "#e3b44d", "#dbab44"],
        state: "solid",
        behavior: behaviors.WALL,
        tick: function(pixel){
            if(pixel.val != null){
                let valArr = pixel.val.split(":");
                let prop = valArr[0], value = valArr[1];
                for(let coords of adjacentCoords){
                    let x = pixel.x+coords[0], y = pixel.y+coords[1];
                    let p2 = getPixel(x,y);
                    if(p2 != null && p2[prop] != undefined && elements[p2.element].category != "data"){
                        if(prop == "element"){
                            changePixel(p2, value);
                        } else if (prop == "x" || prop == "y"){
                            let x = (prop == "x") ? value : p2.x, y = (prop == "y") ? value : p2.y;
                            tryMove(p2, parseInt(x), parseInt(y), null, true);
                        } else {
                            if(typeof p2[prop] == "number"){
                                p2[prop] = parseInt(value);
                            } else if(typeof p2[prop] == "boolean"){
                                p2[prop] = value.includes("true");
                            } else if(typeof p2[prop] == "string"){
                                p2[prop] = value;
                            };
                        }
                    }
                }
            }
        }
    };
    
}, true);
