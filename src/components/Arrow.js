import React from 'react';
import bindme from 'bindme';
import Step from './Step';

export default class Arrow extends React.Component {
  constructor(props) {
    super(props);

    bindme(this, 'onMouseDown', 'onMouseEnter', 'onMouseLeave');

    this.state = { isMouseOver: false };
  }

  onMouseDown() {
    // TODO selectArrow
  }

  onMouseEnter() {
    this.setState({ isMouseOver: true });
  }

  onMouseLeave() {
    this.setState({ isMouseOver: false });
  }

  render() {
    let { stroke, strokeWidth } = Step.defaultProps.style;

    const { isMouseOver } = this.state;
    const { startX, startY, endX, endY } = this.props.connector;
    if (isMouseOver) strokeWidth++;

    return (
      <path
        d={`M ${startX},${startY + 5} L ${endX - 15},${endY}`}
        fill="none"
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        stroke={stroke}
        strokeWidth={strokeWidth}
        markerEnd="url(#arrow)"
      />
    );
  }
}
