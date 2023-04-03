var modName = "mods/hot_rocks.js";
var groundMod = "mods/the_ground.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(groundMod) && enabledMods.includes(libraryMod)) {
	function redHotColorgen(colorIn,outputFormat="rgb") {
		var color = colorIn;
		//console.log(color);
		if(!Array.isArray(color)) {
			color = [color];
		};
		//console.log(color);
		color = color.map(x => convertColorFormats(x,"json"));
		//console.log(color);
		for(i = 0; i < color.length; i++) {
			var subcolor = color[i];
			//console.log(i);
			subcolor.r += 48;
			subcolor.r *= 1.7;
			subcolor.g += 24;
			subcolor.g *= 1.2;
			subcolor.g -= 16;
			subcolor.b -= 10;
			subcolor.b *= 0.75;
			for(colorlet in subcolor) {
				subcolor[colorlet] = Math.round(rgbColorBound(subcolor[colorlet]));
			};
			//console.log(color);
		};
		//console.log(color);
		color = color.map(x => convertColorFormats(x,outputFormat));
		if(color.length == 1) { color = color[0] };
		return color;
	};

	var hotNameOverrides = {
		dry_dirt: "hot_dirt",
	};

	elements.dirt._data = ["mixed","mixed","particulate"];
	elements.dry_dirt._data = ["mixed","mixed","particulate"];
	//console.log(elements.dry_dirt.stateHigh);

	runAfterLoad(function() {
		var igneousRocksAndSands = Object.keys(elements).filter(
			function(elemName) {
				//console.log(elemName,elements[elemName]._data?.[2]);
				return ["igneous_rock","solid_igneous_rock","igneous_gravel","sedimentary_rock","particulate"].includes(elements[elemName]._data?.[2]) && !("clay","limestone","black_limestone","shale".includes(elemName))
			}
		);

		console.log(igneousRocksAndSands);

		function hotData2Switch(data2) {
			switch(data2) {
				case "igneous_rock":
					return "hot_igneous_rock";
				case "solid_igneous_rock":
					return "hot_solid_igneous_rock";
				case "particulate":
					return "hot_particulate";
				case "sedimentary_rock":
					return "hot_sedimentary_rock";
				case "igneous_gravel":
					return "hot_igneous_gravel";
				default:
					return "hot_" + data2;
			};
		};

		igneousRocksAndSands = igneousRocksAndSands.concat("dry_dirt");

		hotRockBehavior = [
			"XX|CR:fire%0.5|XX",
			"XX|XX|XX",
			"M2|M1|M2"
		];

		solidHotRockBehavior = [
			"XX|CR:fire%0.1|XX",
			"CR:fire%0.1|XX|CR:fire%0.1",
			"XX|CR:fire%0.1|XX"
		];

		for(j = 0; j < igneousRocksAndSands.length; j++) {
			var rockName = igneousRocksAndSands[j];
			var rockInfo = elements[rockName];
			if(!rockInfo) {
				console.error(rockName);
				continue;
			};
			var rockData = rockInfo._data ?? ["error","error","hot_unknown"];
			var newName = hotNameOverrides[rockName] ?? "hot_" + rockName;
			//console.log(rockInfo.stateHigh);
			elements[newName] = {
				color: redHotColorgen(rockInfo.color,"hex"),
				behavior: hotData2Switch(rockData[2]).includes("solid") ? solidHotRockBehavior : hotRockBehavior,
				category: "land",
				state: "solid",
				temp: Math.min(rockInfo.tempHigh - 50,850),
				tempHigh: rockInfo.tempHigh,
				tempLow: Math.min(rockInfo.tempHigh - 100,800),
				stateLow: rockName,
				stateHigh: rockInfo.stateHigh,
				density: rockData.density * 0.9,
				hardness: rockData.density * 0.85,
				//breakInto: newName + "_gravel",
				_data: [rockData[0], rockData[1], hotData2Switch(rockData[2])],
			};
			
			if(rockName == "basalt") {
				elements[newName].behavior = [
					"XX|CR:fire%0.5|XX",
					"XX|XX|XX",
					"XX|M1|XX"
				]
			};
			
			//console.log(j);
			
			if(rockInfo.nellfireImmune) {
				elements[newName].nellfireImmune = true;
			};
			
			elements[rockName].tempHigh = Math.min(rockInfo.tempHigh - 100,800);
			elements[rockName].stateHigh = newName;
			if(rockInfo._data[2] == "igneous_rock" && elements[newName + "_gravel"]) {
				elements[newName].stateHigh = newName + "_gravel";
			};
		};

		elements.dirt.tempHigh = 100;
		elements.dirt.stateHigh = "dry_dirt";
		elements.dry_dirt.tempHigh = 800;
		elements.dry_dirt.stateHigh = "hot_dirt";
		elements.hot_dirt.tempHigh = 1200;
		elements.hot_dirt.stateHigh = "molten_dirt";
		elements.hot_dirt.tempLow = 800;
		elements.hot_dirt.stateLow = "dry_dirt";
	});
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod);
	enabledMods.splice(enabledMods.indexOf(modName),0,groundMod);
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The ${groundMod} and ${libraryMod} mods are required and have been automatically inserted (reload for this to take effect).`);
};
