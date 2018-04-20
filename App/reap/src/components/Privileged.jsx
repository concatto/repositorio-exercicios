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
 * If no privilege level is defined, then the user just needs to be logged in
 * for the content to be shown.
 * Available levels: student < teacher < administrator < owner
 */
const Privileged = (props) => {
  const { student, teacher, administrator, owner,
    authenticated, privilege, busy, withWarning, children } = props;

  const level = [owner, administrator, teacher, student].findIndex(v => v === true);
  if (authenticated === undefined || busy === true) return null;

  if (authenticated && (level < 0 || privilege <= level)) {
    return children;
  }

  return withWarning ? <WarningSign/> : null;
}

export default connect((state, ownProps) => {
  const { authenticated } = state.auth;

  return {
    authenticated,
    busy: state.room.busy,
    privilege: state.room.membership ? state.room.membership.privilege : undefined
  };
})(Privileged);
