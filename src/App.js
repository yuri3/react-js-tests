import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import TestContainer from './containers/TestContainer';
import ResultsContainer from './containers/ResultsContainer';

export const NoMatch = ({location}) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

const style = {
  display: 'flex',
  justifyContent: 'center',
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/test"/>}/>
              <Route path="/test/results" render={() => (
                <div>
                  <ResultsContainer/>
                </div>
              )}/>
              <Route path="/test" render={() => (
                <div style={style}>
                  <TestContainer/>
                </div>
              )}/>
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
