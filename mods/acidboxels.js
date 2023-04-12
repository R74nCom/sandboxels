var incrementt = 0;

var interval = setInterval( increment, 500/30);

function increment(){
	incrementt = incrementt % (Math.PI*8.8) + (Math.PI/30);
}

shapeModes = ["normal","circles","triangles"];
settings.shapeMode ??= 0;
settings.doAcid ??= false;

function getShapeMode() { 
	return shapeModes[settings.shapeMode] ?? "normal";
};

function drawPixels(forceTick=false) {
	// newCurrentPixels = shuffled currentPixels
	var newCurrentPixels = currentPixels.slice();
	var pixelsFirst = [];
	var pixelsLast = [];
	if (!paused || forceTick) {
		shuffleArray(newCurrentPixels);
	}
	/*{newCurrentPixels.sort(function(p) { // shuffle the pixels but keep elements[p.element].isGas last
		return 0.5 - Math.random();
	})} // shuffle the pixels if not paused*/
	for (var i = 0; i < newCurrentPixels.length; i++) {
		pixel = newCurrentPixels[i];
		//if (pixelMap[pixel.x][pixel.y] == undefined || currentPixels.indexOf(pixel) == -1) {continue}
		if (pixel.del) {continue}
		if (!paused || forceTick) {
			if (elements[pixel.element].tick) { // Run tick function if it exists
				elements[pixel.element].tick(pixel);
			}
			if (pixel.del) {continue}
			if (elements[pixel.element].behavior) { // Parse behavior if it exists
				pixelTick(pixel);
			}
		};
		if (elements[pixel.element].isGas) {
			pixelsLast.push(pixel);
		}
		else {
			pixelsFirst.push(pixel);
		}
	}
	// Draw the current pixels
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");
	var pixelDrawList = pixelsFirst.concat(pixelsLast);
	for (var i = 0; i < pixelDrawList.length; i++) {
		pixel = pixelDrawList[i];
		if (pixelMap[pixel.x][pixel.y] == undefined) {continue}
		if (view===null || view===3) {
			ctx.fillStyle = pixel.color;
		}
		else if (view === 2) { // thermal view
			// set the color to pixel.temp, from hottest at 0 hue to coldest 225 hue, with the minimum being -273, max being 6000
			var temp = pixel.temp;
			if (temp < -273) {temp = -273}
			if (temp > 6000) {temp = 6000}
			var hue = 225 - (temp/6000)*225;
			if (hue < 0) {hue = 0}
			if (hue > 225) {hue = 225}
			ctx.fillStyle = "hsl("+hue+",100%,50%)";
		}
		else if (view === 4) { // smooth view, average of surrounding pixels
			var colorlist = [];
			// check adjacent coords on the pixelMap, add the color to the list if the pixel is not empty and the color indexOf "rgb" is not -1
			for (var j = 0; j < biCoords.length; j++) {
				var x = pixel.x + biCoords[j][0];
				var y = pixel.y + biCoords[j][1];
				if (isEmpty(x,y,true) || elements[pixelMap[x][y].element].state !== elements[pixel.element].state) {continue}
				var color = pixelMap[x][y].color;
				if (color.indexOf("rgb") !== -1) {
					colorlist.push(color.match(/\d+/g));
				}
			}
			if (colorlist.length === 0) {
				ctx.fillStyle = pixel.color;
			}
			else {
				ctx.fillStyle = averageRGB(colorlist);
			}
		}
		var mode = getShapeMode();
		var acidOffset1 = (settings.doAcid ?? false) * (18*Math.sin((pixel.y+incrementt)/4.4));
		var acidOffset2 = (settings.doAcid ?? false) * (18*Math.sin((pixel.x+incrementt)/4.4));
		if ((view === null || view === 4) && elements[pixel.element].isGas) {
			//gas rendering
			switch(mode) {
				case "circles":
					ctx.globalAlpha = 0.66;
					ctx.beginPath();
					ctx.arc((pixel.x+0.5)*pixelSize+acidOffset1, (pixel.y+0.5)*pixelSize+acidOffset2, pixelSize, 0, 2 * Math.PI, false);
					ctx.fill();
					ctx.globalAlpha = 1;
					break;
				case "triangles":
					ctx.globalAlpha = 0.66;
					ctx.beginPath();
					ctx.moveTo((pixel.x-0.75)*pixelSize+acidOffset1,(pixel.y+1.5)*pixelSize+acidOffset2);
					ctx.lineTo((pixel.x+0.5)*pixelSize+acidOffset1,(pixel.y-1)*pixelSize+acidOffset2);
					ctx.lineTo((pixel.x+1.75)*pixelSize+acidOffset1,(pixel.y+1.5)*pixelSize+acidOffset2);
					ctx.fill();
					ctx.globalAlpha = 1;
					break;
				default:
					ctx.globalAlpha = 0.5;
					ctx.fillRect((pixel.x-1)*pixelSize+acidOffset1, (pixel.y)*pixelSize+acidOffset2, pixelSize*3, pixelSize);
					ctx.fillRect((pixel.x)*pixelSize+acidOffset1, (pixel.y-1)*pixelSize+acidOffset2, pixelSize, pixelSize*3);
					ctx.globalAlpha = 1;
					break;
			};
		}
		else { // draw the pixel (default)
			switch(mode) {
				case "circles":
					ctx.beginPath();
					ctx.arc((pixel.x+0.5)*pixelSize+acidOffset1, (pixel.y+0.5)*pixelSize+acidOffset2, pixelSize/2, 0, 2 * Math.PI, false);
					ctx.fill();
					ctx.globalAlpha = 1;
					break;
				case "triangles":
					ctx.beginPath();
					ctx.moveTo(pixel.x*pixelSize+acidOffset1,(pixel.y+1)*pixelSize+acidOffset2);
					ctx.lineTo((pixel.x+0.5)*pixelSize+acidOffset1,(pixel.y)*pixelSize+acidOffset2);
					ctx.lineTo((pixel.x+1)*pixelSize+acidOffset1,(pixel.y+1)*pixelSize+acidOffset2);
					ctx.fill();
					ctx.globalAlpha = 1;
					break;
				default:
					ctx.fillRect(pixel.x*pixelSize+acidOffset1, pixel.y*pixelSize+acidOffset2, pixelSize, pixelSize);
					break;
			};
		}
		if (pixel.charge && view !== 2) { // Yellow glow on charge
			if (!elements[pixel.element].colorOn) {
				ctx.fillStyle = "rgba(255,255,0,0.5)";
				switch(mode) {
					case "circles":
						ctx.beginPath();
						ctx.arc((pixel.x+0.5)*pixelSize+acidOffset1, (pixel.y+0.5)*pixelSize+acidOffset2, pixelSize/2, 0, 2 * Math.PI, false);
						ctx.fill();
						ctx.globalAlpha = 1;
						break;
					case "triangles":
						ctx.beginPath();
						ctx.moveTo(pixel.x*pixelSize+acidOffset1,(pixel.y+1)*pixelSize+acidOffset2);
						ctx.lineTo((pixel.x+0.5)*pixelSize+acidOffset1,(pixel.y)*pixelSize+acidOffset2);
						ctx.lineTo((pixel.x+1)*pixelSize+acidOffset1,(pixel.y+1)*pixelSize+acidOffset2);
						ctx.fill();
						ctx.globalAlpha = 1;
						break;
					default:
						ctx.fillRect(pixel.x*pixelSize+acidOffset1, pixel.y*pixelSize+acidOffset2, pixelSize, pixelSize);
						break;
				};
			}
		}
	}
	if ((!paused) || forceTick) {pixelTicks++};
}

runAfterLoad(function() {
	//Setting
	var settingsMenu = document.getElementById("settingsMenu").getElementsByClassName("menuText")[0];

	var settingNodes = [...settingsMenu.childNodes].filter(function(node) { return node.nodeType == 1 });
	var lastSetting = settingNodes[settingNodes.length - 1];
	//console.log(lastSetting);
	//console.log(lastSetting.getAttribute("style"));
	lastSetting.removeAttribute("style"); //restore padding for worldgen setting;
	//console.log(lastSetting.getAttribute("style"));

	//Shape setting
	var shapeSettingSpan = document.createElement("span");
	shapeSettingSpan.setAttribute("setting","shapeMode");
	shapeSettingSpan.setAttribute("class","setting-span");
	shapeSettingSpan.textContent = "Pixel Shape (laggy) ";
		var settingDropdown = document.createElement("select");
		settingDropdown.setAttribute("onchange","settings.shapeMode = parseInt(this.value); saveSettings();");
		var options = {
			0: "Squares",
			1: "Circles",
			2: "Triangles"
		};
		for(value in options) {
			var newOption = document.createElement("option");
			if(value == "0") {
				newOption.setAttribute("selected","");		
			};
			newOption.setAttribute("value",value);
			newOption.innerText = options[value];
			settingDropdown.appendChild(newOption);
		};
		shapeSettingSpan.appendChild(settingDropdown);
	settingsMenu.appendChild(shapeSettingSpan);

	//Acid setting
	var acidSettingSpan = document.createElement("span");
	acidSettingSpan.setAttribute("setting","doAcid");
	acidSettingSpan.setAttribute("class","setting-span");
	acidSettingSpan.textContent = "\"Acid\" distortion ";
		var settingDropdown = document.createElement("select");
		settingDropdown.setAttribute("onchange","settings.doAcid = (this.value === 'true'); saveSettings();");
		var options = {
			"false": "Disabled",
			"true": "Enabled"
		};
		for(value in options) {
			var newOption = document.createElement("option");
			if(value == "0") {
				newOption.setAttribute("selected","");		
			};
			newOption.setAttribute("value",value);
			newOption.innerText = options[value];
			settingDropdown.appendChild(newOption);
		};
		acidSettingSpan.appendChild(settingDropdown);
	settingsMenu.appendChild(acidSettingSpan);

	settingNodes = [...settingsMenu.childNodes].filter(function(node) { return node.nodeType == 1 });
	lastSetting = settingNodes[settingNodes.length - 1];
	//console.log(lastSetting);
	lastSetting.setAttribute("style","padding-bottom:0"); //remove padding from last setting;
});
