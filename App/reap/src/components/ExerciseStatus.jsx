import React from 'react';
import { OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';

class ExerciseStatus extends React.Component {
  constructor(props) {
    super(props)

    this.statuses = [
      {glyph: "ok", label: "Concluído"},
      {glyph: "hourglass", label: "Em andamento"},
      {glyph: "bell", label: "Disponível"}
    ];
  }

  render() {
    const status = this.statuses[this.props.status];
    const tooltip = <Tooltip id="status-tt">{status.label}</Tooltip>;

    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <Glyphicon glyph={status.glyph}/>
      </OverlayTrigger>
    );
  }
}

export default ExerciseStatus;
