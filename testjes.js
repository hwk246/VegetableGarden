const corn = {
  name: "corn",
  yield: 30,
  factor: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
  },
};

const environmentFactors = {
  sun: "low",
};

const getYieldForPlant = (corn, environmentFactor) => {
  const growthBySun = environmentFactor.sun;
  console.log(growthBySun);
  console.log(corn.factor.sun[`${growthBySun}`]);
  //   const sunValue = corn.sun[`${growthBySun}`;
  //   return corn.yield + (corn.yield * sunValue) / 100;
};

console.log(getYieldForPlant(corn, environmentFactors));
