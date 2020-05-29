import express from 'express';
const strategyRoutes = express.Router();
import StrategySchema from '../model/strategy.model';

strategyRoutes.route("/").get((req, res) => {
  StrategySchema.find((err, strats) => {
    if (err) {
      console.log(err);
    }
    res.json(strats);
  });
});

strategyRoutes.route("/add").post((req, res) => {
  const strat = new StrategySchema(req.body);
  console.log(JSON.stringify(strat))
  strat.save();

  console.log(strat);
  if (!strat) return res.status(400).json({ strat: "Error saving" });
  res.status(200).json({ strat: "stock added successfully" });
});

module.exports = strategyRoutes;