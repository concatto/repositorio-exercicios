import React from 'react';
import { connect } from 'react-redux';
import {Panel, FormGroup, FormControl, Col, Row, Button} from 'react-bootstrap';
import BuildErrorModal from './modals/BuildErrorModal';
import RewardModal from './modals/RewardModal';
import SuccessModal from './modals/SuccessModal';
import Modal from '../entities/modal';
import { withEntities } from '../utils';

class TextAreaCode extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			total_Lines: 1,
			positionX: 0,
			positionY: 0,
		}
	}


	countLine(e) {
		var count = 1;
		var key = e.which || e.keyCode || e.charCode;

		for (var i = 0; i < e.target.value.length; i++) {
			if (key === 13) {
				count = count + 1;
				this.setState({total_Lines: count});
			}
			console.log(key);
		}
	}

	insertFooter() {
		return (
			<Row>
				<Col xs={3}>
					{this.props.language}
				</Col>
				<Col xs={3}>
					{this.state.total_Lines}
				</Col>
				<Col xs={3}>
					{this.state.positionX + ":" + this.state.positionY}
				</Col>
			</Row>
		);
	}

	handleVerify() {
		this.props.modal.push(BuildErrorModal);
	}

	handleSubmit() {
		this.props.modal.push(SuccessModal, {}, () => {
			this.props.modal.pop();
			this.props.modal.push(RewardModal, {});
		});
	}

	insertHeader() {
		return (
			<Row>
				<Col xs={3}>
					<h4>Codigo-Fonte</h4>
				</Col>
				<Col xs={3}>
					<Button bsStyle="info" onClick={() => this.handleVerify()}>Verificar</Button>
				</Col>
				<Col xs={3}>
					<Button bsStyle="success" onClick={() => this.handleSubmit()}>Enviar</Button>
				</Col>
			</Row>
		);
	}

	render() {
		return (
			<Panel header={this.insertHeader()} footer={this.insertFooter()}>
				<FormGroup>
					<FormControl
						componentClass="textarea"
						className="text-nonResize"
						onKeyPress={(e) => this.countLine(e)} />
				</FormGroup>
			</Panel>
		);
	}
}

export default connect(state => {
	return {};
}, withEntities(Modal))(TextAreaCode);
