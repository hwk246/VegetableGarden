const corn = {
  name: "corn",
  yield: 30,
  factor: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
    wind: {
      strong: -60,
      medium: -30,
      lite: 0,
    },
  },
};

const environmentFactors = {
  sun: "high",
  wind: "strong",
};

const getYieldForPlant = (corn, environmentFactor) => {
  if (environmentFactor) {
    const impactValue = 1;
    for (const weatherType in environmentFactor) {
      console.log(weatherType);
      const strength = environmentFactor[`${weatherType}`];
      console.log(strength);
      // impactValue =
      console.log(corn.factor[`${weatherType}`][`${strength}`]);
    }
    return corn.yield * impactValue;
  } else {
    return corn.yield;
  }
};

console.log(getYieldForPlant(corn, environmentFactors));
