import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TimerIcon from 'material-ui/svg-icons/image/timer';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/questions';
import { spendTime } from '../tools';
import Timer from '../components/Timer';
import Question from '../components/Question';

const style = {
  textAlign: 'center',
};

class Test extends Component {
  constructor(props) {
    super(props);
    const {timer: {minutes, seconds}} = this.props.testState;
    this.state = {
      min: minutes,
      sec: seconds,
      isTestStart: false,
    };
    this.timerId = null;
    this.startTest = this.startTest.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  componentDidMount() {
    const {fetchQuestions} = this.props;
    fetchQuestions();
  }
  componentWillReceiveProps(nextProps) {
    const {isTestStart} = this.state;
    const {testState: {index}} = this.props;
    if(isTestStart && nextProps.testState.index !== index) {
      this.startTimer(nextProps);
    }
  }
  startTest() {
    this.setState({isTestStart: true}, () => this.startTimer());
  }
  startTimer(nextProps) {
    const props = nextProps ? nextProps : this.props;
    let {testState: {timer: {minutes, seconds}}, updateTime} = props;
    this.timerId = setInterval(() => {
      if(seconds === 0 && minutes >= 1) {
        --minutes;
        seconds = 60;
      }
      --seconds;
      updateTime(minutes, seconds);
      if(minutes === 0 && seconds === 0) {
        this.handleNext();
      }
    }, 1000);
  }
  handleNext(checkedValue) {
    const {
      questions: {questionsList: {lists}},
      addSpentTime,
      testState: {numOfQuestions, index, timer: {minutes, seconds}},
      saveUserAnswer,
      resetTimer,
      nextQuestion,
      history
    } = this.props;
    clearInterval(this.timerId);
    const {min, sec} = this.state;
    const spentTime = min * 60 + sec - (minutes * 60 + seconds);
    const answer = {...lists[index], userAnswer: checkedValue ? checkedValue : {checkedValue: {id: null}}};
    resetTimer();
    addSpentTime(spentTime);
    saveUserAnswer(answer);

    if(index + 1 < numOfQuestions) {
      nextQuestion(index + 1);
    } else {
      history.push('/test/results');
    }
  }
  render() {
    const {isTestStart} = this.state;
    const {
      questions,
      testState
    } = this.props;
    const {questionsList: {loading, lists}} = questions;
    const {index, timer: {minutes, seconds}} = testState;
    return (
      <div style={style}>
        {!isTestStart &&
          <div>
            <h3 style={style}>
              Total time of the test {spendTime(testState)} minutes.
            </h3>
            <RaisedButton
              disabled={loading}
              label="Start Test"
              labelPosition="before"
              primary={true}
              icon={<TimerIcon />}
              onTouchTap={this.startTest}
            />
          </div>}
        {isTestStart && lists.length > 0 && (
          <div>
            <Timer
              minutes={minutes}
              seconds={seconds}
            />
            <Question
              readonly={false}
              question={lists[index]}
              handleNext={this.handleNext}
            />
          </div>
        )}
      </div>
    );
  }
}
Test.propTypes = {
  questions: PropTypes.shape({
    questionsList: PropTypes.shape({
      lists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        code: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number.isRequired,
          answer: PropTypes.string.isRequired,
          isTrue: PropTypes.bool,
        })).isRequired,
      })).isRequired,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  testState: PropTypes.shape({
    numOfQuestions: PropTypes.number.isRequired,
    timer: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    userAnswers: PropTypes.array.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  updateTime: PropTypes.func.isRequired,
  addSpentTime: PropTypes.func.isRequired,
  saveUserAnswer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
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

export default withRouter(TestContainer);
