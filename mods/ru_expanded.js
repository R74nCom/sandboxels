// Based off cs_expanded

// Made by Kopalecek (also known as davistudios or sylas) and Bufka2011

const reqCode = 'ru' // Change this to the lang code you want.

const menu = { // Just change the values in this.
	pauseButton: 'Пауза',
	resetButton: 'Сброс',
	replaceButton: 'Замена',
	elemSelectButton: 'Э',
	tpsButton: 'TPS',
	infoButton: 'Инфо',
	savesButton: 'Сохранения',
	modsButton: 'Моды',
	settingsButton: 'Настройки',
	changelogButton: 'Чейнджлог',
}


if (langCode == reqCode) {
	Object.keys(menu).forEach(key => {
		document.getElementById(key).textContent = menu[key]
	})
}
