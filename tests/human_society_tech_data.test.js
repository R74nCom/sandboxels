"use strict";

const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");

const Data = require("../scripts/human_society_tech_data.js");

const EXPECTED_ERA_IDS = ["tribal", "stone", "agriculture", "bronze", "iron", "castle"];
const EXPECTED_VISION = [8, 8, 9, 10, 11, 12];
const EXPECTED_COSTS = [
    [20, 28],
    [35, 48],
    [55, 75],
    [80, 110],
    [115, 155],
    [160, 220]
];
const EXPECTED_POPULATION_TARGETS = {
    tribal: 6,
    stone: 8,
    agriculture: 12,
    bronze: 16,
    iron: 20,
    castle: 24
};
const EXPECTED_JOB_WEIGHTS = {
    tribal: {food: 2, wood: 2, builder: 1, flex: 1},
    stone: {food: 2, wood: 2, miner: 2, builder: 1, artisan: 1},
    agriculture: {
        food: 4, wood: 2, miner: 1, builder: 1, forester: 1,
        artisan: 1, military: 1, flex: 1
    },
    bronze: {
        food: 4, wood: 2, miner: 3, builder: 2, forester: 1,
        artisan: 1, industry: 1, scholar: 1, military: 1
    },
    iron: {
        food: 5, wood: 2, miner: 4, builder: 2, forester: 1,
        artisan: 1, industry: 2, scholar: 1, military: 2
    },
    castle: {
        food: 6, wood: 2, miner: 4, builder: 2, forester: 1,
        artisan_trade: 2, industry: 2, scholar: 2, military: 3
    }
};
const EXPECTED_TECH_IDS = {
    tribal: [
        "organized_gathering", "controlled_fire", "simple_shelters", "woodworking",
        "clan_council", "oral_tradition", "war_clubs", "hunting_cooperation"
    ],
    stone: [
        "stone_knapping", "polished_axes", "artisan_shed", "quarrying",
        "craft_specialization", "tally_marks", "stone_spearheads", "palisade_defense"
    ],
    agriculture: [
        "seed_selection", "managed_forestry", "granary", "irrigation",
        "village_planning", "barter", "militia", "bowmaking"
    ],
    bronze: [
        "copper_prospecting", "tin_prospecting", "charcoal_kiln", "bronze_foundry",
        "writing", "administration", "bronze_weapons", "shield_formation"
    ],
    iron: [
        "iron_prospecting", "iron_smelting", "forge", "stone_fortifications",
        "coinage", "codified_law", "iron_weapons", "iron_armor"
    ],
    castle: [
        "steelmaking", "crop_rotation", "castle_building", "siege_workshop",
        "library", "guild_market", "crossbow", "siege_engineering"
    ]
};

function assertJsonValue(value, location) {
    if (value === null) return;

    const valueType = typeof value;
    assert.notEqual(valueType, "undefined", `${location} must not contain undefined`);
    assert.notEqual(valueType, "function", `${location} must not contain functions`);
    assert.notEqual(valueType, "symbol", `${location} must not contain symbols`);
    assert.notEqual(valueType, "bigint", `${location} must not contain bigint`);

    if (valueType === "number") {
        assert.ok(Number.isFinite(value), `${location} must contain finite numbers`);
        return;
    }
    if (valueType !== "object") return;

    if (Array.isArray(value)) {
        value.forEach((item, index) => assertJsonValue(item, `${location}[${index}]`));
        return;
    }

    assert.equal(Object.getPrototypeOf(value), Object.prototype, `${location} must be a plain object`);
    Object.entries(value).forEach(([key, item]) => assertJsonValue(item, `${location}.${key}`));
}

function findCondition(technology, type, resource) {
    return technology.conditions.find((condition) =>
        condition.type === type && (resource === undefined || condition.resource === resource)
    );
}

function findEffect(technology, type, target, id) {
    return technology.effects.find((effect) =>
        effect.type === type && effect.target === target && effect.id === id
    );
}

test("module exports JSON-friendly data in CommonJS and browser-global modes", () => {
    assertJsonValue(Data, "HumanSocietyTechData");
    assert.deepEqual(JSON.parse(JSON.stringify(Data)), Data);

    const source = fs.readFileSync(
        path.join(__dirname, "../scripts/human_society_tech_data.js"),
        "utf8"
    );
    const context = {};
    vm.createContext(context);
    vm.runInContext(source, context);

    assert.equal(context.HumanSocietyTechData.version, 1);
    assert.equal(context.HumanSocietyTechData.ERAS.length, 6);
    assert.equal(context.HumanSocietyTechData.TECHNOLOGIES.length, 48);
});

test("six eras contain the fixed 8-tech layout, domain quotas, costs, and vision", () => {
    assert.deepEqual(Data.KNOWLEDGE_DOMAINS, ["production", "construction", "society", "military"]);
    assert.deepEqual(Data.DEFAULT_VISION, EXPECTED_VISION);
    assert.equal(Data.ERA_TECH_COUNT, 8);
    assert.equal(Data.ERA_ADVANCE_REQUIRED, 6);
    assert.deepEqual(Data.ERA_POPULATION_TARGETS, EXPECTED_POPULATION_TARGETS);
    assert.deepEqual(Data.ERA_JOB_WEIGHTS, EXPECTED_JOB_WEIGHTS);
    assert.deepEqual(Data.ERAS.map((era) => era.id), EXPECTED_ERA_IDS);
    assert.equal(Data.TECHNOLOGIES.length, 48);

    const allIds = new Set();

    Data.ERAS.forEach((era, eraIndex) => {
        assert.equal(era.index, eraIndex);
        assert.equal(era.vision, EXPECTED_VISION[eraIndex]);
        assert.deepEqual(era.costs, EXPECTED_COSTS[eraIndex]);
        assert.equal(era.technologyCount, 8);
        assert.equal(era.requiredTechsToAdvance, 6);
        assert.deepEqual(era.advancement, {
            technologyCount: 8,
            required: 6,
            ratio: 0.75
        });
        assert.equal(era.populationTarget, EXPECTED_POPULATION_TARGETS[era.id]);
        assert.deepEqual(era.jobWeights, EXPECTED_JOB_WEIGHTS[era.id]);
        assert.equal(
            Object.values(era.jobWeights).reduce((sum, weight) => sum + weight, 0),
            era.populationTarget
        );
        assert.deepEqual(era.techIds, EXPECTED_TECH_IDS[era.id]);
        assert.equal(era.techIds.length, 8);

        const technologies = Data.TECHNOLOGIES.filter((technology) => technology.era === era.id);
        assert.equal(technologies.length, 8);
        assert.deepEqual(technologies.map((technology) => technology.id), era.techIds);

        Data.KNOWLEDGE_DOMAINS.forEach((domain) => {
            const pair = technologies.filter((technology) => technology.domain === domain);
            assert.equal(pair.length, 2, `${era.id} must contain exactly two ${domain} technologies`);
            assert.deepEqual(pair.map((technology) => technology.tier), [1, 2]);
            assert.deepEqual(pair.map((technology) => technology.cost), EXPECTED_COSTS[eraIndex]);
        });

        technologies.forEach((technology) => {
            assert.match(technology.id, /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/);
            assert.equal(allIds.has(technology.id), false, `duplicate technology id ${technology.id}`);
            allIds.add(technology.id);
            assert.equal(technology.eraIndex, eraIndex);
            assert.equal(technology.peaceful, technology.domain !== "military");
            assert.equal(technology.prerequisiteMode, "all");
            assert.ok(Array.isArray(technology.prerequisites));
            assert.equal(technology.conditionMode, "all");
            assert.ok(Array.isArray(technology.conditions) && technology.conditions.length > 0);
            assert.ok(Array.isArray(technology.effects) && technology.effects.length > 0);
        });
    });
});

test("technology prerequisites exist, are acyclic, and preserve a six-tech peaceful route", () => {
    const technologyById = Object.fromEntries(Data.TECHNOLOGIES.map((technology) => [technology.id, technology]));
    const positionById = Object.fromEntries(Data.TECHNOLOGIES.map((technology, index) => [technology.id, index]));

    Data.TECHNOLOGIES.forEach((technology) => {
        technology.prerequisites.forEach((prerequisiteId) => {
            const prerequisite = technologyById[prerequisiteId];
            assert.ok(prerequisite, `${technology.id} has missing prerequisite ${prerequisiteId}`);
            assert.ok(
                positionById[prerequisiteId] < positionById[technology.id],
                `${technology.id} must only depend on an earlier technology`
            );
            if (technology.peaceful) {
                assert.equal(
                    prerequisite.peaceful,
                    true,
                    `${technology.id} must not make the peaceful route depend on ${prerequisiteId}`
                );
            }
        });
    });

    const peacefullyUnlocked = new Set();
    Data.ERAS.forEach((era) => {
        const peacefulTechnologies = era.techIds
            .map((id) => technologyById[id])
            .filter((technology) => technology.peaceful);

        assert.equal(peacefulTechnologies.length, era.requiredTechsToAdvance);
        peacefulTechnologies.forEach((technology) => {
            assert.ok(
                technology.prerequisites.every((id) => peacefullyUnlocked.has(id)),
                `${technology.id} must be reachable without military research`
            );
            peacefullyUnlocked.add(technology.id);
        });
    });
});

test("bronze, iron, and steel progression has real hard material gates", () => {
    const technologyById = Object.fromEntries(Data.TECHNOLOGIES.map((technology) => [technology.id, technology]));

    const bronzeFoundry = technologyById.bronze_foundry;
    assert.deepEqual(findCondition(bronzeFoundry, "resource_stock", "copper"), {
        type: "resource_stock", resource: "copper", minimum: 3, hard: true
    });
    assert.deepEqual(findCondition(bronzeFoundry, "resource_stock", "tin"), {
        type: "resource_stock", resource: "tin", minimum: 1, hard: true
    });
    assert.deepEqual(findCondition(bronzeFoundry, "heat_available"), {
        type: "heat_available", minimum: 8, hard: true
    });

    const ironSmelting = technologyById.iron_smelting;
    assert.deepEqual(findCondition(ironSmelting, "resource_stock", "raw_iron"), {
        type: "resource_stock", resource: "raw_iron", minimum: 2, hard: true
    });
    assert.deepEqual(findCondition(ironSmelting, "heat_available"), {
        type: "heat_available", minimum: 12, hard: true
    });
    assert.equal(findCondition(technologyById.forge, "resource_stock", "iron").hard, true);

    const steelmaking = technologyById.steelmaking;
    assert.equal(findCondition(steelmaking, "resource_stock", "iron").hard, true);
    assert.equal(findCondition(steelmaking, "resource_stock", "charcoal").hard, true);
    assert.equal(findCondition(technologyById.castle_building, "resource_stock", "steel").hard, true);
});

test("fuel values, crafting recipes, and ranged weapon parameters are locked", () => {
    assert.deepEqual(Data.FUELS, {
        tree_branch: 2,
        bamboo: 3,
        wood: 4,
        charcoal: 10
    });

    assert.deepEqual(Data.RECIPES, {
        charcoal: {
            id: "charcoal",
            inputs: [{resource: "wood", amount: 3}],
            heat: 0,
            outputs: [{resource: "charcoal", amount: 1}]
        },
        bronze: {
            id: "bronze",
            inputs: [{resource: "copper", amount: 3}, {resource: "tin", amount: 1}],
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
            inputs: [{resource: "iron", amount: 2}, {resource: "charcoal", amount: 2}],
            heat: 0,
            outputs: [{resource: "steel", amount: 2}]
        }
    });

    assert.deepEqual(Data.RANGED_WEAPONS.bow, {
        id: "bow",
        unlockEra: "agriculture",
        range: 8,
        damage: 12,
        baseAccuracy: 0.68,
        optimalRange: 3,
        accuracyPenaltyPerTile: 0.06,
        minAccuracy: 0.20,
        maxAccuracy: 0.88
    });
    assert.deepEqual(Data.RANGED_WEAPONS.crossbow, {
        id: "crossbow",
        unlockEra: "castle",
        range: 10,
        damage: 24,
        baseAccuracy: 0.78,
        optimalRange: 4,
        accuracyPenaltyPerTile: 0.04,
        minAccuracy: 0.30,
        maxAccuracy: 0.92
    });

    const technologyById = Object.fromEntries(Data.TECHNOLOGIES.map((technology) => [technology.id, technology]));
    assert.ok(findEffect(technologyById.bowmaking, "unlock", "weapon", "bow"));
    assert.ok(findEffect(technologyById.crossbow, "unlock", "weapon", "crossbow"));
    assert.ok(findEffect(technologyById.charcoal_kiln, "unlock", "recipe", "charcoal"));
    assert.ok(findEffect(technologyById.bronze_foundry, "unlock", "recipe", "bronze"));
    assert.ok(findEffect(technologyById.iron_smelting, "unlock", "recipe", "iron"));
    assert.ok(findEffect(technologyById.steelmaking, "unlock", "recipe", "steel"));
});
