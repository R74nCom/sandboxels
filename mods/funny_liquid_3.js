elements.vomit = {
	color: ["#d9cb89", "#dbe6a1", "#e3da94", "#f5e6a4", "#f2f0e9", "#ded276", "#f0d58d"],
	behavior: [
		"XX|DB%3.5|XX",
		"DB%3.5 AND M2|XX|DB%3.5 AND M2",
		"DB%3.5 AND M2|DB%7 AND M1|DB%3.5 AND M2",
	],
	ignore: ["glass","glass_shard","baked_clay","acid_gas","neutral_acid","acid","water","wall","brick","plastic","dirt","sand","mud","rock","wet_sand","gravel"],
	reactions: {
		"ash": { "elem1":"neutral_acid", "elem2":null },
		"limestone": { "elem1":"neutral_acid", "elem2":null },
		"quicklime": { "elem1":"neutral_acid", "elem2":null },
		"slaked_lime": { "elem1":"neutral_acid", "elem2":null },
		"borax": { "elem1":"neutral_acid", "elem2":null },
		"ammonia": { "elem1":"neutral_acid", "elem2":null },
		"iron": { "elem1":["vomit","vomit","vomit",null], "elem2":"rust" },
		"copper": { "elem1":["vomit","vomit","vomit",null], "elem2":"oxidized_copper" },
	},
	category: "liquids",
	tempHigh: 100,
	stateHigh: ["acid_gas","steam"],
	state: "liquid",
	density: 1049,
}