import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { withEntities } from './utils';
import Login from './entities/login';
import MainPage from './components/MainPage';
import WelcomePage from './components/WelcomePage';
import ConfirmationTokenPage from './components/ConfirmationTokenPage';
import './css/App.css';
import './css/stylesheets/bootswatch.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {verifying: true};
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  // handleLogin(outcome) {
  //   if (outcome === true) {
  //     this.setState({authenticated: true});
  //     this.props.history.push("/reap");
  //   }
  // }

  createWelcomePage() {
    return <WelcomePage onLogin={outcome => {this.handleLogin(outcome)}}/>;
  }

  componentWillMount() {
    this.props.auth.tryLoggingFromStorage();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => this.createWelcomePage()}/>
        <Route path="/reap" component={MainPage}/>
        <Route path="/:token" component={ConfirmationTokenPage} />
      </Switch>
    );
  }
}

const Connected = connect(state => {
  return {};
}, withEntities(Login))(App);

export default withRouter(Connected);
