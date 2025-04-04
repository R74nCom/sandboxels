// Run code when library_test.js loads
dependOn("library_test.js", function(){
    testLibrary.logElementDensity("sand");
})

// Force load library_test.js and run code
dependOn("library_test.js", function(){
    testLibrary.logElementDensity("water");
},true)

// Dependency system does not currently supported nested dependencies (dependencies with other dependencies)

console.log("Dependency Test loaded!");