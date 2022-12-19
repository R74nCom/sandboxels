//set up a runAfterDraw system while it doesn't warrant a separate mod
function runAfterDraw(func) {
	runAfterDrawList.push(func);
};

runAfterDrawList = [];

runAfterDraw_oldDrawPixels = drawPixels;

runAfterDraw_main = function() {
	// Loop through runAfterDrawList and run each function
	for (var i = 0; i < runAfterDrawList.length; i++) {
		runAfterDrawList[i]();
	};
};

runAfterLoad(function() {
	drawPixels = function(forceTick=false) {
		runAfterDraw_oldDrawPixels(forceTick);
		runAfterDraw_main();
	};
});

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
		if ((view === null || view === 4) && elements[pixel.element].state === "gas") {
			ctx.globalAlpha = 0.5;
			ctx.fillRect((pixel.x-1)*pixelSize, (pixel.y)*pixelSize, pixelSize*3, pixelSize);
			ctx.fillRect((pixel.x)*pixelSize, (pixel.y-1)*pixelSize, pixelSize, pixelSize*3);
			ctx.globalAlpha = 1;
		}
		else { // draw the pixel (default)
			ctx.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize, pixelSize);
		}
		if (pixel.charge && view !== 2) { // Yellow glow on charge
			if (!elements[pixel.element].colorOn) {
				ctx.fillStyle = "rgba(255,255,0,0.5)";
				ctx.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize, pixelSize);
			}
		}
	}
	if ((!paused) || forceTick) {pixelTicks++};

	// Loop through runAfterDrawList and run each function
	for (var i = 0; i < runAfterDrawList.length; i++) {
		runAfterDrawList[i]();
	};
};



var style = document.createElement('style');
style.type = 'text/css';
style.id = 'findStatusStylesheet';
style.innerHTML = '.findStatus { color: #E11; text-decoration: none; }';
document.getElementsByTagName('head')[0].appendChild(style);

find = false;
findElement = "sand";
findColorPulseTimer = 0;
findColorPulseTimerSubTimer = 0;

function marasi(number) {
	return Math.min(255,Math.round(Math.abs(Math.sin(number) * 255)));
};
		
function updateFindDescription() {
	var elems = findElement;
	if(elems instanceof Array) {
		elems = elems.join(", ");
	};
	elements.find_toggle.desc = `
<em>I'm running out of keybinds</em>


<span class="findStatus">If this text is green or underlined, find mode is on.</span> Currently finding: ${elems} <small style="font-size:80%;">(this display does not update automatically)</small>.
<span onclick=toggleFind() style="color: #ff00ff;";>Click here</span> to toggle find mode. This highlights the currently selected element.<br/>
<span style='color:#FF00FF' onClick=findFilterPrompt()>Click here to configure the find filter.</span>`;
};

function toggleFind() {
	if(find != true) {
		find = true;
		document.getElementById("findStatusStylesheet").innerHTML = '.findStatus { color: #1E1; text-decoration: underline; }'; //Displayed info doen't update until it's pulled up again, so I'm using CSS to dynamically change the color of an element.
	} else {
		find = false;
		document.getElementById("findStatusStylesheet").innerHTML = '.findStatus { color: #E11; text-decoration: none; }';
	};
	updateFindDescription();
};

findHighlighting = function() {
	if(!find) {
		return false;
	}
	var newCurrentPixels = currentPixels;
	var pixelsFirst = [];
	var pixelsLast = [];
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");

	for (var i = 0; i < newCurrentPixels.length; i++) {
		pixel = newCurrentPixels[i];
		//if (pixelMap[pixel.x][pixel.y] == undefined || currentPixels.indexOf(pixel) == -1) {continue}
		if (pixel.del) {continue};
		if (elements[pixel.element].isGas) {
			pixelsLast.push(pixel);
		} else {
			pixelsFirst.push(pixel);
		};
	};

	var pixelDrawList = pixelsFirst.concat(pixelsLast);
	for (var i = 0; i < pixelDrawList.length; i++) {
		pixel = pixelDrawList[i];
		if (pixelMap[pixel.x][pixel.y] == undefined) {continue};
		if(findElement instanceof Array ? findElement.includes(pixel.element) : pixel.element === findElement) {
			ctx.fillStyle = "rgb(255," + marasi(findColorPulseTimer / 10) + ",0)";
			ctx.fillRect(pixel.x*pixelSize, pixel.y*pixelSize, pixelSize, pixelSize);
		};
	};
	
	findColorPulseTimerSubTimer++;
	if(findColorPulseTimerSubTimer >= 2) {
		findColorPulseTimer++;
		findColorPulseTimerSubTimer = 0;
	};
	
	return true;
};

runAfterDraw(findHighlighting);

elements.find_toggle = {
    color: ["#000000", "#000000", "#000000", "#000000", "#ff0000", "#ff0000", "#ff0000", "#ff0000"],
	name: "find toggle (look at info)",
    behavior: behaviors.SELFDELETE,
    category: "tools",
	excludeRandom: true,
	desc: `
<em>I'm running out of keybinds</em>


<span class="findStatus">If this text is green or underlined, find mode is on.</span> Currently finding: sand <small style="font-size:80%;">(this display does not update automatically)</small>.
<span onclick=toggleFind() style="color: #ff00ff;";>Click here</span> to toggle find mode. This highlights the currently selected element.<br/>
<span style='color:#FF00FF' onClick=findFilterPrompt()>Click here to configure the find filter.</span>`,
};

function findFilterPrompt() {
	var preElement = prompt("Enter the elements you want to highlight\nSeparate multiple elements with commas");
	if(preElement === null || preElement === "") {
		return false;
	};
	if(preElement.includes(",")) {
		preElement = preElement.split(",");
		findElement = preElement;
		updateFindDescription();
		return findElement;
	};
	findElement = preElement;
	updateFindDescription();
	return findElement;
};
