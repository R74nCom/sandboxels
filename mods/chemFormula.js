const styleElement = document.createElement('style');
styleElement.innerHTML = `
.tooltip {
    z-index: 1000;
    position: relative;
}

.tooltip .tooltiptext {
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    padding: 0.5em;
    border-radius: 0.5em;
    position: absolute;
    z-index: 1000;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    text-shadow: none;
}
  
.tooltip:hover .tooltiptext {
    visibility: visible;
}
`

document.head.appendChild(styleElement);

runAfterLoad(async () => {
    const data = await fetch('mods/chemFormulas.json').then((res) => res.json());
    for (const element in data) {   
        if (elements[element]) {
            elements[element].hoverStat = () => data[element].length > 1 ? "Multiple compounds" : data[element][0].replace(/\<\/?su[bp]\>/g, "");
            document.querySelector(`button[element='${element}']`)?.classList.add('tooltip');
            const span = document.createElement('span');
            span.classList.add('tooltiptext');
            span.innerHTML = data[element].join("<br>");
            document.querySelector(`button[element='${element}']`)?.appendChild(span);
        }
    }
});