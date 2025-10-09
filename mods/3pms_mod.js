// made by 3pm

version = "0.0.2"
subversion = "0.0.21"
versionname = "Let's take a look..."

console.log("3pms_mod.js " + version + " \"" + versionname + "\"")
console.log("3pms_mod.js | Initiating...")

// bypassing the tps limit

function tpsPrompt() {
    promptInput("Enter the new simulation Ticks Per Second (TPS). This is how many updates per second the simulation will run.\n\nThe default is 30.\n\nThe current TPS is " + tps + ".\n\nNOTE: 3pms_mod.js removes the TPS limit.\nAny TPS higher than 1000 isn't recommended.\n\n",
        (r) => {
            var newtps = parseInt(r);
            if (r !== null) {
                if (isNaN(newtps) || newtps == "") logMessage("You did not enter a valid TPS.");
                else {
                    newtps = parseInt(newtps);
                    if (isNaN(newtps) || newtps <= 0) {
                        logMessage("You did not enter a valid TPS.");
                    }
                    else {
                        tps = newtps;
                        delete currentSaveData.oldTps;
                    }
                }
                resetInterval(tps);
            }
            focusGame();
        },
        "Change TPS"
    )
}

// more settings

function showMoreSettings() {
    showingMenu="moresettings"
    console.log("3pms_mod.js | Opening More Settings....")
    var moresettingsParent = document.getElementById("moresettingsParent");
    moresettingsParent.style.display = "block";
}

setTimeout(() => {
    const gamediv = document.getElementById("gameDiv")
    gamediv.insertAdjacentHTML("beforeend", `
        <div id="moresettingsParent" style="display: none" class="menuParent">
            <div id="moresettingsMenu">
                <button class="XButton" onclick="closeMenu();showSettings();">-</button>
                <span class="menuTitle">More Settings</span>
                <div class="menuText" style="padding-top:1em">
                    <p>Nothing to see here ;3</p>
                </div>
            </div>
        </div>`);
    const menuText = document.getElementsByClassName("menuText")[9]
    const newButton = document.createElement("button")
    newButton.innerText = "More Settings"
    newButton.className = "settingsButton"
    newButton.onclick = () => {
        closeMenu();
        showMoreSettings()
    }
    menuText.appendChild(newButton)
}, 1000);

// elements

elements.calcium_oxide = {
    color: ["#544E45","#6A635E","#6E6A61","#756F62","#918A7B"],
    tick: function(pixel) {
        behaviors.POWDER(pixel);
        for (var i = 0; i < adjacentCoords.length; i++) {
            var x = pixel.x+adjacentCoords[i][0];
            var y = pixel.y+adjacentCoords[i][1];} },
    tempHigh: 842,
    reactions: {
        water: {elem1:"calcium_oxide", elem2:"steam"},
        salt_water: {elem1:"calcium_oxide", elem2:"steam"},
        sugar_water: {elem1:"calcium_oxide", elem2:"steam"},
        dirty_water: {elem1:"calcium_oxide", elem2:"steam"}
    },
    category: "powders",
    state: "solid",
    density: 1550,
    conduct: 0.40,
    hardness: 0.2,
    fireColor: "#ff6b21"
}

elements.eeraser = {
    color: "#FFFF00",
    behaviorOn: [
        "DL|XX|DL",
        "DL|XX|DL",
        "DL|DL|DL",
    ],
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],
    conduct: 0.5,
    category: "machines",
    state: "solid",
};

// tools
elements.replace_all_of_element = {
    color: ["#ff3030", "#800000"],
    name: "replace all of element",
    onSelect: async function() {
        promptInput(
            "Enter the element to be replaced.",
            (r) => {
                if (r in elements) {
                    elements.replace_all_of_element.tool = function(pixel) {
                        elementbefore = pixel.element
                        for (var i = 0; i <= width; i++) {
                            for (var j = 0; j <= height; j++) {
                                if (!isEmpty(i,j,true)) {
                                    if(pixelMap[i][j].element == elementbefore) {
                                        changePixel(pixelMap[i][j], r)
                                    }
                                }
                            }
                        }
                    }
                } else {
                    logMessage("You did not enter an existing element.");
                }
            },
            "3pms_mod.js"
        );
    },
    category: "tools",
};



setTimeout(() => {
    console.log("3pms_mod.js | Initiated. Thank you.")
}, 1000);