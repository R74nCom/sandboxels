var elementslist = []
for (elementi in elements){
    elementslist.push(elementi)
}
async function _GNPrompt(message, title = "Prompt", defaultValue = "") { // thanks to ggod
    return new Promise(resolve => {
        promptInput(message, (result) => {
            resolve(result);
        }, title, defaultValue);
    })
}
elements.change_count = {
  color: "#34eb86",
  canPlace: false,
  behavior: behaviors.SELFDELETE,
  onSelect: async function() {
    var cans = await _GNPrompt("Please input how many elements you would like to be generared each time.", "10kelements.js is asking you...", 10000);
    if (!cans) { return }
    if (cans == "skin"){settings.randomcount = 10000; settings.skineasteregg = true; settings.sandeasteregg = false; saveSettings(); promptText("skin"); return}
    if (cans == "sand"){settings.randomcount = 10000; settings.skineasteregg = false; settings.sandeasteregg = true; saveSettings(); promptText("sand"); return}
    if (cans > 100000){promptText("You have put too big of a number! This would surely crash your browser or eat up all your RAM! Element count will remain unchanged."); return}
    if (cans < 1 && (parseInt(cans) > -1) ){alert("You have either put a decimal or zero. Why? Element count will remain unchanged."); return}
    if (isNaN(parseInt(cans))){promptText("Apparently your input isnt even a number. Try again. Element count will remain unchanged."); return}
    settings.randomcount = parseInt(cans)
    settings.skineasteregg = false;
    settings.sandeasteregg = false;
    saveSettings()
  }, 
  category: "random"
}
var choosebehaviors = behaviors
delete choosebehaviors.KILLPIXEL2
delete choosebehaviors.KILLPIXEL1
if (!settings.randomcount || settings.randomcount > 100000){settings.randomcount = 10000; saveSettings()}
var color = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e","f"]
var states = ["solid", "liquid", "gas"]
var essentialelements = ["molten_gallium", "gallium", "gallium_gas", "change_count"]
var sandelements = ["erase", "sand", "change_count"]
var total = 0
var dangerouselements = ["supernova", "n_explosion", "pn_explosion", "armageddon", "nuke", "h_bomb"]
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length* Math.random() << 0]];
};
if (Math.abs(settings.randomcount) == settings.randomcount && !settings.sandeasteregg){
  if (!settings.skineasteregg){
  for (var i = 1; i <= settings.randomcount; i++){
      var canHeat = Math.random() < 0.2
      var canCold = Math.random() < 0.2
      elements["element_"+i] = {
          color:  "#" + color[Math.floor(Math.random()*color.length)] + color[Math.floor(Math.random()*color.length)] + color[Math.floor(Math.random()*color.length)] + color[Math.floor(Math.random()*color.length)] + color[Math.floor(Math.random()*color.length)] + color[Math.floor(Math.random()*color.length)],
          category: "random",
          behavior: randomProperty(choosebehaviors),
          state: states[Math.floor(Math.random()*states.length)],
          reactions: {},
          density: randomIntFromInterval(1, 10000)
      }
      total = i
      if (canHeat){
          elements["element_"+i].tempHigh = 20 + randomIntFromInterval(10, 6000)
          elements["element_"+i].stateHigh = elementslist[Math.floor(Math.random()*elementslist.length)]
      }
      if (canCold){
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
    for (var reaction in elements["element_" + i].reactions){
      if (elements[elements["element_"+i].reactions[reaction].elem1].category == "tools" || elements[elements["element_"+i].reactions[reaction].elem2].category == "tools"){
          console.log(i + " makes a tool...? when it touches " + reaction)
          if (!elements["element_"+i].desc){
          elements["element_" + i].desc = "This breaks the laws of physics if it touches " + reaction
          }else(elements["element_"+i].desc += (" or " + reaction))
      }
    }
  }
} else {
  for (var i = 1; i <= settings.randomcount; i++){
    elements["skin_" + i] = {
      color: elements.skin.color,
      category: "skin",
      tick: function(pixel){
        changePixel(pixel, "skin", false)
      },
      density: elements.skin.color,
      behavior: behaviors.WALL,
      state: "solid",
      name: "skin"
    }
  }
}
} else if (!(settings.sandeasteregg)) {
  window.addEventListener('load', function() {
    elementslist = []
    for (elementi in elements){
      elementslist.push(elementi)
  }
  var eLen = elementslist.length
    const p = document.createElement("p");
p.innerText = `v${currentversion} • ` +(eLen - Math.abs(settings.randomcount)) +` elements, with 0 hidden`;
document.getElementById("extraInfo").querySelectorAll("small")[1].replaceChildren(p);
  if (Math.abs(settings.randomcount) > elementslist.length){
    console.log("mode 1")
    for (var elementi in elements){
      if(!essentialelements.includes(elementi)){
      document.getElementById("elementButton-" + elementi)?.remove()
      console.log(elementi)
      }
    }
  } else for (var i = 1; i <= Math.abs(settings.randomcount); i++){
    var elementi = elementslist[Math.floor(Math.random()*elementslist.length)]
    if(!essentialelements.includes(elementi)){
      elementslist.splice(elementslist.indexOf(elementi), 1)
    document.getElementById("elementButton-" + elementi)?.remove()
    console.log(elementi)
    }
  }
})
} else {
  runAfterAutogen(
    function(){
      for (elementi in elements){
        elements[elementi].category = "sand"
      }
    }
  )
    window.addEventListener('load', function() {
    elementslist = []
    for (elementi in elements){
      elementslist.push(elementi)
  }
  var eLen = elementslist.length
    const p = document.createElement("p");
p.innerText = `v${currentversion} • ` +3 +` elements, with 0 hidden`;
document.getElementById("extraInfo").querySelectorAll("small")[1].replaceChildren(p);
  if (Math.abs(settings.randomcount) > elementslist.length){
    console.log("mode 1")
    for (var elementi in elements){
      if(!sandelements.includes(elementi)){
      document.getElementById("elementButton-" + elementi)?.remove()
      console.log(elementi)
      }
    }
  } else for (var i = 1; i <= eLen; i++){
    var elementi = elementslist[Math.floor(Math.random()*elementslist.length)]
    if(!(sandelements.includes(elementi))){
      elementslist.splice(elementslist.indexOf(elementi), 1)
    document.getElementById("elementButton-" + elementi)?.remove()
    console.log(elementi)
    }
  }
})
}
