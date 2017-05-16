import { combineReducers } from 'redux';
import { questions, testState } from './questions';

const rootReducer = combineReducers({
  questions,
  testState,
});

export default rootReducer;
