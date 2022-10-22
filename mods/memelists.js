window.addEventListener("load", ()=>{
  let list = document.createElement("ul");
  let eleButtons = document.getElementsByClassName("elementButton");
  [...eleButtons].forEach(button =>{
    button.style.display = "none";
  });
  document.getElementById("categoryControls").style.display = "none";
  Object.keys(elements).forEach(ele=>{
    let li = document.createElement("li");
    li.innerHTML = elements[ele].alias || ele;
    list.appendChild(li);
    li.onclick = ()=>{
      selectElement(ele);
    }
  });
  document.getElementById("extraInfo").appendChild(list);
});
