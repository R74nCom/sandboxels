pixelResizeButton = document.createElement("button");
pixelResizeButton.onclick = function(pixel) {
    let canvas_width = document.getElementById("game").width;
    let canvas_height = document.getElementById("game").height;
    let pixelSizeNeeded = prompt("how big of pixels you want");
    resizeCanvas(canvas_height,canvas_width, pixelSizeNeeded, true);
};
pixelResizeButton.textContent = "resize pixels";
document.getElementById("toolControls").appendChild(pixelResizeButton);
