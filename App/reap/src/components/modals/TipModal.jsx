import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';

class TipModal extends React.Component {
  render() {
    const { onDismiss } = this.props;

    return (
      <div className="tip-modal">
        <Modal.Header>
          <Modal.Title>Dica #2</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aliquam accumsan augue lectus, sit amet fermentum tellus facilisis
            sit amet. Aenean nisi orci, condimentum at eros ac, dictum
            condimentum dolor. Etiam ac sem dolor. Maecenas pretium tortor magna.
            Nam vel enim eget sem placerat lacinia non quis diam.</p>

          <p>O exercício agora vale <strong>23</strong> pontos.</p>
        </Modal.Body>
        <ModalFooter cancel="Continuar" onDismiss={onDismiss}/>
      </div>
    );
  }
}

export default TipModal;
