import React from 'react';
import {Button} from 'react-bootstrap';

export default class CategoryList extends React.Component {

  createCategories() {
    const categories = [];
    this.props.categories.forEach((element) => {
      categories.push(<Button className="margin-buttons" bsSize="small"> {element} </Button>);
    }, this);
    return categories;
  }

  render (){
    return (
      <div>
        {this.createCategories()}
      </div>

    );
  }
}
