const oldExplode = explodeAt;
let explosionCooldown = 0
playExplosionSound = function(){
    var audio = new Audio("https://JustAGenericUsername.github.io/explosion.mp3");
    audio.play();
}
explodeAt = function(x,y,radius,fire="fire"){
    oldExplode(x,y,radius,fire);
    if(explosionCooldown <= 0){
        playExplosionSound();
        explosionCooldown = 7
        //console.log("success")
    } //else {
        //console.log("yeah no")
    //}
}
runEveryTick(function(){
    explosionCooldown -= 1;
})