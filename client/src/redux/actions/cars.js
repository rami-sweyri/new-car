import {
  READ_CARS,
  READ_ONE_CAR,
  CREATE_CAR,
  UPDATE_CAR,
  DELETE_CAR,
  SEARCH_CAR_FILTER,
  CAR_ERROR,
  CLEAR_CAR,
  START_CARS_RELOAD,
  FINISHED_CARS_RELOAD,
} from '../types/cars';

import { readItemsAsync } from './equCurd/readItems';
import { createItemAsync } from './equCurd/createItem';
import { updateItemAsync } from './equCurd/updateItem';
import { deleteItemAsync } from './equCurd/deleteItem';
import { readOneItemAsync } from './equCurd/readOneItem';

export const startCarsReload = () => dispatch => {
  dispatch({ type: START_CARS_RELOAD });
};

export const finishedCarsReload = () => dispatch => {
  dispatch({ type: FINISHED_CARS_RELOAD });
};

export const readCars = () =>
  readItemsAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/cars/all',
    successType: READ_CARS,
    errorType: CAR_ERROR,
    startReload: startCarsReload,
    finishedReload: finishedCarsReload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const readOneCar = id =>
  readOneItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/cars/',
    successType: READ_ONE_CAR,
    errorType: CAR_ERROR,
    startReload: startCarsReload,
    finishedReload: finishedCarsReload,
    id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const createCar = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/cars/',

    successType: CREATE_CAR,
    errorType: CAR_ERROR,
    startReload: startCarsReload,
    finishedReload: finishedCarsReload,
    formData,
    title: 'Car',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const updateCar = formData =>
  updateItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/cars/',
    successType: UPDATE_CAR,
    errorType: CAR_ERROR,
    startReload: startCarsReload,
    finishedReload: finishedCarsReload,
    formData,
    id: formData._id,
    title: 'Car',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const deleteCar = id =>
  deleteItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/cars/',
    successType: DELETE_CAR,
    errorType: CAR_ERROR,
    startReload: startCarsReload,
    finishedReload: finishedCarsReload,
    id,
    title: 'Car',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const searchCarFilter = text => dispatch => {
  dispatch({
    type: SEARCH_CAR_FILTER,
    payload: text,
  });
};

export const clearCar = () => dispatch => {
  dispatch({ type: CLEAR_CAR });
};
