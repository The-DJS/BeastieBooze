import React, { useState, useEffect, useContext, createContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { UserContext } from './userContext';

const ReportsContext = createContext();

const ReportsContextProvider = ({ children }) => {
  // User Context
  const { userInfo } = useContext(UserContext);
  const [allTransactions, setAllTransactions] = useState([]);
  const [chartView, setChartView] = useState('Year');
  const [drink, setDrink] = useState(null);

  // Datasets

  // YEARS
  const[thisYear, setThisYear] = useState([]);
  const[lastYear, setLastYear] = useState([]);

  // Month
  const[thisMonth, setThisMonth] = useState([]);
  const[lastMonth, setLastMonth] = useState([]);

  // WEEK
  const[thisWeek, setThisWeek] = useState([]);
  const[lastWeek, setLastWeek] = useState([]);

  // Breakdown
  const[totalSold, setTotalSold] = useState([]);
  const[percentageSold, setPercentageSold] = useState([]);

  const filterYear = () => {
    const today = moment();
    console.log(today);
  }

  // Use effect to set all transactions the states when the user logs in
  useEffect(() => {
    if (userInfo.businessId) {
      axios
        .get(`/routes/transactions/${userInfo.businessId}`)
        .then(({ data: transactions }) => {
          setAllTransactions(transactions);
        })
        .catch((err) => console.log(err));
    }
  }, [userInfo]);

  // Use effect to set data sets when all transactions are set.
  useEffect(() => {
    filterYear();
  }, [allTransactions]);

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
