import React from 'react'
import bindme from 'bindme'
import Step from './Step'
import ConnectionPoint from "./ConnectionPoint";

export default class Line extends Step {
    static defaultProps = {
        ...Step.defaultProps,
        startX: 0,
        startY: 0,
        endX: 80,
        endY: 80,
    }

    constructor(props) {
        super(props)

        bindme(this,
            'onMouseDown',
            'onMouseEnter',
            'onMouseLeave'
        )

        this.state = {isMouseOver: false}
    }

    onMouseDown() {
        // TODO selectArrow
    }

    onMouseEnter() {
        this.setState({isMouseOver: true})
    }

    onMouseLeave() {
        this.setState({isMouseOver: false})
    }

    render() {
        let {
            stroke,
            strokeWidth
        } = Step.defaultProps.style
        const {
            x,
            y,
            startX,
            startY,
            endX,
            endY,
            selectStep,
            stopDragging,
            multipleSelection,
            selected,
            setMouseOverStep,
            setMouseOverConnection,
            mouseOverStep,
        } = this.props

        const {isMouseOver} = this.state
        if (isMouseOver) strokeWidth++
        const style = this.getStyle()
        const showConnectionPoints = (selected && !multipleSelection) || mouseOverStep

        return (
            <g
                onMouseOver={setMouseOverStep}
                onMouseLeave={setMouseOverStep}
                onMouseDown={selectStep}
                onMouseUp={stopDragging}
                transform={`translate(${x},${y})`}>
                <path
                    d={`M ${startX},${startY}  L ${endX},${endY} `}
                    fill='none'
                    style={style}
                    onMouseDown={this.onMouseDown}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                />
                {showConnectionPoints ? (
                    <ConnectionPoint
                        setMouseOverConnection={e => setMouseOverConnection(e, 'start')}
                        cx={startX} cy={startY}/>
                ) : null}
                {showConnectionPoints ? (
                    <ConnectionPoint
                        setMouseOverConnection={e => setMouseOverConnection(e, 'end')}
                        cx={endX} cy={endY}/>
                ) : null}
            </g>
        )
    }
}
