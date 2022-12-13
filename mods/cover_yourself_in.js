function placeDownwardColumn(element,xx,yy,creationChance) {
	var newElement = element;
	if(Array.isArray(newElement)) {
		newElement = newElement[Math.floor(Math.random() * newElement.length)];
	};
	//console.log("from " + xx + "," + yy)
	if(!outOfBounds(xx,yy)) {
		for(i = yy; i < pixelMap[xx].length; i++) {
			if(isEmpty(xx,i,false)) {
				if(Math.random() < creationChance) {
					createPixel(element,xx,i)
				}
			} else if(!isEmpty(xx,i,true)) {
				var newPixel = pixelMap[xx][i];
				var newElement = newPixel.element;
				var newInfo = elements[newElement];
				var newState = "solid";
				if(typeof(newInfo.state) !== "undefined") {
					newState = newInfo.state
				};
				if(newState !== "solid") {
					continue;
				} else {
					break;
				};
			} else if(outOfBounds(xx,i)) {
				break;
			}; 
		};
	};
};

//cliche'
elements.blood_cloud = {
    color: "#9c3e35",
        behavior: [
            "XX|XX|XX",
            "XX|CH:blood%0.05|M1%2.5 AND BO",
            "XX|XX|XX",
        ],
    category:"gases",
    temp: 30,
    state: "gas",
    density: 0.5,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.02,
},

elements.heavy_blood_cloud = {
    color: "#c22d23",
    behavior: [
        "XX|XX|XX",
        "XX|CH:blood%0.1|M1%2.5 AND BO",
        "XX|CR:blood%0.05|XX",
    ],
    category:"gases",
    temp: 30,
    state: "gas",
    density: 0.7,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.03,
},

elements.heavier_blood_cloud = {
    color: "#b02219",
    behavior: [
        "XX|XX|XX",
        "XX|CH:blood%0.2|M1%2.5 AND BO",
        "XX|CR:blood%0.1|XX",
    ],
    category:"gases",
    temp: 30,
    state: "gas",
    density: 0.9,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.04,
},

elements.heaviest_blood_cloud = {
    color: "#910f07",
    behavior: [
        "XX|XX|XX",
        "XX|CH:blood%0.4|M1%2.5 AND BO",
        "XX|CR:blood%0.2|XX",
    ],
    category:"gases",
    temp: 30,
    state: "gas",
    density: 1.1,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.05,
},

elements.heaviester_blood_cloud = {
    color: "#690600",
    behavior: [
        "XX|XX|XX",
        "XX|CH:blood%0.8|M1%2.5 AND BO",
        "XX|CR:blood%0.4|XX",
    ],
    tick: function(pixel) {
        if(Math.random() < 0.01) {
			placeDownwardColumn("blood",pixel.x,pixel.y+1,0.5);
        }
    },
    category:"gases",
    temp: 30,
    state: "gas",
    density: 1.15,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.06,
},

elements.heaviestest_blood_cloud = {
    color: "#330301",
    behavior: [
        "XX|CR:blood%0.8|XX",
        "CR:blood%0.05|CH:blood%3|CR:blood%0.05 AND M1%2.5 AND BO",
        "XX|CR:blood%0.8|XX",
    ],
    tick: function(pixel) {
        if(Math.random() < 0.02) {
            for(j = -1; j <= 1; j++) {
				placeDownwardColumn("blood",pixel.x+j,pixel.y+1,0.5);
			};
        };
    },
    category:"gases",
    temp: 30,
    state: "gas",
    density: 1.2,
    ignoreAir: true,
    conduct: 0.03,
    stain: 0.07,
}
