import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import { FormGroup, ControlLabel } from 'react-bootstrap';

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    const { label } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <Editor editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand} />
      </FormGroup>
    );
  }
}

export default RichEditor;