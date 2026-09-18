// ============================================================================
// IMMERSIVE PETROLEUM MOD FOR SANDBOXELS
// ============================================================================

// --- ШАГ 1: СОЗДАНИЕ КАТЕГОРИЙ В МЕНЮ ---
runAfterLoad(function() {
    if (window.categories) {
        categories.engineering = {
            name: "Инженерные машины",
            id: "engineering"
        };
    }
});

// --- ШАГ 2: ТВЕРДЫЕ ТЕЛА, КАТАЛИЗАТОРЫ И ИНЖЕНЕРНЫЕ МАШИНЫ ---

// Кокс — высокоуглеродистое топливо
elements.coke_fuel = {
    color: "#2e2e2e",
    behavior: behaviors.POWDER,
    category: "solids",
    desc: "Промышленный кокс. Получается из угля, горит гораздо жарче и дольше.",
    state: "solid",
    burn: 30,
    burnTime: 2000, // Горит экстремально долго
    burnInto: "ash",
};

// Железная руда
elements.iron_ore = {
    color: "#7b5c4c",
    behavior: behaviors.POWDER,
    category: "solids",
    desc: "Сырая железная руда. Смешайте с коксом и раскалите, чтобы выплавить сталь.",
    state: "solid",
};

// --- НОВЫЙ ЭЛЕМЕНТ: ЭЛЕКТРОМОТОР ДЛЯ СДВИГА ГРУПП ---

elements.electric_motor = {
    color: "#3a6073", // Сине-стальной цвет мотора
    behavior: behaviors.WALL, // Сам мотор прочно закреплен на холсте
    category: "engineering",
    desc: "Электромотор. Подайте электричество, чтобы он толкал группу пикселей (созданную инструментом 'group') перед собой.",
    state: "solid",
    conduct: 1.0, // Проводит ток для активации
    hardToBreak: true,
};

elements.electric_motor.tick = function(pixel) {
    // 1. Проверяем наличие заряда
    if (pixel.charge && pixel.charge > 0) {
        let x = pixel.x;
        let y = pixel.y;
        
        // Цель — пиксель справа
        let targetX = x + 1;
        let targetY = y;
        
        // 2. Проверяем, есть ли там что-то
        if (!isEmpty(targetX, targetY)) {
            let targetPixel = pixelMap[targetX][targetY];
            
            // 3. Проверяем наличие группы
            if (targetPixel && targetPixel.group) {
                let myGroup = targetPixel.group;
                
                // ВАЖНО: Размораживаем, чтобы сдвинуть
                myGroup.frozen = false;
                
                // Пытаемся сдвинуть
                let moved = moveGroup(myGroup, 1, 0);
                
                // 4. Дополнительно обновляем состояние группы, чтобы игра "увидела" изменения
                if (moved) {
                    // Принудительно передаем заряд всей группе
                    for (let p of myGroup.pixels) {
                        p.charge = pixel.charge;
                    }
                    // Повторно замораживаем, если нужно сохранить целостность конструкции
                    myGroup.frozen = true;
                }
            }
        }
    }
};





// Нефтяная скважина / Бур (Генерирует нефть от тока)
elements.oil_well = {
    color: "#4a5759",
    behavior: behaviors.WALL,
    category: "engineering",
    desc: "Промышленный бур. Подайте на него электричество, чтобы он начал добывать нефть из-под себя.",
    state: "solid",
    conduct: 1.0,
    hardToBreak: true,
};

// Скрипт активации бура при получении электрического заряда
elements.oil_well.tick = function(pixel) {
    if (pixel.charge && pixel.charge > 0) {
        let x = pixel.x;
        let y = pixel.y;
        if (isEmpty(x, y + 1)) {
            createPixel("oil", x, y + 1); // Бурим и спавним оригинальную нефть!
        }
    }
};

// Промышленный двигатель (Сжигает топливо, коптит и дает энергию)
elements.engine_block = {
    color: "#555d6b",
    behavior: behaviors.WALL,
    category: "engineering",
    desc: "Промышленный двигатель. Потребляет бензин, дизель или керосин сверху/сбоку и выбрасывает газ позади себя.",
    state: "solid",
    hardToBreak: true,
};

// Логика работы двигателя
elements.engine_block.tick = function(pixel) {
    let x = pixel.x;
    let y = pixel.y;
    let fuelList = ["gasoline", "diesel", "kerosene"];
    let fuelFound = false;

    let checkOffsets = [
        {dx: -1, dy: 0}, {dx: 1,  dy: 0}, {dx: 0,  dy: -1}
    ];

    // Потребление жидкого топлива
    for (let offset of checkOffsets) {
        let targetX = x + offset.dx;
        let targetY = y + offset.dy;
        if (!isEmpty(targetX, targetY)) {
            let neighbor = pixelMap[targetX][targetY];
            if (fuelList.includes(neighbor.element)) {
                deletePixel(targetX, targetY); 
                fuelFound = true;
                break; 
            }
        }
    }

    // Выброс газов с гарантированным смещением вниз, чтобы дать им простор для взлета
    if (fuelFound) {
        if (isEmpty(x, y + 2)) { createPixel("exhaust_gas", x, y + 2); }
        else if (isEmpty(x, y + 1)) { createPixel("exhaust_gas", x, y + 1); }
        else if (isEmpty(x - 1, y + 1)) { createPixel("exhaust_gas", x - 1, y + 1); }
        else if (isEmpty(x + 1, y + 1)) { createPixel("exhaust_gas", x + 1, y + 1); }
        pixel.charge = 4; // Вырабатывает электрический заряд при работе
    }
};

// Катушка Теслы (Беспроводной генератор молний)
elements.tesla_coil = {
    color: "#a370e5",
    behavior: behaviors.WALL,
    category: "engineering",
    desc: "Катушка Теслы. При подаче электричества испускает мощные разряды молний во все стороны.",
    state: "solid",
    conduct: 1.0,
    hardToBreak: true,
};

elements.tesla_coil.tick = function(pixel) {
    if (pixel.charge && pixel.charge > 0) {
        let x = pixel.x;
        let y = pixel.y;
        let directions = [
            {dx: 0, dy: -2}, {dx: 0, dy: 2}, {dx: -2, dy: 0}, {dx: 2, dy: 0}
        ];
        if (Math.random() < 0.2) {
            for (let dir of directions) {
                let targetX = x + dir.dx;
                let targetY = y + dir.dy;
                if (isEmpty(targetX, targetY)) {
                    createPixel("lightning", targetX, targetY);
                }
            }
        }
    }
};

// Сера — побочный продукт переработки
elements.sulfur_powder = {
    color: "#e6df67",
    behavior: behaviors.POWDER,
    category: "solids",
    desc: "Твердый осадок серы. Используется для создания взрывчатки и резины.",
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
    stateHigh: "fuel_oil",
};


// --- ШАГ 3: ХИМИЧЕСКАЯ ИНДУСТРИЯ И ОРУЖИЕ ---

// Жидкий пластик (расплав)
elements.liquid_plastic = {
    color: "#e0e0e0",
    behavior: behaviors.LIQUID,
    category: "liquids",
    viscosity: 80,
    state: "liquid",
    desc: "Расплавленный нефтехимический пластик. Застывает при охлаждении.",
    tempLow: 100,
    stateLow: "plastic",
};

// Твердый пластик
elements.plastic = {
    color: "#f0f0f0",
    behavior: behaviors.WALL,
    category: "solids",
    desc: "Легкий промышленный полимер. Плавится при нагревании, отличный изолятор.",
    state: "solid",
    density: 950,
    conduct: 0,
    tempHigh: 160,
    stateHigh: "liquid_plastic",
};

// Твердая резина
elements.rubber = {
    color: "#1c1c1c",
    behavior: behaviors.WALL,
    category: "solids",
    desc: "Эластичный каучуковый материал. Горит с выделением сильного выхлопа.",
    state: "solid",
    burn: 20,
    burnTime: 400,
    burnInto: "exhaust_gas",
    tempHigh: 200,
    stateHigh: "fuel_oil",
};

// Мощная промышленная взрывчатка (ТНТ) — В КАТЕГОРИИ ОРУЖИЯ С МОЩНЫМ ВЗРЫВОМ И ТОКОМ
elements.tnt_industrial = {
    color: "#b02525",
    behavior: behaviors.WALL, 
    category: "weapons",       
    desc: "Тяжелая нефтехимическая взрывчатка. Вызывает мощный взрыв от огня, искры, нагрева или электрического тока.",
    state: "solid",
    conduct: 1.0,  
    burn: 100,     
    burnTime: 2,   
    burnInto: ["explosion", "fire", "smoke", "smoke"], 
    tempHigh: 120,
    stateHigh: "explosion", 
};

elements.tnt_industrial.tick = function(pixel) {
    if (pixel.charge && pixel.charge > 0) {
        pixel.burning = true; // Безопасно поджигает пиксель током без вылета игры
    }
    if (pixel.temp >= 120) {
        pixel.burning = true;
    }
};


// --- ШАГ 4: ЖИДКИЕ ТОПЛИВНЫЕ ПРОДУКТЫ ---

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

// Высокооктановый бензин
elements.gasoline = {
    color: "#b5a642", 
    behavior: behaviors.LIQUID, 
    category: "liquids",
    viscosity: 2,
    burn: 60,
    burnTime: 350,
    burnInto: "exhaust_gas",
    state: "liquid",
    desc: "Высокооктановый бензин. Используется для синтеза пластика и взрывчатки.",
};


// --- ШАГ 5: ГАЗОВОЕ ТОПЛИВО И ЛЕТУЧИЙ ВЫХЛОП ---

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

// Выхлопной газ — с кастомной матрицей подъема (гарантированно летит вверх)
elements.exhaust_gas = {
    color: "#3d3a36",
    behavior: [
        "M1|M1|M1",             
        "M2|CH:exhaust_gas|M2", 
        "XX|XX|XX"
    ],
    category: "gases",
    state: "gas",
    desc: "Густой выхлопной газ от сгорания топлива. Поднимается в атмосферу и рассеивается.",
    reactions: {
        "air": { elem1: null, elem2: "air", chance: 0.01 }
    }
};


// --- ШАГ 6: НАСТРОЙКА ХИМИЧЕСКИХ РЕАКЦИЙ И ТЕМПЕРАТУРНОЙ РЕКТИФИКАЦИИ ---

// Кастомный скрипт ректификации нефти по точным температурам
elements.oil.tick = function(pixel) {
    if (pixel.temp >= 180) {
        let rand = Math.random();
        if (pixel.temp < 250) {
            if (rand < 0.04) { changePixel(pixel, "kerosene"); }
        } 
        else if (pixel.temp < 300) {
            if (rand < 0.12) { changePixel(pixel, "fuel_oil"); }
        } 
        else {
            if (rand < 0.10) { changePixel(pixel, "sulfur_powder"); } 
            else if (rand < 0.25) { changePixel(pixel, "fuel_oil"); }
        }
    }
};



// Код внутри runAfterLoad гарантирует, что игра сначала создаст наши элементы, а потом свяжет их реакциями
runAfterLoad(function() {
    // 1. Очищаем оригинальную нефть
    if (elements.oil) {
        elements.oil.reactions = {};
        delete elements.oil.tempHigh;
        delete elements.oil.stateHigh;
        delete elements.oil.extraTempHigh;
        
        // Перезаписываем реакцию с платиной для бензина
        elements.oil.reactions["platinum"] = { elem1: "gasoline", elem2: null, chance: 0.4 };
    }

    // 2. Инициализируем реакции для Fuel Oil (Мазута)
    if (elements.fuel_oil) {
        elements.fuel_oil.reactions = {
            "water": { elem1: "asphalt", elem2: "steam", chance: 0.8 },
            "fire": { elem1: "diesel", elem2: "diesel_gas", chance: 0.02, tempMin: 250 },
            "sulfur_powder": { elem1: "rubber", elem2: null, chance: 0.3, tempMin: 80 },
            "lava": { elem1: "gasoline", elem2: "gasoline_gas", chance: 0.07, tempMin: 280 }
        };
        
        // Температурный крекинг мазута в бензин
        elements.fuel_oil.tick = function(pixel) {
            if (pixel.temp >= 280) {
                if (Math.random() < 0.05) { changePixel(pixel, "gasoline"); }
            }
        };
    }

    // 3. Инициализируем реакции для Бензина
    if (elements.gasoline) {
        elements.gasoline.reactions = {
            "fire": { elem1: "gasoline_gas", elem2: "exhaust_gas", chance: 0.15 },
            "diesel": { elem1: "gasoline_gas", elem2: "diesel_gas", chance: 0.02 },
            "steam": { elem1: "liquid_plastic", elem2: null, chance: 0.1, tempMin: 100 },
            "sulfur_powder": { elem1: "tnt_industrial", elem2: null, chance: 0.2 }
        };
    }


        // Правильный способ добавления логики без удаления старой
const originalCharcoalTick = elements.charcoal.tick;
elements.charcoal.tick = function(pixel) {
    // Сначала выполняем старую логику
    originalCharcoalTick(pixel); 
    
    // Затем добавляем вашу логику коксования
    if (pixel.temp >= 300 && !pixel.burning) {
        if (Math.random() < 0.005) { // Снизил шанс, чтобы не превращалось всё мгновенно
            changePixel(pixel, "coke_fuel");
        }
    }
};
    
        // Дополнительный крафт: древесину или мертвые растения тоже можно запечь в кокс при высокой температуре
        if (elements.plant) {
            elements.plant.reactions = elements.plant.reactions || {};
            elements.plant.reactions["steam"] = { elem1: "coke_fuel", elem2: null, chance: 0.02, tempMin: 280 };
        }
    
        if (elements.iron_ore) {
            elements.iron_ore.reactions = {
                // 1. ВЫПЛАВКА СТАЛИ: Если жарить руду коксом выше 800°C, получается расплавленная сталь
                "coke_fuel": { elem1: "molten_steel", elem2: "fire", chance: 0.2, tempMin: 800 },
                
                // 2. ВЫПЛАВКА ЖЕЛЕЗА: Если греть руду обычным углем (charcoal) выше 500°C, получается расплавленное железо!
                "charcoal": { elem1: "molten_iron", elem2: "fire", chance: 0.15, tempMin: 500 }
            };
        }
    
    })        
