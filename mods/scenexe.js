polygonColors = function(sides){
    let baseColors = [
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
    ]
    if (sides <= 14 && sides >= 3){
        return baseColors[Math.round(sides)-3]
    } else {
        return {r: 0, g: 0, b: 0}
    }
}
isKeyDown = {
    w: false,
    a: false,
    s: false,
    d: false
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
})
orbitalSpeed = function(sides){
    return 1/(1.00672*Math.pow(0.344151, sides) + 0.000002)
}
shapeNames = ["Triangle", "Square", "Pentagon", "Hexagon", "Heptagon", "Octagon", "Nonagon", "Decagon", "Hendecagon", "Dodecagon", "Triskaidecagon", "Tetrakaidecagon", "Pentakaidecagon", "Hexakaidecagon", "Heptakaidecagon", "Octakaidecagon", "Enneakaidecagon", "Icosagon", "literally just a circle"]
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
zoomLevel = 1
polygonSize = function(sides){
    return 18 * Math.pow(1.47, sides - 3)
}
for (var i = 0; i <= 400; i++){
    sides = polygonCount(Math.random())
    polygonList.push({
        sides: sides,
        radius: polygonSize(sides),
        x: (Math.random() * 5000)-2500,
        y: (Math.random() * 5000)-2500,
        vx: 0,
        vy: 0,
        random: Math.random(),
        rotation: Math.random() * 2 * Math.PI,
        collisionMass: 3+(polygonSize(sides)**2)/6
    })
}
function drawPolygon(ctx, polygon){
    let x = polygon.x
    let y = polygon.y
    let sides = polygon.sides
    let radius = polygon.radius
    let rotation = polygon.rotation
    let vx = polygon.vx
    let vy = polygon.vy
    ctx.lineJoin = 'round';
    ctx.fillStyle = "rgb(" + polygonColors(sides).r + ", " + polygonColors(sides).g + ", " + polygonColors(sides).b + ")"
    ctx.strokeStyle = "rgb(" + Math.max(polygonColors(sides).r - 30, 0) + ", " + Math.max(polygonColors(sides).g - 30, 0) + ", " + Math.max(polygonColors(sides).b - 30, 0) + ")"
    ctx.lineWidth = 5*zoomLevel
    ctx.beginPath()
    ctx.moveTo(Math.sin(rotation)*radius+x, Math.cos(rotation)*radius+y)
    for (var i = 0; i <= sides+1; i++){
        ctx.lineTo(Math.sin(rotation+2*Math.PI*i/sides)*radius+x, Math.cos(rotation+2*Math.PI*i/sides)*radius+y)
    }
    ctx.fill()
    ctx.stroke()
    // debug
    /*
    // draw a line to represent angle
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
    ctx.lineWidth = 2
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.strokeStyle = "rgb(0, 0, 0)"
    ctx.font = `bold 30px Helvetica`
    ctx.fillText(Math.round(polygon.collisionMass), x, y)
    ctx.strokeText(Math.round(polygon.collisionMass), x, y)
    */
}
function drawPlayer(ctx, player){
    ctx.fillStyle = "rgb(63, 153, 255)"
    ctx.strokeStyle = "rgb(33, 123, 225)"
    ctx.lineWidth = 5*zoomLevel
    ctx.beginPath()
    ctx.arc(player.x, player.y, player.radius, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()
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
    objectreturn.x = objectreturn.x * multiplier - x + ctx.canvas.width/2
    objectreturn.y = objectreturn.y * multiplier - y + ctx.canvas.height/2
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
    collisionMass: 520
}
renderPostPixel(function(ctx){
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
        drawPolygon(ctx, cameraZoom(ctx, polygonList[poly], zoomLevel, camera))
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
                }
            }
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
})