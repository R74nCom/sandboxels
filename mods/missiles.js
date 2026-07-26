runAfterLoad(function() {
    // 1. Define the basic tracking Missile
    elements.missile = {
        color: "#e63946",
        category: "weapons",
        state: "solid",
        density: 5000,
        desc: "Homing missile that tracks down humans.",
        tick: function(pixel) {
            if (pixel.age === undefined) { pixel.age = 0; }
            pixel.age++;
            // Self-destruct after 100 frames
            if (pixel.age > 100) { explodeAt(pixel.x, pixel.y, 5); return; }

            let target = null;
            let radius = 15;
            // Scan nearby grid for players or humans
            for (let dx = -radius; dx <= radius && !target; dx++) {
                for (let dy = -radius; dy <= radius && !target; dy++) {
                    let cx = pixel.x + dx;
                    let cy = pixel.y + dy;
                    if (isEmpty(cx, cy, true)) continue;
                    let cp = pixelMap[cx]?.[cy];
                    if (cp && (cp.element.includes("human") || cp.element === "player")) {
                        target = { x: cx, y: cy };
                    }
                }
            }

            let moveX = target ? Math.sign(target.x - pixel.x) : (pixel.vx || 0);
            let moveY = target ? Math.sign(target.y - pixel.y) : (pixel.vy || 1);
            pixel.vx = moveX;
            pixel.vy = moveY;

            let nextX = pixel.x + moveX;
            let nextY = pixel.y + moveY;

            if (outOfBounds(nextX, nextY)) {
                deletePixel(pixel.x, pixel.y);
            } else if (isEmpty(nextX, nextY)) {
                movePixel(pixel, nextX, nextY);
            } else {
                let hitPixel = pixelMap[nextX][nextY];
                if (hitPixel.element !== "missile" && hitPixel.element !== "missile_launcher") {
                    explodeAt(pixel.x, pixel.y, 6);
                }
            }
        }
    };

    // 2. Define the Launcher Turret
    elements.missile_launcher = {
        color: "#457b9d",
        category: "weapons",
        state: "solid",
        density: 8000,
        desc: "Turret that shoots tracking missiles at humans.",
        tick: function(pixel) {
            if (pixel.cooldown === undefined) { pixel.cooldown = 0; }
            if (pixel.cooldown > 0) { pixel.cooldown--; return; }

            let radius = 20;
            let spotted = false;
            for (let dx = -radius; dx <= radius && !spotted; dx++) {
                for (let dy = 1; dy <= radius && !spotted; dy++) {
                    let cx = pixel.x + dx;
                    let cy = pixel.y + dy;
                    if (isEmpty(cx, cy, true)) continue;
                    let p = pixelMap[cx]?.[cy];
                    if (p && (p.element.includes("human") || p.element === "player")) { spotted = true; }
                }
            }

            if (spotted && isEmpty(pixel.x, pixel.y + 1)) {
                createPixel("missile", pixel.x, pixel.y + 1);
                let spawned = pixelMap[pixel.x][pixel.y + 1];
                if (spawned) { spawned.vx = 0; spawned.vy = 1; }
                pixel.cooldown = 30;
            }
        }
    };
});
