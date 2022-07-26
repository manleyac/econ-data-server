const math = require("mathjs");

function dataCalculator(keys, data) {
  let dateRange = `${keys[0]} - ${keys[keys.length - 1]}`
  let high = data[0]["y"];
  let low = data[0]["y"];
  const values = [];

  data.forEach((date) => {
    let value = date["y"];
    values.push(value);
    if (value > high) {
      high = value;
    } else if (value < low) {
      low = value;
    }
  });

  const std = math.round(math.std(values),3);

  return {
    dateRange,
    high,
    low,
    std
  }
}

module.exports = dataCalculator;
