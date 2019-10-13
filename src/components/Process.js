import React from 'react';
import ConnectionPoint from './ConnectionPoint';
import Step from './Step';

export default class Process extends Step {
  render() {
    const {
      createArrow,
      height,
      width,
      x,
      y,
      multipleSelection,
      selected,
      selectStep,
      stopDragging,
      mouseOverConnection,
      setMouseOverConnection,
      mouseOverStep,
      setMouseOverStep
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
        <rect height={height} style={style} width={width} />

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

Process.defaultProps = Step.defaultProps;
