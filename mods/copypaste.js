//agni2012.github.io/copypaste.js
//Typed in the allmigty dvorak layout
//Some helper functions coded by AI
// Extracts a rectangular matrix from (x, y) with width w and height h

function pluckMatrix(x, y, w, h) {
  var result = [];
  for (var j = 0; j < h; j++) {
    var row = [];
    for (var i = 0; i < w; i++) {
      var px = pixelMap[x + i]?.[y + j];
      if (px) {
        row.push({ element: px.element, temp: px.temp, color: px.color, clone: px?.clone });
      } else {
        row.push("#");
      }
    }
    result.push(row);
  }
  return result;
}

var copyOnce = false;
var pasteOnce = false;

// Tool definitions
elements.copy = {
  name: "copy to clipboard",
  color: ["#f5c211"],
  tool: function(pixel) {},
  category: "tools",
  excludeRandom: true,
};

elements.paste = {
  name: "paste from clipboard",
  color: ["#813d9c"],
  tool: function(pixel) {},
  category: "tools",
  excludeRandom: true,
};

document.addEventListener("mousedown", (event) => {
  if(!mouseIsDown) return; //sandboxels
  if (event.button !== 0) return;  // only left‐click
  var x = mousePos.x, y = mousePos.y;
  var size = mouseSize || 1;

  // COPY
  if (currentElement === "copy" && !copyOnce) {
  
    copyOnce = true;
    var matrix = pluckMatrix(x - (size-1)/2, y - (size-1)/2, size, size);
    var payload = JSON.stringify({ matrix, x, y });
    navigator.clipboard.writeText(payload)
      .then(() => logMessage("Copied " + size + "×" + size))
      .catch(e => console.error("Copy failed:", e));
  }

  // PASTE
  if (currentElement === "paste" && !pasteOnce) {
    pasteOnce = true;
    navigator.clipboard.readText()
      .then(text => {
        var data = JSON.parse(text);
        var matrix = data.matrix;
        for (var j = 0; j < matrix.length; j++) {
          for (var i = 0; i < matrix[j].length; i++) {

			console.log("→ Drawing", cell?.element, "at", x+i, y+j);
            var cell = matrix[j][i];
            if (cell !== "#" && cell.element) {
            
              var px = createPixel(cell.element, x + i - (size-1)/2, y + j - (size-1)/2);
              var px2 = pixelMap[x + i - (size-1)/2][y + j - (size-1)/2];
              if (px2) {
                px2.temp = cell.temp;
                px2.clone = cell.clone;
                px2.color = cell.color;
              }
            }
          }
        }
        
        logMessage("Pasted Successfully");
        



      })
      .catch(e => console.error("Paste failed:", e));
  }
});

document.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    copyOnce = false;
    pasteOnce = false;
  }
});
