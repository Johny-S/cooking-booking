import {
  GET_VENUES,
  FILTER_PRICE, 
  FILTER_DATE, 
  FILTER_OPTIONS,
  GET_VENUES_SUCCESS, 
  CANCEL_FILTER
} from './types'
import axios from 'axios'

// list venues
export const getVenues = () => async dispatch => {
  const resp = await axios.get('api/venues');
  dispatch({
    type: GET_VENUES,
    payload: resp.data
  });
};

// filter venues
export const filterVenues = obj => dispatch => {
  if (obj.price) {
    return dispatch({
      type: FILTER_PRICE,
      payload: obj
    });
  }
  if (obj.options) {
    return dispatch({
      type: FILTER_OPTIONS,
      payload: obj
    })
  }
  dispatch({
    type: FILTER_DATE,
    payload: obj
  });
};

export const cancelFilter = () => dispatch => {
  dispatch({
    type: CANCEL_FILTER
  })
}

export const getVenuesSuccessAC = venues => ({
  type: GET_VENUES_SUCCESS,
  venues
});

// add Venue
export const addVenueAC = data => async dispatch => {
  const resp = await fetch('/api/venues/new', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const venues = await resp.json();
  dispatch(getVenuesSuccessAC(venues));
};

// export const getVenuesAC = () => ({ type: GET_VENUES });

// ????
export const getVenuesAC = () => async dispatch => {
  try {
    const resp = await fetch('/api/venues');
    const venues = await resp.json();
    dispatch(getVenuesSuccessAC(venues));
  } catch (err) {
    dispatch(null);
  }
};
