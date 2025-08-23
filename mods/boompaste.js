activated_meltpasteBlacklist = ["activated_meltpaste"]
let v = -1.797693134862315E+308;
let w = v * 1.001;
let x = 1.797693134862315E+308;
let y = x * 1.001;
elements.boompaste = {
    temp: y,
    color: "#008009",
    behavior: behaviors.MOLTEN,
    burn:300,
    category: "Boom",
    state: "solid", 
    burnTime: 10000,
    reactions:{
        "boompaste": { elem1:"boompaste" , elem2: "boompaste"},
        "fire": { elem1: "boompaste" , elem2:"boompaste" },
        "plasma": { elem1: "boompaste" , elem2:"boompaste" },
        "flash":{ elem1: "boompaste" , elem2:"flash" },
        "water":{ elem1: "flash" , elem2:"flash" },
    },
}

//i stole this from the alkest mod (duh) please steal from me -g
elements.meltpaste = {
    density:y,
    temp: y,
    color: "#755858",
    behavior: behaviors.POWDER,
    burn:300,
    category: "Boom",
    state: "solid",
    burnTime: 10000,
    lowtemp:-1,
    lowstate:"plasma",
    tick: function(pixel) {
		for(i = 0; i < adjacentCoords.length; i++) {
			if(Math.random() < 0.1) {
				var pX = pixel.x
				var pY = pixel.y
				var oX = adjacentCoords[i][0];
				var oY = adjacentCoords[i][1];
				var checkPosX = pX+oX;
				var checkPosY = pY+oY;
				if(!isEmpty(checkPosX,checkPosY,true)) {
					var newPixel = pixelMap[checkPosX][checkPosY];
					var newElement = newPixel.element;
					if(!activated_meltpasteBlacklist.includes(newElement)) { //unless someone's willing to implement dragon parts
						if(typeof(pixel[newElement]) === "undefined") {
							pixel[newElement] = 0;
						};
						pixel[newElement]++;
						deletePixel(checkPosX,checkPosY);
					};
				};
			};
		};
	},
}

elements.gasoline = {
    color: "#008000",
    behavior: behaviors.LIQUID,
    category: "Boom",
    state: "liquid",
    burn:300,
    burnTime:999 ,   
}
elements.afterburn = {
    color: "#c8d600",
    behavior: behaviors.LIQUID,
    category: "Boom",
    state: "liquid",
    burn:y,
    burnTime:30, 
    burnInto:["gasoline","afterburn"],    
}
