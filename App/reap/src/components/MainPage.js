import React from 'react';
import { Switch, Route } from 'react-router';
import { Grid } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import ModalRoot from './ModalRoot';
import Lobby from './Lobby';
import IdePage from './IdePage';
import NewExercise from './NewExercise';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar/>
        <ModalRoot/>

        <Grid className="main-root">
          <Switch>
            <Route exact path="/reap" component={Lobby}/>
            <Route exact path="/reap/newExercise" component={NewExercise}/>
            <Route exact path="/reap/solve/:id" component={IdePage}/>
          </Switch>
        </Grid>
      </div>
    );
  }
}

export default MainPage;
