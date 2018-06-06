import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import ExerciseList from './ExerciseList';
import Privileged from './Privileged';
import SideBar from './SideBar';
import { withEntities } from '../utils';
import Rooms from '../entities/rooms';
import InvitationModal from './modals/InvitationModal';
import LabeledTagControl from './LabeledTagControl';

class Lobby extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isDisabled: (props.privilege <= 3) ? false : true,
			isModalOpen: false
        }
    }
  componentDidMount() {
    const { rooms, match } = this.props;

    rooms.load(match.params.id);
  }

  handleInviteButtonClick()
  {
		this.setState({
			isModalOpen: true
		});
  }
  
  handleInvite(e)
  {
	  this.setState({
		 isModalOpen: false 
	  });
      if(e.length > 0){
          // dispatch action
      }
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
              <Button bsStyle="primary" disabled={this.state.isDisabled} onClick={this.handleInviteButtonClick.bind(this)}>Convidar</Button>
            </Col>
            <InvitationModal isOpen={this.state.isModalOpen} roomId={this.props.match.params.id} privilege={this.props.privilege} onSubmit={this.handleInvite.bind(this)} />
        </Privileged>
      </Row>
    );
  }
};

export default withRouter(connect(state => {
  return {roomName: state.room.name, users: state.room.users, user: state.auth.user, privilege: state.users.current.privilege};
}, withEntities(Rooms))(Lobby));