import { Router } from 'express';
import TransactionHistorySchema from '../model/transactionhistory.model';
const transactionHistoryRoutes = Router();

transactionHistoryRoutes.route('/').get((req, res) => {
  TransactionHistorySchema.find((err, trans) => {
    if (err) {
      console.log(err);
    }
    res.json(trans);
  });
});

transactionHistoryRoutes.route('/add').post((req, res) => {
  const { transactionList } = req.body;

  transactionList.forEach(item => {
    const transaction = new TransactionHistorySchema(item);
    transaction.save();
  });

  if (transactionList.length === 0) return res.json({ message: 'No Result' });
  res.status(200).json({ message: 'Transaction successfully added' });
});

module.exports = transactionHistoryRoutes;