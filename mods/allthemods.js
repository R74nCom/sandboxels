var mods_to_include = ["glow.js", "circuitcore.js", "clone_liquid.js", "colored_lightbulbs.js", "combustion.js", "conveyance.js", "coresbyp.js", "datawire.js", "drill.js", "ExtraMachines.js", "fans.js", "fine_tuned_cloner.js", "flipflop.js", "fueled_generators.js", "gameOfLife.js", "heatshield.js", "human_friendly_design.js", "industry.js", "logicgates.js", "note_block_advanced.js", "note_block.js", "nousersthings.js", "portal.js", "pullers.js", "pushers.js", "sandboxels.js", "schematics.js", "scp.js", "spouts.js", "state_voids.js", "switches.js", "thiquovite.js", "ticking_temp_stuff.js", "video.js", "waterspout.js", "WhisperingTheory.js", "wifi_draw.js", "aircrafts.js", "c_fighter_jet.js", "guided_rocket.js", "icb.js", "life_eater.js", "liquid_void.js", "meat_rockets.js", "more_breaking.js", "rays.js", "rays++.js", "scp.js", "subspace.js", "war_crimes.js", "weapons.js", "aChefsDream_beta.js", "aChefsDream.js", "aChefsDream2.js", "bananas.js", "CherrySoda.js", "community_desserts.js", "devsnacks.js", "GrapeSoda.js", "greenitemsandmore.js", "ketchup_mod.js", "lemonade.js", "morefoodsmod.js", "mossstuff.js", "mustard.js", "potato_chips.js", "sbstuff.js", "soups.js", "weAllScreamFor.js", "apioforms_pre.js", "baby.js", "bacteria_mod.js", "bananas.js", "biology.js", "cat.js", "cells.js", "children.js", "coldblooded.js", "colonies.js", "crimson.js", "dogs.js", "eklegems.js", "fairy_chain.js", "fantastic_creatures.js", "fantasy_elements.js", "fey_and_more.js", "fishin.js", "flowers_and_forests.js", "fwibblen.js", "genetics.js", "human_edit.js", "kopalstuff.js", "lizard_mod.js", "lost_souls.js", "miscible_psoup_and_birthpool.js", "mobs.js", "moretrees.js", "no_blood.js", "nocancer.js", "nocancer2.js", "nograssgrow.js", "ocean.js", "ores.js", "petal_dye.js", "plants.js", "primordial_birthpool.js", "scp.js", "spring.js", "the_ground_og.js", "toothpaste.js", "volcanic_expansion.js", "alcohol.js","alkahest.js","alkali_metal.js","bettermetalscrap.js","boiling_things.js","bouncing_balls.js","chalk.js","chem.js","grav_mudstones.js","halogen.js","liquid_mixing.js","lye.js","metals.js","mixture.js","moreliquids.js", "PRNGworldgenlib.js"	



]

var mods_included = mods_to_include.map(mod => enabledMods.includes(mod));
var all_mods_included = mods_included.reduce(function(a,b) { return a && b });

if(!all_mods_included) {
    // var mods_needed = mods_to_include.filter(function(modPath) { return !(enabledMods.includes(modPath)) });

    mods_needed.forEach(function(modName) {
		// enabledMods.splice(enabledMods.indexOf("allthemods"),0,modPath);
		dependOn(modPath, ()=>{}, true)
	});
// 	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
// 	alert(`The following mods have been inserted: ${mods_needed.join(", ")}
// Reload the page for the mods to take effect.`)
}

