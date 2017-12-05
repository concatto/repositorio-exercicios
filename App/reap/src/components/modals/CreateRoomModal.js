import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';

class CreateRoomModal extends React.Component {
  render() {
    const { onDismiss } = this.props;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Criar nova sala</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <ModalFooter cancel confirm="Resolver"
          onSuccess={onDismiss}
          onDismiss={onDismiss}
        />
      </div>
    )
  }
};

export default connect((state, ownProps) => {
  return {};
})(CreateRoomModal);
