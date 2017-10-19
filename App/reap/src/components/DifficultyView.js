import React from 'react';
import {Glyphicon} from 'react-bootstrap';

export default class DifficultyView extends React.Component {
  createStars(){
    const stars = [];
    for(let i = 0; i < this.props.difficulty; i++){
      stars.push(<Glyphicon glyph="star" key={i}/>);
    }
    return stars;
  }

  render (){

    return (
      <div>
        {this.createStars()}
      </div>
    );
  }
}
