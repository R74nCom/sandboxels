runAfterLoad(function() {
    console.log("Liquefier Mod loaded!")
    console.log("Created by Hitochi — turns elements into liquid forms.")
})

elements.liquefier = {
    color: "#33ccff",
    behavior: behaviors.POWDER, // sits in place
    category: "machines",
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

            // Define the liquid version if missing
            if (!elements[liquidName]) {
                let baseColor = elements[target.element]?.color || "#654321";
                if (Array.isArray(baseColor)) baseColor = baseColor[0];

                // check if original is food
                const isEdible =
                    elements[target.element]?.isFood === true ||
                    elements[target.element]?.category === "food";

                elements[liquidName] = {
                    color: [baseColor, "#3399ff"], // tinted version
                    behavior: behaviors.LIQUID,
                    category: "liquids",
                    state: "liquid",
                    density: 1050,
                    viscosity: 8,
                    isFood: isEdible, // only food is edible
                    desc: "Liquefied form of " + target.element
                };
            }

            // Turn neighbor into its liquid version
            changePixel(target, liquidName);
        }
    },
    desc: "Liquefies nearby pixels into their liquid versions. Food becomes drinkable."
};
