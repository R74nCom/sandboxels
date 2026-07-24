"use strict";

const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");

const Core = require("../scripts/human_society_core.js");
const TechData = require("../scripts/human_society_tech_data.js");
const World = require("../scripts/human_society_world.js");
const techDataSource = fs.readFileSync(
    path.join(__dirname, "../scripts/human_society_tech_data.js"),
    "utf8"
);
const societySource = fs.readFileSync(
    path.join(__dirname, "../scripts/human_society.js"),
    "utf8"
);

function cloneProperties(properties) {
    if (!properties) return {};
    return JSON.parse(JSON.stringify(properties));
}

function createHarness(options) {
    const opts = options || {};
    const width = 96;
    const height = 24;
    const currentPixels = [];
    const pixelMap = Array.from({length: width}, () => Array(height));
    const currentRelations = {_id: 1};
    const everyTickCallbacks = [];
    const resetCallbacks = [];
    const wallBehavior = Object.freeze([["XX", "XX", "XX"], ["XX", "XX", "XX"], ["XX", "XX", "XX"]]);

    const elements = {
        blood: {color: "#bb0000", state: "liquid", properties: {}},
        cooked_meat: {color: "#8b493f", state: "solid", properties: {}},
        frozen_meat: {color: "#a9c7d8", state: "solid", properties: {}},
        rotten_meat: {color: "#65723a", state: "solid", properties: {}},
        rock: {color: "#777777", state: "solid", behavior: wallBehavior, properties: {}},
        dirt: {color: "#795c3d", state: "solid", behavior: wallBehavior, properties: {}},
        root: {color: "#80715b", state: "solid", behavior: wallBehavior, properties: {}},
        fiber: {color: "#9b8b6b", state: "solid", behavior: wallBehavior, properties: {}},
        apple: {color: "#cc3322", state: "solid", isFood: true, seed: "apple_seed", properties: {}},
        apple_seed: {color: "#886633", state: "solid", seed: true, isFood: true, properties: {}},
        sapling: {color: "#3e9c3e", state: "solid", seed: true, properties: {}},
        wood: {color: "#82552f", state: "solid", properties: {}},
        tree_branch: {color: "#6f4f2f", state: "solid", properties: {}},
        plant: {color: "#4c963f", state: "solid", properties: {}},
        sawdust: {color: "#b88955", state: "solid", properties: {}},
        gravel: {color: "#888888", state: "solid", properties: {}},
        copper: {color: "#b87333", state: "solid", properties: {}},
        tin: {color: "#d4d7dc", state: "solid", properties: {}},
        iron: {color: "#8f6552", state: "solid", properties: {}},
        water: {color: "#3f86d9", state: "liquid", properties: {}},
        unknown: {color: "#ff00ff", state: "solid", properties: {}},
        meat: {color: "#8b493f", state: "solid", isFood: true, properties: {}}
    };

    function outOfBounds(x, y) {
        return x < 0 || y < 0 || x >= width || y >= height;
    }

    function getPixel(x, y) {
        if (outOfBounds(x, y)) return undefined;
        return pixelMap[x][y];
    }

    function isEmpty(x, y) {
        return !outOfBounds(x, y) && getPixel(x, y) === undefined;
    }

    function pixelColorPick(pixel, requestedColor) {
        let color = requestedColor;
        if (color === undefined) {
            const definition = elements[pixel.element];
            color = definition && definition.color;
        }
        return Array.isArray(color) ? color[0] : (color || "#000000");
    }

    function getRelation(id) {
        if (!currentRelations[id]) {
            currentRelations[id] = {
                p: currentPixels.filter((pixel) => !pixel.del && pixel._r === id)
            };
        }
        return currentRelations[id];
    }

    function addToRelation(pixel, id) {
        if (id === undefined) id = pixel._r;
        if (id === undefined) return;
        const relation = getRelation(id);
        if (!relation.p.includes(pixel)) relation.p.push(pixel);
        pixel._r = id;
    }

    function removeFromRelation(pixel) {
        if (pixel._r === undefined) return;
        const id = pixel._r;
        const relation = getRelation(id);
        const index = relation.p.indexOf(pixel);
        if (index !== -1) relation.p.splice(index, 1);
        delete pixel._r;
        if (relation.p.length === 0) delete currentRelations[id];
    }

    function createPixel(elementName, x, y, initialProperties) {
        assert.equal(outOfBounds(x, y), false, "test attempted to place a pixel out of bounds");
        assert.equal(getPixel(x, y), undefined, "test attempted to overwrite an occupied pixel");
        const definition = elements[elementName];
        assert.ok(definition, `unknown test element: ${elementName}`);
        const pixel = Object.assign({
            x,
            y,
            element: elementName,
            start: sandbox.pixelTicks,
            temp: definition.temp === undefined ? 20 : definition.temp
        }, cloneProperties(definition.properties), cloneProperties(initialProperties));
        pixel.color = pixelColorPick(pixel);
        currentPixels.push(pixel);
        pixelMap[x][y] = pixel;
        if (definition.onPlace) definition.onPlace(pixel);
        return pixel;
    }

    function deletePixel(x, y) {
        const pixel = getPixel(x, y);
        if (!pixel) return;
        pixel.del = true;
        const definition = elements[pixel.element];
        if (definition && definition.onDelete) definition.onDelete(pixel);
        pixelMap[x][y] = undefined;
    }

    function changePixel(pixel, elementName) {
        const oldDefinition = elements[pixel.element];
        if (oldDefinition && oldDefinition.onChange) oldDefinition.onChange(pixel, elementName);
        const definition = elements[elementName] || elements.unknown;
        pixel.element = elements[elementName] ? elementName : "unknown";
        pixel.color = pixelColorPick(pixel);
        pixel.start = sandbox.pixelTicks;
        Object.assign(pixel, cloneProperties(definition.properties));
        if (definition.onPlace) definition.onPlace(pixel);
    }

    function movePixel(pixel, x, y) {
        if (!isEmpty(x, y)) return false;
        pixelMap[pixel.x][pixel.y] = undefined;
        pixel.x = x;
        pixel.y = y;
        pixelMap[x][y] = pixel;
        return true;
    }

    function tryMoveRelation(relation, dirX, dirY) {
        if (!opts.relationMovement || !relation || !Array.isArray(relation.p)) return false;
        const parts = relation.p.filter((pixel) => pixel && !pixel.del);
        const partSet = new Set(parts);
        for (const pixel of parts) {
            const x = pixel.x + dirX;
            const y = pixel.y + dirY;
            if (outOfBounds(x, y)) return false;
            const occupant = getPixel(x, y);
            if (occupant && !partSet.has(occupant)) return false;
        }
        for (const pixel of parts) {
            if (getPixel(pixel.x, pixel.y) === pixel) pixelMap[pixel.x][pixel.y] = undefined;
        }
        for (const pixel of parts) {
            pixel.x += dirX;
            pixel.y += dirY;
            pixelMap[pixel.x][pixel.y] = pixel;
        }
        return true;
    }

    function getPixelByElement(x, y, elementName) {
        if (elementName === "civ_tunnel" && Array.isArray(opts.tunnelCells) && opts.tunnelCells.includes(`${x},${y}`)) {
            return {x, y, element: "civ_tunnel"};
        }
        const pixel = getPixel(x, y);
        return pixel && pixel.element === elementName ? pixel : null;
    }

    const sandbox = {
        HumanSocietyCore: Core,
        HumanSocietyWorld: World,
        elements,
        behaviors: {WALL: wallBehavior},
        currentPixels,
        pixelMap,
        currentRelations,
        pixelTicks: 0,
        width: width - 1,
        height: height - 1,
        defaultCooldown: 1,
        performance: {now: () => 0},
        Math: Object.create(Math),
        JSON,
        Map,
        Set,
        Object,
        Number,
        Date,
        console,
        getPixel,
        isEmpty,
        outOfBounds,
        pixelColorPick,
        getPixelByElement,
        createPixel,
        deletePixel,
        changePixel,
        movePixel,
        tryMove(pixel, x, y) {
            return movePixel(pixel, x, y);
        },
        tryMoveRelation,
        getRelation,
        addToRelation,
        removeFromRelation,
        runEveryTick(callback) { everyTickCallbacks.push(callback); },
        runAfterReset(callback) { resetCallbacks.push(callback); },
        doHeat() {},
        doBurning() {},
        doElectricity() {},
        pixelTempCheck() {},
        drawSquare() {},
        canvasCoord(value) { return value; },
        pixelSize: 1,
        mousePos: {x: 0, y: 0},
        settings: {humanSocietyPeaceMode: "normal"},
        saveSettings() {},
        getPixelsAt(x, y) {
            const pixel = getPixel(x, y);
            return pixel ? [pixel] : [];
        }
    };

    sandbox.globalThis = sandbox;
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    if (opts.techData) {
        vm.runInContext(techDataSource, sandbox, {filename: "scripts/human_society_tech_data.js"});
    }
    vm.runInContext(societySource, sandbox, {filename: "scripts/human_society.js"});

    return {
        sandbox,
        elements,
        currentPixels,
        currentRelations,
        everyTickCallbacks,
        resetCallbacks,
        wallBehavior,
        getPixel,
        createPixel,
        changePixel
    };
}

test("browser adapter loads and registers the civilization API and elements", () => {
    const harness = createHarness();
    const api = harness.sandbox.HumanSociety;

    assert.ok(api);
    for (const method of [
        "registerResource", "registerWeapon", "damageActor", "damageStructure",
        "recordIncident", "atWar", "forceReindex", "getDebugSnapshot",
        "getPeaceMode", "setPeaceMode", "setCommandPerson", "cancelPersonCommand", "issuePersonCommandAt", "getPersonCommandState",
        "getPeopleSnapshot", "getPersonSnapshot", "getPersonHistory"
    ]) {
        assert.equal(typeof api[method], "function", `${method} should be public`);
    }
    for (const elementName of [
        "civilized_human", "civ_body", "civ_head", "civ_child", "civ_banner",
        "civ_hut_core", "civ_farm_marker", "civ_workshop_core", "civ_construction",
        "civ_structure_wood", "civ_structure_stone", "civ_ruin"
    ]) {
        assert.ok(harness.elements[elementName], `${elementName} should be registered`);
    }
    assert.equal(harness.everyTickCallbacks.length, 1);
    assert.equal(harness.resetCallbacks.length, 1);
});

test("civilized humans have bounded natural lifespans and never acquire hunger state", () => {
    const harness = createHarness({techData: true});
    harness.createPixel("civilized_human", 8, 7);
    const head = harness.getPixel(8, 7);
    const body = harness.getPixel(8, 8);
    const child = harness.createPixel("civ_child", 12, 8);
    body.hunger = 1;
    body.lastHungerTick = 10;
    harness.sandbox.HumanSociety.forceReindex();

    for (const actor of [head, body, child]) {
        assert.equal(Object.prototype.hasOwnProperty.call(actor, "hunger"), false);
    }
    for (const actor of [body, child]) {
        assert.equal(Number.isInteger(actor.lifespanYears), true);
        assert.ok(actor.lifespanYears >= 50 && actor.lifespanYears <= 60);
        assert.equal(
            actor.naturalDeathTick,
            actor.birthTick + actor.lifespanYears * harness.sandbox.HumanSociety.config.TICKS_PER_YEAR
        );
    }

    const startingHp = body.hp;
    harness.sandbox.pixelTicks = body.birthTick + 49 * harness.sandbox.HumanSociety.config.TICKS_PER_YEAR;
    harness.elements.civ_body.tick(body);
    assert.equal(body.hp, startingHp);
    assert.equal(Object.prototype.hasOwnProperty.call(body, "hunger"), false);

    harness.sandbox.pixelTicks = body.naturalDeathTick;
    harness.elements.civ_body.tick(body);
    assert.equal(body.deathCause, "old_age");
    assert.equal(body.dead, body.naturalDeathTick);
});

test("adult relations fall when unsupported but never fall while occupying a tunnel", () => {
    const fallingHarness = createHarness({techData: true, relationMovement: true});
    fallingHarness.createPixel("civilized_human", 8, 5);
    const fallingHead = fallingHarness.getPixel(8, 5);
    const fallingBody = fallingHarness.getPixel(8, 6);
    fallingHarness.sandbox.pixelTicks = 2;
    fallingHarness.elements.civ_body.tick(fallingBody);
    assert.equal(fallingHead.y, 6);
    assert.equal(fallingBody.y, 7);

    const tunnelHarness = createHarness({techData: true, relationMovement: true, tunnelCells: ["12,5", "12,6"]});
    tunnelHarness.createPixel("civilized_human", 12, 5);
    const tunnelHead = tunnelHarness.getPixel(12, 5);
    const tunnelBody = tunnelHarness.getPixel(12, 6);
    tunnelHarness.sandbox.pixelTicks = 2;
    tunnelHarness.elements.civ_body.tick(tunnelBody);
    assert.equal(tunnelHead.y, 5);
    assert.equal(tunnelBody.y, 6);
});

test("directed adults climb one-block steps without a separate vertical pause", () => {
    const harness = createHarness({relationMovement: true});
    for (let x = 1; x <= 20; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("rock", 9, 9);
    harness.createPixel("civilized_human", 8, 8);
    const api = harness.sandbox.HumanSociety;
    api.forceReindex();
    const body = harness.currentPixels.find((pixel) => pixel.element === "civ_body");
    assert.equal(api.issuePersonCommandAt(body.humanId, 2, 12, 8).accepted, true);
    const moveTick = (2 - ((0 + body.humanId) % 2)) % 2;
    harness.sandbox.pixelTicks = moveTick;
    harness.elements.civ_body.tick(body);
    assert.equal(body.x, 9);
    assert.equal(body.y, 8);
    assert.equal(body.pathStage, "step");
});

test("technology boot registers the expanded structures as static civilization elements", () => {

    const harness = createHarness({techData: true});
    const buildingCores = [
        "civ_hearth_core", "civ_quarry_core", "civ_granary_core", "civ_kiln_core",
        "civ_foundry_core", "civ_forge_core", "civ_keep_core", "civ_siege_workshop_core",
        "civ_library_core", "civ_market_core", "civ_tower_core", "civ_lumberyard_core", "civ_gate"
    ];
    for (const elementName of buildingCores) {
        assert.ok(harness.elements[elementName], `${elementName} should be registered`);
        assert.equal(harness.elements[elementName].behavior, harness.wallBehavior);
        assert.equal(harness.elements[elementName].category, "civilization");
        assert.equal(harness.elements[elementName].alwaysOverlay, true);
        assert.equal(harness.elements[elementName].nonBlocking, true);
        assert.equal(harness.elements[elementName].eraseProtected, true);
        assert.equal(harness.elements[elementName].isBuildingCore, true);
    }
    assert.equal(harness.elements.civ_palisade.isBuildingCore, undefined, "legacy wall pixels are not logical building cores");
});

test("placing civilized_human materializes a head/body pair with one identity and relation", () => {
    const harness = createHarness();
    harness.createPixel("civilized_human", 8, 7);

    const head = harness.getPixel(8, 7);
    const body = harness.getPixel(8, 8);
    assert.equal(head.element, "civ_head");
    assert.equal(body.element, "civ_body");
    assert.equal(Number.isFinite(head.humanId), true);
    assert.equal(head.humanId, body.humanId);
    assert.equal(head.factionId, body.factionId);
    assert.equal(head._r, body._r);
    assert.deepEqual(new Set(harness.currentRelations[body._r].p), new Set([head, body]));
});

test("a body thermal conversion runs onChange and detaches it from its relation", () => {
    const harness = createHarness();
    harness.createPixel("civilized_human", 11, 6);
    const head = harness.getPixel(11, 6);
    const body = harness.getPixel(11, 7);
    const relationId = body._r;

    harness.changePixel(body, harness.elements.civ_body.stateHigh);

    assert.equal(body.element, "cooked_meat");
    assert.equal(body._r, undefined);
    assert.equal(body.humanId, undefined);
    assert.equal(head._r, relationId);
    assert.deepEqual(harness.currentRelations[relationId].p, [head]);
});

test("reindex repairs a saved head identity from its authoritative body relation", () => {
    const harness = createHarness();
    harness.createPixel("civilized_human", 10, 6);
    const head = harness.getPixel(10, 6);
    const body = harness.getPixel(10, 7);
    delete head.humanId;
    delete head.factionId;
    head.settlementId = 999;

    harness.sandbox.HumanSociety.forceReindex();

    assert.equal(head.humanId, body.humanId);
    assert.equal(head.factionId, body.factionId);
    assert.equal(head.settlementId, body.settlementId);
});

test("legacy children convert into unified workers and living filters remain stable", () => {
    const harness = createHarness();
    harness.createPixel("civilized_human", 8, 7);
    const adult = harness.getPixel(8, 8);
    adult.settlementId = 11;
    const child = harness.createPixel("civ_child", 30, 8, {
        humanId: 99,
        factionId: 42,
        settlementId: 12,
        factionColor: "#336699",
        task: "idle"
    });
    harness.sandbox.HumanSociety.forceReindex();
    harness.sandbox.pixelTicks = 1;
    harness.elements.civ_child.tick(child);
    const converted = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_body" && pixel.humanId === 99);
    assert.ok(converted);

    const api = harness.sandbox.HumanSociety;
    const allLiving = api.getPeopleSnapshot({status: "living"});
    assert.equal(typeof allLiving.updatedAt, "string");
    assert.equal(allLiving.tick, harness.sandbox.pixelTicks);
    assert.deepEqual(
        {living: allLiving.counts.living, deceased: allLiving.counts.deceased, filtered: allLiving.counts.filtered},
        {living: 2, deceased: 0, filtered: 2}
    );
    assert.deepEqual(Array.from(allLiving.people, (person) => person.humanId), [adult.humanId, converted.humanId]);
    for (const person of allLiving.people) {
        assert.equal(person.status, "living");
        assert.equal(typeof person.role, "string");
        assert.equal(typeof person.task, "string");
        assert.ok(person.currentActivity);
    }

    const convertedOnly = api.getPeopleSnapshot({
        status: "living",
        factionId: converted.factionId,
        settlementId: converted.settlementId,
        role: "worker",
        query: "H99"
    });
    assert.equal(convertedOnly.counts.filtered, 1);
    assert.equal(convertedOnly.people[0].humanId, converted.humanId);
    assert.equal(api.getPersonSnapshot(converted.humanId).humanId, converted.humanId);
    assert.equal(api.getPersonSnapshot(123456), null);
});

test("semantic task sessions are deduplicated and close once when their target dies", () => {
    const harness = createHarness();
    for (let x = 1; x <= 90; x++) harness.createPixel("rock", x, 12);
    harness.createPixel("civilized_human", 8, 10);
    harness.createPixel("civilized_human", 70, 10);
    const victim = harness.getPixel(8, 11);
    const attacker = harness.getPixel(70, 11);
    attacker.factionId = victim.factionId + 1;
    harness.sandbox.HumanSociety.forceReindex();

    const api = harness.sandbox.HumanSociety;
    harness.sandbox.pixelTicks = 1;
    assert.equal(api.damageActor(victim, 1, attacker), true);
    harness.sandbox.pixelTicks = 2;
    assert.equal(api.damageActor(victim, 1, attacker), true);
    const active = api.getPersonSnapshot(victim.humanId);
    assert.equal(active.task, "combat");
    assert.equal(active.currentActivity.task, "combat");
    assert.equal(active.currentActivity.targetId, attacker.humanId);
    assert.equal(api.getPersonHistory(victim.humanId, {limit: 500}).entries.filter((entry) => entry.task === "combat").length, 0);

    harness.sandbox.pixelTicks = 3;
    api.damageActor(attacker, 1000, victim);
    const thinkInterval = api.config.THINK_INTERVAL;
    const clearTick = 4 + ((thinkInterval - ((4 + victim.humanId) % thinkInterval)) % thinkInterval);
    harness.sandbox.pixelTicks = clearTick;
    harness.elements.civ_body.tick(victim);

    const history = api.getPersonHistory(victim.humanId, {limit: 500});
    const combatEntries = history.entries.filter((entry) => entry.task === "combat");
    assert.equal(combatEntries.length, 1);
    assert.ok(combatEntries[0].endedAt);
    assert.ok(["completed", "interrupted", "failed"].includes(combatEntries[0].status));
});

test("person history retains only the newest five hundred completed sessions", () => {
    const harness = createHarness();
    harness.createPixel("civilized_human", 8, 7);
    const actor = harness.getPixel(8, 8);
    const sources = [
        {humanId: 7001, factionId: actor.factionId + 1, x: 30, y: 8, element: "civ_body"},
        {humanId: 7002, factionId: actor.factionId + 1, x: 31, y: 8, element: "civ_body"}
    ];
    const api = harness.sandbox.HumanSociety;

    for (let index = 0; index < 505; index++) {
        actor.combatTargetId = undefined;
        actor.task = "idle";
        harness.sandbox.pixelTicks = index + 1;
        assert.equal(api.damageActor(actor, 0.01, sources[index % sources.length]), true);
    }

    const history = api.getPersonHistory(actor.humanId, {limit: 500});
    assert.equal(history.entries.length, 500);
    assert.equal(history.totalRetained, 500);
    assert.equal(history.hasMore, false);
    assert.equal(history.nextCursor, null);
    for (let index = 1; index < history.entries.length; index++) {
        assert.ok(history.entries[index - 1].sequence > history.entries[index].sequence, "history must be newest first");
    }

    const firstPage = api.getPersonHistory(actor.humanId, {limit: 20});
    assert.equal(firstPage.entries.length, 20);
    assert.equal(firstPage.hasMore, true);
    assert.equal(firstPage.nextCursor, firstPage.entries.at(-1).sequence);
    const secondPage = api.getPersonHistory(actor.humanId, {limit: 20, beforeSequence: firstPage.nextCursor});
    assert.equal(secondPage.entries.length, 20);
    assert.ok(secondPage.entries.every((entry) => entry.sequence < firstPage.nextCursor));
    assert.equal(
        secondPage.entries.some((entry) => firstPage.entries.some((firstEntry) => firstEntry.sequence === entry.sequence)),
        false
    );
});

test("death archives a settled person exactly once across repeated damage and reindexing", () => {
    const harness = createHarness();
    for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const actor = harness.getPixel(8, 9);
    const humanId = actor.humanId;
    const api = harness.sandbox.HumanSociety;

    harness.sandbox.pixelTicks = 100;
    assert.equal(api.damageActor(actor, 1000, {factionId: actor.factionId + 1}), true);
    assert.equal(api.damageActor(actor, 1000, {factionId: actor.factionId + 1}), false);
    api.forceReindex();
    api.forceReindex();

    const deceased = api.getPeopleSnapshot({status: "deceased", settlementId: actor.settlementId});
    assert.equal(deceased.counts.deceased, 1);
    assert.equal(deceased.counts.filtered, 1);
    assert.equal(deceased.people[0].humanId, humanId);
    assert.equal(deceased.people[0].status, "deceased");
    const archived = api.getPersonSnapshot(humanId);
    assert.equal(archived.status, "deceased");
    assert.equal(archived.currentActivity, null);
    const history = api.getPersonHistory(humanId, {limit: 500});
    assert.equal(history.entries.filter((entry) => entry.status === "death").length, 1);
});

test("a settlement retains only its newest five hundred deceased people", () => {
    const harness = createHarness();
    const deceasedPeople = Array.from({length: 501}, (_, index) => ({
        h: index + 1,
        f: 7,
        l: 17,
        e: "civ_body",
        dt: index + 1,
        dc: "old_age",
        r: "worker"
    }));
    const banner = harness.createPixel("civ_banner", 40, 8, {
        factionId: 7,
        settlementId: 17,
        factionColor: "#336699",
        deceasedPeople
    });
    const api = harness.sandbox.HumanSociety;

    api.forceReindex();

    assert.equal(banner.deceasedPeople.length, api.config.MAX_DECEASED_PER_SETTLEMENT);
    assert.equal(banner.deceasedPeople[0].h, 2, "the oldest archived identity is evicted first");
    assert.equal(banner.deceasedPeople.at(-1).h, 501);
    const snapshot = api.getPeopleSnapshot({status: "deceased", settlementId: 17});
    assert.equal(snapshot.counts.filtered, 500);
    assert.equal(api.getPersonSnapshot(1), null);
    assert.equal(api.getPersonSnapshot(2).status, "deceased");
    assert.equal(api.getPersonSnapshot(501).status, "deceased");
});

test("human ids archived in a loaded settlement are never reused", () => {
    const harness = createHarness();
    harness.createPixel("civ_banner", 40, 8, {
        factionId: 7,
        settlementId: 17,
        factionColor: "#336699",
        deceasedPeople: [{
            h: 700,
            f: 7,
            l: 17,
            e: "civ_body",
            dt: 100,
            dc: "old_age",
            r: "worker"
        }]
    });
    const api = harness.sandbox.HumanSociety;
    api.forceReindex();

    harness.createPixel("civilized_human", 8, 7);
    const newcomer = harness.getPixel(8, 8);

    assert.equal(api.getPersonSnapshot(700).status, "deceased");
    assert.ok(newcomer.humanId > 700);
    assert.notEqual(newcomer.humanId, 700);
});

test("role changes are recorded once and stable role assignments add no duplicate events", () => {
    const harness = createHarness();
    harness.createPixel("civ_banner", 40, 8, {
        factionId: 7,
        settlementId: 17,
        factionColor: "#336699"
    });
    const actor = harness.createPixel("civ_body", 8, 8, {
        humanId: 100,
        factionId: 7,
        settlementId: 17,
        factionColor: "#336699",
        role: "worker",
        task: "idle",
        hp: 100,
        maxHp: 100
    });
    const api = harness.sandbox.HumanSociety;
    api.forceReindex();

    harness.sandbox.pixelTicks = api.config.CIVILIZATION_INTERVAL;
    harness.everyTickCallbacks[0]();
    const assignedRole = actor.role;
    const firstHistory = api.getPersonHistory(actor.humanId, {limit: 500});
    const firstRoleEvents = firstHistory.entries.filter((entry) => entry.type === "role_changed");

    assert.notEqual(assignedRole, "worker", "the first job allocation must perform a real role change");
    assert.equal(firstRoleEvents.length, 1);

    harness.sandbox.pixelTicks += api.config.CIVILIZATION_INTERVAL;
    harness.everyTickCallbacks[0]();
    const secondHistory = api.getPersonHistory(actor.humanId, {limit: 500});
    const secondRoleEvents = secondHistory.entries.filter((entry) => entry.type === "role_changed");

    assert.equal(actor.role, assignedRole);
    assert.equal(secondRoleEvents.length, firstRoleEvents.length);
});

test("a legacy child's activity history remains attached after unified-worker conversion", () => {
    const harness = createHarness();
    for (let x = 1; x <= 90; x++) harness.createPixel("rock", x, 12);
    harness.createPixel("civilized_human", 8, 10);
    const parent = harness.getPixel(8, 11);
    const child = harness.createPixel("civ_child", 20, 11, {
        humanId: 99,
        factionId: parent.factionId,
        settlementId: null,
        factionColor: parent.factionColor,
        task: "idle",
        birthTick: 0,
        lifespanYears: 55,
        naturalDeathTick: 55 * harness.sandbox.HumanSociety.config.TICKS_PER_YEAR
    });
    harness.createPixel("civilized_human", 70, 10);
    const attacker = harness.getPixel(70, 11);
    attacker.factionId = parent.factionId + 1;
    harness.sandbox.HumanSociety.forceReindex();

    const api = harness.sandbox.HumanSociety;
    harness.sandbox.pixelTicks = 1;
    api.damageActor(child, 1, attacker);
    assert.equal(api.getPersonSnapshot(child.humanId).currentActivity.task, "combat");

    harness.sandbox.pixelTicks = 2;
    child.birthTick = 0;
    child.ageTicks = 2;
    child.naturalDeathTick = child.lifespanYears * api.config.TICKS_PER_YEAR;
    harness.elements.civ_child.tick(child);

    const adult = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_body" && pixel.humanId === 99);
    assert.ok(adult);
    const snapshot = api.getPersonSnapshot(99);
    assert.equal(snapshot.humanId, 99);
    assert.equal(snapshot.status, "living");
    assert.notEqual(snapshot.role, "child");
    const history = api.getPersonHistory(99, {limit: 500});
    assert.ok(history.entries.some((entry) => entry.task === "combat"), "the child's active task is retained when adulthood interrupts it");
    assert.ok(history.entries.some((entry) => entry.type === "legacy_child_conversion"), "conversion is recorded on the same timeline");
});

test("forceReindex initializes activity data for actors loaded from a legacy save", () => {
    const harness = createHarness();
    harness.createPixel("civilized_human", 8, 7);
    const actor = harness.getPixel(8, 8);
    for (const field of [
        "personActivity", "activityCurrent", "activityHistory", "activitySequence",
        "personActivitySchemaVersion", "activitySchemaVersion"
    ]) delete actor[field];

    const api = harness.sandbox.HumanSociety;
    assert.doesNotThrow(() => api.forceReindex());
    const snapshot = api.getPersonSnapshot(actor.humanId);
    assert.equal(snapshot.status, "living");
    assert.equal(snapshot.currentActivity.task, actor.task);
    const history = api.getPersonHistory(actor.humanId, {limit: 50});
    assert.deepEqual(Array.from(history.entries), []);
    assert.equal(history.totalRetained, 0);
});

test("every attacked human, including a child, immediately locks the attacker for retaliation", () => {
    const harness = createHarness();
    const child = harness.createPixel("civ_child", 15, 10);
    child.humanId = 99;
    child.factionId = 1;
    harness.createPixel("civilized_human", 16, 9);
    const attackerHead = harness.getPixel(16, 9);
    const attackerBody = harness.getPixel(16, 10);
    attackerHead.factionId = 2;
    attackerBody.factionId = 2;
    harness.sandbox.HumanSociety.forceReindex();
    const startingHp = child.hp;

    assert.equal(harness.sandbox.HumanSociety.damageActor(child, 12, attackerBody), true);
    assert.equal(child.hp, startingHp - 12);
    assert.equal(child.combatTargetId, attackerBody.humanId);
    assert.equal(child.task, "combat");
});

test("civilization buildings use the engine WALL behavior", () => {
    const harness = createHarness();
    for (const elementName of [
        "civ_banner", "civ_hut_core", "civ_farm_marker", "civ_workshop_core",
        "civ_construction", "civ_structure_wood", "civ_structure_stone", "civ_ruin"
    ]) {
        assert.equal(
            harness.elements[elementName].behavior,
            harness.wallBehavior,
            `${elementName} should be static`
        );
    }
});

test("two nearby grounded adults autonomously found a camp after the stability window", () => {
    const harness = createHarness();
    for (let x = 3; x <= 20; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);

    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }

    const banners = harness.currentPixels.filter((pixel) => !pixel.del && pixel.element === "civ_banner");
    assert.equal(banners.length, 1);
    assert.equal(banners[0].factionId, harness.getPixel(8, 9).factionId);
    assert.equal(banners[0].stage, "camp");
});

test("a settlement spends food to create an immediately working person without cooldown", () => {
    const harness = createHarness();
    for (let x = 3; x <= 20; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const banner = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_banner");
    banner.stock.food = 2;

    harness.sandbox.pixelTicks = 120;
    harness.everyTickCallbacks[0]();

    const workers = harness.currentPixels.filter((pixel) => !pixel.del && pixel.element === "civ_body");
    assert.equal(workers.length, 3);
    assert.equal(harness.currentPixels.filter((pixel) => !pixel.del && pixel.element === "civ_child").length, 0);
    assert.equal(banner.stock.food, 0);
    assert.equal(workers.filter((worker) => worker.settlementId === banner.settlementId).length, 3);
    assert.ok(workers.every((worker) => worker.task !== "idle"));
    assert.ok(banner.chronicle.some((event) => event.type === "birth"));
});

test("a settlement creates repeatedly until it reaches the current era's ideal population", () => {
    const harness = createHarness();
    for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const banner = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_banner");
    banner.stock.food = 20;

    harness.sandbox.pixelTicks = 120;
    harness.everyTickCallbacks[0]();

    const workers = harness.currentPixels.filter((pixel) => !pixel.del && pixel.element === "civ_body" && pixel.settlementId === banner.settlementId);
    assert.equal(workers.length, 6);
    assert.equal(banner.stock.food, 12);
    assert.ok(workers.every((worker) => worker.task !== "idle"));
});

test("erasing a town-center core removes its sprite permanently instead of auto-rebuilding", () => {
    const harness = createHarness();
    for (let x = 3; x <= 20; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const banner = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_banner");

    harness.elements.civ_banner.onErase(banner);
    for (const tick of [120, 180, 240, 300, 360, 420, 480]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }

    assert.equal(banner.townCenterActive, false);
    assert.equal(banner.buildingState, "destroyed");
    assert.equal(banner.destroyedCause, "erased");
});

test("a camp researches technologies and advances only after six of eight era technologies", () => {
    const harness = createHarness({techData: true});
    for (let x = 1; x <= 40; x++) harness.createPixel("rock", x, 10);
    for (const x of [8, 12, 16, 20]) harness.createPixel("civilized_human", x, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }

    const banner = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_banner");
    assert.ok(banner);
    assert.equal(banner.eraId, "tribal");
    banner.stock.wood = 1000;
    banner.stock.materials.wood = 1000;
    banner.research.knowledge = 10000;
    const tribalTechIds = TechData.ERAS.find((era) => era.id === "tribal").techIds;
    const researchedCount = () => tribalTechIds.filter((techId) => banner.research.unlocked[techId]).length;

    for (const tick of [120, 150, 180, 210, 240]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    assert.equal(researchedCount(), 5);
    assert.equal(banner.eraId, "tribal");

    harness.sandbox.pixelTicks = 270;
    harness.everyTickCallbacks[0]();
    assert.equal(researchedCount(), 6);
    assert.equal(banner.research.eraCompleted, 6);
    assert.equal(banner.eraId, "stone");
});

test("resource editing, irreversible forced research, condition progress, and real-time logs are public", () => {
    const harness = createHarness({techData: true});
    for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("copper", 70, 6);
    harness.createPixel("water", 80, 6);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const api = harness.sandbox.HumanSociety;
    const initial = api.getFactionSnapshot(harness.getPixel(8, 9).factionId);
    assert.equal(api.setSettlementResources(initial.id, initial.selectedSettlementId, {wood: 3, food: 9, seeds: {sapling: 2}}), true);
    assert.equal(api.setTechnologyState(initial.id, "controlled_fire", "focused"), true);
    const queued = api.getFactionSnapshot(initial.id, initial.selectedSettlementId);
    assert.ok(queued.technologies.find((tech) => tech.id === "organized_gathering").focused, "prerequisite closure is queued first");
    assert.equal(api.setTechnologyState(initial.id, "controlled_fire", "researched"), true);
    assert.equal(api.setTechnologyState(initial.id, "controlled_fire", "unresearched"), false);
    assert.equal(api.setTechnologyState(initial.id, "steelmaking", "researched"), true, "future-era technologies can be force-completed");
    const snapshot = api.getFactionSnapshot(initial.id, initial.selectedSettlementId);
    assert.equal(snapshot.stock.wood, 3);
    assert.equal(snapshot.stock.treeSaplings.sapling, 2);
    const controlledFire = snapshot.technologies.find((tech) => tech.id === "controlled_fire");
    assert.equal(controlledFire.state, "researched");
    assert.equal(controlledFire.forced, true);
    assert.equal(snapshot.technologies.find((tech) => tech.id === "steelmaking").forced, true);
    assert.equal(controlledFire.conditionStates[0].current, 3);
    assert.equal(snapshot.technologies.find((tech) => tech.id === "copper_prospecting").conditionStates[0].current, 1, "remote ore is globally known");
    assert.equal(snapshot.technologies.find((tech) => tech.id === "irrigation").conditionStates[0].current, 1, "remote water is globally known");
    const chronicle = api.getFactionChronicle(initial.id, {settlementId: initial.selectedSettlementId});
    assert.ok(chronicle.some((event) => event.type === "resource_edit"));
    assert.ok(chronicle.some((event) => event.type === "technology" && event.technologyId === "controlled_fire"));
    assert.match(chronicle[0].timestamp, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
});

test("hostility incidents alone never start a war", () => {
    const harness = createHarness();
    for (let x = 1; x <= 72; x++) harness.createPixel("rock", x, 10);
    for (const x of [4, 6, 60, 62]) harness.createPixel("civilized_human", x, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const firstFaction = harness.getPixel(4, 9).factionId;
    const secondFaction = harness.getPixel(60, 9).factionId;
    for (let i = 0; i < 20; i++) harness.sandbox.HumanSociety.recordIncident(firstFaction, secondFaction, "hit");
    harness.sandbox.pixelTicks = 120;
    harness.everyTickCallbacks[0]();
    assert.equal(harness.sandbox.HumanSociety.atWar(firstFaction, secondFaction), false);
});

test("unlocked ranged weapon technologies craft the registered bow and crossbow", () => {
    const harness = createHarness({techData: true});
    for (let x = 1; x <= 40; x++) harness.createPixel("rock", x, 10);
    for (const x of [4, 6, 8, 10, 12, 14, 16, 18]) harness.createPixel("civilized_human", x, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }

    const banner = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_banner");
    const workshop = harness.createPixel("civ_workshop_core", 20, 9);
    workshop.factionId = banner.factionId;
    workshop.factionColor = banner.factionColor;
    workshop.settlementId = banner.settlementId;
    workshop.buildingId = 700;
    banner.stock.wood = 10;
    banner.stock.materials.wood = 10;
    banner.eraId = "stone";
    banner.research.unlocked.bowmaking = true;
    harness.sandbox.HumanSociety.forceReindex();

    harness.sandbox.pixelTicks = 120;
    harness.everyTickCallbacks[0]();
    const adults = harness.currentPixels.filter((pixel) => !pixel.del && pixel.element === "civ_body");
    assert.equal(adults.some((actor) => actor.weapon === "bow"), true);
    assert.equal(banner.stock.wood, 7);

    banner.research.unlocked.crossbow = true;
    banner.stock.steel = 1;
    banner.stock.materials.steel = 1;
    harness.sandbox.pixelTicks = 240;
    harness.everyTickCallbacks[0]();
    assert.equal(adults.some((actor) => actor.weapon === "crossbow"), true);
    assert.equal(banner.stock.wood, 5);
    assert.equal(banner.stock.steel, 0);
});

test("camp planning builds the tribal lumberyard as a one-cell logical construction", () => {
    const harness = createHarness();
    for (let x = 1; x <= 24; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const banner = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_banner");
    banner.stock.wood = 12;

    harness.sandbox.pixelTicks = 120;
    harness.everyTickCallbacks[0]();

    const site = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_construction");
    assert.ok(site);
    assert.equal(site.blueprintType, "lumberyard");
    assert.equal(banner.stock.wood, 8);
    assert.equal(site.costs.wood, 4);
    assert.equal(site.workRequired, 2);
    assert.equal(site.alwaysOverlay, true);
});

test("a completed building keeps one logical core at the construction origin", () => {
    const harness = createHarness();
    for (let x = 1; x <= 28; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const banner = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_banner");
    banner.stock.wood = 12;
    harness.sandbox.pixelTicks = 120;
    harness.everyTickCallbacks[0]();
    const site = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_construction");
    harness.sandbox.pixelTicks = 150;
    harness.everyTickCallbacks[0]();
    const builder = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_body" && pixel.role === "builder");
    assert.ok(builder, "urgent housing/building work must take a real quota slot");
    const head = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_head" && pixel.humanId === builder.humanId);
    harness.sandbox.movePixel(head, site.x - 2, site.y - 2);
    harness.sandbox.movePixel(builder, site.x - 2, site.y - 1);
    builder.role = "builder";
    builder.task = "idle";

    let tick = 160 + ((10 - ((160 + builder.humanId) % 10)) % 10);
    for (let step = 0; step < 25 && site.element === "civ_construction"; step++, tick += 10) {
        harness.sandbox.pixelTicks = tick;
        harness.elements.civ_body.tick(builder);
    }

    assert.equal(site.element, "civ_lumberyard_core");
    assert.equal(site.x, site.originX);
    assert.equal(site.y, site.originY);
    assert.equal(site.isBuildingCore, true);
    assert.equal(harness.currentPixels.some((pixel) => !pixel.del && pixel.buildingId === site.buildingId && (pixel.element === "civ_structure_wood" || pixel.element === "civ_structure_stone")), false);
    assert.equal(banner.stock.wood, 8);
});

test("resource planning can find a reachable food source beyond the old five-cell scan", () => {
    const harness = createHarness();
    for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    harness.createPixel("apple", 18, 9);
    const body = harness.getPixel(8, 9);
    harness.sandbox.HumanSociety.forceReindex();

    for (let attempt = 0; attempt < 6 && body.task !== "harvest"; attempt++) {
        harness.sandbox.pixelTicks = 9 + attempt * 60;
        harness.elements.civ_body.tick(body);
    }

    assert.equal(body.task, "harvest");
    assert.equal(body.harvestX, 18);
    assert.equal(body.harvestY, 9);
    assert.ok(Math.abs(body.targetX - body.harvestX) <= 1);
});

test("the first-resource chronicle entry is written when a block is harvested, before delivery", () => {
    const harness = createHarness();
    for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const apple = harness.createPixel("apple", 9, 9);
    const body = harness.getPixel(8, 9);
    harness.sandbox.HumanSociety.forceReindex();
    body.role = "food";
    body.task = "idle";

    const tick = 100 + ((10 - ((100 + body.humanId) % 10)) % 10);
    harness.sandbox.pixelTicks = tick;
    harness.elements.civ_body.tick(body);

    const snapshot = harness.sandbox.HumanSociety.getFactionSnapshot(body.factionId, body.settlementId);
    assert.equal(apple.del, true);
    assert.equal((body.carry.food || 0) + snapshot.stock.food, 1);
    assert.equal(harness.currentPixels.find((pixel) => pixel.element === "civ_banner").research.milestones.harvests, 1);
    assert.ok(snapshot.chronicle.some((event) => event.type === "first_resource" && event.resource === "food"));
});

test("felling a civilization-planted tree removes every component and drops one resource per woody cell", () => {
    const harness = createHarness();
    for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 14, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const seed = harness.createPixel("sapling", 9, 7, {civPlantedTreeId: 501, civTreeOriginX: 9, civTreeOriginY: 9});
    const legacyLeaf = harness.createPixel("plant", 8, 7);
    const trunkTop = harness.createPixel("wood", 9, 8, {naturalVegetation: true});
    const root = harness.createPixel("wood", 9, 9, {naturalVegetation: true});
    const body = harness.getPixel(8, 9);
    harness.sandbox.HumanSociety.forceReindex();
    body.role = "wood";
    body.task = "idle";

    let tick = 100 + ((10 - ((100 + body.humanId) % 10)) % 10);
    harness.sandbox.pixelTicks = tick;
    harness.elements.civ_body.tick(body);
    harness.sandbox.pixelTicks = tick + 10;
    harness.elements.civ_body.tick(body);

    assert.equal(root.del, true);
    assert.equal(trunkTop.del, true);
    assert.equal(seed.del, true);
    assert.equal(legacyLeaf.del, true);
    const woodDrops = harness.currentPixels.filter((pixel) => !pixel.del && pixel.element === "civ_wood_resource");
    assert.equal(woodDrops.length, 2);
    assert.ok(woodDrops.every((drop) => drop.treeSapling === "sapling"));
    assert.equal(body.carry.wood, undefined);
});

test("legacy root networks directly below a recognized tree are converted back to dirt", () => {
    const harness = createHarness();
    harness.createPixel("wood", 10, 6, {naturalVegetation: true, treeLineage: "legacy-tree"});
    const root = harness.createPixel("root", 10, 7);
    const fiber = harness.createPixel("fiber", 10, 8);

    harness.sandbox.HumanSociety.forceReindex();

    assert.equal(root.element, "dirt");
    assert.equal(fiber.element, "dirt");
});

test("collecting a wood resource can award the matching abstract tree sapling", () => {
    const harness = createHarness();
    for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 14, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const drop = harness.createPixel("civ_wood_resource", 9, 9, {treeSapling: "pinecone"});
    const body = harness.getPixel(8, 9);
    harness.sandbox.HumanSociety.forceReindex();
    body.role = "wood";
    body.task = "planning";
    harness.sandbox.Math.random = () => 0;

    const tick = 100 + ((10 - ((100 + body.humanId) % 10)) % 10);
    harness.sandbox.pixelTicks = tick;
    harness.elements.civ_body.tick(body);

    const snapshot = harness.sandbox.HumanSociety.getFactionSnapshot(body.factionId, body.settlementId);
    assert.equal(drop.del, true);
    assert.equal(snapshot.stock.wood + (body.carry.wood || 0), 1);
    assert.equal((snapshot.stock.treeSaplings.pinecone || 0) + (body.carry["tree_sapling:pinecone"] || 0), 1);
    assert.equal(snapshot.stock.treeSaplings.sapling || 0, 0);
});

test("only permanent miners carve navigation tunnels and collect stone", () => {
    function prepare(role) {
        const harness = createHarness({relationMovement: true});
        for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
        harness.createPixel("civilized_human", 8, 8);
        harness.createPixel("civilized_human", 14, 8);
        for (const tick of [30, 60, 90]) {
            harness.sandbox.pixelTicks = tick;
            harness.everyTickCallbacks[0]();
        }
        harness.createPixel("rock", 8, 7);
        harness.createPixel("rock", 9, 7);
        const wallHead = harness.createPixel("rock", 9, 8);
        const wallBody = harness.createPixel("rock", 9, 9);
        const targetX = harness.getPixel(12, 9) ? 13 : 12;
        const target = harness.createPixel("apple", targetX, 9);
        const body = harness.getPixel(8, 9);
        body.role = role;
        body.task = "harvest";
        body.targetX = 10;
        body.targetY = 9;
        body.harvestX = target.x;
        body.harvestY = target.y;
        body.targetKind = "apple";
        return {harness, body, wallHead, wallBody};
    }

    const workerCase = prepare("food");
    let tick = 100 + ((10 - ((100 + workerCase.body.humanId) % 10)) % 10);
    workerCase.harness.sandbox.pixelTicks = tick;
    workerCase.harness.elements.civ_body.tick(workerCase.body);
    assert.equal(workerCase.wallHead.element, "rock");
    assert.equal(workerCase.wallBody.element, "rock");
    assert.equal(workerCase.body.role, "food");
    assert.equal(workerCase.body.carry.stone, undefined);

    const minerCase = prepare("miner");
    tick = 100 + ((10 - ((100 + minerCase.body.humanId) % 10)) % 10);
    minerCase.harness.sandbox.pixelTicks = tick;
    minerCase.harness.elements.civ_body.tick(minerCase.body);
    assert.equal(minerCase.wallHead.element, "civ_tunnel");
    assert.equal(minerCase.wallBody.element, "civ_tunnel");
    assert.equal(minerCase.body.role, "miner");
    assert.equal(minerCase.body.carry.stone, 2);

    minerCase.body.carry.stone = 4;
    const banner = minerCase.harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_banner" && pixel.settlementId === minerCase.body.settlementId);
    minerCase.harness.createPixel("civ_quarry_core", 7, 9, {factionId: minerCase.body.factionId, settlementId: minerCase.body.settlementId, buildingId: 999});
    minerCase.harness.sandbox.HumanSociety.forceReindex();
    minerCase.harness.sandbox.pixelTicks = tick + 10;
    minerCase.harness.elements.civ_body.tick(minerCase.body);
    const snapshot = minerCase.harness.sandbox.HumanSociety.getFactionSnapshot(minerCase.body.factionId, minerCase.body.settlementId);
    assert.equal(snapshot.stock.stone, 4);
    assert.equal(minerCase.body.role, "miner");
    assert.equal(minerCase.body.task, "harvest");
});

test("touching canopies with established tree ids remain separate root-harvest targets", () => {
    const harness = createHarness();
    for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 14, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const firstRoot = harness.createPixel("tree_branch", 9, 9, {treeId: 101, _civTreeRoot: true, naturalVegetation: true});
    harness.createPixel("plant", 9, 8, {treeId: 101, naturalVegetation: true});
    const secondRoot = harness.createPixel("tree_branch", 10, 9, {treeId: 102, _civTreeRoot: true, naturalVegetation: true});
    const secondCanopy = harness.createPixel("plant", 10, 8, {treeId: 102, naturalVegetation: true});
    const body = harness.getPixel(8, 9);
    harness.sandbox.HumanSociety.forceReindex();
    body.role = "wood";
    body.task = "idle";

    let tick = 100 + ((10 - ((100 + body.humanId) % 10)) % 10);
    harness.sandbox.pixelTicks = tick;
    harness.elements.civ_body.tick(body);
    harness.sandbox.pixelTicks = tick + 10;
    harness.elements.civ_body.tick(body);

    assert.equal(firstRoot.del, true);
    assert.equal(secondRoot.del, undefined);
    assert.equal(secondCanopy.del, undefined);
});

test("a persistent unreachable resource eventually triggers no-progress blacklisting", () => {
    const harness = createHarness();
    for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    harness.createPixel("apple", 18, 9);
    const body = harness.getPixel(8, 9);
    harness.sandbox.HumanSociety.forceReindex();

    for (let attempt = 0; attempt < 30; attempt++) {
        harness.sandbox.pixelTicks = 9 + attempt * 60;
        harness.elements.civ_body.tick(body);
    }
    harness.sandbox.pixelTicks += 360;
    harness.elements.civ_body.tick(body);

    assert.notEqual(body.task, "harvest");
    assert.equal(body.blockedResourceKey, "18,9:apple");
    assert.ok(body.blockedResourceUntil > harness.sandbox.pixelTicks);
});

test("new buildings center inside existing territory and expand the same faction columns", () => {
    const harness = createHarness();
    for (let x = 1; x <= 35; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    harness.createPixel("civilized_human", 12, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const banner = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_banner");
    const hut = harness.createPixel("civ_hut_core", 28, 9);
    hut.factionId = banner.factionId;
    hut.factionColor = banner.factionColor;
    hut.settlementId = banner.settlementId;
    hut.buildingId = 500;
    banner.stock.wood = 10;
    banner.stock.stone = 8;
    banner.stock.seeds.apple_seed = 1;
    harness.sandbox.HumanSociety.forceReindex();

    harness.sandbox.pixelTicks = 120;
    harness.everyTickCallbacks[0]();

    const site = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_construction");
    assert.ok(site);
    assert.equal(site.blueprintType, "lumberyard");
    assert.equal(harness.sandbox.HumanSociety.territoryOwnerAt(site.x, site.y).factionId, banner.factionId);
    assert.ok(site.claimMaxX - site.claimMinX <= 22);
});

test("manual war persists until a sustained three-to-one imbalance annexes the weaker faction", () => {
    const harness = createHarness();
    for (let x = 1; x <= 72; x++) harness.createPixel("rock", x, 10);
    for (const x of [4, 6, 8, 10, 12, 14, 60, 62]) harness.createPixel("civilized_human", x, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }

    const strongBody = harness.getPixel(4, 9);
    const weakBodyA = harness.getPixel(60, 9);
    const weakBodyB = harness.getPixel(62, 9);
    const strongFaction = strongBody.factionId;
    const weakFaction = weakBodyA.factionId;
    assert.notEqual(strongFaction, weakFaction);
    harness.sandbox.pixelTicks = 120;
    assert.equal(harness.sandbox.HumanSociety.declareWar(strongFaction, weakFaction, "manual"), true);
    assert.equal(harness.sandbox.HumanSociety.atWar(strongFaction, weakFaction), true);
    harness.sandbox.HumanSociety.damageActor(weakBodyA, 1000, {factionId: strongFaction});

    for (let tick = 150; tick <= 660; tick += 30) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }

    assert.equal(harness.sandbox.HumanSociety.atWar(strongFaction, weakFaction), false);
    assert.equal(weakBodyB.factionId, strongFaction);
    const capturedBanner = harness.currentPixels.find((pixel) => !pixel.del && pixel.element === "civ_banner" && pixel.settlementId === weakBodyB.settlementId);
    assert.ok(capturedBanner);
    assert.equal(capturedBanner.factionId, strongFaction);

    // A save reload resets manager counters. Historical diplomacy IDs must
    // remain reserved so a new faction does not inherit a surrendered record.
    harness.resetCallbacks[0]();
    harness.sandbox.HumanSociety.forceReindex();
    harness.createPixel("civilized_human", 90, 8);
    assert.ok(harness.getPixel(90, 9).factionId > weakFaction);
});

test("surrender transfers partial research progress without directly unlocking a technology", () => {
    const harness = createHarness({techData: true});
    for (let x = 1; x <= 94; x++) harness.createPixel("rock", x, 10);
    for (const x of [4, 6, 8, 10, 12, 14, 16, 18, 70, 72]) {
        harness.createPixel("civilized_human", x, 8);
    }
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }

    const strongBody = harness.getPixel(4, 9);
    const weakBodyA = harness.getPixel(70, 9);
    const weakBodyB = harness.getPixel(72, 9);
    const strongFaction = strongBody.factionId;
    const weakFaction = weakBodyA.factionId;
    const banners = harness.currentPixels.filter((pixel) => !pixel.del && pixel.element === "civ_banner");
    const strongBanner = banners.find((banner) => banner.factionId === strongFaction);
    const weakBanner = banners.find((banner) => banner.factionId === weakFaction);
    const transferredTech = TechData.TECHNOLOGIES.find((tech) => tech.id === "siege_engineering");
    weakBanner.research.unlocked[transferredTech.id] = true;
    weakBanner.research.progress[transferredTech.id] = transferredTech.cost;

    harness.sandbox.pixelTicks = 120;
    harness.sandbox.HumanSociety.declareWar(strongFaction, weakFaction, "manual");
    assert.equal(harness.sandbox.HumanSociety.atWar(strongFaction, weakFaction), true);
    harness.sandbox.HumanSociety.damageActor(weakBodyA, 1000, {factionId: strongFaction});

    for (let tick = 150; tick <= 660; tick += 30) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }

    assert.equal(harness.sandbox.HumanSociety.atWar(strongFaction, weakFaction), false);
    assert.equal(weakBodyB.factionId, strongFaction);
    assert.equal(Boolean(strongBanner.research.unlocked[transferredTech.id]), false);
    assert.ok(strongBanner.research.progress[transferredTech.id] > 0);
    assert.ok(strongBanner.research.progress[transferredTech.id] < transferredTech.cost);
});

test("peace modes block declarations and suspend hostile damage without ending recorded wars", () => {
    const harness = createHarness();
    for (let x = 1; x <= 95; x++) harness.createPixel("rock", x, 10);
    for (const x of [6, 10]) harness.createPixel("civilized_human", x, 8);
    for (const tick of [30, 60, 90]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    for (const x of [70, 74]) harness.createPixel("civilized_human", x, 8);
    for (const tick of [120, 150, 180]) {
        harness.sandbox.pixelTicks = tick;
        harness.everyTickCallbacks[0]();
    }
    const api = harness.sandbox.HumanSociety;
    const factions = api.getDebugSnapshot().factions.map((entry) => entry.id).sort((a, b) => a - b);
    assert.equal(factions.length, 2);
    assert.equal(api.declareWar(factions[0], factions[1], "manual"), true);
    assert.equal(api.atWar(factions[0], factions[1]), true);

    assert.equal(api.setPeaceMode("full-peace"), "full-peace");
    assert.equal(api.atWar(factions[0], factions[1]), false);
    const suspended = api.getWarSnapshot(factions[0]);
    assert.equal(suspended.length, 1);
    assert.equal(suspended[0].suspended, true);
    const target = harness.currentPixels.find((pixel) => pixel.element === "civ_body" && pixel.factionId === factions[1]);
    const attacker = harness.currentPixels.find((pixel) => pixel.element === "civ_body" && pixel.factionId === factions[0]);
    const hp = target.hp;
    assert.equal(api.damageActor(target, 10, attacker), false);
    assert.equal(target.hp, hp);

    assert.equal(api.setPeaceMode("no-new-wars"), "no-new-wars");
    assert.equal(api.atWar(factions[0], factions[1]), true, "existing war resumes outside full peace");
    assert.equal(api.declareWar(factions[0], factions[1], "manual"), false, "new declarations are disabled even for an existing pair");
});

test("person commands select adults, move them, and preserve exact carry snapshots", () => {
    const harness = createHarness({relationMovement: true});
    for (let x = 1; x <= 30; x++) harness.createPixel("rock", x, 10);
    harness.createPixel("civilized_human", 8, 8);
    const api = harness.sandbox.HumanSociety;
    api.forceReindex();
    const actor = harness.currentPixels.find((pixel) => pixel.element === "civ_body");
    actor.carry = {wood: 2, food: 1};
    const selected = api.setCommandPerson(actor.humanId);
    assert.equal(selected.accepted, true);
    assert.equal(api.getPersonCommandState().humanId, actor.humanId);
    const move = api.issuePersonCommandAt(actor.humanId, 2, 14, 8);
    assert.equal(move.accepted, true);
    assert.equal(move.action, "move");
    assert.equal(actor.playerOrder.type, "move");
    const snapshot = api.getPersonSnapshot(actor.humanId);
    assert.equal(snapshot.carry.wood, 2);
    assert.equal(snapshot.carry.food, 1);
    assert.equal(snapshot.carryTotal, 3);
    assert.equal(snapshot.playerOrder.type, "move");
    api.cancelPersonCommand();
    assert.equal(api.getPersonCommandState().active, false);
});

