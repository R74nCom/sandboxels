let precisionDrawing = false
//mod made by feeshmaster

//try out debugRework.js or any other mods made by me!
document.addEventListener("keydown", (e) => {
  if (e.key == "w" && precisionDrawing) {
    mousePos.y -= 1
  } else if (e.key == "a" && precisionDrawing) {
    mousePos.x -= 1
  } else if (e.key == "s" && precisionDrawing) {
    mousePos.y += 1
  } else if (e.key == "d" && precisionDrawing) {
    mousePos.x += 1
  } else if (event.key === 'X' && event.shiftKey) {
    console.log("precisionMode deactivated!")
    precisionDrawing = !precisionDrawing
    if (!precisionDrawing) {
      mousePos = {x: "not", y: "updated"}
    }
  }
})

setTimeout(setUpOnStart, 1000)
function setUpOnStart() {

  getMousePos = (canvas, evt) => {
      if (precisionDrawing) {
        return mousePos;
      }
      // If evt.touches is defined, use the first touch
      if (evt.touches) {
          evt.preventDefault();
          evt = evt.touches[0];
          isMobile = true;
      }
      var rect = canvas.getBoundingClientRect();
      return {
          // Round to nearest pixel
      x: Math.round((evt.clientX - rect.left)/pixelSize-0.5),
      y: Math.round((evt.clientY - rect.top)/pixelSize-0.5)
      };
  }

let controlsTable = document.getElementById("controlsTable");
let row1 = document.createElement("tr");
row1.innerHTML = `<td colspan="2" style="text-align:center"><strong>Mod controls</strong></td>`;
let row2 = document.createElement("tr");
row2.innerHTML = `<td>start precision</td><td><kbd>Shift + X</kbd> or <kbd>toggle button(not released)</kbd></td>`;
let row3 = document.createElement("tr");
row3.innerHTML = `<td>move in precision</td><td><kbd>W, A, S, D/arrows</kbd> or <kbd>buttons(not released)</kbd></td>`;

  // Append the rows
  controlsTable.appendChild(row1);
  controlsTable.appendChild(row2);
  controlsTable.appendChild(row3);


}
