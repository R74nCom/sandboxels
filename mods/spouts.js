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

runAfterLoad(function() {
    liquidArray = Object.keys(elements).filter(function(e) {
        return (elements[e].state == "liquid" || elements[e].state == "gas") && elements[e] != "ketchup" && elements[e] != "liquid_cloner" && elements[e] != "fire_cloner";
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
        includeRandom == true ? elements[`${liquidArray[i]}_spout`].excludeRandom = false : elements[`${liquidArray[i]}_spout`].excludeRandom = true;
    };
        if(elements.liquid_cloner) { liquidArray.push("ketchup") };
        if(elements.fire_cloner) { liquidArray.push("fire") };
	liquidArray.push("ketchup");
});
