import React, { useEffect, useContext } from 'react';
import { BarContext } from '../barContext';
import { UserContext } from '../userContext';
import BusinessDetail from './BusinessDetail.jsx';
import BarTile from '../components/BarTile';
import { v4 as getKey } from 'uuid';

const BusinessSummary = () => {
  const { verifyAge, isLegal } = useContext(UserContext);
  const { bars, fetchBars, setBars } = useContext(BarContext);

  useEffect(() => {
    if (isLegal === null) {
      verifyAge();
    }
  }, []);

  useEffect(() => {
    fetchBars()
      .then((bars) => setBars(bars))
      .catch((err) => console.log(err));
  }, []);

  const styles = {
    card: {
      backgroundColor: '#B7E0F2',
      borderRadius: 5,
      padding: '2rem',
      height:'250px',
      width:'100%',
    },
    cardImage: {
      objectFit: 'cover',
      borderRadius: 55,
      height:'250px',
      width:'100%',
  }
}
  return isLegal ? (
    <div className="container">
      <h1 className="page-heading">Businesses</h1>
      <div className="row" >
        {bars.map((barObj) => (
          <BarTile key={getKey()} barObj={barObj} />
        ))}
      </div>
    </div>
  ) : (
    <div className='container'>
    <h1 className='page-heading'>
      This page is restricted for people under the age of 21
    </h1>
  </div>
  );
};

export default BusinessSummary;
