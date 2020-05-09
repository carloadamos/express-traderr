const express = require('express');
const backTestRoutes = express.Router();
const BackTestModel = require('../model/backtest.model');
const BackTest = require('../logic/backtest');

backTestRoutes.route("/").get((req, res) => {
  BackTestModel.find((err, strats) => {
    if (err) {
      console.log(err);
    }
    res.json(strats);
  });
});

backTestRoutes.route("/test").post((req, res) => {
  const { stockList, buyStrategy, sellStrategy } = req.body;
  const backTest = new BackTest(stockList, 'long', [buyStrategy, sellStrategy], 1000);

  const history = backTest.start();
  console.log(history)
});

module.exports = backTestRoutes;