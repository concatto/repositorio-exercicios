import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, DropdownButton, MenuItem, Glyphicon, Button } from 'react-bootstrap';
import SideBar from './SideBar';
import LabeledControl from './LabeledControl';
import RichEditor from './RichEditor';
import DifficultyView from './DifficultyView';
import TestCases from './TestCases';
import InputNumber from 'rc-input-number';
import Exercises from '../entities/exercises';
import { withEntities } from '../utils';
import 'rc-input-number/assets/index.css';

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
    if (key==="dificuldade") {
      this.setState({[key]: e+1 });
      this.setState({"title": <DifficultyView difficulty={e+1} />})
    } else {
      this.setState({[key]: e.target.value });
    }
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

  render () {
    const testCases = [
      {input: "4", output: "3"},
      {input: "6", output: "8"},
      {input: "8", output: "21"},
      {input: "9", output: "34"},
    ];

    const { reward, name, dificuldade, description } = this.state;

    return (
      <Row>
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
            {this.createDifficultySelect()}
            <InputNumber value={reward} onChange={value => this.setState({reward: value})}/>
          </div>
          <br/>
          <div>
            <b>Tags: </b>
            <span> <Glyphicon glyph="tag" /> Matematica</span>
            <span> <Glyphicon glyph="tag" /> Binário </span>
            <span> <Glyphicon glyph="tag" /> Programação </span>
          </div>
          <br/>
          <TestCases title="Casos de teste" cases={testCases}/>
          <Button onClick={() => this.props.exercises.create(name, dificuldade, reward, description)}>
            Criar
          </Button>
        </Col>
        <Col xs={3}>
          <SideBar/>
        </Col>
      </Row>
    )
  }
}

export default connect(state => {
  return {};
}, withEntities(Exercises))(NewExercise);
