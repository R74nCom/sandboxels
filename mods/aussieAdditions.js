// This is the code for the Sandboxels mod AussieAdditions.
// All code was written by AussieBox, taken from free-to-use code, or taken from the example mod file found at the bottom of the modlist on the Sandboxels website (sandboxels.r74n.com).
// Please do not steal this code or any ideas from the mod and claim they are yours!
// With love, from AussieBox. :]
// (And that means no copying the file, tampering with one line, re-uploading it and claiming it as yours!)

// Oh, by the way, AA just means AussieAdditions. Any other mods are adressed by their full name, including the ".js" at the end. I just used this to make notes in the code a little shorter and simpler! Hope you understand, fellow github browser. ;]


// Log entry (all mods loaded)
// This code runs after all mods in the Sandboxels instance are loaded.

runAfterLoad(function() {
    console.log("Mods loaded, Hello World!");
});
runAfterLoad(function() {
    console.log("By the way, thanks for using AussieAdditions!");
});


// Log entry (when using survival.js)
// This code runs when the instance includes survival.js

if (enabledMods.includes("mods/survival.js")) {
    runAfterLoad(function() {
        console.log("AussieAdditions may not entirely support survival.js at the moment. I may add an option in Settings that makes the mod work with survival.js eventually, but it's probably coming in a loooong time. Still, hang tight! :]");
    });
}


// Log entry (when using subspace.js)
// This code runs when the instance includes subspace.js

if (enabledMods.includes("mods/subspace.js")) {
    runAfterLoad(function() {
        console.log("bruh what");
    });
}


// Log entry (when using sus.js)
// This code runs when the instance includes sus.js... why?

if (enabledMods.includes("mods/sus.js")) {
    runAfterLoad(function() {
        console.log("bro. that meme died out in 2021.");
    });
}



// Add item (Red Corruption)
// This code adds the item "red_corruption"

elements.red_corruption = {
    color: "#db0707",
    behavior: behaviors.POWDER,
    category: "corruption",
    viscosity: 1,
    state: "powder",
    density: 100,
};

// Add item (Blue Corruption)
// This code adds the item "blue_corruption"

elements.blue_corruption = {
    color: "#0404bf",
    behavior: behaviors.POWDER,
    category: "corruption",
    viscosity: 1,
    state: "powder",
    density: 100,
};

// Add item (Corruption)
// This code adds the item "corruption"

elements.blue_corruption = {
    color: "#4d0991",
    behavior: behaviors.POWDER,
    category: "corruption",
    viscosity: 1,
    state: "powder",
    density: 100,
};














// Oh, hey! You reached the bottom of the code!
// Thanks for reviewing (or just scrolling to the bottom of) my code, I appreciate it! (Not if you did the second option.)
// Anyway, here are some dedications...

// R74N, for creating Sandboxels and keeping it up on their website, despite how much it likely costs...

// My dad, who suggested naming my first YouTube video a reference for all the coders out there by naming it "Hello World!" (He's also the reason I used the famous phrase in the "Log entry (all mods loaded)" section!)

// Me (also known as AussieBox), for coming up with ideas for this mod, writing the code for them, getting frustrated when said code didn't work, asking for help with the code, "borrowing" code from others when nobody helped me, finally getting stuff to work, and filling the massive hellhole known as "the massive amount of bugs that always occur when you write any code, no matter how small"...
// (It took me so long to make this mod, so I put myself here, deal with it. And if you can't, what are you gonna do about it? >:] *laughs in chaotic silly*)

// My friends, for not caring in the slightest about what I do out of school hours... (this is a joke, dad, i'm fine, I promise)

// The Sandboxels modding community, for creating amazing modifications for our favourite sandbox website...

// And finally... YOU! :]

// Anyway, that's all the dedications, so I'm gonna go now. Hope you enjoy the mod!

// ... and don't forget to subscribe to AussieBox. Gotta get my self promo in somewhere, don't blame me, haha ;P
// Plus, you can say that you found out about my channel in one of the dumbest ways possible. I don't think many people are going to find me because of a javascript file.

// Uh, anyway, been here too long, my bad. Bye.
