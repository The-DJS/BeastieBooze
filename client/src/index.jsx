// import ReactDOM
// where we render App to the root or whatever we're calling it

import React from 'react';
import ReactDOM from 'react-dom';

// Can swap Hash Router for Browser Router

import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContextProvider } from './userContext';
import { BoozeContextProvider } from './boozeContext';
import { BarContextProvider } from './barContext';
import { POSContextProvider } from './posContext';

ReactDOM.render(
  <UserContextProvider>
    <BarContextProvider>
      <BoozeContextProvider>
        <POSContextProvider>
          <Router>
            <App />
          </Router>
        </POSContextProvider>
      </BoozeContextProvider>
    </BarContextProvider>
  </UserContextProvider>,
  document.getElementById('app')
);
