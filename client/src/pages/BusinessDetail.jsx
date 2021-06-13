import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as getKey } from 'uuid';
import { Link } from 'react-router-dom';

const BusinessDetail = () => {
  const location = useLocation();
  const { barObj } = location.state;
  console.log('in business detail page', barObj);

  const [url, setUrl] = useState('');

  const {
    contactInformation: { address, email, phone },
    details: { description, hoursOfOperation },
    menu,
    name,
    imageUrl,
  } = barObj;

  return (
    <div className="container">
      <h2 className="page-heading" style={{ padding: '55px 0 0 0' }}>
        {name}
      </h2>
      <div className="row">
        <div
          className="col-md-6 text-center"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <img
            src={imageUrl ? imageUrl : <h1>loading photo...</h1>}
            className="img-fluid custom-drink-display"
            alt="bar image"
          />
        </div>{' '}
        <div className="col-md-6 align-self-center custom-info">
          <h4 style={{ paddingBottom: '10px', textTransform: 'capitalize' }}>
            {description}
          </h4>
          <hr />
          <h5 style={{ paddingBottom: '10px' }}>Location and Hours</h5>
          <p>{hoursOfOperation}</p>
          <p className="contact-info-paragraph">{address}</p>
          <p className="contact-info-paragraph">{phone}</p>
          <p className="contact-info-paragraph">{email}</p>
          <hr />
          <h5>Menu</h5>
          {menu.map((drinkObj) => {
            // <p className="menu-item-paragraph" key={getKey()}>
            //   {drinkObj.name}
            // </p>
            console.log(drinkObj);
            return <p style={{ marginBottom: 0 }}>{drinkObj.name}</p>;
          })}
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
