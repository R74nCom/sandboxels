// by nekonico

elements.true_flashbang = {
    color: "#65665c",
    onSelect: function() {
        logMessage("Caution: If you have epilepsy or any similar vision issues, do not place this element for your own safety.");
    },
    behavior: [
        "XX|EX:20>flashbang_flash%1|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:20>flashbang_flash%1|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
    tempHigh: 1455.5,
    stateHigh: "molten_steel",
    excludeRandom: true,
    cooldown: defaultCooldown
}

elements.flashbang_flash = {
    color: "#ffffff",
    properties: {
        delay: 100
    },
    tick: function(pixel) {
            settings.bg = pixel.color;
            let hex = Math.round(255 * pixel.alpha).toString(16);
            pixel.color = `#${hex}${hex}${hex}` // credits to therazzler in the R74n discord for this code :3
            var done = true;
            if (pixel.delay) {
                var delayR = pixel.delay % 1;
                var delay = pixel.delay - delayR;
                if (!(pixelTicks - pixel.start > (pixel.delay||1) && Math.random() < 1-delayR)) {
                    done = false;
                }
            }
            if ((Math.random() < 0.75 && done) || pixel.alpha < 0.05) {
                deletePixel(pixel.x, pixel.y)
                settings.bg = "#000000";
            }
            if (pixel.delay) {
                pixel.alpha = Math.max(0,1-(pixelTicks - pixel.start)/pixel.delay)
            }
            doHeat(pixel);
    
    },
    category: "energy",
    temp: 40,
    tempLow: -270,
    stateLow: ["liquid_light",null],
    state: "gas",
    category: "energy",
    density: 0.00001,
    ignoreAir: true,
    insulate: true,
    hidden: true,
    noMix: true,
    excludeRandom: true
}