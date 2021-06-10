const { Router } = require('express');
const {
  registerBusiness,
  addMenuItem,
  removeMenuItem,
  getAllBusinesses,
  removeBusiness,
  getSingleBusinessInfo,
} = require('../database/helpers.js');

const businessesRouter = Router();

businessesRouter.get('/:businessId', (req, res) => {
  const { businessId } = req.params;
  getSingleBusinessInfo(businessId)
    .then((business) => {
      if (!business) {
        return res.send(false);
      }
      res.send(business);
    })
    .catch((err) => console.log(err));
});

businessesRouter.get('/', (req, res) => {
  console.log(req.body, 'hey im here');
  getAllBusinesses()
    .then((businesses) => {
      res.send(businesses);
    })
    .catch((err) => console.log(err));
});

businessesRouter.post('/', (req, res) => {
  const {
    googleId,
    name,
    contactInformation: contactInformationObj,
    details: detailsObj,
  } = req.body;
  registerBusiness(googleId, name, contactInformationObj, detailsObj)
    .then((newBusiness) => {
      if (!newBusiness) {
        return res.send(newBusiness);
      }
      res.send(newBusiness);
    })
    .catch((err) => console.log(err));
});

businessesRouter.post('/drink', (req, res) => {
  const { businessId, drinkObj } = req.body;
  addMenuItem(businessId, drinkObj)
    .then((newMenu) => {
      if (!newMenu) {
        return res.send(newMenu);
      }
      res.send(newMenu);
    })
    .catch((err) => console.log(err));
});

businessesRouter.delete('/drink', (req, res) => {
  const { businessId, drinkObj } = req.body;
  removeMenuItem(businessId, drinkObj)
    .then((newMenu) => {
      if (!newMenu) {
        return res.send(newMenu);
      }
      res.send(newMenu);
    })
    .catch((err) => console.log(err));
});

businessesRouter.delete('/', (req, res) => {
  console.log(req.body);
  const { businessId, googleId } = req.body;
  removeBusiness(businessId, googleId)
    .then((Success) => {
      res.send(Success);
    })
    .catch((err) => console.log(err));
});

businessesRouter.get('/', (req, res) => {
//get the drink id for the api
//then add it to the menu
})

module.exports = { businessesRouter };
