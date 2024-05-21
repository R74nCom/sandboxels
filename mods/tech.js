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

elements.nvidia_cpu = {
    color: "#76B900", // Nvidia's signature green color
    behavior: [
        "XX|SH|XX",
        "SH|XX|SH",
        "XX|SH|XX",
    ],
    category: "tech",
    tempHigh: 1000, // Melting point for realism
    stateHigh: "molten_silicon", // Assuming it melts into molten silicon
    reactions: {
        "water": { elem1: "short_circuit", elem2: "steam" },
        "salt_water": { elem1: "short_circuit", elem2: "null" },
        "acid": { elem1: "corroded_cpu", elem2: "null" },
        "poison": { elem1: "corroded_cpu", elem2: "null" },
    },
    breakInto: ["silicon", "metal_scrap"],
    conduct: 10, // Moderate conductivity
    density: 2330, // Density of silicon
};

elements.molten_silicon = {
    color: "#ffcc99",
    behavior: behaviors.LIQUID,
    category: "states",
    state: "liquid",
    temp: 1414, // Melting point of silicon
    tempLow: 1414,
    stateLow: "silicon",
    density: 2570,
    viscosity: 100,
};

elements.short_circuit = {
    color: "#ff0000",
    behavior: behaviors.POWDER,
    category: "energy",
    temp: 100,
    state: "solid",
};

elements.corroded_cpu = {
    color: "#a0a0a0",
    behavior: behaviors.POWDER,
    category: "tech",
    tempHigh: 800,
    stateHigh: "ash",
    conduct: 1,
};

elements.silicon = {
    color: "#f0f0f0",
    behavior: behaviors.SOLID,
    category: "solids",
    tempHigh: 1414,
    stateHigh: "molten_silicon",
    density: 2330,
};

