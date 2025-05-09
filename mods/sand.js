//remove all except sand
runAfterLoad(function() {
    for (var elem in elements) {
        if (elem !== "sand") {
            delete elements[elem];
        }
    }
});

runAfterLoad(function() {
    // replace the text sandboxels
    document.body.innerHTML = document.body.innerHTML.replace(/(?!<a[^>]*>)(sandboxels)(?![^<]*<\/a>)/gi, "Sand");

    // silly link stuff so it doesn't go to the wrong page
    var links = document.querySelectorAll('a');
    links.forEach(function(link) {
        var originalHref = link.href;
        if (originalHref.includes("sand") && !originalHref.includes("sandboxels")) {
            var newHref = originalHref.replace(/sand/gi, "sandboxels");
            link.href = newHref; // update link
        }
    });

    // replace the other stuff
    document.body.innerHTML = document.body.innerHTML
        .replace(/over 500 unique elements/gi, "1 whole element")
        .replace(/There are thousands of interactions between the many materials, plants, animals, fluids, and powders in the game\./gi, "There are no interactions in the game except collision.")
        .replace(/a category,\s*like\s*<strong>Liquids<\/strong>,\s*then\s*pick\s*an\s*element,\s*like\s*<strong>Water<\/strong>\./gi, "sand.")
        .replace(/biology, chemistry, ecology, geology, cooking, and even virology. There are countless aspects to discover\./gi, "sand.");
});
// no categories because why would we need that for one pixel type
elements.sand.category = "tools";
// honestly i should've just not made it replace the text but wheres the fun in that