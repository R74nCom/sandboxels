// IIFE because paranoid
(() => {
    let canvas_div = document.getElementById("canvasDiv")

    keybinds["9"] = () => handle_zoom("in")
    keybinds["0"] = () => handle_zoom("out")

    const controls_table = document.getElementById("controlsTable").lastElementChild
    controls_table.insertAdjacentHTML("beforeBegin",`
    <tr>
        <td>Zoom in/out</td>
        <td><kbd>9</kbd>/<kbd>0</kbd>
    </tr>
    `)

    const zoom_levels = [
        0.5,
        1,
        2,
        3,
        6,
        12
    ]

    window.zoom_level = 1

    function handle_zoom(direction){
        switch (direction){
            case "in":
                if (!(zoom_level+1 in zoom_levels)) { break; }
                window.zoom_level += 1
                break;
            case "out":
                if (!(zoom_level-1 in zoom_levels)) { break; }
                window.zoom_level -= 1
                break;
        }

        logMessage(`${zoom_levels[zoom_level]}x`)
        rescale()
    }

    function rescale(){
        const scale = zoom_levels[zoom_level];
        gameCanvas.style.transform = `scale(${scale})`

        canvas_div.style.overflow = scale > 1 ? "scroll" : "unset"
    }

    // Redefine to give correct numbers when zoomed
    window.getMousePos = (canvas, evt) => {
        if (evt.touches) {
            evt.preventDefault();
            evt = evt.touches[0];
            isMobile = true;
        }
        const rect = canvas.getBoundingClientRect();

        let x = (evt.clientX - rect.left) / zoom_levels[window.zoom_level];
        let y = (evt.clientY - rect.top)  / zoom_levels[window.zoom_level];

        x = Math.floor((x / canvas.clientWidth) * (width+1));
        y = Math.floor((y / canvas.clientHeight) * (height+1));

        return {x:x, y:y};
    }

    runAfterReset(() => {
        window.zoom_level = 1
        rescale()
    })
})()
