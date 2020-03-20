const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 4000;
const mongoose = require('mongoose');

const stockRoutes = express.Router();

const Stock = require('./backend/stock.model');

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/express-traderr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

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

stockRoutes.route('/add').post((req, res) => {
  const stockList = req.body;

  stockList.forEach(item => {
    const stock = new Stock(item);
    stock.save();
  });

  if (stockList.length === 0) return res.status(400).json({ stock: 'Error saving' });
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
          res.json('Todo updated!');
        })
        .catch(error => {
          res.status(400).send(`${error} Update not possible`);
        });
    }
  });
});

app.use('/stocks', stockRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
