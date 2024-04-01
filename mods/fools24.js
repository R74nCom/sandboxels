/*
[Version 5.9.1 - April 1, 2024 - Multiversal Update]
    + Multiverse Time Travel
        + Use Timeline controls to navigate multidimensional space
        + Split off from your current timeline
    + Eat tool
    + Mirror Dimension
        + Access by throwing a test subject into a Mirror Portal
    + Moon
    + Moon Rock (Hidden)
    + Freeze tool
    + Freeze Ray
    + Air
    + UFO
    + Life Force
    + Carbon
    + Photon
    + Electron
    + BBQ Sauce
    + Mustard
    + Holy Grenade
    + Ice Ten
    + Love (Amends anuran ailments)
    + Love Bomb
    + Dirt Bomb
    + Cluster Cluster Bomb
    + Cherry
    + Blueberry
    + Olive
    + Blue Cheese
    + Toad
    + Mouse
    + Basketball
    + Baseball
    + Tennis Ball
    + Quirky Paint
    + Pen tool
    + Cursor
    + Powder
    + Footprint
    + Light Ice (Hidden)
    + Big Bang (Hidden)
   [Changes]
    + 68% of Humans are lactose intolerant
    + 1% of Humans are gluten intolerant
    + Humans now drink Water
    - Removed Gender Binary
    + Fireflies have a distinct sound
    + Bless converts Antimatter and Strange Matter to Normal Matter
    + Bless removes money, the root of all evil
    + Bless converts Plastic to eco-friendly Paper
    + Bless converts Water to Wine
    + Pb&J recipe
    + Helium can freeze again
    + Helium increases pitch of Human voice
    - Removed Blood
    ~ Birds have been recolored as tribute
    ~ Udders produce many kinds of Milk
    ~ Cheerful Mode now hides ALL weapons
    ~ Moved Firework to Machines
    ~ Moved Ball to Special
    ~ Renamed Gray Goo to Grey Goo
    ~ Renamed Molten Tin to Moltin
    ~ Unhid Supernova
    + Re-added Cluster Bomb
   [Bug Fixes]
    ~ Fixed: Water is not wet
*/

currentversion = "5.9.1"

if (!elements.bless.reactions) { elements.bless.reactions = {}; }
elements.bless.reactions.gold_coin = { elem2:null }
elements.bless.reactions.plastic = { elem2:"paper" }
elements.bless.reactions.bead = { elem2:"sawdust" }
elements.bless.reactions.water = { elem2:"alcohol", color2:"#722F37" }

if (!elements.lead.reactions) { elements.lead.reactions = {}; }
elements.lead.reactions.grape = { elem1:"nut_butter", elem2:"jelly" }
elements.lead.reactions.jelly = { elem1:"nut_butter" }

elements.head.tempTick = elements.head.tick
elements.head.tick = function(pixel) {
    elements.head.tempTick(pixel);
    if (!pixel.sus) { // susceptibility to disease
        pixel.sus = Math.random();
    }
}
if (!elements.head.reactions) { elements.head.reactions = {}; }
var lactoseReaction = function(pixel) {
    if (pixel.sus < 0.68) { changePixel(pixel,"explosion") }
}
var glutenReaction = function(pixel) {
    if (pixel.sus < 0.01) { changePixel(pixel,"explosion") }
}
elements.head.reactions.milk = { chance:0.1, func:lactoseReaction }
elements.head.reactions.cheese = { chance:0.1, func:lactoseReaction }
elements.head.reactions.butter = { chance:0.1, func:lactoseReaction }
elements.head.reactions.melted_cheese = { chance:0.1, func:lactoseReaction }
elements.head.reactions.melted_butter = { chance:0.1, func:lactoseReaction }
elements.head.reactions.yogurt = { chance:0.1, func:lactoseReaction }
elements.head.reactions.ice_cream = { chance:0.1, func:lactoseReaction }
elements.head.reactions.cream = { chance:0.1, func:lactoseReaction }
elements.head.reactions.frozen_yogurt = { chance:0.1, func:lactoseReaction }
elements.head.reactions.wheat = { chance:0.1, func:glutenReaction }
elements.head.reactions.bread = { chance:0.1, func:glutenReaction }
elements.head.reactions.toast = { chance:0.1, func:glutenReaction }
elements.head.reactions.gingerbread = { chance:0.1, func:glutenReaction }
elements.head.reactions.batter = { chance:0.1, func:glutenReaction }
elements.head.reactions.flour = { chance:0.1, func:glutenReaction }
elements.head.reactions.baked_batter = { chance:0.1, func:glutenReaction }
elements.head.reactions.water = { elem2:null, chance:0.1 }
elements.head.reactions.sugar_water = { elem2:null, chance:0.1 }
elements.head.reactions.seltzer = { elem2:null, chance:0.1 }
elements.body.color = "#069469";

elements.firework.category = "machines";

elements.normal_matter = {
    color: "#9ba89b",
    behavior: [
        "M2|M2|M2",
        "M1|XX|M1",
        "M1|M1|M1",
    ],
    category: "special",
    state: "gas",
    density: 2.1,
    hidden: true
};
elements.bless.reactions.antimatter = { elem2:"normal_matter" }
elements.bless.reactions.strange_matter = { elem2:"normal_matter" }

elements.ice_ten = {
    color: ["#84d0ff","#85daff","#80ffff"],
    behavior: [
        "XX|XX|XX",
        "XX|CH:ice%0.5|XX",
        "M2|M1|M2",
    ],
    reactions: {
        "ice_ten": { func:function(pixel1,pixel2){
            var pixels = currentPixels.slice();
            for (var i = 0; i < pixels.length; i++) {
                var pixel = pixels[i];
                pixel.temp = -10000;
                pixelTempCheck(pixel);
            }
        }, elem1:null, elem2:null },
    },
    temp:-100,
    category: "special",
    state: "solid",
    density: 917,
    excludeRandom: true
};

elements.gray_goo.name = "grey_goo";

elements.big_bang = {
    color: ["#ffebeb","#ffc9c9","#ffabab"],
    behavior: [
        "XX|XX|XX",
        "XX|EX:200>hydrogen,neutron,proton,electric AND CH:void|XX",
        "XX|XX|XX",
    ],
    temp: 1000000000000000,
    category: "energy",
    state: "gas",
    density: 1000,
    hardness: 1,
    hidden: true,
    excludeRandom: true,
    maxSize: 1,
    cooldown: defaultCooldown,
    noMix: true
};

elements.blood.name = "life_force";
elements.blood.color = ["#99ff00","#d9ff00"];
delete elements.blood_ice.color;
elements.blood_ice.name = "life_force_ice";

elements.holy_grenade = {
    color: "#fffd6a",
    behavior: [
        "XX|EX:10>bless|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>bless|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.love = {
    color: ["#fccbff","#ff9edf","#ff5cb6"],
    behavior: [
        "M2|M1|M2",
        "M1|DL%25|M1",
        "M2|M1|M2",
    ],
    temp:20,
    state: "gas",
    density: 0.001,
    canPlace: true,
    category: "energy",
    stain: -0.5
};
elements.love.reactions = elements.bless.reactions;
elements.love.tool = elements.bless.tool;
if (!elements.frog.reactions) { elements.frog.reactions = {}; }
elements.frog.reactions.love = { elem1:"human" }
if (!elements.bomb.reactions) { elements.bomb.reactions = {}; }
elements.bomb.reactions.love = { elem1:"love_bomb" }
if (!elements.grenade.reactions) { elements.grenade.reactions = {}; }
elements.grenade.reactions.love = { elem1:"love_bomb" }

elements.love_bomb = {
    color: "#ff84f1",
    behavior: [
        "XX|EX:10>love|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>love|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.dirt_bomb = {
    color: "#694805",
    behavior: [
        "XX|EX:10>dirt|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>dirt|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.cluster_bomb = {
    color: "#7d776d",
    behavior: [
        "XX|EX:10>smoke,smoke,smoke,smoke,smoke,grenade%1|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>smoke,smoke,smoke,smoke,smoke,grenade%1|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    cooldown: defaultCooldown
}
elements.cluster_cluster_bomb = {
    color: "#c1b7a5",
    behavior: [
        "XX|EX:10>smoke,smoke,smoke,smoke,smoke,cluster_bomb%1|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:10>smoke,smoke,smoke,smoke,smoke,cluster_bomb%1|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.bbq_sauce = {
    color: "#571E1A",
    behavior: behaviors.LIQUID,
    viscosity: 50000,
    tempHigh: 260,
    stateHigh: ["carbon_dioxide","methane","steam","salt","sugar"],
    category:"liquids",
    state: "liquid",
    density: 1235,
    stain: 0.05,
    isFood: true
}
if (!elements.ketchup.reactions) { elements.ketchup.reactions = {}; }
elements.ketchup.reactions.molasses = { elem1:"bbq_sauce", elem2:"bbq_sauce" }

elements.mustard = {
    color: "#e1ad01",
    behavior: behaviors.LIQUID,
    viscosity: 50000,
    tempHigh: 260,
    stateHigh: ["carbon_dioxide","methane","steam","sugar"],
    category:"liquids",
    state: "liquid",
    density: 1235,
    stain: 0.05,
    isFood: true
}

elements.cherry = {
    color: ["#ff295b","#ff212c","#ff1f1f","#ff4e33"],
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#8e0000" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#8e0000" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#8e0000" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#8e0000" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#8e0000" },
        "water": { elem2:"juice", chance:0.005, color2:"#8e0000" },
        "sugar_water": { elem2:"juice", chance:0.025, color2:"#8e0000" },
        "acid": { elem1:"juice", color1:"#8e0000" },
        "acid_gas": { elem1:"juice", color1:"#8e0000" },
    },
    tempHigh: 256,
    stateHigh: ["steam","sugar"],
    category: "food",
    state: "solid",
    density: 1154,
    breakInto: "juice",
    breakIntoColor: "#8e0000",
    ignoreAir: true,
    isFood: true
}
elements.blueberry = {
    color: ["#4929ff","#5821ff","#221cc8","#2406a0"],
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#1b1259" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#1b1259" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#1b1259" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#1b1259" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#1b1259" },
        "water": { elem2:"juice", chance:0.005, color2:"#1b1259" },
        "sugar_water": { elem2:"juice", chance:0.025, color2:"#1b1259" },
        "acid": { elem1:"juice", color1:"#1b1259" },
        "acid_gas": { elem1:"juice", color1:"#1b1259" },
    },
    tempHigh: 256,
    stateHigh: ["steam","sugar"],
    category: "food",
    state: "solid",
    density: 1154,
    breakInto: "juice",
    breakIntoColor: "#1b1259",
    ignoreAir: true,
    isFood: true
}
elements.olive = {
    color: ["#808000","#91912c","#a1a148","#686800"],
    behavior: behaviors.POWDER,
    reactions: {
        "rock": { elem1:"juice", chance:0.1, color1:"#ebeb55" },
        "concrete": { elem1:"juice", chance:0.1, color1:"#ebeb55" },
        "basalt": { elem1:"juice", chance:0.1, color1:"#ebeb55" },
        "limestone": { elem1:"juice", chance:0.1, color1:"#ebeb55" },
        "tuff": { elem1:"juice", chance:0.1, color1:"#ebeb55" },
        "water": { elem2:"juice", chance:0.005, color2:"#ebeb55" },
        "sugar_water": { elem2:"juice", chance:0.025, color2:"#ebeb55" },
        "acid": { elem1:"juice", color1:"#ebeb55" },
        "acid_gas": { elem1:"juice", color1:"#ebeb55" },
    },
    tempHigh: 256,
    stateHigh: ["steam","sugar"],
    category: "food",
    state: "solid",
    density: 1154,
    breakInto: "juice",
    breakIntoColor: "#ebeb55",
    ignoreAir: true,
    isFood: true
}

elements.carbon = elements.charcoal;
elements.photon = elements.light;
elements.electron = elements.electric;

elements.blue_cheese =  {
    color: "#0352fc",
    behavior: behaviors.STURDYPOWDER,
    tempHigh: 54,
    stateHigh: "melted_cheese",
    category: "food",
    state: "solid",
    density: 477.62,
    isFood: true
};
if (elements.cheese.reactions) { elements.blue_cheese.reactions = elements.cheese.reactions; }

elements.moon = {
    color: ["#b9b9b9","#8e8e8e","#b9b9b9"],
    behavior: behaviors.WALL,
    tempHigh: 100,
    stateHigh: "melted_cheese",
    category: "special",
    state: "solid",
    density: 3300,
    insulate: true,
    noMix: true,
    alias: "satellite",
    movable: false,
    hardness: 0.8,
    breakInto: "moon_rock"
};
if (!elements.light.reactions) { elements.light.reactions = {}; }
elements.light.reactions.moon = { color1:"#ffffff" }
elements.light.reactions.moon_rock = { color1:"#ffffff" }

elements.moon_rock = {
    color: ["#b9b9b9","#a3a3a3","#898989"],
    behavior: behaviors.POWDER,
    tempHigh: 100,
    stateHigh: "melted_cheese",
    category: "land",
    state: "solid",
    density: 3300,
    hardness: 0.25,
    breakInto: "dust",
    hidden: true,
    alias: "lunar_rock"
};
if (elements.rock.reactions) { elements.moon_rock.reactions = elements.rock.reactions; }

elements.toad = elements.frog;

elements.mouse = {
    color: ["#aaaaaa","#8a8a8a","#cdcdcd"],
    behavior: [
        "XX|M2%1.5|M2%5",
        "XX|FX%2|M2 AND BO",
        "XX|M1|M2",
    ],
    egg: "mouse",
    category: "life",
    temp: 37.6,
    tempHigh: 120,
    stateHigh: "cooked_meat",
    tempLow: -18,
    stateLow: "frozen_meat",
    breakInto: "blood",
    burn:80,
    burnTime:150,
    state: "solid",
    density: 1450,
    conduct: 0.25
};
elements.bless.reactions.rat = { elem2:"mouse" }

elements.ball.hidden = false;
elements.basketball = {
    color: "#d14b17",
    behavior: [
        "XX|XX|XX",
        "XX|FY:0%5|XX",
        "XX|M1 AND BO|XX",
    ],
    tempHigh: 250,
    stateHigh: "molten_plastic",
    category: "special",
    flipY: false,
    flippableY: true,
};
elements.baseball = {
    color: "#d7d7d7",
    behavior: [
        "XX|XX|XX",
        "XX|FY:0%5|XX",
        "XX|M1 AND BO|XX",
    ],
    tempHigh: 250,
    stateHigh: "molten_plastic",
    category: "special",
    flipY: false,
    flippableY: true,
};
elements.tennis_ball = {
    color: "#c2ff48",
    behavior: [
        "XX|XX|XX",
        "XX|FY:0%5|XX",
        "XX|M1 AND BO|XX",
    ],
    tempHigh: 250,
    stateHigh: "molten_plastic",
    category: "special",
    flipY: false,
    flippableY: true,
};

elements.supernova.hidden = false;

elements.quirky_paint = {
    color: ["#b1b1b1","#9dc270","#c170c2","#107f10","#442f21","#ff6e6e","#34555f"],
    tool: function(pixel) {
        var hexcode = "#"+(Math.floor(Math.random()*16777215).toString(16).padStart(6,"0"));
        pixel.color = pixelColorPick(pixel,hexcode);
        delete pixel.origColor;
    },
    category: "special",
    canPlace: false,
    desc: "Use on pixels to change color randomly."
};

elements.bird.color = "#1DA1F2";

elements.freeze = {
    color: ["#b1e5ff","#6e89ec"],
    tool: function(pixel) {
        pixel.temp -= 1000;
        pixelTempCheck(pixel);
    },
    category: "energy",
    excludeRandom: true
};

elements.freeze_ray = {
    color: ["#00aaff","#0037ff"],
    tick: function(pixel) {
        var x = pixel.x;
        for (var y = pixel.y; y < height; y++) {
            if (outOfBounds(x, y)) {
                break;
            }
            if (isEmpty(x, y)) {
                if (Math.random() > 0.05) { continue }
                createPixel("flash", x, y);
                pixelMap[x][y].color = "#00aaff";
                pixelMap[x][y].temp = -200;
            }
            else {
                if (elements[pixelMap[x][y].element].isGas) { continue }
                if (elements[pixelMap[x][y].element].id === elements.heat_ray.id) { break }
                pixelMap[x][y].temp -= 100;
                pixelTempCheck(pixelMap[x][y]);
                break;
            }
        }
        deletePixel(pixel.x, pixel.y);
    },
    temp: -200,
    category: "energy",
    state: "gas",
    density: 1,
    excludeRandom: true,
    noMix: true
};

elements.ufo = {
    color: "#9ddfa3",
    behavior: [
        "XX|XX|XX",
        "XX|FX%5|M1%50",
        "XX|XX|XX"
    ],
    tick: function(pixel) {
        if (pixel.ray) {
            if (isEmpty(pixel.x,pixel.y+1)) {
                createPixel(pixel.ray,pixel.x,pixel.y+1);
            }
            if (Math.random() < 0.1) {
                pixel.ray = null;
            }
        }
        else if (Math.random() < 0.1) {
            var rays = ["heat_ray","freeze_ray","god_ray"];
            pixel.ray = rays[Math.floor(Math.random()*rays.length)];
        }
    },
    breakInto: ["metal_scrap","slime"],
    category: "special"
};

elements.udder.tick = function(pixel) {
    if (Math.random() <= 0.025 && isEmpty(pixel.x,pixel.y+1)) {
        var milks = ["milk","pilk","chocolate_milk","fruit_milk","eggnog"];
        var milk = milks[Math.floor(Math.random()*milks.length)];
        createPixel(milk,pixel.x,pixel.y+1);
        pixelMap[pixel.x][pixel.y+1].temp = 38;
    }
    doDefaults(pixel);
};

elements.liquid_light.tempLow = -1000;
elements.liquid_light.stateLowName = "light_ice";
elements.light_ice = {
    behavior: behaviors.WALL,
    state: "solid",
}

fireflySound = null;
elements.firefly.onSelect = function() {
    fireflySound = new Audio("https://archive.org/download/09Fireflies/09%20Fireflies.mp3");
}
elements.firefly.onMouseDown = function() {
    if (fireflySound) { fireflySound.play(); }
}

elements.pen = {
    color: "#000000",
    tool: function(pixel) {
        if (pixel.element === "paper") {
            pixel.color = pixelColorPick(pixel,"#000000");
        }
    },
    category: "special",
    desc: "Draws on Paper."
}
elements.eat = {
    color: ["#ffba79","#efff79"],
    tool: function(pixel) {
        if (elements[pixel.element].isFood) {
            deletePixel(pixel.x,pixel.y);
        }
    },
    category: "tools",
    desc: "Consumes edible pixels."
}

elements.molten_tin.name = "moltin";

elements.ball.category = "energy";

elements.liquid_helium.tempLow = -272;

elements.cursor = {
    color: ["#000000","#00ff00"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        if (pixelTicks % 60 < 30) {
            pixel.color = "#000000";
        }
        else {
            pixel.color = "#00ff00";
        }
    },
    category: "special",
    related: "pointer"
}
elements.pointer.related = "cursor";

elements.footprint = {
    color: ["#73777A","#B3B7BA","#F3F7FA"],
    colorPattern: [
        "00000001",
        "01111112",
        "01111112",
        "01111112",
        "01111112",
        "01111112",
        "01111112",
        "12222222",
    ],
    colorKey: {
        "0": "#73777A",
        "1": "#B3B7BA",
        "2": "#F3F7FA",
    },
    behavior: behaviors.WALL,
    category: "special"
}

elements.air = {
    color: "#000000",
    tool: function(){},
    category: "gases"
}

elements.powder = {
    color: "#ffffff",
    colorPattern: ["F"],
    colorKey: { "F": "#ffffff" },
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
}

inMirrorDimension = false;
function getMousePos(canvas, evt) {
    // If evt.touches is defined, use the first touch
    if (evt.touches) {
        evt.preventDefault();
        evt = evt.touches[0];
        isMobile = true;
    }
    var rect = canvas.getBoundingClientRect();
    return {
        // Round to nearest pixel
    x: Math.round((evt.clientX - rect.left)/pixelSize-0.5),
    y: Math.round((evt.clientY - rect.top)/pixelSize-0.5)
    };
}
oldGetMousePos = getMousePos;
elements.mirror_portal = {
    color: ["#e07aff","#693778","#4b2843","#1f0f1b"],
    behavior: [
        "XX|SW:mirror_portal%10|XX",
        "SW:mirror_portal%10|XX|SW:mirror_portal%10",
        "XX|SW:mirror_portal%10|XX"
    ],
    category: "special",
    reactions: {
        "body": {
            func: function() {
                if (!inMirrorDimension) {
                    inMirrorDimension = true;
                    for (var i = 0; i < currentPixels.length; i++) {
                        var pixel = currentPixels[i];
                        if (pixel.element === "mirror_portal") {
                            deletePixel(pixel.x,pixel.y);
                            i--;
                        }
                    }
                    document.head.insertAdjacentHTML("beforeend",`
                        <style id="mirrorDimensionStyle">
                            #game {-moz-transform: scale(-1, -1);
                                -o-transform: scale(-1, -1);
                                -webkit-transform: scale(-1, -1);
                                transform: scale(-1, -1);
                                filter: invert(100%);}
                            .elementButton {filter: invert(100%);}
                            .pagetitle::after { content:" Bandsoxels" }
                        </style>
                    `);
                    // invert the math in getMousePos
                    getMousePos = function(canvas, evt) {
                        if (evt.touches) {
                            evt.preventDefault();
                            evt = evt.touches[0];
                            isMobile = true;
                        }
                        var rect = canvas.getBoundingClientRect();
                        return {
                            x: Math.round((rect.right - evt.clientX)/pixelSize-0.5),
                            y: Math.round((rect.bottom - evt.clientY)/pixelSize-0.5)
                        };
                    }
                }
                else {
                    inMirrorDimension = false;
                    document.getElementById("mirrorDimensionStyle").remove();
                    for (var i = 0; i < currentPixels.length; i++) {
                        var pixel = currentPixels[i];
                        if (pixel.element === "mirror_portal") {
                            deletePixel(pixel.x,pixel.y);
                            i--;
                        }
                    }
                    getMousePos = oldGetMousePos;
                }
            },
        }
    },
}

for (var element in elements) {
    var info = elements[element];
    if (info.category === "weapons") {
        info.nocheer = true
    }
}

multiverseTimelines = [];
multiverseIndex = 0;

function saveTimeline() {
    // save at current index
    multiverseTimelines[multiverseIndex] = generateSave(undefined,{keep:["temp","color"]});
}
function splitTimeline() {
    saveTimeline();
    var newSave = generateSave(undefined,{keep:["temp","color"]});
    // add new timeline one after current
    multiverseTimelines.splice(multiverseIndex+1,0,newSave);
    loadTimeline(multiverseIndex+1);
}
function newTimeline() {
    // add new timeline at end
    saveTimeline();
    clearAll();
    multiverseIndex = multiverseTimelines.length;
    saveTimeline();
    loadTimeline(multiverseIndex);
}
function loadTimeline(i) {
    multiverseIndex = i;
    loadSave(multiverseTimelines[i]);
    document.getElementById("timelineIndex").textContent = i;
}
function nextTimeline() {
    saveTimeline();
    if (multiverseIndex === multiverseTimelines.length-1) {
        newTimeline();
        return
    }
    loadTimeline(multiverseIndex+1);
}
function prevTimeline() {
    saveTimeline();
    if (multiverseIndex === 0) {
        return
    }
    loadTimeline(multiverseIndex-1);
}
function redoTimeline() {
    loadTimeline(multiverseIndex);
}
function deleteTimeline() {
    multiverseTimelines.splice(multiverseIndex,1);
    if (multiverseIndex === multiverseTimelines.length) {
        multiverseIndex--;
    }
    if (multiverseTimelines.length < 1) {
        newTimeline();
    }
    loadTimeline(multiverseIndex);
}

window.addEventListener("load", function() {
    absoluteZero = -Infinity;
    this.document.getElementById("elementControls").insertAdjacentHTML("afterend",`
<div style="display:block; padding:5px; font-size:13px">
<button onclick="location.search = '?fools=false'">Return to Normalcy</button>
</div>
    `);
    this.document.getElementById("elementControls").insertAdjacentHTML("afterend",`
<div style="display:block; padding:5px; font-size:13px">
Timeline-<span id="timelineIndex">0</span>:<button onclick="splitTimeline()">Split</button><button onclick="newTimeline()">New</button><button onclick="prevTimeline()">&lt;</button><button onclick="nextTimeline()">&gt;</button><button onclick="redoTimeline()">Redo</button><button onclick="deleteTimeline()">Delete</button>
</div>
    `);
    this.document.getElementById("thanksTo").insertAdjacentHTML("beforeend",`, and the friends we made along the way`);
})
window.addEventListener("keydown", function(e) {
    if (e.ctrlKey || e.metaKey) {
        return
    }
})