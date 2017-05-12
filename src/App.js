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
import Question from './components/Question';

export const NoMatch = ({location}) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/test"/>}/>
              <Route path="/test/question/:questionId" render={({location}) => (
                <div>
                  <Question/>
                </div>
              )}/>
              <Route path="/test" render={() => (
                <div>
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
