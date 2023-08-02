var awaitingReload = [];

function updateModManager() {
    const modManager = document.getElementById("modManager");
    // make the title a bit better
    // modManager.getElementsByClassName("menuTitle").item(0).innerHTML = '<span class="menuTitle">Mod Manager</span>';
    document.getElementById("modManagerUrl").remove();
    const button = document.createElement("button");
    button.id = "modListOpen";
    button.onclick = openModList;
    button.innerText = "Open Mod List";
    button.style.position = "absolute";
    button.style.bottom = "5%";
    button.style.width = "100%";
    button.style.left = "0";
    button.style.height = "50px";
    button.style.backgroundColor = "#3c3c3c"
    button.style.paddingLeft = "auto";
    button.style.zIndex = 11;
    
    modManager.appendChild(button);
    const list = document.getElementById("modManagerList");
    list.style.maxHeight = "60%";
    list.style.overflowY = "scroll";
    addModList();

}

function addModList() {
    const parent = document.createElement("div");
    parent.className = "menuParent"
    parent.id = "modListParent";
    parent.style.display = "none";
    const modList = document.createElement("div");
    modList.className = "menuScreen";
    modList.id = "modList";
    modList.innerHTML = `<button class="XButton" onclick="closeMenu();">-</button>
    <span class="menuTitle">Mod List</span><br><br>
    <span>NOTE: This list contains mods ONLY available on GitHub. For custom mods hosted elsewhere, enter JS url in the <a href="#modManagerUrl">.JS URL input box</a>.</span>`;
    const modListUl = document.createElement("ul");
    modListUl.id = "modListUl";
    modListUl.style.maxHeight = "50%";
    modListUl.style.overflowY = "scroll";
    modList.appendChild(modListUl);
    parent.appendChild(modList);
    // add the modManagerUrl back, on a different screen
    const modManagerUrl = document.createElement("input");
    modManagerUrl.id = "modManagerUrl";
    modManagerUrl.type = "text";
    modManagerUrl.placeholder = ".JS URL...";
    modManagerUrl.style.marginBottom = "10px";
    modManagerUrl.onkeydown = (ev) => {
        if (ev.key == "Enter") {
            addMod(document.getElementById("modManagerUrl").value);
            document.getElementById("modManagerUrl").value = '';
        }
        this.focus();
    }
    parent.appendChild(modManagerUrl);
    document.getElementById("gameDiv").appendChild(parent);
    const style = document.createElement("style");
    style.innerHTML = `#modListUl { margin-top: 20px; }\n#modListUl li { position: relative; list-style-type: none; }\n#modListUl li::before { content: '•'; position: absolute; left: -1.5em; font-size: 1em; font-family: 'Press Start 2P'; }\n.addMod { color: #00cc00; }\n.awaitingReload { color: #666; }\n::-webkit-scrollbar { width: 10px; }\n::-webkit-scrollbar-track { background: #1f1f1f; }\n::-webkit-scrollbar-thumb { background: #aaa; }\n::-webkit-scrollbar-thumb:hover { background: #666; }`;
    document.head.appendChild(style);
    updateModList();
}

function updateModList() {
    const modList = document.getElementById("modListUl");
    // fetch all the mods from github
    fetch("https://api.github.com/repos/R74nCom/sandboxels/git/trees/main?recursive=1").then(res => res.json())
    .then(res => {
        res.tree.filter(f => f.path.startsWith("mods/")).map(f => f.path).forEach(file => {
            const link = document.createElement("a");
            link.target = "_blank";
            link.innerText = file.slice(5);
            link.href = file;
            const span = document.createElement("span");
            if (awaitingReload.includes(file)) {
                span.className = "awaitingReload";
                span.innerText = " -";
            } else if (enabledMods.includes(file)) {
                span.className = "removeModX";
                span.innerText = " X";
            } else {
                span.className = "addMod";
                span.innerText = " +";
            }
            span.onclick = () => {
                // makes sure that you cant modify mod state after its put into the awaiting reload group
                // those mods will get updated when the site is reloaded and awaitingReload (because its not stored in localStorage) will get reset
                if (awaitingReload.includes(file)) return;
                if (enabledMods.includes(file)) {
                    // why on earth addMod adds "mods/" automatically and removeMod doesnt
                    removeMod(file.startsWith("mods/") ? file : "mods/" + file);
                } else {
                    addMod(file.replace(/mods\//g, ""));
                }
                awaitingReload.push(file);
                span.innerText = " -";
                span.className = "awaitingReload";
            }
            const listItem = document.createElement("li");
            listItem.appendChild(link);
            listItem.appendChild(span);
            modList.appendChild(listItem);
        }
    )})
}

function openModList() {
    document.getElementById("modParent").style.display = "none";
    const modParent = document.getElementById("modListParent");
    modParent.style.display = "block";
    showingMenu = "modList";
}

if (enabledMods.includes("mods/betterMenuScreens.js")) {
    menuScreens.modList = {
        name: "Mod manager",
        parentDiv: "modListParent",
        show: false,
        close: () => {
            var modParent = document.getElementById("modListParent");
            var modManagerUrl = document.getElementById("modManagerUrl");
            modParent.style.display = "none";
            modManagerUrl.value = "";
            showingMenu = false;
        },
        onClose: () => {showModManager();},
        loader: () => {updateModManager();}
    }
} else {
    closeMenu = function() {
        if (!showingMenu) { return; }
        if (showingMenu == "info") {
            var infoParent = document.getElementById("infoParent");
            var infoSearch = document.getElementById("infoSearch");
            infoParent.style.display = "none";
            infoSearch.value = "";
            showingMenu = false;
            infoHistory = [];
        }
        else if (showingMenu == "mods") {
            var modParent = document.getElementById("modParent");
            var modManagerUrl = document.getElementById("modManagerUrl");
            modParent.style.display = "none";
            modManagerUrl.value = "";
            showingMenu = false;
        }
        else if (showingMenu == "modList") {
            var modParent = document.getElementById("modListParent");
            var modManagerUrl = document.getElementById("modManagerUrl");
            modParent.style.display = "none";
            modManagerUrl.value = "";
            showingMenu = false;
            // open mod manager again so the mod list menu looks like a submenu
            showModManager();
        }
        else if (showingMenu == "settings") {
            var settingsParent = document.getElementById("settingsParent");
            settingsParent.style.display = "none";
            showingMenu = false;
        }
        else {
            // do it to all elements with the class "menuParent"
            var menuParents = document.getElementsByClassName("menuParent");
            for (var i = 0; i < menuParents.length; i++) {
                menuParents[i].style.display = "none";
            }
            showingMenu = false;
        }
    }
    runAfterLoadList.push(updateModManager);
}
