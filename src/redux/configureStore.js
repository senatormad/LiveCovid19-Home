import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { LatestTotals, AllCountries } from './totals';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      latestTotals: LatestTotals,
    }),
    applyMiddleware(thunk, logger),
  );

  return store;
};

export const ConfigureStoreAllCountries = () => {
  const store = createStore(
    combineReducers({
      allCountries: AllCountries,
    }),
    applyMiddleware(thunk, logger),
  );

  return store;
};
