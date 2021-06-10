import React from 'react';
import moment from 'moment';
import axios from 'axios';

const Transaction = ({
  quantity,
  drinkName,
  date,
  _id: transactionId,
  setRecentTransactions,
}) => {
  const removeTransaction = () => {
    axios
      .delete(`/routes/transactions/${transactionId}`)
      .then(() => {
        setRecentTransactions((currentTransactions) => {
          return currentTransactions.filter(
            (current) => current._id !== transactionId
          );
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ paddingLeft: '1rem' }}>
      <div className="row">
        <div className="col-8">
          <h5>
            {quantity} {drinkName}
            {quantity > 1 ? 's' : ''}
          </h5>
          <p>Sold {moment(date).fromNow()}</p>
        </div>
        <div className="col-4">
          <button
            className="btn btn-secondary btn-sm"
            onClick={removeTransaction}
          >
            Issue Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
