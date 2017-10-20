import React from 'react';
import {Panel, FormGroup, FormControl, Button, Row, Col, Thumbnail} from 'react-bootstrap';
import DifficultyView from './DifficultyView';
import CategoryList from './CategoryList'


export default class IdePage extends React.Component {

	checkSintaxe() {

	}

	totalTips() {
		return 0 + "/" + 5;
	}

	positionLine() {
		return "0:0";
	}

	countLine() {
		return 0 + " linhas";
	}

	insertFooter() {
		return (
			<Row>
	        	<Col xs={3}>
	        		{this.props.language}
	        	</Col>
	        	<Col xs={3}>
	        		{this.countLine()}
	        	</Col>
	        	<Col xs={3}>
					{this.positionLine()}
	        	</Col>
	    	</Row>
		);
	}

	insertHeader() {
		return (
			<Row>
				<Col xs={3}>
					<h4>Codigo-Fonte</h4>
				</Col>
				<Col xs={3}>
					<Button>Verificar</Button>
				</Col>
				<Col xs={3}>
					<Button bsStyle="success" disabled> Enviar </Button>
				</Col>
			</Row>
		);
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
								0033
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

					<Panel header={this.insertHeader()} footer={this.insertFooter()}>
		    	    	<FormGroup>
		    	    		<FormControl componentClass="textarea" className="text-nonResize" />
		    	    	</FormGroup>
			        </Panel>
		    	</div>
         	</Col>
            <Col xs={4}>
            	<Thumbnail> 
            		<h3> Enunciado: </h3>
            		<p> {this.props.ProblemDescription} </p>
            		<CategoryList categories={["Dificil", "Sequência", "Numeros"]} />
            		<p>________________________________________</p>

            		<Row>	
            			<Col xs={9}>
            				<h2>Dicas: {this.totalTips()} </h2>
            			</Col>
            			<Col xs={3}>
            				<Button> Dica </Button>
            			</Col>
            		</Row>
            	</Thumbnail>
            </Col>
          </Row>
		);
	}
}