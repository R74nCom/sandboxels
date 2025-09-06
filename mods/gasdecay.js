let gasList = []
runAfterLoad(function(){
    for (let _element in elements){
        if (elements[_element].state == "gas"){
            gasList.push(_element)
        }
    }
    runPerPixel(function(pixel){
        if (gasList.indexOf(pixel.element) >= 0){
            if (Math.random() < 0.002){
                deletePixel(pixel.x, pixel.y)
            }
        }
    })
})