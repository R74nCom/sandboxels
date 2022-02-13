elements.clone_liquid = {
	color: "#f0f000",
	behavior: [
		"XX|CF|XX",
		"CF AND M2|XX|CF AND M2",
		"M1|CF AND M1|M1",
	],
	ignore: ["cloner","ecloner","slow_cloner","floating_cloner","clone_powder","clone_liquid_spout"],
	category:"machines",
	insulate:true,
	state:"gas",
	density:2710,
	hardness: 1,
},

elements.floating_cloner.state = "gas"

runAfterLoad(function() {
	if(enabledMods.includes("mods/spouts.js")) {
		elements.floating_cloner.ignore.push("floating_cloner_spout")
	}
});