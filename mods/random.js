function randomElement(name,category,list) {
	elements[name] = {
		color: "#054d2b",
	behavior: [
		"XX|XX|XX",
		"XX|CH:"+list+"|XX",
		"XX|XX|XX",

	],
	category: category,
	state: "solid",
	stateHigh: name,
	tempHigh: 100000000,
	stateLow: name,
	tempLow: 10000000,
	}
}
function randomHiddenElement(name,category,list) {
	elements[name] = {
		color: "#054d2b",
	behavior: [
		"XX|XX|XX",
		"XX|CH:"+list+"|XX",
		"XX|XX|XX",

	],
	category: category,
	state: "solid",
	stateHigh: name,
	tempHigh: 100000000,
	stateLow: name,
	tempLow: 10000000,
	hidden: true
	}
}
function getList(paramcategory,extra){
		const list = []
		for (const name in elements){
			const element = elements[name];

			if (element.category === paramcategory){

				if (extra !== undefined) {
					const passes = extra(element)
					if (passes === true) {
						list.push(name)
					}
				}

				else {
					list.push(name);
				}
			}
		}
		const strlist = list.join()
		return strlist
}
function getListNoCat(extra){
		const list = []
		for (const name in elements){
			const element = elements[name];
			const passes = extra(element)
			if (passes === true) {
				list.push(name)
			}
		}
		const strlist = list.join()
		return strlist
}
function isHidden(element){
	return (element.hidden === true)
}
function isntHidden(element){
	return (element.hidden !== true)
}
function isTool(element){
	return (element.tool === true)
}
function threeVariants(name,category){
randomElement("RandomUnhidden"+name,category,getList(category,isntHidden))
randomElement("RandomHidden"+name,category,getList(category,isHidden))
randomElement("Random"+name,category,getList(category))
}
function basic(name,category,check){
randomElement("Random"+name,category,getListNoCat(check))
}
function isState(element){
	return (element.category === "states") || (element.category === undefined)
}
threeVariants("Weapon","weapons")
threeVariants("Energy","energy")
threeVariants("Special","special")
threeVariants("Liquid","liquids")
threeVariants("Land","land")
threeVariants("Life","life")
threeVariants("Powder","powders")
threeVariants("Solid","solids")
threeVariants("Gas","gases")
threeVariants("Machine","machines")
threeVariants("Food","food")
randomElement("RandomState","states",getListNoCat(isState))
randomElement("RandomMetal","solids","aluminum,copper,gallium,gold,iron,lead,nickel,silver,tin,tungsten,uranium,zinc,alga,blue_gold,brass,bronze,electrum,galvanized_steel,invar,rose_gold,steel,sterling,amalgam,metal_scrap,mercury,sodium,calcium,potassium,magnesium,gold_coin")
randomElement("RandomPureElement","special","hydrogen,nitrogen,oxygen,helium,chlorine,neon,iron,copper,gold,silver,zinc,tin,lead,nickel,aluminum,tungsten,gallium,sodium,calcium,magnesium,potassium,sulfur,uranium,gold_coin,mercury,liquid_nitrogen,liquid_hydrogen")
