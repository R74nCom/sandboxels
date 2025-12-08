function setCanvasBG(url, color) {
    delete settings.bg;

    let canvas = document.getElementById("game");
    canvas.style.backgroundColor = "";
    canvas.style.backgroundImage = `url(${url})`;
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = "bottom";

    settings.bgimg = url;
    if (color) settings.bgimgcolor = color;
    else delete settings.bgimgcolor;

    if (color) document.head.insertAdjacentHTML("beforeend", `<style id="canvasBGStyles">* {background-color:${color}} body, html {background-color:${color}!important}</style>`);
    else document.getElementById("canvasBGStyles")?.remove();

    saveSettings()
}
function clearCanvasBG() {
    delete settings.bgimg;
    let canvas = document.getElementById("game");
    canvas.style.backgroundImage = "";
    canvas.style.backgroundRepeat = "";
    canvas.style.backgroundSize = "";
    canvas.style.backgroundPosition = "";
    document.getElementById("canvasBGStyles")?.remove();
}

function setCanvasBGPrompt() {
    promptInput("Enter an image URL. Leave blank to clear background.", (url) => {
        if (!url) {
            clearCanvasBG();
        }
        setCanvasBG(url);
    }, "Background")
}

keybinds.KeyB = () => {
    setCanvasBGPrompt()
}

document.addEventListener("load", () => {
    if (settings.bgimg) {
        setCanvasBG(settings.bgimg, settings.bgimgcolor)
    }
})

runAfterReset(() => {
    if (settings.bgimg) {
        setCanvasBG(settings.bgimg, settings.bgimgcolor)
    }
})