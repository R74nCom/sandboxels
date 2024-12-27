// by Nekonico and SquareScreamYT

settings.limitless = true; 
saveSettings()

document.onkeydown = function(ki)/*keyboard_input*/ {
    //a
    if (ki.keyCode == 65) {
        KA = true;
        //vX ++;
    }
    //d
    if (ki.keyCode == 68) {
        KD = true;
        //vX ++;
    }
    //w
    if (ki.keyCode == 87) {
        KW = true;
        //vY ++;
    }
    //s
    if (ki.keyCode == 83) {
        KS = true;
        //vY ++;
    }
}
document.onkeyup = function(i2)/*keyboard_input*/ {
    //a
    if (i2.keyCode == 65) {
        KA = false;
        //vX --;
    }
    //d
    if (i2.keyCode == 68) {
        KD = false;
       //vX --;
    }
    //w
    if (i2.keyCode == 87) {
        KW = false;
        //vY = 0;
    }
    //s
    if (i2.keyCode == 83) {
        KS = false;
        //vY = 0;
    }

}
var groundUnder = "rpg_grass";
var health = 1000;
var heroX = 0;
var heroY = 0;
var gold = 0;
var metRue = false;
var hasSword = false;
var swordQuest = false;
var swordQuestDone = false;
var KA = false;
var KD = false;
var KW = false;
var KS = false;
var vX = 1;
var vY = 1;
elements.hero = {
    tick: function(pixel) {
        if (pixel.x !== heroX) {
            heroX = pixel.x
        }
        if (pixel.y !== heroY) {
            heroY = pixel.y
        }
    if (KA === true && KW === false && KS === false && KD === false) {
        if (!isEmpty(pixel.x-vX,pixel.y,true)) {
            if (elements[pixelMap[pixel.x-vX][pixel.y].element].isPassable === true) {
                var floor = pixelMap[pixel.x-vX][pixel.y]
                deletePixel(pixel.x,pixel.y)
                createPixel(groundUnder,pixel.x,pixel.y)
                pixel.generated = true
                groundUnder = (floor.element)
                changePixel(pixelMap[floor.x][floor.y],"hero")
            }
            else if (elements[pixelMap[pixel.x-vX][pixel.y].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x-vX][pixel.y],"hero")
                pixelMap[pixel.x-vX][pixel.y].color = "#005900"
                deletePixel(pixel.x,pixel.y)
                createPixel(groundUnder,pixel.x,pixel.y)
                groundUnder = "rpg_leaves"
            }
            else if (elements[pixelMap[pixel.x-vX][pixel.y].element].id === elements.chest.id) {
                var chest = pixelMap[pixel.x-vX][pixel.y]
                if (chest.contents !== "empty" && chest.contents !== "checked_empty") {
                    alert(`Wow! You got ${chest.contents}!`)
                    if (chest.contents === "gold") {
                        gold += 1
                        console.log("found gold")
                        chest.contents = "empty"
                        chest.color = "#471b05"
                    }
                    else if (chest.contents === "sword") {
                        hasSword = true
                        console.log("found sword")
                        chest.contents = "empty"
                        chest.color = "#471b05"
                    }
                }
                else if (chest.contents === "empty") {
                    alert(`wow it's empty`);
                    chest.contents = "checked_empty"
                }
            }
            else if (elements[pixelMap[pixel.x-vX][pixel.y].element].id === elements.rue.id) {
                var rue = pixelMap[pixel.x-vX][pixel.y]
                if (metRue === false) {
                    if (Math.random() > 0.5) {
                        alert(`Hi there!!`);
                    }
                    else {
                        alert(`Name's Rue!!`);
                    }
                    metRue = true
                }
                else if (metRue === true && swordQuest === false) {
                    if (confirm(`Sorry to be a bother, but I kinda need a sword. Do ya think you can find me one?`)) { 
                        alert(`Thanks friend!`)
                        swordQuest = true
                        console.log("sword quest code")
                    }
                    else if (!confirm(`Sorry to be a bother, but I kinda need a sword. Do ya think you can find me one?`)) { 
                        alert(`Ah, well, worth a shot. Maybe later?`)
                    }
                }
                else if (metRue === true && swordQuest === true && hasSword === false) {
                    alert(`Thank you for helping!`);
                }
                else if (metRue === true && swordQuest === true && hasSword === true) {
                    alert(`Thanks friend! Have some gold for your troubles.`);
                    console.log("sword quest completed")
                    swordQuestDone = true
                    hasSword = false
                    gold += 10
                }
                else if (metRue === true && swordQuest === true && hasSword === false && swordQuestDone === true) {
                    if (Math.random() > 0.5) {
                        alert(`So uh how are ya doing?`);
                    }
                    else if (Math.random() > 0.5) {
                        alert(`Thanks for the sword again!`);
                    }
                    else if (Math.random() > 0.5) {
                        alert(`Hi again!`);
                    }
                    else {
                        alert(`...`);
                    }
                }
            }
            else if (elements[pixelMap[pixel.x-vX][pixel.y].element].isEnemy === true) {
                var enemy = pixelMap[pixel.x-vX][pixel.y]
                if (hasSword === true) {
                    logMessage(`you killed an enemy`)
                    console.log("killed enemy")
                    deletePixel(enemy.x,enemy.y)
                    createPixel(enemy.groundUnder,enemy.x,enemy.y)
                    gold ++
                }
            }
        }
        if (shiftDown) {
            return
        }
        else {
            KA = false
        }
        }
    if (KA === false && KW === false && KS === false && KD === true) {
        if (!isEmpty(pixel.x+vX,pixel.y,true)) {
            if (elements[pixelMap[pixel.x+vX][pixel.y].element].isPassable === true) {
                var floor = pixelMap[pixel.x+vX][pixel.y]
                deletePixel(pixel.x,pixel.y)
                createPixel(groundUnder,pixel.x,pixel.y)
                groundUnder = (floor.element)
                changePixel(pixelMap[floor.x][floor.y],"hero")
            }
            else if (elements[pixelMap[pixel.x+vX][pixel.y].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x+vX][pixel.y],"hero")
                pixelMap[pixel.x+vX][pixel.y].color = "#005900"
                deletePixel(pixel.x,pixel.y)
                createPixel(groundUnder,pixel.x,pixel.y)
                groundUnder = "rpg_leaves"
            }
            else if (elements[pixelMap[pixel.x+vX][pixel.y].element].id === elements.chest.id) {
                var chest = pixelMap[pixel.x+vX][pixel.y]
                if (chest.contents !== "empty" && chest.contents !== "checked_empty") {
                    alert(`Wow! You got ${chest.contents}!`)
                    if (chest.contents === "gold") {
                        gold += 1
                        console.log("found gold")
                        chest.contents = "empty"
                        chest.color = "#471b05"
                    }
                    else if (chest.contents === "sword") {
                        hasSword = true
                        console.log("found sword")
                        chest.contents = "empty"
                        chest.color = "#471b05"
                    }
                }
                else if (chest.contents === "empty") {
                    alert(`wow it's empty`);
                    chest.contents = "checked_empty"
                }
            }
            else if (elements[pixelMap[pixel.x+vX][pixel.y].element].id === elements.rue.id) {
                var rue = pixelMap[pixel.x+vX][pixel.y]
                if (metRue === false) {
                    if (Math.random() > 0.5) {
                        alert(`Hi there!!`);
                    }
                    else {
                        alert(`Name's Rue!!`);
                    }
                    metRue = true
                }
                else if (metRue === true && swordQuest === false && hasSword === false) {
                    if (confirm(`Sorry to be a bother, but I kinda need a sword. Do ya think you can find me one?`)) { 
                        alert(`Thanks friend!`)
                        swordQuest = true
                        console.log("sword quest code")
                    }
                    else if (!confirm(`Sorry to be a bother, but I kinda need a sword. Do ya think you can find me one?`)) { 
                        alert(`Ah, well, worth a shot. Maybe later?`)
                    }
                }
                else if (metRue === true && swordQuest === true && hasSword === false && swordQuestDone === false) {
                    alert(`Thank you for helping!`);
                }
                else if (metRue === true && swordQuest === true && hasSword === true) {
                    alert(`Thanks friend! Have some gold for your troubles.`);
                    console.log("sword quest completed")
                    swordQuestDone = true
                    hasSword = false
                    gold += 10
                }
                else if (metRue === true && swordQuest === true && hasSword === false && swordQuestDone === true) {
                    if (Math.random() > 0.5) {
                        alert(`So uh how are ya doing?`);
                    }
                    else if (Math.random() > 0.5) {
                        alert(`Thanks for the sword again!`);
                    }
                    else if (Math.random() > 0.5) {
                        alert(`Hi again!`);
                    }
                    else {
                        alert(`...`);
                    }
                }
            }
            else if (elements[pixelMap[pixel.x+vX][pixel.y].element].isEnemy === true) {
                var enemy = pixelMap[pixel.x+vX][pixel.y]
                if (hasSword === true) {
                    logMessage(`you killed an enemy`)
                    console.log("killed enemy")
                    deletePixel(enemy.x,enemy.y)
                    createPixel(enemy.groundUnder,enemy.x,enemy.y)
                    gold ++
                }
            }
        }
        if (shiftDown) {
            return
        }
        else {
            KD = false
        }
        }
    if (KA === false && KW === true && KS === false && KD === false) {
        if (!isEmpty(pixel.x,pixel.y-vX,true)) {
            if (elements[pixelMap[pixel.x][pixel.y-vX].element].isPassable === true) {
                var floor = pixelMap[pixel.x][pixel.y-vX]
                deletePixel(pixel.x,pixel.y)
                createPixel(groundUnder,pixel.x,pixel.y)
                groundUnder = (floor.element)
                changePixel(pixelMap[floor.x][floor.y],"hero")
            }
            else if (elements[pixelMap[pixel.x][pixel.y-vX].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x][pixel.y-vX],"hero")
                pixelMap[pixel.x][pixel.y-vX].color = "#005900"
                deletePixel(pixel.x,pixel.y)
                createPixel(groundUnder,pixel.x,pixel.y)
                groundUnder = "rpg_leaves"
            }
            else if (elements[pixelMap[pixel.x][pixel.y-vX].element].id === elements.chest.id) {
                var chest = pixelMap[pixel.x][pixel.y-vX]
                if (chest.contents !== "empty" && chest.contents !== "checked_empty") {
                    alert(`Wow! You got ${chest.contents}!`)
                    if (chest.contents === "gold") {
                        gold += 1
                        console.log("found gold")
                        chest.contents = "empty"
                        chest.color = "#471b05"
                    }
                    else if (chest.contents === "sword") {
                        hasSword = true
                        console.log("found sword")
                        chest.contents = "empty"
                        chest.color = "#471b05"
                    }
                }
                else if (chest.contents === "empty") {
                    alert(`wow it's empty`);
                    chest.contents = "checked_empty"
                }
            }
            else if (elements[pixelMap[pixel.x][pixel.y-vX].element].id === elements.rue.id) {
                var rue = pixelMap[pixel.x][pixel.y-vX]
                if (metRue === false) {
                    if (Math.random() > 0.5) {
                        alert(`Hi there!!`);
                    }
                    else {
                        alert(`Name's Rue!!`);
                    }
                    metRue = true
                }
                else if (metRue === true && swordQuest === false && hasSword === false) {
                    if (confirm(`Sorry to be a bother, but I kinda need a sword. Do ya think you can find me one?`)) { 
                        alert(`Thanks friend!`)
                        swordQuest = true
                        console.log("sword quest code")
                    }
                    else if (!confirm(`Sorry to be a bother, but I kinda need a sword. Do ya think you can find me one?`)) { 
                        alert(`Ah, well, worth a shot. Maybe later?`)
                    }
                }
                else if (metRue === true && swordQuest === true && hasSword === false) {
                    alert(`Thank you for helping!`);
                }
                else if (metRue === true && swordQuest === true && hasSword === true) {
                    alert(`Thanks friend! Have some gold for your troubles.`);
                    console.log("sword quest completed")
                    swordQuestDone = true
                    hasSword = false
                    gold += 10
                }
                else if (metRue === true && swordQuest === true && hasSword === false && swordQuestDone === true) {
                    if (Math.random() > 0.5) {
                        alert(`So uh how are ya doing?`);
                    }
                    else if (Math.random() > 0.5) {
                        alert(`Thanks for the sword again!`);
                    }
                    else if (Math.random() > 0.5) {
                        alert(`Hi again!`);
                    }
                    else {
                        alert(`...`);
                    }
                }
            }
            else if (elements[pixelMap[pixel.x][pixel.y-vX].element].isEnemy === true) {
                var enemy = pixelMap[pixel.x][pixel.y-vX]
                if (hasSword === true) {
                    logMessage(`you killed an enemy`)
                    console.log("killed enemy")
                    deletePixel(enemy.x,enemy.y)
                    createPixel(enemy.groundUnder,enemy.x,enemy.y)
                    gold ++
                }
            }
        }
        if (shiftDown) {
            return
        }
        else {
            KW = false
        }
        }
    if (KA === false && KW === false && KS === true && KD === false) {
        if (!isEmpty(pixel.x,pixel.y+vX,true)) {
            if (elements[pixelMap[pixel.x][pixel.y+vX].element].isPassable === true) {
                var floor = pixelMap[pixel.x][pixel.y+vX]
                deletePixel(pixel.x,pixel.y)
                createPixel(groundUnder,pixel.x,pixel.y)
                groundUnder = (floor.element)
                changePixel(pixelMap[floor.x][floor.y],"hero")
            }
            else if (elements[pixelMap[pixel.x][pixel.y+vX].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x][pixel.y+vX],"hero")
                pixelMap[pixel.x][pixel.y+vX].color = "#006300"
                deletePixel(pixel.x,pixel.y)
                createPixel(groundUnder,pixel.x,pixel.y)
                groundUnder = "rpg_leaves"
            }
            else if (elements[pixelMap[pixel.x][pixel.y+vX].element].id === elements.chest.id) {
                var chest = pixelMap[pixel.x][pixel.y+vX]
                if (chest.contents !== "empty" && chest.contents !== "checked_empty") {
                    alert(`Wow! You got ${chest.contents}!`)
                    if (chest.contents === "gold") {
                        gold += 1
                        console.log("found gold")
                        chest.contents = "empty"
                        chest.color = "#471b05"
                    }
                    else if (chest.contents === "sword") {
                        hasSword = true
                        console.log("found sword")
                        chest.contents = "empty"
                        chest.color = "#471b05"
                    }
                }
                else if (chest.contents === "empty") {
                    alert(`wow it's empty`);
                    chest.contents = "checked_empty"
                }
            }
            else if (elements[pixelMap[pixel.x][pixel.y+vX].element].id === elements.rue.id) {
                var rue = pixelMap[pixel.x][pixel.y+vX]
                if (metRue === false) {
                    if (Math.random() > 0.5) {
                        alert(`Hi there!!`);
                    }
                    else {
                        alert(`Name's Rue!!`);
                    }
                    metRue = true
                }
                else if (metRue === true && swordQuest === false && hasSword === false) {
                    if (confirm(`Sorry to be a bother, but I kinda need a sword. Do ya think you can find me one?`)) { 
                        alert(`Thanks friend!`)
                        swordQuest = true
                        console.log("sword quest code")
                    }
                    else if (!confirm(`Sorry to be a bother, but I kinda need a sword. Do ya think you can find me one?`)) { 
                        alert(`Ah, well, worth a shot. Maybe later?`)
                    }
                }
                else if (metRue === true && swordQuest === true && hasSword === false) {
                    alert(`Thank you for helping!`);
                }
                else if (metRue === true && swordQuest === true && hasSword === true) {
                    alert(`Thanks friend! Have some gold for your troubles.`);
                    console.log("sword quest completed")
                    swordQuestDone = true
                    hasSword = false
                    gold += 10
                }
                else if (metRue === true && swordQuest === true && hasSword === false && swordQuestDone === true) {
                    if (Math.random() > 0.5) {
                        alert(`So uh how are ya doing?`);
                    }
                    else if (Math.random() > 0.5) {
                        alert(`Thanks for the sword again!`);
                    }
                    else if (Math.random() > 0.5) {
                        alert(`Hi again!`);
                    }
                    else {
                        alert(`...`);
                    }
                }
            }
            else if (elements[pixelMap[pixel.x][pixel.y+vX].element].isEnemy === true) {
                var enemy = pixelMap[pixel.x][pixel.y+vX]
                if (hasSword === true) {
                    logMessage(`you killed an enemy`)
                    console.log("killed enemy")
                    deletePixel(enemy.x,enemy.y)
                    createPixel(enemy.groundUnder,enemy.x,enemy.y)
                    gold ++
                }
            }
        }
        if (shiftDown) {
            return
        }
        else {
            KS = false
        }
        }
    },
    category: "rpg",
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","bone"],
    forceSaveColor: true,
    color:"#800020",
}

var rueGroundUnder = "rpg_grass";
var rueDir = "down";
elements.rue = {
    tick: function(pixel) {
    if (rueDir === "left" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x-vX,pixel.y,true)) {
            if (elements[pixelMap[pixel.x-vX][pixel.y].element].id === elements.rpg_grass.id) {
                changePixel(pixelMap[pixel.x-vX][pixel.y],"rue")
                deletePixel(pixel.x,pixel.y)
                createPixel(rueGroundUnder,pixel.x,pixel.y)
                rueGroundUnder = "rpg_grass"
            }
            else if (elements[pixelMap[pixel.x-vX][pixel.y].element].id === elements.rpg_sand.id) {
                changePixel(pixelMap[pixel.x-vX][pixel.y],"rue")
                deletePixel(pixel.x,pixel.y)
                createPixel(rueGroundUnder,pixel.x,pixel.y)
                rueGroundUnder = "rpg_sand"
            }
        }
        if (Math.random() > 0.75) {
            rueDir = "right"
        }
        else if (Math.random() > 0.75) {
            rueDir = "up"
        }
        else if (Math.random() > 0.75) {
            rueDir = "down"
        }
        }
    else if (rueDir === "right" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x+vX,pixel.y,true)) {
            if (elements[pixelMap[pixel.x+vX][pixel.y].element].id === elements.rpg_grass.id) {
                changePixel(pixelMap[pixel.x+vX][pixel.y],"rue")
                deletePixel(pixel.x,pixel.y)
                createPixel(rueGroundUnder,pixel.x,pixel.y)
                rueGroundUnder = "rpg_grass"
            }
            else if (elements[pixelMap[pixel.x+vX][pixel.y].element].id === elements.rpg_sand.id) {
                changePixel(pixelMap[pixel.x+vX][pixel.y],"rue")
                deletePixel(pixel.x,pixel.y)
                createPixel(rueGroundUnder,pixel.x,pixel.y)
                rueGroundUnder = "rpg_sand"
            }
        }
        if (Math.random() > 0.75) {
            rueDir = "left"
        }
        else if (Math.random() > 0.75) {
            rueDir = "down"
        }
        else if (Math.random() > 0.75) {
            rueDir = "up"
        }
        }
    else if (rueDir === "up" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x,pixel.y-vX,true)) {
            if (elements[pixelMap[pixel.x][pixel.y-vX].element].id === elements.rpg_grass.id) {
                changePixel(pixelMap[pixel.x][pixel.y-vX],"rue")
                deletePixel(pixel.x,pixel.y)
                createPixel(rueGroundUnder,pixel.x,pixel.y)
                rueGroundUnder = "rpg_grass"
            }
            else if (elements[pixelMap[pixel.x][pixel.y-vX].element].id === elements.rpg_sand.id) {
                changePixel(pixelMap[pixel.x][pixel.y-vX],"rue")
                deletePixel(pixel.x,pixel.y)
                createPixel(rueGroundUnder,pixel.x,pixel.y)
                rueGroundUnder = "rpg_sand"
            }
        }
        if (Math.random() > 0.75) {
            rueDir = "down"
        }
        else if (Math.random() > 0.75) {
            rueDir = "left"
        }
        else if (Math.random() > 0.75) {
            rueDir = "right"
        }
        }
    else if (rueDir === "down" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x,pixel.y+vX,true)) {
            if (elements[pixelMap[pixel.x][pixel.y+vX].element].id === elements.rpg_grass.id) {
                changePixel(pixelMap[pixel.x][pixel.y+vX],"rue")
                deletePixel(pixel.x,pixel.y)
                createPixel(rueGroundUnder,pixel.x,pixel.y)
                rueGroundUnder = "rpg_grass"
            }
            else if (elements[pixelMap[pixel.x][pixel.y+vX].element].id === elements.rpg_sand.id) {
                changePixel(pixelMap[pixel.x][pixel.y+vX],"rue")
                deletePixel(pixel.x,pixel.y)
                createPixel(rueGroundUnder,pixel.x,pixel.y)
                rueGroundUnder = "rpg_sand"
            }
        }
        if (Math.random() > 0.75) {
            rueDir = "up"
        }
        else if (Math.random() > 0.75) {
            rueDir = "right"
        }
        else if (Math.random() > 0.75) {
            rueDir = "left"
        }
        }
    },
    category: "rpg",
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","bone"],
    forceSaveColor: true,
    color:"#ffbe33",
}

elements.rpg_rat = {
    tick: function(pixel) {
        if (pixel.dir === undefined) {
            if (Math.random() > 0.5) {
                pixel.dir = "up"
            }
            else if (Math.random() > 0.5) {
                pixel.dir = "down"
            }
        }
        if (pixel.sidedir === undefined) {
            if (Math.random() > 0.5) {
                pixel.sidedir = "left"
            }
            else if (Math.random() > 0.5) {
                pixel.sidedir = "right"
            }
        }
    if (pixel.sidedir === "left" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x-vX,pixel.y,true)) {
            if (elements[pixelMap[pixel.x-vX][pixel.y].element].isPassable === true) {
                var floor = pixelMap[pixel.x-vX][pixel.y]
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                floor.groundUnder = floor.element
                changePixel(floor,pixel.element)
            }
            else if (elements[pixelMap[pixel.x-vX][pixel.y].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x-vX][pixel.y],pixel.element)
                pixelMap[pixel.x-vX][pixel.y].color = "#006300"
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                pixelMap[pixel.x-vX][pixel.y].groundUnder = "rpg_leaves"
            }
        }
        if (Math.random() > 0.75) {
            pixel.sidedir = "right"
        }
        else if (Math.random() > 0.75) {
            pixel.dir = "up"
        }
        else if (Math.random() > 0.75) {
            pixel.dir = "down"
        }
        }
    else if (pixel.sidedir === "right" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x+vX,pixel.y,true)) {
            if (elements[pixelMap[pixel.x+vX][pixel.y].element].isPassable === true) {
                var floor = pixelMap[pixel.x+vX][pixel.y]
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                floor.groundUnder = floor.element
                changePixel(floor,pixel.element)
            }
            else if (elements[pixelMap[pixel.x+vX][pixel.y].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x+vX][pixel.y],pixel.element)
                pixelMap[pixel.x+vX][pixel.y].color = "#006300"
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                pixelMap[pixel.x+vX][pixel.y].groundUnder = "rpg_leaves"
            }
        }
        if (Math.random() > 0.75) {
            pixel.sidedir = "left"
        }
        else if (Math.random() > 0.75) {
            pixel.dir = "down"
        }
        else if (Math.random() > 0.75) {
            pixel.dir = "up"
        }
        }
    else if (pixel.dir === "up" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x,pixel.y-vX,true)) {
            if (elements[pixelMap[pixel.x][pixel.y-vX].element].isPassable === true) {
                var floor = pixelMap[pixel.x][pixel.y-vX]
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                floor.groundUnder = floor.element
                changePixel(floor,pixel.element)
            }
            else if (elements[pixelMap[pixel.x][pixel.y-vX].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x][pixel.y-vX],pixel.element)
                pixelMap[pixel.x][pixel.y-vX].color = "#006300"
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                pixelMap[pixel.x][pixel.y-vX].groundUnder = "rpg_leaves"
            }
        }
        if (Math.random() > 0.75) {
            pixel.dir = "down"
        }
        else if (Math.random() > 0.75) {
            pixel.sidedir = "left"
        }
        else if (Math.random() > 0.75) {
            pixel.sidedir = "right"
        }
        }
    else if (pixel.dir === "down" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x,pixel.y+vX,true)) {
            if (elements[pixelMap[pixel.x][pixel.y+vX].element].isPassable === true) {
                var floor = pixelMap[pixel.x][pixel.y+vX]
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                floor.groundUnder = floor.element
                changePixel(floor,pixel.element)
            }
            else if (elements[pixelMap[pixel.x][pixel.y+vX].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x][pixel.y+vX],pixel.element)
                pixelMap[pixel.x][pixel.y+vX].color = "#006300"
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                pixelMap[pixel.x][pixel.y+vX].groundUnder = "rpg_leaves"
            }
        }
        if (Math.random() > 0.75) {
            pixel.dir = "up"
        }
        else if (Math.random() > 0.75) {
            pixel.sidedir = "right"
        }
        else if (Math.random() > 0.75) {
            pixel.sidedir = "left"
        }
        }
    },
    properties: {
        groundUnder: "rpg_grass",
    },
    category: "rpg",
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 200,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood","meat","bone"],
    forceSaveColor: true,
    isEnemy: true,
    color:"#8c7d82",
}

elements.golem = {
    tick: function(pixel) {
            if (heroY < pixel.y && heroY > pixel.y-15 && heroY < pixel.y+15 && heroX < pixel.x+15 && heroX > pixel.x-15) {
                pixel.dir = "up"
            }
            else if (heroY > pixel.y && heroY < pixel.y+15 && heroY > pixel.y-15 && heroX < pixel.x+15 && heroX > pixel.x-15) {
                pixel.dir = "down"
            }
            if (heroX < pixel.x && heroX > pixel.x-15 && heroX < pixel.x+15 && heroY < pixel.y+15 && heroY > pixel.y-15) {
                pixel.sidedir = "left"
            }
            else if (heroX > pixel.x && heroX < pixel.x+15 && heroX > pixel.x-15 && heroY < pixel.y+15 && heroY > pixel.y-15) {
                pixel.sidedir = "right"
            }
    if (pixel.sidedir === "left" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x-vX,pixel.y,true)) {
            if (elements[pixelMap[pixel.x-vX][pixel.y].element].isPassable === true) {
                var floor = pixelMap[pixel.x-vX][pixel.y]
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                floor.groundUnder = floor.element
                changePixel(floor,pixel.element)
            }
            else if (elements[pixelMap[pixel.x-vX][pixel.y].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x-vX][pixel.y],pixel.element)
                pixelMap[pixel.x][pixel.y+vX].color = "#006300"
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                pixelMap[pixel.x-vX][pixel.y].groundUnder = "rpg_leaves"
            }
            else if (elements[pixelMap[pixel.x-vX][pixel.y].element].id === elements.hero.id) {
                var hero = pixelMap[pixel.x-vX][pixel.y]
                if (health > 0) {
                    logMessage(`you took damage`)
                    console.log("took damage")
                    health --
                }
                else if (health < 1) {
                    logMessage(`you died!`)
                    console.log("player died")
                    deletePixel(hero.x,hero.y)
                    createPixel(groundUnder,hero.x,hero.y)
                }
            }
            pixel.charge = 1
        }
        if (heroY < pixel.y) {
            pixel.dir = "up"
        }
        else if (heroY > pixel.y) {
            pixel.dir = "down"
        }
        }
    else if (pixel.sidedir === "right" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x+vX,pixel.y,true)) {
            if (elements[pixelMap[pixel.x+vX][pixel.y].element].isPassable === true) {
                var floor = pixelMap[pixel.x+vX][pixel.y]
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                floor.groundUnder = floor.element
                changePixel(floor,pixel.element)
            }
            else if (elements[pixelMap[pixel.x+vX][pixel.y].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x+vX][pixel.y],pixel.element)
                pixelMap[pixel.x][pixel.y+vX].color = "#006300"
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                pixelMap[pixel.x+vX][pixel.y].groundUnder = "rpg_leaves"
            }
            else if (elements[pixelMap[pixel.x+vX][pixel.y].element].id === elements.hero.id) {
                var hero = pixelMap[pixel.x+vX][pixel.y]
                if (health > 0) {
                    logMessage(`you took damage`)
                    console.log("took damage")
                    health --
                }
                else if (health < 1) {
                    logMessage(`you died!`)
                    console.log("player died")
                    deletePixel(hero.x,hero.y)
                    createPixel(groundUnder,hero.x,hero.y)
                }
            }
            pixel.charge = 1
        }
        if (heroY < pixel.y) {
            pixel.dir = "up"
        }
        else if (heroY > pixel.y) {
            pixel.dir = "down"
        }
        }
    else if (pixel.dir === "up" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x,pixel.y-vX,true)) {
            if (elements[pixelMap[pixel.x][pixel.y-vX].element].isPassable === true) {
                var floor = pixelMap[pixel.x][pixel.y-vX]
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                floor.groundUnder = floor.element
                changePixel(floor,pixel.element)
            }
            else if (elements[pixelMap[pixel.x][pixel.y-vX].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x][pixel.y-vX],pixel.element)
                pixelMap[pixel.x][pixel.y+vX].color = "#006300"
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                pixelMap[pixel.x][pixel.y-vX].groundUnder = "rpg_leaves"
            }
            else if (elements[pixelMap[pixel.x][pixel.y-vX].element].id === elements.hero.id) {
                var hero = pixelMap[pixel.x][pixel.y-vX]
                if (health > 0) {
                    logMessage(`you took damage`)
                    console.log("took damage")
                    health --
                }
                else if (health < 1) {
                    logMessage(`you died!`)
                    console.log("player died")
                    deletePixel(hero.x,hero.y)
                    createPixel(groundUnder,hero.x,hero.y)
                }
            }
            pixel.charge = 1
        }
        if (heroX < pixel.x) {
            pixel.sidedir = "left"
        }
        else if (heroX > pixel.x) {
            pixel.sidedir = "right"
        }
        }
    else if (pixel.dir === "down" && Math.random() > 0.9) {
        if (!isEmpty(pixel.x,pixel.y+vX,true)) {
            if (elements[pixelMap[pixel.x][pixel.y+vX].element].isPassable === true) {
                var floor = pixelMap[pixel.x][pixel.y+vX]
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                floor.groundUnder = floor.element
                changePixel(floor,pixel.element)
            }
            if (elements[pixelMap[pixel.x][pixel.y+vX].element].id === elements.rpg_leaves.id) {
                changePixel(pixelMap[pixel.x][pixel.y+vX],pixel.element)
                pixelMap[pixel.x][pixel.y+vX].color = "#006300"
                deletePixel(pixel.x,pixel.y)
                createPixel(pixel.groundUnder,pixel.x,pixel.y)
                pixelMap[pixel.x][pixel.y+vX].groundUnder = "rpg_leaves"
            }
            if (elements[pixelMap[pixel.x][pixel.y+vX].element].id === elements.hero.id) {
                var hero = pixelMap[pixel.x][pixel.y+vX]
                if (health > 0) {
                    logMessage(`you took damage`);
                    console.log("took damage");
                    health--;
                }
                else if (health < 1) {
                    logMessage(`you died!`);
                    console.log("player died");
                    deletePixel(hero.x,hero.y);
                    createPixel(groundUnder,hero.x,hero.y);
                }
            }
            pixel.charge = 1
        }
        if (heroX < pixel.x) {
            pixel.sidedir = "left";
        }
        else if (heroX > pixel.x) {
            pixel.sidedir = "right";
        }
        }
        doDefaults(pixel);
    },
    properties: {
        groundUnder: "rpg_grass",
    },
    category: "rpg",
    state: "solid",
    conduct: .05,
    temp: 37,
    tempHigh: 2000,
    stateHigh: "brick_rubble",
    breakInto: "brick_rubble",
    forceSaveColor: true,
    isEnemy: true,
    color:"#7d5042",
}

elements.rpg_grass = {
    color: "#00bf00",
    colorKey: {
        "D":"#99F762",
        "L":"#00bf00",
        "B":"#439809"
    },
    colorPattern: [
        "BBLB",
        "BBBL",
        "BDBB",
        "DBBB",
        "BBLB",
        "BBBL",
        "BBDB",
        "BBBD",
        "BLBB",
        "LBBB"
    ],
    behavior: behaviors.WALL,
    renderer: renderPresets.PLANTCHAR,
    category:"rpg",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    isPassable: true,
    forceSaveColor: true,
    properties: {
        "age": 0
    },
    tick: function(pixel) {
        if (Math.random() < 0.03 && pixel.age < 1) {
            let canPlaceTree = true;
            for (let xradius = 0; xradius < 5; xradius++) {
                for (let yradius = 0; yradius < 5; yradius++) {
                    let checkX = pixel.x-2+xradius;
                    let checkY = pixel.y-2+yradius;
                    if (!isEmpty(checkX, checkY, true)) {
                        let checkPixel = pixelMap[checkX][checkY];
                        if (checkPixel.element === "rpg_tree" || checkPixel.element === "rpg_leaves") {
                            canPlaceTree = false;
                            break;
                        }
                    }
                }
                if (!canPlaceTree) break;
            }
            
            if (canPlaceTree && pixel.generated === true) {
                createPixel("rpg_tree", pixel.x, pixel.y);
            }
        }
        pixel.age++;
    }
}

elements.rpg_sand = {
    color: "#e6d577",
    behavior: behaviors.WALL,
    tempHigh: 1700,
    stateHigh: "molten_glass",
    category: "rpg",
    state: "solid",
    density: 1602,
    isPassable: true,
    forceSaveColor: true
}

elements.rpg_leaves = {
    color: "#006300",
    behavior: behaviors.WALL,
    renderer: renderPresets.PLANTCHAR,
    category:"rpg",
    tempHigh: 100,
    stateHigh: "dead_plant",
    tempLow: -1.66,
    stateLow: "frozen_plant",
    burn:15,
    burnTime:60,
    burnInto: "dead_plant",
    breakInto: "dead_plant",
    state: "solid",
    density: 1050,
    forceSaveColor: true
}

elements.rpg_tree = {
    color: "#694b37",
    behavior: behaviors.WALL,
    tick: function(pixel) {
        if (!isEmpty(pixel.x,pixel.y-1,true)) {
            if (elements[pixelMap[pixel.x][pixel.y-1].element].id === elements.rpg_leaves.id || elements[pixelMap[pixel.x][pixel.y-1].element].id === elements.hero.id) {
                return;
            }
            else {
                deletePixel(pixel.x,pixel.y-1)
                createPixel("rpg_leaves",pixel.x,pixel.y-1)
            }
        }
        if (!isEmpty(pixel.x,pixel.y-2,true)) {
            if (elements[pixelMap[pixel.x][pixel.y-2].element].id === elements.rpg_leaves.id || elements[pixelMap[pixel.x][pixel.y-2].element].id === elements.hero.id) {
                return;
            }
            else {
                deletePixel(pixel.x,pixel.y-2)
                createPixel("rpg_leaves",pixel.x,pixel.y-2)
            }
        }
        if (!isEmpty(pixel.x+1,pixel.y-1,true)) {
            if (elements[pixelMap[pixel.x+1][pixel.y-1].element].id === elements.rpg_leaves.id || elements[pixelMap[pixel.x+1][pixel.y-1].element].id === elements.hero.id) {
                return;
            }
            else {
                deletePixel(pixel.x+1,pixel.y-1)
                createPixel("rpg_leaves",pixel.x+1,pixel.y-1)
            }
        }
        if (!isEmpty(pixel.x-1,pixel.y-1,true)) {
            if (elements[pixelMap[pixel.x-1][pixel.y-1].element].id === elements.rpg_leaves.id || elements[pixelMap[pixel.x-1][pixel.y-1].element].id === elements.hero.id) {
                return;
            }
            else {
                deletePixel(pixel.x-1,pixel.y-1)
                createPixel("rpg_leaves",pixel.x-1,pixel.y-1)
            }
        }
    },
    renderer: renderPresets.WOODCHAR,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "rpg",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    forceSaveColor: true
}

elements.chest = {
    color: "#a0522d",
    tick: function(pixel) {
        doDefaults(pixel);
        if (pixel.contents === undefined) {
            pixel.contents = Math.random() < 0.75 ? "gold" : "sword";
        }
    },
    behavior: behaviors.WALL,
    renderer: renderPresets.WOODCHAR,
    tempHigh: 400,
    stateHigh: ["ember","charcoal","fire","fire","fire"],
    category: "rpg",
    burn: 5,
    burnTime: 300,
    burnInto: ["ember","charcoal","fire"],
    state: "solid",
    hardness: 0.15,
    breakInto: "sawdust",
    forceSaveColor: true
}

elements.rpg_water = {
    color: "#2167ff",
    colorKey: {
        "L":"#2167ff",
        "B":"#4d85ff"
    },
    colorPattern: [
        "BLL",
        "BLL",
        "LLB",
        "LLB"
    ],
    behavior: behaviors.WALL,
    reactions: {
        "vinegar": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "baking_soda": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "bleach": { elem1:"dead_plant", elem2:null, chance:0.05 },
        "alcohol": { elem1:"dead_plant", elem2:null, chance:0.035 },
        "mercury": { elem1:"dead_plant", elem2:null, chance:0.01 },
        "salt": { elem1:"dead_plant", elem2:null, chance:0.001 },
        "stench": { elem2:null, chance:0.25 },
        "chlorine": { stain1:"#a2bf00" },
    },
    tempHigh: 100,
    stateHigh: "steam",
    tempLow: 0,
    stateLow: "ice",
    category: "rpg",
    heatCapacity: 4.184,
    state: "solid",
    density: 997,
    conduct: 0.02,
    forceSaveColor: true
}

elements.rpg_stone = {
    color: "#808080",
    colorKey: {
        "L":"#949494",
        "B":"#7a7a7a"
    },
    colorPattern: [
        "LBL",
        "LBL",
        "LLB",
        "LLB",
        "BLL",
        "BLL",
    ],
    behavior: behaviors.WALL,
    tempHigh: 950,
    stateHigh: "magma",
    category: "rpg",
    state: "solid",
    density: 2550,
    hardness: 0.5,
    breakInto: "rock"
}

elements.rpg_stone_floor = {
    color: "#808080",
    colorKey: {
        "B":"#808080",
        "L":"#4f4f4f"
    },
    colorPattern: [
        "BBLBLBBL",
        "BBBLBBLB",
        "BLBBBBLB",
        "BBBBBLBB",
        "BBLBLBBL",
        "BBBBBLBB",
        "BBBLLBBB",
        "BLBBBLBB",
        "BLBBBBLB",
        "BBBBBLBB",
        "BBBLLBBB",
        "LBBLBLBL",
        "BBBBBLBB",
        "BBLBLBBL",
        "BLBBBLBB",
        "BLBBBBLB",
        "BBLBLBBL",
        "BBBLBBLB",
        "BLBBBBLB",
        "BBBBBLBB",
        "BBLBLBBL",
        "BBBBBLBB",
        "BBBLLBBB",
        "BLBBBLBB",
        "BLBBBBLB",
    ],
    behavior: behaviors.WALL,
    tempHigh: 950,
    stateHigh: "magma",
    category: "rpg",
    state: "solid",
    density: 2550,
    hardness: 0.5,
    isPassable: true,
    breakInto: "rock"
}

const noise = {
    permutation: [],
    p: new Array(512),
    
    init() {
        for(let i=0; i<256; i++) {
            this.permutation[i] = Math.floor(Math.random() * 256);
        }
        
        for(let i=0; i<512; i++) {
            this.p[i] = this.permutation[i & 255];
        }
    },
    
    perlin2(x, y) {
        let X = Math.floor(x) & 255;
        let Y = Math.floor(y) & 255;
        
        x -= Math.floor(x);
        y -= Math.floor(y);
        
        let u = this.fade(x);
        let v = this.fade(y);
        
        let A = this.p[X] + Y;
        let B = this.p[X + 1] + Y;
        
        return this.lerp(
            v,
            this.lerp(
                u,
                this.grad(this.p[A], x, y),
                this.grad(this.p[B], x-1, y)
            ),
            this.lerp(
                u,
                this.grad(this.p[A+1], x, y-1),
                this.grad(this.p[B+1], x-1, y-1)
            )
        );
    },
    
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    },
    
    lerp(t, a, b) {
        return a + t * (b - a);
    },
    
    grad(hash, x, y) {
        let h = hash & 15;
        let grad = 1 + (h & 7);
        if(h & 8) grad = -grad;
        return grad * x + grad * y;
    }
};
noise.init();

elements.map_generator = {
    color: "#999999",
    behavior: behaviors.FILL,
    tick: function(pixel) {
        if (pixel.elevationIndex === undefined) {
            let scale = 0.05 
            pixel.elevationIndex = noise.perlin2(pixel.x * scale, pixel.y * scale)
        }
        
        if (pixel.age > 100) {
            if (pixel.elevationIndex >= 2 + Math.random()/20) {
                deletePixel(pixel.x,pixel.y)
                createPixel("rpg_stone_floor",pixel.x,pixel.y)
            }
            else if (pixel.elevationIndex >= -0.1 + Math.random()/20) {
                deletePixel(pixel.x,pixel.y)
                createPixel("rpg_grass",pixel.x,pixel.y)
                pixelMap[pixel.x][pixel.y].generated = true
            }
            else if (pixel.elevationIndex >= -0.3 + Math.random()/20) {
                deletePixel(pixel.x,pixel.y)
                createPixel("rpg_sand",pixel.x,pixel.y)
            }
            else {
                deletePixel(pixel.x,pixel.y)
                createPixel("rpg_water",pixel.x,pixel.y)
            }
            return
        }

        const neighbors = [
            [0,1], [0,-1], [1,0], [-1,0],
            [-1,1], [1,1], [-1,-1], [1,-1]
        ]
        
        for (let [dx,dy] of neighbors) {
            let nx = pixel.x + dx
            let ny = pixel.y + dy
            
            if (!isEmpty(nx,ny,true)) {
                let neighbor = pixelMap[nx][ny]
                if (neighbor.elevationIndex === undefined) {
                    let noiseValue = noise.perlin2(nx * 0.05, ny * 0.05)
                    neighbor.elevationIndex = (pixel.elevationIndex + noiseValue) / 2
                }
            }
        }
        
        pixel.age++
    },
    properties: {
        "age": 0
    },
    category: "rpg",
    excludeRandom: true,
    density: 1834
}
