// navbar will contain logo on the far left, signup/login or logout/username(profile view) buttons on the far right
// buttons to switch to either custom drinks page or the main feed

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Login from '../pages/Login.jsx';
// import { UserContext } from '../userContext.jsx';

import { UserContext } from '../userContext';

const Navbar = () => {
  //* links to endpoints that will be handled by Routes in App component
  const { userInfo, isLoggedIn } = useContext(UserContext);
  const { username } = userInfo;
  //state to hold collapsing navbar
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => {
    return setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <img src="images/beastieBoozeLogo.png"></img>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarTogglerDemo02"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
        id="navbarNav"
      >
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/search" className="nav-link">
              Search
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/custom" className="nav-link">
              Custom
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="nav-item">
              <Link to="/create" className="nav-link">
                Submit
              </Link>
            </li>
          ) : null}
          <li className="nav-item">
            <Link to="/businesses" className="nav-link">
              Businesses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pos" className="nav-link">
              Point of Sale
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reports">
              Reports
            </Link>
          </li>
        </ul>
        {username ? (
          <li className="nav-item">
            <Link to={`/profile/${userInfo.googleId}`}>
              <p className="nav-item grey">
                Welcome, {username}!&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
            </Link>
          </li>
        ) : null}
        <li className="nav-item login-nav">
          <div
            className="nav-link btn-nav"
            style={{ padding: '10px 0px 0px 0px' }}
          >
            <Login />
          </div>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
