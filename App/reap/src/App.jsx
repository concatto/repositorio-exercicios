import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import { withEntities } from './utils';
import Auth from './entities/auth';
import Loading from './components/Loading';
import MainPage from './components/MainPage';
import WelcomePage from './components/WelcomePage';
import ConfirmationTokenPage from './components/ConfirmationTokenPage';
import ConfirmationInvitePage from './components/ConfirmationInvitePage';
import './css/App.css';
import './css/stylesheets/bootswatch.css';

class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentWillMount() {
    this.props.auth.tryLoggingFromStorage();
  }

  render() {
    const { authenticated } = this.props.authData;
    if (authenticated === undefined) {
      return <Loading full/>;
    }

    return (
      <Switch>
        <Route exact path="/" component={WelcomePage}/>
        <Route path="/reap" component={MainPage}/>
        <Route path="/confirmation" component={ConfirmationTokenPage}/>
        <Route path="/acceptInvite" component={ConfirmationInvitePage}/>
      </Switch>
    );
  }
}

const Connected = connect(state => {
  return { authData: state.auth };
}, withEntities(Auth))(App);

export default withRouter(Connected);
