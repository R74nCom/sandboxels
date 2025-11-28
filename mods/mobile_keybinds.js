(() => {
    function runKeybind() {
        promptInput("Input the keybind you want to run. (e.g. KeyA, Digit1, Backspace)", (keybind) => {
            if (keybinds[keybind]) {
                keybinds[keybind]();
            }
        })
    }

    if (isMobile) {
        const keybindButton = document.createElement("button")
        keybindButton.id = "keybindButton"
        keybindButton.title = "Change static mode"
        keybindButton.classList.add("controlButton")
        keybindButton.onclick = () => {
            runKeybind()
        }
        keybindButton.textContent = "Keybind"
        document.getElementById("pauseButton").before(keybindButton)
    }
})()