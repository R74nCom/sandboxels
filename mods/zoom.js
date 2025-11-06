// IIFE because paranoid
(() => {
    const zoom_levels = [
        0.5,
        1,
        2,
        3,
        6,
        12
    ]
    window.zoom_data_div = null

    window.zoom_level = 1
    window.zoom_panning = [0,0]

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
        rescale()
    }

    function handle_pan(direction, speed){
        switch (direction){
            case "right":
                zoom_panning[0] -= speed
                break;
            case "left":
                zoom_panning[0] += speed
                break;
            case "up":
                zoom_panning[1] += speed
                break;
            case "down":
                zoom_panning[1] -= speed
                break;
        }   
        rescale()        
    }

    function rescale(){
        log_info()

        const scale = zoom_levels[zoom_level]
        const x = zoom_panning[0] * (pixelSize * scale)
        const y = zoom_panning[1] * (pixelSize * scale)

        gameCanvas.style.transform = `translate(${x}px,${y}px) scale(${scale})`
    }

    function log_info(){
        // Values are negated to make them more intuitive
        const x_pan = (-zoom_panning[0]).toString().padEnd(4)
        const y_pan = (-zoom_panning[1]).toString().padEnd(4)

        if (zoom_data_div === null){ return; }

        zoom_data_div.innerText = ""
        zoom_data_div.innerText += `Scale: ${zoom_levels[zoom_level]}x\n`
        zoom_data_div.innerText += `Pan  : ${x_pan}, ${y_pan}`
    }

    function patch_keybinds(){
        // Be more granular at higher zoom levels
        const speed_a = () => zoom_level > 3 ? 5  : 10
        const speed_b = () => zoom_level > 3 ? 10 : 20
    
        keybinds["9"] = () => handle_zoom("in")
        keybinds["0"] = () => handle_zoom("out")
    
        keybinds["w"] = () => handle_pan("up",    speed_a())
        keybinds["a"] = () => handle_pan("left",  speed_a())
        keybinds["s"] = () => handle_pan("down",  speed_a())
        keybinds["d"] = () => handle_pan("right", speed_a())
    
        keybinds["W"] = () => handle_pan("up",    speed_b())
        keybinds["A"] = () => handle_pan("left",  speed_b())
        keybinds["S"] = () => handle_pan("down",  speed_b())
        keybinds["D"] = () => handle_pan("right", speed_b())
    }

    function patch_ui(){
        zoom_data_div = document.createElement("div")
        document.getElementById("logDiv").appendChild(zoom_data_div)
        
        const controls_table = document.getElementById("controlsTable").lastElementChild
        controls_table.insertAdjacentHTML("beforeBegin",`
            <tr>
                <td>Zoom in/out</td>
                <td>
                    <kbd>9</kbd>/
                    <kbd>0</kbd>
                </td>
            </tr>
            <tr>
                <td>Pan</td>
                <td>
                    <kbd>W</kbd>
                    <kbd>A</kbd>
                    <kbd>S</kbd>
                    <kbd>D</kbd>
                </td>
            </tr>
            <tr>
                <td>Pan (fast)</td>
                <td>
                    <kbd>Shift</kbd> + 
                    <kbd>W</kbd>
                    <kbd>A</kbd>
                    <kbd>S</kbd>
                    <kbd>D</kbd>
                </td>
            </tr>
        `)
    }

    // Redefine to give correct numbers when zoomed
    window.getMousePos = (canvas, evt) => {
        if (evt.touches) {
            evt.preventDefault();
            evt = evt.touches[0];
            isMobile = true;
        }
        const rect = canvas.getBoundingClientRect();

        let x = (evt.clientX - rect.left) / zoom_levels[zoom_level];
        let y = (evt.clientY - rect.top)  / zoom_levels[zoom_level];

        x = Math.floor((x / canvas.clientWidth) * (width+1));
        y = Math.floor((y / canvas.clientHeight) * (height+1));

        return {x:x, y:y};
    }

    runAfterReset(() => {
        window.zoom_level = 1
        rescale()
    })

    runAfterLoad(() => {
        patch_keybinds()
        patch_ui()
    })
})()
