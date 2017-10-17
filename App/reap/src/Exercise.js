import React from 'react';
import DifficultyView from './DifficultyView';
import {Glyphicon} from 'react-bootstrap';

export default class Exercicio extends React.Component {

    chooseIcon(){
        switch(this.props.status){
            case 0:
                return <Glyphicon glyph="ok" />;
                break;
            case 1:
                return <Glyphicon glyph="time" />;
                break;
            case 2:
                return <Glyphicon glyph="hourglass" />
                break;
        }
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