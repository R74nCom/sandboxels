var BlueAge = 0;
var LifeBlood = 0;
elements.FlyingBlue = { 
    color: "#00FFFF",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior: behaviors.FLY,
    conduct: 0,
    movable: true,
    stateLow: ["FrozenBlue"],
    tempLow: -50,
    stateHigh: ["BlueHot"],
    breakInto: "DeadBlue",
    tempHigh: 50,
    temp: 0,
    tick: function(pixel){
        if (pixel.BlueAge === undefined) {
            pixel.BlueAge = Math.random() *(100);}
        if (Math.random() >= 0.5){pixel.BlueAge++}
        if (pixel.BlueAge >= 4000){changePixel(pixel,"DeadBlue")}
},
hoverStat: function(pixel){return pixel.BlueAge},
    reactions: {"FlyingBlue": {elem2: "PregFlyingBlue", chance:0.19},},
}
var BlueAge = 0;
elements.PregFlyingBlue = { 
    color: "#00E2E2",
    singleColor: true, 
    category: "Blue", 
    state: "Solid",
    behavior: function(pixel) {
        if (pixel.start === pixelTicks) {return}
        if (pixel.charge && elements[pixel.element].behaviorOn) {
          pixelTick(pixel)
        }
        const directions = [
            [1, 0],  // Right
            [-1, 0], // Left
            [0, -1], // Up
            [0, 1]   // Down
        ];
        
        const [dx, dy] = directions[Math.random() * 4 | 0]; // Bitwise OR is faster than Math.floor()
        tryMove(pixel, pixel.x + dx, pixel.y + dy);
        doDefaults(pixel);
      },
    conduct : 0,
    movable: true,
    temp: 0,
    stateLow: ["DeadBlue"],
    tempLow: -50,
    stateHigh: ["DeadBlue"],
    breakInto: "DeadBlue",
    tempHigh: 50,
    hidden: 1,
    tick: function(pixel){
        if (pixel.BlueAge === undefined) {
            pixel.BlueAge = Math.random() *(100)
        }
        if (Math.random() >= 0.5){pixel.BlueAge++}
        if (pixel.BlueAge >= 600){changePixel(pixel,"ThisIsOneNiceEgg")}
        if (isEmpty(pixel.x,pixel.y+1) && (Math.random() >= 0.99)){
            createPixel("ThisIsOneNiceEgg",pixel.x,pixel.y+1);
}
        if (Math.random() >= 0.9999) {changePixel(pixel, "FlyingBlue");}
},
    hoverStat: function(pixel){return pixel.BlueAge},
}
elements.FrozenBlue = { 
    color: "#00C0B3",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior:[
    "XX|XX|XX",
    "XX|CH:FrozenBlue>DeadBlue%0.1|XX",
    "XX|M1|XX",
    ],
    conduct : 0,
    movable: true,
    temp: -50,
    tempHigh: 0,
    stateHigh: ["FlyingBlue",],
    tempLow: -150,
    stateLow: ["DeadBlue",],
    breakInto: "DeadBlue",
    hidden: 1,
    tick: function(pixel){
        pixel.temp ++
        if (pixel.temp >=0){changePixel(pixel,"FlyingBlue")}
    }
}

elements.BlueHot = { 
    color: "#C39FFF",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior:[
    "XX|M1|XX",
    "XX|CH:BlueHot>DeadBlue%0.1|XX",
    "XX|XX|XX",
    ],
    conduct : 0,
    movable: true,
    temp: 50,
    tempLow: 0,
    stateLow: ["FlyingBlue",],
    tempHigh: 150,
    stateHigh: ["DeadBlue",],
    breakInto: "DeadBlue",
    hidden: 1,
    tick: function(pixel){
        pixel.temp --
        if (pixel.temp <=0){changePixel(pixel,"FlyingBlue")}
    }
}


elements.DeadBlue = { 
    color: "#5D23AD",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior:[
    "XX|XX|XX",
    "XX|DL|XX",
    "XX|M1|XX",
    ],
    conduct : 0,
    movable: true,
    temp: 0,
    hidden: 1,
}

elements.ThisIsOneNiceEgg = { 
    color: "#B2B2B2",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior: function(pixel) {
        if (pixel.start === pixelTicks) {return}
        if (pixel.charge && elements[pixel.element].behaviorOn) {
          pixelTick(pixel)
        }
        if (Math.random() < 0.8) {
        tryMove(pixel, pixel.x, pixel.y + 1);
        }
        if (Math.random() < 0.2) {
        tryMove(pixel, pixel.x, pixel.y - 1);
        }
        doDefaults(pixel);
      },
    conduct : 0,
    movable: true,
    temp: 0,
    hidden: 1,
    tick: function(pixel){
        if (Math.random() >= 0.99) {changePixel(pixel,"NewbornBlue")}
        else if (Math.random() >= 0.999991) {changePixel(pixel,"EvilNewbornBlue")}
    }
}
0.0009
elements.NewbornBlue = { 
    color: "#D8D8FF",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior: function(pixel) {
        if (pixel.start === pixelTicks) {return}
        if (pixel.charge && elements[pixel.element].behaviorOn) {
          pixelTick(pixel)
        }
        const directions = [
            [1, 0],  // Right
            [-1, 0], // Left
            [0, -1], // Up
            [0, 1]   // Down
        ];
        
        const [dx, dy] = directions[Math.random() * 4 | 0]; // Bitwise OR is faster than Math.floor()
        tryMove(pixel, pixel.x + dx, pixel.y + dy);
        doDefaults(pixel);
      },
    conduct : 0,
    movable: true,
    temp: 0,
    stateLow: ["FrozenBlue"],
    tempLow: -40,
    stateHigh: ["BlueHot"],
    breakInto: "DeadBlue",
    tempHigh: 40,
    hidden: 1,
    tick: function(pixel){
        if (Math.random() >= 0.99) {changePixel(pixel, "FlyingBlue");}
    }
}
elements.PureBloodedBlue = { 
    color: "#0000FF",
    singleColor: true, 
    category: "Blue", 
    state: "Solid",
    behavior: behaviors.FLY,
    conduct : 0,
    movable: true,
    temp: 0,
    hidden: 1,
    reactions: {
    "EvilNewbornBlue": {elem2: "NewbornBlue", chance:0.9 },
    "EvilBlueHot": {elem2: "BlueHot" },
    "EvilFrozenBlue": {elem2: "FrozenBlue" },
    "ThisIsNotSuchaNiceEgg": {elem2: "ThisIsOneNiceEgg" },
    "EvilFlyingBlue": {elem2: "FlyingBlue", chance:0.9 },
    "EvilPregFlyingBlue": {elem2: "PregFlyingBlue" }
    },
}
var EvilBlueAge = 0;
elements.EvilFlyingBlue = { 
    color: "#D63D3D",
    singleColor: true, 
    category: "Blue", 
    state: "Solid",
    behavior: behaviors.FLY,
    conduct : 0,
    movable: true,
    temp: 0,
    stateLow: ["EvilFrozenBlue"],
    tempLow: -50,
    stateHigh: ["EvilBlueHot"],
    breakInto: "DeadEvilBlue",
    tempHigh: 50,
    hidden: 1,
    tick: function(pixel){
        if (pixel.EvilBlueAge === undefined) {
            pixel.EvilBlueAge = Math.random() *(100);}
        if (Math.random() >= 0.5){pixel.EvilBlueAge++}
        if (pixel.EvilBlueAge >= 4000){changePixel(pixel,"DeadEvilBlue")}
},
    hoverStat: function(pixel){return pixel.EvilBlueAge},
    reactions: {
    "FlyingBlue": {elem2: "EvilFlyingBlue", chance:0.2 },
    "FlyingBlue": {elem2: "DeadBlue", chance:0.3 },
    "NewbornBlue": {elem2: "EvilNewbornBlue", chance:0.6 },
    "NewborngBlue": {elem2: "DeadBlue", chance:0.09 },
    "BlueHot": {elem2: "EvilBlueHot" },
    "FrozenBlue": {elem2: "EvilFrozenBlue" },
    "ThisIsOneNiceEgg": {elem2: "ThisIsNotSuchaNiceEgg", chance:0.5},
    "EvilFlyingBlue": {elem2: "EvilPregFlyingBlue", chance:0.15},
    },
}
var EvilBlueAge = 0;
elements.EvilPregFlyingBlue = { 
    color: "#AE2727",
    singleColor: true, 
    category: "Blue", 
    state: "Solid",
    behavior: function(pixel) {
        if (pixel.start === pixelTicks) {return}
        if (pixel.charge && elements[pixel.element].behaviorOn) {
          pixelTick(pixel)
        }
        const directions = [
            [1, 0],  // Right
            [-1, 0], // Left
            [0, -1], // Up
            [0, 1]   // Down
        ];
        
        const [dx, dy] = directions[Math.random() * 4 | 0]; // Bitwise OR is faster than Math.floor()
        tryMove(pixel, pixel.x + dx, pixel.y + dy);
        doDefaults(pixel);
      },
    conduct : 0,
    movable: true,
    temp: 0,
    stateLow: ["DeadEvilBlue"],
    tempLow: -50,
    stateHigh: ["DeadEvilBlue"],
    breakInto: "DeadEvilBlue,ThisIsNotSuchaNiceEgg,ThisIsNotSuchaNiceEgg,ThisIsNotSuchaNiceEgg",
    tempHigh: 50,
    hidden: 1,
    tick: function(pixel){

    if (isEmpty(pixel.x,pixel.y+1) && (Math.random() >= 0.99)){
        createPixel("ThisIsNotSuchaNiceEgg",pixel.x,pixel.y+1);} 
    if (Math.random() >= 0.99) {changePixel(pixel, "EvilFlyingBlue");}
        if (pixel.EvilBlueAge === undefined) {pixel.EvilBlueAge = Math.random() *(100)}
        if (Math.random() >= 0.5){pixel.EvilBlueAge++}
        if (pixel.EvilBlueAge >= 600){changePixel(pixel,"ThisIsNotSuchaNiceEgg")}
},
    hoverStat: function(pixel){return pixel.EvilBlueAge},
    reactions: {
    "FlyingBlue": {elem2: "EvilFlyingBlue", chance:0.2 },
    "FlyingBlue": {elem2: "DeadBlue", chance:0.1 },
    "NewbornBlue": {elem2: "EvilNewbornBlue", chance:0.70 },
    "BlueHot": {elem2: "EvilBlueHot" },
    "FrozenBlue": {elem2: "EvilFrozenBlue" },
    "ThisIsOneNiceEgg": {elem2: "ThisIsNotSuchaNiceEgg" },
    "PregFlyingBlue": {elem2: "DeadBlue" },
    "wall": {elem2: null, chance:0.01 },
    },
}
    elements.ThisIsNotSuchaNiceEgg = { 
        color: "#530000",
        singleColor: true, 
        category: "Blue", 
        state: "solid",
        behavior: function(pixel) {
            if (pixel.start === pixelTicks) {return}
            if (pixel.charge && elements[pixel.element].behaviorOn) {
              pixelTick(pixel)
            }
            if (Math.random() < 0.8) {
            tryMove(pixel, pixel.x, pixel.y - 1);
            }
            if (Math.random() < 0.2) {
            tryMove(pixel, pixel.x, pixel.y + 1);
            }
            doDefaults(pixel);
          },
        conduct : 0,
        movable: true,
        temp: 0,
        hidden: 1,
        tick:function(pixel){
            if (Math.random() >= 0.99){changePixel(pixel, "EvilNewbornBlue")}
            if (Math.random() >= 0.9995){changePixel(pixel, "NewbornBlue")}

        }
    }

elements.EvilNewbornBlue = { 
    color: "#FF7B7B",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior: function(pixel) {
        if (pixel.start === pixelTicks) {return}
        if (pixel.charge && elements[pixel.element].behaviorOn) {
          pixelTick(pixel)
        }
        const directions = [
            [1, 0],  // Right
            [-1, 0], // Left
            [0, -1], // Up
            [0, 1]   // Down
        ];
        
        const [dx, dy] = directions[Math.random() * 4 | 0];
        tryMove(pixel, pixel.x + dx, pixel.y + dy);
        doDefaults(pixel);
      },
    conduct : 0,
    movable: true,
    temp: 0,
    stateLow: ["EvilFrozenBlue"],
    tempLow: -40,
    stateHigh: ["EvilBlueHot"],
    breakInto: "DeadEvilBlue",
    tempHigh: 40,
    hidden: 1,
        tick: function(pixel){
            if (Math.random() >= 0.99) {changePixel(pixel, "EvilFlyingBlue");}
        },
        reactions: {
            "FlyingBlue": {elem2: "EvilFlyingBlue", chance:0.1 },
            "FlyingBlue": {elem2: "DeadBlue", chance:0.05 },
            "NewbornBlue": {elem2: "EvilNewbornBlue", chance:0.2 },
            "BlueHot": {elem2: "EvilBlueHot" },
            "FrozenBlue": {elem2: "EvilFrozenBlue" },
            "ThisIsOneNiceEgg": {elem2: "ThisIsNotSuchaNiceEgg", chance:0.5 },
            "PregFlyingBlue": {elem2: "FlyingBlue" },
            "wall": {elem2: null, chance:0.01 },
            },
    },


    
elements.EvilFrozenBlue = { 
    color: "#FF4B4B",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior:[
    "XX|XX|XX",
    "XX|CH:EvilFrozenBlue>DeadEvilBlue%0.1|XX",
    "XX|M1|XX",
    ],
    conduct : 0,
    movable: true,
    temp: -50,
    tempHigh: 0,
    stateHigh: ["EvilFlyingBlue",],
    tempLow: -150,
    stateLow: ["DeadEvilBlue",],
    breakInto: "DeadEvilBlue",
    hidden: 1,
    tick: function(pixel){
        pixel.temp ++
        if (pixel.temp >=0){changePixel(pixel,"EvilFlyingBlue")}
    }
}

elements.EvilBlueHot = { 
    color: "#840E43",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior:[
    "XX|M1|XX",
    "XX|CH:EvilBlueHot>DeadEvilBlue%0.1|XX",
    "XX|XX|XX",
    ],
    conduct : 0,
    movable: true,
    temp: 50,
    tempLow: 0,
    stateLow: ["EvilFlyingBlue",],
    tempHigh: 150,
    stateHigh: ["DeadEvilBlue",],
    breakInto: "DeadEvilBlue",
    hidden: 1,
    tick: function(pixel){
        pixel.temp --
        if (pixel.temp <=0){changePixel(pixel,"EvilFlyingBlue")}
    }
}


elements.DeadEvilBlue = { 
    color: "#590000",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior:[
    "XX|XX|XX",
    "XX|DL|XX",
    "XX|M1|XX",
    ],
    conduct : 0,
    movable: true,
    temp: 0,
    hidden: 1,
}

elements.BombadiroCrocodilo = { 
    color: "#55843C",
    singleColor: true, 
    category: "wonder", 
    state: "solid",
    behavior:[
    "XX|XX|M2",
    "XX|XX|M1 AND EX:6>nuke",
    "CR:blaster%3.7|CR:bomb%25 AND CR:grenade%10 AND CR:hot_bomb%6 AND CR:emp_bomb%2|M2",
    ],
    movable: true,
    temp: 0
}
elements.BombadiroCrocodiloOnCrack = { 
    color: "#55843C",
    singleColor: true, 
    category: "wonder", 
    state: "solid",
    behavior:[
    "XX|XX|M2",
    "XX|XX|M1 AND EX:6000000000000000000000000000>head,body",
    "|CR:bomb%45 AND CR:grenade%20 AND CR:hot_bomb%40 AND CR:emp_bomb%20 AND CR:blaster%40.7|M2",
    ],
    movable: true,
    temp: 0
}
var Despawn = 0;
elements.LifeFood = { 
    color: "#9E00FF",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior: behaviors.POWDER,
    conduct : 0,
    movable: true,
    temp: 0,
    glow: 0.1,
    reactions: {
        "FlyingBlue": { elem1: "ThisIsOneNiceEgg" },
        "EvilFlyingBlue": { elem1: "ThisIsNotSuchaNiceEgg" },
    },
    tick: function(pixel){
        if (pixel.Despawn === undefined) {pixel.Despawn = 0;}
        {pixel.Despawn++}
        if (pixel.Despawn >= 100){
            if (Math.random() >= 0.9){changePixel(pixel,"DeadBlue")
            }}
},
}
var Despawn = 0;
elements.Purifyer = { 
    color: "#D4FFFF",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior: behaviors.POWDER,
    conduct : 0,
    movable: true,
    temp: 0,
    glow: 0.1,
    reactions: {
        "EvilFlyingBlue": { elem1: null, elem2: "FlyingBlue" },
        "EvilPregFlyingBlue": { elem1: null, elem2: "PregFlyingBlue" },
        "EvilNewbornBlue": { elem1: null, elem2: "NewbornBlue" },
        "ThisIsNotSuchaNiceEgg": { elem1: null, elem2: "ThisIsOneNiceEgg" },
        "EvilBlueHot": { elem1: null, elem2: "BlueHot" },
        "EvilFrozenBlue": { elem1: null, elem2: "FrozenBlue" },
        "DeadEvilBlue": { elem1: null, elem2: "DeadBlue" },
    },
    tick: function(pixel){
        if (pixel.Despawn === undefined) {pixel.Despawn = 0;}
        {pixel.Despawn++}
        if (pixel.Despawn >= 100){
            if (Math.random() >= 0.9){changePixel(pixel,"DeadBlue")
            }}
},
}
var Despawn = 0;
elements.Corruption = { 
    color: "#8D3A50",
    singleColor: true, 
    category: "Blue", 
    state: "solid",
    behavior: behaviors.POWDER,
    conduct : 0,
    movable: true,
    temp: 0,
    glow: 0.1,
    reactions: {
        "FlyingBlue": { elem1: null, elem2: "EvilFlyingBlue" },
        "PregFlyingBlue": { elem1: null, elem2: "EvilPregFlyingBlue" },
        "NewbornBlue": { elem1: null, elem2: "EvilNewbornBlue" },
        "ThisIsOneNiceEgg": { elem1: null, elem2: "ThisIsNotSuchaNiceEgg" },
        "BlueHot": { elem1: null, elem2: "EvilBlueHot" },
        "FrozenBlue": { elem1: null, elem2: "EvilFrozenBlue" },
        "DeadBlue": { elem1: null, elem2: "DeadEvilBlue" },
        "Purifyer": { elem1: null, elem2: null },
    },
        tick: function(pixel){
            if (pixel.Despawn === undefined) {pixel.Despawn = 0;}
            {pixel.Despawn++}
            if (pixel.Despawn >= 100){
                if (Math.random() >= 0.9){changePixel(pixel,"DeadBlue")
                }}
    },
    }




/*
what i still want to add to the blue's

1. blue god:

- The Blue god should only be able to spawn from an egg if there is 1 or more evil blue's
- the blue god should auto spawn purify'ers near evil blue's
- the blue god should not be able to move (stationairy) 
- if the blue god exists then eggs will be more likely to hatch evil blue's
- if this one exists then alle blue's should have a small chance to (ONLY KILL) evil blue's
- if the evil blue god already exists then the evil blue god will die and so will its guards
and when it spawns it summons blue guards around itself that also cannot move


2. Blue guard:
this one should be working like a guided missle to all red stuff, kinda like a suicide bomber
it goes to the nearest evil pixel and it just alluh akbar's itself. it also explodes into purifyd blue eggs

3. purifyd blue eggs:
only possible by putting purifyer on a nice egg
this one should hatch into 10 diffrent blue normals
this one should have a reasonable chance to turn into a blue god

4. evil blue god:
- should only spawn from a corrupt egg, very unlikely, only 1 in the game max.
- if the blue god already exists then the blue god will die and so will its guards
- does kinda the same as the blue god

5. evil blue guards:
These should work the same as the blue guards but these will explode into corruption

7. (evil blue crawler's):
- all chances of a (evil) blue flyer spawning should be cut in half and be replaced with crawler's
- crawlers can make corruption/purifyer's and even lifefood
- if a crawler has produced 10 stuff in its life, it will die 

8. Blue wallers
- These should function simmilairly to crawlers however these should be able to place walls of their own colour
- for each wall of their own colour, eggs are more likely to hatch and they should live 1 second longer
- blue wallers can only place a wall if they have a god

9. Blue soldiers
-these should only be able to spawn if the other side has a blue god, and even then they should be rare
- only 3 in the game max
- if a blue soldier encounters anything evil, it will kill it
- blue soldiers fly around like normal blue's but if they encounter the blue guards then they will die but also the blue guards of the other team

10. Blue boom's
- a nice egg should have a small chace to go boom, if this happens then it will summon 5 purifyed egg's
- should only be possible if there is no god of their team.



changes to be made:
//eggs should move less, hatch less likely and be harder to get. But should spawn 3 newborn's 
// guards should be able to spawn from purify'ed eggs
//if there are 1.5x more evil blue's then good blue's then the blue's will 
// stuff should not be as laggy anymore
// dead blue's should fall and if they fall on an egg then it will destroy that, (opposing or own team doesn't matter)
// the pregblue's should be better
// the older a normal blue gets, the slower it moves, (to the power of 2) so, exponential
// dead blue's should also have a very small chance to destroy others of its own team it comes into contact with
// hot blue's should not be able to die
// if a hot blue encounters a evil blue of any kind, then it will destroy that evil blue (exept gods)
// if a frozen blue encounters a evil blue of any kind, then it should turn it into a frozen blue
// remove evil hot blue's and fronzen blue's
// blue newborn's and blue normal's should not be able to die due to an evil newborn blue and kill it 100&
// if an egg gets corrupted it should have a very small chance to summon a god, (very small)
*/


/*
______________________$$$$$$$$
_______________$$$$$$$________$$$$$$$$$
_____________$$________________________$$$$
____________$$_____________________________$$
___________$__________________________________$$
___________$$___________________________________$$
__________$$__$$______________________$$__________$$
________$$__$$___$$$$_________$$$$____$$__________$$$$
______$$___$$__$$$$__$$_____$$$$__$$_$$_____________$$$
______$$___$$____$$$$_________$$$$___$$_______________$$
______$$___$$________________________$$_______________$$
______$$____$$_______________________$$_____________$$
________$$__$$____$$$$$$_____________$$___________$$$
________$$__$$__$$______$$___________$$_________$$
________$$__$$__$$______$$___________$$_______$$
__________$$$$____$$$$$$_____________$$$$____$$$$
__________$$$$_____________________$$__$$____$$$
___________$$_$$$$$$$$$$$$_____$$$$______$$$$_$$
_____________$$___$$______$$$$$_______________$$
_____________$$_____$$$$$$$____________________$$
_____________$$________________________________$$
____________$$_________________________________$$
____________$$_________________________________$$
____________$$___________________________________$
____________$$___________________________________$$
__________$$_________________________$$___________$
__________$$__________$$___________$$_____________$$
________$$__$$________$$_________$$_______________$$
______$$____$$__________$$_______$$_______________$$
______$$____$$____________$$___$$_________________$$
____$$______$$_____________$$_$$_______$$_________$$
____$$______$$________$$____$$$________$$_________$$
____$$______$$________$$____$$$_______$$__________$$
____$$______$$________$$_______________$$__________$$
____$$______$$________$$_______________$$____________$
_$$$$_______$$________$$_______________$$____________$$
$___$$______$$________$$$$___________$$$$____________$$
$___$$______$$________$$__$$_______$$__$$____________$$
_$$$$$______$$________$$____$$___$$_____$$___________$$
____$$______$$________$$______$$_______$$___________$$
____$$______$$________$$_____$$________$$___________$$
__$$________$$________$$$$$$$$___$$$$$$__$$_________$$
__$$________$$________$$______$$$______$$$$_________$$
$$________$$__________$$_________$$$$$$__$$__________$
$$______$$__________$$$$$$$$$$$$$$$______$$__________$
$$_$$_$$$__________$$_____________$$$$$$$__$$_________$
_$$$$$$$___________$$______________________$$________$$
_____$$__$$__$$__$$_$______________________$$__________$$
______$$$$__$___$__$$______________________$$____________$
_______$$___$___$__$________________________$$_$__$$__$$__$
_________$$$$$$$$$$__________________________$$_$_$$$$$$$$
Cool dog ig?
*/
