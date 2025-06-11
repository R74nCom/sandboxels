elements.thiquovite = {
    color: "#e3f9ff",
    behavior: behaviors.POWDER,
    category: "special",
    state: "solid",
    density: 100,
    desc: "Sounds familliar.",
    temp: -5,
	  reactions: {
        "screen": { elem2:"ring" },
        "ring": { elem2:"pen" },
	"rr": { elem2:"pen" },
	"rl": { elem2:"pen" },
	"ru": { elem2:"pen" },
	"rd": { elem2:"pen" },
	"diamond_block": { elem2:"pen" },
        "pen": { elem2:"king" },
    }
};

elements.screen = {
    color: ["#505e4c", "#4b6943"],
    behavior: [
    "XX|XX|XX",
    "XX|CC:#505e4c|XX",
    "XX|XX|XX",
],
    behaviorOn: [
    "XX|CR:light|XX",
    "SW:screen|CC:#8bcc78|SW:screen",
    "XX|CR:light|XX",
],
    category: "machines",
    state: "solid",
    conduct: 1,
    breakInto: ["glass_shard", "electric"],
    reactions: {
        "bread": { elem1:"food_screen" },
	"cheese": { elem1:"food_screen" },
    }
};

elements.food_screen = {
    name: "Screen",
    desc: "Now on Food Channel.",
    color: ["#505e4c", "#4b6943"],
    behavior: [
    "CH:screen>food_screen|CH:screen>food_screen|CH:screen>food_screen",
    "CH:screen>food_screen|CC:#505e4c|CH:screen>food_screen",
    "CH:screen>food_screen|CH:screen>food_screen|CH:screen>food_screen",
],
    behaviorOn: [
    "XX|CR:light AND CR:toast,melted_cheese|XX",
    "CR:toast,melted_cheese|CC:d91f16|CR:toast,melted_cheese",
    "CR:toast,melted_cheese|CR:light|CR:toast,melted_cheese",
],
    category: "machines",
    hidden: true,
    state: "solid",
    conduct: 1,
    breakInto: ["glass_shard", "electric"],
};

elements.ring = {
    color: "#9ab3b1",
    maxSize: 1,
    behavior: [
    "XX|CR:ru AND CH:ring>nullium|XX",
    "CR:rl AND CH:ring>nullium|DL|CR:rr AND CH:ring>nullium",
    "XX|CR:rd AND CH:ring>nullium|XX",
],
    category: "special",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["silver", "diamond"],
};

elements.nullium = {
    color: "#000000",
    behavior: [
    "XX|XX|XX",
    "XX|DL|XX",
    "XX|XX|XX",
],
    category: "special",
    state: "solid",
    density: 100,
    conduct: 1,
    hidden: true,
};


elements.rr = {
    hidden: true,
    name: "Ring",
    color: "#9ab3b1",
    behavior: [
    "XX|CR:diamond_block|CR:diamond_block",
    "XX|CH:silver|CR:diamond_block",
    "XX|CR:diamond_block|CR:diamond_block",
],
    category: "special2",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["silver", "diamond"],
};

elements.rl = {
    hidden: true,
    name: "Ring",
    color: "#9ab3b1",
    behavior: [
    "CR:diamond_block|CR:diamond_block|XX",
    "CR:diamond_block|CH:silver|XX",
    "CR:diamond_block|CR:diamond_block|XX",
],
    category: "special2",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["silver", "diamond"],
};

elements.ru = {
    hidden: true,
    name: "Ring",
    color: "#9ab3b1",
    behavior: [
    "CR:diamond_block|CR:diamond_block|CR:diamond_block",
    "CR:diamond_block|CH:silver|CR:diamond_block",
    "XX|XX|XX",
],
    category: "special2",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["silver", "diamond"],
};

elements.rd = {
    hidden: true,
    name: "Ring",
    color: "#9ab3b1",
    behavior: [
    "XX|XX|XX",
    "CR:diamond_block|CH:silver|CR:diamond_block",
    "CR:diamond_block|CR:diamond_block|CR:diamond_block",
],
    category: "special2",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["silver", "diamond"],
};

elements.corner = {
    hidden: true,
    name: "Ring",
    color: "#9ab3b1",
    behavior: [
    "CR:ruins|CR:diamond_block|CR:ruins",
    "CR:ruins|XX|CR:ruins",
    "CR:ruins|CR:ruins|CR:ruins",
],
    category: "special2",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["dust"],
};

elements.diamond_block = {
    color: ["#28d8de", "#03f4fc"],
    behavior: behaviors.WALL,
    category: "solids",
    state: "solid",
    density: 100,
    breakInto: ["diamond"],
    tempHigh: 540,    
    stateHigh: "diamond",
};

elements.pen = {
    color: "#454545",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:pen_length|XX",
],
    category: "machines",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["foam", "plastic"],
};

elements.red_pen = {
    color: "#801f1f",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:red_pen_length|XX",
],
    category: "machines",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["red_ink", "plastic"],
};

elements.blue_pen = {
    color: "#19235e",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:blue_pen_length|XX",
],
    category: "machines",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["blue_ink", "plastic"],
};

elements.pen_length = {
    name: "Pen",
    hidden: true,
    color: "#454545",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:pen_length,pen_tip|XX",
],
    category: "machines",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["foam", "plastic"],
};

elements.red_pen_length = {
    name: "RedPen",
    hidden: true,
    color: "#801f1f",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:red_pen_length,red_pen_tip|XX",
],
    category: "machines",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["red_ink", "plastic"],
};

elements.blue_pen_length = {
    name: "BluePen",
    hidden: true,
    color: "#19235e",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:blue_pen_length,blue_pen_tip|XX",
],
    category: "machines",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["blue_ink", "plastic"],
};

elements.pen_tip = {
    color: "#b3b4bd",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:ink%2|XX",
],
    category: "machines2",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["foam", "metal_scrap"],
};

elements.red_pen_tip = {
    color: "#eb4444",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:red_ink%1|XX",
],
    category: "machines2",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["red_ink", "metal_scrap"],
};

elements.blue_pen_tip = {
    color: "#737ee6",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:blue_ink%1|XX",
],
    category: "machines2",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["blue_ink", "metal_scrap"],
};

elements.blue_ink = {
    color: "#1421db",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    stain: 0.3,
    breakInto: ["foam", "copper_sulfate"],
    burn: 115,
    burnInto: "dioxin",
    tempHigh: 350,
    stateHigh: "dioxin",
    reactions: {
        "alcohol": { elem2:"acid" },
	"head": { elem2:"bone", func: behaviors.KILLPIXEL2 },
    }
};

elements.red_ink = {
    color: "#db1414",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    stain: 0.3,
    breakInto: ["foam", "brick_rubble"],
    burn: 115,
    burnInto: "dioxin",
    tempHigh: 350,
    stateHigh: "dioxin",
    reactions: {
        "alcohol": { elem2:"acid" },
	"head": { elem2:"bone", func: behaviors.KILLPIXEL2 },
    }
};

elements.king = {
    color: ["#7d2074", "#63207d", "#9e2626"],
    behavior: [
    "XX|XX|XX",
    "XX|CH:king1,king2,king3,king4|XX",
    "XX|M1|XX",
],
    category: "life",
    state: "solid",
    density: 100,
    breakInto: ["meat", "bone_meal"],
};

elements.king1 = {
    color: ["#7d2074"],
	hidden: true,
    name: "King",
    behavior: [
    "XX|CR:king_head1 AND CH:thiquovite>king_head1|XX",
    "M1%3 AND CH:king_head1>nullium|XX|M1%3 AND CH:king_head1>nullium",
    "XX|M1|XX",
],
    category: "life",
    state: "solid",
    density: 100,
    breakInto: ["meat", "bone_meal"],
};

elements.king2 = {
    color: ["#63207d"],
	hidden: true,
    name: "King",
    behavior: [
    "XX|CR:king_head2 AND CH:thiquovite>king_head2|XX",
    "M1%3 AND CH:king_head2>nullium|XX|M1%3 AND CH:king_head2>nullium",
    "XX|M1|XX",
],
    category: "life",
    state: "solid",
    density: 100,
    breakInto: ["meat", "bone_meal"],
};

elements.king3 = {
    color: ["#9e2626"],
	hidden: true,
    name: "King",
    behavior: [
    "XX|CR:king_head3 AND CH:thiquovite>king_head3|XX",
    "M1%3 AND CH:king_head3>nullium|XX|M1%3 AND CH:king_head3>nullium",
    "XX|M1|XX",
],
    category: "life",
    state: "solid",
    density: 100,
    breakInto: ["meat", "bone_meal"],
};

elements.king4 = {
    color: ["#7d2074"],
	hidden: true,
    name: "King",
    behavior: [
    "XX|CR:king_head4 AND CH:thiquovite>king_head4|XX",
    "M1%3 AND CH:king_head4>nullium|XX|M1%3 AND CH:king_head4>nullium",
    "XX|M1|XX",
],
    category: "life",
    state: "solid",
    density: 100,
    breakInto: ["meat", "bone_meal"],
};

elements.king_head1 = {
    color: ["#998148"],
	hidden: true,
    name: "KingHead",
    behavior: [
    "XX|CR:crown AND CH:king_head1>nullium|XX",
    "CH:crown>nullium|XX|CH:crown>nullium",
    "XX|M1|XX",
],
    category: "life",
    state: "solid",
    density: 100,
    breakInto: ["meat", "bone_meal"],
};

elements.king_head2 = {
    color: ["#7a6431"],
	hidden: true,
    name: "KingHead",
    behavior: [
    "XX|CR:crown AND CH:king_head2>nullium|XX",
    "CH:crown>nullium|XX|CH:crown>nullium",
    "XX|M1|XX",
],
    category: "life",
    state: "solid",
    density: 100,
    breakInto: ["meat", "bone_meal"],
};

elements.king_head3 = {
    color: ["#bf993f"],
	hidden: true,
    name: "KingHead",
    behavior: [
    "XX|CR:crown AND CH:king_head3>nullium|XX",
    "CH:crown>nullium|XX|CH:crown>nullium",
    "XX|M1|XX",
],
    category: "life",
    state: "solid",
    density: 100,
    breakInto: ["meat", "bone_meal"],
};

elements.king_head4 = {
    color: ["#d1b269"],
    name: "KingHead",
    behavior: [
    "XX|CR:crown AND CH:king_head4>nullium|XX",
    "CH:crown>nullium|XX|CH:crown>nullium",
    "XX|M1|XX",
],
    hidden: true,
    category: "life",
    state: "solid",
    density: 100,
    breakInto: ["meat", "bone_meal"],
};


elements.crown = {
    color: ["#ffde00", "#d9b516", "#b39824"],
    name: "Crown",
    behavior: [
    "CH:crown>nullium|CH:crown>nullium|CH:crown>nullium",
    "CH:crown>nullium|XX|CH:crown>nullium",
    "CH:crown>nullium|M1|XCH:crown>nulliumX",
],
    category: "powders",
    hidden: true,
    state: "solid",
    density: 100,
    breakInto: ["gold_coin"],
};

elements.tiger = {
    color: ["#c4711d", "#d16813", "#ff7300"],
    behavior: [
    "M1%10|XX|M1%10",
    "M1%20|XX|M1%20",
    "M1|CH:water>foam AND M1|M1",
],
    foodNeed: 12,
    egg: "newborn",
    baby: "baby_tiger",
    category: "life",
    burn: 95,
    burnInto: "cooked_meat",
    tempHigh: 160,
    stateHigh: ["cooked_meat", "ash"],
    tempLow: -30,
    stateLow: ["frozen_meat"],
    state: "solid",
    breakInto: ["meat", "bone_meal"],
    reactions: {
        "rat": { elem2: "blood", chance: 0.2, func: behaviors.KILLPIXEL2 },
	"head": { elem2:"bone", chance: 0.01, func: behaviors.KILLPIXEL2 },
	"body": { elem2:"bone", chance: 0.01, func: behaviors.FEEDPIXEL },
	"bird": { elem2:"feather", chance: 0.3, func: behaviors.FEEDPIXEL },
	"meat": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
	"ant": { elem2: null, func: behaviors.KILLPIXEL2 },
	"spider": { elem2: null, func: behaviors.KILLPIXEL2 },
	"fish": { elem2: null, func: behaviors.FEEDPIXEL },
        "plant": { elem2: "dead_plant" },
	"grass": { elem2: "dead_plant" },
	"radiation": { elem1: "rotten_meat", chance: 0.1 },
	"bone": { elem1: "blood", chance: 0.3 },
	"blood": { elem2: null, chance: 0.3 },
	"infection": { elem1: "rotten_meat", chance: 0.01 },
	"rotten_meat": { elem1: "rotten_meat", chance: 0.01 },
    }
};

elements.baby_tiger = {
    color: ["#b88f74", "#e39764"],
    behavior: [
    "M1%30|XX|M1%30",
    "M1%10|CH:tiger%0.2|M1%10",
    "M1|CH:water>foam AND M1|M1",
],
    category: "life",
    state: "solid",
    breakInto: ["meat", "bone_meal"],
    burn: 95,
    tempLow: -30,
    stateLow: ["frozen_meat"],
    burnInto: "cooked_meat",
    tempHigh: 160,
    stateHigh: ["cooked_meat", "ash"],
    reactions: {
        "rat": { elem1: "tiger", chance: 0.3, elem2:"blood", func: behaviors.KILLPIXEL2 },
	"ant": { elem2: null, chance: 0.3, func: behaviors.KILLPIXEL2 },
	"spider": { elem2: null, chance: 0.3, func: behaviors.KILLPIXEL2 },
	"fish": { elem1: "tiger", chance: 0.3, elem2: null, func: behaviors.KILLPIXEL2 },
	"grass": { elem2: "dead_plant" },
	"radiation": { elem1: "rotten_meat", chance: 0.1 },
	"infection": { elem1: "rotten_meat", chance: 0.01 },
	"rotten_meat": { elem1: "rotten_meat", chance: 0.01 },
    }
};

elements.newborn = {
    color: ["#f5c4d3", "#dbae7f"],
    behavior: [
    "XX|XX|XX",
    "M1%0.1|CH:baby_tiger%0.2|M1%0.1",
    "XX|M1|XX",
],
    category: "life",
    state: "solid",
    breakInto: ["meat", "bone_meal"],
    burn: 95,
    tempLow: -30,
    stateLow: ["frozen_meat"],
    burnInto: "cooked_meat",
    tempHigh: 160,
    stateHigh: ["cooked_meat", "ash"],
    reactions: {
	"radiation": { elem1: "rotten_meat", chance: 0.1 },
	"infection": { elem1: "infection", chance: 0.01 },
	"rotten_meat": { elem1: "rotten_meat", chance: 0.01 },
    }
};

elements.rad_spider = {
    color: ["#6f21ff", "#ae21ff", "#d621ff"],
    behavior: [
    "M1%5 AND CR:rad_web%1|XX|M1%5 AND CR:rad_web%1",
    "CR:radiation%2 AND M1%10|CO:2|CR:radiation%2 AND M1%10",
    "M1%5 AND CR:rad_web%1|M1 AND CR:rad_web|M1%5 AND CR:rad_web%1",
],
    category: "life",
    state: "solid",
    breakInto: ["dead_bug", "hot_bomb"],
    burn: 1,
    foodNeed: 10,
    egg: "rad_spider",
    burnInto: "radiation",
    tempHigh: 3000,
    stateHigh: ["radiation", "ash"],
    reactions: {
	"spider": { elem2: "rad_spider", chance: 0.3 },
	"dna": { elem2: "rad_spider", chance: 0.01 },
	"cell": { elem2: "rad_spider", chance: 0.01 },
	"radiation": { elem2: "rad_spider", chance: 0.001 },
	"rotten_meat": { elem1: "rotten_meat", chance: 0.01 },
	"ant": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
	"fly": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
	"chocolate": { elem1: "hyper_spider", elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
    }
};

elements.hyper_spider = {
    color: ["#ff0044", "#f200ff", "#00ffc8"],
    behavior: [
    "M1%20 AND CR:hyper_web%5|XX|M1%20 AND CR:hyper_web%5",
    "CR:radiation%2 AND M1%10|CO:2|CR:radiation%2 AND M1%10",
    "M1%20 AND CR:hyper_web%5|M1 AND CR:hyper_web|M1%10 AND CR:hyper_web%5",
],
    category: "life",
    state: "solid",
    breakInto: ["dead_bug", "hot_bomb"],
    burn: 1,
    foodNeed: 3,
    egg: "rad_spider",
    burnInto: "radiation",
    tempHigh: 6000,
    stateHigh: ["radiation", "plague"],
    reactions: {
	"spider": { elem2: "rad_spider", chance: 0.5 },
	"rad_spider": { elem2: "hyper_spider", chance: 0.3 },
	"dna": { elem2: "rad_spider", chance: 0.1 },
	"cell": { elem2: "rad_spider", chance: 0.1 },
	"radiation": { elem2: "rad_spider", chance: 0.1 },
	"rotten_meat": { elem1: "rotten_meat", chance: 0.01 },
	"ant": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
	"fly": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
	"chocolate": { elem2: "hyper_spider", chance: 0.3, func: behaviors.FEEDPIXEL },
    }
};

if (!elements.radiation.reactions) { // Include this block once
    elements.radiation.reactions = {} // This creates the property if it doesn't exist
}
elements.radiation.reactions.web = { elem2: "rad_web" }
elements.radiation.reactions.spider = { elem2: "rad_spider" }
elements.radiation.reactions.snow = { elem2: "thiquovite" }

elements.rad_web = {
    color: ["#7de387", "#b4d1b7", "#8f9c90"],
    behavior: [
    "CR:rad_web%0.01|CR:radiation%0.1|CR:rad_web%0.01",
    "CR:radiation%0.1|CH:radiation%0.1|CR:radiation%0.1",
    "CR:rad_web%0.01|CR:rad_web%1|CR:rad_web%0.01",
],
    category: "life",
    hidden: true,
    state: "solid",
    breakInto: ["dust", "rad_shard"],
    burn: 80,
    burnInto: "radiation",
    tempHigh: 100,
    stateHigh: ["radiation", "ash"],
    reactions: {
	"spider": { elem2: "rad_spider", chance: 0.1 },
	"dna": { elem2: "rad_spider", chance: 0.01 },
	"cell": { elem2: "rad_spider", chance: 0.01 },
	"radiation": { elem1: "rad_spider", chance: 0.001 },
	"water": { elem1: "glue" },
    }
};

elements.hyper_web = {
    color: ["#4fe85e", "#4fbfe8", "#b2ccd6"],
    behavior: [
    "CR:hyper_web%0.1|CR:radiation%0.1|CR:hyper_web%0.1",
    "CR:radiation%0.1|CH:ruins%0.1|CR:radiation%0.1",
    "CR:rad_web%0.01|CR:hyper_web%5|CR:rad_web%0.01",
],
    category: "life",
    hidden: true,
    state: "solid",
    breakInto: ["rad_spider", "rad_shard"],
    burn: 40,
    burnInto: ["radiation", "plague"],
    tempHigh: 300,
    stateHigh: ["radiation", "ash"],
    reactions: {
	"spider": { elem2: "rad_spider", chance: 0.1 },
	"dna": { elem2: "rad_spider", chance: 0.1 },
	"cell": { elem2: "rad_spider", chance: 0.1 },
	"radiation": { elem1: "rad_spider", chance: 0.001 },
	"water": { elem1: "glue" },
    }
};

elements.vw = {
    name: "Vertical Wall",
    desc: "Makes a wall that goes up and down, like this line: |",
    hard: 1,
    color: ["#7D7D7D"],
    behavior: [
    "XX|CR:vw|XX",
    "XX|CH:wall|XX",
    "XX|CR:vw|XX",
],
    category: "machines",
    state: "solid",
};

elements.hw = {
    name: "Horizontal Wall",
    desc: "Makes a wall that goes left and right, like this line: -",
    hard: 1,
    color: ["#7D7D7D"],
    behavior: [
    "XX|XX|XX",
    "CR:hw|CH:wall|CR:hw",
    "XX|XX|XX",
],
    category: "machines",
    state: "solid",
};

elements.bltr = {
    name: "BL-TR Wall",
    desc: "Creates a slope from bottom left to top right, like this slash: /",
    hard: 1,
    color: ["#7D7D7D"],
    behavior: [
    "XX|XX|CR:bltr",
    "XX|CH:wall|XX",
    "CR:bltr|XX|XX",
],
    category: "machines",
    state: "solid",
};

elements.tlbr = {
    name: "TL-BR Wall",
    desc: "Creates a slope from top left to bottom right, like this slash: \\",
    hard: 1,
    color: ["#7D7D7D"],
    behavior: [
    "CR:tlbr|XX|XX",
    "XX|CH:wall|XX",
    "XX|XX|CR:tlbr",
],
    category: "machines",
    state: "solid",
};

elements.evw = {
    name: "E-Vertical Wall",
    desc: "Makes an electric wall that goes up and down, like this line: |",
    hard: 1,
    color: ["#6c8da6"],
    behavior: [
    "XX|CR:evw|XX",
    "XX|CH:ew|XX",
    "XX|CR:evw|XX",
],
    category: "machines",
    state: "solid",
};

elements.ehw = {
    name: "E-Horizontal Wall",
    desc: "Makes an electric wall that goes left and right, like this line: -",
    hard: 1,
    color: ["#6c8da6"],
    behavior: [
    "XX|XX|XX",
    "CR:ehw|CH:ew|CR:ehw",
    "XX|XX|XX",
],
    category: "machines",
    state: "solid",
};

elements.ew = {
    name: "E-Wall", //cooler e-wall.
    desc: "Electric wall, blue variant",
    hard: 1,
    charge: 2,
    conduct: 1,
    color: ["#6c8da6"],
    behavior: [
    "XX|XX|XX",
    "XX|SH|XX",
    "XX|XX|XX",
],
    category: "machines",
    state: "solid",
};

elements.ebltr = {
    name: "E-BL-TR Wall",
    desc: "Creates an electric slope from bottom left to top right, like this slash: /",
    hard: 1,
    color: ["#6c8da6"],
    behavior: [
    "XX|XX|CR:ebltr",
    "XX|CH:ew|XX",
    "CR:ebltr|XX|XX",
],
    category: "machines",
    state: "solid",
};

elements.etlbr = {
    name: "E-TL-BR Wall",
    desc: "Creates a electric slope from top left to bottom right, like this slash: \\",
    hard: 1,
    color: ["#6c8da6"],
    behavior: [
    "CR:etlbr|XX|XX",
    "XX|CH:ew|XX",
    "XX|XX|CR:etlbr",
],
    category: "machines",
    state: "solid",
};

elements.bw = {
    name: "Breakable Wall",
    desc: "Breakable wall.",
    hard: 0.5,
    color: ["#CB4141"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    tempHigh: 1540,
    stateHigh: "molten_brick",
    category: "solids",
    state: "solid",
    breakInto: "brick_rubble",
};

elements.bvw = {
    name: "Breakable Vertical Wall",
    desc: "Makes a breakable wall that goes up and down, like this line: |",
    hard: 0.5,
    color: ["#CB4141"],
    behavior: [
    "XX|CR:bvw|XX",
    "XX|CH:bw|XX",
    "XX|CR:bvw|XX",
],
    category: "machines2",
    state: "solid",
};

elements.bhw = {
    name: "Breakable Horizontal Wall",
    desc: "Makes a breakable wall that goes left and right, like this line: -",
    hard: 0.5,
    color: ["#CB4141"],
    behavior: [
    "XX|XX|XX",
    "CR:bhw|CH:bw|CR:bhw",
    "XX|XX|XX",
],
    category: "machines2",
    state: "solid",
};

elements.bbltr = {
    name: "Breakable BL-TR Wall",
    desc: "Creates a breakable slope from bottom left to top right, like this slash: /",
    hard: 0.5,
    color: ["#CB4141"],
    behavior: [
    "XX|XX|CR:bbltr",
    "XX|CH:bw|XX",
    "CR:bbltr|XX|XX",
],
    category: "machines2",
    state: "solid",
};

elements.btlbr = {
    name: "Breakable TL-BR Wall",
    desc: "Creates a breakable slope from top left to bottom right, like this slash: \\",
    hard: 0.5,
    color: ["#CB4141"],
    behavior: [
    "CR:btlbr|XX|XX",
    "XX|CH:bw|XX",
    "XX|XX|CR:btlbr",
],
    category: "machines2",
    state: "solid",
};

elements.uvw = {
    name: "Unstoppable Vertical Wall",
    desc: "Makes a wall that goes up and down, like this line: |",
    hard: 1,
    color: ["#66e36a"],
    behavior: [
    "XX|CR:uvw|XX",
    "XX|XX|XX",
    "XX|CR:uvw|XX",
],
    category: "machines2",
    state: "solid",
};

elements.uhw = {
    name: "Unstoppable Horizontal Wall",
    desc: "Makes a wall that goes left and right, like this line: -",
    hard: 1,
    color: ["#66e36a"],
    behavior: [
    "XX|XX|XX",
    "CR:uhw|XX|CR:uhw",
    "XX|XX|XX",
],
    category: "machines2",
    state: "solid",
};

elements.ubltr = {
    name: "Unstoppable BL-TR Wall",
    desc: "Creates a slope from bottom left to top right, like this slash: /",
    hard: 1,
    color: ["#66e36a"],
    behavior: [
    "XX|XX|CR:ubltr",
    "XX|XX|XX",
    "CR:ubltr|XX|XX",
],
    category: "machines2",
    state: "solid",
};

elements.utlbr = {
    name: "Unstoppable TL-BR Wall",
    desc: "Creates a slope from top left to bottom right, like this slash: \\",
    hard: 1,
    color: ["#66e36a"],
    behavior: [
    "CR:utlbr|XX|XX",
    "XX|XX|XX",
    "XX|XX|CR:utlbr",
],
    category: "machines2",
    state: "solid",
};

elements.uevw = {
    name: "Unstoppable E-Vertical Wall",
    desc: "Makes an electric wall that goes up and down, like this line: |",
    hard: 1,
    color: ["#6be8be"],
    conduct: 1,
    behavior: [
    "XX|CR:uevw|XX",
    "XX|SH|XX",
    "XX|CR:uevw|XX",
],
    category: "machines2",
    state: "solid",
};

elements.uehw = {
    name: "Unstoppable E-Horizontal Wall",
    desc: "Makes an electric wall that goes left and right, like this line: -",
    hard: 1,
    color: ["#6be8be"],
    conduct: 1,
    behavior: [
    "XX|XX|XX",
    "CR:uehw|SH|CR:uehw",
    "XX|XX|XX",
],
    category: "machines2",
    state: "solid",
};

elements.uew = {
    name: "E-Wall",
    desc: "Electric wall, teal edition",
    hard: 1,
    charge: 2,
    conduct: 1,
    hidden: true,
    color: ["#6be8be"],
    behavior: [
    "XX|XX|XX",
    "XX|SH|XX",
    "XX|XX|XX",
],
    category: "machines2",
    state: "solid",
};

elements.uebltr = {
    name: "Unstoppable E-BL-TR Wall",
    desc: "Creates an electric slope from bottom left to top right, like this slash: /",
    hard: 1,
    color: ["#6be8be"],
    conduct: 1,
    behavior: [
    "XX|XX|CR:uebltr",
    "XX|SH|XX",
    "CR:uebltr|XX|XX",
],
    category: "machines2",
    state: "solid",
};

elements.uetlbr = {
    name: "Unstoppable E-TL-BR Wall",
    desc: "Creates a electric slope from top left to bottom right, like this slash: \\",
    hard: 1,
    color: ["#6be8be"],
    conduct: 1,
    behavior: [
    "CR:uetlbr|XX|XX",
    "XX|SH|XX",
    "XX|XX|CR:uetlbr",
],
    category: "machines2",
    state: "solid",
};

elements.whmisium_a = {
    color: ["#869aa3"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1 AND EX:10>methane,fire|XX",
],
    desc: "Class A - Compressed Gas - Contents under high pressure. - Cylinder may explode or burst when heated, dropped or damaged.",
    category: "special",
    state: "solid",
    tempHigh: 50,
    stateHigh: "explosion",
};

elements.whmisium_b = {
    color: ["#694b2a", "#69562a", "#69412a"],
    behavior: [
    "XX|XX|XX",
    "XX|CH:hot_bomb%0.01|XX",
    "M1|M1|M1",
],
    desc: "Class B - Flammable and Combustible Material - May catch fire when exposed to heat, spark or flame. May burst into flames.",
    category: "special",
    state: "liquid",
    tempHigh: 40,
    stateHigh: "explosion",
    reactions: {
	"fire": { elem1: "explosion", chance: 0.5 },
	"electric": { elem1: "explosion", chance: 0.5 },
    }
};

elements.whmisium_c = {
    color: ["#ffd20a", "#ff8d0a"],
    behavior: [
    "XX|CR:nitrogen%1|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    desc: "Class C - Oxidizing Material - May cause fire or explosion when in contact with wood, fuels or other combustible material.",
    category: "special",
    tempHigh: 40,
    stateHigh: "explosion",
    state: "solid",
     reactions: {
	"whimisium_b": { elem1: ["explosion", "fire"], chance: 0.5 },
	"wood": { elem2: "explosion", chance: 0.5 },
	"charcoal": { elem2: "explosion", chance: 0.5 },
	"ash": { elem2: "explosion", chance: 0.5 },
	"oil": { elem1: "explosion", chance: 0.5 },
	"oxygen": { elem1: "explosion", chance: 0.5 },
    }
};

elements.whmisium_d1 = {
    color: ["#2b7d10", "#43802f"],
    behavior: [
    "XX|CR:poison_gas%1|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    desc: "Class D, Division 1 - Poisonous and Infectious Material: Immediate and Serious Toxic Effects - A single exposure may be fatal or cause serious or permanent damage to health.",
    category: "special",
    state: "solid",
    reactions: {
	"head": { elem2: ["explosion", "poison_gas"], chance: 0.5, func: behaviors.KILLPIXEL2 },
	"body": { elem2: ["explosion", "poison_gas"], chance: 0.5, func: behaviors.KILLPIXEL2 },
	"fire": { elem1: "poison_gas", chance: 0.5 },
	"oxygen": { elem2: "explosion", chance: 0.5 },
    }
};

elements.whmisium_d2 = {
    color: ["#a7ff8a", "#62ff2e"],
    behavior: [
    "XX|CR:poison_gas%5|XX",
    "CR:radiation%0.1|XX|CR:radiation%0.1",
    "XX|M1|XX",
],
    desc: "Class D, Division 2 - Poisonous and Infectious Material: Other Toxic Effects - May cause irritation. Repeated exposure may cause cancer, birth defects or other permanent damage to health.",
    category: "special",
    state: "solid",
    reactions: {
	"head": { elem1: ["explosion", "poison_gas"], elem2: "cancer", chance: 0.5, func: behaviors.KILLPIXEL2 },
	"body": { elem1: ["explosion", "poison_gas"], elem2: "cancer", chance: 0.5, func: behaviors.KILLPIXEL2 },
	"fire": { elem1: "poison_gas", chance: 0.5 },
	"oxygen": { elem1: "cancer", elem2: "explosion", chance: 0.5 },
    }
};

elements.whmisium_d3 = {
    color: ["#6e1d44", "#6e441d", "#943931", "#ff3d2b"],
    behavior: [
    "XX|CR:poison_gas%10|XX",
    "CR:radiation%1 AND M1%5|XX|CR:radiation%1 AND M1%5",
    "M1|M1|M1",
],
    desc: "Class D, Division 3 - Poisonous and Infectious Material: Bio-hazardous Infectious Materials - May cause disease or serious illness. Drastic exposures may result in death.",
    category: "special",
    state: "liquid",
};

elements.whmisium_e = {
    color: ["#ff738c", "#ff739a", "#ff73b7"],
    behavior: [
    "XX|CR:rad_steam%2|XX",
    "M1 AND CR:rad_steam%0.2|XX|M1 AND CR:rad_steam%0.2",
    "M1|M1 AND CH:rust%5|M1",
],
    desc: "Class E - Corrosive Material - Causes severe eye and skin Irritation upon contact. Can cause severe tissue damage with prolonged exposure. May be harmful to the respiratory system if inhaled.",
    category: "special",
    state: "liquid",
    reactions: {
	"head": { elem1: ["explosion", "poison_gas"], elem2: "cancer", chance: 0.5, func: behaviors.KILLPIXEL2 },
	"body": { elem1: ["explosion", "poison_gas"], elem2: "cancer", chance: 0.5, func: behaviors.KILLPIXEL2 },
	"rust": { elem2: "nitrogen", chance: 0.5 },
    }
};

elements.whmisium_f = {
    color: ["#7D7D7D", "#7D7D7D", "#7D7D7D", "#f4005e", "#00f4b3", "#7600f4"],
    behavior: [
    "XX|HT:1|XX",
    "XX|EX:50>explosion,fire,methane,radiation%0.01|XX",
    "HT:1|M1|HT:1",
],
    desc: "Class F - Dangerously Reactive Material - May react violently causing explosion, fire or release of toxic gases when exposed to light, heat, vibration or extreme heat, vibration temperatures.",
    category: "special",
    state: "solid",
    temp: 20,
    tempHigh: 23,
    stateHigh: ["explosion", "fire", "methane", "radiation"],
    reactions: {
	"fire": { elem1: ["explosion", "fire", "methane", "radiation"] },
	"electric": { elem1: ["explosion", "fire", "methane", "radiation"] },
	"light": { elem1: ["explosion", "fire", "methane", "radiation"] },
	"head": { elem1: ["explosion", "fire", "methane", "radiation"], func: behaviors.KILLPIXEL2 },
	"body": { elem1: ["explosion", "fire", "methane", "radiation"], func: behaviors.KILLPIXEL2 },
    }
};

elements.thermium = {
    color: ["#f4005e"],
    behavior: [
    "XX|XX|XX",
    "XX|HT:1|XX",
    "XX|M1|XX",
],
    desc: "Hot.",
    category: "machines",
    state: "solid",
    temp: 20,
    tempLow: -20,
    stateLow: "cryonine",
};

elements.cryonine = {
    color: ["#5e00ff"],
    behavior: [
    "XX|XX|XX",
    "XX|CO:2|XX",
    "XX|M1|XX",
],
    desc: "Cold.",
    category: "machines",
    state: "solid",
    temp: -20,
    tempHigh: 20,
    stateHigh: "thermium",
};

elements.bad_plane = {
    name: "Plane",
    desc: "Stationary. Cheap.",
    color: ["#bdbdbd", "#8d9dba"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    behaviorOn: [
    "XX|XX|XX",
    "XX|CH:bad_flying_plane|XX",
    "XX|XX|XX",
],
    category: "machines",
    state: "solid",
    temp: 20,
    conduct: 3,
    tempHigh: 500,
    stateHigh: "molten_metal_scrap",
};

elements.good_plane = {
    name: "Plane",
    desc: "Stationary. Expensive.",
    color: ["#a1b3bf", "#8ec7ed"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    behaviorOn: [
    "XX|XX|XX",
    "XX|CH:good_flying_plane|XX",
    "XX|XX|XX",
],
    category: "machines",
    state: "solid",
    temp: 20,
    conduct: 3,
    tempHigh: 500,
    stateHigh: "molten_metal_scrap",
};

elements.takeoff_plane = {
    desc: "Taking off. Expensive.",
    name: "Plane",
    color: ["#a1b3bf", "#8ec7ed"],
    hidden: true,
    behavior: [
    "XX|XX|M1 AND SH",
    "XX|CH:good_flying_plane%10|M1",
    "XX|XX|XX",
],
    category: "states",
    state: "solid",
    temp: 20,
    conduct: 3,
    tempHigh: 500,
    stateHigh: "molten_metal_scrap",
};

elements.good_flying_plane = {
    desc: "In flight. Expensive.",
    name: "Plane",
    color: ["#a1b3bf", "#8ec7ed"],
    hidden: true,
    behavior: [
    "XX|CH:crashing_plane|M1 AND SH",
    "XX|SH AND CH:crashing_plane%0.1|M1 AND BO",
    "XX|XX|XX",
],
    category: "states",
    state: "solid",
    temp: 20,
    conduct: 3,
    tempHigh: 500,
    stateHigh: "molten_metal_scrap",
};

elements.bad_flying_plane = {
    name: "Plane",
    desc: "In flight. Cheap.",
    color: ["#bdbdbd", "#8d9dba"],
    hidden: true,
    behavior: [
    "XX|XX|M1 AND SH",
    "XX|SH|M1 AND LB:carbon_dioxide%1 AND EX:15>explosion AND SH",
    "XX|XX|XX",
],
    category: "states",
    state: "solid",
    temp: 20,
    conduct: 3,
    tempHigh: 500,
    stateHigh: "molten_metal_scrap",
    reactions: {
    "bless": { elem1: "good_plane" },
    "aluminum": { elem1: "good_plane" },
    "metal_scrap": { elem1: "good_plane" },
    }
};

elements.crashing_plane = {
    name: "Plane",
    color: ["#bf931b"],
    hidden: true,
    burning: true,
    burnTime: 300,
    behavior: [
    "CR:smoke%20|LB:turbulence%1|XX",
    "EX:3>molten_metal_scrap|HT:2|M1 AND CH:good_flying_plane>crashing_plane%3",
    "EX:3>molten_metal_scrap|M1 AND EX:10>explosion|EX:3>molten_metal_scrap",
],
    category: "states",
    state: "solid",
    temp: 50,
    conduct: 3,
    tempHigh: 500,
    stateHigh: "molten_metal_scrap",
    burnInto: "explosion",
    reactions: {
    "water": { elem1: "bad_plane" },
    "dirt": { elem1: "metal_scrap" },
    }
};

elements.bad_wind = {
    name: "Turbulence",
    color: ["#bdbdbd", "#8d9dba"],
    behavior: [
    "M1 AND SH|M1 AND SH|M1 AND SH",
    "M1 AND SH|DL%0.5|M1 AND SH",
    "M1 AND SH|M1 AND SH|M1 AND SH",
],
    alpha: 0.5,
    category: "energy",
    state: "gas",
    temp: 20,
    glow: true,
    tempLow: -20,
    stateLow: "tornado",
    reactions: {
    "good_flying_plane": { elem2: ["bad_flying_plane", "crashing_plane"] },
    "fire_flying_plane": { elem2: ["bad_flying_plane", "crashing_plane"] },
    "sand": { elem1: "sandstorm" },
    }
};

elements.fire_plane = {
    name: "FirePlane",
    desc: "Stationary. Produces water.",
    color: ["#a83632", "#d41e17"],
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    behaviorOn: [
    "XX|XX|XX",
    "XX|CH:fire_flying_plane|XX",
    "XX|XX|XX",
],
    category: "machines",
    state: "solid",
    temp: 20,
    conduct: 3,
    tempHigh: 500,
    stateHigh: "molten_metal_scrap",
};

elements.fire_flying_plane = {
    desc: "In flight. Produces water.",
    name: "FirePlane",
    color: ["#a83632", "#d41e17"],
    hidden: true,
    behavior: [
    "XX|EX:10>explosion|M1 AND LB:water",
    "XX|XX|M1 AND BO AND LB:water",
    "XX|XX|XX",
],
    category: "states",
    state: "solid",
    temp: 20,
    conduct: 3,
    tempHigh: 500,
    stateHigh: "molten_metal_scrap",
};

if (!elements.feather.reactions) { // Include this block once
    elements.feather.reactions = {} // This creates the property if it doesn't exist
}
elements.feather.reactions.iron = { elem1: null, elem2: "bad_plane" }
elements.feather.reactions.aluminum = { elem1: null, elem2: "good_plane" }
elements.feather.reactions.steel = { elem1: null, elem2: "fire_plane" }

elements.green_pen = {
    color: "#158f56",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:green_pen_length|XX",
],
    category: "machines",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["green_ink", "plastic"],
};

elements.green_pen_length = {
    name: "GreenPen",
    hidden: true,
    color: "#158f56",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:green_pen_length,green_pen_tip|XX",
],
    category: "machines",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["green_ink", "plastic"],
};

elements.green_pen_tip = {
    color: "#0acf73",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:green_ink%2|XX",
],
    category: "machines2",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["green_ink", "metal_scrap"],
};

elements.green_ink = {
    color: "#05ff8a",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    stain: 0.3,
    breakInto: ["foam", "oxidized_copper"],
    burn: 115,
    burnInto: "dioxin",
    tempHigh: 350,
    stateHigh: "dioxin",
    reactions: {
        "alcohol": { elem2:"acid" },
	"head": { elem2:"bone", func: behaviors.KILLPIXEL2 },
    }
};

elements.orange_pen = {
    color: "#db730b",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:orange_pen_length|XX",
],
    category: "machines",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["orange_ink", "plastic"],
};

elements.orange_pen_length = {
    name: "OrangePen",
    hidden: true,
    color: "#db730b",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:orange_pen_length,orange_pen_tip|XX",
],
    category: "machines",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["orange_ink", "plastic"],
};

elements.orange_pen_tip = {
    color: "#ffa347",
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|CR:orange_ink%2|XX",
],
    category: "machines2",
    state: "solid",
    density: 100,
    conduct: 1,
    breakInto: ["orange_ink", "metal_scrap"],
};

elements.orange_ink = {
    color: "#faa850",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    stain: 0.3,
    breakInto: ["foam", "rust"],
    burn: 115,
    burnInto: "dioxin",
    tempHigh: 350,
    stateHigh: "dioxin",
    reactions: {
        "alcohol": { elem2:"acid" },
	"head": { elem2:"bone", func: behaviors.KILLPIXEL2 },
    }
};

elements.hacked_screen = {
    name: "Screen",
    desc: "Error 404.",
    color: ["#505e4c", "#4b6943"],
    behavior: [
    "CH:screen>hacked_screen|CH:screen>hacked_screen|CH:screen>hacked_screen",
    "CH:screen>hacked_screen|CC:#ff00dc|CH:screen>hacked_screen",
    "CH:screen>hacked_screen|CH:screen>hacked_screen|CH:screen>hacked_screen",
],
    behaviorOn: [
    "XX|CR:light AND CR:malware,snake|XX",
    "CR:malware,snake|CC:d91f16|CR:malware,snake",
    "CR:laser|CR:light|CR:laser",
],
    category: "machines",
    hidden: true,
    state: "solid",
    conduct: 1,
    breakInto: ["glass_shard", "electric"],
};

elements.thiquovite_ray = {
    name: "ThiquoviteRay",
    desc: "I'm in the thick of it, everybody knows They know me where it snows, I skied in and they froze I don't know no nothin' 'bout no ice, I'm just cold Forty somethin' milli' subs or so, I've been told",
    color: ["#3df5d6", "#6edbc9"],
    behavior: [
    "CO:5|CR:thiquovite%10|CO:5",
    "CO:5|CO:5|CO:5",
    "CO:5|M1 AND LB:cold_fire AND CO:5 AND EX:3>thiquovite,ice|CO:5",
],
    category: "energy",
    state: "gas",
};

elements.marble = {
    color: ["#50fa6c", "#50fae3", "#508efa"],
    behavior: [
    "M2|XX|M2",
    "M1%1|XX|M1%50",
    "M1|M1|M1",
],
    category: "special",
    state: "solid",
    density: 100,
    conduct: 100,
    alpha: 0.7,
    breakInto: ["glass_shard", "confetti"],
        reactions: {
        "glass": { elem2:"glass_shard" },
	"body": { elem2:"bone", func: behaviors.KILLPIXEL2 },
    }
};

elements.avw = {
    name: "Colourful Vertical Wall",
    desc: "Makes a wall that goes up and down, like this line: |",
    hard: 0.5,
     color: ["#E3333E", "#EACB63", "#0BBD60", "#6D40AE", "#0974DC"], 
    tempHigh: 500, 
    stateHigh: "party_popper",
	breakInto: "confetti",     
    behavior: [
    "XX|CR:avw|XX",
    "XX|CH:aw|XX",
    "XX|CR:avw|XX",
],
    category: "machines2",
    state: "solid",
};

elements.ahw = {
    name: "Colourful Horizontal Wall",
    desc: "Makes a wall that goes left and right, like this line: -",
    hard: 0.5,
     color: ["#E3333E", "#EACB63", "#0BBD60", "#6D40AE", "#0974DC"], 
    tempHigh: 500, 
    stateHigh: "party_popper",
	breakInto: "confetti",  
    behavior: [
    "XX|XX|XX",
    "CR:ahw|CH:aw|CR:ahw",
    "XX|XX|XX",
],
    category: "machines2",
    state: "solid",
};

elements.abltr = {
    name: "Colourful BL-TR Wall",
    desc: "Creates a slope from bottom left to top right, like this slash: /",
    hard: 0.5,
     color: ["#E3333E", "#EACB63", "#0BBD60", "#6D40AE", "#0974DC"], 
    tempHigh: 500, 
    stateHigh: "party_popper",
	breakInto: "confetti",
    behavior: [
    "XX|XX|CR:abltr",
    "XX|CH:aw|XX",
    "CR:abltr|XX|XX",
],
    category: "machines2",
    state: "solid",
};

elements.atlbr = {
    name: "Colourful TL-BR Wall",
    desc: "Creates a slope from top left to bottom right, like this slash: \\",
    hard: 0.5,
     color: ["#E3333E", "#EACB63", "#0BBD60", "#6D40AE", "#0974DC"], 
    tempHigh: 500, 
    stateHigh: "party_popper",
	breakInto: "confetti",
    behavior: [
    "CR:atlbr|XX|XX",
    "XX|CH:aw|XX",
    "XX|XX|CR:atlbr",
],
    category: "machines2",
    state: "solid",
};

elements.aw = {
    name: "Colourful Wall",
    desc: "oooo colourful",
    hard: 0.5,
     color: ["#E3333E", "#EACB63", "#0BBD60", "#6D40AE", "#0974DC"], 
    tempHigh: 500, 
    stateHigh: "party_popper",
	breakInto: "confetti",     
    behavior: [
    "XX|XX|XX",
    "XX|XX|XX",
    "XX|XX|XX",
],
    category: "machines2",
    state: "solid",
};

elements.cerulite = {
    color: "#438CFF",
    behavior: [
    "XX|CR:cerulic_oxide%5 AND CR:flash%25|XX",
    "XX|XX|XX",
    "M1%5|M1|M1%5",
],
    category: "land",
    state: "solid",
    density: 250,
    conduct: 30,
    tempHigh: 239,
    stateHigh: "cerulic_liquid",
    reactions: {
        "rock": { elem1:"cerulium" },
	"head": { elem2:"bone", func: behaviors.KILLPIXEL2 },
    }
};

elements.cerulic_liquid = {
    color: ["#BE7B00", "#F6A300", "#FFAE6F"],
    behavior: [
    "XX|CR:cerulic_oxide%2 AND CR:fire%2 AND CR:pop|XX",
    "XX|XX|XX",
    "M1|M1|M1",
],
    category: "liquids",
    temp: 300,
    state: "solid",
    density: 125,
    conduct: 30,
    tempLow: 40,
    stateLow: "cerulium",
    reactions: {
        "magma": { elem1:"cerulium" },
	"head": { elem2:"bone", func: behaviors.KILLPIXEL2 },
    }
};

elements.cerulic_oxide = {
    color: ["#08009E", "#0E00EF"],
    behavior: [
    "M1|M1|M1",
    "M1|DL%10|M1",
    "M1|M1|M1",
],
    category: "gases",
    temp: 300,
    state: "gas",
    density: 250,
    conduct: 30,
    tempHigh: 300,
    stateHigh: "pop",
    reactions: {
        "ash": { elem1:"cerulium" },
	"oxygen": { elem1:"cerulite" },
	"head": { elem2:"bone", func: behaviors.KILLPIXEL2 },
    }
};

elements.cerulium = {
    color: ["#4F5AFF", "#658FFF", "#5DC8FF"],
    behavior: [
    "XX|CR:cerulic_oxide%0.1|XX",
    "XX|XX|XX",
    "XX|M1|XX",
],
    category: "solids",
    state: "solid",
    density: 250,
    conduct: 30,
    tempHigh: 1500,
    stateHigh: "cerulic_liquid",
};

elements.random_element = {
    color: ["#ff9f9c", "#c91c1c", "#1c53c9", "#0e2963"],
    category: "tools",
    behavior:  [
    "XX|XX|XX",
    "XX|CH:random|XX",
    "XX|XX|XX",
],
};
