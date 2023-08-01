/**
 * @typedef {object} MenuScreenLoader
 * @property {string} name Name of the menu screen. Gets displayed on the button
 * @property {string} parentDiv ID of the parent div. Should be the same as the ID provided in MenuScreen class via setParentDivId method
 * @property {string} buttonDescription Description that is shown when the button is hovered
 * @property {boolean} show Whether menu screen button should get shown on tool controls
 * @property {() => void} [close] Closing method. Optional
 * @property {() => void} [preOpen] Method called before opening. Optional
 * @property {() => void} [open] Opening method. Optional
 * @property {() => void} [onClose] Method that gets called on close (except when menu is force closed, like when clicking on a different menu button). Optional
 * @property {() => void} [loader] Method that injects the menu screen into HTML. Can be set to ModScreen build method. Optional
 */
var menuScreens = {
    info: {
        name: "Info",
        parentDiv: "infoParent",
        buttonDescription: "Brings up the element info screen",
        show: true,
        close: () => {
            var infoParent = document.getElementById("infoParent");
            var infoSearch = document.getElementById("infoSearch");
            infoParent.style.display = "none";
            infoSearch.value = "";
            infoHistory = [];
        },
        open: () => {showInfo();}
    },
    mods: {
        name: "Mods",
        parentDiv: "modParent",
        buttonDescription: "Brings up the Mod Manager",
        show: true,
        close: () => {
            var modParent = document.getElementById("modParent");
            var modManagerUrl = document.getElementById("modManagerUrl");
            modParent.style.display = "none";
            modManagerUrl.value = "";
        },
        open: () => {showModManager();}
    },
    settings: {
        name: "Settings",
        parentDiv: "settingsParent",
        buttonDescription: "Brings up the settings screen",
        show: true,
        open: () => {showSettings();}
    }
}

closeMenu = (force = false) => {
    if (!showingMenu) return;
    const menu = menuScreens[showingMenu];
    if (!menu) {
        const menuParents = document.getElementsByClassName("menuParent");
        for (const elem of menuParents) elem.style.display = "none";
        showingMenu = false;
    } else {
        if (menu.close) menu.close();
        else {
            const menuParent = document.getElementById(menu.parentDiv);
            menuParent.style.display = "none";
        }
        if (!force && menu.onClose) menu.onClose();
        else showingMenu = false;
    }
}

// injects into toolControls
const inject = () => {
    const toolControls = document.getElementById("toolControls");
    const buttons = [];
    const style = document.createElement("style");
    document.head.appendChild(style);
    for (const key in menuScreens) {
        const element = menuScreens[key];
        if (element.show) {
            const button = document.createElement("button");
            button.id = `betterMenuScreens_${key}Button`;
            button.title = element.buttonDescription ?? "";
            button.onclick = () => {
                if (showingMenu != key) {
                    closeMenu(true);
                    if (element.preOpen) element.preOpen();
                    if (element.open) element.open();
                    else {
                        const menuParent = document.getElementById(element.parentDiv);
                        menuParent.style.display = "block";
                        showingMenu = key;
                    }
                } else {
                    closeMenu(true);
                }
            }
            button.innerText = element.name;
            button.className = "controlButton";
            buttons.push(button);
        }
        if (element.loader) element.loader();
    }
    toolControls.removeChild(document.getElementById("infoButton"));
    toolControls.removeChild(document.getElementById("modsButton"));
    // replace the old settings button with new buttons
    document.getElementById(`settingsButton`).replaceWith(...buttons);
    
}

/**
 * 
 * @param {string} menu Menu do be opened 
 * @param {boolean} [closeCurrent] Whether it should forcefully close the current screen
 */
const openMenu = (menu, closeCurrent = false) => {
    if (closeCurrent) closeMenu(true);
    const menuScreen = menuScreens[menu];
    if (menuScreen) {
        showingMenu = menu;
        if (menuScreen.preOpen) menuScreen.preOpen();
        if (menuScreen.open) menuScreen.open();
        else {
            const menuParent = document.getElementById(menuScreen.parentDiv);
            menuParent.style.display = "block";
        }
    }
}

class MenuScreen {
    constructor () {
        this.nodes = [];
        this.innerHtml = "";
        this.showCloseButton = true;
        this.closeButtonText = "-";
        this.closeButtonClass = "XButton";
    }

    /**
     * Sets the screen title
     * @param {string} [title] Screen title. "New Menu Screen" by default
     */
    setTitle(title = "New Menu Screen") {
        this.title = title;
        return this;
    }

    /** 
     * Sets close button visibility. When false the close button will not be added to the menu screen
     * @param {boolean} show Visibility of the close button
     */
    setShowCloseButton(show) {
        this.showCloseButton = show;
        return this;
    }

    /**
     * Sets the close button text
     * @param {string} [text] Close button text. "-" by default
     */
    setCloseButtonText(text = "-") {
        this.closeButtonText = text;
        return this;
    }

    /**
     * Sets the close button class
     * @param {string} [className] Close button class. "XButton" by default
     */
    setCloseButtonClass(className = "XButton") {
        this.closeButtonClass = className;
        return this;
    }

    /**
     * Sets the parent div ID. Has to be called at least once before build method is called
     * @param {string} id Parent div ID
     */
    setParentDivId(id) {
        this.parentDivId = id;
        return this;
    }

    /**
     * Sets the parent div class name. Changing the div class name is not recommended
     * @param {string} [className] Parent div class name. "menuParent" by default
     */
    setParentDivClass(className = "menuParent") {
        this.parentDivClass = className;
        return this;
    }

    /**
     * Sets the inner div ID. Has to be called at least once before build method is called
     * @param {string} id Inner div ID
     */
    setInnerDivId(id) {
        this.innerDivId = id;
        return this;
    }

    /**
     * Sets the inner div class name. Changing the div class name is not recommended
     * @param {string} [className] Inner div class name. "menuScreen" by default
     */
    setInnerDivClass(className = "menuScreen") {
        this.innerDivClass = className;
        return this;
    }
    
    /**
     * Adds a node to the menu screen content
     * @param {Node|Node[]} node Any HTML node/element or array of HTML nodes/elements
     */
    addNode(node) {
        if (node instanceof Array) this.nodes.push(...node);
        else this.nodes.push(node);
        return this;
    }

    /**
     * Appends to menu screen contents inner html
     * @param {string} html HTML code to append
     */
    appendInnerHtml(html) {
        this.innerHtml += html;
        return this;
    }

    /**
     * Sets the menu screen contents inner html
     * @param {string} html HTML code to set to
     */
    setInnerHtml(html) {
        this.innerHtml = html;
        return this;
    }

    /**
     * Checks whether the menu screen is ready for build. That method should not be called outside of build method
     */
    _check() {
        if (!this.parentDivId) throw "No parent div id specified";
        if (!this.innerDivId) throw "No inner div id specified";
    }

    /**
     * Builds the menu screen and appends it to chosen element
     * @param {string} [id] Element id to append the menu screen to. Changing the id from default "gameDiv" is not recommended
     */
    build(id = "gameDiv") {
        this._check();
        const parent = document.createElement("div");
        parent.className = this.parentDivClass ?? "menuParent";
        parent.id = this.parentDivId;
        parent.style.display = "none";
        const inner = document.createElement("div");
        inner.className = this.innerDivClass ?? "menuScreen";
        inner.innerHTML = `${this.showCloseButton ? `<button class="${this.closeButtonClass ?? "XButton"}" onclick="closeMenu();">${this.closeButtonText}` : ""}</button>
        <span class="menuTitle">${this.title ?? "Menu Screen"}</span><br><br><div class="menuText">` + this.innerHtml + "</div>";
        this.nodes.forEach(n => inner.querySelector(".menuText").appendChild(n));
        parent.appendChild(inner);
        document.getElementById(id).appendChild(parent);
    }
}

runAfterLoadList.push(inject);
