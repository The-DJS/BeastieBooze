import React, { useContext, useState } from 'react';
import { BarContext } from '../barContext';
import { v4 as getKey } from 'uuid';
import PointOfSaleTile from '../components/PointOfSaleTile';
import Transaction from '../components/Transaction';

const PointOfSale = () => {
  const { currentBar } = useContext(BarContext);
  if (!currentBar) {
    return <h1>Loading...</h1>;
  }
  const {
    contactInformation: { address, email, phone },
    details: { hoursOfOperation, description },
    menu,
    name,
  } = currentBar;
  const [recentTransactions, setRecentTransactions] = useState([]);
  return (
    <div className="container">
      <h2 className="page-heading" style={{ padding: '55px 0 0 0' }}>
        Point of Sale
      </h2>
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {menu.map((menuItem) => {
              return (
                <PointOfSaleTile
                  key={getKey()}
                  {...menuItem}
                  setRecentTransactions={setRecentTransactions}
                />
              );
            })}
          </div>
        </div>
        <div className="col-md-4">
          {recentTransactions.slice(0, 5).map((transaction) => (
            <Transaction
              key={getKey()}
              {...transaction}
              setRecentTransactions={setRecentTransactions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointOfSale;
