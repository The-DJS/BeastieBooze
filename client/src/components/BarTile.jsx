import React from 'react';
import { Link } from 'react-router-dom';
import ImgWrapper from './ImgWrapper';


const BarTile = ({ barObj }) => {
  console.log(barObj);
  const styles = {
    card: {
      backgroundColor: '#B7E0F2',
      borderRadius: 5,
      padding: '2rem',
      height:'250px',
      width:'100%',
    },
    cardImage: {
      float:'left',
      width:  '200px',
      height: '200px',
  }
}
  return (
    <div className="col-md-4"  >
      <div className="bar-tile" style={styles.cardImage} >
        <Link
          to={{
            pathname: `/businesses/${barObj._id}`,
            state: { barObj },
          }}

        >
          <ImgWrapper barObj={barObj} />
        </Link>
      </div>
    </div>
  );
};

export default BarTile;
