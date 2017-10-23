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
    const iconClassName = testCase.ok ? "text-success" : "text-danger";
    if (okColumn) {
      return <td> <Glyphicon glyph={testCase.ok ? "ok" : "remove"} className={iconClassName}/> </td>;
    }
  }

  createRows() {
    const { cases } = this.props;
    return cases.map((testCase, i) => {
      return (
        <tr key={i}>
          <td>{testCase.input}</td>
          <td>{testCase.output}</td>
          {this.createOkValuesCol(testCase)}
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <Table bordered striped>
          <thead>
            <tr>
              <th>Entrada</th>
              <th>Saída</th>
              {this.createOkHeaderCol()}
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
