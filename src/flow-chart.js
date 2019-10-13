import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './components/Canvas';
import ErrorBoundary from './components/ErrorBoundary';
import Step from './components/Step';
import Toolbar from './components/Toolbar';
import randomString from './utils/randomString';
import * as action from './store/actions';
import { connect } from 'react-redux';
import './button.css';

class FlowChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diagram: props.diagram,
      dragging: null,
      isMouseDown: false,
      isMouseMoving: false,
      isMouseOver: false,
      offset: { x: 0, y: 0 },
      scroll: { x: 0, y: 0 },
      rectangularSelection: null,
      selected: {},
      mouseOverConnection: {},
      mouseOverStep: {},
      shiftPressed: false,
      toolbarHeight: 50
    };
  }

  componentDidMount() {
    const container = ReactDOM.findDOMNode(this).parentNode;

    // document.addEventListener('keydown', this.onDocumentKeydown)
    // document.addEventListener('keyup', this.onDocumentKeyup)

    window.addEventListener('scroll', this.onWindowScroll);
    window.addEventListener('resize', this.onWindowResize(container));

    const offset = {
      x: container.offsetLeft,
      y: container.offsetTop
    };

    const scroll = {
      x: window.scrollX,
      y: window.scrollY
    };

    this.setState({
      offset,
      scroll
    });
  }

  dropToolbarIcon = StepIcon => {
    return event => {
      const { diagram, toolbarHeight } = this.state;

      const coordinates = this.getCoordinates(event);

      // Create item if dropped inside flowchart.
      if (this.isInsideFlowChart(coordinates)) {
        const id = this.generateId(4);

        const type = StepIcon.name.toLowerCase();

        const x = coordinates.x - Step.defaultProps.width / 2;
        const y = coordinates.y - toolbarHeight - Step.defaultProps.height / 2;
        const step = {
          id,
          type,
          x,
          y,
          inputConnectors: [],
          outputConnectors: []
        };
        if (type === 'line' || type === 'optionalline') {
          step.startX = step.startY = 0;
          step.endX = step.endY = 80;
        }
        this.setState({
          diagram: Object.assign({}, diagram, {
            steps: [...diagram.steps, step]
          })
        });
      }
    };
  };

  generateId = l => {
    const newId = randomString(l);

    const idExists = this.state.diagram.steps.find(({ id }) => id === newId);

    // If new random id was found, try again with a longer random string.
    return idExists ? this.generateId(l + 1) : newId;
  };

  getCoordinates = event => {
    const { offset, scroll } = this.state;

    return {
      x: event.clientX - offset.x + scroll.x,
      y: event.clientY - offset.y + scroll.y
    };
  };

  isInsideFlowChart = coordinates => {
    const { diagram, offset, scroll, toolbarHeight } = this.state;

    const { height, width } = diagram;

    return (
      coordinates.x > offset.x + scroll.x &&
      coordinates.x < offset.x + scroll.x + width &&
      coordinates.y > offset.y + scroll.y + toolbarHeight &&
      coordinates.y < offset.y + scroll.y + height
    );
  };

  onMouseDown = event => {
    const { mouseOverConnection, toolbarHeight, diagram } = this.state;
    const startId = Object.keys(mouseOverConnection).find(
      p => mouseOverConnection[p]
    );
    if (startId) {
      const step = diagram.steps.find(s => s.id === startId);
      const coordinates = this.getCoordinates(event);
      if (step.type === 'line' || step.type === 'optionalline') {
        const connection = mouseOverConnection[startId];
        this.setState({
          connection,
          dragging: coordinates
        });
      } else {
        // this.setState({
        //     arrow: {
        //         startId,
        //         startX: coordinates.x,
        //         startY: coordinates.y - toolbarHeight,
        //         endX: coordinates.x,
        //         endY: coordinates.y - toolbarHeight
        //     }
        // })
      }
    }
    if (event.target.id === 'svg') this.setState({ selected: {} });
  };

  onMouseEnter = () => {
    this.setState({
      isMouseOver: true
    });
  };

  onMouseLeave = () => {
    this.setState({
      isMouseOver: false
    });
  };

  onMouseMove = event => {
    const {
      diagram,
      dragging,
      isMouseDown,
      selected,
      arrow,
      toolbarHeight,
      connection
    } = this.state;

    if (!isMouseDown) return;
    const coordinates = this.getCoordinates(event);

    if (arrow) {
      this.setState(s => ({
        arrow: {
          ...s.arrow,
          endX: coordinates.x,
          endY: coordinates.y - toolbarHeight
        }
      }));
      return;
    }
    if (Object.keys(selected).length) {
      const steps = [...diagram.steps];
      const deltaX = dragging ? coordinates.x - dragging.x : 0;
      const deltaY = dragging ? coordinates.y - dragging.y : 0;

      steps
        .filter(({ id }) => selected[id])
        .forEach(step => {
          if (connection) {
            console.log(step);
            step[connection + 'X'] += deltaX;
            step[connection + 'Y'] += deltaY;
            console.log(step);
          } else {
            step.x += deltaX;
            step.y += deltaY;
          }
        });

      this.setState({
        diagram: Object.assign({}, diagram, { steps }),
        dragging: coordinates
      });
    }
  };

  onMouseUp = event => {
    const { diagram, arrow, mouseOverConnection } = this.state;
    const end = Object.keys(mouseOverConnection).find(
      p => mouseOverConnection[p]
    );
    if (arrow && end) {
      const steps = [...diagram.steps];
      const step = steps.find(s => s.id === arrow.startId);
      if (step.id !== end) {
        step.inputConnectors.push(arrow);
        this.setState({ diagram: Object.assign({}, diagram, { steps }) });
      }
    }
    this.setState({
      dragging: null,
      isMouseDown: false,
      arrow: null
    });
  };

  onWindowResize = container => {
    return () => {
      const rect = container.getBoundingClientRect();

      const dynamicView = {
        height: rect.height,
        width: rect.width
      };
      this.setState({ dynamicView });
    };
  };

  onWindowScroll = () => {
    const scroll = {
      x: window.scrollX,
      y: window.scrollY
    };
    this.setState({ scroll });
  };

  setMouseOverConnection = id => (event, data) => {
    const { mouseOverConnection } = this.state;
    mouseOverConnection[id] = event.type === 'mouseover' ? data || true : null;
    this.setState({
      mouseOverConnection: Object.assign({}, mouseOverConnection)
    });
  };

  setMouseOverStep = id => event => {
    const { mouseOverStep } = this.state;
    mouseOverStep[id] = event.type === 'mouseover';
    this.setState({ mouseOverStep: Object.assign({}, mouseOverStep) });
  };
  selectStep = id => {
    return event => {
      const { selected, shiftPressed } = this.state;

      let selectedStep = shiftPressed ? Object.assign({}, selected) : {};
      selectedStep[id] = true;

      this.setState({
        isMouseDown: event.type === 'mousedown',
        selected: selectedStep
      });
    };
  };

  stopDragging = event => {
    this.setState({
      dragging: null,
      isMouseDown: false
    });
  };

  render() {
    const { editable } = this.props;

    const {
      diagram,
      isMouseOver,
      rectangularSelection,
      selected,
      toolbarHeight,
      arrow,
      mouseOverConnection,
      mouseOverStep
    } = this.state;

    const { height, width } = diagram;

    const containerStyle = {
      boxShadow: isMouseOver ? '3px 4px 16px 0px rgba(0, 0, 0, 0.5)' : null,
      height: toolbarHeight + height,
      width
    };

    return editable ? (
      <div
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        style={containerStyle}
      >
        <button
          className="btn"
          onClick={() => this.props.onSaveFlowchart(diagram)}
        >
          Save
        </button>
        <ErrorBoundary>
          <Canvas
            arrow={arrow}
            diagram={diagram}
            mouseOverConnection={mouseOverConnection}
            setMouseOverConnection={this.setMouseOverConnection}
            mouseOverStep={mouseOverStep}
            setMouseOverStep={this.setMouseOverStep}
            rectangularSelection={rectangularSelection}
            selected={selected}
            selectStep={this.selectStep}
            stopDragging={this.stopDragging}
          />
        </ErrorBoundary>
        <Toolbar
          dropToolbarIcon={this.dropToolbarIcon}
          height={toolbarHeight}
          width={width}
        />
      </div>
    ) : (
      <Canvas diagram={diagram} />
    );
  }
}

const mapStateToProps = state => {
  return {
    diagram: state.flowchart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveFlowchart: flowchart => dispatch(action.saveFlowchart(flowchart))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlowChart);
