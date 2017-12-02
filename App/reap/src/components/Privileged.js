import React from 'react';
import { Alert, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

const WarningSign = () => (
  <Col xs={12} style={{marginTop: 20}}>
    <Alert bsStyle="danger">
      <h2 style={{marginTop: 0}}>Acesso negado</h2>
      <p>Você não tem permissão para acessar esta página.</p>
    </Alert>
  </Col>
);

/**
 * The Privileged component is a wrapper that renders its children only
 * if the current user has a privilege level higher than or equal to the
 * specified threshold. E.g.: a component wrapped in <Privileged teacher> will
 * be shown to teachers, administrators and owners, but not to students.
 * You should specify only one level; if multiple levels are passed, only the
 * highest will be considered. If withWarning is set, the component will render
 * a brief message to notify the user instead of simply not rendering anything.
 * Available levels: student < teacher < administrator < owner
 */
const Privileged = ({children, student, teacher, administrator, owner, privilege, withWarning}) => {
  const level = [owner, administrator, teacher, student].findIndex(v => v === true);
  console.log(level);

  if (privilege <= level) {
    return children;
  }

  return withWarning ? <WarningSign/> : null;
}

export default connect(state => {
  return {privilege: state.users.current.privilege};
})(Privileged);
