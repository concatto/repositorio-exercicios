import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ExerciseList from './ExerciseList';
import SideBar from './SideBar';

export default class Lobby extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={9}>
          <h3>Exercícios disponíveis</h3>
          <ExerciseList />
        </Col>
        <Col xs={3}>
          <SideBar/>
        </Col>
      </Row>
    );
  }
};
