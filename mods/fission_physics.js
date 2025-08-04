// Basic Fission Mod for Sandboxels
// Simulates simplified nuclear fission with uranium-235, neutrons, and boron control rods.
 
// Uranium-235: emits 2-3 neutrons when hit by a neutron, heats up, no byproducts. this is by senseiollie. the creator
elements.uranium235 = {
    color: "#4a7023", // dark green (uranium oxide green)
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
 
                // Increase heat
                pixel.temp += 200 + Math.random() * 100;
 
                // Emit 2-3 new neutrons nearby
                let count = Math.floor(Math.random() * 2) + 2;
                for(let i = 0; i < count; i++) {
                    let x = pixel.x + Math.floor(Math.random() * 3) - 1;
                    let y = pixel.y + Math.floor(Math.random() * 3) - 1;
                    if(!isEmpty(x, y)) continue;
                    createPixel("neutron", x, y);
                }
            }
        }
    }
};
 
// Neutron particle: moves around and disappears after 500 ticks.
elements.neutron = {
    color: "#dcdcdc", // light gray / off-white
    behavior: [
        "M2|M1|M2",
        "M1|DL|M1",
        "M2|M1|M2"
    ],
    category: "Energy",
    state: "gas",
    density: 0.001,
    temp: 20,
    tick: function(pixel) {
        pixel._neutronLife = (pixel._neutronLife || 0) + 1;
        if(pixel._neutronLife > 500) {
            deletePixel(pixel.x, pixel.y);
        }
    }
};
 
// Boron: solid that absorbs neutrons and heats up slightly.
elements.boron = {
    color: "#f5f0a1", // pale yellow
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
 
// Slow neutrons and some particles passing through water by 20%.
const slowThroughWater = ["neutron", "proton", "photon"];
for(let elem of slowThroughWater) {
    if(elements[elem]) {
        elements[elem].customTick = function(pixel) {
            let waterNearby = false;
            let dirs = [[0,1],[0,-1],[1,0],[-1,0]];
            for(let dir of dirs) {
                let x = pixel.x + dir[0];
                let y = pixel.y + dir[1];
                let other = pixelMap[x]?.[y];
                if(other && other.element === "water") {
                    waterNearby = true;
                    break;
                }
            }
            if(waterNearby && Math.random() < 0.2) {
                // Skip tick to slow particle
                return;
            }
        }
    }
} 
 
