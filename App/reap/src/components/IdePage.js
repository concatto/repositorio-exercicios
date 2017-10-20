import React from 'react';
import {Button, Row, Col, Thumbnail} from 'react-bootstrap';
import DifficultyView from './DifficultyView';
import CategoryList from './CategoryList'
import TextAreaCode from './TextAreaCode'

export default class IdePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			used_tips: 0,
			max_tips: 5
		}
	}

	handleChange() {
		this.setState({used_tips: this.used_tips+1});
	}

	render() {
		return(
			<Row>
	            <Col xs={8}>
	            	<div>
						<Row> 
							<Col xs={3}>
								<h3>
									<h6>Pontos</h6>
									{this.props.points}
								</h3>
							</Col>
							<Col xs={7}>
								<h2> {this.props.titleExercice} </h2>
							</Col>
							<Col xs={2}>
								<h6> Dificuldade </h6>
								<DifficultyView difficulty={5} />
							</Col>
						</Row>
						<TextAreaCode language={this.props.language}/>
			    	</div>
	         	</Col>
	            <Col xs={4}>
	            	<Thumbnail> 
	            		<h3> Enunciado: </h3>
	            		<p> {this.props.ProblemDescription} </p>
	            		<CategoryList categories={["Dificil", "Sequência", "Numeros"]} />
	            		<Row>	
	            			<Col xs={9}>
	            				<h2>Dicas: {this.state.used_tips}/{this.state.max_tips} </h2>
	            			</Col>
	            			<Col xs={3}>
	            				<Button onClick={() => {this.handleChange()}}> Dica </Button>
	            			</Col>
	            		</Row>
	            	</Thumbnail>
	            </Col>
          	</Row>
		);
	}
}