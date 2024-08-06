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