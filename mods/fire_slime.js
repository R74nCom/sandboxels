elements.fire_slime = {
        color: ["#e6683e", "#e37636", "#e38f3b", "#e3b039"],
        behavior: [
            "XX|CR:fire%5|XX",
            "M2|XX|M2",
            "M1%1 AND M2|M1|M1%1 AND M2"
        ],
        reactions: {
            "bomb": { "elem2":"sticky_bomb", "elem2":null },
        },
        tick: function(pixel) {
            if(Math.random() < 0.01) {
                pixel.temp++;
                pixelTempCheck(pixel);
            };
            if(pixel.temp < 700) {
                if(Math.random() < 0.02) {
                    pixel.temp++;
                    pixelTempCheck(pixel);
                };
            };
        },
        viscosity: 3000,
        temp: 700,
        tempHigh: 6000,
        stateHigh: "plasma",
        tempLow: -13,
        stateLow: "suppressed_fire_slime",
        category: "liquids",
        state: "liquid",
        burning: true,
        burnTime: Number.MAX_SAFE_INTEGER,
        burn: 85,
        burnInto: "fire_slime",
        density: 1400,
        stain: 0.05
}

elements.suppressed_fire_slime = {
        color: "#bf6a4e",
        behavior: [
            "XX|CR:smoke%1|XX",
            "M2|XX|M2",
            "M1%0.5 AND M2|M1|M1%0.5 AND M2"
        ],
        reactions: {
            "bomb": { "elem2":"sticky_bomb", "elem2":null },
        },
        tick: function(pixel) {
            if(Math.random() < 0.001) {
                pixel.temp++;
                pixelTempCheck(pixel);
            };
        },
        viscosity: 4000,
        temp: -20,
        tempHigh: -13,
        stateHigh: "fire_slime",
        category: "liquids",
        state: "liquid",
        burning: false,
        burnTime: 1000,
        burn: 1,
        burnInto: "fire_slime",
        density: 1550,
        stain: 0.04,
        hidden: true
}