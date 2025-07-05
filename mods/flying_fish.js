elements.flying_fish = {
    color: ["#0077be", "#00aaff"], // Цвета для летающей рыбы
    behavior: [
        "SW:water AND M2%10|M2%10|SW:water AND M2%10", // Может прыгать в воздух и возвращаться в воду
        "SW:water|XX|SW:water", // Движение влево и вправо в воде
        "SW:water AND M1%10|M1%10|SW:water AND M1%10" // Лёгкое спускание, если в воздухе
    ],
    category: "life", // Категория, в которой будет находиться элемент
    state: "liquid", // Условное состояние рыбы
    density: 997, // Плотность, близкая к воде
    tempHigh: 50, // Температура, при которой рыба погибает
	stateHigh: "meat",
    tempLow: -10, // Температура, при которой рыба замерзает
	stateLow: "frozen_fish",
    reactions: {
        "fire": {elem1: "meat"}, // Рыба "сгорает" при контакте с огнём
        "acid": {elem1: null } // Рыба исчезает в кислоте
    },
    properties: {
        energy: 100, // Энергия рыбы, уменьшается со временем
    },
    tick: function(pixel) {
        // Уменьшение энергии
        pixel.energy -= 0.1;

        // Если энергия исчерпана, рыба превращается в "мертвую рыбу"
        if (pixel.energy <= 0) {
            changePixel(pixel, "dead_fish");
        }

        // Восстановление энергии в воде
        if (pixel.currentState === "water") {
            pixel.energy += 0.5;
        }

        // Поведение прыжков: при контакте с водой рыбка "прыгает" в воздух
        if (pixel.y < height - 1 && isEmpty(pixel.x, pixel.y + 1)) {
            pixel.energy += 0.2; // Лёгкое восстановление энергии
        }
    },
};

elements.dead_fish = {
    color: "#555555", // Серый цвет для мертвой рыбы
    behavior: behaviors.STATIC, // Никакого движения
    category: "life", // Категория остаётся той же
    state: "solid", // Мёртвая рыба становится твёрдой
    density: 1100, // Немного плотнее воды
};