import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import WelcomePage from './WelcomePage';
import MainPage from './MainPage';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {authenticated: false};
  }

  handleLogin(outcome) {
    if (outcome === true) {
      this.setState({authenticated: true});
    }
  }

  createRedirectableComponent() {
    if (this.state.authenticated) {
      return <Redirect push to="/home"/>
    } else {
      return <WelcomePage onLogin={outcome => this.handleLogin(outcome)}/>
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => this.createRedirectableComponent()}/>
        <Route exact path="/home" component={MainPage}/>
      </Switch>
    );
  }
}

export default App;