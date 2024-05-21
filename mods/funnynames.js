function swapObjectValues(obj) {
    const keys = Object.keys(obj);
    while (keys.length > 1) {
      const index1 = Math.floor(Math.random() * keys.length);
      let index2 = Math.floor(Math.random() * keys.length);
      while (index2 === index1) {
        index2 = Math.floor(Math.random() * keys.length);
      }
      const temp = obj[keys[index1]];
      obj[keys[index1]] = obj[keys[index2]];
      obj[keys[index2]] = temp;
      keys.splice(index1, 1);
      keys.splice(keys.indexOf(keys[index2]), 1);
    }
    return obj;
  }
  function createLetterObject(str) {
    const letterObject = {};
    for (let i = 0; i < str.length; i++) {
      const letter = str[i];
      if (!letterObject[letter]) {
        letterObject[letter] = letter;
      } else {
        let count = 2;
        while (letterObject[letter + count]) {
          count++;
        }
        letterObject[letter + count] = letter;
      }
    }
    return letterObject;
  }
  function objectValuesToString(obj) {
    let result = "";
    for (const key in obj) {
        result += obj[key];
    }
    return result;
  }  
  let customName = "c"
if (!settings.funnyname){settings.funnyname = {}; saveSettings()}
elements.name_settings = {
    color: elements.image.color,
    category: "funny name tools",
    canPlace: false,
    onSelect: function(){
        var doVowelSwapping = prompt("Would you like to swap the vowels in the names? Type yes or no.", "no")
        if (doVowelSwapping == "yes"){settings.funnyname.doVowelSwapping = true} else {settings.funnyname.doVowelSwapping = false}
        var doNameSwapping = prompt("Would you like to swap the names of the elements? Type yes or no.", "no")
        if (doNameSwapping == "yes"){settings.funnyname.doNameSwapping = true} else {settings.funnyname.doNameSwapping = false}
        var doLetterSwapping = prompt("Would you like to swap the letters in the names? Type yes or no.", "no")
        if (doLetterSwapping == "yes"){settings.funnyname.doLetterSwapping = true} else {settings.funnyname.doLetterSwapping = false}
        var doNameRates = prompt("Would you like to make the names a rating? If yes, this will set all others to no (it is incompatible.) Type yes or no.", "no")
        if (doNameRates == "yes"){
            settings.funnyname.doNameRates = true
            settings.funnyname.doNameSwapping = false
            settings.funnyname.doVowelSwapping = false
            settings.funnyname.doLetterSwapping = false
        } else {settings.funnyname.doNameRates = false}
        saveSettings()
        var allNamesString = prompt("Would you like to set all names to a custom string? This will set all others to no. Type yes or no.", "no")
        if (allNamesString == "yes"){
            settings.funnyname.doNameRates = false
            settings.funnyname.doNameSwapping = false
            settings.funnyname.doVowelSwapping = false
            settings.funnyname.doLetterSwapping = false
            settings.funnyname.doNameRates = false
            customName = prompt("What would you like to set the names to?", "")
            settings.funnyname.customName = true
            settings.funnyname.customNameString = customName
            saveSettings()
        } else {settings.funnyname.customName = false}
        saveSettings()
    }
}
runAfterAutogen(
    function(){
        if (settings.funnyname.doVowelSwapping){
            for (let elementname in elements){
                if (elementname != "name_settings"){
                    let newelementname = elementname.replaceAll("e", "@")
                    newelementname = newelementname.replaceAll("o", "e")
                    newelementname = newelementname.replaceAll("@", "o")
                    newelementname = newelementname.replaceAll("a", "*")
                    newelementname = newelementname.replaceAll("u", "a")
                    newelementname = newelementname.replaceAll("i", "u")
                    newelementname = newelementname.replaceAll("*", "i")
                     elements[elementname].name = newelementname
                }
            }
        }
        if (settings.funnyname.doNameSwapping){
            let listofnames = {}
            for (let elementname in elements){
                if (elementname != "name_settings"){
                    if (elements[elementname].name){listofnames[elementname] = elements[elementname].name} else {listofnames[elementname] = elementname}
                }
            }
            listofnames = swapObjectValues(listofnames)
            for (let key in listofnames){
                elements[key].name = listofnames[key]
            }
        }
        if (settings.funnyname.doLetterSwapping){
            for (let elementname in elements){
                if (elementname != "name_settings"){
                    let newelementname = {}
                    if (elements[elementname].name){newelementname = createLetterObject(elements[elementname].name)} else {newelementname = createLetterObject(elementname)}
                    newelementname = swapObjectValues(newelementname)
                    elements[elementname].name = objectValuesToString(newelementname)
                }
            }
        }
        if (settings.funnyname.doNameRates){
            for (let elementname in elements){
                if (elementname != "name_settings"){
                    var randomRating = Math.floor(Math.random() * 11)
                    switch(randomRating){
                        case 0: elements[elementname].name = "absolutely_horrible"; break
                        case 1: elements[elementname].name = "horrible"; break
                        case 2: elements[elementname].name = "awful"; break
                        case 3: elements[elementname].name = "poor"; break
                        case 4: elements[elementname].name = "mediocre"; break
                        case 5: elements[elementname].name = "decent"; break
                        case 6: elements[elementname].name = "good"; break
                        case 7: elements[elementname].name = "great"; break
                        case 8: elements[elementname].name = "super_great"; break
                        case 9: elements[elementname].name = "absolutely_great"; break
                        case 10: elements[elementname].name = "one_of_the_best"; break
                    }
                }
            }
        }
        if (settings.funnyname.customName){
            for (let elementname in elements){
                if (elementname != "name_settings"){
                    elements[elementname].name = settings.funnyname.customNameString
                }
            }
        }
    }
)