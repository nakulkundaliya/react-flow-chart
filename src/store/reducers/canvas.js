import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isError: false,
  flowchart: null
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_FLOWCHART_SUCCESS:
      return {
        ...state,
        flowchart: action.flowchart
      };
    default:
      return state;
  }
};
export default canvasReducer;
