// created by SquareScreamYT

for (let elementName in elements) {
  let element = elements[elementName];
  if (element.desc && typeof element.desc === 'string' && element.desc.trim() !== '') {
    if (!element.desc.includes("This Element is from")) {
      element.desc += "\nThis Element is from Sandboxels (Vanilla)";
    }
  } else {
    element.desc = "This Element is from Sandboxels (Vanilla)";
  }
}

runAfterLoad(function() {
  let modDescriptions = {};

  let fetchPromises = enabledMods.map(mod => {
    return fetch(mod)
      .then(response => response.text())
      .then(data => {
        console.log(`Loaded mod: ${mod}`);
        modDescriptions[mod] = data;
      })
      .catch(error => console.error('Error fetching the mod file: ', error));
  });

  Promise.all(fetchPromises).then(() => {
    Object.keys(elements).forEach(function(elementName) {
      let element = elements[elementName];
      let elementMod = "Sandboxels (Vanilla)";
      
      for (let mod of enabledMods) {
        if (modDescriptions[mod].includes(`elements.${elementName} =`) || 
            modDescriptions[mod].includes(`elements["${elementName}"] =`)) {
          elementMod = mod;
          break;
        }
      }
      
      if (element.desc && typeof element.desc === 'string' && element.desc.trim() !== '') {
        if (!element.desc.includes("This Element is from")) {
          element.desc += `\nThis Element is from ${elementMod}`;
        }
      } else {
        element.desc = `This Element is from ${elementMod}`;
      }
    });
  });
});
