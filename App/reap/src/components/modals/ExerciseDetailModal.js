import React from 'react';
import { Modal } from 'react-bootstrap';
import ExerciseDetail from '../ExerciseDetail';

class ExerciseDetailModal extends React.Component {
  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.name}</Modal.Title>
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
      </div>
    )
  }
};

export default ExerciseDetailModal;
