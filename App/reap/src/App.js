import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import WelcomePage from './WelcomePage';
import MainPage from './MainPage';
import './App.css';
import { loadExercises } from './actions';

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
      return <WelcomePage onLogin={ (outcome) => {this.handleLogin(outcome)}} />
  }

  componentDidMount() {
    this.props.loadExercises();
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

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {
    loadExercises
})(App);
