/*
function close_window() {
    if (confirm("Reflect Test?")) {
      close();
    }
  }
  */

elements.franklin_badge = { //basic element properties
	color: "#0300b0",
    behavior: behaviors.WALL,
    category: "special",
    insulate: true,
    hardness: 1,
    noMix: true,
    tick: function(pixel){
        if (!isEmpty(pixel.x, pixel.y-1, true)){
             if (pixelMap[pixel.x][pixel.y-1].element === "lightning") {
                //console.log("holy shit oh wow")
                //close_window
                //close();
                //window.open('','_self').close();
                //window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                var delayInMilliseconds = 60; //1 second

                setTimeout(function() {
                    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
                }, delayInMilliseconds);
          }
        }
      }
        
    
};



/*
behaviors.franklin_badge.tick = function(pixel) {
    if (pixel.y-1 == "lightning") {
        console.log("Lightning detected")
    }
};
*/