const express = require('express');
const { addTransaction, removeTransaction, getAllTransactions } = require('../database/helpers');

const { Router } = express;
const transactionsRouter = Router();

transactionsRouter.post('/', (req, res) => {
  const { drinkId, businessId, quantity } = req.body;
  addTransaction(drinkId, businessId, quantity)
    .then((newTransaction) => res.send(newTransaction))
    .catch((err) => console.log(err));
});

transactionsRouter.delete('/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  removeTransaction(transactionId)
    .then((removed) => res.send(removed))
    .catch((err) => console.log(err));
});

transactionsRouter.get('/:businessId', (req, res) => {
  const { businessId } = req.params;
  getAllTransactions(businessId)
    .then((transactions) => res.send(transactions))
    .catch((err) => console.log(err));
});

module.exports = { transactionsRouter };
