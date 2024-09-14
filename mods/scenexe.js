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
zoomLevel = .2
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
    */
}
function zoom(ctx, poly, multiplier){
    polyreturn = {...poly}
    polyreturn.x = polyreturn.x * multiplier + ctx.canvas.width/2
    polyreturn.y = polyreturn.y * multiplier + ctx.canvas.height/2
    polyreturn.radius = polyreturn.radius * multiplier
    return polyreturn
}
renderPostPixel(function(ctx){
    ctx.fillStyle = "rgb(205, 205, 205)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "rgb(200, 200, 200)"
    ctx.lineWidth = 5*zoomLevel
    for (var i = 0; i < canvas.width; i += canvas.width/30*zoomLevel){
        ctx.beginPath()
        ctx.moveTo(i, canvas.height)
        ctx.lineTo(i, 0)
        ctx.stroke()
    }
    for (var j = 0; j < canvas.height; j += canvas.width/30*zoomLevel){
        ctx.beginPath()
        ctx.moveTo(0, j)
        ctx.lineTo(canvas.width, j)
        ctx.stroke()
    }
    //drawPolygon(ctx, Math.round((pixelTicks/20)%13)+3, polygonSize(Math.round((pixelTicks/20)%13)+3), canvas.width/2, canvas.height/2, 0)
    for (var poly = 0; poly < polygonList.length; poly++){
        drawPolygon(ctx, zoom(ctx, polygonList[poly], zoomLevel))
    }
    // polygon collision checking
    for (var poly = 0; poly < polygonList.length; poly++){
        for (var poly2 = 0; poly2 < polygonList.length; poly2++){
            if (poly != poly2){
                polygon1 = polygonList[poly]
                polygon2 = polygonList[poly2]
                distance = Math.sqrt((polygon1.x - polygon2.x)**2 + (polygon1.y - polygon2.y)**2)
                if (distance < polygonSize(polygon1.sides) + polygonSize(polygon2.sides)){
                    //calculate angle of collision
                    angle = Math.atan2(polygon2.y - polygon1.y, polygon2.x - polygon1.x)
                    // update velocity
                    polygon1.vx -= (Math.cos(angle) * (polygonSize(polygon1.sides) + polygonSize(polygon2.sides) - distance)/2)/(3+polygonSize(polygon1.sides)/9)
                    polygon1.vy -= (Math.sin(angle) * (polygonSize(polygon1.sides) + polygonSize(polygon2.sides) - distance)/2)/(3+polygonSize(polygon1.sides)/9)
                }
            }
        }
    }
    // move polygons
    for (var poly = 0; poly < polygonList.length; poly++){
        let polygon = polygonList[poly]
        if (polygon.vx || polygon.vy){
            polygon.x += polygon.vx
            polygon.y += polygon.vy
            polygon.vx *= 0.8
            polygon.vy *= 0.8
        }
        polygon.rotation += 1.00672*Math.pow(0.344151, polygon.sides) + 0.000002
        // add some velocity towards wherever its facing
        polygon.vx += Math.sin(polygon.rotation)*(1.00672*Math.pow(0.344151, polygon.sides) + 0.000002)*8
        polygon.vy += Math.cos(polygon.rotation)*(1.00672*Math.pow(0.344151, polygon.sides) + 0.000002)*8
    }
})