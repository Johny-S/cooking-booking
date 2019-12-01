import { 
  GET_VENUES, 
  FILTER_PRICE,
  FILTER_DATE, 
  VENUES_LOADING, 
  GET_VENUES_SUCCESS ,
  CANCEL_FILTER,
  FILTER_OPTIONS
} from '../actions/types'
import { compareOptions } from '../helpers'

const initialState = {
  venues: [],
  filtered: null,
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case CANCEL_FILTER:
      return {
        ...state,
        filtered: null
      }
    case FILTER_OPTIONS:
      return {
        ...state,
        filtered: state.venues.filter(venue => {
          return compareOptions(action.payload.options, venue.options)
        }) 
      }
    case FILTER_PRICE:
      // const prevResults = getResults(state)
      return {
        ...state,
        filtered: state.venues.filter(venue => venue.price <= action.payload.price)
      }
    case FILTER_DATE:
      const reserved = action.payload.map(reserve => reserve.venueId)
      return {
        ...state,
        filtered: state.venues.filter(venue => !reserved.includes(venue._id))

      }
    case VENUES_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_VENUES_SUCCESS:
    return {
      ...state,
      venues: action.venues
    };
    case GET_VENUES:
      return {
        ...state,
        venues: action.payload,
        filtered: null,
        loading: false
      }
    default:
      return state
  }
}

