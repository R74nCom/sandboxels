function getName(elementList)
{
    if(elementList.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        }).length == 1)
    {
        return elementList[0];
    }
    let name = elementList.join("_") + "_mixture";
    if(nameList[name])
    {
        name = nameList[name];
    };
    return name;
}


function makeColors(elementList)
{
    return elementList.map((c) => elements[c].color instanceof Array ? elements[c].color : [elements[c].color]);
}

function mixture(elementList)
{
    elementList.sort();
    
    let name = getName(elementList);
    
    if(!elements[name])
    {
        elements[name] = true;
        let minTempHigh = Infinity;
        let stateHigh = null;
        let indexStateHigh = -1;
        
        let maxTempLow = -Infinity;
        let stateLow = null;
        let indexStateLow = -1;
        
        
        for(let i = 0; i < elementList.length; i++)
        {
            if(elements[elementList[i]])
            {
                if(typeof elements[elementList[i]].tempHigh === "number" && elements[elementList[i]].stateHigh)
                {
                    if(elements[elementList[i]].tempHigh < minTempHigh)
                    {
                        minTempHigh = elements[elementList[i]].tempHigh;
                        indexStateHigh = i;
                        stateHigh = elements[elementList[i]].stateHigh;
                    }
                }
                
                if(typeof elements[elementList[i]].tempLow === "number" && elements[elementList[i]].stateLow)
                {
                    if(elements[elementList[i]].tempLow > maxTempLow)
                    {
                        maxTempLow = elements[elementList[i]].tempLow;
                        indexStateLow = i;
                        stateLow = elements[elementList[i]].stateLow;
                    }
                }
            }
        }
        
        let elementList2 = elementList.slice();
        let elementHigh = null;
        if(indexStateHigh >= 0)
        {
            if(stateHigh instanceof Array)
            {
                elementHigh = [];
                for(let i = 0; i < stateHigh.length; i++)
                {
                    elementList2[indexStateHigh] = stateHigh[i];
                    elementHigh.push(mixture(elementList2));
                }
            }
            else
            {
                elementList2[indexStateHigh] = stateHigh;
                elementHigh = mixture(elementList2);
            }
        }
        
        let elementList3 = elementList.slice();
        let elementLow = null;
        if(indexStateLow >= 0)
        {
            if(stateLow instanceof Array)
            {
                elementLow = [];
                for(let i = 0; i < stateLow.length; i++)
                {
                    elementList3[indexStateLow] = stateLow[i];
                    elementLow.push(mixture(elementList3));
                }
            }
            else
            {
                elementList3[indexStateLow] = stateLow;
                elementLow = mixture(elementList3);
            }
        }
        
        if(elementHigh instanceof Array && elementHigh.length === 0)
        {
            minTempHigh = Infinity;
            elementHigh = null;
        }
        if(elementLow instanceof Array && elementLow.length === 0)
        {
            maxTempLow = -Infinity;
            elementLow = null;
        }
        
        let colors = makeColors(elementList.slice());
        let colors2 = [];
        let maxLength = Math.max(...(colors.map((c) => c.length)));
        
        for(let i = 0; i < maxLength; i++)
        {
            let colors3 = [];
            for(let j = 0; j < colors.length; j++)
            {
                colors3.push(toObject(colors[j][i%colors[j].length]));
            }
            colors2.push(averageRGB(colors3));
        }
        let temp = airTemp;
        if(maxTempLow < airTemp && minTempHigh > airTemp)
        {
            
        }
        else if(maxTempLow > -Infinity && minTempHigh < Infinity)
        {
            temp = (maxTempLow + minTempHigh)/2;
        }
        else if(maxTempLow > -Infinity)
        {
            temp = maxTempLow+20;
        }
        else if(minTempHigh < Infinity)
        {
            temp = Math.max(minTempHigh-20,absoluteZero);
        }
        
        
        let movable = elementList.some((c) => elements[c].movable || elements[c].movable === undefined);
        
        let density = elementList.map((c) => elements[c].density ? elements[c].density : 0).reduce((a,b)=>a+b)/elementList.length;
        let stain = elementList.map((c) => elements[c].stain ? elements[c].stain : 0).reduce((a,b)=>a+b)/elementList.length;
        
        let states = elementList.map((c) => elements[c].state);
        if(states.includes("gas"))
        {
            state = "gas";
            density = 0;
        }
        else if(!movable)
        {
            state = "solid";
        }
        else if(states.includes("liquid"))
        {
            state = "liquid";
        }
        else
        {
            state = "solid";
        }
        
        elements[name] = {
            color: colors2.length == 1 ? colors2[0] : colors2,
            colorObject: colors2.length == 1 ? toObject(colors2[0]) :colors2.map((c) => toObject(c)),
            tick: function(pixel) {
                mixtureBehavior(pixel, elementList);
            },
            tempHigh: minTempHigh,
            stateHigh: elementHigh,
            tempLow: maxTempLow,
            stateLow: elementLow,
            temp: temp,
            category: "mixture",
            mixture: elementList,
            movable: movable,
            density: density,
            state: state,
            stain: stain,
            reactions: {},
            isGas: state === "gas"
        };
        
        for(let i in elements)
        {
            for(let j = 0; j < elementList.length; j++)
            {
                if(elements[i].reactions && elements[i].reactions[elementList[j]] !== undefined)
                {
                    if(name === i)
                    {
                        continue;
                    }
                    elements[i].reactions[name] = {elem2: name, func: function(a,b){mixtureReact(b,a,elementList)}}
                }
                if(elements[elementList[j]].reactions && elements[elementList[j]].reactions[i] !== undefined)
                {
                    if(name === i)
                    {
                        continue;
                    }
                    elements[name].reactions[i] = {elem2: i, func: function(a,b){mixtureReact(a,b,elementList)}}
                }
            }
        }
        if(typeof elementCount !== 'undefined')
        {
            elementCount++;
            elements[name].hidden = true;
            elements[name].id = nextid++;
            if (elements[name].hidden && (!settings["unhide"] || ( settings["unhide"]===2 && !settings.unlocked[name] ))) { hiddenCount++; }
            else
            {
                var categoryDiv = document.getElementById("category-mixture");
                if (categoryDiv == null) {
                    createCategoryDiv("mixture");
                }
                createElementButton(name);
            }
            document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>"; //update extra info counts (and the copyright year, due to the method used)
        }
    }
    return name;
}


function mixtureBehavior(pixel, elementList)
{
    let prevCol = pixel.color;
    let previous = pixel.element;
    let elem = elementList[Math.floor(Math.random()*elementList.length)];
    if (elements[elem].tick) { // Run tick function if it exists
        elements[elem].tick(pixel);
    }
    
    if (pixel.del) {return}
    
    if (elements[elem].behavior) { // Parse behavior if it exists
        pixelTick(pixel,elements[elem].behavior);
    }
    if(pixel.element === previous)
    {
        pixel.color = prevCol;
    }
}


function mixtureReact(pixel, pixel2, elementList)
{
    elementList = elementList.slice();
    shuffleArray(elementList);
    let previous = pixel.element;
    let prevCol = pixel.color;
    let previous2 = pixel2.element;
    let prevCol2 = pixel2.color;
    for(let i = 0; i < elementList.length; i++)
    {
        let elem = elementList[i];
        if(pixel.del)
        {
            return;
        }
        changePixel(pixel,elem, false);
        let rr1 = false;
        if (elements[elem].reactions !== undefined && elements[elem].reactions[pixel2.element] !== undefined) {
            rr1 = reactPixels(pixel,pixel2);
        }
        if (!rr1 && elements[pixel2.element].reactions !== undefined && elements[pixel2.element].reactions[elem] !== undefined && !elements[pixel2.element].reactions[elem].oneway) {
            reactPixels(pixel2,pixel);
        }
        if(pixel2.element === previous2)
        {
            pixel2.color = prevCol2;
        }
        if(!pixel.del && pixel.element === elem)
        {
        }
        else if(pixel.del)
        {
            elementList.splice(elementList.indexOf(elem),1);
            createPixel(mixture(elementList),pixel.x,pixel.y);
            currentPixels[currentPixels.length-1].temp = pixel.temp;
            return;
        }
        else
        {
            elementList.splice(elementList.indexOf(elem),1)
            changePixel(pixel, mixture(elementList.concat([pixel.element])), false);
            return;
        }
        if(pixel2.del)
        {
            return;
        }
    }
    changePixel(pixel, previous, false);
    pixel.color = prevCol;
}

nameList = [];

function toObject(color)
{
    color = color.match(/\d+/g);
    return {
                r: parseInt(color[0]),
                g: parseInt(color[1]),
                b: parseInt(color[2])
    };
}

function averageRGB2(colors)
{
    return toObject(averageRGB(colors.map((d) => (toObject(d)))));
}

function averageRGB(rgblist) {
    var r = 0;
    var g = 0;
    var b = 0;
    for (var i = 0; i < rgblist.length; i++) {
        var rgb = rgblist[i];
        r += parseInt(rgb.r);
        g += parseInt(rgb.g);
        b += parseInt(rgb.b);
    }
    r = Math.floor(r/rgblist.length);
    g = Math.floor(g/rgblist.length);
    b = Math.floor(b/rgblist.length);
    return "rgb("+r+","+g+","+b+")";
}


function blendColors(colorA, colorB, amount = 0.5) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
}

changePixel = function (pixel,element,changetemp=true) {
    if (!elements[element]) {
        pixel.invalidElement = element;
        element = "unknown"
    }
    if(pixel.element !== element)
    {
        pixel.element = element;
        pixel.color = pixelColorPick(pixel);
    }
    pixel.start = pixelTicks;
    var elementInfo = elements[element];
    if (elementInfo.burning == true) {
        pixel.burning = true;
        pixel.burnStart = pixelTicks;
    }
    else if (pixel.burning && !elementInfo.burn) {
        delete pixel.burning;
        delete pixel.burnStart;
    }
    delete pixel.origColor; // remove stain
    if (pixel.r && !elementInfo.rotatable) {
        delete pixel.r;
    }
    if (pixel.flipX && !elementInfo.flippableX) {
        delete pixel.flipX;
    }
    if (pixel.flipY && !elementInfo.flippableY) {
        delete pixel.flipY;
    }
    // If elementInfo.flippableX, set it to true or false randomly
    if (elementInfo.flipX !== undefined) { pixel.flipX = elementInfo.flipX }
    else if (elementInfo.flippableX) {
        pixel.flipX = Math.random() >= 0.5;
    }
    // If elementInfo.flippableY, set it to true or false randomly
    if (elementInfo.flipY !== undefined) { pixel.flipY = elementInfo.flipY }
    else if (elementInfo.flippableY) {
        pixel.flipY = Math.random() >= 0.5;
    }
    if (elementInfo.temp !== undefined && changetemp) {
        pixel.temp = elementInfo.temp;
        pixelTempCheck(pixel)
    }
    if (pixel.con && !elementInfo.canContain) {
        delete pixel.con;
    }
    // If elementInfo.properties, set each key to its value
    if (elementInfo.properties !== undefined) {
        for (var key in elementInfo.properties) {
            // If it is an array or object, make a copy of it
            if (typeof elementInfo.properties[key] == "object") {
                pixel[key] = JSON.parse(JSON.stringify(elementInfo.properties[key]));
            }
            else {
                pixel[key] = elementInfo.properties[key];
            }
        }
    }
    checkUnlock(element);
}


elements.mixer = {
    color: "#999999",
    ignore: ["mixer"],
    category:"machines",
    insulate:true,
    hardness: 1,
    tick: function(pixel) {
        if (!isEmpty(pixel.x-1,pixel.y,true) && !isEmpty(pixel.x+1,pixel.y,true) && isEmpty(pixel.x,pixel.y+1,false))
        {
            if(elements.mixer.ignore.includes(pixelMap[pixel.x-1][pixel.y].element) || elements.mixer.ignore.includes(pixelMap[pixel.x+1][pixel.y].element))
            {
                return;
            }
            else
            {
                createPixel(mixture([pixelMap[pixel.x-1][pixel.y].element,pixelMap[pixel.x+1][pixel.y].element]),pixel.x,pixel.y+1);
                deletePixel(pixel.x-1,pixel.y);
                deletePixel(pixel.x+1,pixel.y);
            }
        }
        doDefaults(pixel);
    },
    maxSize: 1
};