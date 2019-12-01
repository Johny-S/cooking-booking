import {
  GET_RESERVATIONS,
  FILTER_RESERVATIONS,
  ADD_RESERVATION,
  DELETE_RESERVATION
} from "../actions/types";

const initialState = {
  reservations: [],
  filtered: null,
  selectedDate: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload
      };
    case FILTER_RESERVATIONS:
      return {
        ...state,
        selectedDate: action.payload,
        filtered: state.reservations.filter(res => {
          return (
            new Date(res.date).toDateString() === action.payload.toDateString()
          );
        })
      };
    case ADD_RESERVATION:
      return {
        ...state,
        reservations: [...state.reservations, action.payload]
      };
    case DELETE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.filter(
          reservation => reservation.id !== action.payload.id
        )
      };
    default:
      return state;
  }
}
