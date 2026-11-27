// ============================================================================
//  The Locust  -  a Sandboxels mod
//  Based on "The Locust" from T.O.E (The Organate Enterprise) by Doctor Nowhere
//
//  Adds (category "T.O.E"):
//    locust       - a tall, lanky creature built from 6 stacked pixels.
//                   It stares at living things from far away, creeps closer,
//                   then SPRINTS once you get near. It cracks glass that
//                   blocks its way, and after feeding it ignores prey for a while.
//    hollow_body  - what it leaves behind: the victim looks untouched,
//                   but there's nothing inside.
//    tv_static    - short-lived TV static that puffs out when it appears/feeds.
//
//  Tweak the numbers in the SETTINGS block below to change how it behaves.
// ============================================================================

(function () {
  "use strict";

  // ------------------------------ SETTINGS ---------------------------------
  const CATEGORY     = "T.O.E";
  const SIGHT        = 30;   // how far (in pixels) it can spot prey
  const SPRINT_RANGE = 12;   // closer than this -> it sprints
  const SPRINT_DELAY = 2;    // ticks per step while sprinting (lower = faster)
  const CREEP_DELAY  = 24;   // ticks per step while slowly creeping closer
  const REACH        = 2;    // how far its arms reach sideways
  const FULL_TIME    = 600;  // ticks it ignores prey after a meal
  const WANDER_CHANCE = 0.02; // idle shuffling

  // Edit freely. Names that don't exist in your game are ignored.
  const PREY = [
    "human", "bird", "fish", "frog", "rat", "penguin", "tadpole",
    "ant", "bee", "fly", "firefly", "worm", "snail", "slug",
    "stink_bug", "butterfly"
  ];

  // Things it will crack open when they block its path (the screen-breaking bit)
  const SMASHABLE = ["glass", "stained_glass"];

  // From the feet up. The base pixel ("locust") is the feet.
  const SHAPE = [
    "locust_limb", "locust_limb",   // long legs
    "locust_plate",                 // pale pink metal chest plate
    "locust_limb",                  // neck
    "locust_head"
  ];

  // ------------------------------ HELPERS ----------------------------------
  const SEG_SET  = new Set(SHAPE);
  const PART_SET = new Set(["locust"].concat(SHAPE));

  let preySet = null;
  function isPrey(name) {
    if (!preySet) preySet = new Set(PREY.filter(function (n) { return elements[n]; }));
    return preySet.has(name);
  }

  // pixel at (x,y) or null
  function at(x, y) {
    const c = pixelMap[x];
    return c ? (c[y] || null) : null;
  }

  const move = (typeof movePixel === "function") ? movePixel : function (p, x, y) {
    pixelMap[p.x][p.y] = undefined;
    pixelMap[x][y] = p;
    p.x = x;
    p.y = y;
  };

  // The base pixel plus every body segment stacked directly above it
  function column(base) {
    const col = [base];
    for (let i = 1; i <= SHAPE.length; i++) {
      const p = at(base.x, base.y - i);
      if (p && SEG_SET.has(p.element)) col.push(p); else break;
    }
    return col;
  }

  // Move the whole creature by (dx,dy), all-or-nothing
  function moveColumn(col, dx, dy) {
    for (const c of col) {
      const tx = c.x + dx, ty = c.y + dy;
      if (outOfBounds(tx, ty)) return false;
      const o = at(tx, ty);
      if (o && col.indexOf(o) === -1) return false;
    }
    const order = dy < 0 ? col.slice().reverse() : col; // top first when rising
    for (const c of order) move(c, c.x + dx, c.y + dy);
    return true;
  }

  // One step sideways; can hop up small ledges; cracks glass in the way
  function step(p, col, dir) {
    const hops = [0, -1, -2];
    for (let i = 0; i < hops.length; i++) {
      if (moveColumn(col, dir, hops[i])) return true;
    }
    for (const c of col) {
      const o = at(c.x + dir, c.y);
      if (o && SMASHABLE.indexOf(o.element) !== -1) {
        if (elements.glass_shard) changePixel(o, "glass_shard");
        else deletePixel(o.x, o.y);
      }
    }
    return false;
  }

  function burst(x, y, n) {
    for (let i = 0; i < n; i++) {
      const bx = x + Math.floor(Math.random() * 5) - 2;
      const by = y + Math.floor(Math.random() * 5) - 2;
      if (isEmpty(bx, by)) createPixel("tv_static", bx, by);
    }
  }

  function hollow(v) {
    const was = v.element, color = v.color;
    changePixel(v, "hollow_body");
    v.color = color;   // looks exactly the same as before...
    v.was = was;       // ...but nobody's home
  }

  function feed(p, victim) {
    const x = victim.x, y = victim.y;
    hollow(victim);
    const above = at(x, y - 1);
    if (above && above.element === "head") hollow(above); // human heads
    p.full = FULL_TIME;
    p.fed++;
    p.hasT = false;
    burst(x, y, 6);
    if (typeof logMessage === "function") logMessage("The body appeared untouched.");
  }

  function grab(p, col) {
    for (let dx = -REACH; dx <= REACH; dx++) {
      if (dx === 0) continue;
      for (let i = 0; i < col.length; i++) {
        const o = at(p.x + dx, p.y - i);
        if (o && isPrey(o.element)) { feed(p, o); return true; }
      }
    }
    return false;
  }

  // Find the nearest prey (horizontally) within sight
  function look(p) {
    p.hasT = false;
    if (p.full > 0) return;
    let best = Infinity;
    for (let dx = -SIGHT; dx <= SIGHT; dx++) {
      const ax = Math.abs(dx);
      if (ax >= best) continue;
      for (let dy = -(SHAPE.length + 4); dy <= 3; dy++) {
        const o = at(p.x + dx, p.y + dy);
        if (o && isPrey(o.element)) {
          best = ax;
          p.tx = dx;
          p.hasT = true;
          break;
        }
      }
    }
  }

  function build(p) {
    p.built = true;
    p.dir = Math.random() < 0.5 ? 1 : -1;
    for (let i = 0; i < SHAPE.length; i++) {
      const y = p.y - 1 - i;
      if (!isEmpty(p.x, y)) break;
      createPixel(SHAPE[i], p.x, y);
    }
    burst(p.x, p.y - 2, 5);
  }

  // ------------------------------ BEHAVIOUR --------------------------------
  function locustTick(p) {
    if (!p.built) { build(p); return; }

    const col = column(p);

    // gravity
    if (isEmpty(p.x, p.y + 1)) { moveColumn(col, 0, 1); return; }

    if (p.full > 0) p.full--;
    if (p.cd > 0) p.cd--;

    if (--p.scan <= 0) { p.scan = 5; look(p); }

    const hunting = p.hasT && p.full <= 0;

    // feeding
    if (hunting && Math.abs(p.tx) <= REACH + 1 && grab(p, col)) return;

    if (hunting) {
      if (p.tx !== 0) p.dir = p.tx > 0 ? 1 : -1;
      if (p.cd <= 0) {
        const sprinting = Math.abs(p.tx) <= SPRINT_RANGE;
        if (step(p, col, p.dir)) p.tx -= p.dir;
        p.cd = sprinting ? SPRINT_DELAY : CREEP_DELAY;
      }
    } else if (Math.random() < WANDER_CHANCE) {
      if (Math.random() < 0.15) p.dir = -p.dir;
      step(p, col, p.dir);
    }
  }

  // Body segments fall apart into static if the creature is broken
  function partTick(p) {
    const below = at(p.x, p.y + 1);
    if (!below || !PART_SET.has(below.element)) changePixel(p, "tv_static");
  }

  // ------------------------------ ELEMENTS ---------------------------------
  const DARK  = ["#2a2a33", "#24242c", "#30303a", "#2a2a33", "#5a2e3b"]; // last one = a stray wire
  const PLATE = ["#d9a7ad", "#cf9aa2", "#e3b6ba"];
  const HEAD  = ["#3a3a46", "#34343f"];

  function part(color) {
    return {
      color: color,
      behavior: behaviors.WALL,
      category: CATEGORY,
      state: "solid",
      movable: false,
      hidden: true,
      canPlace: false,
      density: 1500,
      tempHigh: 800,
      stateHigh: "ash",
      tick: partTick
    };
  }

  elements.locust = {
    color: DARK,
    behavior: behaviors.WALL,
    category: CATEGORY,
    state: "solid",
    movable: false,
    maxSize: 1,
    density: 1500,
    tempHigh: 800,
    stateHigh: "ash",
    properties: { built: false, dir: 1, cd: 0, scan: 0, full: 0, hasT: false, tx: 0, fed: 0 },
    tick: locustTick,
    hoverStat: function (p) {
      return p.full > 0 ? "full" : (p.hasT ? "watching" : "hungry");
    }
  };

  elements.locust_limb  = part(DARK);
  elements.locust_plate = part(PLATE);
  elements.locust_head  = part(HEAD);

  elements.hollow_body = {
    color: ["#e5c9b5", "#dbbba5", "#d2b09a"],
    behavior: behaviors.STURDYPOWDER || behaviors.POWDER,
    category: CATEGORY,
    state: "solid",
    density: 1000,
    burn: 20,
    burnTime: 150,
    burnInto: "ash",
    tempHigh: 400,
    stateHigh: "ash",
    hoverStat: function (p) { return p.was ? "was: " + p.was : "no one's home"; }
  };

  elements.tv_static = {
    color: ["#ffffff", "#9a9a9a", "#505050", "#d0d0d0"],
    category: CATEGORY,
    state: "gas",
    density: 1,
    tick: function (p) {
      if (p.life === undefined) p.life = 20 + Math.floor(Math.random() * 30);
      if (--p.life <= 0) { deletePixel(p.x, p.y); return; }
      const g = 60 + Math.floor(Math.random() * 196);
      p.color = "rgb(" + g + "," + g + "," + g + ")";
      tryMove(p, p.x + Math.floor(Math.random() * 3) - 1, p.y + Math.floor(Math.random() * 3) - 1);
    }
  };
})();
