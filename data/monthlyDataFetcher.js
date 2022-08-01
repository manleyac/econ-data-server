const axios = require("axios");
const monthlyDataParser = require("./monthlyDataParser.js");
const dataCalculator = require("./dataCalculator.js");

function monthlyDataFetcher(ticker) {
  const requestURL = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${ticker}&apikey=${process.env.API_KEY}`;
  return axios
    .get(requestURL)
    .then((response) => {
      const data = response["data"]["Monthly Adjusted Time Series"];
      const { selectedDates, volData, monthlyReturns } =
        monthlyDataParser(data);
      return { selectedDates, volData, monthlyReturns };
    })
    .catch((error) => {
      return error;
    });
}

module.exports = monthlyDataFetcher;
