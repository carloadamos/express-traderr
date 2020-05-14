import { Router } from 'express';
const stockRoutes = Router();
import Stock from "../model/stock.model";

stockRoutes.route('/').get((req, res) => {
  Stock.find((err, stocks) => {
    if (err) {
      console.log(err);
    }
    res.json(stocks);
  });
});

stockRoutes.route('/:id').get((req, res) => {
  const { id } = req.params;

  Stock.findById(id, (err, stock) => {
    res.json(stock);
  });
});

stockRoutes.route('/range').post((req, res) => {
  const { dateFrom, dateTo } = req.body;

  Stock.find(
    {
      trade_date: {
        $gte: new Date(dateFrom),
        $lte: new Date(dateTo),
      }
    }
    , (err, stock) => {
      res.json(stock);
    });
});

stockRoutes.route('/add').post((req, res) => {
  const stocklist = req.body;

  stocklist.forEach(item => {
    const stock = new stock(item);
    stock.save();
  });

  if (stocklist.length === 0) return res.status(400).json({ stock: 'error saving' });
  res.status(200).json({ stock: 'stock added successfully' });
});

stockRoutes.route('/update/:id').post((req, res) => {
  Stock.findById(req.params.id, (err, stock) => {
    if (!stock) {
      res.status(404).send('data not found');
    } else {
      const newStock = stock;
      newStock.stock_code = req.body.stock_code;
      newStock.stock_trade_date = req.body.stock_trade_date;
      newStock.stock_open = req.body.stock_open;
      newStock.stock_high = req.body.stock_high;
      newStock.stock_low = req.body.stock_low;
      newStock.stock_close = req.body.stock_close;
      newStock.stock_volume = req.body.stock_volume;

      newStock
        .save()
        .then(() => {
          res.json('Stock updated!');
        })
        .catch(error => {
          res.status(400).send(`${error} Update not possible`);
        });
    }
  });
});

export default stockRoutes;