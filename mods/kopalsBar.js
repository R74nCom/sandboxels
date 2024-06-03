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
	}
}

const drinks = [
	'beer',
	'wine',
	'vodka',
	'rum'
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
	stateHigh: ['steam', 'alcohol'],
	reactions: {
		'juice': {elem2: 'wine', chance: 0.0125}
	}
}

elements.vodka  = {
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

elements.rum  = {
	color: ['#A0522D', '#8B4513'],
	behavior: behaviors.LIQUID,
	category: 'bar',
	state: 'solid',
	tempHigh: 78,
	density: 997,
	stateHigh: ['steam', 'alcohol'],
	reactions: {
		'sugar_water': {elem2: 'rum', chance: 0.0125}
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

elements.drinker = {
    color: ['#FFD700', '#F4E541', '#7B1113', '#8D021F'],
    tool: function(pixel) {
        if (drinks.includes(pixel.element)) {
            deletePixel(pixel.x, pixel.y);
        }
    },
    category: "tools",
    desc: "Drinks alcohol."
}

for (const elem in drinks) {
	drink(elem)
}

elements.mashed_potato.reactions = {}
elements.mashed_potato.reactions['water'] = {elem2: 'vodka', chance: 0.05}