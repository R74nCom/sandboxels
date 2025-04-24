elements.gravity_point = {
    color: "#FFD700", // Goudkleurig
    behavior: behaviors.STURDYPOWDER,
    category: "special",
    state: "solid",
    density: 5000,
    max_gravity_distance: 100, // Bereik van zwaartekracht
    gravity_strength: 1, // Kracht van zwaartekracht
    
    tick: function(pixel) {
        for (var x = -pixel.max_gravity_distance; x <= pixel.max_gravity_distance; x++) {
            for (var y = -pixel.max_gravity_distance; y <= pixel.max_gravity_distance; y++) {
                var nx = pixel.x + x;
                var ny = pixel.y + y;

                if (!isEmpty(nx, ny, true)) {
                    var npixel = pixelMap[nx][ny];

                    if (npixel && npixel.element !== "gravity_point") {
                        var dx = nx - pixel.x;
                        var dy = ny - pixel.y;
                        var distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 1) distance = 1; // Voorkom delen door 0
                        if (distance <= pixel.max_gravity_distance) {
                            var force = (pixel.gravity_strength * 100) / (distance * distance);
                            var angle = Math.atan2(dy, dx);
                            var vx = -Math.cos(angle) * force;
                            var vy = -Math.sin(angle) * force;

                            // Voeg snelheid toe aan objecten
                            npixel.vx = (npixel.vx || 0) + vx;
                            npixel.vy = (npixel.vy || 0) + vy;
                        }
                    }
                }
            }
        }
    }
};
