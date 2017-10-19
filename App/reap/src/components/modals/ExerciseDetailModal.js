import React from 'react';
import { Modal } from 'react-bootstrap';

class ExerciseDetailModal extends React.Component {
  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do exercício</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ...
        </Modal.Body>
      </div>
    )
  }
};

export default ExerciseDetailModal;
