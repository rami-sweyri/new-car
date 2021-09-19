import {
  READ_PERMISSIONS,
  READ_ONE_PERMISSION,
  CREATE_PERMISSION,
  UPDATE_PERMISSION,
  DELETE_PERMISSION,
  PERMISSION_ERROR,
  CLEAR_PERMISSION,
  START_PERMISSIONS_RELOAD,
  FINISHED_PERMISSIONS_RELOAD,
} from '../types/permissions';

import { readItemsAsync } from './equCurd/readItems';
import { readOneItemAsync } from './equCurd/readOneItem';
import { createItemAsync } from './equCurd/createItem';
import { updateItemAsync } from './equCurd/updateItem';
import { deleteItemAsync } from './equCurd/deleteItem';

export const startPermissionsReload = () => dispatch => {
  dispatch({ type: START_PERMISSIONS_RELOAD });
};

export const finishedPermissionsReload = () => dispatch => {
  dispatch({ type: FINISHED_PERMISSIONS_RELOAD });
};

export const readPermissions = () =>
  readItemsAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/permissions/all',
    successType: READ_PERMISSIONS,
    errorType: PERMISSION_ERROR,
    startReload: startPermissionsReload,
    finishedReload: finishedPermissionsReload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const readOnePermission = id =>
  readOneItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/permissions/',
    successType: READ_ONE_PERMISSION,
    errorType: PERMISSION_ERROR,
    startReload: startPermissionsReload,
    finishedReload: finishedPermissionsReload,
    id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const createPermission = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/permissions/',
    successType: CREATE_PERMISSION,
    errorType: PERMISSION_ERROR,
    startReload: startPermissionsReload,
    finishedReload: finishedPermissionsReload,
    formData,
    title: 'Permissions',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const updatePermission = formData =>
  updateItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/permissions/',
    successType: UPDATE_PERMISSION,
    errorType: PERMISSION_ERROR,
    startReload: startPermissionsReload,
    finishedReload: finishedPermissionsReload,
    formData,
    id: formData.id,
    title: 'Permissions',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const deletePermission = id =>
  deleteItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/permissions/',
    successType: DELETE_PERMISSION,
    errorType: PERMISSION_ERROR,
    startReload: startPermissionsReload,
    finishedReload: finishedPermissionsReload,
    id,
    title: 'Permissions',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const clearPermission = () => dispatch => {
  dispatch({ type: CLEAR_PERMISSION });
};
