import React from 'react';
import { Row, Col, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';
import SideBar from './SideBar';
import LabeledControl from './LabeledControl';
import RichEditor from './RichEditor';
import DifficultyView from './DifficultyView';
import TestCases from './TestCases';

export default class NewExercise extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      enunciado: "",
      dificuldade: -1,
      tags: [],
      tests: [],
      difficulty: [1,2,3,4,5],
      title: "Dificuldade"
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
      {input: "4", output: "3", ok: true},
      {input: "6", output: "8", ok: false},
      {input: "8", output: "21", ok: false},
      {input: "9", output: "34", ok: true},
    ];

    return (
      <Row>
        <Col xs={9}>
          <h1>Criar novo exercício</h1>
          <LabeledControl label="Nome" type="text"
            value={this.state.name}
            onChange={e => this.handleChange("name", e)}
          />
          <RichEditor label="Enunciado"/>

          <div> {this.createDifficultySelect()} </div>
          <br/>
          <div>
            <b>Tags: </b>
            <span> <Glyphicon glyph="tag" /> Matematica</span>
            <span> <Glyphicon glyph="tag" /> Binário </span>
            <span> <Glyphicon glyph="tag" /> Programação </span>
          </div>
          <br/>
          <TestCases title="Casos de teste" cases={testCases} okColumn={false}/>
        </Col>
        <Col xs={3}>
          <SideBar/>
        </Col>
      </Row>
    )
  }
}
