// mod moment
// also made by 3pm

// starting the initiation
version = "0.0.1"
subversion = "0.0.12"
versionname = "Gullible On The Ceilling"

console.log("3pms_mod.js " + version + " \"" + versionname + "\"")
console.log("3pms_mod.js | Initiating...")

// bypassing the tps limit
// nvm this is useless
// whatever im keeping it

setTimeout(() => {
    const tpsbutton = document.getElementById("tpsButton");
    tpsbutton.onclick = () => {
        var tpsprompt = prompt(
            "Enter the new simulation Ticks Per Second (TPS). This is how many updates per second the simulation will run.\n\n" +
            "The default is 30.\n\nThe current TPS is " + tps + ".\n\nNOTE: 3pms_mod.js removes the TPS limit.\n" +
            "Any TPS higher than 1000 isn\'t recommended.\n\n"
        );

        var newtps = parseInt(tpsprompt);
        if (tpsprompt !== null) {
            if (isNaN(newtps) || newtps == "") {
            alert("You did not enter a valid TPS.");
            } else {
            tps = parseInt(newtps);
            if (isNaN(tps) || tps <= 0) {
                alert("You did not enter a valid TPS.");
                tps = 30;
            }
            }
            resetInterval(tps);
        }
        focusGame();
    };
}, 1000);

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
    const menuText = document.getElementsByClassName("menuText")[6]
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

elements.calcium_oxide = { // most of this is taken off calcium
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

elements.eeraser = { // finally integrating it after over a year
    color: "#FFFF00",
	behavior: behaviors.WALL,
    behaviorON: [
        "DL|DL|DL",
        "DL|DL|DL",
        "DL|DL|DL",
    ],
    category: "machines",
    insulate: elements.wire.insulate,
    conduct: elements.wire.conduct,
    noMix: elements.wire.noMix
};

// stopping the initiation

setTimeout(() => {
    console.log("3pms_mod.js | Initiated. Thank you.")
}, 1000);
















const thing=document.createElement("p");thing.innerText="MY NAME 📛 IS DAVID 👨‍🎤 DAD 👨‍👩‍👧‍👦👨‍👩‍👧‍👧 I ℹ️ WANT SOME ICE 🧊🇦🇶 CREAM 🧴🧴 DAVID 👨‍🎤 THAT IS MY NAME 📛 DAVID 👨‍🎤👨‍🎤 I ℹ️ WANT ANOTHER WHERE ❔❓ IS MY BALL 🏈🏈 I’M RUNNING 🏃‍♂️🏃‍♀️ OUT ON 🔛 THE ROAD 🚧 THERE IS A 🅰️ CAR 🚔🚖 AND IT IS GOING TO HIT 👊 ME 🖐🙋‍♀️ HEEEEEEEEELP HELP 💁 MEEEEEEE HEEEEEEEEEEEEEEEEELP\n\nthanks for using 3pms_mod.js :3";document.body.appendChild(thing)