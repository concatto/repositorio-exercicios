import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import Exercise from './Exercise';
import ExerciseEntity from '../entities/exercises';
import { withEntities } from '../utils';

class ExerciseList extends React.Component {
  createExerciseComponents() {
    return Object.values(this.props.exerciseData).map(ex => {
      return (
        <Exercise key={ex.id}
          id={ex.id}
          name={ex.name}
          difficulty={ex.difficulty}
          points={ex.reward}
          status={ex.status}
        />
      );
    });
  }

  componentDidMount() {
    this.props.exercises.loadAll();
  }

  render (){
    return (
      <Table striped bordered condensed hover >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Dificuldade</th>
            <th>Pontos</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.createExerciseComponents()}
        </tbody>
      </Table>
    );
  }
}

export default connect(state => {
  return {exerciseData: state.exercises.data};
}, withEntities(ExerciseEntity))(ExerciseList);
