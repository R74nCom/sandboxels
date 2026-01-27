replaceFrom = "rock";
replaceTo = "sand";

document.addEventListener("keydown", function(e) { //replace prompt listener
	// r = replaceElementPrompt()
	if (e.keyCode == 222) {
		e.preventDefault();
		replaceElementPrompt();
	}
});

function replaceElementPrompt() {
	promptInput("Enter the element you want to change", (fromElement) => {
		// var fromElement = prompt("Enter the element you want to change");
		// replace spaces with underscores
		fromElement = fromElement.replace(/ /g, "_");
		fromElementS = mostSimilarElement(fromElement);
		if (fromElementS === null || fromElementS === undefined || fromElementS === "") {
			alert("Element \"" + fromElement + "\" not found! Defaulting to rock.");
			fromElementS = "rock";
		};
	
		promptInput("Enter what you want to replace \"" + fromElementS + "\" with", (toElement) => {
			// var toElement = prompt("Enter what you want to replace \"" + fromElementS + "\" with");
			// replace spaces with underscores
			toElement = toElement.replace(/ /g, "_");
			toElementS = mostSimilarElement(toElement);
			if (toElementS === null || toElementS === undefined || toElementS === "") {
				alert("Element \"" + toElement + "\" not found! Defaulting to sand.");
				toElementS = "sand";
			};
			replaceFrom = fromElementS;
			replaceTo = toElementS;
			updateReplaceDescriptions();	
		},"Replace With")
	},"Replace Element")
}

function updateReplaceDescriptions() {
	elements.replace.desc = "Changes pixels of a specified type to another specified type.<br/>Currently replacing \"" + replaceFrom + "\" with \"" + replaceTo + "\".<br/><span onclick=replaceElementPrompt() style=\"color: #ff00ff;\";>Press [\"] or click here</span> to open the replace prompt.";
	elements.alt_replace.desc = "Changes pixels of a specified type to another specified type, but keeping their non-element-based properties.<br/>Currently replacing \"" + replaceFrom + "\" with \"" + replaceTo + "\".<br/><span onclick=replaceElementPrompt() style=\"color: #ff00ff;\";>Press [\"] or click here</span> to open the replace prompt.";
	elements.alt_alt_replace.desc = "Changes pixels of a specified type to another specified type, but keeping their non-element-based properties except for color.<br/>Currently replacing \"" + replaceFrom + "\" with \"" + replaceTo + "\".<br/><span onclick=replaceElementPrompt() style=\"color: #ff00ff;\";>Press [\"] or click here</span> to open the replace prompt.";
};

elements.replace = {
    color: ["#ff0000", "#ff0000", "#ff0000", "#7f00ff", "#0000ff", "#0000ff", "#0000ff"],
    tool: function(pixel) {
        if(pixel.element === replaceFrom) {
			changePixel(pixel,replaceTo,true);
		};
    },
    category: "edit",
	desc: "Changes pixels of a specified type to another specified type.<br/>Currently replacing \"" + replaceFrom + "\" with \"" + replaceTo + "\".<br/><span onclick=replaceElementPrompt() style=\"color: #ff00ff;\";>Press [\"] or click here</span> to open the replace prompt.",
};

elements.alt_replace = {
    color: ["#ffff00", "#ffff00", "#ffff00", "#cf7f4f", "#ff00ff", "#ff00ff", "#ff00ff"],
    tool: function(pixel) {
        if(pixel.element === replaceFrom) {
			pixel.element = replaceTo;
		};
    },
    category: "edit",
	desc: "Changes pixels of a specified type to another specified type, but keeping their non-element-based properties.<br/>Currently replacing \"" + replaceFrom + "\" with \"" + replaceTo + "\".<br/><span onclick=replaceElementPrompt() style=\"color: #ff00ff;\";>Press [\"] or click here</span> to open the replace prompt.",
	hidden: true,
};

elements.alt_alt_replace = {
    color: ["#00ff00", "#00ff00", "#00ff00", "#cfcf00", "#ff0000", "#ff0000", "#ff0000"],
    tool: function(pixel) {
        if(pixel.element === replaceFrom) {
			pixel.element = replaceTo;
			pixel.color = pixelColorPick(pixel);
		};
    },
    category: "edit",
	desc: "Changes pixels of a specified type to another specified type, but keeping their non-element-based properties except for color.<br/>Currently replacing \"" + replaceFrom + "\" with \"" + replaceTo + "\".<br/><span onclick=replaceElementPrompt() style=\"color: #ff00ff;\";>Press [\"] or click here</span> to open the replace prompt.",
	hidden: true,
};
