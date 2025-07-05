elements.element_replacer = {
    color: ["#ff007a", "#4625e3"],
    onSelect: function(){
        var answerreplace = prompt("Element to replace clicked elements with:");
        if (!answerreplace) {return}
           replacingelement = mostSimilarElement(answerreplace);
    },
    tool: function(pixel) {
        pixel.element = replacingelement
    },
    category: "tools",
};