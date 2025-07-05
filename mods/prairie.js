elements.bison = {
    color: ["#8B4513", "#A0522D"], // Цвета для бизонов
    behavior: [
        "XX|XX|XX", // Едят траву вокруг
        "M2%1|XX|M2%1", // Медленное движение влево и вправо
        "M1|M1%1|M1" // Лёгкое спускание, если нет опоры
    ],
    category: "life", // Категория для бизонов
    state: "solid", // Бизоны — твёрдые существа
    density: 1200, // Плотность, выше чем у воды
    tempHigh: 60, // Температура, при которой бизон "умирает"
    stateHigh: "dead_bison",
    tempLow: -20, // Температура, при которой бизон замерзает
    stateLow: "frozen_meat",
    reactions: {
        "water": {elem1: "bison_wet" }, // Бизон становится мокрым в воде
        "grass": {elem2: null, chance: 0.3, func:behaviors.FEEDPIXEL},
		"shepherdia": {elem2: null, chance: 0.3, func:behaviors.FEEDPIXEL}
    },
    properties: {
        energy: 200, // Энергия бизона
    },
	burn: 50,
	burnTime: 500,
	burnInto: "dead_bison",
    tick: function(pixel) {
        // Уменьшение энергии со временем
        pixel.energy -= 0.05;

        // Если энергия исчерпана, бизон умирает
        if (pixel.energy <= 0) {
            changePixel(pixel, "dead_bison");
        }

        // Еда (травы добавляет энергию)
        if (pixel.currentState === "grass") {
            pixel.energy += 5;
        }

        // Восстановление энергии при отдыхе
        if (!pixel.moving) {
            pixel.energy += 0.1;
        }
    },
};

elements.dead_bison = {
    color: "#654321", // Коричневый цвет для мёртвого бизона
    behavior: [
      "XX|XX|XX",
      "XX|CH:rotten_meat%0.1|XX",
      "M2|M1|M2"
    ], // Никакого движения
    category: "life", // Категория остаётся той же
    state: "solid", // Мёртвый бизон остаётся твёрдым
    density: 1300, // Немного плотнее живого бизона
	burn: 100,
	burnTime: 1000,
	burnInto: "ash",
	hidden: true
};

elements.bison_wet = {
    color: "#5F4C40", // Темный цвет для мокрого бизона
    behavior: [
        "XX|XX|XX", // Едят траву вокруг
        "M2%1|XX|M2%1", // Медленное движение влево и вправо
        "M1|M1%1|M1" // Лёгкое спускание, если нет опоры
    ], // Поведение такое же, как у обычного бизона
    category: "life", // Категория та же
    state: "solid", // Мокрый бизон остаётся твёрдым
    density: 1250, // Немного тяжелее, чем сухой бизон
    tempHigh: 60, // Тот же предел температуры
	stateHigh: "dead_bison",
    tempLow: -20, // Тот же предел температуры
	stateLow: "frozen_meat",
    properties: {
        energy: 150, // Мокрый бизон теряет немного энергии
    },
    reactions: {
        "grass": {elem2: null, chance: 0.3, func:behaviors.FEEDPIXEL},
		"shepherdia": {elem2: null, chance: 0.3, func:behaviors.FEEDPIXEL}
    },
    tick: function(pixel) {
        // Постепенное "высыхание"
        pixel.energy -= 0.1;
        if (pixel.energy <= 0) {
            changePixel(pixel, "bison");
        }
    },
	burn: 100,
	burnTime: 1000,
	burnInto: "ash",
	hidden: true
};

elements.shepherdia = {
    color: "#FF6347", // Ярко-красный цвет ягоды
    behavior: [
        "XX|XX|XX", // Остаётся статичной
        "XX|XX|XX", // Не двигается
        "M2|M1|M2" // Остаётся на месте
    ],
    category: "food", // Категория еды
    state: "solid", // Твёрдое состояние
    density: 800, // Лёгкий элемент
    tempHigh: 40, // Портится при высокой температуре
    stateHigh: "rotten_fruit",
    tempLow: -5, // Замерзает при низкой температуре
    stateLow: "frozen_fruit",
    properties: {
        nutrition: 50, // Восстанавливает энергию при поедании
    },
	burn: 100,
	burnTime: 1000,
	burnInto: "ash",
	hidden: true
};

elements.rotten_fruit = {
    color: "#8B0000", // Тёмно-красный цвет испорченной ягоды
    behavior: behaviors.POWDER, // Никакого движения
    category: "food", // Остаётся в категории еды
    state: "solid", // Всё ещё твёрдое состояние
    density: 800, // Такая же плотность
	hidden: true
};

elements.frozen_fruit = {
    color: "#ADD8E6", // Светло-голубой цвет замороженной ягоды
    behavior: behaviors.POWDER, // Никакого движения
    category: "food", // Остаётся в категории еды
    state: "solid", // Твёрдое состояние
    density: 850, // Немного тяжелее
	hidden: true
};

elements.shepherdia_bush = {
    color: "#228B22", // Зелёный цвет куста
    behavior: [
        "XX|XX|XX", // Остаётся статичным
        "CR:shepherdia%1|XX|CR:shepherdia%1", // Не двигается
        "XX|XX|XX" // Остаётся на месте
    ],
    category: "plant", // Категория растений
    state: "solid", // Твёрдое состояние
    density: 1000, // Средняя плотность для растения
    tempHigh: 50, // Горит при высокой температуре
    stateHigh: "ash",
    reactions: {
        "water": { elem1: "wet_bush" } // Куст становится мокрым при контакте с водой
    },
	burn: 100,
	burnTime: 1000,
	burnInto: "ash",
	hidden: true,
	seed: "shepherdia_seed"
};

elements.wet_bush = {
    color: "#2E8B57", // Тёмно-зелёный цвет мокрого куста
    behavior: behaviors.WALL, // Никакого движения
    category: "plant", // Остаётся в категории растений
    state: "solid", // Твёрдое состояние
    density: 1020, // Немного тяжелее из-за воды
    tempHigh: 50, // Также горит при высокой температуре
    stateHigh: "ash",
	properties: {
        energy: 150, // Мокрый куст теряет немного энергии
    },
	tick: function(pixel) {
        // Постепенное "высыхание"
        pixel.energy -= 0.1;
        if (pixel.energy <= 0) {
            changePixel(pixel, "shepherdia_bush");
        }
    },
	burn: 100,
	burnTime: 1000,
	burnInto: "ash",
	hidden: true
};

elements.shepherdia_seed = {
    color: "#8B4513", // Коричневый цвет семени
    behavior: [
        "XX|XX|XX", // Остаётся статичным
        "XX|XX|XX", // Не двигается
        "XX|M1|XX" // Падает вниз
    ],
    category: "plant", // Категория растений
    state: "solid", // Твёрдое состояние
    density: 900, // Лёгкая плотность
    tempHigh: 50, // Горит при высокой температуре
    stateHigh: "ash",
    reactions: {
        "water": { elem1: "shepherdia_bush" } // При контакте с водой превращается в куст
    },
	seed: true
};