import React from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export default class LabeledControl extends React.Component {
  render() {
    const { label, validationState, withFeedback, ...controlProps } = this.props;

    return (
      <FormGroup validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...controlProps}/>
        {withFeedback &&
          <FormControl.Feedback/>
        }
      </FormGroup>
    );
  }
}
