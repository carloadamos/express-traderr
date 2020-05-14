import express from 'express';
const strategyRoutes = express.Router();
import Strategy from '../model/strategy.model';

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
  console.log(JSON.stringify(strat))
  strat.save();

  console.log(strat);
  if (!strat) return res.status(400).json({ strat: "Error saving" });
  res.status(200).json({ strat: "stock added successfully" });
});

module.exports = strategyRoutes;