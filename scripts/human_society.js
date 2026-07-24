(function (root) {
    "use strict";

    if (!root || !root.HumanSocietyCore || typeof elements === "undefined") {
        return;
    }

    const Core = root.HumanSocietyCore;
    const World = root.HumanSocietyWorld || {};
    const TechData = root.HumanSocietyTechData || {ERAS: [], TECHNOLOGIES: [], FUELS: {}, RECIPES: {}, RANGED_WEAPONS: {}, DEFAULT_VISION: []};
    const C = Object.assign({
        FACTION_JOIN_RADIUS: 24,
        CAMP_GROUP_RADIUS: 12,
        CAMP_STABLE_TICKS: 60,
        BUCKET_SIZE: 8,
        THINK_INTERVAL: 10,
        LOCOMOTION_INTERVAL_TICKS: 2,
        NAVIGATION_STALL_TICKS: 300,
        CIVILIZATION_INTERVAL: 30,
        FULL_REBUILD_INTERVAL: 300,
        MAX_RESOURCE_CHECKS: 256,
        RESOURCE_RADIUS: 12,
        EXTENDED_RESOURCE_RADIUS: 20,
        ADULT_HP: 100,
        CHILD_HP: 50,
        BIRTH_COOLDOWN: 0,
        GRANARY_BIRTH_COOLDOWN: 0,
        CHILD_GROW_TICKS: 0,
        BIRTH_FOOD_COST: 2,
        AUTONOMOUS_POPULATION_CAP: 120,
        ATTACK_BLOOD_CHANCE: 0.25,
        CONSTRUCTION_STEP_TICKS: 8,
        CONSTRUCTION_BLOCK_TIMEOUT: 180,
        BUILD_SEARCH_RADIUS: 24,
        BUILD_RETRY_TICKS: 180,
        MOVE_STUCK_LIMIT: 30,
        TERRITORY_BASE_RADIUS: 14,
        TERRITORY_MAX_RADIUS: 26,
        TERRITORY_HUT_BONUS: 2,
        TERRITORY_HALF_WIDTH: 11,
        BUILDING_SPRITE_GAP: 2,
        BASE_CARRY_CAPACITY: 4,
        ORGANIZED_CARRY_CAPACITY: 6,
        TUNNEL_UNLOCK_ERA: 1,
        RESOURCE_EXHAUSTION_TICKS: 180,
        WAR_MINIMUM_TICKS: 300,
        WAR_IMBALANCE_TICKS: 180,
        WAR_POWER_RATIO: 3,
        MAX_CHRONICLE_EVENTS: 2000,
        WARTIME_WARRIOR_RATIO: 0.4,
        TICKS_PER_YEAR: 240,
        ADULT_AGE_YEARS: 0,
        LIFESPAN_MIN_YEARS: 50,
        LIFESPAN_MAX_YEARS: 60,
        RESEARCH_ERA_UNLOCK_COUNT: 6,
        RESEARCH_DOMAIN_DISCOUNT_MAX: 0.25,
        RESEARCH_STEP_INTERVAL: 30,
        KNOWLEDGE_PER_ADULT_STEP: 0.65,
        TREE_PLANT_SPACING: 4,
        TREE_PLANT_SEARCH_RADIUS: 20,
        TREE_SEED_GUARANTEE: 5,
        TREE_SAPLING_CHANCE: 0.2,
        WOOD_FOOD_BONUS_CHANCE: 0.5,
        RANGED_PROJECTILE_STEP_TICKS: 2,
        PERSON_ACTIVITY_SCHEMA_VERSION: 1,
        MAX_PERSON_ACTIVITY: 500,
        MAX_DECEASED_PER_SETTLEMENT: 500,
        PEOPLE_UI_REFRESH_MS: 250,
        PEOPLE_HISTORY_PAGE_SIZE: 50
    }, Core.CONFIG || {});
    const FACTION_COLORS = [
        "#d95763", "#4f83d1", "#4da86b", "#d3a43d",
        "#8c63c7", "#d4743c", "#3da7aa", "#c6539b"
    ];
    const SKIN_COLORS = ["#f3e7db", "#f7ead0", "#eadaba", "#d7bd96", "#a07e56", "#825c43", "#604134", "#3a312a"];
    const ACTOR_ELEMENTS = new Set(["civ_body", "civ_child"]);
    const STRUCTURE_CORES = new Set([
        "civ_banner", "civ_hut_core", "civ_farm_marker", "civ_workshop_core", "civ_hearth_core",
        "civ_quarry_core", "civ_granary_core", "civ_kiln_core", "civ_foundry_core", "civ_forge_core",
        "civ_keep_core", "civ_siege_workshop_core", "civ_library_core", "civ_market_core", "civ_tower_core", "civ_lumberyard_core", "civ_gate"
    ]);
    const STRUCTURE_PARTS = new Set(["civ_structure_wood", "civ_structure_stone", "civ_palisade"]);
    const SOIL_ELEMENTS = new Set(["dirt", "mud", "clay_soil", "mulch", "grass"]);
    const DEFAULT_RESOURCES = {
        wood: new Set(["wood", "tree_branch", "evergreen", "bamboo", "bamboo_plant"]),
        stone: new Set(["rock", "gravel", "limestone", "basalt"])
    };
    const ERA_ORDER = (TechData.ERAS || []).map((era) => era.id);
    const ERA_INDEX = new Map(ERA_ORDER.map((id, index) => [id, index]));
    const DEFAULT_ERA_ID = ERA_ORDER[0] || "tribal";
    const TECH_BY_ID = new Map((TechData.TECHNOLOGIES || []).map((tech) => [tech.id, tech]));
    const TECHS_BY_ERA = new Map();
    (TechData.TECHNOLOGIES || []).forEach((tech) => {
        const eraId = tech.era || tech.eraId;
        if (!TECHS_BY_ERA.has(eraId)) TECHS_BY_ERA.set(eraId, []);
        TECHS_BY_ERA.get(eraId).push(tech);
    });
    const FUEL_VALUES = Object.assign({tree_branch: 2, bamboo: 3, wood: 4, charcoal: 10}, TechData.FUELS || {});
    const MATERIAL_KEYS = ["tree_branch", "bamboo", "wood", "stone", "charcoal", "copper", "tin", "bronze", "raw_iron", "iron", "steel"];
    const STOCK_KEYS = ["food", "wood", "stone", "charcoal", "copper", "tin", "bronze", "raw_iron", "iron", "steel"];
    const NONRENEWABLE_KINDS = new Set(["stone", "copper", "tin", "raw_iron"]);
    const TREE_SEEDS = {
        tree_branch: "sapling",
        wood: "sapling",
        evergreen: "pinecone",
        bamboo: "bamboo_plant"
    };
    const TREE_SAPLING_ELEMENTS = new Set(["sapling", "pinecone", "bamboo_plant"]);
    const WOOD_BEARING_TREE_ELEMENTS = new Set(["wood", "tree_branch", "evergreen", "bamboo"]);
    const PLANTED_TREE_SEEDS = new Set(["sapling", "pinecone", "bamboo_plant"]);
    const OBSCURING_ELEMENTS = new Set(["smoke", "steam", "fog", "cloud", "rain_cloud", "dust", "sandstorm", "ash", "acid_gas"]);

    const manager = {
        actors: new Set(),
        heads: new Set(),
        settlements: new Set(),
        children: new Set(),
        constructionSites: new Set(),
        structures: new Set(),
        structuresById: new Map(),
        actorById: new Map(),
        deceasedByHumanId: new Map(),
        factionById: new Map(),
        settlementById: new Map(),
        relationRecords: new Map(),
        foundingSince: new Map(),
        buckets: new Map(),
        resourceIndex: new Map(),
        resourceReservations: World.ResourceReservations ? new World.ResourceReservations() : null,
        territory: null,
        treeById: new Map(),
        archivedChronicles: [],
        pendingResourceDrops: [],
        overlaySettings: {territory: false, resources: true, resourceFilters: {food: true, tree: true, stone: true, metals: true, drops: true}},
        pendingAttacks: [],
        pendingStructureAttacks: [],
        pendingIncidents: [],
        pendingRangedImpacts: [],
        visualProjectiles: new Set(),
        resources: new Map(),
        weapons: new Map(),
        technologies: new Map(TECH_BY_ID),
        eras: new Map((TechData.ERAS || []).map((era) => [era.id, era])),
        nextHumanId: 1,
        nextFactionId: 1,
        nextSettlementId: 1,
        nextBuildingId: 1,
        nextTreeId: 1,
        nextTerritoryClaimOrder: 1,
        lastFullRebuild: -1,
        lastIndexTick: -1,
        lastDiplomacyTick: -1,
        perfTotal: 0,
        perfSamples: 0,
        perfMax: 0
    };

    function allTechnologies() {
        return Array.from(manager.technologies.values());
    }

    function hasTechnologyData() {
        return manager.technologies.size > 0;
    }

    function nowMs() {
        return root.performance && root.performance.now ? root.performance.now() : Date.now();
    }

    function safeNumber(value, fallback) {
        return Number.isFinite(value) ? value : fallback;
    }

    function ensureTerritoryIndex() {
        const worldWidth = typeof width === "number" && width >= 0 ? width + 1 : 1;
        if (!World.TerritoryIndex) return null;
        if (!manager.territory) manager.territory = new World.TerritoryIndex(worldWidth, C.TERRITORY_HALF_WIDTH);
        else if (manager.territory.width !== worldWidth) manager.territory.resize(worldWidth);
        return manager.territory;
    }

    function eventTimestamp() {
        if (World.realTimestamp) return World.realTimestamp();
        const d = new Date();
        const pad = (value) => String(value).padStart(2, "0");
        return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
    }

    function ensureChronicle(settlement) {
        if (!settlement) return [];
        if (!Array.isArray(settlement.chronicle)) settlement.chronicle = [];
        if (!settlement.firstNaturalResources || typeof settlement.firstNaturalResources !== "object") settlement.firstNaturalResources = {};
        return settlement.chronicle;
    }

    function logSettlementEvent(settlement, type, message, data) {
        if (!settlement) return null;
        const event = Object.assign({timestamp: eventTimestamp(), tick: pixelTicks, type: type, message: message || type}, data || {});
        const log = ensureChronicle(settlement);
        if (World.appendChronicle) World.appendChronicle(log, event, C.MAX_CHRONICLE_EVENTS);
        else {
            log.push(event);
            if (log.length > C.MAX_CHRONICLE_EVENTS) log.splice(0, log.length - C.MAX_CHRONICLE_EVENTS);
        }
        return event;
    }

    function logFactionEvent(factionId, type, message, data) {
        const faction = manager.factionById.get(Number(factionId));
        if (!faction || !faction.settlements.length) return null;
        return logSettlementEvent(faction.settlements[0], type, message, data);
    }

    function randomLifespanYears() {
        if (Core.randomLifespanYears) return Core.randomLifespanYears(Math.random);
        return C.LIFESPAN_MIN_YEARS + Math.floor(Math.random() * (C.LIFESPAN_MAX_YEARS - C.LIFESPAN_MIN_YEARS + 1));
    }

    function ensureLifeHistory(actor, isAdult) {
        if (!actor) return null;
        if (actor.lifeSchemaVersion !== 2 && Number.isFinite(actor.birthTick) && Number.isFinite(actor.naturalDeathTick) && Number.isFinite(actor.lifespanYears)) {
            const storedTicksPerYear = (actor.naturalDeathTick - actor.birthTick) / Math.max(1, actor.lifespanYears);
            if (storedTicksPerYear > 50 && storedTicksPerYear < C.TICKS_PER_YEAR * 0.75) {
                const age = Math.max(0, (pixelTicks - actor.birthTick) / storedTicksPerYear);
                const remaining = Math.max(0, (actor.naturalDeathTick - pixelTicks) / storedTicksPerYear);
                actor.birthTick = pixelTicks - age * C.TICKS_PER_YEAR;
                actor.naturalDeathTick = pixelTicks + remaining * C.TICKS_PER_YEAR;
            }
        }
        const history = Core.createLifeHistory ? Core.createLifeHistory({
            currentTick: pixelTicks,
            isAdult: !!isAdult,
            birthTick: actor.birthTick,
            lifespanYears: actor.lifespanYears,
            naturalDeathTick: actor.naturalDeathTick,
            ticksPerYear: C.TICKS_PER_YEAR,
            adultAgeYears: C.ADULT_AGE_YEARS,
            minimumYears: C.LIFESPAN_MIN_YEARS,
            maximumYears: C.LIFESPAN_MAX_YEARS
        }) : null;
        const adultOffset = C.ADULT_AGE_YEARS * C.TICKS_PER_YEAR;
        if (history) Object.assign(actor, history);
        if (!Number.isFinite(actor.birthTick)) actor.birthTick = isAdult ? pixelTicks - adultOffset : pixelTicks;
        if (!Number.isFinite(actor.lifespanYears)) actor.lifespanYears = randomLifespanYears();
        if (!Number.isFinite(actor.naturalDeathTick)) actor.naturalDeathTick = actor.birthTick + actor.lifespanYears * C.TICKS_PER_YEAR;
        actor.lifeSchemaVersion = 2;
        actor.ageTicks = Math.max(0, pixelTicks - actor.birthTick);
        return actor;
    }

    function ageYears(actor) {
        if (!actor || !Number.isFinite(actor.birthTick)) return 0;
        if (Core.ageInYears) return Core.ageInYears(actor, pixelTicks, C.TICKS_PER_YEAR);
        return Math.max(0, (pixelTicks - actor.birthTick) / C.TICKS_PER_YEAR);
    }

    function cloneActivityValue(value) {
        if (value === undefined) return undefined;
        try { return JSON.parse(JSON.stringify(value)); }
        catch (error) { return null; }
    }

    function normalizedActivityTask(task) {
        const value = String(task || "idle");
        return value === "wander" ? "idle" : value;
    }

    function activityTargetSnapshot(actor, target) {
        const key = taskTargetKey(target) || actor && actor.targetKey || null;
        const targetId = target && (target.humanId || target.buildingId || target.settlementId);
        const targetKind = target && (target.element || target.kind);
        return {
            g: key,
            i: Number.isFinite(targetId) ? targetId : (Number.isFinite(actor && actor.targetId) ? actor.targetId : null),
            e: targetKind || actor && actor.targetKind || null,
            x: Number.isFinite(target && target.x) ? target.x : (Number.isFinite(actor && actor.targetX) ? actor.targetX : null),
            y: Number.isFinite(target && target.y) ? target.y : (Number.isFinite(actor && actor.targetY) ? actor.targetY : null)
        };
    }

    function newPersonActivity() {
        return {v: C.PERSON_ACTIVITY_SCHEMA_VERSION, n: 1, c: null, h: []};
    }

    function activityRecordSequence(record) {
        return record && Number.isFinite(record.n) ? record.n : 0;
    }

    function trimPersonActivity(data) {
        if (!data || !Array.isArray(data.h)) return;
        if (data.h.length > C.MAX_PERSON_ACTIVITY) data.h.splice(0, data.h.length - C.MAX_PERSON_ACTIVITY);
    }

    function makeActivitySession(actor, task, target, kind) {
        const data = actor.personActivity;
        const targetData = activityTargetSnapshot(actor, target);
        const timestamp = eventTimestamp();
        const milliseconds = Date.now();
        return {
            n: data.n++,
            k: kind || "task",
            t: normalizedActivityTask(task),
            g: targetData.g,
            i: targetData.i,
            e: targetData.e,
            x: targetData.x,
            y: targetData.y,
            a: timestamp,
            am: milliseconds,
            at: pixelTicks,
            f: Number.isFinite(actor.factionId) ? actor.factionId : null,
            l: Number.isFinite(actor.settlementId) ? actor.settlementId : null,
            r: actor.role || (actor.element === "civ_child" ? "child" : "worker"),
            ph: actor.pathStage || "planning",
            d: {}
        };
    }

    function ensurePersonActivity(actor, openCurrent) {
        if (!actor) return null;
        let data = actor.personActivity;
        if (!data || typeof data !== "object" || Array.isArray(data)) data = newPersonActivity();
        data.v = C.PERSON_ACTIVITY_SCHEMA_VERSION;
        if (!Array.isArray(data.h)) data.h = [];
        data.h = data.h.filter((record) => record && typeof record === "object" && Number.isFinite(record.n));
        trimPersonActivity(data);
        const highestSequence = data.h.reduce((maximum, record) => Math.max(maximum, activityRecordSequence(record)), activityRecordSequence(data.c));
        data.n = Math.max(highestSequence + 1, Number.isFinite(data.n) ? data.n : 1);
        if (!data.c || typeof data.c !== "object" || !Number.isFinite(data.c.n)) data.c = null;
        actor.personActivity = data;
        if (openCurrent !== false && !actor.dead && !data.c) data.c = makeActivitySession(actor, actor.task || "idle", null, "task");
        return data;
    }

    function mergeActivityMetrics(target, patch) {
        if (!patch || typeof patch !== "object") return target;
        Object.keys(patch).forEach((key) => {
            const value = patch[key];
            if (Number.isFinite(value)) target[key] = safeNumber(target[key], 0) + value;
            else if (value && typeof value === "object" && !Array.isArray(value)) {
                if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key])) target[key] = {};
                Object.keys(value).forEach((nestedKey) => {
                    const nestedValue = value[nestedKey];
                    if (Number.isFinite(nestedValue)) target[key][nestedKey] = safeNumber(target[key][nestedKey], 0) + nestedValue;
                    else target[key][nestedKey] = cloneActivityValue(nestedValue);
                });
            }
            else target[key] = cloneActivityValue(value);
        });
        return target;
    }

    function addPersonActivityMetrics(actor, patch) {
        const data = ensurePersonActivity(actor, true);
        if (!data || !data.c) return false;
        mergeActivityMetrics(data.c.d, patch);
        return true;
    }

    function setPersonActivityPhase(actor, phase) {
        const data = ensurePersonActivity(actor, true);
        if (data && data.c) data.c.ph = phase || "planning";
    }

    function appendPersonActivity(actor, record) {
        const data = ensurePersonActivity(actor, false);
        if (!data || !record) return null;
        data.h.push(record);
        trimPersonActivity(data);
        return record;
    }

    function finishPersonActivity(actor, outcome, reason, resultPatch) {
        const data = ensurePersonActivity(actor, false);
        if (!data || !data.c) return null;
        const record = data.c;
        mergeActivityMetrics(record.d, resultPatch);
        record.b = eventTimestamp();
        record.bm = Date.now();
        record.bt = pixelTicks;
        record.o = outcome || "interrupted";
        record.z = reason || "replanned";
        record.d.durationTicks = Math.max(0, record.bt - safeNumber(record.at, record.bt));
        delete record.ph;
        data.c = null;
        return appendPersonActivity(actor, record);
    }

    function recordPersonLifeEvent(actor, event, details) {
        if (!actor || !event) return null;
        const data = ensurePersonActivity(actor, false);
        const record = makeActivitySession(actor, event, null, "life");
        record.b = record.a;
        record.bm = record.am;
        record.bt = record.at;
        record.o = "completed";
        record.z = event;
        record.d = cloneActivityValue(details) || {};
        return appendPersonActivity(actor, record);
    }

    function beginPersonActivity(actor, task, target) {
        if (!actor || actor.dead) return null;
        const data = ensurePersonActivity(actor, false);
        const nextTask = normalizedActivityTask(task);
        const nextTarget = activityTargetSnapshot(actor, target);
        if (data.c && data.c.t === nextTask && data.c.g === nextTarget.g) {
            data.c.i = nextTarget.i;
            data.c.e = nextTarget.e;
            data.c.x = nextTarget.x;
            data.c.y = nextTarget.y;
            return data.c;
        }
        if (data.c) finishPersonActivity(actor, "interrupted", "reassigned");
        data.c = makeActivitySession(actor, nextTask, target, "task");
        return data.c;
    }

    function ensureDeceasedArchive(banner) {
        if (!banner) return [];
        if (!Array.isArray(banner.deceasedPeople)) banner.deceasedPeople = [];
        const newestById = new Map();
        banner.deceasedPeople.forEach((entry) => {
            if (!entry || !Number.isFinite(entry.h)) return;
            const existing = newestById.get(entry.h);
            if (!existing || safeNumber(entry.dt, 0) >= safeNumber(existing.dt, 0)) newestById.set(entry.h, entry);
        });
        banner.deceasedPeople = Array.from(newestById.values()).sort((a, b) => safeNumber(a.dt, 0) - safeNumber(b.dt, 0) || a.h - b.h).slice(-C.MAX_DECEASED_PER_SETTLEMENT);
        return banner.deceasedPeople;
    }

    function indexDeceasedArchive(banner) {
        ensureDeceasedArchive(banner).forEach((entry) => manager.deceasedByHumanId.set(entry.h, {entry: entry, banner: banner}));
    }

    function archivePerson(actor, details) {
        if (!actor || !Number.isFinite(actor.humanId)) return null;
        const indexed = manager.deceasedByHumanId.get(actor.humanId);
        if (indexed) return indexed.entry;
        const banner = manager.settlementById.get(actor.settlementId) || settlementForActor(actor);
        if (!banner) return null;
        const activity = ensurePersonActivity(actor, false);
        const entry = {
            h: actor.humanId,
            f: Number.isFinite(actor.factionId) ? actor.factionId : null,
            l: Number.isFinite(actor.settlementId) ? actor.settlementId : banner.settlementId,
            c: actor.factionColor || factionColor(actor.factionId),
            e: actor.element,
            x: actor.x,
            y: actor.y,
            bt: actor.birthTick,
            ly: actor.lifespanYears,
            nt: actor.naturalDeathTick,
            dt: Number(actor.dead) || pixelTicks,
            da: eventTimestamp(),
            dm: Date.now(),
            dc: actor.deathCause || "injury",
            r: actor.role || (actor.element === "civ_child" ? "child" : "worker"),
            w: actor.weapon || "fists",
            wr: actor.warRole || null,
            hp: Math.max(0, safeNumber(actor.hp, 0)),
            mh: Math.max(1, safeNumber(actor.maxHp, actor.element === "civ_child" ? C.CHILD_HP : C.ADULT_HP)),
            pa: cloneActivityValue(activity),
            d: cloneActivityValue(details) || {}
        };
        const archive = ensureDeceasedArchive(banner);
        archive.push(entry);
        ensureDeceasedArchive(banner);
        manager.deceasedByHumanId.clear();
        manager.settlements.forEach(indexDeceasedArchive);
        actor.personArchived = true;
        actor.personArchiveSettlementId = banner.settlementId;
        delete actor.personActivity;
        return entry;
    }

    function transferDeceasedArchive(source) {
        if (!source || !Array.isArray(source.deceasedPeople) || !source.deceasedPeople.length) return false;
        const target = Array.from(manager.settlements).filter((banner) => banner && banner !== source && !banner.del && banner.factionId === source.factionId)
            .sort((a, b) => safeNumber(a.foundedTick, a.start || 0) - safeNumber(b.foundedTick, b.start || 0) || a.settlementId - b.settlementId)[0];
        if (!target) return false;
        target.deceasedPeople = ensureDeceasedArchive(target).concat(source.deceasedPeople);
        ensureDeceasedArchive(target);
        source.deceasedPeople = [];
        return true;
    }

    function ensureStock(banner) {
        if (!banner) return null;
        if (!banner.stock || typeof banner.stock !== "object") banner.stock = {};
        const stock = banner.stock;
        stock.food = Math.max(0, safeNumber(stock.food, 0));
        stock.wood = Math.max(0, safeNumber(stock.wood, 0));
        stock.stone = Math.max(0, safeNumber(stock.stone, 0));
        if (!stock.materials || typeof stock.materials !== "object") stock.materials = {};
        if (!stock.seeds || typeof stock.seeds !== "object") stock.seeds = {};
        if (!stock.treeSaplings || typeof stock.treeSaplings !== "object") stock.treeSaplings = {};
        TREE_SAPLING_ELEMENTS.forEach((seed) => {
            const legacy = Math.max(0, safeNumber(stock.seeds[seed], 0));
            stock.treeSaplings[seed] = Math.max(0, safeNumber(stock.treeSaplings[seed], 0)) + legacy;
            if (legacy) delete stock.seeds[seed];
        });
        MATERIAL_KEYS.forEach((key) => { stock.materials[key] = Math.max(0, safeNumber(stock.materials[key], 0)); });
        // Old saves and tests use flat wood/stone fields. Keep them authoritative
        // until material detail is actually present, then maintain both views.
        const detailedWood = stock.materials.tree_branch + stock.materials.bamboo + stock.materials.wood;
        if (detailedWood > stock.wood) stock.wood = detailedWood;
        if (stock.materials.stone > stock.stone) stock.stone = stock.materials.stone;
        ["charcoal", "copper", "tin", "bronze", "raw_iron", "iron", "steel"].forEach((key) => {
            stock[key] = Math.max(0, safeNumber(stock[key], stock.materials[key]));
            if (stock.materials[key] < stock[key]) stock.materials[key] = stock[key];
        });
        return stock;
    }

    function materialAmount(stock, key) {
        if (!stock) return 0;
        if (key === "food") return Math.max(0, safeNumber(stock.food, 0));
        if (key === "wood") return Math.max(0, safeNumber(stock.wood, 0));
        if (key === "stone") return Math.max(0, safeNumber(stock.stone, 0));
        return Math.max(0, safeNumber(stock[key], stock.materials && stock.materials[key] || 0));
    }

    function addMaterial(stock, key, amount, sourceElement) {
        if (!stock || !amount) return;
        amount = Math.max(0, Number(amount) || 0);
        if (!stock.materials) stock.materials = {};
        if (key === "food") {
            stock.food = safeNumber(stock.food, 0) + amount;
        }
        else if (key === "wood") {
            const detailKey = sourceElement === "tree_branch" || sourceElement === "bamboo" ? sourceElement : "wood";
            stock.materials[detailKey] = safeNumber(stock.materials[detailKey], 0) + amount;
            stock.wood = safeNumber(stock.wood, 0) + amount;
        }
        else if (key === "stone") {
            stock.materials.stone = safeNumber(stock.materials.stone, 0) + amount;
            stock.stone = safeNumber(stock.stone, 0) + amount;
        }
        else {
            stock.materials[key] = safeNumber(stock.materials[key], 0) + amount;
            stock[key] = safeNumber(stock[key], 0) + amount;
        }
    }

    function spendMaterial(stock, key, amount) {
        amount = Math.max(0, Number(amount) || 0);
        if (!stock || materialAmount(stock, key) < amount) return false;
        if (key === "food") {
            stock.food -= amount;
        }
        else if (key === "wood") {
            stock.wood -= amount;
            let remaining = amount;
            ["tree_branch", "bamboo", "wood"].forEach((detailKey) => {
                if (!remaining || !stock.materials) return;
                const used = Math.min(remaining, safeNumber(stock.materials[detailKey], 0));
                stock.materials[detailKey] -= used;
                remaining -= used;
            });
        }
        else if (key === "stone") {
            stock.stone -= amount;
            if (stock.materials) stock.materials.stone = Math.max(0, safeNumber(stock.materials.stone, 0) - amount);
        }
        else {
            stock[key] = Math.max(0, safeNumber(stock[key], 0) - amount);
            if (stock.materials) stock.materials[key] = Math.max(0, safeNumber(stock.materials[key], 0) - amount);
        }
        return true;
    }

    function ensureResearchState(banner) {
        if (!banner) return null;
        if (!banner.eraId || !ERA_INDEX.has(banner.eraId)) banner.eraId = DEFAULT_ERA_ID;
        if (!banner.research || typeof banner.research !== "object") banner.research = {};
        const research = banner.research;
        research.schemaVersion = 2;
        research.knowledge = Math.max(0, safeNumber(research.knowledge, 0));
        if (!research.domainExperience || typeof research.domainExperience !== "object") research.domainExperience = {};
        ["production", "construction", "society", "military"].forEach((domain) => {
            research.domainExperience[domain] = Math.max(0, safeNumber(research.domainExperience[domain], 0));
        });
        if (!research.unlocked || typeof research.unlocked !== "object") research.unlocked = {};
        if (!research.progress || typeof research.progress !== "object") research.progress = {};
        if (!research.discoveries || typeof research.discoveries !== "object") research.discoveries = {};
        if (!research.milestones || typeof research.milestones !== "object") research.milestones = {};
        if (!Array.isArray(research.priorityQueue)) research.priorityQueue = research.focusTechId ? [research.focusTechId] : [];
        research.priorityQueue = research.priorityQueue.filter((techId, index, array) => manager.technologies.has(techId) && array.indexOf(techId) === index && !research.unlocked[techId]);
        if (!research.forcedUnlocked || typeof research.forcedUnlocked !== "object") research.forcedUnlocked = {};
        if (!Number.isFinite(research.lastStepTick)) research.lastStepTick = pixelTicks;
        return research;
    }

    function hasTech(factionOrBanner, techId) {
        const banner = factionOrBanner && factionOrBanner.element === "civ_banner" ? factionOrBanner : factionOrBanner && factionOrBanner.settlements && factionOrBanner.settlements[0];
        return !!(banner && banner.research && banner.research.unlocked && banner.research.unlocked[techId]);
    }

    function eraIndexFor(factionOrBanner) {
        const banner = factionOrBanner && factionOrBanner.element === "civ_banner" ? factionOrBanner : factionOrBanner && factionOrBanner.settlements && factionOrBanner.settlements[0];
        return ERA_INDEX.has(banner && banner.eraId) ? ERA_INDEX.get(banner.eraId) : 0;
    }

    function computeTechModifiers(faction) {
        const mods = {
            carryCapacity: C.BASE_CARRY_CAPACITY,
            harvestSpeed: 1,
            woodHarvestSpeed: 1,
            stoneHarvestSpeed: 1,
            buildSpeed: 1,
            woodStructureHp: 1,
            knowledgeRate: 1,
            milestoneKnowledge: 1,
            roleWorkSpeed: 1,
            farmYield: 1,
            farmPlots: 0,
            seedDropBonus: 0,
            birthFoodCost: C.BIRTH_FOOD_COST,
            constructionSlots: 1,
            wartimeWarriorRatio: C.WARTIME_WARRIOR_RATIO,
            peacetimeWarriors: 0,
            damageReduction: 0,
            hostilityDecayMultiplier: 1,
            structureDamageMultiplier: 1,
            oldTechDiscount: 0
        };
        if (!faction) return mods;
        if (hasTech(faction, "organized_gathering")) { mods.carryCapacity = C.ORGANIZED_CARRY_CAPACITY; mods.harvestSpeed *= 0.9; }
        if (hasTech(faction, "woodworking")) { mods.buildSpeed *= 0.8; mods.woodStructureHp *= 1.2; }
        if (hasTech(faction, "clan_council")) mods.knowledgeRate *= 1.1;
        if (hasTech(faction, "oral_tradition")) mods.milestoneKnowledge *= 1.25;
        if (hasTech(faction, "polished_axes")) mods.woodHarvestSpeed *= 0.8;
        if (hasTech(faction, "quarrying")) mods.stoneHarvestSpeed *= 0.75;
        if (hasTech(faction, "craft_specialization")) mods.roleWorkSpeed *= 1.15;
        if (hasTech(faction, "managed_forestry")) mods.seedDropBonus += 0.25;
        if (hasTech(faction, "granary")) mods.birthFoodCost = C.BIRTH_FOOD_COST;
        if (hasTech(faction, "irrigation")) { mods.farmYield *= 1.25; mods.farmPlots += 2; }
        if (hasTech(faction, "militia")) { mods.peacetimeWarriors = 1; mods.wartimeWarriorRatio = 0.5; }
        if (hasTech(faction, "writing")) mods.knowledgeRate *= 1.2;
        if (hasTech(faction, "administration")) mods.constructionSlots = 2;
        if (hasTech(faction, "shield_formation")) mods.damageReduction = Math.max(mods.damageReduction, 0.15);
        if (hasTech(faction, "iron_smelting")) { mods.harvestSpeed *= 0.8; mods.buildSpeed *= 0.8; }
        if (hasTech(faction, "codified_law")) mods.hostilityDecayMultiplier *= 1.5;
        if (hasTech(faction, "iron_armor")) mods.damageReduction = Math.max(mods.damageReduction, 0.25);
        if (hasTech(faction, "crop_rotation")) { mods.farmYield *= 1.4; mods.farmPlots += 2; }
        if (hasTech(faction, "library")) { mods.knowledgeRate *= 1.4; mods.oldTechDiscount = 0.2; }
        if (hasTech(faction, "siege_engineering")) mods.structureDamageMultiplier = 2;
        return mods;
    }

    function unlockedBuilding(faction, type) {
        if (type === "lumberyard") return true;
        if (type === "hut") return hasTech(faction, "simple_shelters") || !hasTechnologyData();
        if (type === "hearth") return hasTech(faction, "controlled_fire");
        if (type === "workshop") return hasTech(faction, "artisan_shed") || !hasTechnologyData();
        if (type === "quarry") return hasTech(faction, "quarrying");
        if (type === "farm") return hasTech(faction, "seed_selection") || !hasTechnologyData();
        if (type === "granary") return hasTech(faction, "granary");
        if (type === "kiln") return hasTech(faction, "charcoal_kiln");
        if (type === "foundry") return hasTech(faction, "bronze_foundry");
        if (type === "forge") return hasTech(faction, "forge");
        if (type === "palisade") return hasTech(faction, "palisade_defense");
        if (type === "watchtower") return hasTech(faction, "stone_fortifications");
        if (type === "keep") return hasTech(faction, "castle_building");
        if (type === "siege_workshop") return hasTech(faction, "siege_workshop");
        if (type === "library") return hasTech(faction, "library");
        if (type === "market") return hasTech(faction, "guild_market") || hasTech(faction, "barter");
        return true;
    }

    function eraDefinition(eraId) {
        return manager.eras.get(eraId) || (TechData.ERAS || []).find((era) => era.id === eraId) || null;
    }

    function techEraId(tech) {
        return tech && (tech.era || tech.eraId) || DEFAULT_ERA_ID;
    }

    function availableFuelStock(stock) {
        ensureStock({stock: stock});
        const available = {};
        let detailedWood = 0;
        ["tree_branch", "bamboo", "wood"].forEach((fuel) => {
            available[fuel] = Math.max(0, Math.floor(safeNumber(stock.materials && stock.materials[fuel], 0)));
            detailedWood += available[fuel];
        });
        if (safeNumber(stock.wood, 0) > detailedWood) available.wood += Math.floor(stock.wood - detailedWood);
        available.charcoal = Math.max(0, Math.floor(materialAmount(stock, "charcoal")));
        return available;
    }

    function availableHeat(stock) {
        const available = availableFuelStock(stock);
        return Object.keys(FUEL_VALUES).reduce((total, fuel) => total + safeNumber(available[fuel], 0) * safeNumber(FUEL_VALUES[fuel], 0), 0);
    }

    function techConditionMet(tech, faction, banner, condition) {
        if (!condition) return true;
        const research = ensureResearchState(banner);
        if (condition.type === "population") return faction.population >= safeNumber(condition.minimum, 0);
        if (condition.type === "resource_stock") return faction.settlements.reduce((total, settlement) => total + materialAmount(ensureStock(settlement), condition.resource), 0) >= safeNumber(condition.minimum, 0);
        if (condition.type === "resource_encountered") return safeNumber(research.discoveries[condition.resource], 0) >= safeNumber(condition.minimum, 0);
        if (condition.type === "heat_available") return faction.settlements.reduce((total, settlement) => total + availableHeat(ensureStock(settlement)), 0) >= safeNumber(condition.minimum, 0);
        if (condition.type === "milestone") return safeNumber(research.milestones[condition.id], 0) >= safeNumber(condition.minimum, 0);
        return true;
    }

    function techConditionCurrent(faction, banner, condition) {
        const research = ensureResearchState(banner);
        if (!condition) return 0;
        if (condition.type === "population") return faction.population;
        if (condition.type === "resource_stock") return faction.settlements.reduce((total, settlement) => total + materialAmount(ensureStock(settlement), condition.resource), 0);
        if (condition.type === "resource_encountered") return safeNumber(research.discoveries[condition.resource], 0);
        if (condition.type === "heat_available") return faction.settlements.reduce((total, settlement) => total + availableHeat(ensureStock(settlement)), 0);
        if (condition.type === "milestone") return safeNumber(research.milestones[condition.id], 0);
        return 0;
    }

    function techAvailability(tech, faction, banner) {
        if (!tech || !faction || !banner) return {available: false, prerequisitesMet: false, conditionsMet: false};
        const research = ensureResearchState(banner);
        const prerequisitesMet = (tech.prerequisites || []).every((techId) => !!research.unlocked[techId]);
        const eraAvailable = safeNumber(tech.eraIndex, ERA_INDEX.get(techEraId(tech)) || 0) <= eraIndexFor(banner);
        const conditionStates = (tech.conditions || []).map((condition) => ({
            condition: condition,
            met: techConditionMet(tech, faction, banner, condition),
            current: techConditionCurrent(faction, banner, condition),
            required: safeNumber(condition.minimum, 0)
        }));
        const conditionsMet = conditionStates.every((state) => state.met);
        return {
            available: eraAvailable && prerequisitesMet && conditionsMet && !research.unlocked[tech.id],
            eraAvailable: eraAvailable,
            prerequisitesMet: prerequisitesMet,
            conditionsMet: conditionsMet,
            conditionStates: conditionStates
        };
    }

    function effectiveResearchCost(tech, faction, banner) {
        if (!tech) return 0;
        const research = ensureResearchState(banner);
        let baseCost = Math.max(1, safeNumber(tech.cost, 1));
        if (safeNumber(tech.eraIndex, 0) < eraIndexFor(banner)) {
            baseCost *= 1 - safeNumber(faction.techModifiers && faction.techModifiers.oldTechDiscount, 0);
        }
        const experience = safeNumber(research.domainExperience[tech.domain], 0);
        return Core.researchCost ? Core.researchCost(baseCost, experience) : Math.ceil(baseCost * (1 - Math.min(C.RESEARCH_DOMAIN_DISCOUNT_MAX, experience / 100)));
    }

    function recordDiscovery(banner, resource, amount) {
        if (!banner || !resource) return;
        const research = ensureResearchState(banner);
        research.discoveries[resource] = Math.max(0, safeNumber(research.discoveries[resource], 0) + Math.max(0, safeNumber(amount, 1)));
    }

    function recordFirstHarvest(banner, resource, amount) {
        if (!banner || !resource || !(amount > 0)) return;
        ensureChronicle(banner);
        if (banner.firstNaturalResources[resource]) return;
        banner.firstNaturalResources[resource] = true;
        logSettlementEvent(banner, "first_resource", "首次采集资源：" + resource, {resource: resource, amount: amount});
    }

    function scanFactionDiscoveries(faction) {
        const banner = faction && faction.settlements[0];
        if (!banner) return;
        const research = ensureResearchState(banner);
        // Resource locations are globally known. Discovery conditions therefore
        // use the same full-map index as gathering instead of a local banner
        // scan, which would otherwise deadlock remote ore technologies.
        let seedLocations = 0;
        let treeSeedLocations = 0;
        manager.resourceIndex.forEach((nodes, kind) => {
            if (!nodes || !nodes.length) return;
            research.discoveries[kind] = Math.max(1, safeNumber(research.discoveries[kind], 0));
            seedLocations += nodes.filter((node) => node.descriptor && (node.descriptor.seed || node.descriptor.seedOnly)).length;
            treeSeedLocations += nodes.filter((node) => node.descriptor && node.descriptor.treeSeed).length;
        });
        if (seedLocations) research.discoveries.seed = Math.max(seedLocations, safeNumber(research.discoveries.seed, 0));
        if (treeSeedLocations) research.discoveries.tree_seed = Math.max(treeSeedLocations, safeNumber(research.discoveries.tree_seed, 0));
        for (let i = 0; i < currentPixels.length; i++) {
            const pixel = currentPixels[i];
            if (pixel && !pixel.del && (pixel.element === "water" || pixel.element === "salt_water" || pixel.element === "dirty_water")) {
                research.discoveries.water = Math.max(1, safeNumber(research.discoveries.water, 0));
                break;
            }
        }
    }

    function addDomainExperience(banner, domain, amount) {
        if (!banner || !domain) return;
        const research = ensureResearchState(banner);
        research.domainExperience[domain] = Math.min(100, safeNumber(research.domainExperience[domain], 0) + Math.max(0, safeNumber(amount, 0)));
    }

    function researchCandidates(faction, banner) {
        const research = ensureResearchState(banner);
        return allTechnologies().filter((tech) => !research.unlocked[tech.id] && techAvailability(tech, faction, banner).available).map((tech) => ({
            id: tech.id,
            domain: tech.domain,
            baseCost: effectiveResearchCost(tech, faction, banner),
            priority: (safeNumber(tech.eraIndex, 0) === eraIndexFor(banner) ? 20 : 0) + (tech.peaceful ? 2 : 0),
            available: true,
            tech: tech
        }));
    }

    function selectResearch(faction, banner) {
        const research = ensureResearchState(banner);
        const candidates = researchCandidates(faction, banner);
        if (!candidates.length) return null;
        for (let i = 0; i < research.priorityQueue.length; i++) {
            const queued = candidates.find((candidate) => candidate.id === research.priorityQueue[i]);
            if (queued) return queued.tech;
        }
        if (Core.selectFocusedResearch) {
            const selected = Core.selectFocusedResearch(candidates, {
                researchedTechs: research.unlocked,
                domainExperience: {},
                focusTechId: research.focusTechId,
                focusDomain: research.focusDomain
            });
            return selected && (selected.tech || TECH_BY_ID.get(selected.id));
        }
        candidates.sort((a, b) => b.priority - a.priority || a.baseCost - b.baseCost);
        const exact = candidates.find((candidate) => candidate.id === research.focusTechId);
        const domain = candidates.find((candidate) => candidate.domain === research.focusDomain);
        return (exact || domain || candidates[0]).tech;
    }

    function unlockTechnology(faction, banner, tech) {
        const research = ensureResearchState(banner);
        if (!tech || research.unlocked[tech.id]) return false;
        research.unlocked[tech.id] = true;
        research.progress[tech.id] = effectiveResearchCost(tech, faction, banner);
        research.lastUnlockedTechId = tech.id;
        research.lastUnlockedTick = pixelTicks;
        research.milestones.technologies = safeNumber(research.milestones.technologies, 0) + 1;
        addDomainExperience(banner, tech.domain, 2);
        if (research.focusTechId === tech.id) delete research.focusTechId;
        research.priorityQueue = research.priorityQueue.filter((techId) => techId !== tech.id);
        faction.techModifiers = computeTechModifiers(faction);
        faction.settlements.forEach((settlement) => {
            settlement.research = research;
            settlement.eraId = banner.eraId;
        });
        logSettlementEvent(banner, "technology", "科技完成：" + (tech.name || tech.id), {technologyId: tech.id, forced: !!research.forcedUnlocked[tech.id]});
        return true;
    }

    function maybeAdvanceEra(faction, banner) {
        const currentIndex = eraIndexFor(banner);
        if (currentIndex >= ERA_ORDER.length - 1) return false;
        const era = eraDefinition(banner.eraId);
        const eraTechIds = era && era.techIds || (TECHS_BY_ERA.get(banner.eraId) || []).map((tech) => tech.id);
        const progress = Core.eraResearchProgress ? Core.eraResearchProgress(banner.research.unlocked, eraTechIds, C.RESEARCH_ERA_UNLOCK_COUNT) : {
            completed: eraTechIds.filter((techId) => banner.research.unlocked[techId]).length,
            canAdvance: eraTechIds.filter((techId) => banner.research.unlocked[techId]).length >= C.RESEARCH_ERA_UNLOCK_COUNT
        };
        banner.research.eraCompleted = progress.completed;
        if (!progress.canAdvance) return false;
        banner.eraId = ERA_ORDER[currentIndex + 1];
        banner.research.eraEnteredTick = pixelTicks;
        banner.research.lastEraAdvanceTick = pixelTicks;
        banner.research.milestones.eras = safeNumber(banner.research.milestones.eras, 0) + 1;
        faction.eraId = banner.eraId;
        faction.settlements.forEach((settlement) => { settlement.eraId = banner.eraId; settlement.research = banner.research; });
        logSettlementEvent(banner, "era", "进入时代：" + (eraDefinition(banner.eraId) && eraDefinition(banner.eraId).name || banner.eraId), {eraId: banner.eraId});
        return true;
    }

    function stepFactionResearch(faction) {
        const banner = faction && (faction.settlements.find((settlement) => settlement.townCenterActive !== false) || faction.settlements[0]);
        if (!banner || !hasTechnologyData()) return;
        ensureStock(banner);
        const research = ensureResearchState(banner);
        scanFactionDiscoveries(faction);
        const scholars = faction.adults.filter((actor) => actor.role === "scholar" && faction.libraries.some((library) => Core.distance(actor.x, actor.y, library.x, library.y) <= 2.5)).length;
        const merchants = faction.adults.filter((actor) => (actor.role === "merchant" || actor.role === "artisan_trade") && faction.markets.some((market) => Core.distance(actor.x, actor.y, market.x, market.y) <= 2.5)).length;
        const baseGain = 0.4 + faction.adultPopulation * C.KNOWLEDGE_PER_ADULT_STEP + scholars * 0.65 + merchants * 0.25;
        const peaceBonus = factionIsAtWar(faction.id) ? 0.85 : 1;
        research.knowledge += baseGain * safeNumber(faction.techModifiers && faction.techModifiers.knowledgeRate, 1) * peaceBonus;
        const tech = selectResearch(faction, banner);
        if (tech) {
            const cost = effectiveResearchCost(tech, faction, banner);
            const current = Math.min(cost, safeNumber(research.progress[tech.id], 0));
            const invested = Math.min(research.knowledge, Math.max(0, cost - current));
            research.progress[tech.id] = current + invested;
            research.knowledge -= invested;
            research.activeTechId = tech.id;
            if (research.progress[tech.id] >= cost) unlockTechnology(faction, banner, tech);
        }
        else delete research.activeTechId;
        maybeAdvanceEra(faction, banner);
        research.lastStepTick = pixelTicks;
    }

    function chooseColor(factionId) {
        const base = FACTION_COLORS[(Math.max(1, factionId) - 1) % FACTION_COLORS.length];
        return base;
    }

    function factionColor(factionId) {
        const faction = manager.factionById.get(factionId);
        return faction && faction.color ? faction.color : chooseColor(factionId);
    }

    function setPixelColor(pixel, color) {
        if (!pixel || !color) return;
        pixel.color = pixelColorPick(pixel, color);
    }

    function deleteExactPixel(pixel) {
        if (!pixel || pixel.del) return;
        if (typeof deletePixelObject === "function") deletePixelObject(pixel, true);
        else deletePixel(pixel.x, pixel.y);
    }

    function pixelsAt(x, y) {
        if (typeof getPixelsAt === "function") return getPixelsAt(x, y);
        const pixel = getPixel(x, y);
        return pixel ? [pixel] : [];
    }

    function pixelByElementAt(x, y, element) {
        if (typeof getPixelByElement === "function") return getPixelByElement(x, y, element);
        return pixelsAt(x, y).find((pixel) => pixel.element === element) || null;
    }

    function isBuildingCorePixel(pixel) {
        return !!(pixel && !pixel.del && (pixel.element === "civ_banner" || pixel.element === "civ_construction" || STRUCTURE_CORES.has(pixel.element)));
    }

    function getBuildingCoreAt(x, y) {
        return pixelsAt(x, y).find(isBuildingCorePixel) || null;
    }

    function getBuildingById(buildingId) {
        return manager.structuresById.get(Number(buildingId)) || null;
    }

    function buildingVisualAt(x, y) {
        let found = null;
        const inspect = (pixel) => {
            if (!isBuildingCorePixel(pixel) || pixel.buildingState === "destroyed") return;
            const rect = World.buildingSpriteRect ? World.buildingSpriteRect(pixel.x, pixel.y) : {left: pixel.x - 1, right: pixel.x + 1, top: pixel.y - 2, bottom: pixel.y};
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) found = pixel;
        };
        manager.settlements.forEach(inspect);
        manager.constructionSites.forEach(inspect);
        manager.structures.forEach(inspect);
        return found;
    }

    function ensureBuildingMetadata(pixel, type) {
        if (!pixel) return pixel;
        if (!Number.isFinite(pixel.buildingId)) pixel.buildingId = manager.nextBuildingId++;
        manager.nextBuildingId = Math.max(manager.nextBuildingId, pixel.buildingId + 1);
        pixel.buildingType = type || pixel.buildingType || (pixel.element === "civ_banner" ? "town_center" : pixel.element.replace(/^civ_|_core$/g, ""));
        if (!pixel.buildingState) pixel.buildingState = pixel.element === "civ_construction" ? "construction" : "complete";
        pixel.isBuildingCore = true;
        pixel.alwaysOverlay = true;
        pixel.nonBlocking = true;
        pixel.eraseProtected = true;
        if (!pixel.territoryClaimId) pixel.territoryClaimId = "building:" + pixel.buildingId;
        if (!Number.isFinite(pixel.territoryClaimTick)) pixel.territoryClaimTick = Number.isFinite(pixel.start) ? pixel.start : pixelTicks;
        if (!Number.isFinite(pixel.territoryClaimOrder)) pixel.territoryClaimOrder = manager.nextTerritoryClaimOrder++;
        manager.nextTerritoryClaimOrder = Math.max(manager.nextTerritoryClaimOrder, pixel.territoryClaimOrder + 1);
        manager.structuresById.set(pixel.buildingId, pixel);
        return pixel;
    }

    function rebuildTerritoryIndex() {
        const territory = ensureTerritoryIndex();
        if (!territory) return;
        const buildings = [];
        manager.settlements.forEach((pixel) => { if (isBuildingCorePixel(pixel) && pixel.buildingState !== "destroyed" && pixel.townCenterActive !== false) buildings.push(pixel); });
        manager.constructionSites.forEach((pixel) => { if (isBuildingCorePixel(pixel)) buildings.push(pixel); });
        manager.structures.forEach((pixel) => { if (isBuildingCorePixel(pixel)) buildings.push(pixel); });
        const unique = Array.from(new Set(buildings)).filter((pixel) => Number.isFinite(pixel.factionId));
        unique.forEach((pixel) => ensureBuildingMetadata(pixel));
        territory.rebuild(unique.map((pixel) => ({
            claimId: pixel.territoryClaimId,
            buildingId: pixel.buildingId,
            factionId: pixel.factionId,
            settlementId: pixel.settlementId,
            anchorX: pixel.x,
            claimTick: pixel.territoryClaimTick,
            claimOrder: pixel.territoryClaimOrder
        })));
        unique.forEach((pixel) => {
            const claim = territory.claims.get(pixel.territoryClaimId);
            if (claim) { pixel.claimMinX = claim.minX; pixel.claimMaxX = claim.maxX; }
        });
    }

    function reserveBuildingTerritory(pixel) {
        const territory = ensureTerritoryIndex();
        if (!territory || !pixel) return null;
        ensureBuildingMetadata(pixel);
        const claim = territory.reserve({claimId: pixel.territoryClaimId, buildingId: pixel.buildingId, factionId: pixel.factionId, settlementId: pixel.settlementId, anchorX: pixel.x, claimTick: pixel.territoryClaimTick, claimOrder: pixel.territoryClaimOrder});
        pixel.claimMinX = claim.minX;
        pixel.claimMaxX = claim.maxX;
        return claim;
    }

    function releaseBuildingClaim(pixel) {
        if (pixel && pixel.territoryClaimId && manager.territory) manager.territory.release(pixel.territoryClaimId);
    }

    function bucketKey(x, y) {
        return Math.floor(x / C.BUCKET_SIZE) + "," + Math.floor(y / C.BUCKET_SIZE);
    }

    function getBodyHead(body) {
        if (!body || body.del) return null;
        const above = pixelByElementAt(body.x, body.y - 1, "civ_head");
        if (above && above.element === "civ_head" && above.humanId === body.humanId) return above;
        if (body._r !== undefined) {
            const relation = getRelation(body._r);
            if (relation && relation.p) {
                for (let i = 0; i < relation.p.length; i++) {
                    const part = relation.p[i];
                    if (!part.del && part.element === "civ_head" && part.humanId === body.humanId) return part;
                }
            }
        }
        return null;
    }

    function getHeadBody(head) {
        if (!head || head.del) return null;
        const below = pixelByElementAt(head.x, head.y + 1, "civ_body");
        if (below && below.element === "civ_body" && below.humanId === head.humanId) return below;
        if (head._r !== undefined) {
            const relation = getRelation(head._r);
            if (relation && relation.p) {
                for (let i = 0; i < relation.p.length; i++) {
                    const part = relation.p[i];
                    if (!part.del && part.element === "civ_body" && part.humanId === head.humanId) return part;
                }
            }
        }
        return null;
    }

    function getActorFromPixel(pixel) {
        if (!pixel || pixel.del) return null;
        if (pixel.element === "civ_body" || pixel.element === "civ_child") return pixel;
        if (pixel.element === "civ_head") return getHeadBody(pixel);
        return null;
    }

    function registerPixel(pixel) {
        if (!pixel || pixel.del) return;
        if (pixel.element === "civ_body") manager.actors.add(pixel);
        else if (pixel.element === "civ_head") manager.heads.add(pixel);
        else if (pixel.element === "civ_child") {
            manager.actors.add(pixel);
            manager.children.add(pixel);
        }
        else if (pixel.element === "civ_banner") manager.settlements.add(pixel);
        else if (pixel.element === "civ_construction") manager.constructionSites.add(pixel);
        else if (STRUCTURE_CORES.has(pixel.element) || STRUCTURE_PARTS.has(pixel.element)) manager.structures.add(pixel);
        if ((pixel.element === "civ_banner" || pixel.element === "civ_construction" || STRUCTURE_CORES.has(pixel.element)) && Number.isFinite(pixel.buildingId)) {
            manager.structuresById.set(pixel.buildingId, pixel);
        }
    }

    function unregisterPixel(pixel) {
        manager.actors.delete(pixel);
        manager.heads.delete(pixel);
        manager.children.delete(pixel);
        manager.settlements.delete(pixel);
        manager.constructionSites.delete(pixel);
        manager.structures.delete(pixel);
        if (pixel && Number.isFinite(pixel.buildingId) && manager.structuresById.get(pixel.buildingId) === pixel) manager.structuresById.delete(pixel.buildingId);
        if (pixel && pixel.humanId !== undefined && manager.actorById.get(pixel.humanId) === pixel) {
            manager.actorById.delete(pixel.humanId);
        }
    }

    function cleanupCivilizedFields(pixel) {
        if (!pixel) return;
        const fields = [
            "humanId", "factionId", "settlementId", "role", "task", "targetX", "targetY", "targetId", "targetKey",
            "targetKind", "hp", "maxHp", "hunger", "weapon", "carryKind", "carryElement", "carryAmount",
            "attackReadyTick", "lastThinkTick", "lastPlanTick", "lastHungerTick", "lastDamageTick", "resourceScanPhase", "harvestProgress", "stuckCount", "noProgressCount", "bestTaskDistance", "progressTargetX", "progressTargetY", "lastX", "lastY", "underAttackUntil",
            "birthTick", "ageTicks", "lifespanYears", "naturalDeathTick", "deathCause", "factionColor", "buildingId", "structureHp", "structureMaxHp", "harvestX", "harvestY", "blockedResourceKey", "blockedResourceUntil",
            "stock", "diplomacy", "housing", "birthReadyTick", "lastBirthTick", "lastHostileTick",
            "lastWarTick", "territoryRadius", "stage", "eraId", "research", "cultureMemory", "blueprintType", "originX", "originY", "nextPart",
            "blockedTicks", "lastBuildTick", "lastProcessTick", "costs", "placedParts", "completed", "plots", "lastCraftTick", "carrySeed", "buildRetry", "orphanedSince", "dead", "panic", "dir", "treeHarvestCounter", "ammo", "rangedTargetTick"
            , "carry", "carryCapacity", "territoryClaimId", "territoryClaimTick", "territoryClaimOrder", "claimMinX", "claimMaxX", "buildingType", "buildingState", "destroyedTick", "destroyedCause", "isBuildingCore", "alwaysOverlay", "nonBlocking", "eraseProtected", "workDone", "workRequired", "lifeSchemaVersion", "combatTargetId", "strikeDueTick", "strikeTargetId", "structureStrikeDueTick", "structureStrikeKey", "warRole", "warFrontId", "pathStage", "pathCache", "climbHoldUntil", "patrolX", "patrolY", "searchX", "searchY", "resumeAfterDelivery"
            , "personActivity", "personArchived", "personArchiveSettlementId", "personTransitioning", "deceasedPeople"
        ];
        for (let i = 0; i < fields.length; i++) delete pixel[fields[i]];
    }

    function actorBeforeRemoval(pixel) {
        if (!pixel) return null;
        if (pixel.element === "civ_body" || pixel.element === "civ_child") return pixel;
        if (pixel.element !== "civ_head" || pixel._r === undefined) return null;
        const relation = getRelation(pixel._r);
        return relation && relation.p && relation.p.find((part) => part && part.element === "civ_body" && !part.del) || null;
    }

    function archiveActorRemoval(pixel, nextElement) {
        const actor = actorBeforeRemoval(pixel);
        if (!actor || actor.personTransitioning || actor.dead || !Number.isFinite(actor.humanId)) return;
        actor.deathCause = nextElement ? "environment" : "erased";
        markActorDead(actor, pixelTicks, {removedAs: nextElement || null});
    }

    function onCivilizedChange(pixel, nextElement) {
        if (pixel && pixel.element === "civ_banner") transferDeceasedArchive(pixel);
        archiveActorRemoval(pixel, nextElement);
        if (isBuildingCorePixel(pixel)) releaseBuildingClaim(pixel);
        unregisterPixel(pixel);
        if (pixel && pixel._r !== undefined && typeof removeFromRelation === "function") removeFromRelation(pixel);
        cleanupCivilizedFields(pixel);
    }

    function onCivilizedDelete(pixel) {
        if (pixel && pixel.element === "civ_banner") transferDeceasedArchive(pixel);
        archiveActorRemoval(pixel, null);
        if (isBuildingCorePixel(pixel)) releaseBuildingClaim(pixel);
        unregisterPixel(pixel);
        if (pixel && pixel._r !== undefined && typeof removeFromRelation === "function") removeFromRelation(pixel);
    }

    function createRelation(parts) {
        const existingIds = Object.keys(currentRelations || {}).map(Number).filter(Number.isFinite);
        const nextAvailable = existingIds.length ? Math.max.apply(null, existingIds) + 1 : 1;
        if (!Number.isFinite(currentRelations._id) || currentRelations._id < nextAvailable) currentRelations._id = nextAvailable;
        const id = currentRelations._id++;
        for (let i = 0; i < parts.length; i++) addToRelation(parts[i], id);
        return id;
    }

    function ensureFactionRecord(factionId, color) {
        let faction = manager.factionById.get(factionId);
        if (!faction) {
            faction = {
                id: factionId,
                color: color || chooseColor(factionId),
                actors: [],
                adults: [],
                children: [],
                settlements: [],
                huts: [],
                farms: [],
                workshops: [],
                lumberyards: [],
                hearths: [],
                quarries: [],
                granaries: [],
                kilns: [],
                foundries: [],
                forges: [],
                keeps: [],
                siegeWorkshops: [],
                libraries: [],
                markets: [],
                towers: [],
                defenses: [],
                constructionSites: [],
                population: 0,
                adultPopulation: 0,
                housing: 0,
                militaryPower: 0,
                techModifiers: {},
                eraId: DEFAULT_ERA_ID
            };
            manager.factionById.set(factionId, faction);
        }
        else if (color && !faction.color) faction.color = color;
        return faction;
    }

    function nearestFactionCandidate(x, y, radius) {
        const candidates = [];
        manager.settlements.forEach((banner) => {
            if (!banner.del && banner.factionId !== undefined) candidates.push(banner);
        });
        manager.actors.forEach((actor) => {
            if (!actor.del && actor.factionId !== undefined && !actor.dead) candidates.push(actor);
        });
        return Core.chooseFaction(candidates, x, y, radius);
    }

    function allocateFaction(x, y, forcedFactionId, forcedColor) {
        let factionId = forcedFactionId;
        if (factionId === undefined || factionId === null) {
            factionId = nearestFactionCandidate(x, y, C.FACTION_JOIN_RADIUS);
        }
        if (factionId === undefined || factionId === null) {
            factionId = manager.nextFactionId++;
        }
        manager.nextFactionId = Math.max(manager.nextFactionId, factionId + 1);
        const faction = ensureFactionRecord(factionId, forcedColor || chooseColor(factionId));
        return faction;
    }

    function initializeAdult(body, head, options) {
        const opts = options || {};
        const humanId = opts.humanId || manager.nextHumanId++;
        manager.nextHumanId = Math.max(manager.nextHumanId, humanId + 1);
        const faction = allocateFaction(body.x, body.y, opts.factionId, opts.factionColor);
        const common = {
            humanId: humanId,
            factionId: faction.id,
            settlementId: opts.settlementId || null,
            factionColor: faction.color
        };
        Object.assign(body, common, {
            dead: false,
            dir: opts.dir || (Math.random() < 0.5 ? -1 : 1),
            panic: 0,
            hp: opts.hp === undefined ? C.ADULT_HP : opts.hp,
            maxHp: C.ADULT_HP,
            role: opts.role || "worker",
            task: "planning",
            weapon: opts.weapon || "fists",
            carryKind: null,
            carryElement: null,
            carryAmount: 0,
            carry: {},
            carryCapacity: C.BASE_CARRY_CAPACITY,
            attackReadyTick: 0,
            lastThinkTick: -1,
            stuckCount: 0,
            lastX: body.x,
            lastY: body.y,
            underAttackUntil: 0
        });
        if (Number.isFinite(opts.birthTick)) body.birthTick = opts.birthTick;
        if (Number.isFinite(opts.lifespanYears)) body.lifespanYears = opts.lifespanYears;
        if (Number.isFinite(opts.naturalDeathTick)) body.naturalDeathTick = opts.naturalDeathTick;
        ensureLifeHistory(body, false);
        if (opts.personActivity) body.personActivity = cloneActivityValue(opts.personActivity);
        ensurePersonActivity(body, false);
        if (!opts.personActivity && !opts.activityTransition) recordPersonLifeEvent(body, opts.creationEvent === "birth" ? "birth" : "placed", {ageYears: ageYears(body), settlementId: body.settlementId});
        beginPersonActivity(body, "planning", null);
        Object.assign(head, common, {dead: false});
        delete head.personActivity;
        setPixelColor(body, faction.color);
        if (opts.skinColor) setPixelColor(head, opts.skinColor);
        else setPixelColor(head, SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)]);
        createRelation([head, body]);
        registerPixel(body);
        registerPixel(head);
        return body;
    }

    function materializeAdult(pixel, options) {
        if (!pixel || pixel.del) return null;
        if (manager.lastFullRebuild < 0 && typeof currentPixels !== "undefined") rebuildIndexes(true);
        const x = pixel.x;
        const y = pixel.y;
        const canOccupy = (targetX, targetY) => typeof canCreatureOccupy === "function" ? canCreatureOccupy(pixel, targetX, targetY, pixel._r) : isEmpty(targetX, targetY);
        if (canOccupy(x, y + 1)) {
            createPixel("civ_body", x, y + 1);
            const body = pixelByElementAt(x, y + 1, "civ_body");
            if (!body) return null;
            changePixel(pixel, "civ_head");
            return initializeAdult(body, pixel, options);
        }
        if (canOccupy(x, y - 1)) {
            createPixel("civ_head", x, y - 1);
            const head = pixelByElementAt(x, y - 1, "civ_head");
            if (!head) return null;
            changePixel(pixel, "civ_body");
            return initializeAdult(pixel, head, options);
        }
        deleteExactPixel(pixel);
        return null;
    }

    function clearTask(actor, outcome, reason, resultPatch) {
        if (!actor) return;
        if (manager.resourceReservations && actor && actor.reservedResourceKey) manager.resourceReservations.release(actor.reservedResourceKey, actor.humanId);
        if (actor) delete actor.reservedResourceKey;
        finishPersonActivity(actor, outcome || "interrupted", reason || "replanned", resultPatch);
        actor.task = "planning";
        actor.targetX = undefined;
        actor.targetY = undefined;
        actor.targetId = undefined;
        actor.targetKind = undefined;
        actor.targetKey = undefined;
        actor.harvestX = undefined;
        actor.harvestY = undefined;
        actor.harvestProgress = 0;
        actor.harvestFarm = false;
        actor.stuckCount = 0;
        actor.noProgressCount = 0;
        actor.bestTaskDistance = undefined;
        actor.progressTargetX = undefined;
        actor.progressTargetY = undefined;
        actor.patrolX = undefined;
        actor.patrolY = undefined;
        actor.searchX = undefined;
        actor.searchY = undefined;
        delete actor.pathStage;
        delete actor.climbHoldUntil;
        invalidateNavigation(actor);
        if (!actor.dead) beginPersonActivity(actor, "planning", null);
    }

    function taskTargetKey(target) {
        if (!target) return null;
        if (Number.isFinite(target.humanId)) return "human:" + target.humanId;
        if (Number.isFinite(target.buildingId)) return "building:" + target.buildingId;
        if (Number.isFinite(target.settlementId)) return "settlement:" + target.settlementId;
        if (target.element && Number.isFinite(target.x) && Number.isFinite(target.y)) return target.element + "@" + target.x + "," + target.y;
        if (target.kind && Number.isFinite(target.x) && Number.isFinite(target.y)) return target.kind + "@" + target.x + "," + target.y;
        return null;
    }

    function setTask(actor, task, target) {
        const nextKey = taskTargetKey(target);
        const sameTarget = actor.task === task && actor.targetKey === nextKey;
        beginPersonActivity(actor, task, target);
        actor.task = task;
        actor.targetX = target && target.x;
        actor.targetY = target && target.y;
        actor.targetId = target && (target.humanId || target.buildingId || target.settlementId);
        actor.targetKind = target && (target.element || target.kind);
        actor.targetKey = nextKey;
        if (!sameTarget) {
            actor.harvestProgress = 0;
            actor.stuckCount = 0;
            actor.noProgressCount = 0;
            actor.bestTaskDistance = undefined;
            actor.progressTargetX = undefined;
            actor.progressTargetY = undefined;
        }
    }

    function resetManager() {
        manager.actors.clear();
        manager.heads.clear();
        manager.settlements.clear();
        manager.children.clear();
        manager.constructionSites.clear();
        manager.structures.clear();
        manager.structuresById.clear();
        manager.actorById.clear();
        manager.deceasedByHumanId.clear();
        manager.factionById.clear();
        manager.settlementById.clear();
        manager.relationRecords.clear();
        manager.foundingSince.clear();
        manager.buckets.clear();
        manager.resourceIndex.clear();
        manager.treeById.clear();
        manager.pendingResourceDrops.length = 0;
        if (manager.resourceReservations) manager.resourceReservations.clear();
        manager.territory = null;
        manager.pendingAttacks.length = 0;
        manager.pendingStructureAttacks.length = 0;
        manager.pendingIncidents.length = 0;
        manager.pendingRangedImpacts.length = 0;
        manager.visualProjectiles.clear();
        manager.nextHumanId = 1;
        manager.nextFactionId = 1;
        manager.nextSettlementId = 1;
        manager.nextBuildingId = 1;
        manager.nextTreeId = 1;
        manager.nextTerritoryClaimOrder = 1;
        manager.lastFullRebuild = -1;
        manager.lastIndexTick = -1;
        manager.lastDiplomacyTick = -1;
        resetPeopleObserverState();
    }

    function rebuildIndexes(force) {
        if (!force && manager.lastFullRebuild >= 0 && pixelTicks - manager.lastFullRebuild < C.FULL_REBUILD_INTERVAL) return;
        manager.actors.clear();
        manager.heads.clear();
        manager.settlements.clear();
        manager.children.clear();
        manager.constructionSites.clear();
        manager.structures.clear();
        for (let i = 0; i < currentPixels.length; i++) {
            const pixel = currentPixels[i];
            if (!pixel || pixel.del) continue;
            registerPixel(pixel);
        }
        manager.lastFullRebuild = pixelTicks;
        buildWorldIndex();
    }

    function migrateLegacySocietyPixels() {
        const coresByBuilding = new Map();
        manager.settlements.forEach((pixel) => { if (Number.isFinite(pixel.buildingId)) coresByBuilding.set(pixel.buildingId, pixel); });
        manager.constructionSites.forEach((pixel) => { if (Number.isFinite(pixel.buildingId)) coresByBuilding.set(pixel.buildingId, pixel); });
        manager.structures.forEach((pixel) => { if (STRUCTURE_CORES.has(pixel.element) && Number.isFinite(pixel.buildingId)) coresByBuilding.set(pixel.buildingId, pixel); });
        Array.from(manager.structures).forEach((pixel) => {
            if (!pixel || pixel.del || !STRUCTURE_PARTS.has(pixel.element) || !Number.isFinite(pixel.buildingId) || !coresByBuilding.has(pixel.buildingId)) return;
            deleteExactPixel(pixel);
        });
        coresByBuilding.forEach((core) => {
            if (!core || core.del || core.societyMigrationVersion >= 2) return;
            if (Number.isFinite(core.originX) && Number.isFinite(core.originY) && (core.x !== core.originX || core.y !== core.originY) && !getBuildingCoreAt(core.originX, core.originY)) {
                movePixel(core, core.originX, core.originY);
            }
            if (core.element === "civ_construction" && !Number.isFinite(core.workDone)) {
                const blueprint = BLUEPRINTS[core.blueprintType];
                core.workRequired = blueprint && blueprint.workRequired || 4;
                const oldTotal = Math.max(1, blueprint && blueprint.parts && blueprint.parts.length + 1 || 1);
                core.workDone = Math.round(Math.min(1, safeNumber(core.placedParts, 0) / oldTotal) * core.workRequired);
            }
            core.societyMigrationVersion = 2;
        });
    }

    function buildWorldIndex() {
        migrateLegacySocietyPixels();
        manager.actorById.clear();
        manager.deceasedByHumanId.clear();
        manager.factionById.clear();
        manager.settlementById.clear();
        manager.buckets.clear();
        manager.structuresById.clear();
        manager.resourceIndex.clear();
        manager.treeById.clear();
        let maxHumanId = 0;
        let maxFactionId = 0;
        let maxSettlementId = 0;
        let maxBuildingId = 0;

        // Saved pixels are restored independently. Repair the authoritative
        // body/head identity before the strict lookup helpers run.
        manager.heads.forEach((head) => {
            if (!head || head.del || head._r === undefined) return;
            const relation = getRelation(head._r);
            if (!relation || !relation.p) return;
            const body = relation.p.find((part) => part && !part.del && part.element === "civ_body");
            if (!body) return;
            if (!Number.isFinite(body.humanId) && Number.isFinite(head.humanId)) body.humanId = head.humanId;
            if (!Number.isFinite(body.factionId) && Number.isFinite(head.factionId)) body.factionId = head.factionId;
            if (!Number.isFinite(body.humanId)) body.humanId = manager.nextHumanId++;
            if (!Number.isFinite(body.factionId)) body.factionId = manager.nextFactionId++;
            head.humanId = body.humanId;
            head.factionId = body.factionId;
            head.settlementId = body.settlementId || null;
            head.factionColor = body.factionColor || head.factionColor || chooseColor(body.factionId);
            head.dead = body.dead || head.dead || false;
        });

        manager.actors.forEach((actor) => {
            if (!actor || actor.del || actor.dead) return;
            delete actor.hunger;
            delete actor.lastHungerTick;
            if (!actor.task || actor.task === "idle") actor.task = "planning";
            if (!actor.role || actor.role === "child") actor.role = "worker";
            if (!Number.isFinite(actor.humanId)) actor.humanId = manager.nextHumanId++;
            if (!Number.isFinite(actor.factionId)) actor.factionId = manager.nextFactionId++;
            maxHumanId = Math.max(maxHumanId, actor.humanId);
            maxFactionId = Math.max(maxFactionId, actor.factionId);
            manager.actorById.set(actor.humanId, actor);
            const faction = ensureFactionRecord(actor.factionId, actor.factionColor || chooseColor(actor.factionId));
            actor.factionColor = faction.color;
            ensureLifeHistory(actor, actor.element === "civ_body");
            ensurePersonActivity(actor, true);
            faction.actors.push(actor);
            if (actor.element === "civ_child") faction.children.push(actor);
            else faction.adults.push(actor);
            const key = bucketKey(actor.x, actor.y);
            if (!manager.buckets.has(key)) manager.buckets.set(key, []);
            manager.buckets.get(key).push(actor);
        });

        manager.settlements.forEach((banner) => {
            if (!banner || banner.del) return;
            if (!Number.isFinite(banner.factionId)) banner.factionId = manager.nextFactionId++;
            if (!Number.isFinite(banner.settlementId)) banner.settlementId = manager.nextSettlementId++;
            maxFactionId = Math.max(maxFactionId, banner.factionId);
            maxSettlementId = Math.max(maxSettlementId, banner.settlementId);
            if (!banner.factionColor) banner.factionColor = chooseColor(banner.factionId);
            ensureStock(banner);
            ensureResearchState(banner);
            if (!banner.diplomacy || typeof banner.diplomacy !== "object") banner.diplomacy = {};
            Object.keys(banner.diplomacy).forEach((otherFactionId) => {
                const parsedId = Number(otherFactionId);
                if (Number.isFinite(parsedId)) maxFactionId = Math.max(maxFactionId, parsedId);
            });
            ensureBuildingMetadata(banner, "town_center");
            if (!Number.isFinite(banner.housing)) banner.housing = 4;
            if (!Number.isFinite(banner.birthReadyTick)) banner.birthReadyTick = pixelTicks + C.BIRTH_COOLDOWN;
            if (!Number.isFinite(banner.territoryRadius)) banner.territoryRadius = C.TERRITORY_BASE_RADIUS;
            ensureChronicle(banner);
            ensureDeceasedArchive(banner);
            indexDeceasedArchive(banner);
            banner.deceasedPeople.forEach((entry) => { maxHumanId = Math.max(maxHumanId, entry.h); });
            if (banner.townCenterActive === undefined) banner.townCenterActive = true;
            manager.settlementById.set(banner.settlementId, banner);
            const faction = ensureFactionRecord(banner.factionId, banner.factionColor);
            faction.settlements.push(banner);
            faction.eraId = banner.eraId;
            faction.research = banner.research;
        });

        manager.structures.forEach((pixel) => {
            if (!pixel || pixel.del || !Number.isFinite(pixel.factionId)) return;
            maxFactionId = Math.max(maxFactionId, pixel.factionId);
            if (Number.isFinite(pixel.buildingId)) maxBuildingId = Math.max(maxBuildingId, pixel.buildingId);
            if (STRUCTURE_CORES.has(pixel.element)) ensureBuildingMetadata(pixel);
            const faction = ensureFactionRecord(pixel.factionId, pixel.factionColor || chooseColor(pixel.factionId));
            if (pixel.element === "civ_hut_core") faction.huts.push(pixel);
            else if (pixel.element === "civ_farm_marker") faction.farms.push(pixel);
            else if (pixel.element === "civ_workshop_core") faction.workshops.push(pixel);
            else if (pixel.element === "civ_lumberyard_core") faction.lumberyards.push(pixel);
            else if (pixel.element === "civ_hearth_core") faction.hearths.push(pixel);
            else if (pixel.element === "civ_quarry_core") faction.quarries.push(pixel);
            else if (pixel.element === "civ_granary_core") faction.granaries.push(pixel);
            else if (pixel.element === "civ_kiln_core") faction.kilns.push(pixel);
            else if (pixel.element === "civ_foundry_core") faction.foundries.push(pixel);
            else if (pixel.element === "civ_forge_core") faction.forges.push(pixel);
            else if (pixel.element === "civ_keep_core") faction.keeps.push(pixel);
            else if (pixel.element === "civ_siege_workshop_core") faction.siegeWorkshops.push(pixel);
            else if (pixel.element === "civ_library_core") faction.libraries.push(pixel);
            else if (pixel.element === "civ_market_core") faction.markets.push(pixel);
            else if (pixel.element === "civ_tower_core") faction.towers.push(pixel);
            else if (pixel.element === "civ_palisade" || pixel.element === "civ_gate") faction.defenses.push(pixel);
        });

        manager.constructionSites.forEach((site) => {
            if (!site || site.del || !Number.isFinite(site.factionId)) return;
            maxFactionId = Math.max(maxFactionId, site.factionId);
            if (Number.isFinite(site.buildingId)) maxBuildingId = Math.max(maxBuildingId, site.buildingId);
            ensureBuildingMetadata(site, site.blueprintType);
            const faction = ensureFactionRecord(site.factionId, site.factionColor || chooseColor(site.factionId));
            faction.constructionSites.push(site);
        });

        manager.factionById.forEach((faction) => {
            faction.population = faction.actors.length;
            faction.adultPopulation = faction.adults.length;
            faction.militaryPower = fallbackMilitaryPower(faction.adults);
            const banner = faction.settlements.slice().sort((a, b) => safeNumber(a.foundedTick, a.start || 0) - safeNumber(b.foundedTick, b.start || 0) || a.settlementId - b.settlementId)[0];
            if (banner) {
                faction.settlements.forEach((settlement) => {
                    const settlementHuts = faction.huts.filter((building) => building.settlementId === settlement.settlementId);
                    const settlementKeeps = faction.keeps.filter((building) => building.settlementId === settlement.settlementId);
                    const settlementPopulation = faction.actors.filter((actor) => actor.settlementId === settlement.settlementId).length;
                    settlement.population = settlementPopulation;
                    settlement.housing = 4 + settlementHuts.length * (hasTech(faction, "village_planning") ? 5 : 4) + settlementKeeps.length * 8;
                    settlement.stage = settlementHuts.length >= 2 ? "village" : (settlementHuts.length ? "hamlet" : "camp");
                    settlement.research = banner.research;
                    settlement.eraId = banner.eraId;
                });
                faction.eraId = banner.eraId;
                faction.research = banner.research;
            }
            faction.techModifiers = computeTechModifiers(faction);
            faction.housing = faction.settlements.reduce((sum, settlement) => sum + Math.max(4, settlement.housing || 4), 0);
        });

        rebuildResourceAndTreeIndex();
        rebuildTerritoryIndex();

        manager.relationRecords.forEach((record) => {
            if (record && Number.isFinite(Number(record.factionA))) maxFactionId = Math.max(maxFactionId, Number(record.factionA));
            if (record && Number.isFinite(Number(record.factionB))) maxFactionId = Math.max(maxFactionId, Number(record.factionB));
        });

        manager.nextHumanId = Math.max(manager.nextHumanId, maxHumanId + 1);
        manager.nextFactionId = Math.max(manager.nextFactionId, maxFactionId + 1);
        manager.nextSettlementId = Math.max(manager.nextSettlementId, maxSettlementId + 1);
        manager.nextBuildingId = Math.max(manager.nextBuildingId, maxBuildingId + 1);
        manager.lastIndexTick = pixelTicks;
    }

    function fallbackMilitaryPower(adults) {
        let total = 0;
        for (let i = 0; i < adults.length; i++) {
            const actor = adults[i];
            if (!actor || actor.dead || actor.hp <= 0) continue;
            const weapon = manager.weapons.get(actor.weapon) || manager.weapons.get("fists") || {power: 1};
            const roleMultiplier = actor.role === "warrior" ? 1.25 : (actor.role === "guard" ? 1.1 : 1);
            total += (actor.hp / Math.max(1, actor.maxHp || C.ADULT_HP)) * (weapon.power || 1) * roleMultiplier;
        }
        return total;
    }

    function nearbyActors(x, y, radius, predicate) {
        const results = [];
        const minBX = Math.floor((x - radius) / C.BUCKET_SIZE);
        const maxBX = Math.floor((x + radius) / C.BUCKET_SIZE);
        const minBY = Math.floor((y - radius) / C.BUCKET_SIZE);
        const maxBY = Math.floor((y + radius) / C.BUCKET_SIZE);
        for (let bx = minBX; bx <= maxBX; bx++) {
            for (let by = minBY; by <= maxBY; by++) {
                const bucket = manager.buckets.get(bx + "," + by);
                if (!bucket) continue;
                for (let i = 0; i < bucket.length; i++) {
                    const actor = bucket[i];
                    if (!actor || actor.del || actor.dead) continue;
                    if (Core.distance(actor.x, actor.y, x, y) > radius) continue;
                    if (!predicate || predicate(actor)) results.push(actor);
                }
            }
        }
        results.sort((a, b) => Core.distance(a.x, a.y, x, y) - Core.distance(b.x, b.y, x, y));
        return results;
    }

    function settlementForActor(actor) {
        if (actor && actor.settlementId && manager.settlementById.has(actor.settlementId)) {
            return manager.settlementById.get(actor.settlementId);
        }
        const faction = actor && manager.factionById.get(actor.factionId);
        const banner = faction && faction.settlements[0];
        if (banner && actor) actor.settlementId = banner.settlementId;
        return banner || null;
    }

    function territoryOwnerAt(x, y, excludedFactionId) {
        const territory = ensureTerritoryIndex();
        if (!territory) return null;
        const ownerId = territory.ownerAt(x);
        if (ownerId === null || ownerId === undefined || Number(ownerId) === Number(excludedFactionId)) return null;
        const faction = manager.factionById.get(Number(ownerId));
        return faction && faction.settlements[0] || {factionId: Number(ownerId), x: x, y: y};
    }

    function registerResource(elementName, descriptor) {
        if (!elementName || !descriptor || !descriptor.kind) return false;
        manager.resources.set(elementName, Object.assign({yield: 1, harvestTicks: 10}, descriptor));
        return true;
    }

    function resourceDescriptor(pixel) {
        if (!pixel || pixel.del || !elements[pixel.element]) return null;
        if (pixel.element === "civ_wood_resource") {
            const seed = TREE_SAPLING_ELEMENTS.has(pixel.treeSapling) ? pixel.treeSapling : "sapling";
            return {kind: "wood", material: "wood", yield: 1, harvestTicks: 8, treeSapling: seed, resourceDrop: true};
        }
        if (pixel.element.indexOf("civ_") === 0) return null;
        if (manager.resources.has(pixel.element)) return manager.resources.get(pixel.element);
        if (elements[pixel.element].isFood) {
            const declaredSeed = elements[pixel.element].seed;
            return {kind: "food", yield: 1, harvestTicks: 6, seed: declaredSeed === true ? pixel.element : (declaredSeed || null), seedOnly: declaredSeed === true};
        }
        if (DEFAULT_RESOURCES.wood.has(pixel.element)) return {kind: "wood", material: pixel.element, yield: 1, harvestTicks: 18, treeSeed: TREE_SEEDS[pixel.element] || "sapling"};
        if (DEFAULT_RESOURCES.stone.has(pixel.element)) return {kind: "stone", yield: 1, harvestTicks: 28, harvestInto: "dirt"};
        if (pixel.element === "copper") return {kind: "copper", material: "copper", yield: 1, harvestTicks: 38};
        if (pixel.element === "tin") return {kind: "tin", material: "tin", yield: 1, harvestTicks: 38};
        if (pixel.element === "iron" || pixel.element === "iron_ore") return {kind: "raw_iron", material: "raw_iron", yield: 1, harvestTicks: 48};
        return null;
    }

    function rebuildResourceAndTreeIndex() {
        const treeElements = new Set(["wood", "tree_branch", "evergreen", "bamboo", "plant", "leaves", "pine_needles", "sapling", "pinecone", "bamboo_plant", "dead_plant", "frozen_plant"]);
        const woodyTreeElements = new Set(["wood", "tree_branch", "evergreen", "bamboo"]);
        // Civilization-planted seeds rise while growing. Preserve their
        // original germination coordinate separately, then transfer the tree
        // identity to the woody cell that replaces that coordinate.
        for (let i = 0; i < currentPixels.length; i++) {
            const planted = currentPixels[i];
            if (!planted || planted.del) continue;
            const woodyBelow = getPixel(planted.x, planted.y + 1);
            if (planted._civTreeRoot && !PLANTED_TREE_SEEDS.has(planted.element) && treeElements.has(planted.element) && woodyBelow && treeElements.has(woodyBelow.element)) {
                delete planted._civTreeRoot;
                if (Number.isFinite(woodyBelow.treeId) && woodyBelow.treeId !== planted.treeId) delete planted.treeId;
            }
            if (PLANTED_TREE_SEEDS.has(planted.element) && planted._civTreeRoot && Number.isFinite(planted.treeId) && !Number.isFinite(planted.civPlantedTreeId)) {
                planted.civPlantedTreeId = planted.treeId;
                planted.civTreeOriginX = Number.isFinite(planted.treeRootX) ? planted.treeRootX : planted.x;
                planted.civTreeOriginY = Number.isFinite(planted.treeRootY) ? planted.treeRootY : planted.y;
                delete planted.treeId;
                delete planted._civTreeRoot;
            }
            if (!Number.isFinite(planted.civPlantedTreeId)) continue;
            const originX = safeNumber(planted.civTreeOriginX, planted.x);
            const originY = safeNumber(planted.civTreeOriginY, planted.y);
            const rootCandidate = pixelsAt(originX, originY).find((pixel) => pixel && woodyTreeElements.has(pixel.element));
            if (rootCandidate) {
                if (Number.isFinite(rootCandidate.treeId)) planted.civPlantedTreeId = rootCandidate.treeId;
                else rootCandidate.treeId = planted.civPlantedTreeId;
                rootCandidate._civTreeRoot = true;
            }
            if (PLANTED_TREE_SEEDS.has(planted.element)) {
                delete planted.treeId;
                delete planted._civTreeRoot;
            }
        }
        const treePixels = [];
        const byCoordinate = new Map();
        for (let i = 0; i < currentPixels.length; i++) {
            const pixel = currentPixels[i];
            if (!pixel || pixel.del) continue;
            const isTree = treeElements.has(pixel.element) && (pixel.naturalVegetation === true || pixel.treeLineage || (woodyTreeElements.has(pixel.element) && pixel.element !== "wood") || pixel._civTreeRoot || pixel.treeId || Number.isFinite(pixel.civPlantedTreeId));
            if (isTree) {
                treePixels.push(pixel);
                byCoordinate.set(pixel.x + "," + pixel.y, pixel);
            }
        }
        const legacyLeafElements = new Set(["plant", "leaves", "pine_needles", "dead_plant", "frozen_plant"]);
        for (let legacyPass = 0; legacyPass < 2; legacyPass++) {
            let attachedLegacyLeaf = false;
            for (let i = 0; i < currentPixels.length; i++) {
                const pixel = currentPixels[i];
                const key = pixel && pixel.x + "," + pixel.y;
                if (!pixel || pixel.del || byCoordinate.has(key) || !legacyLeafElements.has(pixel.element)) continue;
                let adjacentTree = false;
                for (let dx = -1; dx <= 1 && !adjacentTree; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if ((!dx && !dy) || !byCoordinate.has((pixel.x + dx) + "," + (pixel.y + dy))) continue;
                        adjacentTree = true;
                        break;
                    }
                }
                if (!adjacentTree) continue;
                treePixels.push(pixel);
                byCoordinate.set(key, pixel);
                attachedLegacyLeaf = true;
            }
            if (!attachedLegacyLeaf) break;
        }
        const visited = new Set();
        for (let i = 0; i < treePixels.length; i++) {
            const start = treePixels[i];
            if (visited.has(start)) continue;
            const queue = [start];
            const component = [];
            let componentTreeId = Number.isFinite(start.treeId) ? start.treeId : null;
            let componentLineage = start.treeLineage || null;
            visited.add(start);
            while (queue.length) {
                const pixel = queue.pop();
                component.push(pixel);
                if (!Number.isFinite(componentTreeId) && Number.isFinite(pixel.treeId)) componentTreeId = pixel.treeId;
                if (!componentLineage && pixel.treeLineage) componentLineage = pixel.treeLineage;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (!dx && !dy) continue;
                        const other = byCoordinate.get((pixel.x + dx) + "," + (pixel.y + dy));
                        if (!other || visited.has(other)) continue;
                        if (componentLineage && other.treeLineage && other.treeLineage !== componentLineage) continue;
                        if (Number.isFinite(componentTreeId) && Number.isFinite(other.treeId) && other.treeId !== componentTreeId) continue;
                        if (!componentLineage && other.treeLineage) componentLineage = other.treeLineage;
                        if (!Number.isFinite(componentTreeId) && Number.isFinite(other.treeId)) componentTreeId = other.treeId;
                        visited.add(other);
                        queue.push(other);
                    }
                }
            }
            const savedId = componentTreeId || component.map((pixel) => pixel.treeId).find(Number.isFinite);
            const treeId = savedId || manager.nextTreeId++;
            manager.nextTreeId = Math.max(manager.nextTreeId, treeId + 1);
            const bottomY = Math.max.apply(null, component.map((pixel) => pixel.y));
            const bottom = component.filter((pixel) => pixel.y === bottomY).sort((a, b) => a.x - b.x);
            const markedRoot = component.find((pixel) => pixel._civTreeRoot && pixel.y === bottomY);
            const basePixel = markedRoot || bottom[Math.floor((bottom.length - 1) / 2)] || start;
            const topY = Math.min.apply(null, component.map((pixel) => pixel.y));
            const declaredSpecies = component.map((pixel) => pixel.treeSpecies).find(Boolean);
            const species = declaredSpecies || (component.some((pixel) => pixel.element === "bamboo") ? "bamboo_plant" : (component.some((pixel) => pixel.element === "evergreen") ? "pinecone" : "sapling"));
            const height = Math.max(1, basePixel.y - topY + 1);
            const woodPixels = component.filter((pixel) => WOOD_BEARING_TREE_ELEMENTS.has(pixel.element));
            const woodYield = woodPixels.length;
            const seed = species === "bamboo" ? "bamboo_plant" : (species === "evergreen" ? "pinecone" : (TREE_SAPLING_ELEMENTS.has(species) ? species : "sapling"));
            const tree = {id: treeId, lineage: componentLineage, base: basePixel, root: basePixel, pixels: component, woodPixels, topY, height, woodYield, seed, species};
            component.forEach((pixel) => { pixel.treeId = treeId; pixel.treeRootX = basePixel.x; pixel.treeRootY = basePixel.y; if (componentLineage && !pixel.treeLineage) pixel.treeLineage = componentLineage; });
            basePixel._civTreeRoot = true;
            manager.treeById.set(treeId, tree);
        }

        manager.treeById.forEach((tree) => {
            const base = tree && tree.base;
            if (!base || base.treeRootMigrationVersion >= 1) return;
            base.treeRootMigrationVersion = 1;
            const firstRoot = getPixel(base.x, base.y + 1);
            if (!firstRoot || firstRoot.element !== "root") return;
            const queue = [firstRoot];
            const seen = new Set(queue);
            while (queue.length) {
                const rootPixel = queue.pop();
                const x = rootPixel.x;
                const y = rootPixel.y;
                if (rootPixel.element !== "root" && rootPixel.element !== "fiber") continue;
                changePixel(rootPixel, "dirt");
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (!dx && !dy) continue;
                        const other = getPixel(x + dx, y + dy);
                        if (!other || seen.has(other) || (other.element !== "root" && other.element !== "fiber")) continue;
                        seen.add(other);
                        queue.push(other);
                    }
                }
            }
        });

        for (let i = 0; i < currentPixels.length; i++) {
            const pixel = currentPixels[i];
            if (!pixel || pixel.del) continue;
            let descriptor = resourceDescriptor(pixel);
            if (!descriptor) continue;
            let tree = null;
            if (descriptor.kind === "wood" && Number.isFinite(pixel.treeId)) {
                tree = manager.treeById.get(pixel.treeId);
                if (!tree || tree.base !== pixel) continue;
                descriptor = Object.assign({}, descriptor, {yield: tree.woodYield, treeSapling: tree.seed, treeId: tree.id, wholeTree: true});
            }
            const node = {pixel, x: pixel.x, y: pixel.y, element: pixel.element, descriptor, kind: descriptor.kind, key: pixel.element + "@" + pixel.x + "," + pixel.y, tree};
            if (!manager.resourceIndex.has(descriptor.kind)) manager.resourceIndex.set(descriptor.kind, []);
            manager.resourceIndex.get(descriptor.kind).push(node);
        }
    }

    function registerWeapon(id, descriptor) {
        if (!id || !descriptor) return false;
        manager.weapons.set(id, Object.assign({id: id, damage: 8, range: 1, cooldown: 20, power: 1, cost: {}}, descriptor));
        return true;
    }

    registerWeapon("fists", Core.WEAPONS && Core.WEAPONS.fists || {damage: 8, range: 1, cooldown: 20, power: 1, cost: {}});
    registerWeapon("club", Core.WEAPONS && Core.WEAPONS.club || {damage: 14, range: 1, cooldown: 18, power: 1.5, cost: {wood: 2}});
    registerWeapon("spear", Core.WEAPONS && Core.WEAPONS.spear || {damage: 18, range: 2, cooldown: 22, power: 2, cost: {wood: 1, stone: 1}, upgradeFrom: "club"});
    registerWeapon("bronze_spear", {damage: 24, range: 2, cooldown: 20, power: 2.7, cost: {wood: 1, bronze: 2}, upgradeFrom: "spear"});
    registerWeapon("iron_sword", {damage: 31, range: 1.5, cooldown: 17, power: 3.5, cost: {iron: 2}, upgradeFrom: "bronze_spear"});
    Object.keys(TechData.RANGED_WEAPONS || {}).forEach((weaponId) => {
        const weapon = TechData.RANGED_WEAPONS[weaponId];
        registerWeapon(weaponId, Object.assign({cooldown: weaponId === "crossbow" ? 34 : 26, power: weaponId === "crossbow" ? 4 : 2.4, ranged: true, cost: weaponId === "crossbow" ? {wood: 2, steel: 1} : {wood: 3}}, weapon));
    });

    function facilityBlueprint(core, cost, options) {
        const opts = options || {};
        return {
            cost: cost,
            core: core,
            width: 1,
            parts: [],
            hp: opts.hp || 140,
            color: opts.color,
            workRequired: opts.workRequired || Math.max(2, Math.ceil(Object.keys(cost || {}).reduce((sum, key) => sum + safeNumber(cost[key], 0), 0) / 4))
        };
    }

    const BLUEPRINTS = {
        hut: facilityBlueprint("civ_hut_core", {wood: 12}, {hp: 120, workRequired: 4}),
        workshop: facilityBlueprint("civ_workshop_core", {wood: 10, stone: 8}, {hp: 120, workRequired: 6}),
        farm: facilityBlueprint("civ_farm_marker", {wood: 4}, {hp: 60, workRequired: 2}),
        lumberyard: facilityBlueprint("civ_lumberyard_core", {wood: 4}, {hp: 100, workRequired: 2}),
        hearth: facilityBlueprint("civ_hearth_core", {wood: 6, stone: 2}, {width: 3, roof: false, hp: 80, color: "#b45f36"}),
        quarry: facilityBlueprint("civ_quarry_core", {wood: 8, stone: 12}, {width: 5, material: "civ_structure_stone", hp: 160, color: "#77756f"}),
        granary: facilityBlueprint("civ_granary_core", {wood: 14, stone: 6}, {width: 5, hp: 150, color: "#a77b42"}),
        kiln: facilityBlueprint("civ_kiln_core", {wood: 8, stone: 14}, {width: 5, material: "civ_structure_stone", hp: 170, color: "#835b45"}),
        foundry: facilityBlueprint("civ_foundry_core", {wood: 12, stone: 18}, {width: 5, material: "civ_structure_stone", hp: 190, color: "#6e625d"}),
        forge: facilityBlueprint("civ_forge_core", {wood: 10, stone: 22, iron: 2}, {width: 5, material: "civ_structure_stone", hp: 220, color: "#55545a"}),
        palisade: facilityBlueprint("civ_gate", {wood: 18}, {hp: 110, workRequired: 5}),
        watchtower: facilityBlueprint("civ_tower_core", {wood: 12, stone: 24, iron: 2}, {width: 5, material: "civ_structure_stone", hp: 260, color: "#66686b"}),
        keep: facilityBlueprint("civ_keep_core", {wood: 24, stone: 50, steel: 2}, {width: 7, material: "civ_structure_stone", hp: 420, color: "#62646a"}),
        siege_workshop: facilityBlueprint("civ_siege_workshop_core", {wood: 24, stone: 20, steel: 2}, {width: 7, material: "civ_structure_stone", hp: 260, color: "#71624f"}),
        library: facilityBlueprint("civ_library_core", {wood: 20, stone: 24}, {width: 7, material: "civ_structure_stone", hp: 220, color: "#786b58"}),
        market: facilityBlueprint("civ_market_core", {wood: 22, stone: 12}, {width: 7, hp: 190, color: "#9b714a"})
    };

    function hasStock(banner, cost) {
        if (!banner || !ensureStock(banner)) return false;
        return Object.keys(cost || {}).every((resource) => materialAmount(banner.stock, resource) >= (cost[resource] || 0));
    }

    function spendStock(banner, cost) {
        if (!hasStock(banner, cost)) return false;
        Object.keys(cost || {}).forEach((resource) => spendMaterial(banner.stock, resource, cost[resource] || 0));
        return true;
    }

    function refundStock(banner, refund) {
        if (!banner || !banner.stock || !refund) return;
        ensureStock(banner);
        Object.keys(refund).forEach((resource) => addMaterial(banner.stock, resource, refund[resource] || 0));
    }

    function solidGroundAt(x, y) {
        const below = pixelsAt(x, y + 1);
        return below.some((pixel) => pixel && elements[pixel.element] && elements[pixel.element].state === "solid" &&
            !(pixel.nonBlocking === true || elements[pixel.element].nonBlocking === true || (typeof isNonBlockingPixel === "function" && isNonBlockingPixel(pixel))) &&
            !(typeof isCreaturePixel === "function" && isCreaturePixel(pixel)) &&
            !(typeof isPassableVegetationPixel === "function" && isPassableVegetationPixel(pixel)));
    }

    function findSurfaceY(x, hintY) {
        for (let delta = 0; delta <= 8; delta++) {
            const ys = delta === 0 ? [hintY] : [hintY - delta, hintY + delta];
            for (let i = 0; i < ys.length; i++) {
                const y = ys[i];
                if (outOfBounds(x, y) || outOfBounds(x, y + 1)) continue;
                if (isEmpty(x, y) && solidGroundAt(x, y)) return y;
            }
        }
        return null;
    }

    function buildTargets(type, originX, originY) {
        const blueprint = BLUEPRINTS[type];
        if (!blueprint) return [];
        return [{x: originX, y: originY, element: blueprint.core, core: true}];
    }

    function buildingSpacingAvailable(originX, originY, ignoredBuildingId) {
        const candidate = {x: originX, y: originY};
        let valid = true;
        const inspect = (pixel) => {
            if (!valid || !isBuildingCorePixel(pixel) || pixel.buildingId === ignoredBuildingId) return;
            if (World.buildingSpacingValid ? !World.buildingSpacingValid(candidate, pixel, C.BUILDING_SPRITE_GAP) : Math.abs(pixel.x - originX) < 5 && Math.abs(pixel.y - originY) < 5) valid = false;
        };
        manager.settlements.forEach(inspect);
        manager.constructionSites.forEach(inspect);
        manager.structures.forEach(inspect);
        return valid;
    }

    function validateBuildSite(type, originX, originY, factionId, allowUnownedCenter) {
        const blueprint = BLUEPRINTS[type];
        if (!blueprint) return false;
        if (outOfBounds(originX, originY) || outOfBounds(originX, originY + 1) || getBuildingCoreAt(originX, originY)) return false;
        if (!solidGroundAt(originX, originY)) return false;
        if (!buildingSpacingAvailable(originX, originY)) return false;
        const territory = ensureTerritoryIndex();
        const owner = territory && territory.ownerAt(originX);
        if (allowUnownedCenter) {
            if (owner !== null && owner !== undefined && Number(owner) !== Number(factionId)) return false;
        }
        else if (Number(owner) !== Number(factionId)) return false;
        return true;
    }

    function findBuildSite(banner, type) {
        const radius = C.BUILD_SEARCH_RADIUS;
        for (let distance = 5; distance <= radius; distance++) {
            const offsets = distance % 2 ? [distance, -distance] : [-distance, distance];
            for (let i = 0; i < offsets.length; i++) {
                let x = banner.x + offsets[i];
                const y = findSurfaceY(x, banner.y);
                if (y !== null && validateBuildSite(type, x, y, banner.factionId, false)) return {x: x, y: y};
            }
        }
        return null;
    }

    function createConstruction(banner, type) {
        const blueprint = BLUEPRINTS[type];
        if (!blueprint || !hasStock(banner, blueprint.cost)) return null;
        const siteCoords = findBuildSite(banner, type);
        if (!siteCoords || getBuildingCoreAt(siteCoords.x, siteCoords.y)) return null;
        if (!spendStock(banner, blueprint.cost)) return null;
        createPixel("civ_construction", siteCoords.x, siteCoords.y);
        const site = pixelByElementAt(siteCoords.x, siteCoords.y, "civ_construction");
        if (!site || site.element !== "civ_construction") {
            refundStock(banner, blueprint.cost);
            return null;
        }
        site.factionId = banner.factionId;
        site.factionColor = banner.factionColor;
        site.settlementId = banner.settlementId;
        site.buildingId = manager.nextBuildingId++;
        site.blueprintType = type;
        site.originX = siteCoords.x;
        site.originY = siteCoords.y;
        site.nextPart = 0;
        site.blockedTicks = 0;
        site.lastBuildTick = pixelTicks;
        site.costs = Object.assign({}, blueprint.cost);
        site.placedParts = 0;
        site.workDone = 0;
        site.workRequired = blueprint.workRequired || 4;
        ensureBuildingMetadata(site, type);
        reserveBuildingTerritory(site);
        setPixelColor(site, banner.factionColor);
        registerPixel(site);
        logSettlementEvent(banner, "construction", "开始建造：" + type, {buildingId: site.buildingId, buildingType: type, x: site.x, y: site.y});
        return site;
    }

    function constructionRefund(site) {
        const blueprint = BLUEPRINTS[site.blueprintType];
        if (!blueprint) return {wood: 0, stone: 0};
        const total = Math.max(1, site.workRequired || blueprint.workRequired || 1);
        const placedRatio = Math.min(1, Math.max(0, safeNumber(site.workDone, site.placedParts || 0) / total));
        if (Core.constructionRefund) return Core.constructionRefund(site.costs || blueprint.cost, placedRatio);
        return {
            wood: Math.floor(((site.costs && site.costs.wood) || 0) * (1 - placedRatio) * 0.5),
            stone: Math.floor(((site.costs && site.costs.stone) || 0) * (1 - placedRatio) * 0.5)
        };
    }

    function cancelConstruction(site, skipDelete) {
        if (!site || site.cancelled || site.completed) return;
        site.cancelled = true;
        const banner = manager.settlementById.get(site.settlementId);
        refundStock(banner, constructionRefund(site));
        unregisterPixel(site);
        if (!skipDelete && !site.del) deleteExactPixel(site);
    }

    function finishConstruction(site) {
        const blueprint = BLUEPRINTS[site.blueprintType];
        if (!blueprint || site.del) return null;
        const completedType = site.blueprintType;
        const data = {
            factionId: site.factionId,
            factionColor: site.factionColor,
            settlementId: site.settlementId,
            buildingId: site.buildingId,
            originX: site.originX,
            originY: site.originY
        };
        const claimData = {territoryClaimId: site.territoryClaimId, territoryClaimTick: site.territoryClaimTick, territoryClaimOrder: site.territoryClaimOrder};
        site.completed = true;
        changePixel(site, blueprint.core);
        const corePixel = site;
        Object.assign(corePixel, data);
        Object.assign(corePixel, claimData);
        ensureBuildingMetadata(corePixel, completedType);
        reserveBuildingTerritory(corePixel);
        if (blueprint.core === "civ_hut_core") {
            corePixel.structureHp = 120;
            corePixel.structureMaxHp = 120;
        }
        else if (blueprint.core === "civ_workshop_core") {
            corePixel.structureHp = 120;
            corePixel.structureMaxHp = 120;
            corePixel.lastCraftTick = pixelTicks;
        }
        else if (blueprint.core === "civ_farm_marker") {
            corePixel.structureHp = 60;
            corePixel.structureMaxHp = 60;
            corePixel.plots = [];
            const faction = manager.factionById.get(site.factionId);
            const plotCount = 5 + safeNumber(faction && faction.techModifiers && faction.techModifiers.farmPlots, 0);
            for (let i = 1; i <= plotCount; i++) {
                const plotX = corePixel.originX + i;
                const soil = getPixel(plotX, corePixel.originY + 1);
                if (!outOfBounds(plotX, corePixel.originY) && isEmpty(plotX, corePixel.originY) && soil && SOIL_ELEMENTS.has(soil.element)) {
                    corePixel.plots.push({x: plotX, y: corePixel.originY});
                }
            }
        }
        else {
            corePixel.structureHp = blueprint.hp || 140;
            corePixel.structureMaxHp = corePixel.structureHp;
            corePixel.lastProcessTick = pixelTicks;
        }
        setPixelColor(corePixel, data.factionColor);
        registerPixel(corePixel);
        const completedBanner = manager.settlementById.get(data.settlementId);
        if (completedBanner) {
            const research = ensureResearchState(completedBanner);
            research.milestones.buildingsCompleted = safeNumber(research.milestones.buildingsCompleted, 0) + 1;
            const completedFaction = manager.factionById.get(data.factionId);
            research.knowledge += 0.6 * safeNumber(completedFaction && completedFaction.techModifiers && completedFaction.techModifiers.milestoneKnowledge, 1);
            addDomainExperience(completedBanner, "construction", 0.5);
            logSettlementEvent(completedBanner, "building", "建筑完成：" + completedType, {buildingId: data.buildingId, buildingType: completedType, x: corePixel.x, y: corePixel.y});
        }
        return corePixel;
    }

    function advanceConstruction(site, builder) {
        if (!site || site.del || !builder || builder.del) return;
        const builderFaction = manager.factionById.get(builder.factionId);
        const buildInterval = Math.max(2, C.CONSTRUCTION_STEP_TICKS * safeNumber(builderFaction && builderFaction.techModifiers && builderFaction.techModifiers.buildSpeed, 1) / safeNumber(builderFaction && builderFaction.techModifiers && builderFaction.techModifiers.roleWorkSpeed, 1));
        if (pixelTicks - (site.lastBuildTick || 0) < buildInterval) return;
        const blueprint = BLUEPRINTS[site.blueprintType];
        if (!blueprint) return cancelConstruction(site);
        if (Core.distance(site.x, site.y, builder.x, builder.y) > 2.5) return;
        site.workDone = safeNumber(site.workDone, 0) + 1;
        site.placedParts = site.workDone;
        addPersonActivityMetrics(builder, {buildWork: 1});
        if (site.workDone >= (site.workRequired || blueprint.workRequired || 1)) {
            const completedBuildingId = site.buildingId;
            const completedBuildingType = site.blueprintType;
            if (finishConstruction(site)) clearTask(builder, "completed", "building_completed", {buildingId: completedBuildingId, buildingType: completedBuildingType});
            return;
        }
        site.blockedTicks = 0;
        site.lastBuildTick = pixelTicks;
        const buildBanner = manager.settlementById.get(site.settlementId);
        if (buildBanner) addDomainExperience(buildBanner, "construction", 0.03);
    }

    function createBannerForFaction(faction) {
        if (!faction || faction.adults.length < 2) return null;
        const candidateAdults = faction.settlements.length ? faction.adults.filter((actor) => {
            const nearest = faction.settlements.reduce((best, settlement) => Math.min(best, Core.distance(actor.x, actor.y, settlement.x, settlement.y)), Infinity);
            return nearest > C.FACTION_JOIN_RADIUS * 1.5;
        }) : faction.adults;
        if (candidateAdults.length < 2) return null;
        let pair = null;
        for (let i = 0; i < candidateAdults.length && !pair; i++) {
            const a = candidateAdults[i];
            if (!solidGroundAt(a.x, a.y)) continue;
            for (let j = i + 1; j < candidateAdults.length; j++) {
                const b = candidateAdults[j];
                if (!solidGroundAt(b.x, b.y)) continue;
                if (Core.distance(a.x, a.y, b.x, b.y) <= C.CAMP_GROUP_RADIUS) {
                    pair = [a, b];
                    break;
                }
            }
        }
        if (!pair) {
            manager.foundingSince.delete(faction.id);
            return null;
        }
        const foundingKey = faction.id + ":" + Math.floor((pair[0].x + pair[1].x) / (C.CAMP_GROUP_RADIUS * 2));
        if (!manager.foundingSince.has(foundingKey)) manager.foundingSince.set(foundingKey, pixelTicks);
        if (pixelTicks - manager.foundingSince.get(foundingKey) < C.CAMP_STABLE_TICKS) return null;
        const centerX = Math.round((pair[0].x + pair[1].x) / 2);
        const centerY = Math.round((pair[0].y + pair[1].y) / 2);
        let coords = null;
        for (let r = 0; r <= 4 && !coords; r++) {
            const xs = r === 0 ? [centerX] : [centerX - r, centerX + r];
            for (let i = 0; i < xs.length; i++) {
                const y = findSurfaceY(xs[i], centerY);
                if (y !== null && validateBuildSite("hut", xs[i], y, faction.id, true)) {
                    coords = {x: xs[i], y: y};
                    break;
                }
            }
        }
        if (!coords) return null;
        createPixel("civ_banner", coords.x, coords.y);
        const banner = pixelByElementAt(coords.x, coords.y, "civ_banner");
        if (!banner) return null;
        banner.factionId = faction.id;
        banner.factionColor = faction.color;
        banner.settlementId = manager.nextSettlementId++;
        banner.stock = {food: 0, wood: 0, stone: 0, materials: {}, seeds: {}};
        ensureStock(banner);
        const capital = faction.settlements[0];
        banner.eraId = capital ? capital.eraId : DEFAULT_ERA_ID;
        banner.research = capital ? ensureResearchState(capital) : undefined;
        ensureResearchState(banner);
        banner.diplomacy = {};
        banner.housing = 4;
        // Founding stability already acts as the initial waiting period. Let a
        // new settlement reproduce as soon as it has two healthy adults, room,
        // and the reduced food cost; subsequent births use the normal cooldown.
        banner.birthReadyTick = pixelTicks;
        banner.territoryRadius = C.TERRITORY_BASE_RADIUS;
        banner.stage = "camp";
        banner.lastBirthTick = Math.max(-1000000, pixelTicks - C.BIRTH_COOLDOWN);
        banner.lastHostileTick = Math.max(-1000000, pixelTicks - 1000);
        banner.structureHp = 120;
        banner.structureMaxHp = 120;
        banner.foundedTick = pixelTicks;
        banner.townCenterActive = true;
        ensureBuildingMetadata(banner, "town_center");
        reserveBuildingTerritory(banner);
        ensureChronicle(banner);
        logSettlementEvent(banner, "settlement", "聚落形成并建立城镇中心", {settlementId: banner.settlementId, buildingId: banner.buildingId, x: banner.x, y: banner.y});
        setPixelColor(banner, faction.color);
        registerPixel(banner);
        for (let i = 0; i < faction.actors.length; i++) {
            if (!faction.settlements.length || Core.distance(faction.actors[i].x, faction.actors[i].y, banner.x, banner.y) <= C.FACTION_JOIN_RADIUS) faction.actors[i].settlementId = banner.settlementId;
        }
        manager.foundingSince.delete(foundingKey);
        return banner;
    }

    function preferredResourceKind(faction, banner) {
        if (!banner) return "food";
        const population = Math.max(1, safeNumber(banner.population, faction.population));
        const eraTarget = Core.eraPopulationTarget ? Core.eraPopulationTarget(eraIndexFor(faction)) : (World.populationTarget ? World.populationTarget(eraIndexFor(faction)) : 6);
        const foodReserve = 2 * Math.ceil(eraTarget / 2);
        const declining = safeNumber(banner.lastPopulation, population) > population;
        if (banner.stock.food < foodReserve && (declining || banner.stock.food < Math.ceil(foodReserve / 2))) return "food";
        if (hasTech(faction, "copper_prospecting") && materialAmount(banner.stock, "copper") < 8) return "copper";
        if (hasTech(faction, "tin_prospecting") && materialAmount(banner.stock, "tin") < 4) return "tin";
        if (hasTech(faction, "iron_prospecting") && materialAmount(banner.stock, "raw_iron") < 8) return "raw_iron";
        if (banner.stock.wood < 20 || (!faction.huts.length && banner.stock.wood < 12)) return "wood";
        if (hasTechnologyData() && !hasTech(faction, "stone_knapping")) return banner.stock.food < population * 10 ? "food" : "wood";
        if (banner.stock.stone < 12 || (!faction.workshops.length && banner.stock.stone < 8)) return "stone";
        return "food";
    }

    function actorCanOccupyAt(actor, x, y) {
        if (!actor || outOfBounds(x, y - 1) || outOfBounds(x, y)) return false;
        if (typeof canCreatureOccupy === "function") {
            if (!canCreatureOccupy(actor, x, y, actor._r)) return false;
            const head = getBodyHead(actor) || {element: "civ_head", factionId: actor.factionId, humanId: actor.humanId};
            if (!canCreatureOccupy(head, x, y - 1, actor._r)) return false;
        }
        else {
            const bodySpot = getPixel(x, y);
            const headSpot = getPixel(x, y - 1);
            if (bodySpot && bodySpot.humanId !== actor.humanId) return false;
            if (headSpot && headSpot.humanId !== actor.humanId) return false;
        }
        return true;
    }

    function actorCanStandAt(actor, x, y) {
        return actorCanOccupyAt(actor, x, y) && solidGroundAt(x, y);
    }

function harvestApproach(actor, resource) {
        const candidates = [];
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const x = resource.x + dx;
                const y = resource.y + dy;
                if (Core.distance(x, y, resource.x, resource.y) > 1.5 || !actorCanStandAt(actor, x, y)) continue;
                candidates.push({x: x, y: y, distance: Core.distance(actor.x, actor.y, x, y)});
            }
        }
        candidates.sort((a, b) => a.distance - b.distance);
        return candidates[0] || null;
    }

    function setHarvestTask(actor, found) {
        if (!found || !found.pixel || !found.approach) {
            clearTask(actor, "failed", "invalid_resource_target");
            return false;
        }
        const previousKey = actor.targetKey;
        const previousApproachX = actor.targetX;
        const previousApproachY = actor.targetY;
        setTask(actor, "harvest", found.pixel);
        actor.harvestX = found.pixel.x;
        actor.harvestY = found.pixel.y;
        actor.targetX = found.approach.x;
        actor.targetY = found.approach.y;
        if (manager.resourceReservations && !manager.resourceReservations.reserve(found, actor.humanId)) {
            clearTask(actor, "interrupted", "resource_reserved_by_other");
            return false;
        }
        actor.reservedResourceKey = found.key || (found.pixel.element + "@" + found.pixel.x + "," + found.pixel.y);
        if (previousKey === actor.targetKey && (previousApproachX !== actor.targetX || previousApproachY !== actor.targetY)) {
            actor.stuckCount = 0;
            actor.noProgressCount = 0;
            actor.bestTaskDistance = undefined;
        }
        return true;
    }

    function findResource(actor, wantedKind) {
        const banner = settlementForActor(actor);
        if (!banner) return null;
        if ((wantedKind === "copper" || wantedKind === "tin" || wantedKind === "raw_iron") && actor.role !== "miner") return null;
        const nodes = (manager.resourceIndex.get(wantedKind) || []).filter((node) => {
            if (!node.pixel || node.pixel.del || pixelsAt(node.x, node.y).indexOf(node.pixel) === -1) return false;
            if (pixelTicks < safeNumber(actor.blockedResourceUntil, 0) && actor.blockedResourceKey === node.x + "," + node.y + ":" + node.element) return false;
            return true;
        });
        const ordered = nodes.slice().sort((a, b) => {
            const ownerA = manager.territory && manager.territory.ownerAt(a.x);
            const ownerB = manager.territory && manager.territory.ownerAt(b.x);
            const zoneA = ownerA === actor.factionId ? 0 : (ownerA === null || ownerA === undefined ? 1 : 2);
            const zoneB = ownerB === actor.factionId ? 0 : (ownerB === null || ownerB === undefined ? 1 : 2);
            return zoneA - zoneB || Core.distance(actor.x, actor.y, a.x, a.y) - Core.distance(actor.x, actor.y, b.x, b.y);
        });
        for (let i = 0; i < ordered.length; i++) {
            const node = ordered[i];
            const owner = manager.territory && manager.territory.ownerAt(node.x);
            if (owner !== null && owner !== undefined && owner !== actor.factionId) continue;
            if (manager.resourceReservations && manager.resourceReservations.reservedBy(node) !== undefined && manager.resourceReservations.reservedBy(node) !== actor.humanId) continue;
            let approach = harvestApproach(actor, node.pixel);
            if (!approach && actor.element === "civ_body") approach = {x: node.x, y: node.y};
            if (!approach) continue;
            recordDiscovery(banner, node.descriptor.kind, 0.05);
            if (node.descriptor.seed || node.descriptor.seedOnly) recordDiscovery(banner, "seed", 0.05);
            if (node.descriptor.treeSeed || node.descriptor.treeSapling) recordDiscovery(banner, "tree_seed", 0.05);
            return Object.assign({}, node, {foreignOwner: null, approach});
        }
        return null;
    }

    function carriedAmount(actor) {
        if (World.carriedTotal) return World.carriedTotal(actor);
        return Math.max(0, safeNumber(actor.carryAmount, 0)) + (actor.carrySeed ? 1 : 0);
    }

    function carryCapacityFor(actor) {
        const faction = actor && manager.factionById.get(actor.factionId);
        return Math.max(C.BASE_CARRY_CAPACITY, safeNumber(faction && faction.techModifiers && faction.techModifiers.carryCapacity, C.BASE_CARRY_CAPACITY));
    }

    function ensureActorCarry(actor) {
        if (World.ensureBackpack) World.ensureBackpack(actor, carryCapacityFor(actor));
        else if (!actor.carry || typeof actor.carry !== "object") actor.carry = {};
        if (actor.carryKind && actor.carryAmount > 0) {
            actor.carry[actor.carryKind] = safeNumber(actor.carry[actor.carryKind], 0) + actor.carryAmount;
            actor.carryKind = null;
            actor.carryAmount = 0;
        }
        if (actor.carrySeed) {
            const seedKey = "seed:" + actor.carrySeed;
            actor.carry[seedKey] = safeNumber(actor.carry[seedKey], 0) + 1;
            actor.carrySeed = null;
        }
        return actor.carry;
    }

    function buildingsForSettlement(faction, settlementId, listName) {
        return (faction && faction[listName] || []).filter((building) => !building.del && building.settlementId === settlementId);
    }

    function deliveryDestination(actor, kind) {
        const banner = settlementForActor(actor);
        const faction = actor && manager.factionById.get(actor.factionId);
        if (!banner || !faction) return banner;
        const seed = String(kind || "").indexOf("seed:") === 0;
        const treeSapling = String(kind || "").indexOf("tree_sapling:") === 0;
        const key = treeSapling ? kind.slice(14) : (seed ? kind.slice(5) : kind);
        let lists = [];
        if (treeSapling) lists = ["lumberyards"];
        else if (seed) lists = ["farms", "granaries"];
        else if (key === "food") lists = ["granaries", "farms"];
        else if (key === "wood") lists = ["lumberyards"];
        else if (key === "stone") lists = ["quarries"];
        else if (key === "copper" || key === "tin" || key === "raw_iron") lists = ["quarries", "foundries"];
        else if (key === "charcoal") lists = ["kilns", "foundries"];
        else if (key === "bronze" || key === "iron" || key === "steel") lists = ["forges", "foundries", "workshops"];
        for (let i = 0; i < lists.length; i++) {
            const facilities = buildingsForSettlement(faction, banner.settlementId, lists[i]);
            if (facilities.length) return facilities.sort((a, b) => Core.distance(actor.x, actor.y, a.x, a.y) - Core.distance(actor.x, actor.y, b.x, b.y))[0];
        }
        return banner;
    }

    function deliverCarry(actor, requestedDestination) {
        const banner = settlementForActor(actor);
        const carry = ensureActorCarry(actor);
        const firstKind = Object.keys(carry).find((kind) => carry[kind] > 0);
        const destination = requestedDestination && isBuildingCorePixel(requestedDestination) ? requestedDestination : deliveryDestination(actor, firstKind);
        if (!banner || !destination || Core.distance(actor.x, actor.y, destination.x, destination.y) > 2.5) return false;
        ensureStock(banner);
        ensureChronicle(banner);
        const delivered = {};
        Object.keys(carry).forEach((kind) => {
            const amount = Math.max(0, safeNumber(carry[kind], 0));
            if (!amount) return;
            delivered[kind] = amount;
            if (kind.indexOf("tree_sapling:") === 0) {
                const seed = kind.slice(14);
                banner.stock.treeSaplings[seed] = safeNumber(banner.stock.treeSaplings[seed], 0) + amount;
                if (!banner.firstNaturalResources[kind]) {
                    banner.firstNaturalResources[kind] = true;
                    logSettlementEvent(banner, "first_resource", "首次采集树苗资源：" + seed, {resource: kind, amount});
                }
                return;
            }
            if (kind.indexOf("seed:") === 0) {
                const seed = kind.slice(5);
                banner.stock.seeds[seed] = safeNumber(banner.stock.seeds[seed], 0) + amount;
                if (!banner.firstNaturalResources[kind]) {
                    banner.firstNaturalResources[kind] = true;
                    logSettlementEvent(banner, "first_resource", "首次采集资源：" + seed, {resource: kind, amount});
                }
                return;
            }
            addMaterial(banner.stock, kind, amount, actor.carryElement);
            const research = ensureResearchState(banner);
            research.discoveries[kind] = Math.max(1, safeNumber(research.discoveries[kind], 0) + amount);
            research.milestones.resourceDeliveries = safeNumber(research.milestones.resourceDeliveries, 0) + 1;
            if (hasTech(banner, "tally_marks")) research.knowledge += 0.5;
            if (!banner.firstNaturalResources[kind]) {
                banner.firstNaturalResources[kind] = true;
                logSettlementEvent(banner, "first_resource", "首次采集资源：" + kind, {resource: kind, amount});
            }
        });
        Object.keys(carry).forEach((kind) => { delete carry[kind]; });
        actor.carryKind = null;
        actor.carryElement = null;
        actor.carryAmount = 0;
        actor.carrySeed = null;
        addPersonActivityMetrics(actor, {resourcesDelivered: delivered});
        const resume = actor.resumeAfterDelivery;
        delete actor.resumeAfterDelivery;
        clearTask(actor, "completed", "resources_delivered", {destinationBuildingId: destination.buildingId || null, destinationType: destination.buildingType || destination.element, destinationX: destination.x, destinationY: destination.y});
        if (resume && resume.task && resume.task !== "deliver") {
            setTask(actor, resume.task, {x: resume.targetX, y: resume.targetY, kind: resume.targetKind});
            actor.targetId = resume.targetId;
            actor.targetKind = resume.targetKind;
            actor.harvestX = resume.harvestX;
            actor.harvestY = resume.harvestY;
        }
        return true;
    }

    function resourceDropElement(kind, sourceElement) {
        if (sourceElement && elements[sourceElement]) return sourceElement;
        const fallback = {wood: "wood", stone: "rock", copper: "copper", tin: "tin", raw_iron: elements.iron_ore ? "iron_ore" : "iron", food: "meat", charcoal: "charcoal"};
        return fallback[kind] && elements[fallback[kind]] ? fallback[kind] : null;
    }

    function queueResourceDrops(kind, sourceElement, amount, x, y, metadata) {
        const element = resourceDropElement(kind, sourceElement);
        let remaining = Math.max(0, Math.floor(amount));
        if (!element || !remaining) return;
        for (let radius = 0; radius <= 4 && remaining; radius++) {
            for (let dx = -radius; dx <= radius && remaining; dx++) {
                for (let dy = -radius; dy <= radius && remaining; dy++) {
                    if (Math.max(Math.abs(dx), Math.abs(dy)) !== radius) continue;
                    const px = x + dx;
                    const py = y + dy;
                    if (!outOfBounds(px, py) && isEmpty(px, py)) {
                        createPixel(element, px, py, Object.assign({_civResourceDrop: true, resourceKind: kind}, metadata || {}));
                        const drop = getPixel(px, py);
                        if (drop) Object.assign(drop, {_civResourceDrop: true, resourceKind: kind}, metadata || {});
                        remaining--;
                    }
                }
            }
        }
        if (remaining) manager.pendingResourceDrops.push({kind, element, amount: remaining, x, y, metadata: metadata ? Object.assign({}, metadata) : null});
    }

    function getTreeAt(x, y) {
        const pixel = pixelsAt(Number(x), Number(y)).find((candidate) => candidate && Number.isFinite(candidate.treeId));
        return pixel ? manager.treeById.get(pixel.treeId) || null : null;
    }

    function fellTree(treeOrX, y, actor) {
        const tree = typeof treeOrX === "object" && treeOrX && Array.isArray(treeOrX.pixels) ? treeOrX : getTreeAt(treeOrX, y);
        if (!tree) return null;
        const woodPixels = (tree.woodPixels || tree.pixels.filter((pixel) => WOOD_BEARING_TREE_ELEMENTS.has(pixel.element))).filter((pixel) => pixel && !pixel.del);
        const allPixels = tree.pixels.filter((pixel) => pixel && !pixel.del);
        const dropLocations = woodPixels.map((pixel) => ({x: pixel.x, y: pixel.y}));
        allPixels.forEach((pixel) => deleteExactPixel(pixel));
        dropLocations.forEach((location) => queueResourceDrops("wood", "civ_wood_resource", 1, location.x, location.y, {treeSapling: tree.seed || "sapling", sourceTreeId: tree.id}));
        manager.treeById.delete(tree.id);
        if (actor) addPersonActivityMetrics(actor, {felledTrees: 1, felledWood: woodPixels.length});
        return {treeId: tree.id, woodDrops: woodPixels.length, removedPixels: allPixels.length, treeSapling: tree.seed || "sapling"};
    }

    function fellTreeAt(x, y, actor) {
        return fellTree(Number(x), Number(y), actor);
    }

    function addYieldWithFraction(actor, kind, rawAmount) {
        if (!actor.yieldFractions || typeof actor.yieldFractions !== "object") actor.yieldFractions = {};
        const total = Math.max(0, safeNumber(rawAmount, 0)) + safeNumber(actor.yieldFractions[kind], 0);
        const whole = Math.floor(total + 1e-9);
        actor.yieldFractions[kind] = total - whole;
        return whole;
    }

    function harvestTarget(actor) {
        const harvestX = Number.isFinite(actor.harvestX) ? actor.harvestX : actor.targetX;
        const harvestY = Number.isFinite(actor.harvestY) ? actor.harvestY : actor.targetY;
        if (!Number.isFinite(harvestX) || !Number.isFinite(harvestY)) {
            clearTask(actor, "failed", "invalid_target_coordinates");
            return false;
        }
        const target = pixelsAt(harvestX, harvestY).find((pixel) => resourceDescriptor(pixel)) || null;
        const descriptor = resourceDescriptor(target);
        if (!target || !descriptor || (actor.targetKind && target.element !== actor.targetKind)) {
            clearTask(actor, "interrupted", "resource_disappeared");
            return false;
        }
        if (Core.distance(actor.x, actor.y, target.x, target.y) > 1.5) return false;
        actor.harvestProgress = (actor.harvestProgress || 0) + C.THINK_INTERVAL;
        const faction = manager.factionById.get(actor.factionId);
        const mods = faction && faction.techModifiers || computeTechModifiers(faction);
        let harvestTicks = descriptor.harvestTicks;
        harvestTicks *= safeNumber(mods.harvestSpeed, 1);
        if (descriptor.kind === "wood") harvestTicks *= safeNumber(mods.woodHarvestSpeed, 1);
        if (descriptor.kind === "stone") harvestTicks *= safeNumber(mods.stoneHarvestSpeed, 1);
        const specialist = descriptor.kind === "food" ? (actor.role === "food" || actor.role === "farmer" || actor.role === "hunter") :
            (descriptor.kind === "wood" ? (actor.role === "wood" || actor.role === "forester") :
                (descriptor.kind === "stone" || NONRENEWABLE_KINDS.has(descriptor.kind) ? actor.role === "miner" : true));
        if (!specialist) harvestTicks *= 2;
        harvestTicks /= safeNumber(mods.roleWorkSpeed, 1);
        if (actor.harvestProgress < Math.max(C.THINK_INTERVAL, harvestTicks)) return true;
        const harvestedElement = target.element;
        const tree = Number.isFinite(target.treeId) ? manager.treeById.get(target.treeId) : null;
        if (tree && tree.base === target) {
            const result = fellTree(tree, undefined, actor);
            const settlement = settlementForActor(actor);
            if (settlement) {
                const research = ensureResearchState(settlement);
                research.milestones.harvests = safeNumber(research.milestones.harvests, 0) + 1;
            }
            addPersonActivityMetrics(actor, {harvestedBlocks: result ? result.removedPixels : 0, resourcesDropped: {wood: result ? result.woodDrops : 0}});
            clearTask(actor, "completed", "tree_felled", {sourceElement: harvestedElement, sourceX: harvestX, sourceY: harvestY, treeId: tree.id, woodDrops: result ? result.woodDrops : 0});
            return true;
        }
        if (descriptor.harvestInto && elements[descriptor.harvestInto]) changePixel(target, descriptor.harvestInto);
        else deleteExactPixel(target);
        const carry = ensureActorCarry(actor);
        const capacity = carryCapacityFor(actor);
        const settlement = settlementForActor(actor);
        const resourcesCollected = {};
        const resourcesDropped = {};
        if (settlement) {
            const research = ensureResearchState(settlement);
            research.milestones.harvests = safeNumber(research.milestones.harvests, 0) + 1;
        }
        if (descriptor.seedOnly) {
            const result = World.addCarry ? World.addCarry(actor, "seed:" + descriptor.seed, 1, capacity) : {accepted: 0, overflow: 1};
            resourcesCollected["seed:" + descriptor.seed] = result.accepted;
            resourcesDropped["seed:" + descriptor.seed] = result.overflow;
            recordFirstHarvest(settlement, "seed:" + descriptor.seed, result.accepted);
            if (result.overflow) queueResourceDrops(descriptor.kind, harvestedElement, result.overflow, harvestX, harvestY);
        }
        else {
            actor.carryElement = harvestedElement;
            const amount = 1;
            const result = World.addCarry ? World.addCarry(actor, descriptor.kind, amount, capacity) : {accepted: 0, overflow: amount};
            resourcesCollected[descriptor.kind] = safeNumber(resourcesCollected[descriptor.kind], 0) + result.accepted;
            resourcesDropped[descriptor.kind] = safeNumber(resourcesDropped[descriptor.kind], 0) + result.overflow;
            recordFirstHarvest(settlement, descriptor.kind, result.accepted);
            if (result.overflow) queueResourceDrops(descriptor.kind, harvestedElement, result.overflow, harvestX, harvestY);
            const treeSapling = descriptor.treeSapling;
            const saplingChance = Math.min(1, C.TREE_SAPLING_CHANCE * (1 + safeNumber(mods.seedDropBonus, 0)));
            if (treeSapling && result.accepted > 0 && Math.random() < saplingChance) {
                const saplingKind = "tree_sapling:" + treeSapling;
                const seedResult = World.addCarry ? World.addCarry(actor, saplingKind, 1, capacity) : {accepted: 0, overflow: 1};
                resourcesCollected[saplingKind] = safeNumber(resourcesCollected[saplingKind], 0) + seedResult.accepted;
                resourcesDropped[saplingKind] = safeNumber(resourcesDropped[saplingKind], 0) + seedResult.overflow;
                recordFirstHarvest(settlement, saplingKind, seedResult.accepted);
                if (seedResult.overflow) queueResourceDrops("tree_sapling:" + treeSapling, treeSapling, seedResult.overflow, harvestX, harvestY);
            }
            if (descriptor.kind === "wood" && result.accepted > 0) {
                for (let index = 0; index < result.accepted; index++) {
                    if (Math.random() >= C.WOOD_FOOD_BONUS_CHANCE) continue;
                    const foodResult = World.addCarry ? World.addCarry(actor, "food", 1, capacity) : {accepted: 0, overflow: 1};
                    resourcesCollected.food = safeNumber(resourcesCollected.food, 0) + foodResult.accepted;
                    resourcesDropped.food = safeNumber(resourcesDropped.food, 0) + foodResult.overflow;
                    recordFirstHarvest(settlement, "food", foodResult.accepted);
                    if (foodResult.overflow) queueResourceDrops("food", null, foodResult.overflow, harvestX, harvestY);
                }
            }
        }
        addPersonActivityMetrics(actor, {harvestedBlocks: 1, resourcesCollected: resourcesCollected, resourcesDropped: resourcesDropped});
        clearTask(actor, "completed", "resource_harvested", {sourceElement: harvestedElement, sourceX: harvestX, sourceY: harvestY});
        return true;
    }

    function matureCropAt(plot) {
        for (let y = plot.y; y >= plot.y - 5; y--) {
            const pixel = getPixel(plot.x, y);
            const info = pixel && elements[pixel.element];
            if (pixel && info && info.isFood && typeof info.seed === "string") return pixel;
        }
        return null;
    }

    function chooseSeed(stock) {
        if (!stock || !stock.seeds) return null;
        const seeds = Object.keys(stock.seeds).filter((seed) => stock.seeds[seed] > 0 && elements[seed]);
        return seeds.length ? seeds[0] : null;
    }

    function chooseTreeSeed(stock) {
        if (!stock || !stock.treeSaplings) return null;
        return ["sapling", "pinecone", "bamboo_plant"].find((seed) => safeNumber(stock.treeSaplings[seed], 0) > 0 && elements[seed]) || null;
    }

    function treeNear(x, y, radius) {
        const treeElements = new Set(["wood", "tree_branch", "evergreen", "sapling", "pinecone", "bamboo", "bamboo_plant"]);
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                const pixel = getPixel(x + dx, y + dy);
                if (pixel && treeElements.has(pixel.element)) return true;
            }
        }
        return false;
    }

    function findTreePlantSpot(banner) {
        if (!banner) return null;
        const radius = C.TREE_PLANT_SEARCH_RADIUS;
        for (let distance = 4; distance <= radius; distance++) {
            const direction = (distance + banner.settlementId) % 2 ? 1 : -1;
            const xs = [banner.x + distance * direction, banner.x - distance * direction];
            for (let i = 0; i < xs.length; i++) {
                const y = findSurfaceY(xs[i], banner.y);
                if (manager.territory && manager.territory.ownerAt(xs[i]) !== banner.factionId) continue;
                if (y === null || !isEmpty(xs[i], y) || treeNear(xs[i], y, C.TREE_PLANT_SPACING)) continue;
                const soil = getPixel(xs[i], y + 1);
                if (soil && SOIL_ELEMENTS.has(soil.element)) return {x: xs[i], y: y, kind: "tree_seed"};
            }
        }
        return null;
    }

    function handlePlantTreeTask(actor, banner) {
        if (!banner || !Number.isFinite(actor.targetX) || !Number.isFinite(actor.targetY)) return clearTask(actor, "failed", !banner ? "no_settlement" : "invalid_site");
        const seed = chooseTreeSeed(banner.stock);
        if (!seed) return clearTask(actor, "failed", "no_tree_seed");
        if (Core.distance(actor.x, actor.y, actor.targetX, actor.targetY) > 1.5) {
            moveRelationToward(actor, actor.targetX, actor.targetY, false);
            return;
        }
        let plantedTree = false;
        if (isEmpty(actor.targetX, actor.targetY) && !treeNear(actor.targetX, actor.targetY, C.TREE_PLANT_SPACING)) {
            createPixel(seed, actor.targetX, actor.targetY);
            const planted = getPixel(actor.targetX, actor.targetY);
            if (planted && planted.element === seed) {
                planted.civPlantedTreeId = manager.nextTreeId++;
                planted.civTreeOriginX = actor.targetX;
                planted.civTreeOriginY = actor.targetY;
                banner.stock.treeSaplings[seed]--;
                addDomainExperience(banner, "production", 0.1);
                ensureResearchState(banner).milestones.treesPlanted = safeNumber(banner.research.milestones.treesPlanted, 0) + 1;
                plantedTree = true;
            }
        }
        clearTask(actor, plantedTree ? "completed" : "failed", plantedTree ? "tree_planted" : "site_blocked", {seed: seed, siteX: actor.targetX, siteY: actor.targetY, treesPlanted: plantedTree ? 1 : 0});
    }

    function handleFarmTask(actor, farm, banner) {
        if (!farm || farm.del || !farm.plots || !banner) {
            clearTask(actor, "interrupted", "farm_unavailable");
            return;
        }
        let chosen = null;
        let crop = null;
        for (let i = 0; i < farm.plots.length; i++) {
            const plot = farm.plots[i];
            crop = matureCropAt(plot);
            if (crop) {
                chosen = plot;
                break;
            }
            if (!chosen && isEmpty(plot.x, plot.y) && chooseSeed(banner.stock)) chosen = plot;
        }
        if (!chosen) {
            clearTask(actor, "completed", "no_farm_work");
            return;
        }
        if (crop) {
            const approach = harvestApproach(actor, crop);
            if (!approach) return clearTask(actor, "failed", "crop_unreachable");
            finishPersonActivity(actor, "completed", "crop_selected", {crop: crop.element, cropX: crop.x, cropY: crop.y});
            setHarvestTask(actor, {pixel: crop, approach: approach});
            actor.harvestFarm = true;
            return;
        }
        const approach = harvestApproach(actor, chosen);
        if (!approach) return clearTask(actor, "failed", "plot_unreachable");
        actor.targetX = approach.x;
        actor.targetY = approach.y;
        if (Core.distance(actor.x, actor.y, approach.x, approach.y) > 0.5) return;
        const seed = chooseSeed(banner.stock);
        let plantedCrop = false;
        if (seed && banner.stock.seeds[seed] > 0 && isEmpty(chosen.x, chosen.y)) {
            createPixel(seed, chosen.x, chosen.y);
            const planted = getPixel(chosen.x, chosen.y);
            if (planted && planted.element === seed) {
                banner.stock.seeds[seed]--;
                plantedCrop = true;
            }
        }
        clearTask(actor, plantedCrop ? "completed" : "failed", plantedCrop ? "crop_planted" : "plot_blocked", {seed: seed, plotX: chosen.x, plotY: chosen.y, cropsPlanted: plantedCrop ? 1 : 0});
    }

    function enemyDefendersRemain(actor) {
        if (!actor || actor.warRole !== "attacker") return false;
        for (const other of manager.actors) {
            if (!other || other.del || other.dead || other.factionId === actor.factionId || other.warRole !== "defender") continue;
            if (!atWar(actor.factionId, other.factionId)) continue;
            if (Number.isFinite(actor.warFrontId) && other.factionId !== actor.warFrontId) continue;
            return true;
        }
        return false;
    }

    function currentEnemy(actor, radius) {
        const visibleRadius = Math.min(radius, visionRangeFor(actor));
        const defendersOnly = enemyDefendersRemain(actor);
        const enemies = nearbyActors(actor.x, actor.y, visibleRadius, (other) => {
            if (other.humanId === actor.humanId || !atWar(actor.factionId, other.factionId) || !mutualLineOfSight(actor, other)) return false;
            if (actor.warRole === "attacker" && Number.isFinite(actor.warFrontId) && other.factionId !== actor.warFrontId) return false;
            if (defendersOnly && other.warRole !== "defender") return false;
            if (actor.warRole === "defender" && (!manager.territory || manager.territory.ownerAt(other.x) !== actor.factionId)) return false;
            return true;
        });
        enemies.sort((a, b) => {
            const priorityA = a.warRole === "defender" ? 0 : (a.element === "civ_child" ? 2 : 1);
            const priorityB = b.warRole === "defender" ? 0 : (b.element === "civ_child" ? 2 : 1);
            return priorityA - priorityB || Core.distance(actor.x, actor.y, a.x, a.y) - Core.distance(actor.x, actor.y, b.x, b.y);
        });
        return enemies[0] || null;
    }

    function currentEnemyStructure(actor, radius) {
        let best = null;
        let bestDistance = Infinity;
        const inspect = (pixel) => {
            if (!pixel || pixel.del || pixel.buildingState === "destroyed" || pixel.townCenterActive === false || !Number.isFinite(pixel.factionId) || !atWar(actor.factionId, pixel.factionId)) return;
            if (actor.warRole === "attacker" && Number.isFinite(actor.warFrontId) && pixel.factionId !== actor.warFrontId) return;
            const distance = Core.distance(actor.x, actor.y, pixel.x, pixel.y);
            if (distance <= radius && distance < bestDistance) {
                best = pixel;
                bestDistance = distance;
            }
        };
        manager.settlements.forEach(inspect);
        manager.structures.forEach((pixel) => {
            if (STRUCTURE_CORES.has(pixel.element)) inspect(pixel);
        });
        return best;
    }

    function strategicEnemy(actor) {
        const candidates = [];
        const defendersOnly = enemyDefendersRemain(actor);
        manager.actors.forEach((other) => {
            if (!other || other.del || other.dead || other.factionId === actor.factionId || !atWar(actor.factionId, other.factionId)) return;
            if (actor.warRole === "attacker" && Number.isFinite(actor.warFrontId) && other.factionId !== actor.warFrontId) return;
            if (defendersOnly && other.warRole !== "defender") return;
            if (actor.warRole === "defender" && (!manager.territory || manager.territory.ownerAt(other.x) !== actor.factionId)) return;
            candidates.push(other);
        });
        candidates.sort((a, b) => {
            const priorityA = a.warRole === "defender" ? 0 : (a.element === "civ_child" ? 2 : 1);
            const priorityB = b.warRole === "defender" ? 0 : (b.element === "civ_child" ? 2 : 1);
            return priorityA - priorityB || Core.distance(actor.x, actor.y, a.x, a.y) - Core.distance(actor.x, actor.y, b.x, b.y);
        });
        return candidates[0] || null;
    }

    function assignActorTask(actor) {
        if (!actor || actor.del || actor.dead || actor.element !== "civ_body") return;
        const banner = settlementForActor(actor);
        const faction = manager.factionById.get(actor.factionId);
        const lockedEnemy = Number.isFinite(actor.combatTargetId) ? manager.actorById.get(actor.combatTargetId) : null;
        const lockedAllowed = lockedEnemy && !lockedEnemy.dead && lockedEnemy.factionId !== actor.factionId &&
            (atWar(actor.factionId, lockedEnemy.factionId) || retaliationAllowed(actor, lockedEnemy)) &&
            (actor.warRole !== "defender" || manager.territory && manager.territory.ownerAt(lockedEnemy.x) === actor.factionId);
        const enemy = lockedAllowed ? lockedEnemy : currentEnemy(actor, actor.role === "warrior" || actor.warRole ? 30 : 10);
        if (enemy) {
            actor.combatTargetId = enemy.humanId;
            if (actor.role === "warrior" || actor.warRole || actor.underAttackUntil > pixelTicks) setTask(actor, "combat", enemy);
            else setTask(actor, "flee", enemy);
            return;
        }
        if (carriedAmount(actor) >= carryCapacityFor(actor) && banner) {
            const firstKind = Object.keys(ensureActorCarry(actor)).find((kind) => actor.carry[kind] > 0);
            const destination = deliveryDestination(actor, firstKind);
            setTask(actor, "deliver", destination);
            deliverCarry(actor, destination);
            return;
        }
        if (actor.warRole) {
            const warTarget = strategicEnemy(actor);
            if (warTarget) {
                actor.combatTargetId = warTarget.humanId;
                setTask(actor, "combat", warTarget);
                return;
            }
            if (actor.warRole === "attacker") {
                const structureTarget = currentEnemyStructure(actor, Infinity);
                if (structureTarget) {
                    setTask(actor, "siege", structureTarget);
                    return;
                }
            }
            if (banner) { setTask(actor, "patrol", banner); return; }
        }
        if (actor.role === "builder" && faction && faction.constructionSites.length) {
            setTask(actor, "build", faction.constructionSites[0]);
            return;
        }
        if (actor.role === "farmer" && faction && faction.farms.length && banner) {
            const farm = faction.farms[0];
            setTask(actor, "farm", farm);
            return;
        }
        if (actor.role === "forester" && banner) {
            const plantingSpot = chooseTreeSeed(banner.stock) && findTreePlantSpot(banner);
            if (plantingSpot) {
                setTask(actor, "plant_tree", plantingSpot);
                return;
            }
        }
        if (faction && (actor.role === "artisan" || actor.role === "industry" || actor.role === "scholar" || actor.role === "merchant")) {
            let facilities = [];
            if (actor.role === "artisan") facilities = faction.workshops.concat(faction.forges);
            else if (actor.role === "industry") facilities = faction.kilns.concat(faction.foundries, faction.forges);
            else if (actor.role === "scholar") facilities = faction.libraries;
            else facilities = faction.markets;
            const localFacility = facilities.filter((building) => building.settlementId === actor.settlementId).sort((a, b) => Core.distance(actor.x, actor.y, a.x, a.y) - Core.distance(actor.x, actor.y, b.x, b.y))[0];
            if (localFacility) { setTask(actor, "facility", localFacility); return; }
            if (banner) { setTask(actor, "patrol", banner); return; }
        }
        let wanted = preferredResourceKind(faction || {population: 1}, banner);
        if (actor.role === "food" || actor.role === "farmer" || actor.role === "hunter") wanted = "food";
        else if (actor.role === "wood" || actor.role === "forester") wanted = "wood";
        else if (actor.role === "miner") {
            const desired = [
                hasTech(faction, "iron_prospecting") && materialAmount(banner.stock, "raw_iron") < 8 ? "raw_iron" : null,
                hasTech(faction, "copper_prospecting") && materialAmount(banner.stock, "copper") < 8 ? "copper" : null,
                hasTech(faction, "tin_prospecting") && materialAmount(banner.stock, "tin") < 4 ? "tin" : null,
                "stone"
            ].filter(Boolean);
            wanted = desired.find((kind) => (manager.resourceIndex.get(kind) || []).length) || "stone";
        }
        const resource = findResource(actor, wanted);
        if (resource) setHarvestTask(actor, resource);
        else if (carriedAmount(actor) > 0 && banner) {
            const firstKind = Object.keys(ensureActorCarry(actor)).find((kind) => actor.carry[kind] > 0);
            setTask(actor, "deliver", deliveryDestination(actor, firstKind));
        }
        else if (banner && (actor.role === "warrior" || actor.role === "guard" || actor.role === "builder")) setTask(actor, "patrol", banner);
        else if (banner) {
            setTask(actor, "search_resource", banner);
            actor.targetKind = wanted;
        }
        else setTask(actor, "explore", null);
    }

    function tunnelAt(x, y) {
        return pixelByElementAt(x, y, "civ_tunnel");
    }

    function canTunnelPixel(pixel) {
        if (!pixel || pixel.del || isBuildingCorePixel(pixel) || getActorFromPixel(pixel)) return false;
        const descriptor = resourceDescriptor(pixel);
        if (descriptor && (descriptor.kind === "stone" || NONRENEWABLE_KINDS.has(descriptor.kind))) return true;
        const info = elements[pixel.element] || {};
        return info.state === "solid" && (SOIL_ELEMENTS.has(pixel.element) || /(?:dirt|soil|clay|sand|rock|stone|ore|gravel|basalt|limestone)/.test(pixel.element));
    }

    function collectTunnelResource(actor, pixel) {
        if (!actor || actor.role !== "miner") return;
        const descriptor = resourceDescriptor(pixel);
        if (!descriptor || descriptor.kind === "wood" || descriptor.kind === "food") return;
        const amount = Math.max(1, Math.floor(safeNumber(descriptor.yield, 1)));
        ensureActorCarry(actor);
        const result = World.addCarry ? World.addCarry(actor, descriptor.kind, amount, carryCapacityFor(actor)) : {accepted: 0, overflow: amount};
        addPersonActivityMetrics(actor, {resourcesCollected: {[descriptor.kind]: result.accepted}, resourcesDropped: {[descriptor.kind]: result.overflow}});
        recordFirstHarvest(settlementForActor(actor), descriptor.kind, result.accepted);
        if (result.overflow) queueResourceDrops(descriptor.kind, pixel.element, result.overflow, pixel.x, pixel.y);
    }

    function carveTunnelCell(actor, x, y) {
        if (outOfBounds(x, y)) return false;
        const base = getPixel(x, y);
        if (base && base.element === "civ_tunnel") return true;
        if (base) {
            const occupyingActor = getActorFromPixel(base);
            if (occupyingActor && occupyingActor.humanId === actor.humanId) {
                if (typeof detachPixelFromGrid !== "function" || typeof attachPixelToGrid !== "function") return true;
                detachPixelFromGrid(base, false);
                const tunnel = createPixel("civ_tunnel", x, y, {dugTick: pixelTicks, dugByFactionId: actor.factionId});
                if (!tunnel || !attachPixelToGrid(base, x, y, true)) return false;
                addPersonActivityMetrics(actor, {tunnelCells: 1});
                return true;
            }
            if (!canTunnelPixel(base)) return false;
            collectTunnelResource(actor, base);
            changePixel(base, "civ_tunnel");
            const tunnel = getPixel(x, y);
            if (tunnel) { tunnel.dugTick = pixelTicks; tunnel.dugByFactionId = actor.factionId; }
            addPersonActivityMetrics(actor, {tunnelCells: 1});
            return true;
        }
        createPixel("civ_tunnel", x, y);
        const tunnel = getPixel(x, y);
        if (tunnel) { tunnel.dugTick = pixelTicks; tunnel.dugByFactionId = actor.factionId; }
        if (tunnel) addPersonActivityMetrics(actor, {tunnelCells: 1});
        return !!tunnel;
    }

    function digToward(actor, relation, targetX, targetY) {
        if (actor.element !== "civ_body") return false;
        if (actor.role === "miner" && carriedAmount(actor) >= carryCapacityFor(actor)) {
            const carry = ensureActorCarry(actor);
            const firstKind = Object.keys(carry).find((kind) => carry[kind] > 0);
            const destination = deliveryDestination(actor, firstKind);
            actor.resumeAfterDelivery = {
                task: actor.task,
                targetX: actor.targetX,
                targetY: actor.targetY,
                targetId: actor.targetId,
                targetKind: actor.targetKind,
                harvestX: actor.harvestX,
                harvestY: actor.harvestY
            };
            setTask(actor, "deliver", destination);
            return false;
        }
        const dxTotal = targetX - actor.x;
        const dyTotal = targetY - actor.y;
        let dx = Math.sign(dxTotal);
        let dy = Math.sign(dyTotal);
        if (!dx && !dy) dx = actor.dir || 1;
        const banner = settlementForActor(actor);
        if (banner && !banner.firstTunnelLogged) {
            banner.firstTunnelLogged = true;
            logSettlementEvent(banner, "tunnel", "首次开挖矿洞", {x: actor.x, y: actor.y, humanId: actor.humanId});
        }
        actor.pathStage = "tunnel";
        setPersonActivityPhase(actor, "tunnel");
        const bodyX = actor.x + dx;
        const bodyY = actor.y + dy;
        const headX = bodyX;
        const headY = bodyY - 1;
        const carvedBody = carveTunnelCell(actor, bodyX, bodyY);
        const carvedHead = carveTunnelCell(actor, headX, headY);
        if (carvedBody && carvedHead && tryMoveRelation(relation, dx, dy, true)) return true;
        return carvedBody || carvedHead;
    }

    function blockingWallAt(actor, x, y) {
        const relationId = actor && actor._r;
        return pixelsAt(x, y).find((pixel) => {
            if (!pixel || pixel.del || pixel._r === relationId) return false;
            const info = elements[pixel.element] || {};
            if (info.state !== "solid") return false;
            if (typeof isCreaturePixel === "function" && isCreaturePixel(pixel)) return false;
            if (typeof isPassableVegetationPixel === "function" && isPassableVegetationPixel(pixel)) return false;
            if (typeof isNonBlockingPixel === "function" && isNonBlockingPixel(pixel)) return false;
            const probe = {element: "civ_body", factionId: actor.factionId, humanId: actor.humanId};
            return typeof pixelsCanOverlap !== "function" || !pixelsCanOverlap(probe, pixel);
        }) || null;
    }

    function climbSupportAt(actor, x, y, side) {
        if (side !== -1 && side !== 1) return false;
        return !!(blockingWallAt(actor, x + side, y) || blockingWallAt(actor, x + side, y - 1));
    }

    function activeClimbSide(actor) {
        const side = actor && actor.pathCache && actor.pathCache.climbSide;
        if ((side === -1 || side === 1) && climbSupportAt(actor, actor.x, actor.y, side)) return side;
        if (actor && actor.pathCache) actor.pathCache.climbSide = 0;
        return 0;
    }

    function ensureNavigationState(actor) {
        if (!actor.pathCache || actor.pathCache.version !== 1 || !Array.isArray(actor.pathCache.edges) || actor.pathCache.edges.length > 24) {
            actor.pathCache = {version: 1, edges: [], cursor: 0, climbSide: 0, stallSinceTick: pixelTicks};
        }
        return actor.pathCache;
    }

    function invalidateNavigation(actor) {
        if (!actor) return;
        const side = actor.pathCache && actor.pathCache.climbSide;
        actor.pathCache = {version: 1, edges: [], cursor: 0, climbSide: side === -1 || side === 1 ? side : 0, stallSinceTick: pixelTicks};
    }

    function navigationExcavationAllowed(actor) {
        if (!actor) return false;
        if (actor.role === "miner") return true;
        if (actor.task !== "harvest") return false;
        const target = Number.isFinite(actor.harvestX) && Number.isFinite(actor.harvestY) ? pixelsAt(actor.harvestX, actor.harvestY).find((pixel) => resourceDescriptor(pixel)) : null;
        const descriptor = resourceDescriptor(target);
        return !!(descriptor && (descriptor.kind === "stone" || NONRENEWABLE_KINDS.has(descriptor.kind)));
    }

    function executeNavigationEdge(actor, dx, dy, stage, climbSide) {
        const relation = actor && actor._r !== undefined ? getRelation(actor._r) : null;
        if (!relation || !actorCanOccupyAt(actor, actor.x + dx, actor.y + dy)) return false;
        if (!tryMoveRelation(relation, dx, dy, true)) return false;
        actor.pathStage = stage;
        setPersonActivityPhase(actor, stage === "step" || stage === "top" ? "climb" : stage);
        if (dx) actor.dir = Math.sign(dx);
        const nav = ensureNavigationState(actor);
        nav.climbSide = climbSide === -1 || climbSide === 1 ? climbSide : 0;
        nav.lastMoveTick = pixelTicks;
        nav.stallSinceTick = pixelTicks;
        return true;
    }

    let deferAdultLocomotion = false;

    function moveRelationToward(actor, targetX, targetY, away) {
        if (deferAdultLocomotion) {
            actor.targetX = targetX;
            actor.targetY = targetY;
            actor.navigationAway = !!away;
            return false;
        }
        if (!Number.isFinite(targetX) || !Number.isFinite(targetY)) {
            if (actor.playerOrder) clearPlayerOrder(actor, "failed", "invalid_navigation_target");
            else clearTask(actor, "failed", "invalid_navigation_target");
            return false;
        }
        const nav = ensureNavigationState(actor);
        const horizontal = Math.sign(targetX - actor.x) * (away ? -1 : 1);
        const vertical = Math.sign(targetY - actor.y) * (away ? -1 : 1);
        let side = activeClimbSide(actor);

        if (side) {
            if (horizontal === side && actorCanStandAt(actor, actor.x + side, actor.y - 1) && executeNavigationEdge(actor, side, -1, "top", 0)) return true;
            if (vertical !== 0 && actorCanOccupyAt(actor, actor.x, actor.y + vertical) && climbSupportAt(actor, actor.x, actor.y + vertical, side) && executeNavigationEdge(actor, 0, vertical, "climb", side)) return true;
            if (vertical === 0 && actorCanOccupyAt(actor, actor.x, actor.y - 1) && climbSupportAt(actor, actor.x, actor.y - 1, side) && executeNavigationEdge(actor, 0, -1, "climb", side)) return true;
            nav.climbSide = 0;
            side = 0;
        }

        if (horizontal && executeNavigationEdge(actor, horizontal, 0, "flat", 0)) return true;
        if (horizontal && actorCanStandAt(actor, actor.x + horizontal, actor.y - 1) && executeNavigationEdge(actor, horizontal, -1, "step", 0)) return true;
        if (horizontal && climbSupportAt(actor, actor.x, actor.y, horizontal)) {
            nav.climbSide = horizontal;
            if (actorCanOccupyAt(actor, actor.x, actor.y - 1) && climbSupportAt(actor, actor.x, actor.y - 1, horizontal) && executeNavigationEdge(actor, 0, -1, "climb", horizontal)) return true;
        }
        if (horizontal && targetY > actor.y && actorCanStandAt(actor, actor.x + horizontal, actor.y + 1) && executeNavigationEdge(actor, horizontal, 1, "down", 0)) return true;
        if (!horizontal && vertical < 0) {
            const preferred = nav.climbSide || actor.dir || 1;
            const selectedSide = climbSupportAt(actor, actor.x, actor.y, preferred) ? preferred : (climbSupportAt(actor, actor.x, actor.y, -preferred) ? -preferred : 0);
            if (selectedSide && actorCanOccupyAt(actor, actor.x, actor.y - 1) && climbSupportAt(actor, actor.x, actor.y - 1, selectedSide) && executeNavigationEdge(actor, 0, -1, "climb", selectedSide)) return true;
        }
        if (!away && navigationExcavationAllowed(actor) && digToward(actor, getRelation(actor._r), targetX, targetY)) {
            nav.stallSinceTick = pixelTicks;
            return true;
        }
        if (!Number.isFinite(nav.stallSinceTick)) nav.stallSinceTick = pixelTicks;
        if (pixelTicks - nav.stallSinceTick >= C.NAVIGATION_STALL_TICKS) {
            if (actor.task === "harvest" && Number.isFinite(actor.harvestX) && Number.isFinite(actor.harvestY)) {
                actor.blockedResourceKey = actor.harvestX + "," + actor.harvestY + ":" + (actor.targetKind || "");
                actor.blockedResourceUntil = pixelTicks + 180;
            }
            if (actor.playerOrder) clearPlayerOrder(actor, "failed", "unreachable");
            else clearTask(actor, "failed", "unreachable", {targetX, targetY});
        }
        return false;
    }

    function visionRangeFor(actor) {
        const faction = actor && manager.factionById.get(actor.factionId);
        const index = eraIndexFor(faction);
        const era = eraDefinition(ERA_ORDER[index]);
        return safeNumber(era && era.vision, safeNumber((TechData.DEFAULT_VISION || [8])[index], 8));
    }

    function lineCellTransparency(x, y) {
        const pixels = pixelsAt(x, y);
        if (!pixels.length) return 1;
        let transparency = 1;
        for (let i = 0; i < pixels.length; i++) {
            const pixel = pixels[i];
            if (!pixel || pixel.del) continue;
            const info = elements[pixel.element] || {};
            if (pixel.nonBlocking === true || info.nonBlocking === true || (typeof isNonBlockingPixel === "function" && isNonBlockingPixel(pixel))) continue;
            if (typeof isCreaturePixel === "function" && isCreaturePixel(pixel)) continue;
            if (typeof isPassableVegetationPixel === "function" && isPassableVegetationPixel(pixel)) {
                transparency *= 0.72;
                continue;
            }
            if (OBSCURING_ELEMENTS.has(pixel.element)) {
                transparency *= 0.3;
                continue;
            }
            if (info.state === "gas") {
                transparency *= safeNumber(info.alpha, 0.75);
                continue;
            }
            if (info.state === "solid" || info.state === "liquid") return 0;
        }
        return transparency;
    }

    function lineTransparencyBetween(source, target) {
        if (!source || !target) return 0;
        if (Core.lineOfSightTransparency) return Core.lineOfSightTransparency(source.x, source.y - 1, target.x, target.y - 1, lineCellTransparency);
        return 1;
    }

    function mutualLineOfSight(source, target) {
        if (!source || !target) return false;
        const distance = Core.distance(source.x, source.y, target.x, target.y);
        if (distance > Math.min(visionRangeFor(source), visionRangeFor(target))) return false;
        const transparency = lineTransparencyBetween(source, target);
        if (Core.hasLineOfSight) return Core.hasLineOfSight(source.x, source.y - 1, target.x, target.y - 1, lineCellTransparency, 0.16);
        return transparency >= 0.16;
    }

    function rangedAccuracy(actor, target, weapon, visibility) {
        return 0.5;
    }

    function attackBox(actor, weapon) {
        const id = actor.weapon || weapon && weapon.id || "fists";
        if (id === "fists") return {minX: actor.x - 1, maxX: actor.x + 1, minY: actor.y - 1, maxY: actor.y + 1};
        if (id === "club" || id === "iron_sword" || id === "bronze_sword") {
            return actor.dir < 0 ? {minX: actor.x - 2, maxX: actor.x + 1, minY: actor.y - 2, maxY: actor.y + 1} : {minX: actor.x - 1, maxX: actor.x + 2, minY: actor.y - 2, maxY: actor.y + 1};
        }
        const radius = id === "crossbow" ? 5 : (id === "bow" ? 4 : 2);
        return {minX: actor.x - radius, maxX: actor.x + radius, minY: actor.y - radius, maxY: actor.y + radius};
    }

    function targetInAttackBox(actor, target, weapon) {
        const box = attackBox(actor, weapon);
        return target.x >= box.minX && target.x <= box.maxX && target.y >= box.minY && target.y <= box.maxY;
    }

    function lockCombatTarget(actor, target) {
        if (!actor || !target || getPeaceMode() === "full-peace") return false;
        const existing = Number.isFinite(actor.combatTargetId) ? manager.actorById.get(actor.combatTargetId) : null;
        if (existing && !existing.dead && !existing.del && existing.factionId !== actor.factionId) return existing.humanId === target.humanId;
        actor.combatTargetId = target.humanId;
        setTask(actor, "combat", target);
        return true;
    }

    function retaliationAllowed(actor, target) {
        return !!(getPeaceMode() !== "full-peace" && actor && target && actor.underAttackUntil > pixelTicks && actor.combatTargetId === target.humanId);
    }

    function queueRangedAttack(actor, target, weapon) {
        if (!actor || !target || !weapon || actor.dead || target.dead || actor.factionId === target.factionId || (!atWar(actor.factionId, target.factionId) && !retaliationAllowed(actor, target))) return false;
        if (!targetInAttackBox(actor, target, weapon) || !mutualLineOfSight(actor, target)) return false;
        if (actor.strikeDueTick === pixelTicks + 1 && actor.strikeTargetId === target.humanId) return false;
        actor.strikeDueTick = pixelTicks + 1;
        actor.strikeTargetId = target.humanId;
        manager.pendingAttacks.push({attackerId: actor.humanId, targetId: target.humanId, dueTick: pixelTicks + 1, ranged: true, scheduledTick: pixelTicks});
        lockCombatTarget(target, actor);
        target.underAttackUntil = pixelTicks + 90;
        manager.visualProjectiles.add({
            x0: actor.x,
            y0: actor.y - 0.5,
            x1: target.x,
            y1: target.y - 0.5,
            startTick: pixelTicks,
            dueTick: pixelTicks + 1,
            color: actor.weapon === "crossbow" ? "#d9d1bd" : "#c5a56b"
        });
        return true;
    }

    function queueAttack(actor, target) {
        if (!actor || !target || actor.dead || target.dead) return false;
        if (actor.factionId === target.factionId || (!atWar(actor.factionId, target.factionId) && !retaliationAllowed(actor, target))) return false;
        const weapon = manager.weapons.get(actor.weapon) || manager.weapons.get("fists");
        if (weapon && weapon.ranged) return queueRangedAttack(actor, target, weapon);
        if (!targetInAttackBox(actor, target, weapon)) return false;
        if (actor.strikeDueTick === pixelTicks + 1 && actor.strikeTargetId === target.humanId) return false;
        actor.strikeDueTick = pixelTicks + 1;
        actor.strikeTargetId = target.humanId;
        manager.pendingAttacks.push({attackerId: actor.humanId, targetId: target.humanId, dueTick: pixelTicks + 1, ranged: false, scheduledTick: pixelTicks});
        lockCombatTarget(target, actor);
        target.underAttackUntil = pixelTicks + 90;
        return true;
    }

    function queueStructureAttack(actor, target) {
        if (!actor || !target || actor.dead || target.del || !atWar(actor.factionId, target.factionId)) return false;
        const strikeKey = Number.isFinite(target.buildingId) ? "building:" + target.buildingId : target.element + "@" + target.x + "," + target.y;
        if (actor.structureStrikeDueTick === pixelTicks + 1 && actor.structureStrikeKey === strikeKey) return false;
        actor.structureStrikeDueTick = pixelTicks + 1;
        actor.structureStrikeKey = strikeKey;
        manager.pendingStructureAttacks.push({attackerId: actor.humanId, target: target, dueTick: pixelTicks + 1, scheduledTick: pixelTicks});
        return true;
    }

    function adjacentEnemyStructure(actor, range) {
        const radius = Math.max(1, Math.ceil(range));
        let nearest = null;
        let bestDistance = Infinity;
        for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
                const distance = Math.hypot(dx, dy);
                if (distance === 0 || distance > range) continue;
                const cellPixels = pixelsAt(actor.x + dx, actor.y + dy);
                for (let index = 0; index < cellPixels.length; index++) {
                    const pixel = cellPixels[index];
                    if (!pixel || pixel.del || !Number.isFinite(pixel.factionId) || !atWar(actor.factionId, pixel.factionId)) continue;
                    if (pixel.element !== "civ_banner" && pixel.element !== "civ_construction" && !STRUCTURE_CORES.has(pixel.element) && !STRUCTURE_PARTS.has(pixel.element)) continue;
                    if (distance < bestDistance) {
                        nearest = pixel;
                        bestDistance = distance;
                    }
                }
            }
        }
        return nearest;
    }

    function runAdultAction(actor) {
        if (actor.task !== "deliver" && actor.task !== "combat" && actor.task !== "siege" && actor.task !== "flee" && carriedAmount(actor) >= carryCapacityFor(actor)) {
            const carry = ensureActorCarry(actor);
            const firstKind = Object.keys(carry).find((kind) => carry[kind] > 0);
            const destination = deliveryDestination(actor, firstKind);
            actor.resumeAfterDelivery = {
                task: actor.task,
                targetX: actor.targetX,
                targetY: actor.targetY,
                targetId: actor.targetId,
                targetKind: actor.targetKind,
                harvestX: actor.harvestX,
                harvestY: actor.harvestY
            };
            setTask(actor, "deliver", destination);
        }
        if (actor.task === "move") {
            if (!Number.isFinite(actor.targetX) || !Number.isFinite(actor.targetY)) return clearPlayerOrder(actor, "failed", "invalid_destination");
            if (Core.distance(actor.x, actor.y, actor.targetX, actor.targetY) <= 1) return clearPlayerOrder(actor, "completed", "destination_reached");
            moveRelationToward(actor, actor.targetX, actor.targetY, false);
            return;
        }
        if (actor.task === "harvest") {
            if (!harvestTarget(actor)) moveRelationToward(actor, actor.targetX, actor.targetY, false);
            else if (actor.task === "harvest") setPersonActivityPhase(actor, "working");
            return;
        }
        const banner = settlementForActor(actor);
        if (actor.task === "deliver") {
            const destination = getBuildingById(actor.targetId) || banner;
            if (!destination) return clearTask(actor, "failed", "delivery_destination_lost");
            if (actor.targetId !== destination.buildingId && destination.buildingId) setTask(actor, "deliver", destination);
            if (!deliverCarry(actor, destination)) moveRelationToward(actor, destination.x, destination.y, false);
            return;
        }
        if (actor.task === "build") {
            const site = Array.from(manager.constructionSites).find((candidate) => candidate.buildingId === actor.targetId);
            if (!site || site.del) {
                const completed = getBuildingById(actor.targetId);
                return clearTask(actor, completed && completed.buildingState === "complete" ? "completed" : "interrupted", completed && completed.buildingState === "complete" ? "building_completed" : "construction_unavailable", {buildingId: actor.targetId});
            }
            if (Core.distance(actor.x, actor.y, site.x, site.y) <= 2.5) advanceConstruction(site, actor);
            else moveRelationToward(actor, site.x, site.y, false);
            return;
        }
        if (actor.task === "farm") {
            const faction = manager.factionById.get(actor.factionId);
            const farm = faction && faction.farms.find((candidate) => candidate.buildingId === actor.targetId) || (faction && faction.farms[0]);
            handleFarmTask(actor, farm, banner);
            if (actor.task === "farm") moveRelationToward(actor, actor.targetX, actor.targetY, false);
            return;
        }
        if (actor.task === "plant_tree") {
            handlePlantTreeTask(actor, banner);
            return;
        }
        if (actor.task === "facility") {
            const facility = getBuildingById(actor.targetId);
            if (!facility || facility.del) return clearTask(actor, "interrupted", "facility_destroyed");
            if (facility.factionId !== actor.factionId) return clearTask(actor, "interrupted", "facility_captured");
            if (Core.distance(actor.x, actor.y, facility.x, facility.y) > 2.5) moveRelationToward(actor, facility.x, facility.y, false);
            else setPersonActivityPhase(actor, "working");
            return;
        }
        if (actor.task === "combat") {
            const target = manager.actorById.get(actor.targetId);
            if (!target || target.dead || target.factionId === actor.factionId || (!atWar(actor.factionId, target.factionId) && !retaliationAllowed(actor, target))) {
                actor.combatTargetId = undefined;
                const reason = target && target.dead ? "target_defeated" : (!target ? "target_lost" : (target.factionId === actor.factionId ? "allegiance_changed" : "hostility_ended"));
                return clearTask(actor, target && target.dead || reason === "hostility_ended" ? "completed" : "interrupted", reason);
            }
            if (actor.warRole === "defender" && (!manager.territory || manager.territory.ownerAt(target.x) !== actor.factionId)) return clearTask(actor, "completed", "target_left_territory");
            const weapon = manager.weapons.get(actor.weapon) || manager.weapons.get("fists");
            if (targetInAttackBox(actor, target, weapon) && (!weapon.ranged || mutualLineOfSight(actor, target))) { setPersonActivityPhase(actor, "attacking"); queueAttack(actor, target); }
            else moveRelationToward(actor, target.x, target.y, false);
            return;
        }
        if (actor.task === "siege") {
            const target = getBuildingById(actor.targetId) || (Number.isFinite(actor.targetX) && Number.isFinite(actor.targetY) ? pixelsAt(actor.targetX, actor.targetY).find((pixel) => pixel && pixel.element === actor.targetKind && atWar(actor.factionId, pixel.factionId)) : null);
            if (!target) return clearTask(actor, "completed", "structure_destroyed");
            if (target.element !== actor.targetKind) return clearTask(actor, "completed", "structure_destroyed");
            if (!atWar(actor.factionId, target.factionId)) return clearTask(actor, "interrupted", "war_ended");
            const weapon = manager.weapons.get(actor.weapon) || manager.weapons.get("fists");
            const structureRange = Math.max(2, weapon.range);
            const obstruction = adjacentEnemyStructure(actor, structureRange);
            if (obstruction) { setPersonActivityPhase(actor, "attacking"); queueStructureAttack(actor, obstruction); }
            else if (Core.distance(actor.x, actor.y, target.x, target.y) <= structureRange) { setPersonActivityPhase(actor, "attacking"); queueStructureAttack(actor, target); }
            else moveRelationToward(actor, target.x, target.y, false);
            return;
        }
        if (actor.task === "flee") {
            const target = manager.actorById.get(actor.targetId);
            if (!target || target.dead) return clearTask(actor, "completed", "threat_ended");
            moveRelationToward(actor, target.x, target.y, true);
            return;
        }
        if (actor.task === "return" || actor.task === "patrol") {
            if (!banner) return clearTask(actor, "interrupted", "settlement_unavailable");
            if (actor.warRole === "defender" && manager.territory && manager.territory.ownerAt(actor.x) !== actor.factionId) {
                moveRelationToward(actor, banner.x, banner.y, false);
                return;
            }
            if (actor.task === "return") {
                if (Core.distance(actor.x, actor.y, banner.x, banner.y) > 2) moveRelationToward(actor, banner.x, banner.y, false);
                else clearTask(actor, "completed", "returned_home");
                return;
            }
            if (!Number.isFinite(actor.patrolX) || !Number.isFinite(actor.patrolY) || Core.distance(actor.x, actor.y, actor.patrolX, actor.patrolY) <= 1.5) {
                const halfWidth = Math.max(2, C.TERRITORY_HALF_WIDTH - 1);
                let patrolX = banner.x + Math.floor(Math.random() * (halfWidth * 2 + 1)) - halfWidth;
                if (manager.territory && manager.territory.ownerAt(patrolX) !== actor.factionId) patrolX = banner.x;
                actor.patrolX = patrolX;
                actor.patrolY = findSurfaceY(patrolX, banner.y) ?? banner.y;
            }
            setPersonActivityPhase(actor, "patrolling");
            moveRelationToward(actor, actor.patrolX, actor.patrolY, false);
            return;
        }
        if (actor.task === "search_resource" || actor.task === "explore" || actor.task === "wander" || actor.task === "idle" || actor.task === "planning") {
            if (!Number.isFinite(actor.searchX) || !Number.isFinite(actor.searchY) || Core.distance(actor.x, actor.y, actor.searchX, actor.searchY) <= 1.5) {
                const originX = banner ? banner.x : actor.x;
                const radius = banner ? Math.max(C.EXTENDED_RESOURCE_RADIUS, C.TERRITORY_HALF_WIDTH) : 8;
                actor.searchX = originX + Math.floor(Math.random() * (radius * 2 + 1)) - radius;
                actor.searchY = findSurfaceY(actor.searchX, banner ? banner.y : actor.y) ?? actor.y;
            }
            setPersonActivityPhase(actor, actor.task === "search_resource" ? "searching" : "exploring");
            moveRelationToward(actor, actor.searchX, actor.searchY, false);
        }
    }

    function pairInfo(factionA, factionB) {
        const a = Number(factionA);
        const b = Number(factionB);
        if (!Number.isFinite(a) || !Number.isFinite(b) || a === b) return null;
        return a < b ? {a: a, b: b, key: a + ":" + b} : {a: b, b: a, key: b + ":" + a};
    }

    function firstBanner(factionId) {
        const faction = manager.factionById.get(factionId);
        return faction && faction.settlements.length ? (faction.settlements.find((settlement) => settlement.townCenterActive !== false) || faction.settlements[0]) : null;
    }

    function loadPairRecord(info, create) {
        if (!info) return null;
        let record = manager.relationRecords.get(info.key);
        const bannerA = firstBanner(info.a);
        const bannerB = firstBanner(info.b);
        if (!record && bannerA && bannerA.diplomacy && bannerA.diplomacy[info.b]) record = bannerA.diplomacy[info.b];
        if (!record && bannerB && bannerB.diplomacy && bannerB.diplomacy[info.a]) record = bannerB.diplomacy[info.a];
        if (!record && create) {
            record = {factionA: info.a, factionB: info.b, hostility: 0, atWar: false};
        }
        if (record) {
            record.factionA = info.a;
            record.factionB = info.b;
            manager.relationRecords.set(info.key, record);
        }
        return record || null;
    }

    function savePairRecord(info, record) {
        if (!info || !record) return;
        manager.relationRecords.set(info.key, record);
        const bannerA = firstBanner(info.a);
        const bannerB = firstBanner(info.b);
        if (bannerA) {
            if (!bannerA.diplomacy || typeof bannerA.diplomacy !== "object") bannerA.diplomacy = {};
            bannerA.diplomacy[info.b] = record;
        }
        if (bannerB) {
            if (!bannerB.diplomacy || typeof bannerB.diplomacy !== "object") bannerB.diplomacy = {};
            bannerB.diplomacy[info.a] = record;
        }
    }

    function normalizePeaceMode(value) {
        return value === "no-new-wars" || value === "full-peace" ? value : "normal";
    }

    function getPeaceMode() {
        if (typeof settings === "undefined" || !settings) return "normal";
        return normalizePeaceMode(settings.humanSocietyPeaceMode);
    }

    function recordedWarActive(record) {
        return !!(record && record.atWar && !record.surrendered);
    }

    function effectiveWarActive(record) {
        return recordedWarActive(record) && getPeaceMode() !== "full-peace";
    }

    function cancelPendingAttacksFor(actor) {
        if (!actor) return;
        manager.pendingAttacks = manager.pendingAttacks.filter((intent) => intent.attackerId !== actor.humanId && intent.targetId !== actor.humanId);
        manager.pendingStructureAttacks = manager.pendingStructureAttacks.filter((intent) => intent.attackerId !== actor.humanId);
        manager.pendingRangedImpacts = manager.pendingRangedImpacts.filter((intent) => intent.attackerId !== actor.humanId && intent.targetId !== actor.humanId);
        delete actor.strikeDueTick;
        delete actor.strikeTargetId;
        delete actor.structureStrikeDueTick;
        delete actor.structureStrikeKey;
    }

    function applyFullPeaceState() {
        manager.pendingAttacks.length = 0;
        manager.pendingStructureAttacks.length = 0;
        manager.pendingRangedImpacts.length = 0;
        manager.visualProjectiles.clear();
        manager.actors.forEach((actor) => {
            if (!actor || actor.del || actor.dead) return;
            cancelPendingAttacksFor(actor);
            delete actor.combatTargetId;
            delete actor.underAttackUntil;
            delete actor.warRole;
            delete actor.warFrontId;
            if (actor.task === "combat" || actor.task === "siege" || actor.task === "flee") clearTask(actor, "interrupted", "peace_mode");
        });
    }

    function clearScarcityTimers() {
        manager.settlements.forEach((banner) => {
            if (banner && banner.resourceScarcity) banner.resourceScarcity = {};
        });
    }

    function setPeaceMode(value) {
        const next = normalizePeaceMode(value);
        const previous = getPeaceMode();
        if (typeof settings !== "undefined" && settings) settings.humanSocietyPeaceMode = next;
        if (previous !== "full-peace" && next === "full-peace") {
            manager.relationRecords.forEach((record) => {
                if (recordedWarActive(record) && !Number.isFinite(record.peacePausedTick)) record.peacePausedTick = pixelTicks;
            });
            applyFullPeaceState();
        }
        else if (previous === "full-peace" && next !== "full-peace") {
            manager.relationRecords.forEach((record) => {
                if (!Number.isFinite(record.peacePausedTick)) return;
                const duration = Math.max(0, pixelTicks - record.peacePausedTick);
                if (Number.isFinite(record.declaredTick)) record.declaredTick += duration;
                if (Number.isFinite(record.imbalanceSince)) record.imbalanceSince += duration;
                delete record.peacePausedTick;
            });
        }
        if (next !== "normal") clearScarcityTimers();
        if (typeof saveSettings === "function") saveSettings();
        return next;
    }

    function atWar(factionA, factionB) {
        const info = pairInfo(factionA, factionB);
        const record = loadPairRecord(info, false);
        return effectiveWarActive(record);
    }

    function activeEnemyFactionIds(factionId) {
        const enemies = [];
        manager.relationRecords.forEach((record) => {
            if (!effectiveWarActive(record)) return;
            if (record.factionA === factionId) enemies.push(record.factionB);
            else if (record.factionB === factionId) enemies.push(record.factionA);
        });
        return enemies.filter((id, index, array) => array.indexOf(id) === index).sort((a, b) => a - b);
    }

    function declareWar(attackerFactionId, defenderFactionId, reason) {
        if (getPeaceMode() !== "normal") return false;
        const info = pairInfo(attackerFactionId, defenderFactionId);
        if (!info || !manager.factionById.has(Number(attackerFactionId)) || !manager.factionById.has(Number(defenderFactionId))) return false;
        const record = loadPairRecord(info, true);
        if (record.atWar && !record.surrendered) return true;
        record.atWar = true;
        record.surrendered = false;
        record.permanent = true;
        record.declaredTick = pixelTicks;
        record.lastWarTick = pixelTicks;
        record.aggressorFactionId = Number(attackerFactionId);
        record.defenderFactionId = Number(defenderFactionId);
        record.reason = reason === "manual" ? "manual" : "resource_exhaustion";
        record.startAdultsA = manager.factionById.get(info.a).adultPopulation;
        record.startAdultsB = manager.factionById.get(info.b).adultPopulation;
        delete record.imbalanceSince;
        savePairRecord(info, record);
        [Number(attackerFactionId), Number(defenderFactionId)].forEach((factionId) => {
            const banner = firstBanner(factionId);
            if (banner) {
                banner.lastWarTick = pixelTicks;
                if (!banner.warState || typeof banner.warState !== "object") banner.warState = {wave: 1, initialized: false};
                logSettlementEvent(banner, "war", (record.reason === "manual" ? "被手动卷入战争" : "因不可再生资源枯竭进入战争") + "：对阵阵营 " + (factionId === Number(attackerFactionId) ? defenderFactionId : attackerFactionId), {enemyFactionId: factionId === Number(attackerFactionId) ? Number(defenderFactionId) : Number(attackerFactionId), reason: record.reason});
            }
        });
        return true;
    }

    function recordIncident(factionA, factionB, type, amount) {
        const info = pairInfo(factionA, factionB);
        if (!info) return null;
        const record = loadPairRecord(info, true);
        let incidentAmount = amount;
        if (!Number.isFinite(incidentAmount) && type === "theft") incidentAmount = C.STARVING_TRESPASS_HOSTILITY || 15;
        if (Core.applyHostility) {
            Core.applyHostility(record, {type: type, amount: incidentAmount, tick: pixelTicks});
        }
        else {
            const fallbackAmounts = {theft: 15, hit: 20, kill: 35};
            record.hostility = Math.min(100, Math.max(0, (record.hostility || 0) + (incidentAmount || fallbackAmounts[type] || 0)));
            record.lastIncidentTick = pixelTicks;
            if (type === "hit" || type === "kill") record.lastAttackTick = pixelTicks;
        }
        savePairRecord(info, record);
        return record;
    }

    function territoriesOverlap(bannerA, bannerB) {
        if (!bannerA || !bannerB || bannerA.del || bannerB.del) return false;
        const totalRadius = (bannerA.territoryRadius || C.TERRITORY_BASE_RADIUS) + (bannerB.territoryRadius || C.TERRITORY_BASE_RADIUS);
        return Core.distance(bannerA.x, bannerA.y, bannerB.x, bannerB.y) <= totalRadius;
    }

    function factionLossRatio(record, side, currentAdults) {
        const start = Number(record[side === "A" ? "startAdultsA" : "startAdultsB"]);
        if (!Number.isFinite(start) || start <= 0) return 0;
        return Math.max(0, Math.min(1, (start - currentAdults) / start));
    }

    function nonrenewableDemanded(faction, kind) {
        const stock = faction.settlements.reduce((total, settlement) => total + materialAmount(ensureStock(settlement), kind), 0);
        const activeCost = faction.constructionSites.reduce((total, site) => total + safeNumber(site.costs && site.costs[kind], 0), 0);
        if (activeCost > stock) return true;
        if (kind === "stone") return eraIndexFor(faction) >= 1 && stock < 12;
        if (kind === "copper") return hasTech(faction, "copper_prospecting") && stock < 8;
        if (kind === "tin") return hasTech(faction, "tin_prospecting") && stock < 4;
        if (kind === "raw_iron") return hasTech(faction, "iron_prospecting") && stock < 8;
        return false;
    }

    function stepResourceExhaustionWars(faction) {
        if (getPeaceMode() !== "normal") return;
        const banner = faction && faction.settlements[0];
        if (!banner || factionIsAtWar(faction.id)) return;
        if (!banner.resourceScarcity || typeof banner.resourceScarcity !== "object") banner.resourceScarcity = {};
        for (const kind of NONRENEWABLE_KINDS) {
            if (!nonrenewableDemanded(faction, kind)) { delete banner.resourceScarcity[kind]; continue; }
            const nodes = manager.resourceIndex.get(kind) || [];
            const accessible = nodes.some((node) => {
                const owner = manager.territory && manager.territory.ownerAt(node.x);
                return owner === faction.id || owner === null || owner === undefined;
            });
            if (accessible) { delete banner.resourceScarcity[kind]; continue; }
            if (!Number.isFinite(banner.resourceScarcity[kind])) banner.resourceScarcity[kind] = pixelTicks;
            if (pixelTicks - banner.resourceScarcity[kind] < C.RESOURCE_EXHAUSTION_TICKS) continue;
            const owners = new Map();
            nodes.forEach((node) => {
                const owner = manager.territory && manager.territory.ownerAt(node.x);
                if (owner !== null && owner !== undefined && owner !== faction.id) owners.set(owner, safeNumber(owners.get(owner), 0) + 1);
            });
            let target = Array.from(owners.entries()).sort((a, b) => b[1] - a[1] || a[0] - b[0])[0];
            if (!target) {
                const rivals = Array.from(manager.factionById.values()).filter((other) => other.id !== faction.id && other.settlements.length);
                rivals.sort((a, b) => {
                    const bannerA = a.settlements[0];
                    const bannerB = b.settlements[0];
                    return Core.distance(banner.x, banner.y, bannerA.x, bannerA.y) - Core.distance(banner.x, banner.y, bannerB.x, bannerB.y) || a.id - b.id;
                });
                if (rivals.length) target = [rivals[0].id, 0];
            }
            if (target && declareWar(faction.id, target[0], "resource_exhaustion")) {
                banner.resourceScarcity[kind] = pixelTicks;
                return;
            }
        }
    }

    function ruinPixel(pixel) {
        if (!pixel || pixel.del) return;
        if (isBuildingCorePixel(pixel)) {
            destroyBuilding(pixel, "destroyed");
            return;
        }
        if (pixel.element === "civ_construction") {
            cancelConstruction(pixel);
            return;
        }
        if (pixel.element === "civ_banner" || STRUCTURE_CORES.has(pixel.element)) {
            changePixel(pixel, "civ_ruin");
        }
        else if (STRUCTURE_PARTS.has(pixel.element)) {
            const debris = pixel.element === "civ_structure_wood" ? "sawdust" : "gravel";
            if (elements[debris]) changePixel(pixel, debris);
            else deleteExactPixel(pixel);
        }
        else {
            delete pixel.factionId;
            delete pixel.factionColor;
            delete pixel.settlementId;
            setPixelColor(pixel, pixel.element === "civ_structure_stone" ? "#66645f" : "#705a45");
        }
    }

    function dropTownCenterStock(banner) {
        if (!banner || !banner.stock) return;
        ensureStock(banner);
        STOCK_KEYS.forEach((kind) => {
            const amount = Math.floor(materialAmount(banner.stock, kind));
            if (amount > 0) queueResourceDrops(kind, null, amount, banner.x, banner.y);
            if (kind === "food" || kind === "wood" || kind === "stone") banner.stock[kind] = 0;
            else { banner.stock[kind] = 0; banner.stock.materials[kind] = 0; }
        });
        Object.keys(banner.stock.materials || {}).forEach((key) => { banner.stock.materials[key] = 0; });
        Object.keys(banner.stock.seeds || {}).forEach((seed) => {
            const amount = Math.floor(safeNumber(banner.stock.seeds[seed], 0));
            if (amount) queueResourceDrops("seed:" + seed, seed, amount, banner.x, banner.y);
            banner.stock.seeds[seed] = 0;
        });
    }

    function destroyBuilding(buildingOrId, cause) {
        const building = typeof buildingOrId === "number" ? getBuildingById(buildingOrId) : buildingOrId;
        if (!isBuildingCorePixel(building)) return false;
        const settlement = manager.settlementById.get(building.settlementId) || (building.element === "civ_banner" ? building : null);
        releaseBuildingClaim(building);
        if (building.element === "civ_banner") {
            dropTownCenterStock(building);
            building.townCenterActive = false;
            building.buildingState = "destroyed";
            building.destroyedTick = pixelTicks;
            building.destroyedCause = cause || "destroyed";
            building.structureHp = 0;
            logSettlementEvent(building, "town_center_destroyed", "城镇中心被摧毁，聚落暂停运作", {cause: cause || "destroyed", buildingId: building.buildingId});
            return true;
        }
        if (building.element === "civ_construction") {
            cancelConstruction(building);
            return true;
        }
        if (settlement) logSettlementEvent(settlement, "building_destroyed", "建筑被摧毁：" + (building.buildingType || building.element), {buildingId: building.buildingId, buildingType: building.buildingType, cause: cause || "destroyed"});
        changePixel(building, "civ_ruin");
        return true;
    }

    function stepTownCenterRebuilds() {
        manager.settlements.forEach((banner) => {
            if (!banner || banner.del || banner.townCenterActive !== false) return;
            if (banner.destroyedCause === "erased") return;
            const faction = manager.factionById.get(banner.factionId);
            const residents = faction && faction.adults.filter((actor) => actor.settlementId === banner.settlementId && !actor.dead).length || 0;
            if (residents < 1 || pixelTicks - safeNumber(banner.destroyedTick, pixelTicks) < 300) return;
            banner.townCenterActive = true;
            banner.buildingState = "complete";
            banner.structureHp = banner.structureMaxHp || 120;
            delete banner.destroyedCause;
            reserveBuildingTerritory(banner);
            logSettlementEvent(banner, "town_center_rebuilt", "居民重建了城镇中心", {buildingId: banner.buildingId});
        });
    }

    function performSurrender(loserId, victorId, record) {
        const loser = manager.factionById.get(loserId);
        const victor = manager.factionById.get(victorId);
        const victorBanner = victor && victor.settlements[0];
        if (!loser || !victor || !victorBanner) return false;
        const victorResearch = ensureResearchState(victorBanner);
        const loserResearchBanner = loser.settlements[0];
        if (loserResearchBanner) {
            const loserResearch = ensureResearchState(loserResearchBanner);
            victorResearch.knowledge += safeNumber(loserResearch.knowledge, 0) * 0.5;
            allTechnologies().forEach((tech) => {
                if (victorResearch.unlocked[tech.id]) return;
                const cost = effectiveResearchCost(tech, victor, victorBanner);
                const loserCost = Math.max(1, safeNumber(tech.cost, 1));
                const loserInvestment = loserResearch.unlocked[tech.id] ? loserCost : Math.min(loserCost, safeNumber(loserResearch.progress[tech.id], 0));
                if (loserInvestment <= 0) return;
                victorResearch.progress[tech.id] = Math.min(cost - 0.001, safeNumber(victorResearch.progress[tech.id], 0) + loserInvestment * 0.5);
            });
            if (!victorResearch.cultureMemory || typeof victorResearch.cultureMemory !== "object") victorResearch.cultureMemory = {};
            victorResearch.cultureMemory[loserId] = {tick: pixelTicks, knowledgeTransferred: safeNumber(loserResearch.knowledge, 0) * 0.5};
            manager.archivedChronicles.push({factionId: loserId, annexedBy: victorId, annexedAt: eventTimestamp(), settlements: loser.settlements.map((settlement) => ({settlementId: settlement.settlementId, chronicle: ensureChronicle(settlement).slice()}))});
        }
        for (let i = 0; i < loser.actors.length; i++) {
            const actor = loser.actors[i];
            if (!actor || actor.del || actor.dead) continue;
            const formerFactionId = actor.factionId;
            clearTask(actor, "interrupted", "faction_annexed", {fromFactionId: formerFactionId, toFactionId: victorId});
            actor.factionId = victorId;
            actor.factionColor = victor.color;
            actor.role = "worker";
            delete actor.warRole;
            delete actor.warFrontId;
            delete actor.combatTargetId;
            const currentActivity = ensurePersonActivity(actor, true);
            if (currentActivity && currentActivity.c) {
                currentActivity.c.f = actor.factionId;
                currentActivity.c.l = Number.isFinite(actor.settlementId) ? actor.settlementId : null;
                currentActivity.c.r = actor.role;
            }
            recordPersonLifeEvent(actor, "faction_changed", {fromFactionId: formerFactionId, toFactionId: victorId});
            setPixelColor(actor, victor.color);
            if (actor.element === "civ_body") {
                const head = getBodyHead(actor);
                if (head) {
                    head.factionId = victorId;
                    head.factionColor = victor.color;
                }
            }
        }
        const captured = [];
        manager.settlements.forEach((pixel) => { if (pixel.factionId === loserId) captured.push(pixel); });
        manager.structures.forEach((pixel) => { if (pixel.factionId === loserId) captured.push(pixel); });
        manager.constructionSites.forEach((pixel) => { if (pixel.factionId === loserId) captured.push(pixel); });
        Array.from(new Set(captured)).forEach((pixel) => {
            pixel.factionId = victorId;
            pixel.factionColor = victor.color;
            setPixelColor(pixel, victor.color);
            if (pixel.element === "civ_banner") { pixel.research = victorResearch; pixel.eraId = victorBanner.eraId; }
        });
        record.atWar = false;
        record.hostility = 0;
        record.surrendered = true;
        record.surrenderTick = pixelTicks;
        record.victorFactionId = victorId;
        record.loserFactionId = loserId;
        victorBanner.lastWarTick = pixelTicks;
        manager.relationRecords.forEach((otherRecord, key) => {
            if (!otherRecord || otherRecord === record) return;
            if (otherRecord.factionA === loserId || otherRecord.factionB === loserId) {
                otherRecord.atWar = false;
                otherRecord.absorbedFactionId = loserId;
                otherRecord.endedTick = pixelTicks;
                manager.relationRecords.set(key, otherRecord);
            }
        });
        logSettlementEvent(victorBanner, "annexation", "吞并阵营 " + loserId, {loserFactionId: loserId, victorFactionId: victorId});
        rebuildTerritoryIndex();
        return true;
    }

    function stepDiplomacyAndWars() {
        if (getPeaceMode() === "full-peace") return;
        const surrenders = [];
        manager.relationRecords.forEach((record, key) => {
            if (!record || !record.atWar || record.surrendered) return;
            const info = pairInfo(record.factionA, record.factionB);
            const factionA = manager.factionById.get(record.factionA);
            const factionB = manager.factionById.get(record.factionB);
            if (!factionA || !factionB) return;
            const bannerA = factionA.settlements[0];
            const bannerB = factionB.settlements[0];
            if (bannerA) bannerA.lastWarTick = pixelTicks;
            if (bannerB) bannerB.lastWarTick = pixelTicks;
            const age = pixelTicks - safeNumber(record.declaredTick, pixelTicks);
            if (age >= C.WAR_MINIMUM_TICKS) {
                const powerA = Math.max(0, factionA.militaryPower);
                const powerB = Math.max(0, factionB.militaryPower);
                const stronger = powerA >= powerB ? record.factionA : record.factionB;
                const weaker = stronger === record.factionA ? record.factionB : record.factionA;
                const strongPower = Math.max(powerA, powerB);
                const weakPower = Math.min(powerA, powerB);
                if (strongPower >= Math.max(0.0001, weakPower) * C.WAR_POWER_RATIO) {
                    if (record.imbalanceVictor !== stronger) { record.imbalanceVictor = stronger; record.imbalanceSince = pixelTicks; }
                    if (pixelTicks - safeNumber(record.imbalanceSince, pixelTicks) >= C.WAR_IMBALANCE_TICKS) {
                        record.surrendered = true;
                        record.victorFactionId = stronger;
                        record.loserFactionId = weaker;
                        surrenders.push({info, record, loser: weaker, victor: stronger});
                    }
                }
                else { delete record.imbalanceVictor; delete record.imbalanceSince; }
            }
            manager.relationRecords.set(key, record);
            savePairRecord(info, record);
        });
        let changedFactions = false;
        for (let i = 0; i < surrenders.length; i++) {
            const surrender = surrenders[i];
            if (performSurrender(surrender.loser, surrender.victor, surrender.record)) {
                savePairRecord(surrender.info, surrender.record);
                changedFactions = true;
            }
        }
        if (changedFactions) buildWorldIndex();
    }

    function factionIsAtWar(factionId) {
        const keys = Array.from(manager.relationRecords.keys());
        for (let i = 0; i < keys.length; i++) {
            const record = manager.relationRecords.get(keys[i]);
            if (effectiveWarActive(record) && (record.factionA === factionId || record.factionB === factionId)) return true;
        }
        return false;
    }

    function permanentActorRole(actor) {
        if (!actor) return "worker";
        return actor.role || "worker";
    }

    function assignPermanentActorRole(actor, role) {
        if (!actor) return;
        const nextRole = role || "worker";
        actor.role = nextRole;
    }

    function recordPermanentRoleChanges(adults, previousRoles) {
        adults.forEach((actor) => {
            if (!actor || actor.del || actor.dead) return;
            const previousRole = previousRoles.get(actor) || "worker";
            const nextRole = permanentActorRole(actor);
            if (previousRole === nextRole) return;
            const event = recordPersonLifeEvent(actor, "role_changed", {
                fromRole: previousRole,
                toRole: nextRole,
                warRole: actor.warRole || null
            });
            if (event) event.r = nextRole;
        });
    }

    function assignFactionRoles(faction) {
        if (!faction || !faction.adults.length) return;
        const previousRoles = new Map(faction.adults.map((actor) => [actor, permanentActorRole(actor)]));
        const roleMap = {food: "food", wood: "wood", miner: "miner", builder: "builder", artisan: "artisan", forester: "forester", industry: "industry", scholar: "scholar", military: "guard", artisan_trade: "merchant", flex: "worker"};
        let standingQuota = 0;
        faction.settlements.forEach((settlement) => {
            const adults = faction.adults.filter((actor) => actor.settlementId === settlement.settlementId).sort((a, b) => a.humanId - b.humanId);
            const target = Core.eraPopulationTarget ? Core.eraPopulationTarget(eraIndexFor(faction)) : (World.populationTarget ? World.populationTarget(eraIndexFor(faction)) : 6);
            const foodReserve = 2 * Math.ceil(target / 2);
            const lowFood = materialAmount(settlement.stock, "food") < foodReserve;
            const housingUrgent = settlement.housing < Math.min(target, safeNumber(settlement.population, adults.length) + 2);
            let quotas;
            if (Core.eraJobAllocation) quotas = Core.eraJobAllocation(eraIndexFor(faction), adults.length, {lowFood, housingUrgent});
            else if (World.scaledRoleQuotas) quotas = World.scaledRoleQuotas(adults.length, eraIndexFor(faction), {lowFood, housingUrgent});
            else quotas = {food: Math.ceil(adults.length / 2), wood: Math.floor(adults.length / 2)};
            if (lowFood) {
                const desiredFood = Math.ceil(adults.length / 2);
                while (safeNumber(quotas.food, 0) < desiredFood) {
                    const donor = Object.keys(quotas).filter((role) => role !== "food" && quotas[role] > 0).sort((a, b) => quotas[b] - quotas[a])[0];
                    if (!donor) break;
                    quotas[donor]--;
                    quotas.food = safeNumber(quotas.food, 0) + 1;
                }
            }
            if (faction.constructionSites.some((site) => site.settlementId === settlement.settlementId) && adults.length > 1 && safeNumber(quotas.builder, 0) < 1) {
                const donors = Object.keys(quotas).filter((role) => role !== "builder" && safeNumber(quotas[role], 0) > (role === "food" ? 1 : 0)).sort((a, b) => safeNumber(quotas[b], 0) - safeNumber(quotas[a], 0));
                const fallbackDonors = Object.keys(quotas).filter((role) => role !== "builder" && safeNumber(quotas[role], 0) > 0).sort((a, b) => safeNumber(quotas[b], 0) - safeNumber(quotas[a], 0));
                const donor = donors[0] || fallbackDonors[0];
                if (donor) {
                    quotas[donor]--;
                    quotas.builder = 1;
                }
            }
            settlement.roleQuotas = Object.assign({}, quotas);
            standingQuota += safeNumber(quotas.military, 0);
            let cursor = 0;
            Object.keys(quotas).forEach((semanticRole) => {
                for (let i = 0; i < quotas[semanticRole] && cursor < adults.length; i++) assignPermanentActorRole(adults[cursor++], roleMap[semanticRole] || "worker");
            });
            while (cursor < adults.length) assignPermanentActorRole(adults[cursor++], "worker");
            settlement.lastPopulation = safeNumber(settlement.population, adults.length);
        });

        const enemies = activeEnemyFactionIds(faction.id);
        const allAdults = faction.adults.slice().sort((a, b) => a.humanId - b.humanId);
        if (!enemies.length) {
            allAdults.forEach((actor) => { delete actor.warRole; delete actor.warFrontId; });
            const peaceWarriors = Math.min(allAdults.length, Math.max(0, standingQuota));
            for (let i = 0; i < peaceWarriors; i++) assignPermanentActorRole(allAdults[allAdults.length - 1 - i], "guard");
            const banner = faction.settlements[0];
            if (banner && banner.warState) banner.warState.initialized = false;
            recordPermanentRoleChanges(allAdults, previousRoles);
            return;
        }

        const banner = faction.settlements[0];
        if (!banner.warState || typeof banner.warState !== "object") banner.warState = {wave: 1, initialized: false};
        const targetArmy = Math.min(allAdults.length, Math.max(2, standingQuota * 2));
        let attackers = allAdults.filter((actor) => actor.warRole === "attacker");
        let defenders = allAdults.filter((actor) => actor.warRole === "defender");
        if (!banner.warState.initialized) {
            const existing = allAdults.filter((actor) => permanentActorRole(actor) === "warrior" || permanentActorRole(actor) === "guard");
            const attackCount = existing.length ? Math.min(targetArmy, existing.length) : Math.min(targetArmy, Math.max(1, Math.ceil(targetArmy / 2)));
            attackers = (existing.length ? existing : allAdults).slice(0, attackCount);
            attackers.forEach((actor) => { actor.warRole = "attacker"; });
            defenders = allAdults.filter((actor) => actor.warRole !== "attacker").slice(0, Math.max(0, targetArmy - attackers.length));
            defenders.forEach((actor) => { actor.warRole = "defender"; });
            banner.warState.initialized = true;
            banner.warState.wave = Math.max(1, safeNumber(banner.warState.wave, 1));
        }
        else if (!attackers.length && defenders.length) {
            defenders.forEach((actor) => { actor.warRole = "attacker"; delete actor.warFrontId; });
            attackers = defenders.slice();
            defenders = [];
            banner.warState.wave = safeNumber(banner.warState.wave, 1) + 1;
            logSettlementEvent(banner, "war_wave", "第 " + banner.warState.wave + " 波进攻开始", {wave: banner.warState.wave});
        }
        const soldiers = allAdults.filter((actor) => actor.warRole);
        const recruitsNeeded = Math.max(0, targetArmy - soldiers.length);
        allAdults.filter((actor) => !actor.warRole).slice(0, recruitsNeeded).forEach((actor) => { actor.warRole = "defender"; defenders.push(actor); });
        attackers = allAdults.filter((actor) => actor.warRole === "attacker");
        const fronts = World.splitAttackersAcrossFronts ? World.splitAttackersAcrossFronts(attackers.map((actor) => actor.humanId), enemies) : null;
        attackers.forEach((actor, index) => {
            assignPermanentActorRole(actor, "warrior");
            actor.warFrontId = fronts ? Number(Object.keys(fronts).find((enemyId) => fronts[enemyId].indexOf(actor.humanId) !== -1)) : enemies[index % enemies.length];
        });
        allAdults.filter((actor) => actor.warRole === "defender").forEach((actor) => { assignPermanentActorRole(actor, "guard"); delete actor.warFrontId; });
        recordPermanentRoleChanges(allAdults, previousRoles);
    }

    function planFactionConstruction(faction) {
        const constructionSlots = Math.max(1, safeNumber(faction && faction.techModifiers && faction.techModifiers.constructionSlots, 1));
        if (!faction) return;
        const eraTarget = Core.eraPopulationTarget ? Core.eraPopulationTarget(eraIndexFor(faction)) : (World.populationTarget ? World.populationTarget(eraIndexFor(faction)) : 6);
        faction.settlements.forEach((banner) => {
            if (!banner || banner.townCenterActive === false) return;
            const localSites = faction.constructionSites.filter((site) => site.settlementId === banner.settlementId);
            if (localSites.length >= constructionSlots) return;
            if (!banner.buildRetry || typeof banner.buildRetry !== "object") banner.buildRetry = {};
            const local = (list) => list.filter((building) => building.settlementId === banner.settlementId);
            const hasSeeds = Object.keys(banner.stock.seeds || {}).some((seed) => banner.stock.seeds[seed] > 0);
            const housingUrgent = banner.housing < Math.min(eraTarget, safeNumber(banner.population, 0) + 2);
            const candidates = [];
            if (housingUrgent) candidates.push("hut");
            else {
                if (!local(faction.lumberyards).length) candidates.push("lumberyard");
                if (!local(faction.hearths).length) candidates.push("hearth");
                if (!local(faction.huts).length) candidates.push("hut");
                if (!local(faction.farms).length && hasSeeds) candidates.push("farm");
                if (!local(faction.workshops).length) candidates.push("workshop");
                if (!local(faction.quarries).length) candidates.push("quarry");
                if (!local(faction.granaries).length) candidates.push("granary");
                if (!local(faction.kilns).length) candidates.push("kiln");
                if (!local(faction.foundries).length) candidates.push("foundry");
                if (!local(faction.forges).length) candidates.push("forge");
                if (!local(faction.defenses).length) candidates.push("palisade");
                if (!local(faction.towers).length) candidates.push("watchtower");
                if (!local(faction.keeps).length) candidates.push("keep");
                if (!local(faction.siegeWorkshops).length) candidates.push("siege_workshop");
                if (!local(faction.libraries).length) candidates.push("library");
                if (!local(faction.markets).length) candidates.push("market");
            }
            const attempted = new Set();
            for (let i = 0; i < candidates.length; i++) {
                const type = candidates[i];
                if (attempted.has(type) || pixelTicks < safeNumber(banner.buildRetry[type], 0)) continue;
                attempted.add(type);
                if (!unlockedBuilding(faction, type)) continue;
                const blueprint = BLUEPRINTS[type];
                if (!blueprint || !hasStock(banner, blueprint.cost)) continue;
                const site = createConstruction(banner, type);
                if (site) { faction.constructionSites.push(site); return; }
                banner.buildRetry[type] = pixelTicks + C.BUILD_RETRY_TICKS;
            }
        });
    }

    function craftForFaction(faction) {
        const banner = faction && faction.settlements[0];
        const workshop = faction && (faction.forges[0] || faction.foundries[0] || faction.workshops[0]);
        const workers = facilityWorkers(faction, workshop, ["artisan", "industry"]);
        if (!banner || !workshop || !workers.length || pixelTicks - (workshop.lastCraftTick || 0) < 120) return;
        const noTechData = !hasTechnologyData();
        const choices = [
            {id: "crossbow", tech: "crossbow"},
            {id: "iron_sword", tech: "iron_weapons"},
            {id: "bronze_spear", tech: "bronze_weapons"},
            {id: "bow", tech: "bowmaking"},
            {id: "spear", tech: "stone_spearheads"},
            {id: "club", tech: "war_clubs"}
        ];
        const ranks = {fists: 0, club: 1, spear: 2, bow: 2.2, bronze_spear: 3, iron_sword: 4, crossbow: 5};
        const selected = choices.find((choice) => noTechData ? (choice.id === "spear" || choice.id === "club") : hasTech(faction, choice.tech));
        if (!selected) return;
        const weapon = selected.id;
        const target = faction.adults.filter((actor) => !actor.dead && safeNumber(ranks[actor.weapon || "fists"], 0) < ranks[weapon]).sort((a, b) => safeNumber(ranks[a.weapon || "fists"], 0) - safeNumber(ranks[b.weapon || "fists"], 0))[0];
        if (!target) return;
        const descriptor = manager.weapons.get(weapon);
        if (!descriptor || !spendStock(banner, descriptor.cost || {})) return;
        target.weapon = weapon;
        workshop.lastCraftTick = pixelTicks;
        addPersonActivityMetrics(workers[0], {
            weaponsCrafted: {[weapon]: 1},
            equipmentIssued: {[weapon]: 1},
            lastEquipmentRecipient: "H" + target.humanId
        });
    }

    function consumeFuel(stock, fuelUse) {
        if (!stock || !fuelUse) return false;
        const available = availableFuelStock(stock);
        const canPay = Object.keys(fuelUse).every((fuel) => safeNumber(available[fuel], 0) >= safeNumber(fuelUse[fuel], 0));
        if (!canPay) return false;
        Object.keys(fuelUse).forEach((fuel) => {
            let amount = Math.max(0, Math.floor(safeNumber(fuelUse[fuel], 0)));
            if (!amount) return;
            if (fuel === "charcoal") {
                spendMaterial(stock, fuel, amount);
                return;
            }
            stock.wood = Math.max(0, safeNumber(stock.wood, 0) - amount);
            if (!stock.materials) return;
            const detailed = Math.min(amount, safeNumber(stock.materials[fuel], 0));
            stock.materials[fuel] -= detailed;
        });
        return true;
    }

    function processRecipe(faction, building, recipeId) {
        const banner = faction && (manager.settlementById.get(building && building.settlementId) || faction.settlements[0]);
        const recipe = TechData.RECIPES && TechData.RECIPES[recipeId];
        if (!banner || !building || !recipe || pixelTicks - safeNumber(building.lastProcessTick, 0) < 150) return false;
        ensureStock(banner);
        if (!(recipe.inputs || []).every((input) => materialAmount(banner.stock, input.resource) >= input.amount)) return false;
        const fuelPlan = recipe.heat > 0 ? (Core.selectFuelCombination ? Core.selectFuelCombination(availableFuelStock(banner.stock), recipe.heat, FUEL_VALUES) : null) : {used: {}};
        if (recipe.heat > 0 && !fuelPlan) return false;
        (recipe.inputs || []).forEach((input) => spendMaterial(banner.stock, input.resource, input.amount));
        if (!consumeFuel(banner.stock, fuelPlan.used)) {
            (recipe.inputs || []).forEach((input) => addMaterial(banner.stock, input.resource, input.amount));
            return false;
        }
        const produced = {};
        (recipe.outputs || []).forEach((output) => {
            addMaterial(banner.stock, output.resource, output.amount);
            produced[output.resource] = safeNumber(produced[output.resource], 0) + output.amount;
            if (!banner.firstProducedResources || typeof banner.firstProducedResources !== "object") banner.firstProducedResources = {};
            if (!banner.firstProducedResources[output.resource]) {
                banner.firstProducedResources[output.resource] = true;
                logSettlementEvent(banner, "first_production", "首次生产资源：" + output.resource, {resource: output.resource, amount: output.amount, recipeId});
            }
        });
        building.lastProcessTick = pixelTicks;
        const research = ensureResearchState(banner);
        research.milestones.itemsSmelted = safeNumber(research.milestones.itemsSmelted, 0) + 1;
        addDomainExperience(banner, "production", 0.2);
        const worker = facilityWorkers(faction, building, ["industry", "artisan"])[0];
        if (worker) addPersonActivityMetrics(worker, {resourcesProduced: produced, recipesCompleted: {[recipeId]: 1}});
        return true;
    }

    function facilityWorkers(faction, building, roles) {
        if (!faction || !building) return [];
        return faction.adults.filter((actor) => !actor.dead && roles.indexOf(actor.role) !== -1 && Core.distance(actor.x, actor.y, building.x, building.y) <= 2.5).sort((a, b) => {
            const assignedA = a.task === "facility" && a.targetId === building.buildingId ? 0 : 1;
            const assignedB = b.task === "facility" && b.targetId === building.buildingId ? 0 : 1;
            return assignedA - assignedB || Core.distance(a.x, a.y, building.x, building.y) - Core.distance(b.x, b.y, building.x, building.y) || a.humanId - b.humanId;
        });
    }

    function facilityStaffed(faction, building, roles) {
        return facilityWorkers(faction, building, roles).length > 0;
    }

    function processFactionIndustry(faction) {
        if (!faction) return;
        faction.settlements.forEach((banner) => {
            if (banner.townCenterActive === false) return;
            const local = (list) => list.filter((building) => building.settlementId === banner.settlementId);
            const kiln = local(faction.kilns)[0];
            const foundry = local(faction.foundries)[0];
            const forge = local(faction.forges)[0];
            if (hasTech(faction, "charcoal_kiln") && kiln && facilityStaffed(faction, kiln, ["industry", "artisan"]) && materialAmount(banner.stock, "charcoal") < 12 && banner.stock.wood >= 6) processRecipe(faction, kiln, "charcoal");
            if (foundry && facilityStaffed(faction, foundry, ["industry", "artisan"])) {
                if (hasTech(faction, "iron_smelting") && materialAmount(banner.stock, "raw_iron") >= 2) processRecipe(faction, foundry, "iron");
                else if (hasTech(faction, "bronze_foundry")) processRecipe(faction, foundry, "bronze");
            }
            if (forge && facilityStaffed(faction, forge, ["industry", "artisan"]) && hasTech(faction, "steelmaking")) processRecipe(faction, forge, "steel");
        });
    }

    function processFactionCommunity(faction) {
        if (!faction || !faction.hearths.length || !hasTech(faction, "controlled_fire")) return;
        for (let i = 0; i < faction.adults.length; i++) {
            const actor = faction.adults[i];
            if (!actor || actor.dead || actor.hp >= actor.maxHp) continue;
            const nearHearth = faction.hearths.some((hearth) => !hearth.del && Core.distance(actor.x, actor.y, hearth.x, hearth.y) <= 6);
            if (nearHearth) actor.hp = Math.min(actor.maxHp, actor.hp + 2);
        }
    }

    function initializeChild(child, faction, banner) {
        if (!child || child.del) return null;
        const humanId = manager.nextHumanId++;
        Object.assign(child, {
            humanId: humanId,
            factionId: faction.id,
            factionColor: faction.color,
            settlementId: banner.settlementId,
            role: "child",
            dead: false,
            hp: C.CHILD_HP,
            maxHp: C.CHILD_HP,
            birthTick: pixelTicks,
            lifespanYears: randomLifespanYears(),
            ageTicks: 0,
            dir: Math.random() < 0.5 ? -1 : 1,
            task: "idle",
            weapon: "fists",
            carry: {},
            carryCapacity: C.BASE_CARRY_CAPACITY,
            attackReadyTick: 0
        });
        if (factionIsAtWar(faction.id)) child.warRole = "defender";
        child.naturalDeathTick = child.birthTick + child.lifespanYears * C.TICKS_PER_YEAR;
        ensureLifeHistory(child, false);
        ensurePersonActivity(child, false);
        recordPersonLifeEvent(child, "birth", {settlementId: banner.settlementId});
        beginPersonActivity(child, "idle", null);
        setPixelColor(child, faction.color);
        registerPixel(child);
        return child;
    }

    function findBirthSpot(banner, faction) {
        const localHuts = faction.huts.filter((hut) => hut.settlementId === banner.settlementId);
        const homes = localHuts.length ? localHuts : [banner];
        for (let i = 0; i < homes.length; i++) {
            const home = homes[i];
            for (let radius = 1; radius <= 12; radius++) {
                const xs = [home.x - radius, home.x + radius];
                for (let j = 0; j < xs.length; j++) {
                    const y = findSurfaceY(xs[j], home.y);
                    if (y === null || outOfBounds(xs[j], y - 1)) continue;
                    const bodyProbe = {element: "civ_body"};
                    const headProbe = {element: "civ_head"};
                    const bodyOpen = typeof canCreatureOccupy === "function" ? canCreatureOccupy(bodyProbe, xs[j], y) : isEmpty(xs[j], y);
                    const headOpen = typeof canCreatureOccupy === "function" ? canCreatureOccupy(headProbe, xs[j], y - 1) : isEmpty(xs[j], y - 1);
                    if (bodyOpen && headOpen && solidGroundAt(xs[j], y)) return {x: xs[j], y: y};
                }
            }
        }
        return null;
    }

    function createWorkingPersonAt(spot, faction, banner) {
        if (!spot || !faction || !banner) return null;
        const body = createPixel("civ_body", spot.x, spot.y, {factionId: faction.id, settlementId: banner.settlementId});
        if (!body) return null;
        const head = createPixel("civ_head", spot.x, spot.y - 1, {factionId: faction.id, settlementId: banner.settlementId});
        if (!head) {
            deleteExactPixel(body);
            return null;
        }
        const actor = initializeAdult(body, head, {factionId: faction.id, factionColor: faction.color, settlementId: banner.settlementId, birthTick: pixelTicks, creationEvent: "birth"});
        if (!actor) return null;
        faction.actors.push(actor);
        faction.adults.push(actor);
        faction.population++;
        faction.adultPopulation++;
        banner.population = safeNumber(banner.population, 0) + 1;
        return actor;
    }

    function reproduceFaction(faction) {
        if (!faction) return;
        const targetPopulation = Core.eraPopulationTarget ? Core.eraPopulationTarget(eraIndexFor(faction)) : (World.populationTarget ? World.populationTarget(eraIndexFor(faction)) : 6);
        const created = [];
        faction.settlements.forEach((banner) => {
            if (!banner || banner.townCenterActive === false) return;
            let localPopulation = faction.actors.filter((actor) => actor.settlementId === banner.settlementId && !actor.dead).length;
            const birthFoodCost = C.BIRTH_FOOD_COST;
            ensureStock(banner);
            while (localPopulation < targetPopulation && materialAmount(banner.stock, "food") >= birthFoodCost) {
                const spot = findBirthSpot(banner, faction);
                if (!spot) break;
                spendMaterial(banner.stock, "food", birthFoodCost);
                const actor = createWorkingPersonAt(spot, faction, banner);
                if (!actor) {
                    addMaterial(banner.stock, "food", birthFoodCost);
                    break;
                }
                created.push(actor);
                localPopulation++;
                banner.lastBirthTick = pixelTicks;
                banner.birthReadyTick = pixelTicks;
                const research = ensureResearchState(faction.settlements[0]);
                research.milestones.births = safeNumber(research.milestones.births, 0) + 1;
                research.knowledge += 0.5 * safeNumber(faction.techModifiers && faction.techModifiers.milestoneKnowledge, 1);
                addDomainExperience(faction.settlements[0], "society", 0.25);
                logSettlementEvent(banner, "birth", "成员诞生并立即参加工作", {humanId: actor.humanId, settlementId: banner.settlementId});
            }
        });
        if (created.length) {
            assignFactionRoles(faction);
            created.forEach((actor) => assignActorTask(actor));
        }
        return created.length;
    }

    function civilizationStep() {
        buildWorldIndex();
        const factions = Array.from(manager.factionById.values());
        let founded = false;
        for (let i = 0; i < factions.length; i++) {
            if (createBannerForFaction(factions[i])) founded = true;
        }
        if (founded) buildWorldIndex();
        stepDiplomacyAndWars();
        const refreshed = Array.from(manager.factionById.values());
        for (let i = 0; i < refreshed.length; i++) {
            const faction = refreshed[i];
            stepResourceExhaustionWars(faction);
            stepFactionResearch(faction);
            assignFactionRoles(faction);
            planFactionConstruction(faction);
            processFactionIndustry(faction);
            processFactionCommunity(faction);
            craftForFaction(faction);
            reproduceFaction(faction);
        }
        stepTownCenterRebuilds();
        refreshCivilizationUi();
    }

    function spawnBloodNear(pixel) {
        if (!pixel || !elements.blood) return;
        const offsets = [[0, -1], [-1, 0], [1, 0], [0, 1]];
        for (let i = 0; i < offsets.length; i++) {
            const x = pixel.x + offsets[i][0];
            const y = pixel.y + offsets[i][1];
            if (!outOfBounds(x, y) && isEmpty(x, y)) {
                createPixel("blood", x, y);
                return;
            }
        }
    }

    function markActorDead(actor, tick, details) {
        if (!actor) return;
        if (actor.dead) return;
        const deathTick = Math.max(1, Number.isFinite(tick) ? tick : pixelTicks);
        finishPersonActivity(actor, "death", actor.deathCause || "injury", details);
        actor.hp = 0;
        actor.dead = deathTick;
        actor.task = "dead";
        delete actor.playerOrder;
        if (commandPersonId === actor.humanId) cancelPersonCommand();
        recordPersonLifeEvent(actor, "death", Object.assign({cause: actor.deathCause || "injury", ageYears: ageYears(actor)}, details || {}));
        const banner = settlementForActor(actor);
        if (banner) logSettlementEvent(banner, "death", "成员死亡", {humanId: actor.humanId, cause: actor.deathCause || "injury", age: ageYears(actor)});
        archivePerson(actor, details);
        if (actor.element === "civ_body") {
            const head = getBodyHead(actor);
            if (head) head.dead = deathTick;
        }
    }

    function damageActor(pixelOrId, amount, source) {
        let actor = typeof pixelOrId === "number" ? manager.actorById.get(pixelOrId) : getActorFromPixel(pixelOrId);
        const sourceFaction = source && source.factionId !== undefined ? source.factionId : (Number.isFinite(source) ? source : null);
        if (!actor || actor.del || actor.dead) return false;
        if (sourceFaction !== null && sourceFaction !== actor.factionId && getPeaceMode() === "full-peace") return false;
        const defendingFaction = manager.factionById.get(actor.factionId);
        const reduction = Math.max(0, Math.min(0.8, safeNumber(defendingFaction && defendingFaction.techModifiers && defendingFaction.techModifiers.damageReduction, 0)));
        const damage = Math.max(0, Number(amount) || 0) * (1 - reduction);
        if (!damage) return false;
        actor.hp = Math.max(0, safeNumber(actor.hp, actor.maxHp || C.ADULT_HP) - damage);
        addPersonActivityMetrics(actor, {damageTaken: damage});
        if (source && Number.isFinite(source.humanId)) addPersonActivityMetrics(source, {hits: 1, damageDealt: damage});
        actor.underAttackUntil = pixelTicks + 90;
        if (source && Number.isFinite(source.humanId) && source.factionId !== actor.factionId) {
            lockCombatTarget(actor, source);
        }
        if (sourceFaction !== null && sourceFaction !== actor.factionId) recordIncident(sourceFaction, actor.factionId, "hit");
        if (actor.hp <= 0) {
            if (source && Number.isFinite(source.humanId)) addPersonActivityMetrics(source, {kills: 1});
            markActorDead(actor, pixelTicks, {killerHumanId: source && source.humanId || null, killerFactionId: sourceFaction});
            if (sourceFaction !== null && sourceFaction !== actor.factionId) recordIncident(sourceFaction, actor.factionId, "kill");
        }
        return true;
    }

    function attackProxy(actor) {
        return {
            id: actor.humanId,
            factionId: actor.factionId,
            isChild: actor.element === "civ_child",
            dead: !!actor.dead,
            x: actor.x,
            y: actor.y,
            hp: safeNumber(actor.hp, 0),
            maxHp: safeNumber(actor.maxHp, C.ADULT_HP),
            role: actor.role,
            weapon: manager.weapons.get(actor.weapon) || manager.weapons.get("fists"),
            attackReadyTick: safeNumber(actor.attackReadyTick, 0)
        };
    }

    function resolveActorAttacks() {
        if (!manager.pendingAttacks.length) return;
        const pending = manager.pendingAttacks.splice(0, manager.pendingAttacks.length);
        const remaining = [];
        for (let i = 0; i < pending.length; i++) {
            const intent = pending[i];
            if (safeNumber(intent.dueTick, intent.tick + 1) > pixelTicks) { remaining.push(intent); continue; }
            const attacker = manager.actorById.get(intent.attackerId);
            const target = manager.actorById.get(intent.targetId);
            if (!attacker || attacker.del || attacker.dead || !target || target.del || target.dead || attacker.factionId === target.factionId) continue;
            if (!atWar(attacker.factionId, target.factionId) && !retaliationAllowed(attacker, target)) continue;
            attacker.strikeDueTick = undefined;
            attacker.strikeTargetId = undefined;
            lockCombatTarget(target, attacker);
            target.underAttackUntil = pixelTicks + 90;
            addPersonActivityMetrics(attacker, {attacks: 1});
            if (Math.random() >= 0.5) { addPersonActivityMetrics(attacker, {misses: 1}); continue; }
            const weapon = manager.weapons.get(attacker.weapon) || manager.weapons.get("fists");
            const damage = Math.max(0.1, safeNumber(weapon && weapon.damage, 8) * 0.1);
            damageActor(target, damage, attacker);
            if (Math.random() < C.ATTACK_BLOOD_CHANCE) spawnBloodNear(target);
            const dx = Math.sign(target.x - attacker.x) || (attacker.dir || 1);
            if (target._r !== undefined) {
                const relation = getRelation(target._r);
                if (relation) tryMoveRelation(relation, dx, 0, true);
            }
            else tryMove(target, target.x + dx, target.y);
            const attackingBanner = settlementForActor(attacker);
            if (attackingBanner) addDomainExperience(attackingBanner, "military", 0.08);
        }
        manager.pendingAttacks.push.apply(manager.pendingAttacks, remaining);
    }

    function resolveRangedImpacts() {
        if (!manager.pendingRangedImpacts.length) return;
        const remaining = [];
        for (let i = 0; i < manager.pendingRangedImpacts.length; i++) {
            const impact = manager.pendingRangedImpacts[i];
            if (impact.dueTick > pixelTicks) {
                remaining.push(impact);
                continue;
            }
            const attacker = manager.actorById.get(impact.attackerId);
            const target = manager.actorById.get(impact.targetId);
            if (!attacker || attacker.dead || !target || target.dead || attacker.factionId === target.factionId || !atWar(attacker.factionId, target.factionId)) continue;
            addPersonActivityMetrics(attacker, {attacks: 1});
            if (impact.hit) {
                damageActor(target, impact.damage, attacker);
                const banner = settlementForActor(attacker);
                if (banner) addDomainExperience(banner, "military", 0.12);
                if (Math.random() < C.ATTACK_BLOOD_CHANCE) spawnBloodNear(target);
            }
            else addPersonActivityMetrics(attacker, {misses: 1});
        }
        manager.pendingRangedImpacts = remaining;
    }

    function damageStructure(target, amount, attackerFactionId) {
        if (!target || target.del) return false;
        if (Number.isFinite(attackerFactionId) && Number.isFinite(target.factionId) && attackerFactionId !== target.factionId && getPeaceMode() === "full-peace") return false;
        if (target.element !== "civ_banner" && target.element !== "civ_construction" && !STRUCTURE_CORES.has(target.element) && !STRUCTURE_PARTS.has(target.element)) return false;
        const defaultHp = target.element === "civ_structure_stone" ? 80 : (target.element === "civ_structure_wood" ? 30 : 120);
        if (!Number.isFinite(target.structureHp)) target.structureHp = defaultHp;
        if (!Number.isFinite(target.structureMaxHp)) target.structureMaxHp = defaultHp;
        target.structureHp = Math.max(0, target.structureHp - Math.max(0, Number(amount) || 0));
        if (target.structureHp <= 0) {
            if (Number.isFinite(attackerFactionId) && Number.isFinite(target.factionId)) recordIncident(attackerFactionId, target.factionId, "kill");
            ruinPixel(target);
        }
        return true;
    }

    function resolveStructureAttacks() {
        if (!manager.pendingStructureAttacks.length) return;
        const intents = manager.pendingStructureAttacks.splice(0, manager.pendingStructureAttacks.length);
        const remaining = [];
        const usedAttackers = new Set();
        for (let i = 0; i < intents.length; i++) {
            const intent = intents[i];
            if (safeNumber(intent.dueTick, safeNumber(intent.scheduledTick, pixelTicks) + 1) > pixelTicks) {
                remaining.push(intent);
                continue;
            }
            const attacker = manager.actorById.get(intent.attackerId);
            const target = intent.target;
            if (!attacker || attacker.del || attacker.dead || !target || target.del || usedAttackers.has(attacker.humanId)) continue;
            attacker.structureStrikeDueTick = undefined;
            attacker.structureStrikeKey = undefined;
            if (!atWar(attacker.factionId, target.factionId)) continue;
            const weapon = manager.weapons.get(attacker.weapon) || manager.weapons.get("fists");
            usedAttackers.add(attacker.humanId);
            addPersonActivityMetrics(attacker, {attacks: 1});
            if (Math.random() >= 0.5) { addPersonActivityMetrics(attacker, {misses: 1}); continue; }
            const attackerFaction = manager.factionById.get(attacker.factionId);
            const multiplier = safeNumber(attackerFaction && attackerFaction.techModifiers && attackerFaction.techModifiers.structureDamageMultiplier, 1);
            const beforeHp = safeNumber(target.structureHp, target.structureMaxHp || 120);
            damageStructure(target, Math.max(0.1, safeNumber(weapon.damage, 8) * 0.1) * multiplier, attacker.factionId);
            const dealt = Math.max(0, beforeHp - safeNumber(target.structureHp, 0));
            addPersonActivityMetrics(attacker, {hits: 1, structureDamage: dealt, structuresDestroyed: target.structureHp <= 0 ? 1 : 0});
        }
        manager.pendingStructureAttacks.push.apply(manager.pendingStructureAttacks, remaining);
    }

    function resolvePendingAttacks() {
        resolveRangedImpacts();
        resolveActorAttacks();
        resolveStructureAttacks();
    }

    function runEnvironment(pixel, expectedElement) {
        doHeat(pixel);
        if (pixel.del || pixel.element !== expectedElement) return false;
        doBurning(pixel);
        if (pixel.del || pixel.element !== expectedElement) return false;
        doElectricity(pixel);
        return !pixel.del && pixel.element === expectedElement;
    }

    function processLife(actor) {
        ensureLifeHistory(actor, actor.element === "civ_body");
        actor.ageTicks = Math.max(0, pixelTicks - actor.birthTick);
        const naturalDeathDue = Core.isNaturalDeathDue ? Core.isNaturalDeathDue(actor, pixelTicks) : pixelTicks >= actor.naturalDeathTick;
        if (!actor.dead && naturalDeathDue) {
            actor.deathCause = "old_age";
            markActorDead(actor, pixelTicks);
            return;
        }
        const healInterval = C.PASSIVE_HEAL_INTERVAL_TICKS || 60;
        if (!actor.dead && pixelTicks % healInterval === 0) {
            actor.hp = Math.min(actor.maxHp, actor.hp + (C.PASSIVE_HEAL_AMOUNT || 1));
        }
    }

    function processCombatFrame(actor) {
        if (!actor || actor.dead) return false;
        let target = Number.isFinite(actor.combatTargetId) ? manager.actorById.get(actor.combatTargetId) : null;
        if (!target && actor.task === "combat" && Number.isFinite(actor.targetId)) target = manager.actorById.get(actor.targetId);
        if (!target || target.dead || target.del || target.factionId === actor.factionId || (!atWar(actor.factionId, target.factionId) && !retaliationAllowed(actor, target))) {
            actor.combatTargetId = undefined;
            return false;
        }
        if (actor.warRole === "defender" && (!manager.territory || manager.territory.ownerAt(target.x) !== actor.factionId)) {
            actor.combatTargetId = undefined;
            if (actor.task === "combat") clearTask(actor, "completed", "target_left_territory");
            return false;
        }
        actor.combatTargetId = target.humanId;
        const weapon = manager.weapons.get(actor.weapon) || manager.weapons.get("fists");
        if (targetInAttackBox(actor, target, weapon) && (!weapon.ranged || mutualLineOfSight(actor, target))) {
            queueAttack(actor, target);
            return true;
        }
        return false;
    }

    function processStructureCombatFrame(actor) {
        if (!actor || actor.dead || actor.task !== "siege") return false;
        const target = getBuildingById(actor.targetId) || (Number.isFinite(actor.targetX) && Number.isFinite(actor.targetY) ? pixelsAt(actor.targetX, actor.targetY).find((pixel) => pixel && pixel.element === actor.targetKind && atWar(actor.factionId, pixel.factionId)) : null);
        if (!target || target.del || !atWar(actor.factionId, target.factionId)) return false;
        const weapon = manager.weapons.get(actor.weapon) || manager.weapons.get("fists");
        const structureRange = Math.max(2, weapon.range);
        const obstruction = adjacentEnemyStructure(actor, structureRange);
        if (obstruction) return queueStructureAttack(actor, obstruction);
        if (Core.distance(actor.x, actor.y, target.x, target.y) <= structureRange) return queueStructureAttack(actor, target);
        return false;
    }

    function adultNavigationActive(actor) {
        if (!actor || !actor.task) return false;
        return actor.task !== "idle" && actor.task !== "dead";
    }

    function applyAdultGravity(actor) {
        if (!actor || actor.del || actor.dead || actor._r === undefined) return false;
        const head = getBodyHead(actor);
        if (tunnelAt(actor.x, actor.y) || (head && tunnelAt(head.x, head.y))) return false;
        if (solidGroundAt(actor.x, actor.y)) return false;
        if (activeClimbSide(actor)) return false;
        const relation = getRelation(actor._r);
        if (!relation || !relation.p || relation.p.length < 2) return false;
        if (!tryMoveRelation(relation, 0, 1, true)) return false;
        actor.pathStage = "fall";
        return true;
    }

    function decayAdult(body) {
        if (!body.dead || pixelTicks - Number(body.dead) <= 200 || Math.random() >= 0.1) return;
        const head = getBodyHead(body);
        if (head && !head.del) changePixel(head, "rotten_meat");
        if (!body.del && body.element === "civ_body") changePixel(body, "rotten_meat");
    }

    function taskNeedsMovement(actor) {
        if (!actor || actor.dead || actor.del) return false;
        return actor.task === "move" || actor.task === "harvest" || actor.task === "deliver" || actor.task === "build" || actor.task === "farm" || actor.task === "plant_tree" || actor.task === "facility" || actor.task === "combat" || actor.task === "siege" || actor.task === "flee" || actor.task === "return" || actor.task === "patrol" || actor.task === "search_resource" || actor.task === "explore";
    }

    function runAdultLocomotion(actor) {
        if (!taskNeedsMovement(actor)) return false;
        if (actor.task === "harvest" && Number.isFinite(actor.harvestX) && Core.distance(actor.x, actor.y, actor.harvestX, actor.harvestY) <= 1.5) return false;
        if (actor.task === "deliver" || actor.task === "build" || actor.task === "facility") {
            if (Number.isFinite(actor.targetX) && Number.isFinite(actor.targetY) && Core.distance(actor.x, actor.y, actor.targetX, actor.targetY) <= 2.5) return false;
        }
        const targetX = Number.isFinite(actor.targetX) ? actor.targetX : (Number.isFinite(actor.searchX) ? actor.searchX : actor.patrolX);
        const targetY = Number.isFinite(actor.targetY) ? actor.targetY : (Number.isFinite(actor.searchY) ? actor.searchY : actor.patrolY);
        if (!Number.isFinite(targetX) || !Number.isFinite(targetY)) return false;
        return moveRelationToward(actor, targetX, targetY, actor.task === "flee" || actor.navigationAway === true);
    }

    function tickBody(pixel) {
        registerPixel(pixel);
        if (!runEnvironment(pixel, "civ_body")) return;
        const head = getBodyHead(pixel);
        if (head && head.dead && !pixel.dead) markActorDead(pixel, Number(head.dead));
        if (pixel.dead) {
            decayAdult(pixel);
            return;
        }
        if (!head && pixelTicks % 30 === 0) {
            pixel.hp = Math.max(0, safeNumber(pixel.hp, pixel.maxHp || C.ADULT_HP) - 5);
            if (pixel.hp <= 0) markActorDead(pixel, pixelTicks);
        }
        processLife(pixel);
        if (pixel.dead) return;
        processCombatFrame(pixel);
        processStructureCombatFrame(pixel);
        if (pixel.burning) {
            pixel.panic = Math.min(50, (pixel.panic || 0) + 1);
            pixel.dir = -(pixel.dir || 1);
        }
        else if (pixel.panic > 0) pixel.panic = Math.max(0, pixel.panic - 0.1);
        if (!Number.isFinite(pixel.humanId)) return;
        if (applyAdultGravity(pixel)) return;
        if ((pixelTicks + pixel.humanId) % C.THINK_INTERVAL === 0) {
            for (let attempt = 0; attempt < 2; attempt++) {
                const activeTask = pixel.task === "move" || pixel.task === "harvest" || pixel.task === "deliver" || pixel.task === "build" ||
                    pixel.task === "farm" || pixel.task === "plant_tree" || pixel.task === "combat" || pixel.task === "siege";
                const taskIsFacility = pixel.task === "facility";
                const urgentReplan = pixel.underAttackUntil > pixelTicks;
                const periodicReplan = !activeTask && !taskIsFacility && (!Number.isFinite(pixel.lastPlanTick) || pixelTicks - pixel.lastPlanTick >= 60);
                if (pixel.playerOrder && !urgentReplan) applyPlayerOrder(pixel);
                if (!pixel.task || pixel.task === "idle" || pixel.task === "planning" || pixel.task === "dead" || urgentReplan || periodicReplan) {
                    if (pixel.playerOrder && !urgentReplan) applyPlayerOrder(pixel);
                    else assignActorTask(pixel);
                    pixel.lastPlanTick = pixelTicks;
                }
                deferAdultLocomotion = true;
                try { runAdultAction(pixel); }
                finally { deferAdultLocomotion = false; }
                if (pixel.task !== "planning") break;
            }
        }
        const relation = pixel._r !== undefined ? getRelation(pixel._r) : null;
        if ((pixelTicks + pixel.humanId) % C.LOCOMOTION_INTERVAL_TICKS === 0 && (!relation || relation.lastMove !== pixelTicks)) runAdultLocomotion(pixel);
    }

    function tickHead(pixel) {
        registerPixel(pixel);
        if (!runEnvironment(pixel, "civ_head")) return;
        const body = getHeadBody(pixel);
        if (body) {
            pixel.orphanedSince = undefined;
            if (body.dead) pixel.dead = body.dead;
        }
        else if (!pixel.dead) {
            if (!Number.isFinite(pixel.orphanedSince)) pixel.orphanedSince = pixelTicks;
            if (pixelTicks - pixel.orphanedSince >= 20) pixel.dead = Math.max(1, pixelTicks);
        }
        if (pixel.dead && pixelTicks - Number(pixel.dead) > 200 && Math.random() < 0.1 && pixel.element === "civ_head") {
            changePixel(pixel, "rotten_meat");
        }
    }

    function growChild(child) {
        if (!child || child.del || child.dead) return false;
        finishPersonActivity(child, "completed", "matured");
        const personActivity = cloneActivityValue(ensurePersonActivity(child, false));
        child.personTransitioning = true;
        const options = {
            humanId: child.humanId,
            factionId: child.factionId,
            factionColor: child.factionColor,
            settlementId: child.settlementId,
            birthTick: child.birthTick,
            lifespanYears: child.lifespanYears,
            naturalDeathTick: child.naturalDeathTick,
            role: child.role && child.role !== "child" ? child.role : (factionIsAtWar(child.factionId) ? "guard" : "worker"),
            weapon: "fists",
            dir: child.dir,
            personActivity: personActivity,
            activityTransition: true
        };
        const adult = materializeAdult(child, options);
        if (!adult && !child.del) {
            child.personTransitioning = false;
            child.personActivity = personActivity;
            beginPersonActivity(child, "planning", null);
        }
        if (adult && factionIsAtWar(adult.factionId)) adult.warRole = "defender";
        if (adult) {
            recordPersonLifeEvent(adult, "legacy_child_conversion", {ageYears: ageYears(adult)});
            const banner = settlementForActor(adult);
            if (banner) logSettlementEvent(banner, "legacy_child_conversion", "旧存档儿童已转换为统一工作人口", {humanId: adult.humanId});
        }
        return !!adult;
    }

    function moveChildToward(child, target) {
        if (!child || !target) return false;
        let dirX = Math.sign(target.x - child.x);
        if (!dirX) dirX = child.dir || 1;
        child.dir = dirX;
        if (tryMove(child, child.x + dirX, child.y)) return true;
        if (tryMove(child, child.x, child.y - 1) || tryMove(child, child.x + dirX, child.y - 1)) return true;
        if (target.y > child.y) return tryMove(child, child.x + dirX, child.y + 1) || tryMove(child, child.x, child.y + 1);
        return false;
    }

    function tickChild(pixel) {
        registerPixel(pixel);
        if (!runEnvironment(pixel, "civ_child")) return;
        if (pixel.dead) {
            if (pixelTicks - Number(pixel.dead) > 200 && Math.random() < 0.1) changePixel(pixel, "rotten_meat");
            return;
        }
        processLife(pixel);
        if (pixel.dead) return;
        if (growChild(pixel)) return;
        processCombatFrame(pixel);
        if (!tunnelAt(pixel.x, pixel.y) && tryMove(pixel, pixel.x, pixel.y + 1)) return;
        if (!Number.isFinite(pixel.humanId) || (pixelTicks + pixel.humanId) % C.THINK_INTERVAL !== 0) return;
        const combatTarget = Number.isFinite(pixel.combatTargetId) ? manager.actorById.get(pixel.combatTargetId) : null;
        if (combatTarget && !combatTarget.del && !combatTarget.dead && combatTarget.factionId !== pixel.factionId &&
            (atWar(pixel.factionId, combatTarget.factionId) || retaliationAllowed(pixel, combatTarget)) &&
            (pixel.warRole !== "defender" || manager.territory && manager.territory.ownerAt(combatTarget.x) === pixel.factionId)) {
            const weapon = manager.weapons.get(pixel.weapon) || manager.weapons.get("fists");
            if (!targetInAttackBox(pixel, combatTarget, weapon)) moveChildToward(pixel, combatTarget);
            return;
        }
        if (pixel.task === "combat") clearTask(pixel, combatTarget && combatTarget.dead ? "completed" : "interrupted", combatTarget && combatTarget.dead ? "target_defeated" : "target_lost");
        if (pixel.warRole === "defender") {
            const enemy = currentEnemy(pixel, 30);
            if (enemy) {
                pixel.combatTargetId = enemy.humanId;
                setTask(pixel, "combat", enemy);
                const weapon = manager.weapons.get(pixel.weapon) || manager.weapons.get("fists");
                if (!targetInAttackBox(pixel, enemy, weapon)) moveChildToward(pixel, enemy);
                return;
            }
        }
        const banner = settlementForActor(pixel);
        let direction = pixel.dir || 1;
        if (banner && Core.distance(pixel.x, pixel.y, banner.x, banner.y) > Math.max(4, banner.territoryRadius / 2)) direction = Math.sign(banner.x - pixel.x) || direction;
        else if (Math.random() < 0.2) direction *= -1;
        pixel.dir = direction;
        if (!tryMove(pixel, pixel.x + direction, pixel.y)) {
            if (!tryMove(pixel, pixel.x, pixel.y - 1)) tryMove(pixel, pixel.x + direction, pixel.y - 1);
        }
    }

    function structureOnPlace(pixel, maximumHp) {
        if (!Number.isFinite(pixel.structureHp)) pixel.structureHp = maximumHp;
        if (!Number.isFinite(pixel.structureMaxHp)) pixel.structureMaxHp = maximumHp;
        if (isBuildingCorePixel(pixel)) {
            ensureBuildingMetadata(pixel);
            if (Number.isFinite(pixel.factionId)) reserveBuildingTerritory(pixel);
        }
        registerPixel(pixel);
    }

    function bannerOnPlace(pixel) {
        structureOnPlace(pixel, 120);
        ensureStock(pixel);
        ensureResearchState(pixel);
        ensureDeceasedArchive(pixel);
        if (!pixel.diplomacy || typeof pixel.diplomacy !== "object") pixel.diplomacy = {};
    }

    function constructionOnDelete(pixel) {
        if (!pixel.cancelled && !pixel.completed) cancelConstruction(pixel, true);
        else onCivilizedDelete(pixel);
    }

    function actorHoverStat(pixel) {
        const actor = getActorFromPixel(pixel) || pixel;
        const weapon = actor.weapon || "fists";
        const role = actor.role || (actor.element === "civ_child" ? "child" : "worker");
        return "H" + (actor.humanId || "?") + " · F" + (actor.factionId || "?") + " · " + role + " · HP " + Math.max(0, Math.round(actor.hp || 0)) + " · Age " + ageYears(actor).toFixed(1) + "/" + Math.round(actor.lifespanYears || 55) + " · " + weapon;
    }

    function bannerHoverStat(pixel) {
        const faction = manager.factionById.get(pixel.factionId);
        const stock = pixel.stock || {food: 0, wood: 0, stone: 0};
        const era = eraDefinition(pixel.eraId);
        const eraTechIds = era && era.techIds || [];
        const completed = eraTechIds.filter((techId) => pixel.research && pixel.research.unlocked && pixel.research.unlocked[techId]).length;
        return "F" + (pixel.factionId || "?") + " · " + (era ? era.name : pixel.stage || "camp") + " " + completed + "/8 · Pop " + (faction ? faction.population : "?") + "/" + (pixel.housing || 2) + " · F/W/S " + Math.floor(stock.food || 0) + "/" + Math.floor(stock.wood || 0) + "/" + Math.floor(stock.stone || 0);
    }

    function renderTerritoryHover(ctx) {
        const hovered = buildingVisualAt(Math.round(mousePos.x), Math.round(mousePos.y));
        if (!manager.overlaySettings.territory && !hovered) return;
        ctx.save();
        if (manager.overlaySettings.territory && manager.territory) {
            let start = 0;
            while (start < manager.territory.width) {
                const owner = manager.territory.ownerAt(start);
                let end = start;
                while (end + 1 < manager.territory.width && manager.territory.ownerAt(end + 1) === owner) end++;
                if (owner !== null && owner !== undefined) {
                    ctx.globalAlpha = 0.11;
                    ctx.fillStyle = factionColor(owner);
                    ctx.fillRect(canvasCoord(start), canvasCoord(0), (end - start + 1) * pixelSize, (height + 1) * pixelSize);
                }
                start = end + 1;
            }
        }
        if (hovered) {
            ctx.globalAlpha = 0.7;
            ctx.strokeStyle = hovered.factionColor || factionColor(hovered.factionId);
            ctx.lineWidth = Math.max(1, pixelSize / 3);
            const minX = Math.max(0, hovered.x - C.TERRITORY_HALF_WIDTH);
            const maxX = Math.min(width, hovered.x + C.TERRITORY_HALF_WIDTH);
            ctx.strokeRect(canvasCoord(minX), canvasCoord(0), (maxX - minX + 1) * pixelSize, (height + 1) * pixelSize);
        }
        ctx.restore();
    }

    function renderResourceOverlay(ctx) {
        if (!manager.overlaySettings.resources) return;
        const filters = manager.overlaySettings.resourceFilters;
        const colors = {food: "#76d15f", wood: "#58a35c", stone: "#a6a6a6", copper: "#d78655", tin: "#d7d8df", raw_iron: "#a85d45"};
        manager.resourceIndex.forEach((nodes, kind) => {
            const category = kind === "food" ? "food" : (kind === "wood" ? "tree" : (kind === "stone" ? "stone" : "metals"));
            ctx.save();
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = colors[kind] || "#ffffff";
            nodes.forEach((node) => {
                if (!node.pixel || node.pixel.del) return;
                const isDrop = node.pixel._civResourceDrop === true;
                if (isDrop ? !filters.drops : !filters[category]) return;
                ctx.fillRect(canvasCoord(node.x) + pixelSize * 0.3, canvasCoord(node.y) + pixelSize * 0.3, Math.max(1, pixelSize * 0.4), Math.max(1, pixelSize * 0.4));
            });
            ctx.restore();
        });
    }

    function renderCivilizedBody(pixel, ctx) {
        drawSquare(ctx, pixel.color, pixel.x, pixel.y);
        if (!pixel.weapon || pixel.weapon === "fists") return;
        const ranged = pixel.weapon === "bow" || pixel.weapon === "crossbow";
        const length = pixel.weapon === "spear" || pixel.weapon === "bronze_spear" ? 1.35 : (ranged ? 0.65 : 0.75);
        const direction = pixel.dir || 1;
        ctx.save();
        ctx.strokeStyle = pixel.weapon === "iron_sword" ? "#c6c8cb" : (pixel.weapon === "crossbow" ? "#a99a7d" : (pixel.weapon === "spear" || pixel.weapon === "bronze_spear" ? "#9a835b" : "#6f4a2d"));
        ctx.lineWidth = Math.max(1, pixelSize / 5);
        ctx.beginPath();
        ctx.moveTo(canvasCoord(pixel.x) + pixelSize / 2, canvasCoord(pixel.y) + pixelSize / 2);
        ctx.lineTo(canvasCoord(pixel.x) + pixelSize / 2 + direction * pixelSize * length, canvasCoord(pixel.y) + pixelSize / 3);
        ctx.stroke();
        ctx.restore();
    }

    function renderRangedProjectiles(ctx) {
        if (!manager.visualProjectiles.size) return;
        const expired = [];
        manager.visualProjectiles.forEach((projectile) => {
            const duration = Math.max(1, projectile.dueTick - projectile.startTick);
            const progress = Math.max(0, Math.min(1, (pixelTicks - projectile.startTick) / duration));
            const x = projectile.x0 + (projectile.x1 - projectile.x0) * progress;
            const y = projectile.y0 + (projectile.y1 - projectile.y0) * progress;
            ctx.save();
            ctx.fillStyle = projectile.color || "#d4bc85";
            ctx.beginPath();
            ctx.arc(canvasCoord(x) + pixelSize / 2, canvasCoord(y) + pixelSize / 2, Math.max(1, pixelSize / 7), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            if (pixelTicks > projectile.dueTick + 2) expired.push(projectile);
        });
        for (let i = 0; i < expired.length; i++) manager.visualProjectiles.delete(expired[i]);
    }

    function renderBuildingSprites(ctx, layer) {
        const seen = new Set();
        const draw = (building) => {
            if (!isBuildingCorePixel(building) || building.buildingState === "destroyed" || seen.has(building)) return;
            const configuredLayer = typeof interactionRenderLayer === "function" ? interactionRenderLayer(building) : "default";
            const drawsOnTop = configuredLayer !== "normal";
            if ((layer === "top") !== drawsOnTop) return;
            seen.add(building);
            ctx.save();
            ctx.globalAlpha = building.element === "civ_construction" ? 0.55 : 1;
            ctx.fillStyle = building.factionColor || factionColor(building.factionId) || building.color;
            ctx.fillRect(canvasCoord(building.x - 1), canvasCoord(building.y - 2), pixelSize * 3, pixelSize * 3);
            ctx.restore();
        };
        manager.settlements.forEach(draw);
        manager.constructionSites.forEach(draw);
        manager.structures.forEach(draw);
    }

    function renderNormalBuildingSprites(ctx) { renderBuildingSprites(ctx, "normal"); }
    function renderTopBuildingSprites(ctx) { renderBuildingSprites(ctx, "top"); }

    const organicReactions = {
        cancer: {elem1: "cancer", chance: 0.005},
        radiation: {elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.4},
        plague: {elem1: "plague", chance: 0.05}
    };

    elements.civilized_human = {
        color: SKIN_COLORS,
        category: "civilization",
        properties: {dead: false, dir: 1, panic: 0},
        onPlace: function (pixel) { materializeAdult(pixel); },
        related: ["civ_body", "civ_head", "civ_child", "civ_banner", "civ_hut_core", "civ_farm_marker", "civ_workshop_core"],
        cooldown: typeof defaultCooldown !== "undefined" ? defaultCooldown : 1,
        maxSize: 1,
        forceSaveColor: true,
        desc: "会结成阵营、采集、建造、繁衍并因长期敌意发动战争的人类。"
    };

    elements.civ_body = {
        color: FACTION_COLORS,
        category: "civilization",
        hidden: true,
        density: 1500,
        state: "solid",
        relationGravity: "managed",
        conduct: 0.05,
        temp: 37,
        tempHigh: 150,
        stateHigh: "cooked_meat",
        tempLow: -30,
        stateLow: "frozen_meat",
        burn: 10,
        burnTime: 250,
        burnInto: "cooked_meat",
        breakInto: ["blood", "meat", "bone"],
        properties: {dead: false, dir: 1, panic: 0, hp: C.ADULT_HP, maxHp: C.ADULT_HP, role: "worker", task: "idle", weapon: "fists"},
        reactions: organicReactions,
        tick: tickBody,
        renderer: renderCivilizedBody,
        hoverStat: actorHoverStat,
        onPlace: registerPixel,
        onChange: onCivilizedChange,
        onDelete: onCivilizedDelete,
        forceSaveColor: true,
        pickElement: "civilized_human"
    };

    elements.civ_head = {
        color: SKIN_COLORS,
        category: "civilization",
        hidden: true,
        density: 1080,
        state: "solid",
        conduct: 0.05,
        temp: 37,
        tempHigh: 150,
        stateHigh: "cooked_meat",
        tempLow: -30,
        stateLow: "frozen_meat",
        burn: 10,
        burnTime: 250,
        burnInto: "cooked_meat",
        breakInto: ["blood", "meat", "bone"],
        properties: {dead: false},
        reactions: organicReactions,
        tick: tickHead,
        hoverStat: actorHoverStat,
        onPlace: registerPixel,
        onChange: onCivilizedChange,
        onDelete: onCivilizedDelete,
        forceSaveColor: true,
        pickElement: "civilized_human"
    };

    elements.civ_child = {
        color: FACTION_COLORS,
        category: "civilization",
        hidden: true,
        density: 1200,
        state: "solid",
        conduct: 0.04,
        temp: 37,
        tempHigh: 150,
        stateHigh: "cooked_meat",
        tempLow: -30,
        stateLow: "frozen_meat",
        burn: 10,
        burnTime: 200,
        burnInto: "cooked_meat",
        breakInto: ["blood", "meat", "bone"],
        properties: {dead: false, hp: C.CHILD_HP, maxHp: C.CHILD_HP, role: "child", weapon: "fists", dir: 1},
        reactions: organicReactions,
        tick: tickChild,
        hoverStat: actorHoverStat,
        onPlace: registerPixel,
        onChange: onCivilizedChange,
        onDelete: onCivilizedDelete,
        forceSaveColor: true
    };

    elements.civ_banner = {
        color: FACTION_COLORS,
        category: "civilization",
        hidden: true,
        behavior: behaviors.WALL,
        alwaysOverlay: true,
        nonBlocking: true,
        eraseProtected: true,
        isBuildingCore: true,
        state: "solid",
        density: 1800,
        burn: 35,
        burnTime: 160,
        burnInto: ["ash", "civ_ruin"],
        breakInto: "civ_ruin",
        properties: {structureHp: 120, structureMaxHp: 120, housing: 4, territoryRadius: C.TERRITORY_BASE_RADIUS, stage: "camp", stock: {food: 0, wood: 0, stone: 0, seeds: {}}, diplomacy: {}, alwaysOverlay: true, nonBlocking: true, eraseProtected: true, isBuildingCore: true},
        renderer: function () {},
        onPlace: bannerOnPlace,
        onErase: function (pixel) { destroyBuilding(pixel, "erased"); },
        onChange: onCivilizedChange,
        onDelete: onCivilizedDelete,
        hoverStat: bannerHoverStat,
        hoverRender: renderTerritoryHover,
        forceSaveColor: true
    };

    elements.civ_hut_core = {
        color: "#8d633f",
        category: "civilization",
        hidden: true,
        behavior: behaviors.WALL,
        alwaysOverlay: true,
        nonBlocking: true,
        eraseProtected: true,
        isBuildingCore: true,
        state: "solid",
        density: 1700,
        burn: 45,
        burnTime: 180,
        burnInto: "civ_ruin",
        breakInto: "civ_ruin",
        properties: {structureHp: 120, structureMaxHp: 120, alwaysOverlay: true, nonBlocking: true, eraseProtected: true, isBuildingCore: true},
        renderer: function () {},
        onPlace: function (pixel) { structureOnPlace(pixel, 120); },
        onErase: function (pixel) { destroyBuilding(pixel, "erased"); },
        onChange: onCivilizedChange,
        onDelete: onCivilizedDelete,
        forceSaveColor: true
    };

    elements.civ_farm_marker = {
        color: "#a88942",
        category: "civilization",
        hidden: true,
        behavior: behaviors.WALL,
        alwaysOverlay: true,
        nonBlocking: true,
        eraseProtected: true,
        isBuildingCore: true,
        state: "solid",
        density: 1500,
        burn: 50,
        burnTime: 120,
        burnInto: "ash",
        breakInto: "dirt",
        properties: {structureHp: 60, structureMaxHp: 60, plots: [], alwaysOverlay: true, nonBlocking: true, eraseProtected: true, isBuildingCore: true},
        renderer: function () {},
        onPlace: function (pixel) { structureOnPlace(pixel, 60); },
        onErase: function (pixel) { destroyBuilding(pixel, "erased"); },
        onChange: onCivilizedChange,
        onDelete: onCivilizedDelete,
        forceSaveColor: true
    };

    elements.civ_workshop_core = {
        color: "#77756f",
        category: "civilization",
        hidden: true,
        behavior: behaviors.WALL,
        alwaysOverlay: true,
        nonBlocking: true,
        eraseProtected: true,
        isBuildingCore: true,
        state: "solid",
        density: 2200,
        burn: 20,
        burnTime: 220,
        burnInto: "civ_ruin",
        breakInto: "civ_ruin",
        properties: {structureHp: 120, structureMaxHp: 120, alwaysOverlay: true, nonBlocking: true, eraseProtected: true, isBuildingCore: true},
        renderer: function () {},
        onPlace: function (pixel) { structureOnPlace(pixel, 120); },
        onErase: function (pixel) { destroyBuilding(pixel, "erased"); },
        onChange: onCivilizedChange,
        onDelete: onCivilizedDelete,
        forceSaveColor: true
    };

    function defineSocietyStructureElement(name, options) {
        const opts = options || {};
        elements[name] = {
            color: opts.color || "#77756f",
            category: "civilization",
            hidden: true,
            behavior: behaviors.WALL,
            alwaysOverlay: true,
            nonBlocking: true,
            eraseProtected: true,
            isBuildingCore: true,
            state: "solid",
            density: opts.density || 2100,
            burn: opts.burn === undefined ? 20 : opts.burn,
            burnTime: opts.burnTime || 200,
            burnInto: opts.burnInto || "civ_ruin",
            breakInto: opts.breakInto || "civ_ruin",
            properties: {structureHp: opts.hp || 140, structureMaxHp: opts.hp || 140, alwaysOverlay: true, nonBlocking: true, eraseProtected: true, isBuildingCore: true},
            renderer: function () {},
            onPlace: function (pixel) { structureOnPlace(pixel, opts.hp || 140); },
            onErase: function (pixel) { destroyBuilding(pixel, "erased"); },
            onChange: onCivilizedChange,
            onDelete: onCivilizedDelete,
            forceSaveColor: true
        };
    }

    defineSocietyStructureElement("civ_hearth_core", {color: ["#9a4e2f", "#c06a36"], hp: 80, density: 1800, burn: 5});
    defineSocietyStructureElement("civ_quarry_core", {color: ["#77756f", "#66645f"], hp: 160, density: 2600, burn: 0, breakInto: ["rock", "gravel"]});
    defineSocietyStructureElement("civ_granary_core", {color: ["#9b7440", "#b1884d"], hp: 150, density: 1800, burn: 55});
    defineSocietyStructureElement("civ_kiln_core", {color: ["#704e43", "#835b45"], hp: 170, density: 2500, burn: 0, breakInto: ["brick_rubble", "rock"]});
    defineSocietyStructureElement("civ_foundry_core", {color: ["#5f5652", "#776762"], hp: 190, density: 2700, burn: 0, breakInto: ["metal_scrap", "rock"]});
    defineSocietyStructureElement("civ_forge_core", {color: ["#4f5155", "#686a70"], hp: 220, density: 2800, burn: 0, breakInto: ["metal_scrap", "rock"]});
    defineSocietyStructureElement("civ_keep_core", {color: ["#606269", "#74777e"], hp: 420, density: 2900, burn: 0, breakInto: ["rock", "gravel"]});
    defineSocietyStructureElement("civ_siege_workshop_core", {color: ["#6e5d49", "#806c53"], hp: 260, density: 2300, burn: 25});
    defineSocietyStructureElement("civ_library_core", {color: ["#756751", "#8a795d"], hp: 220, density: 2300, burn: 30});
    defineSocietyStructureElement("civ_market_core", {color: ["#8c653f", "#a47848"], hp: 190, density: 1900, burn: 45});
    defineSocietyStructureElement("civ_tower_core", {color: ["#65676b", "#797b80"], hp: 260, density: 2800, burn: 0, breakInto: ["rock", "gravel"]});
    defineSocietyStructureElement("civ_lumberyard_core", {color: ["#765033", "#8b5f39"], hp: 100, density: 1700, burn: 55, breakInto: ["sawdust", "wood"]});
    defineSocietyStructureElement("civ_gate", {color: ["#68452e", "#805637"], hp: 110, density: 1700, burn: 60, burnInto: ["ember", "ash"], breakInto: ["sawdust", "wood"]});

    // Legacy wall pixels are retained only so old saves can be migrated. New
    // palisades are represented by the single civ_gate logical core and its
    // render-only 3x3 faction-colored sprite.
    elements.civ_palisade = {
        color: ["#765033", "#8b5f39"],
        category: "civilization",
        hidden: true,
        behavior: behaviors.WALL,
        state: "solid",
        density: 1700,
        burn: 65,
        burnTime: 200,
        burnInto: ["ember", "ash"],
        breakInto: ["sawdust", "wood"],
        properties: {structureHp: 90, structureMaxHp: 90},
        onPlace: function (pixel) { structureOnPlace(pixel, 90); },
        onChange: onCivilizedChange,
        onDelete: onCivilizedDelete,
        forceSaveColor: true
    };

    elements.civ_construction = {
        color: "#c6a36b",
        category: "civilization",
        hidden: true,
        behavior: behaviors.WALL,
        alwaysOverlay: true,
        nonBlocking: true,
        eraseProtected: true,
        isBuildingCore: true,
        state: "solid",
        density: 1400,
        burn: 60,
        burnTime: 100,
        burnInto: "ash",
        properties: {alwaysOverlay: true, nonBlocking: true, eraseProtected: true, isBuildingCore: true},
        renderer: function () {},
        onPlace: registerPixel,
        onErase: function (pixel) { destroyBuilding(pixel, "erased"); },
        onChange: onCivilizedChange,
        onDelete: constructionOnDelete,
        forceSaveColor: true
    };

    elements.civ_structure_wood = {
        color: ["#825b39", "#966b43", "#765033"],
        category: "civilization",
        hidden: true,
        behavior: behaviors.WALL,
        state: "solid",
        density: 1500,
        burn: 60,
        burnTime: 160,
        burnInto: ["ember", "charcoal", "ash"],
        breakInto: ["sawdust", "wood"],
        properties: {structureHp: 30, structureMaxHp: 30},
        onPlace: function (pixel) { structureOnPlace(pixel, 30); },
        onChange: onCivilizedChange,
        onDelete: onCivilizedDelete,
        forceSaveColor: true
    };

    elements.civ_structure_stone = {
        color: ["#77756f", "#85827a", "#686660"],
        category: "civilization",
        hidden: true,
        behavior: behaviors.WALL,
        state: "solid",
        density: 2600,
        breakInto: ["rock", "gravel"],
        properties: {structureHp: 80, structureMaxHp: 80},
        onPlace: function (pixel) { structureOnPlace(pixel, 80); },
        onChange: onCivilizedChange,
        onDelete: onCivilizedDelete,
        forceSaveColor: true
    };

    elements.civ_ruin = {
        color: ["#665e52", "#766b5d", "#574f46"],
        category: "civilization",
        hidden: true,
        behavior: behaviors.WALL,
        state: "solid",
        density: 2100,
        breakInto: ["rock", "gravel", "dirt"]
    };

    elements.civ_wood_resource = {
        color: ["#8d5b35", "#a56d3e", "#724626"],
        category: "civilization",
        hidden: true,
        behavior: behaviors.POWDER,
        state: "solid",
        density: 720,
        movable: true,
        properties: {_civResourceDrop: true, resourceKind: "wood", treeSapling: "sapling"},
        forceSaveColor: true
    };

    elements.civ_tunnel = {
        color: ["#795c3f", "#6d5138", "#856447"],
        category: "civilization",
        hidden: true,
        behavior: behaviors.WALL,
        state: "solid",
        density: 1900,
        passableVegetation: true,
        isTunnel: true,
        properties: {naturalVegetation: false, isTunnel: true},
        forceSaveColor: true
    };

    const ERA_NAMES_ZH = {
        tribal: "部落时代", stone: "石器时代", agriculture: "农耕时代",
        bronze: "青铜时代", iron: "铁器时代", castle: "城堡时代"
    };
    const TECH_NAMES_ZH = {
        organized_gathering: "有组织采集", controlled_fire: "火种掌控", simple_shelters: "简易住所", woodworking: "木工",
        clan_council: "氏族议会", oral_tradition: "口述传统", war_clubs: "战棍", hunting_cooperation: "协作狩猎",
        stone_knapping: "石器打制", polished_axes: "磨制石斧", artisan_shed: "工匠棚", quarrying: "采石",
        craft_specialization: "手工业分工", tally_marks: "刻划记事", stone_spearheads: "石制矛头", palisade_defense: "木栅防御",
        seed_selection: "选种", managed_forestry: "林业管理", granary: "粮仓", irrigation: "灌溉",
        village_planning: "村落规划", barter: "物物交换", militia: "民兵制度", bowmaking: "制弓",
        copper_prospecting: "铜矿勘探", tin_prospecting: "锡矿勘探", charcoal_kiln: "木炭窑", bronze_foundry: "青铜铸造",
        writing: "文字", administration: "行政管理", bronze_weapons: "青铜武器", shield_formation: "盾阵",
        iron_prospecting: "铁矿勘探", iron_smelting: "炼铁", forge: "锻造工坊", stone_fortifications: "石制防御工事",
        coinage: "铸币", codified_law: "成文法", iron_weapons: "铁制武器", iron_armor: "铁甲",
        steelmaking: "炼钢", crop_rotation: "轮作", castle_building: "城堡建筑", siege_workshop: "攻城工坊",
        library: "图书馆", guild_market: "行会市场", crossbow: "弩", siege_engineering: "攻城工程"
    };
    const DOMAIN_NAMES_ZH = {production: "生产", construction: "建造", society: "社会", military: "军事"};
    const RESOURCE_NAMES_ZH = {food: "食物", wood: "木材", stone: "石材", seed: "种子", tree_seed: "树种", water: "水", copper: "铜", tin: "锡", raw_iron: "铁矿", iron: "铁", steel: "钢", charcoal: "木炭", bronze: "青铜"};
    const PERSON_TASK_LABELS = {
        idle: ["Idle", "待命"], planning: ["Planning work", "规划工作"], move: ["Following command", "执行移动命令"], wander: ["Exploring", "探索"], explore: ["Exploring", "探索"], search_resource: ["Searching resources", "搜寻资源"], harvest: ["Gathering", "采集"], deliver: ["Delivering", "运输"],
        build: ["Building", "建造"], farm: ["Farming", "耕作"], plant_tree: ["Planting trees", "种树"], facility: ["Working", "设施工作"],
        combat: ["Fighting", "战斗"], siege: ["Sieging", "攻城"], flee: ["Fleeing", "逃跑"], patrol: ["Patrolling", "巡逻"],
        return: ["Returning", "返回聚落"], placed: ["Entered the world", "进入世界"], birth: ["Born", "出生"], maturity: ["Reached adulthood", "成年"],
        faction_changed: ["Changed faction", "阵营变更"], role_changed: ["Changed role", "职业变更"], death: ["Died", "死亡"], dead: ["Dead", "已死亡"]
    };
    const PERSON_PHASE_LABELS = {
        planning: ["Planning", "规划中"], flat: ["Travelling", "平地移动"], climb: ["Climbing", "攀爬"], tunnel: ["Digging a tunnel", "挖掘矿洞"],
        working: ["Working", "工作中"], searching: ["Searching", "搜寻中"], exploring: ["Exploring", "探索中"], patrolling: ["Patrolling", "巡逻中"], attacking: ["Attacking", "攻击中"], fall: ["Falling", "下落"], idle: ["Idle", "待命"]
    };
    const PERSON_OUTCOME_LABELS = {active: ["Active", "进行中"], completed: ["Completed", "完成"], failed: ["Failed", "失败"], interrupted: ["Interrupted", "中断"], death: ["Died", "死亡"]};
    const PERSON_ROLE_LABELS = {
        child: ["Child", "儿童"], worker: ["Worker", "劳动者"], food: ["Gatherer", "采食者"], wood: ["Woodcutter", "伐木工"],
        miner: ["Miner", "矿工"], builder: ["Builder", "建造者"], farmer: ["Farmer", "农民"], forester: ["Forester", "林务员"],
        hunter: ["Hunter", "猎人"], artisan: ["Artisan", "工匠"], industry: ["Industrial worker", "产业工人"], scholar: ["Scholar", "学者"],
        merchant: ["Merchant", "商人"], artisan_trade: ["Trader", "贸易工匠"], warrior: ["Warrior", "战士"], guard: ["Guard", "守卫"]
    };
    const PERSON_WEAPON_LABELS = {fists: ["Unarmed", "徒手"], club: ["Club", "木棍"], spear: ["Spear", "长矛"], bow: ["Bow", "弓"], bronze_spear: ["Bronze spear", "青铜矛"], iron_sword: ["Iron sword", "铁剑"], crossbow: ["Crossbow", "弩"]};
    const PERSON_DEATH_CAUSE_LABELS = {injury: ["Injury", "伤害"], old_age: ["Old age", "寿终"], erased: ["Erased", "被擦除"], changed: ["Transformed", "发生转化"], environment: ["Environment", "环境伤害"]};
    let selectedCivilizationFactionId = null;
    let selectedCivilizationSettlementId = null;
    let selectedCivilizationTab = "overview";
    let selectedPeopleStatus = "living";
    let selectedPersonId = null;
    let focusedPersonId = null;
    let peoplePanelOpen = false;
    let peopleRefreshFrame = null;
    let peopleLastRefreshAt = 0;
    let peopleHistoryLimit = C.PEOPLE_HISTORY_PAGE_SIZE;
    let commandPersonId = null;
    let commandHover = null;
    let commandLastResult = null;
    let commandInputInstalled = false;

    function isChineseUi() {
        if (typeof langCode !== "undefined" && (langCode === "zh_cn" || langCode === "zh_hant" || String(langCode).indexOf("zh") === 0)) return true;
        return typeof navigator !== "undefined" && /^zh\b/i.test(navigator.language || "");
    }

    function civilizationText(key, english, chinese) {
        const translated = typeof langKey === "function" ? langKey("humanSociety." + key, null) : null;
        return translated || (isChineseUi() ? chinese : english);
    }

    function localizedEraName(era) {
        if (!era) return civilizationText("era.unknown", "Unknown Era", "未知时代");
        return civilizationText("era." + era.id, era.name || era.id, ERA_NAMES_ZH[era.id] || era.name || era.id);
    }

    function localizedTechName(tech) {
        return civilizationText("tech." + tech.id, tech.name || tech.id, TECH_NAMES_ZH[tech.id] || tech.name || tech.id);
    }

    function localizedDomain(domain) {
        return civilizationText("domain." + domain, domain, DOMAIN_NAMES_ZH[domain] || domain);
    }

    function conditionDescription(state) {
        const condition = state.condition || {};
        const mark = state.met ? "✓ " : "○ ";
        const resource = isChineseUi() ? (RESOURCE_NAMES_ZH[condition.resource] || condition.resource) : condition.resource;
        const progress = " (" + Math.floor(safeNumber(state.current, 0)) + "/" + safeNumber(state.required, condition.minimum || 0) + ")";
        if (condition.type === "population") return mark + civilizationText("condition.population", "Population", "人口") + " ≥ " + condition.minimum + progress;
        if (condition.type === "resource_stock") return mark + civilizationText("condition.stock", "Stock", "库存") + " " + resource + " ≥ " + condition.minimum + progress;
        if (condition.type === "resource_encountered") return mark + civilizationText("condition.encounter", "Discover", "发现") + " " + resource + " × " + condition.minimum + progress;
        if (condition.type === "heat_available") return mark + civilizationText("condition.heat", "Available heat", "可用热值") + " ≥ " + condition.minimum + progress;
        if (condition.type === "milestone") return mark + civilizationText("condition.milestone", "Milestone", "里程碑") + " " + condition.id + " × " + condition.minimum + progress;
        return mark + condition.type;
    }

    function localizedPersonLabel(group, key, fallback) {
        const entry = group[key];
        if (!entry) return fallback || key || "";
        return civilizationText("people." + key, entry[0], entry[1]);
    }

    function localizedResourceName(kind) {
        const value = String(kind || "");
        if (value.indexOf("tree_sapling:") === 0) {
            const seed = value.slice(14);
            return (isChineseUi() ? "树苗 " : "Tree sapling ") + localizedResourceName(seed);
        }
        if (value.indexOf("seed:") === 0) {
            const seed = value.slice(5);
            return (isChineseUi() ? "种子 " : "Seed ") + localizedResourceName(seed);
        }
        if (isChineseUi() && RESOURCE_NAMES_ZH[value]) return RESOURCE_NAMES_ZH[value];
        const translated = typeof langKey === "function" ? langKey(value, null) : null;
        return translated || value.replace(/_/g, " ");
    }

    function activityTargetLabel(targetKind, targetId, targetKey, x, y) {
        if ((targetKey && targetKey.indexOf("human:") === 0) || (Number.isFinite(targetId) && targetKey && targetKey.indexOf("human") === 0)) return "H" + targetId;
        if (targetKey && targetKey.indexOf("settlement:") === 0) return civilizationText("people.settlement", "Settlement ", "聚落 ") + targetId;
        if (targetKey && targetKey.indexOf("building:") === 0) return localizedResourceName(targetKind || "building") + " #" + targetId;
        let label = targetKind ? localizedResourceName(targetKind) : "";
        if (Number.isFinite(x) && Number.isFinite(y)) label += (label ? " " : "") + "(" + x + ", " + y + ")";
        return label;
    }

    function activityProgressForActor(actor) {
        if (!actor) return null;
        if (actor.task === "harvest") {
            const target = Number.isFinite(actor.harvestX) && Number.isFinite(actor.harvestY) ? pixelsAt(actor.harvestX, actor.harvestY).find((pixel) => resourceDescriptor(pixel)) : null;
            const descriptor = resourceDescriptor(target);
            if (!descriptor) return null;
            const faction = manager.factionById.get(actor.factionId);
            const mods = faction && faction.techModifiers || computeTechModifiers(faction);
            let total = descriptor.harvestTicks * safeNumber(mods.harvestSpeed, 1);
            if (descriptor.kind === "wood") total *= safeNumber(mods.woodHarvestSpeed, 1);
            if (descriptor.kind === "stone") total *= safeNumber(mods.stoneHarvestSpeed, 1);
            const specialist = descriptor.kind === "food" ? (actor.role === "food" || actor.role === "farmer" || actor.role === "hunter") :
                (descriptor.kind === "wood" ? (actor.role === "wood" || actor.role === "forester") :
                    (descriptor.kind === "stone" || NONRENEWABLE_KINDS.has(descriptor.kind) ? actor.role === "miner" : true));
            if (!specialist) total *= 2;
            total /= safeNumber(mods.roleWorkSpeed, 1);
            const current = Math.min(total, safeNumber(actor.harvestProgress, 0));
            return {current: current, total: total, percent: total > 0 ? Math.round(current / total * 100) : 0, unit: "ticks"};
        }
        if (actor.task === "build") {
            const site = Array.from(manager.constructionSites).find((candidate) => candidate.buildingId === actor.targetId);
            if (site) {
                const total = Math.max(1, safeNumber(site.workRequired, 1));
                const current = Math.min(total, safeNumber(site.workDone, 0));
                return {current: current, total: total, percent: Math.round(current / total * 100), unit: "work"};
            }
        }
        if (actor.task === "deliver") {
            const current = carriedAmount(actor);
            const total = carryCapacityFor(actor);
            return {current: current, total: total, percent: total > 0 ? Math.round(current / total * 100) : 0, unit: "resources"};
        }
        return null;
    }

    function currentPersonPhase(actor) {
        if (!actor) return "idle";
        if (actor.task === "idle" || actor.task === "wander" || actor.task === "planning") return actor.pathStage === "fall" ? "fall" : "planning";
        if (actor.pathStage === "tunnel") return "tunnel";
        if (actor.task === "combat" || actor.task === "siege") {
            const target = actor.task === "combat" ? manager.actorById.get(actor.targetId) : getBuildingById(actor.targetId);
            const weapon = manager.weapons.get(actor.weapon) || manager.weapons.get("fists");
            if (target && (actor.task === "combat" ? targetInAttackBox(actor, target, weapon) : Core.distance(actor.x, actor.y, target.x, target.y) <= Math.max(2, weapon.range))) return "attacking";
        }
        if (actor.task === "harvest" && Number.isFinite(actor.harvestX) && Core.distance(actor.x, actor.y, actor.harvestX, actor.harvestY) <= 1.5) return "working";
        if (actor.task === "facility" && Number.isFinite(actor.targetX) && Core.distance(actor.x, actor.y, actor.targetX, actor.targetY) <= 2.5) return "working";
        return actor.pathStage === "climb" || actor.pathStage === "tunnel" ? actor.pathStage : "flat";
    }

    function activityMetricSummary(metrics) {
        if (!metrics || typeof metrics !== "object") return "";
        const parts = [];
        const resourceMap = metrics.resourcesDelivered || metrics.resourcesCollected;
        if (resourceMap) {
            const resources = Object.keys(resourceMap).filter((kind) => safeNumber(resourceMap[kind], 0) > 0).map((kind) => localizedResourceName(kind) + " " + Math.round(resourceMap[kind]));
            if (resources.length) parts.push(resources.join(", "));
        }
        if (metrics.buildWork) parts.push(civilizationText("people.work", "Work ", "工作量 ") + Math.round(metrics.buildWork));
        if (metrics.tunnelCells) parts.push(civilizationText("people.tunnelCells", "Tunnel cells ", "矿洞格 ") + Math.round(metrics.tunnelCells));
        if (metrics.attacks) parts.push(civilizationText("people.attacks", "Attacks ", "攻击 ") + Math.round(metrics.attacks));
        if (metrics.hits) parts.push(civilizationText("people.hits", "Hits ", "命中 ") + Math.round(metrics.hits));
        if (metrics.kills) parts.push(civilizationText("people.kills", "Kills ", "击杀 ") + Math.round(metrics.kills));
        return parts.join(" · ");
    }

    function expandActivityRecord(record, profile, active) {
        if (!record) return null;
        const task = active && profile && profile.task ? profile.task : record.t;
        const phase = active && profile ? currentPersonPhase(profile) : null;
        const targetX = active && profile && Number.isFinite(profile.targetX) ? profile.targetX : record.x;
        const targetY = active && profile && Number.isFinite(profile.targetY) ? profile.targetY : record.y;
        const targetId = active && profile && Number.isFinite(profile.targetId) ? profile.targetId : record.i;
        const targetKind = active && profile && profile.targetKind ? profile.targetKind : record.e;
        const targetKey = active && profile && profile.targetKey ? profile.targetKey : record.g;
        const taskLabel = localizedPersonLabel(PERSON_TASK_LABELS, task, task);
        const targetLabel = activityTargetLabel(targetKind, targetId, targetKey, targetX, targetY);
        const status = active ? "active" : (record.o || "interrupted");
        const phaseLabel = active ? localizedPersonLabel(PERSON_PHASE_LABELS, phase, phase) : localizedPersonLabel(PERSON_OUTCOME_LABELS, status, status);
        const metrics = cloneActivityValue(record.d) || {};
        const metricSummary = activityMetricSummary(metrics);
        const description = [phaseLabel, taskLabel + (targetLabel ? " · " + targetLabel : ""), metricSummary].filter(Boolean).join(" · ");
        const birthTick = Number.isFinite(profile && profile.birthTick) ? profile.birthTick : null;
        return {
            sequence: record.n,
            kind: record.k || "task",
            type: record.k === "life" ? record.t : "task",
            task: task,
            phase: phase,
            status: status,
            reason: active ? null : (record.z || null),
            role: record.r || profile && profile.role || null,
            factionId: record.f,
            settlementId: record.l,
            targetKey: targetKey,
            targetId: Number.isFinite(targetId) ? targetId : null,
            targetKind: targetKind || null,
            targetX: Number.isFinite(targetX) ? targetX : null,
            targetY: Number.isFinite(targetY) ? targetY : null,
            targetLabel: targetLabel,
            startedAt: record.a,
            endedAt: active ? null : (record.b || null),
            startedTick: record.at,
            endedTick: active ? null : record.bt,
            durationTicks: active ? Math.max(0, pixelTicks - safeNumber(record.at, pixelTicks)) : Math.max(0, safeNumber(record.bt, record.at) - safeNumber(record.at, 0)),
            ageAtStart: birthTick === null ? null : Math.max(0, (safeNumber(record.at, birthTick) - birthTick) / C.TICKS_PER_YEAR),
            ageAtEnd: birthTick === null ? null : Math.max(0, (safeNumber(active ? pixelTicks : record.bt, birthTick) - birthTick) / C.TICKS_PER_YEAR),
            metrics: metrics,
            progress: active ? activityProgressForActor(profile) : null,
            description: description
        };
    }

    function livePersonSnapshot(actor) {
        const activity = ensurePersonActivity(actor, true);
        const carry = cloneActivityValue(ensureActorCarry(actor)) || {};
        return {
            humanId: actor.humanId,
            status: "living",
            element: actor.element,
            isChild: actor.element === "civ_child",
            factionId: actor.factionId,
            settlementId: actor.settlementId || null,
            color: actor.factionColor || factionColor(actor.factionId),
            x: actor.x,
            y: actor.y,
            ageYears: ageYears(actor),
            lifespanYears: actor.lifespanYears,
            birthTick: actor.birthTick,
            hp: Math.max(0, safeNumber(actor.hp, 0)),
            maxHp: Math.max(1, safeNumber(actor.maxHp, actor.element === "civ_child" ? C.CHILD_HP : C.ADULT_HP)),
            role: actor.role || (actor.element === "civ_child" ? "child" : "worker"),
            task: actor.task || "idle",
            weapon: actor.weapon || "fists",
            warRole: actor.warRole || null,
            carry: carry,
            carryTotal: carriedAmount(actor),
            carryCapacity: carryCapacityFor(actor),
            currentActivity: expandActivityRecord(activity.c, actor, true),
            historyRetained: activity.h.length,
            latestSequence: Math.max(activityRecordSequence(activity.c), activity.h.reduce((maximum, record) => Math.max(maximum, activityRecordSequence(record)), 0)),
            playerOrder: actor.playerOrder ? cloneActivityValue(actor.playerOrder) : null,
            commandSelected: commandPersonId === actor.humanId
        };
    }

    function deceasedPersonSnapshot(indexed) {
        if (!indexed || !indexed.entry) return null;
        const entry = indexed.entry;
        const activity = entry.pa && typeof entry.pa === "object" ? entry.pa : newPersonActivity();
        return {
            humanId: entry.h,
            status: "deceased",
            element: entry.e,
            isChild: entry.e === "civ_child",
            factionId: entry.f,
            settlementId: entry.l,
            archiveFactionId: indexed.banner && indexed.banner.factionId,
            color: entry.c,
            x: entry.x,
            y: entry.y,
            ageYears: Number.isFinite(entry.bt) ? Math.max(0, (safeNumber(entry.dt, entry.bt) - entry.bt) / C.TICKS_PER_YEAR) : 0,
            lifespanYears: entry.ly,
            birthTick: entry.bt,
            deathTick: entry.dt,
            diedAt: entry.da,
            deathCause: entry.dc,
            hp: entry.hp,
            maxHp: entry.mh,
            role: entry.r || "worker",
            task: "dead",
            weapon: entry.w || "fists",
            warRole: entry.wr || null,
            carry: {},
            carryTotal: 0,
            carryCapacity: 0,
            currentActivity: null,
            historyRetained: Array.isArray(activity.h) ? activity.h.length : 0,
            latestSequence: Array.isArray(activity.h) ? activity.h.reduce((maximum, record) => Math.max(maximum, activityRecordSequence(record)), 0) : 0
        };
    }

    function findLivingActor(humanId) {
        const id = Number(humanId);
        const indexed = manager.actorById.get(id);
        if (indexed && !indexed.del && !indexed.dead) return indexed;
        return Array.from(manager.actors).find((actor) => actor && !actor.del && !actor.dead && actor.humanId === id) || null;
    }

    function getPersonSnapshot(humanId) {
        if (manager.lastIndexTick < 0 && typeof currentPixels !== "undefined") rebuildIndexes(true);
        const actor = findLivingActor(humanId);
        if (actor) return livePersonSnapshot(actor);
        return deceasedPersonSnapshot(manager.deceasedByHumanId.get(Number(humanId)));
    }

    function personMatchesFilters(person, filters) {
        if (!person) return false;
        if (filters.factionId !== undefined && filters.factionId !== null && Number(filters.factionId) !== Number(person.factionId)) return false;
        if (filters.settlementId !== undefined && filters.settlementId !== null && Number(filters.settlementId) !== Number(person.settlementId)) return false;
        if (filters.role && String(filters.role) !== person.role) return false;
        if (filters.task && String(filters.task) !== person.task) return false;
        const query = String(filters.query || "").trim().toLowerCase();
        if (!query) return true;
        const searchable = ["h" + person.humanId, String(person.humanId), "f" + person.factionId, person.role, person.task, person.currentActivity && person.currentActivity.description].filter(Boolean).join(" ").toLowerCase();
        return searchable.indexOf(query) !== -1;
    }

    function getPeopleSnapshot(options) {
        if (manager.lastIndexTick < 0 && typeof currentPixels !== "undefined") rebuildIndexes(true);
        const filters = options || {};
        const status = filters.status === "deceased" || filters.status === "all" ? filters.status : "living";
        const living = Array.from(manager.actors).filter((actor) => actor && !actor.del && !actor.dead && Number.isFinite(actor.humanId)).map(livePersonSnapshot);
        const deceased = Array.from(manager.deceasedByHumanId.values()).map(deceasedPersonSnapshot).filter(Boolean);
        let people = status === "deceased" ? deceased : (status === "all" ? living.concat(deceased) : living);
        people = people.filter((person) => personMatchesFilters(person, filters));
        people.sort((a, b) => status === "deceased" ? safeNumber(b.deathTick, 0) - safeNumber(a.deathTick, 0) || a.humanId - b.humanId : a.humanId - b.humanId);
        return {
            updatedAt: eventTimestamp(),
            tick: pixelTicks,
            counts: {living: living.length, deceased: deceased.length, filtered: people.length},
            people: people
        };
    }

    function getPersonHistory(humanId, options) {
        if (manager.lastIndexTick < 0 && typeof currentPixels !== "undefined") rebuildIndexes(true);
        const actor = findLivingActor(humanId);
        const indexed = manager.deceasedByHumanId.get(Number(humanId));
        const data = actor ? ensurePersonActivity(actor, true) : (indexed && indexed.entry.pa);
        if (!data || !Array.isArray(data.h)) return {entries: [], hasMore: false, nextCursor: null, totalRetained: 0};
        const opts = options || {};
        const limit = Math.max(1, Math.min(C.MAX_PERSON_ACTIVITY, Math.floor(safeNumber(Number(opts.limit), C.PEOPLE_HISTORY_PAGE_SIZE))));
        const before = Number(opts.beforeSequence);
        let records = data.h.slice().sort((a, b) => activityRecordSequence(b) - activityRecordSequence(a));
        if (Number.isFinite(before)) records = records.filter((record) => activityRecordSequence(record) < before);
        const page = records.slice(0, limit);
        const profile = actor || indexed && {birthTick: indexed.entry.bt, role: indexed.entry.r, task: "dead"};
        const entries = page.map((record) => expandActivityRecord(record, profile, false)).filter(Boolean);
        const hasMore = records.length > page.length;
        return {entries: entries, hasMore: hasMore, nextCursor: hasMore && entries.length ? entries[entries.length - 1].sequence : null, totalRetained: data.h.length};
    }

    function getFactionSnapshot(factionId, settlementId) {
        if (manager.lastIndexTick < 0 && typeof currentPixels !== "undefined") rebuildIndexes(true);
        const faction = manager.factionById.get(Number(factionId));
        const banner = faction && faction.settlements[0];
        if (!faction || !banner) return null;
        const selectedSettlement = faction.settlements.find((settlement) => settlement.settlementId === Number(settlementId)) || banner;
        ensureStock(selectedSettlement);
        const research = ensureResearchState(banner);
        const era = eraDefinition(banner.eraId);
        const technologies = allTechnologies().slice().sort((a, b) => safeNumber(a.eraIndex, 0) - safeNumber(b.eraIndex, 0) || safeNumber(a.tier, 0) - safeNumber(b.tier, 0) || a.id.localeCompare(b.id)).map((tech) => {
            const availability = techAvailability(tech, faction, banner);
            const queueIndex = research.priorityQueue.indexOf(tech.id);
            return {
                id: tech.id,
                name: tech.name,
                eraId: techEraId(tech),
                eraIndex: safeNumber(tech.eraIndex, ERA_INDEX.get(techEraId(tech)) || 0),
                domain: tech.domain,
                cost: effectiveResearchCost(tech, faction, banner),
                progress: safeNumber(research.progress[tech.id], 0),
                unlocked: !!research.unlocked[tech.id],
                state: research.unlocked[tech.id] ? "researched" : (queueIndex >= 0 ? "focused" : "unresearched"),
                forced: !!research.forcedUnlocked[tech.id],
                queueIndex: queueIndex,
                active: research.activeTechId === tech.id,
                focused: queueIndex >= 0,
                future: safeNumber(tech.eraIndex, 0) > eraIndexFor(banner),
                prerequisites: (tech.prerequisites || []).slice(),
                prerequisitesMet: availability.prerequisitesMet,
                conditionsMet: availability.conditionsMet,
                conditionStates: availability.conditionStates || [],
                source: tech
            };
        }).filter(Boolean);
        return {
            id: faction.id,
            color: faction.color,
            population: faction.population,
            adults: faction.adultPopulation,
            housing: faction.housing,
            selectedSettlementId: selectedSettlement.settlementId,
            settlements: faction.settlements.map((settlement) => ({id: settlement.settlementId, x: settlement.x, y: settlement.y, population: safeNumber(settlement.population, 0), housing: safeNumber(settlement.housing, 4), active: settlement.townCenterActive !== false, stage: settlement.stage || "camp"})),
            eraId: banner.eraId,
            era: era,
            completedInEra: technologies.filter((tech) => tech.eraId === banner.eraId && tech.unlocked).length,
            requiredToAdvance: safeNumber(era && era.requiredTechsToAdvance, C.RESEARCH_ERA_UNLOCK_COUNT),
            knowledge: research.knowledge,
            focusTechId: research.focusTechId || null,
            activeTechId: research.activeTechId || null,
            domainExperience: Object.assign({}, research.domainExperience),
            stock: {
                food: stockNumber(selectedSettlement.stock, "food"), wood: stockNumber(selectedSettlement.stock, "wood"), stone: stockNumber(selectedSettlement.stock, "stone"),
                charcoal: materialAmount(selectedSettlement.stock, "charcoal"), copper: materialAmount(selectedSettlement.stock, "copper"), tin: materialAmount(selectedSettlement.stock, "tin"),
                bronze: materialAmount(selectedSettlement.stock, "bronze"), raw_iron: materialAmount(selectedSettlement.stock, "raw_iron"), iron: materialAmount(selectedSettlement.stock, "iron"), steel: materialAmount(selectedSettlement.stock, "steel"),
                seeds: Object.assign({}, selectedSettlement.stock.seeds || {}),
                treeSaplings: Object.assign({}, selectedSettlement.stock.treeSaplings || {})
            },
            technologies: technologies,
            chronicle: ensureChronicle(selectedSettlement).slice(),
            wars: activeEnemyFactionIds(faction.id),
            recordedWars: getWarSnapshot(faction.id),
            peaceMode: getPeaceMode()
        };
    }

    function stockNumber(stock, key) {
        return Math.max(0, safeNumber(stock && stock[key], 0));
    }

    function setResearchFocus(factionId, techId) {
        const faction = manager.factionById.get(Number(factionId));
        const banner = faction && faction.settlements[0];
        if (!banner) return false;
        const research = ensureResearchState(banner);
        if (techId === null || techId === undefined || techId === "") {
            delete research.focusTechId;
            research.priorityQueue = [];
            return true;
        }
        const tech = manager.technologies.get(String(techId));
        if (!tech || research.unlocked[tech.id]) return false;
        return setTechnologyState(factionId, tech.id, "focused");
    }

    function enqueueTechnologyWithPrerequisites(research, tech, currentEraIndex, seen) {
        if (!tech || research.unlocked[tech.id]) return;
        const visited = seen || new Set();
        if (visited.has(tech.id)) return;
        visited.add(tech.id);
        (tech.prerequisites || []).forEach((prerequisiteId) => {
            const prerequisite = manager.technologies.get(prerequisiteId);
            if (prerequisite && safeNumber(prerequisite.eraIndex, 0) <= currentEraIndex) enqueueTechnologyWithPrerequisites(research, prerequisite, currentEraIndex, visited);
        });
        if (research.priorityQueue.indexOf(tech.id) === -1) research.priorityQueue.push(tech.id);
    }

    function setTechnologyState(factionId, techId, state) {
        const faction = manager.factionById.get(Number(factionId));
        const banner = faction && faction.settlements[0];
        const tech = manager.technologies.get(String(techId));
        if (!banner || !tech) return false;
        const research = ensureResearchState(banner);
        if (research.unlocked[tech.id]) return state === "researched";
        if (state === "researched") {
            research.forcedUnlocked[tech.id] = true;
            const unlocked = unlockTechnology(faction, banner, tech);
            if (unlocked) maybeAdvanceEra(faction, banner);
            return unlocked;
        }
        if (state === "focused") {
            enqueueTechnologyWithPrerequisites(research, tech, safeNumber(tech.eraIndex, eraIndexFor(banner)));
            research.focusTechId = research.priorityQueue[0] || tech.id;
            research.focusDomain = tech.domain;
            return true;
        }
        if (state === "unresearched") {
            research.priorityQueue = research.priorityQueue.filter((id) => id !== tech.id);
            if (research.focusTechId === tech.id) research.focusTechId = research.priorityQueue[0];
            return true;
        }
        return false;
    }

    function moveResearchPriority(factionId, techId, newIndex) {
        const faction = manager.factionById.get(Number(factionId));
        const banner = faction && faction.settlements[0];
        if (!banner) return false;
        const research = ensureResearchState(banner);
        const oldIndex = research.priorityQueue.indexOf(String(techId));
        if (oldIndex < 0) return false;
        const id = research.priorityQueue.splice(oldIndex, 1)[0];
        const index = Math.max(0, Math.min(research.priorityQueue.length, Math.floor(safeNumber(Number(newIndex), 0))));
        research.priorityQueue.splice(index, 0, id);
        research.focusTechId = research.priorityQueue[0];
        return true;
    }

    function setSettlementResources(factionId, settlementId, patch) {
        const faction = manager.factionById.get(Number(factionId));
        const settlement = faction && faction.settlements.find((candidate) => candidate.settlementId === Number(settlementId));
        if (!settlement || !patch || typeof patch !== "object") return false;
        const stock = ensureStock(settlement);
        STOCK_KEYS.forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(patch, key)) return;
            const value = Math.max(0, safeNumber(Number(patch[key]), 0));
            if (key === "food") stock.food = value;
            else if (key === "wood") { stock.wood = value; stock.materials.tree_branch = 0; stock.materials.bamboo = 0; stock.materials.wood = value; }
            else if (key === "stone") { stock.stone = value; stock.materials.stone = value; }
            else { stock[key] = value; stock.materials[key] = value; }
        });
        const seeds = patch.seeds && typeof patch.seeds === "object" ? patch.seeds : {};
        Object.keys(seeds).forEach((seed) => {
            const value = Math.max(0, safeNumber(Number(seeds[seed]), 0));
            if (TREE_SAPLING_ELEMENTS.has(seed)) stock.treeSaplings[seed] = value;
            else stock.seeds[seed] = value;
        });
        const treeSaplings = patch.treeSaplings && typeof patch.treeSaplings === "object" ? patch.treeSaplings : {};
        Object.keys(treeSaplings).forEach((seed) => {
            if (TREE_SAPLING_ELEMENTS.has(seed)) stock.treeSaplings[seed] = Math.max(0, safeNumber(Number(treeSaplings[seed]), 0));
        });
        logSettlementEvent(settlement, "resource_edit", "玩家强制修改资源库存", {patch: JSON.parse(JSON.stringify(patch))});
        return true;
    }

    function getFactionChronicle(factionId, options) {
        const faction = manager.factionById.get(Number(factionId));
        if (!faction) return manager.archivedChronicles.filter((archive) => archive.factionId === Number(factionId));
        const opts = options || {};
        const settlements = opts.settlementId ? faction.settlements.filter((settlement) => settlement.settlementId === Number(opts.settlementId)) : faction.settlements;
        return settlements.reduce((events, settlement) => events.concat(ensureChronicle(settlement)), []).sort((a, b) => safeNumber(a.tick, 0) - safeNumber(b.tick, 0)).slice(-C.MAX_CHRONICLE_EVENTS);
    }

    function getWarSnapshot(factionId) {
        const id = Number(factionId);
        const enemies = [];
        manager.relationRecords.forEach((record) => {
            if (!recordedWarActive(record)) return;
            if (record.factionA === id) enemies.push(record.factionB);
            else if (record.factionB === id) enemies.push(record.factionA);
        });
        return enemies.filter((enemyId, index, values) => values.indexOf(enemyId) === index).sort((a, b) => a - b).map((enemyId) => {
            const record = loadPairRecord(pairInfo(id, enemyId), false);
            const faction = manager.factionById.get(id);
            return {enemyFactionId: enemyId, declaredTick: record.declaredTick, reason: record.reason, active: effectiveWarActive(record), suspended: recordedWarActive(record) && !effectiveWarActive(record), wave: safeNumber(firstBanner(id) && firstBanner(id).warState && firstBanner(id).warState.wave, 1), attackers: faction ? faction.adults.filter((actor) => actor.warRole === "attacker" && actor.warFrontId === enemyId).length : 0, defenders: faction ? faction.adults.filter((actor) => actor.warRole === "defender").length : 0};
        });
    }

function setMapOverlay(name, value) {
        if (name === "territory" || name === "resources") { manager.overlaySettings[name] = !!value; return true; }
        if (Object.prototype.hasOwnProperty.call(manager.overlaySettings.resourceFilters, name)) { manager.overlaySettings.resourceFilters[name] = !!value; return true; }
        return false;
    }

    function addKnowledge(factionId, amount, domain) {
        const faction = manager.factionById.get(Number(factionId));
        const banner = faction && faction.settlements[0];
        if (!banner) return false;
        ensureResearchState(banner).knowledge += Math.max(0, safeNumber(amount, 0));
        if (domain) addDomainExperience(banner, domain, Math.max(0, safeNumber(amount, 0)) * 0.05);
        return true;
    }

    function registerEra(era) {
        if (!era || !era.id || manager.eras.has(era.id)) return false;
        const normalized = Object.assign({index: ERA_ORDER.length, vision: 12, requiredTechsToAdvance: C.RESEARCH_ERA_UNLOCK_COUNT, techIds: []}, era);
        manager.eras.set(normalized.id, normalized);
        ERA_INDEX.set(normalized.id, normalized.index);
        ERA_ORDER[normalized.index] = normalized.id;
        return true;
    }

    function registerTechnology(tech) {
        if (!tech || !tech.id || manager.technologies.has(tech.id)) return false;
        const eraId = techEraId(tech);
        if (!manager.eras.has(eraId)) return false;
        const normalized = Object.assign({era: eraId, eraIndex: ERA_INDEX.get(eraId), domain: "society", cost: 1, prerequisites: [], conditions: [], effects: []}, tech);
        manager.technologies.set(normalized.id, normalized);
        TECH_BY_ID.set(normalized.id, normalized);
        if (!TECHS_BY_ERA.has(eraId)) TECHS_BY_ERA.set(eraId, []);
        TECHS_BY_ERA.get(eraId).push(normalized);
        const era = manager.eras.get(eraId);
        if (era.techIds && era.techIds.indexOf(normalized.id) === -1) era.techIds.push(normalized.id);
        return true;
    }

    function refreshCivilizationUi() {
        if (typeof document === "undefined") return;
        const parent = document.getElementById("civilizationParent");
        if (!parent || parent.style.display === "none") return;
        const factionIds = Array.from(manager.factionById.values()).filter((faction) => faction.settlements.length).map((faction) => faction.id).sort((a, b) => a - b);
        if (!factionIds.length) {
            document.getElementById("civilizationContent").textContent = civilizationText("ui.noFaction", "Place at least two civilized humans and let them found a camp.", "请先放置至少两名文明人类，并等待他们建立营地。");
            return;
        }
        if (!factionIds.includes(selectedCivilizationFactionId)) selectedCivilizationFactionId = factionIds[0];
        const selector = document.getElementById("civilizationFactionSelect");
        selector.textContent = "";
        factionIds.forEach((factionId) => {
            const option = document.createElement("option");
            option.value = factionId;
            option.textContent = civilizationText("ui.faction", "Faction", "阵营") + " " + factionId;
            option.selected = factionId === selectedCivilizationFactionId;
            selector.appendChild(option);
        });
        const initial = getFactionSnapshot(selectedCivilizationFactionId, selectedCivilizationSettlementId);
        if (!initial) return;
        if (!initial.settlements.some((settlement) => settlement.id === selectedCivilizationSettlementId)) selectedCivilizationSettlementId = initial.settlements[0].id;
        const snapshot = getFactionSnapshot(selectedCivilizationFactionId, selectedCivilizationSettlementId);
        const settlementSelector = document.getElementById("civilizationSettlementSelect");
        if (settlementSelector) {
            settlementSelector.textContent = "";
            snapshot.settlements.forEach((settlement) => {
                const option = document.createElement("option");
                option.value = settlement.id;
                option.textContent = civilizationText("ui.settlement", "Settlement", "聚落") + " " + settlement.id + " · " + settlement.population + "/" + settlement.housing + (settlement.active ? "" : " (暂停)");
                option.selected = settlement.id === selectedCivilizationSettlementId;
                settlementSelector.appendChild(option);
            });
        }
        const content = document.getElementById("civilizationContent");
        content.textContent = "";
        const eraTitle = document.createElement("div");
        eraTitle.className = "civ-era-title";
        eraTitle.textContent = localizedEraName(snapshot.era) + " · " + snapshot.completedInEra + "/8 · " + civilizationText("ui.advance", "Advance at", "晋级需要") + " " + snapshot.requiredToAdvance + "/8";
        content.appendChild(eraTitle);
        const eraStrip = document.createElement("div");
        eraStrip.className = "civ-era-strip";
        (TechData.ERAS || []).forEach((era) => {
            const chip = document.createElement("span");
            chip.className = "civ-era-chip " + (era.index < safeNumber(ERA_INDEX.get(snapshot.eraId), 0) ? "done" : (era.id === snapshot.eraId ? "current" : "locked"));
            chip.textContent = localizedEraName(era);
            eraStrip.appendChild(chip);
        });
        content.appendChild(eraStrip);
        const tabs = document.createElement("div");
        tabs.className = "civ-tabs";
        [["overview", "资源"], ["technology", "科技"], ["wars", "战争"], ["logs", "日志"], ["overlays", "地图"]].forEach((item) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = selectedCivilizationTab === item[0] ? "active" : "";
            button.textContent = item[1];
            button.addEventListener("click", function () { selectedCivilizationTab = item[0]; refreshCivilizationUi(); });
            tabs.appendChild(button);
        });
        content.appendChild(tabs);
        const summary = document.createElement("div");
        summary.className = "civ-summary";
        summary.textContent = civilizationText("ui.population", "Population", "人口") + " " + snapshot.population + "/" + snapshot.housing + " · " +
            civilizationText("ui.knowledge", "Knowledge", "知识") + " " + snapshot.knowledge.toFixed(1) + " · " +
            civilizationText("ui.stock", "Stock F/W/S", "库存 食/木/石") + " " + Math.floor(snapshot.stock.food) + "/" + Math.floor(snapshot.stock.wood) + "/" + Math.floor(snapshot.stock.stone);
        content.appendChild(summary);
        if (selectedCivilizationTab === "overview") {
            const editor = document.createElement("div");
            editor.className = "civ-resource-editor";
            const inputs = {};
            STOCK_KEYS.forEach((key) => {
                const label = document.createElement("label");
                label.textContent = (RESOURCE_NAMES_ZH[key] || key) + " ";
                const input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.value = Math.floor(safeNumber(snapshot.stock[key], 0));
                inputs[key] = input;
                label.appendChild(input);
                editor.appendChild(label);
            });
            ["sapling", "pinecone", "bamboo_plant"].forEach((seed) => {
                const label = document.createElement("label");
                label.textContent = ({sapling: "普通树苗", pinecone: "松树苗", bamboo_plant: "竹苗"}[seed] || seed) + " ";
                const input = document.createElement("input");
                input.type = "number";
                input.min = "0";
                input.value = Math.floor(safeNumber(snapshot.stock.treeSaplings && snapshot.stock.treeSaplings[seed], 0));
                inputs["tree_sapling:" + seed] = input;
                label.appendChild(input);
                editor.appendChild(label);
            });
            const apply = document.createElement("button");
            apply.type = "button";
            apply.textContent = "强制写入库存";
            apply.addEventListener("click", function () {
                const patch = {seeds: {}, treeSaplings: {}};
                Object.keys(inputs).forEach((key) => {
                    if (key.indexOf("seed:") === 0) patch.seeds[key.slice(5)] = Number(inputs[key].value);
                    else if (key.indexOf("tree_sapling:") === 0) patch.treeSaplings[key.slice(14)] = Number(inputs[key].value);
                    else patch[key] = Number(inputs[key].value);
                });
                setSettlementResources(snapshot.id, snapshot.selectedSettlementId, patch);
                refreshCivilizationUi();
            });
            editor.appendChild(apply);
            content.appendChild(editor);
        }
        else if (selectedCivilizationTab === "technology") {
            (TechData.ERAS || []).forEach((techEra) => {
                const heading = document.createElement("h3");
                heading.textContent = localizedEraName(techEra) + " · " + snapshot.technologies.filter((entry) => entry.eraId === techEra.id && entry.unlocked).length + "/8";
                content.appendChild(heading);
                const grid = document.createElement("div");
                grid.className = "civ-tech-grid";
                snapshot.technologies.filter((entry) => entry.eraId === techEra.id).forEach((entry) => {
                    const card = document.createElement("div");
                    card.className = "civ-tech-card" + (entry.unlocked ? " unlocked" : "") + (entry.active ? " active" : "") + (entry.focused ? " focused" : "") + ((!entry.prerequisitesMet || !entry.conditionsMet) ? " blocked" : "");
                    const title = document.createElement("strong");
                    title.textContent = localizedTechName(entry.source);
                    card.appendChild(title);
                    const progress = document.createElement("span");
                    progress.textContent = localizedDomain(entry.domain) + " · " + Math.min(entry.cost, entry.progress).toFixed(1) + "/" + entry.cost;
                    card.appendChild(progress);
                    const status = document.createElement("span");
                    status.textContent = entry.unlocked ? (entry.forced ? "已研发（强制）" : "已研发") : (entry.focused ? "重点研发 #" + (entry.queueIndex + 1) + (entry.future ? " · 未来时代" : "") : (entry.future ? "未来时代 · 未研发" : "未研发"));
                    card.appendChild(status);
                    if (entry.prerequisites.length) {
                        const prerequisites = document.createElement("small");
                        prerequisites.textContent = "前置：" + entry.prerequisites.join(", ") + (entry.prerequisitesMet ? " ✓" : "");
                        card.appendChild(prerequisites);
                    }
                    if (entry.conditionStates.length) {
                        const conditions = document.createElement("small");
                        conditions.textContent = entry.conditionStates.map(conditionDescription).join(" · ");
                        card.appendChild(conditions);
                    }
                    if (!entry.unlocked) {
                        const controls = document.createElement("span");
                        const focus = document.createElement("button");
                        focus.type = "button";
                        focus.textContent = entry.focused ? "取消重点" : "标记重点";
                        focus.addEventListener("click", function () { setTechnologyState(snapshot.id, entry.id, entry.focused ? "unresearched" : "focused"); refreshCivilizationUi(); });
                        controls.appendChild(focus);
                        const force = document.createElement("button");
                        force.type = "button";
                        force.textContent = "强制完成";
                        force.addEventListener("click", function () { if (typeof confirm !== "function" || confirm("强制完成后不可撤销，确定吗？")) { setTechnologyState(snapshot.id, entry.id, "researched"); refreshCivilizationUi(); } });
                        controls.appendChild(force);
                        if (entry.focused && entry.queueIndex > 0) {
                            const up = document.createElement("button"); up.type = "button"; up.textContent = "↑"; up.addEventListener("click", function () { moveResearchPriority(snapshot.id, entry.id, entry.queueIndex - 1); refreshCivilizationUi(); }); controls.appendChild(up);
                        }
                        card.appendChild(controls);
                    }
                    grid.appendChild(card);
                });
                content.appendChild(grid);
            });
        }
        else if (selectedCivilizationTab === "wars") {
            const modeLabel = document.createElement("label");
            modeLabel.textContent = civilizationText("peace.label", "Peace mode ", "和平模式 ");
            const modeSelect = document.createElement("select");
            [["normal","正常"],["no-new-wars","仅禁止新战争"],["full-peace","完全和平"]].forEach((item) => {
                const option = document.createElement("option");
                option.value = item[0];
                option.textContent = item[1];
                option.selected = getPeaceMode() === item[0];
                modeSelect.appendChild(option);
            });
            modeSelect.addEventListener("change", function () { setPeaceMode(modeSelect.value); refreshCivilizationUi(); });
            modeLabel.appendChild(modeSelect);
            content.appendChild(modeLabel);
            const explanation = document.createElement("p");
            explanation.textContent = getPeaceMode() === "normal" ? "允许宣战和正常战斗。" : (getPeaceMode() === "no-new-wars" ? "禁止新战争，已有战争继续。" : "已有战争、攻击、反击和吞并已暂停，关闭后继续。");
            content.appendChild(explanation);
            const wars = document.createElement("div");
            const active = getWarSnapshot(snapshot.id);
            wars.textContent = active.length ? active.map((war) => "对阵 F" + war.enemyFactionId + (war.suspended ? " · 已暂停" : " · 第" + war.wave + "波 · 攻" + war.attackers + "/守" + war.defenders) + " · " + war.reason).join("\n") : "当前没有战争。";
            content.appendChild(wars);
            factionIds.filter((id) => id !== snapshot.id && snapshot.wars.indexOf(id) === -1).forEach((enemyId) => {
                const button = document.createElement("button");
                button.type = "button";
                button.disabled = getPeaceMode() !== "normal";
                button.textContent = "强制向阵营 " + enemyId + " 宣战";
                button.addEventListener("click", function () { if (typeof confirm !== "function" || confirm("战争将持续到一方被吞并，确定宣战吗？")) { declareWar(snapshot.id, enemyId, "manual"); refreshCivilizationUi(); } });
                content.appendChild(button);
            });
        }
        else if (selectedCivilizationTab === "logs") {
            const log = document.createElement("div");
            log.className = "civ-log";
            snapshot.chronicle.slice().reverse().forEach((event) => {
                const row = document.createElement("div");
                row.textContent = event.timestamp + " · " + event.message;
                log.appendChild(row);
            });
            content.appendChild(log);
        }
        else if (selectedCivilizationTab === "overlays") {
            [["territory", "显示领地列"], ["resources", "显示资源点"], ["food", "食物"], ["tree", "树木"], ["stone", "石头"], ["metals", "金属"], ["drops", "掉落物"]].forEach((item) => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "checkbox";
                input.checked = item[0] === "territory" || item[0] === "resources" ? manager.overlaySettings[item[0]] : manager.overlaySettings.resourceFilters[item[0]];
                input.addEventListener("change", function () { setMapOverlay(item[0], input.checked); });
                label.appendChild(input);
                label.appendChild(document.createTextNode(item[1]));
                content.appendChild(label);
            });
        }
    }

    function openCivilizationPanel(factionId) {
        if (typeof document === "undefined") return false;
        if (Number.isFinite(Number(factionId))) selectedCivilizationFactionId = Number(factionId);
        if (typeof closeMenu === "function" && typeof showingMenu !== "undefined" && showingMenu && showingMenu !== "civilization") closeMenu("civilization");
        const parent = document.getElementById("civilizationParent");
        if (!parent) return false;
        parent.style.display = "block";
        if (typeof showingMenu !== "undefined") showingMenu = "civilization";
        if (typeof paused !== "undefined") paused = true;
        if (typeof checkPause === "function") checkPause();
        refreshCivilizationUi();
        return true;
    }

    function installCivilizationUi() {
        if (typeof document === "undefined" || document.getElementById("civilizationParent")) return;
        const style = document.createElement("style");
        style.id = "civilizationUiStyle";
        style.textContent = ".civ-menu{max-width:860px!important;width:min(94vw,860px)!important}.civ-toolbar,.civ-tabs{display:flex;flex-wrap:wrap;gap:.55em;align-items:center;justify-content:center;margin:.7em 0}.civ-tabs button.active{outline:2px solid #63a9de}.civ-era-title{font-size:1.2em;font-weight:700;margin:.5em}.civ-era-strip{display:flex;flex-wrap:wrap;gap:.35em;justify-content:center;margin:.4em}.civ-era-chip{padding:.22em .5em;border:1px solid #777;border-radius:.35em;opacity:.45}.civ-era-chip.done{opacity:.8;border-color:#78a878}.civ-era-chip.current{opacity:1;border-color:#e5c15c;color:#ffe08a}.civ-summary{margin:.5em;text-align:center}.civ-materials{font-size:.82em;opacity:.85}.civ-tech-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.55em;padding:.5em}.civ-tech-card{display:flex;flex-direction:column;gap:.3em;text-align:left;padding:.65em;border:1px solid #777;border-radius:.45em;background:#252525;color:#eee}.civ-tech-card.unlocked{border-color:#5ca66b;background:#213526}.civ-tech-card.active{border-color:#e8bb4a;box-shadow:0 0 8px #e8bb4a88}.civ-tech-card.focused{outline:2px solid #63a9de}.civ-tech-card.blocked{opacity:.7}.civ-tech-domain,.civ-tech-status,.civ-tech-card small{font-size:.8em;opacity:.9}.civ-resource-editor{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.5em;padding:.7em}.civ-resource-editor label{display:flex;justify-content:space-between;gap:.4em}.civ-resource-editor input{width:6em}.civ-log{max-height:48vh;overflow:auto;text-align:left;white-space:normal}.civ-log div{padding:.3em;border-bottom:1px solid #555}@media(max-width:560px){.civ-tech-grid,.civ-resource-editor{grid-template-columns:1fr}}";
        document.head.appendChild(style);
        const parent = document.createElement("div");
        parent.id = "civilizationParent";
        parent.className = "menuParent";
        parent.style.display = "none";
        const menu = document.createElement("div");
        menu.className = "menuScreen civ-menu";
        const close = document.createElement("button");
        close.className = "XButton";
        close.textContent = "-";
        close.addEventListener("click", function () { if (typeof closeMenu === "function") closeMenu(); });
        menu.appendChild(close);
        const title = document.createElement("span");
        title.className = "menuTitle";
        title.textContent = civilizationText("ui.title", "Civilization", "文明发展");
        menu.appendChild(title);
        const toolbar = document.createElement("div");
        toolbar.className = "civ-toolbar";
        const selectLabel = document.createElement("span");
        selectLabel.textContent = civilizationText("ui.observe", "Observe", "查看");
        toolbar.appendChild(selectLabel);
        const selector = document.createElement("select");
        selector.id = "civilizationFactionSelect";
        selector.addEventListener("change", function () { selectedCivilizationFactionId = Number(selector.value); selectedCivilizationSettlementId = null; refreshCivilizationUi(); });
        toolbar.appendChild(selector);
        const settlementSelector = document.createElement("select");
        settlementSelector.id = "civilizationSettlementSelect";
        settlementSelector.addEventListener("change", function () { selectedCivilizationSettlementId = Number(settlementSelector.value); refreshCivilizationUi(); });
        toolbar.appendChild(settlementSelector);
        menu.appendChild(toolbar);
        const content = document.createElement("div");
        content.id = "civilizationContent";
        content.className = "menuText";
        menu.appendChild(content);
        parent.appendChild(menu);
        document.body.appendChild(parent);
        const controls = document.getElementById("toolControls");
        if (controls) {
            const button = document.createElement("button");
            button.id = "civilizationButton";
            button.className = "controlButton";
            button.textContent = civilizationText("ui.button", "Civilization", "文明");
            button.title = civilizationText("ui.buttonTitle", "Open civilization and technology overview", "打开文明与科技总览");
            button.addEventListener("click", function () {
                if (typeof showingMenu !== "undefined" && showingMenu === "civilization" && typeof closeMenu === "function") closeMenu();
                else openCivilizationPanel(selectedCivilizationFactionId);
            });
            const settingsButton = document.getElementById("settingsButton");
            controls.insertBefore(button, settingsButton || null);
        }
    }

    function localizedPersonRole(role) {
        const value = role || "worker";
        return localizedPersonLabel(PERSON_ROLE_LABELS, value, String(value).replace(/_/g, " "));
    }

    function localizedPersonTask(task) {
        const value = task || "idle";
        return localizedPersonLabel(PERSON_TASK_LABELS, value, String(value).replace(/_/g, " "));
    }

    function localizedPersonWeapon(weapon) {
        const value = weapon || "fists";
        return localizedPersonLabel(PERSON_WEAPON_LABELS, value, String(value).replace(/_/g, " "));
    }

    function localizedDeathCause(cause) {
        if (!cause) return "";
        return localizedPersonLabel(PERSON_DEATH_CAUSE_LABELS, cause, String(cause).replace(/_/g, " "));
    }

    function peopleFilterValue(id) {
        const element = typeof document !== "undefined" ? document.getElementById(id) : null;
        return element ? element.value : "";
    }

    function readPeopleFilters() {
        const factionValue = peopleFilterValue("peopleFactionFilter");
        const settlementValue = peopleFilterValue("peopleSettlementFilter");
        return {
            status: selectedPeopleStatus,
            query: peopleFilterValue("peopleSearchInput"),
            factionId: factionValue === "" ? null : Number(factionValue),
            settlementId: settlementValue === "" ? null : Number(settlementValue),
            role: peopleFilterValue("peopleRoleFilter") || null,
            task: peopleFilterValue("peopleTaskFilter") || null
        };
    }

    function setPeopleSelectOptions(id, options, allLabel) {
        const select = document.getElementById(id);
        if (!select) return;
        const signature = options.map((option) => option.value + ":" + option.label).join("|");
        if (select.dataset.signature === signature) return;
        const previous = select.value;
        select.textContent = "";
        const all = document.createElement("option");
        all.value = "";
        all.textContent = allLabel;
        select.appendChild(all);
        options.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.value;
            option.textContent = item.label;
            select.appendChild(option);
        });
        select.dataset.signature = signature;
        select.value = options.some((option) => String(option.value) === previous) ? previous : "";
    }

    function refreshPeopleFilterOptions(people) {
        const factionIds = Array.from(new Set(people.map((person) => person.factionId).filter(Number.isFinite))).sort((a, b) => a - b);
        setPeopleSelectOptions("peopleFactionFilter", factionIds.map((id) => ({value: id, label: civilizationText("people.faction", "Faction ", "阵营 ") + id})), civilizationText("people.allFactions", "All factions", "全部阵营"));

        const factionValue = peopleFilterValue("peopleFactionFilter");
        const settlementIds = Array.from(new Set(people.filter((person) => factionValue === "" || Number(factionValue) === person.factionId).map((person) => person.settlementId).filter(Number.isFinite))).sort((a, b) => a - b);
        setPeopleSelectOptions("peopleSettlementFilter", settlementIds.map((id) => ({value: id, label: civilizationText("people.settlement", "Settlement ", "聚落 ") + id})), civilizationText("people.allSettlements", "All settlements", "全部聚落"));

        const roles = Array.from(new Set(people.map((person) => person.role).filter(Boolean))).sort();
        setPeopleSelectOptions("peopleRoleFilter", roles.map((role) => ({value: role, label: localizedPersonRole(role)})), civilizationText("people.allRoles", "All roles", "全部职业"));
        const tasks = Array.from(new Set(people.map((person) => person.task).filter(Boolean))).sort();
        setPeopleSelectOptions("peopleTaskFilter", tasks.map((task) => ({value: task, label: localizedPersonTask(task)})), civilizationText("people.allTasks", "All activities", "全部活动"));
    }

    function personAgeLabel(person) {
        const age = safeNumber(person && person.ageYears, 0).toFixed(1);
        return isChineseUi() ? age + " 岁" : age + " years";
    }

    function personCarryLabel(person) {
        const carry = person && person.carry || {};
        const parts = Object.keys(carry).filter((kind) => safeNumber(carry[kind], 0) > 0).map((kind) => localizedResourceName(kind) + " " + Math.round(carry[kind]));
        if (!parts.length) return civilizationText("people.emptyCarry", "Empty", "未携带");
        return parts.join(", ") + " (" + Math.round(person.carryTotal) + "/" + Math.round(person.carryCapacity) + ")";
    }

    function addPersonProfileStat(parent, label, value) {
        const item = document.createElement("div");
        item.className = "people-profile-stat";
        const name = document.createElement("span");
        name.textContent = label;
        const content = document.createElement("strong");
        content.textContent = value === null || value === undefined || value === "" ? "-" : String(value);
        item.appendChild(name);
        item.appendChild(content);
        parent.appendChild(item);
    }

    function renderPeopleList(snapshot) {
        const list = document.getElementById("peopleList");
        if (!list) return;
        const scrollTop = list.scrollTop;
        list.textContent = "";
        if (!snapshot.people.length) {
            const empty = document.createElement("div");
            empty.className = "people-empty";
            empty.textContent = civilizationText("people.none", "No matching people", "没有符合条件的人物");
            list.appendChild(empty);
        }
        snapshot.people.forEach((person) => {
            const row = document.createElement("button");
            row.type = "button";
            row.className = "people-row" + (person.humanId === selectedPersonId ? " selected" : "");
            row.dataset.humanId = String(person.humanId);
            const heading = document.createElement("span");
            heading.className = "people-row-heading";
            const swatch = document.createElement("i");
            swatch.className = "people-swatch";
            swatch.style.backgroundColor = person.color || factionColor(person.factionId);
            const identity = document.createElement("strong");
            identity.textContent = "H" + person.humanId;
            const summary = document.createElement("span");
            summary.textContent = personAgeLabel(person) + " · " + localizedPersonRole(person.role);
            heading.appendChild(swatch);
            heading.appendChild(identity);
            heading.appendChild(summary);
            const activity = document.createElement("span");
            activity.className = "people-row-activity";
            activity.textContent = person.status === "living" && person.currentActivity ? person.currentActivity.description : ((person.diedAt || "") + (person.deathCause ? " · " + localizedDeathCause(person.deathCause) : ""));
            const carry = document.createElement("span");
            carry.className = "people-row-carry";
            carry.textContent = civilizationText("people.carry", "Carrying", "携带") + "：" + personCarryLabel(person);
            row.appendChild(heading);
            row.appendChild(activity);
            row.appendChild(carry);
            row.addEventListener("click", function () {
                selectedPersonId = person.humanId;
                peopleHistoryLimit = C.PEOPLE_HISTORY_PAGE_SIZE;
                refreshPeopleUi();
            });
            list.appendChild(row);
        });
        list.scrollTop = scrollTop;
    }

    function renderActivityProgress(parent, progress) {
        if (!progress || !Number.isFinite(progress.total) || progress.total <= 0) return;
        const label = document.createElement("div");
        label.className = "people-progress-label";
        label.textContent = Math.round(progress.current) + "/" + Math.round(progress.total) + " · " + Math.max(0, Math.min(100, progress.percent)) + "%";
        const track = document.createElement("div");
        track.className = "people-progress";
        track.setAttribute("role", "progressbar");
        track.setAttribute("aria-valuemin", "0");
        track.setAttribute("aria-valuemax", "100");
        track.setAttribute("aria-valuenow", String(Math.max(0, Math.min(100, progress.percent))));
        const fill = document.createElement("span");
        fill.style.width = Math.max(0, Math.min(100, progress.percent)) + "%";
        track.appendChild(fill);
        parent.appendChild(label);
        parent.appendChild(track);
    }

    function activityHistoryContext(entry) {
        const metrics = entry && entry.metrics || {};
        if (entry && entry.type === "role_changed" && metrics.fromRole && metrics.toRole) return localizedPersonRole(metrics.fromRole) + " → " + localizedPersonRole(metrics.toRole);
        if (metrics.recipeId) return civilizationText("people.recipe", "Recipe ", "配方 ") + String(metrics.recipeId).replace(/_/g, " ");
        if (metrics.equippedWeapon) return civilizationText("people.equipped", "Equipped ", "装备 ") + String(metrics.equippedWeapon).replace(/_/g, " ");
        return "";
    }

    function renderPeopleDetail(person) {
        const detail = document.getElementById("peopleDetail");
        if (!detail) return;
        const scrollTop = detail.scrollTop;
        detail.textContent = "";
        if (!person) {
            const empty = document.createElement("div");
            empty.className = "people-empty";
            empty.textContent = civilizationText("people.selectNone", "No person selected", "未选择人物");
            detail.appendChild(empty);
            return;
        }

        const header = document.createElement("div");
        header.className = "people-detail-header";
        const title = document.createElement("div");
        title.className = "people-detail-identity";
        const swatch = document.createElement("i");
        swatch.className = "people-swatch";
        swatch.style.backgroundColor = person.color || factionColor(person.factionId);
        const name = document.createElement("strong");
        name.textContent = "H" + person.humanId;
        const status = document.createElement("span");
        status.className = "people-status";
        status.textContent = person.status === "living" ? civilizationText("people.living", "Living", "现存") : civilizationText("people.deceased", "Deceased", "逝者");
        title.appendChild(swatch);
        title.appendChild(name);
        title.appendChild(status);
        header.appendChild(title);
        const locate = document.createElement("button");
        locate.type = "button";
        locate.className = "people-icon-button";
        locate.textContent = "⌖";
        locate.title = civilizationText("people.locate", "Locate on map", "在地图中定位");
        locate.setAttribute("aria-label", locate.title);
        locate.disabled = person.status !== "living";
        locate.addEventListener("click", function () { focusPerson(person.humanId); });
        header.appendChild(locate);
        const command = document.createElement("button");
        command.type = "button";
        command.className = "people-icon-button";
        command.textContent = commandPersonId === person.humanId ? "■" : "➤";
        command.title = commandPersonId === person.humanId ? civilizationText("people.commandCancel", "Cancel command mode", "取消指挥") : civilizationText("people.command", "Command this person", "指挥此人");
        command.setAttribute("aria-label", command.title);
        command.disabled = person.status !== "living" || person.isChild;
        command.addEventListener("click", function () {
            if (commandPersonId === person.humanId) cancelPersonCommand();
            else setCommandPerson(person.humanId);
            installPersonCommandInput();
            refreshPeopleUi();
        });
        header.appendChild(command);
        detail.appendChild(header);

        const profile = document.createElement("div");
        profile.className = "people-profile-grid";
        addPersonProfileStat(profile, civilizationText("people.factionShort", "Faction", "阵营"), "F" + person.factionId);
        addPersonProfileStat(profile, civilizationText("people.settlementShort", "Settlement", "聚落"), Number.isFinite(person.settlementId) ? person.settlementId : "-");
        addPersonProfileStat(profile, civilizationText("people.age", "Age", "年龄"), personAgeLabel(person) + " / " + Math.round(safeNumber(person.lifespanYears, 0)));
        addPersonProfileStat(profile, civilizationText("people.role", "Role", "职业"), localizedPersonRole(person.role));
        addPersonProfileStat(profile, "HP", Math.round(person.hp) + "/" + Math.round(person.maxHp));
        addPersonProfileStat(profile, civilizationText("people.position", "Position", "位置"), "(" + person.x + ", " + person.y + ")");
        addPersonProfileStat(profile, civilizationText("people.weapon", "Weapon", "武器"), localizedPersonWeapon(person.weapon));
        addPersonProfileStat(profile, civilizationText("people.carry", "Carrying", "携带"), personCarryLabel(person));
        detail.appendChild(profile);

        if (person.status === "deceased") {
            const death = document.createElement("div");
            death.className = "people-death-summary";
            death.textContent = (person.diedAt || "") + (person.deathCause ? " · " + localizedDeathCause(person.deathCause) : "");
            detail.appendChild(death);
        }
        else {
            const current = document.createElement("section");
            current.className = "people-current";
            const heading = document.createElement("h3");
            heading.textContent = civilizationText("people.current", "Current activity", "当前活动");
            current.appendChild(heading);
            const description = document.createElement("div");
            description.className = "people-current-description";
            description.textContent = person.currentActivity ? person.currentActivity.description : localizedPersonTask(person.task);
            current.appendChild(description);
            if (person.currentActivity && person.currentActivity.startedAt) {
                const started = document.createElement("small");
                started.textContent = person.currentActivity.startedAt + " · " + civilizationText("people.duration", "Duration ", "持续 ") + person.currentActivity.durationTicks + " ticks";
                current.appendChild(started);
                renderActivityProgress(current, person.currentActivity.progress);
            }
            detail.appendChild(current);
        }

        const historyHeader = document.createElement("div");
        historyHeader.className = "people-history-header";
        const historyTitle = document.createElement("h3");
        historyTitle.textContent = civilizationText("people.history", "Activity history", "过往活动");
        historyHeader.appendChild(historyTitle);
        const retained = document.createElement("span");
        retained.textContent = String(person.historyRetained);
        historyHeader.appendChild(retained);
        detail.appendChild(historyHeader);

        const history = getPersonHistory(person.humanId, {limit: peopleHistoryLimit});
        if (!history.entries.length) {
            const empty = document.createElement("div");
            empty.className = "people-empty compact";
            empty.textContent = civilizationText("people.noHistory", "No completed activities yet", "还没有已完成的活动");
            detail.appendChild(empty);
        }
        history.entries.forEach((entry) => {
            const row = document.createElement("div");
            row.className = "people-history-row";
            const time = document.createElement("time");
            time.textContent = entry.endedAt || entry.startedAt || "";
            const description = document.createElement("div");
            description.textContent = entry.description;
            row.appendChild(time);
            row.appendChild(description);
            const context = activityHistoryContext(entry);
            if (context) {
                const result = document.createElement("small");
                result.textContent = context;
                row.appendChild(result);
            }
            detail.appendChild(row);
        });
        if (history.hasMore) {
            const more = document.createElement("button");
            more.type = "button";
            more.className = "people-load-more";
            more.textContent = civilizationText("people.loadOlder", "Load older", "加载更早记录");
            more.addEventListener("click", function () {
                peopleHistoryLimit = Math.min(C.MAX_PERSON_ACTIVITY, peopleHistoryLimit + C.PEOPLE_HISTORY_PAGE_SIZE);
                refreshPeopleUi();
            });
            detail.appendChild(more);
        }
        detail.scrollTop = scrollTop;
    }

    function syncPeopleObserverScrollSpace() {
        if (typeof document === "undefined") return;
        const spacer = document.getElementById("peopleObserverScrollSpace");
        const panel = document.getElementById("peopleObserverPanel");
        if (!spacer || !panel || !peoplePanelOpen) {
            if (spacer) spacer.style.height = "0px";
            return;
        }
        const viewportWidth = root.visualViewport ? root.visualViewport.width : root.innerWidth;
        const panelRect = panel.getBoundingClientRect();
        const bottomSheet = panelRect.width >= viewportWidth * 0.9 && panelRect.top > 0;
        spacer.style.height = bottomSheet ? Math.ceil(panelRect.height) + "px" : "0px";
    }

    function refreshPeopleUi() {
        if (typeof document === "undefined") return;
        const panel = document.getElementById("peopleObserverPanel");
        if (!panel || !peoplePanelOpen) return;
        syncPeopleObserverScrollSpace();
        const menuOpen = typeof showingMenu !== "undefined" && !!showingMenu;
        panel.classList.toggle("is-obscured", menuOpen);
        if (menuOpen) return;

        const fullSnapshot = getPeopleSnapshot({status: selectedPeopleStatus});
        refreshPeopleFilterOptions(fullSnapshot.people);
        const snapshot = getPeopleSnapshot(readPeopleFilters());
        const counts = document.getElementById("peopleCounts");
        if (counts) counts.textContent = civilizationText("people.living", "Living", "现存") + " " + snapshot.counts.living + " · " + civilizationText("people.deceased", "Deceased", "逝者") + " " + snapshot.counts.deceased + " · " + civilizationText("people.visible", "Shown", "显示") + " " + snapshot.counts.filtered;
        ["living", "deceased"].forEach((status) => {
            const button = document.getElementById(status === "living" ? "peopleStatusLiving" : "peopleStatusDeceased");
            if (!button) return;
            const active = selectedPeopleStatus === status;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        const selectedVisible = snapshot.people.some((person) => person.humanId === selectedPersonId);
        if (!selectedVisible) {
            selectedPersonId = snapshot.people.length ? snapshot.people[0].humanId : null;
            peopleHistoryLimit = C.PEOPLE_HISTORY_PAGE_SIZE;
        }
        renderPeopleList(snapshot);
        renderPeopleDetail(selectedPersonId === null ? null : getPersonSnapshot(selectedPersonId));
    }

    function peopleRefreshLoop(timestamp) {
        peopleRefreshFrame = null;
        if (!peoplePanelOpen) return;
        if (!peopleLastRefreshAt || timestamp - peopleLastRefreshAt >= C.PEOPLE_UI_REFRESH_MS) {
            peopleLastRefreshAt = timestamp;
            refreshPeopleUi();
        }
        peopleRefreshFrame = root.requestAnimationFrame(peopleRefreshLoop);
    }

    function startPeopleRefreshLoop() {
        if (!peoplePanelOpen || peopleRefreshFrame !== null || typeof root.requestAnimationFrame !== "function") return;
        peopleRefreshFrame = root.requestAnimationFrame(peopleRefreshLoop);
    }

    function stopPeopleRefreshLoop() {
        if (peopleRefreshFrame !== null && typeof root.cancelAnimationFrame === "function") root.cancelAnimationFrame(peopleRefreshFrame);
        peopleRefreshFrame = null;
    }

    function focusPerson(humanId) {
        const actor = findLivingActor(humanId);
        if (!actor) {
            focusedPersonId = null;
            return false;
        }
        focusedPersonId = actor.humanId;
        if (typeof document === "undefined") return true;
        syncPeopleObserverScrollSpace();
        const canvasElement = document.getElementById("game");
        if (!canvasElement || typeof root.scrollTo !== "function") return true;
        const rect = canvasElement.getBoundingClientRect();
        const canvasWidth = Math.max(1, canvasElement.width || rect.width);
        const canvasHeight = Math.max(1, canvasElement.height || rect.height);
        const targetX = rect.left + root.pageXOffset + (canvasCoord(actor.x) + pixelSize / 2) / canvasWidth * rect.width;
        const targetY = rect.top + root.pageYOffset + (canvasCoord(actor.y) + pixelSize / 2) / canvasHeight * rect.height;
        const panel = document.getElementById("peopleObserverPanel");
        const viewportWidth = root.visualViewport ? root.visualViewport.width : root.innerWidth;
        const viewportHeight = root.visualViewport ? root.visualViewport.height : root.innerHeight;
        const panelRect = panel ? panel.getBoundingClientRect() : null;
        const bottomSheet = panelRect && panelRect.width >= viewportWidth * 0.9 && panelRect.top > 0;
        const panelWidth = panelRect && !bottomSheet ? panelRect.width : 0;
        const visibleHeight = bottomSheet ? Math.max(80, panelRect.top) : viewportHeight;
        root.scrollTo({left: Math.max(0, targetX - (viewportWidth - panelWidth) / 2), top: Math.max(0, targetY - visibleHeight / 2), behavior: "smooth"});
        return true;
    }

    function cancelActorTaskState(actor, reason) {
        if (!actor) return;
        cancelPendingAttacksFor(actor);
        delete actor.resumeAfterDelivery;
        delete actor.combatTargetId;
        delete actor.underAttackUntil;
        clearTask(actor, "interrupted", reason || "player_command");
    }

    function commandResult(accepted, action, reason, target) {
        return {accepted: !!accepted, action: action || null, reason: reason || null, target: target || null};
    }

    function cancelPersonCommand() {
        commandPersonId = null;
        commandHover = null;
        commandLastResult = commandResult(true, "cancel", "command_mode_cancelled", null);
        return true;
    }

    function setCommandPerson(humanId) {
        const actor = findLivingActor(humanId);
        if (!actor || actor.element !== "civ_body") return commandResult(false, "select", "adult_not_available", null);
        commandPersonId = actor.humanId;
        focusedPersonId = actor.humanId;
        commandLastResult = commandResult(true, "select", null, {humanId: actor.humanId});
        return commandLastResult;
    }

    function getPersonCommandState() {
        const actor = commandPersonId === null ? null : findLivingActor(commandPersonId);
        if (!actor && commandPersonId !== null) cancelPersonCommand();
        return {
            active: !!actor,
            humanId: actor ? actor.humanId : null,
            hover: commandHover ? Object.assign({}, commandHover) : null,
            order: actor && actor.playerOrder ? cloneActivityValue(actor.playerOrder) : null,
            lastResult: commandLastResult ? cloneActivityValue(commandLastResult) : null
        };
    }

    function clearPlayerOrder(actor, outcome, reason) {
        if (!actor) return;
        delete actor.playerOrder;
        if (actor.task === "move" || actor.task === "harvest" || actor.task === "deliver" || actor.task === "combat") clearTask(actor, outcome || "completed", reason || "player_order_finished");
    }

    function nearestCommandDestination(actor, x, y) {
        if (actorCanStandAt(actor, x, y)) return {x, y};
        for (let radius = 0; radius <= 6; radius++) {
            for (let dx = -radius; dx <= radius; dx++) {
                if (radius && Math.abs(dx) !== radius) continue;
                const px = x + dx;
                if (outOfBounds(px, y)) continue;
                const surfaceY = findSurfaceY(px, y);
                if (surfaceY !== null && actorCanStandAt(actor, px, surfaceY)) return {x: px, y: surfaceY};
            }
        }
        return null;
    }

    function legalDeliveryBuilding(actor, building) {
        if (!actor || !building || !isBuildingCorePixel(building) || building.del || building.buildingState === "destroyed" || building.townCenterActive === false) return false;
        if (building.factionId !== actor.factionId || building.settlementId !== actor.settlementId) return false;
        const carry = ensureActorCarry(actor);
        const kinds = Object.keys(carry).filter((kind) => carry[kind] > 0);
        if (!kinds.length) return false;
        return kinds.some((kind) => {
            const preferred = deliveryDestination(actor, kind);
            return building.element === "civ_banner" || preferred === building || preferred && preferred.buildingType === building.buildingType;
        });
    }

    function manualResourceTarget(actor, x, y) {
        let pixel = pixelsAt(x, y).find((candidate) => resourceDescriptor(candidate)) || null;
        const tree = getTreeAt(x, y);
        if (tree && tree.base) pixel = tree.base;
        const descriptor = resourceDescriptor(pixel);
        if (!pixel || !descriptor) return null;
        if ((descriptor.kind === "copper" || descriptor.kind === "tin" || descriptor.kind === "raw_iron") && actor.role !== "miner") return commandResult(false, "harvest", "miner_required", null);
        const owner = manager.territory && manager.territory.ownerAt(pixel.x);
        if (owner !== null && owner !== undefined && owner !== actor.factionId) return commandResult(false, "harvest", "foreign_territory", null);
        const key = pixel.element + "@" + pixel.x + "," + pixel.y;
        if (manager.resourceReservations && manager.resourceReservations.reservedBy({key, x: pixel.x, y: pixel.y, element: pixel.element}) !== undefined && manager.resourceReservations.reservedBy({key, x: pixel.x, y: pixel.y, element: pixel.element}) !== actor.humanId) return commandResult(false, "harvest", "resource_reserved_by_other", null);
        let approach = harvestApproach(actor, pixel);
        if (!approach && actor.element === "civ_body") approach = {x: pixel.x, y: pixel.y};
        if (!approach) return commandResult(false, "harvest", "unreachable", null);
        return {pixel, descriptor, approach, key};
    }

    function applyPlayerOrder(actor) {
        const order = actor && actor.playerOrder;
        if (!actor || !order || actor.dead || actor.del) return false;
        if (order.type === "move") {
            if (Core.distance(actor.x, actor.y, order.x, order.y) <= 1) {
                clearPlayerOrder(actor, "completed", "destination_reached");
                return true;
            }
            if (actor.task !== "move" || actor.targetKey !== taskTargetKey({x: order.x, y: order.y, kind: "command_destination"})) setTask(actor, "move", {x: order.x, y: order.y, kind: "command_destination"});
            return true;
        }
        if (order.type === "harvest") {
            const pixel = pixelsAt(order.x, order.y).find((candidate) => resourceDescriptor(candidate)) || null;
            if (!pixel) { clearPlayerOrder(actor, "interrupted", "resource_disappeared"); return false; }
            if (actor.task !== "harvest") {
                const found = manualResourceTarget(actor, order.x, order.y);
                if (!found || found.accepted === false || !setHarvestTask(actor, found)) { clearPlayerOrder(actor, "failed", found && found.reason || "invalid_resource_target"); return false; }
            }
            return true;
        }
        if (order.type === "deliver") {
            const building = getBuildingById(order.buildingId) || getBuildingCoreAt(order.x, order.y);
            if (!legalDeliveryBuilding(actor, building)) { clearPlayerOrder(actor, "interrupted", "delivery_destination_lost"); return false; }
            if (actor.task !== "deliver") setTask(actor, "deliver", building);
            return true;
        }
        if (order.type === "attack") {
            const target = findLivingActor(order.targetId);
            if (!target || (!atWar(actor.factionId, target.factionId) && !retaliationAllowed(actor, target))) { clearPlayerOrder(actor, "interrupted", "hostility_ended"); return false; }
            if (actor.task !== "combat" || actor.targetId !== target.humanId) { delete actor.combatTargetId; lockCombatTarget(actor, target); }
            return true;
        }
        return false;
    }

    function commitPlayerOrder(actor, order, taskTarget) {
        cancelActorTaskState(actor, "player_command_replaced");
        actor.playerOrder = order;
        if (taskTarget) setTask(actor, order.type === "attack" ? "combat" : order.type, taskTarget);
        else applyPlayerOrder(actor);
    }

    function issuePersonCommandAt(humanId, button, x, y) {
        const actor = findLivingActor(humanId);
        x = Math.round(Number(x));
        y = Math.round(Number(y));
        if (!actor || actor.element !== "civ_body") return commandResult(false, null, "adult_not_available", null);
        if (!Number.isFinite(x) || !Number.isFinite(y) || outOfBounds(x, y)) return commandResult(false, null, "invalid_coordinates", null);
        if (Number(button) === 0) {
            const target = pixelsAt(x, y).slice().reverse().map(getActorFromPixel).find((candidate) => candidate && candidate.humanId !== actor.humanId) || null;
            if (!target) return commandResult(false, "attack", "no_unit", {x, y});
            if (target.factionId === actor.factionId) return commandResult(false, "attack", "friendly_unit", {humanId: target.humanId});
            if (!atWar(actor.factionId, target.factionId) && !retaliationAllowed(actor, target)) return commandResult(false, "attack", getPeaceMode() === "full-peace" ? "full_peace" : "not_at_war", {humanId: target.humanId});
            commitPlayerOrder(actor, {type: "attack", targetId: target.humanId});
            return commandResult(true, "attack", null, {humanId: target.humanId, x: target.x, y: target.y});
        }
        const building = buildingVisualAt(x, y) || getBuildingCoreAt(x, y);
        if (building && carriedAmount(actor) > 0) {
            if (!legalDeliveryBuilding(actor, building)) return commandResult(false, "deliver", "invalid_delivery_building", {buildingId: building.buildingId, x, y});
            commitPlayerOrder(actor, {type: "deliver", buildingId: building.buildingId, x: building.x, y: building.y}, building);
            return commandResult(true, "deliver", null, {buildingId: building.buildingId, x: building.x, y: building.y});
        }
        const resource = manualResourceTarget(actor, x, y);
        if (resource) {
            if (resource.accepted === false) return resource;
            commitPlayerOrder(actor, {type: "harvest", x: resource.pixel.x, y: resource.pixel.y, element: resource.pixel.element});
            return commandResult(true, "harvest", null, {element: resource.pixel.element, x: resource.pixel.x, y: resource.pixel.y});
        }
        const destination = nearestCommandDestination(actor, x, y);
        if (!destination) return commandResult(false, "move", "no_standable_destination", {x, y});
        commitPlayerOrder(actor, {type: "move", x: destination.x, y: destination.y}, {x: destination.x, y: destination.y, kind: "command_destination"});
        return commandResult(true, "move", null, destination);
    }

    function handleCommandMouse(event) {
        if (commandPersonId === null || (event.button !== 0 && event.button !== 2)) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        const position = typeof getMousePos === "function" ? getMousePos(document.getElementById("game"), event) : mousePos;
        commandLastResult = issuePersonCommandAt(commandPersonId, event.button, position.x, position.y);
        commandHover = {x: position.x, y: position.y, action: commandLastResult.action, accepted: commandLastResult.accepted};
        if (peoplePanelOpen) refreshPeopleUi();
    }

    function installPersonCommandInput() {
        if (commandInputInstalled || typeof document === "undefined") return;
        const canvas = document.getElementById("game");
        if (!canvas) return;
        commandInputInstalled = true;
        canvas.addEventListener("mousedown", handleCommandMouse, true);
        canvas.addEventListener("mousemove", function (event) {
            if (commandPersonId === null) return;
            const position = typeof getMousePos === "function" ? getMousePos(canvas, event) : mousePos;
            commandHover = {x: position.x, y: position.y};
        }, true);
        root.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && commandPersonId !== null) {
                cancelPersonCommand();
                event.preventDefault();
                event.stopImmediatePropagation();
                if (peoplePanelOpen) refreshPeopleUi();
            }
        }, true);
    }

    function renderPersonCommand(ctx) {
        if (commandPersonId === null) return;
        const actor = findLivingActor(commandPersonId);
        if (!actor) { cancelPersonCommand(); return; }
        const order = actor.playerOrder;
        const target = order ? {x: order.x, y: order.y} : commandHover;
        const colors = {move: "#62b8ff", harvest: "#73d16b", deliver: "#f3c65e", attack: "#ff655e"};
        const color = colors[order && order.type || commandHover && commandHover.action] || "#ffffff";
        const ax = canvasCoord(actor.x) + pixelSize / 2;
        const ay = canvasCoord(actor.y - 1) + pixelSize / 2;
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = Math.max(2, pixelSize * 0.12);
        ctx.beginPath();
        ctx.moveTo(ax, ay - pixelSize * 1.4);
        ctx.lineTo(ax - pixelSize * 0.35, ay - pixelSize * 0.8);
        ctx.lineTo(ax + pixelSize * 0.35, ay - pixelSize * 0.8);
        ctx.closePath();
        ctx.fill();
        if (target && Number.isFinite(target.x) && Number.isFinite(target.y)) {
            const tx = canvasCoord(target.x) + pixelSize / 2;
            const ty = canvasCoord(target.y) + pixelSize / 2;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(tx, ty);
            ctx.stroke();
            ctx.strokeRect(tx - pixelSize * 0.35, ty - pixelSize * 0.35, pixelSize * 0.7, pixelSize * 0.7);
        }
        ctx.restore();
    }

    function renderPersonFocus(ctx) {
        if (focusedPersonId === null) return;
        const actor = findLivingActor(focusedPersonId);
        if (!actor) {
            focusedPersonId = null;
            return;
        }
        const pulse = (Math.sin(Date.now() / 170) + 1) / 2;
        const top = actor.element === "civ_body" ? actor.y - 1 : actor.y;
        const cellsHigh = actor.element === "civ_body" ? 2 : 1;
        const padding = pixelSize * (0.22 + pulse * 0.18);
        const x = canvasCoord(actor.x) - padding;
        const y = canvasCoord(top) - padding;
        const boxWidth = pixelSize + padding * 2;
        const boxHeight = pixelSize * cellsHigh + padding * 2;
        ctx.save();
        ctx.lineWidth = Math.max(2, pixelSize * 0.2);
        ctx.strokeStyle = "rgba(0,0,0,0.9)";
        ctx.strokeRect(x - 1, y - 1, boxWidth + 2, boxHeight + 2);
        ctx.lineWidth = Math.max(1, pixelSize * 0.12);
        ctx.strokeStyle = pulse > 0.5 ? "#ffffff" : "#ffd84a";
        ctx.strokeRect(x, y, boxWidth, boxHeight);
        ctx.restore();
    }

    function resetPeopleObserverState() {
        selectedPeopleStatus = "living";
        selectedPersonId = null;
        focusedPersonId = null;
        peopleHistoryLimit = C.PEOPLE_HISTORY_PAGE_SIZE;
        peopleLastRefreshAt = 0;
        cancelPersonCommand();
        if (peoplePanelOpen) refreshPeopleUi();
    }

    function closePeoplePanel() {
        peoplePanelOpen = false;
        focusedPersonId = null;
        stopPeopleRefreshLoop();
        if (typeof document !== "undefined") {
            const panel = document.getElementById("peopleObserverPanel");
            if (panel) {
                panel.style.display = "none";
                panel.setAttribute("aria-hidden", "true");
            }
            const button = document.getElementById("peopleObserverButton");
            if (button) button.setAttribute("on", "false");
            syncPeopleObserverScrollSpace();
        }
        return true;
    }

    function openPeoplePanel(humanId) {
        if (typeof document === "undefined") return false;
        installPeopleObserverUi();
        if (humanId !== undefined && humanId !== null) {
            const person = getPersonSnapshot(humanId);
            if (person) {
                selectedPersonId = person.humanId;
                selectedPeopleStatus = person.status;
                peopleHistoryLimit = C.PEOPLE_HISTORY_PAGE_SIZE;
            }
        }
        const panel = document.getElementById("peopleObserverPanel");
        if (!panel) return false;
        peoplePanelOpen = true;
        panel.style.display = "flex";
        panel.setAttribute("aria-hidden", "false");
        const button = document.getElementById("peopleObserverButton");
        if (button) button.setAttribute("on", "true");
        peopleLastRefreshAt = 0;
        refreshPeopleUi();
        startPeopleRefreshLoop();
        return true;
    }

    function installPeopleObserverUi() {
        if (typeof document === "undefined" || document.getElementById("peopleObserverPanel")) return;
        const style = document.createElement("style");
        style.id = "peopleObserverStyle";
        style.textContent = "#peopleObserverPanel{position:fixed;z-index:9000;top:8px;right:8px;bottom:8px;width:min(470px,calc(100vw - 16px));display:none;flex-direction:column;min-width:0;overflow:hidden;background:var(--theme-darkest2);color:#eee;border:2px solid var(--theme-opac85);border-radius:6px;box-shadow:0 8px 28px #000b;font:13px/1.35 Arial,sans-serif;text-align:left;user-select:text}#peopleObserverPanel.is-obscured{visibility:hidden;pointer-events:none}.people-observer-header{display:flex;align-items:center;gap:8px;min-height:40px;padding:6px 8px;border-bottom:1px solid var(--theme-dark);background:var(--theme-darker)}.people-observer-header h2{min-width:0;margin:0;font-size:16px;letter-spacing:0}.people-observer-header .people-counts{margin-left:auto;font-size:11px;opacity:.78;white-space:nowrap}.people-icon-button{width:30px;height:30px;flex:0 0 30px;padding:0;border:1px solid var(--theme)!important;border-radius:4px;background:var(--theme-darkest2);color:#eee;font-size:20px;line-height:1;cursor:pointer}.people-icon-button:disabled{opacity:.35;cursor:default}.people-status-tabs{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--theme-dark)}.people-status-tabs button{padding:7px;border:0;border-right:1px solid var(--theme-dark);background:var(--theme-darkest2);color:#bbb;cursor:pointer}.people-status-tabs button.active{background:var(--theme-dark);color:#fff;box-shadow:inset 0 -2px #63a9de}.people-filters{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px;padding:7px;border-bottom:1px solid var(--theme-dark)}.people-filters input,.people-filters select{box-sizing:border-box;width:100%;min-width:0;height:29px;padding:3px 6px;border:1px solid var(--theme-dark);border-radius:3px;background:var(--theme-darkest2);color:#eee;font-size:12px}.people-filters input{grid-column:1/-1}.people-observer-content{display:grid;grid-template-columns:minmax(142px,38%) minmax(0,1fr);min-height:0;flex:1}.people-list,.people-detail{min-width:0;min-height:0;overflow:auto}.people-list{border-right:1px solid var(--theme-dark);background:#090909}.people-row{display:flex;width:100%;min-width:0;flex-direction:column;gap:4px;padding:8px;border:0;border-bottom:1px solid #292929;background:transparent;color:#ddd;text-align:left;cursor:pointer}.people-row:hover{background:#202020}.people-row.selected{background:#25333a;box-shadow:inset 3px 0 #63a9de}.people-row-heading{display:grid;grid-template-columns:10px auto minmax(0,1fr);align-items:center;gap:5px;min-width:0}.people-row-heading>span{overflow:hidden;color:#aaa;font-size:10px;text-overflow:ellipsis;white-space:nowrap}.people-swatch{display:inline-block;width:9px;height:9px;flex:0 0 9px;border:1px solid #fff8;border-radius:2px}.people-row-activity{display:-webkit-box;min-width:0;overflow:hidden;color:#aaa;font-size:11px;overflow-wrap:anywhere;-webkit-box-orient:vertical;-webkit-line-clamp:2}.people-row-carry{min-width:0;color:#d4b86a;font-size:10px;overflow-wrap:anywhere;white-space:normal}.people-detail{padding:9px}.people-detail-header{display:flex;align-items:center;gap:6px;padding-bottom:8px;border-bottom:1px solid var(--theme-dark)}.people-detail-identity{display:flex;min-width:0;align-items:center;gap:6px;font-size:17px}.people-detail-header>.people-icon-button{margin-left:auto}.people-status{padding:2px 5px;border:1px solid #666;border-radius:3px;color:#bbb;font-size:10px;font-weight:400}.people-profile-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;margin:8px 0;background:#303030}.people-profile-stat{display:flex;min-width:0;flex-direction:column;gap:2px;padding:6px;background:#111}.people-profile-stat span{color:#888;font-size:10px}.people-profile-stat strong{min-width:0;overflow-wrap:anywhere;font-size:11px;font-weight:600}.people-current,.people-death-summary{margin:8px 0;padding:8px 0;border-top:1px solid var(--theme-dark);border-bottom:1px solid var(--theme-dark)}.people-current h3,.people-history-header h3{margin:0;font-size:12px}.people-current-description{margin:5px 0;overflow-wrap:anywhere}.people-current small,.people-history-row small{display:block;color:#999;overflow-wrap:anywhere}.people-progress-label{margin-top:6px;color:#aaa;font-size:10px}.people-progress{height:4px;margin-top:3px;overflow:hidden;background:#333;border-radius:2px}.people-progress span{display:block;height:100%;background:#63a9de}.people-history-header{display:flex;align-items:center;justify-content:space-between;margin:10px 0 3px}.people-history-header span{color:#888;font-size:10px}.people-history-row{padding:7px 0;border-bottom:1px solid #292929;overflow-wrap:anywhere}.people-history-row time{display:block;margin-bottom:2px;color:#777;font-size:9px}.people-history-row div{font-size:11px}.people-load-more{width:100%;margin-top:8px;padding:6px;border:1px solid var(--theme-dark);border-radius:3px;background:#222;color:#ddd;cursor:pointer}.people-empty{padding:18px 9px;color:#888;text-align:center;overflow-wrap:anywhere}.people-empty.compact{padding:9px}.people-death-summary{color:#c8a0a0;overflow-wrap:anywhere}@media(max-width:700px){#peopleObserverPanel{top:auto;right:0;bottom:0;left:0;width:100%;height:min(70dvh,620px);border-right:0;border-bottom:0;border-left:0;border-radius:0}.people-observer-header{min-height:36px}.people-observer-content{grid-template-columns:minmax(128px,40%) minmax(0,1fr)}.people-profile-grid{grid-template-columns:1fr}.people-row{padding:7px 6px}}";
        document.head.appendChild(style);

        const panel = document.createElement("aside");
        panel.id = "peopleObserverPanel";
        panel.setAttribute("aria-hidden", "true");
        panel.setAttribute("aria-label", civilizationText("people.title", "People observer", "人物观察"));
        panel.addEventListener("click", function (event) { event.stopPropagation(); });
        panel.addEventListener("keydown", function (event) {
            event.stopPropagation();
            if (event.key === "Escape") closePeoplePanel();
        });

        const header = document.createElement("header");
        header.className = "people-observer-header";
        const title = document.createElement("h2");
        title.textContent = civilizationText("people.title", "People observer", "人物观察");
        const counts = document.createElement("span");
        counts.id = "peopleCounts";
        counts.className = "people-counts";
        const close = document.createElement("button");
        close.type = "button";
        close.className = "people-icon-button";
        close.textContent = "×";
        close.title = civilizationText("people.close", "Close", "关闭");
        close.setAttribute("aria-label", close.title);
        close.addEventListener("click", closePeoplePanel);
        header.appendChild(title);
        header.appendChild(counts);
        header.appendChild(close);
        panel.appendChild(header);

        const tabs = document.createElement("div");
        tabs.className = "people-status-tabs";
        [["living", "peopleStatusLiving", civilizationText("people.living", "Living", "现存")], ["deceased", "peopleStatusDeceased", civilizationText("people.deceased", "Deceased", "逝者")]].forEach((definition) => {
            const button = document.createElement("button");
            button.type = "button";
            button.id = definition[1];
            button.textContent = definition[2];
            button.addEventListener("click", function () {
                selectedPeopleStatus = definition[0];
                selectedPersonId = null;
                peopleHistoryLimit = C.PEOPLE_HISTORY_PAGE_SIZE;
                refreshPeopleUi();
            });
            tabs.appendChild(button);
        });
        panel.appendChild(tabs);

        const filters = document.createElement("div");
        filters.className = "people-filters";
        const search = document.createElement("input");
        search.id = "peopleSearchInput";
        search.type = "search";
        search.placeholder = civilizationText("people.search", "Search ID, role or activity", "搜索编号、职业或活动");
        search.setAttribute("aria-label", search.placeholder);
        search.addEventListener("input", refreshPeopleUi);
        filters.appendChild(search);
        [["peopleFactionFilter", "Faction", "阵营"], ["peopleSettlementFilter", "Settlement", "聚落"], ["peopleRoleFilter", "Role", "职业"], ["peopleTaskFilter", "Activity", "活动"]].forEach((definition) => {
            const select = document.createElement("select");
            select.id = definition[0];
            select.setAttribute("aria-label", civilizationText("people.filter." + definition[0], definition[1], definition[2]));
            select.addEventListener("change", function () {
                selectedPersonId = null;
                peopleHistoryLimit = C.PEOPLE_HISTORY_PAGE_SIZE;
                refreshPeopleUi();
            });
            filters.appendChild(select);
        });
        panel.appendChild(filters);

        const content = document.createElement("div");
        content.className = "people-observer-content";
        const list = document.createElement("div");
        list.id = "peopleList";
        list.className = "people-list";
        const detail = document.createElement("div");
        detail.id = "peopleDetail";
        detail.className = "people-detail";
        content.appendChild(list);
        content.appendChild(detail);
        panel.appendChild(content);
        document.body.appendChild(panel);
        const scrollSpace = document.createElement("div");
        scrollSpace.id = "peopleObserverScrollSpace";
        scrollSpace.setAttribute("aria-hidden", "true");
        scrollSpace.style.height = "0px";
        scrollSpace.style.pointerEvents = "none";
        document.body.appendChild(scrollSpace);

        const controls = document.getElementById("toolControls");
        if (controls && !document.getElementById("peopleObserverButton")) {
            const button = document.createElement("button");
            button.id = "peopleObserverButton";
            button.className = "controlButton";
            button.textContent = civilizationText("people.button", "People", "人物");
            button.title = civilizationText("people.buttonTitle", "Observe every person's current and past activities", "查看每个人当前与过去的活动");
            button.setAttribute("on", "false");
            button.addEventListener("click", function () { if (peoplePanelOpen) closePeoplePanel(); else openPeoplePanel(); });
            controls.insertBefore(button, document.getElementById("civilizationButton") || document.getElementById("settingsButton") || null);
        }
    }

    elements.civ_banner.onClicked = function (pixel) { openCivilizationPanel(pixel && pixel.factionId); };

    function debugSnapshot() {
        const factions = [];
        let livingPopulation = 0;
        manager.actors.forEach((actor) => { if (actor && !actor.del && !actor.dead) livingPopulation++; });
        manager.factionById.forEach((faction) => {
            const banner = faction.settlements[0];
            factions.push({
                id: faction.id,
                population: faction.population,
                adults: faction.adultPopulation,
                housing: faction.housing,
                stage: banner ? banner.stage : "nomadic",
                eraId: banner ? banner.eraId : null,
                technologies: banner && banner.research ? Object.keys(banner.research.unlocked || {}).filter((techId) => banner.research.unlocked[techId]).length : 0,
                knowledge: banner && banner.research ? banner.research.knowledge : 0,
                stock: banner && banner.stock ? {food: banner.stock.food, wood: banner.stock.wood, stone: banner.stock.stone} : null,
                militaryPower: faction.militaryPower,
                atWar: factionIsAtWar(faction.id)
            });
        });
        return {
            population: livingPopulation,
            factions: factions,
            pendingAttacks: manager.pendingAttacks.length + manager.pendingStructureAttacks.length + manager.pendingRangedImpacts.length,
            averageTickMs: manager.perfSamples ? manager.perfTotal / manager.perfSamples : 0,
            maxTickMs: manager.perfMax
        };
    }

    function societyTick() {
        const started = nowMs();
        if (manager.pendingResourceDrops.length) {
            const drops = manager.pendingResourceDrops.splice(0, Math.min(8, manager.pendingResourceDrops.length));
            drops.forEach((drop) => queueResourceDrops(drop.kind, drop.element, drop.amount, drop.x, drop.y, drop.metadata));
        }
        if (manager.lastFullRebuild < 0 || pixelTicks - manager.lastFullRebuild >= C.FULL_REBUILD_INTERVAL) rebuildIndexes(true);
        resolvePendingAttacks();
        if (pixelTicks % C.CIVILIZATION_INTERVAL === 0) civilizationStep();
        const elapsed = nowMs() - started;
        manager.perfTotal += elapsed;
        manager.perfSamples++;
        manager.perfMax = Math.max(manager.perfMax, elapsed);
        if (manager.perfSamples > 600) {
            manager.perfTotal *= 0.5;
            manager.perfSamples = Math.floor(manager.perfSamples * 0.5);
        }
    }

    root.HumanSociety = Object.freeze({
        config: C,
        registerResource: registerResource,
        registerWeapon: registerWeapon,
        registerEra: registerEra,
        registerTechnology: registerTechnology,
        damageActor: damageActor,
        damageStructure: damageStructure,
        recordIncident: recordIncident,
        atWar: atWar,
        addKnowledge: addKnowledge,
        setResearchFocus: setResearchFocus,
        setTechnologyState: setTechnologyState,
        moveResearchPriority: moveResearchPriority,
        setSettlementResources: setSettlementResources,
        getFactionSnapshot: getFactionSnapshot,
        getFactionChronicle: getFactionChronicle,
        getPeopleSnapshot: getPeopleSnapshot,
        getPersonSnapshot: getPersonSnapshot,
        getPersonHistory: getPersonHistory,
        getWarSnapshot: getWarSnapshot,
        getPeaceMode: getPeaceMode,
        setPeaceMode: setPeaceMode,
        declareWar: declareWar,
        setMapOverlay: setMapOverlay,
        getElementInteractionSettings: typeof getElementInteractionSettings === "function" ? getElementInteractionSettings : null,
        setElementInteractionSettings: typeof setElementInteractionSettings === "function" ? setElementInteractionSettings : null,
        resetElementInteractionSettings: typeof resetElementInteractionSettings === "function" ? resetElementInteractionSettings : null,
        getBuildingById: getBuildingById,
        getBuildingCoreAt: getBuildingCoreAt,
        getTreeAt: getTreeAt,
        fellTreeAt: fellTreeAt,
        buildingVisualAt: buildingVisualAt,
        destroyBuilding: destroyBuilding,
        territoryOwnerAt: territoryOwnerAt,
        openCivilizationPanel: openCivilizationPanel,
        openPeoplePanel: openPeoplePanel,
        closePeoplePanel: closePeoplePanel,
        focusPerson: focusPerson,
        setCommandPerson: setCommandPerson,
        cancelPersonCommand: cancelPersonCommand,
        issuePersonCommandAt: issuePersonCommandAt,
        getPersonCommandState: getPersonCommandState,
        forceReindex: function () { rebuildIndexes(true); },
        getDebugSnapshot: debugSnapshot
    });

    runEveryTick(societyTick);
    if (typeof renderPrePixel === "function") renderPrePixel(renderNormalBuildingSprites);
    if (typeof renderPostPixel === "function") {
        renderPostPixel(renderTerritoryHover);
        renderPostPixel(renderResourceOverlay);
        renderPostPixel(renderRangedProjectiles);
        renderPostPixel(renderTopBuildingSprites);
        renderPostPixel(renderPersonFocus);
        renderPostPixel(renderPersonCommand);
    }
    runAfterReset(resetManager);
    if (typeof document !== "undefined") {
        if (document.readyState === "loading") {
            root.addEventListener("load", installCivilizationUi);
            root.addEventListener("load", installPeopleObserverUi);
            root.addEventListener("load", installPersonCommandInput);
        }
        else {
            installCivilizationUi();
            installPeopleObserverUi();
            installPersonCommandInput();
        }
    }
}(typeof globalThis !== "undefined" ? globalThis : window));
