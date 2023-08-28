const settingType = {
    COLOR: [0, "#ff0000"],
    TEXT: [1, ""],
    NUMBER: [2, 0],
    BOOLEAN: [3, false],
    SELECT: [4, null]
}
class Setting {
    constructor (name, storageName, type, disabled = false, defaultValue = null) {
        this.tabName = null;
        this.name = name;
        this.storageName = storageName;
        this.type = type[0];
        this.disabled = disabled;
        this.defaultValue = defaultValue ?? type[1];
    }

    set(value) {
        this.value = value;
        const settings = JSON.parse(localStorage.getItem(`${this.tabName}/settings`)) ?? {};
        settings[this.name] = value;
        localStorage.setItem(`${this.tabName}/settings`, JSON.stringify(settings));
    }

    update() {
        this.value = (JSON.parse(localStorage.getItem(`${this.tabName}/settings`)) ?? {})[this.name] ?? this.defaultValue;
    }

    get() {
        this.update();
        return this.value;
    }

    enable() {
        this.disabled = false;
    }
    
    disable() {
        this.disabled = true;
    }

    #parseColor(colorString) {
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

    build() {
        const value = this.get();
        const id = "betterSettings/" + this.modName + "/" + this.storageName;
        const span = document.createElement("span");
        span.className = "setting-span";
        span.title = 'Default: "' + this.defaultValue + '"' + (this.disabled ? ". This setting is disabled." : "");
        span.innerText = this.name + " ";
        const element = document.createElement("input");
        switch (this.type) {
            case 0: {
                element.type = "color";
                element.disabled = this.disabled;
                element.id = id;
                element.value = value;
                element.onchange = (ev) => {
                    this.set(this.#parseColor(ev.target.value));
                }
                break;
            }
            case 1: {
                element.type = "text";
                element.disabled = this.disabled;
                element.id = id;
                element.value = value;
                element.onchange = (ev) => {
                    this.set(ev.target.value);
                }
                break;
            }
            case 2: {
                element.type = "number";
                element.disabled = this.disabled;
                element.id = id;
                element.value = value;
                element.onchange = (ev) => {
                    this.set(parseFloat(ev.target.value));
                }
                break;
            }
            case 3: {
                element.type = "input";
                element.className = "toggleInput";
                element.disabled = this.disabled;
                element.id = id;
                element.value = value ? "ON" : "OFF";
                element.setAttribute("state", value ? "1" : "0");
                element.onclick = (ev) => {
                    ev.target.value = ev.target.value == "ON" ? "OFF" : "ON";
                    ev.target.setAttribute("state", ev.target.getAttribute("state") == "1" ? "0" : "1");
                    this.set(ev.target.value == "ON");
                }
                break;
            }
        }
        span.appendChild(element);
        return span;
    }
}

class SelectSetting extends Setting {
    constructor (name, storageName, values, disabled = false, defaultValue = null) {
        super(name, storageName, settingType.SELECT, disabled, defaultValue ?? values[0][1]);
        this.values = values;
    }

    build() {
        const value = this.get();
        const id = "betterSettings/" + this.modName + "/" + this.storageName;
        let selected = false;
        const span = document.createElement("span");
        span.className = "setting-span";
        span.title = "Default: " + this.defaultValue;
        span.innerText = this.name;
        const element = document.createElement("select");
        element.id = id;
        for (const val of this.values) {
            const option = document.createElement("option");
            option.value = val[0];
            option.innerText = val[1];
            if (val[0] == value && !selected) {
                option.selected = true;
                selected = true;
            }
            element.appendChild(option);
        }
        element.onchange = (ev) => {
            this.set(ev.target.value);
        }
        span.appendChild(element);
        return span;
    }
}

class SettingsTab {
    constructor (tabName) {
        this.categories = new Map();
        this.registry = new Map();
        this.tabName = tabName;
    }

    registerSetting(setting, category = "General") {
        setting.tabName = this.tabName.toLowerCase().replace(/ /, "_");
        setting.update();
        if (this.categories.has(category)) this.categories.get(category).push(setting);
        else this.categories.set(category, [setting]);
        this.registry.set(setting.storageName, setting);
    }

    registerSettings(category = "General", ...settings) {
        for (const setting of settings) {
            this.registerSetting(setting, category);
        }
    }

    set(name, value) {
        this.registry.get(name)?.set(value);
    }

    get(name) {
        return this.registry.get(name)?.get();
    }

    build() {
        const result = document.createElement("div");
        for (const key of this.categories.keys()) {
            const category = document.createElement("div");
            const title = document.createElement("span");
            title.innerText = key;
            title.className = "betterSettings-categoryTitle";
            category.appendChild(title);
            for (const setting of this.categories.get(key)) {
                if (setting instanceof Setting) category.appendChild(setting.build());
            }
            result.append(category, document.createElement("br"));
        }
        return result;
    }
}

class SettingsManager {
    constructor () { 
        this.settings = new Map();
    }

    registerTab(settingsTab) {
        this.settings.set(settingsTab.tabName, settingsTab);
    }

    getSettings() {
        return this.settings;
    }
}

const settingsManager = new SettingsManager();
{
const injectCss = () => {
    const css = `.modSelectSettingsButton {
        padding: 10px;
        cursor: pointer;
    }
    .modSelectSettingsButton[current=true] {
        background-color: rgb(71, 71, 71);
    }
    .modSelectSettingsButton:hover {
        background-color: rgb(51, 51, 51);
    }
    #modSelectControls {
        margin-bottom: 10px;
        position: relative;
        display: flex;
        overflow-x: scroll;
    }
    .betterSettings-categoryTitle {
        font-size: 1.25em;
    }`;
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
}

const inject = () => {
    const settingsMenu = document.getElementById("settingsMenu");
    const menuText = settingsMenu.querySelector(".menuText");
    const menuTextChildren = menuText.children;
    const generalDiv = document.createElement("div");
    generalDiv.id = "betterSettings/div/general";
    while (menuTextChildren.length > 0) {
        generalDiv.appendChild(menuTextChildren[0]);
    }
    menuText.appendChild(generalDiv);
    const controls = document.createElement("div");
    controls.id = "modSelectControls";
    const generalButton = document.createElement("button");
    generalButton.setAttribute("current", true);
    generalButton.id = "betterSettings/button/general";
    generalButton.className = "modSelectSettingsButton";
    generalButton.innerText = "General";
    generalButton.onclick = (ev) => {
        for (const element of controls.children) {
            element.setAttribute("current", false);
            document.getElementById(element.id.replace("button", "div")).style.display = "none";
        }
        ev.target.setAttribute("current", true);
        document.getElementById("betterSettings/div/general").style.display = "";
    }
    controls.appendChild(generalButton);
    const wrapper = document.createElement("div");
    wrapper.appendChild(generalDiv);
    for (const mod of settingsManager.getSettings().keys()) {
        const modButton = document.createElement("button");
        modButton.setAttribute("current", false);
        modButton.id = "betterSettings/button/" + mod;
        modButton.className = "modSelectSettingsButton";
        modButton.innerText = mod;
        modButton.onclick = (ev) => {
            for (const element of controls.children) {
                element.setAttribute("current", false);
                document.getElementById(element.id.replace("button", "div")).style.display = "none";
            }
            ev.target.setAttribute("current", true);
            document.getElementById("betterSettings/div/" + mod).style.display = "";
        }
        controls.appendChild(modButton);
        const modDiv = document.createElement("div");
        modDiv.style.display = "none";
        modDiv.id = "betterSettings/div/" + mod;
        modDiv.appendChild(settingsManager.getSettings().get(mod).build());
        wrapper.appendChild(modDiv);
    }
    menuText.append(controls, wrapper);
}
runAfterLoadList.push(inject, injectCss);
}