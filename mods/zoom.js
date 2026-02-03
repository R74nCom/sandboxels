// zoom.js
"use strict";
(() => {
  // src/custom_setting_types.ts
  var def_classes = () => {
    class Numlist2 extends Setting {
      step;
      input_container = null;
      push_btn = null;
      pop_btn = null;
      constructor(name, storage_name, desc, options) {
        super(
          name,
          storage_name,
          [5, 0],
          options.disabled,
          options.default_values,
          desc,
          options.custom_validator
        );
        this.step = options.step ?? 1;
      }
      #new_input(value, i) {
        const elem = document.createElement("input");
        elem.type = "number";
        elem.value = value.toString();
        elem.step = this.step.toString();
        elem.onchange = (ev) => {
          const parsed = Number.parseFloat(ev.target.value);
          if (!Number.isNaN(parsed)) {
            this.value[i] = parsed;
            this.set(this.value);
          }
        };
        return elem;
      }
      #push_pop_btns() {
        this.push_btn = document.createElement("button");
        this.push_btn.style.color = "#0F0";
        this.push_btn.innerText = "+";
        this.pop_btn = document.createElement("button");
        this.pop_btn.style.color = "#F00";
        this.pop_btn.innerText = "-";
        this.push_btn.onclick = () => {
          this.value.push(1);
          this.input_container.append(this.#new_input(1, this.value.length));
        };
        this.pop_btn.onclick = () => {
          this.value.pop();
          if (this.input_container.lastChild) {
            this.input_container.removeChild(this.input_container.lastChild);
          }
        };
        return [this.push_btn, this.pop_btn];
      }
      disable() {
        this.push_btn?.setAttribute("disabled", "true");
        this.pop_btn?.setAttribute("disabled", "true");
      }
      enable() {
        this.push_btn?.removeAttribute("disabled");
        this.pop_btn?.removeAttribute("disabled");
      }
      build() {
        const value = this.get();
        const container = document.createElement("span");
        container.classList.add("setting-span", "zm_nml_setting");
        const l_container = document.createElement("span");
        const label = document.createElement("span");
        label.innerText = this.name;
        const btn_container = document.createElement("span");
        btn_container.classList.add("zm_nml_btn_container");
        btn_container.append(...this.#push_pop_btns());
        l_container.append(label, document.createElement("br"), btn_container);
        this.input_container = document.createElement("span");
        this.input_container.classList.add("zm_nml_icontainer");
        const elems = [];
        value.forEach((x, i) => {
          elems.push(this.#new_input(x, i));
        });
        this.input_container.append(...elems);
        container.append(l_container, this.input_container);
        return container;
      }
    }
    class MultiSetting extends Setting {
      settings;
      elements = [];
      multi_input_name;
      rows = [];
      constructor(name, storage_name, extra_opts, ...settings) {
        super(
          name,
          storage_name,
          [255],
          extra_opts.disabled,
          extra_opts.default_value ?? 0,
          extra_opts.desc,
          void 0
        );
        this.settings = settings;
        this.multi_input_name = crypto.randomUUID();
      }
      build() {
        const container = document.createElement("span");
        this.settings.forEach((setting, i) => {
          const row_container = document.createElement("div");
          row_container.classList.add("zm_ms_row");
          this.rows.push(row_container);
          const select_btn = document.createElement("button");
          select_btn.classList.add("zm_ms_selbtn");
          select_btn.innerText = "#";
          const built_item = setting.build();
          built_item.classList.add("zm_ms_item");
          built_item.dataset.index = i.toString();
          row_container.dataset.current = i == this.value ? "true" : "false";
          select_btn.onclick = () => {
            this.set(i);
            setting.enable();
            for (const setting2 of this.settings) setting2.disable();
            for (const row of this.rows) {
              row.dataset.current = "false";
              row.querySelectorAll(".zm_ms_item input").forEach((x) => x.setAttribute("disabled", "true"));
            }
            built_item.querySelectorAll("input").forEach((x) => x.removeAttribute("disabled"));
            row_container.dataset.current = "true";
          };
          row_container.append(select_btn, built_item);
          container.appendChild(row_container);
        });
        return container;
      }
    }
    class SettingGroup extends Setting {
      settings;
      constructor(settings) {
        super(
          "",
          "",
          [2763],
          false
        );
        this.settings = settings;
      }
      enable() {
        for (const x of Object.values(this.settings)) {
          x.enable();
        }
      }
      disable() {
        for (const x of Object.values(this.settings)) {
          x.disable();
        }
      }
      build() {
        const container = document.createElement("div");
        for (const x of Object.values(this.settings)) {
          container.appendChild(x.build());
        }
        return container;
      }
      get() {
        return this.settings;
      }
      // Override these so the defaults don't do anything
      set() {
      }
      update() {
      }
      onUpdate() {
      }
    }
    return {
      Numlist: Numlist2,
      MultiSetting,
      SettingGroup
    };
  };

  // src/custom_settings.ts
  var CustomSettingsManager = class {
    canvas_bkg;
    zoom;
    unl_zoom;
    fpan_speed;
    cpan_speed;
    upan_speed;
    use_ijkl;
    show_floater;
    pan_zeroing_en;
    zoom_zeroing_en;
    constructor(on_edit) {
      const { Numlist: Numlist2, MultiSetting, SettingGroup } = def_classes();
      const settings_tab = new SettingsTab("zoom.js");
      const validator = () => {
        on_edit.cb(this);
        return true;
      };
      this.canvas_bkg = new Setting(
        "Canvas background",
        "canvas_bkg",
        settingType.COLOR,
        false,
        "#252525",
        "The colour for the area around the canvas",
        validator
      );
      this.cpan_speed = new Setting(
        "Coarse pan speed",
        "cpan_speed",
        settingType.NUMBER,
        false,
        10,
        "The default pan speed",
        validator
      );
      this.fpan_speed = new Setting(
        "Fine pan speed",
        "fpan_speed",
        settingType.NUMBER,
        false,
        3,
        "The pan speed when holding shift (F in the floater)",
        validator
      );
      this.upan_speed = new Setting(
        "Ultrafine pan speed",
        "upan_speed",
        settingType.NUMBER,
        false,
        1,
        "The pan speed when holding alt (U in the floater)",
        validator
      );
      this.show_floater = new Setting(
        "Show floater",
        "show_floater",
        settingType.BOOLEAN,
        false,
        true,
        "Whether to show the floater or not",
        validator
      );
      this.use_ijkl = new Setting(
        "Use IJKL",
        "use_ijkl",
        settingType.BOOLEAN,
        false,
        false,
        "Makes the mod use IJKL instead of WASD for panning (requires refresh)",
        validator
      );
      this.pan_zeroing_en = new Setting(
        "Enable pan zeroing",
        "en_pzero",
        settingType.BOOLEAN,
        false,
        true,
        "Allows the Q key to reset pan (requires refresh)",
        validator
      );
      this.zoom_zeroing_en = new Setting(
        "Enable zoom zeroing",
        "en_zzero",
        settingType.BOOLEAN,
        false,
        true,
        "Allows the P key to reset zoom. Doesn't work with set zoom levels (requires refresh)",
        validator
      );
      const zoom_levels = new Numlist2(
        "Zoom levels",
        "zoom_levels",
        "Zoom levels",
        {
          default_values: [0.5, 1, 2, 3, 6, 12],
          step: 0.1,
          custom_validator: validator
        }
      );
      this.unl_zoom = new SettingGroup({
        speed: new Setting(
          "Zoom speed",
          "unl_zoom_speed",
          settingType.NUMBER,
          false,
          2,
          "The zoom magnitude (as the multiplier to the zoom level every time zoom is used)",
          validator
        ),
        min: new Setting(
          "Zoom limit (min)",
          "unl_zlim_min",
          settingType.NUMBER,
          false,
          0.25,
          "The lower zoom limit (reducing may lead to rounding error coming back from very low levels)",
          validator
        ),
        max: new Setting(
          "Zoom limit (max)",
          "unl_zlim_max",
          settingType.NUMBER,
          false,
          25,
          "The upper zoom limit (reducing may lead to rounding error coming back from very high levels)",
          validator
        )
      });
      this.zoom = new MultiSetting(
        "Zoom mode",
        "zoom_mode",
        {},
        zoom_levels,
        this.unl_zoom
      );
      settings_tab.registerSettings(
        void 0,
        this.canvas_bkg
      );
      settings_tab.registerSettings(
        "Controls",
        this.use_ijkl,
        this.show_floater,
        this.pan_zeroing_en,
        this.zoom_zeroing_en
      );
      settings_tab.registerSettings(
        "Zoom",
        this.zoom
      );
      settings_tab.registerSettings(
        "Panning",
        this.cpan_speed,
        this.fpan_speed,
        this.upan_speed
      );
      settingsManager.registerTab(settings_tab);
    }
  };

  // src/handler.ts
  var Handler = class {
    settings;
    patcher;
    zoom_panning = [0, 0];
    zoom_level;
    constructor(settings, patcher) {
      this.settings = settings;
      this.patcher = patcher;
      this.zoom_level = 1;
      this.patch_keybinds();
      this.patch_floater();
      window.getMousePos = (canvas2, evt) => {
        if (evt.touches) {
          evt.preventDefault();
          evt = evt.touches[0];
          isMobile = true;
        }
        const rect = canvas2.getBoundingClientRect();
        const clx = evt.clientX;
        const cly = evt.clientY;
        let x = (clx - rect.left) / this.scale();
        let y = (cly - rect.top) / this.scale();
        x = Math.floor(x / canvas2.clientWidth * (width + 1));
        y = Math.floor(y / canvas2.clientHeight * (height + 1));
        return { x, y };
      };
      runAfterReset(() => {
        this.zoom_level = 1;
        this.zoom_panning = [0, 0];
        this.update();
      });
    }
    handle_zoom(direction) {
      if (this.settings.zoom.value == 0) {
        switch (direction) {
          case "in":
            if (!(this.zoom_level + 1 in this.settings.zoom.settings[0].value)) {
              break;
            }
            this.zoom_level += 1;
            break;
          case "out":
            if (!(this.zoom_level - 1 in this.settings.zoom.settings[0].value)) {
              break;
            }
            this.zoom_level -= 1;
            break;
        }
      } else {
        const settings = this.settings.zoom.settings[1].settings;
        const speed = settings.speed.value;
        const min = settings.min.value;
        const max = settings.max.value;
        switch (direction) {
          case "in":
            if (this.zoom_level * speed > max) break;
            this.zoom_level *= speed;
            break;
          case "out":
            if (this.zoom_level / speed < min) break;
            this.zoom_level /= speed;
            break;
        }
        this.zoom_level = Number(this.zoom_level.toPrecision(3));
      }
      this.update();
    }
    handle_pan(direction, speed) {
      switch (direction) {
        case "right":
          this.zoom_panning[0] -= speed;
          break;
        case "left":
          this.zoom_panning[0] += speed;
          break;
        case "up":
          this.zoom_panning[1] += speed;
          break;
        case "down":
          this.zoom_panning[1] -= speed;
          break;
      }
      this.update();
    }
    scale() {
      return this.settings.zoom.value == 0 ? this.settings.zoom.settings[0].value[this.zoom_level] : this.zoom_level;
    }
    update() {
      this.log_info();
      const x = this.zoom_panning[0] * (pixelSize * this.scale());
      const y = this.zoom_panning[1] * (pixelSize * this.scale());
      canvas.style.transform = `translate(${x}px, ${y}px) translateX(-50%) scale(${this.scale()})`;
    }
    log_info() {
      const x_pan = (-this.zoom_panning[0]).toString().padEnd(4);
      const y_pan = (-this.zoom_panning[1]).toString().padEnd(4);
      this.patcher.zoom_data_div.innerText = "";
      this.patcher.zoom_data_div.innerText += `Scale: ${this.scale()}x
`;
      this.patcher.zoom_data_div.innerText += `Pan  : ${x_pan}, ${y_pan}`;
    }
    kbd_speed_noshift(ev) {
      return ev.altKey ? this.settings.upan_speed.value : this.settings.cpan_speed.value;
    }
    patch_keybinds() {
      const pan_keys = this.settings.use_ijkl.value ? ["i", "j", "k", "l"] : ["w", "a", "s", "d"];
      const pan_keys_upper = this.settings.use_ijkl.value ? ["I", "J", "K", "L"] : ["W", "A", "S", "D"];
      keybinds["9"] = () => this.handle_zoom("in");
      keybinds["0"] = () => this.handle_zoom("out");
      keybinds[pan_keys[0]] = (ev) => this.handle_pan("up", this.kbd_speed_noshift(ev));
      keybinds[pan_keys[1]] = (ev) => this.handle_pan("left", this.kbd_speed_noshift(ev));
      keybinds[pan_keys[2]] = (ev) => this.handle_pan("down", this.kbd_speed_noshift(ev));
      keybinds[pan_keys[3]] = (ev) => this.handle_pan("right", this.kbd_speed_noshift(ev));
      keybinds[pan_keys_upper[0]] = () => this.handle_pan("up", this.settings.fpan_speed.value);
      keybinds[pan_keys_upper[1]] = () => this.handle_pan("left", this.settings.fpan_speed.value);
      keybinds[pan_keys_upper[2]] = () => this.handle_pan("down", this.settings.fpan_speed.value);
      keybinds[pan_keys_upper[3]] = () => this.handle_pan("right", this.settings.fpan_speed.value);
      if (this.settings.pan_zeroing_en.value) {
        keybinds["q"] = () => {
          this.zoom_panning = [0, 0];
          this.update();
        };
      }
      if (this.settings.zoom_zeroing_en.value) {
        keybinds["p"] = () => {
          if (this.settings.zoom.value == 1) this.zoom_level = 1;
          this.update();
        };
      }
    }
    floater_speed() {
      switch (this.patcher.panmode_sel.innerText) {
        case "C":
          return this.settings.cpan_speed.value;
        case "F":
          return this.settings.fpan_speed.value;
        case "U":
          return this.settings.upan_speed.value;
        default:
          return 0;
      }
    }
    patch_floater() {
      function patch(id, fn) {
        document.getElementById(id).onclick = fn;
      }
      patch("zm_floater_zi", () => this.handle_zoom("in"));
      patch("zm_floater_zo", () => this.handle_zoom("out"));
      patch("zm_floater_u", () => this.handle_pan("up", this.floater_speed()));
      patch("zm_floater_d", () => this.handle_pan("down", this.floater_speed()));
      patch("zm_floater_l", () => this.handle_pan("left", this.floater_speed()));
      patch("zm_floater_r", () => this.handle_pan("right", this.floater_speed()));
    }
  };

  // assets/numlist.css
  var numlist_default = "#settingsMenu .zm_nml_btn_container button { font-size: 2em; padding: 0px; margin: 0px;}\r\n#settingsMenu .zm_nml_icontainer { align-self: center }\r\n#settingsMenu .zm_nml_setting { display: grid; grid-template-columns: 7em 1fr;}\r\n\r\n#settingsMenu .zm_nml_setting span {\r\n    input { width: 2em; margin-right: 4px; margin-bottom: 4px;}\r\n    \r\n    input:focus {\r\n        outline: none;\r\n        box-shadow: none;\r\n        border-color: white;\r\n    }\r\n}";

  // assets/main.css
  var main_default = '#zm_data_div { margin-bottom: 10px }\r\n#canvasDiv   { overflow: hidden; background-color: var(--opac-85) }\r\n\r\n@media(pointer=coarse){\r\n    #zm_floater_container#zm_floater_container { \r\n        width: 40%;\r\n        height: auto;\r\n    }\r\n    #zm_floater_container:has(#zm_collapse[data-collapsed="true"]){\r\n        width: calc(40% / 3);\r\n    }\r\n}\r\n\r\n@media(pointer:coarse) and (orientation:landscape){\r\n    #zm_floater_container#zm_floater_container {\r\n        width: auto;\r\n        top: 5px;\r\n    }\r\n    #zm_floater_container:has(#zm_collapse[data-collapsed="true"]){\r\n        width: calc(40% / 3);\r\n    }\r\n}\r\n\r\n#colorSelector { z-index: 1; right: 5px }\r\n#zm_floater_container {\r\n    position: absolute;\r\n    display: grid;\r\n\r\n    right: 5px;\r\n    bottom: 5px;\r\n    height: 100px;\r\n    aspect-ratio: 1;\r\n\r\n    max-width: 200px;\r\n    max-height: 200px;\r\n\r\n    border: 2px solid white;\r\n    background-color: black;\r\n    font-size: 120%;\r\n\r\n    button { text-align: center; border: 0px solid white }\r\n\r\n    button:where([data-pos="tl"]) { border-width: 0px 2px 2px 0px };\r\n    button:where([data-pos="tr"]) { border-width: 2px 2px 0px 0px };\r\n    button:where([data-pos="bl"]) { border-width: 0px 0px 2px 2px };\r\n    button:where([data-pos="br"]) { border-width: 2px 0px 0px 2px };\r\n}\r\n#zm_floater_container:has(#zm_collapse[data-collapsed="true"]) {\r\n    height: 50px;\r\n    \r\n    button:not(#zm_collapse) { display: none; }\r\n}\r\n#canvasDiv:has(#colorSelector[style *= "block"]) #zm_floater_container {\r\n    bottom: 50px;\r\n}\r\n\r\n.zm_corner { border: 2px solid white; }\r\n\r\n#zm_collapse {\r\n    grid-row: 3;\r\n    grid-column: 3;\r\n}\r\n#zm_collapse[data-collapsed="true"] {\r\n    grid-row: 1;\r\n    grid-column: 1;\r\n    border-width: 0px;\r\n}';

  // assets/multisetting.css
  var multisetting_default = '.zm_ms_row {\r\n    display: grid;\r\n    grid-template-columns: 2.2em 1fr;    \r\n}\r\n\r\n.zm_ms_row[data-current="false"] {\r\n    .zm_ms_selbtn { color: transparent }\r\n}\r\n\r\n.zm_ms_selbtn.zm_ms_selbtn:not(#_) {\r\n    height: 100%;\r\n    width: calc(100% - 10px);\r\n\r\n    margin-right: 2px;\r\n    padding: 0px;\r\n\r\n    border: 2px solid var(--theme);\r\n    font-size: 1.5em;\r\n}';

  // assets/ctrl_info.html
  var ctrl_info_default = "<tr>\r\n    <td>Zoom in/out</td>\r\n    <td>\r\n        <kbd>9</kbd>/\r\n        <kbd>0</kbd>\r\n    </td>\r\n</tr>\r\n<tr>\r\n    <td>Pan</td>\r\n    <td>\r\n        <kbd>W</kbd>\r\n        <kbd>A</kbd>\r\n        <kbd>S</kbd>\r\n        <kbd>D</kbd>\r\n    </td>\r\n</tr>\r\n<tr>\r\n    <td>Pan (fast)</td>\r\n    <td>\r\n        <kbd>Shift</kbd> + \r\n        <kbd>W</kbd>\r\n        <kbd>A</kbd>\r\n        <kbd>S</kbd>\r\n        <kbd>D</kbd>\r\n    </td>\r\n</tr>";

  // assets/floater.html
  var floater_default = '<div id="zm_floater_container">\r\n    <button id="zm_floater_u" style="grid-area: 1 / 2;">&uarr;</button>\r\n    <button id="zm_floater_d" style="grid-area: 3 / 2;">&darr;</button>\r\n    <button id="zm_floater_l" style="grid-area: 2 / 1;">&larr;</button>\r\n    <button id="zm_floater_r" style="grid-area: 2 / 3;">&rarr;</button>\r\n    \r\n    <button id="zm_floater_zi" data-pos="tl" style="grid-area: 1 / 1;">+</button>\r\n    <button id="zm_floater_zo" data-pos="bl" style="grid-area: 1 / 3;">-</button>\r\n\r\n    <button id="zm_collapse" data-pos="br">#</button>\r\n    <button id="zm_panmode_sel" data-pos="tr" style="grid-area: 3 / 1;">C</button>\r\n</div>';

  // assets/nlist_spinner.png
  var nlist_spinner_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAYCAYAAADH2bwQAAAAcklEQVQokcWSXQrAIAyDv8oOoPe/49wJzB7coIg/jA2WPhQ1TdOiATsThNmjJ8QV4XjdokIkRHqiEAF2NAgoSw8GlCuD3K3zYEzgFdSQBbA15LaYQN1i9lU+3y16CgDqjSl/MKBoMIk5DyNk46sf9SfhBITwI86iGhy9AAAAAElFTkSuQmCC";

  // assets/spinner.css.ts
  var CSS = `
#betterSettings\\/div\\/zoom\\.js input::-webkit-inner-spin-button,
#betterSettings\\/div\\/zoom\\.js input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 0.75em;
    background: #000 url(${nlist_spinner_default}) no-repeat center center;
    background-size: 100%;
    border-left: 2px solid var(--theme);
    image-rendering: pixelated;
    opacity: 0.8;
}
#betterSettings\\/div\\/zoom\\.js input::-webkit-inner-spin-button:hover,
#betterSettings\\/div\\/zoom\\.js input::-webkit-outer-spin-button:active {
    border-left: 2px solid white;
    opacity: 1;
}
`;
  var spinner_css_default = CSS;

  // src/patcher.ts
  var Patcher = class {
    zoom_data_div;
    floater_div;
    canvas_div;
    settings;
    panmode_sel;
    constructor(settings) {
      this.settings = settings;
      const style_div = document.createElement("style");
      style_div.innerHTML = main_default;
      document.head.appendChild(style_div);
      dependOn("betterSettings.js", () => {
        const style_div2 = document.createElement("style");
        style_div2.innerHTML = numlist_default + multisetting_default + spinner_css_default;
        document.head.appendChild(style_div2);
      });
      this.canvas_div = document.getElementById("canvasDiv");
      this.canvas_div.insertAdjacentHTML("beforeend", floater_default);
      this.floater_div = document.getElementById("zm_floater_container");
      this.panmode_sel = document.getElementById("zm_panmode_sel");
      this.panmode_sel.onclick = () => {
        switch (this.panmode_sel.innerText) {
          case "C":
            this.panmode_sel.innerText = "F";
            break;
          case "F":
            this.panmode_sel.innerText = "U";
            break;
          case "U":
            this.panmode_sel.innerText = "C";
            break;
        }
      };
      const collapse_btn = document.getElementById("zm_collapse");
      collapse_btn.onclick = () => {
        collapse_btn.dataset.collapsed = collapse_btn.dataset.collapsed == "true" ? "false" : "true";
      };
      this.zoom_data_div = document.createElement("div");
      this.zoom_data_div.id = "zm_data_div";
      document.getElementById("logDiv")?.prepend(this.zoom_data_div);
      document.getElementById("controlsTable")?.lastElementChild?.insertAdjacentHTML("beforebegin", ctrl_info_default);
      this.update_from_settings();
      runAfterLoad(() => {
        const cb = this.update_from_settings.bind(this);
        for (const elem of document.querySelectorAll("#betterSettings\\/div\\/zoom\\.js span.setting-span input")) {
          elem.addEventListener(elem.classList.contains("toggleInput") ? "click" : "change", cb);
        }
      });
    }
    update_from_settings() {
      this.floater_div.style.display = this.settings.show_floater.value ? "grid" : "none";
      this.canvas_div.style.backgroundColor = this.settings.canvas_bkg.value ?? "#252525";
    }
  };

  // src/main.ts
  dependOn("betterSettings.js", () => {
    const on_change = { cb: () => {
    } };
    const settings_manager = new CustomSettingsManager(on_change);
    runAfterLoad(() => {
      const patcher = new Patcher(settings_manager);
      const handler = new Handler(settings_manager, patcher);
    });
  }, true);
})();
