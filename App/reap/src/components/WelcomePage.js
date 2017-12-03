import React from 'react';
import { Grid, Row, Col, Tab, Tabs } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import logo from '../g-logo.png';

class WelcomePage extends React.Component {
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
              <Tabs animation={false} id="welcome-tabs" defaultActiveKey={1}>
                <Tab title="Entrar" className="tabbed-form" eventKey={1}>
                  <LoginForm/>
                </Tab>
                <Tab title="Cadastrar" className="tabbed-form" eventKey={2}>
                  <RegistrationForm/>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default WelcomePage;
