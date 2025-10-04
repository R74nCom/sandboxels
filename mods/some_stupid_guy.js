runAfterLoad(function() {
    console.log("Mod loaded!")
    console.log("Created by Hitochi")
})

/*
betterElementsManager.js
Requires: mods/betterMenuScreens.js (load before this mod)
What it does:
- Adds "Better Elements Manager" menu (button) via betterMenuScreens.
- Lets you paste JavaScript mod code, name it, install it (saved to localStorage),
  enable/disable, run (hot-reload via eval), edit, export/import.
- Captures console output produced by running a mod and shows it in the GUI.
Install:
1) Make sure mods/betterMenuScreens.js is enabled.
2) Add this mod file to the game's Mod Manager (enter filename or URL and refresh).
3) Open the new menu button and paste/install mods.
Caution: executing arbitrary JS. Don't paste untrusted code.
*/

if (typeof enabledMods !== "undefined" && enabledMods.includes("mods/betterMenuScreens.js")) {
    (function () {
        const STORAGE_KEY = "bem_v1_mods";
        const SCRIPT_PREFIX = "bem_injected_"; // used for script element ids (not relied on for unloading)
        // load saved mods
        let mods = {};
        try { mods = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { mods = {}; }

        function saveMods() {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(mods)); } catch (e) { console.error("BEM: save failed", e); }
        }

        // capture console for a single run
        function captureConsole(fn) {
            const orig = { log: console.log, warn: console.warn, error: console.error };
            const buffer = [];
            console.log = function () { buffer.push({ type: "log", text: Array.from(arguments).map(a => String(a)).join(" ") }); orig.log.apply(console, arguments); };
            console.warn = function () { buffer.push({ type: "warn", text: Array.from(arguments).map(a => String(a)).join(" ") }); orig.warn.apply(console, arguments); };
            console.error = function () { buffer.push({ type: "error", text: Array.from(arguments).map(a => String(a)).join(" ") }); orig.error.apply(console, arguments); };
            try { fn(); } catch (e) { buffer.push({ type: "error", text: e && (e.stack || e.toString()) }); }
            console.log = orig.log; console.warn = orig.warn; console.error = orig.error;
            return buffer;
        }

        function runMod(name) {
            const md = mods[name];
            if (!md) return;
            // run with new Function -> runs in global scope (similar to how mods expect)
            const logs = captureConsole(() => {
                const runner = new Function(md.code);
                runner();
            });
            md.lastRunAt = Date.now();
            md.lastLogs = logs;
            saveMods();
            return logs;
        }

        function installMod(name, code, enableImmediately) {
            if (!name) name = "mod_" + Date.now();
            // sanitize name for storage key use (but keep original)
            const key = name.replace(/\s+/g, "_");
            mods[key] = {
                name: name,
                code: code,
                enabled: !!enableImmediately,
                createdAt: Date.now(),
                lastRunAt: null,
                lastLogs: []
            };
            saveMods();
            if (enableImmediately) runMod(key);
            return key;
        }

        function removeMod(key) {
            delete mods[key];
            saveMods();
        }

        function toggleEnable(key) {
            if (!mods[key]) return;
            mods[key].enabled = !mods[key].enabled;
            saveMods();
            if (mods[key].enabled) runMod(key);
        }

        function exportMod(key) {
            if (!mods[key]) return;
            const blob = new Blob([mods[key].code], { type: "text/javascript" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = (mods[key].name || key) + ".js";
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 2000);
        }

        function importModFromText(code, name, enabled) {
            return installMod(name || ("imported_" + Date.now()), code, enabled);
        }

        // Create the GUI using the same MenuScreen API pattern other GUI mods use
        function bemLoader() {
            // helpers
            const br = () => document.createElement("br");
            const createDiv = (styles) => {
                const d = document.createElement("div");
                if (styles) Object.assign(d.style, styles);
                return d;
            };
            const span = (txt) => { const s = document.createElement("span"); s.innerText = txt; return s; };
            const input = (type = "text") => { const i = document.createElement("input"); i.type = type; return i; };
            const btn = (label) => { const b = document.createElement("input"); b.type = "button"; b.value = label; return b; };

            // outer container: two-column
            const container = createDiv({ display: "flex", gap: "12px", height: "100%" });

            // LEFT: editor
            const left = createDiv({ flex: "1 1 60%", display: "flex", flexDirection: "column" });
            const nameRow = createDiv({ display: "flex", gap: "8px", alignItems: "center" });
            const nameInput = input("text");
            nameInput.placeholder = "mod_name.js";
            nameInput.style.minWidth = "220px";
            const enableBox = input("checkbox");
            const enableLabel = span("Enable immediately");
            nameRow.appendChild(span("Name: "));
            nameRow.appendChild(nameInput);
            nameRow.appendChild(enableBox);
            nameRow.appendChild(enableLabel);

            const editor = document.createElement("textarea");
            editor.style.flex = "1 1 auto";
            editor.style.width = "100%";
            editor.style.fontFamily = "monospace";
            editor.style.fontSize = "12px";
            editor.placeholder = "// Paste mod JS here (elements definitions, etc.)";

            const buttonsRow = createDiv({ display: "flex", gap: "8px", marginTop: "8px" });
            const installBtn = btn("Install / Update");
            const runBtn = btn("Run Now");
            const clearEditorBtn = btn("Clear Editor");
            const importFileBtn = btn("Import .js");
            const fileInput = input("file");
            fileInput.accept = ".js,application/javascript";
            fileInput.style.display = "none";
            buttonsRow.appendChild(installBtn);
            buttonsRow.appendChild(runBtn);
            buttonsRow.appendChild(clearEditorBtn);
            buttonsRow.appendChild(importFileBtn);
            buttonsRow.appendChild(fileInput);

            left.appendChild(nameRow);
            left.appendChild(editor);
            left.appendChild(buttonsRow);

            // RIGHT: installed mods + logs
            const right = createDiv({ flex: "0 0 360px", display: "flex", flexDirection: "column" });
            const modsTitle = span("Installed Mods");
            modsTitle.style.fontWeight = "bold";
            modsTitle.style.marginBottom = "6px";
            const modsList = createDiv({ flex: "1", overflow: "auto", border: "1px solid #444", padding: "6px" });

            const logsTitle = span("Logs / Console");
            logsTitle.style.fontWeight = "bold";
            logsTitle.style.marginTop = "8px";
            const logsArea = document.createElement("textarea");
            logsArea.style.width = "100%";
            logsArea.style.height = "160px";
            logsArea.readOnly = true;
            logsArea.style.fontFamily = "monospace";
            logsArea.style.fontSize = "12px";

            // run all enabled
            const runAllBtn = btn("Run all enabled");
            runAllBtn.style.marginTop = "6px";

            right.appendChild(modsTitle);
            right.appendChild(modsList);
            right.appendChild(runAllBtn);
            right.appendChild(br());
            right.appendChild(logsTitle);
            right.appendChild(logsArea);

            container.appendChild(left);
            container.appendChild(right);

            // UI actions
            function renderModsList() {
                modsList.innerHTML = "";
                const keys = Object.keys(mods).sort((a, b) => (mods[b].createdAt || 0) - (mods[a].createdAt || 0));
                if (!keys.length) {
                    const none = span("No mods installed (yet). Paste code on the left and click Install.");
                    modsList.appendChild(none);
                    return;
                }
                for (const key of keys) {
                    const m = mods[key];
                    const item = createDiv({ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" });
                    const title = span(m.name || key);
                    title.style.flex = "1";
                    title.style.cursor = "pointer";
                    title.title = "Click to load code into editor for editing";
                    title.onclick = () => {
                        nameInput.value = m.name || key;
                        editor.value = m.code || "";
                        enableBox.checked = !!m.enabled;
                    };
                    const enabledBtn = btn(m.enabled ? "Enabled" : "Disabled");
                    enabledBtn.onclick = () => { toggleEnable(key); renderModsList(); };
                    enabledBtn.style.width = "80px";
                    const runNow = btn("Run");
                    runNow.onclick = () => {
                        const logs = runMod(key) || [];
                        logsArea.value = formatLogs(logs);
                    };
                    runNow.style.width = "60px";
                    const editBtn = btn("Edit");
                    editBtn.onclick = () => {
                        nameInput.value = m.name || key;
                        editor.value = m.code || "";
                        enableBox.checked = !!m.enabled;
                    };
                    const exportBtn = btn("Export");
                    exportBtn.onclick = () => exportMod(key);
                    const removeBtn = btn("Remove");
                    removeBtn.onclick = () => {
                        if (confirm("Remove '" + (m.name || key) + "' from manager?")) {
                            removeMod(key);
                            renderModsList();
                        }
                    };

                    item.appendChild(title);
                    item.appendChild(enabledBtn);
                    item.appendChild(runNow);
                    item.appendChild(editBtn);
                    item.appendChild(exportBtn);
                    item.appendChild(removeBtn);
                    modsList.appendChild(item);
                }
            }

            function formatLogs(logs) {
                if (!logs || !logs.length) return "";
                return logs.map(l => `[${l.type.toUpperCase()}] ${l.text}`).join("\n");
            }

            // Handlers for left buttons
            installBtn.onclick = () => {
                const proposedName = (nameInput.value || "").trim();
                const code = editor.value;
                if (!code || !code.trim()) {
                    alert("Editor is empty.");
                    return;
                }
                const newKey = installMod(proposedName, code, enableBox.checked);
                renderModsList();
                logsArea.value = "Installed: " + (mods[newKey].name || newKey);
            };
            runBtn.onclick = () => {
                // try run from editor (ad-hoc)
                const code = editor.value;
                if (!code || !code.trim()) { alert("Editor is empty."); return; }
                const logs = captureConsole(() => { new Function(code)(); });
                logsArea.value = formatLogs(logs);
            };
            clearEditorBtn.onclick = () => { if (confirm("Clear editor?")) editor.value = ""; };
            importFileBtn.onclick = () => fileInput.click();
            fileInput.onchange = (ev) => {
                const f = ev.target.files && ev.target.files[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = () => {
                    editor.value = reader.result || "";
                };
                reader.readAsText(f);
                fileInput.value = "";
            };
            runAllBtn.onclick = () => {
                const keys = Object.keys(mods);
                let allLogs = [];
                for (const k of keys) {
                    if (mods[k].enabled) {
                        const l = runMod(k);
                        if (l && l.length) allLogs = allLogs.concat([{ type: "info", text: "=== LOGS FROM " + (mods[k].name || k) + " ===" }], l);
                    }
                }
                logsArea.value = formatLogs(allLogs);
            };

            // initial render
            renderModsList();

            // expose a small helper UI to show last logs for an installed mod when clicked in list
            modsList.addEventListener("click", (ev) => {
                // handled by title click earlier for editing; also try to find the nearest title span
                // nothing extra here
            });

            // Build a MenuScreen (same API used by other GUI mods)
            new MenuScreen()
                .setTitle("Better Elements Manager")
                .setParentDivId("bemParent")
                .setInnerDivId("bemInner")
                .addNode([container])
                .build();

            // optional: when the menu is opened multiple times the loader will recreate the UI; that's consistent with other mods
        }

        // Register on menuScreens so betterMenuScreens shows a button
        menuScreens.betterElementsManager = {
            name: "Better Elements Manager",
            parentDiv: "bemParent",
            buttonDescription: "Paste JS mods & install them (localStorage)",
            show: true,
            loader: bemLoader
        };

        // Save on unload (defensive)
        window.addEventListener("beforeunload", saveMods);
    })();
} else {
    console.error("betterElementsManager.js: requires mods/betterMenuScreens.js to be enabled first.");
}
