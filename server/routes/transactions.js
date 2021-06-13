const express = require('express');
const {
  addTransaction,
  removeTransaction,
  getAllTransactions,
} = require('../database/helpers');

const { Router } = express;
const transactionsRouter = Router();

transactionsRouter.post('/', (req, res) => {
  const { drinkId, businessId, quantity } = req.body;
  addTransaction(drinkId, businessId, quantity)
    .then((newTransaction) => res.send(newTransaction))
    .catch((err) => console.log(err));
});

transactionsRouter.delete('/:transactionId/:businessId', (req, res) => {
  const { transactionId, businessId } = req.params;
  removeTransaction(transactionId, businessId)
    .then((removed) => res.send(removed))
    .catch((err) => console.log(err));
});

transactionsRouter.get('/:businessId', (req, res) => {
  const { businessId } = req.params;
  if (businessId) {
    getAllTransactions(businessId)
      .then((transactions) => {
        if (transactions) {
          res.status(200).send(transactions);
        } else {
          res.sendStatus(400);
        }
      })
      .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = { transactionsRouter };
