import * as actiontypes from './actionTypes';
import Axios from 'axios';

export const saveFlowchartSuccess = flowchart => {
  return {
    type: actiontypes.SAVE_FLOWCHART_SUCCESS,
    flowchart
  };
};

export const saveFlowchart = flowchart => {
  return dispatch => {
    Axios.post('https://jsonplaceholder.typicode.com/todos/', flowchart).then(
      response => {
        dispatch(saveFlowchartSuccess(response.data));
      }
    );
  };
};
