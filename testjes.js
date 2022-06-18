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

const latice = {
  name: "latice",
  yield: 5,
  revenue: 1,
  factor: {
    sun: {
      low: -20,
      medium: 0,
      high: 10,
    },
    soil: {
      gravel: -10,
      sand: -30,
      clay: 25,
    },
  },
};
const crops = [
  { crop: corn, numCrops: 5 },
  { crop: pumpkin, numCrops: 2 },
  { crop: latice, numCrops: 3 },
];

const environmentFactors = {
  sun: "high",
  wind: "light",
  rain: "medium",
  soil: "gravel",
};

const getRevenueForCrop = (crops, environment) => {
  if (environment) {
    totalYieldList = getTotalYield(crops, environmentFactors);
  } else {
    totalYieldList = getTotalYield(crops);
  }

  let plantTotalRevenue = 0;
  crops.crops.forEach((plant) => {
    const plantRevenue = plant.crop.revenue;
    const plantName = plant.crop.name;
    plantTotalRevenue += plantRevenue * totalYieldList[`${plantName}`];
  });

  console.log(plantTotalRevenue);
  return plantTotalRevenue;
};

getRevenueForCrop({ crops }, environmentFactors);
