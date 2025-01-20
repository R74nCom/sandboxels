elements.better_ball = {
    name: "ball",
    tick: function(pixel) {
        if (pixel.dir === "down") {
            if (tryMove(pixel, pixel.x, pixel.y+1)) {
                    if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.speed > 0.5) {
                        pixel.speed += 1
                        console.log("go up and down code")
                        if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.speed > 0.5) { 
                            var beneath = pixelMap[pixel.x][pixel.y+1];
                            if (elements[beneath.element].id === elements.better_ball.id) { 
                                if (beneath.dir === "up") { 
                                    pixel.dir = "up"
                                    beneath.dir = "down"
                                    beneath.speed = pixel.speed
                                    pixel.speed = beneath.speed
                                }
                                else { 
                                    pixel.dir = "up"
                                }
                            }
                            else { 
                                pixel.dir = "up"
                            }
                        }
                        else if (outOfBounds(pixel.x,pixel.y+1) && pixel.speed > 0.5) { 
                            pixel.dir = "up"
                        }
                    }
                    else {
                        pixel.speed += 1
                        console.log("increase speed code")
                    }
            }
            else if (!tryMove(pixel, pixel.x, pixel.y+1) && (!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1))) {
                if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.roll === false && (isEmpty(pixel.x-1, pixel.y+1) || isEmpty(pixel.x+1, pixel.y+1))) {
                    console.log("incline code")
                    if (isEmpty(pixel.x+1, pixel.y+1)) {
                        pixel.rolldir = 1
                    }
                    else if (isEmpty(pixel.x-1, pixel.y+1)) {
                        pixel.rolldir = -1
                    }
                    tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y+1);
                    pixel.rollspeed += 1
                }
                else if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.rollspeed > 0) {
                    pixel.rollspeed -= 1
                    pixel.speed = 0
                    if (pixel.roll === false) {
                        pixel.roll = true
                    }
                    if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y, true) && pixel.rollspeed < 10) {
                        console.log("bounce off wall code")
                        pixel.rolldir = (pixel.rolldir-(2*pixel.rolldir))
                    }
                    else if (pixel.rollspeed > 9 && isEmpty(pixel, pixel.x+(pixel.rolldir), pixel.y-1) && !isEmpty(pixel.x+(pixel.rolldir), pixel.y, true)) {
                        console.log("uphill code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y-1);
                        pixel.rollspeed -= 1
                        pixel.speed = 0
                    }
                    else if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y+1, true)) {
                        console.log("roll code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y)
                    }
                    else if (isEmpty(pixel.x+(pixel.rolldir), pixel.y)) {
                        console.log("stop roll code")
                        pixel.roll = false
                    }
                }
                else if (pixel.rollspeed < 1 && pixel.roll === true) {
                    pixel.roll = false
                }
            }
        } 
        else if (pixel.speed > 0 && pixel.dir === "up") {
            if (tryMove(pixel, pixel.x, pixel.y-1)) {
                pixel.speed -= 1.15
                if (outOfBounds(pixel.x,pixel.y-1) || !isEmpty(pixel.x, pixel.y-1, true)) { 
                    if (!isEmpty(pixel.x, pixel.y-1, true) && pixel.speed > 0) { 
                        var above = pixelMap[pixel.x][pixel.y-1];
                        if (elements[above.element].id === elements.better_ball.id) {
                            if (above.dir === "down") { 
                                pixel.dir = "down"
                                above.dir = "up"
                                above.speed = pixel.speed
                                pixel.speed = above.speed
                            }
                            else { 
                                pixel.dir = "down"
                            }
                        }
                    }
                    else if (outOfBounds(pixel.x,pixel.y-1) && pixel.speed > 0) { 
                        pixel.dir = "down"
                    }
                }
                if (pixel.speed < 1) { 
                    pixel.dir = "down"
                }
            }
        } 
        doDefaults(pixel);
    },
    properties: {
        speed: 0,
        dir: "down",
        roll: false,
        rollspeed: 0,
    },
    color: "#e35693",
    tempHigh: 250,
    stateHigh: "molten_plastic",
    category: "special"
}

elements.basketball = {
    tick: function(pixel) {
        if (pixel.dir === "down") {
            if (tryMove(pixel, pixel.x, pixel.y+1)) {
                    if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.speed > 0.5) {
                        pixel.speed += 1
                        console.log("go up and down code")
                        if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.speed > 0.5) { 
                            var beneath = pixelMap[pixel.x][pixel.y+1];
                            if (elements[beneath.element].id === elements.better_ball.id) { 
                                if (beneath.dir === "up") { 
                                    pixel.dir = "up"
                                    beneath.dir = "down"
                                    beneath.speed = pixel.speed
                                    pixel.speed = beneath.speed
                                }
                                else { 
                                    pixel.dir = "up"
                                }
                            }
                            else { 
                                pixel.dir = "up"
                            }
                        }
                        else if (outOfBounds(pixel.x,pixel.y+1) && pixel.speed > 0.5) { 
                            pixel.dir = "up"
                        }
                    }
                    else {
                        pixel.speed += 1
                        console.log("increase speed code")
                    }
            }
            else if (!tryMove(pixel, pixel.x, pixel.y+1) && (!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1))) {
                if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.roll === false && (isEmpty(pixel.x-1, pixel.y+1) || isEmpty(pixel.x+1, pixel.y+1))) {
                    console.log("incline code")
                    if (isEmpty(pixel.x+1, pixel.y+1)) {
                        pixel.rolldir = 1
                    }
                    else if (isEmpty(pixel.x-1, pixel.y+1)) {
                        pixel.rolldir = -1
                    }
                    tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y+1);
                    pixel.rollspeed += 1
                }
                else if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.rollspeed > 0) {
                    pixel.rollspeed -= 1
                    pixel.speed = 0
                    if (pixel.roll === false) {
                        pixel.roll = true
                    }
                    if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y, true) && pixel.rollspeed < 10) {
                        console.log("bounce off wall code")
                        pixel.rolldir = (pixel.rolldir-(2*pixel.rolldir))
                    }
                    else if (pixel.rollspeed > 9 && isEmpty(pixel, pixel.x+(pixel.rolldir), pixel.y-1) && !isEmpty(pixel.x+(pixel.rolldir), pixel.y, true)) {
                        console.log("uphill code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y-1);
                        pixel.rollspeed -= 1
                        pixel.speed = 0
                    }
                    else if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y+1, true)) {
                        console.log("roll code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y)
                    }
                    else if (isEmpty(pixel.x+(pixel.rolldir), pixel.y)) {
                        console.log("stop roll code")
                        pixel.roll = false
                    }
                }
                else if (pixel.rollspeed < 1 && pixel.roll === true) {
                    pixel.roll = false
                }
            }
        } 
        else if (pixel.speed > 0 && pixel.dir === "up") {
            if (tryMove(pixel, pixel.x, pixel.y-1)) {
                pixel.speed -= 1.4
                if (outOfBounds(pixel.x,pixel.y-1) || !isEmpty(pixel.x, pixel.y-1, true)) { 
                    if (!isEmpty(pixel.x, pixel.y-1, true) && pixel.speed > 0) { 
                        var above = pixelMap[pixel.x][pixel.y-1];
                        if (elements[above.element].id === elements.better_ball.id) {
                            if (above.dir === "down") { 
                                pixel.dir = "down"
                                above.dir = "up"
                                above.speed = pixel.speed
                                pixel.speed = above.speed
                            }
                            else { 
                                pixel.dir = "down"
                            }
                        }
                    }
                    else if (outOfBounds(pixel.x,pixel.y-1) && pixel.speed > 0) { 
                        pixel.dir = "down"
                    }
                }
                if (pixel.speed < 1) { 
                    pixel.dir = "down"
                }
            }
        } 
        doDefaults(pixel);
    },
    properties: {
        speed: 0,
        dir: "down",
        roll: false,
        rollspeed: 0,
    },
    color: ["#B54213","#B54213","#161616","#B54213","#B54213","#161616","#B54213","#B54213"],
    tempHigh: 350,
    stateHigh: ["cooked_meat","smoke","smoke","smoke","smoke","ash","molten_plastic","molten_plastic","molten_plastic","molten_plastic","molten_plastic","molten_plastic"],
    category: "special"
}

elements.tennis_ball = {
    tick: function(pixel) {
        if (pixel.dir === "down") {
            if (tryMove(pixel, pixel.x, pixel.y+1)) {
                    if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.speed > 0.5) {
                        pixel.speed += 1
                        console.log("go up and down code")
                        if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.speed > 0.5) { 
                            var beneath = pixelMap[pixel.x][pixel.y+1];
                            if (elements[beneath.element].id === elements.better_ball.id) { 
                                if (beneath.dir === "up") { 
                                    pixel.dir = "up"
                                    beneath.dir = "down"
                                    beneath.speed = pixel.speed
                                    pixel.speed = beneath.speed
                                }
                                else { 
                                    pixel.dir = "up"
                                }
                            }
                            else { 
                                pixel.dir = "up"
                            }
                        }
                        else if (outOfBounds(pixel.x,pixel.y+1) && pixel.speed > 0.5) { 
                            pixel.dir = "up"
                        }
                    }
                    else {
                        pixel.speed += 1
                        console.log("increase speed code")
                    }
            }
            else if (!tryMove(pixel, pixel.x, pixel.y+1) && (!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1))) {
                if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.roll === false && (isEmpty(pixel.x-1, pixel.y+1) || isEmpty(pixel.x+1, pixel.y+1))) {
                    console.log("incline code")
                    if (isEmpty(pixel.x+1, pixel.y+1)) {
                        pixel.rolldir = 1
                    }
                    else if (isEmpty(pixel.x-1, pixel.y+1)) {
                        pixel.rolldir = -1
                    }
                    tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y+1);
                    pixel.rollspeed += 1
                }
                else if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.rollspeed > 0) {
                    pixel.rollspeed -= 1
                    pixel.speed = 0
                    if (pixel.roll === false) {
                        pixel.roll = true
                    }
                    if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y, true) && pixel.rollspeed < 10) {
                        console.log("bounce off wall code")
                        pixel.rolldir = (pixel.rolldir-(2*pixel.rolldir))
                    }
                    else if (pixel.rollspeed > 9 && isEmpty(pixel, pixel.x+(pixel.rolldir), pixel.y-1) && !isEmpty(pixel.x+(pixel.rolldir), pixel.y, true)) {
                        console.log("uphill code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y-1);
                        pixel.rollspeed -= 1
                        pixel.speed = 0
                    }
                    else if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y+1, true)) {
                        console.log("roll code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y)
                    }
                    else if (isEmpty(pixel.x+(pixel.rolldir), pixel.y)) {
                        console.log("stop roll code")
                        pixel.roll = false
                    }
                }
                else if (pixel.rollspeed < 1 && pixel.roll === true) {
                    pixel.roll = false
                }
            }
        } 
        else if (pixel.speed > 0 && pixel.dir === "up") {
            if (tryMove(pixel, pixel.x, pixel.y-1)) {
                pixel.speed -= 1.5
                if (outOfBounds(pixel.x,pixel.y-1) || !isEmpty(pixel.x, pixel.y-1, true)) { 
                    if (!isEmpty(pixel.x, pixel.y-1, true) && pixel.speed > 0) { 
                        var above = pixelMap[pixel.x][pixel.y-1];
                        if (elements[above.element].id === elements.better_ball.id) {
                            if (above.dir === "down") { 
                                pixel.dir = "down"
                                above.dir = "up"
                                above.speed = pixel.speed
                                pixel.speed = above.speed
                            }
                            else { 
                                pixel.dir = "down"
                            }
                        }
                    }
                    else if (outOfBounds(pixel.x,pixel.y-1) && pixel.speed > 0) { 
                        pixel.dir = "down"
                    }
                }
                if (pixel.speed < 1) { 
                    pixel.dir = "down"
                }
            }
        } 
        doDefaults(pixel);
    },
    properties: {
        speed: 0,
        dir: "down",
        roll: false,
        rollspeed: 0,
    },
    color: ["#ccff00","#ccff00","#dff6c8","#ccff00","#ccff00","#dff6c8","#ccff00","#ccff00"],
    tempHigh: 412,
    stateHigh: "fire",
    burn: 5,
    burnTime: 350,
    burnInto: ["smoke","smoke","smoke","smoke","ash"],
    state: "solid",
    category: "special"
}

elements.golf_ball = {
    tick: function(pixel) {
        if (pixel.dir === "down") {
            if (tryMove(pixel, pixel.x, pixel.y+1)) {
                    if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.speed > 0.5) {
                        pixel.speed += 1
                        console.log("go up and down code")
                        if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.speed > 0.5) { 
                            var beneath = pixelMap[pixel.x][pixel.y+1];
                            if (elements[beneath.element].id === elements.better_ball.id) { 
                                if (beneath.dir === "up") { 
                                    pixel.dir = "up"
                                    beneath.dir = "down"
                                    beneath.speed = pixel.speed
                                    pixel.speed = beneath.speed
                                }
                                else { 
                                    pixel.dir = "up"
                                }
                            }
                            else { 
                                pixel.dir = "up"
                            }
                        }
                        else if (outOfBounds(pixel.x,pixel.y+1) && pixel.speed > 0.5) { 
                            pixel.dir = "up"
                        }
                    }
                    else {
                        pixel.speed += 1
                        console.log("increase speed code")
                    }
            }
            else if (!tryMove(pixel, pixel.x, pixel.y+1) && (!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1))) {
                if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.roll === false && (isEmpty(pixel.x-1, pixel.y+1) || isEmpty(pixel.x+1, pixel.y+1))) {
                    console.log("incline code")
                    if (isEmpty(pixel.x+1, pixel.y+1)) {
                        pixel.rolldir = 1
                    }
                    else if (isEmpty(pixel.x-1, pixel.y+1)) {
                        pixel.rolldir = -1
                    }
                    tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y+1);
                    pixel.rollspeed += 1
                }
                else if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.rollspeed > 0) {
                    pixel.rollspeed -= 0.9
                    pixel.speed = 0
                    if (pixel.roll === false) {
                        pixel.roll = true
                    }
                    if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y, true) && pixel.rollspeed < 10) {
                        console.log("bounce off wall code")
                        pixel.rolldir = (pixel.rolldir-(2*pixel.rolldir))
                    }
                    else if (pixel.rollspeed > 9 && isEmpty(pixel, pixel.x+(pixel.rolldir), pixel.y-1) && !isEmpty(pixel.x+(pixel.rolldir), pixel.y, true)) {
                        console.log("uphill code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y-1);
                        pixel.rollspeed -= 0.9
                        pixel.speed = 0
                    }
                    else if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y+1, true)) {
                        console.log("roll code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y)
                    }
                    else if (isEmpty(pixel.x+(pixel.rolldir), pixel.y)) {
                        console.log("stop roll code")
                        pixel.roll = false
                    }
                }
                else if (pixel.rollspeed < 1 && pixel.roll === true) {
                    pixel.roll = false
                }
            }
        } 
        else if (pixel.speed > 0 && pixel.dir === "up") {
            if (tryMove(pixel, pixel.x, pixel.y-1)) {
                pixel.speed -= 1.3
                if (outOfBounds(pixel.x,pixel.y-1) || !isEmpty(pixel.x, pixel.y-1, true)) { 
                    if (!isEmpty(pixel.x, pixel.y-1, true) && pixel.speed > 0) { 
                        var above = pixelMap[pixel.x][pixel.y-1];
                        if (elements[above.element].id === elements.better_ball.id) {
                            if (above.dir === "down") { 
                                pixel.dir = "down"
                                above.dir = "up"
                                above.speed = pixel.speed
                                pixel.speed = above.speed
                            }
                            else { 
                                pixel.dir = "down"
                            }
                        }
                    }
                    else if (outOfBounds(pixel.x,pixel.y-1) && pixel.speed > 0) { 
                        pixel.dir = "down"
                    }
                }
                if (pixel.speed < 1) { 
                    pixel.dir = "down"
                }
            }
        } 
        doDefaults(pixel);
    },
    properties: {
        speed: 0,
        dir: "down",
        roll: false,
        rollspeed: 0,
    },
    color: "#edf1e6",
    tempHigh: 350,
    stateHigh: "molten_plastic",
    state: "solid",
    category: "special"
}

elements.golf_ball = {
    tick: function(pixel) {
        if (pixel.dir === "down") {
            if (tryMove(pixel, pixel.x, pixel.y+1)) {
                    if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.speed > 0.5) {
                        pixel.speed += 1
                        console.log("go up and down code")
                        if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.speed > 0.5) { 
                            var beneath = pixelMap[pixel.x][pixel.y+1];
                            if (elements[beneath.element].id === elements.better_ball.id) { 
                                if (beneath.dir === "up") { 
                                    pixel.dir = "up"
                                    beneath.dir = "down"
                                    beneath.speed = pixel.speed
                                    pixel.speed = beneath.speed
                                }
                                else { 
                                    pixel.dir = "up"
                                }
                            }
                            else { 
                                pixel.dir = "up"
                            }
                        }
                        else if (outOfBounds(pixel.x,pixel.y+1) && pixel.speed > 0.5) { 
                            pixel.dir = "up"
                        }
                    }
                    else {
                        pixel.speed += 1
                        console.log("increase speed code")
                    }
            }
            else if (!tryMove(pixel, pixel.x, pixel.y+1) && (!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1))) {
                if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.roll === false && (isEmpty(pixel.x-1, pixel.y+1) || isEmpty(pixel.x+1, pixel.y+1))) {
                    console.log("incline code")
                    if (isEmpty(pixel.x+1, pixel.y+1)) {
                        pixel.rolldir = 1
                    }
                    else if (isEmpty(pixel.x-1, pixel.y+1)) {
                        pixel.rolldir = -1
                    }
                    tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y+1);
                    pixel.rollspeed += 1
                }
                else if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.rollspeed > 0) {
                    pixel.rollspeed -= 0.9
                    pixel.speed = 0
                    if (pixel.roll === false) {
                        pixel.roll = true
                    }
                    if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y, true) && pixel.rollspeed < 10) {
                        console.log("bounce off wall code")
                        pixel.rolldir = (pixel.rolldir-(2*pixel.rolldir))
                    }
                    else if (pixel.rollspeed > 9 && isEmpty(pixel, pixel.x+(pixel.rolldir), pixel.y-1) && !isEmpty(pixel.x+(pixel.rolldir), pixel.y, true)) {
                        console.log("uphill code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y-1);
                        pixel.rollspeed -= 0.9
                        pixel.speed = 0
                    }
                    else if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y+1, true)) {
                        console.log("roll code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y)
                    }
                    else if (isEmpty(pixel.x+(pixel.rolldir), pixel.y)) {
                        console.log("stop roll code")
                        pixel.roll = false
                    }
                }
                else if (pixel.rollspeed < 1 && pixel.roll === true) {
                    pixel.roll = false
                }
            }
        } 
        else if (pixel.speed > 0 && pixel.dir === "up") {
            if (tryMove(pixel, pixel.x, pixel.y-1)) {
                pixel.speed -= 1.3
                if (outOfBounds(pixel.x,pixel.y-1) || !isEmpty(pixel.x, pixel.y-1, true)) { 
                    if (!isEmpty(pixel.x, pixel.y-1, true) && pixel.speed > 0) { 
                        var above = pixelMap[pixel.x][pixel.y-1];
                        if (elements[above.element].id === elements.better_ball.id) {
                            if (above.dir === "down") { 
                                pixel.dir = "down"
                                above.dir = "up"
                                above.speed = pixel.speed
                                pixel.speed = above.speed
                            }
                            else { 
                                pixel.dir = "down"
                            }
                        }
                    }
                    else if (outOfBounds(pixel.x,pixel.y-1) && pixel.speed > 0) { 
                        pixel.dir = "down"
                    }
                }
                if (pixel.speed < 1) { 
                    pixel.dir = "down"
                }
            }
        } 
        doDefaults(pixel);
    },
    properties: {
        speed: 0,
        dir: "down",
        roll: false,
        rollspeed: 0,
    },
    color: "#edf1e6",
    tempHigh: 350,
    stateHigh: "molten_plastic",
    state: "solid",
    category: "special"
}

elements.marble = {
    tick: function(pixel) {
        if (pixel.dir === "down") {
            if (tryMove(pixel, pixel.x, pixel.y+1)) {
                    if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.speed > 0.5) {
                        pixel.speed += 1
                        console.log("go up and down code")
                        if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.speed > 0.5) { 
                            var beneath = pixelMap[pixel.x][pixel.y+1];
                            if (elements[beneath.element].id === elements.better_ball.id) { 
                                if (beneath.dir === "up") { 
                                    pixel.dir = "up"
                                    beneath.dir = "down"
                                    beneath.speed = pixel.speed
                                    pixel.speed = beneath.speed
                                }
                                else { 
                                    pixel.dir = "up"
                                }
                            }
                            else { 
                                pixel.dir = "up"
                            }
                        }
                        else if (outOfBounds(pixel.x,pixel.y+1) && pixel.speed > 0.5) { 
                            pixel.dir = "up"
                        }
                    }
                    else {
                        pixel.speed += 1
                        console.log("increase speed code")
                    }
            }
            else if (!tryMove(pixel, pixel.x, pixel.y+1) && (!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1))) {
                if (!isEmpty(pixel.x, pixel.y+1, true) && pixel.roll === false && (isEmpty(pixel.x-1, pixel.y+1) || isEmpty(pixel.x+1, pixel.y+1))) {
                    console.log("incline code")
                    if (isEmpty(pixel.x+1, pixel.y+1)) {
                        pixel.rolldir = 1
                    }
                    else if (isEmpty(pixel.x-1, pixel.y+1)) {
                        pixel.rolldir = -1
                    }
                    tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y+1);
                    pixel.rollspeed += 1
                }
                else if ((!isEmpty(pixel.x, pixel.y+1, true) || outOfBounds(pixel.x,pixel.y+1)) && pixel.rollspeed > 0) {
                    pixel.rollspeed -= 0.5
                    pixel.speed = 0
                    if (pixel.roll === false) {
                        pixel.roll = true
                    }
                    if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y, true) && pixel.rollspeed < 10) {
                        console.log("bounce off wall code")
                        pixel.rolldir = (pixel.rolldir-(2*pixel.rolldir))
                    }
                    else if (pixel.rollspeed > 9 && isEmpty(pixel, pixel.x+(pixel.rolldir), pixel.y-1) && !isEmpty(pixel.x+(pixel.rolldir), pixel.y, true)) {
                        console.log("uphill code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y-1);
                        pixel.rollspeed -= 0.5
                        pixel.speed = 0
                    }
                    else if (!isEmpty(pixel.x+(pixel.rolldir), pixel.y+1, true)) {
                        console.log("roll code")
                        tryMove(pixel, pixel.x+(pixel.rolldir), pixel.y)
                    }
                    else if (isEmpty(pixel.x+(pixel.rolldir), pixel.y)) {
                        console.log("stop roll code")
                        pixel.roll = false
                    }
                }
                else if (pixel.rollspeed < 1 && pixel.roll === true) {
                    pixel.roll = false
                }
            }
        } 
        else if (pixel.speed > 0 && pixel.dir === "up") {
            if (tryMove(pixel, pixel.x, pixel.y-1)) {
                pixel.speed -= 5
                if (outOfBounds(pixel.x,pixel.y-1) || !isEmpty(pixel.x, pixel.y-1, true)) { 
                    if (!isEmpty(pixel.x, pixel.y-1, true) && pixel.speed > 0) { 
                        var above = pixelMap[pixel.x][pixel.y-1];
                        if (elements[above.element].id === elements.better_ball.id) {
                            if (above.dir === "down") { 
                                pixel.dir = "down"
                                above.dir = "up"
                                above.speed = pixel.speed
                                pixel.speed = above.speed
                            }
                            else { 
                                pixel.dir = "down"
                            }
                        }
                    }
                    else if (outOfBounds(pixel.x,pixel.y-1) && pixel.speed > 0) { 
                        pixel.dir = "down"
                    }
                }
                if (pixel.speed < 1) { 
                    pixel.dir = "down"
                }
            }
        } 
        doDefaults(pixel);
    },
    properties: {
        speed: 0,
        dir: "down",
        roll: false,
        rollspeed: 0,
    },
    color: ["#5e807d","#5e807d","#679e99","#5e807d","#5e807d","#ADD8E6","#90EE90","#ebbe4d"],
    tempHigh: 1505,
    stateHigh: "molten_glass",
    state: "solid",
    category: "special"
}