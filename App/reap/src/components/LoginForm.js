import React from 'react';
import { Button } from 'react-bootstrap';
import Login from '../entities/login';
import LabeledControl from './LabeledControl';
import { withEntities } from '../utils';
import {connect} from 'react-redux';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
    };
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }

  handleSubmit(e) {
    //e.preventDefault();
    //this.props.authenticate.login()
    this.props.onLogin(true);
  }

  render() {
    const {user, password} = this.state;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <LabeledControl label="Usuário" type="text"
          value={this.state.user}
          onChange={e => this.handleChange("user", e)}
        />
        <LabeledControl label="Senha" type="password"
          value={this.state.password}
          onChange={e => this.handleChange("password", e)}
        />
        <Button type="submit" onClick={() => this.props.authenticate.login(user, password)}>Entrar</Button>
      </form>
    );
  }
}

export default connect(state => {
  return {};
}, withEntities(Login))(LoginForm);
