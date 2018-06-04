import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { withEntities } from '../../utils';
import ModalFooter from '../ModalFooter';
import Privileged from '../Privileged';
import Rooms from '../../entities/rooms';
import LabeledControl from '../LabeledControl';
import LabeledTagControl from '../LabeledTagControl';

class CreateRoomModal extends React.Component {

  componentDidMount() {
    this.props.rooms.clear();
  }

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      invitations: []
    };

  }

  onCreate() {
    const { name, invitations } = this.state;
    if (name.trim() !== "") {
      this.props.rooms.create(name, invitations);
      this.props.onDismiss();
    } else {
      alert("Campo nome é obrigatório");
    }
  }

  handleChange(key, e) {
    this.setState({[key]: e.target.value });
  }

  handleUserChange(key, e) {
    this.setState({[key]: e});
  }

  render() {
    const { onDismiss, name } = this.props;
    const inputPropsEdit = {placeholder: "Add usuário"};

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
            <LabeledTagControl label="Usuários convidados"
              className="form-control"
              inputProps={inputPropsEdit}
              value={this.state.invitations}
              onChange={chips => this.handleUserChange("invitations",chips)}
            />
          </Modal.Body>
          <ModalFooter cancel confirm="Criar"
            onSuccess={() => this.onCreate()}
            onDismiss={onDismiss}
            link={`/reap`}
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
