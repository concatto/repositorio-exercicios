import React from 'react';
import { Button, Checkbox } from 'react-bootstrap';
import Auth, { States } from '../entities/auth';
import LabeledControl from './LabeledControl';
import { withEntities } from '../utils';
import {connect} from 'react-redux';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      persistLogin: true,
    };
  }

  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { user, password, persistLogin } = this.state;

    this.props.auth.login(user, password, persistLogin);
  }

  handlePersist() {
    this.setState({persistLogin: !this.state.persistLogin});
  }

  render() {
    const { user, password, persistLogin } = this.state;
    const { logging, failed } = this.props;

    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {failed &&
          <p id="labelInvalido" className="text-danger">Credenciais inválidas! Tente novamente.</p>
        }

        <LabeledControl id="loginUsuario" label="Usuário" type="text" withFeedback
          value={user}
          onChange={e => this.handleChange("user", e)}
          validationState={failed ? "error" : null}
        />
        <LabeledControl id="loginSenha" label="Senha" type="password" withFeedback
          value={password}
          onChange={e => this.handleChange("password", e)}
          validationState={failed ? "error" : null}
        />
        <div className="centralize-v padded-top">
          <Checkbox inline checked={persistLogin} onChange={() => this.handlePersist()}>
            Permanecer conectado
          </Checkbox>
          <Button id="loginEntrar" type="submit" className="no-top-margin flex-right" disabled={logging}>
            Entrar
          </Button>
        </div>
      </form>
    );
  }
}

export default connect(state => {
  return {
    logging: state.auth.loginState === States.Logging,
    failed: state.auth.loginState === States.Failed
  };
}, withEntities(Auth))(LoginForm);
