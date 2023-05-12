var modName = "mods/invisible_things.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
	if(!settings) {
		settings = {}
	}

	if(!(settings.bg)) {
		settings.bg = "#000000"
	}

	function getBackgroundColorOrAverageAsJSON() {
		if(!(settings?.bg)) {
			return {r: 0, g: 0, b: 0};
		} else if(!(settings.bg instanceof Array)) {
			return convertColorFormats(settings.bg,"json")
		} else {
			return convertColorFormats(averageRgbPrefixedColorArray(settings.bg.map(color => convertColorFormats(color,"rgb"))),"json");
		};
	};

	function makePixelInvisible(pixel) {
		var backgroundColor = getBackgroundColorOrAverageAsJSON();
		pixel.color = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},0)`;
	};

	elements.invisible_wall = {
		color: settings.bg,
		behavior: behaviors.WALL,
		tick: function(pixel) { makePixelInvisible(pixel) },
		insulate: true,
		hardness: 1,
		category: "special",
		state: "solid",
	};

	elements.invisible_dye = {
		color: settings.bg,
		behavior: behaviors.LIQUID,
		tick: function(pixel) { makePixelInvisible(pixel) },
		hardness: 0.8,
		breakInto: "invisible_dye_gas",
		tempHigh: 110,
		stateHigh: "invisible_dye_gas",
		category: "special",
		state: "liquid",
		density: 1,
		stain: elements.dye.stain,
	};

	elements.invisible_dye_gas = {
		color: settings.bg,
		behavior: behaviors.GAS,
		tick: function(pixel) { makePixelInvisible(pixel) },
		hardness: 0.5,
		breakInto: "invisible_dye_gas",
		tempLow: 109,
		stateLow: "invisible_dye",
		category: "special",
		state: "liquid",
		density: 1,
		stain: elements.spray_paint.stain,
	};

	var temp = {
		invisible_wall: "asdfg",
		invisible_dye: 2,
		invisible_dye_gas: false
	};

	if(enabledMods.includes("mods/gradient_background_support.js")) {
		for(var elemName in temp) {
			elements[elemName].desc = "Invisible dyes <em style='color: yellow;'>do not work</em> and <em style='color: yellow;'>are not supported</em> with gradient backgrouds";
			elements[elemName].hidden = true;
			elements[elemName].excludeRandom = true;
		};
	};
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The ${libraryMod} mod is required and has been automatically inserted (reload for this to take effect).`)
};
