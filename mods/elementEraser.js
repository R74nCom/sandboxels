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
    desc: "Input a element to erase only that element."
}
