import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RaisedButton from 'material-ui/RaisedButton';
import NavigateNextIcon from 'material-ui/svg-icons/image/navigate-next';

const svgIcons = {
  correct: <RadioButtonChecked style={{fill: '#00BCD4'}}/>,
  wrong: <RadioButtonChecked style={{fill: '#F44336'}}/>,
  wasCorrect: <RadioButtonUnchecked style={{fill: '#00BCD4'}}/>,
};

const labelStyle = {
  correct: {color: '#00BCD4'},
  wrong: {color: '#F44336'},
  wasCorrect: {color: '#00BCD4'},
};

class Question extends Component {
  constructor(props) {
    super(props);
    this.getType = this.getType.bind(this);
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
      return 'wasCorrect';
    }
  }
  render() {
    const {
      readonly,
      checkedValue,
      question: {title, code, answers, userAnswer},
      handleChange,
      handleNext
    } = this.props;
    const correctAnswer = readonly && answers.find(answer => answer.isTrue);
    const defaultSelected = (userAnswer && correctAnswer.id === userAnswer.id) ?
      correctAnswer : userAnswer;
    return (
      <div style={{maxWidth: '500px', textAlign: 'left'}}>
        <h3>{title}</h3>
        <pre>{code}</pre>
        <RadioButtonGroup
          name="answer"
          onChange={handleChange}
          defaultSelected={defaultSelected}
        >
          {answers.map(value => (
            <RadioButton
              key={value.id}
              disabled={readonly}
              value={value}
              label={value.answer}
              uncheckedIcon={readonly ? svgIcons[this.getType(value)] : null}
              checkedIcon={readonly ? svgIcons[this.getType(value)] : null}
              labelStyle={labelStyle[this.getType(value)]}
            />
          ))}
        </RadioButtonGroup>
        {!readonly && <div style={{textAlign: 'center'}}>
          <RaisedButton
            disabled={!checkedValue}
            label="Next"
            labelPosition="before"
            primary={true}
            icon={<NavigateNextIcon />}
            onTouchTap={handleNext}
          />
        </div>}
      </div>
    );
  }
}

Question.propTypes = {
  readonly: PropTypes.bool.isRequired,
  checkedValue: PropTypes.bool,
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
  handleChange: PropTypes.func,
  handleNext: PropTypes.func,
};

export default Question;
