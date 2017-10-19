import React from 'react';
import DifficultyView from './DifficultyView';
import {Glyphicon} from 'react-bootstrap';

export default class Exercicio extends React.Component {
  chooseIcon() {
    const glyphs = ["ok", "time", "hourglass"];

    return <Glyphicon glyph={glyphs[this.props.status]}/>
  }

  render (){
    return (
      <tr>
        <td>{this.props.name}</td>
        <td><DifficultyView difficulty={this.props.difficulty}/></td>
        <td>{this.props.points}</td>
        <td>{this.chooseIcon()}</td>
      </tr>
    );
  }
}
