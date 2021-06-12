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
    let todayLastYear = moment();
    todayLastYear.subtract(1, 'years');

    // Start of this year and last year.
    const thisYearStart = today.startOf('year').format('YYYY[-]MM[-]DD');
    const lastYearStart = todayLastYear.startOf('year').format('YYYY[-]MM[-]DD');

    // End of this year and last year.
    const thisYearEnd = today.endOf('year').format('YYYY[-]MM[-]DD');
    const lastYearEnd = todayLastYear.endOf('year').format('YYYY[-]MM[-]DD');

    const ThisYearUnits = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    const lastYearUnits = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    const addToThisYear = (transaction) => {
      const transactionMonth = moment(transaction.date).format('MMM');
      ThisYearUnits[transactionMonth] += transaction.quantity;
    };

    const addToLastYear = (transaction) => {
      const transactionMonth = moment(transaction.date).format('MMM');
      lastYearUnits[transactionMonth] += transaction.quantity;
    };

    allTransactions.map(transaction => {
      const transactionDate = moment(transaction.date).format('YYYY[-]MM[-]DD');

      if (moment(transactionDate).isBetween(thisYearStart, thisYearEnd)) {
        addToThisYear(transaction);
      } else if (moment(transactionDate).isBetween(lastYearStart, lastYearEnd)) {
        addToLastYear(transaction);
      }
    });

    const makeYearTotal = () => {
      const thisYear = Object.values(ThisYearUnits);
      const lastYear = Object.values(lastYearUnits);
      let thisYearFinal = 0;
      let lastYearFinal = 0;

      thisYear.map(val => {
        thisYearFinal += val;
      });

      lastYear.map(val => {
        lastYearFinal += val;
      });

      ThisYearUnits['Total'] = thisYearFinal
      lastYearUnits['Total'] = lastYearFinal;
    };

    makeYearTotal();

    const makeOutput = () => {
      const thisYear = moment().format('YYYY');
      let lastYear = moment().subtract(1, 'years').format('YYYY');

      const thisYearOutput = [];
      const lastYearOutput = [];

      thisYearOutput.push([thisYear, null]);
      lastYearOutput.push([lastYear, null]);

      for (let key in ThisYearUnits) {
        const tuple = [key, ThisYearUnits[key]];
        thisYearOutput.push(tuple);
      }

      for (let key in lastYearUnits) {
        const tuple = [key, lastYearUnits[key]];
        lastYearOutput.push(tuple);
      }

      setThisYear(thisYearOutput);
      setLastYear(lastYearOutput);
    };

    makeOutput();
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
        thisYear,
        lastYear,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export { ReportsContext, ReportsContextProvider };
