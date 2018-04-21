import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import ExerciseDetail from '../ExerciseDetail';
import ModalFooter from '../ModalFooter';

class ExerciseDetailModal extends React.Component {
  render() {
    const { onDismiss, exercise, roomId } = this.props;
    const { difficulty, description, name, baseReward, id } = exercise;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do exercício</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExerciseDetail
            difficulty={difficulty}
            description={description}
            name={`Exercício #${id} - ${name}`}
            reward={baseReward}
          />
        </Modal.Body>
        <ModalFooter
          cancel
          confirm="Resolver"
          onSuccess={onDismiss}
          onDismiss={onDismiss}
          link={`/reap/room/${roomId}/solve/${id}`}
        />
      </div>
    );
  }
}

ExerciseDetailModal.modalProperties = {
  bsSize: 'large',
};

export default connect(state => {
  return {roomId: state.room.id};
})(ExerciseDetailModal);
