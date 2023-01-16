clearInterval(tickInterval);
const oldTick = tick;
let __registeredTickCallbacks = [];
function everyTick(callback){
  __registeredTickCallbacks.push(callback);
}
tick = function(){
  oldTick();
  __registeredTickCallbacks.forEach(func=>{
    func();
  });
}
tickInterval = setInterval(tick, 1000/tps);
