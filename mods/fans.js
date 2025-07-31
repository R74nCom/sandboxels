function getSelfMovingBehaviorFunctionNames() {
    return Object.entries(behaviors)
        .filter(([name, func]) => {
            if (typeof func !== "function") return false;
            if (["SEEDRISE"].includes(name)) return false;

            const code = func.toString();

            // Only allow if it's moving its own pixel
            const selfMove = /movePixel\s*\(\s*pixel\s*,/.test(code) || /tryMove\s*\(\s*pixel\s*,/.test(code)
                || /pixel\.(x|y)\s*[\+\-]=/.test(code);

            return selfMove;
        })
        .map(([name]) => name);
}

const builtInMovementBehaviors = [
    "M1", "M2","BO", "SP", "XX|M1", "M1|M2", "M1%", "M2%", "M1%|M2", 
    "M1|M2%", "M1%|M2%", 'XX|M1%', 'M1%|XX', 'XX|M2%', 'M2%|XX'
];

function behaviorIncludesMovement(behaviorMatrix, movementFunctionNames) {
    if (!Array.isArray(behaviorMatrix)) return false;

    for (const row of behaviorMatrix) {
        if (!Array.isArray(row)) continue;

        for (const cell of row) {
            if (typeof cell !== "string") continue;

            // Handle "AND" logic: multiple behaviors in one cell
            const andParts = cell.split("AND");

            for (const andPart of andParts) {
                const parts = andPart.trim().split("|").map(p => p.trim());
                if (parts.some(p => builtInMovementBehaviors.includes(p) || movementFunctionNames.includes(p))) {
                    return true;
                }
            }
        }
    }

    return false;
}


runAfterAutogen(function () {
    const movementFunctionNames = getSelfMovingBehaviorFunctionNames();

    const movableElements = Object.entries(elements).filter(([name, elem]) => {
        const behavior = elem.behavior;
        const tick = elem.tick || elem.tickFunc;

        let movesSelf = false;

        // Check behavior matrix
        if (Array.isArray(behavior)) {
            movesSelf = behaviorIncludesMovement(behavior, movementFunctionNames);
        }

        // Check single string
        else if (typeof behavior === "string") {
            const parts = behavior.split("|").map(p => p.trim());
            movesSelf = parts.some(p => builtInMovementBehaviors.includes(p) || movementFunctionNames.includes(p));
        }

        // Check function-type behavior
        else if (typeof behavior === "function") {
            movesSelf = movementFunctionNames.includes(behavior.name);
        }

        // Check tick function
        if (!movesSelf && typeof tick === "function") {
            const code = tick.toString();
            if (/movePixel\s*\(\s*pixel\s*,/.test(code) || /tryMove\s*\(\s*pixel\s*,/.test(code) || /pixel\.(x|y)\s*[\+\-]=/.test(code)) {
                movesSelf = true;
            }
        }

        return movesSelf;
    }).map(([name]) => name);

    window.movableElementsByBehavior = movableElements;
});




// Create a global map to track delay for each position
if (!window.fanPushDelays) {
    window.fanPushDelays = new Map();
}

elements.fan_right = {
    behavior: behaviors.WALL,
    color: "#c5c5c5",
    tick: function (pixel) {
        const fan_strength = 10;
        const delay_ticks = 2;

        for (let i = 1; i <= fan_strength; i++) {
            const x = pixel.x + i;
            const y = pixel.y;

            // SKIP if position is empty
            if (isEmpty(x, y)) continue;

            const delem = pixelMap[x]?.[y];
            if (!delem) continue;

            // Skip non-movable elements
            if (!window.movableElementsByBehavior.includes(delem.element)) continue;

            // Use position key for delay tracking
            const key = `${x},${y}`;
            const currentDelay = window.fanPushDelays.get(key) || 0;

            if (currentDelay >= delay_ticks) {
                window.fanPushDelays.set(key, 0);

                const newX = x + 1;
                if (isEmpty(newX, y)) {
                    movePixel(delem, newX, y);
                }
            } else {
                window.fanPushDelays.set(key, currentDelay + 1);
            }
        }
    },
    category: "machines"
};

elements.fan_left = {
    behavior: behaviors.WALL,
    color: "#c5c5c5",
    tick: function (pixel) {
        const fan_strength = 10;
        const delay_ticks = 2;

        for (let i = 0; i >= -fan_strength; i--) {
            const x = pixel.x + i;
            const y = pixel.y;

            // SKIP if position is empty
            if (isEmpty(x, y)) continue;

            const delem = pixelMap[x]?.[y];
            if (!delem) continue;

            // Skip non-movable elements
            if (!window.movableElementsByBehavior.includes(delem.element)) continue;

            // Use position key for delay tracking
            const key = `${x},${y}`;
            const currentDelay = window.fanPushDelays.get(key) || 0;

            if (currentDelay >= delay_ticks) {
                window.fanPushDelays.set(key, 0);

                const newX = x - 1;
                if (isEmpty(newX, y)) {
                    movePixel(delem, newX, y);
                }
            } else {
                window.fanPushDelays.set(key, currentDelay + 1);
            }
        }
    },
    category: "machines"
};
/*
elements.fan_up = {
    behavior: behaviors.WALL,
    tick: function (pixel) {
        let fan_strength = 10;
        let delay_ticks = 0; // delay between pushes per pixel row
        if (!pixel._fan_delay) pixel._fan_delay = 0;

        if (pixel._fan_delay > 0) {
            pixel._fan_delay--;
            return;
        }

        for (let i = 1; i <= fan_strength; i++) {
            const tx = pixel.x;
            const ty = pixel.y - i;

            if (!isEmpty(tx, ty)) {
                const delem = pixelMap[tx]?.[ty];

                if (!delem || !window.movableElementsByBehavior.includes(delem.element)) break;

                const above = ty - 1;
                if (isEmpty(tx, above)) {
                    movePixel(delem, tx, above);
                    pixel._fan_delay = delay_ticks;
                    break; // only move one per tick
                }
            }
        }
    }
};
*/
