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
    const { user, password } = this.state;
    e.preventDefault();
    this.props.auth.login(user, password);
    // this.props.onLogin(true);
  }

  render() {
    const {user, password} = this.state;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <LabeledControl label="Usuário" type="text"
          value={user}
          onChange={e => this.handleChange("user", e)}
        />
        <LabeledControl label="Senha" type="password"
          value={password}
          onChange={e => this.handleChange("password", e)}
        />
        <Button type="submit">Entrar</Button>
      </form>
    );
  }
}

export default connect(state => {
  return {};
}, withEntities(Login))(LoginForm);
