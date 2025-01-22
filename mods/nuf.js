//Help me find bugs in my code, ok? I am just doing another test
elements.sand.name = "EEEEEEEEEEE_pick up my ass c0ck loldoewockecooffdsvifsjvjfso";
elements.sand.behavior = behaviors.WALL;

elements.water.name = "NEWater";
elements.water.behavior = behaviors.POWDER;

elements.unknown.name = "Player_456";
elements.unknown.behavior = behaviors.POWDER;

elements.dirty_water.name = "Water";
elements.dirty_water.behavior = behaviors.WALL;

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
            pixel.element = "explosion"
        },
      buttonGlow: "#00d5ff"
    },
};

elements.sell = {
    color: ["#fff0b5","#ffe680","#c48821","#986a1a","#eca832","#f0bb62"],
    tool: function(pixel) {
            pixel.element = "gold_coin",
        },
    category: "tools",
    desc: "Sells item in exchange for high-quality Gold Coins",
};

elements.dark_web_sell = {
    color: ["#f7adda","#ff80f2","#c421a3","#981a92","#ec32e3","#f062f0"],
    tool: function(pixel) {
          pixel.element = "diamond",
       },
    category: "tools",
    desc: "Sells item in exchange for high-quality Gravitite"
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\vvhy am i doing this idk
