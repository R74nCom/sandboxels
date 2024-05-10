if (!settings.texturepack){
    settings.texturepack = {}
    saveSettings()
}
elements.clear_textures = {
    color: "#dd0000",
    onSelect: function(){
        var sure = prompt("Are you sure you wanna reset all texture data? Type \"yes\". Also, refresh once you've done this for the changes to apply!", "no");
        if (sure == "yes"){
            settings.texturepack = {}
            saveSettings()
        }
    },
    canPlace: false,
    category: "texture tools"
}
var addSave = null
elements.add_texture = {
    color: elements.rainbow.color,
    category: "texture tools",
    canPlace: false,
    onSelect: function(){
        var whoelement = prompt("What element would you like to change the texture of? Type no if this was a mistake.", (addSave||"no"))
        if (whoelement != "no"){
            addSave = whoelement
            var replacehm = prompt("Would you like to overwrite all textures or add? 1 for overwrite, 2 for add.", 2)
            var colortodo = prompt("Hex code, please! Also, refresh once you've done this for the changes to apply!", "#ff0000")
            if (replacehm == 1){
                if (!replacehm || !colortodo){return}
                if (!settings.texturepack[whoelement]){settings.texturepack[whoelement] = []}
                settings.texturepack[whoelement] = [colortodo]
                elements[whoelement].color = settings.texturepack[whoelement]
                saveSettings()
            } else {
                if (!replacehm || !colortodo){return}
                if (!settings.texturepack[whoelement]){settings.texturepack[whoelement] = []}
                settings.texturepack[whoelement].push(colortodo)
                elements[whoelement].color = settings.texturepack[whoelement]
                saveSettings()
            }
        }
    }
}
elements.remove_a_texture = {
    color: elements.void.color,
    category: "texture tools",
    canPlace: false,
    onSelect: function(){
        var whoelement = prompt("What element would you like to change the texture of? Type no if this was a mistake.", "no")
        if (whoelement != "no"){
            var replacehm = prompt("Would you like to delete all textures of the element or just one? Type 1 for all, 2 for just one.", 2)
            var colortodo = prompt(("Ignore this if you chose 1. Index of the color you wanna delete. For reference, here are the current colors:" + settings.texturepack[whoelement]), 0)
            if (replacehm == 1){
                delete settings.texturepack[whoelement]
                saveSettings()
            } else {
                delete settings.texturepack[whoelement][colortodo]
                elements[whoelement].color = settings.texturepack[whoelement]
                saveSettings()
            }
        }
    }
}
elements.list_all_textures = {
    color: elements.mix.color,
    category: "texture tools",
    canPlace: false,
    onSelect: function(){
        var whoelement = prompt("What element would you like to see the textures of?")
        alert(whoelement + " has the following textures: " + settings.texturepack[whoelement])
    }
}
elements.texture_pack_share_or_load = {
    color: elements.image.color,
    category: "texture tools",
    canPlace: false,
    onSelect: function(){
        var whichSL = prompt("Would you like to copy the texture pack to your clipboard or load it from your clipboard? Type 1 for copy, 2 for load.", 1)
        if (whichSL == 1){
            var text = JSON.stringify(settings.texturepack)
            alert(text)
        } else {
            var text = prompt("Paste your texture pack here. It should be in the format of a JSON object.")
            if (text){
            settings.texturepack = JSON.parse(text)
            saveSettings()
            }
        }
    }
}
if (settings.texturepack){
for (var elementi in settings.texturepack){
    elements[elementi].color = settings.texturepack[elementi]
}}