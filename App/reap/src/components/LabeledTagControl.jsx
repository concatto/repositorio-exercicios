import React from 'react';
import { ControlLabel, FormGroup} from 'react-bootstrap';
import TagsInput from 'react-tagsinput';

export default class LabeledControl extends React.Component {
  render() {
    const { label, ...controlProps } = this.props;

    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <br/>
        <TagsInput {...controlProps}/>
      </FormGroup>
    );
  }
}
