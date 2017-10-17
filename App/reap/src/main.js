import React from 'react';
import { Switch, Route } from 'react-router-dom';
import InitialPage from './InitialPage';
import Lobby from './Lobby';

export default class Main extends React.Component {
    render(){
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={InitialPage}/>
                    <Route path='/lobby' component={Lobby}/>
                </Switch>
            </main>
        );
    }
}