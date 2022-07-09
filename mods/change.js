changeTo = "sand";

document.addEventListener("keydown", function(e) { //change prompt listener
	// r = changeElementPrompt()
	if (e.keyCode == 186) {
		e.preventDefault();
		changeElementPrompt();
	}
});

function changeElementPrompt() {
	var cmToElement = prompt("Enter what you want to change pixels to");
	// replace spaces with underscores
	cmToElement = cmToElement.replace(/ /g, "_");
	cmToElementS = mostSimilarElement(cmToElement);
	if (cmToElementS === null || cmToElementS === undefined || cmToElementS === "") {
		alert("Element \"" + cmToElement + "\" not found! Defaulting to sand.");
		cmToElementS = "sand";
	};
	changeTo = cmToElementS;
	updateChangeDescriptions();	
}

function updateChangeDescriptions() {
	elements.change.desc = "Changes any pixels it is used on to a specified type.<br/>Currently replacing pixels with \"" + changeTo + "\".<br/><span onclick=changeElementPrompt() style=\"color: #ff00ff;\";>Press [;] or click here</span> to open the change prompt.";
	elements.alt_change.desc = "Changes any pixels it is used on to a specified type, but keeping their non-element-based properties.<br/>Currently replacing pixels with \"" + changeTo + "\".<br/><span onclick=changeElementPrompt() style=\"color: #ff00ff;\";>Press [;] or click here</span> to open the change prompt.";
	elements.alt_alt_change.desc = "Changes any pixels it is used on to a specified type, but keeping their non-element-based properties except for color.<br/>Currently replacing pixels with \"" + changeTo + "\".<br/><span onclick=changeElementPrompt() style=\"color: #ff00ff;\";>Press [;] or click here</span> to open the change prompt.";
};

elements.change = {
    color: ["#ff0000", "#ff0000", "#ff0000", "#7f00ff", "#0000ff", "#0000ff", "#0000ff"],
    tool: function(pixel) {
		changePixel(pixel,changeTo,true);
    },
    category: "tools",
	desc: "Changes any pixels it is used on to a specified type.<br/>Currently replacing pixels with \"" + changeTo + "\".<br/><span onclick=changeElementPrompt() style=\"color: #ff00ff;\";>Press [;] or click here</span> to open the change prompt.",
};

elements.alt_change = {
    color: ["#ffff00", "#ffff00", "#ffff00", "#cf7f4f", "#ff00ff", "#ff00ff", "#ff00ff"],
    tool: function(pixel) {
		pixel.element = changeTo;
    },
    category: "tools",
	desc: "Changes any pixels it is used on to a specified type, but keeping their non-element-based properties.<br/>Currently replacing pixels with \"" + changeTo + "\".<br/><span onclick=changeElementPrompt() style=\"color: #ff00ff;\";>Press [;] or click here</span> to open the change prompt.",
	hidden: true,
};

elements.alt_alt_change = {
    color: ["#00ff00", "#00ff00", "#00ff00", "#cfcf00", "#ff0000", "#ff0000", "#ff0000"],
    tool: function(pixel) {
		pixel.element = changeTo;
		pixel.color = pixelColorPick(pixel);
    },
    category: "tools",
	desc: "Changes any pixels it is used on to a specified type, but keeping their non-element-based properties except for color.<br/>Currently replacing pixels with \"" + changeTo + "\".<br/><span onclick=changeElementPrompt() style=\"color: #ff00ff;\";>Press [;] or click here</span> to open the change prompt.",
	hidden: true,
};