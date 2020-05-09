const stockRoutes = require('./backend/routes/stock.route');
const strategyRoutes = require('./backend/routes/strategy.route');
const backTestRoutes = require('./backend/routes/backtest.route');

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

mongoose.connect("mongodb://127.0.0.1:27017/express-traderr", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const { connection } = mongoose;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/stocks", stockRoutes);
app.use("/strategy", strategyRoutes);
app.use("/backTest", backTestRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
