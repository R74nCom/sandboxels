function setCanvasBG(url) {
    delete settings.bg;

    let canvas = document.getElementById("game");
    canvas.style.backgroundColor = "";
    canvas.style.backgroundImage = `url(${url})`;
    canvas.style.backgroundRepeat = "no-repeat";
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = "bottom";

    settings.bgimg = url;

    saveSettings()
}

keybinds.KeyB = () => {
    promptInput("Enter an image URL. Leave blank to clear background.", (url) => {
        if (!url) {
            delete settings.bgimg;
            let canvas = document.getElementById("game");
            canvas.style.backgroundImage = "";
            canvas.style.backgroundRepeat = "";
            canvas.style.backgroundSize = "";
            canvas.style.backgroundPosition = "";
        }
        setCanvasBG(url);
    }, "Background")
}

document.addEventListener("load", () => {
    if (settings.bgimg) {
        setCanvasBG(settings.bgimg)
    }
})

runAfterReset(() => {
    if (settings.bgimg) {
        setCanvasBG(settings.bgimg)
    }
})