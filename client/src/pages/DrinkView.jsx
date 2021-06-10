import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import ModalVideo from 'react-modal-video';
import { BoozeContext } from '../boozeContext';
import { UserContext } from '../userContext';
import { ingredientParser } from '../../utils/parseIng';
import { Link } from 'react-router-dom';
const DrinkView = () => {
  // useParams will grab the param passed in url. grabbing drinkId from params.
  const { drinkId } = useParams();
  const [aDrink, setADrink] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [tutorial, setTutorial] = useState();
  const [bars, setBars] = useState([])
  const [menu, setMenu] = useState({})

  console.log(aDrink)
  useEffect(() => {
    axios
      .get(`/routes/drink/${drinkId}`)
      .then(({ data }) => {
        console.log(data, 'DATA!!!')
        setADrink(data.drinks[0]);
      })
      .catch((err) => console.error('THIS IS OUR ERROR!', err, drinkId));

      axios
      .get('/routes/businesses')
      .then(({data}) => {
        console.log(data, drinkId, 'yoyoyoyo')
        setBars(data)
        setMenu(data.menu[0])
      })
      .catch((err) => console.error('ERROR!', err, drinkId));
  }, []);

  const ingredients = ingredientParser(aDrink);
  const {
    isLoggedIn,
    favoriteDrinks,
    toggleFavorite,
    removeFavorite,
    userInfo,
  } = useContext(UserContext);
  // grab what we need from drink object, reassign names
  const {
    idDrink: id,
    strDrink: name,
    strDrinkThumb: thumbnail,
    strAlcoholic: alcoholic,
    strGlass: glass,
    strInstructions: directions,
  } = aDrink;
  const removeFromMenu = () => {
    axios
      .delete('/routes/businesses/drink', {
        data: {
          businessId: userInfo.businessId,
          drinkObj: { name, directions, ingredients, alcoholic },
        },
      })
      .then(({ data: newMenu }) => console.log(newMenu))
      .catch((err) => console.log(err));
  };
  const removeFromMenuButton = () => {
    if (true) {
      return (
        <span className="remove-from-menu-button" onClick={removeFromMenu}>
          <button type="button" className="btn btn-dark drink-view-btn">
            Remove from Menu
          </button>
        </span>
      );
    }
  };
  const addToMenu = () => {
    axios
      .post('/routes/businesses/drink', {
        businessId: userInfo.businessId,
        drinkObj: { name, directions, ingredients, alcoholic },
      })
      .then(({ data: newMenu }) => console.log(newMenu))
      .catch((err) => console.log(err));
  };
  const addToMenuButton = () => {
    if (true) {
      return (
        <span className="add-to-menu-button" onClick={addToMenu}>
          <button type="button" className="btn btn-dark drink-view-btn">
            Add to Menu
          </button>
        </span>
      );
    }
  };
  const removeButton = () => {
    if (favoriteDrinks.includes(name)) {
      return (
        <span className="remove-button" onClick={() => removeFavorite(aDrink)}>
          <button type="button" className="btn btn-dark drink-view-btn">
            Remove from Favorites
          </button>
        </span>
      );
    }
  };
  const prepVideo = (title) => {
    setOpen(true);
    getVideo(title);
  };
  const getVideo = (title) => {
    axios
      .get(`/routes/tutorial/${name}`)
      .then(({ data }) => {
        setTutorial(data);
        console.log('DATA FROM Youtube request', data);
      })
      .catch();
  };
  const youTube = () => {
    if (true) {
      return (
        <React.Fragment>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId={tutorial}
            onClose={() => setOpen(false)}
          />
          <button
            className="btn btn-dark drink-view-btn"
            onClick={() => prepVideo()}
          >
            View Tutorial
          </button>
        </React.Fragment>
      );
    }
  };
  const userButtons = () => {
    if (isLoggedIn) {
      return (
        <>
          <br></br>
          <span className="drink-button">
            <button
              type="button"
              className="btn btn-dark drink-view-btn"
              onClick={() => {
                toggleFavorite(aDrink);
              }}
            >
              Add To Favorites
            </button>
          </span>
          {youTube()}
          {removeButton()}
          {addToMenuButton()}
          {removeFromMenuButton()}
        </>
      );
    }
  };
  return (
    <div className="container">
      <h2 className="page-heading">{name}</h2>
      <div className="row">
        <div className="col-md-8">
          <img src={thumbnail} className="img-fluid drink-display" alt={name} />
        </div>
        <div className="col-md-4">
          <h4>{alcoholic}</h4>
          <h4>Glass: {glass}</h4>
          <hr></hr>
          <h5>Ingredients</h5>
          <ul>
            {ingredients.map((i, index) => {
              return (
                <li key={index}>
                  {i[1]} {i[0]}
                </li>
              ); //* each element is an array containing an ingredient followed by it's measurement
            })}
          </ul>
          <h5>Directions</h5>
          <p>{directions}</p>
          {userButtons()}
          <br></br>
          <br></br>
          <h5>Bars</h5>
          <h5>{bars.map(bar => {
            console.log(aDrink.strDrink)
            console.log(bar.menu[0])
            if(bar.menu.includes(aDrink.strDrink)){
              return <p>{bar.name}</p>
            }else{
              return (
                //<li><Link to={`/drink/${drinkObj._id}`} >{drinkObj.name}</Link></li>
                // <p>{bar.name}</p>
                <li><Link to={`/businesses/${bar._id}`} >{bar.name}</Link></li>
              )
            }
          })}</h5>
        </div>
      </div>
    </div>
  );
};
export default DrinkView;