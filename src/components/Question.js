import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RaisedButton from 'material-ui/RaisedButton';
import NavigateNextIcon from 'material-ui/svg-icons/image/navigate-next';

const labelStyle = {
  correct: {color: '#00BCD4'},
  wrong: {color: '#F44336'}
};

const iconStyle = {
  correct: {borderRadius: '50%', backgroundColor: '#00BCD4'},
  wrong: {borderRadius: '50%', backgroundColor: '#F44336'}
};

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {checkedValue: {id: null}};
    this.handleChange = this.handleChange.bind(this);
    this.getType = this.getType.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.question !== this.props.question) {
      this.setState({checkedValue: {id: null}});
    }
  }
  handleChange(event, value) {
    const {checkedValue} = this.state;
    if(checkedValue.id === value.id) {
      return;
    }
    this.setState({checkedValue: value});
  }
  getType(value) {
    const {question: {userAnswer}} = this.props;
    if(!userAnswer) {
      return;
    }
    if(userAnswer.isTrue && value.id === userAnswer.id) {
      return 'correct';
    }
    if(!userAnswer.isTrue && value.id === userAnswer.id) {
      return 'wrong';
    }
    if(value.isTrue) {
      return 'correct';
    }
  }
  render() {
    const {
      readonly,
      question: {title, code, answers, userAnswer},
      handleNext
    } = this.props;
    const {checkedValue} = this.state;
    const correctAnswer = readonly && answers.find(answer => answer.isTrue);
    const defaultSelected = (userAnswer && correctAnswer.id === userAnswer.id) ?
      correctAnswer : userAnswer;
    return (
      <div style={{maxWidth: '500px', textAlign: 'left'}}>
        <RadioButtonChecked color="blue"/>
        <RadioButtonUnchecked color="red"/>
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
              disabled={readonly}
              value={value}
              label={value.answer}
              uncheckedIcon={<RadioButtonUnchecked color="red"/>}
              checkedIcon={<RadioButtonChecked color="blue"/>}
              labelStyle={labelStyle[this.getType(value)]}
              iconStyle={iconStyle[this.getType(value)]}
            />
          ))}
        </RadioButtonGroup>
        {!readonly && <div style={{textAlign: 'center'}}>
          <RaisedButton
            disabled={!checkedValue.id}
            label="Next"
            labelPosition="before"
            primary={true}
            icon={<NavigateNextIcon />}
            onTouchTap={() => handleNext(checkedValue)}
          />
        </div>}
      </div>
    );
  }
}

Question.propTypes = {
  readonly: PropTypes.bool.isRequired,
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
  handleNext: PropTypes.func,
};

export default Question;
