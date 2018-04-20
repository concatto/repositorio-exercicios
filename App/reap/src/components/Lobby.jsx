import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import ExerciseList from './ExerciseList';
import Privileged from './Privileged';
import SideBar from './SideBar';
import { withEntities } from '../utils';
import Rooms from '../entities/rooms';

class Lobby extends React.Component {
  componentDidMount() {
    const { rooms, match } = this.props;

    rooms.load(match.params.id);
  }

  render() {
    return (
      <Row>
        <Privileged withWarning student>
          <Col xs={9}>
            <h3>Exercícios disponíveis - {this.props.roomName}</h3>
            <ExerciseList />
          </Col>
          <Col xs={3}>
            <SideBar/>
          </Col>
        </Privileged>
      </Row>
    );
  }
};

export default withRouter(connect(state => {
  return {roomName: state.room.name};
}, withEntities(Rooms))(Lobby));
