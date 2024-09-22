// created by SquareScreamYT

for (let elementName in elements) {
  let element = elements[elementName];
  if (!element.desc.includes("This Element is from")) {
    element.desc += "\nThis Element is from Sandboxels (Vanilla)";
  }
}

runAfterLoad(function() {
  for (let i = 0; i < enabledMods.length; i++) {
    let mod = enabledMods[i];

    fetch(mod)
      .then(response => response.text())
      .then(data => {
        console.log(`Loaded mod: ${mod}`);

        Object.keys(elements).forEach(function(elementName) {
          let element = elements[elementName];
          
          if (!element.desc.includes("This Element is from")) {
            element.desc += `\nThis Element is from ${mod}`;
          }
        });
      })
      .catch(error => console.error('Error fetching the mod file: ', error));
  }
});
