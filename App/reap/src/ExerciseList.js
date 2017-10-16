import React from 'react';
import {Table} from 'react-bootstrap';
import Exercise from './Exercise';

export default class ExerciseList extends React.Component {

    constructor(props){
        super(props);

    }
    
    render (){
        return (
            <Table striped bordered condensed hover >
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Dificuldade</th>
                    <th>Pontos</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <Exercise name='super hard problem' difficulty={5} status={1} points={100} />
                <Exercise name='super easy problem' difficulty={1} status={0} points={20} />
                </tbody>
            </Table>
        );
    }
}