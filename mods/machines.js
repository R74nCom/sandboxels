elements.led_w = {
    behavior: behaviors.WALL,
    reactions: {
        "light": { "charge1": 1 }
    },
    color: "#c0c0c0",
    colorOn: "#ffffff",
    category: "machines",
    tempHigh: 1500,
    stateHigh: "molten_glass",
    conduct: 1
};
elements.ledO = {
    behavior: behaviors.WALL,
    reactions: {
        "light": { "charge1": 1 }
    },
    color: "#b06000",
    colorOn: "#ff8c00",
    category: "machines",
    tempHigh: 1500,
    stateHigh: "molten_glass",
    conduct: 1
};
elements.ledY = {
    behavior: behaviors.WALL,
    reactions: {
        "light": { "charge1": 1 }
    },
    color: "#b0b000",
    colorOn: "#ffff00",
    category: "machines",
    tempHigh: 1500,
    stateHigh: "molten_glass",
    conduct: 1
};
elements.ledP = {
    behavior: behaviors.WALL,
    reactions: {
        "light": { "charge1": 1 }
    },
    color: "#551a8b",
    colorOn: "#800080",
    category: "machines",
    tempHigh: 1500,
    stateHigh: "molten_glass",
    conduct: 1
};
elements.esuperheater = {
    color: "#ff69b4",
	behavior: behaviors.WALL,
    behaviorOn: elements.superheater.behavior,
    category: "machines",
    insulate: elements.wire.insulate,
    conduct: elements.wire.conduct,
    noMix: elements.wire.noMix
};
elements.eheater = {
    color: "#FA8072",
	behavior: behaviors.WALL,
    behaviorOn: elements.heater.behavior,
    category: "machines",
    insulate: elements.wire.insulate,
    conduct: elements.wire.conduct,
    noMix: elements.wire.noMix
};
elements.ecooler = {
    color: "#AFEEEE",
	behavior: behaviors.WALL,
    behaviorON: elements.cooler.behavior,
    category: "machines",
    insulate: elements.wire.insulate,
    conduct: elements.wire.conduct,
    noMix: elements.wire.noMix
};
elements.efreezer = {
    color: "#E0FFFF",
	behavior: behaviors.WALL,
    behaviorOn: elements.freezer.behavior,
    category: "machines",
    insulate: elements.wire.insulate,
    conduct: elements.wire.conduct,
    noMix: elements.wire.noMix
};
elements.fire_sensor = {
    behavior: behaviors.WALL,
    reactions: {
		"fire": {"charge1":1},
		"plasma": {"charge1":1},
		"cold_fire": {"charge1":1},
		"fireball": {"charge1":1},
		"antifire": {"charge1":1},
		},
    color: "#FFA500",
    colorOn: "#FFBF00",
    category: "machines",
    conduct: 1
};
elements.light_sensor = {
    behavior: behaviors.WALL,
    reactions: {
		"light": {"charge1":1},
		"liquid_light": {"charge1":1},
		"flash": {"charge1":1},
		"radiation": {"charge1":1},
		"laser": {"charge1":1},
		},
    color: "#FFFFFF",
    category: "machines",
    conduct: 1
};
elements.water_sensor = {
    behavior: behaviors.WALL,
    reactions: {
		"water": {"charge1":1},
		"salt_water": {"charge1":1},
		"sugar_water": {"charge1":1},
		"seltzer": {"charge1":1},
		"dirty_water": {"charge1":1},
		"pool_water": {"charge1":1},
		"slush": {"charge1":1},
		"hail": {"charge1":1},
		"ice": {"charge1":1},
		"salt_ice": {"charge1":1},
		"sugar_ice": {"charge1":1},
		"seltzer_ice": {"charge1":1},
		"dirty_ice": {"charge1":1},
		"pool_ice": {"charge1":1},
		"steam": {"charge1":1},
		"cloud": {"charge1":1},
		"rain_cloud": {"charge1":1},
		"snow_cloud": {"charge1":1},
		"hail_cloud": {"charge1":1},
		"thunder_cloud": {"charge1":1},
		"pool_ice": {"charge1":1},
		},
    color: "#89CFF0",
    category: "machines",
    conduct: 1
};
elements.mega_shocker = {
    behavior: behaviors.WALL,
	behaviorOn:	[
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|CR:lightning AND SH|XX",
    ],
    color: "#C3B1E1",
    category: "machines",
    conduct: 1
};
elements.exploder = {
    behavior: behaviors.WALL,
	behaviorOn:	[
        "XX|CR:explosion AND SH|XX",
        "CR:explosion AND SH|XX|CR:explosion AND SH",
        "XX|CR:explosion AND SH|XX",
    ],
    color: "#ff8c00",
    category: "machines",
    conduct: 1,
	hardness: 1
};
elements.evoid = {
    behavior: behaviors.WALL,
	behaviorOn:	[
        "XX|DL|XX",
        "DL|XX|DL",
        "XX|DL|XX",
    ],
    color: "#434854",
    category: "machines",
    conduct: 1,
	hardness: 1,
	ignore: ["wire","battery"]
};
elements.eburner = {
    behavior: behaviors.WALL,
	behaviorOn: [
        "CR:propane|CR:propane|CR:propane",
        "XX|XX|XX",
        "XX|XX|XX",
    ],
    color: "#fadecd",
    category: "machines",
    conduct: 1
};
elements.mega_led = {
    behavior: behaviors.WALL,
    reactions: {
        "light": { "charge1": 1 }
    },
    color: ["#660000","#b06000","#b0b000","#006600","#000066","#551a8b"],
    colorOn: ["#ff0000","#ff8c00","#ffff00","#00ff00","#0000ff","#800080"],
    category: "machines",
    tempHigh: 15000,
    stateHigh: "molten_stained_glass",
    conduct: 1,
	state: "gas"
};
elements.estatic = {
    behavior: behaviors.WALL,
    color: "#3d3d3d",
    colorOn: ["#ffffff","#888888","#000000"],
    category: "machines",
    conduct: 1
};
elements.elattice = {
    behavior: behaviors.WALL,
	behaviorOn: [
        "CL|XX|CL",
        "XX|XX|XX",
        "CL|XX|CL",
    ],
    color: "#e795f0",
    colorOn: ["#7110e8","#2c00b0","#000cb0"],
    category: "machines",
    conduct: 1
};
elements.esnake = {
    behavior: behaviors.WALL,
	behaviorOn: [
        "XX|XX|XX",
        "XX|LB:plant AND RT%5|M1 AND BO:1,2,3",
        "XX|XX|XX",
    ],
    color: "#00bf00",
    category: "machines",
    conduct: 1,
	rotatable: true
};
elements.evertical = {
    behavior: behaviors.WALL,
	behaviorOn: [
        "XX|M1|XX",
        "CR:wall|XX|CR:wall",
        "XX|XX|XX",
    ],
    color: "#e8e6e6",
    category: "machines",
    conduct: 1
};
elements.ehorizontal = {
    behavior: behaviors.WALL,
	behaviorOn: [
        "XX|CR:wall|XX",
        "XX|XX|M1",
        "XX|CR:wall|XX",
    ],
    color: "#e8e6e6",
    category: "machines",
    conduct: 1
};
elements.ultrasuper_exploder = {
    behavior: behaviors.WALL,
	behaviorOn:	[
        "XX|CR:supernova AND SH|XX",
        "CR:supernova AND SH|XX|CR:supernova AND SH",
        "XX|CR:supernova AND SH|XX",
    ],
    color: "#4103fc",
    category: "machines",
    conduct: 1,
	hardness: 1
};
elements.tiny_exploder = {
    behavior: behaviors.WALL,
	behaviorOn:	[
        "XX|CR:pop AND SH|XX",
        "CR:pop AND SH|XX|CR:pop AND SH",
        "XX|CR:pop AND SH|XX",
    ],
    color: ["#ffb48f","#ffd991","#ffad91"],
    category: "machines",
    conduct: 1,
	hardness: 1
};
elements.poop = {
    color: "#8B4513",
    behavior: behaviors.POWDER,
    category: "life",
    state: "solid",
	tempHigh: 100,
    stateHigh: "stench"
};