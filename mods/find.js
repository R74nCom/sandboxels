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
	//console.log(3);
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

runAfterLoad(function() {
	oldDrawPixels = drawPixels;
	drawPixels = function(forceTick=false) {
		oldDrawPixels(forceTick);
		//console.log(find);
		if(find) { findHighlighting() };
	};
});
