elements.firefighting_foam = {
    color: ["#E6F3FF", "#F0F8FF", "#F8FBFF"],
    behavior: [
        "XX|CR:foam%2.5|XX",
        "M2 AND CR:foam%2.5|CH:foam%0.2|M2 AND CR:foam%2.5",
        "M1|M1|M1",
    ],
    category: "liquids",
    state: "liquid",
    density: 0.9,
    temp: 10,
    conduct: 0.01,
    stain: 0.01,
    viscosity: 3000,
    reactions: {
        "greek_fire": { elem2: null, chance: 0.2 },
        "water": { elem1: "foam", elem2: "salt_water", chance: 0.1 },
        "acid": { elem1: "foam", elem2: "neutral_acid", chance: 0.05 },
        "acid_gas": { elem1: "foam", elem2: "neutral_acid", chance: 0.05 },
    },
    tick: function (pixel) {
        // Extinguish fire and smoke, remove burning state, and cool down pixels in a 6-pixel radius
        let radius = 6
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                let nx = pixel.x + dx;
                let ny = pixel.y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    let neighborPixel = pixelMap[nx][ny];
                    if (neighborPixel && neighborPixel.element) {
                        if (neighborPixel.element === "fire" || neighborPixel.element === "smoke") {
                            deletePixel(nx, ny);
                        } else {
                            // Remove burning state
                            if (neighborPixel.burning) {
                                neighborPixel.burning = false;
                            }

                            // Cool down the pixel
                            if (neighborPixel.temp > 10) {
                                neighborPixel.temp = Math.max(10, neighborPixel.temp - 5);
                            }
                        }
                    }
                }
            }
        }

        // Decay over time
        if (Math.random() < 0.005) {
            changePixel(pixel, "foam");
        }
        if (Math.random() < 0.0002) {
            deletePixel(pixel.x, pixel.y);
        }
    }
};

elements.fire_extinguisher = {
    color: "#ce2029",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    category: "machines",
    state: "solid",
    density: 2,
    temp: 20,
    conduct: 0.1,
    tick: function (pixel) {
        let shouldExplode = false;

        // Check for fire or smoke within a 10-pixel radius
        let checkRadius = 10;
        for (let dx = -checkRadius; dx <= checkRadius; dx++) {
            for (let dy = -checkRadius; dy <= checkRadius; dy++) {
                let nx = pixel.x + dx;
                let ny = pixel.y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    let neighborPixel = pixelMap[nx][ny];
                    if (neighborPixel && (neighborPixel.element === "fire" || neighborPixel.element === "smoke")) {
                        shouldExplode = true;
                        break;
                    }
                }
            }
            if (shouldExplode) break;
        }

        if (shouldExplode) {
            // Calculate the size of the fire extinguisher block
            let blockSize = 1;
            for (let dx = 0; dx < 3; dx++) {
                for (let dy = 0; dy < 3; dy++) {
                    let nx = pixel.x + dx - 1;
                    let ny = pixel.y + dy - 1;
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        let neighborPixel = pixelMap[nx][ny];
                        if (neighborPixel && neighborPixel.element === "fire_extinguisher") {
                            blockSize++;
                        }
                    }
                }
            }

            // Calculate explosion radius based on block size
            let explosionRadius = Math.max(blockSize * 5, 10);

            // Create a large explosion of foam
            for (let dx = -explosionRadius; dx <= explosionRadius; dx++) {
                for (let dy = -explosionRadius; dy <= explosionRadius; dy++) {
                    // Check if the pixel is within the circular radius
                    if (dx * dx + dy * dy <= explosionRadius * explosionRadius) {
                        let fx = pixel.x + dx;
                        // this code SUCKS!
                        let fy = pixel.y + dy;
                        if (fx >= 0 && fx < width && fy >= 0 && fy < height) {
                            let targetPixel = pixelMap[fx][fy];
                            if (!targetPixel || targetPixel.element === "air") {
                                createPixel("firefighting_foam", fx, fy);
                            }
                        }
                    }
                }
            }
        }
    }
};
elements.dog_food = {
    color: ["#402101", "#1f1001", "#2e1701", "#2b1601", "#261604"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    state: "solid",
    tempHigh: 500,
    stateHigh: "ash",
    isFood: true,
};

elements.ice_cube = {
    color: ["#ccf4ff", "#c6e3f5", "#b6d1f2",],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX"
    ],
    category: "food",
    state: "solid",
    temp: -5,
    tempHigh: 0,
    stateHigh: "water",
    isFood: true,
};

elements.dog_with_rabies = {
    color: ["#c7a950", "#f7f6eb", "#152617", "#665d20", "#454420"],
    behavior: [
        "XX|XX|XX",
        "M2%25|LB:foam%25|M2%25",
        "M2|M1|M2"
    ],
    reactions: {
        "meat": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "egg": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "yolk": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "cheese": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "ice_cube": { elem2: null, chance: 0.8, func: behaviors.FEEDPIXEL },
        "cooked_meat": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "chocolate": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL, elem1: "rotten_meat" },
        "grape": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL, elem1: "rotten_meat" },
        "rat": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
        "dog_food": { elem2: null, chance: 0.8, func: behaviors.FEEDPIXEL },
        "nut_butter": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
    },
    category: "life",
    state: "solid",
    tempHigh: 100,
    stateHigh: "cooked_meat",
    breakInto: "rotten_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
    hidden: true,
};

elements.dog = {
    color: ["c78950", "#ffffff", "#262524", "#664120", "#453120"],
    behavior: [
        "XX|XX|XX",
        "M2%7|XX|M2%7",
        "M2|M1|M2"
    ],
    reactions: {
        "meat": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "egg": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "yolk": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "cheese": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "ice_cube": { elem2: null, chance: 0.8, func: behaviors.FEEDPIXEL },
        "cooked_meat": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "chocolate": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL, elem1: "rotten_meat" },
        "grape": { elem2: null, chance: 0.2, func: behaviors.FEEDPIXEL, elem1: "rotten_meat" },
        "rat": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
        "dog_food": { elem2: null, chance: 0.8, func: behaviors.FEEDPIXEL },
        "nut_butter": { elem2: null, chance: 0.5, func: behaviors.FEEDPIXEL },
        "infection": { elem1: "dog_with_rabies", chance: 0.4 },
        "dog_with_rabies": { elem1: "dog_with_rabies", chance: 0.3 },
    },
    category: "life",
    state: "solid",
    tempHigh: 100,
    stateHigh: "cooked_meat",
    breakInto: "rotten_meat",
    tempLow: -20,
    stateLow: "frozen_meat",
};
elements.methamphetamine = {
    category: "powders",
    color: ["#b6ccd8", "#c5cfd6", "#cbd5db", "#6da5e0"],
    state: "solid",
    behavior: behaviors.POWDER,
    temp: 20,
    tempHigh: 1700,
    stateHigh: "molten_methamphetamine",
    reactions: {
        "water": { elem1: null, elem2: "dirty_water" },
        "cell": { elem1: "methamphetamine", elem2: "plague", chance: 0.001 },
        "plant": { elem1: "methamphetamine", elem2: "dead_plant", chance: 0.005 },
    },
};

elements.molten_methamphetamine = {
    category: "states",
    color: ["#fb7300", "#f93100", "#e05a1d", "#d65611"],
    state: "liquid",
    behavior: behaviors.RADMOLTEN,
    tempLow: 1700,
    stateLow: "methamphetamine",
};

elements.morphine = {
    category: "powders",
    color: "#c4dcf2",
    state: "solid",
    behavior: behaviors.POWDER,
    tempHigh: 10000,
    stateHigh: "n_explosion",
    reactions: {
        "head": { elem1: "n_explosion", elem2: "n_explosion", chance: 0.00008 },
        "body": { elem1: "n_explosion", elem2: "n_explosion", chance: 0.00008 },
    },
};

elements.cigarette = {
    category: "solids",
    color: ["#754531", "#e1e1dd"],
    state: "solid",
    behavior: [
        "XX|CR:smoke%1 AND CR:carbon_dioxide%0.5|XX",
        "CR:smoke%1 AND CR:carbon_dioxide%0.5|XX|CR:smoke%1 AND CR:carbon_dioxide%0.5",
        "XX|CR:smoke%1 AND CR:carbon_dioxide%0.5|XX",
    ],
    tempHigh: 233,
    stateHigh: ["ash", "fire"],
    breakInto: ["dust", "ash", "ash", "ash", "charcoal"],
};

elements.cannabis = {
    category: "powders",
    state: "solid",
    tempHigh: 100,
    stateHigh: "dead_plant",
    burn: 15,
    burnTime: 60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    behavior: behaviors.POWDER,
    color: ["#2C7415", "#1D5F00", "#B2DC29", "#B2DC29", "#2C7415"],
    reactions: {
        "head": { elem1: null, elem2: "fly" }
    },
}

elements.cannabis_seed = {
    category: "life",
    state: "solid",
    tempHigh: 120,
    stateHigh: "dead_plant",
    breakInto: "cannabis",
    behavior: [
        "CR:cannabis_branch%2|CR:cannabis_branch%2|CR:cannabis_branch%2",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    color: "#57272C",
}

elements.cannabis_branch = {
    category: "life",
    hidden: true,
    state: "solid",
    tempHigh: 120,
    stateHigh: "dead_plant",
    breakInto: "dead_plant",
    behavior: [
        "CR:cannabis_branch%0.7|CR:cannabis_branch%3|CR:cannabis_branch%0.7",
        "CR:cannabis%4|XX|CR:cannabis%4",
        "CR:cannabis%4|XX|CR:cannabis%4",
    ],
    color: "#57272C",
}

elements.weed = {
    category: "powders",
    behavior: behaviors.POWDER,
    state: "solid",
    tempHigh: 150,
    stateHigh: "dead_plant",
    breakInto: "dead_plant",
    burn: 15,
    burnTime: 60,
    burnInto: "dead_plant",
    color: ["#71B441", "#416201", "#426D06", "#91CA6F"]
}

elements.weed_seed = {
    category: "life",
    state: "solid",
    tempHigh: 150,
    stateHigh: "dead_plant",
    breakInto: "weed",
    burn: 10,
    burnTime: 60,
    burnInto: "dead_plant",
    color: "#5c4532",
    behavior: [
        "CR:weed_branch%0.2|CR:weed_branch%0.2|CR:weed_branch%0.2",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
}

elements.weed_branch = {
    category: "life",
    hidden: true,
    state: "solid",
    tempHigh: 150,
    stateHigh: "dead_plant",
    breakInto: "weed",
    burn: 10,
    burnTime: 60,
    color: "#5c4532",
    behavior: [
        "CR:weed_branch%0.7|CR:weed_branch%3|CR:weed_branch%0.7",
        "CR:cannabis%4|XX|CR:cannabis%4",
        "CR:cannabis%4|XX|CR:cannabis%4"
    ],
}