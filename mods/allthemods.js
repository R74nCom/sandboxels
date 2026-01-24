var mods_to_include = ["mods/glow.js", "mods/circuitcore.js", "mods/clone_liquid.js", "mods/colored_lightbulbs.js", "mods/combustion.js", "mods/conveyance.js", "mods/coresbyp.js", "mods/datawire.js", "mods/drill.js", "mods/ExtraMachines.js", "mods/fans.js", "mods/fine_tuned_cloner.js", "mods/flipflop.js", "mods/fueled_generators.js", "mods/gameOfLife.js", "mods/heatshield.js", "mods/human_friendly_design.js", "mods/industry.js", "mods/logicgates.js", "mods/note_block_advanced.js", "mods/note_block.js", "mods/nousersthings.js", "mods/portal.js", "mods/pullers.js", "mods/pushers.js", "mods/sandboxels.js", "mods/schematics.js", "mods/scp.js", "mods/spouts.js", "mods/state_voids.js", "mods/switches.js", "mods/thiquovite.js", "mods/ticking_temp_stuff.js", "mods/video.js", "mods/waterspout.js", "mods/WhisperingTheory.js", "mods/wifi_draw.js", "mods/aircrafts.js", "mods/c_fighter_jet.js", "mods/guided_rocket.js", "mods/icb.js", "mods/life_eater.js", "mods/liquid_void.js", "mods/meat_rockets.js", "mods/more_breaking.js", "mods/rays.js", "mods/rays++.js", "mods/scp.js", "mods/subspace.js", "mods/war_crimes.js", "mods/weapons.js", "mods/aChefsDream_beta.js", "mods/aChefsDream.js", "mods/aChefsDream2.js", "mods/bananas.js", "mods/CherrySoda.js", "mods/community_desserts.js", "mods/devsnacks.js", "mods/GrapeSoda.js", "mods/greenitemsandmore.js", "mods/ketchup_mod.js", "mods/lemonade.js", "mods/morefoodsmod.js", "mods/mossstuff.js", "mods/mustard.js", "mods/potato_chips.js", "mods/sbstuff.js", "mods/soups.js", "mods/weAllScreamFor.js", "mods/apioforms_pre.js", "mods/baby.js", "mods/bacteria_mod.js", "mods/bananas.js", "mods/biology.js", "mods/cat.js", "mods/cells.js", "mods/children.js", "mods/coldblooded.js", "mods/colonies.js", "mods/crimson.js", "mods/dogs.js", "mods/eklegems.js", "mods/fairy_chain.js", "mods/fantastic_creatures.js", "mods/fantasy_elements.js", "mods/fey_and_more.js", "mods/fishin.js", "mods/flowers_and_forests.js", "mods/fwibblen.js", "mods/genetics.js", "mods/human_edit.js", "mods/kopalstuff.js", "mods/lizard_mod.js", "mods/lost_souls.js", "mods/miscible_psoup_and_birthpool.js", "mods/mobs.js", "mods/moretrees.js", "mods/no_blood.js", "mods/nocancer.js", "mods/nocancer2.js", "mods/nograssgrow.js", "mods/ocean.js", "mods/ores.js", "mods/petal_dye.js", "mods/plants.js", "mods/primordial_birthpool.js", "mods/scp.js", "mods/spring.js", "mods/the_ground_og.js", "mods/toothpaste.js", "mods/volcanic_expansion.js", "mods/alcohol.js","mods/alkahest.js","mods/alkali_metal.js","mods/bettermetalscrap.js","mods/boiling_things.js","mods/bouncing_balls.js","mods/chalk.js","mods/chem.js","mods/grav_mudstones.js","mods/halogen.js","mods/liquid_mixing.js","mods/lye.js","mods/metals.js","mods/mixture.js","mods/moreliquids.js", "mods/PRNGworldgenlib.js"	



]

var mods_included = mods_to_include.map(mod => enabledMods.includes(mod));
var all_mods_included = mods_included.reduce(function(a,b) { return a && b });

if(!all_mods_included) {
    var mods_needed = mods_to_include.filter(function(modPath) { return !(enabledMods.includes(modPath)) });

    mods_needed.forEach(function(modPath) {
		enabledMods.splice(enabledMods.indexOf("mods/allthemods"),0,modPath);
	});
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
	alert(`The following mods have been inserted: ${mods_needed.join(", ")}
Reload the page for the mods to take effect.`)
}

