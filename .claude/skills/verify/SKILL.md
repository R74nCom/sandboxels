---
name: verify
summary: Runtime verification for the buildless Sandboxels browser application.
---

# Sandboxels runtime verification

1. Start the app from the repository root:

   ```bash
   python3 -m http.server 8000 --bind 127.0.0.1
   ```

2. Open `http://127.0.0.1:8000/` in Chromium. This environment may not have a system browser; a temporary Playwright install under `/tmp` works without changing the repository.
3. Capture both browser `console` errors and `pageerror` events.
4. Exercise changed behavior through the real UI and canvas. Useful public probes after UI interaction are available on `window.HumanSociety`, but do not replace clicking the controls.
5. For person commands, place ground and a `civilized_human`, call `HumanSociety.forceReindex()` only to make the placed actor visible to the live UI, then select it through the People panel. Confirm command-mode right click leaves `mouseIsDown === false` and Esc exits.
6. Save screenshots under `/tmp` and report the observed UI state plus any paths that could not be driven reliably in headless mode.
