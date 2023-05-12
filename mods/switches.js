var modName = "mods/switches.js";
var formerlyNoConductMod = "mods/doElectricity changes.js";

if(enabledMods.includes(formerlyNoConductMod)) {
	elements.switch_off = {
		name: "switch (off)",
		color: "#7F3333",
		behavior: behaviors.WALL,
		noConduct: ["switch_on_control","switch_off_control"],
		category: "machines",
	};

	elements.switch_on = {
		name: "switch (on)",
		color: "#33CC33",
		behavior: behaviors.WALL,
		conduct: 1,
		noConduct: ["switch_on_control","switch_off_control"],
		category: "machines",
	};

	elements.switch_off_control = {
		color: "#FF3333",
		behavior: behaviors.WALL,
		behaviorOn: [
			"XX|CH:switch_on>switch_off|XX",
			"CH:switch_on>switch_off|XX|CH:switch_on>switch_off",
			"XX|CH:switch_on>switch_off|XX"
		],
		conduct: 1,
		noConduct: ["switch_on","switch_off"],
		category: "machines",
	};

	elements.switch_on_control = {
		color: "#33FF33",
		behavior: behaviors.WALL,
		behaviorOn: [
			"XX|CH:switch_off>switch_on|XX",
			"CH:switch_off>switch_on|XX|CH:switch_off>switch_on",
			"XX|CH:switch_off>switch_on|XX"
		],
		conduct: 1,
		noConduct: ["switch_on","switch_off"],
		category: "machines",
	};
} else {
	enabledMods.splice(enabledMods.indexOf(modName),0,formerlyNoConductMod)
	alert(`The ${formerlyNoConductMod} mod is required and has been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
