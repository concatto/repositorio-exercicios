import React from 'react';
import { Button } from 'react-bootstrap';
import LabeledControl from './LabeledControl';

export default class LoginForm extends React.Component {
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

  handleSubmit() {
    this.props.onLogin(true);
  }

  render() {
    return (
      <form onSubmit={() => this.handleSubmit()}>
        <LabeledControl label="Usuário" type="text"
          value={this.state.user}
          onChange={e => this.handleChange("user", e)}
        />
        <LabeledControl label="Senha" type="password"
          value={this.state.password}
          onChange={e => this.handleChange("password", e)}
        />
        <Button type="submit">Entrar</Button>
      </form>
    );
  }
}
