// Extra Element Info, v1.1
// Author: MelecieDiancie

/*
=== CHANGELOG ===
1.1 Version
- Removed code for extra element info, due to its addition to vanilla. It still exists as a comment if you want to check it out.

1.0 Version
+ Initial release
*/

/*

showInfo = (function() {
    var cached_function = showInfo;

    return function() {
        // your code

        var result = cached_function.apply(this, arguments); // use .apply() to call it
			if (info.extraInfo != undefined) { infoText.innerHTML += "\n\n" + info.extraInfo; }
        return result;
    };
})();

*/

// Everything down below is adding info to vanilla elements

elements.random.extraInfo = "Produces random pixels.";
elements.pick.extraInfo = "Picks a selected pixel. Works with hidden elements as well.";
elements.mix.extraInfo = "Mixes pixels in the selection box.";
elements.lookup.extraInfo = "Brings up the info screen of a selected pixel.";
elements.shock.extraInfo = "Produces electricity on all pixels in the selection box that can conduct it.";
elements.uncharge.extraInfo = "Removes electricity on all pixels in the selection box with electricity.";
elements.smash.extraInfo = "Crushes all elements in the selection box as if they were destroyed by an explosion.";
elements.cook.extraInfo = "Slowly heats up elements.";
elements.heat.extraInfo = "Heats up elements.";
elements.cool.extraInfo = "Cools down elements.";

elements.bamboo_plant.extraInfo = "Plants a bamboo plant of variable height.";
elements.sapling.extraInfo = "Plants a tree of variable height and structure.";
elements.grass_seed.extraInfo = "Plants grass of variable height.";
elements.wheat_seed.extraInfo = "Plants wheat of variable height.";
elements.flower_seed.extraInfo = "Plants a flower of variable height.";
elements.vine.extraInfo = "Holds onto a surface and grows downwards.";
elements.mushroom_spore.extraInfo = "Plants a mushroom of variable height and structure.";
elements.corn_seed.extraInfo = "Plants corn of variable height.";
elements.potato_seed.extraInfo = "Digs through dirt and creates potatoes.";
elements.grass_seed.extraInfo = "Plants grass of variable height.";
elements.electric.extraInfo = "Produces a brief electrical spark.";
elements.neon.extraInfo = "Glows when powered.";
elements.led_r.extraInfo = "Lights up when powered.";
elements.led_g.extraInfo = "Lights up when powered.";
elements.led_b.extraInfo = "Lights up when powered.";
elements.ecloner.extraInfo = "Clones the first pixel that touches it when powered.";
elements.cloner.extraInfo = "Clones the first pixel that touches it.";
elements.slow_cloner.extraInfo = "Clones the first pixel that touches it.";
elements.clone_powder.extraInfo = "Clones the first pixel that touches it.";
elements.floating_cloner.extraInfo = "Clones the first pixel that touches it.";
elements.filler.extraInfo = "Fills the entire screen orthogonally.";
elements.lattice.extraInfo = "Fills the entire screen diagonally.";
elements.battery.extraInfo = "Produces electricity.";
elements.antipowder.extraInfo = "Moves in reverse.";
elements.antifluid.extraInfo = "Moves in reverse.";
elements.antimolten.extraInfo = "Moves in reverse.";
elements.antifire.extraInfo = "Moves in reverse.";
elements.antigas.extraInfo = "Moves in reverse.";
elements.static.extraInfo = "Flickers in grayscale.";
elements.gray_goo.extraInfo = "Duplicates itself when touching other pixels.";
elements.virus.extraInfo = "Duplicates itself when touching other pixels.";
elements.snake.extraInfo = "Goes around in a snake-like pattern.";
elements.shocker.extraInfo = "Produces sparks when powered.";
elements.pressure_plate.extraInfo = "Produces electricity when something is above it.";
elements.light_bulb.extraInfo = "Produces light when powered.";
elements.tesla_coil.extraInfo = "Produces plasma when powered.";
elements.border.extraInfo = "Produces a border effect.";
