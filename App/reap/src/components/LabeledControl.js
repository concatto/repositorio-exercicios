import React from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export default class LabeledControl extends React.Component {
  render() {
    const { label, ...controlProps } = this.props;

    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...controlProps}/>
      </FormGroup>
    );
  }
}
