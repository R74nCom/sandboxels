elements.obsidian = {
	color: ["#343434", "#313639"],
	behavior: behaviors.SOLID,
	category: "solids",
	state: "solid",
    reactions: {
        "sand": { elem1: "obsidian_shard" },
        "dirt": { elem1: "obsidian_shard" },
        "rock": { elem1: "obsidian_shard" },
        "mudstone": { elem1: "obsidian_shard" },
        "packed_snow": { elem1: "obsidian_shard" },
        "gravel": { elem1: "obsidian_shard" },
        "clay": { elem1: "obsidian_shard" },
        "clay_soil": { elem1: "obsidian_shard" },
        "permafrost": { elem1: "obsidian_shard" },
        "mulch": { elem1: "obsidian_shard" },
        "basalt": { elem1: "obsidian_shard" },
        "tuff": { elem1: "mud" },
        "limestone": { elem1: "obsidian_shard" },
        "quicklime": { elem1: "obsidian_shard" },
        "slaked_lime": { elem1: "obsidian_shard" },
        }
    },
    elements.obsidian_shard = {
	color: ["#343434" , "#313639"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
    }