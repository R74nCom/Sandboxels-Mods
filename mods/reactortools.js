elements.primedu235 = {
     color: "#34eb6e",
     behavior: [
        "XX|CR:neutron%5 AND CH:uranium235>primedu235|XX",
        "CR:neutron%5 AND CH:uranium235>primedu235|XX|CR:neutron%5 AND CH:uranium235>primedu235",
        "XX|CR:neutron%5 AND CH:uranium235>primedu235|XX",
    ],
    reactions: {
        "neutron": {elem1:"primedu235", temp1:50 },
		"neutron": {elem1:"n_explosion", tempMin: 7000}
	},
    category: "reactortools",
    state: "solid",
}

elements.uranium235 = {
    color: "#34eb6e",
    behavior: [
        "XX|CR:radiation%1|XX",
        "CR:radiation%1|XX|CR:radiation%1",
        "XX|CR:radiation%1|XX",
    ],
    reactions: {
        "neutron": { elem1:"primedu235", temp1:50 },
        "primedu235": { elem1:"primedu235"},
    },
    category: "reactortools",
    state: "solid"
}
elements.reactorcoolant = {
    color: "#57f4ff",
    behavior: [
        "XX|CO:10|XX",
        "CO:10|XX|CO:10 AND M2 AND BO",
        "XX|M1 AND CO:10|XX",
    ],
    category: "reactortools",
    state: "liquid",
    temp: -50,
    stateHigh: "steam",
    tempHigh: 200
}
elements.reactoroverheatcooler = {
    color: "#01216b",
    behavior: behaviors.WALL,
    conduct: 1,
    category: "reactortools",
    behaviorOn: [
        "XX|CO:30|XX",
        "CO:30|XX|CO:30",
        "XX|CO:30|XX",
    ],
    state: "solid"
}
elements.coolantpump = {
    color: "#57f4ff",
    behavior: behaviors.WALL,
    conduct: 1,
    behaviorOn: [
        "XX|CR:reactorcoolant|XX",
        "CR:reactorcoolant|CO:10|CR:reactorcoolant",
        "XX|CR:reactorcoolant|XX",
        ],
    category: "reactortools",
    state: "solid",
    insulate: true
}
elements.overheatsensor = {
   
	color: "#ff0000",
    conduct: 0.1,
    category:"reactortools",
	behavior: behaviors.WALL,	
	tick: function(pixel) {
    
	 if (pixel.temp >= 4000 ) {
              pixel.charge = 1;     
        }
  },
}
