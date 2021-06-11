const { Router } = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { addDrink, getDrinks } = require('../database/Models.js');

const customRouter = Router();

// customRouter sends a post request which sends userInput to database;
customRouter.post('/', (req, res) => {
  const drink = req.body;
  addDrink({ ...drink, isCustom: true })
    .then(() => {
      console.log('SAVED TO DB');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('ERROR', err);
      res.sendStatus(500);
    });
});

// GET ALL
customRouter.get('/', (req, res) => {
  getDrinks()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = { customRouter };
