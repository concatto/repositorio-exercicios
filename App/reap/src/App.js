import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import MainPage from './components/MainPage';
import './App.css';

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
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
    return state;
};

export default withRouter(App);
