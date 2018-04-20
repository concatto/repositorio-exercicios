import React from 'react';
import {Glyphicon} from 'react-bootstrap';

export default class DifficultyView extends React.Component {
  createStars(){
    const stars = [];
    for(let i = 0; i < 5; i++){
      if(i < this.props.difficulty)
        stars.push(<Glyphicon glyph="star" key={i}/>);
      else
        stars.push(<Glyphicon glyph="star-empty" key={i}/>);
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
