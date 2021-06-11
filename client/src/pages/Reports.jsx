import React, { useContext } from 'react';
import { ReportsContext } from '../reportsContext';
import { UserContext } from '../userContext';
import ThisWeek from '../components/charts/week/ThisWeek';
import LastSevenDays from '../components/charts/week/LastSevenDays';
import ThisMonth from '../components/charts/month/ThisMonth';
import Last30Days from '../components/charts/month/Last30Days';
import ThisYear from '../components/charts/year/ThisYear';
import LastYear from '../components/charts/year/LastYear';

const Reports = () => {
  const {
    allTransactions,
    setAllTransactions,
    chartView,
    setChartView,
    drink,
    setDrink,
  } = useContext(ReportsContext);
  const { userInfo } = useContext(UserContext);

  return userInfo.businessId ? (
    <div className="container" style={{ maxWidth: '80vw' }}>
      <h1 className="page-heading">Reports</h1>
      <h1 className="mb-3 text-center">{chartView} View</h1>
      <div className="row">
        {chartView === 'Week' && (
          <>
            <ThisWeek />
            <LastSevenDays />
          </>
        )}
        {chartView === 'Month' && (
          <>
            <ThisMonth />
            <Last30Days />
          </>
        )}
        {chartView === 'Year' && (
          <>
            <ThisYear />
            <LastYear />
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="container">
      <h1 className="page-heading">
        Please login or register your bar in your profile first.
      </h1>
    </div>
  );
};

export default Reports;
