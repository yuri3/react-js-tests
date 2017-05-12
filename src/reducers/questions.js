import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE
} from '../actions/questions';

export const questions = (state = [], action) => {
  switch(action.type) {
    case FETCH_QUESTIONS_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export const questionOptions = (state = {isFetching: false}, action) => {
  switch(action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return {...state, isFetching: true};
    case FETCH_QUESTIONS_SUCCESS:
      return {...state, isFetching: false};
    case FETCH_QUESTIONS_FAILURE:
      return {...state, isFetching: false, error: action.error};
    default:
      return state;
  }
};
