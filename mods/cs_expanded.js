// Made by Kopalecek (also known as davistudios or sylas)

/* 

If you would want to use this to make stuff like de_expanded.js, just put "Based off cs_expanded" in a comment at the top. And remove the previous comments in general.

Ryan, if you see this, it would be great if you add ids for stuff like controls, the "Sandboxels Introduction" or menu items in like settings or mods.

*/

const reqCode = 'cs' // Change this to the lang code you want.

const menu = { // Just change the values in this.
	pauseButton: 'Pauza',
	resetButton: 'Reset',
	replaceButton: 'Nahradit',
	elemSelectButton: 'VE',
	tpsButton: 'TZS',
	infoButton: 'Info',
	savesButton: 'Uložené',
	modsButton: 'Módy',
	settingsButton: 'Nastavení',
	changelogButton: 'Změny',
}


if (langCode == reqCode) {
	Object.keys(menu).forEach(key => {
		document.getElementById(key).textContent = menu[key]
	})
}