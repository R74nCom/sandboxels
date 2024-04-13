// made by SquareScreamYT/sqec

let finalEraseElement = null;
elements.element_eraser = {
    color: "#eeeeee",
    onSelect: function() {
        var answer = prompt("Please input the element you wish to delete. It will not work if you enter multiple element types while paused.",(finalEraseElement||undefined));
        if (!answer) { return }
        finalEraseElement = mostSimilarElement(answer);
    },
    tool: function(pixel) {
        if (pixel.element === finalEraseElement) {
            deletePixel(pixel.x,pixel.y)
        }
    },
    category: "tools",
    excludeRandom: true,
    desc: "Use on pixels to delete specified element."
}
let finalEraseElement2 = null;
elements.exclusive_element_eraser = {
    color: "#eeeeee",
    onSelect: function() {
        var answer = prompt("Please input the element you do not wish to delete. It will not work if you enter multiple element types while paused.",(finalEraseElement2||undefined));
        if (!answer2) { return }
        finalEraseElement2 = mostSimilarElement(answer2);
    },
    tool: function(pixel) {
        if (pixel.element != finalEraseElement2) {
            deletePixel(pixel.x,pixel.y)
        }
    },
    category: "tools",
    excludeRandom: true,
    desc: "Use on pixels to delete any element except the specified element."
}
