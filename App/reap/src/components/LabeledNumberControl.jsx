import React from 'react';
import { ControlLabel, FormGroup} from 'react-bootstrap';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';


export default class LabeledControl extends React.Component {
  render() {
    const { label, ...controlProps } = this.props;

    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <br/>
        <InputNumber {...controlProps}/>
      </FormGroup>
    );
  }
}
