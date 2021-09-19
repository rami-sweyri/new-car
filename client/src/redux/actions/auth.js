import {
  LOGIN,
  REGISTER,
  USER_LOADED,
  FORGET_PASSWORD,
  RESET_PASSWORD,
  AUTH_ERROR,
  LOGOUT,
  START_AUTH_RELOAD,
  FINISHED_AUTH_RELOAD,
  GET_SUBSCRIPTIONS,
  EMAIL_EXIST,
  EMAIL_ERROR,
} from '../types/auth';

import { readItemsAsync } from './equCurd/readItems';
import { createItemAsync } from './equCurd/createItem';
export const startAuthReload = () => dispatch => {
  dispatch({ type: START_AUTH_RELOAD });
};

export const finishedAuthReload = () => dispatch => {
  dispatch({ type: FINISHED_AUTH_RELOAD });
};

export const loginUser = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/auth/login',
    successType: LOGIN,
    errorType: AUTH_ERROR,
    successMsg: 'Login Succsess',
    errorMsg: 'Email or password is incorrect',
    startReload: startAuthReload,
    finishedReload: finishedAuthReload,
    formData,
    loginHeader: false,
    headers: {
      'Content-Type': 'application/json',
      'x-client': '5fcf38d9d9e2620019545f76',
      'Access-Control-Allow-Origin': '*',
    },
  });
export const loadUser = () =>
  readItemsAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/auth/me',
    successType: USER_LOADED,
    errorType: AUTH_ERROR,
    startReload: startAuthReload,
    finishedReload: finishedAuthReload,
    headers: {
      'Content-Type': 'application/json',
      'x-client': '5fcf38d9d9e2620019545f76',
      'x-access-token': localStorage.getItem('token'),
      'Access-Control-Allow-Origin': '*',
    },
  });
export const registerUser = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/auth/register',
    successType: REGISTER,
    errorType: AUTH_ERROR,
    successMsg: 'Register Succsess',
    errorMsg: 'error something went wrong',
    startReload: startAuthReload,
    finishedReload: finishedAuthReload,
    formData,
    headers: {
      'Content-Type': 'application/json',
      'x-client': '5fcf38d9d9e2620019545f76',
      'Access-Control-Allow-Origin': '*',
    },
  });
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
