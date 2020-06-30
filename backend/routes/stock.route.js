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
  }).limit(5000);
});

stockRoutes.route('/:id').get((req, res) => {
  const { id } = req.params;

  StockSchema.findById(id, (err, stock) => {
    res.json(stock);
  });
});

stockRoutes.route('/distinct').post((req, res) => {
  StockSchema.collection.distinct('code', function (err, result) {
    res.json(result);
  });
});

stockRoutes.route('/range').post((req, res) => {
  let { dateFrom, dateTo, code } = req.body;

  if (!dateFrom && !dateTo && !code) {
    res.status(400).send({ message: "This type of operation is not advisable." });
  }
  else if (!dateFrom && !dateTo) {
    StockSchema.find({
      code: code,
    }, (err, stock) => { res.json(stock); });
  }
  else if (!dateFrom && dateTo) {
    StockSchema.find({
      trade_date: {
        $lte: moment(dateTo, 'YYYY/MM/DD').add(1, 'days').format('MM/DD/YYYY')
      },
      code: code,
    }, (err, stock) => { res.json(stock); });
  }
  else if (dateFrom && !dateTo) {
    StockSchema.find({
      trade_date: {
        $gte: moment(dateFrom, 'YYYY/MM/DD').format('M/DD/YYYY'),
      },
      code: code,
    }, (err, stock) => { res.json(stock); });
  }
  else if (code) {
    StockSchema.find({
      trade_date: {
        $gte: moment(dateFrom, 'YYYY/MM/DD').format('M/DD/YYYY'),
        $lte: moment(dateTo, 'YYYY/MM/DD').add(1, 'days').format('MM/DD/YYYY')
      },
      code: code,
    }, (err, stock) => { res.json(stock); });
  }
  else {
    res.json({ message: "Add this scenario." });
  }
});

stockRoutes.route('/add').post((req, res) => {
  const stocklist = req.body;

  stocklist.forEach(item => {
    item.trade_date = moment(item.trade_date, 'YYYYMMDD').add(1, 'days').format('MM/DD/YYYY');
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