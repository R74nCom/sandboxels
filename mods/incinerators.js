elements.incinerator = {
    color: "#e600ff",
	desc: "A machine that works like the incinerate tool.",
    behavior: [
        "XX|HT:10000|XX",
        "HT:10000|XX|HT:10000",
        "XX|HT:10000|XX",
    ],
    category: "machines",
	state: "solid",
    insulate:true,
};

elements.e_incinerator = {
	color: "#9802a8",
	desc: "It works like the incinerator but it needs power to work.",
	behavior: behaviors.WALL,
	hardness: 0.5,
	conduct: 1,
	behaviorOn: [
        "XX|HT:10000|XX",
        "HT:10000|XX|HT:10000",
        "XX|HT:10000|XX",
    ],
	name: "E-Incinerator",
	category: "machines",
	state: "solid",
	insulate:true,
};
