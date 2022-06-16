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
  };

  test("Get yield for plant without environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant incl envrironmental factor", () => {
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
        soil: {
          sand: -10,
          kley: 10,
          gravel: -50,
        },
      },
    };

    const environmentFactors = {
      sun: "high",
      wind: "strong",
      soil: "kley",
    };

    expect(getYieldForPlant(corn, environmentFactors)).toBe(19.8);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3 /*kilo oogst van een plantje*/,
    };
    const input = {
      crop: corn,
      numCrops: 10 /*aantal plantes*/,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getCostsForCrop", () => {
  test("calculate total cost for crop simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
    };
    const crops = [{ crop: corn, numCrops: 5 }];
    expect(getTotalCostsForCrop({ crops })).toBe(5);
  });

  test("calculate total cost for mulitple vegetables", () => {
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
    expect(getTotalCostsForCrop({ crops })).toBe(9);
  });
});

describe("getRevenueForCrop", () => {
  test("calculate revenue for multiple crops excl. environment", () => {
    const corn = {
      name: "corn",
      yield: 3,
      revenue: 2,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      revenue: 3,
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 4 },
    ];
    expect(getRevenueForCrop({ crops })).toBe(78);
  });
});

describe("getProfitForCrop", () => {
  test("calculate profit for crop excl. environment", () => {
    const corn = {
      name: "corn",
      yield: 3,
      revenue: 2,
      costs: 1,
    };

    const crops = [{ crop: corn, numCrops: 5 }];
    expect(getProfitForCrop({ crops })).toBe(25);
  });

  test("calculate profit for multiple crops exc. environment", () => {
    const corn = {
      name: "corn",
      yield: 3,
      revenue: 2,
      costs: 1,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      revenue: 3,
      costs: 1,
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 4 },
    ];
    expect(getProfitForCrop({ crops })).toBe(69);
  });
});
