xor = function(c1,c2) {
	if(!!c1 && !c2) {
		return true;
	} else if(!c1 && !!c2) {
		return true;
	} else {
		return false;
	};
};

nand = function(c1,c2) {
	return (!c1 && !c2);
};

function requireMod(modName,doAlert=false,insertMod=false,simpleSandboxelsSubdomainMod=true) {
	if(simpleSandboxelsSubdomainMod) {
		var finalString = modName;
		if(!modName.startsWith("mods/")) {
			//console.log("The 'mods/' prefix is missing! It will be added to the string.");
			finalString = "mods/" + finalString;
		};
		if(!modName.endsWith(".js")) {
			//console.log("The '.js' suffix is missing! It will be added to the string.");
			finalString += ".js";
		};
		//console.log(finalString);
		if(enabledMods.includes(finalString)) {
			console.log(`requireMod: The entry '${finalString}' was present; no action was taken.`);
			return true;
		} else {
			//compile summary string for console.log
			var summaryString = `requireMod: The entry '${finalString}' was not present`; //base
			if(xor(doAlert,insertMod)) { //one option enabled
				if(doAlert) { summaryString += "; the user was alerted." } //it is alert
				else if(insertMod) { summaryString += "; the mod was inserted." }; //it is insert
			} else if(doAlert && insertMod) { //both enabled
				summaryString += "; the user was alerted and the mod inserted."
			} else if(nand(doAlert,insertMod)) { //neither enabled
				summaryString += "; no action was taken.";
			}; console.log(summaryString);
			
			var alertString = `The "${modName}" mod is required`;
			if(insertMod) {
				enabledMods.splice(enabledMods.length, 0, finalString);
				localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
					//console.log("(Pretend to add mod)");
				alertString += " and has been automatically appended to your mod list (reload for this to take effect). If you need it at a certain position, do this in the mod manager after reloading."
			} else {
				alertString += "! Please add it to your mod list in the mod manager and reload."
			};
			if(doAlert) {
				alert(alertString);
			};
			return false;
		};
	} else {
		var finalString = modName;
		//console.log(finalString);
		if(enabledMods.includes(finalString)) {
			console.log(`requireMod: The entry '${finalString}' was present; no action was taken.`);
			return true;
		} else {
			if(insertMod) { doAlert = true }; //so that mods don't try to silently insert malicious scripts (just in case);
			//compile summary string for console.log
			var summaryString = `requireMod: The entry '${finalString}' was not present`; //base
			if(xor(doAlert,insertMod)) { //one option enabled
				if(doAlert) { summaryString += "; the user was alerted." } //it is alert
				else if(insertMod) { summaryString += "; the mod was inserted." }; //it is insert
			} else if(doAlert && insertMod) { //both enabled
				summaryString += "; the user was alerted and the mod inserted."
			} else if(nand(doAlert,insertMod)) { //neither enabled
				summaryString += "; no action was taken.";
			}; console.log(summaryString);
			
			var alertString = `The mod at "${modName}" is required`;
			if(insertMod) {
				enabledMods.splice(enabledMods.length, 0, finalString);
				localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
					//console.log("(Pretend to add mod)");
				alertString += " and has been automatically appended to your mod list (reload for this to take effect). If you need it at a certain position, do this in the mod manager after reloading.\n\nI recommend opening that URL and looking at the mod's source code before reloading, and removing it through the console or by clearing Sandboxels's site data if it looks suspicious."
			} else {
				alertString += "! Please add it to your mod list in the mod manager and reload."
			};
			if(doAlert) {
				alert(alertString);
			};
			return false;
		};
	};
};
