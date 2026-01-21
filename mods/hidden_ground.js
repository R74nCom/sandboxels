// Hidden Ground v1.0
// Author: Melecie

runAfterLoad(function() {
	if (enabledModNames.includes("mods/the_ground_og.js")) {
		let regexRocks = /(granite)|(rhyolite)|(pumice)|(obsidian)|(dacite)|(dacidian)|(andesite)|(diorite)|(scoria)|(andesidian)|(gabbro)|(basalt)|(basalidian)|(peridotite)|(komatiite)|(komatidian)/
		let regexType = /(_gravel)|(_sand)|(_sandstone)|(_dust)|(_shard)|(hot_)/
		let toHide = ["dry_permafrost", "hot_sand", "hot_dirt", "hot_rock", "hot_rock_wall", "hot_gravel", "hot_limestone", "hot_calcium_carbonate_dust", "sandy_water", "clay_water", "dry_clay_loam"]
		
		// hides all elements part of both rocks and type
		// false positives *can* be hit because this doesn't check if it comes from The Ground (it can't), but ideally none given how specific it is
		for (let elem in elements) {
			if (typeof(elements[elem]) == "object" && regexRocks.test(elem)) {
				// move wall to solids to not make land too big
				if (/_wall/.test(elem)) {
					elements[elem].category = "solids"
				}
				// hide the rest
				if (regexType.test(elem)) {
					elements[elem].hidden = true;
				}
			}
		}
		
		// manual hiding
		for (let elem of toHide) {
			if (typeof(elements[elem]) == "object") {
				elements[elem].hidden = true;
			}
		}
		
		// while i'm here, might as well fix Sandstone's color
		//elements.sandstone.color = "#dbbe80";
	}
	
	// else {
	// 	enabledMods.splice(enabledMods.indexOf("mods/hidden_ground.js"), 1);
	// 	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	// 	alert("Hidden Ground: This mod requires The Ground mod. Removing mod and reloading.");
	// 	window.location.reload();
	// }
})