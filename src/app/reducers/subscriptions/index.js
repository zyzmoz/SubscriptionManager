import { createReducer } from "../createReducer";
import { SAVE_SUB, LIST_SUBS } from "../../actions/subscriptions";

const initialState = {};

const saveSubscription = (state, payload) => {
  return {...state}
}

const listSubscriptions = (state, payload) => {
  return {...state, list: payload.list}
}


export default createReducer(initialState, {
  [SAVE_SUB]: saveSubscription,
  [LIST_SUBS]: listSubscriptions
})