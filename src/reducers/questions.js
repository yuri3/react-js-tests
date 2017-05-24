import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
} from '../actions/questions';

const initialState = {
  loading: false,
  error: null,
  lists: [],
};

export default (state = initialState, action) => {
  const {type, response, error} = action;
  switch(type) {
    case FETCH_QUESTIONS_REQUEST:
      return {...state, loading: true, error: null, lists: []};
    case FETCH_QUESTIONS_SUCCESS:
      return {...state, loading: false, error: null, lists: response};
    case FETCH_QUESTIONS_FAILURE:
      return {...state, loading: false, error, lists: []};
    default:
      return state;
  }
};
