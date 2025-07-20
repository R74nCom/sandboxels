/*
Version 2.0.0
*/
function multiChoice(text, handler, title) {
			let pause = false;
			if (promptState) { pause = promptState.wasPaused }
			else if (paused) { pause = true }
			promptState = {
				type: "confirm",
				text: text,
				handler: handler,
				title: title || "Are you sure?",
				wasPaused: pause
			}
			showPromptScreen();
		}
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
        sugar: {"elem1": "oxidized_copper","elem2": null,"color1": ["#CB3D3D","#A6292B","#6E1B1B"]}
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
        }
        let colour;
        let num = Math.round(Math.random()*2);
        if(pixel.anhydrous && !["rgb(235,247,250)","rgb(242,248,250)"].includes(pixel.color)){
            pixel.color = ["rgb(235,247,250)","rgb(242,248,250)"][num];
        } else if (!pixel.anhydrous && !['rgb(67,145,253)', 'rgb(0,76,254)'].includes(pixel.color)){
            pixel.color = ['rgb(67,145,253)', 'rgb(0,76,254)'][num];
        }
        let multi = (pixel.temp-70)/100;
        multi = (multi < 0) ? 0 : ((multi > 1) ? 1 : multi);
        if(Math.random() < 0.05*multi){
            pixel.anhydrous = true;
        }
        if(pixel.anhydrous){
            let neighbors = [];
            for(let coords of squareCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                neighbors[neighbors.length] = (isEmpty(x,y) && !outOfBounds(x,y)) ? "air" : (!outOfBounds(x,y)) ? pixelMap[x][y].element : undefined;
            }
            if(neighbors.includes("air") && pixel.temp < 50 && Math.random() < 0.00035){
                pixel.anhydrous = false;
            } else if (neighbors.includes("steam") || neighbors.includes("water") || neighbors.includes("salt_water") || neighbors.includes("sugar_water") || neighbors.includes("dirty_water") || neighbors.includes("seltzer") || neighbors.includes("pool_water") || neighbors.includes("slush")){
                pixel.anhydrous = false;
            }
        }
    }
}
document.addEventListener("keydown", (e)=>{xDown = (e.key.toLowerCase() == "x") ? true : xDown;});
document.addEventListener("keyup", (e)=>{xDown = (e.key.toLowerCase() == "x") ? false : xDown;});

elements.toggle_cloner = {
    category: "machines",
    active: "#fbff03",
    inactive: "#333300",
    color: "#333300",
    name: "ToggleableCloner",
    keyInput: "chance",
    properties: {
        clone: null,
        toggle: false,
        chance: 0.0166666667,
        clickCd: 0,
    },
    ignore: ["cloner", "toggle_cloner", "floating_cloner", "clone_powder", "slow_cloner", "ecloner", "destroyable_cloner", "destroyable_clone_powder", "ewall", "wall"],
    onClicked: function(pixel,element){
        
        if(pixel.clone == null && pixel.clickCd == 0 && dragStart == null){
            pixel.clone = (element == "unknown" || elements.toggle_cloner.ignore.includes(element)) ? pixel.clone : element;
        } else if (pixel.clickCd == 0) {
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
        
        if(pixel.clickCd == 0 && dragStart == null){
            pixel.clickCd =  20;
            console.log(element);
        };
    },
    onSelect: function(){
        logMessage("Click on the pixel while adjacent to a clonable pixel to set clone, then click on it to toggle on or off.");
    },
    tick: function(pixel){
        if(pixel.clickCd > 0){pixel.clickCd--;}
        if(![null, undefined].includes(pixel.clone) && pixel.toggle == true && Math.random() < pixel.chance){
            for(let coords of adjacentCoords){
                let x = pixel.x+coords[0], y = pixel.y+coords[1];
                if(isEmpty(x,y) && !outOfBounds(x,y)){
                    createPixel(pixel.clone, x, y);
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
    }
};

elements.toggle = {
    category: "machines",
    active: "#b8b8b8",
    inactive: "#2b2b2b",
    color: "#2b2b2b",
    properties: {
        toggle: false,
        clickCd: 0,
    },
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



elements.toggle_temper = {
    active: "#ff7b00",
    inactive: "#261200",
    color: "#261200",
    category: "machines",
    targetTemp: 25,
    keyInput: "targetTemp",
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
}

elements.multitool = {
    category: "tools",
    input: 0,
    onSelect: function(){
        promptInput("Multitool for morechemistry.js, changes key values for different elements added in morechemistry.js, chance for toggleable cloner, and targetTemp for toggleable temper.", (In)=>{
            this.input = parseFloat(In) || 0;
        }, "Multitool Input", this.input);
    },
    tool: function(pixel){
        pixel[elements[pixel.element].keyInput] = this.input;
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
