// Yield for one specific vegetable type, Calculation can be done with or without environmental factor

const getYieldForPlant = (corn, environmentFactor) => {
  if (environmentFactor) {
    let YieldWithWeatherImpact = corn.yield;
    for (weather in corn.factor) {
      // sun, wind
      const condition = environmentFactor[`${weather}`];
      const factor = corn.factor[`${weather}`][`${condition}`] / 100;
      YieldWithWeatherImpact += YieldWithWeatherImpact * factor;
    }
    return YieldWithWeatherImpact;
  } else {
    return corn.yield;
  }
};

// Yield of one specific vegetabletype without any environmental factor

const getYieldForCrop = (input) => {
  return input.numCrops * input.crop.yield;
};

// Yield in kg for several vegetable types. Calculation can be done with or without environmental factor. Outcome is Object.{vegetablename: amount}

const getTotalYield = (vegetableCropsYield, environmentFactor) => {
  const plantYieldTotallist = {};
  vegetableCropsYield.crops.forEach((vegetable) => {
    if (environmentFactor) {
      let plantYield = vegetable.numCrops * vegetable.crop.yield;
      for (const weathercondition in vegetable.crop.factor) {
        const condition = environmentFactor[`${weathercondition}`];
        const factor =
          vegetable.crop.factor[`${weathercondition}`][`${condition}`] / 100;
        plantYield += plantYield * factor;
      }
      plantYieldTotallist[`${vegetable.crop.name}`] = plantYield;
    } else {
      let plantYield = vegetable.crop.yield * vegetable.numCrops;
      plantYieldTotallist[`${vegetable.crop.name}`] = plantYield;
    }
  });
  return plantYieldTotallist;
};

// Costs for several vegetabletypes. Environmental factor has no effect on the costs

const getTotalCostsForCrop = (vegetableNumberCosts) => {
  let totalCosts = 0;
  vegetableNumberCosts.crops.forEach((vegetable) => {
    totalCosts += vegetable.crop.costs * vegetable.numCrops;
  });
  return totalCosts;
};

// Revenue for several plants. calculation can be done with or without environmental factor

const getRevenueForCrop = (crops, environmentFactors) => {
  if (environmentFactors) {
    totalYieldList = getTotalYield(crops, environmentFactors);
  } else {
    totalYieldList = getTotalYield(crops);
  }
  let plantTotalRevenue = 0;
  crops.crops.forEach((plant) => {
    const plantRevenue = plant.crop.salesprice;
    const plantName = plant.crop.name;
    plantTotalRevenue += plantRevenue * totalYieldList[`${plantName}`];
  });
  return plantTotalRevenue;
};

// Revenue minus Costs of al vegetables. Calculation can be done with or without environmental factor.

const getProfitForCrop = (vegtebaleData, environmentFactors) => {
  const profit =
    getRevenueForCrop(vegtebaleData, environmentFactors) -
    getTotalCostsForCrop(vegtebaleData);
  return profit;
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getTotalCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
};
