
elements.randomdiscovered = {
    color: ["#ffffff", "#dddddd", "#eeeeee"],
    tick: function(pixel) {
        if (!pixel.start) {
            const discovered = Object.keys(elements).filter(name => discoveredElements.includes(name));
            if (discovered.length > 0) {
                const randomElem = discovered[Math.floor(Math.random() * discovered.length)];
                changePixel(pixel, randomElem);
            }
            pixel.start = true;
        }
    },
    category: "random",
    state: "solid",
    density: 1000,
    excludeRandom: true
};
