import React from 'react';
import { Switch, Route } from 'react-router';
import { Grid } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import ModalRoot from './ModalRoot';
import Lobby from './Lobby';
import IdePage from './IdePage';
import NewExercise from './NewExercise';
import RoomsPage from './RoomsPage';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar/>
        <ModalRoot/>

        <Grid className="main-root">
          <Switch>
            <Route exact path="/reap/create" component={NewExercise}/>
            <Route exact path="/reap/room/:roomId/solve/:id" component={IdePage}/>
            <Route exact path="/reap/room/:id" component={Lobby}/>
            <Route path="/reap" component={RoomsPage}/>
          </Switch>
        </Grid>
      </div>
    );
  }
}

export default MainPage;
