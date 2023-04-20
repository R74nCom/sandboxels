var modName = "mods/save_loading.js";

try {
	if(typeof(rebuildCurrentPixels) !== "function") {
	    rebuildCurrentPixels = function() {
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
            };
	};

	//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
	function storageAvailable(type) {
	  let storage;
	  try {
		storage = window[type];
		const x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	  } catch (e) {
		return (
		  e instanceof DOMException &&
		  // everything except Firefox
		  (e.code === 22 ||
			// Firefox
			e.code === 1014 ||
			// test name field too, because code might not be present
			// everything except Firefox
			e.name === "QuotaExceededError" ||
			// Firefox
			e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
		  // acknowledge QuotaExceededError only if there's something already stored
		  storage &&
		  storage.length !== 0
		);
	  }
	}

	function zeroToNull(val) {
		if(val === 0) { return null };
		return val;
	};

	if(!localStorage.slSaveSettings) {
		localStorage.setItem("slSaveSettings", '{"roundTemps":true}');
	};

	slSaveSettings = JSON.parse(localStorage.slSaveSettings);

	function epsilonRound(num,precision) {
		return Math.round((num + Number.EPSILON) * (10 ** precision)) / (10 ** precision);
	};

	function getSimulationState() {
		var simulationState = {
			//currentPixels: currentPixels,
			pixelMap: structuredClone ? structuredClone(pixelMap) : JSON.parse(JSON.stringify(pixelMap)),
			width: width,
			height: height,
			pixelSize: pixelSize,
			settings: settings,
			version: 1,
			enabledMods: localStorage.enabledMods,
		};
		for(i = 0; i < simulationState.pixelMap.length; i++) {
			var column = simulationState.pixelMap[i];
			for(j = 0; j < column.length; j++) {
				if(column[j] === null || typeof(column[j]) === "undefined") {
					column[j] = 0;
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

	rebuildCurrentPixels ??= function() {
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
	};

	function quicksave(doSuccessAlert=true,doFailAlert=true) {
		if(storageAvailable("localStorage")) {
			rebuildCurrentPixels();
			localStorage.setItem("quicksave",JSON.stringify(getSimulationState()));
			if(doSuccessAlert) { alert("Quicksave saved") };
			return true;
		} else {
			if(doFailAlert) { alert("Could not save quicksave in localStorage") };
			throw new Error("Could not save quicksave in localStorage");
		};
	};

	function quickload(pause=true,doSuccessAlert=true,doFailAlert=true) {
		clearAll();
		rebuildCurrentPixels();
		var save = localStorage.getItem("quicksave");
		if(!save) {
			if(doFailAlert) { alert("No save exists") };
			return false;
		} else {
			importJsonState(JSON.parse(save));
			if(doSuccessAlert) { alert("Quicksave loaded") };
			if(pause) {
				paused = true;
				document.getElementById("pauseButton").setAttribute("on","true");
			} else {
				paused = false;
				document.getElementById("pauseButton").setAttribute("on","false");
			};
			return true;
		};
		rebuildCurrentPixels();
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
			if(document.getElementById("fileFormStatus") !== null) {
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
				if(document.getElementById("fileFormStatus") !== null) {
					document.getElementById("fileFormStatus").style.color = "red";
					document.getElementById("fileFormStatus").innerHTML = "The file wasn't valid JSON!";
				};
				throw error;
			};
			
			if(document.getElementById("fileFormStatus") !== null) {
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
			if(document.getElementById("textFormStatus") !== null) {
				document.getElementById("textFormStatus").style.color = "red";
				document.getElementById("textFormStatus").innerHTML = "No text was present!";
			};
			throw new Error("No text was present");
		};

		//validate
		try {
			json = JSON.parse(json);
		} catch (error) {
			if(document.getElementById("textFormStatus") !== null) {
				document.getElementById("textFormStatus").style.color = "red";
				document.getElementById("textFormStatus").innerHTML = "The text wasn't valid JSON!";
			};
			throw error;
		};
		
		if(document.getElementById("textFormStatus") !== null) {
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
			if(document.getElementById("fileFormStatus") !== null) {
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
		
		if(document.getElementById("fileFormStatus") !== null) {
			document.getElementById("fileFormStatus").style.color = "green";
			document.getElementById("fileFormStatus").innerHTML = "JSON was loaded successfully.";
		};
		return true;
	};

	function setPixelSize(size=null) {
		if(size === null) {
			if(document.getElementById("pixelSize") !== null) {
				size = document.getElementById("pixelSize").value;
			} else {
				throw new Error("No size could be read");
			};
		};

		size = parseFloat(size);
		if(isNaN(size) || size <= 0) { //NaN check
			if(document.getElementById("pixelSizeStatus") !== null) {
				document.getElementById("pixelSizeStatus").style.color = "red";
				document.getElementById("pixelSizeStatus").innerHTML = "Pixel size is empty or invalid";
			};
			throw new Error("NaN or negative size");
		};
		
		if(document.getElementById("pixelSizeStatus") !== null) {
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

	//Somehow, for some illogical reason, quicksaving causes updateStats to somehow disregard its if-statement and fucking TypeError when you mouse over an empty space; this is an attempt to fix it with overkill-level existence checks.
	function updateStats() {
		var statsDiv = document.getElementById("stats");
		var stats = "<span id='stat-pos' class='stat'>x"+mousePos.x+",y"+mousePos.y+"</span>";
		stats += "<span id='stat-pixels' class='stat'>Pxls:" + currentPixels.length+"</span>";
		stats += "<span id='stat-tps' class='stat'>" + tps+"tps</span>";
		stats += "<span id='stat-ticks' class='stat'>" + pixelTicks+"</span>";
		if ((typeof pixelMap).length === 9) { return; }
		if (pixelMap[mousePos.x] !== undefined) {
			var currentPixel = pixelMap[mousePos.x][mousePos.y];
			if (typeof(currentPixel) !== "undefined" && currentPixel && currentPixel !== undefined && currentPixel.element) {
				stats += "<span id='stat-element' class='stat'>Elem:"+(elements[currentPixel?.element]?.name || currentPixel?.element)+"</span>";
				stats += "<span id='stat-temperature' class='stat'>Temp:"+formatTemp(currentPixel.temp)+"</span>";
				if (currentPixel.charge) {
					stats += "<span id='stat-charge' class='stat'>C"+currentPixel.charge+"</span>";
				}
				if (currentPixel.burning) {
					stats += "<span id='stat-burning' class='stat'>Burning</span>";
				}
			}
		}
		if (shiftDown) {
			stats += "<span id='stat-shift' class='stat'>"+shiftDownTypes[shiftDown]+"</span>";
		}
		// If the view is not null, show the view in all caps
		if (view !== null) {
			stats += "<span id='stat-view' class='stat'>"+viewKey[view]+"</span>";
		}
		statsDiv.innerHTML = stats;
	}

	quickloadIsPaused = true;
	//Element-based quicksave toggle has proven impossible due to numerous irreparable illogic incidents, so have some buttons instead
	var qsb = document.createElement("button");
	qsb.setAttribute("id","quicksaveButton");
	qsb.setAttribute("onclick","quicksave()");
	qsb.innerText = "Quicksave";
	document.getElementById("gameDiv").before(qsb);
	qsb.after(document.createTextNode(String.fromCharCode(160)));
	var qlb = document.createElement("button");
	qlb.setAttribute("id","quickloadButton");
	qlb.setAttribute("onclick","clearAll(); quickload(quickloadIsPaused ?? true)");
	qlb.innerText = "Quickload";
	document.getElementById("gameDiv").before(qlb);
	qlb.after(document.createTextNode(String.fromCharCode(160,160)));
	var qpc = document.createElement("input");
	qpc.setAttribute("type","checkbox");
	qpc.setAttribute("id","quickloadPausedInput");
	qpc.setAttribute("onchange","quickloadIsPaused = this.checked;");
	qpc.checked = true;
	var qpcd = document.createElement("span");
	qpcd.setAttribute("id","quickloadPausedInputLabel");
	qpcd.innerText = "Pause after quickloading?";
	document.getElementById("gameDiv").before(qpc);
	qpc.after(document.createTextNode(String.fromCharCode(160)));
	document.getElementById("gameDiv").before(qpcd);
	document.getElementById("gameDiv").before(document.createElement("br"));

	quickSlDetectorLastKeys = [];
	justPromptedQuickSL = false;

	document.addEventListener("keydown", function(e) { //prop prompt listener
		quickSlDetectorLastKeys.push(e.key);
		if(quickSlDetectorLastKeys.length > 3) {
			quickSlDetectorLastKeys.shift();
		};
		justPromptedQuickSL = false;
	});

	document.addEventListener("keydown", function(e) { //prop prompt listener
		if (quickSlDetectorLastKeys.join(",") == "(,(,L") {
			e.preventDefault();
			var confirm = prompt("Are you sure you want to quickLOAD? (Type 'yes' to confirm)");
			if(confirm == "yes") {
				clearAll();
				quickload(true,false,true);
			};
			justPromptedQuickSL = true;
			quickSlDetectorLastKeys = [];
		} else if (quickSlDetectorLastKeys.join(",") == "(,(,S") {
			e.preventDefault();
			var confirm = prompt("Are you sure you want to quickSAVE? (Type 'yes' to confirm)");
			if(confirm == "yes") {
				quicksave(true,true);
			};
			justPromptedQuickSL = true;
			quickSlDetectorLastKeys = [];
		};
	});

} catch (error) {
	alert(`save_loading error: ${error.toString()}`);
};
