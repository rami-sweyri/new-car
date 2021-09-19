import React from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import { useHistory } from 'react';
import Auth from '../components/Auth/index';
import { connect } from 'react-redux';
import Home from './../pages/Home';

const ProtectedRoute = ({
  component: Component,
  appReducer,
  isAuthenticated,
  loading,
  location,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Home />
        ) : (
          isAuthenticated && !loading && <Component {...props} {...rest} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  loading: state.authReducer.loading,
  isAuthenticated: state.authReducer.isAuthenticated,
  appReducer: state.appReducer,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
