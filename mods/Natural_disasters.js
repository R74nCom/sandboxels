//mod made by imilkflamingos


function countNeighbors(pixel,target){
    var targeted = 0;
    for (var i = 0; i < squareCoords.length; i++) {
        var coord = squareCoords[i];
        var x = pixel.x+coord[0];
        var y = pixel.y+coord[1];
        if (!isEmpty(x,y, true)) {
            var otherPixel = pixelMap[x][y];
            if (otherPixel.element == target){
                targeted = targeted + 1
            }
        }
    }
    return targeted;
}

//made by Fioushemastor
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function getNearestPixel( posX,posY, targetElement) {
    let nearestPixel
    let minDistance = Infinity
  
    //the stuff
    for (let index in pixelMap) {
     for (let pixel of pixelMap[index]) {
      if (pixel == undefined) continue;
      if (pixel.element == targetElement) {
        let distance = getDistance(pixel.x, pixel.y, posX, posY);
        if (distance < minDistance) {
            minDistance = distance;
            nearestPixel = pixel;
        }
    }
     }
    }
    return nearestPixel
  }
// Rest made me

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createEarthQuakeRand() {
    const chance = Math.random();
    if ( chance  <= 0.005 ) {
        var randY = getRandomInt(60,85)
        var randX = getRandomInt(1,163)
        if(isEmpty(randX,randY)) {
            createPixel('earthquake',randX,randY)
        }
        else {
            changePixel(pixelMap[randX][randY],'earthquake')
        }
    }
   
}
function createTsunamiRand(){
    var randX = getRandomInt(1,163)
    const ClosestPixel = getNearestPixel(randX,25,'water')   
        if(ClosestPixel) {
            var neighbors = countNeighbors(ClosestPixel,'water')
             if (isEmpty(ClosestPixel.x,ClosestPixel.y-1)) {
                const chance = Math.random();
                if ( chance  <= 0.001 && countNeighbors(ClosestPixel,'water') >= 3) {
                    createPixel('tsunami',ClosestPixel.x,ClosestPixel.y-1)
                }
             } 
        } 

}
function createWildFireRand(){
    var randX = getRandomInt(1,163)
    const ClosestPixel = getNearestPixel(randX,25,'plant')   
        if(ClosestPixel) {
             if (!isEmpty(ClosestPixel.x,ClosestPixel.y)) {
                const chance = Math.random();
                if ( chance  <= 0.0005) {
                   ClosestPixel.burning = true;
                }
             } 
        } 

}
function createMetorShower(){
    
}

function createCloud(pixel, type) {
    for (let i = 0; i < 70; i++) {
        if(isEmpty(pixel.x-i,pixel.y) ) {
            createPixel(type,pixel.x-i,pixel.y, );  
        }
        if(isEmpty(pixel.x+i,pixel.y) ) {
            createPixel(type,pixel.x+i,pixel.y, );  
        }
        if(isEmpty(pixel.x-i,pixel.y-1) ) {
            createPixel(type,pixel.x-i,pixel.y-1, );  
        }
        if(isEmpty(pixel.x+i,pixel.y-1) ) {
            createPixel(type,pixel.x+i,pixel.y-1, );  
        }
        if(isEmpty(pixel.x-i,pixel.y+1) ) {
            createPixel(type,pixel.x-i,pixel.y+1, );  
        }
        if(isEmpty(pixel.x+i,pixel.y+1) ) {
            createPixel(type,pixel.x+i,pixel.y+1, );  
        }
            i+1
}
}

elements.Test_Element = {
    hidden: true,
	color: "#ff0000",
    conduct: 0.1,
    category:"test",
	behavior: behaviors.WALL,
	
	onSelect: function(pixel){},
	tick: function(pixel) {
        
    },
        
};

elements.Diaster_Spawner = {
    maxSize : 1,
    color: ["#8D8D8C", "#666666"],
    category: "land",
    behavior: behaviors.WALL,
    properties : {
        age: 0,

    },
    tick : function(pixel) {
        const num = getRandomInt(1,3)
        if (num == 1) {
            createCloud(pixel, 'rain_cloud')
        } else if(num == 2){
            createCloud(pixel, 'thunder_cloud') 
        } else {
            createCloud(pixel, 'tornado_cloud') 
        }
    
    if(pixel.age > 100) {
        changePixel(pixel,"cloud");
    }
    pixel.age++
    doDefaults(pixel);
    },
 
};

elements.tornado_cloud = {
    color: ["#8D8D8C", "#666666"],
    category: "land",
    state : 'gas',
    behavior: [
        "XX|XX|XX",
        "XX|DL%0.0001|M1%2.5 AND BO",
        "XX|XX|XX",
    ],
    tick : function(pixel) {
        const chance = Math.random();
        
        if ( chance  <= 0.00001) {
            if(isEmpty(pixel.x,pixel.y+1)) {
                changePixel(pixel,"tornado")
            }
        }
        
    },
    density: 0.4,
    ignoreAir: true,
    conduct: 0.03
};



function createCloudRand() {
    const chance = Math.random();
    var randY = getRandomInt(7,19)
    if(chance <= 0.001) {
        if( isEmpty(83,randY)){
           createPixel('Diaster_Spawner',83,randY)  
        }
    }
}

function runEvents(){
    if(!paused) {
        createEarthQuakeRand();
        createTsunamiRand();
        createCloudRand();
        createWildFireRand();
    }
}

runAfterLoad(function() {
    RunSimInterval = window.setInterval(runEvents,  75);
});
