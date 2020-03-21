const express = require('express');
const strategyRoutes = express.Router();
const Strategy = require("../model/strategy.model");

strategyRoutes.route("/").get((req, res) => {
  Strategy.find((err, strats) => {
    if (err) {
      console.log(err);
    }
    res.json(strats);
  });
});

strategyRoutes.route("/add").post((req, res) => {
  const strat = new Strategy(req.body);
  strat.save();

  console.log(strat);
  if (!strat) return res.status(400).json({ strat: "Error saving" });
  res.status(200).json({ strat: "stock added successfully" });
});

module.exports = strategyRoutes;