urlParams = new URLSearchParams(window.location.search);

if(urlParams.get('includeRandom') !== null) { //if the variable exists at all
    includeRandom = true
} else { //if it doesn't (and it returns null)
    includeRandom = false
}

function _randomInt(max) {
    if(max >= 0) {
        return Math.floor(Math.random() * (max + 1))
    } else {
        return 0 - Math.floor(Math.random() * (Math.abs(max) + 1))
    }
}

excludedElements = ["ketchup", "liquid_cloner", "fire_cloner"]
includedElements = ["ketchup_spout", "spout", "udder", "torch", "sun"]

runAfterLoad(function() {
    liquidArray = Object.keys(elements).filter(function(e) {
        return (elements[e].state == "liquid" || elements[e].state == "gas") && !excludedElements.includes(elements[e]);
    });
    for(i = 0; i < liquidArray.length; i++) {
        elements[`${liquidArray[i]}_spout`] = {
            color: elements[liquidArray[i]].color,
            behavior: [
                `XX|CR:${liquidArray[i]}|XX`,
                `CR:${liquidArray[i]}|XX|CR:${liquidArray[i]}`,
                `XX|CR:${liquidArray[i]}|X`,
            ],
            category: "spouts",
            temp: elements[liquidArray[i]].temp,
            hardness: 1,
        };
        if(includeRandom) {
			elements[liquidArray[i]].excludeRandom ? elements[`${liquidArray[i]}_spout`].excludeRandom = true : elements[`${liquidArray[i]}_spout`].excludeRandom = false;
		} else {
			elements[`${liquidArray[i]}_spout`].excludeRandom = true;
		};
	};
	spoutChoices = Object.keys(elements).filter(function(e) {
		return elements[e].category == "spouts" || includedElements.includes(elements[e]);
	});
	spoutChoices = spoutChoices.filter(function(e) {
		return !elements[e.slice(0,-6)].excludeRandom;
	});
});

elements.random_spout = {
	color: ["#3e5f8a","#a334ec","#ea96f9","#a6ecf6","#70ebc8","#d9286b","#7eed91","#a18b30"],
	behavior: behaviors.WALL,
	category: "special",
	excludeRandom: true,
	tick: function(pixel) {
		changePixel(pixel,spoutChoices[Math.floor(Math.random() * spoutChoices.length)])
	},
};
