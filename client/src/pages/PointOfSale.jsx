import React, { useContext } from 'react';
import { BarContext } from '../barContext';
import { v4 as getKey } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

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
  return (
    <div className="container">
      <div className="row">
        <h2 className="page-heading" style={{ padding: '55px 0 0 0' }}>
          Point of Sale
        </h2>
      </div>
      <div className="row">
        {menu.map((menuItem) => {
          const { name } = menuItem;
          return (
            <span key={getKey()} className="card col-4">
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </p>
                <button className="btn btn-dark btn-lg">Add Sale</button>
              </div>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PointOfSale;
