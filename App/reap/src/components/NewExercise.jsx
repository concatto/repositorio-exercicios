import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import SideBar from './SideBar';
import LabeledControl from './LabeledControl';
import RichEditor from './RichEditor';
import DifficultyView from './DifficultyView';
import TestCases from './TestCases';
import Privileged from './Privileged';
import Exercises from '../entities/exercises';
import { withEntities } from '../utils';
import LabeledNumberControl from './LabeledNumberControl';
import LabeledTagControl from './LabeledTagControl';
import  { Redirect } from 'react-router-dom'

class NewExercise extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      enunciado: "",
      dificuldade: -1,
      reward: 10,
      tags: [],
      tests: [],
      difficulty: [1,2,3,4,5],
      title: "Dificuldade",
      description: ""
    };
    this.onChangeRich = (editorState) => this.setState({editorState});
  }

  handleChange(key, e) {
    if (key==="tags"){
      this.setState({[key]: e});
    } else if (key==="dificuldade") {
      this.setState({[key]: e+1 });
      this.setState({"title": <DifficultyView difficulty={e+1} />})
    } else {
      //console.log(e);
      this.setState({[key]: e.target.value });
    }
  }

  createExercise() {
    const { reward, name, dificuldade, description, tags, tests} = this.state;
    const { roomId } = this.props;

    this.props.exercises.create(roomId, name, dificuldade, reward, description, tags, tests);

    this.props.history.push(`/reap/room/${roomId}`);
  }

  createDifficultySelect () {
    const options = this.state.difficulty.map((element, i) => {
      return <MenuItem eventKey={i} key={i}><DifficultyView difficulty={element} /></MenuItem>;
    });

    return (
      <DropdownButton onSelect={e => this.handleChange("dificuldade", e)} title={this.state.title} id="bg-nested-dropdown">
        {options}
      </DropdownButton>
    );

  }

  handleTestCase(tests) {//, () => {console.log(this.state.tags)
    this.setState({tests});
  }

  render () {

    const { reward, name, dificuldade, description, tags, tests} = this.state;
    const { roomId } = this.props;

    return (
      <Row>
        <Privileged teacher withWarning>
          <Col xs={9}>
            <h1>Criar novo exercício</h1>
            <LabeledControl label="Nome" type="text"
              value={name}
              onChange={e => this.handleChange("name", e)}
            />
            <RichEditor label="Enunciado"
              value={description}
              onChange={text => this.setState({description: text})}
            />
            <div>
              <div className="container-div h-margin">
                {this.createDifficultySelect()}
              </div>
              <div className="container-div h-margin">
                <LabeledNumberControl label="Recompensa" value={reward} onChange={value => this.setState({reward: value})}/>
              </div>
            </div>
            <br/>
            <LabeledTagControl label="Tags" className="form-control" value={this.state.tags} onChange={chips => this.handleChange("tags",chips)} />
            <br/>
            <TestCases title="Casos de teste" handleTestCase={this.handleTestCase.bind(this)}/>
            <Button onClick={() => this.createExercise()}>
              Criar Exercicio
            </Button>
          </Col>
          <Col xs={3}>
            <SideBar users={this.props.users}/>
          </Col>
        </Privileged>
      </Row>
    )
  }
}

export default connect(state => {
  return {roomId: state.room.id, users: state.room.users};
}, withEntities(Exercises))(NewExercise);
