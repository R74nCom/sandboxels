// AnonymousWorldgenLibrary.js \\
// A useful mod that provides a function to generate terrain when placing an element, could not be used a lot but can be useful \\



    function generateWorld(pixel, layers = [], startX = -500, endX = 500, baseY = 82) {
    deletePixel(pixel.x, pixel.y); // Deletes the pixel that triggered the generation
    for (let x = startX; x <= endX; x++) {
        layers.forEach((layer, layerIndex) => {
            const y = baseY - layerIndex; // Each layer is placed one row above the previous

            // Check if the spot is empty and passes the chance check
            if (Math.random() < layer.chance) {
                tryCreate(layer.element, x, y); // Creates the pixel
            }
        });
    }
    selectElement(null);
}


// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//  generateWorld Function Reference:
// pixel: The generateWorld function is used in onPlace(pixel), the reason of including pixel is to delete it.
// layers: An array of layer objects like this:
//         [{element: "yourElement", chance: 0.5}, {...}, ...]
//         Each layer is placed one row above the previous.
//         'chance' must be between 0 and 1 — higher means more likely to generate.
// startX / endX: Horizontal range to generate across. Default is -500 to 500.
// baseY: Vertical starting point for the bottom layer. Default is 82 (bottom of medium canvas).
//
//  Tip: To insert empty space between layers, use an empty object: {}
// Example: [layer1, {}, layer3] will skip one row between layer1 and layer3.
// Fact: The index 0 layer will be placed at the baseY, and the index 1 layer will be placed in baseY - 1, so when looking at the code, it looks upside down.
// Note: If someone is using tinier or bigger canvas size then this may not work as needed, you should make a case for each canvas size
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


// Example usage of generateWorld
elements.generateWorldExample = {
    color: "#808080",
    category: "World Generator",
    onPlace: (pixel) => {
        generateWorld(pixel, [
            {element: "dirt", chance: 0.65},
            {element: "dirt", chance: 0.65},
            {element: "dirt", chance: 0.65},
            {element: "dirt", chance: 0.65},
            {element: Math.random() < 0.1 ? "grass_seed" : "grass", chance: 0.6},
            {}/* Space between grass/grass_seed and sapling */,
            {element: "sapling", chance: 1 / 6}
        ]);
    },
    maxSize: 1
};
