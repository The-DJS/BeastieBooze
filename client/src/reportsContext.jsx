import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';

const ReportsContext = createContext();

const ReportsContextProvider = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const [allTransactions, setAllTransactions] = useState([]);
  const [chartView, setChartView] = useState('week');
  const [drink, setDrink] = useState(null);

  // Use effect to set all transactions the states when the user logs in
  useEffect(() => {
    if (userInfo.businessId) {
      axios
        .get(`/routes/transactions/${userInfo.businessId}`)
        .then(({ data: transactions }) => {
          setAllTransactions(transactions);
        })
        .catch((err) => console.log(err))
    }
  }, [userInfo]);

  return (
    <ReportsContext.Provider
      value={{
        allTransactions,
        setAllTransactions,
        chartView,
        setChartView,
        drink,
        setDrink,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export { ReportsContext, ReportsContextProvider };
