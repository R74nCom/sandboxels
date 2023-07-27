const devMode = false;
// Tippy depends on popper
const popperUrl = devMode ? "https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js" : "https://unpkg.com/@popperjs/core@2";
const tippyUrl = devMode ? "https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js" : "https://unpkg.com/tippy.js@6";
window.addEventListener("load", ()=>{
  let popper = document.createElement("script");
  popper.src = popperUrl;
  popper.addEventListener("load", () => {
    let tippyScr = document.createElement("script");
    tippyScr.src = tippyUrl;
    tippyScr.addEventListener("load", ()=>main(), {passive: true});
    document.body.appendChild(tippyScr);
  }, {passive: true});
  document.body.appendChild(popper);
}, {passive: true});
function main() {
  [...document.getElementsByClassName("elementButton")].forEach(button=>{
    let ele = elements[button.getAttribute("element")];
    // if(ele === undefined || ele === null) return;
    if(ele.desc) {
      button.setAttribute("data-tippy-content", `<div>${ele.desc}</div>`);
      if(ele.desc.includes("<!--INTERACTIVE-->")) {
        button.setAttribute("data-tippy-interactive", true);
      }
    }
  });
  tippy("[data-tippy-content]", {
    allowHTML: true,
    duration: 0,
    placement: "bottom"
  });
}
