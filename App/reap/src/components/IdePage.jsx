import React from 'react';
import { connect } from 'react-redux';
import {Button, Row, Col, Thumbnail} from 'react-bootstrap';
import DifficultyView from './DifficultyView';
import CategoryList from './CategoryList';
import TextAreaCode from './TextAreaCode';
import { withEntities } from '../utils';
import Exercise from '../entities/exercises';

class IdePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usedTips: 0,
      maxTips: 5,
    };
  }

  handleChange() {
    this.setState({usedTips: this.usedTips + 1});
  }

  componentDidMount() {
    this.props.exercises.loadAll(this.props.roomId);
  }

  render() {
    if (!this.props.exercise) {
      return <h2>Carregando...</h2>;
    }

    return (
      <Row>
        <Col xs={8}>
          <div>
            <Row>
              <Col xs={3}>
                <h6>Pontos</h6>
                {this.props.exercise.baseReward}
              </Col>
              <Col xs={7}>
                <h2> {this.props.exercise.name} </h2>
              </Col>
              <Col xs={2}>
                <h6> Dificuldade </h6>
                <DifficultyView difficulty={this.props.exercise.difficulty}/>
              </Col>
            </Row>
            <TextAreaCode
              room={this.props.roomId}
              language={this.props.language}
              exercise={this.props.exercise}
            />
          </div>
        </Col>
        <Col xs={4}>
          <Thumbnail>
            <h3> Enunciado: </h3>
            <p> {this.props.exercise.description} </p>
            <CategoryList categories={['Dificil', 'Sequência', 'Numeros']}/>
            <Row>
              <Col xs={9}>
                <h2>Dicas: {this.state.usedTips}/{this.state.maxTips}</h2>
              </Col>
              <Col xs={3}>
                <Button onClick={() => this.handleChange()}> Dica </Button>
              </Col>
            </Row>
          </Thumbnail>
        </Col>
      </Row>
    );
  }
}

export default connect((state, ownProps) => {
  const { id, roomId } = ownProps.match.params;

  return {
    roomId,
    exercise: state.exercises ? state.exercises.data[id] : {},
  };
}, withEntities(Exercise))(IdePage);
