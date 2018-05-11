import React from 'react';
import Modal from '../entities/modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withEntities } from '../utils';
import UserSettingsModal from './modals/UserSettingsModal';


class UserSettings extends React.Component {
    
    constructor(props)
    {
        super(props);
    }
    
    handleClick(e) {
        e.preventDefault();
        this.props.modal.push(UserSettingsModal, {user: this.props.user});
    }
    
   render() {
       return (
           <a href="#" onClick={this.handleClick.bind(this)} class="glyphicon glyphicon-wrench" ></a>
       )
   };
    
}


export default withRouter(connect(state => ({}), withEntities(Modal))(UserSettings));
