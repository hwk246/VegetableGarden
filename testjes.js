const { getYieldForCrop } = require("./farm");

const corn = {
  name: "corn",
  yield: 3,
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
  factor: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    soil: {
      gravel: -60,
      sand: -20,
      clay: 15,
    },
  },
};
const crops = [
  { crop: corn, numCrops: 5 },
  { crop: pumpkin, numCrops: 2 },
];

const environmentFactors = {
  sun: "high",
  wind: "light",
  rain: "medium",
  soil: "gravel",
};

const getTotalYield = (vegetableCropsYield, environmentFactor) => {
  let totalYield = 0;
  console.log("-----> vegetable.crops", vegetableCropsYield.crops);
  vegetableCropsYield.crops.forEach((vegetable) => {
    if (environmentFactor) {
      console.log("-----> vegetable ", vegetable);
      // for (subVegetable in )
      const plantYield = vegetable.numCrops * vegetable.crop.yield;
      console.log("------> plantYield", plantYield);
      console.log("------>   vegetable.crop.factor", vegetable.crop.factor);
    } else {
      vegetableCropsYield.crops.forEach((vegetable) => {
        totalYield += vegetable.crop.yield * vegetable.numCrops;
        // console.log(totalYield);
      });
      return totalYield;
    }
  });
};

getTotalYield({ crops }, environmentFactors);
