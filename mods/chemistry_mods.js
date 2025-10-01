var mods_to_include = ["mods/alcohol.js","mods/alkahest.js","mods/alkali_metal.js","mods/aScientistsWish.js","mods/bettermetalscrap.js","mods/bigger_star_spawners.js","mods/biology.js","mods/boiling_things.js","mods/bioooze_and_pyrogens.js", "mods/bouncing_balls.js","mods/chalcopyrite.js","mods/chalk.js","mods/charsonsmoduno.js","mods/chem.js","mods/clf3.js","mods/cmur.js","mods/debrisable.js", "mods/fire_extinguisher.js","mods/fire_mod.js","mods/fire_slime.js","mods/Gemstones.js","mods/glenn_gases.js","mods/grav_mudstones.js","mods/halogen.js","mods/iocalfaeus_clones.js","mods/jaydstuff.js", "mods/laetium.js","mods/liquid_energy.js","mods/liquid_mixing.js","mods/lye.js","mods/mars.js","mods/metals.js","mods/mixture.js","mods/more_gold.js","mods/morechemistry.js", "mods/moreliquids.js","mods/neutronium_compressor.js","mods/noblegas.js","mods/nousersthings.js","mods/petal_dye.js","mods/radioactive.js","mods/roseyiede.js","mods/some_tf_liquids.js","mods/stickystuff.js", "mods/the_ground.js"]

var mods_included = mods_to_include.map(mod => enabledMods.includes(mod));
var all_mods_included = mods_included.reduce(function(a,b) { return a && b });

if(!all_mods_included) {
    var mods_needed = mods_to_include.filter(function(modPath) { return !(enabledMods.includes(modPath)) });

    mods_needed.forEach(function(modPath) {
		enabledMods.splice(enabledMods.indexOf("mods/chemistry_mods"),0,modPath);
	});
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The following mods have been inserted: ${mods_needed.join(", ")}
Reload the page for the mods to take effect. Happy chemistry!`)
}
