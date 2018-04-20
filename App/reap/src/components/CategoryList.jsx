import React from 'react';
import { Label } from 'react-bootstrap';

export default class CategoryList extends React.Component {

  createCategories() {
    return this.props.categories.map((element, i) => {
      return (
        <Label className="category-label" key={i}>
          {element}
        </Label>
      );
    });
  }

  render() {
    return (
      <div>
        {this.createCategories()}
      </div>
    );
  }
}
