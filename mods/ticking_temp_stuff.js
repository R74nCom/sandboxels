elements.super_heater = {
	color: "#ff0000",
	tick: function(pixel) {
		for (let i = -4; i < 5; i++) {
			for (let j = -4; j < 5; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp += 15
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
},

elements.super_cooler = {
	color: "#0000ff",
	tick: function(pixel) {
		for (let i = -4; i < 5; i++) {
			for (let j = -4; j < 5; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp < -258 ? pixelMap[pixel.x+j][pixel.y+i].temp = -273 : pixelMap[pixel.x+j][pixel.y+i].temp -= 15
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
},

elements.super_warmer = {
	color: "#00ff00",
	tick: function(pixel) {
		for (let i = -4; i < 5; i++) {
			for (let j = -4; j < 5; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp = 20
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
},

elements.super_heater_2 = {
	color: "#ff2200",
	tick: function(pixel) {
		for (let i = -9; i < 10; i++) {
			for (let j = -9; j < 10; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp += 25
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
	hidden: true,
	excludeRandom: true,
},

elements.super_cooler_2 = {
	color: "#0022ff",
	tick: function(pixel) {
		for (let i = -9; i < 10; i++) {
			for (let j = -9; j < 10; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp < -248 ? pixelMap[pixel.x+j][pixel.y+i].temp = -273 : pixelMap[pixel.x+j][pixel.y+i].temp -= 25
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
	hidden: true,
	excludeRandom: true,
},

elements.super_warmer_2 = {
	color: "#22ff22",
	tick: function(pixel) {
		for (let i = -9; i < 10; i++) {
			for (let j = -9; j < 10; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp = 20
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
	hidden: true,
	excludeRandom: true,
},

elements.global_heater = {
	color: "#ff6666",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					pixelMap[i][j].temp += 1
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
	hidden: true,
	excludeRandom: true,
},

elements.global_cooler = {
	color: "#6666ff",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					pixelMap[i][j].temp <= -272 ? pixelMap[i][j].temp = -273 : pixelMap[i][j].temp -= 1
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
	hidden: true,
	excludeRandom: true,
},

elements.global_warmer = {
	color: "#66ff66",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					pixelMap[i][j].temp = 20
				}
			}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
	excludeRandom: true,
},

elements.agw = { //adjustable global warmer
	name: "Adjustable Global Warmer",
	color: "#66ff66",
	tick: function(pixel) {
		for (var i = 1; i < width; i++) {
			for (var j = 1; j < height; j++) {
				if (!isEmpty(i,j)) {
					pixelMap[i][j].temp = pixel.temp
					doHeat(pixelMap[i][j])
				}
			}
		}
	},
	category: "machines",
	insulate: true,
	state: "solid",
	hidden: true,
	excludeRandom: true,
},

elements.super_heater_3 = {
	color: "#ff7f00",
	uwu: 0,
	tick: function(pixel) {
		tempInc = 50
		pixel.uwu = 0
		range = 10
		for (let i = -8; i < 9; i++) {
			for (let j = -8; j < 9; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						pixel.uwu += 1
					}
				}
			}
		}
		pixel.uwu -= 1
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu)) {
			pixel.uwu = 0
		} else {
			tempInc += (pixel.uwu*15)
			range += Math.floor((Math.sqrt(pixel.uwu+1))**1.2)
		}
		for (let i = (-1*range); i < (range + 1); i++) {
			for (let j = (-1*range); j < (range + 1); j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp += tempInc
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
},

elements.super_cooler_3 = {
	color: "#007fff",
	uwu: 0,
	tick: function(pixel) {
		tempDec = 50
		pixel.uwu = 0
		range = 10
		for (let i = -8; i < 9; i++) {
			for (let j = -8; j < 9; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						pixel.uwu += 1
					}
				}
			}
		}
		pixel.uwu -= 1
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu)) {
			pixel.uwu = 0
		} else {
			tempDec += (pixel.uwu*15)
			range += Math.floor((Math.sqrt(pixel.uwu+1))**1.2)
		}
		for (let i = (-1*range); i < (range + 1); i++) {
			for (let j = (-1*range); j < (range + 1); j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					(pixelMap[pixel.x+j][pixel.y+i].temp < (-273 + tempDec)) ? pixelMap[pixel.x+j][pixel.y+i].temp = -273 : pixelMap[pixel.x+j][pixel.y+i].temp -= tempDec
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
},

elements.super_warmer_3 = {
	color: "#7fff7f",
	uwu: 0,
	tick: function(pixel) {
		pixel.uwu = 0
		range = 10
		for (let i = -8; i < 9; i++) {
			for (let j = -8; j < 9; j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					if (pixelMap[pixel.x+j][pixel.y+i].element == pixel.element) {
						pixel.uwu += 1
					}
				}
			}
		}
		pixel.uwu -= 1
		if(pixel.uwu == undefined || pixel.uwu == null || isNaN(pixel.uwu)) {
			pixel.uwu = 0
		} else {
			range += Math.floor((Math.sqrt(pixel.uwu+1))**1.2)
		}
		for (let i = (-1*range); i < (range + 1); i++) {
			for (let j = (-1*range); j < (range + 1); j++) {
				if (!isEmpty(pixel.x+j,pixel.y+i) && !outOfBounds(pixel.x+j,pixel.y+i)) {
					pixelMap[pixel.x+j][pixel.y+i].temp = 20
				}
			}
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
	excludeRandom: true,
},

elements.tc = { //temperature checker
	name: "Temperature Checker",
	color: ["#000000","#000000"],
	tick: function(pixel) {
		if(pixel.temp < -255) {
			pixel.color = "rgb(0,0,255)"
		} else if(pixel.temp >= -255 && pixel.temp < 0) {
			pixel.color = "rgb(0,0," + Math.abs(pixel.temp) + ")"
		} else if(pixel.temp <= 255) {
			pixel.color = "rgb(" + pixel.temp % 256 + ",0,0)"
		} else if(pixel.temp <= 65535) {
			pixel.color = "rgb(255," + Math.floor(pixel.temp / 256) + ",0)"
		} else if(pixel.temp <= 16777215) {
			pixel.color = "rgb(255,255," + Math.floor(pixel.temp / 65536) + ")"
		} else {
			pixel.color = "rgb(255,255,255)"
		}
	},
	category:"machines",
	insulate: true,
	state: "solid",
},

/**
*  color-temperature.js
*
*  Neil Bartlett
*  neilbartlett.com
*  2015-01-22
*
*  Copyright [2015] [Neil Bartlett] *
*
* Color Temperature is the color due to black body radiation at a given
* temperature. The temperature is given in Kelvin. The concept is widely used
* in photography and in tools such as f.lux.
*
* The function here converts a given color temperature into a near equivalent
* in the RGB colorspace. The function is based on a curve fit on standard sparse
* set of Kelvin to RGB mappings.
*
* Two conversions are presented here. The one colorTempertature2RGBUSingTH
* is a JS version of the algorithm developed by Tanner Helland. The second is a
* slightly more accurate conversion based on a refitting of the original data
* using different curve fit functions. The performance cost of the two
* approaches is very similar and in general the second algorithm is preferred.
*
* NOTE The approximations used are suitable for photo-mainpulation and other
* non-critical uses. They are not suitable for medical or other high accuracy
* use cases.
*
* Accuracy is best between 1000K and 40000K.
*
* See http://github.com/neilbartlett/color-temperature for further details.
*
**/

//[Code licensed under the MIT License]

//[Tanner Helland version omitted]

/**
 * A more accurate version algorithm based on a different curve fit to the
 * original RGB to Kelvin data.
  * Input: color temperature in degrees Kelvin
  * Output: json object of red, green and blue components of the Kelvin temperature
 */
 colorTemperature2rgb = function(kelvin) {

  var temperature = kelvin / 100.0;
  var red, green, blue;

  if (temperature < 66.0) {
    red = 255;
  } else {
    // a + b x + c Log[x] /.
    // {a -> 351.97690566805693`,
    // b -> 0.114206453784165`,
    // c -> -40.25366309332127
    //x -> (kelvin/100) - 55}
    red = temperature - 55.0;
    red = 351.97690566805693+ 0.114206453784165 * red - 40.25366309332127 * Math.log(red);
    if (red < 0) red = 0;
    if (red > 255) red = 255;
  }

  /* Calculate green */

  if (temperature < 66.0) {

    // a + b x + c Log[x] /.
    // {a -> -155.25485562709179`,
    // b -> -0.44596950469579133`,
    // c -> 104.49216199393888`,
    // x -> (kelvin/100) - 2}
    green = temperature - 2;
    green = -155.25485562709179 - 0.44596950469579133 * green + 104.49216199393888 * Math.log(green);
    if (green < 0) green = 0;
    if (isNaN(green)) green = 0;
    if (green > 255) green = 255;

  } else {

    // a + b x + c Log[x] /.
    // {a -> 325.4494125711974`,
    // b -> 0.07943456536662342`,
    // c -> -28.0852963507957`,
    // x -> (kelvin/100) - 50}
    green = temperature - 50.0;
    green = 325.4494125711974 + 0.07943456536662342 * green - 28.0852963507957 * Math.log(green);
    if (green < 0) green = 0;
    if (green > 255) green = 255;

  }

  /* Calculate blue */

  if (temperature >= 66.0) {
    blue = 255;
  } else {

    if (temperature <= 20.0) {
      blue = 0;
    } else {

      // a + b x + c Log[x] /.
      // {a -> -254.76935184120902`,
      // b -> 0.8274096064007395`,
      // c -> 115.67994401066147`,
      // x -> kelvin/100 - 10}
      blue = temperature - 10;
      blue = -254.76935184120902 + 0.8274096064007395 * blue + 115.67994401066147 * Math.log(blue);
      if (blue < 0) blue = 0;
      if (blue > 255) blue = 255;
    }
  }

  //return {red: Math.round(red), blue: Math.round(blue), green: Math.round(green)};
  return "rgb("+Math.round(red)+","+Math.round(green)+","+Math.round(blue)+")"
}

//[reverse conversion omitted]

elements.color_temp_test = {
	color: "#111111",
	behavior: behaviors.POWDER,
	tick: function(pixel) {
		if(!pixel.oldColor) {
			pixel.oldColor = pixel.color
		}
		if(!pixel.lerpValue) {
			pixel.lerpValue = 0
		}
		if(!pixel.lerpAR) {
			pixel.lerpAR = 0
		}
		if(!pixel.lerpAG) {
			pixel.lerpAG = 0
		}
		if(!pixel.lerpAB) {
			pixel.lerpAB = 0
		}
		if(!pixel.lerpBR) {
			pixel.lerpBR = 0
		}
		if(!pixel.lerpBG) {
			pixel.lerpBG = 0
		}
		if(!pixel.lerpBB) {
			pixel.lerpBB = 0
		}
		if(!pixel.lerpedR) {
			pixel.lerpedR = 0
		}
		if(!pixel.lerpedG) {
			pixel.lerpedG = 0
		}
		if(!pixel.lerpedB) {
			pixel.lerpedB = 0
		}
		if(!pixel.lerpedColor) {
			pixel.lerpedColor = ""
		}
		if(pixel.temp < 525) {
			pixel.color = pixel.oldColor
		}
		if(pixel.temp >= 525 && pixel.temp < 1582) {
			pixel.lerpValue = (pixel.temp-524)/(1581-524)
			pixel.lerpAR = pixel.oldColor.split(",")[0].slice(4)
			pixel.lerpAG = pixel.oldColor.split(",")[1]
			pixel.lerpAB = pixel.oldColor.split(",")[2].slice(0,-1)
			pixel.lerpBR = colorTemperature2rgb(pixel.temp + 273.15).split(",")[0].slice(4)
			pixel.lerpBG = colorTemperature2rgb(pixel.temp + 273.15).split(",")[1]
			pixel.lerpBB = colorTemperature2rgb(pixel.temp + 273.15).split(",")[2].slice(0,-1)
			pixel.lerpedR = pixel.lerpBR*pixel.lerpValue + pixel.lerpAR*(1-pixel.lerpValue)
			pixel.lerpedG = pixel.lerpBG*pixel.lerpValue + pixel.lerpAG*(1-pixel.lerpValue)
			pixel.lerpedB = pixel.lerpBB*pixel.lerpValue + pixel.lerpAB*(1-pixel.lerpValue)
			pixel.lerpedColor = "rgb(" + pixel.lerpedR + "," + pixel.lerpedG + "," + pixel.lerpedB + ")"
			pixel.color = pixel.lerpedColor
		}
		if(pixel.temp >= 1582) {
			pixel.color = colorTemperature2rgb(pixel.temp + 273.15)
		}
		doHeat(pixel);
	},
	category: "special",
	state: "solid",
	density: 1500,
	temp: 20,
}
