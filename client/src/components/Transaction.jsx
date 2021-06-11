import React, { useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { POSContext } from '../posContext';

const Transaction = ({ quantity, drinkName, date, _id: transactionId }) => {
  const { removeTransaction } = useContext(POSContext);
  const _removeTransaction = () => {
    axios
      .delete(`/routes/transactions/${transactionId}`)
      .then(() => {
        removeTransaction(transactionId);
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
            onClick={_removeTransaction}
          >
            Issue Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
