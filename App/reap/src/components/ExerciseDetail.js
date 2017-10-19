import React from 'react';
import {Panel} from 'react-bootstrap';
import DifficultyView from './DifficultyView';
import CategoryList from './CategoryList';

export default class ExerciseDetail extends React.Component {
  render(){
    return (
      <div>
        <h1>{this.props.name}</h1>
        <Panel header={this.props.name}>
          {this.props.description}
        </Panel>
        <DifficultyView difficulty={this.props.difficulty} />
        <h4>Categorias:</h4> <CategoryList categories={['Loop', 'Recursividade', 'Sequência Matemática']}/>
      </div>
    );
  }
}
