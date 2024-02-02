elements.top_filler = {
    color: "#ae4cd9",
    behavior: [
        ["XX","CL","XX"],
        ["XX","XX","XX"],
        ["XX","XX","XX"]
    ],
    category:"fillers",
    excludeRandom: true,
    reactions: {
        "neutron": { elem1:"lattice" },
        "proton": { elem1:"vertical" },
        "electric": { elem1:"horizontal" },
        "positron": { elem1:"vertical" },
        "plasma": { elem1:"armageddon", tempMin:500, charged:true },
    }
},

elements.bottom_filler = {
    color: "#ae4cd9",
    behavior: [
        ["XX","XX","XX"],
        ["XX","XX","XX"],
        ["XX","CL","XX"]
    ],
    category:"fillers",
    excludeRandom: true,
    reactions: {
        "neutron": { elem1:"lattice" },
        "proton": { elem1:"vertical" },
        "electric": { elem1:"horizontal" },
        "positron": { elem1:"vertical" },
        "plasma": { elem1:"armageddon", tempMin:500, charged:true },
    }
},

elements.right_filler = {
    color: "#ae4cd9",
    behavior: [
        ["XX","XX","XX"],
        ["XX","XX","CL"],
        ["XX","XX","XX"]
    ],
    category:"fillers",
    excludeRandom: true,
    reactions: {
        "neutron": { elem1:"lattice" },
        "proton": { elem1:"vertical" },
        "electric": { elem1:"horizontal" },
        "positron": { elem1:"vertical" },
        "plasma": { elem1:"armageddon", tempMin:500, charged:true },
    }
},

elements.left_filler = {
    color: "#ae4cd9",
    behavior: [
        ["XX","XX","XX"],
        ["CL","XX","XX"],
        ["XX","XX","XX"]
    ],
    category:"fillers",
    excludeRandom: true,
    reactions: {
        "neutron": { elem1:"lattice" },
        "proton": { elem1:"vertical" },
        "electric": { elem1:"horizontal" },
        "positron": { elem1:"vertical" },
        "plasma": { elem1:"armageddon", tempMin:500, charged:true },
    }
}

elements.filler.category = "fillers"