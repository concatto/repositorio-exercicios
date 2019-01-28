import React from 'react';
import { Row, Col, ControlLabel, FormGroup, FormControl, DropdownButton, MenuItem} from 'react-bootstrap';

export default class LabeledUserControl extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: 'Privilégio'
    };
  }

  handleDropdownChange = (e, value) => {
    const { privilegeChange } = this.props;
    this.setState({title: this.props.previlegies[e]});
    privilegeChange(e, value.key-1);
  }

  render() {
    const { value, id, usernameChange, previlegies } = this.props;
    const options = previlegies.map((element, i) => {
      return <MenuItem eventKey={i} key={i}>{element}</MenuItem>;
    });

    return (
      <Row>
        <Col xs={12} sm={8}>
          <FormGroup>
            <ControlLabel>Usuário</ControlLabel>
            <FormControl type="text"
              value={value.username}
              onChange={e => usernameChange(e, value.key-1)} />
          </FormGroup>
        </Col>
        <Col xs={12} sm={4}>
          <FormGroup>
            <ControlLabel xs={12}>Privilégio</ControlLabel>
            <DropdownButton onSelect={(e) => this.handleDropdownChange(e, value)} title={this.state.title} id={id}>
              {options}
            </DropdownButton>
          </FormGroup>
        </Col>
      </Row>
    );
  }

}
