killerArray = ["radiation", "alcohol", "soap", "acid", "ammonia", "acid_gas", "bleach", "poison", "ice_nine"];
plantArray = ["plant", "frozen_plant", "grass", "algae", "sapling", "seeds", "grass_seed", "wheat_seed", "wheat", "flower_seed", "pistil", "petal", "vine", "bamboo", "bamboo_plant", "corn_seed", "potato_seed", "root", "berry_seed", "old_berry_leaf", "berry_leaf", "berry"];
if(enabledMods.includes("mods/alcohol.js")) {
	killerArray.push("methanol");
	killerArray.push("propanol");
	killerArray.push("isopropanol");
	killerArray.push("butanol");
};

runAfterLoad(function() {
for(i = 0; i < killerArray.length; i++) {
	if(!elements[killerArray[i]].reactions) {
		elements[killerArray[i]].reactions = {}
	}
	for(j = 0; j < plantArray.length; j++) {
		elements[killerArray[i]].reactions[plantArray[j]] = { "elem1":null, "elem2":"dead_plant" }
	};
};
});
