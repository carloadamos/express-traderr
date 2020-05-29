/**
 * Libraries
 */
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

/**
 * Routes
 */
import stockRoutes from './routes/stock.route';
import strategyRoutes from './routes/strategy.route';
import backTestRoutes from './routes/backtest.route';
import transactionHistoryRoutes from './routes/transactionhistory.route';

/**
 * Constant
 */
import connectionUrl from './constant';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(json({ limit: "50mb" }));

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const { connection } = mongoose;

connection.once("open", () => {
  console.log("Connected to sacred database successfully!");
});

app.use("/stocks", stockRoutes);
app.use("/strategy", strategyRoutes);
app.use("/back_test", backTestRoutes);
app.use("/transaction_history", transactionHistoryRoutes);

app.listen(port, () => {
  console.log(`Captain, server is running on port ${port}`);
});