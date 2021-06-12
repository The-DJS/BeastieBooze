import React from 'react';
import { Link } from 'react-router-dom';
import ImgWrapper from './ImgWrapper';

const DrinkTile = ({ drink }) => {
  // grabbing properties from drink object and reassigning them to better variable names
  const { idDrink: id, strDrink: name } = drink;



  return (
    <div className="col-md-4">
      <div className="drink-tile">
        <Link
          to={{
            pathname: `/drink/${id}`,
            state: { drink },
          }}
        >
          <ImgWrapper drink={drink} />
        </Link>
      </div>
    </div>
  );
};

export default DrinkTile;
