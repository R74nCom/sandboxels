let __registeredTickCallbacks = [];
window.addEventListener("load", ()=>{
  let oldTick = tick;
  clearInterval(tickInterval);
  tick = function(){
    oldTick();
    __registeredTickCallbacks.forEach(func=>{
      func();
    });
  }
  tickInterval = setInterval(tick, 1000/tps);
});
function everyTick(callback){
  __registeredTickCallbacks.push(callback);
}
