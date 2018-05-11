import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { withEntities } from '../../utils';
import ModalFooter from '../ModalFooter';
import Privileged from '../Privileged';
import Rooms from '../../entities/rooms';
import LabeledControl from '../LabeledControl';

class CreateRoomModal extends React.Component {
  
  componentDidMount() {
    this.props.rooms.clear();
  }
  
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
    
  }
  
  onCreate() {
    const { name } = this.state;
    if (name.trim() !== "") {
      this.props.rooms.create(name); 
      this.props.onDismiss();
    } else {
      alert("Campo nome é obrigatório");
    }
  }

  handleChange(key, e) {    
    this.setState({[key]: e.target.value });    
  }
    
  render() {
    const { onDismiss, name } = this.props;
    
    return (
      <div>
        <Privileged withWarning>
          <Modal.Header closeButton>
            <Modal.Title>Criar nova sala</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LabeledControl label="Nome" type="text"
                value={name}
                onChange={e => this.handleChange("name", e)}
              />
          </Modal.Body>
          <ModalFooter cancel confirm="Criar"
            onSuccess={() => this.onCreate()}
            onDismiss={onDismiss}
            link={`/reap/room`}
          />
        </Privileged>
      </div>
    )
  }
};

export default connect((state, ownProps) => {
  return {
    authenticated: state.auth.authenticated,
    roomData: state.auth.user ? state.auth.user.rooms : [],
  };
}, withEntities(Rooms))(CreateRoomModal);
