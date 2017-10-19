import React from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import { withEntities } from '../utils';
import Modal from '../entities/modal';
import ExerciseDetailModal from './modals/ExerciseDetailModal';
import DifficultyView from './DifficultyView';

class Exercise extends React.Component {
  chooseIcon() {
    const glyphs = ["ok", "time", "hourglass"];

    return <Glyphicon glyph={glyphs[this.props.status]}/>
  }

  render() {
    console.log(this.props);

    return (
      <tr onClick={() => this.props.modal.push(ExerciseDetailModal)}>
        <td>{this.props.name}</td>
        <td><DifficultyView difficulty={this.props.difficulty}/></td>
        <td>{this.props.points}</td>
        <td>{this.chooseIcon()}</td>
      </tr>
    );
  }
}

export default connect((state) => {
  return {};
}, withEntities(Modal))(Exercise);
