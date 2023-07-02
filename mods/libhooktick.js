let __registeredTickCallbacks = [];
window.addEventListener("load", ()=>{
  clearInterval(tickInterval);
  const oldTick = tick;
  tickInterval = setInterval(tick, 1000/tps);
  tick = function(){
    oldTick();
    __registeredTickCallbacks.forEach(func=>{
      func();
    });
  }
});
function everyTick(callback){
  __registeredTickCallbacks.push(callback);
}
