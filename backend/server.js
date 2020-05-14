import stockRoutes from './routes/stock.route';
import strategyRoutes from './routes/strategy.route';
import backTestRoutes from './routes/backtest.route';
import transactionHistoryRoutes from './routes/transactionhistory.route';

import express from "express";
import { json } from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(json({ limit: "50mb" }));

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
app.use("/back_test", backTestRoutes);
app.use("/transaction_history", transactionHistoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
