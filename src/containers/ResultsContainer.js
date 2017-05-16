import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import RePlay from 'material-ui/svg-icons/av/replay';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/questions';
import Question from '../components/Question';

const style = {
  textAlign: 'center',
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {showResults: false};
    this.wasSpendTime = this.wasSpendTime.bind(this);
    this.startTest = this.startTest.bind(this);
    this.toggleResults = this.toggleResults.bind(this);
  }
  wasSpendTime(spentTime) {
    const {numOfQuestions = 5, questionOptions: {timer: {minutes, seconds}}} = this.props;
    let spentTimeInSeconds;
    if(spentTime) {
      spentTimeInSeconds = spentTime;
    } else {
      spentTimeInSeconds = numOfQuestions * (minutes * 60 + seconds);
    }
    const wasSpend = ((spentTimeInSeconds / 60) + '').split('.');
    const min = wasSpend[0];
    const sec = wasSpend[1] ?
      (Number.parseFloat(('0.' + wasSpend[1])) * 60).toFixed() : '0';
    return min + '.' + ((sec < 10) ? 0 + sec : sec);
  }
  startTest() {
    const {resetSpentTime, history} = this.props;
    resetSpentTime();
    history.push('/test');
  }
  toggleResults() {
    this.setState({showResults: !this.state.showResults});
  }
  render() {
    const {showResults} = this.state;
    const {questionOptions} = this.props;
    const {spentTime, userAnswers} = questionOptions;
    const numOfCorrAns = userAnswers.reduce((prev, curr) => {
      const correctAnswer = curr.answers.find(answer => answer.isTrue);
      if(correctAnswer.id === curr.userAnswer.id) {
        ++prev;
      }
      return prev;
    }, 0);
    const percentages = numOfCorrAns / userAnswers.length * 100;
    const scaleFive = 5 * percentages / 100;
    return (
      <div style={style}>
        <h3>
          You've spent {spentTime} sec. or {this.wasSpendTime(spentTime)} min.<br/>
          You've answered correctly {numOfCorrAns} question(s) from {userAnswers.length}!<br/>
          {percentages.toFixed(2)}% or {scaleFive.toFixed(2)} - 5:)
        </h3>
        <RaisedButton
          label="Restart Test"
          labelPosition="before"
          primary={true}
          icon={<RePlay />}
          onTouchTap={this.startTest}
        /><br/>
        <RaisedButton
          label={!showResults ? 'Show Results' : 'Hide Results'}
          labelPosition="before"
          secondary={true}
          style={{margin: '20px 0px'}}
          icon={!showResults ? <ExpandMore /> : <ExpandLess />}
          onTouchTap={this.toggleResults}
        />
        {showResults && userAnswers.length > 0 && userAnswers.map(question => (
          <Question
            key={question.id}
            question={question}
            questionOptions={questionOptions}
          />
        ))}
        {showResults && userAnswers.length > 0 && <RaisedButton
          label={!showResults ? 'Show Results' : 'Hide Results'}
          labelPosition="before"
          secondary={true}
          style={{margin: '20px 0px'}}
          icon={!showResults ? <ExpandMore /> : <ExpandLess />}
          onTouchTap={this.toggleResults}
        />}
      </div>
    )
  }
}

Results.propTypes = {
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
  questionOptions: PropTypes.shape({
    timer: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired,
    }).isRequired,
    userAnswers: PropTypes.array.isRequired,
    spentTime: PropTypes.number.isRequired,
  }).isRequired,
  resetSpentTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  questions: state.questions,
  questionOptions: state.questionOptions,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const ResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);

export default withRouter(ResultsContainer);
