/* WARNING: not finished */



function whenAvailable(names, callback) {
    var interval = 10; // ms
    window.setTimeout(function() {
		let bool = true;
		for(let i = 0; i < names.length; i++)
		{
			if(!window[names[i]])
			{
				bool = false;
			}
		}
        if (bool) {
            callback();
        } else {
            whenAvailable(names, callback);
        }
    }, interval);
}
var runAfterAutogenMod = "mods/runAfterAutogen2.js";

function getName(elementList)
{
    let name = elementList.join();
    if(nameList[name])
    {
        name = nameList[name];
    }
    else
    {
        elementList = elementList.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        });
        
        let name = elementList.join();
    }
    return name;
}

function makeColors(elementList)
{
    let colors = [];
    for(let i = 0; i < predefinedColors.length; i++)
    {
        if(predefinedColors[i][1].every(val => elementList.includes(val) 
                && predefinedColors[i][1].filter(el => el === val).length
                   <=
                   elementList.filter(el => el === val).length
            ))
        {
            color = predefinedColors[i][0];
            if(color instanceof Array)
            {
                color = color.map((c) => "rgb("+hexToRGB(c).r+","+hexToRGB(c).g+","+hexToRGB(c).b+")");
                colors.push(color);
            }
            else
            {
                colors.push(["rgb("+hexToRGB(color).r+","+hexToRGB(color).g+","+hexToRGB(color).b+")"]);
            }
            for(let j = 0; j < predefinedColors[i][1].length; j++)
            {
                let index = elementList.indexOf(predefinedColors[i][1][j]);
                if (index > -1) { // only splice array when item is found
                    elementList.splice(index, 1); // 2nd parameter means remove one item only
                }
            }
        }
    }
    colors = colors.concat(elementList.map((c) => elements[c].color instanceof Array ? elements[c].color : [elements[c].color]));
    return colors;
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
        let gasesOk = gasOk(elementList);
        if(indexStateHigh >= 0 && gasesOk)
        {
            if(stateHigh instanceof Array)
            {
                elementHigh = [];
                for(let i = 0; i < stateHigh.length; i++)
                {
                    elementList2[indexStateHigh] = stateHigh[i];
                    if(isValidMixture(elementList2))
                    {
                        elementHigh.push(mixture(elementList2));
                    }
                }
            }
            else
            {
                elementList2[indexStateHigh] = stateHigh;
                if(isValidMixture(elementList2))
                {
                    elementHigh = mixture(elementList2);
                }
                else
                {
                    minTempHigh = Infinity;
                    elementHigh = null;
                }
            }
        }
        
        let elementList3 = elementList.slice();
        let elementLow = null;
        if(indexStateLow >= 0 && gasesOk)
        {
            if(stateLow instanceof Array)
            {
                elementLow = [];
                for(let i = 0; i < stateLow.length; i++)
                {
                    elementList3[indexStateLow] = stateLow[i];
                    if(isValidMixture(elementList3))
                    {
                        elementLow.push(mixture(elementList3));
                    }
                }
            }
            else
            {
                elementList3[indexStateLow] = stateLow;
                if(isValidMixture(elementList3))
                {
                    elementLow = mixture(elementList3);
                }
                else
                {
                    maxTempLow = -Infinity;
                    elementLow = null;
                }
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
        
        let movable = !elementList.some((c) => !elements[c].movable);
        
        let density = elementList.map((c) => elements[c].density ? elements[c].density : 0).reduce((a,b)=>a+b)/elementList.length;
        let stain = elementList.map((c) => elements[c].stain ? elements[c].stain : 0).reduce((a,b)=>a+b)/elementList.length;
        
        if(elementList.some((c) => c.includes("molten")) || elementList.some((c) => c.includes("magma")))
        {
            movable = true;
        }
        
        let states = elementList.map((c) => elements[c].state);
        if(!gasesOk)
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
                checkReactions(pixel, elements[pixel.element].mixture);
                mixtureBehavior(pixel, elements[pixel.element].mixture);
                doDefaults(pixel);
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
        };
        
        elementCount++;
        elements[name].hidden = true;
        hiddenCount++;
        elements[name].id = nextid++;
        document.getElementById("extraInfo").innerHTML = "<small><p>There are " + elementCount + " elements, including " + hiddenCount + " hidden ones.</p><p>©2021-" + new Date().getFullYear() + ". All Rights Reserved. <a href='https://r74n.com'>R74n</a></p></small>"; //update extra info counts (and the copyright year, due to the method used)
    }
    else if(!elements[name].mixture)
    {
        elements[name].mixture = elementList;
        let tick = elements[name].tick;
        if(!elements[name].reactions)
        {
            elements[name].reactions = {};
        }
        elements[name].tick = function(pixel) {
            checkReactions(pixel, elements[pixel.element].mixture);
            if(typeof tick === "function")
            {
                tick(pixel);
            }
        }
    }
    return name;
}

function checkReactions(pixel, elementList)
{
    for (let i = -1; i <= 1; i++)
    {
        for (let j = -1; j <= 1; j++)
        {
            if (!(i === 0 && j === 0) && !isEmpty(pixel.x+i,pixel.y+j,true)
                && !elements[pixel.element].reactions[pixelMap[pixel.x+i][pixel.y+j].element])
            {
                let otherElement = pixelMap[pixel.x+i][pixel.y+j].element;
                let otherList = [otherElement];
                if(elements[otherElement].mixture)
                {
                    otherList = elements[otherElement].mixture;
                }
                let list = elements[pixel.element];
                if(compatableMix(elements[pixel.element].mixture,otherList))
                {
                    elements[pixel.element].reactions[otherElement] = {elem1: mixture(elements[pixel.element].mixture.concat(otherList)),elem2:null};;
                }
                else
                {
                    elements[pixel.element].reactions[otherElement] = {};
                }
            }
        }
    }
}

function mixtureBehavior(pixel, elementList)
{
    let gasesOk = gasOk(elementList);
    let gases = elementList.filter((c) => elements[c].state === "gas");
    if(!gasesOk)
    {
        let neighbors = [ [-1,0], [1,0], [0,-1], [0,1] ]
        let randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
        let randomGas = gases[Math.floor(Math.random() * gases.length)]
        let rnx = randomNeighbor[0];
        let rny = randomNeighbor[1];
        if(isEmpty(pixel.x+rnx, pixel.y+rny, false)) {
            let index = elementList.indexOf(randomGas);
            if (index > -1) {
                createPixel(randomGas, pixel.x+rnx, pixel.y+rny);
                currentPixels[currentPixels.length-1].temp = pixel.temp;
                changePixel(pixel, mixture(elementList.slice(0, index).concat(elementList.slice(index+1))));
                return;
            }
        }
        behaviors.GAS(pixel);
        return;
    }
    let states = elementList.map((c) => elements[c].state);
    if(elementList.some((c) => c.includes("molten")) || elementList.some((c) => c.includes("magma")))
    {
        pixelTick(pixel,behaviors.MOLTEN);
    }
    else if(!elements[pixel.element].movable)
    {
        return;
    }
    else if(states.includes("liquid"))
    {
        if(elementList.includes("carbon_dioxide"))
        {
            pixelTick(pixel,elements.soda.behavior);
        }
        else
        {
            behaviors.LIQUID(pixel);
        }
    }
    else
    {
        behaviors.POWDER(pixel);
    }
}

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

let mixtureGroups = [];

function compatableMix(list1,list2)
{
    if(!gasOk(list1.concat(list2)))
    {
        return false;
    }
    for(let i = 0; i < mixtureGroups.length; i++)
    {
        if(list1.concat(list2).every(val => mixtureGroups[i].includes(val) 
                && list1.concat(list2).filter(el => el === val).length
                   <=
                   mixtureGroups[i].filter(el => el === val).length
            ))
        {
            return true;
        }
    }
    return false;
}

function mixture2(elementList)
{
    mixtureGroups.push(elementList);
    for(let i = 0; i < elementList.length; i++)
    {
        for(let j = i+1; j < elementList.length; j++)
        {
            if(compatableMix([elementList[i]],[elementList[j]]))
            {
                if(!elements[elementList[i]].reactions)
                {
                    elements[elementList[i]].reactions = {};
                }
                elements[elementList[i]].reactions[elementList[j]] = {elem1: mixture([elementList[i],elementList[j]]),elem2:null};
            }
        }
    }
    mixture3(elementList,[],0);
}

function mixture3(elementList, list, n)
{
    if(list.length > 0)
    {
        mixture(list);
    }
    if(n < elementList.length)
    {
        mixture3(elementList,list,n+1);
        if(compatableMix(list,[elementList[n]]))
        {
            mixture3(elementList,list.concat([elementList[n]]),n+1);
        }
    }
}


//exceptions to releasing gas
function gasOk(elementList)
{
    let gases = elementList.filter((c) => elements[c].state === "gas");
    if(elementList.includes("water") || elementList.includes("ice"))
    {
        gases = gases.filter((c) => c !== "carbon_dioxide");
    }
    return gases.length <= 0;
}

//exceptions to mixtures
function isValidMixture(elementList)
{
    if(elementList.includes("dry_ice"))
    {
        return false;
    }
    return true;
}

if(enabledMods.includes(runAfterAutogenMod)){
whenAvailable(["runAfterAutogen"], function() {
    runAfterAutogen(function() {
        mixture2(["water","blood"]);
        mixture2(["water","cough_drugs","cellulose_gum","carbon_dioxide","sugar","milk"]);
        
    });
});
}


predefinedColors = [
    ["#8f19c2",["sugar","carbon_dioxide","cough_drugs","water","cellulose_gum"]],
    ["#ab1efc",["sugar","carbon_dioxide","cough_drugs","ice","cellulose_gum"]],
    ["#a527db",["sugar","carbon_dioxide","cough_drugs","water"]],
    ["#c62eff",["sugar","carbon_dioxide","cough_drugs","ice"]],
    ["#422016",["sugar","carbon_dioxide","water"]],
    ["#4f261c",["sugar","carbon_dioxide","ice"]],
    ["#e9cba3",["sugar","carbon_dioxide","water","milk"]],
    ["#fff3d3",["sugar","carbon_dioxide","ice","milk"]],
]

/*
var c = elements.lean.colorObject;
for (var j = 0; j < autoElements.frozen.rgb.length; j++) {
                var newc = autoElements.frozen.rgb[j];
                r = Math.floor(c.r * newc[0]);
                g = Math.floor(c.g * newc[1]);
                b = Math.floor(c.b * newc[2]);
                if (r > 255) {r = 255;} if (g > 255) {g = 255;} if (b > 255) {b = 255;}
                alert(RGBToHex({r:r,g:g,b:b}));
            }*/
            
nameList = {};

nameList[["blood","water"].sort().join()] = "bloody_water";
nameList[["blood","ice"].sort().join()] = "bloody_slush";
nameList[["blood_ice","water"].sort().join()] = "slushy_blood";
nameList[["blood_ice","ice"].sort().join()] = "bloody_ice";

nameList[["cough_drugs","water"].sort().join()] = "cough_water";
nameList[["cough_drugs","ice"].sort().join()] = "cough_ice";
nameList[["cellulose_gum","water"].sort().join()] = "thick_water";
nameList[["cellulose_gum","ice"].sort().join()] = "thick_ice";
nameList[["cough_drugs","cellulose_gum"].sort().join()] = "dried_unsweetened_cough_syrup";
nameList[["molten_cough_drugs","cellulose_gum"].sort().join()] = "molten_dried_unsweetened_cough_syrup";
nameList[["cough_drugs","cellulose_gum","water"].sort().join()] = "unsweetened_cough_syrup";
nameList[["cough_drugs","cellulose_gum","ice"].sort().join()] = "unsweetened_cough_syrup_ice";

nameList[["carbon_dioxide","water"].sort().join()] = "seltzer";
nameList[["carbon_dioxide","ice"].sort().join()] = "seltzer_ice";

nameList[["carbon_dioxide","cough_drugs","water"].sort().join()] = "cough_seltzer";
nameList[["carbon_dioxide","cough_drugs","ice"].sort().join()] = "cough_seltzer_ice";
nameList[["carbon_dioxide","cellulose_gum","water"].sort().join()] = "thick_seltzer";
nameList[["carbon_dioxide","cellulose_gum","ice"].sort().join()] = "thick_seltzer_ice";
nameList[["carbon_dioxide","cough_drugs","cellulose_gum","water"].sort().join()] = "thick_cough_seltzer";
nameList[["carbon_dioxide","cough_drugs","cellulose_gum","ice"].sort().join()] = "thick_cough_seltzer_ice";



nameList[["sugar","water"].sort().join()] = "sugar_water";
nameList[["sugar","ice"].sort().join()] = "sugar_ice";

nameList[["sugar","cough_drugs","water"].sort().join()] = "sweetened_cough_water";
nameList[["sugar","cough_drugs","ice"].sort().join()] = "sweetened_cough_ice";
nameList[["sugar","cellulose_gum","water"].sort().join()] = "thick_sugar_water";
nameList[["sugar","cellulose_gum","ice"].sort().join()] = "thick_sugar_ice";
nameList[["sugar","cough_drugs","cellulose_gum"].sort().join()] = "dried_cough_syrup";
nameList[["sugar","molten_cough_drugs","cellulose_gum"].sort().join()] = "molten_dried_cough_syrup";
nameList[["sugar","cough_drugs","cellulose_gum","water"].sort().join()] = "cough_syrup";
nameList[["sugar","cough_drugs","cellulose_gum","ice"].sort().join()] = "cough_syrup_ice";

nameList[["sugar","carbon_dioxide","water"].sort().join()] = "soda";
nameList[["sugar","carbon_dioxide","ice"].sort().join()] = "soda_ice";

nameList[["sugar","carbon_dioxide","cough_drugs","water"].sort().join()] = "runny_lean";
nameList[["sugar","carbon_dioxide","cough_drugs","ice"].sort().join()] = "runny_lean_ice";
nameList[["sugar","carbon_dioxide","cellulose_gum","water"].sort().join()] = "thick_soda";
nameList[["sugar","carbon_dioxide","cellulose_gum","ice"].sort().join()] = "thick_soda_ice";
nameList[["sugar","carbon_dioxide","cough_drugs","cellulose_gum","water"].sort().join()] = "lean";
nameList[["sugar","carbon_dioxide","cough_drugs","cellulose_gum","ice"].sort().join()] = "lean_ice";

nameList[["sugar","cough_drugs"].sort().join()] = "cough_sugar";
nameList[["sugar","molten_cough_drugs"].sort().join()] = "molten_cough_sugar";
nameList[["caramel","molten_cough_drugs"].sort().join()] = "molten_cough_caramel";
nameList[["caramel","cough_drugs"].sort().join()] = "cough_caramel";
nameList[["candy","cough_drugs"].sort().join()] = "cough_candy";
nameList[["candy","molten_cough_drugs"].sort().join()] = "molten_cough_candy";

nameList[["sugar","cellulose_gum"].sort().join()] = "sweet_cellulose_gum";
nameList[["caramel","cellulose_gum"].sort().join()] = "caramel_cellulose_gum";
nameList[["candy","cellulose_gum"].sort().join()] = "cellulose_gum_candy";


nameList[["cellulose_gum","caramel","molten_cough_drugs"].sort().join()] = "molten_caramelized_cough_syrup";
nameList[["cellulose_gum","caramel","cough_drugs"].sort().join()] = "caramelized_cough_syrup";
nameList[["cellulose_gum","candy","cough_drugs"].sort().join()] = "cough_drop";
nameList[["cellulose_gum","candy","molten_cough_drugs"].sort().join()] = "molten_cough_drop";

function milkNames(elements,name)
{
    nameList[elements.concat("milk").sort().join()] = name + "_milk";
    nameList[elements.concat("yogurt").sort().join()] = name + "_yogurt";
    nameList[elements.concat("frozen_yogurt").sort().join()] = name + "_frozen_yogurt";
    nameList[elements.concat("cream").sort().join()] = name + "_cream";
    nameList[elements.concat("ice_cream").sort().join()] = name + "_ice_cream";
}

nameList[["calcium","cough_drugs"].sort().join()] = "calcified_cough_syrup";
nameList[["calcium","molten_cough_drugs"].sort().join()] = "calcified_molten_cough_syrup";
nameList[["molten_calcium","molten_cough_drugs"].sort().join()] = "molten_calcified_cough_syrup";


milkNames2([
["water","ice","cellulose_gum","sugar","carbon_dioxide","caramel","candy","cough_drugs","molten_cough_drugs"],
["watery","icy","thick","sweetened","carbonated","caramelized","candied","cough","cough"]],[[],""],0);

function milkNames2(elementList, list, n)
{
    if(list[0].length > 0)
    {
        if(list[0].includes("molten_cough_drugs"))
        {
            milkNames(list[0], "molten" + list[1]);
        }
        else
        {
            milkNames(list[0], list[1].substring(1));
        }
    }
    if(n < elementList[0].length && n < elementList[1].length)
    {
        milkNames2(elementList,list,n+1);
        list2 = [list[0].concat([elementList[0][n]]),list[1] + "_" + elementList[1][n]];
        if(list2[0])
        {
            milkNames2(elementList,list2,n+1);
        }
    }
}

for(let i in nameList)
{
    if(nameList[i].includes("sweetened_carbonated_"))
    {
        nameList[i] = nameList[i].replace("sweetened_carbonated_","");
        nameList[i] += "_soda";
    }
}

nameList[["sugar","carbon_dioxide","water","milk"].sort().join()] = "pilk";
nameList[["sugar","carbon_dioxide","ice","milk"].sort().join()] = "icy_pilk";
nameList[["sugar","carbon_dioxide","water","yogurt"].sort().join()] = "pogurt";
nameList[["sugar","carbon_dioxide","ice","yogurt"].sort().join()] = "icy_pogurt";
nameList[["sugar","carbon_dioxide","water","frozen_yogurt"].sort().join()] = "frozen_pogurt";
nameList[["sugar","carbon_dioxide","ice","frozen_yogurt"].sort().join()] = "icy_frozen_pogurt";
nameList[["sugar","carbon_dioxide","water","cream"].sort().join()] = "pilk_cream";
nameList[["sugar","carbon_dioxide","ice","cream"].sort().join()] = "icy_pilk_cream";
nameList[["sugar","carbon_dioxide","water","ice_cream"].sort().join()] = "pice_cream";
nameList[["sugar","carbon_dioxide","ice","ice_cream"].sort().join()] = "icy_pice_cream";


nameList[["cellulose_gum","sugar","carbon_dioxide","water","milk"].sort().join()] = "thick_pilk";
nameList[["cellulose_gum","sugar","carbon_dioxide","ice","milk"].sort().join()] = "icy_thick_pilk";
nameList[["cellulose_gum","sugar","carbon_dioxide","water","yogurt"].sort().join()] = "thick_pogurt";
nameList[["cellulose_gum","sugar","carbon_dioxide","ice","yogurt"].sort().join()] = "icy_thick_pogurt";
nameList[["cellulose_gum","sugar","carbon_dioxide","water","frozen_yogurt"].sort().join()] = "frozen_thick_pogurt";
nameList[["cellulose_gum","sugar","carbon_dioxide","ice","frozen_yogurt"].sort().join()] = "icy_frozen_thick_pogurt";
nameList[["cellulose_gum","sugar","carbon_dioxide","water","cream"].sort().join()] = "thick_pilk_cream";
nameList[["cellulose_gum","sugar","carbon_dioxide","ice","cream"].sort().join()] = "icy_thick_pilk_cream";
nameList[["cellulose_gum","sugar","carbon_dioxide","water","ice_cream"].sort().join()] = "thick_pice_cream";
nameList[["cellulose_gum","sugar","carbon_dioxide","ice","ice_cream"].sort().join()] = "icy_thick_pice_cream";


nameList[["cough_drugs","cellulose_gum","sugar","carbon_dioxide","water","milk"].sort().join()] = "lilk";
nameList[["cough_drugs","cellulose_gum","sugar","carbon_dioxide","ice","milk"].sort().join()] = "icy_lilk";
nameList[["cough_drugs","cellulose_gum","sugar","carbon_dioxide","water","yogurt"].sort().join()] = "logurt";
nameList[["cough_drugs","cellulose_gum","sugar","carbon_dioxide","ice","yogurt"].sort().join()] = "icy_logurt";
nameList[["cough_drugs","cellulose_gum","sugar","carbon_dioxide","water","frozen_yogurt"].sort().join()] = "frozen_logurt";
nameList[["cough_drugs","cellulose_gum","sugar","carbon_dioxide","ice","frozen_yogurt"].sort().join()] = "icy_frozen_logurt";
nameList[["cough_drugs","cellulose_gum","sugar","carbon_dioxide","water","cream"].sort().join()] = "lilk_cream";
nameList[["cough_drugs","cellulose_gum","sugar","carbon_dioxide","ice","cream"].sort().join()] = "icy_lilk_cream";
nameList[["cough_drugs","cellulose_gum","sugar","carbon_dioxide","water","ice_cream"].sort().join()] = "leanice_cream";
nameList[["cough_drugs","cellulose_gum","sugar","carbon_dioxide","ice","ice_cream"].sort().join()] = "icy_leanice_cream";

nameList[["cough_drugs","sugar","carbon_dioxide","water","milk"].sort().join()] = "runny_lilk";
nameList[["cough_drugs","sugar","carbon_dioxide","ice","milk"].sort().join()] = "icy_runny_lilk";
nameList[["cough_drugs","sugar","carbon_dioxide","water","yogurt"].sort().join()] = "runny_logurt";
nameList[["cough_drugs","sugar","carbon_dioxide","ice","yogurt"].sort().join()] = "icy_runny_logurt";
nameList[["cough_drugs","sugar","carbon_dioxide","water","frozen_yogurt"].sort().join()] = "frozen_runny_logurt";
nameList[["cough_drugs","sugar","carbon_dioxide","ice","frozen_yogurt"].sort().join()] = "icy_frozen_runny_logurt";
nameList[["cough_drugs","sugar","carbon_dioxide","water","cream"].sort().join()] = "runny_lilk_cream";
nameList[["cough_drugs","sugar","carbon_dioxide","ice","cream"].sort().join()] = "icy_runny_lilk_cream";
nameList[["cough_drugs","sugar","carbon_dioxide","water","ice_cream"].sort().join()] = "runny_leanice_cream";
nameList[["cough_drugs","sugar","carbon_dioxide","ice","ice_cream"].sort().join()] = "icy_runny_leanice_cream";

elements.cough_drugs = {
    density: 1230, //using the 6.25/10 ratio from a CP/PH cough syrup from Morton Grove Pharmaceuticals, Inc. because it was in hot on r/lean (of course there’s a subreddit for that) | this is 6.25 mg pr.hy. and 10 mg co.ph. per 5mL dose, but ratios and reactions aren’t possible and implementing them to this accuracy would also require an accurate cough syrup density 
    tempHigh: 157.5,
    color: "#e0e4e0",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid"
}


elements.cellulose_gum = {
    density: 1600,
    tempHigh: 270,
    stateHigh: "fire",
    color: "#f7e7b7",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid"
}