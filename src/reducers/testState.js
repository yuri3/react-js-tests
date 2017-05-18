import {
  UPDATE_TIMER,
  ADD_SPENT_TIME,
  SAVE_USER_ANSWER,
  NEXT_QUESTION,
  RESET_TIMER,
  RESET_SPENT_TIME,
  RESET_QUESTIONS,
  RESET_USER_ANSWERS
} from '../actions/testState';

const initialState = {
  numOfQuestions: 5,
  timer: 60,
  spentTime: 0,
  index: 0,
  userAnswers: [],
};

export default (state = initialState, action) => {
  const {timer, spentTime, checkedValue, index} = action;
  switch(action.type) {
    case UPDATE_TIMER:
      return {...state, timer};
    case ADD_SPENT_TIME:
      return {...state, spentTime: state.spentTime + spentTime};
    case SAVE_USER_ANSWER:
      return {...state, userAnswers: [...state.userAnswers, checkedValue]};
    case NEXT_QUESTION:
      return {...state, index};
    case RESET_TIMER:
      return {...state, timer: initialState.timer};
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
