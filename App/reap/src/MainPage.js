import React from 'react';
import ExerciseList from './ExerciseList';
import ExerciseDetail from './ExerciseDetail';

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <ExerciseList />
      </div>
    );
  }
}

export default MainPage;
