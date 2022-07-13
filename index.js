require('dotenv').config()
const express = require('express');
const dataFetcher = require("./data/dataFetcher.js")
const app = express();
const port = 3000;

app.get('/', async (req,res) => {
  const data = await dataFetcher();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});