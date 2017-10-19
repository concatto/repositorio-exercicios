import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

export default class LanguageList extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {title: "Linguagem"};
    }

    createList(){

        const final = [], options = [];

        {this.props.languages.forEach( (element) => {
            options.push(<MenuItem eventKey={element.id}>{element}</MenuItem>);
        }, this)}

        final.push(<DropdownButton title={this.state.title} id="bg-nested-dropdown"> {options} </DropdownButton>);

        return final;

    }
    
    render(){
        return (
            <div>
                {this.createList()}
            </div>
        );
    }
}