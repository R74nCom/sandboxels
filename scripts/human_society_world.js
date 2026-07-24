(function(root, factory) {
    if (typeof module === "object" && module.exports) module.exports = factory();
    else root.HumanSocietyWorld = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function() {
    "use strict";

    const TERRITORY_HALF_WIDTH = 11;
    const BUILDING_SPRITE_WIDTH = 3;
    const BUILDING_SPRITE_HEIGHT = 3;
    const BUILDING_SPRITE_GAP = 2;
    const MAX_CHRONICLE_EVENTS = 2000;
    const ERA_POPULATION_TARGETS = [6, 8, 12, 16, 20, 24];
    const ERA_ROLE_WEIGHTS = [
        {food: 2, wood: 2, builder: 1, flex: 1},
        {food: 2, wood: 2, miner: 2, builder: 1, artisan: 1},
        {food: 4, wood: 2, miner: 1, builder: 1, forester: 1, artisan: 1, military: 1, flex: 1},
        {food: 4, wood: 2, miner: 3, builder: 2, forester: 1, artisan: 1, industry: 1, scholar: 1, military: 1},
        {food: 5, wood: 2, miner: 4, builder: 2, forester: 1, artisan: 1, industry: 2, scholar: 1, military: 2},
        {food: 6, wood: 2, miner: 4, builder: 2, forester: 1, artisan_trade: 2, industry: 2, scholar: 2, military: 3}
    ];

    function number(value, fallback) {
        return Number.isFinite(Number(value)) ? Number(value) : fallback;
    }

    function buildingSpriteRect(x, y) {
        x = Math.round(number(x, 0));
        y = Math.round(number(y, 0));
        return {left: x - 1, right: x + 1, top: y - 2, bottom: y, width: 3, height: 3, coreX: x, coreY: y};
    }

    function rectGap(a, b) {
        const horizontal = a.right < b.left ? b.left - a.right - 1 : (b.right < a.left ? a.left - b.right - 1 : -1);
        const vertical = a.bottom < b.top ? b.top - a.bottom - 1 : (b.bottom < a.top ? a.top - b.bottom - 1 : -1);
        return {horizontal, vertical};
    }

    function buildingSpacingValid(a, b, gap) {
        const first = a && a.left !== undefined ? a : buildingSpriteRect(a.x, a.y);
        const second = b && b.left !== undefined ? b : buildingSpriteRect(b.x, b.y);
        const required = Math.max(0, Math.floor(number(gap, BUILDING_SPRITE_GAP)));
        const spacing = rectGap(first, second);
        return spacing.horizontal >= required || spacing.vertical >= required;
    }

    function compareClaimOrder(a, b) {
        const tick = number(a.claimTick, 0) - number(b.claimTick, 0);
        if (tick) return tick;
        const order = number(a.claimOrder, 0) - number(b.claimOrder, 0);
        if (order) return order;
        return String(a.claimId).localeCompare(String(b.claimId));
    }

    class TerritoryIndex {
        constructor(width, halfWidth) {
            this.width = Math.max(1, Math.floor(number(width, 1)));
            this.halfWidth = Math.max(0, Math.floor(number(halfWidth, TERRITORY_HALF_WIDTH)));
            this.claims = new Map();
            this.columns = new Array(this.width);
            this.nextOrder = 1;
        }

        resize(width) {
            this.width = Math.max(1, Math.floor(number(width, 1)));
            this.columns = new Array(this.width);
            this.recompute();
        }

        span(anchorX) {
            const x = Math.round(number(anchorX, 0));
            return {minX: Math.max(0, x - this.halfWidth), maxX: Math.min(this.width - 1, x + this.halfWidth)};
        }

        reserve(input) {
            const source = input || {};
            const claimId = String(source.claimId || ("claim:" + this.nextOrder));
            if (this.claims.has(claimId)) return this.claims.get(claimId);
            const span = this.span(source.anchorX);
            const claim = {
                claimId,
                buildingId: source.buildingId === undefined ? null : source.buildingId,
                factionId: number(source.factionId, 0),
                settlementId: source.settlementId === undefined ? null : source.settlementId,
                anchorX: Math.round(number(source.anchorX, 0)),
                minX: span.minX,
                maxX: span.maxX,
                claimTick: Math.max(0, Math.floor(number(source.claimTick, 0))),
                claimOrder: Math.max(1, Math.floor(number(source.claimOrder, this.nextOrder)))
            };
            this.nextOrder = Math.max(this.nextOrder, claim.claimOrder + 1);
            this.claims.set(claimId, claim);
            this.recompute();
            return claim;
        }

        release(claimId) {
            const removed = this.claims.delete(String(claimId));
            if (removed) this.recompute();
            return removed;
        }

        recompute() {
            this.columns = new Array(this.width);
            const ordered = Array.from(this.claims.values()).sort(compareClaimOrder);
            for (let i = 0; i < ordered.length; i++) {
                const claim = ordered[i];
                const span = this.span(claim.anchorX);
                claim.minX = span.minX;
                claim.maxX = span.maxX;
                for (let x = span.minX; x <= span.maxX; x++) {
                    const current = this.columns[x];
                    if (!current) {
                        this.columns[x] = {factionId: claim.factionId, claimIds: new Set([claim.claimId]), firstClaimId: claim.claimId};
                    }
                    else if (current.factionId === claim.factionId) current.claimIds.add(claim.claimId);
                }
            }
            return this;
        }

        rebuild(claims) {
            this.claims.clear();
            this.nextOrder = 1;
            (claims || []).slice().sort(compareClaimOrder).forEach((claim) => this.reserve(claim));
            return this;
        }

        ownerAt(x) {
            x = Math.round(number(x, -1));
            if (x < 0 || x >= this.width) return null;
            return this.columns[x] ? this.columns[x].factionId : null;
        }

        owns(factionId, x) {
            return this.ownerAt(x) === number(factionId, -1);
        }

        wonColumns(claimId) {
            const id = String(claimId);
            const result = [];
            for (let x = 0; x < this.columns.length; x++) {
                const column = this.columns[x];
                if (column && column.claimIds.has(id)) result.push(x);
            }
            return result;
        }

        serialize() {
            return Array.from(this.claims.values()).sort(compareClaimOrder).map((claim) => Object.assign({}, claim));
        }
    }

    class ResourceReservations {
        constructor() { this.byNode = new Map(); }
        key(node) { return node && node.key || (node && node.element ? node.element + "@" + node.x + "," + node.y : null); }
        reserve(node, actorId) {
            const key = this.key(node);
            if (!key) return false;
            const current = this.byNode.get(key);
            if (current !== undefined && current !== actorId) return false;
            this.byNode.set(key, actorId);
            return true;
        }
        release(node, actorId) {
            const key = typeof node === "string" ? node : this.key(node);
            if (!key || !this.byNode.has(key)) return false;
            if (actorId !== undefined && this.byNode.get(key) !== actorId) return false;
            return this.byNode.delete(key);
        }
        reservedBy(node) { const key = typeof node === "string" ? node : this.key(node); return key ? this.byNode.get(key) : undefined; }
        clearActor(actorId) { for (const [key, value] of this.byNode) if (value === actorId) this.byNode.delete(key); }
        clear() { this.byNode.clear(); }
    }

    function resourcePriority(node, factionId, territory, origin) {
        const owner = territory && typeof territory.ownerAt === "function" ? territory.ownerAt(node.x) : null;
        if (owner !== null && owner !== undefined && owner !== factionId) return null;
        const zone = owner === factionId ? 0 : 1;
        const dx = number(node.x, 0) - number(origin && origin.x, 0);
        const dy = number(node.y, 0) - number(origin && origin.y, 0);
        return [zone, dx * dx + dy * dy, number(node.y, 0), number(node.x, 0)];
    }

    function comparePriority(a, b) {
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            const difference = number(a[i], 0) - number(b[i], 0);
            if (difference) return difference;
        }
        return 0;
    }

    function chooseResource(nodes, factionId, territory, origin, reservations, actorId) {
        const candidates = [];
        (nodes || []).forEach((node) => {
            const priority = resourcePriority(node, factionId, territory, origin);
            if (!priority) return;
            if (reservations && reservations.reservedBy(node) !== undefined && reservations.reservedBy(node) !== actorId) return;
            candidates.push({node, priority});
        });
        candidates.sort((a, b) => comparePriority(a.priority, b.priority));
        return candidates.length ? candidates[0].node : null;
    }

    function ensureBackpack(actor, capacity) {
        if (!actor.carry || typeof actor.carry !== "object" || Array.isArray(actor.carry)) actor.carry = {};
        actor.carryCapacity = Math.max(0, Math.floor(number(capacity, actor.carryCapacity === undefined ? 4 : actor.carryCapacity)));
        return actor.carry;
    }

    function carriedTotal(actor) {
        const carry = actor && actor.carry && typeof actor.carry === "object" ? actor.carry : {};
        return Object.keys(carry).reduce((total, key) => total + Math.max(0, number(carry[key], 0)), 0);
    }

    function addCarry(actor, kind, amount, capacity) {
        const carry = ensureBackpack(actor, capacity);
        const free = Math.max(0, actor.carryCapacity - carriedTotal(actor));
        const accepted = Math.min(free, Math.max(0, number(amount, 0)));
        if (accepted) carry[kind] = Math.max(0, number(carry[kind], 0)) + accepted;
        return {accepted, overflow: Math.max(0, number(amount, 0) - accepted), total: carriedTotal(actor)};
    }

    function removeCarry(actor, kind, amount) {
        const carry = ensureBackpack(actor);
        const removed = Math.min(Math.max(0, number(carry[kind], 0)), Math.max(0, number(amount, 0)));
        carry[kind] = Math.max(0, number(carry[kind], 0) - removed);
        if (!carry[kind]) delete carry[kind];
        return removed;
    }

    function scaledRoleQuotas(adultCount, eraIndex, options) {
        const adults = Math.max(0, Math.floor(number(adultCount, 0)));
        const index = Math.max(0, Math.min(ERA_ROLE_WEIGHTS.length - 1, Math.floor(number(eraIndex, 0))));
        const weights = Object.assign({}, ERA_ROLE_WEIGHTS[index]);
        const opts = options || {};
        if (opts.lowFood && adults) weights.food = Math.max(number(weights.food, 0), Math.ceil(adults / 2));
        if (opts.housingUrgent && adults > 1) weights.builder = Math.max(1, number(weights.builder, 0));
        const roles = Object.keys(weights);
        const totalWeight = roles.reduce((sum, role) => sum + Math.max(0, number(weights[role], 0)), 0) || 1;
        const quotas = {};
        const remainders = [];
        let assigned = 0;
        roles.forEach((role) => {
            const exact = adults * Math.max(0, number(weights[role], 0)) / totalWeight;
            quotas[role] = Math.floor(exact);
            assigned += quotas[role];
            remainders.push({role, remainder: exact - quotas[role]});
        });
        remainders.sort((a, b) => b.remainder - a.remainder || a.role.localeCompare(b.role));
        for (let i = 0; assigned < adults && remainders.length; i++, assigned++) quotas[remainders[i % remainders.length].role]++;
        if (opts.lowFood && adults) {
            const desiredFood = Math.ceil(adults / 2);
            while ((quotas.food || 0) < desiredFood) {
                const donor = Object.keys(quotas).filter((role) => role !== "food" && quotas[role] > 0).sort((a, b) => quotas[b] - quotas[a])[0];
                if (!donor) break;
                quotas[donor]--;
                quotas.food = (quotas.food || 0) + 1;
            }
        }
        return quotas;
    }

    function populationTarget(eraIndex) {
        const index = Math.max(0, Math.min(ERA_POPULATION_TARGETS.length - 1, Math.floor(number(eraIndex, 0))));
        return ERA_POPULATION_TARGETS[index];
    }

    function splitAttackersAcrossFronts(attackerIds, enemyFactionIds) {
        const fronts = {};
        const enemies = (enemyFactionIds || []).slice().map(String).sort();
        enemies.forEach((id) => { fronts[id] = []; });
        if (!enemies.length) return fronts;
        (attackerIds || []).slice().sort((a, b) => number(a, 0) - number(b, 0)).forEach((actorId, index) => fronts[enemies[index % enemies.length]].push(actorId));
        return fronts;
    }

    function armyAssignment(adultIds, standingQuota, atWar) {
        const adults = (adultIds || []).slice().sort((a, b) => number(a, 0) - number(b, 0));
        if (!atWar) return {attackers: [], defenders: adults.slice(0, Math.min(adults.length, Math.max(0, standingQuota))), civilians: adults.slice(Math.min(adults.length, Math.max(0, standingQuota)))};
        const target = Math.min(adults.length, Math.max(2, Math.max(0, standingQuota) * 2));
        const soldiers = adults.slice(0, target);
        const attackerCount = soldiers.length ? Math.max(1, Math.ceil(soldiers.length / 2)) : 0;
        return {attackers: soldiers.slice(0, attackerCount), defenders: soldiers.slice(attackerCount), civilians: adults.slice(target)};
    }

    function updateImbalance(state, strongerPower, weakerPower, tick, requiredTicks) {
        const next = Object.assign({}, state || {});
        const threshold = Math.max(1, Math.floor(number(requiredTicks, 180)));
        const strong = Math.max(0, number(strongerPower, 0));
        const weak = Math.max(0, number(weakerPower, 0));
        if (strong >= Math.max(0.0001, weak) * 3) {
            if (!Number.isFinite(next.sinceTick)) next.sinceTick = tick;
            next.ready = tick - next.sinceTick >= threshold;
        }
        else {
            delete next.sinceTick;
            next.ready = false;
        }
        return next;
    }

    function realTimestamp(date) {
        const d = date instanceof Date ? date : new Date(date === undefined ? Date.now() : date);
        const pad = (value) => String(value).padStart(2, "0");
        return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
    }

    function appendChronicle(log, event, limit) {
        const target = Array.isArray(log) ? log : [];
        const entry = Object.assign({timestamp: realTimestamp(), type: "event", message: ""}, event || {});
        target.push(entry);
        const maximum = Math.max(1, Math.floor(number(limit, MAX_CHRONICLE_EVENTS)));
        if (target.length > maximum) target.splice(0, target.length - maximum);
        return entry;
    }

    return Object.freeze({
        TERRITORY_HALF_WIDTH,
        BUILDING_SPRITE_WIDTH,
        BUILDING_SPRITE_HEIGHT,
        BUILDING_SPRITE_GAP,
        MAX_CHRONICLE_EVENTS,
        ERA_POPULATION_TARGETS: ERA_POPULATION_TARGETS.slice(),
        ERA_ROLE_WEIGHTS: ERA_ROLE_WEIGHTS.map((weights) => Object.assign({}, weights)),
        TerritoryIndex,
        ResourceReservations,
        buildingSpriteRect,
        buildingSpacingValid,
        resourcePriority,
        chooseResource,
        ensureBackpack,
        carriedTotal,
        addCarry,
        removeCarry,
        scaledRoleQuotas,
        populationTarget,
        splitAttackersAcrossFronts,
        armyAssignment,
        updateImbalance,
        realTimestamp,
        appendChronicle
    });
});
