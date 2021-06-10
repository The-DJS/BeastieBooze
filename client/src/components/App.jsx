// table of contents
// renders all of our different views
// view switcher - main, single drink, create, profile, login/signup buttons, search

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Create from '../pages/Create';
import Feed from '../pages/Feed';
import DrinkView from '../pages/DrinkView';
import Login from '../pages/Login';
import Search from '../pages/Search';
import CustomFeed from '../pages/CustomFeed';
import CustomDrinkView from '../pages/CustomDrinkView';
import Profile from '../pages/Profile';
import BusinessSummary from '../pages/BusinessSummary.jsx';
import BusinessDetail from '../pages/BusinessDetail.jsx';
import PointOfSale from '../pages/PointOfSale.jsx';
import Reports from '../pages/Reports.jsx';
import { ReportsContextProvider } from '../reportsContext';

const App = () => {
  // using react router to conditionally render views

  return (
    <div className="app-body">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Feed} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/search" component={Search} />
        <Route path="/login" component={Login} />
        <Route path="/profile/:userId" component={Profile} />
        <Route path="/drink/:drinkId" component={DrinkView} />{' '}
        {/* // takes a param and dynamically renders a drinkView */}
        <Route exact path="/custom" component={CustomFeed} />
        <Route path="/custom/:drinkId" component={CustomDrinkView} />
        <Route exact path="/businesses" component={BusinessSummary} />
        <Route path="/businesses/:businessId" component={BusinessDetail} />
        <Route path="/pos" component={PointOfSale} />
        {/* <Route path="/reports" component={Reports} /> */}
        <Route path="/reports">
          <ReportsContextProvider>
              <Reports />
            </ReportsContextProvider>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
