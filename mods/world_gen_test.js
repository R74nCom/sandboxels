//https://www.michaelbromley.co.uk/blog/simple-1d-noise-in-javascript/

var Simple1DNoise = function() {
    var MAX_VERTICES = 256;
    var MAX_VERTICES_MASK = MAX_VERTICES -1;
    var amplitude = 1;
    var scale = 1;

    var r = [];

    for ( var i = 0; i < MAX_VERTICES; ++i ) {
        r.push(Math.random());
    }

    var getVal = function( x ){
        var scaledX = x * scale;
        var xFloor = Math.floor(scaledX);
        var t = scaledX - xFloor;
        var tRemapSmoothstep = t * t * ( 3 - 2 * t );

        /// Modulo using %
        var xMin = xFloor % MAX_VERTICES_MASK;
        var xMax = ( xMin + 1 ) % MAX_VERTICES_MASK;

        var y = lerp( r[ xMin ], r[ xMax ], tRemapSmoothstep );

        return y * amplitude;
    };

    /**
    * Linear interpolation function.
    * @param a The lower integer value
    * @param b The upper integer value
    * @param t The value between the two
    * @returns {number}
    */
    var lerp = function(a, b, t ) {
        return a * ( 1 - t ) + b * t;
    };

    // return the API
    return {
        getVal: getVal,
        setAmplitude: function(newAmplitude) {
            amplitude = newAmplitude;
        },
        setScale: function(newScale) {
            scale = newScale;
        }
    };
};

function newHeightMap(pixelType, pixelType2, offset, amplitude1, amplitude2, scale1, scale2) {
    return {
        color: "#000000",
        behavior: behaviors.WALL,
        category: "special",
        hidden: true,
        state: "solid",
        offset: 0.5,
        pixelType: pixelType,
        pixelType2: pixelType2,
        offset: offset,
        amplitude1: amplitude1,
        amplitude2: amplitude2,
        scale1: scale1,
        scale2: scale2,
        generator: new Simple1DNoise(),
        generator2: new Simple1DNoise(),
        excludeRandom: true,
        tick: function(pixel) {
            generator = this.generator;
            generator2 = this.generator2;
            generator.setAmplitude(this.amplitude1);
            generator.setScale(this.scale1);
            generator2.setAmplitude(this.amplitude2);
            generator2.setScale(this.scale2);
            let value = generator.getVal(pixel.x/width) + generator2.getVal(pixel.x/width);
            if(value + this.offset < pixel.y/height) {
                let element = this.pixelType;
                if(Array.isArray(element))
                {
                    element = element[Math.floor(Math.random() * element.length)];
                }
                if(element == null)
                {
                    deletePixel(pixel.x,pixel.y);
                } else {
                    changePixel(pixel,element);
                }
            } else {
                let element = this.pixelType2;
                if(Array.isArray(element))
                {
                    element = element[Math.floor(Math.random() * element.length)];
                }
                if(element == null)
                {
                    deletePixel(pixel.x,pixel.y);
                } else {
                    changePixel(pixel,element);
                }
            }
        }
    };
}

elements.dunes_height_map = newHeightMap("sand", null, 0, 0.75, 0.05, 2.5, 20);
elements.oasis_height_map = newHeightMap("sand", "water_height", 0.25, 0.75, 0.05, 2.5, 20);
elements.water_height = newHeightMap("water", null, 0.5, 0, 0, 1, 1);
worldgentypes.dunes = {
                fill: [
                    [0, "dunes_height_map"]
                ]
            };
worldgentypes.oasis = {
                fill: [
                    [0, "oasis_height_map"]
                ]
            };

if (enabledMods.includes("mods/chem.js")) {
    elements.ptfe_height_map = newHeightMap("polytetrafluoroethylene", "foof_height", 0.25, 0.75, 0.05, 2.5, 20);
    elements.foof_height = newHeightMap("FOOF", Array(100).fill(null).concat(["oxygen","fluorine"]), 0.5, 0, 0, 1, 1);
    worldgentypes.FOOF_sea = {
                fill: [
                    [0, "ptfe_height_map"]
                ],
                temperature: -120
            };
    elements.francium_height_map = newHeightMap("tungsten", "francium_height", 0.125, 1, 0.2, 2.5, 20);
    elements.francium_height = newHeightMap("molten_francium", Array(100).fill(null).concat(["radon","radiation","radiation","radiation"]), 0.5, 0, 0, 1, 1);
    worldgentypes.francium_lake = {
                fill: [
                    [0, "francium_height_map"]
                ],
                temperature: 30
            };
}

if (enabledMods.includes("mods/structure_test.js")) {
    elements.smooth_tungsten = {
    color: "#bcbaae",
    behavior: behaviors.WALL,
    tempHigh: 3422,
    stateHigh: "molten_tungsten",
    category: "solids",
    hidden: true,
    density: 19300,
    conduct: 0.65,
    hardness: 0.75
},
    elements.francium_reactor = {
		tick: function(pixel) {
			for(cx = -4; cx <= 4; cx++) {
				for(cy = -4; cy <= 4; cy++) {
					if(cx === 0 && cy === 0) {
						continue;
					};
					var finalCoords = [pixel.x+cx,pixel.y+cy];
					if(isEmpty(...finalCoords,true)) {
						continue;
					} else {
						var otherPixel = pixelMap[finalCoords[0]][finalCoords[1]];
						if(otherPixel.element === pixel.element) {
							deletePixel(...finalCoords);
						};
					};
				};
			};
			if(!isEmpty(pixel.x,pixel.y-1,true)) {
				swapPixels(pixel,pixelMap[pixel.x][pixel.y-1]);
				return;
			};
			if(!tryMove(pixel,pixel.x,pixel.y+1)) {
                let width = 10 + Math.floor(Math.random() * (8 + 1));
                let randomHeight = 2 + Math.floor(Math.random() * (2 + 1));
                var heights = [];
                for(let i = 1; i <= randomHeight; i++)
                {
                    heights.push(Math.floor(i));
                }
				var currentHeight = pixel.y + 100;
                while(currentHeight > pixel.y)
                {
                    loadPixelRowFromArray(Array((width)*2-1).fill("tungsten"),pixel.x,currentHeight,true,true);
                    currentHeight--;
                }
                for(let i = 0; i < heights.length; i++)
                {
                    for(let j = 0; j < heights[i]; j++)
                    {
                        loadPixelRowFromArray(Array((width-i)*2+1).fill("smooth_tungsten"),pixel.x,currentHeight,true,true);
                        currentHeight--;
                    }
                }
                
                for(let i = heights.length-1; i >= 0; i--)
                {
                    for(let j = 0; j < heights[i]; j++)
                    {
                        loadPixelRowFromArray(Array((width-i)*2+1).fill("smooth_tungsten"),pixel.x,currentHeight,true,true);
                        currentHeight--;
                    }
                }
			};
		},
		excludeRandom: true,
		desc: "Creates a francium reactor for the francium lake worldgen.",
		cooldown: 6,
		state: "solid",
		hardness: 1,
		category: "structures",
		color: ["#adadad", "#70b8ba", "#adadad", "#70b8ba", "#adadad"],
	};
    elements.francium_height_map = newHeightMap(Array(5000).fill("tungsten").concat(["francium_reactor"]), "francium_height", 0.125, 1, 0.2, 2.5, 20);
}


//override function until fix
worldGen = function (worldtype) {
    if(worldtype.fill) {
        for (var x = 1; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var element = null;
                for (let i = 0; i < worldtype.fill.length; i++) {
                    if((height-y)/height > worldtype.fill[i][0]) {
                        element = worldtype.fill[i][1]
                    } else {
                        break;
                    }
                }
                if (element) {
                    createPixel(element,x,y);
                    if (worldtype.temperature) {
                        pixelMap[x][y].temp = worldtype.temperature;
                    }
                }
            }
        }
    } else {
    var complexity = worldtype.complexity || 20;
    var heightVariance = worldtype.heightVariance || 0.5;
    var baseHeight = height-(height*(worldtype.baseHeight || 0.5));
    var layers = worldtype.layers || {0:"rock"};
    var yoffsets = generateTerrainHeights(width,heightVariance,complexity);
    // 2D world vertical generator
    for (var x = 1; x < width; x++) {
        var yoffset = yoffsets[x];
        var worldHeight = baseHeight+yoffset;
        for (var y = 0; y < height; y++) {
            // Change element type based on y, from grass > dirt > rock > basalt
            if (y > worldHeight) {
                // distance from the bottom of worldHeight
                var frombottom = worldHeight-(y-worldHeight);
                var element = null;
                for (var i in layers) {
                    var layer = layers[i];
                    if (layer[0] == 0 && yoffset < 0) {
                        layer[0] = yoffset;
                    }
                    if (frombottom > worldHeight*layer[0] && Math.random() < (layer[2] || 1)) {
                        if (elements[layer[1]]) {
                            element = layer[1];
                            break
                        }
                    }
                }
                if (element) {
                    createPixel(element,x,y);
                    if (worldtype.temperature) {
                        pixelMap[x][y].temp = worldtype.temperature;
                    }
                }
            }
        }
    }
    // decor
    if (worldtype.decor) {
        for (var i = 0; i < worldtype.decor.length; i++) {
            var decor = worldtype.decor[i];
            var element = decor[0];
            var chance = decor[1];
            for (var x = 1; x < width; x++) {
                var y = decor[2] || 5;
                // add or subtract worldtype.decorVariance from y
                y += Math.round(Math.random()*(worldtype.decorVariance||2) - (worldtype.decorVariance||2)/2);
                if (Math.random() < chance && isEmpty(x,y)) {
                    createPixel(element,x,y);
                    if (worldtype.temperature) {
                        pixelMap[x][y].temp = worldtype.temperature;
                    }
                    if (decor[3]) {
                        pixelMap[x][y].color = pixelColorPick(pixelMap[x][y],decor[3])
                    }
                }
            }
        }
    }
    }
}