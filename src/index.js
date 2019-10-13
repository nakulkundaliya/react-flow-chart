import React from 'react'
import ReactDOM from 'react-dom'
import FlowChart from './flow-chart'
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/canvas'
import {saveFlowchartSuccess} from "./store/actions/canvas";

const diagram = {
    steps: [],
    style: {backgroundColor: '#eee'},
    height: window.innerHeight - 150,
    width: window.innerWidth
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(saveFlowchartSuccess(diagram))
ReactDOM.render(<Provider store={store}><FlowChart editable/></Provider>, document.getElementById('root'))
