import { 
  GET_RESERVATIONS,
  FILTER_RESERVATIONS
} from '../actions/types'
import { filterVenues } from './venueActions'
import axios from 'axios'

export const getReservations = () => async dispatch => {
  const resp = await axios.get('/api/reservations')
  dispatch({
    type: GET_RESERVATIONS,
    payload: resp.data
  })
}

export const filterReservations = date => (dispatch, getState) => {
  dispatch({
    type: FILTER_RESERVATIONS,
    payload: date
  })
  const filteredRes = [...getState().reservations.filtered]
  dispatch(filterVenues(filteredRes))
}