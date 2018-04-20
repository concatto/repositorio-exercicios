import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import OnlineIndicator from './OnlineIndicator';

export default class MemberItem extends React.Component {
	render(){
		const {name, online = false} = this.props;
		return (
			<ListGroupItem>{name}<OnlineIndicator online={online}/></ListGroupItem>
		)
	}
}
