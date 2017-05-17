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

const QUESTIONS_INITIAL_STATE = {
  questionsList: {
    loading: false,
    error: null,
    lists: [],
  },
};

export const questions = (state = QUESTIONS_INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return {...state, questionsList: {lists: [], error: null, loading: true}};
    case FETCH_QUESTIONS_SUCCESS:
      return {...state, questionsList: {lists: action.response, error: null, loading: false}};
    case FETCH_QUESTIONS_FAILURE:
      return {...state, questionsList: {lists: [], error: action.error, loading: false}};
    default:
      return state;
  }
};

const TEST_INITIAL_STATE = {
  numOfQuestions: 5,
  timer: {minutes: 0, seconds: 5},
  spentTime: 0,
  index: 0,
  userAnswers: [],
};

export const testState = (state = TEST_INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_TIME:
      return {...state, timer: {minutes: action.minutes, seconds: action.seconds}};
    case ADD_SPENT_TIME:
      return {...state, spentTime: state.spentTime + action.spentTime};
    case SAVE_USER_ANSWER:
      return {...state, userAnswers: [...state.userAnswers, action.checkedValue]};
    case NEXT_QUESTION:
      return {...state, index: action.index};
    case RESET_TIMER:
      return {...state, timer: {minutes: 0, seconds: 5}};
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
