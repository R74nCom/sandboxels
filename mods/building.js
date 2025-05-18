// elements.mud_brick = {
//     color: "#8a6249",
//     colorPattern: textures.BRICK,
//     colorKey: {
//         "l": "#986c51",
//         "r": "#8a6249",
//         "d": "#7f5943",
//         "w": "#634933"},
//     behavior: behaviors.WALL,
//     category: "solids",
//     state: "solid",
//     tempHigh: 1200,
//     stateHigh: "molten_dirt",
//     hardness: 0.33,
//     breakInto: "dirt"
// }

var materials = ["brick","concrete","wood","glass","steel"];

elements.tower = {
    color: [],
    behavior: [
        "XX|XX|XX",
        "XX|CH:"+materials.join("_tower,")+"_tower|XX",
        "XX|XX|XX",
    ],
    category: "spawners",
    maxSize: 1,
    cooldown: defaultCooldown,
}

materials.forEach((elem) => {
    if (Array.isArray(elements[elem].color)) {
        elements.tower.color.push(elements[elem].color[0]);
    }
    else {
        elements.tower.color.push(elements[elem].color);
    }
    elements[elem+"_tower"] = {
        color: elements[elem].color,
        behavior: [
            `XX|M2|XX`,
            `XX|C2:${elem}_room|XX`,
            `XX|M1|XX`,
        ],
        maxSize: 1,
        cooldown: defaultCooldown,
        category: "spawners"
    }
    elements[elem+"_room"] = {
        color: elements[elem].color,
        behavior: [
            `XX|XX|CR:${elem}_room,${elem}_room,${elem}_room,${elem}_room,tower_antenna,wood_roof%80|XX|XX`,
            `XX|XX|XX|XX|XX`,
            `CR:${elem}|CR:${elem}|CR:${elem}|CR:${elem}|CR:${elem}`,
            `CR:glass|XX|XX|CR:human%25|CR:glass`,
            `CR:glass|CR:human%25|DL|CR:human%25|CR:glass`,
            `CR:${elem}|XX|XX|XX|CR:${elem}`,
            `CR:${elem}|CR:${elem}|CR:${elem}|CR:${elem}|CR:${elem}`,
            `XX|XX|XX|XX|XX`,
            `XX|XX|XX|XX|XX`
        ],
        maxSize: 1,
        cooldown: defaultCooldown,
        category: "spawners",
        hidden: true
    }
})
elements.tower.color = elements.tower.color.sort();

elements.tower_antenna = {
    color: "#bababa",
    behavior: [
        "CR:steel%30",
        "CR:steel",
        "CR:steel",
        "CR:steel",
        "CH:steel",
        "CR:steel",
        "XX",
        "XX",
        "XX",
        "XX",
    ],
    maxSize: 1,
    cooldown: defaultCooldown,
    category: "spawners",
    hidden: true
}
elements.wood_roof = {
    color: "#965829",
    behavior: [
        "XX|XX|XX|XX|XX|XX|XX",
        "XX|XX|XX|CR:wood|XX|XX|XX",
        "XX|XX|CR:wood|CH:wood|CR:wood|XX|XX",
        "XX|CR:wood|XX|XX|XX|CR:wood|XX",
        "CR:wood|XX|XX|XX|XX|XX|CR:wood",
    ],
    maxSize: 1,
    cooldown: defaultCooldown,
    category: "spawners",
    hidden: true
}



worldgentypes.city = {
    layers: [
        [0.95, "grass"],
        [0.50, "dirt"],
        [0.05, "rock"],
        [0, "basalt"],
    ],
    decor: [ // [element, chance, distance from top]
        ["tower", 0.08],
        // ["bird", 0.025, 10],
    ],
    baseHeight: 0.25
}


currentBuildingElement = "wood";

function buildSelectHandler(r) {
    if (!r) { return; }
    e = r.replace(/ /g, "_");
    es = mostSimilarElement(e);
    if (es) {
        currentBuildingElement = es;
        logMessage("Element \"" + e + "\" selected");
    }
    else {
        currentBuildingElement = "wood";
        logMessage("Element \"" + e + "\" not found");
        selectElement(null);
    }
}

elements.slab = {
    color: "#888888",
    onSelect: () => {
        promptInput("Which element should the slab be?", buildSelectHandler, "Select Material")
    },
    onPlace: (pixel) => {
        pixel.mat = currentBuildingElement;
    },
    renderer: (pixel,ctx) => {
        let color = elements[pixel.mat].color;
        if (Array.isArray(color)) color = color[0];
        if (color) { ctx.fillStyle = color; }
        ctx.fillRect(canvasCoord(pixel.x), canvasCoord(pixel.y+0.5), pixelSize, pixelSize/2);
    },
    category: "solids"
}