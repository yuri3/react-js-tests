import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TimerIcon from 'material-ui/svg-icons/image/timer';
import { bindActionCreators } from 'redux';
import * as questionActions from '../actions/questions';
import * as testStateActions from '../actions/testState';
import { getTime } from '../tools';
import Timer from '../components/Timer';
import Question from '../components/Question';

const style = {
  textAlign: 'center',
};

class Test extends Component {
  constructor(props) {
    super(props);
    const {timer} = this.props.testState;
    this.state = {
      initialTimer: timer,
      isTestStart: false,
      checkedValue: {id: null},
    };
    this.timerId = null;
    this.startTest = this.startTest.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const {fetchQuestions} = this.props;
    fetchQuestions();
  }
  startTest() {
    this.setState({isTestStart: true}, () => this.startTimer());
  }
  startTimer() {
    this.timerId = setInterval(() => {
      let {testState: {timer}, updateTimer} = this.props;
      --timer;
      updateTimer(timer);
      if(timer === 0) {this.handleNext();}
    }, 1000);
  }
  handleNext() {
    const {checkedValue, initialTimer} = this.state;
    const {
      questions: {lists},
      addSpentTime,
      testState: {timer, index, numOfQuestions},
      saveUserAnswer,
      resetTimer,
      nextQuestion,
      history
    } = this.props;
    clearInterval(this.timerId);
    const answer = {...lists[index], userAnswer: checkedValue};
    addSpentTime((initialTimer - timer));
    saveUserAnswer(answer);
    resetTimer();

    if(index + 1 < numOfQuestions) {
      nextQuestion(index + 1);
      this.setState({checkedValue: {id: null}}, () => this.startTimer());
    } else {
      history.push('/test/results');
    }
  }
  handleChange(event, value) {
    const {checkedValue} = this.state;
    if(checkedValue.id === value.id) {
      return;
    }
    this.setState({checkedValue: value});
  }
  render() {
    const {isTestStart, checkedValue} = this.state;
    const {questions, testState} = this.props;
    const {loading, lists} = questions;
    const {numOfQuestions, timer, index} = testState;
    return (
      <div style={style}>
        {!isTestStart &&
          <div>
            <h3 style={style}>
              Total time of the test {getTime(timer, numOfQuestions)} minutes.
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
            <Timer time={timer}/>
            <Question
              readonly={false}
              checkedValue={!!checkedValue.id}
              question={lists[index]}
              handleChange={this.handleChange}
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
  testState: PropTypes.shape({
    numOfQuestions: PropTypes.number.isRequired,
    timer: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    userAnswers: PropTypes.array.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
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
  return bindActionCreators({...questionActions, ...testStateActions}, dispatch);
};

const TestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);

export default withRouter(TestContainer);
