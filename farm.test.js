const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getTotalCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
} = require("./farm.js");

describe("getYieldForPlant", () => {
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
        light: 0,
      },
    },
  };

  const environmentFactors = {
    sun: "high",
    wind: "light",
    rain: "medium",
    soil: "gravel",
  };
  test("Get yield for plant without environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant incl envrironmental factor", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
  });
});

describe("getYieldForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3 /*kilo oogst van een plantje*/,
  };
  const input = {
    crop: corn,
    numCrops: 10 /*aantal plantjes*/,
  };
  test("Get yield for crop, simple", () => {
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
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
        gravel: -50,
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
        clay: 25,
      },
    },
  };
  const crops = [
    { crop: corn, numCrops: 0 },
    { crop: pumpkin, numCrops: 2 },
    { crop: latice, numCrops: 3 },
  ];

  const environmentFactors = {
    sun: "high",
    wind: "light",
    rain: "medium",
    soil: "gravel",
  };

  test("Calculate total yield with multiple crops", () => {
    expect(getTotalYield({ crops })).toMatchObject({ corn: 0, pumpkin: 8 });
  });

  test("Calculate total yield with 0 amount", () => {
    expect(getTotalYield({ crops })).toMatchObject({ corn: 0 });
  });

  test("Calculate total yield incl environmental factor", () => {
    expect(getTotalYield({ crops }, environmentFactors)).toMatchObject({
      corn: 0,
      pumpkin: 6,
      latice: 14.85,
    });
  });
});

describe("getCostsForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    costs: 1,
  };

  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    costs: 1,
  };

  const crops = [
    { crop: corn, numCrops: 5 },
    { crop: pumpkin, numCrops: 4 },
  ];

  test("calculate total cost for crop simple", () => {
    expect(getTotalCostsForCrop({ crops })).toBe(9);
  });

  test("calculate total cost for mulitple vegetables (environment has no effect on costs)", () => {
    expect(getTotalCostsForCrop({ crops })).toBe(9);
  });
});

describe("getRevenueForCrop", () => {
  const corn = {
    name: "corn",
    yield: 3,
    salesprice: 2,
    costs: 1,
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
    salesprice: 3,
    costs: 1,
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
    salesprice: 1,
    costs: 1,
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
  test("calculate revenue for multiple crops excl. environment", () => {
    expect(getRevenueForCrop({ crops })).toBe(69);
  });

  test("calculate revenue for multiple crops incl. environment", () => {
    expect(getRevenueForCrop({ crops }, environmentFactors)).toBe(77.85);
  });
});

describe("getProfitForCrop", () => {
  const corn = {
    name: "corn",
    yield: 30,
    salesprice: 2,
    costs: 1,
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
    yield: 40,
    salesprice: 3,
    costs: 1,
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
      rain: {
        heavy: -50,
        medium: 50,
        dry: 0,
      },
    },
  };

  const latice = {
    name: "latice",
    yield: 15,
    salesprice: 1,
    costs: 2,
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
    sun: "low",
    wind: "light",
    rain: "dry",
    soil: "gravel",
  };
  test("calculate profit for crop excl. environment", () => {
    expect(getProfitForCrop({ crops })).toBe(572);
  });

  test("calculate profit for multiple crops excl. environment", () => {
    expect(getProfitForCrop({ crops })).toBe(572);
  });

  test("calculate profit for multiple crops incl. environment", () => {
    expect(getProfitForCrop({ crops }, environmentFactors)).toBe(229.4);
  });
});
