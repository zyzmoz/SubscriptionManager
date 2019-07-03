import { combineReducers } from 'redux';
import modal from './modal';
import customers from './customers';

const reducers = combineReducers({
  modal,
  customers
});

export default reducers;