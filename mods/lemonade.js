elements.lemonade = {
color: "#FFEA00",
behavior: behaviors.LIQUID,
category: "liquids",
isFood: true,
state: "solid",
}

elements.head.reactions["lemonade"] = {elem2: null}
elements.head.reactions["lemons"] = {elem2: null}
elements.head.reactions["lemon_juice"] = {elem2: null}
elements.head.reactions["false_lemons"] = {elem2: "armageddon"}

elements.lemon_juice = {
color: "#FFFF00",
behavior: behaviors.LIQUID,
category: "liquids",
state: "solid",
reactions: {
		"sugar_water": { elem1: null, elem2: "lemonade" },
	}
};

elements.lemons = {
    
	color: "#8B8000",
	behavior: behaviors.POWDER,
	category: "food",
	state: "solid",
breakInto: "lemon_juice"

};
elements.false_lemons = {
    color: "#8B8000",
    behavior: behaviors.POWDER,
    category: "special",
    state: "solid",
    breakInto: "armageddon"
};
elements.lemon_tree = {
    category: "life",
    color: "#a0522d",
    tick: function(tick) {
        if (!pixel.burning) {
            if (!pixel.lc) { pixel.lc = "#8B8000" }
            if (!pixel.wc) { pixel.wc = "#a0522d" }
            if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.02) {
                if (Math.random() < 0.5) {
                    createPixel("lemons",pixel.x-1,pixel.y-1);
                    pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.lc);
                }
            }
        }
    }
}
elements.false_lemon_tree = {
    category: "life",
    color: "#a0522d",
    tick: function(tick) {
        if (!pixel.burning) {
            if (!pixel.lc) { pixel.lc = "#8B8000" }
            if (!pixel.wc) { pixel.wc = "#a0522d" }
            if (isEmpty(pixel.x-1,pixel.y-1) && Math.random() < 0.02) {
                if (Math.random() < 0.5) {
                    createPixel("false_lemons",pixel.x-1,pixel.y-1);
                    pixelMap[pixel.x-1][pixel.y-1].color = pixelColorPick(pixelMap[pixel.x-1][pixel.y-1], pixel.lc);
                }
            }
        }
    }
}
