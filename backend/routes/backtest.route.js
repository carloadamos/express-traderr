import { Router } from 'express';
const backTestRoutes = Router();
import BacktestSchema from '../model/backtest.model';
import BackTest from '../logic/backtest';

backTestRoutes.route('/').get((req, res) => {
  BacktestSchema.find((err, strats) => {
    if (err) {
      console.log(err);
    }
    res.json(strats);
  });
});

backTestRoutes.route('/test').post((req, res) => {
  const { stockList, buyStrategy, sellStrategy, stopLoss } = req.body;
  const backTest = new BackTest(stockList, 'long', { buy: buyStrategy, sell: sellStrategy }, 1000, stopLoss);

  const history = backTest.start();
  res.json(history);
});

export default backTestRoutes;