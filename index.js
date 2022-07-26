require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dataFetcher = require("./data/dataFetcher.js");
const pricePredicter = require("./data/pricePredicter.js");

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('tiny'));

app.post('/', async (req,res) => {
  const ticker = req.body?.ticker;
  if (ticker) {
    const { data, stats, priceArray } = await dataFetcher(ticker);
    const pricePrediction = await pricePredicter(ticker, priceArray);
    const resObject = { data, stats, pricePrediction };
    res.json(resObject);
  } else {
    res.status(400);
    res.send("Missing request body param 'ticker'")
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});