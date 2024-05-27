function playSubspace() {
    var audio = new Audio("https://JustAGenericUsername.github.io/subspaceboom.mp3");
    audio.play();
}
window.addEventListener('load', function() {
const oldexpfunc = explodeAt;
explodeAt = function(x,y,radius,fire="fire"){
    oldexpfunc(x,y,radius,fire)
    playSubspace()
}})