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
  const [thisYear, setThisYear] = useState([]);
  const [lastYear, setLastYear] = useState([]);

  // Month
  const [thisMonth, setThisMonth] = useState([]);
  const [lastMonth, setLastMonth] = useState([]);

  // WEEK
  const [thisWeek, setThisWeek] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);

  // Breakdown
  const [totalSold, setTotalSold] = useState([]);
  const [percentageSold, setPercentageSold] = useState([]);

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

    const thisYearUnits = {
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
      thisYearUnits[transactionMonth] += transaction.quantity;
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

    const makeYearsTotal = () => {
      const thisYear = Object.values(thisYearUnits);
      const lastYear = Object.values(lastYearUnits);
      let thisYearFinal = 0;
      let lastYearFinal = 0;

      thisYear.map(val => {
        thisYearFinal += val;
      });

      lastYear.map(val => {
        lastYearFinal += val;
      });

      thisYearUnits['Total'] = thisYearFinal
      lastYearUnits['Total'] = lastYearFinal;
    };

    makeYearsTotal();

    const makeOutput = () => {
      const thisYear = moment().format('YYYY');
      let lastYear = moment().subtract(1, 'years').format('YYYY');

      const thisYearOutput = [];
      const lastYearOutput = [];

      thisYearOutput.push([thisYear, null]);
      lastYearOutput.push([lastYear, null]);

      for (let key in thisYearUnits) {
        const tuple = [key, thisYearUnits[key]];
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

  const filterMonth = () => {
    const today = moment();
    let todayLastMonth = moment().subtract(1, 'months');

    // Start of this month and last month
    const thisMonthStartFormatted = today.startOf('month').format('YYYY[-]MM[-]DD');
    const lastMonthStartFormatted = todayLastMonth.startOf('month').format('YYYY[-]MM[-]DD');

    // End of this month and last month.
    const thisMonthEndFormatted = today.endOf('month').format('YYYY[-]MM[-]DD');
    const lastMonthEndFormatted = todayLastMonth.endOf('month').format('YYYY[-]MM[-]DD');

    const thisMonthUnits = {
      'Week 1': 0,
      'Week 2': 0,
      'Week 3': 0,
      'Week 4': 0,
      'Week 5': null,
      'Week 6': null,
    };

    const lastMonthUnits = {
      'Week 1': 0,
      'Week 2': 0,
      'Week 3': 0,
      'Week 4': 0,
      'Week 5': null,
      'Week 6': null,
    };

    const setWeeks = () => {
      const thisMonthEnd = today.endOf('month');
      const lastMonthEnd = moment().subtract(1, 'months').endOf('month');

      const thisMonthEndWeek = Math.ceil(thisMonthEnd.date() / 7);
      const lastMonthEndWeek = Math.ceil(lastMonthEnd.date() / 7);

      if (thisMonthUnits[`Week ${thisMonthEndWeek}`] === null) {
        for (let i = 1; i < thisMonthEndWeek + 1; i++) {
          thisMonthUnits[`Week ${i}`] = 0;
        }
      }

      if (lastMonthUnits[`Week ${lastMonthEndWeek}` === null]) {
        for (let i = 1; i < lastMonthEndWeek + 1; i++) {
          lastMonthUnits[`Week ${i}`] = 0;
        }
      }
    }

    setWeeks();

    const addToThisMonth = (weekNum, quantity) => {
      if (thisMonthUnits[`Week ${weekNum}`] !== null) {
        thisMonthUnits[`Week ${weekNum}`] += quantity;
      } else {
        thisMonthUnits[`Week ${weekNum}`] = quantity;
      }
    };

    const addToLastMonth = (weekNum, quantity) => {
      if (lastMonthUnits[`Week ${weekNum}`] !== null) {
        lastMonthUnits[`Week ${weekNum}`] += quantity;
      } else {
        lastMonthUnits[`Week ${weekNum}`] = quantity;
      }
    };

    allTransactions.map(transaction => {
      const transactionDate = moment(transaction.date).format('YYYY[-]MM[-]DD');
      const transactionDateMoment = moment(transaction.date);

      if (moment(transactionDate).isBetween(thisMonthStartFormatted, thisMonthEndFormatted)) {
        const weekNum = Math.ceil(transactionDateMoment.date() / 7);

        addToThisMonth(weekNum, transaction.quantity);
      } else if (moment(transactionDate).isBetween(lastMonthStartFormatted, lastMonthEndFormatted)) {
        const weekNum = Math.ceil(transactionDateMoment.date() / 7);

        addToLastMonth(weekNum, transaction.quantity);
      }
    });

    const makeMonthsTotal = () => {
      const thisMonth = Object.values(thisMonthUnits);
      const lastMonth = Object.values(lastMonthUnits);
      let thisMonthFinal = 0;
      let lastYearFinal = 0;

      thisMonth.map(val => {
        if (val !== null) {
          thisMonthFinal += val;
        }
      });

      lastMonth.map(val => {
        if (val !== null) {
          thisMonthFinal += val;
        }
      });

      thisMonthUnits['Total'] = thisMonthFinal
      lastMonthUnits['Total'] = lastYearFinal;
    };

    makeMonthsTotal();

    const makeOutput = () => {
      const thisMonth = moment().format('MMMM');
      let lastMonth = moment().subtract(1, 'months').format('MMMM');

      const thisMonthOutput = [];
      const lastMonthOutput = [];

      thisMonthOutput.push([thisMonth, null]);
      lastMonthOutput.push([lastMonth, null]);

      for (let key in thisMonthUnits) {
        if (thisMonthUnits[key] !== null) {
          const tuple = [key, thisMonthUnits[key]];
          thisMonthOutput.push(tuple);
        }
      }

      for (let key in lastMonthUnits) {
        if (lastMonthUnits[key] !== null) {
          const tuple = [key, lastMonthUnits[key]];
          lastMonthOutput.push(tuple);
        }
      }

      setThisMonth(thisMonthOutput);
      setLastMonth(lastMonthOutput);
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
        .catch((err) => console.warn(err));
    }
  }, [userInfo]);

  // Use effect to set data sets when all transactions are set.
  useEffect(() => {
    filterYear();
    filterMonth();
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
        thisMonth,
        lastMonth,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export { ReportsContext, ReportsContextProvider };
