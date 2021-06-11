import React, { useContext, useEffect } from 'react';
import { BoozeContext } from '../boozeContext';
import CustomDrinkTile from '../components/CustomDrinkTile';
import { imageUrlParser } from '../../utils/imageUrls';
import { v4 as getKey } from 'uuid';

const CustomFeed = () => {
  const { customDrinks, getCustomDrinks } = useContext(BoozeContext);

  useEffect(() => {
    getCustomDrinks();
  }, []);

  return (
    <div className="container">
      <h1 className="page-heading">
        Beastly Concoctions<br></br>(User Submissions)
      </h1>
      <div className="row d-flex justify-content-center">
        {customDrinks.map((drink, i) => {
          //selects an image address for randomizing drink images
          let imageSrc = imageUrlParser();
          return (
            <CustomDrinkTile drink={drink} key={getKey()} imageSrc={imageSrc} />
          );
        })}
      </div>
    </div>
  );
};

export default CustomFeed;
