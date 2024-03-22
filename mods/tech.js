elements.monitor_case = {
    color: "#4a4848",
    behavior: behaviors.SOLID,
    category: "tech",
    state: "solid",
    density: 500,
};

elements.pc_core = {
    color: "#f0cd43",
    behavior: [
        "XX|SH|XX",
        "SH|XX|SH",
        "XX|SH|XX",
    ],
    category: "tech",
    tempHigh: 8000,
    stateHigh: ["molten_steel","explosion","molten_iron"],
    reactions: {
        "poison": { elem1: "malfunctioned_wire", elem2: "null" },
        "salt_water": { elem1: "malfunctioned_wire", elem2: "null" },
	"water": { elem1: "explosion", elem2: "null" },
        "malware": { elem1: "null", elem2: "null" },
	},
	breakInto: ["rust", "electrogalvanized"],
};

elements.malfunctioned_wire = {
    color: "#6d32a8",
    behavior: behaviors.WALL,
    category: "tech",
    conduct: 999,
    noMix: true
};

elements.red_wire = {
    color: "#ff3d1f",
    behavior: behaviors.WALL,
    category: "tech",
    insulate: true,
    conduct: 1,
    noMix: true,
    reactions: {
        "acid": { elem1: "malfunctioned_wire", elem2: "null" },
        "poison": { elem1: "malfunctioned_wire", elem2: "null" },
        "salt_water": { elem1: "malfunctioned_wire", elem2: "null" },
	"water": { elem1: "malfunctioned_wire", elem2: "null" },
	},
	breakInto: ["plastic", "copper"],
};

elements.green_wire = {
    color: "#66c22d",
    behavior: behaviors.WALL,
    category: "tech",
    insulate: true,
    conduct: 1,
    noMix: true,
    reactions: {
        "acid": { elem1: "malfunctioned_wire", elem2: "null" },
        "poison": { elem1: "malfunctioned_wire", elem2: "null" },
        "salt_water": { elem1: "malfunctioned_wire", elem2: "null" },
	"water": { elem1: "malfunctioned_wire", elem2: "null" },
	},
	breakInto: ["plastic", "copper"],
};

elements.blue_wire = {
    color: "#1f81cc",
    behavior: behaviors.WALL,
    category: "tech",
    insulate: true,
    conduct: 1,
    noMix: true,
    reactions: {
        "acid": { elem1: "malfunctioned_wire", elem2: "null" },
        "poison": { elem1: "malfunctioned_wire", elem2: "null" },
	"water": { elem1: "malfunctioned_wire", elem2: "null" },
        "salt_water": { elem1: "malfunctioned_wire", elem2: "null" },
	},
	breakInto: ["plastic", "copper"],
};

elements.electrogalvanized = {
    color: "#6c6e70",
    behavior: behaviors.WALL,
    category: "tech",
    state: "solid",
    conduct: 2,
    density: 7850,
};
