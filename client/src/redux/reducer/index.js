
import { GET_ALL_DOGS, GET_DOG_DETAIL, GET_TEMPERAMENTS, LOADING } from '../actions';


const initialState = {
  dogs: [],
  dogDetail: {},
  temperaments: [],
  loading: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload
      }

    case GET_DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload
      }

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }

    case LOADING:
      return {
        ...state,
        loading: action.payload
      }

    default: return state;

  }
};

export default rootReducer;