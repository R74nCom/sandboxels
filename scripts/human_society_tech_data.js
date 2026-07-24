/*
 * Human Society technology data.
 *
 * The exported value intentionally contains JSON-compatible data only. Runtime
 * systems may build indexes or attach behavior after loading this module.
 */
(function(root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    }
    else {
        root.HumanSocietyTechData = factory();
    }
})(typeof globalThis !== "undefined" ? globalThis : this, function() {
    "use strict";

    const KNOWLEDGE_DOMAINS = ["production", "construction", "society", "military"];
    const DEFAULT_VISION = [8, 8, 9, 10, 11, 12];
    const ERA_TECH_COUNT = 8;
    const ERA_ADVANCE_REQUIRED = 6;
    const ERA_POPULATION_TARGETS = {
        tribal: 6,
        stone: 8,
        agriculture: 12,
        bronze: 16,
        iron: 20,
        castle: 24
    };
    const ERA_JOB_WEIGHTS = {
        tribal: {food: 2, wood: 2, builder: 1, flex: 1},
        stone: {food: 2, wood: 2, miner: 2, builder: 1, artisan: 1},
        agriculture: {
            food: 4,
            wood: 2,
            miner: 1,
            builder: 1,
            forester: 1,
            artisan: 1,
            military: 1,
            flex: 1
        },
        bronze: {
            food: 4,
            wood: 2,
            miner: 3,
            builder: 2,
            forester: 1,
            artisan: 1,
            industry: 1,
            scholar: 1,
            military: 1
        },
        iron: {
            food: 5,
            wood: 2,
            miner: 4,
            builder: 2,
            forester: 1,
            artisan: 1,
            industry: 2,
            scholar: 1,
            military: 2
        },
        castle: {
            food: 6,
            wood: 2,
            miner: 4,
            builder: 2,
            forester: 1,
            artisan_trade: 2,
            industry: 2,
            scholar: 2,
            military: 3
        }
    };

    const ERA_SPECS = [
        {id: "tribal", name: "Tribal", costs: [20, 28]},
        {id: "stone", name: "Stone", costs: [35, 48]},
        {id: "agriculture", name: "Agriculture", costs: [55, 75]},
        {id: "bronze", name: "Bronze", costs: [80, 110]},
        {id: "iron", name: "Iron", costs: [115, 155]},
        {id: "castle", name: "Castle", costs: [160, 220]}
    ];

    function stock(resource, minimum, hard) {
        return {type: "resource_stock", resource, minimum, hard: Boolean(hard)};
    }

    function encountered(resource, minimum, hard) {
        return {type: "resource_encountered", resource, minimum, hard: Boolean(hard)};
    }

    function heat(minimum, hard) {
        return {type: "heat_available", minimum, hard: Boolean(hard)};
    }

    function population(minimum) {
        return {type: "population", minimum, hard: false};
    }

    function milestone(id, minimum) {
        return {type: "milestone", id, minimum, hard: false};
    }

    function unlock(target, id) {
        return {type: "unlock", target, id};
    }

    function modifier(stat, operation, value) {
        return {type: "modifier", stat, operation, value};
    }

    function set(stat, value) {
        return {type: "set", stat, value};
    }

    function enable(feature) {
        return {type: "enable", feature};
    }

    /*
     * Entries are grouped in domain order: two production, two construction,
     * two society, then two military. The first item in each pair uses the
     * lower era cost and the second uses the higher era cost.
     */
    const TECH_SPECS = {
        tribal: [
            {
                id: "organized_gathering",
                name: "Organized Gathering",
                prerequisites: [],
                conditions: [population(2)],
                effects: [
                    modifier("carryCapacity", "add", 2),
                    modifier("harvestSpeed", "multiply", 1.10)
                ]
            },
            {
                id: "controlled_fire",
                name: "Controlled Fire",
                prerequisites: ["organized_gathering"],
                conditions: [stock("wood", 3, false)],
                effects: [
                    unlock("building", "hearth"),
                    enable("hearthHealing")
                ]
            },
            {
                id: "simple_shelters",
                name: "Simple Shelters",
                prerequisites: [],
                conditions: [stock("wood", 4, false)],
                effects: [unlock("building", "hut")]
            },
            {
                id: "woodworking",
                name: "Woodworking",
                prerequisites: ["simple_shelters"],
                conditions: [stock("wood", 6, false)],
                effects: [
                    modifier("buildSpeed", "multiply", 1.20),
                    modifier("woodBuildingHitPoints", "multiply", 1.20)
                ]
            },
            {
                id: "clan_council",
                name: "Clan Council",
                prerequisites: [],
                conditions: [population(3)],
                effects: [modifier("knowledgeGain", "multiply", 1.10)]
            },
            {
                id: "oral_tradition",
                name: "Oral Tradition",
                prerequisites: ["clan_council"],
                conditions: [population(4)],
                effects: [modifier("milestoneKnowledge", "multiply", 1.25)]
            },
            {
                id: "war_clubs",
                name: "War Clubs",
                prerequisites: ["woodworking"],
                conditions: [stock("wood", 2, false)],
                effects: [unlock("weapon", "club")]
            },
            {
                id: "hunting_cooperation",
                name: "Hunting Cooperation",
                prerequisites: ["war_clubs", "organized_gathering"],
                conditions: [population(4)],
                effects: [
                    unlock("role", "hunter"),
                    unlock("foodSource", "animal")
                ]
            }
        ],

        stone: [
            {
                id: "stone_knapping",
                name: "Stone Knapping",
                prerequisites: ["organized_gathering"],
                conditions: [encountered("stone", 1, false)],
                effects: [unlock("resource", "stone")]
            },
            {
                id: "polished_axes",
                name: "Polished Axes",
                prerequisites: ["stone_knapping", "woodworking"],
                conditions: [stock("stone", 2, false), stock("wood", 1, false)],
                effects: [
                    modifier("woodHarvestSpeed", "multiply", 1.20),
                    set("woodExtraYieldChance", 0.25)
                ]
            },
            {
                id: "artisan_shed",
                name: "Artisan Shed",
                prerequisites: ["woodworking"],
                conditions: [stock("wood", 8, false)],
                effects: [unlock("building", "workshop")]
            },
            {
                id: "quarrying",
                name: "Quarrying",
                prerequisites: ["artisan_shed", "stone_knapping"],
                conditions: [stock("stone", 6, false)],
                effects: [
                    unlock("building", "quarry"),
                    modifier("stoneYield", "multiply", 1.25)
                ]
            },
            {
                id: "craft_specialization",
                name: "Craft Specialization",
                prerequisites: ["clan_council", "artisan_shed"],
                conditions: [population(6)],
                effects: [
                    modifier("roleWorkSpeed", "multiply", 1.15),
                    set("roleLockTicks", 120)
                ]
            },
            {
                id: "tally_marks",
                name: "Tally Marks",
                prerequisites: ["craft_specialization", "oral_tradition"],
                conditions: [milestone("resourceDeliveries", 3)],
                effects: [enable("deliveryKnowledge")]
            },
            {
                id: "stone_spearheads",
                name: "Stone Spearheads",
                prerequisites: ["stone_knapping", "war_clubs"],
                conditions: [stock("stone", 2, false)],
                effects: [unlock("weapon", "spear")]
            },
            {
                id: "palisade_defense",
                name: "Palisade Defense",
                prerequisites: ["stone_spearheads", "woodworking"],
                conditions: [stock("wood", 12, false)],
                effects: [
                    unlock("building", "palisade"),
                    unlock("building", "palisade_gate")
                ]
            }
        ],

        agriculture: [
            {
                id: "seed_selection",
                name: "Seed Selection",
                prerequisites: ["polished_axes"],
                conditions: [encountered("seed", 2, false)],
                effects: [
                    unlock("building", "farm"),
                    enable("seedReturn")
                ]
            },
            {
                id: "managed_forestry",
                name: "Managed Forestry",
                prerequisites: ["seed_selection", "polished_axes"],
                conditions: [encountered("tree_seed", 1, false)],
                effects: [
                    unlock("role", "forester"),
                    modifier("seedDropChance", "add", 0.25)
                ]
            },
            {
                id: "granary",
                name: "Granary",
                prerequisites: ["artisan_shed", "seed_selection"],
                conditions: [stock("wood", 10, false), stock("food", 12, false)],
                effects: [
                    unlock("building", "granary"),
                    set("birthFoodCost", 5)
                ]
            },
            {
                id: "irrigation",
                name: "Irrigation",
                prerequisites: ["granary", "quarrying"],
                conditions: [encountered("water", 1, false), stock("stone", 8, false)],
                effects: [
                    modifier("farmYield", "multiply", 1.25),
                    modifier("farmPlots", "add", 2)
                ]
            },
            {
                id: "village_planning",
                name: "Village Planning",
                prerequisites: ["craft_specialization", "granary"],
                conditions: [population(8)],
                effects: [
                    modifier("hutHousing", "add", 1),
                    modifier("territoryRadius", "add", 2)
                ]
            },
            {
                id: "barter",
                name: "Barter",
                prerequisites: ["village_planning", "tally_marks"],
                conditions: [population(10), stock("food", 20, false)],
                effects: [unlock("trade", "basic")]
            },
            {
                id: "militia",
                name: "Militia",
                prerequisites: ["palisade_defense", "village_planning"],
                conditions: [population(8)],
                effects: [
                    set("peacetimeWarriors", 1),
                    set("wartimeWarriorRatio", 0.50)
                ]
            },
            {
                id: "bowmaking",
                name: "Bowmaking",
                prerequisites: ["militia", "managed_forestry"],
                conditions: [stock("wood", 6, false)],
                effects: [unlock("weapon", "bow")]
            }
        ],

        bronze: [
            {
                id: "copper_prospecting",
                name: "Copper Prospecting",
                prerequisites: ["managed_forestry", "stone_knapping"],
                conditions: [encountered("copper", 1, true)],
                effects: [unlock("resource", "copper")]
            },
            {
                id: "tin_prospecting",
                name: "Tin Prospecting",
                prerequisites: ["copper_prospecting"],
                conditions: [encountered("tin", 1, true)],
                effects: [unlock("resource", "tin")]
            },
            {
                id: "charcoal_kiln",
                name: "Charcoal Kiln",
                prerequisites: ["irrigation", "woodworking"],
                conditions: [stock("wood", 3, true)],
                effects: [
                    unlock("building", "kiln"),
                    unlock("recipe", "charcoal")
                ]
            },
            {
                id: "bronze_foundry",
                name: "Bronze Foundry",
                prerequisites: ["charcoal_kiln", "copper_prospecting", "tin_prospecting"],
                conditions: [
                    stock("copper", 3, true),
                    stock("tin", 1, true),
                    heat(8, true)
                ],
                effects: [
                    unlock("building", "foundry"),
                    unlock("recipe", "bronze")
                ]
            },
            {
                id: "writing",
                name: "Writing",
                prerequisites: ["tally_marks", "village_planning"],
                conditions: [population(10)],
                effects: [modifier("knowledgeGain", "multiply", 1.20)]
            },
            {
                id: "administration",
                name: "Administration",
                prerequisites: ["writing", "barter"],
                conditions: [population(12)],
                effects: [set("constructionSlots", 2)]
            },
            {
                id: "bronze_weapons",
                name: "Bronze Weapons",
                prerequisites: ["bronze_foundry", "bowmaking"],
                conditions: [stock("bronze", 4, true)],
                effects: [
                    unlock("weapon", "bronze_sword"),
                    unlock("weapon", "bronze_spear")
                ]
            },
            {
                id: "shield_formation",
                name: "Shield Formation",
                prerequisites: ["bronze_weapons", "militia"],
                conditions: [stock("bronze", 4, true), population(10)],
                effects: [modifier("incomingDamage", "multiply", 0.85)]
            }
        ],

        iron: [
            {
                id: "iron_prospecting",
                name: "Iron Prospecting",
                prerequisites: ["tin_prospecting"],
                conditions: [encountered("raw_iron", 1, true)],
                effects: [unlock("resource", "raw_iron")]
            },
            {
                id: "iron_smelting",
                name: "Iron Smelting",
                prerequisites: ["iron_prospecting", "bronze_foundry"],
                conditions: [stock("raw_iron", 2, true), heat(12, true)],
                effects: [
                    unlock("recipe", "iron"),
                    modifier("workSpeed", "multiply", 1.20)
                ]
            },
            {
                id: "forge",
                name: "Forge",
                prerequisites: ["bronze_foundry", "iron_smelting"],
                conditions: [stock("iron", 2, true)],
                effects: [unlock("building", "forge")]
            },
            {
                id: "stone_fortifications",
                name: "Stone Fortifications",
                prerequisites: ["forge", "quarrying"],
                conditions: [stock("stone", 20, false), stock("iron", 2, true)],
                effects: [
                    unlock("building", "stone_wall"),
                    unlock("building", "stone_gate"),
                    unlock("building", "watchtower")
                ]
            },
            {
                id: "coinage",
                name: "Coinage",
                prerequisites: ["administration", "iron_smelting"],
                conditions: [stock("iron", 1, true)],
                effects: [
                    unlock("trade", "metals"),
                    modifier("tradeSpeed", "multiply", 1.25)
                ]
            },
            {
                id: "codified_law",
                name: "Codified Law",
                prerequisites: ["coinage", "writing"],
                conditions: [population(14)],
                effects: [
                    modifier("hostilityDecay", "multiply", 1.50),
                    modifier("ceasefireDelay", "multiply", 0.75)
                ]
            },
            {
                id: "iron_weapons",
                name: "Iron Weapons",
                prerequisites: ["iron_smelting", "bronze_weapons"],
                conditions: [stock("iron", 4, true)],
                effects: [
                    unlock("weapon", "iron_sword"),
                    unlock("weapon", "iron_spear")
                ]
            },
            {
                id: "iron_armor",
                name: "Iron Armor",
                prerequisites: ["iron_weapons", "forge"],
                conditions: [stock("iron", 8, true)],
                effects: [modifier("incomingDamage", "multiply", 0.75)]
            }
        ],

        castle: [
            {
                id: "steelmaking",
                name: "Steelmaking",
                prerequisites: ["iron_smelting", "charcoal_kiln"],
                conditions: [stock("iron", 2, true), stock("charcoal", 2, true)],
                effects: [unlock("recipe", "steel")]
            },
            {
                id: "crop_rotation",
                name: "Crop Rotation",
                prerequisites: ["seed_selection", "administration"],
                conditions: [milestone("harvests", 12)],
                effects: [
                    modifier("farmYield", "multiply", 1.40),
                    modifier("farmPlots", "add", 2)
                ]
            },
            {
                id: "castle_building",
                name: "Castle Building",
                prerequisites: ["stone_fortifications", "steelmaking"],
                conditions: [stock("stone", 30, false), stock("steel", 2, true)],
                effects: [
                    unlock("building", "keep"),
                    modifier("housing", "add", 8),
                    modifier("territoryRadius", "add", 6)
                ]
            },
            {
                id: "siege_workshop",
                name: "Siege Workshop",
                prerequisites: ["castle_building", "forge"],
                conditions: [stock("wood", 20, false), stock("steel", 2, true)],
                effects: [unlock("building", "siege_workshop")]
            },
            {
                id: "library",
                name: "Library",
                prerequisites: ["writing", "codified_law"],
                conditions: [population(16)],
                effects: [
                    modifier("knowledgeGain", "multiply", 1.40),
                    set("oldTechDiscount", 0.20)
                ]
            },
            {
                id: "guild_market",
                name: "Guild Market",
                prerequisites: ["library", "coinage"],
                conditions: [population(18)],
                effects: [
                    unlock("trade", "all"),
                    modifier("tradeSpeed", "multiply", 1.50)
                ]
            },
            {
                id: "crossbow",
                name: "Crossbow",
                prerequisites: ["iron_weapons", "bowmaking", "steelmaking"],
                conditions: [stock("iron", 2, true), stock("wood", 4, false)],
                effects: [unlock("weapon", "crossbow")]
            },
            {
                id: "siege_engineering",
                name: "Siege Engineering",
                prerequisites: ["crossbow", "siege_workshop"],
                conditions: [stock("steel", 4, true), stock("wood", 24, false)],
                effects: [
                    unlock("weapon", "battering_ram"),
                    unlock("weapon", "catapult"),
                    modifier("structureDamage", "multiply", 1.50)
                ]
            }
        ]
    };

    const TECHNOLOGIES = [];
    const ERAS = ERA_SPECS.map(function(eraSpec, eraIndex) {
        const specs = TECH_SPECS[eraSpec.id];
        const techIds = [];

        specs.forEach(function(spec, index) {
            const domainIndex = Math.floor(index / 2);
            const tier = index % 2 + 1;
            const domain = KNOWLEDGE_DOMAINS[domainIndex];
            const technology = {
                id: spec.id,
                name: spec.name,
                era: eraSpec.id,
                eraIndex,
                domain,
                tier,
                cost: eraSpec.costs[tier - 1],
                peaceful: domain !== "military",
                prerequisiteMode: "all",
                prerequisites: spec.prerequisites.slice(),
                conditionMode: "all",
                conditions: spec.conditions.slice(),
                effects: spec.effects.slice()
            };

            TECHNOLOGIES.push(technology);
            techIds.push(technology.id);
        });

        return {
            id: eraSpec.id,
            name: eraSpec.name,
            index: eraIndex,
            vision: DEFAULT_VISION[eraIndex],
            costs: eraSpec.costs.slice(),
            technologyCount: ERA_TECH_COUNT,
            requiredTechsToAdvance: ERA_ADVANCE_REQUIRED,
            advancement: {
                technologyCount: ERA_TECH_COUNT,
                required: ERA_ADVANCE_REQUIRED,
                ratio: ERA_ADVANCE_REQUIRED / ERA_TECH_COUNT
            },
            populationTarget: ERA_POPULATION_TARGETS[eraSpec.id],
            jobWeights: Object.assign({}, ERA_JOB_WEIGHTS[eraSpec.id]),
            techIds
        };
    });

    const FUELS = {
        tree_branch: 2,
        bamboo: 3,
        wood: 4,
        charcoal: 10
    };

    const RECIPES = {
        charcoal: {
            id: "charcoal",
            inputs: [{resource: "wood", amount: 3}],
            heat: 0,
            outputs: [{resource: "charcoal", amount: 1}]
        },
        bronze: {
            id: "bronze",
            inputs: [
                {resource: "copper", amount: 3},
                {resource: "tin", amount: 1}
            ],
            heat: 8,
            outputs: [{resource: "bronze", amount: 4}]
        },
        iron: {
            id: "iron",
            inputs: [{resource: "raw_iron", amount: 2}],
            heat: 12,
            outputs: [{resource: "iron", amount: 2}]
        },
        steel: {
            id: "steel",
            inputs: [
                {resource: "iron", amount: 2},
                {resource: "charcoal", amount: 2}
            ],
            heat: 0,
            outputs: [{resource: "steel", amount: 2}]
        }
    };

    const RANGED_WEAPONS = {
        bow: {
            id: "bow",
            unlockEra: "agriculture",
            range: 8,
            damage: 12,
            baseAccuracy: 0.68,
            optimalRange: 3,
            accuracyPenaltyPerTile: 0.06,
            minAccuracy: 0.20,
            maxAccuracy: 0.88
        },
        crossbow: {
            id: "crossbow",
            unlockEra: "castle",
            range: 10,
            damage: 24,
            baseAccuracy: 0.78,
            optimalRange: 4,
            accuracyPenaltyPerTile: 0.04,
            minAccuracy: 0.30,
            maxAccuracy: 0.92
        }
    };

    return {
        version: 1,
        KNOWLEDGE_DOMAINS,
        DEFAULT_VISION,
        ERA_TECH_COUNT,
        ERA_ADVANCE_REQUIRED,
        ERA_POPULATION_TARGETS,
        ERA_JOB_WEIGHTS,
        ERAS,
        TECHNOLOGIES,
        FUELS,
        RECIPES,
        RANGED_WEAPONS
    };
});
