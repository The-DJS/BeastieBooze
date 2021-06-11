import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from './userContext';

const ReportsContext = createContext();

const ReportsContextProvider = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const [allTransactions, setAllTransactions] = useState([]);
  const [chartView, setChartView] = useState('Week');
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

  const getWeekNum = () => {
    const today = moment();
    const month = today.month();
    const year = today.year();
    console.log(`Today: ${today}`);
    console.log(`Month: ${month}`);
    console.log(`Year: ${year}`);


    // const first = moment("2021-06-01"); //saturday
    // const nthOfMoth = Math.ceil(firstJun2021.date() / 7); //1

    // const Jun112021 = moment("2021-06-17"); //saturday, the next one
    // console.log(Math.ceil(Jun112021.date() / 7)); //prints 2, as expected
  }

  useEffect(() => {
    getWeekNum();
  }, [allTransactions])

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
