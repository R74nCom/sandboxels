elements.eeraser = {
    color: "#FFFF00",
	behavior: behaviors.WALL,
    behaviorON: [
        "DL|DL|DL",
        "DL|XX|DL",
        "DL|DL|DL",
    ],
    category: "machines",
    insulate: elements.wire.insulate,
    conduct: elements.wire.conduct,
    noMix: elements.wire.noMix
}; // SINCE my other pr got closed i put it into a mod i made :)
elements.hyperheater = {
    color: "#FF0000",
    behavior: [
        "XX|HT:25|XX",
        "HT:25|XX|HT:25",
        "XX|HT:25|XX",
    ],
    category:"machines",
    insulate:true
};
elements.superexploder = {
    color: "#FF0000",
    behavior: [
        "XX|EX:25|XX",
        "EX:25|XX|EX:25",
        "XX|EX:25|XX",
    ],
    category:"machines",
    insulate:true
};