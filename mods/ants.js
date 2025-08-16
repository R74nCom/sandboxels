// Define food element (simple for ants to carry)
elements.food = {
    color: ["#a0522d", "#deb887"], // brownish food
    behavior: behaviors.FALL,
    category: "items",
    state: "solid",
    density: 800,
};

// Queen ant definition
elements.queen_ant = {
    color: ["#a0522d", "#8b4513", "#d2691e"], // brownish shades
    behavior: behaviors.WALK,
    category: "life",
    tempHigh: 50,
    tempLow: 0,
    state: "solid",
    density: 1200,
    tick: function(pixel) {
        // Move randomly a bit
        if (Math.random() < 0.3) {
            tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y);
        }
        if (Math.random() < 0.1) {
            tryMove(pixel, pixel.x, pixel.y + (Math.random() < 0.5 ? -1 : 1));
        }
        
        // Lay eggs sometimes (egg will hatch into worker or male ant)
        if (Math.random() < 0.02) {
            let x = pixel.x + (Math.random() < 0.5 ? -1 : 1);
            let y = pixel.y + 1;
            if (isEmpty(x, y)) {
                createPixel("ant_egg", x, y);
            }
        }
    }
};

// Egg element that hatches into worker or male ant
elements.ant_egg = {
    color: ["#f5deb3", "#deb887"],
    behavior: behaviors.WALL,
    category: "life",
    tempHigh: 50,
    tempLow: 0,
    state: "solid",
    density: 500,
    tick: function(pixel) {
        // Hatch after some time randomly
        if (pixel.age > 100 && Math.random() < 0.1) {
            // 80% worker, 20% male
            if (Math.random() < 0.8) {
                changePixel(pixel, "worker_ant");
            } else {
                changePixel(pixel, "male_ant");
            }
        } else {
            pixel.age = (pixel.age || 0) + 1;
        }
    }
};

// Worker ant tries to stay near queen and bring food
elements.worker_ant = {
    color: ["#000000", "#333333"],
    behavior: behaviors.WALK,
    category: "life",
    tempHigh: 50,
    tempLow: 0,
    state: "solid",
    density: 1000,
    hasFood: false,
    tick: function(pixel) {
        // Try to find queen nearby (within 5 blocks)
        let queenNearby = false;
        for(let dx=-5; dx<=5; dx++) {
            for(let dy=-5; dy<=5; dy++) {
                let target = pixelMap[pixel.x + dx]?.[pixel.y + dy];
                if (target && target.element === "queen_ant") {
                    queenNearby = true;
                    // If holding food, deliver it (simulate by deleting food)
                    if(pixel.hasFood && Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
                        pixel.hasFood = false;
                        // You could add some effect here like increase queen health
                    } else if (!pixel.hasFood) {
                        // Move towards queen to deliver food
                        tryMove(pixel, pixel.x + Math.sign(dx), pixel.y + Math.sign(dy));
                    }
                }
            }
        }
        
        // If no queen nearby, wander randomly
        if (!queenNearby) {
            if (Math.random() < 0.5) {
                tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y);
            }
            if (Math.random() < 0.3) {
                tryMove(pixel, pixel.x, pixel.y + (Math.random() < 0.5 ? -1 : 1));
            }
        }
        
        // If not carrying food, try to pick up food nearby
        if (!pixel.hasFood) {
            for(let dx=-1; dx<=1; dx++) {
                for(let dy=-1; dy<=1; dy++) {
                    let nearby = pixelMap[pixel.x + dx]?.[pixel.y + dy];
                    if (nearby && nearby.element === "food") {
                        deletePixel(nearby.x, nearby.y);
                        pixel.hasFood = true;
                    }
                }
            }
        }
    }
};

// Male ant with small wings (color difference)
elements.male_ant = {
    color: ["#8b4513", "#d2b48c", "#fff8dc"], // wings lighter colors
    behavior: behaviors.WALK,
    category: "life",
    tempHigh: 50,
    tempLow: 0,
    state: "solid",
    density: 900,
    tick: function(pixel) {
        // Fly-ish movement: higher chance to move up
        if (Math.random() < 0.6) {
            tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y - 1);
        } else if (Math.random() < 0.5) {
            tryMove(pixel, pixel.x + (Math.random() < 0.5 ? -1 : 1), pixel.y);
        } else {
            tryMove(pixel, pixel.x, pixel.y + 1);
        }
    }
};
