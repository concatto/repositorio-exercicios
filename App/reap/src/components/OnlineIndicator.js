import React from 'react';
import {Badge} from 'react-bootstrap';

export default class OnlineIndicator extends React.Component {
	
	render(){
		const {online} = this.props;
		const suffix = online ? "online" : "offline";
		
		return (
		
		
			<Badge className={"online-indicator " + suffix}>&nbsp;</Badge>
		
		
		)
		
		
	}
	

}