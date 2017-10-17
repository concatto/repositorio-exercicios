import React from 'react';

export default class CategoryList extends React.Component {
    
    createCategories() {
        const categories = [];
        this.props.categories.forEach((element) => {
            categories.push(<div>{element}</div>);
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