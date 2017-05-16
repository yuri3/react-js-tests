import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

const root = {
  textAlign: 'center',
};

const progressStyle = {
  display: 'inline-block',
  position:'relative',
};

const timeStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '150%',
  fontWeight: 'bold',
};

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {completed: 0, maxTime: 0};
  }
  componentDidMount() {
    const {minutes, seconds} = this.props;
    this.setState({...this.state, maxTime: (minutes * 60 + seconds)});
  }
  componentWillReceiveProps(nextProps) {
    const {maxTime} = this.state;
    const {minutes, seconds} = nextProps;
    const progress = maxTime - (minutes * 60 + seconds);
    this.setState({completed: progress})
  }
  render() {
    const {completed, maxTime} = this.state;
    const {minutes, seconds} = this.props;
    const time = minutes + ' : ' + (seconds < 10 ? '0' + seconds : seconds);
    return (
      <div style={root}>
        <div style={progressStyle}>
          <CircularProgress
            mode="determinate"
            value={completed}
            max={maxTime}
            size={150}
          />
            <div style={timeStyle}>
              {time}
            </div>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
};

export default Timer;
