//Help me find bugs in my code, ok? I am just doing another test
//UPDATE: Fixed Javascript
elements.sand.name = "Man_Testicle";
elements.sand.behavior = behaviors.POWDER_OLD;
elements.wet_sand.name = "Spermy_Testicle";
elements.packed_sand.name = "Useless_Testicle";
elements.water.name = "NEWater";
elements.water.behavior = behaviors.LIQUID_OLD;
elements.unknown.name = "Player_456";
elements.unknown.behavior = behaviors.POWDER;
elements.dirty_water.name = "Water";
elements.dirty_water.behavior = behaviors.MOLTEN;
elements.paint.name = "Gibberish_Typer";
elements.paint.behavior = behaviors.LIQUID;
elements.primordial_soup.name = "annoying_space"; 
elements.primordial_soup.behavior = behaviors.WALL;
//I want to make this a real element soon
elements.diamond.name = "Gravitite";
elements.diamond.behavior = behaviors.AGPOWDER;
elements.diamond.color = ["#f7adda","#ff80f2","#c421a3","#981a92","#ec32e3","#f062f0"];
elements.permafrost.name = "Frozen_testicle";
//why did I make this - Fivey1777
elements.mudstone.name = "Testicle";
elements.molten_dirt.name = "Molten_testicle";
elements.stained_glass.name = "Wisp_3";
elements.glass.name = "Wisp_1";
elements.rad_glass.name = "Wisp_2";
elements.molten_stained_glass.name = "Wisp_3";
elements.molten_glass.name = "Wisp_1";
elements.molten_rad_glass.name = "Wisp_2";
elements.dirt.name = "Jiggly_ball";
elements.mud.name = "Wet_ball";
elements.rock.name = "Gabbro";
elements.rock_wall.name = "Gabbro_wall";
elements.rime.name = "Ice_extension";
elements.steam.name = "NEWSteam";
elements.erase.name = "Pick_up";
elements.sand_exploder = {
    color: "#e6d577",
    category: "tools",
    tool: function(pixel) {
        if (pixel.element == "sand") {
            pixel.element = "explosion";
      }
   }
};
elements.sell = {
    color: ["#fff0b5","#ffe680","#c48821","#986a1a","#eca832","#f0bb62"],
        category: "tools",
        desc: "Sells item in exchange for high-quality Gold Coins",
    tool: function(pixel) {
            pixel.element = "gold_coin";
            }
};
elements.dark_web_sell = {
    color: ["#f7adda","#ff80f2","#c421a3","#981a92","#ec32e3","#f062f0"],
    tool: function(pixel) {
          pixel.element = "diamond";
       },
    category: "tools",
    desc: "Sells item in exchange for high-quality Gravitite"
};
elements.buy = elements.bless;
elements.tomato_sauce = elements.blood;
elements.electron = elements.electric;
elements.protium = elements.hydrogen;
elements.neutrino = elements.neutron;
elements.up_quark_up_quark_up_quark = elements.warp;
elements.up_quark_up_quark_down_quark = elements.proton;
elements.up_quark_down_quark_down_quark = elements.neutron;
elements.down_quark_down_quark_down_quark = elements.warp;
elements.strange_quark = elements.strange_matter;
elements.antiquark = elements.antimatter;
elements.charm_quark = elements.porcelain_shard;
elements.top_quark = elements.porcelain_shard;
elements.bottom_quark = elements.porcelain_shard;
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\vvhy am i doing this idk #1a24bc
