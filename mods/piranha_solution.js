// ============================================================
//  piranha_solution.js — мод для Sandboxels (sandboxels.r74n.com)
//  Добавляет: перекись водорода, серную кислоту и пиранью-смесь.
//
//  Химия (упрощённая, игровая):
//    hydrogen_peroxide + sulfuric_acid + нагрев  -> piranha_solution
//    piranha_solution  + углеродные материалы    -> carbon_dioxide (+ вода)
//    piranha_solution со временем сама распадается (нестабильна, экзотермична)
//
//  Установка: Mods -> вставить URL до этого файла (или имя файла,
//  если он лежит в папке mods репозитория) -> Enter -> обновить страницу.
// ============================================================

runAfterLoad(function () {

  // ---------- 1. ПЕРЕКИСЬ ВОДОРОДА (H2O2) ----------
  elements.hydrogen_peroxide = {
    name: "Hydrogen Peroxide",
    color: "#dff2f0",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1450,
    viscosity: 1200,
    temp: 20,
    tempHigh: 150,
    stateHigh: "steam",
    conduct: 0.3,
    reactions: {
      // Разлагается сама по себе при контакте с "катализаторами" на воду + кислород,
      // если такие элементы есть в игре (manganese_dioxide часто присутствует в модах химии)
      "manganese_dioxide": { elem1: "water", elem2: null, tempMin: -100 },
      "fire": { elem1: "oxygen", elem2: "steam", chance: 0.4 }
    },
    tick: function (pixel) {
      // Медленный самопроизвольный распад при нагреве (H2O2 нестабильна)
      if (pixel.temp > 60 && Math.random() < 0.01) {
        changePixel(pixel, "water");
      }
    },
    desc: "Нестабильный окислитель. При нагреве и контакте с серной кислотой образует пиранью-смесь."
  };

  // ---------- 2. СЕРНАЯ КИСЛОТА (H2SO4) ----------
  // Если в базовой игре или другом моде уже есть sulfuric_acid — этот блок его переопределит.
  // При конфликте переименуйте id, например sulfuric_acid_custom.
  elements.sulfuric_acid = elements.sulfuric_acid || {
    name: "Sulfuric Acid",
    color: "#fff6a3",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1840,
    viscosity: 2600,
    temp: 20,
    tempHigh: 337,
    stateHigh: "smoke",
    conduct: 0.5,
    reactions: {
      "water": { elem1: null, elem2: null, chance: 0.02 }, // экзотермическое разбавление
    },
    tick: function (pixel) {
      if (pixel.temp !== undefined) {
        // слегка нагревается при разбавлении водой рядом (эффект экзотермии) — необязательная деталь
      }
    },
    desc: "Сильная минеральная кислота. Вместе с перекисью водорода при нагреве образует пиранью-смесь."
  };

  // ---------- 3. ПИРАНЬЯ-СМЕСЬ (piranha solution) ----------
  elements.piranha_solution = {
    name: "Piranha Solution",
    color: "#ff8a00",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1700,
    viscosity: 1800,
    temp: 90,          // смесь горячая — реакция экзотермична
    tempHigh: 200,
    stateHigh: "smoke",
    conduct: 0.4,
    reactions: {
      // Сама смесь нестабильна и постепенно "выдыхается" в воду с выделением тепла/газа
      "water": { elem1: "water", elem2: "water", chance: 0.05 }
    },
    tick: function (pixel) {
      // Самопроизвольный распад смеси со временем (пиранья быстро теряет активность)
      if (Math.random() < 0.004) {
        changePixel(pixel, "water");
      }
    },
    desc: "Крайне агрессивная смесь H2O2 и H2SO4. Растворяет углеродсодержащие материалы, выделяя CO2."
  };

  // ---------- 4. РЕАКЦИЯ ОБРАЗОВАНИЯ ПИРАНЬИ ----------
  // Перекись + серная кислота + нагрев -> пиранья (обе клетки становятся ей)
  elements.hydrogen_peroxide.reactions["sulfuric_acid"] = {
    elem1: "piranha_solution",
    elem2: "piranha_solution",
    tempMin: 40,     // нужен подогрев, иначе реакция не идёт
    chance: 0.35
  };
  elements.sulfuric_acid.reactions["hydrogen_peroxide"] = {
    elem1: "piranha_solution",
    elem2: "piranha_solution",
    tempMin: 40,
    chance: 0.35
  };

  // ---------- 5. РАСТВОРЕНИЕ УГЛЕРОДНЫХ МАТЕРИАЛОВ ПИРАНЬЕЙ ----------
  // Список ID углеродсодержащих элементов из базовой игры (можно дополнять).
  var carbonElements = [
    "wood", "plank", "log", "coal", "charcoal", "oil", "gas", "plastic",
    "rubber", "paper", "cardboard", "cloth", "cotton", "rope", "sugar",
    "flesh", "meat", "cooked_meat", "skin", "leaf", "plant", "vine",
    "grass", "seed", "wax", "candle", "gunpowder", "leather", "fur",
    "hair", "tar", "asphalt", "bark", "root", "moss", "algae", "yeast",
    "bread", "dough", "chocolate", "coffee", "tea_leaf", "tobacco"
  ];

  carbonElements.forEach(function (id) {
    if (elements[id]) {
      if (!elements[id].reactions) elements[id].reactions = {};
      elements[id].reactions["piranha_solution"] = {
        elem1: "carbon_dioxide",   // растворяемый материал становится CO2
        elem2: "piranha_solution", // немного "смеси" сохраняется рядом
        chance: 0.15
      };
    }
  });

  console.log("[piranha_solution.js] Мод загружен: hydrogen_peroxide, sulfuric_acid, piranha_solution");

});
