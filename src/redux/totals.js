import * as ActionTypes from './ActionTypes';

export const LatestTotals = (state = {
  isLoading: true,
  errMess: null,
  latestTotals: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LATEST_TOTALS:
      return {
        ...state, isLoading: false, errMess: null, latestTotals: action.payload,
      };
    case ActionTypes.LATEST_TOTALS_LOADING:
      return {
        ...state, isLoading: true, errMess: null, latestTotals: [],
      };
    case ActionTypes.LATEST_TOTALS_FAILED:
      return {
        ...state, isLoading: false, errMess: action.payload, latestTotals: [],
      };
    default:
      return state;
  }
};

export const AllCountries = (state = {
  isLoading: true,
  errMess: null,
  allCountries: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ALL_COUNTRIES:
      return {
        ...state, isLoading: false, errMess: null, allCountries: action.payload,
      };
    case ActionTypes.ALL_COUNTRIES_LOADING:
      return {
        ...state, isLoading: true, errMess: null, allCountries: [],
      };
    case ActionTypes.ALL_COUNTRIES_FAILED:
      return {
        ...state, isLoading: false, errMess: action.payload, allCountries: [],
      };
    default:
      return state;
  }
};
