import React from 'react';
import { Modal, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';

class BuildErrorModal extends React.Component {
  mapErrorsToItems() {
    const { errors = [] } = this.props;

    return errors.map((err, i) => {
      return (
        <ListGroupItem key={i}>
          {err}
        </ListGroupItem>
      );
    });
  }

  render() {
    console.log(this.props);
    const { onDismiss } = this.props;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Falha na construção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sua solução foi analisada e os seguintes erros foram encontrados:</p>
          <Panel header="Erros" className="build-error-panel">
            <ListGroup className="error-list">
              {this.mapErrorsToItems()}
            </ListGroup>
          </Panel>
        </Modal.Body>
        <ModalFooter cancel="Continuar" onDismiss={onDismiss}/>
      </div>
    );
  }
}

BuildErrorModal.modalProperties = {
  bsSize: 'large',
};

export default BuildErrorModal;
