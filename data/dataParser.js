function dataParser(rawData) {
  const parsedData = [];
  const priceArray = [];
  const dates = Object.keys(rawData);
  dates.sort();
  dates.forEach((date) => {
    let close = Number(rawData[date]["4. close"]);
    if (close) {
      priceArray.push(close);
      parsedData.push({ x: date, y: close });
    }
  });
  return { dates, parsedData, priceArray };
}

module.exports = dataParser;
