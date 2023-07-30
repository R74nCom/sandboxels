let __registeredAfterTickCallbacks = [];
let __registeredBeforeTickCallbacks = [];
window.addEventListener("load", ()=>{
  const oldTick = tick;
  clearInterval(tickInterval);
  tick = function(){
    __registeredBeforeTickCallbacks.forEach(func=>{
      func();
    });
    oldTick();
    __registeredAfterTickCallbacks.forEach(func=>{
      func();
    });
  }
  tickInterval = setInterval(tick, 1000/tps);
});
function everyTick(callback) {
  afterEveryTick(callback);
}
window.everyTick = everyTick;
function beforeEveryTick(callback) {
  __registeredBeforeTickCallbacks.push(callback);
}
window.beforeEveryTick = beforeEveryTick;
function afterEveryTick(callback) {
  __registeredAfterTickCallbacks.push(callback);
}
window.afterEveryTick = afterEveryTick;
function removeTickListener(callback, mode) {
  let removed = false;
  if(mode!=="before") {
    let index = __registeredAfterTickCallbacks.indexOf(callback);
    if (index === -1 && mode === "after") throw new Error(`Could not find callback.`);
    if(index !== -1) {
      __registeredAfterTickCallbacks.splice(index, 1);
      removed = true;
    }
  }
  if(mode!=="after") {
    let index = __registeredBeforeTickCallbacks.indexOf(callback);
    if (index === -1 && mode === "before") throw new Error(`Could not find callback.`);
    if(index !== -1) {
      __registeredBeforeTickCallbacks.splice(index, 1);
      removed = true;
    }
  }
  return removed;
}
window.removeTickListener = removeTickListener;
