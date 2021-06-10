import axios from 'axios';
import React, { useState, useContext } from 'react';
import { UserContext } from '../userContext';

const PointOfSaleTile = ({ name, drinkId, setRecentTransactions }) => {
  const { userInfo } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);

  const submitForm = () => {
    axios
      .post('/routes/transactions', {
        drinkId,
        businessId: userInfo.businessId,
        quantity,
      })
      .then(({ data: transaction }) => {
        setRecentTransactions((state) => {
          return [transaction, ...state];
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <span className="card col-4">
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
        <p>
          <button className="btn btn-dark" onClick={submitForm}>
            Add Sale
          </button>
        </p>
      </div>
    </span>
  );
};

export default PointOfSaleTile;
