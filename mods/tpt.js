function indexOfOccurrence(array, func, occurrence) {
  let counter = 0;
  let index = -1;
  let i = 0;
  while (counter <= occurrence && i < array.length) {
    if (func(array[i])) {
      index = i;
      counter++;
    }
    i++;
  }
  if (counter < occurrence) {
    return -1;
  }
  return index;
}
overrideNames = {};
usedNames = overrideNames;

function fourLetterNames(input) {
  let input2 = input.toUpperCase().replace(" ", "").replace("_", "");

  if (input2.length <= 4) {
    if (usedNames[input2]) {
      elements[usedNames[input2]].name = fourLetterNames(usedNames[input2]);
    }
    usedNames[input2] = input;
    return input2;
  }
  input2 = input
    .toUpperCase()
    .split("_")
    .map((x) => x.slice(0, Math.max(3, Math.floor(x.length / 2))) + x.slice(Math.max(3, Math.floor(x.length / 2))).replace(/[AEIOU ']/g, ""))
    .join("");

  let indexes = Array.from({ length: 4 }, (e, i) => i);
  do {
    let name = indexes.map((x) => input2[x]).join("");
    if (usedNames[name]) continue;
    usedNames[name] = input;
    return name;
  } while (bumpIndexes(indexes, input2.length));
  input2 = input.toUpperCase().replace(" ", "").replace("_", "");
  do {
    let name = indexes.map((x) => input2[x]).join("");
    if (usedNames[name]) continue;
    usedNames[name] = input;
    return name;
  } while (bumpIndexes(indexes, input2.length));
  console.log(input + " didn't get a four letter name");
}

//jan misali's base abbreviating system is modified for this

function bumpIndexes(indexes, len) {
  // first index is held steady at 0,
  // last index is handled specially,
  // so handle the in-between ones first
  for (var i = 1; i < indexes.length - 1; i++) {
    // If I have room, just increment the index
    if (indexes[i] + 1 < indexes[i + 1]) {
      indexes[i] += 1;
      return true;
    }
    // Otherwise reset it and try bumping the next
    indexes[i] = i;
    continue;
  }
  // Haven't returned yet, meaning we're at the final index
  // Increment unless that would send us off the string
  // For reasons that are probably a mistake,
  // jan's algo never uses the last letter in an abbrev.
  // We reproduce this error to ensure we get the same
  // results as depicted in their video.
  if (indexes.at(-1) < len - 1) {
    indexes[indexes.length - 1] = indexes[indexes.length - 1] + 1;
    return true;
  } else {
    return false;
  }
}
runAfterAutogen(function () {
  for (let elementname in elements) {
    if (elementname != "name_settings") {
      let newelementname = fourLetterNames(elements[elementname].name || elementname);
      elements[elementname].name = newelementname;
    }
  }
});
