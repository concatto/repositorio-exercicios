import React from 'react';
import { Panel } from 'react-bootstrap';
import DifficultyView from './DifficultyView';
import CategoryList from './CategoryList';
import LanguageList from './LanguageList';

export default class ExerciseDetail extends React.Component {
  render(){
    return (
      <div>
        <h1 className="title-text">{this.props.name}</h1>
        <Panel header={this.props.name}>
          {this.props.description}
        </Panel>
        <h4>Dificuldade:</h4> <DifficultyView difficulty={this.props.difficulty} />
        <h4>Categorias:</h4> <CategoryList categories={['Loop', 'Recursividade', 'Sequência Matemática']}/>
        <h4>Linguagens:</h4> <LanguageList languages={['C++', 'Java', 'Python']} />
      </div>
    );
  }
}
