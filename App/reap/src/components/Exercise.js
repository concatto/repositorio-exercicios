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
    this.props.modal.push(ExerciseDetailModal, {id: this.props.id}, () => {
      this.props.modal.close();
    });
  }

  render() {
    console.log(this.props);

    return (
      <tr onClick={() => this.handleClick()} className="exercise-row">
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td><DifficultyView difficulty={this.props.difficulty}/></td>
        <td>{this.props.points}</td>
        <td><ExerciseStatus status={this.props.status}/></td>
      </tr>
    );
  }
}

export default withRouter(
  connect(state => ({}), withEntities(Modal))(Exercise)
);
