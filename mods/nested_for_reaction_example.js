arrayNameA = ["radiation", "alcohol", "soap", "acid", "ammonia", "acid_gas"]
arrayNameB = ["plant", "frozen_plant", "grass", "algae", "sapling", "seeds", "grass_seed", "wheat_seed", "wheat", "flower_seed", "pistil", "petal", "vine", "bamboo", "bamboo_plant", "corn_seed", "potato_seed", "root", "berry_seed", "old_berry_leaf", "berry_leaf", "berry"]
for(i = 0; i < arrayNameA.length; i++) {
	if(!elements[arrayNameA[i]].reactions) {
		elements[arrayNameA[i]].reactions = {}
	}
	for(j = 0; j < arrayNameB.length; j++) {
		elements[arrayNameA[i]].reactions[arrayNameB[j]] = { "elem1":null, "elem2":"dead_plant" }
	};
};