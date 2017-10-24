import React from 'react';
import { ControlLabel, FormGroup} from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

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
