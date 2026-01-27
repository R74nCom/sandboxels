elements.neutron.onCollide = function(pixel1, pixel2) {
    if (pixel2.element === "uranium" && Math.random() <= 0.25) {
        pixel2.react = true;
    }
}

elements.uranium.tick = function(pixel) {
    pixel.cd ??= 0;
    pixel.hp ??= 8;
    pixel.energy ??= 0;

    // Cooldown
    if (pixel.cd > 0) {
        pixel.cd--;
        return;
    }

    if (pixel.react) {
        let released = 0;

        // spawn neutrons
        for (let j = 0; j < squareCoordsShuffle.length && released < 3; j++) {
            let c = squareCoordsShuffle[j];
            let nx = pixel.x + c[0];
            let ny = pixel.y + c[1];
            
            if (isEmpty(nx, ny)) {
                createPixel("neutron", nx, ny);
                released++;
                let neutron = getPixel(nx, ny);
                if (neutron && neutron.element === "neutron") {
                    neutron.by = -1;
                }
            }
        }

        // accumulate energy + consume HP
        pixel.energy += released;
        pixel.hp--;

        // depletion condition
        if (pixel.hp <= 0 || pixel.energy >= 20) {
            changePixel(pixel, "lead_powder");
        }

        // reset flags
        pixel.cd = 5;
        pixel.react = false;
    }
}




elements.lead_powder = {
    color: ["#6c6c6a","#838381"],
	behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND SW:uranium%25|M2"
    ],
	tempHigh: 327.5,
    stateHigh: "molten_lead",
	category: "solids",
	density: 11343,
	conduct: 0.41,
	superconductAt: -265.95
}