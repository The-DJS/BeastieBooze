import axios from 'axios';
import React, { useState, useContext } from 'react';
import { POSContext } from '../posContext';
import { UserContext } from '../userContext';
import { BoozeContext } from '../boozeContext';
import { BarContext } from '../barContext';

const PointOfSaleTile = ({ name, drinkId, removeMenuItem, menuLength }) => {
  const { userInfo } = useContext(UserContext);
  const { transactions, addTransaction } = useContext(POSContext);
  const { aDrink } = useContext(BoozeContext);
  const { fetchCurrentBar } = useContext(BarContext);

  const [quantity, setQuantity] = useState(1);

  const submitForm = () => {
    console.log('sumbitted');
    axios
      .post('/routes/transactions', {
        drinkId,
        businessId: userInfo.businessId,
        quantity,
      })
      .then(({ data: transaction }) => {
        addTransaction(transaction);
      })
      .catch((err) => console.log(err));
  };

  const removeFromMenu = () => {
    axios
      .delete('/routes/businesses/drink', {
        data: {
          businessId: userInfo.businessId,
          drinkObj: { name },
        },
      })
      .then(({ data: newMenu }) => {
        removeMenuItem(name);
        fetchCurrentBar();
      })
      .catch((err) => console.log(err));
  };

  const removeFromMenuButton = () => {
    if (true) {
      return (
        <span className="remove-from-menu-button" onClick={removeFromMenu}>
          <button
            type="button"
            className={`btn btn-dark`}
            style={{ margin: '10px' }}
          >
            Remove from Menu
          </button>
        </span>
      );
    }
  };

  return (
    <span
      className={`card ${
        menuLength === 1 ? 'col-12' : menuLength === 2 ? 'col-6' : 'col-4'
      }`}
    >
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-text">
          <button
            className="btn btn-secondary"
            onClick={() => setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            style={{ width: '2rem', margin: '1rem' }}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className="btn btn-secondary"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </p>
        <p className="card-text">
          <button
            className={`btn btn-dark`}
            onClick={submitForm}
            style={{ margin: '10px' }}
          >
            Add Sale
          </button>
          {removeFromMenuButton()}
        </p>
      </div>
    </span>
  );
};

export default PointOfSaleTile;
