enabledMods.includes("mods/libpacman-v1.js") || (enabledMods.push("mods/libpacman-v1.js"), localStorage.setItem("enabledMods", JSON.stringify(enabledMods)), location.reload());

let realTps = 0;
let lastTps = 0;
window.addEventListener("load", ()=>{
  requireMods(["mods/libhooktick.js"], () => {
    beforeEveryTick(()=>{
      lastTps++;
    });
    setInterval(()=>{
      realTps = lastTps;
      lastTps = 0;
    }, 1000);
  });
});
function updateStatsNew() {
	var statsDiv = document.getElementById("stats");
	var stats = "<span id='stat-pos' class='stat'>x" + mousePos.x + ",y" + mousePos.y + "</span>";
	stats += "<span id='stat-pixels' class='stat'>Pxls:" + currentPixels.length + "</span>";
	stats += "<span id='stat-tps' class='stat'>" + tps + " set tps</span>";
  stats += "<span id='stat-realtps' class='stat'>" + realTps + "tps</span>";
	stats += "<span id='stat-ticks' class='stat'>" + pixelTicks + "</span>";
	if (typeof pixelMap == 'undefined') {
		return;
	}
	if (pixelMap[mousePos.x] != undefined) {
		var currentPixel = pixelMap[mousePos.x][mousePos.y];
		if (currentPixel != undefined) {
			stats += "<span id='stat-element' class='stat'>Elem:" + (elements[currentPixel.element].name || currentPixel.element).toUpperCase() + "</span>";
			stats += "<span id='stat-temperature' class='stat'>Temp:" + formatTemp(currentPixel.temp) + "</span>";
			if (currentPixel.charge) {
				stats += "<span id='stat-charge' class='stat'>C" + currentPixel.charge + "</span>";
			}
			if (currentPixel.burning) {
				stats += "<span id='stat-burning' class='stat'>Burning</span>";
			}
		}
	}
	if (shiftDown) {
		if (shiftDown == 1) {
			stats += "<span id='stat-shift' class='stat'>[↑ ]</span>";
		} else if (shiftDown == 2) {
			stats += "<span id='stat-shift' class='stat'>[A ]</span>";
		} else if (shiftDown == 3) {
			stats += "<span id='stat-shift' class='stat'>[ ↑]</span>";
		} else if (shiftDown == 4) {
			stats += "<span id='stat-shift' class='stat'>[ A]</span>";
		}
	}
	// If the view is not null, show the view in all caps
	if (view != null) {
		stats += "<span id='stat-view' class='stat'>" + viewKey[view].toUpperCase() + "</span>";
	}
	statsDiv.innerHTML = stats;
}
updateStats = updateStatsNew;
