const defaultTooltip = "---";
let tooltipEle;
window.addEventListener("load", ()=>{
  tooltipEle = document.createElement("p");
  tooltipEle.innerHTML = defaultTooltip;
  setTimeout(()=>{
    document.getElementById("extraInfo").children[1].appendChild(tooltipEle);
    let buttons = document.getElementsByClassName("elementButton");
    [...buttons].forEach(button=>{
      let ele = button.getAttribute("element");
      button.addEventListener("mouseenter", e=>{
        if(elements.hasOwnProperty(ele)) {
          if(elements[ele].hasOwnProperty("desc")) {
            tooltipEle.innerHTML = elements[ele].desc;
          }
        }
      });
      button.addEventListener("mouseleave", e=>{
        tooltipEle.innerHTML = defaultTooltip;
      });
    });
  });
});
