import { combineReducers } from 'redux';
import workflowReducer from '../features/workflow/workflowSlice';
import authReducer from '../features/workflow/authSlice';

const rootReducer = combineReducers({
  workflow: workflowReducer,
  auth: authReducer,
});

export default rootReducer;
