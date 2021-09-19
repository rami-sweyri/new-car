import {
  READ_BUILDINGS,
  READ_ONE_BUILDING,
  CREATE_BUILDING,
  UPDATE_BUILDING,
  DELETE_BUILDING,
  BUILDING_ERROR,
  CLEAR_BUILDING,
  START_BUILDINGS_RELOAD,
  FINISHED_BUILDINGS_RELOAD,
} from '../types/buildings';

import { readItemsAsync } from './equCurd/readItems';
import { readOneItemAsync } from './equCurd/readOneItem';
import { createItemAsync } from './equCurd/createItem';
import { updateItemAsync } from './equCurd/updateItem';
import { deleteItemAsync } from './equCurd/deleteItem';

export const startBuildingReload = () => dispatch => {
  dispatch({ type: START_BUILDINGS_RELOAD });
};

export const finishedBuildingReload = () => dispatch => {
  dispatch({ type: FINISHED_BUILDINGS_RELOAD });
};

export const readBuildings = () =>
  readItemsAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/buildings/all',
    successType: READ_BUILDINGS,
    errorType: BUILDING_ERROR,
    startReload: startBuildingReload,
    finishedReload: finishedBuildingReload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const readOneBuilding = id =>
  readOneItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + `/api/buildings/`,
    successType: READ_ONE_BUILDING,
    errorType: BUILDING_ERROR,
    startReload: startBuildingReload,
    finishedReload: finishedBuildingReload,
    id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const createsBuilding = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/buildings/',
    successType: CREATE_BUILDING,
    errorType: BUILDING_ERROR,
    startReload: startBuildingReload,
    finishedReload: finishedBuildingReload,
    title: 'Buildings',
    formData,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const updateBuilding = formData =>
  updateItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/buildings',
    successType: UPDATE_BUILDING,
    errorType: BUILDING_ERROR,
    startReload: startBuildingReload,
    finishedReload: finishedBuildingReload,
    title: 'Buildings',
    formData,
    id: formData._id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const deleteBuilding = id =>
  deleteItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/buildings/',
    successType: DELETE_BUILDING,
    errorType: BUILDING_ERROR,
    startReload: startBuildingReload,
    finishedReload: finishedBuildingReload,
    title: 'Buildings',
    id: id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const clearBuilding = () => dispatch => {
  dispatch({ type: CLEAR_BUILDING });
};
