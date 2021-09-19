import {
  READ_INTROS,
  READ_ONE_INTRO,
  CREATE_INTRO,
  UPDATE_INTRO,
  DELETE_INTRO,
  INTRO_ERROR,
  CLEAR_INTRO,
  START_INTROS_RELOAD,
  FINISHED_INTROS_RELOAD,
} from '../types/intro';

import { readItemsAsync } from './equCurd/readItems';
import { readOneItemAsync } from './equCurd/readOneItem';
import { createItemAsync } from './equCurd/createItem';
import { updateItemAsync } from './equCurd/updateItem';
import { deleteItemAsync } from './equCurd/deleteItem';

export const startIntroReload = () => dispatch => {
  dispatch({ type: START_INTROS_RELOAD });
};

export const finishedIntroReload = () => dispatch => {
  dispatch({ type: FINISHED_INTROS_RELOAD });
};

export const readIntro = () =>
  readItemsAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/intro/all',
    successType: READ_INTROS,
    errorType: INTRO_ERROR,
    startReload: startIntroReload,
    finishedReload: finishedIntroReload,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const readOneIntro = id =>
  readOneItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + `/api/intro/`,
    successType: READ_ONE_INTRO,
    errorType: INTRO_ERROR,
    startReload: startIntroReload,
    finishedReload: finishedIntroReload,
    id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const createsIntro = formData =>
  createItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/intro/',
    successType: CREATE_INTRO,
    errorType: INTRO_ERROR,
    startReload: startIntroReload,
    finishedReload: finishedIntroReload,
    title: 'Intro',
    formData,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const updateIntro = formData =>
  updateItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/intro',
    successType: UPDATE_INTRO,
    errorType: INTRO_ERROR,
    startReload: startIntroReload,
    finishedReload: finishedIntroReload,
    title: 'Intro',
    formData,
    id: formData._id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const deleteIntro = id =>
  deleteItemAsync({
    url: process.env.REACT_APP_BACKEND_URL + '/api/intro/',
    successType: DELETE_INTRO,
    errorType: INTRO_ERROR,
    startReload: startIntroReload,
    finishedReload: finishedIntroReload,
    title: 'Intro',
    id: id,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-access-token': localStorage.getItem('token'),
    },
  });

export const clearIntro = () => dispatch => {
  dispatch({ type: CLEAR_INTRO });
};
