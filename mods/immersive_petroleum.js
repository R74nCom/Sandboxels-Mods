// ============================================================================
// INDUSTRIAL PETROLEUM MOD FOR SANDBOXELS (STEAM ID: 3664820)
// ============================================================================

// --- ШАГ 1: СОЗДАНИЕ НОВОЙ КАТЕГОРИИ В МЕНЮ ---
runAfterLoad(function() {
    if (window.categories) {
        categories.engineering = {
            name: "Инженерные машины",
            id: "engineering"
        };
    }
});

// --- ШАГ 2: ТВЕРДЫЕ ТЕЛА, КАТАЛИЗАТОРЫ И ИНЖЕНЕРНЫЕ МАШИНЫ ---

// Обновленный промышленный бур (Oil Well)
elements.oil_well = {
    color: "#4a5759",
    // Используем кастомную матрицу WALL, чтобы пиксель стоял на месте,
    // но при этом корректно участвовал в циклах симуляции проводников
    behavior: behaviors.WALL, 
    category: "engineering",
    desc: "Промышленный бур. Подайте на него электричество, чтобы он начал добывать нефть из-под себя.",
    state: "solid",
    conduct: 1, // Включаем стопроцентную проводимость тока
    hardToBreak: true,
};

// Исправленный скрипт активации бура
elements.oil_well.tick = function(pixel) {
    // Проверяем наличие заряда в текущем пикселе
    if (pixel.charge && pixel.charge > 0) {
        let x = pixel.x;
        let y = pixel.y;
        
        // Проверяем, свободна ли ячейка строго ПОД буром (y + 1)
        if (isEmpty(x, y + 1)) {
            createPixel("oil", x, y + 1); // Бурим и спавним оригинальную нефть!
        }
    }
};


// Сера — побочный продукт переработки
elements.sulfur_powder = {
    color: "#e6df67",
    behavior: behaviors.POWDER,
    category: "solids",
    desc: "Твердый осадок в виде серного порошка, выделяемый при переработке нефти.",
    state: "solid",
    burn: 40,
    burnTime: 200,
};

// Платина (Катализатор)
elements.platinum = {
    color: "#e5e9ec",
    behavior: behaviors.WALL,
    category: "solids",
    desc: "Благородный металл. Катализатор для мгновенной очистки нефти.",
    state: "solid",
};

// Асфальт
elements.asphalt = {
    color: "#242424",
    behavior: behaviors.WALL,
    category: "solids",
    desc: "Прочное дорожное покрытие.",
    state: "solid",
    tempHigh: 150,
    stateHigh: "fuel_oil", // Плавится обратно в мазут/fuel oil
};


// --- ШАГ 3: ЖИДКИЕ ТОПЛИВНЫЕ ПРОДУКТЫ (ПЕРЕИМЕНОВАН КУСОК MAZUT -> FUEL OIL) ---

// Fuel Oil (Мазут) — тяжелый остаток
elements.fuel_oil = {
    color: "#1a1105", 
    behavior: behaviors.LIQUID, 
    category: "liquids",
    viscosity: 50,
    burn: 15,
    burnTime: 1200,
    burnInto: "slag",
    state: "liquid",
    desc: "Тяжелый остаток переработки нефти (мазут). После сгорания оставляет шлак.",
};

// Керосин — авиационное топливо
elements.kerosene = {
    color: "#c2bba8", 
    behavior: behaviors.LIQUID, 
    category: "liquids",
    viscosity: 5, 
    burn: 35,
    burnTime: 600,
    burnInto: "exhaust_gas",
    state: "liquid",
    desc: "Авиационный керосин.",
};

// Дизель — классическая солярка
elements.diesel = {
    color: "#403d39", 
    behavior: behaviors.LIQUID, 
    category: "liquids",
    viscosity: 15, 
    burn: 25,
    burnTime: 800,
    burnInto: "exhaust_gas",
    state: "liquid",
    desc: "Дизельное топливо.",
};

// Бензин — высокооктановое горючее
elements.gasoline = {
    color: "#b5a642", 
    behavior: behaviors.LIQUID, 
    category: "liquids",
    viscosity: 2,
    burn: 60,
    burnTime: 350,
    burnInto: "exhaust_gas",
    state: "liquid",
    desc: "Высокооктановый бензин.",
};


// --- ШАГ 4: ГАЗОВОЕ ТОПЛИВО И ВЫХЛОП ---

elements.diesel_gas = {
    color: "#5c5851", 
    category: "gases", 
    burn: 30, 
    burnTime: 400,
    burnInto: "exhaust_gas",
    state: "gas",
    behavior: ["M1|M1|M1", "M2|CH:diesel_gas|M2", "M2|M2|M2"],
    desc: "Тяжелые пары дизеля.",
};

elements.gasoline_gas = {
    color: "#d4c573", 
    behavior: behaviors.GAS,
    category: "gases", 
    burn: 50, 
    burnTime: 150,
    burnInto: "exhaust_gas",
    state: "gas",
    desc: "Летучие испарения бензина.",
};

elements.exhaust_gas = {
    color: "#3d3a36",
    behavior: behaviors.GAS,
    category: "gases",
    desc: "Выхлопной газ. Рассеивается со временем.",
    state: "gas",
    reactions: {
        "air": { elem1: null, elem2: "air", chance: 0.01 }
    }
};


// --- ШАГ 5: ТЕМПЕРАТУРНАЯ РЕКТИФИКАЦИЯ (ОЧИСТКА НЕФТИ) ---

if (elements.oil) {
    // Полностью сбрасываем старые реакции (убираем огонь и пропан)
    elements.oil.reactions = {};

    // Переводим строго на нагрев
    elements.oil.tempHigh = 180;
    elements.oil.stateHigh = "kerosene";
    
    elements.oil.extraTempHigh = {
        250: "fuel_oil",      
        300: "sulfur_powder" 
    };

    // Очистка на платине
    elements.oil.reactions["platinum"] = { elem1: "gasoline", elem2: null, chance: 0.4 };
}

// Переработка fuel_oil водой в асфальт
elements.fuel_oil.reactions = {
    "water": { elem1: "asphalt", elem2: "steam", chance: 0.8 },
    // При нагревании fuel_oil выделяет дизель и дизельный газ
    "fire": { elem1: "diesel", elem2: "diesel_gas", chance: 0.02, tempMin: 250 }
};

// Реакции для Бензина
elements.gasoline.reactions = {
    "fire": { elem1: "gasoline_gas", elem2: "exhaust_gas", chance: 0.15 },
    "diesel": { elem1: "gasoline_gas", elem2: "diesel_gas", chance: 0.02 }
};


// ============================================================================
// ШАГ 6: БЛОК МЕТАДАННЫХ ДЛЯ СТИМА (STEAM WORKSHOP MOD DATA)
// ============================================================================
runAfterLoad(function() {
    if (typeof enabledMods !== 'undefined') {
        enabledMods.push({
            name: "Industrial Petroleum Mod",
            author: "BasyaGameMine324",
            version: "1.0.1",
            description: "Индустриальный мод, добавляющий цепочки нефтепереработки по температурам, катализаторы, выделение серы, выхлопные газы и электрические буровые скважины для добычи нефти.",
            steamId: "3664820"
        });
    }
});
