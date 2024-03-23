/*
MIT License

Copyright (c) 2024 BatteRaquette58 (a.k.a BatteRaquette581)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const isFloat = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/ // https://stackoverflow.com/questions/12643009/regular-expression-for-floating-point-numbers
const isIDList = /^\d+(,\d+)*$/

let cloner_elements = []
// makes cloner elements ignore the new cloner, and vice versa
const update_ignore_list = () => {
    const hasCloner = /cloner/ // don't ask why out of all methods to detect a substring in a string, i chose regex
    let element_keys = Object.keys(elements)
    cloner_elements = element_keys.filter(element => hasCloner.test(element)) // all elements with "cloner" in their name
    if (element_keys.includes("liquid_void")) // support for liquid_void.js
        cloner_elements.push("liquid_void")
    if (element_keys.includes("destroyable_cloner")) // support for nousersthings.js
        cloner_elements.push("destroyable_cloner")
    cloner_elements.forEach(element => {
        if (elements[element].ignore == null)
            elements[element].ignore = []
        elements[element].ignore.push("fine_tuned_cloner")
    }) // add the new cloner into the ignore list of the cloners
}
setTimeout(update_ignore_list, 2000) // i hate the way of doing this, but it's pretty much the only way to make this work...

// check if position has no pixel, if yes, create a new pixel at this position
const try_place = (element, x, y) => {
    let succeeded = checkForEmptyPixels(x, y)
    if (succeeded)
        createPixel(element, x, y)
    return succeeded
}

let FTC_cloning_frequency = null // store cloning frequency
let FTC_blacklist = null
elements.fine_tuned_cloner = {
    color: "#dddd00",
    behavior: behaviors.WALL,
    category: "machines",
    state: "solid",
    darkText: true,

    onSelect: _ => {
        let cloning_frequency = prompt("Cloning frequency (how often the cloner clones, 1 being always, 0 being never, can be decimal):")
        if (isFloat.test(cloning_frequency)) // make sure the user isn't putting something non-numeric
            cloning_frequency = parseFloat(cloning_frequency)
        else {
            alert("Cloning frequency is not a number. Try again.")
            selectElement("unknown")
            return
        }
        if (!(0 <= cloning_frequency && cloning_frequency <= 1)) { // if not 0-1
            alert("Cloning frequency is not between 0 and 1. Try again.")
            selectElement("unknown")
            return
        }
        FTC_cloning_frequency = cloning_frequency

        let blacklist = prompt("Element blacklist (element IDs that the cloner cannot clone, seperated by commas, no trailing commas, leave empty if no blacklist):")
        if (isIDList.test(blacklist))
            blacklist = blacklist.split(",") // split blacklist by comma, to make a list of IDs
        else if (blacklist === "") // if empty, empty blacklist list
            blacklist = []
        else {
            alert("Invalid blacklist. Try again.")
            selectElement("unknown")
            return
        }
        FTC_blacklist = blacklist
    },

    tick: pixel => {
        if (pixel.element === "fine_tuned_cloner") {
            if (pixel.FTC_element == null) {
                // assign FTC variables if not done already
                if (pixel.FTC_cloning_frequency == null)
                    pixel.FTC_cloning_frequency = FTC_cloning_frequency
                if (pixel.FTC_blacklist == null)
                    pixel.FTC_blacklist = FTC_blacklist

                let neighbors = getNeighbors(pixel)
                if (neighbors.length > 0) { // if there's neighbors
                    neighbors.forEach(neighbor => {
                        // make sure it's not a cloner element nor a blacklist element
                        if ((!cloner_elements.includes(neighbor.element)) && (!pixel.FTC_blacklist.includes(elements[neighbor.element].id))) {
                            pixel.FTC_element = neighbor.element // set clone element
                        }
                    })
                }
            }

            if (Math.random() < pixel.FTC_cloning_frequency && pixel.FTC_element != null) { // if cloner already has its cloning element, and it's ready to clone:
                if (!try_place(pixel.FTC_element, pixel.x, pixel.y - 1)) // try above
                if (!try_place(pixel.FTC_element, pixel.x - 1, pixel.y)) // try at the left
                if (!try_place(pixel.FTC_element, pixel.x + 1, pixel.y)) // try at the right
                if (!try_place(pixel.FTC_element, pixel.x, pixel.y + 1)) // try under
                    ; // pass, spots are already taken :p
            }
        }
    },
};
