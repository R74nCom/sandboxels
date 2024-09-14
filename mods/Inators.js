elements.explodeinator = {
   color: "#ff0000",
   behaviorOn: behaviors.WALL,
   behavior: [
     "CR:steel|CR:steel|CR:brick|CR:wall|CR:wall",
     "XX|DL|CR:beamcr|CR:wire|CR:wall",
     "CR:steel|CR:brick|CR:wire|CR:wire|CR:wire|CR:sensor"
   ],
   category: "lab",
   state: "solid",
 };
 elements.explodeinator_beam = {
     color: "#ff0000",
     behavior: [
         "XX|XX|XX",
         "M1|DL%0.25|XX",
         "XX|XX|XX",
     ],
     tick: behaviors.wall,
     reactions: {
       "": { "elem2":"explosion", "chance": 100 },
       "wall": { "elem2":"explosion", "chance": 100 },
     },
     temp: 35,
     tempLow: -273,
     stateLow: ["liquid_light",null],
     stateLowColorMultiplier: 0.8,
     breakInto:  ["explosion"],
     properties: {
       flipY: false,
       speed: 5,
       fall: 0,
       attached: false,
       attachOffsets: [null, null],
       penetrateCounter: 7,
     },
     breakInto: "light",
     breakIntoColor: "#ffcfcf",
     category: "energy",
     state: "gas",
     density: 0.00001,
     ignoreAir: true
 };
 elements.beamcr = {   
   behavior: behaviors.WALL,
   behaviorOn: [
     "XX|XX|XX",
     "CR:explodeinator_beam|XX|XX",
     "XX|XX|XX",
   ],
   color: "#fadecd",
   category: "machines",
   conduct: 1
 }
elements.acidinator2 = {
   color: "#ff0000",
   behaviorOn: behaviors.WALL,
   behavior: [
     "CR:steel|CR:steel|CR:brick|CR:wall|CR:wall",
     "XX|DL|CR:beamcr2|CR:wire|CR:wall",
     "CR:steel|CR:brick|CR:wire|CR:wire|CR:wire|CR:sensor"
   ],
   category: "lab",
   state: "solid",
 };
 elements.acidinator_beam2 = {
     color: "#ff0000",
     behavior: [
         "XX|XX|XX",
         "M1|DL%0.25|XX",
         "XX|XX|XX",
     ],
     tick: behaviors.wall,
     reactions: {
       "head": { "elem2":"acid", "chance": 100 },
       "wall": { "elem2":"acid", "chance": 100 },
     },
     temp: 35,
     tempLow: -273,
     stateLow: ["liquid_light",null],
     stateLowColorMultiplier: 0.8,
     breakInto:  ["explosion"],
     properties: {
       flipY: false,
       speed: 5,
       fall: 0,
       attached: false,
       attachOffsets: [null, null],
       penetrateCounter: 7,
     },
     breakInto: "light",
     breakIntoColor: "#ffcfcf",
     category: "energy",
     state: "gas",
     density: 0.00001,
     ignoreAir: true
 };
 elements.beamcr2 = {   
   behavior: behaviors.WALL,
   behaviorOn: [
     "XX|XX|XX",
     "CR:acidinator_beam2|XX|XX",
     "XX|XX|XX",
   ],
   color: "#fadecd",
   category: "machines",
   conduct: 1
 }
