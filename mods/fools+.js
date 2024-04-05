// all the credits go to R74n
// made worse by sqec
// i'm sorry, here's some poorly made ascii art bleach for your eyes
// tbh most of it was copied from index.html or fools.js
// moss inspired
// code messy don't read
/*
_____
|   |
|--------.
|         \
|      |\  \
|      | \  \
|      \  \  \
|       \_|   .
|             |
|   BLEACH    |
|   12floz    |
|             |
|_____________|
*/

behaviors.CRASH = [
    "XX|XX|XX",
    "XX|EX:100000>flash|XX",
    "XX|XX|XX",
]

fonts = ["Webdings","Comic Sans MS","Times New Roman","Monospace","Wingdings","Courier New",
        "Papyrus","Impact","Curlz MT","Jokerman","Segoe Script","Bradley Hand ITC"]
funnysavenames = ["identity theft","the saveinator","Save 95","nuclear reactor","stomach man",
        "calculator","potato chip","bread bowl","more gun","error 704 save not found","fortnite dance",
        "foghorn","Unknown","mixup save","balls 🏀","sbave","the moss field","uhhhh",
        "Grumman f-14 tomcat fighter jet","mcdonnell douglas f-15 eagle fighter jet",
        "untextured unrigged blender brick","rebar","the giant enemy spider",
        "statue of ryan","🟩","🟥","the temple of ryan","🌳 🌳 🌳","R74n ripoff",
        "the powder toy","tpt save","save from tpt","sand:box save","sandspiel save",
        "cool plane","big mac with uranium","nyc","mountain thing","Slot NaN","Slot 1",
        "Slot 1.5","Slot pi","Slot golden ratio","Slot Infinity","Computer thing","Pro Kitchen",
        "Airport","Coconut Plantation","Eiffel Tower","car"]

allproperties = {}

skipproperties = ["color", "colorOn", "forceAutoGen", "name", "category", "colorObject", "hidden", "tempHigh", "tempLow", "stateHigh", "stateLow"]
goodproperties = ["behavior","tick"]
elements.molten_rad_glass.color = "#ffffff"

for (element in elements) {
    var elementdata = elements[element]
    if (elementdata.category === "tools") { continue }
    for (property in elementdata) {
        //if (skipproperties.indexOf(property) !== -1) { continue }
        // only use properties that are in goodproperties
        if (goodproperties.indexOf(property) === -1) { continue }
        if (!allproperties[property]) {
            allproperties[property] = []
        }
        allproperties[property].push(elementdata[property])
    }
}
// delete all properties from elements except skipproperties
for (element in elements) {
    var elementdata = elements[element]
    if (elementdata.category === "tools") { continue }
    for (property in elementdata) {
        //if (skipproperties.indexOf(property) === -1) {
        // only delete properties that are in goodproperties
        if (goodproperties.indexOf(property) !== -1) {
            delete elementdata[property]
        }
    }
}

// make a randomized shuffled list of all elements
var elementlist = Object.keys(elements)
elementlist.sort(function() { return 0.5 - Math.random() })

// randomly assign properties to elements
for (property in allproperties) {
    // list of values for this property
    var propertyvalues = allproperties[property]
    // loop through elements, assigning values until we run out
    for (var i = 0; i < elementlist.length; i++) {
        if (i >= propertyvalues.length) { break }
        var element = elementlist[i]
        var elementdata = elements[element]
        elementdata[property] = propertyvalues[i]
    }
    // reshuffle the list of elements
    elementlist.sort(function() { return 0.5 - Math.random() })
}

// choose random values for properties
for (element in elements) {
    elementdata = elements[element]
    if (elementdata.category === "tools") { continue }
    // set tempHigh to a random value between 0 and 10000
    elementdata.tempHigh = Math.floor(Math.random() * 10000)
    // set tempLow to a random value between -273 and 0
    elementdata.tempLow = Math.floor(Math.random() * 273) - 273
    if (elementdata.stateHigh) {
        elementdata.stateHigh = elementlist[Math.floor(Math.random() * elementlist.length)]
    }
    if (elementdata.stateLow) {
        elementdata.stateLow = elementlist[Math.floor(Math.random() * elementlist.length)]
    }
    if (elementdata.reactions) {
        for (reactant in elementdata.reactions) {
            elementdata.reactions[reactant].elem1 = elementlist[Math.floor(Math.random() * elementlist.length)]
            elementdata.reactions[reactant].elem2 = elementlist[Math.floor(Math.random() * elementlist.length)]
            elementdata.reactions[elementlist[Math.floor(Math.random() * elementlist.length)]] = elementdata.reactions[reactant]
            delete elementdata.reactions[reactant]
        }
    }
    
}

// Generate random hex color codes
function getRandomHexColor() {
    let hex = '#';
    for (let i = 0; i < 6; i++) {
        hex += Math.floor(Math.random() * 16).toString(16);
    }
    return hex;
}
//random word generator
function generateRandomWord() {
    let word = '';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
  
    // Generate random word
    for(let i = 0; i < Math.floor(Math.random() * 20); i++) {
      word += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    
    // Randomly add spaces
    for(let i = 0; i < word.length; i++) {
      if(Math.random() < 0.2) {
        word = word.slice(0, i) + ' ' + word.slice(i);
      }
    }
  
    return word;
  }
// Set random colors
for (let element in elements) {
    let elementData = elements[element];
    if (Math.random() < 0.3) {
        elementData.color = [getRandomHexColor(),getRandomHexColor(),getRandomHexColor()]; 
    }
    else if (Math.random() < 0.5) {
        elementData.color = [getRandomHexColor(),getRandomHexColor()]; 
    }
    else if (Math.random() < 0.8) {
        elementData.color = getRandomHexColor(); 
    }
    else {
        elementData.color = [getRandomHexColor(),getRandomHexColor(),getRandomHexColor(),getRandomHexColor(),getRandomHexColor()]; 
    }
}
// Set random category
for (let element in elements) {
    let elementData = elements[element];
    if (elementData.category === "tools") { continue }
    elementData.category = generateRandomWord();
}
runAfterLoad(function() {
    pixelTempCheckTemp = pixelTempCheck
    pixelTempCheck = function(pixel) {
        try {
            pixelTempCheckTemp(pixel)
        }
        catch (e) {}
    }
})

var fonttouse = fonts[Math.floor(Math.random() * fonts.length)]

runAfterLoad(function() {
    //inverts scroll direction
    if (navigator.platform.toUpperCase().indexOf('MAC')>=0) {
        settings.invertscroll = false;
    }
    else {
        settings.invertscroll = true;
    }
    // change every font to to random
    var css = document.createElement("style")
    css.innerHTML = "* { font-family: "+fonttouse+" !important; font-size: 32px !important;}"
    document.body.appendChild(css)
    // randomize background color
    document.body.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"
    document.body.style.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"
    document.body.style.textShadow = "20px 0px "+getRandomHexColor();
    // replace choose element so it's impossible to find any element
    chooseElementPrompt = function() {
        alert("This feature is disabled for April Fools Day :)")
    }
    //showSaves = function() {
    //    alert("This feature is disabled for April Fools Day :)")
    //}
    showSaves = function() {
        var savesParent = document.getElementById("savesParent");
            var saveSlotList = document.getElementById("saveSlotList");
            saveSlotList.innerHTML = "";
            // loop 12 times, checking if local storage SandboxelsSaves/x exists
            // <span class="saveSlot">Slot 1 <span disabled="true">Clear</span> <span disabled="true">Load</span> <span onclick="saveSlot(2)">Save</span></span>
            // <span class="saveSlot">Unnamed <span onclick="clearSlot(2)">Clear</span> <span onclick="loadSlot(2)">Load</span> <span onclick="saveSlot(2)">Save</span></span>
            for (var i = 1; i < 13; i++) {
                var save = localStorage.getItem("SandboxelsSaves/"+i);
                var name = funnysavenames[Math.floor(Math.random() * funnysavenames.length)];
                if (save) {
                    name = JSON.parse(save).meta.name || "Unnamed";
                    name = name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
                    // truncate
                    if (name.length > 16) { name = name.substring(0,16)+"..."; }
                    saveSlotList.innerHTML += "<span id='saveSlot"+i+"' data-name='"+name+"' class='saveSlot'><span class='saveSlotName'>"+name+"</span> <span onclick='clearSlot("+i+")' class='saveOption'>Clear</span> <span onclick='loadSlot("+i+")' class='saveOption'>Load</span> <span onclick='saveSlot("+i+")' class='saveOption'>Save</span></span>";
                }
                else {
                    saveSlotList.innerHTML += "<span id='saveSlot"+i+"' data-name='"+name+"' class='saveSlot'><span class='saveSlotName'>"+name+"</span> <span disabled='true' class='saveOption'>Clear</span> <span disabled='true' class='saveOption'>Load</span> <span onclick='saveSlot("+i+")' class='saveOption'>Save</span></span>";
                }
            }
            savesParent.style.display = "block";
            showingMenu = "saves";
    }
    // set zoom to 110%. it doesn't do anything but apparently offsets the brush? what.
    document.body.style.zoom = "110%";
    // set background (game background not page background) to a random color
    setSetting('bg',getRandomHexColor());
    // no more pause for you!
    togglePause = function() {
        alert("This feature is disabled for April Fools Day :)")
    }
    // Get all element keys
    const elementsList = Object.keys(elements);

    // Shuffle the keys randomly
    elementsList.sort(() => Math.random() - 0.5); 

    // Create new shuffled elements object
    const shuffledElements = {};

    // Add elements to new object in shuffled order
    elementsList.forEach(key => {
        shuffledElements[key] = elements[key];

    // blurs page
    document.body.style.filter = "blur(0.8px)";
});

// Replace original with shuffled version
elements = shuffledElements;
})
// generate random element
function selectRandomElement() {
    const elementKeys = Object.keys(elements);
    const randomIndex = Math.floor(Math.random() * elementKeys.length);
    const randomElementKey = elementKeys[randomIndex];
    
    return elements[randomElementKey].name;
  }
// randomly increases or decreases mouse size
setInterval(function(){
    if (Math.random() < 0.5) {
        if (Math.random() < 0.5) {
            mouseSize = mouseSize + 1;
        }
        else {
            mouseSize = mouseSize - 1;
        }
    }
    if (Math.random() < 0.05) {
        selectElement(selectRandomElement());
    }
    // evil random popup
    if (Math.random() < 0.005) {
        alert("funny popup");
    }
    // useless prompt
    if (Math.random() < 0.005) {
        var funnyuselessprompt = prompt("funny prompt");
    }
    if (Math.random() < 0.2) {
        tps = tps + Math.round(Math.random()*4)-2;
    }
    if (Math.random() < 0.005) {
        tps = 1000
    }
    if (Math.random() < 0.05) {
        tps = 30
    }
    // every once in a while, everythign randomises
    if (Math.random() < 0.1) {
        document.body.style.color = getRandomHexColor();
        document.body.style.textShadow = "20px 0px "+getRandomHexColor();
        document.body.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"
        setSetting('bg',getRandomHexColor());
    }
}, 200);
