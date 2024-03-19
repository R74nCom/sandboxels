elements.monitor_case = {
    color: "#4a4848",
    behavior: behaviors.SOLID,
    category: "machines",
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
    category: "machines",
    tempHigh: 8000,
    stateHigh: ["molten_steel","explosion","molten_iron"]
};

elements.red_wire = {
    color: "#ff3d1f",
    behavior: behaviors.WALL,
    category: "machines",
    insulate: true,
    conduct: 3,
    noMix: true
};

elements.green_wire = {
    color: "#66c22d",
    behavior: behaviors.WALL,
    category: "machines",
    insulate: true,
    conduct: 3,
    noMix: true
};

elements.blue_wire = {
    color: "#1f81cc",
    behavior: behaviors.WALL,
    category: "machines",
    insulate: true,
    conduct: 3,
    noMix: true
};

elements.electrogalvanized = {
    color: "#6c6e70",
    behavior: behaviors.WALL,
    category: "machines",
    state: "solid",
    conduct: 2,
    density: 7850,
};
