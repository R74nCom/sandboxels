elements.gasoline = {
    color: ["#FFFF66", "#FFFF66", "#FFFF66", "#FFFF66", "#FFFF66"],
    burn: 15,
    burnTime: 300,
    viscosity: 0.6,
    density: 750,
    category: "fuels",
    behavior: behaviors.LIQUID,
    state: "liquid",
    desc: "Used in Gas Generators!"
}

elements.diesel = {
    color: "#EBFBB5",
    burn: 10,
    burnTime: 600,
    viscosity: 3,
    density: 860,
    category: "fuels",
    behavior: behaviors.LIQUID,
    state: "liquid",
    desc: "Used in Diesel Generators!"
}

elements.gasoline_generator = {
  color: "#6d5f5d",
  behavior: behaviors.WALL,
  state: "solid",
  density: 1000,
  category: "machines",
  properties: {
    shocksToDo: 0
  },
  hoverStat: function(pixel){return pixel.shocksToDo || 0},
  tick: function(pixel){
    if (pixel.shocksToDo <= 40){
    for (var i = 0; i < adjacentCoords.length; i++){
      var coord = adjacentCoords[i]
      var x = pixel.x + coord[0]
      var y = pixel.y + coord[1]
      if (!isEmpty(x, y, true)){
        var otherPixel = pixelMap[x][y]
        if (otherPixel.element == "gasoline"){
          deletePixel(x, y)
          if(!pixel.shocksToDo){pixel.shocksToDo = 0}
          pixel.shocksToDo += 10
        }
        else if (otherPixel.element == "gasoline_generator"){
          var otherPixel = pixelMap[x][y]
          var otherShock = otherPixel.shocksToDo || 0
          var currentShock = pixel.shocksToDo || 0
          if (otherShock > currentShock){
            otherPixel.shocksToDo --
            pixel.shocksToDo ++
          } else if (currentShock > otherShock) {
            otherPixel.shocksToDo ++
            pixel.shocksToDo --
          }
        }
      }
    }}
    if (!pixel.charge && !pixel.chargeCD && pixel.shocksToDo){
      for (var i = 0; i < adjacentCoords.length; i++){
        var coord = adjacentCoords[i]
        var x = pixel.x + coord[0]
        var y = pixel.y + coord[1]
        if (!isEmpty(x, y, true)){
          if (elements[pixelMap[x][y].element].conduct > 0){
            pixel.charge = 1
            pixel.shocksToDo --
            break;
          }
        }
      }
    }
  }
}

elements.diesel_generator = {
  color: "#FF9C27",
  behavior: behaviors.WALL,
  state: "solid",
  density: 1000,
  category: "machines",
  properties: {
    shocksToDo: 0
  },
  hoverStat: function(pixel){return pixel.shocksToDo || 0},
  tick: function(pixel){
    if (pixel.shocksToDo <= 80){
    for (var i = 0; i < adjacentCoords.length; i++){
      var coord = adjacentCoords[i]
      var x = pixel.x + coord[0]
      var y = pixel.y + coord[1]
      if (!isEmpty(x, y, true)){
        var otherPixel = pixelMap[x][y]
        if (otherPixel.element == "diesel"){
          deletePixel(x, y)
          if(!pixel.shocksToDo){pixel.shocksToDo = 0}
          pixel.shocksToDo += 20
        }
        else if (otherPixel.element == "diesel_generator"){
          var otherPixel = pixelMap[x][y]
          var otherShock = otherPixel.shocksToDo || 0
          var currentShock = pixel.shocksToDo || 0
          if (otherShock > currentShock){
            otherPixel.shocksToDo --
            pixel.shocksToDo ++
          } else if (currentShock > otherShock) {
            otherPixel.shocksToDo ++
            pixel.shocksToDo --
          }
        }
      }
    }}
    if (!pixel.charge && !pixel.chargeCD && pixel.shocksToDo){
      for (var i = 0; i < adjacentCoords.length; i++){
        var coord = adjacentCoords[i]
        var x = pixel.x + coord[0]
        var y = pixel.y + coord[1]
        if (!isEmpty(x, y, true)){
          if (elements[pixelMap[x][y].element].conduct > 0){
            pixel.charge = 1
            pixel.shocksToDo --
            break;
          }
        }
      }
    }
  }
}
