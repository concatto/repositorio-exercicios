import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';


class UserSettingsModal extends React.Component {
  render() {
    const { onDismiss, user, roomId } = this.props;
    const { id, name, experience, privilege, joined_at } = user;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title> Configuração de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div> 
                <h3> Nome: {name} </h3> 
                <h4> Privilégio atual: {privilege} </h4> 
            </div>
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
