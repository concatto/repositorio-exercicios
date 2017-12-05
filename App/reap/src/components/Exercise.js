import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withEntities } from '../utils';
import Modal from '../entities/modal';
import ExerciseDetailModal from './modals/ExerciseDetailModal';
import DifficultyView from './DifficultyView';
import ExerciseStatus from './ExerciseStatus';

class Exercise extends React.Component {
  handleClick() {
    this.props.modal.push(ExerciseDetailModal, {exercise: this.props.exercise});
  }

  render() {
    const { id, name, difficulty, baseReward, status = 0 } = this.props.exercise;

    return (
      <tr onClick={() => this.handleClick()} className="exercise-row">
        <td>{id}</td>
        <td>{name}</td>
        <td><DifficultyView difficulty={difficulty}/></td>
        <td>{baseReward}</td>
        <td><ExerciseStatus status={status}/></td>
      </tr>
    );
  }
}

export default withRouter(
  connect(state => ({}), withEntities(Modal))(Exercise)
);
