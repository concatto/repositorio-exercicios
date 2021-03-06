import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { withEntities } from '../../utils';
import ModalFooter from '../ModalFooter';
import Privileged from '../Privileged';
import LabeledUserControl from '../LabeledUserControl'
//import {getInvitable} from '../../actions/actions'

class InvitationModal extends React.Component
{
	constructor(props)
	{
		super(props);
		let possiblePrivileges = ['Estudante'];
        
        if(props.privilege < 2) // 2 is professor
        {
            possiblePrivileges.push('Professor');
            possiblePrivileges.push('Administrador');
        }
        
		this.state = {
			invitations: [],
            possiblePrivileges: possiblePrivileges
		};
	}
	
	handlePrivilegeChange = (e, i) => {
		const items = this.state.invitations;
		items[i].privilege = e+1;
		this.setState(prevState => ({
		  invitations: [...items]
		}));
	}
    
      handleClickButton = () => {
    let newElement = { key:this.state.invitations.length+1, username: '', privilege: -1 };
    this.setState(prevState => ({
      invitations: [...prevState.invitations, newElement]
    }));
  }

  handleUsernameChange = (e, i) => {
    const items = this.state.invitations;
    items[i].username = e.target.value;
    this.setState(prevState => ({
      invitations: [...items]
    }));
  }
	
	handleUserChange(key, e) {
		this.setState({[key]: e});
	}
	
	render()
	{
		if(!this.props.isOpen){
		  return null;
		}
		
		const invites = this.state.invitations.map((element, i) => {
		  const id = "bg-nested-dropdown user-invite"+i;
		  return <LabeledUserControl eventKey={i} key={i} value={element} id={id} previlegies={this.state.possiblePrivileges}
			usernameChange={this.handleUsernameChange} privilegeChange={this.handlePrivilegeChange} />;
		});
		
		const { onDismiss, name } = this.props;
		
		return (
		  <div className="static-modal">
		  <Modal.Dialog>
			<Privileged withWarning>
			  <Modal.Header closeButton>
				<Modal.Title>Convidar um usuário</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>
			  <Button bsStyle="primary" onClick={() => this.handleClickButton()}block>
				  Adicionar usuário
				</Button>
				<br/>
				{invites}
			  </Modal.Body>
			  <Modal.Footer>
				<Button onClick={() => this.props.onSubmit(this.state.invitations)}> deu</Button>
			  </Modal.Footer>
			</Privileged>
			</Modal.Dialog>
		  </div>
		)
	}
}

const mapStateToProps = state =>
{
	return {
		something: state
	}
}

export default connect(mapStateToProps, null)(InvitationModal);