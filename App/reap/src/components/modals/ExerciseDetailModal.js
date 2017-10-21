import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import ExerciseDetail from '../ExerciseDetail';
import ModalFooter from '../ModalFooter';

class ExerciseDetailModal extends React.Component {
  render() {
    const { onSuccess, onDismiss } = this.props;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do exercício</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExerciseDetail name={"Exercício #32 - Sequência Fibonacci"} difficulty={4} description={
          "hirtz é bundão e não sabe programar só chupa rola e joga lol pdc vive na lua"+
          "hirtz é bundão e não sabe programar só chupa rola e joga lol pdc vive na lua" +
          "hirtz é bundão e não sabe programar só chupa rola e joga lol pdc vive na lua" +
          "hirtz é bundão e não sabe programar só chupa rola e joga lol pdc vive na lua"+
          "hirtz é bundão e não sabe programar só chupa rola e joga lol pdc vive na lua"
          } />
        </Modal.Body>
        <ModalFooter cancel confirm="Resolver"
          onSuccess={onSuccess}
          onDismiss={onDismiss}
        />
      </div>
    )
  }
};

ExerciseDetailModal.modalProperties = {
  bsSize: "large"
};

export default connect((state, ownProps) => {
  return {exercise: state.exercises.data[ownProps.id]}
})(ExerciseDetailModal);
