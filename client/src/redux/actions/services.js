import {
  READ_SERVICES,
  READ_ONE_SERVICE,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  SERVICE_ERROR,
  CLEAR_SERVICE,
  START_SERVICES_RELOAD,
  FINISHED_SERVICES_RELOAD,
} from '../types/services';

import { readItemsAsync } from './equCurd/readItems';
import { readOneItemAsync } from './equCurd/readOneItem';
import { createItemAsync } from './equCurd/createItem';
import { updateItemAsync } from './equCurd/updateItem';
import { deleteItemAsync } from './equCurd/deleteItem';

export const startServicesReload = () => dispatch => {
  dispatch({ type: START_SERVICES_RELOAD });
};

export const finishedServicesReload = () => dispatch => {
  dispatch({ type: FINISHED_SERVICES_RELOAD });
};

export const readServices = () =>
  readItemsAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/services/all',
    successType: READ_SERVICES,
    errorType: SERVICE_ERROR,
    startReload: startServicesReload,
    finishedReload: finishedServicesReload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const readOneService = id =>
  readOneItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + `/api/services/`,
    successType: READ_ONE_SERVICE,
    errorType: SERVICE_ERROR,
    startReload: startServicesReload,
    finishedReload: finishedServicesReload,
    id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const createsService = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/services/',
    successType: CREATE_SERVICE,
    errorType: SERVICE_ERROR,
    startReload: startServicesReload,
    finishedReload: finishedServicesReload,
    title: 'Services',
    formData,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const updateService = formData =>
  updateItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/services',
    successType: UPDATE_SERVICE,
    errorType: SERVICE_ERROR,
    startReload: startServicesReload,
    finishedReload: finishedServicesReload,
    title: 'Services',
    formData,
    id: formData._id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const deleteService = id =>
  deleteItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/services/',
    successType: DELETE_SERVICE,
    errorType: SERVICE_ERROR,
    startReload: startServicesReload,
    finishedReload: finishedServicesReload,
    title: 'Services',
    id: id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const clearService = () => dispatch => {
  dispatch({ type: CLEAR_SERVICE });
};
