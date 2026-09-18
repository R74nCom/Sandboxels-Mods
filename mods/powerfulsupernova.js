elements.powerful_supernova = {
    color: ["#ebf8ff","#dbf3ff","#b8e7ff"],
    behavior: [
        "CR:supernova AND CL AND CH:void>supernova|CR:supernova AND CL|CR:supernova AND CL AND CH:void>supernova",
        "CR:supernova|EX:10>supernova,supernova, supernova%25 AND CH:void%0.6|CR:supernova",
        "CR:supernova AND CL AND CH:void>supernova|CR:supernova AND CL|CR:supernova AND CL AND CH:void>supernova"
    ],
    temp:99999999700,
    category: "energy",
    state: "gas",
    density: 1000,
    hidden:true,
    hardness:1,
    excludeRandom: true,
    maxSize: 1,
    noMix: true,
    cooldown:defaultCooldown
},
elements.sun.stateLow = "powerful_supernova"
elements.supernova.stateLow = "powerful_supernova"