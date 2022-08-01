function monthlyDataParser(rawData) {
  const volData = [];
  const monthlyReturns = [];
  const dates = Object.keys(rawData);
  const selectedDates = dates.sort().slice(-5);

  selectedDates.forEach((date) => {
    let vol = Number(rawData[date]["6. volume"]);
    let close = Number(rawData[date]["4. close"]);
    let prevDate = dates[dates.indexOf(date) - 1];
    let prevClose = Number(rawData[prevDate]["4. close"]);
    if (vol) {
      volData.push(vol);
      monthlyReturns.push((close - prevClose) / prevClose * 100);
    }
  });
  return { selectedDates, volData, monthlyReturns };
}

module.exports = monthlyDataParser;
