// Sandboxels Gravity Block Mod
// Adds a gravity block that pulls nearby particles

elements.gravity_block = {
    color: "#4B0082",
    behavior: behaviors.WALL,
    category: "special",
    state: "solid",
    density: 10000,
    hardness: 1,
    
    tick: function(pixel) {
        var max_gravity_distance = 30;
        var gravity_strength = 1;
        
        for (var x = -max_gravity_distance; x <= max_gravity_distance; x++) {
            for (var y = -max_gravity_distance; y <= max_gravity_distance; y++) {
                var nx = pixel.x + x;
                var ny = pixel.y + y;

                if (!isEmpty(nx, ny, true)) {
                    var npixel = pixelMap[nx][ny];

                    if (npixel && npixel.element !== "gravity_block") {
                        var dx = nx - pixel.x;
                        var dy = ny - pixel.y;
                        var distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 1) distance = 1;
                        if (distance <= max_gravity_distance) {
                            var force = (gravity_strength * 100) / (distance * distance);
                            var angle = Math.atan2(dy, dx);
                            var vx = -Math.cos(angle) * force;
                            var vy = -Math.sin(angle) * force;

                            // Add velocity toward the gravity block
                            npixel.vx = (npixel.vx || 0) + vx;
                            npixel.vy = (npixel.vy || 0) + vy;
                        }
                    }
                }
            }
        }
    }
};

console.log("Gravity Block Mod loaded! Place gravity blocks in the 'special' category to pull particles.");