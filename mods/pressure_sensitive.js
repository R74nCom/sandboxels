runAfterLoad(() => {
    let oldMouseSize;
    let canvas = document.getElementById("game");
    canvas.addEventListener("pointerdown", (event) => {
        oldMouseSize = mouseSize;
        mouseSize = oldMouseSize * ((event.pressure || 0.5) / 0.5);
        checkMouseSize(true);
    })
    canvas.addEventListener("pointermove", (event) => {
        if (!mouseIsDown) return;
        mouseSize = oldMouseSize * ((event.pressure || 0.5) / 0.5);
        checkMouseSize(true);
        // console.log(oldMouseSize,event.pressure)
    })
    canvas.addEventListener("pointerup", (event) => {
        mouseSize = oldMouseSize;
        oldMouseSize = undefined;
        checkMouseSize(true);
    })
})