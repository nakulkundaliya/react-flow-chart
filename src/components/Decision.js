import React from 'react';
import ConnectionPoint from './ConnectionPoint';
import Step from './Step';

export default class Decision extends Step {
  render() {
    const {
      height,
      width,
      x,
      y,
      multipleSelection,
      selected,
      selectStep,
      stopDragging,
      mouseOverConnection,
      mouseOverStep,
      setMouseOverStep,
      setMouseOverConnection
    } = this.props;
    const showConnectionPoints =
      (selected && !multipleSelection) || mouseOverStep;
    const style = this.getStyle();
    const halfHeight = height / 2;
    const halfWidth = width / 2;

    return (
      <g
        onMouseOver={setMouseOverStep}
        onMouseLeave={setMouseOverStep}
        onMouseDown={selectStep}
        onMouseUp={stopDragging}
        transform={`translate(${x},${y})`}
      >
        <path
          d={`M0 ${halfHeight} L${halfWidth} 0 L${width} ${halfHeight} L${halfWidth} ${height}Z`}
          style={style}
        />
        {showConnectionPoints ? (
          <ConnectionPoint
            setMouseOverConnection={setMouseOverConnection}
            cx={0}
            cy={halfHeight}
          />
        ) : null}
        {showConnectionPoints ? (
          <ConnectionPoint
            setMouseOverConnection={setMouseOverConnection}
            cx={halfWidth}
            cy={0}
          />
        ) : null}
        {showConnectionPoints ? (
          <ConnectionPoint
            setMouseOverConnection={setMouseOverConnection}
            cx={width}
            cy={halfHeight}
          />
        ) : null}
        {showConnectionPoints ? (
          <ConnectionPoint
            setMouseOverConnection={setMouseOverConnection}
            cx={halfWidth}
            cy={height}
          />
        ) : null}
      </g>
    );
  }
}

Decision.defaultProps = Step.defaultProps;
