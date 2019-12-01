import axios from 'axios'
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types'
import { returnErrors } from './errorActions'

// token & load user
export const loadUser = () => async (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING })
  const resp = await axios.get('/api/auth/user', tokenConfig(getState))
  try {
    dispatch({
      type: USER_LOADED,
      payload: resp.data
    })
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status ))
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// register user
export const signup = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-type':'application/json'
    }
  };
  // req body
  const body = JSON.stringify({ email, password })

  // send request
  const resp = await axios.post('/api/auth/signup', body, config)

  // dispatch actions
  try {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: resp.data
    })
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
    );
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// login
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });
  axios
    .post('/api/auth/login', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch (err => {
      dispatch (returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
      dispatch({
      type: LOGIN_FAIL
     })
    })
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};