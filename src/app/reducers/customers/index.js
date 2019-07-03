import { createReducer } from "../createReducer";
import { SAVE_CUSTOMER, LIST_CUSTOMERS } from "../../actions/customers";

const initialState = {};

const saveCustomer = (state, payload) => {
  return {...state}
}

const listCustomers = (state, payload) => {
  return {...state, list: payload.list}
}


export default createReducer(initialState, {
  [SAVE_CUSTOMER]: saveCustomer,
  [LIST_CUSTOMERS]: listCustomers
})