//  opbrengst in kg voor een plantsoort
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

// opbrengst in kg voor een aantal planten van 1 soort
const getYieldForCrop = (input) => {
  return input.numCrops * input.crop.yield;
};

// opbrengst in kg van een aantal planten van verschillende soorten
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

// kosten voor een aantal plantjes van een of verschillende soorten
const getTotalCostsForCrop = (vegetableNumberCosts) => {
  let totalCosts = 0;
  vegetableNumberCosts.crops.forEach((vegetable) => {
    totalCosts += vegetable.crop.costs * vegetable.numCrops;
  });
  return totalCosts;
};

const getRevenueForCrop = (crops, environment) => {
  if (environment) {
    totalYieldList = getTotalYield(crops, environment);
  } else {
    totalYieldList = getTotalYield(crops);
  }
  let plantTotalRevenue = 0;
  crops.crops.forEach((plant) => {
    const plantRevenue = plant.crop.revenue;
    const plantName = plant.crop.name;
    plantTotalRevenue += plantRevenue * totalYieldList[`${plantName}`];
  });

  return plantTotalRevenue;
};

const getProfitForCrop = (vegtebaleData) => {
  const profit =
    getRevenueForCrop(vegtebaleData) - getTotalCostsForCrop(vegtebaleData);
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
