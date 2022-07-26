const brain = require("brain.js");
const fs = require("fs");
const aaplModel = require("../models/aaplModel.json");
const ibmModel = require("../models/ibmModel.json");
const metaModel = require("../models/metaModel.json");
const tslaModel = require("../models/tslaModel.json");

const modelMap = {
  AAPL: aaplModel,
  IBM: ibmModel,
  META: metaModel,
  TSLA: tslaModel,
};

function pricePredicter(ticker, data) {
  const forecastSet = data.slice(-5);
  const jsonModel = modelMap[ticker];
  const net = new brain.recurrent.LSTMTimeStep();
  net.fromJSON(jsonModel);
  const forecast = net.forecast(forecastSet, 1);
  const pricePrediction = { x: "prediction", y: forecast[0]?.toFixed(2) };
  return pricePrediction;
}
module.exports = pricePredicter;
