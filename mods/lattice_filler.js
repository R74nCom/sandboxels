elements.lattice_filler = {
    behavior: [
        "XX|CL|XX",
        "CL|DL|CL",
        "XX|CL|XX",
    ],
    category: "special",
    state: "solid",
    density: 1834,
    color: "#ff266e",
    reactions: {
        "lightning": {elem1: "destructive_lattice_filler", elem2: null}
        }
};

elements.destructive_lattice_filler = {
    behavior: [
        "DL|CL|DL",
        "CL|DL|CL",
        "DL|CL|DL",
    ],
    category: "special",
    state: "solid",
    density: 1834,
    color: "#ff0037",
    hidden: true,
};

elements.filler.reactions.laser = { "elem1":"lattice_filler", "elem2": "lattice_filler" }