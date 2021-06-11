import React, { useState, useEffect } from 'react';
import useHover from '../../utils/useHover';
import axios from 'axios';

const ImgWrapper = ({ drink = {}, barObj }) => {
  //* grabbing properties from drink object and reassigning them to less dumb variable names

  const {
    strDrink: name,
    strDrinkThumb: thumbnail,
    strIngredient1: ingredient,
  } = drink;

  // const getPhoto = async () => {
  //   const key = '6LiUm7mRi-WfSKgN7w7fBXuty5sJop57T254IIcieao';
  //   const { data } = await axios.get(
  //     `https://api.unsplash.com/photos/random?client_id=${key}&topics=bar&count=1`
  //   );
  //   const [
  //     {
  //       urls: { regular: url },
  //     },
  //   ] = data;
  //   return url;
  // };

  //is thumbnail loaded? Use a placehholder until image fetches from API
  const [source, setSource] = useState(
    !barObj ? '/images/martini.gif' : '/images/bar.jpeg'
  );
  useEffect(() => {
    if (Object.keys(drink).length) {
      setSource(thumbnail);
    } else {
      setSource(barObj.imageUrl);
    }
  }, []);

  //create hover state
  const [hoverRef, hovering] = useHover();

  return (
    <div className="img-wrap" ref={hoverRef}>
      <img
        className={
          // toggling classes for hover state
          hovering
            ? 'img-fluid drink-thumb border border-secondary tint'
            : 'img-fluid drink-thumb border border-secondary'
        }
        src={source}
        alt={name || barObj.name}
      />
      <div className={hovering ? 'wrap-text' : 'wrap-text hidden'}>
        {name || barObj.name}
      </div>
    </div>
  );
};

export default ImgWrapper;
