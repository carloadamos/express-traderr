import { Router } from 'express';
import TransactionHistory from '../model/transactionhistory.model';
const transactionHistoryRoutes = Router();

transactionHistoryRoutes.route('/').get((req, res) => {
  TransactionHistory.find((err, trans) => {
    if (err) {
      console.log(err);
    }
    res.json(trans);
  });
});

transactionHistoryRoutes.route('/add').post((req, res) => {
  const { transactionList } = req.body;

  transactionList.forEach(item => {
    const transaction = new TransactionHistory(item);
    transaction.save();
  });

  if (transactionList.length === 0) return req.status(400).json({ message: 'Error Saving' });
  res.status(200).json({ message: 'Transaction successfully added' });
});

module.exports = transactionHistoryRoutes;