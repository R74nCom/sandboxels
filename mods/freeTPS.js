function setTps() {
	let newtps = parseInt(prompt("Enter the new simulation Ticks Per Second (TPS). This is how many updates per second the simulation will run.\n\nThe default is 30.\n\nThe current TPS is " + tps + ".\n\nYou are using the freeTPS.js mod, which means you can set ludicrously high TPS, however the game can only run so fast.\nIf you would like to see your actual TPS at any moment, try betterStats.js! Also, setting your TPS too high can actually make your game run slower."));
	if (newtps !== null) {
		if (isNaN(newtps) || newtps<1) {
			alert("You did not enter a valid TPS.");
		} else {
			tps = parseInt(newtps);
			if (isNaN(tps)) {
				alert("You did not enter a valid TPS.");
				tps = 30;
			}
		}
		resetInterval(tps);
	}
	focusGame();
}
let tpsButton = document.getElementById("tpsButton");
tpsButton.removeAttribute("onclick");
tpsButton.addEventListener("click", setTps);
