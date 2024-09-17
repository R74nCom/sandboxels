polygonColors = function(sides){
    let baseColors = [
        /*
    { r: 255, g: 228, b: 107 },
    { r: 252, g: 118, b: 118 },
    { r: 118, g: 140, b: 252 },
    { r: 252, g: 166, b: 68 },
    { r: 56, g: 183, b: 100 },
    { r: 74, g: 102, b: 189 },
    { r: 93, g: 39, b: 93 },
    { r: 26, g: 28, b: 44 },
    { r: 6, g: 0, b: 17 },
    { r: 64, g: 54, b: 69 },
    { r: 237, g: 237, b: 255 },
    { r: 0, g: 0, b: 0 },
     */
    "rgb(255, 228, 107)",
    "rgb(252, 118, 118)",
    "rgb(118, 140, 252)",
    "rgb(252, 166, 68)",
    "rgb(56, 183, 100)",
    "rgb(74, 102, 189)",
    "rgb(93, 39, 93)",
    "rgb(26, 28, 44)",
    "rgb(6, 0, 17)",
    "rgb(64, 54, 69)",
    "rgb(237, 237, 255)",
    "rgb(0, 0, 0)",
    ]
    if (sides <= 14 && sides >= 3){
        return baseColors[Math.round(sides)-3]
    } else {
        return "rgb(0, 0, 0)"
    }
}
isKeyDown = {
    w: false,
    a: false,
    s: false,
    d: false,
    i: false,
    o: false
}
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}
function colorToObject(color){
    list = color.match(/\d+/g);
    list[0] = parseInt(list[0])
    list[1] = parseInt(list[1])
    list[2] = parseInt(list[2])
    return {r: list[0], g: list[1], b: list[2]}
}
function objectToColor(object){
    return "rgb(" + object.r + ", " + object.g + ", " + object.b + ")"
}
function darkenColor(color){
    let colorObject = colorToObject(color)
    colorObject.r = Math.max(0, colorObject.r - 30)
    colorObject.g = Math.max(0, colorObject.g - 30)
    colorObject.b = Math.max(0, colorObject.b - 30)
    return objectToColor(colorObject)
}
function makeVisible(color){
    let colorObject = colorToObject(color)
    colorObject.r = Math.max(40, colorObject.r)
    colorObject.g = Math.max(40, colorObject.g)
    colorObject.b = Math.max(40, colorObject.b)
    return objectToColor(colorObject)
}
// when wasd keydown, set isKeyDown to true
document.addEventListener("keydown", (event) => {
    if (event.key === "w") {
        isKeyDown.w = true;
    }
    if (event.key === "a") {
        isKeyDown.a = true;
    }
    if (event.key === "s") {
        isKeyDown.s = true;
    }
    if (event.key === "d") {
        isKeyDown.d = true
    }
    if (event.key === "i") {
        isKeyDown.i = true
    }
    if (event.key === "o") {
        isKeyDown.o = true
    }
})
// when wasd keyup, set isKeyDown to false
document.addEventListener("keyup", (event) => {
    if (event.key === "w") {
        isKeyDown.w = false;
    }
    if (event.key === "a") {
        isKeyDown.a = false;
    }
    if (event.key === "s") {
        isKeyDown.s = false;
    }
    if (event.key === "d") {
        isKeyDown.d = false
    }
    if (event.key === "i") {
        isKeyDown.i = false
    }
    if (event.key === "o") {
        isKeyDown.o = false
    }
    if (event.key === "m") {
        if (debug){
            debug = false
        } else {
            debug = true
        }
    }
})
orbitalSpeed = function(sides){
    return 1/(1.00672*Math.pow(0.344151, sides) + 0.000002)
}
function shapeNamer(sides) {
    const ones = ["hen", "do", "tri", "tetra", "penta", "hexa", "hepta", "octa", "ennea"];
    const tens = ["deca", "icosa", "triaconta", "tetraconta", "pentaconta", "hexaconta", "heptaconta", "octaconta", "enneaconta"];
    const specialCases = {
        4: "square",
        2: "line",
        1: "point",
        3: "triangle",
        9: "nonagon",
        1000: "stop",
        1001: "please",
        1002: "go touch grass",
        1003: "are you serious"
    };
    if (sides in specialCases) {
        return specialCases[sides];
    }
    function rb(v) {
        return v ? v : "";
    }
    const numberString = sides.toString();
    if (sides < 10) {
        return ones[sides - 1] + "gon";
    } else if (sides < 100) {
        const tensPlace = Math.floor(sides / 10);
        const onesPlace = sides % 10;
        return rb(ones[onesPlace - 1]) + tens[tensPlace - 1] + "gon";
    } else if (sides < 1000) {
        const hundredsPlace = Math.floor(sides / 100);
        const tensPlace = Math.floor((sides % 100) / 10);
        const onesPlace = sides % 10;
        return ones[hundredsPlace - 1] + "hecta" + rb(tens[tensPlace - 1]) + rb(ones[onesPlace - 1]) + "gon";
    } else {
        return "literally just a circle";
    }
}
function polygonCount(random){
    const thresholds = [0, 0.3, 0.68, 0.77, 0.82, 0.86, 0.88, 0.89, 0.895, 0.8975, 0.898, 0.8982, 1];
    const values = [3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 3];
    
    for (let i = 0; i < thresholds.length; i++) {
        if (random < thresholds[i]) {
            return values[i];
        }
    }
}
polygonList = []
zoomLevel = 0.5
function newPolygon(sides){
    polygonList.push({
        sides: sides,
        radius: polygonSize(sides),
        x: (Math.random() * 5000)-2500,
        y: (Math.random() * 5000)-2500,
        vx: 0,
        vy: 0,
        random: Math.random(),
        rotation: Math.random() * 2 * Math.PI,
        collisionMass: 3+(polygonSize(sides)**2)/6,
        maxHealth: 3+(polygonSize(sides)**2)/6,
        health: 3+(polygonSize(sides)**2)/6,
        type: 0,
        bodyDamage: 3,
        regenDelay: 20,
        regenSpeed: 0.0007,
        timeSinceHurt: null,
        name: shapeNamer(sides)
    })
}
polygonSize = function(sides){
    return 18 * Math.pow(1.47, sides - 3)
}
for (var i = 0; i <= 400; i++){
    sides = polygonCount(Math.random())
    newPolygon(sides)
}
function drawPolygon(ctx, polygon, index){
    if (Math.abs(polygonList[index].x-camera[0]-polygon.radius<canvas.width/zoomLevel) && Math.abs(polygonList[index].y-camera[1])-polygon.radius<canvas.height/zoomLevel){
        let x = polygon.x
        let y = polygon.y
        let sides = polygon.sides
        let radius = polygon.radius
        let rotation = polygon.rotation
        let vx = polygon.vx
        let vy = polygon.vy
        let hppercent = polygon.health/polygon.maxHealth
        ctx.lineJoin = 'round';
        ctx.fillStyle = polygonColors(sides)
        ctx.strokeStyle = darkenColor(polygonColors(sides))
        ctx.lineWidth = 5*zoomLevel
        ctx.beginPath()
        ctx.moveTo(Math.sin(rotation)*radius+x, Math.cos(rotation)*radius+y)
        for (var i = 0; i <= sides+1; i++){
            ctx.lineTo(Math.sin(rotation+2*Math.PI*i/sides)*radius+x, Math.cos(rotation+2*Math.PI*i/sides)*radius+y)
        }
        ctx.fill()
        ctx.stroke()
        // draw health bar
        if (hppercent <= 0.95){
            ctx.lineCap = 'round';
            ctx.strokeStyle = "rgb(0, 0, 0)"
            ctx.lineWidth = 10*zoomLevel
            ctx.beginPath()
            ctx.moveTo(x-radius, y+radius+(10*zoomLevel))
            ctx.lineTo(x+radius, y+radius+(10*zoomLevel))
            ctx.stroke()
            ctx.strokeStyle = makeVisible(polygonColors(sides))
            ctx.lineWidth = 4*zoomLevel
            ctx.beginPath()
            ctx.moveTo(x-radius, y+radius+(10*zoomLevel))
            ctx.lineTo(x-radius+(radius*2*hppercent), y+radius+(10*zoomLevel))
            //console.log(hppercent)
            ctx.stroke()
        }
        // debug
        
        // draw a line to represent angle
        if(debug){
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(Math.sin(rotation)*2*radius+x, Math.cos(rotation)*2*radius+y)
            ctx.strokeStyle = "rgb(0, 0, 255)"
            ctx.stroke()
            // draw a line to represent velocity
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x+20*vx, y+20*vy)
            ctx.strokeStyle = "rgb(255, 0, 0)"
            ctx.stroke()
            // draw some text to represent mass
            ctx.lineWidth = 10*zoomLevel
            ctx.fillStyle = "rgb(255, 255, 255)"
            ctx.strokeStyle = "rgb(0, 0, 0)"
            ctx.font = `bold ${zoomLevel*30}px Helvetica`
            //ctx.strokeText(Math.round(polygon.collisionMass), x, y)
            //ctx.fillText(Math.round(polygon.collisionMass), x, y)
            // draw text on healthbar
            ctx.strokeText(Math.round(polygon.health)+"/"+Math.round(polygon.maxHealth), x, y+radius+(10*zoomLevel))
            ctx.fillText(Math.round(polygon.health)+"/"+Math.round(polygon.maxHealth), x, y+radius+(10*zoomLevel))
            ctx.strokeText(`${polygon.name} p${index}`, x, y-radius)
            ctx.fillText(`${polygon.name} p${index}`, x, y-radius)
        }
    }
}
debug = false
function drawPlayer(ctx, player){
    ctx.fillStyle = "rgb(0, 176, 225)"
    ctx.strokeStyle = darkenColor("rgb(0, 176, 225)")
    ctx.lineWidth = 5*zoomLevel
    ctx.beginPath()
    ctx.arc(player.x, player.y, player.radius, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()
    // draw health bar
    if (player.health/player.maxHealth <= 0.95){
        ctx.lineCap = 'round';
        ctx.strokeStyle = "rgb(0, 0, 0)"
        ctx.lineWidth = 10*zoomLevel
        ctx.beginPath()
        ctx.moveTo(player.x-player.radius, player.y+player.radius+(10*zoomLevel))
        ctx.lineTo(player.x+player.radius, player.y+player.radius+(10*zoomLevel))
        ctx.stroke()
        ctx.strokeStyle = makeVisible("rgb(0, 176, 225)")
        ctx.lineWidth = 4*zoomLevel
        ctx.beginPath()
        ctx.moveTo(player.x-player.radius, player.y+player.radius+(10*zoomLevel))
        ctx.lineTo(player.x-player.radius+(player.radius*2*player.health/player.maxHealth), player.y+player.radius+(10*zoomLevel))
        ctx.stroke()
    }
    // debug
    if (debug){
        // draw a line to represent angle
        ctx.beginPath()
        ctx.moveTo(player.x, player.y)
        ctx.lineTo(Math.sin(player.rotation)*2*player.radius+player.x, Math.cos(player.rotation)*2*player.radius+player.y)
        ctx.strokeStyle = "rgb(0, 0, 255)"
        ctx.stroke()
        // draw a line

        ctx.beginPath()
        ctx.moveTo(player.x, player.y)
        ctx.lineTo(player.x+20*player.vx, player.y+20*player.vy)
        ctx.strokeStyle = "rgb(255, 0, 0)"
        ctx.stroke()
        // draw some text
        ctx.lineWidth = 10*zoomLevel
        ctx.fillStyle = "rgb(255, 255, 255)"
        ctx.strokeStyle = "rgb(0, 0, 0)"
        ctx.font = `bold ${zoomLevel*30}px Helvetica`
        ctx.strokeText(Math.round(player.collisionMass), player.x, player.y)
        ctx.fillText(Math.round(player.collisionMass), player.x, player.y)
        // draw text on healthbar
        ctx.strokeText(Math.round(player.health)+"/"+Math.round(player.maxHealth), player.x, player.y+player.radius+(10*zoomLevel))
        ctx.fillText(Math.round(player.health)+"/"+Math.round(player.maxHealth), player.x, player.y+player.radius+(10*zoomLevel))
    }
}
function zoom(ctx, poly, multiplier){
    polyreturn = {...poly}
    polyreturn.x = polyreturn.x * multiplier + ctx.canvas.width/2
    polyreturn.y = polyreturn.y * multiplier + ctx.canvas.height/2
    polyreturn.radius = polyreturn.radius * multiplier
    return polyreturn
}
function applyCameraPos(ctx, object, x, y){
    objectreturn = {...object}
    objectreturn.x = objectreturn.x + x
    objectreturn.y = objectreturn.y + y
    return objectreturn
}
function cameraZoom(ctx, object, multiplier, camera){
    objectreturn = {...object}
    let x = camera[0]
    let y = camera[1]
    objectreturn.x = (objectreturn.x - x) * multiplier + ctx.canvas.width/2
    objectreturn.y = (objectreturn.y - y) * multiplier + ctx.canvas.height/2
    objectreturn.radius = objectreturn.radius * multiplier
    return objectreturn
}
camera = [0, 0]
scenexeplayer = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotation: 0,
    radius: 40,
    collisionMass: 520,
    type: 1,
    bodyDamage: 5,
    maxHealth: 10000,
    health: 10000,
    regenDelay: 14,
    regenSpeed: 0.0001,
    timeSinceHurt: null
}
keybinds["KeyI"] = function(){}
keybinds["KeyM"] = function(){}
renderPostPixel(function(ctx){
    clearLayers()
    if (pixelMap){pixelMap = [], currentPixels = [], paused = true}
    ctx.fillStyle = "rgb(205, 205, 205)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "rgb(200, 200, 200)"
    ctx.lineWidth = 5*zoomLevel
    for (var i = 0; i < canvas.width; i += 20*zoomLevel){
        ctx.beginPath()
        //ctx.moveTo(i, canvas.height)
        //ctx.lineTo(i, 0)
        // add offset depending on mod of camera
        ctx.moveTo(i-camera[0]%20*zoomLevel, canvas.height)
        ctx.lineTo(i-camera[0]%20*zoomLevel, 0)
        ctx.stroke()
    }
    for (var j = 0; j < canvas.height; j += 20*zoomLevel){
        ctx.beginPath()
        //ctx.moveTo(0, j)
        //ctx.lineTo(canvas.width, j)
        // add offset depending on mod of camera
        ctx.moveTo(0, j-camera[1]%20*zoomLevel)
        ctx.lineTo(canvas.width, j-camera[1]%20*zoomLevel)
        ctx.stroke()
    }
    //drawPolygon(ctx, Math.round((pixelTicks/20)%13)+3, polygonSize(Math.round((pixelTicks/20)%13)+3), canvas.width/2, canvas.height/2, 0)
    for (var poly = 0; poly < polygonList.length; poly++){
        drawPolygon(ctx, cameraZoom(ctx, polygonList[poly], zoomLevel, camera), poly)
    }
    drawPlayer(ctx, cameraZoom(ctx, scenexeplayer, zoomLevel, camera)) 
    // collidable collision checking
    collideList = []
    collideList = collideList.concat(polygonList)
    collideList.push(scenexeplayer)
    for (var poly = 0; poly < collideList.length; poly++){
        for (var poly2 = 0; poly2 < collideList.length; poly2++){
            if (poly != poly2){
                polygon1 = collideList[poly]
                polygon2 = collideList[poly2]
                distance = Math.sqrt((polygon1.x - polygon2.x)**2 + (polygon1.y - polygon2.y)**2)
                if (distance < polygon1.radius + polygon2.radius){
                    //calculate angle of collision
                    angle = Math.atan2(polygon2.y - polygon1.y, polygon2.x - polygon1.x)
                    // update velocity
                    polygon1.vx -= (Math.cos(angle) * (polygon1.radius + polygon2.radius - distance)/2)/(polygon1.collisionMass/polygon2.collisionMass**(1/2.5))
                    polygon1.vy -= (Math.sin(angle) * (polygon1.radius + polygon2.radius - distance)/2)/(polygon1.collisionMass/polygon2.collisionMass**(1/2.5))
                    if (polygon2.type != polygon1.type){
                        polygon1.health -= polygon2.bodyDamage
                        polygon1.timeSinceHurt = 0
                    }
                }
            }
        }
        collideList[poly].timeSinceHurt += 0.02
        if (collideList[poly].timeSinceHurt > collideList[poly].regenDelay){
            collideList[poly].health += collideList[poly].regenSpeed*collideList[poly].maxHealth
            collideList[poly].health = Math.min(collideList[poly].health, collideList[poly].maxHealth)
        }
    }
    // move polygons
    for (var poly = 0; poly < collideList.length; poly++){
        let polygon = collideList[poly]
        if (polygon.vx || polygon.vy){
            polygon.x += polygon.vx
            polygon.y += polygon.vy
            polygon.vx *= 0.8
            polygon.vy *= 0.8
        }
    }
    // orbit polygons
    for (var poly = 0; poly < polygonList.length; poly++){
        let polygon = polygonList[poly]
        polygon.rotation += 1/orbitalSpeed(polygon.sides)
        // add some velocity towards wherever its facing
        polygon.vx += Math.sin(polygon.rotation)/orbitalSpeed(polygon.sides)*8
        polygon.vy += Math.cos(polygon.rotation)/orbitalSpeed(polygon.sides)*8
        if (polygon.health <= 0){
            polygonList.splice(poly, 1)
        }
    }
    camera[0] += (scenexeplayer.x - camera[0])/10
    camera[1] += (scenexeplayer.y - camera[1])/10
    // add velocity to player depending on which keys are down
    if (isKeyDown.w){
        if (isKeyDown.a + isKeyDown.d == 1){
            scenexeplayer.vy -= 1/Math.sqrt(2)
        } else{
            scenexeplayer.vy -= 1
        }
    }
    if (isKeyDown.s){
        if (isKeyDown.a + isKeyDown.d == 1){
            scenexeplayer.vy += 1/Math.sqrt(2)
        } else{
            scenexeplayer.vy += 1
        }
    }
    if (isKeyDown.a){
        if (isKeyDown.w + isKeyDown.s == 1){
            scenexeplayer.vx -= 1/Math.sqrt(2)
        } else{
            scenexeplayer.vx -= 1
        }
    }
    if (isKeyDown.d){
        if (isKeyDown.w + isKeyDown.s == 1){
            scenexeplayer.vx += 1/Math.sqrt(2)
        } else{
            scenexeplayer.vx += 1
        }
    }
    if (isKeyDown.i){
        zoomLevel += 0.02
    }
    if (isKeyDown.o){
        zoomLevel -= 0.02
    }
})