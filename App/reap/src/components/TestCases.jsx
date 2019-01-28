import React from 'react';
import { Table, Glyphicon } from 'react-bootstrap';
import TestCaseInput from './TestCaseInput';


class TestCases extends React.Component {

  constructor() {
    super();

    this.state = {
      cases: [
        {input: undefined, output: undefined},
        {input: undefined, output: undefined},
        {input: undefined, output: undefined},
        {input: undefined, output: undefined},
      ],
      verify: 0
    }
  }

  createOkHeaderCol() {
    const { okColumn } = this.props;
    if (okColumn) {
      return <th>Ok</th>;
    }
  }

  createOkValuesCol(testCase) {
    const { okColumn } = this.props;

    if (okColumn) {
      return ;
    }
  }

  changeValue(newTestCase) {


    this.state.cases.map((testCase, i) => {
      if(i == newTestCase.index && newTestCase.type == "input") {
        testCase.input = newTestCase.value;
        //this.setState({cases[i].input: newTestCase.value})
      }
      else if(i == newTestCase.index && newTestCase.type == "output") {
        testCase.output = newTestCase.value
        //this.setState({cases[i]: newTestCase.value})
      }
      //tratador implemetar depois...
      if (testCase.input == undefined || testCase.output == undefined) {
        this.setState({verify: 1})

      }
    })

    this.props.handleTestCase(this.state.cases);

  }

  createRows() {


    return this.state.cases.map((testCase, i) => {
      const iconClassName = testCase.ok ? "text-success" : "text-danger";

      return (
        <tr key={i}>
          <td><TestCaseInput type={"input"} index={i} changeValue={this.changeValue.bind(this)} /></td>
          <td><TestCaseInput type={"output"} index={i} changeValue={this.changeValue.bind(this)} /></td>
          {testCase.ok !== undefined &&
            <td><Glyphicon glyph={testCase.ok ? "ok" : "remove"} className={iconClassName}/></td>
          }
        </tr>
      );
    });
  }

  render() {


    // Se existe algum elemento cujo atributo ok não é undefined, então possui a coluna ok.
    //const hasOk = this.props.cases.findIndex(v => v.ok !== undefined) >= 0;

    return (

      <div>
        <h4>{this.props.title}</h4>
        <Table bordered striped>
          <thead>
            <tr>
              <th>Entrada</th>
              <th>Saída</th>

            </tr>
          </thead>
          <tbody>
            {this.createRows()}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TestCases;
