import React from 'react';
import { Table, Glyphicon } from 'react-bootstrap';

class TestCases extends React.Component {

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

  createRows() {
    const { cases } = this.props;

    return cases.map((testCase, i) => {
      const iconClassName = testCase.ok ? "text-success" : "text-danger";

      return (
        <tr key={i}>
          <td>{testCase.input}</td>
          <td>{testCase.output}</td>
          {testCase.ok !== undefined &&
            <td><Glyphicon glyph={testCase.ok ? "ok" : "remove"} className={iconClassName}/></td>
          }
        </tr>
      );
    });
  }

  render() {
    // Se existe algum elemento cujo atributo ok não é undefined, então possui a coluna ok.
    const hasOk = this.props.cases.findIndex(v => v.ok !== undefined) >= 0;

    return (
      <div>
        <h4>{this.props.title}</h4>
        <Table bordered striped>
          <thead>
            <tr>
              <th>Entrada</th>
              <th>Saída</th>
              {hasOk &&
                <th>Ok</th>
              }
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
