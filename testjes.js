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

const latice = {
  name: "latice",
  yield: 5,
  factor: {
    sun: {
      low: -20,
      medium: 0,
      high: 10,
    },
    soil: {
      gravel: -10,
      sand: -30,
      clay: 35,
    },
  },
};
const crops = [
  { crop: corn, numCrops: 5 },
  { crop: pumpkin, numCrops: 2 },
  { crop: latice, numCrops: 8 },
];

const environmentFactors = {
  sun: "high",
  wind: "light",
  rain: "medium",
  soil: "gravel",
};

const getTotalYield = (vegetableCropsYield, environmentFactor) => {
  let totalYield = 0;
  const plantYieldTotallist = [];
  vegetableCropsYield.crops.forEach((vegetable) => {
    if (environmentFactor) {
      let plantYield = vegetable.numCrops * vegetable.crop.yield;
      for (const weathercondition in vegetable.crop.factor) {
        const condition = environmentFactor[`${weathercondition}`];
        const factor =
          vegetable.crop.factor[`${weathercondition}`][`${condition}`] / 100;
        plantYield += plantYield * factor;
      }
      plantYieldTotallist.push(plantYield);
    } else {
      totalYield = vegetable.crop.yield * vegetable.numCrops;
      plantYieldTotallist.push(totalYield);
    }
  });
  return plantYieldTotallist;
};

getTotalYield({ crops }, environmentFactors);
