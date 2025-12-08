dependOn("borders.js", ()=>{}, true);
dependOn("glow.js", ()=>{},  true);
dependOn("background_changer.js", ()=>{},  true);
dependOn("cursor.js", ()=>{},  true);

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

contentModOptions = {
    "Set Background": () => {
        setCanvasBGPrompt();
    },
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
    "Clear Background": () => {
        clearCanvasBG();
    },
    "Grassland": () => setCanvasBG("https://i.imgur.com/Id9WZv4.png", "#2d6138ff"),
    "Sky": () => setCanvasBG("https://i.imgur.com/Er068gC.png", "#647690ff"),
    "Sky Warm": () => setCanvasBG("https://i.imgur.com/aJeSRLk.png", "#904f45ff"),
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