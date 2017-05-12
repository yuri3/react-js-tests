import { combineReducers } from 'redux';
import { questions, questionOptions } from './questions';

const rootReducer = combineReducers({
  questions,
  questionOptions,
});

export default rootReducer;
