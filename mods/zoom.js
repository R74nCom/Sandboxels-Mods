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
        elem.classList.add("settingsInput");
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
    pan_keys;
    show_pos;
    show_floater;
    floater_scale;
    pan_zeroing_en;
    zoom_zeroing_en;
    reset_on_reset;
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
      this.floater_scale = new Setting(
        "Floater scale",
        "floater_scale",
        settingType.NUMBER,
        false,
        1,
        "The floater scale",
        validator
      );
      this.show_pos = new Setting(
        "Show position overlay",
        "show_pos_ovl",
        settingType.BOOLEAN,
        false,
        true,
        "Whether to show the zoom/pan overlay or not",
        validator
      );
      this.pan_keys = new SelectSetting(
        "Panning keys",
        "pan_keys",
        [
          ["wasd", "WASD"],
          ["ijkl", "IJKL"],
          ["", "<none>"]
        ],
        false,
        "wasd"
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
      this.reset_on_reset = new Setting(
        "Reset zoom on reset",
        "en_ror",
        settingType.BOOLEAN,
        false,
        true,
        "Resets zoom when the canvas is reset. Required to persist zoom after undo/redo",
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
        mouse_speed: new Setting(
          "Scroll zoom speed",
          "scroll_zoom_speed",
          settingType.NUMBER,
          false,
          1,
          "Speed for zooming with the scroll wheel",
          validator
        ),
        invert_scroll: new Setting(
          "Invert scroll",
          "invert_scroll",
          settingType.BOOLEAN,
          false,
          false,
          "Whether to invert scroll or not",
          validator
        ),
        kbd_speed: new Setting(
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
        this.canvas_bkg,
        this.show_pos,
        this.reset_on_reset
      );
      settings_tab.registerSettings(
        "Floater",
        this.show_floater,
        this.floater_scale
      );
      settings_tab.registerSettings(
        "Keybinds (requires reset)",
        this.pan_keys,
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
      window.getMousePos = (_, evt) => {
        if (evt.touches) {
          evt.preventDefault();
          evt = evt.touches[0];
          isMobile = true;
        }
        const clx = evt.clientX;
        const cly = evt.clientY;
        return this.mouse_to_world(clx, cly);
      };
      const wheel_handler = (e) => {
        e.preventDefault();
        if (e.shiftKey) {
          const speed = this.settings.unl_zoom.settings.mouse_speed.value * (this.settings.unl_zoom.settings.invert_scroll.value ? -1 : 1);
          const new_level = this.zoom_level + e.deltaY * speed / 1e3;
          const max = this.settings.unl_zoom.settings.max.value;
          const min = this.settings.unl_zoom.settings.min.value;
          if (new_level > max) {
            this.zoom_level = max;
          } else if (new_level < min) {
            this.zoom_level = min;
          } else {
            this.zoom_level = parseFloat(new_level.toPrecision(3));
          }
          this.update();
          return;
        }
      };
      if (this.settings.zoom.value === 1) {
        window.wheelHandle = wheel_handler;
        this.patcher.canvas_div.addEventListener("wheel", wheel_handler);
      }
      runAfterReset(() => {
        if (this.settings.reset_on_reset.value) {
          this.zoom_level = 1;
          this.zoom_panning = [0, 0];
          this.update();
        }
      });
    }
    mouse_to_world(x, y) {
      const rect = canvas.getBoundingClientRect();
      const x_scaled = (x - rect.left) / this.scale();
      const y_scaled = (y - rect.top) / this.scale();
      return {
        x: Math.floor(x_scaled / canvas.clientWidth * (width + 1)),
        y: Math.floor(y_scaled / canvas.clientHeight * (height + 1))
      };
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
        const speed = settings.kbd_speed.value;
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
      keybinds["9"] = () => this.handle_zoom("in");
      keybinds["0"] = () => this.handle_zoom("out");
      if (this.settings.pan_keys.value !== "") {
        const pan_keys = this.settings.pan_keys.value;
        const pan_keys_upper = pan_keys.toUpperCase();
        keybinds[pan_keys[0]] = (ev) => this.handle_pan("up", this.kbd_speed_noshift(ev));
        keybinds[pan_keys[1]] = (ev) => this.handle_pan("left", this.kbd_speed_noshift(ev));
        keybinds[pan_keys[2]] = (ev) => this.handle_pan("down", this.kbd_speed_noshift(ev));
        keybinds[pan_keys[3]] = (ev) => this.handle_pan("right", this.kbd_speed_noshift(ev));
        keybinds[pan_keys_upper[0]] = () => this.handle_pan("up", this.settings.fpan_speed.value);
        keybinds[pan_keys_upper[1]] = () => this.handle_pan("left", this.settings.fpan_speed.value);
        keybinds[pan_keys_upper[2]] = () => this.handle_pan("down", this.settings.fpan_speed.value);
        keybinds[pan_keys_upper[3]] = () => this.handle_pan("right", this.settings.fpan_speed.value);
      }
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
  var numlist_default = "#settingsMenu .zm_nml_btn_container {\n    display: flex;\n    gap: 0.5em;\n\n    button {\n        display: inline;\n        width: 0.7em;\n        font-size: 2em;\n        padding: 0;\n        margin: 0;\n        filter: brightness(0.85);\n\n        &:hover {\n            filter: brightness(1)\n        }\n    }\n}\n#settingsMenu .zm_nml_icontainer { align-self: center; flex-wrap: wrap; }\n#settingsMenu .zm_nml_setting { display: grid; grid-template-columns: 7em 1fr;}\n\n#settingsMenu .zm_nml_setting span {\n    color: #fff;\n\n    input {\n        width: 2.5em;\n        margin-right: 4px;\n        margin-bottom: 4px;\n    }\n    \n    input:focus {\n        outline: none;\n        box-shadow: none;\n        border-color: white;\n    }\n}\n";

  // assets/main.css
  var main_default = '#zm_data_div {\n    margin-bottom: 10px;\n}\n\n#canvasDiv {\n    overflow: hidden;\n    background-color: var(--opac-85);\n}\n\n#zm_floater_container:has(#zm_collapse[data-collapsed="true"]) {\n    width: calc(33px * var(--zm-floater-scale));\n    button:not(#zm_collapse) {\n        display: none;\n    }\n}\n\n#colorSelector {\n    z-index: 1;\n    right: 5px;\n}\n\n#zm_floater_container {\n    position: absolute;\n    display: grid;\n    right: 5px;\n    bottom: 5px;\n    width: calc(100px * var(--zm-floater-scale));\n    max-width: calc(200px * var(--zm-floater-scale));\n    max-height: calc(200px * var(--zm-floater-scale));\n    aspect-ratio: 1;\n    border: 2px solid white;\n    background-color: black;\n    font-size: calc(120% * var(--zm-floater-scale));\n\n    button {\n        text-align: center;\n        border: 0px solid white;\n    }\n\n    button:where([data-pos="tl"]) { border-width: 0px 2px 2px 0px; }\n    button:where([data-pos="tr"]) { border-width: 2px 2px 0px 0px; }\n    button:where([data-pos="bl"]) { border-width: 0px 0px 2px 2px; }\n    button:where([data-pos="br"]) { border-width: 2px 0px 0px 2px; }\n}\n\n#canvasDiv:has(#colorSelector[style *= "block"]) #zm_floater_container {\n    bottom: 50px;\n}\n\n.zm_corner { border: 2px solid white; }\n\n#zm_collapse {\n    grid-row: 3;\n    grid-column: 3;\n\n    &[data-collapsed="true"] {\n        grid-row: 1;\n        grid-column: 1;\n        aspect-ratio: 1;\n        border-width: 0px;\n    }\n}\n\n#betterSettings\\/div\\/zoom\\.js .setting-span {\n    display: grid;\n    grid-template-columns: 230px 1fr;\n    &:has(> .toggleInput:first-child) {\n        display: grid;\n    }\n    input[type="color"] {\n        width: 100%;\n        border: none;\n    }\n    .toggleInput {\n        padding-right: 10%;\n        clip-path: none;\n        &:hover {\n            transform: initial;\n        }\n    }\n}\n\n#betterSettings\\/div\\/zoom\\.js {\n    .betterSettings-categoryTitle {\n        display: block;\n        margin-top: 0.5em;\n        margin-bottom: 0.3em;\n    }\n    .zm_multisetting .setting-span {\n        grid-template-columns: 210px 1fr;\n    }\n}\n';

  // assets/multisetting.css
  var multisetting_default = '.zm_multisetting {\n    margin-top: 0.75em;\n}\n.zm_ms_row {\n    display: grid;\n    grid-template-columns: 1.7em 1fr;\n}\n\n.zm_ms_row[data-current="true"] {\n    .zm_ms_selbtn {\n        background: var(--theme);\n    }\n}\n\n.zm_ms_row[data-current="false"] .setting-span {\n    opacity: 0.5;\n}\n\n.zm_ms_selbtn.zm_ms_selbtn:not(#_) {\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n    width: calc(100% - 0.5em);\n    margin-right: 2px;\n    padding: 0px;\n    border: 2px solid var(--theme);\n    font-size: 1.5em;\n}\n\n.zm_ms_selbtn:active,\n.zm_ms_selbtn:active:hover {\n    transform: initial;\n}\n';

  // assets/media.css
  var media_default = '@media (pointer=coarse) {\n    #zm_floater_container#zm_floater_container {\n        width: calc(40% * var(--zm-floater-scale));\n        height: auto;\n\n        &:has(#zm_collapse[data-collapsed="true"]) {\n            width: calc(40% / 3 * var(--zm-floater-scale));\n        }\n    }\n}\n\n@media (pointer:coarse) and (orientation:landscape) {\n    #zm_floater_container#zm_floater_container {\n        width: auto;\n        top: 5px;\n    \n        &:has(#zm_collapse[data-collapsed="true"]) {\n            width: calc(40% / 3 * var(--zm-floater-scale));\n        }\n    }\n}\n\n@media not (pointer: coarse) {\n    #zm_floater_container:has(#zm_collapse[data-collapsed="true"]) {\n        width: calc(33px * var(--zm-floater-scale));\n    }\n}\n\n';

  // assets/ctrl_info.html
  var ctrl_info_default = "<tr>\n    <td>Zoom in/out</td>\n    <td>\n        <kbd>9</kbd>/\n        <kbd>0</kbd>\n    </td>\n</tr>\n<tr>\n    <td>Pan</td>\n    <td>\n        <kbd>W</kbd>\n        <kbd>A</kbd>\n        <kbd>S</kbd>\n        <kbd>D</kbd>\n    </td>\n</tr>\n<tr>\n    <td>Pan (fast)</td>\n    <td>\n        <kbd>Shift</kbd> + \n        <kbd>W</kbd>\n        <kbd>A</kbd>\n        <kbd>S</kbd>\n        <kbd>D</kbd>\n    </td>\n</tr>";

  // assets/floater.html
  var floater_default = '<div id="zm_floater_container">\n    <button id="zm_floater_u" style="grid-area: 1 / 2;">&uarr;</button>\n    <button id="zm_floater_d" style="grid-area: 3 / 2;">&darr;</button>\n    <button id="zm_floater_l" style="grid-area: 2 / 1;">&larr;</button>\n    <button id="zm_floater_r" style="grid-area: 2 / 3;">&rarr;</button>\n    \n    <button id="zm_floater_zi" data-pos="tl" style="grid-area: 1 / 1;">+</button>\n    <button id="zm_floater_zo" data-pos="bl" style="grid-area: 1 / 3;">-</button>\n\n    <button id="zm_collapse" data-pos="br">#</button>\n    <button id="zm_panmode_sel" data-pos="tr" style="grid-area: 3 / 1;">C</button>\n</div>';

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
      style_div.innerHTML = main_default + media_default;
      document.head.appendChild(style_div);
      dependOn("betterSettings.js", () => {
        const style_div2 = document.createElement("style");
        style_div2.innerHTML = numlist_default + multisetting_default;
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
        document.querySelectorAll(`#betterSettings\\/div\\/zoom\\.js input[id^=betterSettings]`).forEach((x) => x.classList.add("settingsInput"));
      });
    }
    update_from_settings() {
      this.floater_div.style.display = this.settings.show_floater.value ? "grid" : "none";
      this.zoom_data_div.style.display = this.settings.show_pos.value ? "block" : "none";
      this.canvas_div.style.backgroundColor = this.settings.canvas_bkg.value ?? "#252525";
      document.documentElement.style.setProperty(
        "--zm-floater-scale",
        this.settings.floater_scale.value.toString()
      );
    }
  };

  // src/worldedit_interop.ts
  function patch_worldedit(handler) {
    mousePosToWorldPos = ({ x, y }) => handler.mouse_to_world(x, y);
  }

  // src/main.ts
  dependOn("betterSettings.js", () => {
    const on_change = { cb: () => {
    } };
    const settings_manager = new CustomSettingsManager(on_change);
    runAfterLoad(() => {
      const patcher = new Patcher(settings_manager);
      const handler = new Handler(settings_manager, patcher);
      dependOn("worldEdit.js", () => patch_worldedit(handler));
      on_change.cb = () => patcher.update_from_settings();
      const q = "#betterSettings\\/div\\/zoom\\.jsinput[id^=betterSettings],select[id^=betterSettings]";
      document.querySelectorAll(q).forEach((x) => x.classList.add("settingsInput"));
    });
  }, true);
})();
//! Bandaid fix to keep the UI normal looking
