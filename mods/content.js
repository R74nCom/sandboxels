// dependOn("borders.js", ()=>{}, true);
dependOn("glow.js", ()=>{},  true);
// dependOn("background_changer.js", ()=>{},  true);
dependOn("cursor.js", ()=>{},  true);
dependOn("devsnacks.js", ()=>{},  true);

function minimizeElement(selector) {
    document.querySelectorAll(selector).forEach(element => {
        element.classList.add("minimized");
    });
}
function maximizeAll() {
    document.querySelectorAll(".minimized").forEach((e) => {
        e.classList.remove("minimized");
    })
}
document.head.insertAdjacentHTML("beforeend", `
<style>
    .minimized {display:none!important}
    button:focus, * {outline:0;}
    #underDiv {opacity: 0.5; transition: opacity 0.5s}
    #underDiv:hover {opacity: 1}
    #categoryControls {flex-wrap: nowrap!important;}
    #categoryControls button {padding-left:0.9em!important;padding-right:0.9em!important}
    #promptParent {
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
`);

settings.pixelsize = "6w";

let __setMouseColor = (color) => {
    mouseColor = color;
    settings.mouseColor = color;
}

contentModOptions = {
    // "Set Background": () => {
    //     promptChoose("", [
    //         "Custom", "Grassland", "Sky", "Sky Warm", "Sky Pink", "Sky Purple", "Sky Dark"
    //     ], r => {
    //         if (r === "Custom") setCanvasBGPrompt();
    //         else if (r === "Grassland") {
    //             setCanvasBG("https://i.imgur.com/Id9WZv4.png", "#2d6138");
    //             __setMouseColor("#000000");
    //         }
    //         else if (r === "Sky") {
    //             setCanvasBG("https://i.imgur.com/Er068gC.png", "#647690");
    //             __setMouseColor("#000000");
    //         }
    //         else if (r === "Sky Warm") {
    //             setCanvasBG("https://i.imgur.com/1GWI5xd.png", "#904f45");
    //             __setMouseColor("#000000");
    //         }
    //         else if (r === "Sky Pink") {
    //             setCanvasBG("https://i.imgur.com/f5gltLn.png", "#435897");
    //             __setMouseColor("#FFFFFF");
    //         }
    //         else if (r === "Sky Purple") {
    //             setCanvasBG("https://i.imgur.com/1KNCIwJ.png", "#763CB5");
    //             __setMouseColor("#FFFFFF");
    //         }
    //         else if (r === "Sky Dark") {
    //             setCanvasBG("https://i.imgur.com/wbYia5p.png", "#181628");
    //             __setMouseColor("#FFFFFF");
    //         }
    //     })
    // },
    // "Clear Background": () => {
    //     clearCanvasBG();
    //     mouseColor = "rgba(255,255,255)";
    //     delete settings.mouseColor;
    // },
    "Set Cursor Color": () => {
        promptInput("Enter an image URL. Leave blank to clear background.", (color) => {
            if (!color) {
                delete settings.mouseColor;
                return;
            }
            mouseColor = color;
            settings.mouseColor = color;
        }, "Mouse Color")
    },
    "Minimize UI": () => {
        minimizeElement("#stats");
        minimizeElement("#extraInfo");
        minimizeElement("#bottomInfoBox");
        minimizeElement("#logDiv");
        minimizeElement("#toolControls");
        document.getElementById("category-tools").style.borderTop = "6px black solid";
        document.getElementById("category-tools").style.paddingTop = "0.5em";
        resetPrompt();
    },
    "Maximize UI": () => {
        maximizeAll();
    },
    "Content Hub": () => {
        window.open("https://r74n.com/content/", '_blank');
    },
}

keybinds.KeyV = () => {
    promptChoose("", Object.keys(contentModOptions), (r) => {
        contentModOptions[r]();
    })
}

elements.invis = {
    renderer: (pixel,ctx) => {
        if (currentElement === "invis") {
            drawSquare(ctx,"#00ff00",pixel.x,pixel.y);
        }
    },
    behavior: (pixel) => {
        doDefaults(pixel);
    },
    onPlace: (pixel) => {
        pixel.alpha = 0;
    },
    tool: (pixel) => {
        pixel.alpha = 0;
    },
    category: "special",
    color: "#00ff00"
}

window.addEventListener("load", () => {
    contentModOptions["Minimize UI"]();
})