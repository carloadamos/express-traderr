import { Router } from 'express';
import BackTestModel from '../model/backtest.model';
import BackTest from '../logic/backtest';
const backTestRoutes = Router();

backTestRoutes.route('/').get((req, res) => {
  BackTestModel.find((err, strats) => {
    if (err) {
      console.log(err);
    }
    res.json(strats);
  });
});

backTestRoutes.route('/test').post((req, res) => {
  const { stockList, buyStrategy, sellStrategy, dateRange } = req.body;
  const backTest = new BackTest(stockList, 'long', { buy: buyStrategy, sell: sellStrategy }, 1000, dateRange);

  const history = backTest.start();
  res.json(history);
});

export default backTestRoutes;