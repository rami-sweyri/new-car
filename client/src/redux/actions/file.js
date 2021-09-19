import {
  READ_FILES,
  READ_ONE_FILE,
  CREATE_FILE,
  FILE_ERROR,
  START_FILES_RELOAD,
  FINISHED_FILES_RELOAD,
} from '../types/file';

import { readItemsAsync } from './equCurd/readItems';
import { readOneItemAsync } from './equCurd/readOneItem';
import { createItemAsync } from './equCurd/createItem';
import { updateItemAsync } from './equCurd/updateItem';
import { deleteItemAsync } from './equCurd/deleteItem';

export const startFileReload = () => dispatch => {
  dispatch({ type: START_FILES_RELOAD });
};

export const finishedFileReload = () => dispatch => {
  dispatch({ type: FINISHED_FILES_RELOAD });
};

export const readFiles = () =>
  readItemsAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/file/all',
    successType: READ_FILES,
    errorType: FILE_ERROR,
    startReload: startFileReload,
    finishedReload: finishedFileReload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const readOneFile = id =>
  readOneItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + `/api/files/`,
    successType: READ_ONE_FILE,
    errorType: FILE_ERROR,
    startReload: startFileReload,
    finishedReload: finishedFileReload,
    id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const createsFile = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/files/',
    successType: CREATE_FILE,
    errorType: FILE_ERROR,
    startReload: startFileReload,
    finishedReload: finishedFileReload,
    type: 'file',
    formData,
    title: 'Media File',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });
