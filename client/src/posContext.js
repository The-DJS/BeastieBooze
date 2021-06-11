import React, { useState, createContext } from 'react';

const POSContext = createContext();

function POSContextProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const removeTransaction = (transactionId) => {
    setTransactions(
      transactions.filter((transaction) => transaction._id !== transactionId)
    );
  };

  return (
    <POSContext.Provider
      value={{ transactions, addTransaction, removeTransaction }}
    >
      {children}
    </POSContext.Provider>
  );
}

export { POSContextProvider, POSContext };
