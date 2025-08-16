// ====== NUCLEAR MOD - v3.0 - WITH IMPROVED RADIATION SYSTEM ======
// Advanced nuclear mod with realistic radiation spread and material weakening

function irradiateNearby(pixel, radius = 1, intensity = 1) {
    // List of elements to explicitly exclude
    const excludedElements = new Set([
        "deuterium",
        "tritium",
        "fusion_reactor_core",
        "uranium",
        "enriched_uranium",
        "uranium_depleted",
        "plutonium",
        "nuclear_waste_mixed",
        "nuclear_waste_pu",
        "minor_actinides",
        "fission_products",
    ]);

    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            if (dx === 0 && dy === 0) continue;
            let nx = pixel.x + dx;
            let ny = pixel.y + dy;
            let p = getPixel(nx, ny);
            if (
                p &&
                !elements[p.element].radioactive &&      // not radioactive
                !elements[p.element].shielding &&        // not shielded
                !excludedElements.has(p.element) &&      // not in excluded list
                !elements[p.element].antiRadiation &&    // not anti-radiation
                Math.random() < 0.1 * intensity
            ) {
                p.temp += 15 * intensity;
                p.irradiated = (p.irradiated || 0) + intensity;
                if (p.irradiated > 10 && Math.random() < 0.2) {
                    changePixel(p, "irradiated_matter");
                }
            }
        }
    }
}

// Irradiated matter (weakened)
elements.irradiated_matter = {
    color: "#777733",
    behavior: behaviors.POWDER,
    category: "nuclear",
    tempHigh: 400,
    state: "solid",
    density: 900,
    burn: 80,
    burnTime: 250,
    hardness: 5
};

elements.uranium = {
    color: "#4a5d23",
    behavior: behaviors.POWDER,
    tempHigh: 1132,
    state: "solid",
    category: "nuclear",
    density: 19050,
    radioactive: true,
    radioactivity: 0.3,
    tick(pixel) {
        irradiateNearby(pixel, 1, 0.3);
    }
};

elements.enriched_uranium = {
    color: "#556b2f",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "nuclear",
    density: 19050,
    radioactive: true,
    radioactivity: 1.0,
    fissionable: true,
    fissionTemp: 1200,
    fissionEnergy: 140,
    tick(pixel) {
        irradiateNearby(pixel, 1, 1.0);

        // Check for neutron contact
        let neighbors = [
            getPixel(pixel.x + 1, pixel.y),
            getPixel(pixel.x - 1, pixel.y),
            getPixel(pixel.x, pixel.y + 1),
            getPixel(pixel.x, pixel.y - 1)
        ];
        if (neighbors.some(p => p && p.element === "neutron")) {
            pixel.temp += 2000; // Strong heating
        }

        if (!pixel.fissionCooldown) pixel.fissionCooldown = 0;
        if (pixel.temp > this.fissionTemp && Math.random() < 0.002 && pixel.fissionCooldown <= 0) {
            explodeAt(pixel.x, pixel.y, this.fissionEnergy);
            nuclearIrradiateRay(pixel.x, pixel.y, 8); // Nuclear irradiation ray
            changePixel(pixel, "uranium_depleted");
            if (Math.random() < 0.3) {
                createPixel("nuclear_waste_mixed", pixel.x + 1, pixel.y);
            }
            pixel.fissionCooldown = 60;
        } else {
            pixel.fissionCooldown = Math.max(0, pixel.fissionCooldown - 1);
        }
    }
};

elements.uranium_depleted = {
    color: "#6d7265",
    behavior: behaviors.POWDER,
    tempHigh: 1132,
    state: "solid",
    category: "nuclear",
    density: 18900,
    radioactive: true,
    radioactivity: 0.05,
    tick(pixel) {
        irradiateNearby(pixel, 1, 0.05);
    }
};

elements.plutonium = {
    color: "#4e3629",
    behavior: behaviors.POWDER,
    state: "solid",
    category: "nuclear",
    density: 19800,
    radioactive: true,
    radioactivity: 0.8,
    fissionable: true,
    fissionTemp: 800,
    fissionEnergy: 110,
    tick(pixel) {
        irradiateNearby(pixel, 1, 0.8);

        // Check for neutron contact
        let neighbors = [
            getPixel(pixel.x + 1, pixel.y),
            getPixel(pixel.x - 1, pixel.y),
            getPixel(pixel.x, pixel.y + 1),
            getPixel(pixel.x, pixel.y - 1)
        ];
        if (neighbors.some(p => p && p.element === "neutron")) {
            pixel.temp += 2000; // Strong heating
        }

        if (!pixel.fissionCooldown) pixel.fissionCooldown = 0;
        if (pixel.temp > this.fissionTemp && Math.random() < 0.003 && pixel.fissionCooldown <= 0) {
            explodeAt(pixel.x, pixel.y, this.fissionEnergy);
            nuclearIrradiateRay(pixel.x, pixel.y, 8); // Nuclear irradiation ray
            changePixel(pixel, "nuclear_waste_pu");
            pixel.fissionCooldown = 60;
        } else {
            pixel.fissionCooldown = Math.max(0, pixel.fissionCooldown - 1);
        }
    }
};

// Mixed nuclear waste
elements.nuclear_waste_mixed = {
    color: "#6b5d6e",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    category: "nuclear",
    density: 21000,
    radioactive: true,
    radioactivity: 0.5
};

// Plutonium waste
elements.nuclear_waste_pu = {
    color: "#5b4d5e",
    behavior: behaviors.STURDYPOWDER,
    state: "solid",
    category: "nuclear",
    density: 22000,
    radioactive: true,
    radioactivity: 0.6
};

elements.minor_actinides = {
    color: "#493d3d",
    behavior: behaviors.POWDER,
    category: "nuclear",
    state: "solid",
    density: 19500,
    radioactive: true,
    radioactivity: 0.4
};

elements.fission_products = {
    color: "#7c6d7d",
    behavior: behaviors.STURDYPOWDER,
    category: "nuclear",
    state: "solid",
    density: 18000,
    radioactive: true,
    radioactivity: 0.3
};

// Lead shield
elements.lead_shield = {
    color: "#5c5c5c",
    behavior: behaviors.WALL,
    category: "nuclear",
    density: 11340,
    conduct: 0.01,
    shielding: true,
    insulate: true
};

// Concrete containment
elements.concrete = {
    color: "#a9a9a9",
    behavior: behaviors.WALL,
    category: "nuclear",
    state: "solid",
    density: 2400,
    shielding: true
};

elements.deuterium = {
    color: "#aaffff",
    behavior: behaviors.LIQUID,
    category: "nuclear",
    state: "liquid",
    density: 150
};

elements.tritium = {
    color: "#88ddee",
    behavior: behaviors.LIQUID,
    category: "nuclear",
    state: "liquid",
    density: 180,
    radioactive: true,
    radioactivity: 0.7,
    tick(pixel) {
        irradiateNearby(pixel, 1, 0.7);
    }
};

// Fusion reactor core
elements.fusion_reactor_core = {
    color: "#ff4400",
    behavior: behaviors.WALL,
    category: "nuclear",
    tick: function(pixel) {
        let n = [
            getPixel(pixel.x + 1, pixel.y),
            getPixel(pixel.x - 1, pixel.y),
            getPixel(pixel.x, pixel.y + 1),
            getPixel(pixel.x, pixel.y - 1)
        ];
        let hasD = n.some(p => p && p.element === "deuterium");
        let hasT = n.some(p => p && p.element === "tritium");

        if (hasD && hasT && pixel.temp > 3000) {
            explodeAt(pixel.x, pixel.y, 222);
            nuclearIrradiateRay(pixel.x, pixel.y, 10); // Stronger irradiation for fusion
            pixel.temp += 3000;
            for (let i = 0; i < 4; i++) {
                let dx = pixel.x + (Math.floor(Math.random() * 3) - 1);
                let dy = pixel.y + (Math.floor(Math.random() * 3) - 1);
                if (isEmpty(dx, dy)) createPixel("plasma", dx, dy);
            }
        }
    }
};

elements.plasma = {
    color: "#ff00ff",
    behavior: behaviors.GAS,
    category: "energy",
    state: "gas",
    temp: 1e7,
    density: 0.1
};

function nuclearIrradiateRay(x, y, radius = 20) {
    // List of particle elements to ignore
    const ignore = new Set([
        "neutron", "photon", "electron", "proton", "muon", "tau", "positron", "plasma"
    ]);
    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist > radius) continue;
            let px = x + dx;
            let py = y + dy;
            let p = getPixel(px, py);
            if (p && !ignore.has(p.element) && p.element !== "irradiated_matter") {
                changePixel(p, "irradiated_matter");
            }
        }
    }
}