dependOn("betterSettings.js", () => {
    const tabweapons = new SettingsTab("weapons.js");
    enablestartupprompt = new Setting("Startup prompt", "startup_prompt", settingType.BOOLEAN, false, defaultValue=true, "The prompt requesting you to add velocity.js, (unavailable for steam edition)");
    
    tabweapons.registerSetting(enablestartupprompt);
    settingsManager.registerTab(tabweapons);

    runAfterLoad(async () => {
    window.setTimeout(async () => {
        if (!enabledMods.includes("mods/velocity.js") && standaloneType !== "steam" && enablestartupprompt.value === true){
            _jaydalert("velocity.js is recommended for weapons.js to function in its intended way.");
        }
    },)
})
},true)
async function _weaponsjsprompt(message, defaultValue = "") {
    return new Promise(resolve => {
        promptInput(message, (result) => {
            resolve(result);
        }, "weapons.js is asking you...", defaultValue);
        
    })
}
async function _jaydalert(message) {
    promptText(message, undefined, "Jayd:");
}
async function _weaponsjsdir(message) {
    promptDir(message, undefined, "weapons.js is asking you...");
}

elements.tsar_bomba = {
    color: "#969696",
    tick: (pixel) => {
        tryMove(pixel, pixel.x, pixel.y+1)
        for (var y = 1; y < 4; y++) {
            if (!isEmpty(pixel.x, pixel.y + y, false)) {
                explodeAt(pixel.x,pixel.y,150,"plasma")
            }
        }
    },
    category: "weapons.js",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.missile_left = {
    color: "#313131",
    category: "weapons.js",
    state: "solid",
    behavior: [
        "EX:20>missile_shrapnel|XX|XX|XX|XX|XX|CR:smoke"
    ],
    ignore: "missile_left",
    tick: function(pixel) {
        var circlec = circleCoords(pixel.x, pixel.y, 3)
        for (var i = 0; i < circlec.length; i++){
            var coord = circlec[i]
            var x = coord.x
            var y = coord.y
            if (!(isEmpty(x, y, true) || (x == pixel.x && y == pixel.y) || elements[pixelMap[x][y].element].state == "gas" || pixelMap[x][y].element == "missile_left")){
                explodeAt(pixel.x,pixel.y,20,"missile_shrapnel")
            }
        }
        for (var i=0; i<3; i++) {
            tryMove(pixel, pixel.x-1, pixel.y)
        }
    },
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
},
elements.missile_right = {
    color: "#313131",
    category: "weapons.js",
    state: "solid",
    behavior: [
        "CR:smoke|XX|XX|XX|XX|XX|EX:20>missile_shrapnel"
    ],
    ignore: "missile_right",
    tick: function(pixel) {
        var circlec = circleCoords(pixel.x, pixel.y, 3)
        for (var i = 0; i < circlec.length; i++){
            var coord = circlec[i]
            var x = coord.x
            var y = coord.y
            if (!(isEmpty(x, y, true) || (x == pixel.x && y == pixel.y) || elements[pixelMap[x][y].element].state == "gas")){
                explodeAt(pixel.x,pixel.y,20,"missile_shrapnel")
            }
        }
        for (var i=0; i<3; i++) {
            tryMove(pixel, pixel.x+1, pixel.y)
        }
    },
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}
var target = [,];
var tgt = "head";
elements.tracking_missile = {
    color: "#323232",
    category: "weapons.js",
    behavior: [
        "XX","XX","CR:smoke"
    ],
    onSelect: async () => {
        var answer1 = await _weaponsjsprompt("Please input the target.",(tgt||undefined));
        if (!answer1) {return}
        tgt = answer1;
    },
    tick: (pixel) => {
        var circlec = circleCoords(pixel.x, pixel.y, 3)
        for (var i = 0; i < circlec.length; i++){
            var coord = circlec[i]
            var xe = coord.x
            var ye = coord.y
            if (!(isEmpty(xe, ye, true) || (xe == pixel.x && ye == pixel.y) || elements[pixelMap[xe][ye].element].state == "gas" || pixelMap[xe][ye].element == "tracking_missile")){
                explodeAt(pixel.x,pixel.y,20,"missile_shrapnel")
            }
        }
        for (var x = 1; x < width; x++) {
            for (var y = 1; y < height; y++) {
                if (!isEmpty(x,y)) {
                    if (pixelMap[x][y].element===tgt) {
                        target = [pixelMap[x][y].x, pixelMap[x][y].y];
                    }
                }
            }
        }
        if (pixel.x != target[0] || pixel.y != target[1]) {
            let {x, y} = pixel;
            const empty = checkForEmptyPixels(x, y);
            const [tX, tY] = target;
            let bestVal = Math.sqrt(Math.pow(tX - x, 2) + Math.pow(tY - y, 2));
            let best = null;
            for (const pixelPair of empty) {
                const [x_, y_] = [x + pixelPair[0], y + pixelPair[1]];
                const c = Math.sqrt(Math.pow(tX - x_, 2) + Math.pow(tY - y_, 2));
                if (c < bestVal) {
                    bestVal = c;
                    best = pixelPair;
                }
            }
            if (best) {
                tryMove(pixel, x + best[0]*2, y + best[1]*2, undefined, true);
            }
        }
    }
},
elements.missile_shrapnel = {
    color: "#979ea3",
       behavior: [
        "XX|XX|XX",
        "XX|EX:5 %20|XX",
        "M2%20|M1%20|M2%20",
    ],
    burn: 90,
    burnTime: 100,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "weapons.js"
},
elements.cluster_nuke = {
    color: "#323232",
    category: "weapons.js",
    behavior: behaviors.POWDER,
    maxSize: 1,
    cooldown: defaultCooldown,
    tick: (pixel) => {
        for (var y = 1; y < 25; y++) {
            if (!isEmpty(pixel.x, pixel.y + y, false)) {
                explodeAt(pixel.x,pixel.y,25,["dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","dirty_bomb","nuke",])
            }
        }
    }
}
// let ammo1 = 1;
// let rdir = 1;
// let ammoLoaded = "";
// elements.railgun = {
//     category: "weapons.js",
//     behavior: behaviors.WALL,
//     onSelect: async (pixel) => {
//         var answer1 = await _weaponsjsprompt("Please input the ammo type. \n \n <1 for Armor-Piercing ammo> \n <2 for High-Explosive ammo.>",(ammo1||undefined));
//         if (!answer1) {return}
//         ammo1 = answer1;
//         var answer2 = await _weaponsjsdir("Please input the direction.",(rdir||undefined));
//         if (!answer2) {
//             console.log(answer2)
//             return}
//         rdir = answer2;
//     },
//     tick: async (pixel) => {
//         ammoLoaded = "armor_piercing_shell";
//         if(ammo1 === 1){
//             ammoLoaded = "armor_piercing_shell"
//         } 
//         else if (ammo1 === 2){
//             ammoLoaded = "high_explosive_shell"
//         }
        
//         if (pixel.charge){
//             if(rdir === 1){
//                 createPixel(ammoLoaded, pixel.x, pixel.y-1);
//             } 
//             if (rdir === 2){
//                 createPixel(ammoLoaded, pixel.x, pixel.y+1);
//             }
//             if (rdir === 3){
//                 createPixel(ammoLoaded, pixel.x-1, pixel.y);
//             }
//             if (rdir === 4){
//                 createPixel(ammoLoaded, pixel.x+1, pixel.y);
//         }   
//         }
//         doDefaults(pixel);
//     },
//     color: "#c9c9c9",
//     conduct: 1,
//     hardness: 8,
// },
// elements.armor_piercing_shell = {
//     category: "ammunition",
//     color: "#ffc954",
//     hardness: 0.9,
// }
// elements.high_explosive_shell = {
//     category: "ammunition",
//     color: "#ffc954",
//     hardness: 0.6,
// }
