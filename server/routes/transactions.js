const express = require('express');
const { addTransaction, removeTransaction } = require('../database/helpers');

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

module.exports = { transactionsRouter };
