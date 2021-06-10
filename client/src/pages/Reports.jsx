import React, { useContext } from 'react';
import { ReportsContext } from '../reportsContext';
import { UserContext } from '../userContext';
import ThisWeek from '../components/charts/week/ThisWeek';
import LastSevenDays from '../components/charts/week/LastSevenDays';

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

  return (
    userInfo.businessId ?
      (
        <div className='container' style={{ maxWidth: '80vw' }}>
          <h1 className='page-heading'>
            Week View
          </h1>
          <div className='row'>
            {chartView === 'week' &&
              (
                <>
                  <ThisWeek />
                  <LastSevenDays />
                </>
              )
            }
            {/* {chartView === 'month' &&
              (
                <>
                  <ThisWeek />
                  <LastSevenDays />
                </>
              )
            } */}
          </div>
        </div>
      ) : (
        <div className='container'>
          <h1 className='page-heading'>
            Please register your bar in your profile first.
          </h1>
        </div>
      )
  )
};

export default Reports;
