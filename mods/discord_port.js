// For the Sandboxels Discord activity: https://discord.com/oauth2/authorize?client_id=1360770918732796117

function convertListeners() {
    document.querySelectorAll("*[onclick]").forEach((e) => {
        e.addEventListener("click", e.onclick);
        e.removeAttribute("onclick");
    })
    document.querySelectorAll("*[oninput]").forEach((e) => {
        e.addEventListener("input", e.oninput);
        e.removeAttribute("oninput");
    })
    document.querySelectorAll("*[onchange]").forEach((e) => {
        e.addEventListener("change", e.onchange);
        e.removeAttribute("onchange");
    })
}

_showPromptScreen = showPromptScreen;
showPromptScreen = function() {
    _showPromptScreen();
    convertListeners();
}

_showInfo = showInfo;
showInfo = function() {
    _showInfo();
    convertListeners();
}

_getDiscordSaves = getDiscordSaves;
getDiscordSaves = function() {
    _getDiscordSaves();
    convertListeners();
}

window.addEventListener("load", convertListeners);