const { Router } = require('express');
const {
  registerBusiness,
  addMenuItem,
  removeMenuItem,
  getAllBusinesses,
  removeBusiness,
  getSingleBusinessInfo,
  updateSingleBusinessInfo,
} = require('../database/helpers.js');

const businessesRouter = Router();

businessesRouter.get('/:businessId', (req, res) => {
  // console.log('in get');
  const { businessId } = req.params;
  getSingleBusinessInfo(businessId)
    .then((business) => {
      if (!business) {
        return res.send(false);
      }
      console.log(business);
      res.send(business);
    })
    .catch((err) => console.warn(err));
});

businessesRouter.get('/', (req, res) => {
  // console.log(req.body, 'hey im here');
  getAllBusinesses()
    .then((businesses) => {
      res.send(businesses);
    })
    .catch((err) => console.warn(err));
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
    .catch((err) => console.warn(err));
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
    .catch((err) => console.warn(err));
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
    .catch((err) => console.warn(err));
});

businessesRouter.delete('/:businessId/:googleId', (req, res) => {
  console.log('=================> Delete biz request params: ',req.params);
  const { businessId, googleId } = req.params;
  removeBusiness(businessId, googleId)
    .then((Success) => {
      res.send(Success);
    })
    .catch((err) => console.log(err));
});

businessesRouter.get('/', (req, res) => {
//get the drink id for the api
//then add it to the menu
});

businessesRouter.patch('/:businessId', (req, res) => {
  const { businessId } = req.params;
  const bar = req.body;

  if (businessId && bar) {
    updateSingleBusinessInfo(businessId, bar)
      .then(updatedBar => {
        if (updatedBar) {
          res.status(201).send(updatedBar)
        } else {
          res.sendStatus(400);
        }
      })
      .catch((err) => {
        console.warn(err);
        res.sendStatus(500)
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = { businessesRouter };
