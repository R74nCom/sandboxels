(() => {
    function runKeybind() {
        promptInput("Input the keybind you want to run. (e.g. KeyA, Digit1, Backspace)", (keybind) => {
            if (/^[A-Za-z]$/.test(keybind)) keybind = "Key" + keybind.toUpperCase()
            if (/^[0-9]$/.test(keybind)) {
                setView(Number(keybind))
            }
            if (keybinds[keybind]) {
                keybinds[keybind]();
            }
        })
    }

    function loadButton() {
        const keybindButton = document.createElement("button")
        if (!keybindButton) {
            setTimeout(loadButton, 100)
            return
        }
        keybindButton.id = "keybindButton"
        keybindButton.title = "Input a keybind"
        keybindButton.classList.add("controlButton")
        keybindButton.onclick = () => {
            runKeybind()
        }
        keybindButton.textContent = "Keybind"
        document.getElementById("pauseButton").before(keybindButton)
    }

    if (isMobile) {
        loadButton()
    }
})()
