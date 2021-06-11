import React, { useContext, useState, useEffect } from 'react';
import { BarContext } from '../barContext';
import { UserContext } from '../userContext';
import { POSContext } from '../posContext';
import { v4 as getKey } from 'uuid';
import PointOfSaleTile from '../components/PointOfSaleTile';
import Transaction from '../components/Transaction';
import axios from 'axios';

const PointOfSale = () => {
  const { transactions } = useContext(POSContext);
  const { currentBar, setCurrentBar } = useContext(BarContext);
  const { userInfo } = useContext(UserContext);
  if (!currentBar) {
    return <h1>Loading...</h1>;
  }
  const {
    contactInformation: { address, email, phone },
    details: { hoursOfOperation, description },
    menu,
    name,
  } = currentBar;
  const [theMenu, setTheMenu] = useState(menu);
  const removeMenuItem = (name) => {
    console.log(name);
    setTheMenu(theMenu.filter((current) => current.name !== name));
  };
  useEffect(() => {
    if (userInfo.businessId) {
      axios
        .get(`/routes/businesses/${userInfo.businessId}`)
        .then(({ data: barInfo }) => setCurrentBar(barInfo))
        .catch((err) => console.log(err));
    }
  }, [userInfo]);
  return (
    <div className="container">
      <h2 className="page-heading" style={{ padding: '55px 0 0 0' }}>
        Point of Sale
      </h2>
      <div className="row">
        <div className={transactions.length ? 'col-8' : 'col-12'}>
          <div className="row">
            {theMenu.map((menuItem) => {
              return (
                <PointOfSaleTile
                  key={getKey()}
                  {...menuItem}
                  removeMenuItem={removeMenuItem}
                  menuLength={theMenu.length}
                />
              );
            })}
          </div>
        </div>
        <div className={transactions.length ? 'col-4' : 'col-0'}>
          {transactions
            .reverse()
            .slice(0, 5)
            .map((transaction) => (
              <Transaction key={getKey()} {...transaction} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PointOfSale;
