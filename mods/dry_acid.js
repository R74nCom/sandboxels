elements.dry_acid = {
    name:"Anhydrous acid",
    desc:"It's pretty much just acid without water in it.",
    color: ["#62e36f", "#a5d9aa", "#b3c9b6"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    reactions: {
        "water": { elem1:"dry_acid", elem2:"acid", temp2:37.22},
        "dirty_water": { elem1:null, elem2:"acid", temp2:37.22}
    },
    density: 1.522
}

if (elements.acid) {
    if (!elements.acid.ignore) {
        elements.acid.ignore = [];
    }
    elements.acid.ignore.push('dry_acid');
}

// Ensure the reactions object exists for the element
if (!elements.acid.reactions) {
    elements.acid.reactions = {};
}

// Add the new reaction
elements.acid.reactions["dirty_water"] = {
    elem1: "acid", // What this element turns into
    elem2: "acid", // What the other element turns into
}

delete elements.acid.reactions.water
delete elements.water.reactions.acid