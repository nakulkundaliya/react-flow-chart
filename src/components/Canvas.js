import React from 'react';
import Arrow from './Arrow';
import Step from './Step';
import Decision from './Decision';
import Process from './Process';
import Terminator from './Terminator';
import Start from './Start';
import End from './End';
import Line from './Line';
import OptionalLine from './OptionalLine';

const component = {
  decision: Decision,
  process: Process,
  terminator: Terminator,
  start: Start,
  end: End,
  line: Line,
  optionalline: OptionalLine
};

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      diagram,
      selected,
      selectStep,
      stopDragging,
      arrow,
      mouseOverConnection,
      setMouseOverStep,
      mouseOverStep,
      setMouseOverConnection
    } = this.props;
    const { height, steps, style, width } = diagram;

    const multipleSelection = Object.keys(selected).length > 1;

    return (
      <svg id="svg" height={height} width={width} style={style}>
        <defs>
          <pattern
            id="smallGrid"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke="gray"
              stroke-width="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <rect width="80" height="80" fill="url(#smallGrid)" />
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="gray"
              stroke-width="1"
            />
          </pattern>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="0"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill={Step.defaultProps.style.stroke} />
          </marker>
        </defs>
        <rect id="svg" width="100%" height="100%" fill="url(#grid)" />
        {steps.map((step, i) => {
          const { id, type } = step;
          const Step = component[type];

          return (
            <React.Fragment>
              <Step
                key={i}
                setMouseOverConnection={setMouseOverConnection(id)}
                mouseOverConnection={mouseOverConnection[id]}
                setMouseOverStep={setMouseOverStep(id)}
                mouseOverStep={mouseOverStep[id]}
                multipleSelection={multipleSelection}
                selected={selected[id]}
                selectStep={selectStep(id)}
                stopDragging={stopDragging}
                {...step}
              ></Step>
              {step.inputConnectors.map((c, i) => (
                <Arrow key={i} connector={c} />
              ))}
              {arrow && <Arrow connector={arrow} />}
            </React.Fragment>
          );
        })}
      </svg>
    );
  }
}

export default Canvas;
