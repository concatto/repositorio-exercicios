import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { withEntities } from '../../utils';
import ModalFooter from '../ModalFooter';
import Privileged from '../Privileged';
import LabeledTagControl from '../LabeledTagControl';
//import {getInvitable} from '../../actions/actions'

class InvitationModal extends React.Component
{
	constructor(props)
	{
		super(props);
		//props.getInviteable(9);
		this.state = {
			invitations: []
		};
	}
	
	handleUserChange(key, e) {
		this.setState({[key]: e});
	}
	
	render()
	{
		const inputPropsEdit = {placeholder: "Add usuário"};
		if(!this.props.isOpen){
		  return null;
		}
		const { onDismiss, name } = this.props;
		
		return (
		  <div className="static-modal">
		  <Modal.Dialog>
			<Privileged withWarning>
			  <Modal.Header closeButton>
				<Modal.Title>Convidar um usuário</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>
				<LabeledTagControl label="Usuários"
				  className="form-control"
				  inputProps={inputPropsEdit}
				  value={this.state.invitations}
				  onChange={chips => this.handleUserChange("invitations",chips)}
				/>
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