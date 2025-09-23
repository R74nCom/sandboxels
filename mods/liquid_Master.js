if (!elements.categories.custom) {
    elements.categories.custom = "custom";
}

elements.hello_test = {
    color: "#ff00ff",
    behavior: behaviors.POWDER,
    category: "custom",
    state: "solid",
};


// Ensure category exists
if (!elements.categories.special) {
    elements.categories.special = "special";
}

elements.liquefier = {
    color: "#33ccff",
    behavior: behaviors.POWDER, // stays in place better than liquid
    category: "liquids",
    state: "solid",
    density: 2000,
    tick: function(pixel) {
        const dirs = [
            [0,1], [0,-1], [1,0], [-1,0],
            [1,1], [-1,1], [1,-1], [-1,-1]
        ];
        for (const [dx,dy] of dirs) {
            const x = pixel.x+dx;
            const y = pixel.y+dy;
            if (outOfBounds(x,y)) continue;

            const target = pixelMap[x][y];
            if (!target) continue;
            if (target.element === "liquefier") continue;

            const liquidName = target.element + "_liquid";

            // Define the "liquid" version if missing
            if (!elements[liquidName]) {
                let baseColor = elements[target.element]?.color || "#654321";
                if (Array.isArray(baseColor)) baseColor = baseColor[0];

                elements[liquidName] = {
                    color: [baseColor, "#3399ff"], // tint
                    behavior: behaviors.LIQUID,
                    category: "liquids",
                    state: "liquid",
                    density: 1050,
                    viscosity: 8,
                    isFood: elements[target.element]?.isFood || false,
                };
            }

            // Turn neighbor into its liquid version
            changePixel(target, liquidName);
        }
    },
};
