import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { withEntities } from '../../utils';
import ModalFooter from '../ModalFooter';
import Privileged from '../Privileged';
import Rooms from '../../entities/rooms';
import LabeledControl from '../LabeledControl';
import LabeledUserControl from '../LabeledUserControl';


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

  handlePrivilegeChange = (e, i) => {
    const items = this.state.invitations;
    items[i].privilege = e+1;
    this.setState(prevState => ({
      invitations: [...items]
    }));
  }

  handleUsernameChange = (e, i) => {
    const items = this.state.invitations;
    items[i].username = e.target.value;
    this.setState(prevState => ({
      invitations: [...items]
    }));
  }

  handleChange = (key, e) => {
    this.setState({[key]: e.target.value });
  }

  handleUserChange = (key, e) => {
    this.setState({[key]: e});
  }

  handleClickButton = () => {
    let newElement = { key:this.state.invitations.length+1, username: '', privilege: -1 };
    this.setState(prevState => ({
      invitations: [...prevState.invitations, newElement]
    }));
  }

  render() {
    const previlegies = ['Administrador', 'Professor', 'Estudante'];
    const { onDismiss } = this.props;
    const { name, invitations } = this.state;

    const invites = this.state.invitations.map((element, i) => {
      const id = "bg-nested-dropdown user-invite"+i;
      return <LabeledUserControl eventKey={i} key={i} value={element} id={id} previlegies={previlegies}
        usernameChange={this.handleUsernameChange} privilegeChange={this.handlePrivilegeChange} />;
    });

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
            <Button bsStyle="primary" onClick={() => this.handleClickButton()}block>
              Adicionar usuário
            </Button>
            <br/>
            {invites}
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
