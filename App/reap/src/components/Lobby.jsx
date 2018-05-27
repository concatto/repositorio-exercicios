import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import ExerciseList from './ExerciseList';
import Privileged from './Privileged';
import SideBar from './SideBar';
import { withEntities } from '../utils';
import Rooms from '../entities/rooms';

class Lobby extends React.Component {
    
    
    constructor(props)
    {
        super(props);
		const room = this.props.user.rooms.find(r => r.id === 9);
		console.log("FURAGGGGGGGGGGGGG");
		console.log(room.privilege);
        this.state = {
            isDisabled: (room.privilege <= 2) ? false : true
        }
    }
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

            <ExerciseList/> 
          </Col>
          <Col xs={3}>
            <SideBar users={this.props.users}/>
              <Button bsStyle="primary" disabled={this.state.isDisabled}>Convidar</Button>
            </Col>
            
        </Privileged>
      </Row>
    );
  }
};

export default withRouter(connect(state => {
    console.log("aduioshduoashdasoidaso")
    console.log(state);
  return {roomName: state.room.name, users: state.room.users, user: state.auth.user, roomId: state.room.id};
}, withEntities(Rooms))(Lobby));