// Civilization Evolution Mod for Sandboxels
// Created by ChatGPT — “From Tribe to Empire”
// Add this file as a mod to Sandboxels to watch tribes evolve and conquer.

function pixelMapSearch(x, y, radius, condition) {
    let found = [];
    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            let px = x + dx;
            let py = y + dy;
            if (!isEmpty(px, py)) {
                let p = pixelMap[px][py];
                if (p && condition(p)) {
                    found.push(p);
                }
            }
        }
    }
    return found;
}

elements.tribal_human = {
    color: "#c49e76",
    behavior: behaviors.WALK,
    category: "life",
    state: "solid",
    density: 1200,
    tempHigh: 150,
    burn: 5,
    burnTime: 500,
    reactions: {
        "water": { elem1: null, elem2: "dead_human", chance: 0.05 },
        "fire": { elem1: "dead_human", chance: 0.2 },
    },
    properties: {
        tribe: null,
        innovation: 0,
        resources: 0,
        food: 5,
        cooldown: 0,
        age: "stone"
    },
    tick: function(pixel) {
        if (!pixel.tribe) {
            // Try to join or create tribe
            let nearby = pixelMapSearch(pixel.x, pixel.y, 5, e => e.element === "tribal_human" && e.tribe);
            pixel.tribe = nearby.length > 0 ? nearby[0].tribe : "Tribe_" + Math.floor(Math.random() * 10000);
        }

        if (pixel.cooldown > 0) { pixel.cooldown--; return; }

        // Survival: lose food
        if (Math.random() < 0.05) pixel.food--;

        // Starvation
        if (pixel.food <= 0) {
            pixel.element = "dead_human";
            return;
        }

        // Gather food from plants or animals
        let nearbyFood = pixelMapSearch(pixel.x, pixel.y, 2, e => ["plant", "grass", "meat"].includes(e.element));
        if (nearbyFood.length > 0 && Math.random() < 0.1) {
            pixel.food += 5;
            deletePixel(nearbyFood[0].x, nearbyFood[0].y);
        }

        // Build shelters (wood or brick)
        if (Math.random() < 0.002) {
            let bx = pixel.x + Math.floor(Math.random() * 3) - 1;
            let by = pixel.y + Math.floor(Math.random() * 3) - 1;
            if (isEmpty(bx, by)) {
                createPixel(Math.random() < 0.7 ? "wood" : "brick", bx, by);
            }
        }

        // Gather resources from stone, wood, etc.
        let nearbyRes = pixelMapSearch(pixel.x, pixel.y, 2, e => ["wood", "stone", "iron"].includes(e.element));
        if (nearbyRes.length > 0 && Math.random() < 0.05) {
            pixel.resources += 1;
        }

        // Innovate (small chance every tick)
        if (Math.random() < 0.002) pixel.innovation++;

        // Craft weapons or tools
        if (pixel.resources > 10 && Math.random() < 0.005) {
            createPixel("weapon", pixel.x, pixel.y + 1);
            pixel.resources -= 5;
        }

        // Fight other tribes
        let enemy = pixelMapSearch(pixel.x, pixel.y, 2, e => e.element === "tribal_human" && e.tribe !== pixel.tribe);
        if (enemy.length > 0 && Math.random() < 0.05) {
            if (Math.random() < 0.6) {
                enemy[0].element = "blood";
                pixel.innovation += 2;
            } else {
                pixel.element = "blood";
            }
        }

        // Evolution by innovation
        if (pixel.innovation > 20 && pixel.age === "stone") {
            pixel.age = "bronze";
            pixel.color = "#b87333";
        }
        if (pixel.innovation > 50 && pixel.age === "bronze") {
            pixel.age = "iron";
            pixel.color = "#aaaaaa";
        }
        if (pixel.innovation > 100 && pixel.age === "iron") {
            pixel.age = "industrial";
            pixel.color = "#555555";
        }
        if (pixel.innovation > 200 && pixel.age === "industrial") {
            pixel.age = "modern";
            pixel.element = "civilized_human";
        }

        pixel.cooldown = 5 + Math.floor(Math.random() * 10);
    },
};

// Civilized human (Modern Era)
elements.civilized_human = {
    color: "#8c6849",
    behavior: behaviors.WALK,
    category: "life",
    state: "solid",
    density: 1200,
    tempHigh: 200,
    properties: {
        innovation: 200,
        empire: true,
        cooldown: 0,
        resources: 0
    },
    tick: function(pixel) {
        if (pixel.cooldown > 0) { pixel.cooldown--; return; }

        // Build cities
        if (Math.random() < 0.005) {
            let bx = pixel.x + Math.floor(Math.random() * 5) - 2;
            let by = pixel.y + Math.floor(Math.random() * 5) - 2;
            if (isEmpty(bx, by)) {
                createPixel(Math.random() < 0.5 ? "concrete" : "brick", bx, by);
            }
        }

        // Spread civilization
        if (Math.random() < 0.002) {
            let nx = pixel.x + Math.floor(Math.random() * 10) - 5;
            let ny = pixel.y + Math.floor(Math.random() * 10) - 5;
            if (isEmpty(nx, ny)) {
                createPixel("tribal_human", nx, ny);
            }
        }

        // Industrial warfare
        let nearbyEnemy = pixelMapSearch(pixel.x, pixel.y, 3, e => e.element === "civilized_human" && e.tribe !== pixel.tribe);
        if (nearbyEnemy.length > 0 && Math.random() < 0.02) {
            nearbyEnemy[0].element = "explosion";
        }

        // Innovation never stops
        if (Math.random() < 0.001) pixel.innovation += 1;

        pixel.cooldown = 5;
    }
};

// Add tribal camp element
elements.tribal_camp = {
    color: "#8b5a2b",
    behavior: [
        "XX|M1|XX",
        "M1|XX|M1",
        "XX|M1|XX"
    ],
    category: "structures",
    state: "solid",
    density: 1500,
    tick: function(pixel) {
        if (Math.random() < 0.005) {
            let x = pixel.x + Math.floor(Math.random() * 3) - 1;
            let y = pixel.y + Math.floor(Math.random() * 3) - 1;
            if (isEmpty(x, y)) createPixel("tribal_human", x, y);
        }
    }
};

// Optional: add a new "weapon" element for fighting visuals
elements.weapon = {
    color: "#777777",
    behavior: behaviors.POWDER,
    category: "tools",
    density: 7800,
    state: "solid"
};
