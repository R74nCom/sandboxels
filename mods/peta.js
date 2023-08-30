{
const inject = () => {
    const gameDiv = document.getElementById("gameDiv");
    const parent = document.createElement("div");
    parent.id = "popUpParent";
    parent.style.display = "none";
    const inner = document.createElement("div");
    inner.className = "popUp";
    inner.id = "petaPopup";
    const title = document.createElement("span");
    title.id = "popUpTitle";
    title.style.fontSize = "1.5em";
    title.innerText = "title";
    inner.appendChild(title);
    const closeButton = document.createElement("button");
    closeButton.innerText = "-";
    closeButton.id = "popUpCloseButton";
    closeButton.className = "XButton";
    closeButton.onclick = () => {
        closePopUp();
    }
    inner.appendChild(closeButton);
    const text = document.createElement("div");
    text.id = "popUpText";
    text.style.marginTop = "20px";
    text.style.lineHeight = "1.5em";
    inner.appendChild(text);
    const progress = document.createElement("div");
    progress.className = "progressBar";
    const progressInner = document.createElement("div");
    progressInner.className = "progressBarInside";
    progressInner.id = "popUpProgressBar";
    progress.appendChild(progressInner);
    inner.appendChild(progress);
    parent.appendChild(inner);
    gameDiv.appendChild(parent);
}

const injectCss = () => {
    const style = `.popUp {
        position: absolute;
        border: 1px solid #fff;
        left: 50%;
        top: 20%;
        transform: translate(-50%, 0%);
        width: 70%;
        height: 30%;
        padding: 10px;
        background-color: rgb(31, 31, 31);
        overflow-x: hidden;
        z-index: 12;
    }
    .progressBar {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 20px;
    }
    .progressBarInside {
        width: 100%;
        height: 20px;
        background-color: white;
    }`;
    const styleElement = document.createElement("style");
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
}

function closePopUp() {
    const popUp = document.getElementById("popUpParent");
    let alpha = 100;
    const interval = setInterval(frame, 5);
    function frame() {
        if (alpha <= 0) {
            clearInterval(interval);
            popUp.style.display = "none";
            popUp.style.opacity = 1;
        } else {
            popUp.style.opacity = alpha / 100;
            alpha -= 5;
        }
    }
    showingPopUp = false;
}

let intervalTime = 30;

function destroyGame() {
    selectElement("unknown");
    for (const i of pixelMap) {
        for (const pixel of i) {
            if (pixel) {
                deletePixel(pixel.x, pixel.y);
            }
        }
    }
    for (const element of Object.keys(elements)) {
        delete elements[element];
        const elem = document.getElementById("elementButton-" + element);
        if (elem) elem.remove();
    }
    for (let j = 0; j < document.getElementById("categoryControls").children.length; j++) {
        const i = parseInt(j);
        document.getElementById("categoryControls").children.item(i).innerText = ["DONT", "MESS", "WITH", "PETA"][i % 4];
    }
    document.getElementById("toolControls").remove();
    // breaks stuff
    mouse1Action = () => {};
    mouseAction = () => {};
    updateStats = () => {};
    pixelMap = [];
    document.getElementById('stats').innerHTML = "<span>xNONE,yNONE  Pxls:-8   -Infinity tps   NONE   NO_VIEW   THAT'S WHAT YOU GET";
}

let showingPopUp = false;

function showPopUp(text, title) {
    const titleElement = document.getElementById("popUpTitle");
    titleElement.innerText = title;
    const textElement = document.getElementById("popUpText");
    textElement.innerText = text;
    const popUp = document.getElementById("popUpParent");
    popUp.style.display = "block";
    let width = 100;
    showingPopUp = true;
    const progressBar = document.getElementById("popUpProgressBar");
    const interval = setInterval(frame, intervalTime);
    function frame() {
        if (width <= 0 || !showingPopUp) {
            clearInterval(interval);
            setTimeout(() => {
                closePopUp();
            }, intervalTime);
            progressBar.style.width = "0%";
        } else {
            width--;
            progressBar.style.width = width + "%";
        }
    }
}

let warnings = 0;
let happened = false;
const forbiddenElements = ["meat", "rotten_meat", "cooked_meat", "frozen_meat", "milk", "cream", "fruit_milk", "pilk", "yogurt", "frozen_yogurt", "ice_cream", "egg", "yolk", "hard_yolk", "chocolate_milk", "eggnog"]

const messages = ["What are you trying to do?! That behavior is unnacceptable. Those animals didn't do anything to deserve this. You have {warning} warnings left before we delete half of your elements.",
    "You really think we can't do anything huh? Fuck around and find out. {warning} warnings left",
    "We have no words for you, how dare you?! {warning} warnings left",
    "That is completely unbelievable. {warning} warnings left",
    "That is your last chance. If you try it one more time, we WILL remove half of your elements. Do you really want to do it?",
    "You already lost half of your elements. Can't you just leave animals alone and use vegan products instead? We are left with no choice, we have to give you a warning. {warning} warnings remaining.",
    "You are leaving us with no choice. If you continue this behavior we will make your game completely unplayable. Do you really want to do this? {warning} warnings remaing.",
    "Are you even listening? Or are you just skipping our messages like there's nothing there. We are increasing the pop-up length and removing the close button, maybe now you will listen to us. {warning} warnings remaining.",
    "You only ever think about yourself, don't you? Do you really think that what you're doing currently is morally justifiable? You are just a coward, you can't admit that what you are doing is evil. Disgusting behavior. {warning} warnings remaining.",
    "That is your last chance. It's completely impossible to educate you, so if you try it one more time WE WILL TAKE ACTION! DO YOU UNDERSTAND THAT?!"];

selectElement = (element) => {
    if (showingPopUp) return;
    if (forbiddenElements.includes(element)) {
        console.log(warnings)
        if (warnings == 5 && !happened) {
            showPopUp("As you wish.", "From PETA");
            happened = true;
            let possibleElements = Object.keys(elements).filter(e => !forbiddenElements.includes(e) && currentElement != e);
            const initialLength = Math.floor(possibleElements.length / 2);
            while (possibleElements.length > initialLength) {
                const max = possibleElements.length;
                const randomElement = Math.floor(Math.random() * max);
                const element_ = possibleElements[randomElement];
                const elem = document.getElementById("elementButton-" + element_);
                if (elem) elem.remove();
                possibleElements = possibleElements.filter(e => e != element_);
            }
        } else if (warnings == 10) {
            destroyGame();
        } else {
            if (warnings == 7) {
                document.getElementById("popUpCloseButton").remove();
                intervalTime = 60;
            }
            showPopUp(messages[warnings].replace("{warning}", happened ? 10 - (warnings) : 5 - warnings), "From PETA");
            warnings++;
        }
        return;
    } 
    if (elements[currentElement].onUnselect) {
        elements[currentElement].onUnselect();
    }
    var e1 = document.getElementById("elementButton-"+currentElement);
    if (e1 != null) { e1.setAttribute("current","false"); }
    currentElement = element;
    if (elements[element].customColor) {
        // show the colorSelector
        document.getElementById("colorSelector").style.display = "block";
    }
    else {
        // hide the colorSelector
        document.getElementById("colorSelector").style.display = "none";
    }
    if (elements[element].onSelect) {
        elements[element].onSelect();
    }
    var e2 = document.getElementById("elementButton-"+element);
    if (!e2) { return; }
    e2.setAttribute("current","true");
    // if e2 has the class "notify", remove it
    if (e2.classList.contains("notify")) {
        e2.classList.remove("notify");
    }
}

runAfterLoadList.push(inject, injectCss);
}