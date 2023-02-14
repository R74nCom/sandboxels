var modName = "mods/save_loading.js";

function zeroToNull(val) {
	if(val === 0) { return null };
	return val;
};

if(!localStorage.slSaveSettings) {
	localStorage.setItem("slSaveSettings", '{"shortenNulls":false,"roundTemps":true}');
};

slSaveSettings = JSON.parse(localStorage.slSaveSettings);

function epsilonRound(num,precision) {
	return Math.round((num + Number.EPSILON) * (10 ** precision)) / (10 ** precision);
};

function getSimulationState() {
	var simulationState = {
		//currentPixels: currentPixels,
		pixelMap: structuredClone(pixelMap),
		width: width,
		height: height,
		pixelSize: pixelSize,
		settings: settings,
		version: 1,
		enabledMods: localStorage.enabledMods,
	};
	nulls: if(slSaveSettings.shortenNulls) {
		if(!structuredClone) {
			alert("Your browser does not support structuredClone, which is needed to shorten nulls to zeroes without corrupting the current pixelMap.");
			console.error("shortenNulls: structuredClone not supported");
			break nulls;
		};
		for(i = 0; i < simulationState.pixelMap.length; i++) {
			var column = simulationState.pixelMap[i];
			for(j = 0; j < column.length; j++) {
				if(column[j] === null || typeof(column[j]) === "undefined") {
					column[j] = 0;
				};
			};
		};
	};
	if(slSaveSettings.roundTemps) {
		for(i = 0; i < simulationState.pixelMap.length; i++) {
			var column = simulationState.pixelMap[i];
			for(j = 0; j < column.length; j++) {
				var pixel = column[j];
				if(pixel?.temp) {
					pixel.temp = epsilonRound(pixel.temp,3);
				};
			};
		};
	};
	return simulationState;
};

//https://stackoverflow.com/a/46118025
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use textarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

const saveTemplateAsFile = (filename, dataObjToWrite) => { //from https://stackoverflow.com/a/65939108
    const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: "text/json" });
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove()
};

function formatCurrentDate() { //derived from https://gist.github.com/Ivlyth/c4921735812dd2c0217a
    var d = new Date();
	var year = d.getFullYear().toString();

	var month = (d.getMonth()+1).toString();
	if(month.length == 1) { month = "0" + month };

	var day = d.getDate().toString();
	if(day.length == 1) { day = "0" + day };

	var hour = d.getHours().toString();
	if(hour.length == 1) { hour = "0" + hour };

	var minute = d.getMinutes().toString();
	if(minute.length == 1) { minute = "0" + minute };

	var second = d.getSeconds().toString();
	if(second.length == 1) { second = "0" + second };

	var date_format_str = `${year}-${month}-${day} ${hour}-${minute}-${second}`;
	return date_format_str;
};

function savePrompt() {
	var filename = prompt("Please enter the desired filename, without the .json (defaults to current date)");
	if(filename === null) {
		return false;
        };
        if(filename === "") {
            filename = `Sandboxels save ${formatCurrentDate()}`;
	};
	filename += ".json";
	downloadSave(filename)
};

function downloadSave(filename=null) {
	if(filename === null) {
		filename = `Sandboxels save ${formatCurrentDate()}.json`;
	};
	saveTemplateAsFile(filename, getSimulationState());
};

function copySaveJSON(doAlert=true) {
	copyToClipboard(JSON.stringify(getSimulationState()));
	if(doAlert) { alert("Save copied as JSON") };
};

function loadFile() {
	//Initialize
	var json;
	
	//load JSON
	var file = document.getElementById('myfile').files[0];
	if(file === undefined) {
		if(document.getElementById("fileFormStatus") !== "null") {
			document.getElementById("fileFormStatus").style.color = "red";
			document.getElementById("fileFormStatus").innerHTML = "No file was uploaded!";
		};
		throw new Error("No file was uploaded");
	};
	var reader = new FileReader();
	reader.readAsText(file, 'UTF-8');
	//after loading
	reader.onload = function(evt) {
		json = evt.target.result;

		//validate
		try {
			json = JSON.parse(json);
		} catch (error) {
			if(document.getElementById("fileFormStatus") !== "null") {
				document.getElementById("fileFormStatus").style.color = "red";
				document.getElementById("fileFormStatus").innerHTML = "The file wasn't valid JSON!";
			};
			throw error;
		};
		
		if(document.getElementById("fileFormStatus") !== "null") {
			document.getElementById("fileFormStatus").style.color = "yellow";
			document.getElementById("fileFormStatus").innerHTML = "JSON was parsed successfully";
		};
		
		//return json;
		return importJsonState(json);
	};
};

function loadText() {
	//Initialize
	var json;
	
	//load JSON
	var json = document.getElementById('mytext').value;
	if(json === "") {
		if(document.getElementById("textFormStatus") !== "null") {
			document.getElementById("textFormStatus").style.color = "red";
			document.getElementById("textFormStatus").innerHTML = "No text was present!";
		};
		throw new Error("No text was present");
	};

	//validate
	try {
		json = JSON.parse(json);
	} catch (error) {
		if(document.getElementById("textFormStatus") !== "null") {
			document.getElementById("textFormStatus").style.color = "red";
			document.getElementById("textFormStatus").innerHTML = "The text wasn't valid JSON!";
		};
		throw error;
	};
	
	if(document.getElementById("textFormStatus") !== "null") {
		document.getElementById("textFormStatus").style.color = "yellow";
		document.getElementById("textFormStatus").innerHTML = "JSON was parsed successfully";
	};
	
	//return json;
	return importJsonState(json);
};

function importJsonState(json) {
	//check keys
	var jsonKeys = Object.keys(json);
	var requiredKeys = [/*"currentPixels", */"pixelMap", "width", "height", "pixelSize"];
	var hasrequiredKeys = true;
	for(i = 0; i < requiredKeys.length; i++) {
		var key = requiredKeys[i];
		if(!jsonKeys.includes(key)) {
			hasrequiredKeys = false;
			break;
		};
	};
	if(!hasrequiredKeys) {
		if(document.getElementById("fileFormStatus") !== "null") {
			document.getElementById("fileFormStatus").style.color = "red";
			document.getElementById("fileFormStatus").innerHTML = "JSON is not a valid save!";
		};
		throw new Error("JSON is missing required keys!");
	};
	
	//Set values
	width = json.width;
	height = json.height;
	pixelSize = json.pixelSize;
	//currentPixels = json.currentPixels;
	for(i = 0; i < json.pixelMap.length; i++) {
		json.pixelMap[i] = json.pixelMap[i].map(x => zeroToNull(x));
	};
	pixelMap = json.pixelMap;
	if(json.settings) {
		settings = json.settings;
	};
	
	//enabledMods handling {
		var enMods = "[]";
		if(typeof(json.enabledMods) !== "undefined") {
			enMods = json.enabledMods;
		};
		enMods = JSON.parse(enMods);
		//console.log(enMods);

		var currentEnmods = JSON.parse(localStorage.enabledMods); //should already exist if you're using this mod in the first place
		for(emi = 0; emi < enMods.length; emi++) { //load mods additively to prevent self-disabling and the inconvenience of having to readd your mod list when you get bored
			var mod = enMods[emi];
			if(!currentEnmods.includes(mod)) {
				currentEnmods.push(mod);
			};
		};
		localStorage.setItem("enabledMods",JSON.stringify(currentEnmods));
		if((enMods.length > 0 && enMods[0] !== modName) || enMods.length > 1) {
			alert("Saves with other mods might require a reload (and then importing the save file again).\nIf you see a blank screen, try refreshing and loading the file again before you panic.");
		};
	//}
	
	var currPix = []; //rebuild currentPixels from pixelMap to try to fix bug
	for(pmi = 0; pmi < pixelMap.length; pmi++) {
		var pixelMapPart = pixelMap[pmi];
		for(pmj = 0; pmj < pixelMapPart.length; pmj++) {
			var pixelMapUnit = pixelMapPart[pmj];
			if(typeof(pixelMapUnit) === "object") {
				if(pixelMapUnit !== null) {
					currPix.push(pixelMapUnit);
				};
			};
		};
	};
	currentPixels = currPix;
	
	if(document.getElementById("fileFormStatus") !== "null") {
		document.getElementById("fileFormStatus").style.color = "green";
		document.getElementById("fileFormStatus").innerHTML = "JSON was loaded successfully.";
	};
	return true;
};

function setPixelSize(size=null) {
	if(size === null) {
		if(document.getElementById("pixelSize") !== "null") {
			size = document.getElementById("pixelSize").value;
		} else {
			throw new Error("No size could be read");
		};
	};

	size = parseFloat(size);
	if(isNaN(size) || size <= 0) { //NaN check
		if(document.getElementById("pixelSizeStatus") !== "null") {
			document.getElementById("pixelSizeStatus").style.color = "red";
			document.getElementById("pixelSizeStatus").innerHTML = "Pixel size is empty or invalid";
		};
		throw new Error("NaN or negative size");
	};
	
	if(document.getElementById("pixelSizeStatus") !== "null") {
		document.getElementById("pixelSizeStatus").style.color = "green";
		document.getElementById("pixelSizeStatus").innerHTML = "Pixel size set successfully";
	};
	pixelSize = size;
	return true;
};

var saveLoaderDescription = `<div>
<span id="downloadButton" onclick=savePrompt() style="color: #FF00FF;">Download simulation</span>
<span id="copyButton" onClick=copySaveJSON() style="color: #FF66FF;">Alternatively, copy simulation JSON</span>

<span id="fileFormStatus">No file loader status</span>
One file, please: <input type="file" name="Save upload button" id="myfile">
<button id="loadButton" onclick=loadFile() style="color: #FF00FF;">Load File</button>
<span>Or paste JSON</span>
<span id="textFormStatus">No text loader status</span>
<input name="Text load field" id="mytext">
<button id="textLoadButton" onclick=loadText() style="color: #FF66FF;">Load Text</button>

<span id="pixelSizeStatus">No size setter status</span>
Pixel size (rendering only): <input id="pixelSize"> (Use if the save looks cut off)
<button id="sizeButton" onclick=setPixelSize() style="color: #FF00FF;">Set pixel size</button>
</div>`;

elements.save_loader = {
	behavior: behaviors.SELFDELETE,
	excludeRandom: true,
	color: "#FFFFFF",
	desc: saveLoaderDescription,
};
