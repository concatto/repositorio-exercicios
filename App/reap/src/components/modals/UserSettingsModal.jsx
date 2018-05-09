import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';


class UserSettingsModal extends React.Component {
  render() {
    const { onDismiss, exercise, roomId } = this.props;
    const { difficulty, description, name, baseReward, id } = exercise;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title> Configuração de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
      </div>
    );
  }
}

UserSettingsModal.modalProperties = {
  bsSize: '',
};

export default connect(state => {
  return {roomId: state.room.id};
})(UserSettingsModal);
