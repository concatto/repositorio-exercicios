import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import { withEntities } from '../utils';
import Rooms from '../entities/rooms';
import Modal from '../entities/modal';
import CreateRoomModal from './modals/CreateRoomModal';
import Privileged from './Privileged';
import LinkGroupItem from './LinkGroupItem';

class RoomsPage extends React.Component {
  
  componentDidMount() {
    this.props.rooms.clear();
  }
  
  refresh() {
    this.setState({ state: this.state });
    this.forceUpdate();
  }
  
  handleCreateRoom() {
    this.props.modal.push(CreateRoomModal, {}, () => {
      this.props.modal.pop();
      this.refresh();      
    });    
  }

  createItems() {
    return this.props.roomData.map((room, i) => (
      <LinkGroupItem key={i} to={`/reap/room/${room.roomId}`}>
        <h3 className="no-top-margin">{room.name}</h3>
        <span>Seu privilégio nesta sala: {room.privilege}</span>
      </LinkGroupItem>
    ));
  }

  render() {
    return (
      <Row>
        <Privileged withWarning>
          <Col xs={9}>
            <h3>Salas disponíveis</h3>
            <ListGroup>
              {this.createItems()}
            </ListGroup>
            <Button bsStyle="primary" onClick={() => this.handleCreateRoom()}>
              Criar sala
            </Button>
          </Col>
        </Privileged>
      </Row>
    );
  }
}

export default connect(state => {
  return {
    authenticated: state.auth.authenticated,
    roomData: state.auth.user ? state.auth.user.rooms : [],
  };
}, withEntities(Modal, Rooms))(RoomsPage);
