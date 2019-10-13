import React from 'react';
import ConnectionPoint from './ConnectionPoint';
import Step from './Step';

export default class End extends Step {
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
      (selected && !multipleSelection) || mouseOverStep || true;
    const style = this.getStyle();
    style.fill = '#000';
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
        <circle r={height / 2} style={style} cx={halfWidth} cy={halfHeight}>
          {showConnectionPoints ? (
            <ConnectionPoint
              setMouseOverConnection={setMouseOverConnection}
              cx={halfWidth}
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
        </circle>
      </g>
    );
  }
}

End.defaultProps = Step.defaultProps;
