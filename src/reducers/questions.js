import {
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  UPDATE_TIME,
  ADD_SPENT_TIME,
  SAVE_USER_ANSWER,
  NEXT_QUESTION,
  RESET_TIMER,
  RESET_SPENT_TIME,
  RESET_QUESTIONS,
  RESET_USER_ANSWERS
} from '../actions/questions';

export const questions = (state = [], action) => {
  switch(action.type) {
    case FETCH_QUESTIONS_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export const testState = (state = {
  isFetching: false,
  numOfQuestions: 5,
  timer: {minutes: 1, seconds: 0},
  spentTime: 0,
  index: 0,
  userAnswers: [],
}, action) => {
  switch(action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return {...state, isFetching: true};
    case FETCH_QUESTIONS_SUCCESS:
      return {...state, isFetching: false};
    case FETCH_QUESTIONS_FAILURE:
      return {...state, isFetching: false, error: action.error};
    case UPDATE_TIME:
      return {...state, timer: {minutes: action.minutes, seconds: action.seconds}};
    case ADD_SPENT_TIME:
      return {...state, spentTime: state.spentTime + action.spentTime};
    case SAVE_USER_ANSWER:
      return {...state, userAnswers: [...state.userAnswers, action.checkedValue]};
    case NEXT_QUESTION:
      return {...state, index: action.index};
    case RESET_TIMER:
      return {...state, timer: {minutes: 1, seconds: 0}};
    case RESET_SPENT_TIME:
      return {...state, spentTime: 0};
    case RESET_QUESTIONS:
      return {...state, index: 0};
    case RESET_USER_ANSWERS:
      return {...state, userAnswers: []};
    default:
      return state;
  }
};
