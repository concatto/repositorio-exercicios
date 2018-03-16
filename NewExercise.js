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



class NewExercise extends React.Component {

  constructor(props) {
    super(props);
    // poderia ser utilizado uma biblioteca de formulários aka redux forms
    this.state = {
      // mistura de linguas
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
    this.onChangeRich = (editorState) => this.setState({editorState}); //nome bizarro
  }

  // espaçamento está fora dos padrões

  handleChange(key, e) {
    // função que trata de muita coisa, deveria ser dividida
    if (key==="tags"){
      this.setState({[key]: e});
    } else if (key==="dificuldade") {
      this.setState({[key]: e+1 });
      this.setState({"title": <DifficultyView difficulty={e+1} />})
      // componente não deveria estar dentro do estado
    } else {
      console.log(e); //console log perdido
      this.setState({[key]: e.target.value });
    }
  }

  // espaçamento está fora dos padrões

  createDifficultySelect () { // nome deveria ser relacionado ao drop down retornado e não "select"
    const options = this.state.difficulty.map((element, i) => {
      return <MenuItem eventKey={i} key={i}><DifficultyView difficulty={element} /></MenuItem>;
    });

    return (
      <DropdownButton onSelect={e => this.handleChange("dificuldade", e)} title={this.state.title} id="bg-nested-dropdown">
        {options}
      </DropdownButton>
    );

  }

  // espaçamento está fora dos padrões

  render () {
    const testCases = [
      {input: "4", output: "3"},
      {input: "6", output: "8"},
      {input: "8", output: "21"},
      {input: "9", output: "34"},
    ];

    const { reward, name, dificuldade, description } = this.state; // mistura de linguas

    // deveria ser mantido um padrão de formatação (limite no comprimento da linha) na hora de instanciar o componente

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
            <TestCases title="Casos de teste" cases={testCases}/> 
            <Button onClick={() => this.props.exercises.create(name, dificuldade, reward, description)}> {/* mistura de linguas */}
              Criar
            </Button>
          </Col>
          <Col xs={3}>
            <SideBar/>
          </Col>
        </Privileged>
      </Row>
    )
  }
}

export default connect(state => {
  return {};
}, withEntities(Exercises))(NewExercise); //witch craft
