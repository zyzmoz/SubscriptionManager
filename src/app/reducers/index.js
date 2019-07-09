import { combineReducers } from 'redux';
import modal from './modal';
import customers from './customers';
import subscriptions from './subscriptions'

const reducers = combineReducers({
  modal,
  customers,
  subscriptions
});

export default reducers;