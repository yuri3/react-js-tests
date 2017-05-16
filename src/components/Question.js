import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RaisedButton from 'material-ui/RaisedButton';
import NavigateNextIcon from 'material-ui/svg-icons/image/navigate-next';
import Timer from './Timer';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: this.props.testState.timer.minutes,
      sec: this.props.testState.timer.seconds,
      checkedValue: {id: null},
    };
    this.timerId = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.setLabelStyle = this.setLabelStyle.bind(this);
    this.setStyle = this.setStyle.bind(this);
  }
  componentDidMount() {
    const {location} = this.props;
    if(location.pathname === '/test') {
      this.startTimer();
    }
  }
  handleChange(event, value) {
    const {checkedValue} = this.state;
    if(checkedValue.id === value.id) {
      return;
    }
    this.setState({checkedValue: value});
  }
  handleNext() {
    const {
      addSpentTime,
      question,
      testState: {numOfQuestions, index, timer: {minutes, seconds}},
      saveUserAnswer,
      resetTimer,
      resetQuestions,
      nextQuestion,
      history
    } = this.props;
    clearInterval(this.timerId);
    if(index < numOfQuestions) {
      const {min, sec, checkedValue} = this.state;
      const spentTime = min * 60 + sec - (minutes * 60 + seconds);
      addSpentTime(spentTime);
      const answer = {...question, userAnswer: checkedValue};
      saveUserAnswer(answer);
    }
    resetTimer();
    if(index + 1 < numOfQuestions) {
      nextQuestion(index + 1);
    } else {
      resetQuestions();
      history.push('/test/results');
    }
  }
  startTimer() {
    let {testState: {timer: {minutes, seconds}}, updateTime} = this.props;
    this.timerId = setInterval(() => {
      if(seconds === 0 && minutes >= 1) {
        --minutes;
        seconds = 60;
      }
      if(minutes >= 0) {
        --seconds;
      }
      updateTime(minutes, seconds);
      if(minutes <= 0 && seconds <= 0) {
        this.handleNext();
      }
    }, 1000);
  }
  setLabelStyle(value) {
    const {
      question: {userAnswer}
    } = this.props;
    if(!userAnswer) {
      return;
    }
    if(userAnswer.isTrue && value.id === userAnswer.id) {
      return {color: '#00BCD4'};
    }
    if(!userAnswer.isTrue && value.id === userAnswer.id) {
      return {color: '#F44336'};
    }
    if(value.isTrue) {
      return {color: '#00BCD4'};
    }
  }
  setStyle(value) {
    const {
      question: {userAnswer}
    } = this.props;
    if(!userAnswer) {
      return;
    }
    if(userAnswer.isTrue && value.id === userAnswer.id) {
      return {borderRadius: '50%', backgroundColor: '#00BCD4'};
    }
    if(!userAnswer.isTrue && value.id === userAnswer.id) {
      return {borderRadius: '50%', backgroundColor: '#F44336'};
    }
    if(value.isTrue) {
      return {borderRadius: '50%', backgroundColor: '#00BCD4'};
    }
  }
  render() {
    const {
      location,
      question: {title, code, answers, userAnswer},
      testState: {timer: {minutes, seconds}}
    } = this.props;
    const {checkedValue} = this.state;
    const showResults = location.pathname === '/test/results';
    const correctAnswer = showResults && answers.find(answer => answer.isTrue);
    const defaultSelected = (userAnswer && correctAnswer.id === userAnswer.id) ?
      correctAnswer : userAnswer;
    return (
      <div style={{maxWidth: '500px', textAlign: 'left'}}>
        {!showResults && <Timer minutes={minutes} seconds={seconds}/>}
        <h3>{title}</h3>
        <pre>{code}</pre>
        <RadioButtonGroup
          name="answer"
          onChange={this.handleChange}
          defaultSelected={defaultSelected}
        >
          {answers.map((value, i) => (
            <RadioButton
              key={value.id}
              disabled={showResults}
              value={value}
              label={value.answer}
              labelStyle={this.setLabelStyle(value)}
              iconStyle={this.setStyle(value)}
            />
          ))}
        </RadioButtonGroup>
        {!showResults && <div style={{textAlign: 'center'}}>
          <RaisedButton
            disabled={!checkedValue.id}
            label="Next"
            labelPosition="before"
            primary={true}
            icon={<NavigateNextIcon />}
            onTouchTap={this.handleNext}
          />
        </div>}
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    code: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      answer: PropTypes.string.isRequired,
      isTrue: PropTypes.bool,
    })).isRequired,
    userAnswerId: PropTypes.number,
  }).isRequired,
  testState: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    numOfQuestions: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    timer: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  updateTime: PropTypes.func,
  addSpentTime: PropTypes.func,
  saveUserAnswer: PropTypes.func,
  resetTimer: PropTypes.func,
  resetSpentTime: PropTypes.func,
  resetQuestions: PropTypes.func,
  nextQuestion: PropTypes.func,
  resetUserAnswers: PropTypes.func,
};

export default withRouter(Question);
