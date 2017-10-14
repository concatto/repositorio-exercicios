import React from 'react';
import { Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import logo from './g-logo.png';

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {formKey: 0};
  }

  handleSelect(formKey) {
    this.setState({formKey});
  }

  getForm() {
    switch (this.state.formKey) {
      case 0:
        return <LoginForm onLogin={this.props.onLogin}/>;
      case 1:
        return <RegistrationForm/>
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo"/>
          <h1 className="App-title">R.E.A.P.</h1>
          <small>Repositório de Exercícios de Algoritmos e Programação</small>
        </header>
        <p className="App-intro">
          Para começar, entre com suas credenciais ou registre-se no sistema.
        </p>
        <Grid className="main-content">
          <Row>
            <Col xs={6} xsOffset={3}>
              <Nav bsStyle="tabs" activeKey={this.state.formKey} onSelect={key => this.handleSelect(key)}>
                <NavItem eventKey={0}>Entrar</NavItem>
                <NavItem eventKey={1}>Cadastrar</NavItem>
              </Nav>
              <div className="tabbed-form">
                {this.getForm()}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default WelcomePage;
