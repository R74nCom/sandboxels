pixelResizeButton = document.createElement("button");
pixelResizeButton.onclick = function(pixel) {
    let canvas_width = document.getElementById("game").width;
    let canvas_height = document.getElementById("game").height;
    promptInput("How big should pixels be?", (pixelSizeNeeded) => {
        // let pixelSizeNeeded = prompt("How big should pixels be?");
        if (!pixelSizeNeeded || isNaN(pixelSizeNeeded)) {
            // alert('number is invalid!');
            promptText("Number is invalid!");
            return;
        }
        resizeCanvas(canvas_height,canvas_width, parseFloat(pixelSizeNeeded), true);
    },"Pixel Size")
};
pixelResizeButton.textContent = "Resize";
window.addEventListener("load",function(){
   document.getElementById("toolControls").appendChild(pixelResizeButton); 
});
