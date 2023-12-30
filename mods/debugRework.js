let cssForDebug = `
#debugParent {
  display: none;
}

#debugXButton {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 2em;
    background-color: rgb(100, 33, 33);
    padding:5px;
    text-align:center;
    border: 1px solid #ffffff;
    z-index: 12;
}
#debugXButton:hover {
    background-color: rgb(200, 33, 33);
}

#debugMenuTitle {
    position: absolute;
    left: 175px;
    font-size: 1.5em;
    text-decoration: underline;
    color: white;
}
#debugStats {
    margin-top: 5px;
    line-height: 1.5em;
    color: white;
}

#debugLiveButton {
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 2em;
    background-color: rgb(100, 33, 33);
    padding:5px;
    text-align:center;
    border: 1px solid #ffffff;
    z-index: 12;
}



#debugLiveButton.live {
  background-color: #24fc03;
}

#debugLiveButton.live:hover {
  background-color: #50ff36;
}

#debugStatList {
    position: absolute;
    border: 1px solid #ffffff;
    left: 50%;
    top: 5%;
    transform: translate(-50%, 0%);
    width: 95%;
    height: 50%;
    max-width: 700px;
    padding: 10px;
    background-color: rgb(31, 31, 31);
    overflow-x: hidden;
    z-index: 10;
}
`,
  head = document.head || document.getElementsByTagName('head')[0],
  style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = cssForDebug;
} else {
  style.appendChild(document.createTextNode(cssForDebug));
};
let debugMenu = document.createElement("div");
debugMenu.innerHTML = `
  <div id="debugParent" style="display: none;">
    <div id="debugStatList">
      <button id="debugXButton" onclick="closeDebugUi()">X</button>
      <button id="debugLiveButton" onclick="startDebugLive()">Live</button>
      <span id="debugMenuTitle">
        Debug Stats
      </span>
      <br><br>
      <div id="debugStats">
      No stats currently
      </div>
    </div>
  </div>`
document.getElementById("gameDiv").appendChild(debugMenu);
var statChangeInterval;
let live = false;
let openedByClick = true;
let debugToggle = false;
var output;
var targetedPixel;
elements.debug = {
  color: ["#b150d4", "#d1b74f"],
  tool: function(pixel) {
    startDebugUi(pixel);
  },
  maxSize: 1,
  category: "tools"
}

function startDebugUi(pixel) {
  if (debugToggle) return;
  targetedPixel = pixel;
  mouseIsDown = false;
  shiftDown = false;
  output = targetedPixel.element.toUpperCase() + " at x" + targetedPixel.x + ", y" + targetedPixel.y + ", tick: " + pixelTicks + `<br>`;
  for (let i in targetedPixel) {
    if (i !== "x" && i !== "y" && i !== "element") {
      output += "  " + i + ": " + targetedPixel[i] + `<br>`;
    }
  }
  statChangeInterval = setInterval(statChange, 1000/tps);
  document.getElementById("debugParent").style.display = "block";
  document.getElementById("debugStats").innerHTML = output;
  debugToggle = true;

  setTimeout(() => {
    openedByClick = false;
    document.addEventListener('click', clickHandler);
  }, 1000);
};

function closeDebugUi() {
  if (!debugToggle) return;
  openedByClick = true;
  document.getElementById("debugParent").style.display = "none";
  debugToggle = false;
  document.removeEventListener('click', clickHandler);
  clearInterval(statChangeInterval);
}

function clickHandler(event) {
  const modParent = document.getElementById("debugParent");

  if (event.target !== modParent && !modParent.contains(event.target)) {
    closeDebugUi();
  }
}

function startDebugLive() {
  live = !live;

  document.getElementById("debugLiveButton").classList.toggle("live");

}
function statChange() {
  if (live == true) {
    output = targetedPixel.element.toUpperCase() + " at x" + targetedPixel.x + ", y" + targetedPixel.y + ", tick: " + pixelTicks + `<br>`;
    for (let i in targetedPixel) {
      if (i !== "x" && i !== "y" && i !== "element") {
        output += "  " + i + ": " + targetedPixel[i] + `<br>`;
      }
    }
    document.getElementById("debugStats").innerHTML = output;
  }
}

