import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

class UserSettingsModal extends React.Component {
  constructor(props){
    super();
    this.state={value:1};
  }

  changeStatus(value){
    value.
    this.setState({value});
    console.log(this.state.value);
  }

  render() {
    const { onDismiss, user, roomId } = this.props;
    const { id, name, experience, privilege, joined_at } = user;
      var privilegeVerify;
      
      switch({privilege}.privilege){
          case 0:
              privilegeVerify='Criador da Sala';
              break;
          case 1:
              privilegeVerify='Administrador';
              break;
          case 2:
              privilegeVerify='Professor';
              break;
          case 3:
              privilegeVerify='Aluno';
              break;
      }





    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title> Configuração de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div> 
                <h3> Nome: {name} </h3> 
                <h4> Privilégio atual: {privilegeVerify} </h4> 
                <br></br>
               
            </div>
<form>
            <select id="select">
  <option value="1" >Administrador</option> 
  <option value="2">Professor</option>
  <option value="3">Aluno</option>
</select>

            <button id="userSettingButton" onClick={this.changeStatus.bind(this)} className="atualizar">OK</button>
</form>
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
