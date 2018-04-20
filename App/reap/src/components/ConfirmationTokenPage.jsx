import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import queryString from 'query-string';
import {handleConfirmationToken} from '../actions/actions.js';

class ConfirmationTokenPage extends React.Component {
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
    this.props.handleConfirmationToken({token}, confirmed => {
      this.setState({confirmed});
    });
  }

  render() {
    if (this.state.confirmed === true) {
      return <h3>Confirmação realizada com sucesso!</h3>;
    } else if (this.state.confirmed === false) {
      return <h3>Confirmação falhou!</h3>;
    }
      
    return null;
  }
}
// talvez nem precise do connect
export default connect(null, { handleConfirmationToken })(ConfirmationTokenPage);
