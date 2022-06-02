elements.bioooze = {
    color: ["#53FF4F", "#53FF4F", "#06DE00", "#04A600", "#036E00"],
    behavior: behaviors.LIQUID,
    tempHigh: 100,
    stateHigh: ["plague","slime","steam","poison"],
    //tempLow: -4,
    //stateLow: "bioooze_ice",
    category: "liquids",
    heatCapacity: 3.52, //unimplemented feature
    name: "bio-ooze",
    reactions: {
        "water": { "elem1":"slime", "elem2":"slime" }, //balance
        "poison": { "elem1":"slime", "elem2":"slime" }, //balance
        //"acid": { "elem1":"wastestone" }, //acid should be sulfuric acid and product should be wastestone
        //"elder_fluid": { "elem1":"corrupt_slime" }, //acid should be sulfuric acid and product should be wastestone
        //"mercury": { "elem1":"liquid_protocite" }, //acid should be sulfuric acid and product should be wastestone
        //"blue_grav_liquid": { "elem1":"blue_grav_liquid" }, //bgl would set gravity to upwards gravity
                                                              //thank fuck that elements are rotatable in sandboxels or else this
                                                              //would be meaningless and unimplementable
        "blood": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "infection" },
        "soap": { "elem1": "slime", "chance": 0.02 },
        "plant": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "grass": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "algae": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "mushroom_spore": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "lichen": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "rat": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "rotten_meat" },
        "frog": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "rotten_meat" },
        "fish": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "rotten_meat" },
        "bird": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "rotten_meat" },
        "head": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "rotten_meat" },
        "body": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "rotten_meat" },
        "ant": { "elem1": ["bioooze","bioooze","bioooze","bioooze","poison","slime",null], "elem2": "dust" },
        "worm": { "elem1": ["bioooze","bioooze","bioooze","bioooze","poison","slime",null], "elem2": "dust" },
        "fly": { "elem1": ["bioooze","bioooze","bioooze","bioooze","poison","slime",null], "elem2": "dust" },
        "firefly": { "elem1": ["bioooze","bioooze","bioooze","bioooze","poison","slime",null], "elem2": "dust" },
        "bee": { "elem1": ["bioooze","bioooze","bioooze","bioooze","poison","slime",null], "elem2": "dust" },
        "slug": { "elem1": ["bioooze","bioooze","bioooze","bioooze","poison","slime",null], "elem2": "dust" },
        "snail": { "elem1": ["bioooze","bioooze","bioooze","bioooze","poison","slime",null], "elem2": "calcium" },
        "sapling": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "root": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "flower_seed": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "pistil": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "petal": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "grass_seed": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "dead_plant" },
        "meat": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "rotten_meat" },
        "wood": { "elem1": ["bioooze","bioooze","poison","slime",null], "elem2": "sawdust", "chance": 0.25 }
    },
    /*reactions: {
        "dirt": { // React with (water reacts with dirt to make mud)
            "elem1": null, // First element transforms into; in this case, water deletes itself
            "elem2": "mud", // Second element transforms into; in this case, dirt turns to mud
        },
        "sand": { "elem1": null, "elem2": "wet_sand", },
        "salt": { "elem1": "salt_water", "elem2": null },
        "sugar": { "elem1": "sugar_water", "elem2": null, },
        "dust": { "elem1": "dirty_water", "elem2": null, },
        "ash": { "elem1": "dirty_water", "elem2": null, },
        "cyanide": { "elem1": "dirty_water", "elem2": null, },
        "carbon_dioxide": { "elem1": "seltzer", "elem2": null, "oneway":true },
        "sulfur": { "elem1": "dirty_water", "elem2": null, },
        "rat": { "elem1": "dirty_water", chance:0.005 },
        "plague": { "elem1": "dirty_water", "elem2": null, },
        "rust": { "elem1": "dirty_water", chance:0.005 },
        "fallout": { "elem1": "dirty_water", chance:0.25 },
        "radiation": { "elem1": "dirty_water", chance:0.25 },
        "uranium": { "elem1": "dirty_water", chance:0.25 },
        "quicklime": { "elem1": null, "elem2": "slaked_lime", },
        "rock": { "elem2": "wet_sand", "chance": 0.00035 },
        "ruins": { "elem2": "rock", "chance": 0.00035 },
        "mudstone": { "elem2": "mud", "chance": 0.00035 },
        "methane": { "elem1":"primordial_soup", "elem2":"primordial_soup", tempMin:60, charged:true },
        "ammonia": { "elem1":"primordial_soup", "elem2":"primordial_soup", tempMin:60, charged:true },
    },*/
    state: "liquid",
    density: 1.03,
    conduct: 0.0008,
    stain: 0.2,
    viscosity: 60,
    description: "A particularly potent toxic sludge loaded with parasites and ickiness.",
}
