# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository context

This is a buildless browser game based on Sandboxels 1.13.2. The active working tree adds an in-progress human-society simulation and corresponding engine changes. Read `README_AGENT_HANDOFF.md` before changing the simulation; it is the authoritative description of current gameplay rules, compatibility constraints, acceptance baseline, and the uncommitted workspace that must be preserved.

The repository no longer accepts upstream contributions or mod submissions (`.github/CONTRIBUTING.md`). Translation contributions for upstream Sandboxels are handled through Crowdin (`lang/README.txt`).

## Running and validation

There is no project-level `package.json`, build step, linter, formatter, or CI configuration. Do not invent npm commands.

Serve the repository over HTTP; opening `index.html` with `file://` is insufficient:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8000/>.

Run the complete automated validation sequence from the repository root:

```bash
node --check scripts/human_society.js
git diff --check
node --test \
  tests/human_society_core.test.js \
  tests/human_society_world.test.js \
  tests/human_society_tech_data.test.js \
  tests/human_society_integration.test.js \
  tests/engine_overlap_speed.test.js
```

The documented baseline is 97 passing tests. Run one test file with:

```bash
node --test tests/human_society_core.test.js
```

Run one named test with:

```bash
node --test --test-name-pattern='chooseFaction selects the nearest faction within the join radius' tests/human_society_core.test.js
```

Changes to UI, rendering, save/load, overlap, movement, population, pathfinding, war, or resource behavior also require browser testing. Check both console errors and uncaught `pageerror` events. For emergent simulation changes, use multiple settlements and 5x speed long enough to observe the affected behavior.

## Architecture

### Main Sandboxels engine

`index.html` is both the application entry point and the monolithic upstream engine. It contains:

- built-in `elements` and `behaviors` registries;
- mutable global simulation state such as `pixelMap`, `currentPixels`, `currentRelations`, `pixelTicks`, `settings`, and UI state;
- pixel creation, movement, collision, temperature, reactions, relations, save/load, mod loading, localization, input, and canvas rendering;
- the static page markup and most UI controls.

This is not an ES-module application. Core code, enabled mods, and society scripts share browser globals.

The simulation and renderer are separate loops:

```text
setInterval(tick, 1000 / tps)
  -> tickPixels()
     -> element.tick(pixel)
     -> runPerPixel callbacks
     -> declarative element behavior via pixelTick(pixel)
  -> runEveryTick callbacks

requestAnimationFrame(drawLayers)
  -> drawPixels()
  -> render hook lists and canvas layers
```

At startup, `window.onload` runs extension callbacks, normalizes and autogenerates element definitions, initializes the canvas/settings, generates category and element buttons, and attaches input handlers. `runAfterLoad()` callbacks execute near the beginning of this initializer, before element finalization and generated controls. Prefer the provided hook registries (`runAfterLoad`, `runEveryTick`, `runPerPixel`, render hooks, `runAfterReset`, etc.) over replacing lifecycle functions.

Elements are registry entries that combine data and callbacks. A pixel instance copies the element's configured properties. An element may use a custom `tick`, a declarative behavior matrix, or both; when both exist, `tick` runs first. Mods are dynamically injected scripts that mutate the same globals and may register elements or hooks; they are not isolated plugins.

Persistence spans `localStorage` settings, `enabledMods`, and world saves. World serialization includes pixel metadata, relations, selected settings, mods, and simulation state. Loading a save can install missing mods and reload the page before resuming, so save compatibility must be considered when changing pixel properties or global settings.

Localization uses flat JSON dictionaries under `lang/`. `langKey()` supplies runtime strings, element names are translated during element finalization, and GUI strings are applied after body parsing.

`lite.html` is a separate reduced implementation, not an entry point into the main engine. `archive/` contains historical snapshots.

### Human-society subsystem

The browser load order at the end of `index.html` is fixed:

```text
scripts/human_society_core.js
scripts/human_society_tech_data.js
scripts/human_society_world.js
scripts/human_society.js
```

Do not move `human_society.js` earlier; it consumes the three globals created by the preceding scripts.

The dependency direction is:

```text
pure rules/data/world helpers
        -> browser adapter and runtime
        -> Sandboxels global engine and hook APIs
```

- `scripts/human_society_core.js`: engine-independent rules exported as CommonJS for tests and `HumanSocietyCore` in browsers.
- `scripts/human_society_tech_data.js`: JSON-compatible era, technology, prerequisite, effect, fuel, recipe, and ranged-weapon declarations. Keep executable runtime behavior out of this file.
- `scripts/human_society_world.js`: testable world structures and helpers such as territory columns, 3x3 building geometry, resource reservations, inventory/population calculations, war helpers, and real-time chronicle timestamps.
- `scripts/human_society.js`: browser adapter and runtime integration. It registers civilization elements, maintains derived indexes and queues, drives actor AI and civilization updates, renders overlays, builds the civilization/people UI, hooks reset/load behavior, and exports the frozen `window.HumanSociety` API.

The society manager does not own a separate authoritative world model. Durable identity and state live primarily in pixel metadata so they survive save/load; `human_society.js` periodically rebuilds actor, settlement, faction, structure, resource, tree, relation, and territory indexes from those pixels. Preserve metadata and reindexing behavior when changing runtime data structures. The public API listed in `README_AGENT_HANDOFF.md` is also used for debugging and manual acceptance checks; the final `Object.freeze` export in `human_society.js` is the definitive interface.

Prefer implementing new pure rules in `human_society_core.js`, declarative technology content in `human_society_tech_data.js`, and testable spatial/data structures in `human_society_world.js`. Keep `human_society.js` focused on browser/engine adaptation rather than adding more independently testable logic to the already large adapter.

### Dual spatial storage

The active engine extends the normal one-pixel-per-coordinate model:

```text
pixelMap[x][y]  = primary/base pixel
auxiliary overlap storage = zero or more additional pixels at the coordinate
currentPixels   = iteration set spanning both layers
```

Allowed overlaps, building cores, and other auxiliary objects may not appear in `pixelMap`. Coordinate queries, collision checks, deletion, replacement, movement, save/load, and rendering must use the unified overlap-aware helpers (for example `getPixelsAt`) and keep both storage layers plus `currentPixels` synchronized. `tests/engine_overlap_speed.test.js` extracts selected functions from `index.html` into a VM harness, so renaming or restructuring those functions may require coordinated test updates.

## Non-obvious invariants

These invariants are covered in more detail by `README_AGENT_HANDOFF.md` and focused tests:

- A human is a multipart head/body relation. Move it atomically through relation-level movement with rollback; never move the two pixels independently.
- A civilization building is one 1x1 logical core. Its 3x3 appearance is canvas rendering, not nine world pixels. The core is the bottom-center sprite cell.
- Buildings claim horizontal columns (`x - 11` through `x + 11`) with vertically infinite territory; do not reinterpret territory as a local rectangle or radius.
- New trees carry identity across trunk/branch/leaf pixels. Whole-tree operations must use identity rather than treating every adjacent matching canopy as one tree.
- Technology completion is irreversible. Forced and natural completion must share unlock/effect/era-advancement logic.
- Wars start only through sustained nonrenewable-resource exhaustion or explicit player action. Retaliation and hostility bookkeeping are not declarations of war.
- Chronicles use real local timestamps; lifespan, AI, research, population, and war use simulation ticks.
- Compatibility fields such as `civ_child`, birth cooldowns, housing/global population caps, and tunnel era gates do not describe current gameplay. Do not restore obsolete behavior based only on their presence.
- Civilization UI localization currently mixes language-table keys and embedded fallback text. Reuse `civilizationText()` for additions, but do not combine unrelated feature work with a wholesale localization rewrite.

## Test layout

The automated suite uses Node's built-in `node:test` and `node:assert`; there is no test-runner configuration.

- `tests/human_society_core.test.js`: direct CommonJS tests of pure rules.
- `tests/human_society_world.test.js`: territory, building geometry, resource selection, inventory, population, and war helper tests.
- `tests/human_society_tech_data.test.js`: schema and invariant checks for eras, technology graph, prerequisites, materials, fuels, and recipes.
- `tests/human_society_integration.test.js`: evaluates the browser adapter in `node:vm` with a minimal mocked Sandboxels global environment.
- `tests/engine_overlap_speed.test.js`: source-level VM tests for modified monolithic engine functions, overlap, relation movement, save/load, speed controls, and tree growth.

When behavior changes, begin with the closest focused tests, then run the full validation sequence. Update `README_AGENT_HANDOFF.md` when current rules, test counts, acceptance behavior, or known risks change so future work does not have to infer design from the diff.
