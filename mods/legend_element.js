elements.liquid_legend = {
color: "#13d644",			
behavior: [
"XX|XX|XX",
"M2|EX:15>radon,radon,radon,liquid_legend%0.4 AND DL%0.2|M2",
"M1|M1|M1",

			],

			temp: 300,

			category: "energy liquids",

			state: "liquid",

			density: 2000,

			excludeRandom: true,
    
reactions: {

        "magma": { "elem1": "armageddon", "elem2": null },
        "void": { "elem1": "light", "elm2": null },
    }
runAfterLoad(function() {
        if(enabledMods.includes("bananas.js")) {
           elements.banana_juice = {
           color: "#e0f542",
           temp: 800,

			category: "food",

			state: "liquid",

			density: 200,

			excludeRandom: true,

     }
                 
});
