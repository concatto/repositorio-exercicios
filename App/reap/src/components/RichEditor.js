import React from 'react';
import {EditorState, RichUtils} from 'draft-js';
import ReactQuill from 'react-quill';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty(), text: ""};
    this.onChange = (editorState) => this.setState({editorState});

    this.modules = {
      toolbar: [
        [{header: [1, 2, false]}],
        ['bold', 'italic', 'underline', 'link'],
        ['code-block', {'script': 'sub'}, {'script': 'super'}],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'align': []}],
        [{'color': []}, {'background': []}]
      ]
    };
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
        <ReactQuill value={this.state.text}
          onChange={text => this.setState({text})}
          modules={this.modules}
        />
      </FormGroup>
    );
  }
}

export default RichEditor;
