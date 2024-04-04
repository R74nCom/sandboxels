var color = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e","f"]
var states = ["solid", "liquid", "gas"]
var total = 0
var dangerouselements = ["supernova", "n_explosion", "pn_explosion", "armageddon", "nuke", "h_bomb"]
var elementslist = []
for (elementi in elements){
    elementslist.push(elementi)
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length* Math.random() << 0]];
};
for (var i = 1; i <= 10000; i++){
    var f = Math.random() < 0.2
    var co = Math.random() < 0.2
    elements["element_"+i] = {
        color:  "#" + color[Math.floor(Math.random()*color.length)] + color[Math.floor(Math.random()*color.length)] + color[Math.floor(Math.random()*color.length)] + color[Math.floor(Math.random()*color.length)] + color[Math.floor(Math.random()*color.length)] + color[Math.floor(Math.random()*color.length)],
        category: "random",
        behavior: randomProperty(behaviors),
        state: states[Math.floor(Math.random()*states.length)],
        reactions: {},
        density: randomIntFromInterval(1, 10000)
    }
    total = i
    if (f){
        elements["element_"+i].tempHigh = 20 + randomIntFromInterval(10, 6000)
        elements["element_"+i].stateHigh = elementslist[Math.floor(Math.random()*elementslist.length)]
    }
    if (co){
        elements["element_"+i].tempLow = 20 - randomIntFromInterval(10, 270)
        elements["element_"+i].stateLow = elementslist[Math.floor(Math.random()*elementslist.length)]
    }
    for (r = 0; r < 10; r++){
        elements["element_"+i].reactions[elementslist[Math.floor(Math.random()*elementslist.length)]] = { elem1: elementslist[Math.floor(Math.random()*elementslist.length)], elem2: elementslist[Math.floor(Math.random()*elementslist.length)]}
    }
  //  console.log(i + " is done!")
  //  console.log(i)
  //  console.log(elements["element_"+i].behavior)
  if (elements["element_" + i].density == i){
    console.log(i + "is unique because its density is the same as its id!")
  }
  for (var reaction in elements["element_" + i].reactions){
    if (dangerouselements.includes(elements["element_" + i].reactions[reaction].elem1)|| dangerouselements.includes(elements["element_" + i].reactions[reaction].elem2)){
        console.log(i + " is scary due to its reaction with " + reaction)
        if (!elements["element_"+i].desc){
        elements["element_" + i].desc = "This is scary! Don't let it touch " + reaction
        }else(elements["element_"+i].desc += (" or " + reaction))
    }
  }
}