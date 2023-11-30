if (enabledMods.includes("mods/betterMenuScreens.js")) {
    const properties = {
        meta: [
            {name: "name", type: "string", viewOnly: true, required: true},
            {name: "category", type: "string", required: true},
            {name: "desc", type: "string"},
            {name: "behavior", type: "string"},
            {name: "alias", type: "string"},
            {name: "seed", type: "string"},
            {name: "color", type: ["color", "array"], viewOnly: true},
            {name: "breakInto", type: ["string", "array"], viewOnly: true},
            {name: "darkText", type: "boolean"},
            {name: "baby", type: "string"},
            {name: "id", type: "number", viewOnly: true, creatorIgnore: true}
        ],
        default_properties: [
            {name: "viscosity", type: "number"},
            {name: "density", type: "number"},
            {name: "hardness", type: "number"},
            {name: "maxSize", type: "number"},
            {name: "conduct", type: "number"},
            {name: "foodNeed", type: "number"},
            {name: "stain", type: "number"},
        ],
        data: [
            {name: "hidden", type: "boolean"},
            {name: "insulate", type: "boolean"},
            {name: "noMix", type: "boolean"},
            {name: "isFood", type: "boolean"},
            {name: "forceAutoGen", type: "boolean"},
            {name: "customColor", type: "boolean"},
            {name: "ignoreAir", type: "boolean"},
            {name: "excludeRandom", type: "boolean"},
        ],
        burn: [
            {name: "burn", type: "number"},
            {name: "burnTime", type: "number"},
            {name: "burnInto", type: ["string", "array"], viewOnly: true},
            {name: "burning", type: "boolean"},
            {name: "fireElement", type: ["string", "array"], viewOnly: true},
            {name: "fireColor", type: ["color", "array"], viewOnly: true},
        ],
        flip: [
            {name: "flipX", type: "boolean"},
            {name: "flipY", type: "boolean"},
            {name: "flippableX", type: "boolean"},
            {name: "flippableY", type: "boolean"},
        ],
        states: [
            {name: "state", type: "string"},
            {name: "stateHigh", type: "string"},
            {name: "stateHighName", type: "string"},
            {name: "stateHighColor", type: "color"},
            {name: "stateHighColorMultiplier", type: "number"},
            {name: "stateLow", type: "string"},
            {name: "stateLowName", type: "string"},
            {name: "stateLowColor", type: "color"},
            {name: "stateLowColorMultiplier", type: "number"},
        ],
        temperature: [
            {name: "temp", type: "number"},
            {name: "tempHigh", type: "number"},
            {name: "extraTempHigh", type: "number"},
            {name: "tempLow", type: "number"},
            {name: "extraTempLow", type: "number"},
        ]
    }

    const br = () => document.createElement("br");
    const createDiv = () => document.createElement("div");
    const span = (innerText) => {
        const element = document.createElement("span");
        element.innerText = innerText;
        return element;
    }
    const createInput = (type, disabled, id, className="") => {
        const element = document.createElement("input");
        element.id = id;
        element.className = className;
        element.type = type;
        element.disabled = disabled;
        return element;
    }

    const defaultSettings = {clearElements: false, allowFreeRemoval: false};

    const toggleSetting = (setting, target) => {
        target.value = target.value == "ON" ? "OFF" : "ON";
        target.setAttribute("state", target.getAttribute("state") == "1" ? "0" : "1");
        const settings_ = Storage.get("settings", defaultSettings);
        settings_[setting] = !settings_[setting];
        Storage.set("settings", settings_);
    }

    class Storage {
        static get(id, fallback = null, setOnNull = false) {
            const res = JSON.parse(localStorage.getItem(`elementsManager/${id}`));
            if (!res && fallback && setOnNull) {
                Storage.set(id, fallback);
            }
            return res ?? fallback;
        }
        static set(id, value) {
            localStorage.setItem(`elementsManager/${id}`, JSON.stringify(value));
        }
        static remove(id) {
            localStorage.removeItem(`elementsManager/${id}`);
        }
        static append(id, value) {
            const current = Storage.get(id, []);
            current.push(value);
            Storage.set(id, current);
        }
        static filter(id, condition) {
            Storage.set(id, Storage.get(id, []).filter(condition));
        }
    }
    
    const importElements = (elements_) => {
        const settings = Storage.get("settings", {clearElements: false, allowFreeRemoval: false}, true);
        if (settings.clearElements) {
            Storage.set("elements", elements_);
        } else {
            const beforeElements = Storage.get("elements", []);
            Storage.set("elements", beforeElements.concat(elements_));
        }
        alert(`Successfully imported ${elements_.length} element${elements_.length != 1 ? "s" : ""}`)
    }

    const exportElements = () => {
        let element = document.createElement('a');
        const blob = new Blob([JSON.stringify(Storage.get("elements", []))], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        element.setAttribute('href', url);
        element.setAttribute('download', "elements.json");
     
        document.body.appendChild(element);
     
        element.click();
     
        document.body.removeChild(element);
    }

    const cssInject = () => {
        const style = document.createElement("style");
        style.innerHTML = `.categoryTitle {
            font-size: 1.25em;
        }
        #elementManagerParent input[type="number"], #elementManagerParent input[type="text"], #elementCreatorParent input[type="number"], #elementCreatorParent input[type="text"] {
            background-color: black;
            vertical-align: middle;
            margin-left: 5px;
            margin-right: 5px;
            border: rgb(150, 150, 150) 1px solid;
            border-radius: 20px;
            padding: 0.5em;
            color: white;
            font-size: 1em;
            font-family: Arial, Helvetica, sans-serif;
        }
        #elementsManagerFilter {
            background-color: rgb(66, 66, 66);
            vertical-align: middle;
            margin-left: 5px;
            margin-right: 5px;
            width: 75%;
            color: white;
            font-size: 1em;
            font-family: 'Press Start 2P', Arial;
            padding: 0.5em;
            border: none;
            display: inline-block;
        }
        #elementsManagerFilter:focus {
            outline: none;
            background-color: rgb(60, 60, 60);
        }
        #elementsList li span:hover, #customElementsList li span:hover, #deletedElementsList li span:hover, .hoverableText:hover {
            cursor: pointer;
            color: rgb(200, 200, 200);
        }
        #elementAdd {
            background-color: rgb(66, 66, 66);
            color: white;
            font-size: 1em;
            font-family: 'Press Start 2P', Arial;
            width: auto;
            padding: 0.5em;
            border: none;
            outline: none;
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
            margin-right: 5px;
        }
        #elementAdd:hover {
            cursor: pointer;
            background-color: rgb(60, 60, 60);
        }
        #elementsManagerSettingsButton {
            background-color: rgb(66, 66, 66);
            color: white;
            font-size: 1em;
            font-family: 'Press Start 2P', Arial;
            width: auto;
            padding: 0.5em;
            border: none;
            outline: none;
            display: inline-block;
            vertical-align: middle;
            margin-left: 5px;
            margin-right: 5px;
        }
        #elementsManagerSettingsButton:hover {
            cursor: pointer;
            background-color: rgb(60, 60, 60);
        }
        .plusButton {
            position: absolute;
            right: 0px;
            top: 0px;
            font-size: 2em;
            padding: 5px;
            text-align: center;
            border: 1px solid #fff;
            background-color: #1da100;
            z-index: 12;
        }
        .plusButton:hover {
            background-color: #29d902;
        }
        .elementRemoveButton {
            color: red
        }
        #elementsList li .elementRemoveButton:hover, #customElementsList li .elementRemoveButton:hover {
            color: darkred;
            cursor: pointer;
        }
        .createButton {
            width: auto;
            padding: 5px;
            vertical-align: middle;
            font-size: 1.25em;
            display: block;
            margin-left: 5px;
            margin-right: 5px;
            padding: 5px;
            text-align: center;
            border: 1px solid #1da100;
            border-radius: 10px;
        }
        .createButton:hover {
            background-color: #1da100;
        }`
        document.head.appendChild(style);
    }

    // ugly way of doing it but probably works
    const checkType = (key, value) => {
        if (key == "behavior" && (typeof value == "function" || (value instanceof Array && value.filter(e => e instanceof Array && e.filter(s => typeof s == "string").length == e.length).length == value.length))) return true;
        else if (key == "behavior") return false;
        if (["darkText", "hidden", "insulate", "noMix", "isFood", "forceAutoGen", "customColor", "ignoreAir", "excludeRandom", "burning", "flipX", "flipY", "flippableX", "flippableY"].includes(key) && typeof value != "boolean") return false;
        if (["name", "category", "desc", "alias", "seed", "baby", "state", "stateHigh", "stateHighName", "stateHighColor", "stateLow", "stateLowNmae", "stateLowColor"].includes(key) && typeof value != "string") return false;
        if (["id", "burn", "burnTime", "stateHighColorMultiplier", "stateLowColorMutliplier", "temp", "tempHigh", "extraTempHigh", "tempLow", "extraTempLow"].includes(key) && typeof value != "number") return false;
        if (["color", "breakInto", "burnInto", "fireElement", "fireColor"].includes(key)) {
            if (value instanceof Array) return value.filter(l => typeof l == "string").length == value.length;
            if (typeof value != "string") return false; 
        }
        return true;
    }

    const loadChanges = () => {
        const newElements = Storage.get("elements", []);
        for (const element of newElements) {
            const element_ = element;
            if (Object.keys(behaviors).includes(element_["behavior"])) element_["behavior"] = behaviors[element_["behavior"]];
            elements[element.name] = {};
            // elements[element.name] = element_;
            for (const key of Object.keys(element_)) {
                const val = element_[key];
                if (checkType(key, val)) elements[element.name][key] = val;
                else if (["name", "category"].includes(key)) elements[element.name][key] = key == "name" ? "NewElement" : "other"; 
            }
        }
        const changes = Storage.get("changes", []);
        for (const change of changes) {
            for (const key of Object.keys(change.changes)) {
                const c = change.changes[key];
                if (checkType(key, c)) elements[change.element][key] = c;
            }
        }
        const deleted = Storage.get("deletedElements", []);
        for (const element of deleted) {
            delete elements[element];
        }
    }

    const saveChanges = () => {
        const element = Storage.get("currentElement");
        const changes = Storage.get("tempChanges", []);
        if (Storage.get("elements", []).find(a => a.name == element)) {
            const elements_ = Storage.get("elements", []);
            for (const change of changes) {
                elements_.find(a => a.name == element)[change.property] = change.value;
            }
            Storage.set("elements", elements_);
        } else {
            const permChanges = Storage.get("changes", []);
            for (const change of changes) {
                let a;
                if (a = permChanges.find(c => c.element == element)) {
                    a.changes[change.property] = change.value;
                } else {
                    let c = {};
                    c[change.property] = change.value;
                    permChanges.push({
                        element,
                        changes: c
                    })
                }
            }
            Storage.set("changes", permChanges);
        }
    }

    const applyChange = (property, value) => {
        // if (element && elements[element])
        //     elements[element][property] = value;
        const element = Storage.get("currentElement");
        const changes = Storage.get("tempChanges", []);
        changes.push({property, value});
        Storage.set("tempChanges", changes);
        const nullish = {
            string: "",
            boolean: false,
            number: 0,
            array: [],
        }
        if (elements[element][property] == value || value == nullish[value instanceof Array ? "array" : typeof value]) { 
            Storage.filter("tempChanges", e => e.property != property);
        }
    }

    const elementsManagerLoader = () => {
        const listDiv = createDiv();
        const list = document.createElement("ul");
        list.id = "elementsList";
        let customElements = Storage.get("elements", []);
        let deletedElements = Storage.get("deletedElements", []);
        let lastFreeRemoval = Storage.get("settings", {allowFreeRemoval: false, clearElements: false}, true).allowFreeRemoval;
        Storage.set("lastFreeRemoval", lastFreeRemoval);
        for (const key of Object.keys(elements).concat(customElements.map(e => e.name)).sort((a, b) => a.localeCompare(b, undefined, {caseFirst: "false"}))) {
            const element = document.createElement("li");
            const text = span(key); // only the text should be clickable
            text.onclick = () => {
                Storage.set("currentElement", key);
                openMenu("elementManager", true);
            }
            element.appendChild(text);
            if (customElements.find(e => e.name == key) || lastFreeRemoval) {
                const removeButton = span("X");
                removeButton.className = "elementRemoveButton";
                removeButton.onclick = () => {
                    if (confirm("Are you sure you want to delete that element?")) {
                        if (customElements.find(e => e.name == key)) {
                            Storage.filter("elements", e => e.name != key);
                            customElements = customElements.filter(e => e.name != key);
                            delete elements[key];
                            element.style.display = "none";
                            document.getElementById("customElementsList/" + key).remove();
                            if (document.getElementById("customElementsList").children.length == 0) {
                                document.getElementById("noCustomElementsMessage").style.display = "";
                            }
                        } else {
                            Storage.append("deletedElements", key);
                            delete elements[key];
                            element.style.display = "none";
                            document.getElementById("noDeletedElementsMessage").style.display = "none";
                            const li = document.createElement("li");
                            li.innerText = key;
                            li.onclick = () => {
                                if (confirm("Are you sure you want to re-add '" + key + "'?")) {
                                    Storage.filter("deletedElements", a => a != key);
                                    li.style.display = "none";
                                }
                            }
                            document.getElementById("deletedElementsList").appendChild(li);
                        }
                    }
                }
                const emptySpan = span(" ");
                emptySpan.className = "elementRemoveButton";
                element.appendChild(emptySpan);
                element.appendChild(removeButton)
            }
            if (deletedElements.includes(key)) {
                element.style.display = "none";
            }
            list.appendChild(element);
        }
    
        const filterInput = document.createElement("input");
        filterInput.id = "elementsManagerFilter";
        filterInput.type = "text";
        filterInput.placeholder = "Search elements...";
        filterInput.onkeyup = (ev) => {
            const val = ev.target.value;
            const deleted = Storage.get("deletedElements", []);
            for (const c of document.getElementById("elementsList").children) {
                const span_ = c.querySelector("span");
                if (!span_.innerText.toLowerCase().includes(val.toLowerCase()) || deleted.includes(span_.innerText)) {
                    c.style.display = "none";
                } else {
                    c.style.display = "";
                }
            }
        }
        const addElement = document.createElement("input");
        addElement.id = "elementAdd";
        addElement.value = "+";
        addElement.type = "button";
        addElement.onclick = (_) => {
            openMenu("elementCreator", true);
        }
        const settingsButton = document.createElement("input");
        settingsButton.id = "elementsManagerSettingsButton";
        settingsButton.type = "button";
        settingsButton.value = "*";
        settingsButton.onclick = (_) => {
            openMenu("elementsSettings", true);
        }
        listDiv.appendChild(filterInput);
        listDiv.appendChild(addElement);
        listDiv.appendChild(settingsButton);
        listDiv.appendChild(list);
        listDiv.style.overflowY = "scroll";
        new MenuScreen()
            .setTitle("Elements Manager")
            .setCloseButtonText("-")
            .setParentDivId("elementsManagerParent")
            .setInnerDivId("elementsManager")
            .addNode(listDiv)
            .build();
    }

    const parseColor = (colorString) => {
        // technically color arrays are handled differently, but ill add it just in case
        if (colorString instanceof Array) return parseColor(colorString[0]);
        if (typeof colorString != "string") return "#ffffff";
        if (colorString.startsWith("rgb(")) {
            const color = colorString.replace("rgb(", "").replace(")", "");
            return `#${color.split(",").map(a => parseInt(a).toString(16)).join("")}`;
        } else {
            if (colorString.startsWith("#")) {
                const color = colorString.slice(1);
                if (color.length == 3) return `#${color.repeat(2)}`;
                else if (color.length == 2) return `#${color.repeat(3)}`;
                else if (color.length >= 6) return `#${color.slice(0, 6)}`;
                else return `#${color}`;
            }
        }
    }

    const elementManagerLoader = () => {
        const nodes = [];
        for (const key of Object.keys(properties)) {
            const category = createDiv();
            category.innerHTML += `<span class="categoryTitle">${key.split("_").map(k => k[0].toUpperCase() + k.slice(1)).join(" ")}</span><br>`
            for (const prop of properties[key]) {
                const id = "elementsManager/" + key + "/" + prop.name;
                const div = createDiv();
                div.className = "elementsManager/propertyEntry";
                div.appendChild(span(prop.name));
                if (prop.viewOnly) {
                    if (prop.type == "boolean") {
                        const el = createInput("button", true, id, "toggleInput");
                        div.appendChild(el);
                    } else if (prop.type == "longString") {
                        const el = document.createElement("textarea");
                        el.id = id;
                        el.className = "elementsCode";
                        el.disabled = true;
                        div.appendChild(el);
                    } else if (prop.type instanceof Array) {
                        const el = createInput("text", true, id);
                        div.appendChild(el);
                    } else {
                        const el = createInput(prop.type == "string" ? "text" : prop.type, true, id);
                        div.appendChild(el);
                    }
                } else {
                    if (prop.type == "boolean") {
                        const el = createInput("button", false, id, "toggleInput");
                        el.onclick = (ev) => {
                            ev.target.value = ev.target.value == "ON" ? "OFF" : "ON";
                            ev.target.setAttribute("state", ev.target.getAttribute("state") == "1" ? "0" : "1");
                            applyChange(prop.name, ev.target.value == "ON");
                        }
                        div.appendChild(el);
                    } else if (prop.type == "longString") {
                        const el = document.createElement("textarea");
                        el.id = id;
                        el.className = "elementsCode";
                        el.onchange = (ev) => {
                            applyChange(prop.name, ev.target.value);
                        }
                        div.appendChild(el);
                    } else if (prop.type instanceof Array) {
                        const el = createInput("text", false, id);
                        el.onchange = (ev) => {
                            applyChange(prop.name, ev.target.value.split(";"));
                        }
                        div.appendChild(el);
                    } else if (prop.name == "behavior") {
                        const dropdown = document.createElement("select");
                            dropdown.id = id;
                        let i = 0;
                        for (const bKey of Object.keys(behaviors)) {
                            const option = document.createElement("option");
                                option.value = bKey;
                                option.id = id + "/option/" + i;
                                option.innerText = bKey;
                            dropdown.appendChild(option);
                            i++;
                        }
                        const customOption = document.createElement("option");
                            customOption.value = "CUSTOM";
                            customOption.id = id + "/option/custom"
                            customOption.innerText = "Custom Behavior";
                        dropdown.appendChild(customOption);
                        dropdown.onchange = (ev) => {
                            if (ev.target.value == "CUSTOM") {
                                document.getElementById(id + "/textInput").style.display = "";
                            } else if (ev.target.value == "NONE") {
                                applyChange(prop.name, null);
                            } else {
                                document.getElementById(id + "/textInput").style.display = "none";
                                applyChange(prop.name, ev.target.value);
                            }
                        }
                        const noneOption = document.createElement("option");
                            noneOption.value = "NONE";
                            noneOption.id = id + "/option/none"
                            noneOption.innerText = "None";
                        dropdown.appendChild(noneOption);
                        const el = createInput("text", false, id + "/textInput");
                        el.style.display = "none";
                        el.onchange = (ev) => {
                            if (document.getElementById(id).value == "CUSTOM") {
                                applyChange(prop.name, ev.target.value.split(";").map(e => e.split(",")));
                            } else {
                                ev.target.style.display = "none";
                            }
                        }
                        div.appendChild(dropdown);
                        div.appendChild(el);
                    } else {
                        const el = createInput(prop.type == "string" ? "text" : prop.type, false, id);
                        el.onchange = (ev) => {
                            applyChange(prop.name, prop.type == "number" ? parseFloat(ev.target.value) : ev.target.value);
                        }
                        div.appendChild(el);
                    }
                }
                category.appendChild(div);
            }
            category.appendChild(br());
            nodes.push(category);
        }

        const saveButton = span("Save Changes");
        saveButton.className = "createButton";
        saveButton.onclick = () => {
            saveChanges();
            Storage.remove("tempChanges");
            closeMenu();
            alert("Changes successfully applied");
        }
    
        nodes.push(br(), saveButton)

        new MenuScreen()
            .setTitle("Element Manager")
            .setCloseButtonText("<")
            .setParentDivId("elementManagerParent")
            .setInnerDivId("elementManager")
            .addNode(nodes)
            .build();
    }

    const elementCreatorLoader = () => {
        const nodes = [];
        for (const key of Object.keys(properties)) {
            const category = createDiv();
            category.innerHTML += `<span class="categoryTitle">${key.split("_").map(k => k[0].toUpperCase() + k.slice(1)).join(" ")}</span><br>`
            for (const prop of properties[key]) {
                if (prop.creatorIgnore) continue;
                const div = createDiv();
                div.className = "elementsManager/propertyEntry";
                div.innerHTML += `<span>${prop.name}</span>`
                const id = "elementsManager/creator/" + key + "/" + prop.name;
                if (prop.type == "boolean") {
                    const el = createInput("button", false, id, "toggleInput");
                    el.onclick = (ev) => {
                        const elementData = Storage.get("newElement", {});
                        ev.target.value = ev.target.value == "ON" ? "OFF" : "ON";
                        elementData[prop.name] = ev.target.value == "ON";
                        ev.target.setAttribute("state", ev.target.getAttribute("state") == "1" ? "0" : "1");
                        Storage.set("newElement", elementData);
                    }
                    div.appendChild(el);
                } else if (prop.type == "longString") {
                    const el = document.createElement("textarea");
                    el.id = id;
                    el.className = "elementsCode";
                    el.onchange = (ev) => {
                        const elementData = Storage.get("newElement", {});
                        elementData[prop.name] = ev.target.value;
                        Storage.set("newElement", elementData);
                    }
                    div.appendChild(el);
                } else if (prop.type instanceof Array && prop.type[0] != "color") {
                    const el = createInput("text", false, id);
                    el.onchange = (ev) => {
                        const elementData = Storage.get("newElement", {});
                        elementData[prop.name] = ev.target.value.split(";");
                        Storage.set("newElement", elementData);
                    }
                    div.appendChild(el);
                } else if (prop.name == "behavior") {
                    const dropdown = document.createElement("select");
                        dropdown.id = id;
                    let i = 0;
                    for (const bKey of Object.keys(behaviors)) {
                        const option = document.createElement("option");
                            option.value = bKey;
                            option.selected = i == 0;
                            option.innerText = bKey;
                        dropdown.appendChild(option);
                        i++;
                    }
                    const customOption = document.createElement("option");
                        customOption.value = "CUSTOM";
                        customOption.innerText = "Custom Behavior";
                    dropdown.appendChild(customOption);
                    dropdown.onchange = (ev) => {
                        if (ev.target.value == "CUSTOM") {
                            document.getElementById(id + "/textInput").style.display = "";
                        } else {
                            document.getElementById(id + "/textInput").style.display = "none";
                            const elementData = Storage.get("newElement", {});
                            elementData[prop.name] = ev.target.value;
                            Storage.set("newElement", elementData);
                        }
                    }
                    const el = createInput("text", false, id + "/textInput");
                    el.style.display = "none";
                    el.onchange = (ev) => {
                        if (document.getElementById(id).value == "CUSTOM") {
                            const elementData = Storage.get("newElement", {});
                            elementData[prop.name] = ev.target.value.split(";").map(e => e.split(","));
                            Storage.set("newElement", elementData);
                        } else {
                            ev.target.style.display = "none";
                        }
                    }
                    div.appendChild(dropdown);
                    div.appendChild(el);
                } else {
                    const el = createInput(prop.type == "string" ? "text" : prop.type instanceof Array ? "color" : prop.type, false, id);
                    el.onchange = (ev) => {
                        const elementData = Storage.get("newElement", {});
                        if (prop.type == "number") elementData[prop.name] = parseFloat(ev.target.value);
                        else if (prop.type == "color" || prop.type[0] == "color") elementData[prop.name] = parseColor(ev.target.value);
                        else if (prop.type == "string") elementData[prop.name] = ev.target.value;
                        Storage.set("newElement", elementData);
                    }
                    div.appendChild(el);
                }
                if (prop.required) {
                    const requiredMessage = span(" This field is required");
                    requiredMessage.id = id + "/required";
                    requiredMessage.style.display = "none";
                    requiredMessage.style.color = "red";
                    div.appendChild(requiredMessage);
                }
                category.appendChild(div);
            }
            category.appendChild(br());
            nodes.push(category);
        }

        const createButton = span("Create Element");
        createButton.className = "createButton";
        createButton.onclick = () => {
            const elementData = Storage.get("newElement", {});
            if (!elementData["name"]) {
                document.getElementById("elementsManager/creator/meta/name/required").style.display = "";
            }
            if (!elementData["category"]) {
                document.getElementById("elementsManager/creator/meta/category/required").style.display = "";
            }

            if (!elementData || !elementData["name"] || !elementData["category"]) return;
            Storage.append("elements", elementData);
            Storage.remove("newElement");
            closeMenu();
            alert("Element successfully created");
        }

        nodes.push(br(), createButton);

        new MenuScreen()
            .setTitle("Element creator")
            .setParentDivId("elementCreatorParent")
            .setInnerDivId("elementCreator")
            .appendInnerHtml("<span>Takes effect after reload</span>")
            .addNode(nodes)
            .build();
    }

    const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(JSON.parse(event.target.result));
            };
            reader.onerror = (event) => {
                reject(event.target.error);
            };
            reader.readAsText(file);
        });
    }
    
    const settingsLoader = () => {
        const nodes = [];
        let settings = Storage.get("settings", {
            clearElements: false,
            allowFreeRemoval: false
        }, true);
        if (!settings) {
            settings = {
                clearElementsButton: false,
                allowFreeRemoval: false
            };
            Storage.set("settings", settings);
        }
        const elements = createDiv();
        const elementsTitle = span("Elements");
            elementsTitle.className = "categoryTitle";
        elements.appendChild(elementsTitle);
        const importDiv = createDiv();
        document.addEventListener("change", async (ev) => {
            if (ev.target && ev.target.id == "importElements") {
                const promises = [];
                for (const file of ev.target.files) {
                    promises.push(readFileAsync(file));
                }
                const res = await Promise.all(promises);
                const result = [];
                for (const array of res) {
                    for (const element of array) {
                        if (result.find(r => r.name == element.name)) continue;
                        result.push(element);
                    }
                }
                importElements(result);
            }
        })
        const importInput = document.createElement("input");
            importInput.type = "file";
            importInput.accept = "application/JSON, application/json";
            importInput.id = "importElements";
            importInput.style.display = "none";
        const importLabel = document.createElement("label");
            importLabel.setAttribute("for", "importElements");
            importLabel.innerText = "Import Elements"
            importLabel.className = "hoverableText";
        importDiv.appendChild(importInput);
        importDiv.appendChild(importLabel);
        elements.appendChild(importDiv);
        const exportButton = span("Export Elements");
            exportButton.className = "hoverableText";
            exportButton.onclick = () => {exportElements()};
        elements.appendChild(exportButton);
        const clearButton = span("Clear custom elements");
            clearButton.className = "hoverableText";
            clearButton.onclick = () => {
                if (confirm("Are you sure you want to remove all the custom elements?")) {
                    Storage.remove("elements");
                    const customElementsList = document.getElementById("customElementsList");
                    customElementsList.replaceChildren();
                    const message = document.getElementById("noCustomElementsMessage");
                    message.style.display = "";
                }
            }
        elements.appendChild(br());
        elements.appendChild(clearButton);
        elements.appendChild(br());
        const general = createDiv();
            general.innerHTML += `<span class="categoryTitle">General</span><br>`;
        const clearElementsDiv = createDiv();
            clearElementsDiv.innerHTML += "<span>Clear custom elements on import</span>";
        const clearElementsButton = document.createElement("input");
            clearElementsButton.className = "toggleInput";
            clearElementsButton.type = "button";
        if (settings && settings.clearElements) {
            clearElementsButton.value = "ON";
            clearElementsButton.setAttribute("state", "1");
        } else {
            clearElementsButton.value = "OFF";
            clearElementsButton.setAttribute("state", "0");
        }
        clearElementsButton.onclick = (ev) => {
            toggleSetting("clearElements", ev.target)
        }
        clearElementsDiv.appendChild(clearElementsButton);
        general.appendChild(clearElementsDiv)
        const allowRemovalDiv = createDiv();
            allowRemovalDiv.innerHTML += "<span>Allow free element removal</span>";
        const allowRemovalButton = document.createElement("input");
            allowRemovalButton.className = "toggleInput";
            allowRemovalButton.type = "button";
        if (settings && settings.allowFreeRemoval) {
            allowRemovalButton.value = "ON";
            allowRemovalButton.setAttribute("state", "1");
        } else {
            allowRemovalButton.value = "OFF";
            allowRemovalButton.setAttribute("state", "0");
        }
        allowRemovalButton.onclick = (ev) => {
            toggleSetting("allowFreeRemoval", ev.target);
        }
        allowRemovalDiv.appendChild(allowRemovalButton);
        general.appendChild(allowRemovalDiv);
        const customElements = createDiv();
        const customElementsTitle = span("Custom Elements");
            customElementsTitle.className = "categoryTitle";
        customElements.appendChild(customElementsTitle);
        const list = document.createElement("ul");
        list.id = "customElementsList";
        const elements_ = Storage.get("elements", []);
        const deleted = Storage.get("deletedElements", []);
        for (const element of elements_) {
            const li = document.createElement("li");
            li.id = "customElementsList/" + element;
            const text = span(element.name);
            text.onclick = () => {
                Storage.set("currentElement", element.name);
                openMenu("elementManager", true);
            }
            li.appendChild(text);
            const removeButton = span("X");
            removeButton.className = "elementRemoveButton";
            removeButton.onclick = () => {
                if (confirm("Are you sure you want to delete that element?")) {
                    delete elements[element.name];
                    Storage.filter("elements", a => a.name != element.name);
                    li.style.display = "none";
                    document.getElementById("customElementsList/" + key).remove();
                    if (document.getElementById("customElementsList").children.length == 0) {
                        document.getElementById("noCustomElementsMessage").style.display = "";
                    }
                }
            }
            const emptySpan = span(" ")
            emptySpan.className = "elementRemoveButton";
            li.appendChild(emptySpan);
            li.appendChild(removeButton)
            list.appendChild(li);
        }
        const message = span("There are no custom elements");
            message.id = "noCustomElementsMessage";
        if (elements_.length > 0) message.style.display = "none";
        customElements.appendChild(br());
        customElements.appendChild(message);
        customElements.appendChild(list);
        const deletedElements = createDiv();
        const deletedElementsTitle = span("Deleted Elements");
            deletedElementsTitle.className = "categoryTitle";
        deletedElements.appendChild(deletedElementsTitle);
        deletedElements.appendChild(br());
        const deletedElementsInfo = span("Elements will reappear after reload.\nCustom elements get deleted permanently.");
        deletedElements.appendChild(br());
        deletedElements.appendChild(deletedElementsInfo);
        const deletedElementsMessage = span("There are no deleted elements");
            deletedElementsMessage.style.display = deleted.length > 0 ? "none" : "";
            deletedElementsMessage.id = "noDeletedElementsMessage";
        const deletedElementsList = document.createElement("ul");
            deletedElementsList.id = "deletedElementsList";
        for (const element of deleted) {
            const li = document.createElement("li");
            li.innerText = element;
            li.className = "hoverableText"
            li.onclick = () => {
                if (confirm("Are you sure you want to re-add '" + element + "'?")) {
                    Storage.filter("deletedElements", a => a != element);
                    li.style.display = "none";
                    if (Storage.get("deletedElements", []).length == 0) {
                        document.getElementById("noDeletedElementsMessage").style.display = "";
                    }
                }
            }
            deletedElementsList.appendChild(li);
        }
        deletedElements.appendChild(br());
        deletedElements.appendChild(deletedElementsMessage);
        deletedElements.appendChild(deletedElementsList);
        nodes.push(elements, br(), general, br(), customElements, br(), deletedElements);

        new MenuScreen()
            .setTitle("Elements Manager Settings")
            .setParentDivId("elementsManagerSettingsParent")
            .setInnerDivId("elementsManagerSettings")
            .setCloseButtonText("<")
            .addNode(nodes)
            .build();
    }

    menuScreens.elementsManager = {
        name: "Elements Manager",
        parentDiv: "elementsManagerParent",
        buttonDescription: "Elements manager",
        show: true,
        loader: elementsManagerLoader
    }

    menuScreens.elementManager = {
        name: "Element Manager",
        parentDiv: "elementManagerParent",
        show: false,
        loader: elementManagerLoader,
        preOpen: () => {
            Storage.remove("tempChanges");
            const currentElement = Storage.get("currentElement");
            if (!currentElement) return closeMenu();
            const element = elements[currentElement];
            if (!element) return closeMenu();
            for (const key of Object.keys(properties)) {
                for (const prop of properties[key]) { 
                    const id = "elementsManager/" + key + "/" + prop.name;
                    const el = document.getElementById(id);
                    if (prop.type instanceof Array) {
                        if (element[prop.name]) {
                            if (element[prop.name] instanceof Array) {
                                el.setAttribute("value", element[prop.name].join(";"));
                            } else {
                                const type = {
                                    string: "text",
                                    number: "number",
                                    color: "color"
                                }
                                el.setAttribute("type", type[prop.type[0]]);
                                el.setAttribute("value", parseColor(element[prop.name]));
                            } 
                        } else {
                            if (prop.type[0] == "color") {
                                el.setAttribute("type", "color");
                                el.setAttribute("value", "#ff0000");
                            }
                            else el.setAttribute("value", "none");
                        }
                    } else {
                        if (element[prop.name]) {
                            if (prop.type == "boolean") {
                                el.setAttribute("value", element[prop.name] ? "ON" : "OFF");
                                el.setAttribute("state", element[prop.name] ? "1" : "0");
                            } else if (prop.type == "color") {
                                el.setAttribute("value", parseColor(element[prop.name]));
                            } else if (prop.name == "behavior") {
                                const behavior = element[prop.name];
                                const index = Object.keys(behaviors).map(b => `${behaviors[b] instanceof Array ? behaviors[b].join(";") : behaviors[b]}`).indexOf(behavior instanceof Array ? behavior.join(";") : behavior);
                                if (index == -1) {
                                    document.getElementById(id + "/option/custom").selected = true;
                                    document.getElementById(id + "/textInput").style.display = "";
                                    document.getElementById(id + "/textInput").setAttribute("value", behavior.join(";"))
                                } else {
                                    document.getElementById(id + "/textInput").style.display = "none";
                                    document.getElementById(id + "/option/" + index).selected = true;
                                }
                            } else {
                                el.setAttribute("value", element[prop.name] instanceof Function ? element[prop.name].toString() : element[prop.name]);
                            }
                        } else if (prop.name == "name") {
                            el.setAttribute("value", currentElement);
                        } else if (prop.name == "behavior") {
                            console.log(element[prop.name], element);
                            document.getElementById(id + "/option/none").selected = true;
                            document.getElementById(id + "/textInput").style.display = "none";
                        } else {
                            const default_ = {
                                string: "none",
                                number: 0,
                                color: "#ff0000"
                            }
                            if (prop.type == "boolean") {
                                el.setAttribute("value", "OFF");
                                el.setAttribute("state", "0");
                            } else {
                                el.setAttribute("value", default_[prop.type])
                            }
                        }
                    }
                }
            }
        },
        close: () => {
            if (!Storage.get("tempChanges") || !Storage.get("tempChanges", []).length || confirm("Are you sure you want to close the menu without saving the changes?")) {
                const menuParent = document.getElementById("elementManagerParent");
                menuParent.style.display = "none";
                Storage.remove("tempChanges");
                Storage.remove("noClose");
            } else {
                Storage.set("noClose", true);
            }
        },
        onClose: () => {
            if (!Storage.get("noClose")) {
                showingMenu = false;
                openMenu("elementsManager", true);
            }
        }
    }

    menuScreens.elementCreator = {
        name: "Element Creator",
        parentDiv: "elementCreatorParent",
        show: false,
        loader: elementCreatorLoader,
        preOpen: () => {
            const elementData = {};
            for (const key of Object.keys(properties)) {
                for (const prop of properties[key]) {
                    if (prop.creatorIgnore) continue;
                    const el = document.getElementById("elementsManager/creator/" + key + "/" + prop.name)
                    if (prop.type instanceof Array) {
                        el.setAttribute("value", "none");
                    } else {
                        const default_ = {
                            string: "none",
                            number: 0,
                            color: "#ff0000",
                            boolean: "OFF"
                        }
                        if (prop.name == "name") {
                            let name = `NewElement${Math.floor(Math.random() * 10000) + 1}`;
                            if (elements[name]) {
                                let i = 0;
                                let j = 1;
                                // try 100 times, then increase the pool
                                while (elements[name]) {
                                    name = `NewElement${Math.floor(Math.random() * (10000 * i)) + 1}`;
                                    i++;
                                    if (i <= 100) {
                                        j++;
                                        i = 0;
                                    }
                                    // if already incresed the pool 5 times and there is still nothing, just break and use static name
                                    if (j <= 5) {
                                        name = "NewElement";
                                        break;
                                    }
                                }
                            }
                            el.setAttribute("value", name)
                            elementData[prop.name] = name;
                        } else if (prop.name == "category") {
                            el.setAttribute("value", "other")
                            elementData[prop.name] = "other";
                        } else if (prop.name == "behavior") {
                            elementData[prop.name] = "POWDER_OLD";
                        } else {
                            el.setAttribute("value", default_[prop.type]);
                        }
                        if (prop.type == "boolean") {
                            el.setAttribute("state", "0")
                        }
                    }
                }
            }
            Storage.set("newElement", elementData);
        },
        close: () => {
            if (!Storage.get("newElement") || confirm("Are you sure you want to close the menu without creating the element?")) {
                const menuParent = document.getElementById("elementCreatorParent");
                menuParent.style.display = "none";
                Storage.remove("newElement");
                Storage.remove("noClose");
            } else {
                Storage.set("noClose", true);
            }
        },
        onClose: () => {
            if (!Storage.get("noClose")) {
                showingMenu = false;
                openMenu("elementsManager", true);
            }
        }
    }

    menuScreens.elementsSettings = {
        name: "Elements Settings",
        show: false,
        parentDiv: "elementsManagerSettingsParent",
        loader: settingsLoader,
        preOpen: () => {
            const customElements = Storage.get("elements", []);
            const message = document.getElementById("noCustomElementsMessage");
            const list = document.getElementById("customElementsList");
            if (customElements.length > 0) {
                message.style.display = "none";
                list.style.display = "";
                list.replaceChildren();
                for (const element of customElements) {
                    const li = document.createElement("li");
                    const text = span(element.name);
                    text.onclick = () => {
                        Storage.set("currentElement", element.name);
                        openMenu("elementManager", true);
                    }
                    li.appendChild(text);
                    const removeButton = span("X");
                    removeButton.className = "elementRemoveButton";
                    removeButton.onclick = () => {
                        if (confirm("Are you sure you want to delete that element?")) {
                            delete elements[element.name];
                            Storage.filter("elements", a => a.name != element.name);
                            li.style.display = "none";
                            document.getElementById("customElementsList/" + key).remove();
                            if (document.getElementById("customElementsList").children.length == 0) {
                                document.getElementById("noCustomElementsMessage").style.display = "";
                            }
                        }
                    }
                    const emptySpan = span(" ");
                    emptySpan.className = "elementRemoveButton";
                    li.appendChild(emptySpan);
                    li.appendChild(removeButton);
                    list.appendChild(li);
                }
            } else {
                list.style.display = "none";
                message.style.display = "";
            }
        },
        onClose: () => {
            const settings = Storage.get("settings", {allowFreeRemoval: false, clearElements: false}, true);
            const elements_ = Storage.get("elements", []).map(e => e.name); 
            const lastFreeRemoval = Storage.get("lastFreeRemoval", false);
            if (settings.allowFreeRemoval && !lastFreeRemoval) {
                for (const li of document.getElementById("elementsList").children) {
                    const name = li.querySelector("span").innerText
                    if (!elements_.includes(name) && li.getElementsByClassName("elementRemoveButton").length == 0) {
                        const removeButton = span("X");
                        removeButton.className = "elementRemoveButton";
                        removeButton.onclick = () => {
                            if (confirm("Are you sure you want to delete that element?")) {
                                delete elements[name];
                                li.style.display = "none";
                                Storage.append("deletedElements", name);
                                document.getElementById("noDeletedElementsMessage").style.display = "none";
                                const li2 = document.createElement("li");
                                li2.innerText = name;
                                li2.onclick = () => {
                                    if (confirm("Are you sure you want to re-add '" + name + "'?")) {
                                        Storage.filter("deletedElements", a => a != name);
                                        li2.style.display = "none";
                                    }
                                }
                                document.getElementById("deletedElementsList").appendChild(li2);
                            }
                        }
                        const emptySpan = span(" ")
                        emptySpan.className = "elementRemoveButton";
                        li.appendChild(emptySpan);
                        li.appendChild(removeButton)
                    }
                }
            } else if (!settings.allowFreeRemoval && lastFreeRemoval) {
                for (const li of document.getElementById("elementsList").children) {
                    if (!elements_.includes(li.querySelector("span").innerText))
                        li.querySelectorAll(".elementRemoveButton").forEach(e => e.remove());
                }
            }
            Storage.set("lastFreeRemoval", settings.allowFreeRemoval);
            openMenu("elementsManager", true);
        }
    }

    runAfterLoadList.push(cssInject, loadChanges);
} else {
    enabledMods.unshift("mods/betterMenuScreens.js");
    localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
    window.location.reload();
}
