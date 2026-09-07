elements.lava = {
  color: ["#fcba03", "#fc6b03", "#fc2c03"],
  behavior: behaviors.MOLTEN,
  category: "liquids",
  state: "liquid",
  temp: 1200,
  tempLow: 980,
  stateLow: "cobblestone"
};

elements.cobblestone = {
  color: ["#cfcfcf", "#adacac", "#636362"],
  behavior: behaviors.POWDER,
  category: "land",
  state: "solid",
  stateHigh: "polished_stone",
  tempHigh: 200
};

elements.polished_stone = {
  color: ["#ced5d6", "#a3ced4"],
  behavior: behaviors.WALL,
  category: "solids",
  state: "solid"
};
