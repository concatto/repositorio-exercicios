import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { withEntities } from '../../utils';
import ModalFooter from '../ModalFooter';
import Privileged from '../Privileged';
import LabeledControl from '../LabeledControl';

class InvitationModal extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	
	render()
	{
		
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
				<LabeledControl label="Usuário" type="text"
					value={name}
				  />
			  </Modal.Body>
			  <Modal.Footer>
				<Button onClick={() => this.props.onSubmit("hi there")}> deu</Button>
			  </Modal.Footer>
			</Privileged>
			</Modal.Dialog>
		  </div>
		)
	}
}

export default connect(null, null)(InvitationModal);