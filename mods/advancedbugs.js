elements.hornet = {
    tempHigh: 200,
    stateHigh: "dead_bug",
    color: "#ede48e",
	behavior: behaviors.FLY,
	category: "life",
	state: "solid",
    behaviorOn: [
    "XX|CR:flash|XX",
    "CR:flash|CH:ash|CR:flash",
    "XX|CR:flash|XX",
         ],
    reactions: {
        "head": { elem2: null, },
        "body": { elem2: null, },
        "fly": { elem2: null, },
        "spider": { elem1: null, }
    }
}

elements.lice = {
    tempHigh: 212,
    stateHigh: "dead_bug",
    color: "#7a7852",
	behavior: behaviors.LIQUID,
	category: "life",
	state: "solid",
    behaviorOn: [
    "XX|CR:flash|XX",
    "CR:flash|CH:ash|CR:flash",
    "XX|CR:flash|XX",
         ],
    reactions: {
        "head": { elem2: null, },
        "body": { elem2: null, }
    }
}
