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

elements.hue_paint = {
    color: elements.paint.color,
    tool: (pixel) => {
        let hsl;
        if (pixel.color.match(/^rgb/)) {
            hsl = RGBToHSL(pixel.color.match(/\d+/g));
        }
        if (hsl) {
            let newRGB = hexToRGB(currentColorMap.hue_paint);
            let newHSL = RGBToHSL([newRGB.r,newRGB.g,newRGB.b]);
            hsl[0] = parseFloat(newHSL[0]);
            hsl[1] = parseFloat(hsl[1]);
            if (hsl[1] < 0.05) hsl[1] = 0.1;
            hsl[2] = parseFloat(hsl[2]);
            newRGB = HSLtoRGB(hsl);
            newRGB[0] = Math.floor(newRGB[0]);
            newRGB[1] = Math.floor(newRGB[1]);
            newRGB[2] = Math.floor(newRGB[2]);
            pixel.color = "rgb("+newRGB.join(",")+")";
            delete pixel.origColor;
        }
    },
    category: "special",
    customColor: true,
}