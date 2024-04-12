// Define a function to add smaller clothes for the human character
function addHumanClothes() {
    // Use Sandboxels API to add clothes for the human character
    Sandboxels.addClothes({
        name: "Human Shirt",
        type: "shirt",
        width: 0.5, // Half the width of regular pixels
        height: 1,  // Same height as regular pixels
        color: "blue",
        style: "plain"
    });

    Sandboxels.addClothes({
        name: "Human Pants",
        type: "pants",
        width: 0.5, // Half the width of regular pixels
        height: 1,  // Same height as regular pixels
        color: "black",
        style: "jeans"
    });

    Sandboxels.addClothes({
        name: "Human Dress",
        type: "dress",
        width: 0.5, // Half the width of regular pixels
        height: 1,  // Same height as regular pixels
        color: "red",
        style: "casual"
    });

    Sandboxels.addClothes({
        name: "Human Jacket",
        type: "jacket",
        width: 0.5, // Half the width of regular pixels
        height: 1,  // Same height as regular pixels
        color: "green",
        style: "hoodie"
    });

    Sandboxels.addClothes({
        name: "Human Skirt",
        type: "skirt",
        width: 0.5, // Half the width of regular pixels
        height: 1,  // Same height as regular pixels
        color: "pink",
        style: "floral"
    });

    Sandboxels.addClothes({
        name: "Human T-Shirt",
        type: "t-shirt",
        width: 0.5, // Half the width of regular pixels
        height: 1,  // Same height as regular pixels
        color: "yellow",
        style: "graphic"
    });

    // Add more clothes as needed
}

// Define a function to add costumes for the human character
function addHumanCostumes() {
    // Use Sandboxels API to add costumes for the human character
    Sandboxels.addCostume({
        name: "Pirate Costume",
        parts: ["pirate_hat", "pirate_coat"],
        description: "Sail the high seas in style"
    });

    Sandboxels.addCostume({
        name: "Superhero Costume",
        parts: ["cape", "mask", "suit"],
        description: "Save the world from villains"
    });

    Sandboxels.addCostume({
        name: "Space Explorer Costume",
        parts: ["helmet", "space_suit"],
        description: "Explore the cosmos"
    });

    Sandboxels.addCostume({
        name: "Wizard Costume",
        parts: ["wizard_hat", "robe"],
        description: "Cast spells and brew potions"
    });

    // Add more costumes as needed
}

// Define a function to add outfits for the human character
function addHumanOutfits() {
    // Use Sandboxels API to add outfits for the human character
    Sandboxels.addOutfit({
        name: "Casual Outfit",
        clothes: ["Human Shirt", "Human Pants"],
        description: "Everyday wear for the modern human"
    });

    Sandboxels.addOutfit({
        name: "Formal Attire",
        clothes: ["Human Dress", "Human Jacket"],
        description: "Dress to impress at special occasions"
    });

    Sandboxels.addOutfit({
        name: "Athletic Wear",
        clothes: ["Human T-Shirt", "Human Pants"],
        description: "Stay active and comfortable"
    });

    Sandboxels.addOutfit({
        name: "Gothic Ensemble",
        clothes: ["Human Shirt", "Human Skirt"],
        description: "Embrace the dark aesthetic"
    });

    // Add more outfits as needed
}

// Define a function to add cute onesies for the human character
function addCuteOnesies() {
    // Use Sandboxels API to add onesies for the human character
    Sandboxels.addOnesie({
        name: "Kawaii Panda Onesie",
        animal: "panda",
        description: "Transform into an adorable panda"
    });

    Sandboxels.addOnesie({
        name: "Magical Unicorn Onesie",
        animal: "unicorn",
        description: "Embrace the magic as a cute unicorn"
    });

    Sandboxels.addOnesie({
        name: "Fluffy Bunny Onesie",
        animal: "bunny",
        description: "Hop around in this fluffy bunny onesie"
    });

    Sandboxels.addOnesie({
        name: "Cuddly Kitten Onesie",
        animal: "kitten",
        description: "Meow in style with this cuddly kitten onesie"
    });

    // Add more cute onesies as needed
}

// Call functions to add clothes, costumes, outfits, and onesies for the human character when the game starts
function startGame() {
    addHumanClothes();
    addHumanCostumes();
    addHumanOutfits();
    addCuteOnesies();
}

// Start the game
startGame();
