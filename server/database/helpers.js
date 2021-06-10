const { User, Drink, Business, Transaction, addDrink } = require('./Models');
require('dotenv').config();
const { API_KEY } = require('../config.js');

// getUser should take a userId and return the found user, empty array or null if not found?
const getUser = async (id) => {
  try {
    const user = await User.find({ googleId: id });
    console.log(user);
    return user;
  } catch (err) {
    console.log('getUser failed', err);
  }
};

// createUser should take a user object ({ googleId, username }) which should make a new user entry in the db
const createUser = async (userObj) => {
  const { googleId, givenName: username } = userObj;

  try {
    const newUser = await User.create({ googleId, username });
    return newUser;
  } catch (err) {
    console.log('createUser failed', err);
  }
};

const findAndUpdate = async (id, data) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $push: { creations: data } },
    { new: true }
  );
  return updatedUser;
};

const findAndUpdateFavorites = async (id, data) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $push: { favorites: data } },
    { new: true }
  );
  return updatedUser;
};

const findAndDeleteFavorites = async (id, drinkId) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $pull: { favorites: { favId: drinkId } } },
    { new: true }
  );
  return updatedUser;
};

const getAllBusinesses = async () => {
  try {
    const businesses = await Business.find();
    const mappedBusinesses = await Promise.all(
      businesses.map(async (business) => {
        const mappedMenu = await Promise.all(
          business.menu.map(async (drinkId) => {
            const drink = await Drink.findById(drinkId);
            console.log(drink);
            return drink;
          })
        );
        return { ...business._doc, menu: mappedMenu };
      })
    );
    return mappedBusinesses;
  } catch (error) {
    throw error;
  }
};

const registerBusiness = async (
  googleId,
  name,
  contactInformationObj,
  detailsObj
) => {
  try {
    const business = await Business.findOne({ name });
    if (business) {
      return false;
    }
    const newBusiness = await new Business({
      name,
      contactInformation: contactInformationObj,
      details: detailsObj,
    }).save();
    const user = await User.findOne({ googleId });
    user.businessId = newBusiness._id;
    await user.save();
    return newBusiness;
  } catch (error) {
    throw error;
  }
};

const removeBusiness = async (businessId, googleId, drinkId) => {
  try {
    const user = await User.findOne({ googleId });
    console.log(user, 'user');
    if (!user) {
      return false;
    }
    user.businessId = null;
    //  await user.save()
    const business = await Business.findOne({ _id: businessId });
    //  await Business.findOneAndDelete({_id : businessId})
    const menu = business.menu.slice();
    if (!business) {
      return false;
    }
    console.log(business, 'business');

    for (drinkId of menu) {
      const drink = await Drink.findById(drinkId);
      const filterId = drink.soldAt.filter(
        (currentBusinessId) => currentBusinessId.toString() !== businessId
      );
      console.log(filterId, 'yoyooyoyoy');
      console.log(drink, 'drink');
    }
    await user.save();
    await Business.findOneAndDelete({ _id: businessId });
    return true;
  } catch (error) {
    throw error;
  }
};

const addMenuItem = async (businessId, drinkObj) => {
  try {
    const { name, alcoholic, directions, ingredients } = drinkObj;
    const business = await Business.findById(businessId);
    if (!business) {
      return 'didnt find business!';
    }
    let drink = await Drink.findOne({ name });
    console.log(drink)
    if (!drink) {
      await addDrink({
        drinkName: name,
        instructions: directions,
        alcoholic: alcoholic === 'Alcoholic' ? true : false,
        ingredients,
      });
      const foundDrink = await Drink.findOne({ name });
      if (foundDrink) {
        drink = foundDrink;
      } else {
        return false;
      }
    }
    business.menu = business.menu.includes(drink._id.toString())
      ? business.menu
      : [...business.menu, drink._id];
    await business.save();
    drink.soldAt = drink.soldAt.includes(business._id.toString())
      ? drink.soldAt
      : [...drink.soldAt, business._id];
    await drink.save();
    return business.menu;
  } catch (error) {
    throw error;
  }
};

const removeMenuItem = async (businessId, drinkObj) => {
  try {
    const { name } = drinkObj;
    const business = await Business.findById(businessId);
    if (!business) {
      return false;
    }
    const mappedMenu = await Promise.all(
      business.menu.map(async (id) => {
        const foundDrink = await Drink.findById(id);
        return { id, name: foundDrink.name };
      })
    );
    business.menu = mappedMenu
      .filter((currentDrinkObj) => currentDrinkObj.name !== name)
      .map((currentDrinkObj) => currentDrinkObj.id);
    const savedBusiness = await business.save();
    const drink = await Drink.findOne({ name });
    drink.soldAt = drink.soldAt.filter((id) => id.toString() !== businessId);
    await drink.save();
    return savedBusiness.menu;
  } catch (error) {
    throw error;
  }
};

const getSingleBusinessInfo = async (businessId) => {
  const business = await Business.findById(businessId);
  if (!business) {
    return false;
  }
  const mappedMenu = await Promise.all(
    business.menu.map(async (id) => {
      const foundDrink = await Drink.findById(id);
      return { name: foundDrink.name, drinkId: foundDrink._id };
    })
  );
  return { ...business._doc, menu: mappedMenu };
};

const addTransaction = async (drinkId, businessId, quantity) => {
  const business = await Business.findById(businessId);
  if (!business) {
    return 'business does not exist';
  }
  const drink = await Drink.findById(drinkId);
  if (!drink) {
    return 'drink does not exist';
  }
  const newTransaction = await new Transaction({
    drinkId,
    businessId,
    quantity,
    date: new Date(),
  }).save();
  if (!newTransaction) {
    return 'save unsuccessful';
  }
  business.transactions = [...business.transactions, newTransaction._id];
  await business.save();
  return newTransaction;
};

const removeTransaction = async (transactionId) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    return false;
  }
  const business = await Business.findById(transaction.businessId);
  if (!business) {
    return false;
  }
  await Transaction.findByIdAndDelete(transactionId);
  business.transactions = [...business.transactions].filter(
    (id) => id.toString() !== transactionId
  );
  await business.save();
  return true;
};

module.exports = {
  getUser,
  createUser,
  findAndUpdate,
  findAndUpdateFavorites,
  findAndDeleteFavorites,
  registerBusiness,
  addMenuItem,
  removeMenuItem,
  getAllBusinesses,
  removeBusiness,
  getSingleBusinessInfo,
  addTransaction,
  removeTransaction,
};
