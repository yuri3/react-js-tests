import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TimerIcon from 'material-ui/svg-icons/image/timer';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/questions';
import Question from '../components/Question';

const style = {
  textAlign: 'center',
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {isTestStart: false};
    this.spendTime = this.spendTime.bind(this);
    this.startTest = this.startTest.bind(this);
  }
  componentDidMount() {
    const {fetchQuestions} = this.props;
    fetchQuestions();
  }
  spendTime() {
    const {testState: {numOfQuestions, timer: {minutes, seconds}}} = this.props;
    const timeInSeconds = numOfQuestions * (minutes * 60 + seconds);
    const spend = ((timeInSeconds / 60) + '').split('.');
    const min = spend[0];
    const sec = spend[1] ?
      (Number.parseFloat(('0.' + spend[1])) * 60).toFixed() : '0';
    return min + '.' + ((sec < 10) ? 0 + sec : sec);
  }
  startTest() {
    this.setState({isTestStart: true});
  }
  render() {
    const {isTestStart} = this.state;
    const {
      questions,
      testState,
      updateTime,
      addSpentTime,
      saveUserAnswer,
      resetTimer,
      resetSpentTime,
      resetQuestions,
      resetUserAnswers,
      nextQuestion
    } = this.props;
    const {index, isFetching} = testState;
    return (
      <div style={style}>
        {!isTestStart &&
          <div>
            <h3 style={style}>
              Total time of the test {this.spendTime()} minutes.
            </h3>
            <RaisedButton
              disabled={!(!isFetching && questions.length > 0)}
              label="Start Test"
              labelPosition="before"
              primary={true}
              icon={<TimerIcon />}
              onTouchTap={this.startTest}
            />
          </div>}
        {isTestStart && questions.length > 0 &&
          <Question
            key={index}
            question={questions[index]}
            testState={testState}
            updateTime={updateTime}
            addSpentTime={addSpentTime}
            saveUserAnswer={saveUserAnswer}
            resetTimer={resetTimer}
            resetSpentTime={resetSpentTime}
            resetQuestions={resetQuestions}
            resetUserAnswers={resetUserAnswers}
            nextQuestion={nextQuestion}
          />}
      </div>
    );
  }
}

Test.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    code: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      answer: PropTypes.string.isRequired,
      isTrue: PropTypes.bool,
    })).isRequired,
  })).isRequired,
  testState: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    numOfQuestions: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
  addSpentTime: PropTypes.func.isRequired,
  saveUserAnswer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  resetSpentTime: PropTypes.func.isRequired,
  resetQuestions: PropTypes.func.isRequired,
  resetUserAnswers: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  questions: state.questions,
  testState: state.testState,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const TestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);

export default TestContainer;
