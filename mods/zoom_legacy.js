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

let colour_setting;

dependOn("betterSettings.js", () => {
    const settings_tab = new SettingsTab("zoom.js");
    colour_setting = new Setting(
        "Canvas background", 
        "canvas_bkg", 
        settingType.COLOR, 
        false, 
        defaultValue="#252525"
    );

    settings_tab.registerSettings(undefined, colour_setting)
    settingsManager.registerTab(settings_tab)
})

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

function gen_button(row, col, html, click, nopos, id){
    const elem = document.createElement("button")


    if (!nopos){
        elem.style.gridColumn = row
        elem.style.gridRow    = col
    }
    if (id) { elem.id = id }

    // Table for the data-pos to assign (row major). If null, don't add.
    const data_pos_map = [
        ["tl", null, "tr"],
        [null, null, null],
        ["bl", null, "br"]
    ]

    elem.innerHTML = html
    elem.onclick = click

    if (data_pos_map[row-1][col-1] !== null) {
        elem.dataset.pos = data_pos_map[row-1][col-1]
    }

    return elem
}

function add_css(){
    const CSS = `
    #zm_data_div { margin-bottom: 10px }
    #canvasDiv   { overflow: hidden; background-color: var(--opac-85) }

    @media(pointer=coarse){
        #zm_floater_container#zm_floater_container { 
            width: 40%;
            height: auto;
        }
        #zm_floater_container:has(#zm_collapse[data-collapsed="true"]){
            width: calc(40% / 3);
        }
    }

    @media(pointer:coarse) and (orientation:landscape){
        #zm_floater_container#zm_floater_container {
            width: auto;
            top: 5px;
        }
        #zm_floater_container:has(#zm_collapse[data-collapsed="true"]){
            width: calc(40% / 3);
        }
    }

    #colorSelector { z-index: 1; right: 5px }
    #zm_floater_container {
        position: absolute;
        display: grid;

        right: 5px;
        bottom: 5px;
        height: 100px;
        aspect-ratio: 1;

        max-width: 200px;
        max-height: 200px;

        border: 2px solid white;
        background-color: black;
        font-size: 120%;

        button { text-align: center; border: 0px solid white }

        button:where([data-pos="tl"]) { border-width: 0px 2px 2px 0px };
        button:where([data-pos="tr"]) { border-width: 2px 2px 0px 0px };
        button:where([data-pos="bl"]) { border-width: 0px 0px 2px 2px };
        button:where([data-pos="br"]) { border-width: 2px 0px 0px 2px };
    }
    #zm_floater_container:has(#zm_collapse[data-collapsed="true"]) {
        height: 50px;
        
        button:not(#zm_collapse) {
            display: none;
        }
    }
    #canvasDiv:has(#colorSelector[style *= "block"]) #zm_floater_container {
        bottom: 50px;
    }
    
    .zm_corner { border: 2px solid white; }

    #zm_collapse {
        grid-row: 3;
        grid-column: 3;
    }
    #zm_collapse[data-collapsed="true"] {
        grid-row: 1;
        grid-column: 1;
        border-width: 0px;
    }
    `

    const style_div = document.createElement("style")
    style_div.innerHTML = CSS

    document.head.appendChild(style_div)
}

function add_zoom_floaters(){
    const container = document.createElement("div")
    container.id = "zm_floater_container"

    // Pan mode selector (C: Coarse F: Fine)
    const pan_mode_sel = gen_button(
        1,3, "C", 
        (evt) => {
            evt.target.dataset.mode = evt.target.dataset.mode == "F" ? "C" : "F"
            evt.target.innerText = evt.target.dataset.mode
        },
        false,
        "zm_panmode_sel"
    )

    const speed = () => 
        (window.zoom_level > 3 ? 5  : 10) *           // More granular at higher zoom levels
        (pan_mode_sel.dataset.mode == "F" ? 0.25 : 1) // Increase granularity in fine mode

    container.append(
        // Direction buttons
        gen_button(2,1, "&uarr;", () => handle_pan("up"    ,speed())),
        gen_button(1,2, "&larr;", () => handle_pan("left"  ,speed())),
        gen_button(3,2, "&rarr;", () => handle_pan("right" ,speed())),
        gen_button(2,3, "&darr;", () => handle_pan("down"  ,speed())),

        // Zoom buttons
        gen_button(1,1, "+", () => handle_zoom("in")),
        gen_button(3,1, "-", () => handle_zoom("out")),

        // Collapse button
        gen_button(
            3,3, "#", 
            (evt) => {
                evt.target.dataset.collapsed = evt.target.dataset.collapsed == "true" 
                    ? "false"
                    : "true"
            }, 
            true,
            "zm_collapse"
        ),
        pan_mode_sel
    )

    const canvas_div = document.getElementById("canvasDiv")
    canvas_div.style.backgroundColor = colour_setting?.value ?? "#252525"
    canvas_div.appendChild(container)
}

function rescale(){
    log_info()

    const scale = zoom_levels[zoom_level]
    const x = zoom_panning[0] * (pixelSize * scale)
    const y = zoom_panning[1] * (pixelSize * scale)

    gameCanvas.style.transform = `translate(${x}px, ${y}px) translateX(-50%) scale(${scale})`
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
    add_css()
    add_zoom_floaters()

    zoom_data_div = document.createElement("div")
    zoom_data_div.id = "zm_data_div"
    document.getElementById("logDiv").prepend(zoom_data_div)
    
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