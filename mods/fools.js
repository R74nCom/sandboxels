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



runAfterLoad(function() {
    pixelTempCheckTemp = pixelTempCheck
    pixelTempCheck = function(pixel) {
        try {
            pixelTempCheckTemp(pixel)
        }
        catch (e) {}
    }
})

runAfterLoad(function() {
    // change every font to Comic Sans
    var css = document.createElement("style")
    css.innerHTML = "* { font-family: Comic Sans MS !important; }"
    document.body.appendChild(css)
    // randomize background color
    document.body.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"


})