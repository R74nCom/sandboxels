let gasBlacklist = ["pointer", "tornado"]
let gasDecaySpeed = 0.002
runAfterLoad(function(){
    runPerPixel(function(pixel){
        if (elements[pixel.element].state === "gas" && gasBlacklist.indexOf(pixel.element) == -1){
            if (Math.random() < gasDecaySpeed){
                deletePixel(pixel.x, pixel.y)
            }
        }
    })
})
dependOn("betterSettings.js", function(){
    let gasTab = new SettingsTab("Gas Decay")
    let speedSetting = new Setting("Chance for gas pixels to decay per tick. Should be between 0 and 1", "decay_chance", settingType.NUMBER, false, 0.002,)
    let ignoreSetting = new Setting("Comma seperated list of elements that should be ignored.", "decay_blacklist", settingType.TEXT, false, "pointer,tornado")
    gasTab.registerSettings("Settings", speedSetting, ignoreSetting)
    settingsManager.registerTab(gasTab)
    gasDecaySpeed = speedSetting.value;
    gasBlacklist = (ignoreSetting.value).split(",")
    speedSetting.onUpdate(function(value){
        gasDecaySpeed = value
    })
    ignoreSetting.onUpdate(function(value){
        gasBlacklist = value.split(",")
    })
    runAfterLoad(function(){
        document.getElementById("betterSettings/undefined/decay_chance").step = "0.001";
        document.getElementById("betterSettings/undefined/decay_chance").max = 1;
        document.getElementById("betterSettings/undefined/decay_chance").min = 0;
    })
})