// === Basic Fission Mod ===
 
// --- Fissionable Uranium-235 ---
elements.uranium235 = {
    color: "#6faa3d", // Classic green uranium
    behavior: behaviors.SOLID,
    category: "Energy",
    state: "solid",
    density: 19050,
    conduct: 0.05,
    reactions: {
        "neutron": {
            chance: 1,
            func: function(pixel, otherPixel) {
                // Remove incoming neutron
                deletePixel(otherPixel.x, otherPixel.y);
 
                // Simulate heat
                pixel.temp += 200 + Math.random() * 100;
 
                // Optional: transform uranium
                changePixel(pixel, "lead");
 
                // Emit 2–3 new neutrons
                let count = Math.floor(Math.random() * 2) + 2;
                for (let i = 0; i < count; i++) {
                    let dx = Math.floor(Math.random() * 3) - 1;
                    let dy = Math.floor(Math.random() * 3) - 1;
                    let x = pixel.x + dx;
                    let y = pixel.y + dy;
                    if (!isEmpty(x, y)) continue;
                    createPixel("neutron", x, y);
                }
            }
        }
    }
};
 
// --- Add to existing neutron, don't replace it ---
if (elements.neutron) {
    // Extend tick behavior
    let oldTick = elements.neutron.tick;
    elements.neutron.tick = function(pixel) {
        // Preserve old tick behavior
        if (oldTick) oldTick(pixel);
 
        // Lifespan decay (500 ticks)
        if (!pixel._ticks) pixel._ticks = 0;
        pixel._ticks++;
        if (pixel._ticks > 500) {
            deletePixel(pixel.x, pixel.y);
        }
    };
 
    // Let neutron pass slower through water
    elements.neutron.customTick = function(pixel) {
        let dirs = [[0,1],[0,-1],[1,0],[-1,0]];
        for (let dir of dirs) {
            let x = pixel.x + dir[0];
            let y = pixel.y + dir[1];
            let other = pixelMap[x]?.[y];
            if (other && other.element === "water" && Math.random() < 0.2) {
                return; // Skip tick 20% of the time near water
            }
        }
    };
}
 
// --- Boron absorbs neutrons ---
elements.boron = {
    color: "#dcdcdc", // Light gray boron
    behavior: behaviors.SOLID,
    category: "Solids",
    state: "solid",
    density: 2460,
    reactions: {
        "neutron": {
            chance: 1,
            func: function(pixel, otherPixel) {
                deletePixel(otherPixel.x, otherPixel.y);
                pixel.temp += 5;
            }
        }
    }
};
 
