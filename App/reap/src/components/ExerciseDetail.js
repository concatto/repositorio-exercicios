import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import DifficultyView from './DifficultyView';
import CategoryList from './CategoryList';
import LanguageList from './LanguageList';

export default class ExerciseDetail extends React.Component {
  render(){
    return (
      <div>
        <Row className="flex">
          <Col xs={8}>
            <h2 className="title-text">{this.props.name}</h2>
            <Panel header="Enunciado">
              {this.props.description}
            </Panel>
            <h4>Dificuldade:</h4> <DifficultyView difficulty={this.props.difficulty} />
            <h4>Categorias:</h4> <CategoryList categories={['Loop', 'Recursividade', 'Sequência Matemática']}/>
            <h4>Linguagens:</h4> <LanguageList languages={['C', 'C#', 'C++', 'Java', 'Python', 'JavaScript']} />
          </Col>
          <Col xs={4} className="centralize reward">
              <span>Pontos</span>
              <h1>{this.props.reward}</h1>
          </Col>
        </Row>
      </div>
    );
  }
}
