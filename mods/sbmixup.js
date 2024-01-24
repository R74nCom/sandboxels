elements.air = {
    color: "#c1d4d3",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    state: "liquid",
    reactions: {
      "ocean": {elem2: "oceanair"},
      "idk": {elem2: "idk_air"},
      "wate_r": {elem2: "waterair"},
      "earth": {elem2: "dus_t"},
      "fired_earth": {elem2: "airfired_earth"},
      "waterfired_fired_earth": {elem2: "waterfired_fired_earthocean"},
      "go_drink_water": {elem2: "air_in_the_water"},
      "dusty_waterfired_fired_earthocean": {elem2: "polluted_waterfired_fired_earthocean"},
    }
};

elements.earth = {
    color: "#4f2720",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    state: "liquid",
    reactions: {
      "waterfired_fired_earth": {elem2: "earth_waterfired_fired_earth"},
      "airfired_earth": {elem2: "airfired_earth_earth"},
      "no_ocean": {elem2: "only_earth"},
      "idk_idk_idk_fired_fired_bored_earth": {elem2: "idk_idk_idk_fired_fired_bored_earth"},
    }
};

elements.fir_e = {
    color: "#ff2600",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    state: "liquid",
    reactions: {
      "earth": {elem2: "fired_earth"},
      "fired_earth": {elem2: "fired_fired_earth"},
      "airlife_fired_earth": {elem2: "airlife_fired_fired_earth"},
      "waterfired_fired_earth": {elem2: "waterfiredfired_fired_fired_earth_earth"},
      "airlife": {elem2: "bir_d"},
      "waterfired_fired_earth": {elem2: "fired_waterfired_fired_earth"},
    }
};

elements.life = {
    color: "#61db40",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    state: "liquid",
    reactions: {
      "earth": {elem2: "idk"},
      "air": {elem2: "airlife"},
      "idk_idk_fired_fired_earth": {elem2: "life_idk_idk_fired_fired_earth"},
      "waterair_void": {elem2: "did_it_disappear"},
      "i_think_it_also_disappeared": {elem2: "backrooms"},
      "its_gone": {elem2: "death"},
    }
}

elements.wate_r = {
    color: "#037bfc",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    state: "liquid",
    reactions: {
      "wate_r": {elem2: "ocean"},
      "fir_e": {elem2: "watergirl_and_fireboy"},
      "fired_fired_earth": {elem2: "waterfired_fired_earth"},
      "idk": {elem2: "nothing_water"},
      "ocean": {elem2: "water_in_the_ocean"},
      "boredom": {elem2: "go_drink_water"},
      "fired_fired_earth": {elem2: "i_always_like_to_play_with_fire"},
      "earth": {elem2: "aquaman"},
    }
};

elements.ocean = {
    hidden: true,
    color: "#206685",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    state: "liquid",
    reactions: {
      "airlife": {elem2: "oceanairlife"},
      "nothing_water": {elem2: "no_ocean"},
      "fire": {elem2: "oceanfire"},
      "ocean": {elem2: "infinite_water_lifehack"},
      "idk_air": {elem2: "a"},
      "waterair": {elem2: "ocean_waterair"},
      "idk_fired_fired_earth": {elem2: "something"},
      "oceanairlife": {elem2: "oceanoceanairlife"},
    }
}

elements.voi_d = {
    color: "#000000",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    state: "liquid",
    reactions: {
      "waterair": {elem2: "waterair_void"},
      "nothing_water": {elem2: "it_disappeared"},
      "oceanair": {elem2: "i_think_it_also_disappeared"},
      "fired_earth": {elem2: "its_gone"},
      "air": {elem2: "black_hole"},
      "airfired_earth": {elem2: "also_gone"},
    }
};

elements.idk = {
    color: "#FFFFFF",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    state: "liquid",
    hidden: true,
    reactions: {
      "life": {elem2: "boredom"},
      "fired_fired_earth": {elem2: "idk_fired_fired_earth"},
      "voi_d": {elem2: "nothing"},
      "idk_fired_fired_earth": {elem2: "idk_idk_fired_fired_earth"},
      "fir_e": {elem2: "idk_fire"},
      "idk_idk_fired_fired_bored_earth": {elem2: "idk_idk_idk_fired_fired_bored_earth"},
      "im_playing_this_in_discord": {elem2: "nothing_at_all"},
    }
};

elements.fired_earth = {
    color: ["#ff3700", "#4d2115"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "watergirl_and_fireboy": {elem2: "earthguy"},
      "oceanair": {elem2: "fired_earth_oceanair"},
      "fired_earth": {elem2: "even_more_fired_earth"},
      "airlife_fired_earth": {elem2: "airlife_even_more_fired_earth"},
    }
};

elements.fired_fired_earth = {
    color: ["#ff3700", "#ff3700", "#4d2115"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "oceanairlife": {elem2: "fired_fired_earthoceanairlife"},
      "waterair": {elem2: "we_put_out_the_fire"},
    }
};

elements.oceanair = {
    color: ["#a7bcc4", "#2b87ff"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "waterfired_fired_earth": {elem2: "i_keep_reading_watermelon_instead_of_waterfired"},
    }
};

elements.idk_air = {
    color: ["#FFFFFF", "#9fb5b3"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "airlife": {elem2: "idk_airlife"},
      "did_it_disappear": {elem2: "my_name_is_air"}
    }
};

elements.airlife = {
    color: ["#47c451", "#a7bcc4"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "fired_earth": {elem2: "airlife_fired_earth"},
      "waterair": {elem2: "avatar"},
      "fired_fired_earth": {elem2: "poop_on_the_plane"}
    }
};

elements.boredom = {
    color: "#303631",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "idk_idk_fired_fired_earth": {elem2: "idk_idk_fired_fired_bored_earth"},
      "nothing": {elem2: "im_playing_this_in_discord"},
      "infinite_water_lifehack": {elem2: "minutes_craft"},
      "we_put_out_the_fire": {elem2: "firefighter"},
    }
};

elements.waterair = {
    color: ["#9fb5b3", "#1b90de"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "watergirl_and_fireboy": {elem2: "avatar_guys"},
    }
};

elements.idk_fired_fired_earth = {
    color: ["#FFFFFF", "#ff3700", "#ff3700", "#4d2115"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.nothing = {
    color: "#000000",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.dus_t = {
    color: "#707070",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "waterfired_fired_earthocean": {elem2: "dusty_waterfired_fired_earthocean"},
      "waterair": {elem2: "dusty_waterair"},
      "airlife": {elem2: "dusty_airlife"},
    }
};

elements.watergirl_and_fireboy = {
    color: ["#29a9ff", "#ff3c00"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.idk_idk_fired_fired_earth = {
    color: ["#FFFFFF", "#FFFFFF", "#ff3700", "#ff3700", "#4d2115"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.waterfired_fired_earth = {
    color: ["#007396", "#cc5b1f", "#ff4000", "#3b1c12"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
};

elements.nothing_water = {
    color: ["#000000", "#0088ff"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "go_drink_water": {elem2: "still_no_water"},
      "it_disappeared": {elem2: "or_did_it"},
      "fired_earth": {elem2: "theres_no_water_but_theres_fired_earth"},
    }
};

elements.waterair_void = {
    color: ["#0088ff", "#a9b9c7", "#1c1c1c"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "water_in_the_ocean": {elem2: "waterphobia"},
      "drink_water_in_a_plane": {elem2: "uhm_there_is_no_water_in_the_plane"},
    }
};

elements.water_in_the_ocean = {
    color: ["#0088ff", "#206aab"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.idk_fire = {
    color: ["#FFFFFF", "#ff3300"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "watergirl_and_fireboy": {elem2: "whos_that"},
      "it_disappeared": {elem2: "maybe"},
    }
};

elements.go_drink_water = {
    color: "#bfbfbf",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "waterair_void": {elem2: "theres_no_water"},
      "idk_airlife": {elem2: "drink_water_in_a_plane"},
      "oceanair_life": {elem2: "go_drink_oceanairlife"},
    }
};

elements.life_idk_idk_fired_fired_earth = {
    color: ["#5bd642", "#FFFFFF", "#FFFFFF", "#ff3c00", "#ff3c00", "#3d1e14"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "dusty_waterfired_fired_earthocean": {elem2: "dusty_life_idk_idk_waterfired_fired_fired_fired_earthearthocean"},
    }
};

elements.airfired_earth = {
    color: ["#c2ccd1", "#ff3300", "#40190f"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.earth_waterfired_fired_earth = {
    color: ["#40190f", "#00bbff", "#ff2a00", "#ff2a00", "#471c13"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.oceanairlife = {
    color: ["#1f84a3", "#afbfc4", "#53cf40"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "waterfired_fired_earth": {elem2: "waterfired_oceanairlife_fired_earth"},
    }
};

elements.i_always_like_to_play_with_fire = {
    color: "#FFFFFF",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "waterfiredfired_fired_fired_fired_earth_earth": {elem2: "ok_this_is_getting_ridiculous"}
    }
};

elements.airlife_fired_earth = {
    color: "#cf4042",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "only_fired_earth_and_air": {elem2: "theres_more"},
    }
};

elements.idk_idk_fired_fired_bored_earth = {
    color: ["#FFFFFF", "#FFFFFF", "#ff2600", "#ff2600", "#2e2a29", "#52241c"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.avatar = {
    color: "#fcae6a",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "avatar_guys": {elem2: "clone"},
    }
};

elements.it_disappeared = {
    color: "#000000",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.avatar_guys = {
    color: ["#fcae6a", "#87674a", "#6e4a2b"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.i_think_it_also_disappeared = {
    color: "#000000",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.did_it_disappear = {
    color: "#1c1c1c",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.no_ocean = {
    color: "#22779c",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "oceanair": {elem2: "is_there_an_ocean"},
      "fired_earth_oceanair": {elem2: "only_fired_earth_and_air"},
    }
};

elements.poop_on_the_plane = {
    color: "#361c14",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "waterfired_fired_earth": {elem2: "what_the_fuck"},
    }
};

elements.earthguy = {
    color: ["#4d2f26", "#ffab5c"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "i_always_like_to_play_with_fire": {elem2: "erm_actually_hes_fireguy"},
    }
};

elements.idk_idk_idk_fired_fired_bored_earth = {
    color: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#ff3c00", "#ff3c00", "#242424", "#422922"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.theres_no_water = {
    color: "#00bfff",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.fired_earth_oceanair = {
    color: ["#ff3700", "#4d2d24", "#2085b0", "#a7bdc7"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "airlife_fired_earth": {elem2: "fired_earth_oceanair_airlife_fired_earth"},
    }
};

elements.waterfired_fired_earthocean = {
    color: ["#00b3ff", "#ff3700", "#ff3700", "#4a241a", "#1a97ad"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.oceanfire = {
    color: ["#1a97ad", "#ff3c00"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "fired_earth_oceanair_airlife_fired_earth": {elem2: "oceanfired_fired_earth_oceanairlife_fired_earth"},
    }
};

elements.air_in_the_water = {
    color: ["#aebcbf", "#00a2ff"],
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.its_gone = {
    color: "#f4f4f4",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

elements.black_hole = {
    color: "#000000",
    behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid"
};

// ver 2

elements.idk_airlife = {
    color: ["#ffffff", "#b4c3cc", "#41c73a"],
    behavior: [
        "SW%33|SW%33|SW%33",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
    reactions: {
      "fired_earth": {elem2: "idk_airlife_fired_earth"},
    }
};

elements.dusty_waterfired_fired_earthocean = {
    color: ["#b3b3b3", "#0099ff", "#ff4800", "#4a281b", "#1c7894"],
    behavior: [
        "SW%33|SW%33|SW%33",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
};

elements.infinite_water_lifehack = {
    color: "#0095ff",
    behavior: [
        "SW%33|SW%33|SW%33",
        "M2|XX|M2",
        "M1|M1|M1",
    ],
    category: "sbmixup",
    hidden: true,
    state: "liquid",
};

elements.aquaman = {
  color: ["#ffbe4f", "#cf6e06", "#21cf06"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.fired_fired_earthoceanairlife = {
  color: ["#ff4400", "#ff4400", "#47271b", "#22679c", "#91a4b3", "#5fc736"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.fired_earth_oceanair_airlife_fired_earth = {
  color: ["#ff4d00", "#5c3929", "#1e5d87", "#9ba9b3", "#9ba9b3", "#46d136", "#ff4000", "#42c240"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.what_the_fuck = {
  color: ["#7700ff", "#ff0000", "#ffff00"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.airlife_fired_fired_earth = {
  color: ["#c1cdd9", "#ff4d00", "#ff4d00", "#5c3a2c"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.polluted_waterfired_fired_earthocean = {
  color: ["#5f6e45", "#007bff", "#ff5100", "#ff5100", "#402519", "#25617a"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.a = {
  color: "#8400ff",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
  reactions: {
    "it_disappeared": {elem2: "no_vowel"}
  }
};

elements.is_there_an_ocean = {
  color: ["#ffffff", "#21578a"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.even_more_fired_earth = {
  color: ["#ff3300", "#301812", "#ff3300", "#301812"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.we_put_out_the_fire = {
  color: "#211c1b",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.my_name_is_air = {
  color: ["#2a242e", "#c9d6d6"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.whos_that = {
  color: ["#000000", "#ffffff"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.dusty_waterair = {
  color: ["#4d4d4d", "#008cff", "#afbbc4"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.maybe = {
  color: ["#ffffff", "#000000"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.airfired_earth_earth = {
  color: ["#bac3cc", "#ff3c00", "#472b20", "#472b20"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
  reactions: {
    "idk_idk_idk_fired_fired_bored_earth": {elem2: "no"},
  }
};

elements.drink_water_in_a_plane = {
  color: ["#ffffff", "#0095ff"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.backrooms = {
  color: ["#b39040", "#8a7a57", "#7a5c1b"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
  reactions: {
    "no_ocean": {elem2: "level_7"},
    "fired_earth": {elem2: "level_101"},
  }
};

elements.airlife_even_more_fired_earth = {
  color: ["#bcd0d1", "#4fc437", "#000000", "#ff3300", "#40221b"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.i_keep_reading_watermelon_instead_of_waterfired = {
  color: "#ffffff",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.clone = {
  color: ["#ffb700", "#dbcd02", "#d1ca62"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
  reactions: {
    "waterfired_fired_earth": {elem2: "two_waterfired_fired_earth"},
    "infinite_water_lifehack": {elem2: "two_infinite_water_lifehack"},
  }
};

elements.waterfiredfired_fired_fired_earth_earth = {
  color: ["#0091ff", "#ff4d00", "#ff4d00", "#ff4d00", "#ff4d00", "#422b21", "#422b21"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.only_fired_earth_and_air = {
  color: ["#000000", "#ff4d00", "#42291e", "#a9bfc2"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.im_playing_this_in_discord = {
  color: "#bfbf82",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.only_earth = {
  color: "#42291e",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.two_waterfired_fired_earth = {
  color: ["#ffffff", "#00a6ff", "#ff4d00", "#ff4d00", "#3d2920"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.minutes_craft = {
  name: "5MinutesCraft",
  color: ["#ffffff", "#fff000"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.ocean_waterair = {
  color: ["#1e6d7d", "#0080ff", "#a9b5c2"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.something = {
  color: "#877e91",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.no_wowel = {
  color: "#c300ff",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.dusty_life_idk_idk_waterfired_fired_fired_fired_earthearthocean = {
  color: ["#787878", "#48c742", "#ffffff", "#ffffff", "#006eff", "#ff3c00", "#ff3c00", "#ff3c00", "#ff3c00", "#45281f", "#45281f", "#204885"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.bir_d = {
  color: "#82603c",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.still_no_water = {
  color: ["#000000", "#007bff"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.level7 = {
  color: ["#9c894e", "#007bff"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.ok_this_is_getting_ridiculous = {
  color: "#170a00",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.fired_waterfired_fired_earth = {
  color: ["#ff5500", "#0099ff", "#ff5100", "#ff5100", "#38231a"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.oceanfired_fired_earth_oceanairlife_fired_earth = {
  color: ["#265375", "#ff3c00", "#ff3c00", "#573226", "#24478a", "#abbcc7", "#3bba32", "#ff4000", "#5c3629"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.level101 = {
  color: ["#947f48", "#33572c"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.oceanoceanairlife = {
  color: ["#264d7a", "#264d7a", "#c1c9d4", "#4dc742"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.waterfired_oceanairlife_fired_earth = {
  color: ["#007bff", "#ff3c00", "#254785", "#9aa4b5", "#46b837", "#ff5100", "#593829"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.also_gone = {
  color: "#000000",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.waterphobia = {
  color: ["#000000", "#0091ff"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.two_infinite_water_lifehack = {
  color: ["#ffffff", "#0091ff"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.no = {
  color: "#000000",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.uhm_there_is_no_water_in_the_plane = {
  color: ["#000000", "#0091ff", "#d9d9d9"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.death = {
  color: "#1a1818",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.dusty_airlife = {
  color: ["#6e6e6e", "#bec7cf", "#57bf34"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.go_drink_oceanairlife = {
  color: ["#ffffff", "#245280", "#bec6cf", "#43bf37"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.firefighter = {
  color: "#c95c40",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.erm_actually_hes_fireguy = {
  color: ["#ffffff", "#c9ae40", "#c95c40"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.nothing_at_all = {
  color: "#000000",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.or_did_it = {
  color: "#21201a",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.idk_airlife_fired_earth = {
  color: ["#ffffff", "#bbc4c9", "#55c23a", "#ff3700", "#59382e"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.theres_no_water_but_theres_fired_earth = {
  color: ["#ffffff", "#00a2ff", "#000000", "#ff2f00", "#4f2a21"],
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};

elements.theres_more = {
  color: "#1a0000",
  behavior: [
    "SW%33|SW%33|SW%33",
    "M2|XX|M2",
    "M1|M1|M1",
  ],
  category: "sbmixup",
  hidden: true,
  state: "liquid",
};
