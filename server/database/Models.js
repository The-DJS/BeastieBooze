const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const { number } = require('prop-types');
const DATABASE = 'BeastieBooze';

const uri = `mongodb+srv://DavidSosa20:${process.env.DATABASE_PASSWORD}@cluster0.z2svn.mongodb.net/beastie-booze?retryWrites=true&w=majority`;

// const db = mongoose
//   .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   // eslint-disable-next-line no-console
//   .then(() => console.log('connected to db'))
//   .catch();

// for dev - uncomment the next line and comment out line 10
// const dbLocation = `mongodb://localhost:27017/${DATABASE}`;
// for prod
// const dbLocation = `${process.env.ATLAS_URL}${DATABASE}`;
// const dbLocation = process.env.ATLAS_URL;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('connected to db'))
  .catch();
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
const UserSchema = new mongoose.Schema({
  googleId: String, // not sure if this will a string or a number, need to check once we can get data from google
  username: String,
  favorites: [],
  creations: [],
  businessId: mongoose.Schema.Types.ObjectId,
});
const DrinkSchema = new mongoose.Schema({
  name: String,
  instructions: String,
  ingredients: {},
  alcoholic: Boolean,
  createdBy: String,
  soldAt: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
  //add a createdBy to the drinkSchema to link to Users once created
});
const BusinessSchema = new mongoose.Schema({
  name: String,
  contactInformation: {
    address: String,
    phone: String,
    email: String,
  },
  details: {
    hoursOfOperation: String,
    description: String,
  },
  menu: [{ type: mongoose.Schema.Types.ObjectId, default: [] }], // drink docs
  transactions: [{ type: mongoose.Schema.Types.ObjectId, default: [] }], // transaction docs
});
const TransactionSchema = new mongoose.Schema({
  drinkId: mongoose.Schema.Types.ObjectId,
  businessId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
  date: Date,
});
const User = mongoose.model('User', UserSchema);
const Drink = mongoose.model('Drink', DrinkSchema);
const Business = mongoose.model('Business', BusinessSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);
const addDrink = async (drink) => {
  const { drinkName: name, instructions, ingredients, alcoholic } = drink;
  const newDrink = new Drink({
    name,
    instructions,
    alcoholic,
    ingredients,
  });
  await newDrink.save();
};
const getDrinks = async () => {
  return await Drink.find({}).exec();
};
module.exports = {
  User,
  Drink,
  Business,
  Transaction,
  addDrink,
  getDrinks,
};
