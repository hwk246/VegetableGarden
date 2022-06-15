//  opbrengst in kg voor een plant
const getYieldForPlant = (corn, environmentFactor) => {
  if (environmentFactor) {
    const sunValue = corn.factor.sun[environmentFactor.sun] / 100 + 1;
    return corn.yield * sunValue;
  } else {
    return corn.yield;
  }
};

// opbrengst in kg voor een aantal planten van 1 soort
const getYieldForCrop = (input) => {
  return input.numCrops * input.crop.yield;
};

// opbrengst in kg van een aantal planten van verschillende soorten
const getTotalYield = (vegetableCropsYield) => {
  let totalYield = 0;
  vegetableCropsYield.crops.forEach((vegetable) => {
    totalYield += vegetable.crop.yield * vegetable.numCrops;
  });
  return totalYield;
};

// kosten voor een aantal plantjes van een of verschillende soorten
const getTotalCostsForCrop = (vegetableNumberCosts) => {
  let totalCosts = 0;
  vegetableNumberCosts.crops.forEach((vegetable) => {
    totalCosts += vegetable.crop.costs * vegetable.numCrops;
  });
  return totalCosts;
};

const getRevenueForCrop = (cropsRevenue) => {
  let totalRevenue = 0;
  cropsRevenue.crops.forEach((revenue) => {
    totalRevenue +=
      revenue.crop.yield * revenue.crop.revenue * revenue.numCrops;
  });
  return totalRevenue;
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
