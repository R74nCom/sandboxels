// by nekonico

isEven = function(num) {
    if (num % 2) {
        return (true)
    }
    else {return (false)}
}

isOdd = function(num) {
    if (num % 1) {
        return (true)
    }
    else {return (false)}
}
elements.flashy_flashbang = {
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
    cooldown: defaultCooldown,
    maxSize: 1,
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
            if ((Math.random() < 0.75 && done) || pixel.alpha < 0.060784314) {
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
    excludeRandom: true,
    cooldown: defaultCooldown,
    maxSize: 1,
}

elements.flashy_nuke = {
    onSelect: function() {
        logMessage("Caution: If you have epilepsy or any similar vision issues, do not place this element for your own safety.");
    },
    color: "#534636",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:65>plasma,plasma,plasma,plasma,radiation,rad_steam,plasma,plasma,plasma,plasma,radiation,rad_steam,plasma,plasma,plasma,plasma,radiation,rad_steam,nuke_flash|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1500,
    excludeRandom: true,
    cooldown: defaultCooldown,
    maxSize: 1,
}

elements.nuke_flash = {
    color: "#ffffff",
    properties: {
        delay: 60
    },
    tick: function(pixel) {
            settings.bg = pixel.color;
            let hex = Math.round(255 * pixel.alpha).toString(16);
            pixel.color = `#${hex}ff${hex}` // credits to therazzler in the R74n discord for this code :3
            var done = true;
            if (pixel.delay) {
                var delayR = pixel.delay % 1;
                var delay = pixel.delay - delayR;
                if (!(pixelTicks - pixel.start > (pixel.delay||1) && Math.random() < 1-delayR)) {
                    done = false;
                }
            }
            if ((Math.random() < 0.75 && done) || pixel.alpha < 0.061) {
                changePixel(pixel, "nuke_overflash")
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
    excludeRandom: true,
    cooldown: defaultCooldown,
    maxSize: 1,
}

elements.nuke_overflash = {
    color: "#00ff00",
    properties: {
        delay: 40
    },
    tick: function(pixel) {
            settings.bg = pixel.color;
            let hex = Math.round(255 * pixel.alpha).toString(16);
            pixel.color = `#00${hex}00` // credits to therazzler in the R74n discord for this code :3
            var done = true;
            if (pixel.delay) {
                var delayR = pixel.delay % 1;
                var delay = pixel.delay - delayR;
                if (!(pixelTicks - pixel.start > (pixel.delay||1) && Math.random() < 1-delayR)) {
                    done = false;
                }
            }
            if ((Math.random() < 0.75 && done) || pixel.alpha < 0.061) {
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
    excludeRandom: true,
    cooldown: defaultCooldown,
    maxSize: 1,
}

elements.flashy_h_bomb = {
    onSelect: function() {
        logMessage("Caution: If you have epilepsy or any similar vision issues, do not place this element for your own safety.");
    },
    color: "#533636",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:90>plasma,plasma,plasma,plasma,fire,plasma,plasma,plasma,plasma,fire,plasma,plasma,plasma,plasma,fire,h_bomb_flash|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1600,
    excludeRandom: true,
    alias: "hydrogen bomb",
    cooldown: defaultCooldown,
    maxSize: 1,
}

elements.h_bomb_flash = {
    color: "#ffffff",
    properties: {
        delay: 30
    },
    tick: function(pixel) {
            settings.bg = pixel.color;
            let hex = Math.round(255 * pixel.alpha).toString(16);
            pixel.color = `#ff${hex}${hex}` // credits to therazzler in the R74n discord for this code :3
            var done = true;
            if (pixel.delay) {
                var delayR = pixel.delay % 1;
                var delay = pixel.delay - delayR;
                if (!(pixelTicks - pixel.start > (pixel.delay||1) && Math.random() < 1-delayR)) {
                    done = false;
                }
            }
            if ((Math.random() < 0.75 && done) || pixel.alpha < 0.061) {
                changePixel(pixel, "h_bomb_overflash")
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
    excludeRandom: true,
    cooldown: defaultCooldown,
    maxSize: 1,
}

elements.h_bomb_overflash = {
    color: "#ff0000",
    properties: {
        delay: 70
    },
    tick: function(pixel) {
            settings.bg = pixel.color;
            let hex = Math.round(255 * pixel.alpha).toString(16);
            pixel.color = `#${hex}0000` // credits to therazzler in the R74n discord for this code :3
            var done = true;
            if (pixel.delay) {
                var delayR = pixel.delay % 1;
                var delay = pixel.delay - delayR;
                if (!(pixelTicks - pixel.start > (pixel.delay||1) && Math.random() < 1-delayR)) {
                    done = false;
                }
            }
            if ((Math.random() < 0.75 && done) || pixel.alpha < 0.061) {
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
    excludeRandom: true,
    cooldown: defaultCooldown,
    maxSize: 1,
}

elements.flashy_firework = {
    color: "#c44f45",
    onSelect: function() {
        logMessage("Caution: If you have epilepsy or any similar vision issues, do not place this element for your own safety.");
    },
    tick: function(pixel) {
        if ((pixel.temp > 1000 || pixel.charge) && !pixel.burning) {
            pixel.burning = true;
            pixel.burnStart = pixelTicks;
        }
        if (pixel.burning) {
            if (!tryMove(pixel, pixel.x, pixel.y-1)) {
                // tryMove again to the top left or top right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y-1);
            }
            if (pixelTicks-pixel.burnStart > 50 && Math.random() < 0.1) {
                if (Math.random() > 0.5) {
                    explodeAt(pixel.x, pixel.y, 10, "fw_flash1");
                }
                else if (Math.random() > 0.5) {
                    explodeAt(pixel.x, pixel.y, 10, "fw_flash2");
                }
                else if (Math.random() > 0.5) {
                    explodeAt(pixel.x, pixel.y, 10, "fw_flash3");
                }
                else {
                    explodeAt(pixel.x, pixel.y, 10, "fw_flash4");
                }
            }
        }
        else {
            if (!tryMove(pixel, pixel.x, pixel.y+1)) {
                // tryMove again to the bottom left or bottom right
                tryMove(pixel, pixel.x+(Math.random() < 0.5 ? -1 : 1), pixel.y+1);
            }
        }
        doDefaults(pixel);
    },
    burn: 90,
    burnTime: 100,
    properties: { burning:false },
    burning: true,
    density: 2000,
    conduct: 1,
    state: "solid",
    category: "weapons"
}

elements.fw_flash1 = {
    properties: {
        delay: 5
    },
    color: ["#ff00ff","#00ffff"],
    behavior: [
        "XX|XX|XX",
        "XX|DL%25|M2",
        "XX|M2|M1",
    ],
    tick: function(pixel) {
        let hex = Math.round(255 * pixel.alpha).toString(16);
        pixel.color = `#00${hex}${hex}`
        settings.bg = pixel.color;
        var done = true;
        if (pixel.delay) {
            var delayR = pixel.delay % 1;
            var delay = pixel.delay - delayR;
            if (!(pixelTicks - pixel.start > (pixel.delay||1) && Math.random() < 1-delayR)) {
                done = false;
            }
        }
        if ((Math.random() < 0.75 && done) || pixel.alpha < 0.062) {
            changePixel(pixel, "smoke")
            settings.bg = "#000000";
        }
        if (pixel.delay) {
            pixel.alpha = Math.max(0,1-(pixelTicks - pixel.start)/pixel.delay)
        }
        doHeat(pixel);

    },
    burning: true,
    burnInto: "ash",
    burnTime: 100,
    fireElement: ["smoke","smoke","smoke","smoke","carbon_dioxide"],
    rotatable: true,
    temp: 649,
    tempLow: 0,
    stateLow: "carbon_dioxide",
    category: "energy",
    hidden: true,
    state: "gas",
    density: 700,
    alias: "flashy firework ember"
}

elements.fw_flash2 = {
    properties: {
        delay: 5
    },
    color: ["#ff00ff","#00ffff"],
    behavior: [
        "XX|XX|XX",
        "XX|DL%25|M2",
        "XX|M2|M1",
    ],
    tick: function(pixel) {
        let hex = Math.round(255 * pixel.alpha).toString(16);
        pixel.color = `#${hex}00${hex}`
        settings.bg = pixel.color;
        var done = true;
        if (pixel.delay) {
            var delayR = pixel.delay % 1;
            var delay = pixel.delay - delayR;
            if (!(pixelTicks - pixel.start > (pixel.delay||1) && Math.random() < 1-delayR)) {
                done = false;
            }
        }
        if ((Math.random() < 0.75 && done) || pixel.alpha < 0.062) {
            changePixel(pixel, "smoke")
            settings.bg = "#000000";
        }
        if (pixel.delay) {
            pixel.alpha = Math.max(0,1-(pixelTicks - pixel.start)/pixel.delay)
        }
        doHeat(pixel);

    },
    burning: true,
    burnInto: "ash",
    burnTime: 100,
    fireElement: ["smoke","smoke","smoke","smoke","carbon_dioxide"],
    rotatable: true,
    temp: 649,
    tempLow: 0,
    stateLow: "carbon_dioxide",
    category: "energy",
    hidden: true,
    state: "gas",
    density: 700,
    alias: "flashy firework ember"
}

elements.fw_flash3 = {
    properties: {
        delay: 5
    },
    color: ["#ff00ff","#00ffff"],
    behavior: [
        "XX|XX|XX",
        "XX|DL%25|M2",
        "XX|M2|M1",
    ],
    tick: function(pixel) {
        let hex = Math.round(255 * pixel.alpha).toString(16);
        pixel.color = `#00${hex}00`
        settings.bg = pixel.color;
        var done = true;
        if (pixel.delay) {
            var delayR = pixel.delay % 1;
            var delay = pixel.delay - delayR;
            if (!(pixelTicks - pixel.start > (pixel.delay||1) && Math.random() < 1-delayR)) {
                done = false;
            }
        }
        if ((Math.random() < 0.75 && done) || pixel.alpha < 0.062) {
            changePixel(pixel, "smoke")
            settings.bg = "#000000";
        }
        if (pixel.delay) {
            pixel.alpha = Math.max(0,1-(pixelTicks - pixel.start)/pixel.delay)
        }
        doHeat(pixel);

    },
    burning: true,
    burnInto: "ash",
    burnTime: 100,
    fireElement: ["smoke","smoke","smoke","smoke","carbon_dioxide"],
    rotatable: true,
    temp: 649,
    tempLow: 0,
    stateLow: "carbon_dioxide",
    category: "energy",
    hidden: true,
    state: "gas",
    density: 700,
    alias: "flashy firework ember"
}

elements.fw_flash4 = {
    properties: {
        delay: 5
    },
    color: "#ff00ff",
    behavior: [
        "XX|XX|XX",
        "XX|DL%25|M2",
        "XX|M2|M1",
    ],
    tick: function(pixel) {
        let hex = Math.round(255 * pixel.alpha).toString(16);
        pixel.color = `#0000${hex}`
        settings.bg = pixel.color;
        var done = true;
        if (pixel.delay) {
            var delayR = pixel.delay % 1;
            var delay = pixel.delay - delayR;
            if (!(pixelTicks - pixel.start > (pixel.delay||1) && Math.random() < 1-delayR)) {
                done = false;
            }
        }
        if ((Math.random() < 0.75 && done) || pixel.alpha < 0.062) {
            changePixel(pixel, "smoke")
            settings.bg = "#000000";
        }
        if (pixel.delay) {
            pixel.alpha = Math.max(0,1-(pixelTicks - pixel.start)/pixel.delay)
        }
        doHeat(pixel);

    },
    burning: true,
    burnInto: "ash",
    burnTime: 100,
    fireElement: ["smoke","smoke","smoke","smoke","carbon_dioxide"],
    rotatable: true,
    temp: 649,
    tempLow: 0,
    stateLow: "carbon_dioxide",
    category: "energy",
    hidden: true,
    state: "gas",
    density: 700,
    alias: "flashy firework ember"
}
