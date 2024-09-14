// Define the corrected biomes with heights
var mercuryLayers = [
	{ layers: ["basalt", "iron"], height: 0.6 },
	{ layers: ["nickel"], height: 0.2 },
	{ layers: ["iron"], height: 0.2 }
];

var venusLayers = [
	{ layers: ["basalt", "limestone"], height: 0.5 },
	{ layers: ["sand", "ash", "clay"], height: 0.25 },
	{ layers: ["tuff"], height: 0.15 },
	{ layers: ["sulfur", ["basalt", "sand"]], height: 0.1 }
];

var earthLayers = [
	{ layers: ["rock", "basalt", "tuff", "limestone"], height: 0.55 },
	{ layers: ["clay", "mudstone", "clay_soil"], height: 0.3 },
	{ layers: [["sand", "wet_sand", "clay"], ["grass", "gravel", "dirt"]], height: 0.15 }
];

var marsLayers = [
	{ layers: ["iron", "nickel"], height: 0.3 },
	{ layers: ["iron", "nickel", "rust"], height: 0.15 },
	{ layers: ["iron", "nickel", "rust", "rust"], height: 0.15 },
	{ layers: ["rust"], height: 0.4 }
];

function tryCreateStaticPixel(pixelType, x, y) {
    var staticPixelType = "static_" + pixelType;

    // Check if the static version of the pixel type exists
    if (!elements[staticPixelType]) {
        // Create the static version of the pixel type
        elements[staticPixelType] = Object.assign({}, elements[pixelType], {
            behavior: behaviors.WALL,
            tick: undefined
        });
    }

    // Create the static pixel
    tryCreatePixel(staticPixelType, x, y);
}

function getRandomWeightedElement(weightedList) {
    // Parse the input string into an array of objects with name and weight properties
    const elements = weightedList.split(',').map(item => {
        const [name, weight] = item.split('%');
        return { name: name.trim(), weight: parseFloat(weight) };
    });

    // Calculate the total weight
    const totalWeight = elements.reduce((total, element) => total + element.weight, 0);

    // Generate a random number between 0 and totalWeight
    const randomWeight = Math.random() * totalWeight;

    // Find the element corresponding to the random weight
    let cumulativeWeight = 0;
    for (const element of elements) {
        cumulativeWeight += element.weight;
        if (randomWeight < cumulativeWeight) {
            return element.name;
        }
    }
}

// Function to load a script dynamically
function loadScript(url) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.head.appendChild(script);
}

function circleSimplexNoise1D(simplex, theta) {
	return simplex.noise2D(Math.cos(theta * Math.PI / 180), Math.sin(theta * Math.PI / 180));
}

// Load the simplex-noise library
loadScript("https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js");

function getRandomElement(layer) {
	if (!layer || layer.length === 0) {
		return null; // Return null or handle the error case
	}
	return layer[Math.floor(Math.random() * layer.length)];
}

function generatePlanet(config, x, y, radius) {
	var simplex = new SimplexNoise();

	var centerX = x;
	var centerY = y;
	var planetRadius = radius;
	var cloudStartRadius = planetRadius + 7;
	var cloudEndRadius = planetRadius + 14;

	// Generate terrain
	for (var r = 0; r <= planetRadius; r++) {
		var step = 0.5;
		if (r <= 50) { step = 1; }
		if (r <= 20) { step = 2; }
		for (var theta = 0; theta <= 360; theta += step) {
			var x = Math.round(centerX + r * Math.cos(theta * Math.PI / 180));
			var y = Math.round(centerY + r * Math.sin(theta * Math.PI / 180));

			if (x >= 0 && x < width && y >= 0 && y < height) {
				var distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
				var noise = (-Math.abs(circleSimplexNoise1D(simplex, theta * 0.7)) * 0.5) + (-Math.abs(circleSimplexNoise1D(simplex, theta * 2.5)) * 0.3);
				var noisyDistance = distance - (noise * planetRadius * 0.3);

				if (noisyDistance <= planetRadius) {
					// Determine the layer based on distance from center
					var totalHeight = 0;
					for (var i = 0; i < config.biomes.length; i++) {
						totalHeight += config.biomes[i].height;
					}

					var cumulativeHeight = 0;
					var chosenLayer = null;

					for (var i = 0; i < config.biomes.length; i++) {
						var biome = config.biomes[i];
						var layerHeight = (biome.height / totalHeight) * planetRadius;

						if (noisyDistance >= cumulativeHeight && noisyDistance < cumulativeHeight + layerHeight) {
							chosenLayer = biome.layers;

							// If chosenLayer is a list of lists, pick a sublayer based on noise
							if (Array.isArray(chosenLayer) && Array.isArray(chosenLayer[0])) {
								var sublayerNoise = (circleSimplexNoise1D(simplex, theta) + 1) / 2;
								var sublayerIndex = Math.floor(sublayerNoise * chosenLayer.length);
								if (sublayerIndex < 0) {
									sublayerIndex = 0;
								} else if (sublayerIndex >= chosenLayer.length) {
									sublayerIndex = chosenLayer.length - 1;
								}
								chosenLayer = chosenLayer[sublayerIndex];
							}
							break;
						}

						cumulativeHeight += layerHeight;
					}

					var element = getRandomElement(chosenLayer);
					if (element) {
						tryCreateStaticPixel(element, x, y);
					}
				}
			}
		}
	}

	if (config.oceanElements) {
		for (var i = centerX - planetRadius; i <= centerX + planetRadius; i++) {
			for (var j = centerY - planetRadius; j <= centerY + planetRadius; j++) {
				if (i >= 0 && i < width && j >= 0 && j < height) {
					var distanceFromCenter = Math.sqrt(Math.pow(i - centerX, 2) + Math.pow(j - centerY, 2));
					if (distanceFromCenter > planetRadius - 40 && distanceFromCenter <= planetRadius - 4) {
						// Place ocean in the ring around the planet
						tryCreateStaticPixel(getRandomWeightedElement(config.oceanElements), i, j);
					}
				}
			}
		}
	}

	if (config.cloudElements) {
		for (var r = cloudStartRadius; r <= cloudEndRadius; r++) {
			var step = 1;
			for (var theta = 0; theta <= 360; theta += step) {
				var x = Math.round(centerX + r * Math.cos(theta * Math.PI / 180));
				var y = Math.round(centerY + r * Math.sin(theta * Math.PI / 180));

				if (x >= 0 && x < width && y >= 0 && y < height) {
					var distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
					var cloudNoise = simplex.noise2D(x * 0.05, y * 0.05) + simplex.noise2D(x * 0.17, y * 0.17);

					// Adjust cloud density based on distance from planet
					var minCloudThreshold = 0.5 + config.cloudDensityBias; // Minimum threshold closer to the planet
					var maxCloudThreshold = 0.8 + config.cloudDensityBias; // Maximum threshold further from the planet

					// Interpolate threshold based on distance from planet
					var t = (r - cloudStartRadius) / (cloudEndRadius - cloudStartRadius);
					var threshold = minCloudThreshold + t * (maxCloudThreshold - minCloudThreshold);

					if (cloudNoise > threshold) {
						tryCreateStaticPixel(getRandomWeightedElement(config.cloudElements), x, y);
					}
				}
			}
		}
	}
}


var mercuryConfig = {
	biomes: mercuryLayers,
	cloudElements: "",
	cloudDensityBias: 0.0
};

var venusConfig = {
	biomes: venusLayers,
	cloudElements: "ammonia%70,acid_cloud%30",
	cloudDensityBias: 0.2
};

var earthConfig = {
	biomes: earthLayers,
	oceanElements: "salt_water%80,water%20",
	cloudElements: "cloud%100",
	cloudDensityBias: 0.0
};

var marsConfig = {
	biomes: marsLayers,
	cloudElements: "",
	cloudDensityBias: 0.0
};


elements.planetMercury = {
	behavior: behaviors.WALL,
	category: "special",
	maxSize: 1,
	tick: function(pixel) {
		if (pixel.start === pixelTicks) {
			deletePixel(pixel.x, pixel.y);
			generatePlanet(mercuryConfig, pixel.x, pixel.y, 13);
		}
	}
};

elements.planetVenus = {
	behavior: behaviors.WALL,
	category: "special",
	maxSize: 1,
	tick: function(pixel) {
		if (pixel.start === pixelTicks) {
			deletePixel(pixel.x, pixel.y);
			generatePlanet(venusConfig, pixel.x, pixel.y, 30);
		}
	}
};

elements.planetEarth = {
	behavior: behaviors.WALL,
	category: "special",
	maxSize: 1,
	tick: function(pixel) {
		if (pixel.start === pixelTicks) {
			deletePixel(pixel.x, pixel.y);
			generatePlanet(earthConfig, pixel.x, pixel.y, 33);
		}
	}
};

elements.planetMars = {
	behavior: behaviors.WALL,
	category: "special",
	maxSize: 1,
	tick: function(pixel) {
		if (pixel.start === pixelTicks) {
			deletePixel(pixel.x, pixel.y);
			generatePlanet(marsConfig, pixel.x, pixel.y, 20);
		}
	}
};
