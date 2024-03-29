const axios = require("axios");
const dataParser = require("./dataParser.js");
const dataCalculator = require("./dataCalculator.js");

function dataFetcher(ticker) {
  const requestURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${process.env.API_KEY}`;
  return axios
    .get(requestURL)
    .then((response) => {
      const data = response["data"]["Time Series (Daily)"];
      const { dates, parsedData, priceArray } = dataParser(data);
      const stats = dataCalculator(dates, parsedData);
      // const pricePrediction = pricePredicter(priceArray);
      return { data: parsedData, stats, priceArray };
    })
    .catch((error) => {
      return error;
    });
}

module.exports = dataFetcher;
