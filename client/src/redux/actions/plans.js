import {
  READ_PLANS,
  READ_ONE_PLAN,
  CREATE_PLAN,
  UPDATE_PLAN,
  DELETE_PLAN,
  PLAN_ERROR,
  CLEAR_PLAN,
  START_PLANS_RELOAD,
  FINISHED_PLANS_RELOAD,
} from '../types/plans';

import { readItemsAsync } from './equCurd/readItems';
import { readOneItemAsync } from './equCurd/readOneItem';
import { createItemAsync } from './equCurd/createItem';
import { updateItemAsync } from './equCurd/updateItem';
import { deleteItemAsync } from './equCurd/deleteItem';

export const startPlansReload = () => dispatch => {
  dispatch({ type: START_PLANS_RELOAD });
};

export const finishedPlansReload = () => dispatch => {
  dispatch({ type: FINISHED_PLANS_RELOAD });
};

export const readPlans = () =>
  readItemsAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/plans/all',
    successType: READ_PLANS,
    errorType: PLAN_ERROR,
    startReload: startPlansReload,
    finishedReload: finishedPlansReload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const readOnePlan = id =>
  readOneItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + `/api/Plans/`,
    successType: READ_ONE_PLAN,
    errorType: PLAN_ERROR,
    startReload: startPlansReload,
    finishedReload: finishedPlansReload,
    id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const createsPlan = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/Plans/',
    successType: CREATE_PLAN,
    errorType: PLAN_ERROR,
    startReload: startPlansReload,
    finishedReload: finishedPlansReload,
    title: 'Plans',
    formData,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const updatePlan = formData =>
  updateItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/Plans',
    successType: UPDATE_PLAN,
    errorType: PLAN_ERROR,
    startReload: startPlansReload,
    finishedReload: finishedPlansReload,
    title: 'Plans',
    formData,
    id: formData._id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const deletePlan = id =>
  deleteItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/Plans/',
    successType: DELETE_PLAN,
    errorType: PLAN_ERROR,
    startReload: startPlansReload,
    finishedReload: finishedPlansReload,
    title: 'Plans',
    id: id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const clearPlan = () => dispatch => {
  dispatch({ type: CLEAR_PLAN });
};
