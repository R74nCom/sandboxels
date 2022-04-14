// Version 1.0 of Wheel Fix by Nubo. This is a mod meant to fix the brush scaling too much with the mouse wheel for some people.

// Wheel Fix was deprecated after Sandboxels 1.5 because the wheel sensitivity bug has been fixed.

/*
runAfterLoad(function() {
    wheelHandle = function(e) {
        e.preventDefault();
        var deltaY = e.deltaY*0.01;
        if (Math.round(deltaY) == 0) {
            if (deltaY > 0) { deltaY = 1; }
            else { deltaY = -1; }
        }
        mouseSize += Math.round(deltaY*1.5);
        if (mouseSize < 1) { mouseSize = 1; }
        if (mouseSize > (height > width ? height : width)) { mouseSize = (height > width ? height : width); }
    }
});
*/