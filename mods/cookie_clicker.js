// by Nekonico

elements.cookie_dough = {
    color: ["#bfac91","#CDBFAB",],
    behavior: behaviors.STURDYPOWDER,
    reactions: {
        "chocolate": { elem1:"chocolate_chip_cookie_dough", elem2:null, chance: 0.5 },
        "chocolate_powder": { elem1:"chocolate_chip_cookie_dough", elem2:null, chance: 0.5 },
    },
    category: "food",
    tempHigh: 74,
    stateHigh: "plain_cookie",
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true,
    cookievalue: 0.5
}

elements.chocolate_chip_cookie_dough = {
    color: ["#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#4d2818","#3b1b0d","#33160a"],
    behavior: behaviors.STURDYPOWDER,
    category: "food",
    tempHigh: 74,
    stateHigh: "cookie",
    burn:40,
    burnTime:25,
    burnInto:"ash",
    state: "solid",
    density: 526.9,
    isFood: true,
    cookievalue: 0.5
}

clicked = false
shopclicked = false
cookies = 0
oldcookies = 0
createdcookies = 0
/*
CpS = 0
mouseEff = 1 */
buildings = { "cursors": [0,15,15], "grandmas": [0,100,100], "farms": [0,1100,1100], }
shopitem = "cursors"
/*
shopupgrade = 0
boughtUpgrades = { "cursors": [], "grandmas": [], "farms": [], } */
cursorCount = []
grandmaCount = []
farmCount = []
cursorprice = buildings.cursors[1]
grandmaprice = buildings.grandmas[1]
farmprice = buildings.farms[1]


elements.plain_cookie = {
    color: ["#C4966C","#C0946B"],
    behavior: behaviors.POWDER,
    reactions: {
        "chocolate": { elem1:"cookie", elem2:null, chance: 0.25 },
        "chocolate_powder": { elem1:"cookie", elem2:null, chance: 0.25 },
    },
    tempHigh: 192,
    stateHigh: "toast",
    category: "food",
    burn: 10,
    burnTime: 200,
    burnInto: "toast",
    breakInto: "crumb",
    breakIntoColor: ["#c8946a","#c08655","#ba7a45","#a86d3e"],
    state: "solid",
    density: 233.96,
    isFood: true,
    cookievalue: 1
}

elements.cookie = {
    color: ["#C4966C","#C0946B","#C4966C","#C0946B","#C4966C","#C0946B","#C4966C","#C0946B","#C4966C","#C0946B","#4d2818","#3b1b0d","#33160a"],
    behavior: behaviors.POWDER,
    tick: function(pixel) {
        var top = mousePos.y - Math.floor(mouseSize/2);
        var bottom = mousePos.y + Math.floor(mouseSize/2);
        var left = mousePos.x - Math.floor(mouseSize/2);
        var right = mousePos.x + Math.floor(mouseSize/2);
        if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown === true && clicked === false) {
            clicked = true
            cookies += 1
        }
        else if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown !== true && clicked === true) {
            clicked = false
        }
        doDefaults(pixel);
    },
    tempHigh: 95,
    stateHigh: ["melted_chocolate","plain_cookie","plain_cookie"],
    category: "food",
    burn: 10,
    burnTime: 200,
    burnInto: ["melted_chocolate","plain_cookie","plain_cookie"],
    breakInto: ["crumb","crumb","crumb","crumb","crumb","chocolate","chocolate_powder"],
    breakIntoColor: ["#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#4d2818","#3b1b0d","#33160a"],
    state: "solid",
    density: 233.96,
    isFood: true,
    cookievalue: 1
}

elements.the_cookie = {
    color: ["#C4966C","#C0946B","#C4966C","#C0946B","#C4966C","#C0946B","#C4966C","#C0946B","#C4966C","#C0946B","#4d2818","#3b1b0d","#33160a"],
    colorKey: {
        "l": "#C4966C",
        "r": "#C0946B",
        "d": "#4d2818",
        "w": "#3b1b0d",
        "b": "#33160a",
    },
    colorPattern: [
        "rlrlrlrlrlrlrlrlrlr",
        "rlrlrlrlrlrlrlrlrlr",
        "rlrldlrlrlrlrlrlrlr",
        "rlrlrwblrlrlrlrlrlr",
        "rlrlrlrlrlrlwbrlrlr",
        "rlrlddwlrlrlddwlrlr",
        "rlrlwddbrlrbrlrlrlr",
        "rlrldbdwrlrlrlrlrlr",
        "rlrlrdwrrlrlrlrlrlr",
        "rlrlrlrlrlrlrlblrlr",
        "rlwlrlrlrlrlwdwlrlr",
        "rlrlwlrlrlrlrlrlrlr",
        "rlbwblrlrlrlrlrlrlr",
        "rldlblrlrlrlrlrlrlr",
        "rlrlrlrlbwrlrlrlrlr",
        "rlrlrlrlwbdlrlrlrlr",
        "rlrlrlrlrdrlrlrlrlr",
        "rlrlrlrlrlrlrlrlrlr",
        "rlrlrlrlrlrlrlrlrlr",
    ],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        var top = mousePos.y - Math.floor(mouseSize/2);
        var bottom = mousePos.y + Math.floor(mouseSize/2);
        var left = mousePos.x - Math.floor(mouseSize/2);
        var right = mousePos.x + Math.floor(mouseSize/2);
        if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown === true && clicked === false) {
            clicked = true
            cookies += 1
        }
        else if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown !== true && clicked === true) {
            clicked = false
        }
        doDefaults(pixel);
    },
    tempHigh: 95,
    stateHigh: ["melted_chocolate","plain_cookie","plain_cookie"],
    category: "clicker",
    burn: 10,
    burnTime: 200,
    burnInto: ["melted_chocolate","plain_cookie","plain_cookie"],
    breakInto: ["crumb","crumb","crumb","crumb","crumb","chocolate","chocolate_powder"],
    breakIntoColor: ["#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#4d2818","#3b1b0d","#33160a"],
    state: "solid",
    density: 233.96,
    isFood: true,
    movable: false,
}
 /*
elements.upgrade_shop = {
    color: "#9C998B",
    behavior: behaviors.WALL,
    onSelect: function() {
        var answer5 = prompt("Input the desired upgrade of this shop. It will not work if you place multiple upgrade shops while paused.",(shopupgrade||"cursors"));
        if (!answer5) { return }
		shopupgrade = (answer5);
        var answer4 = prompt("Input the desired item of this shop. It will not work if you place multiple shop items while paused.",(shopitem||"cursors"));
        if (!answer4) { return }
		shopitem = (answer4);
    }, 
    tick: function(pixel) {
        if (pixel.start < pixelTicks && !pixel.upgrade) {
            pixel.upgrade = shopupgrade
        }
        if (pixel.start < pixelTicks && !pixel.item) {
            pixel.item = shopitem
        }
        if (boughtUpgrades[pixel.item].indexOf(pixel.upgrade) !== -1 && pixel.upgrade <= 3) {
            pixel.upgrade += 1
        }
        if ((cursorprice != buildings.cursors[1] || !cursorprice) || (grandmaprice != buildings.grandmas[1] || !grandmaprice) || (farmprice != buildings.farms[1])) {
            cursorprice = Math.floor(buildings.cursors[1])
            grandmaprice = Math.floor(buildings.grandmas[1])
            farmprice = Math.floor(buildings.farms[1])
        }
        var top = mousePos.y - Math.floor(mouseSize/2);
        var bottom = mousePos.y + Math.floor(mouseSize/2);
        var left = mousePos.x - Math.floor(mouseSize/2);
        var right = mousePos.x + Math.floor(mouseSize/2);
        if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown === true && shopclicked === false && cookies >= (Math.floor(buildings[pixel.item][1]))) {
            shopclicked = true
            buildings[pixel.item][0] += 1
            cookies -= (Math.round(buildings[pixel.item][1]))
            buildings[pixel.item][1] = (buildings[pixel.item][2] * (1.15 ** buildings[pixel.item][0]))
        }
        else if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown === true && shopclicked === false) {
            shopclicked = true
        }
        else if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown !== true && shopclicked === true) {
            shopclicked = false
        }
        doDefaults(pixel);
    },
    tempHigh: 95,
    stateHigh: ["melted_chocolate","plain_cookie","plain_cookie"],
    category: "clicker",
    burn: 10,
    burnTime: 200,
    burnInto: ["melted_chocolate","plain_cookie","plain_cookie"],
    breakInto: ["crumb","crumb","crumb","crumb","crumb","chocolate","chocolate_powder"],
    breakIntoColor: ["#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#4d2818","#3b1b0d","#33160a"],
    state: "solid",
    density: 233.96,
    isFood: true,
    movable: false,
} */

elements.shop = {
    color: "#9C998B",
    behavior: behaviors.WALL,
    onSelect: function() {
        var answer5 = prompt("Input the desired item of this shop. It will not work if you place multiple shop items while paused.",(shopitem||"cursors"));
        if (!answer5) { return }
		shopitem = (answer5);
    }, 
    tick: function(pixel) {
        if (pixel.start < pixelTicks && !pixel.item) {
            pixel.item = shopitem
        }
        if ((cursorprice != buildings.cursors[1] || !cursorprice) || (grandmaprice != buildings.grandmas[1] || !grandmaprice) || (farmprice != buildings.farms[1])) {
            cursorprice = Math.floor(buildings.cursors[1])
            grandmaprice = Math.floor(buildings.grandmas[1])
            farmprice = Math.floor(buildings.farms[1])
        }
        var top = mousePos.y - Math.floor(mouseSize/2);
        var bottom = mousePos.y + Math.floor(mouseSize/2);
        var left = mousePos.x - Math.floor(mouseSize/2);
        var right = mousePos.x + Math.floor(mouseSize/2);
        if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown === true && shopclicked === false && cookies >= (Math.floor(buildings[pixel.item][1]))) {
            shopclicked = true
            buildings[pixel.item][0] += 1
            cookies -= (Math.round(buildings[pixel.item][1]))
            buildings[pixel.item][1] = (buildings[pixel.item][2] * (1.15 ** buildings[pixel.item][0]))
        }
        else if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown === true && shopclicked === false) {
            shopclicked = true
        }
        else if ((pixel.x >= left && pixel.x <= right && pixel.y >= top && pixel.y <= bottom) && mouseIsDown !== true && shopclicked === true) {
            shopclicked = false
        }
        doDefaults(pixel);
    },
    tempHigh: 95,
    stateHigh: ["melted_chocolate","plain_cookie","plain_cookie"],
    category: "clicker",
    burn: 10,
    burnTime: 200,
    burnInto: ["melted_chocolate","plain_cookie","plain_cookie"],
    breakInto: ["crumb","crumb","crumb","crumb","crumb","chocolate","chocolate_powder"],
    breakIntoColor: ["#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#bfac91","#CDBFAB","#4d2818","#3b1b0d","#33160a"],
    state: "solid",
    density: 233.96,
    isFood: true,
    movable: false,
}

elements.cookie_maker = {
    color: ["#60a2c3","#2e80a9"],
    colorKey: {
        "l": "#60a2c3",
        "r": "#2e80a9",
    },
    colorPattern: [
        "rrrlll",
    ],
    behavior: behaviors.WALL,
    tick: function(pixel) {
        if (cookies > 0 && oldcookies < cookies) {
            createdcookies = (cookies - oldcookies)
            oldcookies = cookies
        }
        else if (oldcookies > cookies) {
            oldcookies = cookies
        }
        if (isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.75 && createdcookies > 0) {
            createdcookies -= 1
            createPixel("cookie", pixel.x, pixel.y+1)
        }
    },
    category: "clicker",
    state: "solid",
    density: 2000,
    movable: false,
}

elements.cursor = {
    color: ["#60a2c3","#2e80a9"],
    colorKey: {
        "l": "#60a2c3",
        "r": "#2e80a9",
    },
    colorPattern: [
        "rrrlll",
    ],
    behavior: behaviors.WALL,
    onPlace: function(pixel) {
        cursorCount.push(pixel)
        for (c = 0; c < cursorCount.length; c++) {
            if (cursorCount[c] == pixel) {
                pixel.cursorbuy = c
                break;
            }
        }
    },
    tick: function(pixel) {
        pixel.PixelTicks = pixelTicks
        if (buildings.cursors[0] > pixel.cursorbuy) {
            pixel.bought = true
        }
        if (pixel.bought === true) {
        if (pixel.click > 0) {
            pixel.click--
        }
        if ((pixel.PixelTicks - (pixel.cursorbuy * 1.5)) % 300 == 0) {
            cookies += 1
            pixel.color = "#aaaaaa"
            pixel.click = 4
        }
        if ((!pixel.click || pixel.click === 0) && pixel.PixelTicks % 300 != 0 && pixel.PixelPreTicks % 300 != 0 && pixel.color != "#ffffff") {
            pixel.color = "#ffffff"
        }
        if (pixel.cursorbuy === 143 && buildings.cursors[0] > 143) {
            if ((pixel.PixelTicks - (pixel.cursorbuy * 1.5)) % 300 == 0) {
                cookies += (buildings.cursors[0] - 143)
            }
        }
        }
    },
    movable: false,
    tempHigh: 220,
    stateHigh: "cooked_meat",
    category: "clicker",
    state: "solid",
    density: 1080,
    hardness: 0.1,
    breakInto: "meat"
},

elements.grandma = {
    color: "#ffdbac",
    category: "clicker",
    properties: {
        dead: false,
        dir: 1,
    },
    related: ["granbody","granhead"],
    cooldown: defaultCooldown,
    forceSaveColor: true,
    tick: function(pixel) {
        if (isEmpty(pixel.x, pixel.y+1)) {
            createPixel("granbody", pixel.x, pixel.y+1);
            var color = pixel.color;
            changePixel(pixel,"granhead");
            pixel.color = color;
            if (pixel.bodyColor) {
                pixelMap[pixel.x][pixel.y+1].color = pixel.bodyColor;
            }
        }
        else if (isEmpty(pixel.x, pixel.y-1)) {
            createPixel("granhead", pixel.x, pixel.y-1);
            pixelMap[pixel.x][pixel.y-1].color = pixel.color;
            changePixel(pixel,"granbody");
            if (pixel.bodyColor) {
                pixel.color = pixel.bodyColor;
            }
        }
    }
}

elements.granhead = {
    color: "#ffdbac",
    category: "clicker",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 150,
    stateHigh: "cookie",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cookie",
    breakInto: ["cookie_dough","meat","bone"],
    forceSaveColor: true,
    reactions: {
        "cancer": { elem1:"cancer", chance:0.005 },
        "radiation": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.4 },
        "neutron": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
        "fallout": { elem1:["ash","meat","rotten_meat","cooked_meat"], chance:0.03 },
        "plague": { elem1:"plague", chance:0.05 },
        "oxygen": { elem2:"carbon_dioxide", chance:0.5 },
        "beans": { elem2:[null,null,null,null,null,null,null,null,"stench"], chance:0.2 },
        "sun": { elem1:"cooked_meat" },
        "light": { stain1:"#825043" },
        "bee": { stain1:"#cc564b", chance:0.2 },
        "water": { elem2:"bubble", attr2:{"clone":"water"}, chance:0.001 },
        "salt_water": { elem2:"bubble", attr2:{"clone":"salt_water"}, chance:0.001 },
        "pool_water": { elem2:"bubble", attr2:{"clone":"pool_water"}, chance:0.001 },
        "alcohol": { chance:0.2, attr1:{"panic":0} },
    },
    properties: {
        dead: false
    },
    tick: function(pixel) {
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"meat");
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y+1, true) && pixelMap[pixel.x][pixel.y+1].element == "granbody") {
            var body = pixelMap[pixel.x][pixel.y+1];
            if (body.dead) { // If body is dead, kill head
                pixel.dead = body.dead;
            }
        }
        else { var body = null }

        if (tryMove(pixel, pixel.x, pixel.y+1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y+1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("cookie_dough", pixel.x, pixel.y+1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1; }
        else if (pixel.temp < 37) { pixel.temp += 1; }
    },
    onChange: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = adjacentCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
                pixelMap[x][y].panic += 20;
            }
        }
    },
    onDelete: function(pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = adjacentCoords[i];
            var x = pixel.x+coord[0];
            var y = pixel.y+coord[1];
            if (!isEmpty(x,y,true) && pixelMap[x][y].panic !== undefined) {
                pixelMap[x][y].panic += 20;
            }
        }
    }
}

elements.granbody = {
    color: "#b6effb",
    category: "clicker",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 150,
    stateHigh: "cookie",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cookie",
    breakInto: ["cookie_dough","meat","bone"],
    forceSaveColor: true,
    properties: {
        dead: false,
        dir: 1,
    },
    tick: function(pixel) {
        if (tryMove(pixel, pixel.x, pixel.y+1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y-2, true)) { // Drag head down
                var headpixel = pixelMap[pixel.x][pixel.y-2];
                if (headpixel.element === "granhead") {
                    if (isEmpty(pixel.x, pixel.y-1)) {
                        movePixel(pixelMap[pixel.x][pixel.y-2], pixel.x, pixel.y-1);
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y-2], pixelMap[pixel.x][pixel.y-1]);
                    }
                }
            }
        }
        doHeat(pixel);
        doBurning(pixel);
        doElectricity(pixel);
        if (pixel.dead) {
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks-pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel,"meat");
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y-1, true) && pixelMap[pixel.x][pixel.y-1].element == "granhead") {
            var head = pixelMap[pixel.x][pixel.y-1];
            if (head.dead) { // If head is dead, kill body
                pixel.dead = head.dead;
            }
            else if (head.panic > 0) {
                delete head.panic;
            }
        }
        else { var head = null }
        if (pixel.panic > 0) {
            pixel.panic -= 0.1;
            if (pixel.panic < 0) { pixel.panic = 0; }
            else if (pixel.panic > 1) { pixel.panic = 1; }
        }

        if (isEmpty(pixel.x, pixel.y-1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1 && !pixel.charge) {
                createPixel("cookie_dough", pixel.x, pixel.y-1);
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks;
                }
            }
        }
        else if (head === null) { return }
        else if (Math.random() < 0.1*(isEmpty(pixel.x, pixel.y+1) ? 1 : 1)) { // Move 10% chance
            var movesToTry = [
                [1*pixel.dir,0],
                [1*pixel.dir,-1],
            ];
            let moved = false;
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0];
                if (isEmpty(pixel.x+move[0], pixel.y+move[1]-1)) {
                    var origx = pixel.x+move[0];
                    var origy = pixel.y+move[1];
                    if (tryMove(pixel, pixel.x+move[0], pixel.y+move[1]) && pixel.x===origx && pixel.y===origy) {
                        movePixel(head, head.x+move[0], head.y+move[1]);
                        moved = true;
                        break;
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15 || !moved) {
                pixel.dir *= -1;
            }
            // homeostasis
            if (pixel.temp > 37) { pixel.temp -= 1; }
            else if (pixel.temp < 37) { pixel.temp += 1; }
        }
        pixel.PixelTicks = pixelTicks
        if (pixel.PixelTicks % 30 == 0 && pixel.dead === false) {
            cookies += 1
        }
    }
}

elements.grandma_maker = {
    color: "#a0522d",
    behavior: behaviors.WALL,
    onPlace: function(pixel) {
        grandmaCount.push(pixel)
        for (g = 0; g < grandmaCount.length; g++) {
            if (grandmaCount[g] == pixel) {
                pixel.grandmalevel = g
                break;
            }
        }
    },
    tick: function(pixel) {
        if (buildings.grandmas[0] > pixel.grandmalevel && isEmpty(pixel.x,pixel.y+1) && Math.random() > 0.5 && pixel.created !== true) {
            pixel.created = true
            createPixel("grandma", pixel.x, pixel.y+1)
        }
    },
    category: "clicker",
    state: "solid",
    density: 2000,
    movable: false,
}

elements.cookie_crop = {
    color: "#C4966C",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        pixel.PixelTicks = pixelTicks
        if (pixel.h === undefined) { 
            pixel.h = 0
        }
        if (pixel.h < 2) {
        if (!tryMove(pixel,pixel.x,pixel.y+1)) {
            if (pixel.temp < 100) {
                if (isEmpty(pixel.x,pixel.y-1) && tryMove(pixel,pixel.x,pixel.y-1)) {
                    createPixel("cookie_crop",pixel.x,pixel.y+1);
                    pixelMap[pixel.x][pixel.y+1].h = 4
                    pixel.h++
                }
            }
        }
        }
        if (pixel.h === 2) {
            if (pixel.temp < 100) {
                if (isEmpty(pixel.x+1,pixel.y) && pixel.leftPetal !== true) {
                    createPixel("cookie_crop",pixel.x+1,pixel.y);
                    pixelMap[pixel.x+1][pixel.y].h = 4
                    pixelMap[pixel.x+1][pixel.y].color = "#942e8c"
                    pixel.leftPetal = true
                }
                if (isEmpty(pixel.x-1,pixel.y) && pixel.rightPetal !== true) {
                    createPixel("cookie_crop",pixel.x-1,pixel.y);
                    pixelMap[pixel.x-1][pixel.y].h = 4
                    pixelMap[pixel.x-1][pixel.y].color = "#942e8c"
                    pixel.rightPetal = true
                }
                if (isEmpty(pixel.x,pixel.y-1)) {
                    createPixel("flower_cookie",pixel.x,pixel.y-1);
                    pixel.h = 3
                }
            }
        }
        if (pixel.h === 3) {
            if (pixel.temp < 100) {
                if (isEmpty(pixel.x+1,pixel.y) && pixel.leftPetal !== true) {
                    createPixel("cookie_crop",pixel.x+1,pixel.y);
                    pixelMap[pixel.x+1][pixel.y].h = 4
                    pixelMap[pixel.x+1][pixel.y].color = "#942e8c"
                    pixel.leftPetal = true
                }
                if (isEmpty(pixel.x-1,pixel.y) && pixel.rightPetal !== true) {
                    createPixel("cookie_crop",pixel.x-1,pixel.y);
                    pixelMap[pixel.x-1][pixel.y].h = 4
                    pixelMap[pixel.x-1][pixel.y].color = "#942e8c"
                    pixel.rightPetal = true
                }
                if (pixel.color != "#734e39") {
                    pixel.color = "#734e39"
                }
            }
        }
        doDefaults(pixel);
    },
    tempHigh: 200,
    stateHigh: "cookie",
    burn: 5,
    burnTime: 100,
    category: "clicker",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true
}

elements.flower_cookie = {
    color: ["#C4966C","#C0946B","#C4966C","#C0946B","#4d2818","#3b1b0d","#33160a"],
    behavior: [
        "XX|ST:cookie_crop|XX",
        "ST:cookie_crop|XX|ST:cookie_crop",
        "M2|ST:cookie_crop AND M1|M2",
    ],
    tick: function(pixel) {
        pixel.PixelTicks = pixelTicks
        if (pixel.PixelTicks % 30 == 0 && !isEmpty(pixel.x,pixel.y+1, true)) {
            cookies += 8
        }
    },
    tempHigh: 200,
    stateHigh: "cookie",
    burn: 5,
    burnTime: 100,
    category: "clicker",
    state: "solid",
    density: 1500,
    cooldown: defaultCooldown,
    seed: true
}

elements.farm_deployer = {
    color: ["#76552b","#5c4221","#573c1a","#6b481e"],
    behavior: behaviors.WALL,
    onPlace: function(pixel) {
        farmCount.push(pixel)
        for (f = 0; f < farmCount.length; f++) {
            if (farmCount[f] == pixel) {
                pixel.farmbuy = f
                break;
            }
        }
    },
    tick: function(pixel) {
        if (buildings.farms[0] > pixel.farmbuy) {
            pixel.bought = true
        }
        if (pixel.bought === true) {
            changePixel(pixel, "cookie_crop")
        }
    },
    category: "clicker",
    state: "solid",
    density: 2000,
    movable: false,
}

elements.background = {
    color: ["#60a2c3","#2e80a9"],
    colorKey: {
        "l": "#60a2c3",
        "r": "#2e80a9",
    },
    colorPattern: [
        "rrrlll",
    ],
    onSelect: function() {
        logMessage("Draw a pipe, wait for walls to appear, then erase the exit hole.");
    },
    tick: function(pixel) {
        if (!pixel.stage && pixelTicks-pixel.start > 60) {
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && elements[pixelMap[x][y].element].movable) {
                    deletePixel(x,y)
                }
                if (isEmpty(x,y)) {
                    createPixel("pipe_wall",x,y);
                }
            }
            pixel.stage = 1;
        }
        else if (pixel.stage === 1 && pixelTicks-pixel.start > 70) { //uninitialized
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (isEmpty(x,y)) {
                    pixel.stage = 2; //blue
                    break;
                }
            }
        }
        else if (pixel.stage > 1 && pixelTicks % 3 === pixel.stage-2) { //initialized
            for (var i = 0; i < squareCoords.length; i++) {
                var coord = squareCoords[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true) && pixelMap[x][y].element === pixel.element) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.stage === 1) {
                        var newColor;
                        switch (pixel.stage) {
                            case 2: newPixel.stage = 3; newColor = "#003600"; break; //green
                            case 3: newPixel.stage = 4; newColor = "#360000"; break; //red
                            case 4: newPixel.stage = 2; newColor = "#000036"; break; //blue
                        }
                    }
                }
            }
            var moved = false;
            shuffleArray(squareCoordsShuffle);
            for (var i = 0; i < squareCoordsShuffle.length; i++) {
                var coord = squareCoordsShuffle[i];
                var x = pixel.x+coord[0];
                var y = pixel.y+coord[1];
                if (!isEmpty(x,y,true)) {
                    var newPixel = pixelMap[x][y];
                    if (newPixel.element === pixel.element) {
                        var nextStage;
                        switch (pixel.stage) {
                            case 2: nextStage = 4; break; //green
                            case 3: nextStage = 2; break; //red
                            case 4: nextStage = 3; break; //blue
                        }
                        if (pixel.con && !newPixel.con && newPixel.stage === nextStage) { //transfer to adjacent pipe
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            moved = true;
                            break;
                        }
                    }
                    else if (!pixel.con && elements[newPixel.element].movable) { //suck up pixel
                        pixel.con = newPixel;
                        deletePixel(newPixel.x,newPixel.y);
                        pixel.con.x = pixel.x;
                        pixel.con.y = pixel.y;
                        pixel.con.del;
                        moved = true;
                        break;
                    }
                }
            }
            if (pixel.con && !moved) { // move to same stage if none other
                for (var i = 0; i < squareCoordsShuffle.length; i++) {
                    var coord = squareCoordsShuffle[i];
                    var x = pixel.x+coord[0];
                    var y = pixel.y+coord[1];
                    if (isEmpty(x,y)) {
                        delete pixel.con.del;
                        pixel.con.x = x;
                        pixel.con.y = y;
                        pixelMap[x][y] = pixel.con;
                        currentPixels.push(pixel.con);
                        pixel.con = null;
                        break;
                    }
                    if (!isEmpty(x,y,true) && pixelMap[x][y].element === pixel.element) {
                        var newPixel = pixelMap[x][y];
                        if (pixel.con && !newPixel.con && newPixel.stage === pixel.stage) {
                            newPixel.con = pixel.con;
                            newPixel.con.x = newPixel.x;
                            newPixel.con.y = newPixel.y;
                            pixel.con = null;
                            break;
                        }
                    }
                }
            }
        }
        doDefaults(pixel);
    },
    movable: false,
    canContain: true,
    behavior: behaviors.WALL,
    tempHigh: 248,
    stateHigh: ["fire","fire","fire","fire","fire","ash"],
    burn: 70,
    burnTime: 300,
    burnInto: ["fire","fire","fire","fire","fire","ash"],
    category: "clicker",
    state: "solid",
    density: 1201,
    breakInto: "confetti",
    breakIntoColor: ["#ffffff","#e6e6e6","#dbdbdb"]
}

updateStats = function() {
    var statsDiv = document.getElementById("stats");
    var stats = "<span id='stat-pos' class='stat'>x"+mousePos.x+",y"+mousePos.y+"</span>";
    stats += "<span id='stat-pixels' class='stat"+ (currentPixels.length >= Math.min(maxPixelCount,(height+1)*(width+1)) ? " redText" : "") +"'>Pxls:" + currentPixels.length+"</span>";
    stats += "<span id='stat-tps' class='stat'>" + tps+"tps</span>";
    stats += "<span id='stat-ticks' class='stat'>" + pixelTicks+"</span>";
    stats += "<span id='stat-cookies' class='stat'>Cookies:" + cookies+"</span>";
    if ((typeof pixelMap).length === 9) { return; }
    if (pixelMap[mousePos.x] !== undefined) {
        var currentPixel = pixelMap[mousePos.x][mousePos.y];
        if (currentPixel !== undefined) {
            stats += "<span id='stat-element' class='stat'>"+langKey("gui.stats.elem","Elem")+":<span>"+(elements[currentPixel.element].name || currentPixel.element).toUpperCase()+"</span></span>";
            stats += "<span id='stat-temperature' class='stat'>"+langKey("gui.stats.temp","Temp")+":"+formatTemp(currentPixel.temp)+"</span>";
            if (currentPixel.charge) {
                stats += "<span id='stat-charge' class='stat'>C"+parseFloat(currentPixel.charge)+"</span>";
            }
            if (currentPixel.burning) {
                stats += "<span id='stat-burning' class='stat'>"+langKey("gui.stats.burning","Burning")+"</span>";
            }
            if (elements[currentPixel.element].hoverStat) {
                stats += "<span id='stat-hover' class='stat'>"+elements[currentPixel.element].hoverStat(currentPixel).toString().replaceAll("<","&lt;")+"</span>";
            }
            else if (elements[currentElement].toolHoverStat) {
                stats += "<span id='stat-hover' class='stat'>"+elements[currentElement].toolHoverStat(currentPixel).toString().replaceAll("<","&lt;")+"</span>";
            }
            else if (currentPixel.clone) {
                stats += "<span id='stat-clone' class='stat'>"+currentPixel.clone.toString().toUpperCase().replaceAll("<","&lt;")+"</span>";
            }
            else if (currentPixel.con && currentPixel.con.element) {
                stats += "<span id='stat-clone' class='stat'>"+currentPixel.con.element.toString().toUpperCase().replaceAll("<","&lt;")+"</span>";
            }
        }
    }
    if (shiftDown) {
        stats += "<span id='stat-shift' class='stat'>"+shiftDownTypes[shiftDown]+"</span>";
    }
    // If the view is not null, show the view in all caps
    if (view !== null) {
        stats += "<span id='stat-view' class='stat'>"+(viewInfo[view] ? viewInfo[view].name : view)+"</span>";
    }
    statsDiv.innerHTML = stats;
}

buildingProduction = function() { 
    for (var i = 0; i <= cursorCount.length; i++) {
        if (i >= (cursorCount.length - 1) && cursorCount[i - 1] && cursorCount[i - 1].bought == true) {
            if ((pixelTicks - (buildings.cursors[i] * 1.5)) % 300 == 0) {
                cookies += (buildings.cursors[0] - (i + 1))
                break;
            }
        }
    }
    for (var i = 0; i <= (grandmaCount.length - 1); i++) {
        if (i >= (grandmaCount.length - 1) && grandmaCount[i - 1] && grandmaCount[i - 1].created == true) {
            if (pixelTicks % 30 == 0) {
                cookies += (buildings.grandmas[0] - (i + 1))
                break;
            }
        }
    }
    for (var i = 0; i <= farmCount.length; i++) {
        if (i >= (farmCount.length - 1) && farmCount[i - 1] && farmCount[i - 1].bought == true) {
            if (pixelTicks % 30 == 0) {
                cookies += ((buildings.farms[0] - (i + 1)) * 8)
                break;
            }
        }
    }
}

runEveryTick(buildingProduction)

elements.dough.reactions.sugar = { elem1:"cookie_dough", elem2: null, chance:0.5}
elements.dough.reactions.chocolate = { elem1:"chocolate_chip_cookie_dough", elem2: null, chance:0.5}
elements.dough.reactions.chocolate_powder = { elem1:"chocolate_chip_cookie_dough", elem2: null, chance:0.5}