//runs after the elements in "names" are defined

function runAfterAutogen(callback) {
    var interval = 10; // ms
    window.setTimeout(function() {
        if (window.autoElements) {
            callback();
        } else {
            runAfterAutogen(callback);
        }
    }, interval);
}
function createButtonsAndCountElements() {
	window.setTimeout(function() {
    document.getElementById("categoryControls").innerHTML = "";
	document.getElementById("elementControls").innerHTML = "";
    document.getElementById("category-tools").innerHTML = "";
	document.getElementById("extraInfo").innerHTML = "";
	elementCount = 0;
	hiddenCount = 0;
	categoryList = [];
	for (var element in elements) {
		elementCount++;
		if (settings.cheerful && elements[element].nocheer) {
			elements[element].hidden = true;
			hiddenCount++;
			continue;
		}
		if (element === "unknown") {continue;}
		var category = elements[element].category;
		if (category==null) {category="other"}
		if (categoryList.indexOf(category) === -1) {
			categoryList.push(category);
		}
		if (elements[element].hidden && (!settings["unhide"] || ( settings["unhide"]===2 && !settings.unlocked[element] ))) { hiddenCount++; continue; }
		var categoryDiv = document.getElementById("category-"+category);
		if (categoryDiv == null) {
			createCategoryDiv(category);
			categoryDiv = document.getElementById("category-"+category);
		}
		createElementButton(element);
	}
	if (document.getElementById("categoryButton-states")) {
		// move it to the end of its parent
		document.getElementById("categoryButton-states").parentNode.appendChild(document.getElementById("categoryButton-states"));
	}
	// Set the first button in categoryControls div to be the current category
	document.getElementById("categoryControls").children[0].click()
	document.getElementById("extraInfo").insertAdjacentHTML("beforeend", "<small><p>v" + currentversion + " • " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a style='color:#00ffff' href='https://r74n.com'>R74n</a></p></small>");
	selectElement(currentElement);
	}, 10);
};

runAfterAutogen(createButtonsAndCountElements);

raaLoaded = true;
