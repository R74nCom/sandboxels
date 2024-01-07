elements.obsidian = {
	color: ["#343434", "#313639"],
	behavior: behaviors.SOLID,
	category: "solids",
	state: "solid",
    density: 2380,
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
	color: ["#343434", "#313639"],
	behavior: behaviors.POWDER,
	category: "powders",
	state: "solid",
    density: 2380,
    reactions: {
            "glue": { elem1: "obsidian" },
            }
    },
elements.magma = {
    color: ["#ff6f00","#ff8c00","#ff4d00"],
    behavior: behaviors.MOLTEN,
    reactions: {
        "ice": { elem1: "basalt" },
        "ash": { elem1: "molten_tuff", "elem2":null },
        "molten_ash": { elem1: "molten_tuff", "elem2":null },
        "charcoal": { elem2:"diamond", tempMin:800, chance:0.005, oneway:true },
    },
    temp: 1200,
    tempLow: 800,
    stateLow: ["basalt","basalt","basalt","rock","obsidian_shard","obsidian"],
    viscosity: 10000,
    category: "liquids",
    state: "liquid",
    density: 2725
    }
