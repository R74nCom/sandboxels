runAfterAutogen(()=>{
    for (var element in elements) {
        if (elements[element].excludeRandom === true) {
            delete elements[element].excludeRandom;
        }
    }
})