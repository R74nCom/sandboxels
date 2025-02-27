window.addEventListener('load', function() {
	for (var element in elements) {
		if (elements[element].state === "liquid" && elements[element].behavior != behaviors.MOLTEN) {
            elements[element].renderer = function(pixel, ctx) { // this part used nouseramefounds code, props to him!
                drawDefault(ctx,pixel);
                if (!viewInfo[view].colorEffects) { return }
                if (!pixel.rSeed){pixel.rSeed = [Math.random(), Math.random(), Math.random(), Math.random()]}
                if (typeof pixel.color == "object"){
                    let selectedColor = pixel.color[Math.floor(pixel.rSeed[1]*elements[pixel.element].color.length)]
                    let rgb = {
                        r: parseInt(selectedColor.match(/\d+/g)[0]),
                        g: parseInt(selectedColor.match(/\d+/g)[1]),
                        b: parseInt(selectedColor.match(/\d+/g)[2])
                    }
                    for (let c in rgb){
                        rgb[c] += Math.floor(pixel.rSeed[0] * (pixel.rSeed[2] > 0.5 ? -1 : 1) * pixel.rSeed[3] * 15);
                        rgb[c] = Math.max(0, Math.min(255, rgb[c]));
                    }
                    if (elements[pixel.element].glow || elements[pixel.element].isGas){
                        drawPlus(ctx, "rgb("+rgb.r+","+rgb.g+","+rgb.b+")", pixel.x, pixel.y, 1);
                    } else {
                        drawSquare(ctx, "rgb("+rgb.r+","+rgb.g+","+rgb.b+")", pixel.x, pixel.y);
                    }
                } else {
                    let rgb = {
                        r: parseInt(pixel.color.match(/\d+/g)[0]),
                        g: parseInt(pixel.color.match(/\d+/g)[1]),
                        b: parseInt(pixel.color.match(/\d+/g)[2])
                    }
                    for (let c in rgb){
                        rgb[c] += Math.floor(pixel.rSeed[0] * (pixel.rSeed[2] > 0.5 ? -1 : 1) * pixel.rSeed[3] * 15);
                        rgb[c] = Math.max(0, Math.min(255, rgb[c]));
                    }
                    if (elements[pixel.element].glow || elements[pixel.element].isGas){
                        drawPlus(ctx, "rgb("+rgb.r+","+rgb.g+","+rgb.b+")", pixel.x, pixel.y, 1);
                    } else {
                        drawSquare(ctx, "rgb("+rgb.r+","+rgb.g+","+rgb.b+")", pixel.x, pixel.y);
                    }
                }
            }
            if (element === "cement" || element === "beans" || element === "algae" || element === "cellulose") {
                elements[element].miscible = false
            }
            if (element === "midas_touch" || element === "cement" || element === "beans" || element === "algae" || element === "cellulose" || element === "primordial_soup" || element === "cyanide" || element === "poison" || element === "antidote" || element === "mercury" || element === "liquid_oxygen" || element === "liquid_nitrogen") {
                elements[element].soluble = false
            }
            if (element === "midas_touch" || element === "molasses" || element === "grease" || element === "oil" || element === "lamp_oil" || element === "nut_oil" || element === "honey" || element === "sap" || element === "caramel") {
                elements[element].polar = 2
            }
            else if (element === "soap" || element === "dye") {
                elements[element].polar = 3
            }
            else {
                elements[element].polar = 1
            }
            if (elements[element].stain === undefined || !elements[element].stain) {
                elements[element].stain = 0.000000001
                elements[element].mixstain = 0.3
            }
            else if (elements[element].stain < 0.66 && elements[element].stain > -0.249 && (elements[element].mixstain === undefined || !elements[element].mixstain)) {
                elements[element].mixstain = (elements[element].stain + 0.25)
            }
            else if (elements[element].stain < 0.66 && elements[element].stain > -0.35 && (elements[element].mixstain === undefined || !elements[element].mixstain)) {
                elements[element].mixstain = (Math.abs(elements[element].stain) - 0.1)
            }
            else if (elements[element].stain < 0.66 && elements[element].stain < -0.35 && (elements[element].mixstain === undefined || !elements[element].mixstain)) {
                elements[element].mixstain = 0.1
            }
            else if (elements[element].stain < 0.66 && elements[element].stain < -0.249 && (elements[element].mixstain === undefined || !elements[element].mixstain)) {
                elements[element].mixstain = 0.125
            }
            else {
                elements[element].mixstain = (0.66)
            }
        }
	}
});

doStaining = function(pixel) {
    if (settings.stain===0) { return }
    var stain = elements[pixel.element].stain;
    var mixstain = elements[pixel.element].mixstain;
    if (stain > 0) {
        var newColor = pixel.color.match(/\d+/g);
    }
    else {
        var newColor = null;
    }
    if (mixstain > 0) {
        var mixnewColor = pixel.color.match(/\d+/g);
    }
    else {
        var mixnewColor = null;
    }

    for (var i = 0; i < adjacentCoords.length; i++) {
        var x = pixel.x+adjacentCoords[i][0];
        var y = pixel.y+adjacentCoords[i][1];
        if (!isEmpty(x,y,true)) {
            var newPixel = pixelMap[x][y];
            if (elements[pixel.element].ignore && elements[pixel.element].ignore.indexOf(newPixel.element) !== -1) {
                continue;
            }
            if ((elements[newPixel.element].id !== elements[pixel.element].id || elements[newPixel.element].stainSelf) && (solidStates[elements[newPixel.element].state] || elements[newPixel.element].id === elements[pixel.element].id)) {
                if (Math.random() < Math.abs(stain)) {
                    if (stain < 0) {
                        if (newPixel.origColor) {
                            newColor = newPixel.origColor;
                        }
                        else { continue; }
                    }
                    else if (!newPixel.origColor) {
                        newPixel.origColor = newPixel.color.match(/\d+/g);
                    }
                    // if newPixel.color doesn't start with rgb, continue
                    if (!newPixel.color.match(/^rgb/)) { continue; }
                    // parse rgb color string of newPixel rgb(r,g,b)
                    var rgb = newPixel.color.match(/\d+/g);
                    if (elements[pixel.element].stainSelf && elements[newPixel.element].id === elements[pixel.element].id) {
                        // if rgb and newColor are the same, continue
                        if (rgb[0] === newColor[0] && rgb[1] === newColor[1] && rgb[2] === newColor[2]) { continue; }
                        var avg = [];
                        for (var j = 0; j < rgb.length; j++) {
                            avg[j] = Math.round((rgb[j]*(1-Math.abs(stain))) + (newColor[j]*Math.abs(stain)));
                        }
                    }
                    else {
                        // get the average of rgb and newColor, more intense as stain reaches 1 
                        var avg = [];
                        for (var j = 0; j < rgb.length; j++) {
                            avg[j] = Math.floor((rgb[j]*(1-Math.abs(stain))) + (newColor[j]*Math.abs(stain)));
                        }
                    }
                    // set newPixel color to avg
                    newPixel.color = "rgb("+avg.join(",")+")";
                }
            }
        if ((elements[newPixel.element].id === elements[pixel.element].id || elements[newPixel.element].state === "liquid") && elements[pixel.element].state === "liquid" && elements[pixel.element].miscible !== false && elements[newPixel.element].miscible !== false) {
                if (mixstain === undefined || !mixstain) {
                    var mixstain = 0.5
                }
                if (Math.random() < mixstain) {
                    if (elements[newPixel.element].polar === elements[pixel.element].polar || elements[newPixel.element].polar === 3) {
                    if (!newPixel.origColor) {
                        newPixel.origColor = newPixel.color.match(/\d+/g);
                    }
                    // if newPixel.color doesn't start with rgb, continue
                    if (!newPixel.color.match(/^rgb/)) { continue; }
                    // parse rgb color string of newPixel rgb(r,g,b)
                    var rgb = newPixel.color.match(/\d+/g);
                    if (elements[newPixel.element].id === elements[pixel.element].id) {
                        // if rgb and newColor are the same, continue
                        if (rgb[0] === mixnewColor[0] && rgb[1] === mixnewColor[1] && rgb[2] === mixnewColor[2]) { continue; }
                        var avg = [];
                        for (var j = 0; j < rgb.length; j++) {
                            avg[j] = Math.round((rgb[j]*(1- mixstain)) + (mixnewColor[j] * mixstain));
                        }
                    }
                    else {
                        // get the average of rgb and newColor, more intense as stain reaches 1 
                        var avg = [];
                        for (var j = 0; j < rgb.length; j++) {
                            avg[j] = Math.floor((rgb[j]*(1- mixstain)) + (mixnewColor[j] * mixstain));
                        }
                    }
                    if (Math.random() > 0.9 && elements[newPixel.element].soluble === true && elements[pixel.element].soluble === true && newPixel.color === pixel.color && elements[newPixel.element].density > (elements[pixel.element].density - 20) && elements[newPixel.element].density < (elements[pixel.element].density + 40) && elements[pixel.element].density > (elements[newPixel.element].density - 20) && elements[pixel.element].density < (elements[newPixel.element].density + 40) ) {
                        if (elements[newPixel.element].density < elements[pixel.element].density) {
                            newPixel.element = pixel.element
                        }
                        else if (elements[newPixel.element].density > elements[pixel.element].density) {
                            pixel.element = newPixel.element
                        }
                        else if (elements[newPixel.element].density == elements[pixel.element].density) {
                            newPixel.element = pixel.element
                        }
                    }
                    // set newPixel color to avg
                    newPixel.color = "rgb("+avg.join(",")+")";
                    }
                }
            }
        }
    }
}
