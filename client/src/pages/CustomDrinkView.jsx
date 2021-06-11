import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ingredientMap } from '../../utils/parseIng';
import { UserContext } from '../userContext';
import { imageUrlParser } from '../../utils/imageUrls';

const CustomDrinkView = () => {
  const location = useLocation();
  const { drink } = location.state;

  const { isLoggedIn, favoriteDrinks, toggleFavorite, removeFavorite } =
    useContext(UserContext);

  let { ingredients, instructions, name, alcoholic } = drink;

  //
  alcoholic = alcoholic ? 'Alcoholic' : 'Non-Alcoholic';

  let imgSrc = imageUrlParser();

  ingredients = ingredientMap(ingredients);

  let key = '';

  if (drink.strDrink) {
    key = drink.strDrink;
  } else if (drink.drinkName) {
    key = drink.drinkName;
  } else {
    key = drink.name;
  }
  const removeButton = () => {
    if (favoriteDrinks.includes(key)) {
      return (
        <span className="remove-button" onClick={() => removeFavorite(drink)}>
          <button type="button" className="btn btn-danger">
            Remove from Favorites
          </button>
        </span>
      );
    }
  };

  const drinkImage = () => {
    return favoriteDrinks.includes(key) ? (
      <div className="col-md-6">
        <img
          src={`../${imgSrc}`}
          className="img-fluid custom-drink-display"
          alt="custom cocktail image"
        />
      </div>
    ) : (
      <div className="col-md-6">
        <img
          src={`../images/emptyglass.png`}
          className="img-fluid custom-drink-display"
          alt="empty cocktail img"
        />
      </div>
    );
  };

  const userButtons = () => {
    if (isLoggedIn) {
      return (
        <>
          <br></br>
          <span className="drink-button">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                toggleFavorite(drink);
              }}
            >
              Add To Favorites
            </button>
          </span>
          {removeButton()}
        </>
      );
    }
  };

  return (
    <div className="container">
      <h2 className="page-heading" style={{ padding: '55px 0px 0px 0px' }}>
        {name || drink.drinkName}
      </h2>
      <div className="row">
        {isLoggedIn ? (
          drinkImage()
        ) : (
          <div className="col-md-6">
            <img
              src={`../${imgSrc}`}
              className="img-fluid custom-drink-display"
              alt="custom cocktail image"
            />
          </div>
        )}
        <div className="col-md-6 align-self-center custom-info">
          <h4 style={{ paddingBottom: '10px' }}>{alcoholic}</h4>
          <hr></hr>
          <h5 style={{ paddingBottom: '10px' }}>Ingredients</h5>
          <ul>
            {ingredients}
            {/* {ingredients.map((i, index) => {
              return (
                <li key={index}>
                  {' '}
                  {i}
                </li>
              ); //* each element is an array containing an ingredient followed by it's measurement
            })} */}
          </ul>
          <br />
          <h5>Directions</h5>
          <p>{instructions}</p>
          {userButtons()}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default CustomDrinkView;
