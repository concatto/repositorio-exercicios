import React from 'react';

export default class TestCaseInput extends React.Component {
  constructor(props) {
    super();

    this.state = {
      value: 0,
      type: props.type,
      index: props.index
    }
  }

  handleState(value) {
    this.setState({value: value.target.value}, () => {this.props.changeValue(this.state);});
  }

  render() {
    return (
      <div>
        <input onChange={this.handleState.bind(this)} />
      </div>
    );
  }

}
