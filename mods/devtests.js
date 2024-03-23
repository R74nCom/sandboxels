elements.rad_fluid = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    density: 1500,
    state: "liquid",
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
        "XX|CR:smoke|XX",
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
        "M2|M1|M2",
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
        "M1|M1|M1",
    ],
    category: "special"
}
elements.gas = {
    behavior: [
        "M1|M1|M1",
        "M1|XX|M1",
        "M1|M1|M1",
    ],
    state: "gas",
    category: "special"
}
elements.liquid_gas = {
    behavior: [
        "M1%25|M1%25|M1%25",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
    state: "gas",
    category: "special"
}
