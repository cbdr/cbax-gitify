import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';

import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';

import { fetchNotifications, UPDATE_SETTING, LOGIN_SUCCESS, LOGOUT, getUsername, USERNAME_SUCCESS } from '../actions';
import constants from '../utils/constants';
import notifications from '../middleware/notifications';
import requests from '../middleware/requests';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const engine = filter(createEngine(constants.STORAGE_KEY), ['settings', ['auth', 'token']]);
  const storageMiddleware = storage.createMiddleware(engine, [], [UPDATE_SETTING, LOGIN_SUCCESS, LOGOUT]);

  const createStoreWithMiddleware = applyMiddleware(
    requests, // Should be passed before 'apiMiddleware'
    apiMiddleware,
    notifications,
    storageMiddleware
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  // Load settings from localStorage
  const load = storage.createLoader(engine);
  load(store)
    .then(function (newState) {
      // Check if the user is logged in
      const isLoggedIn = store.getState().auth.token !== null;
      if (isLoggedIn) {
          store.dispatch(fetchNotifications());
          store.dispatch(getUsername());
      }
    });

  return store;
};
