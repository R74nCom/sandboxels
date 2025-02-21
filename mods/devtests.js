elements.rad_fluid = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 1500,
    state: "liquid",
    emit: true
}
elements.rad_fluid.color = elements.radiation.color;
elements.rad_fluid.reactions = elements.radiation.reactions;

elements.time_reverse = {
    color: "#ffffff",
    perTick: function() {
        pixelTicks -= 2;
    },
    rotatable: true,
    category: "special",
    canPlace: false,
}

elements.steam_train = {
    color: "#DFDFDF",
    behavior: [
        "XX|CR:smoke|XX",
        "BO AND M1|XX|CR:smoke",
        "XX|CR:smoke|XX"
    ],
    category: "gases",
    density: 99999,
    state: "gas",
}

elements.polish = {
    color: "#aba593",
    tool: function(pixel) {
        if (elements.polish.reactions[pixel.element] && Math.random()<0.25) {
            var r = elements.polish.reactions[pixel.element];
            var color2 = r.color2;
            if (color2 !== undefined) {
                if (Array.isArray(color2)) { color2 = color2[Math.floor(Math.random()*color2.length)]; }
                var rgb = hexToRGB(color2);
                pixel.color = "rgb("+rgb.r+","+rgb.g+","+rgb.b+")";
            }
        }
    },
    behavior: [
        "M2|M1|M2",
        "M1|DL%10|M1",
        "M2|M1|M2"
    ],
    reactions: {
        "wood": { color2:"#872b00" },
        "glass": { color2:"#526158" },
    },
    burn: 100,
    burnTime: 2,
    state: "gas",
    canPlace: true,
    category: "gases",
    stain: -0.5
}

window.addEventListener("load", function() {
    eLists.FOOD = [];
    for (var element in elements) {
        if (elements[element].isFood) {
            eLists.FOOD.push(element);
        }
    }
})

elements.food = {
    color: ["#359100","#74b332","#b9d461","#dede7a"],
    tick: function(pixel) { 
        // Choose randomly from eLists.SEEDS
        changePixel(pixel,eLists.FOOD[Math.floor(Math.random()*eLists.FOOD.length)]);
    },
    category: "food"
}

elements.liquid = {
    behavior: [
        "XX|XX|XX",
        "M2|XX|M2",
        "M1|M1|M1"
    ],
    category: "special"
}
elements.gas = {
    behavior: [
        "M1|M1|M1",
        "M1|XX|M1",
        "M1|M1|M1"
    ],
    state: "gas",
    category: "special"
}
elements.liquid_gas = {
    behavior: [
        "M1%25|M1%25|M1%25",
        "M2|XX|M2",
        "M1|M1|M1"
    ],
    state: "gas",
    category: "special"
}
elements.big_behavior = {
    behavior: [
        "CR:wood|CR:wood|CR:wood|CR:wood|CR:wood",
        "CR:wood|XX|XX|XX|CR:wood",
        "CR:wood|XX|XX|XX|CR:wood",
        "CR:wood|XX|XX|XX|CR:wood",
        "CR:wood|CR:wood|CR:wood|CR:wood|CR:wood",
    ],
    category: "special"
}
/*
elements.small_behavior = {
    behavior: [
        "CR:wood|CR:wood|CH:wood|CR:wood|CR:wood"
    ],
    category: "special"
}
elements.big_behavior_del = {
    behavior: [
        "CR:wood|CR:wood|CR:wood|CR:wood|CR:wood",
        "CR:wood|XX|XX|XX|CR:wood",
        "CR:wood|XX|DL|XX|CR:wood",
        "CR:wood|XX|XX|XX|CR:wood",
        "CR:wood|CR:wood|CR:wood|CR:wood|CR:wood",
    ],
    category: "special"
}
elements.odd_behavior = {
    behavior: [
        "CR:wood|CR:wood|CR:wood|CR:wood",
        "CR:wood|XX|XX|CR:wood",
        "CR:wood|XX|XX|CR:wood",
        "CR:wood|CR:wood|CR:wood|CR:wood",
    ],
    category: "special"
}
elements.big_sponge = {
    behavior: [
        "DL:water|DL:water|DL:water|DL:water|DL:water",
        "DL:water|DL:water|DL:water|DL:water|DL:water",
        "DL:water|DL:water|XX|DL:water|DL:water",
        "DL:water|DL:water|DL:water|DL:water|DL:water",
        "DL:water|DL:water|DL:water|DL:water|DL:water",
    ],
    category: "special"
}
*/

elements.flipbook = {
    tick: function(pixel) {
        if (pixel.frame === undefined) {
            pixel.frame = 0;
            pixel.color = "#ffffff"
        }
        pixel["frame"+pixel.frame] = pixel.color;
        pixel.frame = (pixel.frame+1)%(pixel.frames || 10);
        pixel.color = pixel["frame"+pixel.frame] || "#ffffff";
    },
    category: "special"
}

elements.clone_fluid = {
    color: ["#d9d943","#c3c33a"],
    tick: function(pixel) {
        behaviors.LIQUID(pixel);
        // loop through adjacentCoords
        for (var i=0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i];
            var x = pixel.x + coords[0];
            var y = pixel.y + coords[1];
            if (!isEmpty(x,y,true) && pixelMap[x][y].element !== "clone_fluid") {
                changePixel(pixel,pixelMap[x][y].element);
            }
        }
    },
    category: "machines",
    state: "liquid",
    density: 1000
}

// elements.tester = {
//     behavior: [
//         "SM%5 AND MX|SM%5 AND MX|SM%5 AND MX",
//         "SM%5 AND MX|XX|SM%5 AND MX",
//         "SM%5 AND MX|SM%5 AND MX|SM%5 AND MX",
//     ],
//     category: "special"
// }

addCanvasLayer("devtests");
addCanvasLayer("devtests2");
canvasLayersPre.unshift(canvasLayers["devtests"]);
devtestsCtx = canvasLayers["devtests"].getContext("2d");
devtestsCtx2 = canvasLayers["devtests2"].getContext("2d");
delete canvasLayers.devtests;
delete canvasLayers.devtests2;

viewInfo[9] = { // Blur
    name: "blur",
    pixel: viewInfo[1].pixel,
    post: function(ctx) {
        devtestsCtx.canvas.width = ctx.canvas.width;
        devtestsCtx.canvas.height = ctx.canvas.height;
        devtestsCtx.filter = "blur(80px)";
        // Draw the blurred content on the canvas
        devtestsCtx.drawImage(canvasLayers["pixels"], 0, 0);
        devtestsCtx.filter = "none";
    },
};

elements.fire.emit = true;
elements.lightning.emit = 15;
elements.electric.emit = true;
elements.plasma.emit = true;
elements.uranium.emit = 3;
elements.uranium.emitColor = "#009800";
elements.rainbow.emit = true;
elements.static.emit = true;
elements.flash.emit = true;
elements.cold_fire.emit = true;
elements.blaster.emit = true;
elements.ember.emit = true;
elements.fw_ember.emit = 10;
elements.bless.emit = true;
elements.pop.emit = true;
elements.explosion.emit = true;
elements.n_explosion.emit = 10;
elements.supernova.emit = 20;
elements.midas_touch.emit = true;
elements.fireball.emit = true;

elements.sun.emit = 15;
elements.light.emit = 3;
elements.liquid_light.emit = true;
elements.laser.emit = 3;
elements.neutron.emit = 3;
elements.proton.emit = 3;
elements.radiation.emit = 3;
elements.fallout.emit = 3;
elements.rad_steam.emit = 2;
elements.rad_steam.emitColor = "#6ad48c";
elements.rad_cloud.emit = 2;
elements.rad_cloud.emitColor = "#009800";
elements.rad_glass.emit = 2;
elements.rad_glass.emitColor = "#009800";
elements.rad_shard.emit = 2;
elements.rad_shard.emitColor = "#009800";
elements.malware.emit = 2;
elements.border.emit = 2;

viewInfo[8] = { // Blur Glow (Emissive pixels only)
    name: "blurglow",
    pixel: viewInfo[1].pixel,
    effects: true,
    colorEffects: true,
    pre: function(ctx) {
        devtestsCtx2.canvas.width = ctx.canvas.width;
        devtestsCtx2.canvas.height = ctx.canvas.height;
    },
    pixel: viewInfo[1].pixel,
    post: function(ctx) {
        devtestsCtx.canvas.width = ctx.canvas.width;
        devtestsCtx.canvas.height = ctx.canvas.height;
        devtestsCtx.filter = "blur(30px)";
        // Draw the blurred content on the canvas
        devtestsCtx.drawImage(devtestsCtx2.canvas, 0, 0);
        devtestsCtx.filter = "none";
    },
};

// viewInfo[7] = { // Pixelized Glow (Emissive pixels only)
//     name: "pixelglow",
//     pixel: viewInfo[1].pixel,
//     effects: true,
//     colorEffects: true,
//     pre: function(ctx) {
//         devtestsCtx2.canvas.width = width;
//         devtestsCtx2.canvas.height = height;
//         devtestsCtx.canvas.width = ctx.canvas.width;
//         devtestsCtx.canvas.height = ctx.canvas.height;
//         if (devtestsCtx.msImageSmoothingEnabled !== false) {
//             devtestsCtx.msImageSmoothingEnabled = false;
//             devtestsCtx.mozImageSmoothingEnabled = false;
//             devtestsCtx.webkitImageSmoothingEnabled = false;
//             devtestsCtx.imageSmoothingEnabled = false;
//         }
//     },
//     pixel: viewInfo[1].pixel,
//     post: function(ctx) {
//         // devtestsCtx.canvas.width = ctx.canvas.width;
//         // devtestsCtx.canvas.height = ctx.canvas.height;
//         // devtestsCtx.filter = "blur(30px)";
//         // Draw the blurred content on the canvas
//         devtestsCtx.filter = "blur(30px)";
//         devtestsCtx.drawImage(devtestsCtx2.canvas, 0, 0, width, height, 0, 0, devtestsCtx.canvas.width, devtestsCtx.canvas.height);
//         devtestsCtx.filter = "none";
//         devtestsCtx.drawImage(devtestsCtx.canvas, 0, 0, devtestsCtx.canvas.width, devtestsCtx.canvas.height, 0, 0, devtestsCtx.canvas.width, devtestsCtx.canvas.height);
//     },
// };

renderEachPixel(function(pixel,ctx) {
    if (view === 8) {
        if (elements[pixel.element].emit || pixel.emit || (elements[pixel.element].colorOn && pixel.charge)) {
            let a = (settings.textures !== 0) ? pixel.alpha : undefined;
            let d = elements[pixel.element].emit||true;
            if (d === true) d = 5;
            let r = Math.floor(d/2);
            drawSquare(devtestsCtx2,elements[pixel.element].emitColor||pixel.color,pixel.x-r,pixel.y-r,d,a);
            // viewInfo[1].pixel(pixel,devtestsCtx2);
        }
        if (pixel.charge && !elements[pixel.element].colorOn) {
            drawSquare(devtestsCtx2,"#ffff00",pixel.x-1,pixel.y-1,3);
        }
    }
    // else if (view === 7) {
    //     let a = (settings.textures !== 0) ? pixel.alpha : undefined;
    //     let d = elements[pixel.element].emit||true;
    //     if (d === true) d = 5;
    //     let r = Math.floor(d/2);
    //     devtestsCtx2.fillStyle = pixel.color;
    //     if (devtestsCtx2.globalAlpha !== a) { devtestsCtx2.globalAlpha = a; }
    //     devtestsCtx2.fillRect(pixel.x-r, pixel.y-r, d, d);
    // }
})
