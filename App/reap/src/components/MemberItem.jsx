import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import OnlineIndicator from './OnlineIndicator';
import UserSettings from './UserSettings';

export default class MemberItem extends React.Component {
	render(){
		const {name, online = false} = this.props;
		return (
			<ListGroupItem>{name} <UserSettings exercise="teste"/> <OnlineIndicator online={online}/></ListGroupItem>
		)
	}
}
