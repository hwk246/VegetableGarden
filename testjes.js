const { getTotalYield } = require("./farm");

const corn = {
  name: "corn",
  yield: 3,
  revenue: 2,
  factor: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    wind: {
      strong: -60,
      medium: -30,
      light: 0,
    },
  },
};

const pumpkin = {
  name: "pumpkin",
  yield: 4,
  revenue: 3,
  factor: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    soil: {
      gravel: -50,
      sand: -20,
      clay: 15,
    },
  },
};

const crops = [
  { crop: corn, numCrops: 5 },
  { crop: pumpkin, numCrops: 4 },
];

const environmentFactors = {
  sun: "high",
  wind: "light",
  rain: "medium",
  soil: "gravel",
};

const getRevenueForCrop = (crops, environmentFactors) => {
  const totalYieldList = getTotalYield(crops, environmentFactors);
  console.log("------> totalYieldlist", totalYieldList);
  crops.crops.forEach((plant) => {
    const plantRevenue = plant.crop.revenue;
    const plantName = plant.crop.name;
    const plantTotalRevenue = plantRevenue * totalYieldList[`${plantName}`];
    console.log("------------>plantTotalRevenue", plantTotalRevenue);
    plantRevenue * console.log(plantRevenue, plantName);
  });
};

getRevenueForCrop({ crops }, environmentFactors);
