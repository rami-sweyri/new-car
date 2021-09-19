import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes/Index';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css';
import './index.css';
import { loadUser } from './redux/actions/auth';
import { useState, useEffect } from 'react';
import { readRoles } from './redux/actions/roles';
import { readPermissions } from './redux/actions/permissions';
import { readBuildings } from './redux/actions/building';
import { readCities } from './redux/actions/city';

const history = createBrowserHistory();

function App() {
  useEffect(() => {
    store
      .dispatch(loadUser())
      .then(result => {
        // store.dispatch(readRoles());
        // store.dispatch(readPermissions());
        // store.dispatch(readBuildings());
        // store.dispatch(readCities());
      })
      .catch(err => {});
  }, []);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route component={Routes} />
      </Router>
    </Provider>
  );
}

export default App;
