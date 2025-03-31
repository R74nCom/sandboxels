function add_lang(langcode) {
  for (element in elements) {
    if (elements[element]["name_"+langcode]) {
      lang[element] = elements[element]["name_"+langcode];
    }
  }
}

/*
INSTRUCTIONS

put this code at the top of your mod:
set langcode to whatever language code (zh_cn is simplified chinese)



langcode = "zh_cn"

var mods_to_include = ["mods/modlangs.js"]

var mods_included = mods_to_include.map(mod => enabledMods.includes(mod));
var all_mods_included = mods_included.reduce(function(a,b) { return a && b });

if(!all_mods_included) {
    var mods_needed = mods_to_include.filter(function(modPath) { return !(enabledMods.includes(modPath)) });

    mods_needed.forEach(function(modPath) {
		enabledMods.splice(enabledMods.indexOf("mods/modlangs"),0,modPath);
	});
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
}

runAfterLoad(function() {
    add_lang(langcode)
})



then you can add the name_ + langcode to your element like this:

elements.eat = {
    color: ["#ffba79","#efff79"],
    tool: function(pixel) {
        if (elements[pixel.element].isFood || elements[pixel.element].category === "food" || eLists.JUICEMIXABLE.includes(pixel.element) || elements[pixel.element].id === elements.uranium.id || elements[pixel.element].id === elements.mercury.id) {
            deletePixel(pixel.x, pixel.y);
        }
    },
    category: "tools",
    desc: "Eats pixels.",
    name_zh_cn: "吃"
}

*/
