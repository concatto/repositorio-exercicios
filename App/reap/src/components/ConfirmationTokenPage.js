import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {handleConfirmationToken} from '../actions/actions.js';

class ConfirmationTokenPage extends React.Component {
  constructor(props) {
    super(props);

    const isConfirmed = false;
    this.state = {
        token: this.props.location.search
    };
  }

  renderConsole(){
    this.props.handleConfirmationToken(this.state, (isConfirmed) => {
      this.isConfirmed = isConfirmed;
    })

    if (this.isConfirmed) { return <h1> Cadastro Confirmado! </h1> }
    else { return <h1> Ops! Algum erro ocorreu, faça o cadastro novamente! </h1> }

    console.log(this.state.token);
  };

  render() {
    return(
      <div>
        {this.renderConsole()}
      </div>
    );
  }
}
//talvez nem precise do connect
export default connect(null, {handleConfirmationToken})(ConfirmationTokenPage);
