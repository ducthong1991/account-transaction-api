const bodyParser = require("body-parser");
const express = require("express");
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
  ],
  allowedHeaders: [
    'Content-Type',
  ],
};
app.use(cors(corsOpts));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/accounts', (req, res) => {
  const rawdata = fs.readFileSync('accounts.json');
  const accounts = JSON.parse(rawdata);
  res.json(accounts)
});

app.get('/accounts/:id/transactions', (req, res) => {
  const id = req.params.id
  if (parseInt(id) >= 1 && parseInt(id) <= 4) {
    let rawdata = fs.readFileSync(`transactions-${id}.json`);
    let transactions = JSON.parse(rawdata);
    res.json(transactions)
  }
   res.status(500).send('No transaction was found');
});

app.listen(3030, () => {
  console.log("Started on http://localhost:3030");
});
