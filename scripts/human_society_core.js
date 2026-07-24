/*
 * Engine-independent rules for the civilized-human simulation.
 *
 * The module intentionally has no Sandboxels dependencies.  It can be loaded
 * through CommonJS in tests, or directly in a browser as HumanSocietyCore.
 */
(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.HumanSocietyCore = factory();
    }
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    var CONFIG = Object.freeze({
        FACTION_JOIN_RADIUS: 24,
        CAMP_RADIUS: 12,
        CAMP_STABILITY_TICKS: 60,

        ADULT_MAX_HP: 100,
        PASSIVE_HEAL_INTERVAL_TICKS: 60,
        PASSIVE_HEAL_AMOUNT: 1,

        MIN_REPRODUCTION_ADULTS: 0,
        BIRTH_FOOD_PER_PERSON: 0,
        BIRTH_FOOD_COST: 2,
        BIRTH_COOLDOWN_TICKS: 0,
        BIRTH_PEACE_TICKS: 0,
        CHILD_GROWTH_TICKS: 0,
        AUTONOMOUS_POPULATION_CAP: 120,

        TICKS_PER_YEAR: 240,
        ADULT_AGE_YEARS: 0,
        LIFESPAN_MIN_YEARS: 50,
        LIFESPAN_MAX_YEARS: 60,

        ERA_TECH_COUNT: 8,
        ERA_ADVANCE_REQUIRED: 6,
        DOMAIN_EXPERIENCE_MAX_DISCOUNT: 0.25,
        CONQUEST_KNOWLEDGE_TRANSFER: 0.5,
        CONQUEST_TECH_PROGRESS_TRANSFER: 0.5,

        BUILD_STEP_TICKS: 8,
        CONSTRUCTION_BLOCKED_TICKS: 180,
        CONSTRUCTION_REFUND_RATE: 0.5,

        AI_THINK_INTERVAL_TICKS: 10,
        SPATIAL_BUCKET_SIZE: 8,
        RESOURCE_SCAN_LIMIT: 96,
        MOVEMENT_BLOCKED_REPLAN_COUNT: 30,

        HOSTILITY_MIN: 0,
        HOSTILITY_MAX: 100,
        TERRITORY_OVERLAP_INTERVAL_TICKS: 30,
        TERRITORY_OVERLAP_HOSTILITY: 4,
        STARVING_TRESPASS_HOSTILITY: 15,
        ATTACK_HIT_HOSTILITY: 20,
        KILL_HOSTILITY: 35,
        HOSTILITY_DECAY_INTERVAL_TICKS: 60,
        HOSTILITY_DECAY_AMOUNT: 1,
        WAR_HOSTILITY_THRESHOLD: 100,
        CEASEFIRE_HOSTILITY_THRESHOLD: 25,
        CEASEFIRE_NO_ATTACK_TICKS: 900,

        SURRENDER_MIN_WAR_TICKS: 300,
        SURRENDER_POWER_RATIO: 3,
        SURRENDER_POWER_RATIO_TICKS: 180,
        SURRENDER_ADULT_LOSS_RATIO: 0.25,

        BLOOD_CHANCE: 0.25,
        BUILDING_WOOD_HP: 30,
        BUILDING_STONE_HP: 80,
        BUILDING_CORE_HP: 120
    });

    var TICKS_PER_YEAR = CONFIG.TICKS_PER_YEAR;
    var ADULT_AGE_YEARS = CONFIG.ADULT_AGE_YEARS;
    var LIFESPAN_MIN_YEARS = CONFIG.LIFESPAN_MIN_YEARS;
    var LIFESPAN_MAX_YEARS = CONFIG.LIFESPAN_MAX_YEARS;
    var ERA_TECH_COUNT = CONFIG.ERA_TECH_COUNT;
    var ERA_ADVANCE_REQUIRED = CONFIG.ERA_ADVANCE_REQUIRED;
    var ERA_IDS = Object.freeze([
        "tribal",
        "stone",
        "agriculture",
        "bronze",
        "iron",
        "castle"
    ]);
    var ERA_POPULATION_TARGETS = Object.freeze({
        tribal: 6,
        stone: 8,
        agriculture: 12,
        bronze: 16,
        iron: 20,
        castle: 24
    });
    var ERA_JOB_WEIGHTS = Object.freeze({
        tribal: Object.freeze({
            food: 2,
            wood: 2,
            builder: 1,
            flex: 1
        }),
        stone: Object.freeze({
            food: 2,
            wood: 2,
            miner: 2,
            builder: 1,
            artisan: 1
        }),
        agriculture: Object.freeze({
            food: 4,
            wood: 2,
            miner: 1,
            builder: 1,
            forester: 1,
            artisan: 1,
            military: 1,
            flex: 1
        }),
        bronze: Object.freeze({
            food: 4,
            wood: 2,
            miner: 3,
            builder: 2,
            forester: 1,
            artisan: 1,
            industry: 1,
            scholar: 1,
            military: 1
        }),
        iron: Object.freeze({
            food: 5,
            wood: 2,
            miner: 4,
            builder: 2,
            forester: 1,
            artisan: 1,
            industry: 2,
            scholar: 1,
            military: 2
        }),
        castle: Object.freeze({
            food: 6,
            wood: 2,
            miner: 4,
            builder: 2,
            forester: 1,
            artisan_trade: 2,
            industry: 2,
            scholar: 2,
            military: 3
        })
    });
    var FUEL_VALUES = Object.freeze({
        tree_branch: 2,
        bamboo: 3,
        wood: 4,
        charcoal: 10
    });

    var FIST_WEAPON = Object.freeze({
        id: "fists",
        damage: 8,
        range: 1,
        cooldown: 20,
        power: 1,
        cost: Object.freeze({})
    });
    var WEAPONS = Object.freeze({
        // Keep both spellings so engine adapters and saved actors can use either.
        fist: FIST_WEAPON,
        fists: FIST_WEAPON,
        club: Object.freeze({
            id: "club",
            damage: 14,
            range: 1,
            cooldown: 18,
            power: 1.75,
            cost: Object.freeze({ wood: 2 })
        }),
        spear: Object.freeze({
            id: "spear",
            damage: 18,
            range: 2,
            cooldown: 22,
            power: 2.25,
            cost: Object.freeze({ wood: 1, stone: 1 }),
            upgradeFrom: "club"
        })
    });

    var HOSTILITY_BY_EVENT = Object.freeze({
        overlap: CONFIG.TERRITORY_OVERLAP_HOSTILITY,
        territory_overlap: CONFIG.TERRITORY_OVERLAP_HOSTILITY,
        starving_trespass: CONFIG.STARVING_TRESPASS_HOSTILITY,
        trespass: CONFIG.STARVING_TRESPASS_HOSTILITY,
        hit: CONFIG.ATTACK_HIT_HOSTILITY,
        attack_hit: CONFIG.ATTACK_HIT_HOSTILITY,
        kill: CONFIG.KILL_HOSTILITY,
        death: CONFIG.KILL_HOSTILITY,
        decay: -CONFIG.HOSTILITY_DECAY_AMOUNT
    });

    function clamp(value, minimum, maximum) {
        value = Number(value);
        minimum = Number(minimum);
        maximum = Number(maximum);
        if (Number.isNaN(value)) {
            return minimum;
        }
        if (minimum > maximum) {
            var oldMinimum = minimum;
            minimum = maximum;
            maximum = oldMinimum;
        }
        return Math.min(maximum, Math.max(minimum, value));
    }

    function finiteNumber(value, fallback) {
        value = Number(value);
        return Number.isFinite(value) ? value : fallback;
    }

    /**
     * Picks an integer lifespan uniformly from the inclusive configured range.
     * Passing an RNG makes creation deterministic for tests and save migration.
     */
    function randomLifespanYears(rng, minimumYears, maximumYears) {
        rng = typeof rng === "function" ? rng : Math.random;
        var minimum = Math.floor(finiteNumber(minimumYears, LIFESPAN_MIN_YEARS));
        var maximum = Math.floor(finiteNumber(maximumYears, LIFESPAN_MAX_YEARS));
        if (minimum > maximum) {
            var oldMinimum = minimum;
            minimum = maximum;
            maximum = oldMinimum;
        }
        var possibilities = maximum - minimum + 1;
        var roll = clamp(rng(), 0, 1);
        return Math.min(maximum, minimum + Math.floor(roll * possibilities));
    }

    /**
     * Creates an immutable-by-convention life-history value object.
     * Existing persisted values win over generated defaults, so calling this
     * during migration never rerolls a valid lifespan or death tick.
     */
    function createLifeHistory(options, rng) {
        options = options || {};
        rng = typeof options.rng === "function" ? options.rng : rng;
        var currentTick = finiteNumber(
            options.currentTick !== undefined ? options.currentTick : options.tick,
            0
        );
        var ticksPerYear = Math.max(1, finiteNumber(options.ticksPerYear, TICKS_PER_YEAR));
        var adultAgeYears = Math.max(0, finiteNumber(options.adultAgeYears, ADULT_AGE_YEARS));
        var isAdult = Boolean(options.isAdult || options.adult);
        var birthTick = Number(options.birthTick);
        if (!Number.isFinite(birthTick)) {
            birthTick = currentTick - (isAdult ? adultAgeYears * ticksPerYear : 0);
        }

        var naturalDeathTick = Number(options.naturalDeathTick);
        var lifespanYears = Number(options.lifespanYears);
        if (!Number.isFinite(lifespanYears) && Number.isFinite(naturalDeathTick)) {
            lifespanYears = Math.max(0, naturalDeathTick - birthTick) / ticksPerYear;
        }
        if (!Number.isFinite(lifespanYears)) {
            lifespanYears = randomLifespanYears(
                rng,
                options.minimumYears,
                options.maximumYears
            );
        }
        if (!Number.isFinite(naturalDeathTick)) {
            naturalDeathTick = birthTick + lifespanYears * ticksPerYear;
        }

        return {
            birthTick: birthTick,
            lifespanYears: lifespanYears,
            naturalDeathTick: naturalDeathTick
        };
    }

    function ageInYears(lifeHistoryOrBirthTick, currentTick, ticksPerYear) {
        var birthTick = lifeHistoryOrBirthTick && typeof lifeHistoryOrBirthTick === "object" ?
            Number(lifeHistoryOrBirthTick.birthTick) : Number(lifeHistoryOrBirthTick);
        currentTick = finiteNumber(currentTick, 0);
        ticksPerYear = Math.max(1, finiteNumber(ticksPerYear, TICKS_PER_YEAR));
        if (!Number.isFinite(birthTick)) {
            return 0;
        }
        return Math.max(0, currentTick - birthTick) / ticksPerYear;
    }

    function isNaturalDeathDue(lifeHistory, currentTick) {
        var naturalDeathTick = lifeHistory && Number(lifeHistory.naturalDeathTick);
        currentTick = Number(currentTick);
        return Number.isFinite(naturalDeathTick) && Number.isFinite(currentTick) &&
            currentTick >= naturalDeathTick;
    }

    function distance(x1, y1, x2, y2) {
        return Math.hypot(Number(x2) - Number(x1), Number(y2) - Number(y1));
    }

    function candidateCoordinate(candidate, axis) {
        if (!candidate) {
            return NaN;
        }
        if (Number.isFinite(Number(candidate[axis]))) {
            return Number(candidate[axis]);
        }
        if (candidate.pixel && Number.isFinite(Number(candidate.pixel[axis]))) {
            return Number(candidate.pixel[axis]);
        }
        return NaN;
    }

    /**
     * Returns the faction id of the nearest candidate inside radius, or null.
     * Input order is the deterministic tie breaker.
     */
    function chooseFaction(candidates, x, y, radius) {
        if (!Array.isArray(candidates)) {
            return null;
        }
        radius = radius === undefined ? CONFIG.FACTION_JOIN_RADIUS : Math.max(0, Number(radius));
        var bestFaction = null;
        var bestDistance = Infinity;

        for (var index = 0; index < candidates.length; index++) {
            var candidate = candidates[index];
            var candidateX = candidateCoordinate(candidate, "x");
            var candidateY = candidateCoordinate(candidate, "y");
            if (!Number.isFinite(candidateX) || !Number.isFinite(candidateY)) {
                continue;
            }

            var factionId = candidate.factionId;
            if (factionId === undefined || factionId === null) {
                factionId = candidate.id;
            }
            if (factionId === undefined || factionId === null) {
                continue;
            }

            var candidateDistance = distance(x, y, candidateX, candidateY);
            if (candidateDistance <= radius && candidateDistance < bestDistance) {
                bestDistance = candidateDistance;
                bestFaction = factionId;
            }
        }

        return bestFaction;
    }

    function normalizeRecord(record) {
        record = record || {};
        if (!Number.isFinite(Number(record.hostility))) {
            record.hostility = 0;
        }
        record.hostility = clamp(record.hostility, CONFIG.HOSTILITY_MIN, CONFIG.HOSTILITY_MAX);
        record.atWar = Boolean(record.atWar);
        return record;
    }

    /**
     * Applies one diplomatic incident in place and returns record.
     * event may be a type string or {type, amount, tick}.
     */
    function applyHostility(record, event) {
        record = normalizeRecord(record);
        if (typeof event === "string") {
            event = { type: event };
        }
        event = event || {};

        var amount = Number(event.amount);
        if (!Number.isFinite(amount)) {
            amount = HOSTILITY_BY_EVENT[event.type] || 0;
        }
        record.hostility = clamp(
            record.hostility + amount,
            CONFIG.HOSTILITY_MIN,
            CONFIG.HOSTILITY_MAX
        );

        var tick = Number(event.tick);
        if (Number.isFinite(tick) && amount !== 0) {
            record.lastIncidentTick = tick;
            if (event.type === "hit" || event.type === "attack_hit" ||
                event.type === "kill" || event.type === "death") {
                record.lastAttackTick = tick;
            }
        }
        return record;
    }

    function elapsedIntervals(record, field, tick, interval, active) {
        if (!active) {
            record[field] = tick;
            return 0;
        }
        if (!Number.isFinite(Number(record[field]))) {
            record[field] = tick;
            return 0;
        }
        var elapsed = Math.max(0, tick - Number(record[field]));
        var intervals = Math.floor(elapsed / interval);
        if (intervals > 0) {
            record[field] = Number(record[field]) + intervals * interval;
        }
        return intervals;
    }

    /**
     * Advances non-binding hostility bookkeeping. War state is deliberately
     * untouched: wars may start only through manual declaration or exhausted
     * accessible non-renewable resources, and end only through annexation.
     */
    function stepDiplomacy(record, context) {
        record = normalizeRecord(record);
        context = context || {};
        var tick = Number(context.tick);
        if (!Number.isFinite(tick)) {
            tick = 0;
        }
        var overlap = Boolean(context.overlap || context.territoryOverlap || context.adjacent);
        var incident = Boolean(
            context.incident || context.hadIncident || context.attackOccurred || context.event
        );

        if (context.attackOccurred) {
            record.lastAttackTick = tick;
            record.lastIncidentTick = tick;
        }

        var overlapIntervals = elapsedIntervals(
            record,
            "lastOverlapStepTick",
            tick,
            CONFIG.TERRITORY_OVERLAP_INTERVAL_TICKS,
            overlap
        );
        if (overlapIntervals > 0) {
            applyHostility(record, {
                type: "overlap",
                amount: overlapIntervals * CONFIG.TERRITORY_OVERLAP_HOSTILITY,
                tick: tick
            });
            incident = true;
        }

        var peaceful = !overlap && !incident;
        var decayIntervals = elapsedIntervals(
            record,
            "lastHostilityDecayTick",
            tick,
            CONFIG.HOSTILITY_DECAY_INTERVAL_TICKS,
            peaceful
        );
        if (decayIntervals > 0) {
            applyHostility(record, {
                type: "decay",
                amount: -decayIntervals * CONFIG.HOSTILITY_DECAY_AMOUNT,
                tick: tick
            });
        }

        return record;
    }

    function weaponFor(actor) {
        if (actor && actor.weapon && typeof actor.weapon === "object") {
            return {
                id: actor.weapon.id || "custom",
                damage: Number(actor.weapon.damage) || WEAPONS.fist.damage,
                range: Number(actor.weapon.range) || WEAPONS.fist.range,
                cooldown: Number(actor.weapon.cooldown) || WEAPONS.fist.cooldown,
                power: Number(actor.weapon.power) || 1
            };
        }
        var weaponId = actor && actor.weapon;
        return WEAPONS[weaponId] || WEAPONS.fist;
    }

    function targetInWeaponBox(attacker, target, weapon) {
        var dx = Number(target.x) - Number(attacker.x);
        var dy = Number(target.y) - Number(attacker.y);
        if (!Number.isFinite(dx) || !Number.isFinite(dy)) return false;
        var id = weapon && weapon.id || "fists";
        if (id === "fist" || id === "fists") return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
        if (id === "club" || id === "iron_sword" || id === "bronze_sword") {
            var direction = Number(attacker.dir) < 0 ? -1 : 1;
            return dy >= -2 && dy <= 1 && (direction < 0 ? dx >= -2 && dx <= 1 : dx >= -1 && dx <= 2);
        }
        var radius = id === "crossbow" ? 5 : (id === "bow" ? 4 : Math.max(1, Number(weapon.range) || 1));
        return Math.abs(dx) <= radius && Math.abs(dy) <= radius;
    }

    /**
     * Computes a comparable force score from living adults.  Weapon quality is
     * weighted by current health; warriors/guards get a modest role bonus.
     */
    function computeMilitaryPower(actors) {
        if (!Array.isArray(actors)) {
            return 0;
        }
        var total = 0;
        for (var index = 0; index < actors.length; index++) {
            var actor = actors[index];
            if (!actor || actor.isChild || actor.dead || Number(actor.hp) <= 0) {
                continue;
            }
            var maximumHp = Number(actor.maxHp) || CONFIG.ADULT_MAX_HP;
            var health = clamp(Number(actor.hp) / maximumHp, 0, 1);
            var roleMultiplier = actor.role === "warrior" ? 1.25 :
                (actor.role === "guard" ? 1.1 : 1);
            total += weaponFor(actor).power * health * roleMultiplier;
        }
        return total;
    }

    function factionValue(context, weakSide, baseName) {
        var sideName = weakSide === "A" ? baseName + "A" : baseName + "B";
        if (context[sideName] !== undefined) {
            return context[sideName];
        }
        var weakName = "weak" + baseName.charAt(0).toUpperCase() + baseName.slice(1);
        if (context[weakName] !== undefined) {
            return context[weakName];
        }
        return context[baseName];
    }

    /** Tracks a continuous 3:1 force imbalance and annexes the weaker side. */
    function stepSurrender(record, context) {
        record = normalizeRecord(record);
        context = context || {};
        var tick = Number(context.tick);
        if (!Number.isFinite(tick)) {
            tick = 0;
        }

        if (!record.atWar || record.surrendered) {
            record.powerImbalanceTicks = 0;
            record.lastPowerCheckTick = tick;
            record.dominantFactionId = undefined;
            record.weakFactionId = undefined;
            return record;
        }

        var powerA = Math.max(0, Number(context.powerA) || 0);
        var powerB = Math.max(0, Number(context.powerB) || 0);
        var factionA = context.factionA !== undefined ? context.factionA : record.factionA;
        var factionB = context.factionB !== undefined ? context.factionB : record.factionB;
        var strongSide = null;
        var weakSide = null;
        var strongPower = 0;
        var weakPower = 0;

        if (powerA > powerB) {
            strongSide = "A";
            weakSide = "B";
            strongPower = powerA;
            weakPower = powerB;
        } else if (powerB > powerA) {
            strongSide = "B";
            weakSide = "A";
            strongPower = powerB;
            weakPower = powerA;
        }

        var ratio = weakSide === null ? 1 :
            (weakPower === 0 ? Infinity : strongPower / weakPower);
        var dominantFaction = strongSide === "A" ? factionA : factionB;
        var weakFaction = weakSide === "A" ? factionA : factionB;
        var qualifying = weakSide !== null && ratio >= CONFIG.SURRENDER_POWER_RATIO;
        var previousCheckTick = Number(record.lastPowerCheckTick);
        var elapsed = Number.isFinite(previousCheckTick) ? Math.max(0, tick - previousCheckTick) : 0;
        record.lastPowerCheckTick = tick;

        if (!qualifying || (record.weakFactionId !== undefined && record.weakFactionId !== weakFaction)) {
            record.powerImbalanceTicks = 0;
        }

        if (qualifying) {
            if (record.weakFactionId === weakFaction && record.dominantFactionId === dominantFaction) {
                record.powerImbalanceTicks = (Number(record.powerImbalanceTicks) || 0) + elapsed;
            } else {
                record.powerImbalanceTicks = 0;
            }
            record.dominantFactionId = dominantFaction;
            record.weakFactionId = weakFaction;
            record.powerRatio = ratio;
        } else {
            record.dominantFactionId = undefined;
            record.weakFactionId = undefined;
            record.powerRatio = ratio;
        }

        var warStartTick = Number(record.warStartTick);
        var longEnough = Number.isFinite(warStartTick) &&
            tick - warStartTick >= CONFIG.SURRENDER_MIN_WAR_TICKS;
        var imbalanceLongEnough = record.powerImbalanceTicks >= CONFIG.SURRENDER_POWER_RATIO_TICKS;
        if (qualifying && longEnough && imbalanceLongEnough) {
            record.surrendered = true;
            record.surrenderTick = tick;
            record.victorFactionId = dominantFaction;
            record.loserFactionId = weakFaction;
        }

        return record;
    }

    function resourceAmount(settlement, resource) {
        if (!settlement) {
            return 0;
        }
        if (settlement.resources && settlement.resources[resource] !== undefined) {
            return Number(settlement.resources[resource]) || 0;
        }
        return Number(settlement[resource]) || 0;
    }

    function canReproduce(settlement, stats, tick, globalPopulation) {
        settlement = settlement || {};
        stats = stats || {};
        tick = Number(tick) || 0;
        globalPopulation = Number(globalPopulation) || 0;

        var population = Math.max(0, Number(stats.population) || 0);
        var targetPopulation = Number(stats.targetPopulation);
        if (!Number.isFinite(targetPopulation)) targetPopulation = Infinity;
        if (population >= targetPopulation || resourceAmount(settlement, "food") < CONFIG.BIRTH_FOOD_COST) {
            return false;
        }

        return true;
    }

    function constructionRefund(costs, placedRatio) {
        costs = costs || {};
        placedRatio = clamp(placedRatio, 0, 1);
        var refund = {};
        Object.keys(costs).forEach(function (resource) {
            var cost = Math.max(0, Number(costs[resource]) || 0);
            refund[resource] = Math.floor(
                cost * (1 - placedRatio) * CONFIG.CONSTRUCTION_REFUND_RATE
            );
        });
        return refund;
    }

    function techSetFrom(value) {
        if (value instanceof Set) {
            return new Set(value);
        }
        if (Array.isArray(value)) {
            return new Set(value);
        }
        var result = new Set();
        if (value && typeof value === "object") {
            Object.keys(value).forEach(function (techId) {
                if (value[techId]) result.add(techId);
            });
        }
        return result;
    }

    function eraIndexFor(era) {
        if (era && typeof era === "object") {
            if (era.id !== undefined) {
                era = era.id;
            }
            else if (era.eraId !== undefined) {
                era = era.eraId;
            }
            else if (era.index !== undefined) {
                era = era.index;
            }
        }
        if (typeof era === "number" && Number.isFinite(era)) {
            var numericIndex = Math.floor(era);
            return numericIndex >= 0 && numericIndex < ERA_IDS.length ? numericIndex : -1;
        }
        return ERA_IDS.indexOf(String(era));
    }

    function eraIdFor(era) {
        var index = eraIndexFor(era);
        return index >= 0 ? ERA_IDS[index] : null;
    }

    function nextEraId(era) {
        var index = eraIndexFor(era);
        return index >= 0 && index < ERA_IDS.length - 1 ? ERA_IDS[index + 1] : null;
    }

    function eraPopulationTarget(era, fallback) {
        var eraId = eraIdFor(era);
        if (eraId !== null) {
            return ERA_POPULATION_TARGETS[eraId];
        }
        return Math.max(0, Math.floor(finiteNumber(fallback, 0)));
    }

    function eraJobWeights(era) {
        var eraId = eraIdFor(era);
        var weights = eraId === null ? null : ERA_JOB_WEIGHTS[eraId];
        var result = {};
        if (!weights) return result;
        Object.keys(weights).forEach(function (jobId) {
            result[jobId] = weights[jobId];
        });
        return result;
    }

    /**
     * Scales relative job weights to an exact worker count. Fractional seats
     * are assigned by largest remainder, with object key order as a stable
     * tie-breaker so identical inputs always produce identical allocations.
     */
    function allocateJobWeights(weights, workerCount) {
        weights = weights && typeof weights === "object" ? weights : {};
        workerCount = Math.max(0, Math.floor(finiteNumber(workerCount, 0)));
        var result = {};
        var candidates = [];
        var totalWeight = 0;

        Object.keys(weights).forEach(function (jobId, index) {
            var weight = Math.max(0, finiteNumber(weights[jobId], 0));
            result[jobId] = 0;
            if (weight > 0) {
                candidates.push({jobId: jobId, index: index, weight: weight});
                totalWeight += weight;
            }
        });
        if (workerCount === 0 || totalWeight === 0) return result;

        var allocated = 0;
        candidates.forEach(function (candidate) {
            var exact = workerCount * candidate.weight / totalWeight;
            var whole = Math.floor(exact);
            result[candidate.jobId] = whole;
            candidate.remainder = exact - whole;
            allocated += whole;
        });
        candidates.sort(function (left, right) {
            if (left.remainder !== right.remainder) {
                return right.remainder - left.remainder;
            }
            return left.index - right.index;
        });
        for (var remaining = workerCount - allocated, index = 0; index < remaining; index++) {
            result[candidates[index % candidates.length].jobId] += 1;
        }
        return result;
    }

    function eraJobAllocation(era, workerCount) {
        return allocateJobWeights(eraJobWeights(era), workerCount);
    }

    function eraResearchProgress(researchedTechs, eraTechIds, requiredCount) {
        var researched = techSetFrom(researchedTechs);
        var uniqueEraTechs = [];
        var seen = new Set();
        if (Array.isArray(eraTechIds)) {
            eraTechIds.forEach(function (techId) {
                if (!seen.has(techId)) {
                    seen.add(techId);
                    uniqueEraTechs.push(techId);
                }
            });
        }
        var completed = uniqueEraTechs.reduce(function (count, techId) {
            return count + (researched.has(techId) ? 1 : 0);
        }, 0);
        var required = Math.max(1, Math.floor(finiteNumber(
            requiredCount,
            CONFIG.ERA_ADVANCE_REQUIRED
        )));
        return {
            completed: completed,
            total: uniqueEraTechs.length,
            required: required,
            canAdvance: completed >= required
        };
    }

    function shouldAdvanceEra(researchedTechs, eraTechIds, requiredCount) {
        return eraResearchProgress(researchedTechs, eraTechIds, requiredCount).canAdvance;
    }

    function eraProgressionState(era, researchedTechs, eraTechIds, requiredCount) {
        var eraIndex = eraIndexFor(era);
        var eraId = eraIndex >= 0 ? ERA_IDS[eraIndex] : null;
        var followingEraId = nextEraId(era);
        var progress = eraResearchProgress(researchedTechs, eraTechIds, requiredCount);
        var thresholdMet = progress.canAdvance;
        return {
            eraId: eraId,
            eraIndex: eraIndex,
            nextEraId: followingEraId,
            finalEra: eraIndex === ERA_IDS.length - 1,
            completed: progress.completed,
            total: progress.total,
            required: progress.required,
            completionRatio: progress.total > 0 ? progress.completed / progress.total : 0,
            thresholdMet: thresholdMet,
            canAdvance: thresholdMet && followingEraId !== null
        };
    }

    function domainExperienceDiscount(domainExperience) {
        var experience = Math.max(0, finiteNumber(domainExperience, 0));
        return Math.min(
            CONFIG.DOMAIN_EXPERIENCE_MAX_DISCOUNT,
            experience / 100
        );
    }

    function researchCost(baseCost, domainExperience) {
        var cost = Math.max(0, finiteNumber(baseCost, 0));
        return Math.ceil(cost * (1 - domainExperienceDiscount(domainExperience)));
    }

    function experienceForDomain(source, domain) {
        if (Number.isFinite(Number(source))) {
            return Number(source);
        }
        if (!source || typeof source !== "object") {
            return 0;
        }
        return finiteNumber(source[domain], 0);
    }

    /**
     * Selects one affordable research candidate.  A focused technology wins
     * over a focused domain, then explicit priority, cost, and input order.
     */
    function selectFocusedResearch(candidates, options) {
        candidates = Array.isArray(candidates) ? candidates : [];
        options = options || {};
        var researched = techSetFrom(options.researchedTechs);
        var knowledge = Number(options.knowledge);
        var hasKnowledgeLimit = Number.isFinite(knowledge);
        var eligible = [];

        candidates.forEach(function (candidate, index) {
            if (!candidate || candidate.id === undefined || candidate.id === null) return;
            if (candidate.researched || researched.has(candidate.id)) return;
            if (candidate.available === false || candidate.conditionMet === false) return;
            var baseCost = candidate.baseCost !== undefined ? candidate.baseCost : candidate.cost;
            var experience = experienceForDomain(options.domainExperience, candidate.domain);
            var effectiveCost = researchCost(baseCost, experience);
            if (hasKnowledgeLimit && effectiveCost > knowledge) return;
            eligible.push({
                candidate: candidate,
                index: index,
                effectiveCost: effectiveCost,
                discount: domainExperienceDiscount(experience),
                exactFocus: options.focusTechId !== undefined && candidate.id === options.focusTechId,
                domainFocus: options.focusDomain !== undefined && candidate.domain === options.focusDomain,
                priority: finiteNumber(candidate.priority, 0)
            });
        });

        eligible.sort(function (left, right) {
            if (left.exactFocus !== right.exactFocus) return left.exactFocus ? -1 : 1;
            if (left.domainFocus !== right.domainFocus) return left.domainFocus ? -1 : 1;
            if (left.priority !== right.priority) return right.priority - left.priority;
            if (left.effectiveCost !== right.effectiveCost) return left.effectiveCost - right.effectiveCost;
            return left.index - right.index;
        });

        if (!eligible.length) return null;
        var selected = eligible[0];
        return Object.assign({}, selected.candidate, {
            effectiveCost: selected.effectiveCost,
            discount: selected.discount
        });
    }

    function progressObject(value) {
        var result = {};
        if (!value || typeof value !== "object") return result;
        if (value instanceof Map) {
            value.forEach(function (progress, techId) {
                result[techId] = Math.max(0, finiteNumber(progress, 0));
            });
            return result;
        }
        Object.keys(value).forEach(function (techId) {
            result[techId] = Math.max(0, finiteNumber(value[techId], 0));
        });
        return result;
    }

    function techCostFor(techCosts, techId) {
        var value;
        if (techCosts instanceof Map) value = techCosts.get(techId);
        else if (techCosts && typeof techCosts === "object") value = techCosts[techId];
        if (value && typeof value === "object") {
            value = value.baseCost !== undefined ? value.baseCost : value.cost;
        }
        value = Number(value);
        return Number.isFinite(value) && value >= 0 ? value : null;
    }

    /**
     * Returns the winner's research state after receiving half of the loser's
     * unspent knowledge and half of each technology's invested progress.
     * A conquered completed technology contributes half of its full cost.
     */
    function mergeConquestResearch(winnerState, loserState, techCosts) {
        winnerState = winnerState || {};
        loserState = loserState || {};
        var winnerResearched = techSetFrom(winnerState.researchedTechs);
        var loserResearched = techSetFrom(loserState.researchedTechs);
        var winnerProgress = progressObject(
            winnerState.techProgress || winnerState.researchProgress
        );
        var loserProgress = progressObject(
            loserState.techProgress || loserState.researchProgress
        );
        var allTechIds = new Set();
        winnerResearched.forEach(function (techId) { allTechIds.add(techId); });
        loserResearched.forEach(function (techId) { allTechIds.add(techId); });
        Object.keys(winnerProgress).forEach(function (techId) { allTechIds.add(techId); });
        Object.keys(loserProgress).forEach(function (techId) { allTechIds.add(techId); });

        var mergedProgress = {};
        allTechIds.forEach(function (techId) {
            var cost = techCostFor(techCosts, techId);
            var winnerValue = winnerProgress[techId] || 0;
            var loserValue = loserProgress[techId] || 0;
            if (winnerResearched.has(techId) && cost !== null) winnerValue = cost;
            if (loserResearched.has(techId) && cost !== null) loserValue = cost;
            var merged = winnerValue + loserValue * CONFIG.CONQUEST_TECH_PROGRESS_TRANSFER;
            if (cost !== null) merged = Math.min(cost, merged);
            if (winnerResearched.has(techId) || (cost !== null && merged >= cost)) {
                winnerResearched.add(techId);
                if (cost !== null) merged = cost;
            }
            if (merged > 0 || winnerResearched.has(techId)) mergedProgress[techId] = merged;
        });

        return Object.assign({}, winnerState, {
            knowledge: Math.max(0, finiteNumber(winnerState.knowledge, 0)) +
                Math.max(0, finiteNumber(loserState.knowledge, 0)) * CONFIG.CONQUEST_KNOWLEDGE_TRANSFER,
            researchedTechs: Array.from(winnerResearched),
            techProgress: mergedProgress
        });
    }

    function emptyFuelUse(types) {
        var used = {};
        types.forEach(function (type) { used[type] = 0; });
        return used;
    }

    function preferFuelUse(left, right, typesByDescendingValue) {
        if (!right) return true;
        if (left.itemCount !== right.itemCount) return left.itemCount < right.itemCount;
        for (var index = 0; index < typesByDescendingValue.length; index++) {
            var type = typesByDescendingValue[index];
            var leftUsed = left.used[type] || 0;
            var rightUsed = right.used[type] || 0;
            if (leftUsed !== rightUsed) return leftUsed < rightUsed;
        }
        return false;
    }

    /**
     * Solves a small bounded fuel problem.  It minimizes waste first, then the
     * number of consumed items, then preserves higher-value fuels on ties.
     */
    function selectFuelCombination(available, requiredFuel, fuelValues) {
        available = available || {};
        fuelValues = fuelValues || FUEL_VALUES;
        var types = Object.keys(fuelValues).filter(function (type) {
            return finiteNumber(fuelValues[type], 0) > 0;
        });
        var required = Math.max(0, finiteNumber(requiredFuel, 0));
        if (required === 0) {
            return {used: emptyFuelUse(types), provided: 0, waste: 0, itemCount: 0};
        }

        var totalAvailableFuel = 0;
        var maximumFuelValue = 0;
        var counts = {};
        types.forEach(function (type) {
            counts[type] = Math.max(0, Math.floor(finiteNumber(available[type], 0)));
            maximumFuelValue = Math.max(maximumFuelValue, fuelValues[type]);
            totalAvailableFuel += counts[type] * fuelValues[type];
        });
        if (totalAvailableFuel < required || maximumFuelValue <= 0) return null;

        var limit = Math.ceil(required) + maximumFuelValue - 1;
        var descendingValueTypes = types.slice().sort(function (left, right) {
            return fuelValues[right] - fuelValues[left] || left.localeCompare(right);
        });
        var states = new Array(limit + 1);
        states[0] = {used: emptyFuelUse(types), itemCount: 0};

        types.forEach(function (type) {
            var nextStates = states.slice();
            var value = fuelValues[type];
            for (var total = 0; total <= limit; total++) {
                var state = states[total];
                if (!state) continue;
                var maximumCount = Math.min(counts[type], Math.floor((limit - total) / value));
                for (var count = 1; count <= maximumCount; count++) {
                    var nextTotal = total + count * value;
                    var used = Object.assign({}, state.used);
                    used[type] = (used[type] || 0) + count;
                    var candidate = {used: used, itemCount: state.itemCount + count};
                    if (preferFuelUse(candidate, nextStates[nextTotal], descendingValueTypes)) {
                        nextStates[nextTotal] = candidate;
                    }
                }
            }
            states = nextStates;
        });

        for (var provided = Math.ceil(required); provided <= limit; provided++) {
            if (!states[provided]) continue;
            return {
                used: states[provided].used,
                provided: provided,
                waste: provided - required,
                itemCount: states[provided].itemCount
            };
        }
        return null;
    }

    function bresenhamLine(x0, y0, x1, y1) {
        x0 = Number(x0); y0 = Number(y0); x1 = Number(x1); y1 = Number(y1);
        if (![x0, y0, x1, y1].every(Number.isFinite)) return [];
        x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
        var points = [];
        var dx = Math.abs(x1 - x0);
        var sx = x0 < x1 ? 1 : -1;
        var dy = -Math.abs(y1 - y0);
        var sy = y0 < y1 ? 1 : -1;
        var error = dx + dy;

        while (true) {
            points.push({x: x0, y: y0});
            if (x0 === x1 && y0 === y1) break;
            var doubledError = 2 * error;
            if (doubledError >= dy) {
                error += dy;
                x0 += sx;
            }
            if (doubledError <= dx) {
                error += dx;
                y0 += sy;
            }
        }
        return points;
    }

    function normalizeTransparency(value) {
        if (value === undefined || value === null) return 1;
        if (value === true) return 1;
        if (value === false) return 0;
        if (typeof value === "object" && value.transparency !== undefined) {
            value = value.transparency;
        }
        return clamp(value, 0, 1);
    }

    /**
     * Multiplies cell transparency along a Bresenham line.  Shooter and target
     * cells are excluded by default, while either endpoint can be opted in.
     */
    function lineOfSightTransparency(x0, y0, x1, y1, transparencyAt, options) {
        var points = bresenhamLine(x0, y0, x1, y1);
        if (!points.length) return 0;
        transparencyAt = typeof transparencyAt === "function" ? transparencyAt : function () { return 1; };
        options = options || {};
        var start = options.includeStart ? 0 : 1;
        var end = options.includeEnd ? points.length : Math.max(start, points.length - 1);
        var transparency = 1;
        for (var index = start; index < end; index++) {
            var point = points[index];
            transparency *= normalizeTransparency(
                transparencyAt(point.x, point.y, index, points)
            );
            if (transparency <= 0) return 0;
        }
        return clamp(transparency, 0, 1);
    }

    function hasLineOfSight(x0, y0, x1, y1, transparencyAt, minimumTransparency, options) {
        var minimum = clamp(
            minimumTransparency === undefined ? 0 : minimumTransparency,
            0,
            1
        );
        var transparency = lineOfSightTransparency(x0, y0, x1, y1, transparencyAt, options);
        return transparency > 0 && transparency >= minimum;
    }

    /** Every in-range, visible attack uses the same fixed 50% hit chance. */
    function rangedHitProbability(options) {
        options = options || {};
        var shotDistance = Number(options.distance);
        if (!Number.isFinite(shotDistance) && options.attacker && options.target) {
            shotDistance = distance(
                options.attacker.x,
                options.attacker.y,
                options.target.x,
                options.target.y
            );
        }
        shotDistance = Math.max(0, finiteNumber(shotDistance, 0));
        var maximumRange = Math.max(0, finiteNumber(options.maxRange, 1));
        if (maximumRange <= 0 || shotDistance > maximumRange) return 0;
        var visibilityValue = options.visibility !== undefined ?
            options.visibility : options.lineTransparency;
        var visibility = clamp(visibilityValue === undefined ? 1 : visibilityValue, 0, 1);
        if (visibility <= 0) return 0;
        return 0.5;
    }

    function actorFromMap(actorMap, id) {
        if (actorMap instanceof Map) {
            return actorMap.get(id);
        }
        if (!actorMap) {
            return undefined;
        }
        return actorMap[id];
    }

    function invalidResult(intent, reason) {
        return {
            tick: Number(intent.tick) || 0,
            attackerId: intent.attackerId,
            targetId: intent.targetId,
            valid: false,
            reason: reason,
            damage: 0,
            blood: false
        };
    }

    /**
     * Resolves attack intents in tick groups.  All valid hits in one tick are
     * accumulated before HP changes, so actors killed together still trade
     * blows.  actorMap values are updated in place.
     */
    function resolveAttackIntents(intents, actorMap, rng) {
        intents = Array.isArray(intents) ? intents : [];
        rng = typeof rng === "function" ? rng : Math.random;

        var indexedIntents = intents.map(function (intent, index) {
            return { intent: intent || {}, index: index };
        }).sort(function (left, right) {
            var tickDifference = (Number(left.intent.tick) || 0) - (Number(right.intent.tick) || 0);
            return tickDifference || left.index - right.index;
        });

        var results = [];
        var deaths = [];
        var damageTotals = new Map();
        var cursor = 0;

        while (cursor < indexedIntents.length) {
            var tick = Number(indexedIntents[cursor].intent.tick) || 0;
            var end = cursor + 1;
            while (end < indexedIntents.length &&
                (Number(indexedIntents[end].intent.tick) || 0) === tick) {
                end++;
            }

            var aliveAtStart = new Set();
            var groupActors = new Map();
            for (var scan = cursor; scan < end; scan++) {
                var scanIntent = indexedIntents[scan].intent;
                var scanAttacker = actorFromMap(actorMap, scanIntent.attackerId);
                var scanTarget = actorFromMap(actorMap, scanIntent.targetId);
                if (scanAttacker) {
                    groupActors.set(scanIntent.attackerId, scanAttacker);
                }
                if (scanTarget) {
                    groupActors.set(scanIntent.targetId, scanTarget);
                }
            }
            groupActors.forEach(function (actor, id) {
                if (Number(actor.hp) > 0 && !actor.dead) {
                    aliveAtStart.add(id);
                }
            });

            var usedAttackers = new Set();
            var groupDamage = new Map();
            var validResults = [];

            for (var itemIndex = cursor; itemIndex < end; itemIndex++) {
                var intent = indexedIntents[itemIndex].intent;
                var attacker = actorFromMap(actorMap, intent.attackerId);
                var target = actorFromMap(actorMap, intent.targetId);
                var result;

                if (!attacker || !target) {
                    result = invalidResult(intent, "missing_actor");
                } else if (!aliveAtStart.has(intent.attackerId)) {
                    result = invalidResult(intent, "attacker_unable");
                } else if (!aliveAtStart.has(intent.targetId)) {
                    result = invalidResult(intent, "target_dead");
                } else if (attacker.factionId === target.factionId) {
                    result = invalidResult(intent, "same_faction");
                } else if (usedAttackers.has(intent.attackerId)) {
                    result = invalidResult(intent, "already_attacked");
                } else {
                    var weapon = weaponFor(attacker);
                    if (!targetInWeaponBox(attacker, target, weapon)) {
                        result = invalidResult(intent, "out_of_range");
                    } else {
                        usedAttackers.add(intent.attackerId);
                        attacker.attackReadyTick = tick;
                        var dx = Math.sign(Number(target.x) - Number(attacker.x));
                        var dy = Math.sign(Number(target.y) - Number(attacker.y));
                        var hit = clamp(rng(), 0, 1) < 0.5;
                        var damage = hit ? Math.max(0.1, weapon.damage * 0.1) : 0;
                        result = {
                            tick: tick,
                            attackerId: intent.attackerId,
                            targetId: intent.targetId,
                            valid: true,
                            reason: hit ? null : "miss",
                            weapon: weapon.id,
                            hit: hit,
                            damage: damage,
                            blood: hit && clamp(rng(), 0, 1) < CONFIG.BLOOD_CHANCE,
                            knockback: { dx: dx, dy: dy }
                        };
                        if (damage > 0) groupDamage.set(
                            intent.targetId,
                            (groupDamage.get(intent.targetId) || 0) + damage
                        );
                        validResults.push(result);
                    }
                }
                results.push(result);
            }

            groupDamage.forEach(function (damage, targetId) {
                var target = actorFromMap(actorMap, targetId);
                var hpBefore = Math.max(0, Number(target.hp) || 0);
                target.hp = Math.max(0, hpBefore - damage);
                damageTotals.set(targetId, (damageTotals.get(targetId) || 0) + damage);
                if (hpBefore > 0 && target.hp === 0) {
                    target.dead = true;
                    deaths.push(targetId);
                }
            });

            for (var resultIndex = 0; resultIndex < validResults.length; resultIndex++) {
                var validResult = validResults[resultIndex];
                validResult.killed = deaths.indexOf(validResult.targetId) !== -1;
            }
            cursor = end;
        }

        var damageByTarget = {};
        damageTotals.forEach(function (damage, id) {
            damageByTarget[id] = damage;
        });
        return {
            results: results,
            deaths: deaths,
            damageByTarget: damageByTarget
        };
    }

    return Object.freeze({
        CONFIG: CONFIG,
        WEAPONS: WEAPONS,
        FUEL_VALUES: FUEL_VALUES,
        TICKS_PER_YEAR: TICKS_PER_YEAR,
        ADULT_AGE_YEARS: ADULT_AGE_YEARS,
        LIFESPAN_MIN_YEARS: LIFESPAN_MIN_YEARS,
        LIFESPAN_MAX_YEARS: LIFESPAN_MAX_YEARS,
        ERA_TECH_COUNT: ERA_TECH_COUNT,
        ERA_ADVANCE_REQUIRED: ERA_ADVANCE_REQUIRED,
        ERA_IDS: ERA_IDS,
        ERA_POPULATION_TARGETS: ERA_POPULATION_TARGETS,
        ERA_JOB_WEIGHTS: ERA_JOB_WEIGHTS,
        clamp: clamp,
        distance: distance,
        randomLifespanYears: randomLifespanYears,
        createLifeHistory: createLifeHistory,
        ageInYears: ageInYears,
        ageYears: ageInYears,
        isNaturalDeathDue: isNaturalDeathDue,
        hasReachedNaturalDeath: isNaturalDeathDue,
        chooseFaction: chooseFaction,
        applyHostility: applyHostility,
        stepDiplomacy: stepDiplomacy,
        computeMilitaryPower: computeMilitaryPower,
        stepSurrender: stepSurrender,
        canReproduce: canReproduce,
        constructionRefund: constructionRefund,
        eraIndexFor: eraIndexFor,
        eraIdFor: eraIdFor,
        nextEraId: nextEraId,
        eraPopulationTarget: eraPopulationTarget,
        eraJobWeights: eraJobWeights,
        allocateJobWeights: allocateJobWeights,
        eraJobAllocation: eraJobAllocation,
        eraResearchProgress: eraResearchProgress,
        shouldAdvanceEra: shouldAdvanceEra,
        eraProgressionState: eraProgressionState,
        domainExperienceDiscount: domainExperienceDiscount,
        researchCost: researchCost,
        selectFocusedResearch: selectFocusedResearch,
        mergeConquestResearch: mergeConquestResearch,
        selectFuelCombination: selectFuelCombination,
        bresenhamLine: bresenhamLine,
        lineOfSightTransparency: lineOfSightTransparency,
        hasLineOfSight: hasLineOfSight,
        rangedHitProbability: rangedHitProbability,
        resolveAttackIntents: resolveAttackIntents
    });
}));
