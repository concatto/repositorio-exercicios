import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {handleConfirmationInvite} from '../actions/actions.js';

class ConfirmationInvitePage extends React.Component {
  constructor(props) {
    super(props);

    const isConfirmed = false;
    this.state = {
        confirmed: undefined,
        token: this.props.location.search
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const { token } = values;
    this.props.handleConfirmationInvite({token}, confirmed => {
      this.setState({confirmed});
    });
  }

  render() {
    if (this.state.confirmed === true) {
      return <h3>Confirmação do convite realizada com sucesso!</h3>;
    } else if (this.state.confirmed === false) {
      return <h3>Confirmação falhou!</h3>;
    }

    return null;
  }
}
// talvez nem precise do connect
export default connect(null, { handleConfirmationInvite })(ConfirmationInvitePage);
