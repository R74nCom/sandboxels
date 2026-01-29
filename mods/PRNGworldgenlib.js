/*Version 1.2.1 Pseudorandom world generator*/
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

let promptMenus = {};
let keys = ["OK", "Cancel", "Confirm", "Input", "Choices", "Dirs", "Dropdown"];
Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});
runAfterLoad(()=>{
	let dropDown = document.createElement("select");
	dropDown.id = "promptDropdown";
	dropDown.style.position = "absolute";
	dropDown.style.top = "15%";
	dropDown.style.left = "42.5%";
	dropDown.style.width = "15%";
	dropDown.title = "prompt";
	dropDown.style.display = "none";
	document.getElementById("promptMenu").appendChild(dropDown);
	
	for(let key of keys){
		promptMenus[key] = document.getElementById(`prompt${key}`);
		promptMenus[key].style.display = "none";
	}
	
	//function prompt
	
	
});

function showPromptScreen() {
	if (!promptState) return;
	closeMenu("prompt");
	paused = true;
	checkPause();
	var promptParent = document.getElementById("promptParent");
	var menuTitle = document.querySelector("#promptMenu .menuTitle");
	menuTitle.innerText = promptState.title || "Notice";
	menuTitle.style.color = promptState.titleColor || "unset";
	var promptMenuText = document.getElementById("promptMenuText");
	promptMenuText.innerText = promptState.text || "";
	if (promptState.html) {
		promptMenuText.insertAdjacentHTML("beforeend",promptState.html);
	}
	let promptOK = document.getElementById("promptOK");
	let promptCancel = document.getElementById("promptCancel");
	let promptConfirm = document.getElementById("promptConfirm");
	let promptInput = document.getElementById("promptInput");
	let promptChoices = document.getElementById("promptChoices");
	let promptDirs = document.getElementById("promptDirs");
	let dropDown = document.getElementById("promptDropdown");
	for(let key in promptMenus){
		promptMenus[key].style.display = "none";
	}
	promptConfirm.classList.remove("danger");
	if (promptState.type === "text") {
		promptOK.style.display = "block";
	}
	else if (promptState.type === "confirm") {
		promptCancel.style.display = "block";
		promptConfirm.style.display = "block";
		if (promptState.danger) promptConfirm.classList.add("danger");
	}
	else if (promptState.type === "input") {
		promptInput.value = "";
		promptInput.style.display = "block";
		if (promptState.defaultInput !== undefined) {
			promptInput.value = ""+promptState.defaultInput;
		}
	}
	else if (promptState.type === "choose" && promptState.choices) {
		promptChoices.innerHTML = "";
		for (let i = 0; i < promptState.choices.length; i++) {
			const choice = promptState.choices[i];
			let span = document.createElement("span");
			span.className = "promptChoice";
			span.onclick = function(){ handlePrompt(choice) };
			span.innerText = choice;
			promptChoices.appendChild(span);
		}
		promptChoices.style.display = "block";
	}
	else if (promptState.type == "dropdown" && promptState.choices != undefined) {
		dropDown.innerHTML = "";
		//promptParent.appendChild(promptDropdown);
		
		for(let choice of promptState.choices){
			dropDown.innerHTML += `<option value="${choice}">${choice.capitalize()}</option>`;
		}
		let span = document.createElement("span");
		span.className = "promptOK";
		span.textContent = "Select";
		span.onclick = ()=>{
			let c = dropDown.value;
			console.log(c);
			handlePrompt(c);
			document.getElementById("promptMenu").removeChild(span);
		};
		document.getElementById("promptMenu").appendChild(span);
		dropDown.style.display = "block";
		
	}
	else if (promptState.type === "dir") {
		promptDirs.style.display = "block";
	}
	promptParent.style.display = "block";
	showingMenu = "prompt";
	if (promptState.type === "input") {
		document.getElementById("promptInput").focus();
		document.getElementById("promptInput").select();
	}
}

function promptDropdown(title, choices, handler){
	let pause = false;
	if (promptState) { pause = promptState.wasPaused }
	else if (paused) { pause = true }
	promptState = {
		type: "dropdown",
		text: "",
		choices: choices,
		handler: handler,
		title: title || "Choose",
		wasPaused: pause
	}
	showPromptScreen();
}

function makeCurve(pos, w, dir, div = 200){
    let prevX = pos[0], prevY = pos[1];
    let res = [];
    for(i = w; i >= 0; i--){
        let x2 = (dir == 1) ? pos[0]-i : pos[0]+i;
        let y2 = height-((1/div)*(i**2));
        res = res.concat(lineCoords(prevX, prevY, Math.round(x2), Math.round(y2), 1));
        prevX = Math.round(x2), prevY = Math.round(y2);
    }
    return res;
}

function makePool(pos, w=1, h=1){
	let res = [];
	for(let i = (w*12*Math.PI); i >= 0; i--){
		let y = ((h*35)/3)*Math.sin(i/(12*w));
		res.push([i, y]);
	}
	return res;
}

function drawTriangle(pos, height, elem, replace = null, properties = {}){
	for(let i = 0; i < 2*height; i++){
	    drawLine(elem, pos[0]+i, pos[1], pos[0]+height, pos[1]-(height), replace, properties);
	}
}

elements.sandstone = {
	category: "solids",
	color: ["#a89f67", "#b89c6b", "#bbad68"],
	behavior: behaviors.SOLID,
	breakInto: "sand",
	tempHigh: 1700,
	stateHigh: "molten_glass",
};

elements.packed_sand.tempHigh = 300;
elements.packed_sand.stateHigh = "sandstone";

function drawLine(elem,x1,y1,x2,y2, replace = null, properties = {}){
	let coords = lineCoords(Math.round(x1),Math.round(y1),Math.round(x2),Math.round(y2), 1);
	for(let pos of coords){
		let res = tryCreate(elem, pos[0], pos[1]);
		if(res != null){
			for(let key in properties){
				console.log(properties[key], key)
				res[key] = properties[key];
			}
		}
		if(replace != null && res == null){
			let pixel = getPixel(pos[0], pos[1]);
			if(pixel != null && replace.includes(pixel.element)){
				changePixel(pixel, elem);
				for(let key in properties){
					console.log(properties[key], key)
					pixel[key] = properties[key];
				}
			} 
		}
	}
}
let structureFuncs = {
	ocean: (seed)=>{
		let side = (pseudorandom(15, (seed/2**32)*62, 1) > 0.5) ? 0 : width;
		let positions = makeCurve([side, 45], 90, (side == 0) ? -1 : 1, 200-(pseudorandom(82, (seed/2**32)*972, 70) - 35));
		let obj = {};
		for(let pos of positions){
			if(obj[pos[0]] != undefined){
				obj[pos[0]] = (obj[pos[0]] > pos[1]) ? obj[pos[0]] : pos[1];
			} else {
				obj[pos[0]] = pos[1];
			}
		}
		for(let key in obj){
			for(let i = obj[key]; i > 0; i--){
				let p = getPixel(key, i);
				if(p != null){
					changePixel(p, "water");
				}
				//tryDelete(key, i);
			}
		}
		
		
	},
	pyramid: (seed)=>{

		if(pseudorandom(232, 4564*(seed/2**32), 1) < 0.25){
			let x = pseudorandom(531, 9834*(seed/2**32), width);
			let h = pseudorandom(659, 2342*(seed/2**32), 10) + 20;
			let y = (height-35);
			drawTriangle([x,y], h, "sandstone", ["sand","cactus"]);
		}
	},
	
	volcano: (seed)=>{
		let x = pseudorandom(531, 9834*(seed/2**32), width);
		let h = pseudorandom(659, 2342*(seed/2**32), 10) + 25;
		let hwidth = h*Math.tan(0.78539816);
		let num = 0;
		let y = (height-35);
		drawTriangle([x,y], h, "basalt", null, {temp: 850});
		let w = Math.round(pseudorandom(2423,34543*(seed/2**32), 2))+1;
		let d = Math.round(pseudorandom(1231, 54345*(seed/2**32), 12)-6);
		let coords = lineCoords(Math.round(x+(h)+d), height-11, Math.round(x+(h)), Math.round(y-h), w);
		for(let pos of coords){
			let p = getPixel(pos[0],pos[1]);
			if(p != null && p.element == "basalt"){
				changePixel(p, "magma", 850);
			}
		}
	},
	lava_pool: (seed)=>{
		let x = pseudorandom(455, 67854*(seed/2**32), width);
		let y;
		let vx = pseudorandom(531, 9834*(seed/2**32), width);
		let vh = pseudorandom(659, 2342*(seed/2**32), 10) + 20;
		if(x > vx-vh && x < vx+vh){
			return;
		}
		for(let i = height; i > 0; i--){
			if(getPixel(Math.round(x), i-1) == null && !outOfBounds(Math.round(x), i-1)){
				y = i;
				break;
			}
		}
		let positions = makePool([x,y], 1+pseudorandom(678, 3453*seed, 1), 1+pseudorandom(232, 8754*seed, 0.75));
		for(let pos of positions){
			for(let i = y+pos[1]; i > y-10; i--){
				let p = getPixel(Math.round(pos[0]), Math.round(i));
				if(p != null){
					changePixel(p, "magma");
					p.temp = 850;
				}
			}
		}
	}
};
class biome {
    constructor(layersArr, yLevels, properties, afterFunc = false, genStructures = false, sp = false){
        this.layers = layersArr;
        this.yLevels = yLevels;
        this.vMulti = 1;
		this.structures = (genStructures != false) ? [].concat(genStructures) : undefined;
		this.afterFunc = (afterFunc != false) ? afterFunc : undefined;
		this.sPriority = sp;
        for(let item in properties){
            this[item] = properties[item];
        }
        this.generate = function(seed){
            autoResizeCanvas();
            // paused = true;
			if(seed <= 50000000){
				seed = (seed*50000000) % (2**32);
			}
            let fraction = seed/(2**32);
			if(this.sPriority){
				if(this.structures != undefined){
					for(let gen of this.structures){
						gen(seed);
					}
				}
			}
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
			if(this.structures != undefined){
				for(let gen of this.structures){
					gen(seed);
				}
			}
			if(!this.noOres){
            	this.generateOreVeins(seed, this.vMulti);
			}
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
    desert: new biome([["rock", "rock", "rock", "gravel"], ["rock", "packed_sand","rock", "packed_sand", "sand", "sandstone", "sandstone"], ["sand"], [null, null, null, null, null, null, null, null, null, "cactus"]], [17, 26, 40, 42], {vMulti: 1.2}, false, structureFuncs.pyramid, true),
    savanna: new biome([["rock", "rock", "rock", "gravel"], ["dirt", "dirt", "clay_soil", "dirt", "dirt"], ["grass",null,null, null, null, null, "sapling",null,null,null,null]], [25, 38, 40], {lc: ["#6fde26", "#8eed34", "#8cdb42", "#7bd12a", "#96e81c", "#a9e64e", "#a0d94c", "#a9d63e"], wc: ["#bdab7e", "#b09c6a", "#ab996d", "#998a63", "#917959", "#877051"], vMulti: 1.5}),
    tundra: new biome([["rock", "rock", "rock", "gravel"], ["dirt", "dirt", "rock", "permafrost"], ["permafrost", "permafrost", "permafrost", "permafrost", "permafrost", "permafrost", "ice", "snow"], [null,null,null,null,null,"pinecone",null,null,null,null,null,null]], [25, 30, 38, 40], {temp: -15, vMulti: 2}),
	beach: new biome([["rock", "rock", "rock", "gravel"], ["rock", "gravel", "sand", "sand"], ["sand"]], [7, 13, 35], {vMulti: 0.8}, (seed)=>{
		dependOn("plants.js", ()=>{
			for(let i = 0; i < width; i++){
				console.log(pseudorandom((i*34), (seed/2**32)*234, 1));
				if(pseudorandom((i*34), (seed/2**32)*234, 1) < 0.035){
					let c = true;
					let np = getPixel(i, 20);
					let ny = 21;
					while(np == null){
						np = getPixel(i, ny);
						if(np != null && np.element == "water"){
							c = false;
						};
						ny++;
					}
					if(c){
						tryCreate("banana_seed", i, 20);
					}
				}
			}
		}, false);
	}, structureFuncs.ocean),
	volcano: new biome([["magma", "magma", "basalt"], ["basalt", "tuff", "magma"], ["basalt"]], [13, 23, 40], {temp: 850, noOres: true}, null, [structureFuncs.volcano, structureFuncs.lava_pool]),
	
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
elements.SeedGenerate = {
    category: "edit", 
    onSelect: function(){
        let arr = [];
        let txt = shiftDown;
        Object.keys(biomes).forEach(function(b){arr.push(b);});
        promptInput("Leave blank to generate new seed or C to keep current seed. Your current seed is: " + seed, function(i){
            seed = (i != null && i.toLowerCase() == "c") ? seed : parseFloat(i) || Math.random()*(2**32);
            seed = seed % (2**32);
            if(!txt){
                promptDropdown( "Select a biome to generate: ", arr, (choice)=>{
                    biomes[choice].generate(seed);
                    promptText("World generation complete.");
                    selectElement('dirt');
                });
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
elements.RandomGen = {
	category: "edit",
	onSelect: function(){
		let arr = [];
		let txt = shiftDown;
		Object.keys(biomes).forEach(function(b){arr.push(b);});
		seed = Math.random()*(2**32);
		//seed %= 2**32;
		if(txt){
			let str = "";
			for(let key in biomes){
				str += `${key}, `;
			}
			str = str.replace(/^,|,$/g, '');
			promptInput("Enter the name of a biome to generate (caps-insensetive)\nBiomes available: \n" + str, function(inp){
				let choice = inp.toLowerCase();
				if(!arr.includes(choice)){
					promptText("Invalid selection.");
					selectElement("dirt");
				} else {
					biomes[choice].generate(seed);
					selectElement("dirt");
					
				}
			}, "Enter Biome Name: ");
			
		} else {
			promptDropdown( "Select a biome to generate: ", arr, (choice)=>{
                biomes[choice].generate(seed);
                promptText("World generation complete.");
                selectElement('dirt');
            });
		}
	},
}

elements.view_seed = {
    category: "edit",
    onSelect: function(){
		promptText(seed, undefined, "Seed");
        selectElement(prevElement);
    }
}
