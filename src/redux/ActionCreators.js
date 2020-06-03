import * as ActionTypes from './ActionTypes';


export const latestTotalsLoading = () => {
  return {
    type: ActionTypes.LATEST_TOTALS_LOADING,
  };
};

export const latestTotalsFailed = (errmess) => {
  return {
    type: ActionTypes.LATEST_TOTALS_FAILED,
    payload: errmess,
  };
};

export const addLatestCountries = (totals) => {
  return {
    type: ActionTypes.ADD_LATEST_TOTALS,
    payload: totals,
  };
};


export const fetchLatestTotals = () => {
  return (dispatch) => {
    dispatch(latestTotalsLoading(true));
    return fetch(
      process.env.REACT_APP_RAPIDAPI_URL_TOTALS,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
        },
      },
    )
      .then(
        (response) => {
          if (response.ok) {
            return response;
          }
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`,
          );
          error.response = response;
          throw error;
        },
        (error) => {
          const errmess = new Error(error.message);
          throw errmess;
        },
      )
      .then((response) => { return response.json(); })
      .then((totals) => { return dispatch(addLatestCountries(totals)); })
      .catch((error) => { return dispatch(latestTotalsFailed(error.message)); });
  };
};


export const allCountriesLoading = () => {
  return {
    type: ActionTypes.ALL_COUNTRIES_LOADING,
  };
};

export const allCountriesFailed = (errmess) => {
  return {
    type: ActionTypes.ALL_COUNTRIES_FAILED,
    payload: errmess,
  };
};

export const addAllCountries = (allCountries) => {
  return {
    type: ActionTypes.ADD_ALL_COUNTRIES,
    payload: allCountries,
  };
};


export const fetchAllCountries = () => {
  return (dispatch) => {
    dispatch(allCountriesLoading(true));
    return fetch(
      process.env.REACT_APP_RAPIDAPI_URL_ALL_COUNTRIES,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
        },
      },
    )
      .then(
        (response) => {
          if (response.ok) {
            return response;
          }
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`,
          );
          error.response = response;
          throw error;
        },
        (error) => {
          const errmess = new Error(error.message);
          throw errmess;
        },
      )
      .then((response) => { return response.json(); })
      .then((allCountries) => { return dispatch(addAllCountries(allCountries)); })
      .catch((error) => { return dispatch(allCountriesFailed(error.message)); });
  };
};
