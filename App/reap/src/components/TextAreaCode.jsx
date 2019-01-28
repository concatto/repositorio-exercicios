import React from 'react';
import { connect } from 'react-redux';
import { Panel, FormGroup, FormControl, Col, Row, Button } from 'react-bootstrap';
import BuildErrorModal from './modals/BuildErrorModal';
import RewardModal from './modals/RewardModal';
import SuccessModal from './modals/SuccessModal';
import FailureModal from './modals/FailureModal';
import TipOfferModal from './modals/TipOfferModal';
import TipModal from './modals/TipModal';
import Modal from '../entities/modal';
import Exercises from '../entities/exercises';
import { withEntities } from '../utils';

class TextAreaCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total_Lines: 1,
      positionX: 0,
      positionY: 0,
      code: '',
    };
  }

  handleCheckChange(nextProps) {
    if (!this.props.checkResult && nextProps.checkResult) {
      if (nextProps.checkResult.failed === true) {
        const errors = nextProps.checkResult.errors.split('\n').filter(val => val !== '');

        this.props.modal.push(BuildErrorModal, {errors});
      } else {
        alert('Ok!');
      }
    }
  }

  handleExecuteChange(nextProps) {
    if (!this.props.executeResult && nextProps.executeResult) {
      const content = nextProps.executeResult.map(el => ({
        input: el.testCase.input,
        output: el.output || 'N/A',
        ok: el.passed || false,
      }));

      if (nextProps.executeResult.every(el => el.passed === true)) {
        this.notifySuccess(content);
      } else {
        this.notifyFailure(content);
      }

      // if (nextProps.executeResult.failed === true) {
      //   const errors = nextProps.executeResult.errors.split('\n').filter(val => val !== '');

      //   this.props.modal.push(BuildErrorModal, {errors});
      // } else {
      //   alert('Ok!');
      // }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleCheckChange(nextProps);
    this.handleExecuteChange(nextProps);
  }

  countLine(e) {
    const key = e.which || e.keyCode || e.charCode;
    let count = 1;

    for (let i = 0; i < e.target.value.length; i++) {
      if (key === 13) {
        count += 1;
        this.setState({ total_Lines: count });
      }
      console.log(key);
    }
  }

  insertFooter() {
    return (
      <Row>
        <Col xs={3}>
          {this.props.language}
        </Col>
        <Col xs={3}>
          {this.state.total_Lines}
        </Col>
        <Col xs={3}>
          {`${this.state.positionX}:${this.state.positionY}`}
        </Col>
      </Row>
    );
  }

  notifySuccess(content) {
    const { exercise } = this.props;

    this.props.modal.push(SuccessModal, {content, exercise}, () => {
      this.props.modal.pop();
      this.props.modal.push(RewardModal, {value: exercise.baseReward});
    });
  }

  notifyFailure(content) {
    const { exercise } = this.props;

    this.props.modal.push(FailureModal, {content, exercise}, () => {
      this.props.modal.pop();
      this.props.modal.push(TipOfferModal, {}, () => {
        this.props.modal.pop();
        this.props.modal.push(TipModal, {});
      });
    });
  }

  handleVerify() {
    const { exercises, room } = this.props;

    exercises.check(room, this.state.code, 'cpp');
    // this.props.modal.push(BuildErrorModal);
  }

  handleSubmit() {
    const { exercises, room, exercise } = this.props;
    console.log(exercise);
    exercises.execute(room, exercise.id, this.state.code, 'cpp');

    // if (Math.random() < 0.5) {
    //   this.notifySuccess();
    // } else {
    //   this.notifyFailure();
    // }
  }

  insertHeader() {
    return (
      <Row>
        <Col xs={3}>
          <h4>Codigo-Fonte</h4>
        </Col>
        <Col xs={3}>
          <Button bsStyle="info" onClick={() => this.handleVerify()}>Verificar</Button>
        </Col>
        <Col xs={3}>
          <Button bsStyle="success" onClick={() => this.handleSubmit()}>Enviar</Button>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Panel header={this.insertHeader()} footer={this.insertFooter()}>
        <FormGroup>
          <FormControl
            componentClass="textarea"
            className="text-nonResize"
            onKeyPress={e => this.countLine(e)}
            onChange={e => this.setState({code: e.target.value})}
            value={this.state.code}
          />
        </FormGroup>
      </Panel>
    );
  }
}

export default connect(state => {
  return {
    checkResult: state.exercises.checkResult,
    executeResult: state.exercises.executeResult,
  };
}, withEntities(Modal, Exercises))(TextAreaCode);
