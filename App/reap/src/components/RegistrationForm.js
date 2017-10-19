import React from 'react';
import LabeledControl from './LabeledControl';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      user: "",
      password: "",
    };
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }

  render() {
    return (
      <form>
        <LabeledControl label="E-mail" type="email"
          value={this.state.email}
          onChange={e => this.handleChange("email", e)}
        />
        <LabeledControl label="Usuário" type="text"
          value={this.state.user}
          onChange={e => this.handleChange("user", e)}
        />
        <LabeledControl label="Senha" type="password"
          value={this.state.password}
          onChange={e => this.handleChange("password", e)}
        />
      </form>
    );
  }
}
