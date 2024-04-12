// Define different spider web-related element types for the second mod
const secondModElementTypes = [
    {
        name: "ThickSpiderWeb",
        color: "#A9A9A9", // Dark gray color for thick spider web
        behavior: behaviors.SOLID, // Thick spider web is a solid element
        category: "entities",
        state: "solid"
    },
    {
        name: "ThinSpiderWeb",
        color: "#D3D3D3", // Light gray color for thin spider web
        behavior: behaviors.SOLID, // Thin spider web is a solid element
        category: "entities",
        state: "solid"
    },
    {
        name: "GooeyWeb",
        color: "#FFD700", // Gold color for gooey web
        behavior: behaviors.LIQUID, // Gooey web behaves like liquid
        viscosity: 12000, // Increased viscosity for stickiness
        density: 1.5, // Increased density for gooey web
        category: "liquids",
        state: "liquid"
    },
    {
        name: "StickyCobweb",
        color: "#DAA520", // Goldenrod color for sticky cobweb
        behavior: behaviors.SOLID, // Sticky cobweb is a solid element
        category: "entities",
        state: "solid"
    },
    {
        name: "SilkThread",
        color: "#FFDAB9", // Peachpuff color for silk thread
        behavior: behaviors.SOLID, // Silk thread is a solid element
        category: "entities",
        state: "solid"
    },
    {
        name: "StretchyWeb",
        color: "#DDA0DD", // Plum color for stretchy web
        behavior: behaviors.LIQUID, // Stretchy web behaves like liquid
        viscosity: 8000, // Adjusted viscosity for stickiness
        density: 1.3, // Adjusted density for stretchy web
        category: "liquids",
        state: "liquid"
    },
    {
        name: "ShimmeringWeb",
        color: "#00CED1", // Dark turquoise color for shimmering web
        behavior: behaviors.SOLID, // Shimmering web is a solid element
        category: "entities",
        state: "solid"
    },
    // Add more spider web-related elements here...
];

// Function to create a spider web-related element
function createSpiderWebElement(x, y, type) {
    if (type.behavior === behaviors.LIQUID) {
        sandboxels.addLiquid(x, y, type.name, type.color, type.viscosity, type.density);
    } else {
        sandboxels.addEntity(x, y, type.name, type.color);
    }
}

// Function to add spider web-related elements to the sandboxels environment
function addSpiderWebElements() {
    secondModElementTypes.forEach(type => {
        createSpiderWebElement(0, 0, type);
    });
}

// Call the function to add spider web-related elements when the script is loaded
addSpiderWebElements();
