import React from 'react';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import MainPage from './components/MainPage';
import ConfirmationTokenPage from './components/ConfirmationTokenPage';
import './css/App.css';
import './css/stylesheets/bootswatch.css';

class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  constructor(props) {
    super(props);

    this.state = {authenticated: false};
  }

  handleLogin(outcome) {
    if (outcome === true) {
      this.setState({authenticated: true});
      this.props.history.push("/reap");
    }
  }

  createWelcomePage() {
    return <WelcomePage onLogin={outcome => {this.handleLogin(outcome)}}/>;
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

export default withRouter(App);
