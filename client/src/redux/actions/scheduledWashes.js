import {
  READ_SCHEDULED_WASHES,
  READ_ONE_SCHEDULED_WASH,
  CREATE_SCHEDULED_WASH,
  UPDATE_SCHEDULED_WASH,
  UPDATE_SCHEDULED_WASH_STATUS,
  DELETE_SCHEDULED_WASH,
  SCHEDULED_WASH_ERROR,
  CLEAR_SCHEDULED_WASH,
  START_SCHEDULED_WASHES_RELOAD,
  FINISHED_SCHEDULED_WASHES_RELOAD,
} from '../types/scheduledWashes';

import { readItemsAsync } from './equCurd/readItems';
import { readOneItemAsync } from './equCurd/readOneItem';
import { createItemAsync } from './equCurd/createItem';
import { updateItemAsync } from './equCurd/updateItem';
import { deleteItemAsync } from './equCurd/deleteItem';

export const startScheduledWashesReload = () => dispatch => {
  dispatch({ type: START_SCHEDULED_WASHES_RELOAD });
};

export const finishedScheduledWashesReload = () => dispatch => {
  dispatch({ type: FINISHED_SCHEDULED_WASHES_RELOAD });
};

export const readScheduledWashes = queryString =>
  readItemsAsync({
    url:
      process.env.REACT_APP_BACKEND_URL +
      `/api/scheduled-wash?query=${encodeURIComponent(
        JSON.stringify(queryString.query)
      )}&page=${queryString.page}&limit=${queryString.limit}`,
    successType: READ_SCHEDULED_WASHES,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const readOneScheduledWash = id =>
  readOneItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + `/api/scheduled-wash/`,
    successType: READ_ONE_SCHEDULED_WASH,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const createsScheduledWash = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/scheduled-wash/',
    successType: CREATE_SCHEDULED_WASH,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    title: 'ScheduledWashes',
    formData,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const updateScheduledWash = formData =>
  updateItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/scheduled-wash',
    successType: UPDATE_SCHEDULED_WASH,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    title: 'ScheduledWashes',
    formData,
    id: formData._id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const updateScheduledWashStatus = formData =>
  updateItemAsync({
    url:
      process.env.REACT_APP_BACKEND_URL +
      '/api/scheduled-wash/' +
      formData.status,
    successType: UPDATE_SCHEDULED_WASH_STATUS,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    title: 'ScheduledWashes',
    formData,
    id: formData._id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const deleteScheduledWash = id =>
  deleteItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/scheduled-wash/',
    successType: DELETE_SCHEDULED_WASH,
    errorType: SCHEDULED_WASH_ERROR,
    startReload: startScheduledWashesReload,
    finishedReload: finishedScheduledWashesReload,
    title: 'ScheduledWashes',
    id: id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const clearScheduledWash = () => dispatch => {
  dispatch({ type: CLEAR_SCHEDULED_WASH });
};
