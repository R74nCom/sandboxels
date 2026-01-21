// Huge WIP
// Will be making an actual UI for this soon
let currentMusic;
/**
 * 
 * @param {string} userURL 
 */
function setBackgroundMisic(userURL) {
    if (!isValidAudioUrl(userURL)) promptText("Invalid audio url")
    else {
        const url = new URL(userURL)
        if (currentMusic && currentMusic.src === url.href) return;
        if (currentMusic) {
            currentMusic.pause();
            currentMusic.remove();
        }
        const audio = document.createElement('audio');
        audio.src = url.href;
        audio.loop = true;
        audio.volume = 0.5;
        audio.id = "bgm";
        document.body.appendChild(audio);

        currentMusic = audio;

        settings.bgMusic = url.href;
        saveSettings();
        logMessage(`Now playing: ${settings.bgMusic}`)
        return audio
    }
}

function isValidAudioUrl(inpurl) {
    try {
        const url = new URL(inpurl);
        if (!['http:', 'https:'].includes(url.protocol)) return false;
        return /\.(mp3|wav|ogg)$/i.test(url.pathname);
    } catch {
        return false;
    }
}


let music_setting;
let play;
dependOn("betterSettings.js", () => {
    const settings_tab = new SettingsTab("background_music.js")
    music_setting = new Setting("Background Music", "bgm", settingType.TEXT, false)
    play = new Setting("Play", "bgm", settingType.BOOLEAN, false)
    settings_tab.registerSettings(undefined, music_setting)
    settings_tab.registerSettings(undefined, play)
    settingsManager.registerTab(settings_tab)
})

keybinds["KeyK"] = () => {
    if (play) {
        play.value = !play.value
        clearLog()
        !play.value ? logMessage("Pause: ▶") : logMessage("Play: ⏸")
    }
}


runEveryTick(() => {
    if (!play.value) {
        currentMusic?.pause();
        return;
    }

    const url = music_setting.value;
    if (!isValidAudioUrl(url)) return;

    // Only set new music if its different
    if (!currentMusic || currentMusic.src !== new URL(url).href) {
        setBackgroundMisic(url);
    }

    currentMusic?.play()?.catch(() => {
        promptConfirm("User input needed to play music", (val) => {
            if (!val) {
                play.set(false)
                play.update()
            }
        })
    });
})
