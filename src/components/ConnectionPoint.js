import React from 'react';
import bindme from 'bindme';

export default class ConnectionPoint extends React.Component {
  constructor(props) {
    bindme(super(props), 'onMouseLeave', 'onMouseOver');
    this.state = {
      focused: false
    };
  }

  onMouseLeave(event) {
    this.props.setMouseOverConnection(event, false);
    this.setState({ focused: false });
    // this.props.onMouseLeave();
  }

  onMouseOver(event) {
    this.props.setMouseOverConnection(event, true);
    this.setState({ focused: true });
  }

  render() {
    const { cx, cy, r } = this.props;

    const { focused } = this.state;

    return (
      <circle
        // onMouseDown={createArrow}
        onMouseLeave={this.onMouseLeave}
        onMouseOver={this.onMouseOver}
        fill={focused ? 'tomato' : 'white'}
        stroke="tomato"
        strokeWidth={1}
        cx={cx}
        cy={cy}
        r={r}
      />
    );
  }
}

ConnectionPoint.defaultProps = {
  r: 5
};
