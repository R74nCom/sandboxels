//extrasaveslots
        function showSaves() {
            var savesParent = document.getElementById("savesParent");
            var saveSlotList = document.getElementById("saveSlotList");
            saveSlotList.innerHTML = "";
            // loop 12 times, checking if local storage SandboxelsSaves/x exists
            // <span class="saveSlot">Slot 1 <span disabled="true">Clear</span> <span disabled="true">Load</span> <span onclick="saveSlot(2)">Save</span></span>
            // <span class="saveSlot">Unnamed <span onclick="clearSlot(2)">Clear</span> <span onclick="loadSlot(2)">Load</span> <span onclick="saveSlot(2)">Save</span></span>
            for (var i = 1; i < 101; i++) {
                var save = localStorage.getItem("SandboxelsSaves/"+i);
                var name = "Slot "+i;
                if (save) {
                    name = JSON.parse(save).meta.name || "Unnamed";
                    name = name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
                    // truncate
                    if (name.length > 16) { name = name.substring(0,16)+"..."; }
                    saveSlotList.innerHTML += "<span id='saveSlot"+i+"' data-name='"+name+"' class='saveSlot'><span class='saveSlotName'>"+name+"</span> <span onclick='clearSlot("+i+")' class='saveOption'>Clear</span> <span onclick='loadSlot("+i+")' class='saveOption'>Load</span> <span onclick='saveSlot("+i+")' class='saveOption'>Save</span></span>";
                }
                else {
                    saveSlotList.innerHTML += "<span id='saveSlot"+i+"' data-name='"+name+"' class='saveSlot'><span class='saveSlotName'>"+name+"</span> <span disabled='true' class='saveOption'>Clear</span> <span disabled='true' class='saveOption'>Load</span> <span onclick='saveSlot("+i+")' class='saveOption'>Save</span></span>";
                }
            }
            savesParent.style.display = "block";
            showingMenu = "saves";
        }
        function saveSlot(i) {
            savingState = {slot:i};
            document.getElementById("saveName").value = document.getElementById("saveSlot"+i).getAttribute("data-name") || "Slot "+i;
            showSavePrompt();
        }
        function loadSlot(i) {
            var save = localStorage.getItem("SandboxelsSaves/"+i);
            if (save) {
                loadSave(JSON.parse(save));
                closeMenu();
            }
        }
        function clearSlot(i) {
            if (!confirm("Are you sure you want to erase this save slot?")) { return }
            localStorage.removeItem("SandboxelsSaves/"+i);
            showSaves();
        }
        function confirmSave() {
            if (!savingState) { return }
            var saveName = document.getElementById("saveName").value || "Unnamed";
            var saveTemp = document.getElementById("saveTemp").getAttribute("state") === "1";
            var saveColors = document.getElementById("saveColors").getAttribute("state") === "1";
            var saveMods = document.getElementById("saveMods").getAttribute("state") === "1";
            var saveSettings = document.getElementById("saveSettings").getAttribute("state") === "1";
            var saveRaw = document.getElementById("saveRaw").getAttribute("state") === "1";
            var saveAuthor = document.getElementById("saveAuthor").value || "";
            if (saveAuthor && !currentSaveData) {
                setSetting("authorName",saveAuthor)
            }
            var saveDesc = document.getElementById("saveDesc").value || "";
            var config = {name:saveName,temp:saveTemp,mods:saveMods,settings:saveSettings,raw:saveRaw,keep:[],author:saveAuthor,desc:saveDesc};
            if (saveTemp) { config.keep.push("temp") }
            if (saveColors) { config.keep.push("color") }
            if (savingState.slot) {
                // save stringified generateSave() to localStorage SandboxelsSaves/i
                localStorage.setItem("SandboxelsSaves/"+savingState.slot, JSON.stringify(generateSave(undefined,config)));
                closeMenu();
                showSaves();
            }
            else {
                // save to <name>.sbxls
                var save = generateSave(undefined,config);
                var blob = new Blob([JSON.stringify(save)], {type: "application/json"});
                var url = URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                a.download = saveName+".sbxls";
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
                closeMenu();
            }
        }
        function saveToFile() {
            savingState = {slot:null};
            document.getElementById("saveName").value = "";
            document.getElementById("saveAuthor").value = "";
            document.getElementById("saveDesc").value = "";
            showSavePrompt();
        }
        function loadFromFile() {
            var input = document.createElement("input");
            input.type = "file";
            // input.accept = ".sbxls,.json,.txt,text/*,application/json";
            input.addEventListener("change", function(e) {
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.readAsText(file,"UTF-8");
                reader.onload = readerEvent => {
                    var content = readerEvent.target.result;
                        loadSave(JSON.parse(content));
                }
                closeMenu();
            });
            input.click();
        }
        function showSavePrompt() {
            closeMenu();
            var savePromptParent = document.getElementById("savePromptParent");
            var saveWarning = document.getElementById("saveWarning");
            if (currentSaveData) {
                document.getElementById("saveName").value = currentSaveData.name || "";
                document.getElementById("saveAuthor").value = currentSaveData.author || "";
                document.getElementById("saveDesc").value = currentSaveData.desc || "";
            }
            else if (settings.authorName) {
                document.getElementById("saveAuthor").value = settings.authorName;
            }
            saveWarning.innerHTML = "<br>"
            var menuTitle = document.querySelector("#savePromptMenu .menuTitle");
            if (savingState.slot === null) {
                menuTitle.innerHTML = "Save to File";
            }
            else {
                menuTitle.innerHTML = "Save to Slot";
                if (localStorage["SandboxelsSaves/"+savingState.slot]) {
                    saveWarning.innerHTML += "<br>This will overwrite the save in slot "+savingState.slot+"!";
                }
            }
            var saveMods = document.getElementById("saveMods");
            if (enabledMods.length !== 0) {
                saveMods.style.display = "inline-block";
                saveWarning.innerHTML += "<br>Mods might not be necessary to include, and may annoy the user!";
            }
            else { saveMods.style.display = "none"; }
            savePromptParent.style.display = "block";
            showingMenu = "savePrompt";
            document.getElementById("saveName").focus();
        }
        function showSettings() {
            var settingsParent = document.getElementById("settingsParent");
            settingsParent.style.display = "block";
            showingMenu = "settings";
        }
        function setSetting(setting,value) {
            settings[setting] = value;
            saveSettings();
        }
        function toggleInput(input,setting,updateText) {
            if (input.getAttribute("state") === "0") {
                input.setAttribute("state","1");
                if (updateText !== false) { input.value = "ON"; }
                if (setting) { setSetting(setting,1); }
            }
            else {
                input.setAttribute("state","0");
                if (updateText !== false) { input.value = "OFF"; }
                if (setting) { setSetting(setting,0); }
            }
        }