import React from 'react';
import LabeledControl from './LabeledControl';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {handleSubscription} from '../actions/actions.js';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      name: ""
    };
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }

  submitValues() {
    this.props.handleSubscription(this.state);
  }

  render() {
    return (
      <form>
        <LabeledControl label="Nome" type="text"
          value={this.state.name}
          onChange={e => this.handleChange("name", e)}
        />
        <LabeledControl label="E-mail" type="email"
          value={this.state.email}
          onChange={e => this.handleChange("email", e)}
        />
        <LabeledControl label="Usuário" type="text"
          value={this.state.username}
          onChange={e => this.handleChange("username", e)}
        />
        <LabeledControl label="Senha" type="password"
          value={this.state.password}
          onChange={e => this.handleChange("password", e)}
        />
        <Button type="submit" onClick={() => {this.submitValues()}}> Cadastrar </Button>
      </form>
    );
  }
}


export default connect(null, {handleSubscription})(RegistrationForm);
