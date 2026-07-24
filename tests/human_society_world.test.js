const test = require("node:test");
const assert = require("node:assert/strict");
const World = require("../scripts/human_society_world.js");

test("building sprites use a bottom-middle core and require two clear rows or columns", () => {
    assert.deepEqual(World.buildingSpriteRect(10, 20), {left: 9, right: 11, top: 18, bottom: 20, width: 3, height: 3, coreX: 10, coreY: 20});
    assert.equal(World.buildingSpacingValid({x: 10, y: 20}, {x: 14, y: 20}), false);
    assert.equal(World.buildingSpacingValid({x: 10, y: 20}, {x: 15, y: 20}), true);
    assert.equal(World.buildingSpacingValid({x: 10, y: 20}, {x: 10, y: 25}), true);
});

test("territory is infinite vertically, first claim wins foreign columns, and later claims fill released columns", () => {
    const territory = new World.TerritoryIndex(80);
    const first = territory.reserve({claimId: "a", factionId: 1, anchorX: 30, claimTick: 10, claimOrder: 1});
    const second = territory.reserve({claimId: "b", factionId: 2, anchorX: 42, claimTick: 11, claimOrder: 2});
    assert.equal(first.minX, 19);
    assert.equal(first.maxX, 41);
    assert.equal(territory.ownerAt(19, -999), 1);
    assert.equal(territory.ownerAt(41, 999), 1);
    assert.equal(territory.ownerAt(42), 2);
    assert.equal(territory.wonColumns(second.claimId).includes(41), false);
    territory.release("a");
    assert.equal(territory.ownerAt(31), 2);
    assert.equal(territory.ownerAt(30), null);
});

test("same-faction territory claims overlap without losing ownership", () => {
    const territory = new World.TerritoryIndex(50);
    territory.reserve({claimId: "a", factionId: 3, anchorX: 20, claimOrder: 1});
    territory.reserve({claimId: "b", factionId: 3, anchorX: 25, claimOrder: 2});
    assert.equal(territory.ownerAt(20), 3);
    territory.release("a");
    assert.equal(territory.ownerAt(20), 3);
});

test("resource selection prefers owned land, then unowned land, and rejects foreign land", () => {
    const territory = new World.TerritoryIndex(100);
    territory.reserve({claimId: "own", factionId: 1, anchorX: 20, claimOrder: 1});
    territory.reserve({claimId: "foreign", factionId: 2, anchorX: 70, claimOrder: 2});
    const nodes = [{element: "rock", x: 50, y: 10}, {element: "rock", x: 25, y: 10}, {element: "rock", x: 70, y: 10}];
    const chosen = World.chooseResource(nodes, 1, territory, {x: 49, y: 10});
    assert.equal(chosen.x, 25);
    const reservations = new World.ResourceReservations();
    reservations.reserve(chosen, 7);
    assert.equal(World.chooseResource(nodes, 1, territory, {x: 49, y: 10}, reservations, 8).x, 50);
});

test("mixed backpacks enforce a shared capacity", () => {
    const actor = {};
    assert.deepEqual(World.addCarry(actor, "wood", 3, 4), {accepted: 3, overflow: 0, total: 3});
    assert.deepEqual(World.addCarry(actor, "stone", 3, 4), {accepted: 1, overflow: 2, total: 4});
    assert.equal(World.removeCarry(actor, "wood", 2), 2);
    assert.equal(World.carriedTotal(actor), 2);
});

test("population targets and largest-remainder role quotas are deterministic", () => {
    assert.deepEqual([0, 1, 2, 3, 4, 5].map(World.populationTarget), [6, 8, 12, 16, 20, 24]);
    const quotas = World.scaledRoleQuotas(7, 0);
    assert.equal(Object.values(quotas).reduce((sum, value) => sum + value, 0), 7);
    const urgent = World.scaledRoleQuotas(7, 0, {lowFood: true});
    assert.ok(urgent.food >= 4);
});

test("war helpers split fronts, double standing armies, and track sustained three-to-one power", () => {
    assert.deepEqual(World.splitAttackersAcrossFronts([1, 2, 3, 4, 5], [9, 7]), {"7": [1, 3, 5], "9": [2, 4]});
    const army = World.armyAssignment([1, 2, 3, 4, 5, 6, 7], 3, true);
    assert.deepEqual(army.attackers, [1, 2, 3]);
    assert.deepEqual(army.defenders, [4, 5, 6]);
    let state = World.updateImbalance({}, 30, 10, 100, 180);
    state = World.updateImbalance(state, 30, 10, 280, 180);
    assert.equal(state.ready, true);
    assert.equal(World.updateImbalance(state, 20, 10, 281, 180).ready, false);
});

test("chronicles use local real timestamps and retain the newest two thousand events", () => {
    assert.equal(World.realTimestamp(new Date(2026, 6, 23, 12, 34, 56)), "2026-07-23 12:34:56");
    const log = [];
    for (let i = 0; i < 2005; i++) World.appendChronicle(log, {sequence: i});
    assert.equal(log.length, 2000);
    assert.equal(log[0].sequence, 5);
});
