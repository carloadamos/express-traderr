import { Router } from 'express';
const stockRoutes = Router();
import StockSchema from "../model/stock.model";
import moment from "moment";

stockRoutes.route('/').get((req, res) => {
  StockSchema.find((err, stocks) => {
    if (err) {
      console.log(err);
    }
    res.json(stocks);
  });
});

stockRoutes.route('/:id').get((req, res) => {
  const { id } = req.params;

  StockSchema.findById(id, (err, stock) => {
    res.json(stock);
  });
});

stockRoutes.route('/range').post((req, res) => {
  const { dateFrom, dateTo } = req.body;

  StockSchema.find(
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
    item.trade_date = moment(item.trade_date, 'DD/MM/YYYY').add('days', 1).format('MM/DD/YYYY');
    console.log(item.trade_date)
    const stock = new StockSchema(item);
    stock.save();
  });

  if (stocklist.length === 0) return res.status(400).json({ stock: 'error saving' });
  res.status(200).json({ stock: 'stock added successfully' });
});

stockRoutes.route('/update/:id').post((req, res) => {
  StockSchema.findById(req.params.id, (err, stock) => {
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