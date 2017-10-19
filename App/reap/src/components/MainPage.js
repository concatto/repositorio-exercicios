import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ExerciseList from './ExerciseList';
import ExerciseDetail from './ExerciseDetail';
import NavigationBar from './NavigationBar';
import SideBar from './SideBar';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar/>

        <Grid className="main-root">
          <Row>
            <Col xs={9}>
              <h3>Exercícios disponíveis</h3>
              <ExerciseList />
            </Col>
            <Col xs={3}>
              <SideBar/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MainPage;
