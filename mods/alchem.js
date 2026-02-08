initialElements = ["water","dirt","fire","oxygen"];
function findReachable(elems) {
    let redo = true;
    for(let i = 0; i < elems.length; i++)
    {
        if(redo)
        {
            i = 0;
        }
        redo = false;
        let e1 = elems[i];
        if(e1 === "mushroom_gill") {
            redo = redo || addElement_(elems, "mushroom_cap");
        }

        
        if(e1 === "oil") {
            redo = redo || addElement_(elems, "lamp_oil");
            redo = redo || addElement_(elems, "propane");
            redo = redo || addElement_(elems, "molten_plastic");
        }
        
        if (eLists.SEEDS.includes(e1)) {
            redo = redo || addElement_(elems, "fiber");
        }
        
        
        if(e1 === "thorium" && elems.includes("neutron")) {
            redo = redo || addElement_(elems, "radium");
        }
        
        if(elements[e1].burnInto) {
            redo = redo || addElement_(elems, elements[e1].burnInto);
        }
        if(elements[e1].stateHigh) {
            redo = redo || addElement_(elems, elements[e1].stateHigh);
        }
        
        if(elements[e1].stateLow) {
            redo = redo || addElement_(elems, elements[e1].stateLow);
        }
        if(elements[e1].breakInto) {
            redo = redo || addElement_(elems, elements[e1].breakInto);
        }
        
        if(elements[e1].extraTempLow) {
            for(let i in elements[e1].extraTempLow) {
                redo = redo || addElement_(elems, elements[e1].extraTempLow[i]);
            }
        }
        
        
        if(elements[e1].behavior && elements[e1].behavior instanceof Array) {
            let behavior = elements[e1].behavior;
            for(let i = 0; i < behavior.length; i++)
            {
                for(let j = 0; j < behavior[i].length; j++)
                {
                    let b0 = behavior[i][j].split(" AND ");
                    for (var k = 0; k < b0.length; k++) {
                        var b = b0[k];
                        // remove everything after %
                        b = b.split("%")[0];
                        if (b.indexOf(":") != -1) {
                            var arg = b.split(":")[1];
                        }
                        else { var arg = undefined }
                        var b = b.split(":")[0];
                        if (b == "CR" || b == "CH" || b == "LB" || b == "L1" || b == "L2" || b == "C2") {
                            if (!arg) { arg = "[???]" }
                            else if (arg.indexOf(">") != -1) { arg = arg.split(">")[1]; }
                            redo = redo || addElement_(elems, arg.split(","));
                        }
                    }
                }
            }
        }
        
        for(let j in elements[e1].reactions)
        {
            if(elems.includes(j)) {
                if(elements[e1].reactions[j].elem1) {
                    redo = redo || addElement_(elems, elements[e1].reactions[j].elem1);
                }
                if(elements[e1].reactions[j].elem2) {
                    redo = redo || addElement_(elems, elements[e1].reactions[j].elem2);
                }
            }
        }
    }
    return elems;
}

worldgentypes = {}

function addElement_(list, elem) {
    if(elem instanceof Array)
    {
        let result = false;
        for(let i = 0; i < elem.length; i++)
        {
            result = result || addElement_(list,elem[i]);
        }
        return result;
    }
    if(elem && !list.includes(elem)) {
        list.push(elem);
        return true;
    }
}



let chemMod = document.querySelector("[src=\"mods/chem.js\"]");
// unhide oxygen (air), dirt (earth), fire, and water
function loadAlchem() {
    
    if (!elements.hematite) {
        elements.hematite = {
            color: ["#e0472f", "#bf2a2a", "#913920"],
            behavior: behaviors.POWDER,
            category: "land",
            density: 5250,
            state: "solid",
            tempHigh: 1539,
            hidden: true
        };
        elements.molten_hematite = {
            reactions: {
                "charcoal": { elem1: ["molten_iron", "molten_iron", "molten_iron", "molten_iron", "molten_nickel"], elem2: "carbon_dioxide" },
            },
        };
        elements.molten_slag.ignore.push("hematite");
    }
    
    elements.molten_pyrite = {
        reactions: {
            "oxygen": { elem1: "iron", elem2: "sulfur_dioxide" },
        },
    };
    elements.molten_slag.ignore.push("pyrite");
    
    
    if (!elements.chalcopyrite) {
        elements.chalcopyrite = {
            color: ["#e8d7cb", "#cdc0af", "#726153", "#8f775e", "#bfaea0",],
            behavior: behaviors.WALL,
            category: "land",
            density: 4200,
            state: "solid",
            tempHigh: 950,
            hidden: true
        };
        elements.molten_chalcopyrite = {
            reactions: {
                "charcoal": { elem1: "molten_copper", elem2: ["molten_slag", "molten_slag", "sulfur_dioxide", "sulfur_dioxide", "sulfur_dioxide", "molten_iron"] },
            },
        };
        elements.molten_slag.ignore.push("chalcopyrite");
    }
    
    if (!elements.sphalerite) {
        elements.sphalerite = {
            color: ["#7a7a7a", "#5c5c5c", "#3d3d3d", "#363636", "#e0e0e0",],
            behavior: behaviors.WALL,
            category: "land",
            density: 4090,
            state: "solid",
            tempHigh: 1850,
            hidden: true
        };
        elements.molten_sphalerite = {
            reactions: {
                "charcoal": { elem1: "molten_zinc", elem2: ["sulfur_dioxide", "sulfur_dioxide", "sulfur_dioxide", "sulfur_dioxide", "sulfur_dioxide", "gallium_gas"] },
            },
        };
        elements.molten_slag.ignore.push("sphalerite");
    }
    
    
    if (!elements.cassiterite) {
        elements.cassiterite = {
            color: ["#5e5b5b", "#705a4d", "#826f6f", "#333030", "#e3d8d1"],
            behavior: behaviors.WALL,
            category: "land",
            density: 6950,
            state: "solid",
            tempHigh: 1630,
            hidden: true
        };
        elements.molten_cassiterite = {
            reactions: {
                "charcoal": { elem1: "molten_tin", elem2: "carbon_dioxide" },
            },
        };
        elements.molten_slag.ignore.push("cassiterite");
    }
    
    if (!elements.galena) {
        elements.galena = {
            color: ["#e6e6e6", "#bdbdbd", "#7a7a7a", "#737373"],
            behavior: behaviors.WALL,
            category: "land",
            density: 7600,
            state: "solid",
            tempHigh: 1113,
            hidden: true
        };
        elements.molten_galena = {
            reactions: {
                "charcoal": { elem1: "molten_lead", elem2: "sulfur_dioxide" },
            },
        };
        elements.molten_slag.ignore.push("galena");
    }
    
    let ores = Array(5).fill("molten_hematite")
        .concat(Array(5).fill("molten_pyrite"))
        .concat(Array(5).fill("molten_chalcopyrite"))
        .concat(Array(3).fill("molten_cassiterite"))
        .concat(Array(5).fill("molten_sphalerite"))
        .concat(Array(3).fill("molten_galena"))
        .concat(Array(2).fill("molten_rutile"))
        .concat(Array(5).fill("molten_bauxite"))
        .concat(Array(2).fill("molten_silver"))
        .concat(Array(1).fill("molten_gold"))
        .concat(Array(3).fill("molten_fluorite"))
        .concat(Array(3).fill("molten_uraninite"));
    
    elements.molten_slag.ignore.push("rutile");
    elements.molten_slag.ignore.push("bauxite");
    elements.molten_slag.ignore.push("silver");
    elements.molten_slag.ignore.push("gold");
    
    elements.seltzer.reactions["electric"] =
        { elem1: "water", elem2: "methane" };
    elements.carbon_dioxide.reactions["electric"] =
        { elem1: "methane" };
    elements.magma.reactions["magma"] =
        { elem2: ores, tempMin: 2500, tempMax: 3000, chance: 0.0001 };
    
    if (!settings.alchemyUnlocked) {
        settings.alchemyUnlocked = {
            "oxygen": true,
            "dirt": true,
            "fire": true,
            "water": true,
        };
    }
    if (settings.unlocked.alchemymod) {
        for (var element in settings.unlocked) {
            if (settings.unlocked[element]) {
                settings.alchemyUnlocked[element] = true;
            }
        }
    }

    // loop through the elements object
    if (elements.explosion) {
        elements.explosion.category = "tools";
    }
    if (elements.room_temp) {
        elements.room_temp.category = "tools";
    }
    if (elements.cook) {
        elements.cook.category = "tools";
    }
    if (elements.incinerate) {
        elements.incinerate.category = "tools";
    }

    // set the unhide setting to Unlock as Discovered (2)
    settings.unhide = 2;

    runAfterLoad(function () {
        checkUnlock = function (element) {
            if (elements[element] && elements[element].hidden && !settings.alchemyUnlocked[element]) {
                settings.alchemyUnlocked[element] = true;
                if (settings.unhide === 2) {
                    createElementButton(element);
                    var categoryButton = document.querySelector(".categoryButton[current='true']");
                    var currentCategory = categoryButton.getAttribute("category");
                    if (currentCategory !== elements[element].category) {
                        document.getElementById("categoryButton-" + elements[element].category).classList.add("notify");
                    }
                    // add notify to the elementButton of the element
                    document.getElementById("elementButton-" + element).classList.add("notify");
                }
                saveSettings();
            }
        };
    });
    window.addEventListener("load", function () {
        for (var element in elements) {
            if (elements[element].hidden && document.getElementById("elementButton-" + element)) {
                document.getElementById("elementButton-" + element).remove();
            }
        }
    });

    function lockAll() {
        for (var element in elements) {
            if (elements[element].category === "tools") {
                settings.alchemyUnlocked[element] = true;
            }
            if (settings.alchemyUnlocked[element]) {
                elements[element].hidden = false;
            }
            else if (elements[element].category !== "tools") {
                // give the element the hidden attribute true
                elements[element].hidden = true;
            }
            if (elements[element].category !== "tools") {
                if (!settings.alchemyUnlocked || Object.keys(settings.alchemyUnlocked).length < 25) {
                    elements[element].category = "alchemy mod";
                }
            }
        }
    }
    runAfterAutogen(() => runAfterAutogen(lockAll));


    function printReachable() {
        let reachable = findReachable(initialElements);
        console.log(reachable.join(","));
        let string = "";
        for (let i in elements) {
            if (!reachable.includes(i)) {
                if (string === "") {
                    string = i;
                }
                else {
                    string += "," + i;
                }
            }
        }
        console.log(string);
        string = "";
        for (let i = 0; i < reachable.length; i++) {
            if (!settings.alchemyUnlocked[reachable[i]]) {
                if (string === "") {
                    string = reachable[i];
                }
                else {
                    string += "," + reachable[i];
                }
            }
        }
        console.log(string);
        string = "";
        for (let i in settings.alchemyUnlocked) {
            if (!reachable.includes(i) && settings.alchemyUnlocked[i] && elements[i].category !== "tools") {
                if (string === "") {
                    string = i;
                }
                else {
                    string += "," + i;
                }
            }
        }
        console.log(string);
    }
    // runAfterAutogen(() => runAfterAutogen(printReachable));
}

dependOn("chem.js", () => { return; }, true);

loadAlchem();