// God Human mod for Sandboxels
// Adds a "god_human" element (Life category) that:
//  - can't be killed by heat, cold, explosions, breaking, or Nothing There phase 3 projectiles
//  - destroys Nothing There phase 3 mob pixels within 2 pixels of it
//  - walks with a slow, random shuffle


runAfterLoad(function () {
 try {
  if (window.__godHumanMod) return;
  window.__godHumanMod = true;

  if (!elements.head || !elements.body) {
    console.error("God Human mod: head/body elements not found.");
    return;
  }

  const isGod = p => p && (p.element === "god_head" || p.element === "god_body");
  let nextId = Math.max(...Object.values(elements).map(e => e.id || 0)) + 1;

  // ---- Block break / delete / change for god humans only ----
  const _bp = breakPixel;
  breakPixel = function (pixel, c, d) {
    if (isGod(pixel)) return;
    return _bp(pixel, c, d);
  };

  const _dp = deletePixel;
  deletePixel = function (x, y) {
    const p = pixelMap[x]?.[y];
    if (isGod(p)) {
      // let the eraser tool still work
      const erasing = typeof currentElement !== "undefined" && currentElement === "erase"
                      && typeof mouseIsDown !== "undefined" && mouseIsDown;
      if (!erasing) return;
    }
    return _dp(x, y);
  };

  const _cp = changePixel;
  changePixel = function (pixel, el, c) {
    if (isGod(pixel)) return false;
    return _cp(pixel, el, c);
  };

  // ---- Helpers ----
  const safe = p => { p.burning = false; p.temp = 20; p.del = false; delete p.dead; };

  // Break any Nothing There pixel close to the god human
  const attack = pixel => {
    for (let dx = -2; dx <= 2; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        const t = pixelMap[pixel.x + dx]?.[pixel.y + dy];
        if (t && t.element && t.element.startsWith("nothing_there")) {
          const el = t.element;
          try { breakPixel(t, false, false); } catch (e) {}
          if (pixelMap[t.x]?.[t.y] === t && t.element === el) _dp(t.x, t.y);
        }
      }
    }
  };

  const base = (src, name) => {
    const e = Object.assign({}, elements[src]);
    delete e.tempHigh; delete e.stateHigh; delete e.tempLow; delete e.stateLow;
    delete e.breakInto; delete e.reactions; delete e.onPlace; delete e.behavior;
    e.burn = 0; e.burnTime = 0; e.hardness = 1; e.burning = false;
    e.id = nextId++; e.hidden = true;
    elements[name] = e;
    return e;
  };

  // ---- God head ----
  const head = base("head", "god_head");
  head.tick = function (pixel) {
    safe(pixel);
    attack(pixel);
    const below = pixelMap[pixel.x]?.[pixel.y + 1];
    if (!(below && below.element === "god_body")) tryMove(pixel, pixel.x, pixel.y + 1);
  };

  // ---- God body ----
  const body = base("body", "god_body");
  body.tick = function (pixel) {
    safe(pixel);
    attack(pixel);
    const h = pixelMap[pixel.x]?.[pixel.y - 1];
    const hasHead = h && h.element === "god_head";
    if (pixel.dir === undefined) pixel.dir = Math.random() < 0.5 ? -1 : 1;

    // gravity (head follows)
    if (isEmpty(pixel.x, pixel.y + 1)) {
      const ox = pixel.x, oy = pixel.y;
      if (tryMove(pixel, ox, oy + 1) && hasHead && isEmpty(ox, oy)) movePixel(h, ox, oy);
      return;
    }

    // walk: about 10% of ticks
    if (Math.random() < 0.1) {
      const x = pixel.x, y = pixel.y, dir = pixel.dir;
      const step = (dx, dy) => {
        if (isEmpty(x + dx, y + dy) && (!hasHead || isEmpty(x + dx, y + dy - 1))) {
          movePixel(pixel, x + dx, y + dy);
          if (hasHead) movePixel(h, x + dx, y + dy - 1);
          return true;
        }
        return false;
      };
      const moves = [[dir, 0], [dir, -1]];
      while (moves.length) {
        const m = moves.splice(Math.floor(Math.random() * moves.length), 1)[0];
        if (step(m[0], m[1])) break;
      }
      if (Math.random() < 0.15) pixel.dir *= -1;
    }
  };

  // ---- The element you place ----
  const g = Object.assign({}, elements.head);
  delete g.tempHigh; delete g.stateHigh; delete g.tempLow; delete g.stateLow;
  delete g.breakInto; delete g.reactions; delete g.onPlace; delete g.behavior;
  g.id = nextId++; g.hidden = false; g.category = "life"; g.burn = 0; g.hardness = 1;
  g.tick = function (pixel) {
    const dir = Math.random() < 0.5 ? -1 : 1;
    if (isEmpty(pixel.x, pixel.y + 1)) {
      createPixel("god_body", pixel.x, pixel.y + 1);
      pixelMap[pixel.x][pixel.y + 1].dir = dir;
      pixel.element = "god_head"; pixel.color = pixelColorPick(pixel);
    } else if (isEmpty(pixel.x, pixel.y - 1)) {
      createPixel("god_head", pixel.x, pixel.y - 1);
      pixel.element = "god_body"; pixel.dir = dir; pixel.color = pixelColorPick(pixel);
    } else { _dp(pixel.x, pixel.y); }
  };
  elements.god_human = g;

  // Nothing There projectiles skip the god human (needs mobs.js loaded)
  if (typeof nothingThereBulletExcludedElements !== "undefined") {
    nothingThereBulletExcludedElements.push("god_head", "god_body", "god_human");
  } else {
    console.warn("God Human mod: mobs.js not found, projectile immunity not applied.");
  }

  // Elements added after the game's startup need a colorObject for the button
  const ensureColor = e => {
    if (!e || e.colorObject) return;
    const cols = Array.isArray(e.color) ? e.color : [e.color];
    e.colorObject = cols.map(c => {
      if (typeof c !== "string") return c;
      return c.startsWith("rgb") ? rgbStringToObject(c) : hexToRGB(c);
    });
  };
  try {
    ensureColor(elements.god_head);
    ensureColor(elements.god_body);
    ensureColor(elements.god_human);
    if (typeof createElementButton === "function") createElementButton("god_human");
  } catch (err) {
    console.warn("God Human mod: could not add button, use currentElement = 'god_human'", err);
  }
  console.log("God Human mod loaded");
 } catch (err) {
  console.error("God Human mod error (game will still load):", err);
 }
});
