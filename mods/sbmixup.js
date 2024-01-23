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
        "life": {elem2: "airlife"},
        "wate_r": {elem2: "waterair"},
        "fired_earth": {elem2: "airfired_earth"},
        "go_drink_water": {elem2: "air_in_the_water"},
        "voi_d": {elem2: "black_hole"},
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
        "life": {elem2: "idk"},
        "waterfired_fired_earth": {elem2: "earth_waterfired_fired_earth"},
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
        "ocean": {elem2: "oceanfire"},
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
        "idk": {elem2: "boredom"},
        "life": {elem2: "life"},
        "idk_idk_fired_fired_earth": {elem2: "life_idk_idk_fired_fired_earth"},
        "waterair_void": {elem2: "did_it_disappear"},
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
        "ocean": {elem2: "water_in_the_ocean"},
        "boredom": {elem2: "go_drink_water"},
        "fir_e": {elem2: "watergirl_and_fireboy"},
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
        "waterfired_fired_earth": {elem2: "waterfired_fired_earthocean"}
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
        "air": {elem2: "idk_air"},
        "life": {elem2: "boredom"},
        "fired_fired_earth": {elem2: "idk_fired_fired_earth"},
        "voi_d": {elem2: "nothing"},
        "idk_fired_fired_earth": {elem2: "idk_idk_fired_fired_earth"},
        "wate_r": {elem2: "nothing_water"},
        "fir_e": {elem2: "idk_fire"},
        "idk_idk_fired_fired_bored_earth": {elem2: "idk_idk_idk_fired_fired_bored_earth"},
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
        "airlife": {elem2: "airlife_fired_earth"},
        "watergirl_and_fireboy": {elem2: "earth_guy"},
        "oceanair": {elem2: "fired_earth_oceanair"},
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
        "boredom": {elem2: "i_always_like_to_play_with_fire"},
        "airlife": {elem2: "poop_on_the_plane"},
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
    state: "liquid"
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
    state: "liquid"
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
        "waterair": {elem2: "avatar"}
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
        "idk_idk_fired_fired_earth": {elem2: "idk_idk_fired_fired_bored_earth"}
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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
        "go_drink_water": {elem2: "theres_no_water"},
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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
    state: "liquid"
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