import {
  READ_ORDERS,
  READ_ONE_ORDER,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  ORDER_ERROR,
  CLEAR_ORDER,
  START_ORDERS_RELOAD,
  FINISHED_ORDERS_RELOAD,
} from '../types/orders';

import { readItemsAsync } from './equCurd/readItems';
import { readOneItemAsync } from './equCurd/readOneItem';
import { createItemAsync } from './equCurd/createItem';
import { updateItemAsync } from './equCurd/updateItem';
import { deleteItemAsync } from './equCurd/deleteItem';

export const startOrdersReload = () => dispatch => {
  dispatch({ type: START_ORDERS_RELOAD });
};

export const finishedOrdersReload = () => dispatch => {
  dispatch({ type: FINISHED_ORDERS_RELOAD });
};

export const readOrders = () =>
  readItemsAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/orders/all',
    successType: READ_ORDERS,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const readOneOrder = id =>
  readOneItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + `/api/orders/`,
    successType: READ_ONE_ORDER,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const createsOrder = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/orders/',
    successType: CREATE_ORDER,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    title: 'Orders',
    formData,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const updateOrder = formData =>
  updateItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/orders',
    successType: UPDATE_ORDER,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    title: 'Orders',
    formData,
    id: formData._id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const deleteOrder = id =>
  deleteItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/orders/',
    successType: DELETE_ORDER,
    errorType: ORDER_ERROR,
    startReload: startOrdersReload,
    finishedReload: finishedOrdersReload,
    title: 'Orders',
    id: id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const clearOrder = () => dispatch => {
  dispatch({ type: CLEAR_ORDER });
};
