/*
 * Requires that certain mods are installed for the callback to proceed.
 * @param {array} mods - The mods your mod depends on.
 * @param {function} callback - The callback to run when the dependencies are met.
 */
function requireMods(mods, cal) {
  if (__checkMods(mods)) {
    cal();
  }
  else {
    __installMods(mods);
    window.location.reload();
  }
}

/*
 * Fetches the name of any mods that are missing
 * @param {array} mods - The mods your mod depends on.
 * @returns {array} An array of missing mods.
 */
function __getMissingMods(mods) {
  let missing = [];
  for (let i = 0; i < mods.length; i++) {
    if (enabledMods.includes(mods[i])) {
      continue;
    }
    missing.push(mods[i]);
  }
  return missing;
}

/*
 * Checks if any mods are missing.
 * @param {array} mods - The mods your mod depends on.
 * @returns {boolean} True if any mods are missing.
 */
function __checkMods(mods) {
  return __getMissingMods(mods).length === 0;
}

function __installMods(mods) {
  __getMissingMods(mods).forEach(mod => __installMod(mod));
}

function __installMod(mod) {
  let mods = JSON.parse(window.localStorage.getItem("enabledMods") || "[]");
  mods.push(mod);
  window.localStorage.setItem("enabledMods", JSON.stringify(mods));
}

// Ensure it's available in the global scope
window.requireMods = requireMods;
