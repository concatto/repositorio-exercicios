import React from 'react';
import {Button} from 'react-bootstrap';

export default class CategoryList extends React.Component {

  createCategories() {
    return this.props.categories.map((element, i) => {
      return (
        <Button className="margin-buttons" bsSize="small" key={i}>
          {element}
        </Button>
      );
    });
  }

  render (){
    return (
      <div>
        {this.createCategories()}
      </div>
    );
  }
}
