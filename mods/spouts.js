runAfterLoad(function() {
    liquidArray = Object.keys(elements).filter(function(e) {
        return (elements[e].state == "liquid" || elements[e].state == "gas") && elements[e] != "ketchup";
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
            excludeRandom: true,
        };
    };
	liquidArray.push("ketchup")
});
