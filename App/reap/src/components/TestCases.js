import React from 'react';
import { Table, Glyphicon } from 'react-bootstrap';

class TestCases extends React.Component {
  createRows() {
    const { cases } = this.props;

    return cases.map((testCase, i) => {
      const iconClassName = testCase.ok ? "text-success" : "text-danger";

      return (
        <tr key={i}>
          <td>{testCase.input}</td>
          <td>{testCase.output}</td>
          <td>
            <Glyphicon glyph={testCase.ok ? "ok" : "remove"} className={iconClassName}/>
          </td>
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
              <th>Ok</th>
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
