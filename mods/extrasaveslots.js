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