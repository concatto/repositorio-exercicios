import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export default class LanguageList extends React.Component {

  constructor(props){
    super(props);
    this.state = {title: "Linguagem"};
  }

  handleChange(e){
    console.log(e);
    this.setState({title: this.props.languages[e]});
  }


  createList(){
    const options = this.props.languages.map((element, i) => {
      return <MenuItem eventKey={i} key={i}>{element}</MenuItem>;
    });

    return (
      <DropdownButton onSelect={(e) => this.handleChange(e)} title={this.state.title} id="bg-nested-dropdown">
        {options}
      </DropdownButton>
    );
  }

  render(){
    return (
      <div>
        {this.createList()}
      </div>
    );
  }
}
