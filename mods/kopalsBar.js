elements.yeast = {
	color: ['#AD9166', '#9A7F4E', '#D8BB8D'],
	behavior: [
		'XX|XX|XX',
		'XX|XX|XX',
		'M2|M1|M2'
	],
	category: 'bar',
	state: 'solid',
	tempHigh: 132,
	stateHigh: 'ash',
	reactions: {
		'water': {elem2: 'beer', chance: 0.05},
		'juice': {elem2: 'wine', chance: 0.05},
		'sugar_water': {elem2: 'rum', chance: 0.05},
		'white_juice': {elem2: 'white_wine', chance: 0.05},
	}
}

const drinks = [
	'beer',
	'wine',
	'vodka',
	'rum',
	'white_wine',
	'white_juice',
	'white_grape'
]

const ings = [
	'yeast',
	'mashed_potato'
]

function drink(elem) {
	elements.body.reactions[elem] = {elem2: null}
	elements.head.reactions[elem] = {elem2: null}
}

elements.beer = {
	color: ['#FFD700', '#F4E541'],
	behavior: [
		'XX|CR:foam%15|XX',
		'M2|XX|M2',
		'M2|M1|M2'
	],
	category: 'bar',
	state: 'solid',
	tempHigh: 78,
	density: 997,
	stateHigh: ['steam', 'alcohol'],
	reactions: {
		'water': {elem2: 'beer', chance: 0.0125}
	}
}

elements.wine = {
	color: ['#7B1113', '#8D021F'],
	behavior: behaviors.LIQUID,
	category: 'bar',
	state: 'solid',
	tempHigh: 78,
	density: 997,
	stain: 0.1,
	stateHigh: ['steam', 'alcohol'],
	reactions: {
		'juice': {elem2: 'wine', chance: 0.0125}
	}
}

elements.white_wine = {
	color: ['#FAD689', '#F8E3A1'],
	behavior: behaviors.LIQUID,
	category: 'bar',
	state: 'solid',
	tempHigh: 78,
	density: 997,
	stain: 0.1,
	stateHigh: ['steam', 'alcohol'],
	reactions: {
		'white_juice': {elem2: 'white_wine', chance: 0.0125}
	}
}

elements.vodka = {
	color: ['#FFFFFF', '#FFFACD'],
	behavior: behaviors.LIQUID,
	category: 'bar',
	state: 'solid',
	tempHigh: 78,
	density: 997,
	stateHigh: ['steam', 'alcohol'],
	reactions: {
		'water': {elem2: 'vodka', chance: 0.0125}
	}
}

elements.rum = {
	color: ['#A0522D', '#8B4513'],
	behavior: behaviors.LIQUID,
	category: 'bar',
	state: 'solid',
	tempHigh: 78,
	stain: 0.05,
	density: 997,
	stateHigh: ['steam', 'alcohol'],
	reactions: {
		'sugar_water': {elem2: 'rum', chance: 0.0125}
	}
}

elements.white_juice = {
	color: ['#F8F0C6', '#F7E7A9'],
	behavior: behaviors.LIQUID,
	category: 'liquids',
	state: 'solid',
	tempHigh: 130,
	density: elements.juice.density,
	movable: true,
	stateHigh: 'steam',
}

elements.white_grape = {
	color: ['#D0F0C0', '#B2E68D'],
	behavior: elements.grape.behavior,
	category: 'food',
	density: 1154,
	state: 'solid',
	stateHigh: ['steam', 'sugar'],
	breakInto: 'white_juice',
	tempHigh: 256,
	reactions: {
		'acid': {elem1: 'white_juice', chance: 0.1},
		'acid_gas': {elem1: 'white_juice', chance: 0.1},
		'basalt': {elem1: 'white_juice', chance: 0.1},
		'concrete': {elem1: 'white_juice', chance: 0.1},
		'limestone': {elem1: 'white_juice', chance: 0.1},
		'radiation': {elem1: 'white_juice', chance: 0.1},
		'rock': {elem1: 'white_juice', chance: 0.1},
		'tuff': {elem1: 'white_juice', chance: 0.1},
		'water': {elem1: 'white_juice', chance: 0.005},
		'sugar_water': {elem1: 'white_juice', chance: 0.025},
	}
}

elements.ingredient_eater = {
    color: ['#AD9166', '#9A7F4E', '#D8BB8D'],
    tool: function(pixel) {
        if (ings.includes(pixel.element)) {
            deletePixel(pixel.x, pixel.y);
        }
    },
    category: "tools",
    desc: "Removes ingredients."
}

elements.consumer = {
    color: ['#FFD700', '#F4E541', '#7B1113', '#8D021F'],
    tool: function(pixel) {
        if (drinks.includes(pixel.element)) {
            deletePixel(pixel.x, pixel.y);
        }
    },
    category: "tools",
    desc: "Consumes stuff like juice 'n beer."
}

for (const elem in drinks) {
	drink(elem)
}

elements.mashed_potato.reactions = {}
elements.mashed_potato.reactions['water'] = {elem2: 'vodka', chance: 0.05}
elements.grape.color = ['#7D1538', '#6F2DA8']
elements.grape.breakIntoColor = '#4B0082'