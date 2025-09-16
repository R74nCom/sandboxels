/*
*Version 1.0.0
*/
function noiseify(color, range){
    if(color.startsWith("#")){
        color = hexToRGB(color);
    } else {
        color = getRGB(color);
    }
    let num = Math.round(Math.random()*(range*2))-range;
    for(let value in color){
        color[value] += num;
    }
    return `rgb(${color.r},${color.g},${color.b})`;
}

function is2d(arr){
  return arr.some(item => Array.isArray(item));
}

function colorMix(p1, p2, bias = 0.5){
	c1 = p1.color;
	p1.color = interpolateRgb(getRGB(p1.color), getRGB(p2.color), bias);
	p2.color = interpolateRgb(getRGB(c1), getRGB(p2.color), bias);
}

function interpolateRgb(rgb1, rgb2, ratio = 0.5) {
  const interpolatedRgb = {
    r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio),
    g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio),
    b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio),
  };
  return normalize(interpolatedRgb);
}

function getRGB(rgb){
	if(rgb.startsWith("rgb(")){
		let rgb2 = rgb.replace(")", "").replace("rgb(", "").replace(/,/g, "r").split("r")
		return { r: parseInt(rgb2[0]), g: parseInt(rgb2[1]), b: parseInt(rgb2[2]) };
	}  else {
		return hexToRGB(rgb2);
	}
}
function pixelToggle(pixel, multi = {r:1,g:1,b:1}){
    if(pixel.toggle != undefined){
        pixel.toggle = !pixel.toggle;
        let rgb;
        if(Array.isArray(elements[pixel.element].color)){
            let elemColor = elements[pixel.element].color[Math.round(Math.random()*elements[pixel.element].color.length)];
            rgb = hexToRGB(elemColor) || getRGB(elemColor);
        } else {
            let elemColor = elements[pixel.element].color;
            rgb = hexToRGB(elemColor) || getRGB(elemColor);
        }
        let num = 5 - Math.round(Math.random()*10);
        if(pixel.toggle){
            for(let key in rgb){
                rgb[key] += (100*multi[key]);
                rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0));
            }
            pixel.color = `rgb(${rgb.r+num},${rgb.g+num},${rgb.b+num})`;
        } 
        else {
            pixel.color = `rgb(${rgb.r+num},${rgb.g+num},${rgb.b+num})`;
        }
    }
}
function normalize(obj){
    return `rgb(${obj.r},${obj.g},${obj.b})`;
}
