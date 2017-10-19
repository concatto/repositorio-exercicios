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

        const final = [], options = [];
        let counter = 0;
        {this.props.languages.forEach( (element) => {
            options.push(<MenuItem eventKey={counter++}>{element}</MenuItem>);
        }, this)}

        final.push(<DropdownButton onSelect={ (e) => this.handleChange(e)}title={this.state.title} id="bg-nested-dropdown"> {options} </DropdownButton>);

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