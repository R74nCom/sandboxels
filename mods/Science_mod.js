// Science mod for Sandboxels
// (Inspired by survival.js)
// Build 37 (version alpha 0.0.37)
console.log("Version alpha 0.0.37")
console.log("Build 37")
console.log("If you see something that is alumium and not aluminium, just dm me on discord (this is a british/welsh mod aight)")
console.log("THIS IS NOT DONE")
// You'll see a lot more of my school account
// Read comment at line 1523 for information on what I mean by null/NULL
// This used to be a full time thing, but now it's basically just half-time now. 
// It has been confirmed, I am getting a pc on 25/06/2024 :D (I'm also going to be animating for my friends movies that are coming out soon)
// If there is anything you want to suggest or there's a bug then just dm me on discord (@a_british_proto)
// I've decided to start doing this project on my schools computer's (because they don't crash all the time) so there will be long delays in updates, sorry!
// Todo:
// - Make new substances that you can get after mixing different elements
// - Make a way to get the different substances by mixing different elements and different substances (basically the same as the one above)
// - Create different proporties for the substances (doing now)
// - Actually update all the properties and make them have effects

// How much of the elements you're gonna have when you start:

if (!settings.Science_mod) {
    settings.Science_mod = {
        "Hydrogen": 9.223372036854776e+18,
        "Helium": 9.223372036854776e+18,
        "Lithium": 9.223372036854776e+18,
        "Beryllium": 9.223372036854776e+18,
        "Boron": 9.223372036854776e+18,
        "Carbon": 9.223372036854776e+18,
        "Nitrogen": 9.223372036854776e+18,
        "Oxygen": 9.223372036854776e+18,
        "Flourine": 9.223372036854776e+18,
        "Neon": 9.223372036854776e+18,
        "Sodium": 9.223372036854776e+18,
        "Magnesium": 9.223372036854776e+18,
        "Aluminum": 9.223372036854776e+18,
        "Silicon": 9.223372036854776e+18,
        "Phosphorus": 9.223372036854776e+18,
        "Sulphur": 9.223372036854776e+18,
        "Chlorine": 9.223372036854776e+18,
        "Argon": 9.223372036854776e+18,
        "Potassium": 9.223372036854776e+18,
        "Calcium": 9.223372036854776e+18,
        "Scandium": 9.223372036854776e+18,
        "Titanium": 9.223372036854776e+18,
        "Vanadium": 9.223372036854776e+18,
        "Chromium": 9.223372036854776e+18,
        "Manganese": 9.223372036854776e+18,
        "Iron": 9.223372036854776e+18,
        "Cobalt": 9.223372036854776e+18,
        "Nickel": 9.223372036854776e+18,
        "Copper": 9.223372036854776e+18,
        "Zinc": 9.223372036854776e+18,
        "Gallium": 9.223372036854776e+18,
        "Germanium": 9.223372036854776e+18,
        "Arsenic": 9.223372036854776e+18,
        "Selenium": 9.223372036854776e+18,
        "Bromine": 9.223372036854776e+18,
        "Krypton": 9.223372036854776e+18,
        "Rubidium": 9.223372036854776e+18,
        "Strontium": 9.223372036854776e+18,
        "Yttrium": 9.223372036854776e+18,
        "Zirconium": 9.223372036854776e+18,
        "Niobium": 9.223372036854776e+18,
        "Molybdenum": 9.223372036854776e+18,
        "Technetium": 9.223372036854776e+18,
        "Ruthenium": 9.223372036854776e+18,
        "Rhodium": 9.223372036854776e+18,
        "Palladium": 9.223372036854776e+18,
        "Silver": 9.223372036854776e+18,
        "Cadmium": 9.223372036854776e+18,
        "Indium": 9.223372036854776e+18,
        "Tin": 9.223372036854776e+18,
        "Antimony": 9.223372036854776e+18,
        "Tellurium": 9.223372036854776e+18,
        "Iodine": 9.223372036854776e+18,
        "Xenon": 9.223372036854776e+18,
        "Cesium": 9.223372036854776e+18,
        "Barium": 9.223372036854776e+18,
        "Lanthanum": 9.223372036854776e+18,
        "Cerium": 9.223372036854776e+18,
        "Praseodymium": 9.223372036854776e+18,
        "Neodymium": 9.223372036854776e+18,
        "Promethium": 9.223372036854776e+18,
        "Samarium": 9.223372036854776e+18,
        "Europium": 9.223372036854776e+18,
        "Gadolinium": 9.223372036854776e+18,
        "Terbium": 9.223372036854776e+18,
        "Dysprosium": 9.223372036854776e+18,
        "Holmium": 9.223372036854776e+18,
        "Erbium": 9.223372036854776e+18,
        "Thulium": 9.223372036854776e+18,
        "Ytterbium": 9.223372036854776e+18,
        "Lutetium": 9.223372036854776e+18,
        "Hafnium": 9.223372036854776e+18,
        "Tantalum": 9.223372036854776e+18,
        "Tungsten": 9.223372036854776e+18,
        "Rhenium": 9.223372036854776e+18,
        "Osmium": 9.223372036854776e+18,
        "Iridium": 9.223372036854776e+18,
        "Platinum": 9.223372036854776e+18,
        "Gold": 9.223372036854776e+18,
        "Mercury": 9.223372036854776e+18,
        "Thallium": 9.223372036854776e+18,
        "Lead": 9.223372036854776e+18,
        "Bismuth": 9.223372036854776e+18,
        "Polonium": 9.223372036854776e+18,
        "Astatine": 9.223372036854776e+18,
        "Radon": 9.223372036854776e+18,
        "Francium": 9.223372036854776e+18,
        "Radium": 9.223372036854776e+18,
        "Actinium": 9.223372036854776e+18,
        "Thorium": 9.223372036854776e+18,
        "Protactinium": 9.223372036854776e+18,
        "Uranium": 9.223372036854776e+18,
        "Neptunium": 9.223372036854776e+18,
        "Plutonium": 9.223372036854776e+18,
        "Americium": 9.223372036854776e+18,
        "Curium": 9.223372036854776e+18,
        "Berkelium": 9.223372036854776e+18,
        "Californium": 9.223372036854776e+18,
        "Einsteinium": 9.223372036854776e+18,
        "Fermium": 9.223372036854776e+18,
        "Mendelevium": 9.223372036854776e+18,
        "Nobelium": 9.223372036854776e+18,
        "Lawrencium": 9.223372036854776e+18,
        "Rutherfordium": 9.223372036854776e+18,
        "Dubnium": 9.223372036854776e+18,
        "Seaborgium": 9.223372036854776e+18,
        "Bohrium": 9.223372036854776e+18,
        "Hassium": 9.223372036854776e+18,
        "Meitnerium": 9.223372036854776e+18,
        "Darmstadtium": 9.223372036854776e+18,
        "Roentgenium": 9.223372036854776e+18,
        "Copernicium": 9.223372036854776e+18,
        "Nihonium": 9.223372036854776e+18,
        "Flerovium": 9.223372036854776e+18,
        "Moscovium": 9.223372036854776e+18,
        "Livermorium": 9.223372036854776e+18,
        "Tennessine": 9.223372036854776e+18,
        "Oganesson": 9.223372036854776e+18,
    }
}

// Element proporties (all proporties have hidden:false as these are what you start with
// and you don't have to craft them):

// All of these are before the reaction when you add different stuff to these elements/substances
// happens (same with the substances)

element.Hydrogen = {
    behavior: behaviors.GAS,
    color:"D3D3D3",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Helium = {
    behavior: behaviors.GAS,
    color:"C0C0C0",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Lithium = {
    behavior: behaviors.WALL,
    color:"DADBDD",
    category:"land",
    state:"solid",
    hidden:false
}

element.Beryllium = {
    behavior: behaviors.WALL,
    color:"DADBDD",
    category:"land",
    state:"solid",
    hidden:false
}

element.Boron = {
    behavior: behaviors.WALL,
    color:"964B00",
    category:"land",
    state:"solid",
    hidden:false
}

element.Carbon = {
    behavior: behaviors.GAS,
    color:"000000",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Nitrogen = {
    behavior: behaviors.GAS,
    color:"0000FF",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Oxygen = {
    behavior: behaviors.GAS,
    color:"000000",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Fluorine = {
    behavior: behaviors.WALL,
    color:"FFFF00",
    category:"land",
    state:"solid",
    hidden:false
}

element.Neon = {
    behavior: behaviors.GAS,
    color:"FFFFFF",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Sodium = {
    behavior: behaviors.WALL,
    color:"A0522D",
    category:"land",
    state:"solid",
    hidden:false
}

element.Magnesium = {
    behavior: behaviors.WALL,
    color:"F0C8A0",
    category:"land",
    state:"solid",
    hidden:false
}

element.Aluminum = {
    behavior: behaviors.WALL,
    color:"C0C0C0",
    category:"land",
    state:"solid",
    hidden:false
}

element.Silicon = {
    behavior: behaviors.WALL,
    color:"C0C0C0",
    category:"land",
    state:"solid",
    hidden:false
}

element.Phosphorus = {
    behavior: behaviors.WALL,
    color:"FF0000",
    category:"land",
    state:"solid",
    hidden:false
}

element.Sulfur = {
    behavior: behaviors.WALL,
    color:"FFFF00",
    category:"land",
    state:"solid",
    hidden:false
}

element.Chlorine = {
    behavior: behaviors.GAS,
    color:"FFFFFF",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Argon = {
    behavior: behaviors.GAS,
    color:"FFFFFF",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Potassium = {
    behavior: behaviors.WALL,
    color:"00FF00",
    category:"land",
    state:"solid",
    hidden:false
}

element.Calcium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Scandium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Titanium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Vanadium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Chromium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Manganese = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Iron = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Cobalt = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Nickel = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Copper = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Zinc = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Gallium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Germanium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Arsenic = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Selenium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Bromine = {
    behavior: behaviors.LIQUID,
    color:"FFFFFF",
    category:"liquids",
    state:"liquid",
    hidden:false
}

element.Krypton = {
    behavior: behaviors.GAS,
    color:"FFFFFF",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Rubidium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Strontium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Yttrium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Zirconium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Niobium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Molybdenum = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Technetium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Ruthenium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Rhodium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Palladium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Silver = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Cadmium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Indium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Tin = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Antimony = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Tellurium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Iodine = {
    behavior: behaviors.GAS,
    color:"FFFFFF",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Xenon = {
    behavior: behaviors.GAS,
    color:"FFFFFF",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Caesium = {
    behavior: behaviors.GAS,
    color:"FFFFFF",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Barium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Lanthanum = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Cerium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Praseodymium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Neodymium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Promethium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Samarium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Europium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Gadolinium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Terbium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Dysprosium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Holmium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Erbium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Thulium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Ytterbium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Lutetium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Hafnium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Tantalum = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Tungsten = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Rhenium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Osmium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Iridium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Platinum = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Gold = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Mercury = {
    behavior: behaviors.LIQUID,
    color:"00FFFF",
    category:"liquids",
    state:"liquid",
    hidden:false
}

element.Thallium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Lead = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Bismuth = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Polonium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Astatine = {
    behavior: behaviors.GAS,
    color:"FFFFFF",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Radon = {
    behavior: behaviors.GAS,
    color:"FFFFFF",
    category:"gases",
    state:"gas",
    hidden:false
}

element.Francium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Radium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Actinium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Thorium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Protactinium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Uranium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Neptunium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Plutonium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Americium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Curium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Berkelium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Californium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Einsteinium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Fermium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Mendelevium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Nobelium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Lawrencium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Rutherfordium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Dubnium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Seaborgium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Bohrium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Hassium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Meitnerium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Darmstadtium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Roentgenium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Copernicium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Nihonium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Flerovium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Moscovium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Livermorium = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Tennessine = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

element.Oganesson = {
    behavior: behaviors.WALL,
    color:"00FFFF",
    category:"land",
    state:"solid",
    hidden:false
}

// Substance proporties (These are the properties of the substances, not the elements These properties 
// use hidden:true as you don't start with these but instead have to craft them):

// I replaced all of it with this because it might get in the way in future updates

substance.Silver_Hexafluoroarsenate = {
    behavior: behaviours.WALL,
    color:"FFFFFE",
    category:"lands",
    state:"solid",
    hidden:true
}

substance.Silver_Tetrafluoroborate = {
    behavior: behaviors.POWDER,
    color: "FAF9F6",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Silver_Bromide = {
    behavior: behaviors.WALL,
    color: "FDFD96",
    category: "lands",
    state: "solid",
    hidden: true
}

substance.Silver_Bromate = {
    behavior: behaviors.POWDER,
    colour: "FFFFFF",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Silver_Picrate_Monohydrate = {
    behavior: behaviors.WALL,
    color: "E4D99F",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Chloride = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Perchlorate_Hydrate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

// I can't believe i almost forgor about the "."
subtance.Silver_Perchlorate_Monohydrate = {
    behavior: behaviors.POWDER,
    color: "FFFFFF",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Silver_Chlorite = {
    behavior: behaviors.WALL,
    colour: "FFFF00",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Chlorate ={
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Perchlorate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Fluoride = {
    behavior: behaviors.WALL,
    color: "9B7A01",
    category: "lands",
    state: "solid",
    hidden:true
}

// Basically the same as Silver_Floride but instead the second version
subtance.Silver_Difluoride = {
    behavior: behaviors.WALL,
    color: "9B7A01",
    category: "lands",
    state: "solid",
    hidden:true
}

// Only just realised that this had spaces :skull:
substance.Silver_Hydrogen_Sluoride = {
    // I'm guessing that this is a liquid
    behavior: behaviors.LIQUID,
    color: "FFFFFF",
    category: "liquid",
    state: "liquid",
    hidden:true
}

// Why are a bunch of these just silver compounds? Really weird :/
subtance.Silver_Hexafluorophosphate = {
    behavior: behaviors.POWDER,
    color: "FFFFFF",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Silver_Hexafluoroantimonate = {
    behavior: behaviors.WALL,
    color: "FFFDD0",
    category: "lands",
    state: "solid",
    hidden:true
}

// There's a purple crystal version and a brown powder version
// Why does this sound like something you'd get at a posh (maybe Italian) restruant (without the "01" and the "_")
subtance.Silver_permanganate_01 = {
    behavior: behaviours.WALL,
    color: "800080",
    category: "lands",
    state: "solid",
    hidden:true
}

subtance.Silver_permanganate_02 = {
    behavior: behaviors.POWDER,
    color: "964B00",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Silver_Vandium_Trioxide = {
    behavior: behaviors.WALL,
    color: "FFFF00",
    category: "lands",
    state: "solid",
    hidden:true
}

// Why is this fun? How is this not torture? This is line 1247! (at the time I am making this comment)
// Not changing this ever lol ^^^^

// I think there's two silver iodides I'm just not so sure (and I ain't editing this after)
// Nvm it's only one , I got silver iodide and silver iodate mixed up :skull:
subtance.Silver_Iodide = {
    behavior: behaviors.POWDER,
    color: "E4D99F",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Silver_Iodate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden: true
}

// I was confused at first on why there were two silver nitrates, but now I understand
substance.Silver_Nitrate_01 = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Nitrate_02 = {
    behavior: behaviors.POWDER,
    color: "FFFFFF",
    category: "lands",
    state: "powder",
    hidden:true
}

subtance.Silver_Azide = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

// This one is powder and crystals
substance.Silver_Oxzide_01 = {
    behavior: behaviors.POWDER,
    color: "000001",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Silver_Oxzide_02 = {
    behavior: behaviors.WALL,
    color: "000001",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Metaphospahte = {
    behavior: behaviors.WALL,
    color: "FFFF00",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Perrhenate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Acetylide = {
    behavior: behaviors.WALL,
    color: "C0C0C0",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Chromate = {
    behavior: behaviors.POWDER,
    color: "A52A2A",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Silver_Dichromate = {
    behavior: behaviors.WALL,
    color: "A52A2A",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Subfluoride = {
    behavior: behaviors.WALL,
    color: "CD7F32",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Sulfide = {
    behavior: behaviors.WALL,
    color: "3f3f3f",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Oxzide = {
    behavior: behaviors.POWDER,
    color: "000002",
    category: "lands",
    state: "powder",
    hidden:true
}

// Editing this later on when I get back home
substance.Silver_Sulfate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

// Decided to just change the console.log to a comment because it got me confused between the github page and VSC

substance.Silver_Selenide = {
    behavior: behaviors.WALL,
    color: "333333",
    category: "lands",
    state: "solid",
    hidden:true
}

// Why am listening to a random playlist? I swear I'm going fully insane

substance.Silver_Selenate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Telluride = {
    behavior: behaviors.WALL,
    color: "333333",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Arsenate = {
    behavior: behaviors.WALL,
    color: "E3E35F",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Silver_Phosphate = {
    behavior: behaviors.WALL,
    color: "FFFF00",
    category: "lands",
    state: "solid",
    hidden:true
}

// FINALLY WE ARE OUT OF THE SILVER COMPOUNDS!!!11!!1111! :DDDDD
// Now time to go onto the aluminum compounds

substance.Aluminum_Arsenide = {
    behavior: behaviors.WALL,
    color: "FF6600",
    category: "lands", // Might just change this after I'm done with the substances (as well as the other one(s))
    state: "solid",
    hidden:true
}

substance.Aluminum_Diboride = {
    behavior: behaviors.WALL,
    color: "CB6D51",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Aluminum_Dodecaboride = {
    behavior: behaviors.WALL,
    color: "000000",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Aluminum_Bromate_Nonahydrate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Aluminum_Tribromide = {
    behavior: behavior.POWDER,
    color: "FF0000",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Aluminum_Bromide_Hexahydrate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Aluminum_Cerium_Oxide = {
    behavior: behaviors.WALL,
    color: "FF5E00",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Aluminum_Chloride = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Aluminum_Chlorohydrate = {
    behavior: behaviors.POWDER,
    color: "FFFFFF",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Aluminum_Chloride_Hydrate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

// NULL/null just means unknown
substance.Aluminum_Chloride_Hexahydrate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Aluminum_Perchlorate_Nonahydrate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Aluminum_Chlorate_Nonahydrate= {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Aluminum_Perchlorate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Potassium_Tetrachloroaluminate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

// Finally one I can actually do!
substance.Lithium_Tetrachloroaluminate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

// Nvm, back to null
substance.Sodium_Tetrachloroaluminate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Titanium_Chloride_Aluminum_Chloride = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Cesium_Fluoroaluminate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Aluminum_Cesium_Sulfate_Dodecahydrate = {
    behavior:behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

// Tf is this, I'm probs going to delete it later as i have no idea what it is
substance.Devarda’s_Alloy = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",#
    hidden:true
}

substance.Lithium_Aluminum_Deuteride = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

// Finally another one! Thank the ptable.com gods! :skull:
substance.Aluminum_Floride = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

// AAAAAAAAAAAAAAAAAAAAAAAAAAA
substance.aluminum_Fluoride_Trihydrate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

// aight, i give up on the comments now but this is one that I can actually do
substance.Ammonium_Hexafluoroaluminate = {
    behavior: behaviors.POWDER,
    color: "FFFFFF",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Potassium_Hexafluoroaluminate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Sodium_Hexafluoroaluminate = {
    behavior: behaviors.POWDER,
    color: "FFFFFF",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Sodium_Phosphoaluminate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true,
}

substance.Aluminum_Hypophosphite = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Aluminum_Hydroxide = {
    behavior: behaviors.POWDER,
    color: "FFFFFF",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Aluminum_Metasophate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Lithium_Aluminium_Hydride = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Sodium_Aluminium_Hydride = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Strontium_Lanthanum_Aluminate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Aluminum_Nitrate_Nonahydrate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Aluminium_Nitrate = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Potassium_Aluminum_Sulfate_Dodecahydrate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Alum = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Kalinite = {
    behavior: behaviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solid",
    hidden:true
}

substance.Potassium_Alum = {
    behavior: behaviors.POWDER,
    color: "FFFFFF",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Sodium_Alum = {
    behavior: behaviors.POWDER,
    color: "FFFFFF",
    category: "lands",
    state: "powder",
    hidden:true
}

substance.Aluminum_Ammonium_Sulfate_Dodecahydrate = {
    behavior: behaviors.NULL,
    color: "000000",
    category: "null",
    state: "null",
    hidden:true
}

substance.Ammonium_Aluminium_Sulfate = {
    behavior: beahviors.WALL,
    color: "FFFFFF",
    category: "lands",
    state: "solids",
    hidden:true
}
