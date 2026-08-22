// Human Builder Mod - Humans mine and build houses on the spot

var MINEABLE = ["dirt","rock","sand","clay","gravel"];
var INVENTORY_LIMIT = 30;
var MINE_RADIUS = 6;

runAfterLoad(function() {
    if (!elements.body || !elements.body.tick) return;

    var origBodyTick = elements.body.tick;

    function initInventory(pixel) {
        if (!pixel.inventory) {
            pixel.inventory = {dirt:0, rock:0, sand:0, clay:0, wood:0};
            pixel.state = "idle";
            pixel.stateTimer = 0;
            pixel.buildStep = 0;
            pixel.buildX = pixel.x;
            pixel.buildY = pixel.y;
        }
    }

    function totalInventory(inv) {
        var t = 0;
        for (var k in inv) t += inv[k];
        return t;
    }

    function pickBuildMaterial(inv) {
        if (inv.rock > 0)  { inv.rock--;  return "brick"; }
        if (inv.sand > 0)  { inv.sand--;  return "brick"; }
        if (inv.dirt > 0)  { inv.dirt--;  return "baked_clay"; }
        if (inv.clay > 0)  { inv.clay--;  return "baked_clay"; }
        if (inv.wood > 0)  { inv.wood--;  return "wood"; }
        return null;
    }

    // 5 wide x 4 tall house, built from body position
    // row 0 = floor, row 3 = roof
    // returns null if slot not needed, or {dx, dy} offset from body
    function nextBuildSlot(step) {
        var col = step % 5;
        var row = Math.floor(step / 5);
        if (row === 0) return {dx: col - 2, dy: 1};        // floor below
        if (row === 3) return {dx: col - 2, dy: -2};       // roof above
        if (col === 0 || col === 4) return {dx: col - 2, dy: -row}; // walls
        return null; // interior, skip
    }

    function findNearestMineable(x, y) {
        var best = null, bestDist = MINE_RADIUS * MINE_RADIUS;
        for (var dy = -MINE_RADIUS; dy <= MINE_RADIUS; dy++) {
            for (var dx = -MINE_RADIUS; dx <= MINE_RADIUS; dx++) {
                var nx = x + dx, ny = y + dy;
                if (isEmpty(nx, ny)) continue;
                if (!pixelMap[nx] || !pixelMap[nx][ny]) continue;
                if (MINEABLE.indexOf(pixelMap[nx][ny].element) !== -1) {
                    var dist = dx*dx + dy*dy;
                    if (dist < bestDist) {
                        bestDist = dist;
                        best = {x: nx, y: ny, element: pixelMap[nx][ny].element};
                    }
                }
            }
        }
        return best;
    }

    function moveToward(pixel, head, tx, ty) {
        var dx = Math.sign(tx - pixel.x);
        var dy = Math.sign(ty - pixel.y);
        var moved = false;

        if (dx !== 0 && isEmpty(pixel.x + dx, pixel.y)) {
            if (head && head.x === pixel.x && head.y === pixel.y - 1 && isEmpty(head.x + dx, head.y)) {
                movePixel(head, head.x + dx, head.y);
            }
            tryMove(pixel, pixel.x + dx, pixel.y);
            moved = true;
        }
        if (!moved && dy !== 0 && isEmpty(pixel.x, pixel.y + dy)) {
            tryMove(pixel, pixel.x, pixel.y + dy);
            if (head && head.y !== pixel.y - 1 && isEmpty(pixel.x, pixel.y - 1)) {
                movePixel(head, pixel.x, pixel.y - 1);
            }
            moved = true;
        }
        return moved;
    }

    elements.body.tick = function(pixel) {
        initInventory(pixel);

        var head = null;
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element === "head") {
            head = pixelMap[pixel.x][pixel.y-1];
        }
        if (!head && !pixel.dead) return;

        var inv = totalInventory(pixel.inventory);

        // === IDLE ===
        if (pixel.state === "idle") {
            pixel.stateTimer++;

            // Enough resources? Build now, right here
            if (inv >= 10) {
                pixel.state = "building";
                pixel.buildStep = 0;
                pixel.stateTimer = 0;
                return;
            }

            // Look for resources
            if (pixel.stateTimer > 30) {
                var target = findNearestMineable(pixel.x, pixel.y);
                if (target) {
                    pixel.state = "mining";
                    pixel.stateTimer = 0;
                    return;
                }
            }

            origBodyTick(pixel);
            return;
        }

        // === MINING ===
        if (pixel.state === "mining") {
            pixel.stateTimer++;

            // Enough resources? Switch to build
            if (inv >= 10) {
                pixel.state = "building";
                pixel.buildStep = 0;
                pixel.stateTimer = 0;
                return;
            }

            // Timeout or full
            if (pixel.stateTimer > 300 || inv >= INVENTORY_LIMIT) {
                pixel.state = "idle";
                pixel.stateTimer = 0;
                return;
            }

            var target = findNearestMineable(pixel.x, pixel.y);
            if (!target) {
                // Walk around to find resources
                origBodyTick(pixel);
                pixel.stateTimer = 0;
                return;
            }

            // Adjacent? Mine it
            if (Math.abs(target.x - pixel.x) <= 1 && Math.abs(target.y - pixel.y) <= 1) {
                if (pixel.inventory[target.element] !== undefined) {
                    pixel.inventory[target.element]++;
                } else {
                    pixel.inventory[target.element] = 1;
                }
                deletePixel(target.x, target.y);
            } else {
                moveToward(pixel, head, target.x, target.y);
            }

            doHeat(pixel);
            doBurning(pixel);
            doElectricity(pixel);
            return;
        }

        // === BUILDING ===
        if (pixel.state === "building") {
            pixel.stateTimer++;
            if (pixel.stateTimer > 600) {
                pixel.state = "idle";
                pixel.stateTimer = 0;
                return;
            }

            // Find next needed slot
            var slot = null;
            while (pixel.buildStep < 20) {
                slot = nextBuildSlot(pixel.buildStep);
                if (slot) break;
                pixel.buildStep++;
            }

            if (!slot || pixel.buildStep >= 20) {
                // House done!
                pixel.state = "idle";
                pixel.stateTimer = 0;
                return;
            }

            var tx = pixel.buildX + slot.dx;
            var ty = pixel.buildY + slot.dy;

            var mat = pickBuildMaterial(pixel.inventory);
            if (!mat) {
                pixel.state = "mining";
                pixel.stateTimer = 0;
                return;
            }

            // Don't build on self, head, or under feet (would cause falling)
            if ((tx === pixel.x && ty === pixel.y) || (head && tx === head.x && ty === head.y) ||
                (tx === pixel.x && ty === pixel.y + 1)) {
                pixel.buildStep++;
                return;
            }

            // Place block - destroy whatever is in the way
            if (!isEmpty(tx, ty)) {
                deletePixel(tx, ty);
            }
            createPixel(mat, tx, ty);
            pixel.buildStep++;
            pixel.stateTimer = 0;

            doHeat(pixel);
            doBurning(pixel);
            doElectricity(pixel);
            return;
        }
    };
});
