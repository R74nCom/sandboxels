elements.light.insulate = false;
elements.light.tempLow = -200;
elements.liquid_light.tempHigh = -200;
elements.light.tempHigh = 2500;
elements.light.stateHigh = "photonic_steam";
elements.laser.stateHigh = "photonic_steam";
elements.laser.tempHigh = 2500;
elements.dirty_water.density=1600

if (!elements.zinc.reactions) elements.zinc.reactions = {};
elements.zinc.reactions["sulfur"] = { elem1:"zinc_sulfide", elem2:null };


elements.photonic_steam = {
    color: ["#fffccc", "#fff9aa"],
    behavior: [
        "M2|M1|M2",
        "M2|XX|M2",
        "XX|XX|XX"
    ],
    category: "energy",
    state: "gas",
    density: 0.08,
    temp: 2500,
    emit: 4,
    emitColor: "#fff8aa",
    tick: function(pixel) {

        if (Math.random() < 0.08) {
            let x = pixel.x + (Math.floor(Math.random() * 3) - 1);
            let y = pixel.y + (Math.floor(Math.random() * 3) - 1);
            if (!outOfBounds(x, y) && isEmpty(x, y, true)) {
                createPixel("cherenkov_radiation", x, y);
            }
        }

        if (Math.random() < 0.01) {
            deletePixel(pixel.x, pixel.y);
            return;
        }

        doHeat(pixel);
        doBurning(pixel);
        doDefaults(pixel);
    }
};


elements.cherenkov_radiation = {
    color: ["#66ccff", "#99ddff", "#44aaff"],
    behavior: behaviors.SUPERDFLUID,
    category: "energy",
    state: "gas",
    density: 0.05,
    temp: 500,
    emit: 3,
    emitColor: "#66ccff",
    tick: function(pixel) {
        for (let [dx, dy] of [[1,0], [-1,0], [0,1], [0,-1]]) {
            let x = pixel.x + dx, y = pixel.y + dy;
            if (outOfBounds(x, y)) continue;
            let other = pixelMap[x]?.[y];
            if (!other) continue;

            let def = elements[other.element];
            if (def?.category === "life") {
                if (Math.random() < 0.35) changePixel(other, "ash");
                else other.color = "#88ccff";
            }
        }
        if (Math.random() < 0.25) {
            changePixel(pixel, "light");
            pixel.color = "#66ccff"
            return;
        }

        doDefaults(pixel);
    }
};


elements.charged_phosphor = {
    color: ["#d0ff7f", "#e6ff99", "#f0ffa6"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3980,
    tick: function(pixel) {
            pixel.charged = true;

            let dirs = [[0,-1],[1,0],[-1,0],[0,1],[1,1],[1,-1],[-1,1],[-1,-1]];
            let dir = dirs[Math.floor(Math.random() * dirs.length)];
            let nx = pixel.x + dir[0];
            let ny = pixel.y + dir[1];

            if (!outOfBounds(nx, ny) && isEmpty(nx, ny)) {
                createPixel("light", nx, ny);
                pixel.charged=false;
            }

        if (pixel.charged==false) {
            changePixel(pixel, "phosphor");
        }

        doDefaults(pixel);
    }
};


elements.phosphor = {
    color: ["#66ff88", "#88ffaa", "#aaffcc"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3980,
    reactions: {
        "light": { elem1:"charged_phosphor", elem2:null },
        "liquid_light": { elem1:"charged_phosphor", elem2:null },
        "laser": { elem1:"charged_phosphor", elem2:null },
        "photonic_steam": { elem1:"charged_phosphor", elem2:null },

    },
};


elements.zinc_sulfide= {
 color: ["#f8f8f8","#ffffff","#eeeeee"],
    behavior:behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 3980,
    reactions: {
        "copper": { elem1:"phosphor", elem2:null} 
    },
};

elements.bioluminescent_cell = {
    behavior: behaviors.SUPPORT,
    color: ["#81ec75","#5fec87","#3ca365"],
    category: "life",
    state: "solid",
    density: 1000.1,
    tempHigh: 102,
    stateHigh: ["steam","steam","steam","sugar"],
    tempLow: -2,
    stateLow: ["ice","ice","ice","sugar_ice"],
    breakInto: ["water","dna","phosphor"],
    reactions: {
        "sugar_water": { elem2:["bio_seed","dirty_water"], chance:0.06, temp2:30, elem1:"bioluminescent_cell"},
        "sugar":{ elem2:["bio_seed","dirty_water"], chance:0.08, temp2:30, elem1:"bioluminescent_cell"},
        "water":{ elem2:["bio_seed","dirty_water"], chance:0.04, temp2:30, elem1:"bioluminescent_cell"},
        "salt_water":  { elem2:["bio_seed","dirty_water"], chance:0.02, temp2:30, elem1:"bioluminescent_cell"},
        "oxygen": { elem1:"bioluminescent_cell", elem2:"light" },
        "infection": { elem1:"infection", chance:0.015 },
		"blood": { elem1:"blood", chance:0.01 },
		"antibody": { elem1:"antibody", chance:0.01 },
		"alcohol": { elem1:[null,"dna"], chance:0.02 },
		"poison": { elem1:null, chance:0.02 },
		"plague": { elem1:null, chance:0.02 },
		"mercury": { elem1:null, chance:0.02 },
		"chlorine": { elem1:null, chance:0.02 },
		"cyanide": { elem1:null, chance:0.02 },
		"soap": { elem1:null, chance:0.015 },
		"ammonia": { elem2:"nitrogen", chance:0.05 },
		"oil": { elem2:"methane", chance:0.001 },
		"milk": { elem2:"yogurt", chance:0.01 },
		"cream": { elem2:"yogurt", chance:0.01 },
		"chocolate_milk": { elem2:"yogurt", chance:0.01, color2:"#4c392c" },
		"fruit_milk": { elem2:"yogurt", chance:0.01, color2:"#977871" },
		"pilk": { elem2:"yogurt", chance:0.01, color2:"#bba789" },
		"eggnog": { elem2:"yogurt", chance:0.01, color2:"#ae9a7e" }
    }
};

elements.bio_seed = {
    color: "#55cc77",
    category: "life",
    state: "solid",
    density: 900,
    hidden:1,
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        if (Math.random() < 0.1) {
            changePixel(pixel,"bioluminescent_cell");
        }
        doDefaults(pixel);
    },
};

elements.solar_panel = {
    behavior:behaviors.WALL,
    color:["#2b6fb0","#2f73bd","#1f4f86"],
    tick:function(pixel){
        var adj = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[-1,1],[1,-1]];
        for(var i=0;i<adj.length;i++){
            var x = pixel.x+adj[i][0], y = pixel.y+adj[i][1];
            if(outOfBounds(x,y)) continue;
            var sensed = pixelMap[x]?.[y];
            if(!sensed) continue;
            if(["light","liquid_light","photonic_steam","laser"].includes(sensed.element)){
                deletePixel(x,y);
                pixel.charge = 5;
                break;
            }
        }
        doDefaults(pixel);
    },
    conduct:1,
    movable:false,
    category:"machines",
    darkText:true,
    hardness:2,
    material:"steel"
};

elements.wire = elements.wire || {};
elements.wire.reactions = elements.wire.reactions || {};
elements.wire.reactions.solar_panel = { elem1:"wire", charge1:1 };
